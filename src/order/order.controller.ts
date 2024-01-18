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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Order')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({
    summary: 'create order',
    description: 'Enter order attributes to create it',
  })
  @ApiBody({ type: OrderCreationDto })
  createOrder(@Body() orderCreationDto: OrderCreationDto) {
    // toDo: authenticate user on a production environment
    console.log('orderCreationDto: ', orderCreationDto);
    return this.orderService.createOrder(orderCreationDto);
  }

  @ApiOperation({
    summary: 'update order status',
    description: 'Enter a new valid status for the order',
  })
  @ApiParam({ name: '_id', description: 'order id', type: String })
  @ApiBody({ type: OrderUpdateDto })
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

  @ApiOperation({
    summary: 'get orders by dropoff details',
    description: 'Enter dropoff zipcode and address',
  })
  @ApiQuery({ name: 'dropoff_zipcode', type: String })
  @ApiQuery({ name: 'dropoff_address', type: String })
  @Get()
  async getOrders(@Query() orderFilterDto: OrderFilterDto) {
    // NOTE: authenticate user on a production environment
    console.log('orderFilterDto: ', orderFilterDto);
    const result = await this.orderService.getOrders(orderFilterDto, {
      _id: 1,
    });
    console.log('result:', result);

    return result.length > 0 ? result[0] : { results_ids: [] };
  }
}
