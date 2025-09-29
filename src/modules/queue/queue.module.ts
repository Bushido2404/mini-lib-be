import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from './services/queue.service';
import { EmailProcessor } from './processors/email.processor';
import { MailModule } from 'src/infrastructure/mail.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MailModule,
  ],
  providers: [QueueService, EmailProcessor],
  exports: [QueueService],
})
export class QueueModule {}
