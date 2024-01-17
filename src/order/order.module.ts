import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { SimplePriceCalculator } from './simple.price.calculator.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { CONNECTION_STRING, TEST_CONNECTION_STRING } from '../configuration';
// import { PriceCalculatorInterface } from './interface/PriceCalculatorInterface';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.NODE_ENV === 'test'
        ? TEST_CONNECTION_STRING
        : CONNECTION_STRING,
    ),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    { provide: 'PriceCalculatorInterface', useClass: SimplePriceCalculator },
  ],
})
export class OrderModule {}
