import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PriceCalculatorInterface } from './interface/PriceCalculatorInterface';
import { Model, Types } from 'mongoose';
import { Order } from './schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { OrderStatus } from '../types';
import { OrderFilterDto } from './dto/order-filter.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
    @Inject('PriceCalculatorInterface')
    private readonly priceCalculator: PriceCalculatorInterface,
  ) {}
  async createOrder(orderData) {
    console.log('order data: ', orderData);
    const totalPrice = this.priceCalculator.calculateTotalPrice(
      orderData.packages,
    );
    // NOTE: we can also check the fact that pickup and dropoff locations aren't the same
    const order = new this.orderModel({
      dropoff: orderData.dropoff,
      pickup: orderData.pickup,
      packages: orderData.packages,
      total_price: totalPrice,
      status: OrderStatus.Created,
    });

    const createdOrder = await order.save();

    return {
      _id: createdOrder._id,
      status: createdOrder.status,
      total_price: createdOrder.total_price,
    };
  }

  getOrder(id: Types.ObjectId) {
    return this.orderModel.findOne({ _id: id });
  }

  getOrders(filter: OrderFilterDto, projectFields = null, justIds = true) {
    const query = this.orderModel.aggregate().match({
      'dropoff.zipcode': filter.dropoff_zipcode,
      'dropoff.address': {
        $regex: filter.dropoff_address,
        $options: 'i',
      },
    });
    if (projectFields) {
      query.project(projectFields);
    }
    if (justIds) {
      query
        .group({
          _id: null,
          results_ids: { $push: '$_id' },
        })
        .project({
          _id: 0,
        });
    }

    return query;
  }
  async updateOrderStatus(orderId: Types.ObjectId, newStatus: OrderStatus) {
    let possibleNewStatuses: OrderStatus[] = [];
    const order = await this.getOrder(orderId);
    if (!order) {
      throw new NotFoundException(`Order ${orderId} not found!`);
    }
    const oldStatus = order.status;
    switch (oldStatus) {
      case OrderStatus.Created:
        possibleNewStatuses = [OrderStatus.PickedUp, OrderStatus.Cancelled];
        break;
      case OrderStatus.PickedUp:
        possibleNewStatuses = [OrderStatus.Delivered, OrderStatus.Returning];
        break;
      case OrderStatus.Returning:
        possibleNewStatuses = [OrderStatus.Returned];
        break;
      case OrderStatus.Cancelled:
      case OrderStatus.Delivered:
      case OrderStatus.Returned:
        possibleNewStatuses = [];
        break;
      default:
        throw new InternalServerErrorException(
          'Something went wrong! Stored order status was invalid before update!',
        );
    }
    if (!possibleNewStatuses.includes(newStatus)) {
      throw new BadRequestException(
        `The order status cannot be updated from ${oldStatus} to ${newStatus}!`,
      );
    }

    const updatedOrder = await this.orderModel.findOneAndUpdate(
      { _id: orderId },
      {
        $set: {
          status: newStatus,
        },
      },
      {
        new: true,
      },
    );

    return { updatedOrder, oldStatus };
  }
}
