import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../schemas/book.schema';

@Injectable()
export class BookRepository {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(book: Partial<Book>): Promise<BookDocument> {
    const newBook = new this.bookModel(book);
    return newBook.save();
  }

  async findAll(): Promise<BookDocument[]> {
    return this.bookModel.find().exec();
  }

  async findById(id: string): Promise<BookDocument | null> {
    return this.bookModel.findById(id).exec();
  }

  async findByIsbn(isbn: string): Promise<BookDocument | null> {
    return this.bookModel.findOne({ isbn: isbn }).exec();
  }

  async update(id: string, book: Partial<Book>): Promise<BookDocument | null> {
    return this.bookModel.findByIdAndUpdate(id, book, { new: true }).exec();
  }

  async delete(id: string): Promise<BookDocument | null> {
    return this.bookModel.findByIdAndDelete(id).exec();
  }
}
