import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';
import { SimplePriceCalculator } from './simple-price-calculator.service';
import { PriceCalculatorInterface } from './interface/PriceCalculatorInterface';

describe('OrderService', () => {
  let service: OrderService;
  let orderModel: Model<Order>;
  let priceCalculator: PriceCalculatorInterface;

  beforeEach(async () => {
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
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderModel = module.get<Model<Order>>(getModelToken('Order')); // Retrieve the OrderModel
    priceCalculator = module.get<PriceCalculatorInterface>(
      'PriceCalculatorInterface',
    ); // Retrieve the interface
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
