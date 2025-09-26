import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'lastModifiedDate',
  },
})
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  publicationYear: number;

  @Prop({ required: true, unique: true })
  isbn: string;

  @Prop()
  cover?: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
