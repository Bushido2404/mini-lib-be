import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { PatronService } from '../services/patron.services';
import { CreatePatronDto } from '../dto/create-patron.dto';
import { UpdatePatronDto } from '../dto/update-patron.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/role.guard';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { UserRole } from 'src/modules/user/constants/user.constant';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('patrons')
export class PatronController {
  constructor(private readonly patronService: PatronService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createPatronDto: CreatePatronDto) {
    return this.patronService.create(createPatronDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  async findAll() {
    return this.patronService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  async findOne(@Param('id') id: string) {
    return this.patronService.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id') id: string, @Body() updatePatronDto: UpdatePatronDto) {
    return this.patronService.update(id, updatePatronDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    return this.patronService.remove(id);
  }
}
