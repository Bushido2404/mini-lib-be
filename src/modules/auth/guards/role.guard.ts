import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/modules/user/constants/user.constant';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>('roles', context.getHandler());

    if (!requiredRoles) {
      return true; // Jika tidak ada role yang diperlukan, izinkan akses
    }

    const request = context.switchToHttp().getRequest<{ user?: { role?: UserRole } }>();
    const userRole = request.user?.role;

    if (!userRole) {
      throw new ForbiddenException('User Role Not Found');
    }

    if (!requiredRoles.includes(userRole)) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
