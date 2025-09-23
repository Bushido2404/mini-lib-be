// src/modules/user/services/user.service.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.update(id, updateUserDto);
    if (!user) throw new Error('User not found');
    return user;
  }

  async remove(id: string) {
    const user = await this.userRepository.delete(id);
    if (!user) throw new Error('User not found');
    return user;
  }
}
