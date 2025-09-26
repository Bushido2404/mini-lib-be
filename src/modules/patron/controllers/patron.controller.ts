import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { PatronService } from '../services/patron.services';
import { CreatePatronDto } from '../dto/create-patron.dto';
import { UpdatePatronDto } from '../dto/update-patron.dto';

@Controller('patrons')
export class PatronController {
  constructor(private readonly patronService: PatronService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createPatronDto: CreatePatronDto) {
    return this.patronService.create(createPatronDto);
  }

  @Get()
  async findAll() {
    return this.patronService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.patronService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id') id: string, @Body() updatePatronDto: UpdatePatronDto) {
    return this.patronService.update(id, updatePatronDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.patronService.remove(id);
  }
}
