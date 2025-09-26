import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { JwtPayload } from '../dto/jwt-payload-interface';

@Injectable()
export class JwtService {
  constructor(private jwt: NestJwtService) {}

  sign(payload: JwtPayload): string {
    return this.jwt.sign(payload);
  }

  verify(token: string): JwtPayload {
    return this.jwt.verify(token);
  }
}
