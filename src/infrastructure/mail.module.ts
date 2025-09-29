import { Module } from '@nestjs/common';
import { MailerService } from './mail/mailer.service';

@Module({
  providers: [MailerService],
  exports: [MailerService],
})
export class MailModule {}
