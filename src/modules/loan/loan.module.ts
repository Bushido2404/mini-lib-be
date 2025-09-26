import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoanController } from './controllers/loan.controller';
import { LoanService } from './services/loan.services';
import { LoanRepository } from './repositories/loan.repository';
import { BorrowingRecord, BorrowingRecordSchema } from './schemas/borrowing-record.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: BorrowingRecord.name, schema: BorrowingRecordSchema }])],
  controllers: [LoanController],
  providers: [LoanService, LoanRepository],
})
export class LoanModule {}
