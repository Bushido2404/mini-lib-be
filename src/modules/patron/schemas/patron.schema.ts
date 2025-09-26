import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PatronDocument = Patron & Document;

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'lastModifiedDate',
  },
})
export class Patron {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  phone?: string;
}

export const PatronSchema = SchemaFactory.createForClass(Patron);
