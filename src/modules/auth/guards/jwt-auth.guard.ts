import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '../services/jwt.service';
import { AuthRequest } from '../../../common/interfaces/auth.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const request = context.switchToHttp().getRequest<AuthRequest>();
      const authHeader = request.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Missing or invalid token');
      }
      const token = authHeader.split(' ')[1];
      const payload = this.jwtService.verify(token);
      request.user = payload;
      return true;
    } catch (error) {
      let message = '';
      if (error instanceof Error) {
        message = error.message;
      }
      throw new UnauthorizedException(`Token invalid: ${message}`);
    }
  }
}
