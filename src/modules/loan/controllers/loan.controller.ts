import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { LoanService } from '../services/loan.services';
import { CreateLoanDto } from '../dto/create-loan.dto';
import { UpdateLoanDto } from '../dto/update-loan.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/role.guard';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { UserRole } from 'src/modules/user/constants/user.constant';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.USER)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createLoanDto: CreateLoanDto) {
    return this.loanService.create(createLoanDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  async findAll() {
    return this.loanService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.USER)
  async findOne(@Param('id') id: string) {
    return this.loanService.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loanService.update(id, updateLoanDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    return this.loanService.remove(id);
  }
}
