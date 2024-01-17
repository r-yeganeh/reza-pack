import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../order.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';
import { PriceCalculatorInterface } from '../interface/PriceCalculatorInterface';
import { SimplePriceCalculator } from '../simple.price.calculator.service';
import { OrderController } from '../order.controller';

export const createTestingModule = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      OrderService,
      {
        provide: getModelToken('Order'), // Use getModelToken to provide OrderModel
        useValue: {}, // Mock OrderModel or use a real one if available
      },
      {
        provide: 'PriceCalculatorInterface',
        useClass: SimplePriceCalculator,
      },
    ],
    controllers: [OrderController],
  }).compile();

  const orderService: OrderService = module.get<OrderService>(OrderService);
  const orderModel: Model<Order> = module.get<Model<Order>>(
    getModelToken('Order'),
  ); // Retrieve the OrderModel
  const priceCalculator: PriceCalculatorInterface =
    module.get<PriceCalculatorInterface>('PriceCalculatorInterface'); // Retrieve the interface
  const orderController: OrderController =
    module.get<OrderController>(OrderController);

  return { orderService, orderModel, orderController, priceCalculator };
};
