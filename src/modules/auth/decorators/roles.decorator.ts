import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/modules/user/constants/user.constant';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
