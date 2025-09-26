import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BookRepository } from '../repositories/book.repository';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Types } from 'mongoose';
@Injectable()
export class BookService {
  constructor(private bookRepository: BookRepository) {}

  async create(createBookDto: CreateBookDto) {
    try {
      const isExist = await this.bookRepository.findByIsbn(createBookDto.isbn);
      if (isExist) throw new BadRequestException('Book with this isbn already exists');
      return this.bookRepository.create(createBookDto);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error creating book', { cause: error });
    }
  }

  async findAll() {
    try {
      return this.bookRepository.findAll();
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error updating user', { cause: error });
    }
  }

  async findOne(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid id');
      const book = await this.bookRepository.findById(id);
      if (!book) throw new NotFoundException('Book not found');
      return book;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error updating user', { cause: error });
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    try {
      if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid id');
      const book = await this.bookRepository.update(id, updateBookDto);
      if (!book) throw new NotFoundException('Book not found');
      return book;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error updating book', { cause: error });
    }
  }

  async remove(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid id');
      const book = await this.bookRepository.delete(id);
      if (!book) throw new NotFoundException('Book not found');
      return book;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error updating user', { cause: error });
    }
  }
}
