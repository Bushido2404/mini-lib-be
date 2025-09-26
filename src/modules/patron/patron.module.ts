import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatronController } from './controllers/patron.controller';
import { PatronService } from './services/patron.services';
import { PatronRepository } from './repositories/patron.repository';
import { Patron, PatronSchema } from './schemas/patron.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Patron.name, schema: PatronSchema }])],
  controllers: [PatronController],
  providers: [PatronService, PatronRepository],
})
export class PatronModule {}
