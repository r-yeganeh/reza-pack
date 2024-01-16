import { IsNumber, IsPositive } from "class-validator";

export class PackageDto {
  @IsNumber()
  @IsPositive()
  height: number;

  @IsNumber()
  @IsPositive()
  length: number;

  @IsNumber()
  @IsPositive()
  width: number;

  @IsNumber()
  @IsPositive()
  weight: number;
}
