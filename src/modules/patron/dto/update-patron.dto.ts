import { PartialType } from '@nestjs/mapped-types';
import { CreatePatronDto } from './create-patron.dto';

export class UpdatePatronDto extends PartialType(CreatePatronDto) {}
