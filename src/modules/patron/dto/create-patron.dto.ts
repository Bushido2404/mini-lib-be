import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class CreatePatronDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @MinLength(11)
  @IsOptional()
  phone?: string;
}
