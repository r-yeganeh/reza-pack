import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Matches } from "class-validator";

export class TransportLabelDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{4}\s[A-Z]{2}$/, {
    message: 'Invalid zip code!',
  })
  zipcode: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phonenumber: string;
}
