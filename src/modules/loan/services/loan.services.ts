import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LoanRepository } from '../repositories/loan.repository';
import { CreateLoanDto } from '../dto/create-loan.dto';
import { UpdateLoanDto } from '../dto/update-loan.dto';
import { Types } from 'mongoose';

@Injectable()
export class LoanService {
  constructor(private loanRepository: LoanRepository) {}

  async create(createLoanDto: CreateLoanDto) {
    try {
      if (!Types.ObjectId.isValid(createLoanDto.bookId) || !Types.ObjectId.isValid(createLoanDto.patronId)) {
        throw new BadRequestException('Invalid id');
      }
      const isExist = await this.loanRepository.findByPatronAndBook(createLoanDto.patronId, createLoanDto.bookId);
      if (isExist) throw new BadRequestException('Loan already exists');
      return this.loanRepository.create(createLoanDto);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error creating loan', { cause: error });
    }
  }

  async findAll() {
    try {
      return this.loanRepository.findAll();
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error fetching loans', { cause: error });
    }
  }

  async findOne(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid id');
      }
      const loan = await this.loanRepository.findById(id);
      if (!loan) {
        throw new NotFoundException('Loan not found');
      }
      return loan;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error fetching loan', { cause: error });
    }
  }

  async update(id: string, updateLoanDto: UpdateLoanDto) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid id');
      }
      const isExist = await this.loanRepository.findById(id);
      if (isExist && isExist.returnDate) {
        throw new BadRequestException('Loan already returned');
      }
      const loan = await this.loanRepository.update(id, updateLoanDto);
      if (!loan) {
        throw new NotFoundException('Loan not found');
      }
      return loan;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error updating loan', { cause: error });
    }
  }

  async remove(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid id');
      }
      const loan = await this.loanRepository.delete(id);
      if (!loan) {
        throw new NotFoundException('Loan not found');
      }
      return loan;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error deleting loan', { cause: error });
    }
  }
}
