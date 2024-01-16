import { IsNotEmpty, IsString, MinLength } from 'class-validator';
const MIN_ACCEPTABLE_ADDRESS_FILTER_LENGTH = 5;

export class OrderFilterDto {
  @IsNotEmpty()
  @IsString()
  dropoff_zipcode: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(MIN_ACCEPTABLE_ADDRESS_FILTER_LENGTH, {
    message: `Address filter must be at least ${MIN_ACCEPTABLE_ADDRESS_FILTER_LENGTH} characters!`,
  })
  dropoff_address: string;
}
