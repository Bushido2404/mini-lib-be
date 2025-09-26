import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BorrowingRecordDocument = BorrowingRecord & Document;

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'lastModifiedDate',
  },
})
export class BorrowingRecord {
  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  bookId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Patron', required: true })
  patronId: Types.ObjectId;

  @Prop({ required: true })
  borrowedDate: Date;

  @Prop()
  returnDate?: Date;
}

export const BorrowingRecordSchema = SchemaFactory.createForClass(BorrowingRecord);
