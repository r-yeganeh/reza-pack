import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../../types';
import { ApiProperty } from "@nestjs/swagger";
import { TransportLabelDto } from "./transport-label.dto";

export class OrderUpdateDto {
  @ApiProperty({ required: true, default: '' })
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
