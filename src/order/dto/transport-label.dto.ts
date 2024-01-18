import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';

export class TransportLabelDto {
  @ApiProperty({ default: 'Oudenoord 330', required: true })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ default: 'Utrecht', required: true })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ default: 'Netherlands', required: true })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ default: 'example@gmail.com', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'Name', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ default: '1234 AB', required: true })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{4}\s[A-Z]{2}$/, {
    message: 'Invalid zip code!',
  })
  zipcode: string;

  @ApiProperty({ default: '+31612795443', required: true })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phonenumber: string;
}
