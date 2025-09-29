import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoanController } from './controllers/loan.controller';
import { LoanService } from './services/loan.services';
import { LoanRepository } from './repositories/loan.repository';
import { BorrowingRecord, BorrowingRecordSchema } from './schemas/borrowing-record.schema';
import { AuthModule } from '../auth/auth.module';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [
    AuthModule,
    QueueModule,
    MongooseModule.forFeature([{ name: BorrowingRecord.name, schema: BorrowingRecordSchema }]),
  ],
  controllers: [LoanController],
  providers: [LoanService, LoanRepository],
  exports: [LoanService],
})
export class LoanModule {}
