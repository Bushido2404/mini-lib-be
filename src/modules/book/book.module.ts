import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from './controllers/book.controller';
import { BookService } from './services/book.services';
import { BookRepository } from './repositories/book.repository';
import { Book, BookSchema } from './schemas/book.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])],
  controllers: [BookController],
  providers: [BookService, BookRepository],
})
export class BookModule {}
