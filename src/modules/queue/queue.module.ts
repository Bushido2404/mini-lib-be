import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from './services/queue.service';
import { EmailProcessor } from './processors/email.processor';
import { MailerService } from '../../infrastructure/mail/mailer.service';
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  providers: [QueueService, EmailProcessor, MailerService],
  exports: [QueueService],
})
export class QueueModule {}
