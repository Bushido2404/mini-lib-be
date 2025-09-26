import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patron, PatronDocument } from '../schemas/patron.schema';

@Injectable()
export class PatronRepository {
  constructor(@InjectModel(Patron.name) private patronModel: Model<PatronDocument>) {}

  async create(patron: Partial<Patron>): Promise<PatronDocument> {
    const newPatron = new this.patronModel(patron);
    return newPatron.save();
  }

  async findAll(): Promise<PatronDocument[]> {
    return this.patronModel.find().exec();
  }

  async findById(id: string): Promise<PatronDocument | null> {
    return this.patronModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<PatronDocument | null> {
    return this.patronModel.findOne({ email: email }).exec();
  }

  async update(id: string, patron: Partial<Patron>): Promise<PatronDocument | null> {
    return this.patronModel.findByIdAndUpdate(id, patron, { new: true }).exec();
  }

  async delete(id: string): Promise<PatronDocument | null> {
    return this.patronModel.findByIdAndDelete(id).exec();
  }
}
