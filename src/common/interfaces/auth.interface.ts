import { Request } from 'express';
import { JwtPayload } from 'src/modules/auth/dto/jwt-payload-interface';

export interface AuthRequest extends Request {
  user: JwtPayload;
}
