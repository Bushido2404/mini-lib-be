import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { BookService } from '../services/book.services';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { bookCoverInterceptor } from '../../../common/interceptor/book-cover.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { Res } from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'path';
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  async findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Put(':id/cover')
  @UseInterceptors(FileInterceptor('cover', bookCoverInterceptor))
  async uploadCover(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Cover is required');
    }
    return this.bookService.updateCover(id, file.filename);
  }

  @Get(':id/download-cover')
  async downloadCover(@Param('id') id: string, @Res() res: Response) {
    const book = await this.bookService.findOne(id);
    if (!book) {
      throw new BadRequestException('Book not found');
    }
    console.log(book);
    if (book && !book.cover) {
      throw new BadRequestException('Book cover not found');
    }
    const filePath = join(process.cwd(), 'storages', 'covers', book.cover as string);
    console.log(filePath);
    return res.download(filePath, `${book.cover}`);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
