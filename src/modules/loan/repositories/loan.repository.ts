import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BorrowingRecord, BorrowingRecordDocument } from '../schemas/borrowing-record.schema';

@Injectable()
export class LoanRepository {
  constructor(@InjectModel(BorrowingRecord.name) private loanModel: Model<BorrowingRecordDocument>) {}

  async create(loan: Partial<BorrowingRecord>): Promise<BorrowingRecordDocument | null> {
    const newLoan = new this.loanModel(loan);
    const savedLoan = await newLoan.save();

    const result = await this.loanModel.findById(savedLoan._id).populate('bookId').populate('patronId').exec();

    return result;
  }

  async findAll(): Promise<BorrowingRecordDocument[]> {
    return this.loanModel.find().populate('bookId').populate('patronId').exec();
  }

  async findById(id: string): Promise<BorrowingRecordDocument | null> {
    return this.loanModel.findById(id).populate('bookId').populate('patronId').exec();
  }

  async findByPatronAndBook(patronId: Types.ObjectId, bookId: Types.ObjectId): Promise<BorrowingRecordDocument | null> {
    return this.loanModel.findOne({ patronId, bookId }).populate('bookId').populate('patronId').exec();
  }

  async update(id: string, loan: Partial<BorrowingRecord>): Promise<BorrowingRecordDocument | null> {
    return this.loanModel.findByIdAndUpdate(id, loan, { new: true }).populate('bookId').populate('patronId').exec();
  }

  async delete(id: string): Promise<BorrowingRecordDocument | null> {
    return this.loanModel.findByIdAndDelete(id).populate('bookId').populate('patronId').exec();
  }
}
