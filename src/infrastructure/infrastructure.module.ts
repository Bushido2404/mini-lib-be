import { Module } from '@nestjs/common';
import { OverdueLoanSchedule } from './schedules/overdue-loan.schedule';
import { MailerService } from './mail/mailer.service';
import { LoanModule } from '../modules/loan/loan.module';
import { QueueModule } from '../modules/queue/queue.module';

@Module({
  imports: [LoanModule, QueueModule],
  providers: [OverdueLoanSchedule, MailerService],
  exports: [MailerService],
})
export class InfrastructureModule {}
