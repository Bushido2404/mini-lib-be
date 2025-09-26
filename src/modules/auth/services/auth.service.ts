import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../user/services/user.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtPayload } from '../dto/jwt-payload-interface';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(dto: LoginUserDto) {
    try {
      // Cek user exists dengan username
      const user = (await this.userService.findOneByUsername(dto.username)) as {
        id: string;
        username: string;
        password: string;
        role: string;
      };
      if (!user) {
        throw new NotFoundException('Username not found');
      }

      // Cek password valid
      const isPasswordValid = await bcrypt.compare(dto.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Generate JWT
      const payload: JwtPayload = {
        id: user.id,
        username: user.username,
        role: user.role,
      };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (error instanceof UnauthorizedException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Error logging in', { cause: error });
    }
  }
}
