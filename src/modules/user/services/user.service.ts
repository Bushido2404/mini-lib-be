import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const isExist = await this.userRepository.findByUsername(createUserDto.username);
      if (isExist) throw new BadRequestException('User already exists');
      const hashPassword = await bcrypt.hash(createUserDto.password, 10);
      return this.userRepository.create({ ...createUserDto, password: hashPassword });
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error creating user', { cause: error });
    }
  }

  async findAll() {
    try {
      return this.userRepository.findAll();
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error updating user', { cause: error });
    }
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid id');
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findOneByUsername(username: string) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid id');
      if (updateUserDto.username) {
        const existingUser = await this.userRepository.findByUsername(updateUserDto.username);
        if (existingUser) throw new BadRequestException('User with this username already exists');
      }
      const user = await this.userRepository.update(id, updateUserDto);
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error updating user', { cause: error });
    }
  }

  async remove(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid id');
      const user = await this.userRepository.delete(id);
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error updating user', { cause: error });
    }
  }
}
