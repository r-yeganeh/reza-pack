import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderCreationDto } from './dto/order-creation.dto';
import { Types } from 'mongoose';
import { OrderUpdateDto } from './dto/order-update.dto';
import { OrderFilterDto } from './dto/order-filter.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() orderCreationDto: OrderCreationDto) {
    // toDo: authenticate user on a production environment
    console.log('orderCreationDto: ', orderCreationDto);
    return this.orderService.createOrder(orderCreationDto);
  }

  @Patch(':_id/status') // NOTE: I could have also used PUT (but this is a partial update)
  async updateOrderStatus(
    @Param('_id') orderId: Types.ObjectId,
    @Body() orderUpdateDto: OrderUpdateDto,
  ) {
    console.log('orderUpdateDto: ', orderUpdateDto);
    const { updatedOrder, oldStatus } =
      await this.orderService.updateOrderStatus(orderId, orderUpdateDto.status);
    console.log('updated order:', updatedOrder);

    return {
      message: 'Order status updated!',
      order_id: updatedOrder._id,
      new_status: updatedOrder.status,
      old_status: oldStatus,
    };
  }

  @Get()
  async getOrders(@Query() orderFilterDto: OrderFilterDto) {
    // toDo: authenticate user on a production environment
    console.log('orderFilterDto: ', orderFilterDto);
    const result = await this.orderService.getOrders(orderFilterDto, {
      _id: 1,
    });
    console.log('result:', result);

    return result.length > 0 ? result[0] : { results_ids: [] };
  }
}
