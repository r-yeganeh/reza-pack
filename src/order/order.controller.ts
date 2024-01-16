import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(
    @Body()
    orderData: {
      customerName: string;
      packages: { name: string; weight: number }[];
    },
  ) {
    // toDo: authenticate user on a production environment
    console.log('salam ttttttt', orderData.packages);
    return this.orderService.createOrder(orderData);
  }
}
