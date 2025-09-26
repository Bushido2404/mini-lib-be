import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  @IsNotEmpty()
  publicationYear: number;

  @IsString()
  @IsNotEmpty()
  isbn: string;

  @IsString()
  @IsOptional()
  cover?: string;
}
