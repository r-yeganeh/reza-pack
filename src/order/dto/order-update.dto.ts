import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../../types';

export class OrderUpdateDto {
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
