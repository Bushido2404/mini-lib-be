import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoanService } from '../services/loan.services';
import { CreateLoanDto } from '../dto/create-loan.dto';
import { UpdateLoanDto } from '../dto/update-loan.dto';

@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createLoanDto: CreateLoanDto) {
    return this.loanService.create(createLoanDto);
  }

  @Get()
  async findAll() {
    return this.loanService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.loanService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loanService.update(id, updateLoanDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.loanService.remove(id);
  }
}
