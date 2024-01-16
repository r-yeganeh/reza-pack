import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  createOrder(orderData: {
    customerName: string;
    packages: { name: string; weight: number }[];
  }) {
    console.log('order data: ', orderData);
  }
}
