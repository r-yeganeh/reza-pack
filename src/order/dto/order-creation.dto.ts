import { TransportLabelDto } from './transport-label.dto';
import { PackageDto } from './package.dto';
import { ArrayMinSize, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderCreationDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TransportLabelDto)
  dropoff: TransportLabelDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TransportLabelDto)
  pickup: TransportLabelDto;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PackageDto)
  @ArrayMinSize(1, { message: 'There must be at least 1 package' })
  packages: PackageDto[];
}
