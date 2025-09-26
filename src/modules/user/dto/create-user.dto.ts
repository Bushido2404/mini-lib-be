import { IsString, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from '../constants/user.constant';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsEnum(UserRole)
  role?: UserRole;
}
