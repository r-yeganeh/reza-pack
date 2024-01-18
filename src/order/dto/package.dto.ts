import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PackageDto {
  @ApiProperty({ default: 50, required: true })
  @IsNumber()
  @IsPositive()
  height: number;

  @ApiProperty({ default: 20, required: true })
  @IsNumber()
  @IsPositive()
  length: number;

  @ApiProperty({ default: 10, required: true })
  @IsNumber()
  @IsPositive()
  width: number;

  @ApiProperty({ default: 50, required: true })
  @IsNumber()
  @IsPositive()
  weight: number;
}
