import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PatronRepository } from '../repositories/patron.repository';
import { CreatePatronDto } from '../dto/create-patron.dto';
import { UpdatePatronDto } from '../dto/update-patron.dto';
import { Types } from 'mongoose';

@Injectable()
export class PatronService {
  constructor(private patronRepository: PatronRepository) {}

  async create(createPatronDto: CreatePatronDto) {
    try {
      const isExist = await this.patronRepository.findByEmail(createPatronDto.email);
      if (isExist) throw new BadRequestException('Patron with this email already exists');
      return this.patronRepository.create(createPatronDto);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error creating patron', { cause: error });
    }
  }

  async findAll() {
    try {
      return this.patronRepository.findAll();
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
      const patron = await this.patronRepository.findById(id);
      if (!patron) throw new NotFoundException('Patron not found');
      return patron;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error updating user', { cause: error });
    }
  }

  async update(id: string, updatePatronDto: UpdatePatronDto) {
    try {
      if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid id');
      const patron = await this.patronRepository.update(id, updatePatronDto);
      if (!patron) throw new NotFoundException('Patron not found');
      return patron;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error updating patron', { cause: error });
    }
  }

  async remove(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid id');
      const patron = await this.patronRepository.delete(id);
      if (!patron) throw new NotFoundException('Patron not found');
      return patron;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error updating user', { cause: error });
    }
  }
}
