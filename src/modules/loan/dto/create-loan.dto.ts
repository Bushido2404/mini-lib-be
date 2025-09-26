import { IsDate, IsMongoId, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class CreateLoanDto {
  @IsMongoId()
  bookId: Types.ObjectId;

  @IsMongoId()
  patronId: Types.ObjectId;

  @IsDate()
  @Type(() => Date)
  borrowedDate: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  returnDate?: Date;
}
