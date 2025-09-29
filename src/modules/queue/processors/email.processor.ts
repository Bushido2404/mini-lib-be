import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import { SendEmailJob } from '../contracts/send-email.contract';
import { MailerService } from '../../../infrastructure/mail/mailer.service';
@Processor('email')
export class EmailProcessor {
  constructor(private readonly emailService: MailerService) {}
  @Process('send')
  async handleEmail(job: Job<SendEmailJob>) {
    const { to, subject, body } = job.data;
    try {
      await this.emailService.sendMail(to, subject, body);
    } catch (error) {
      throw new Error('Error sending email', { cause: error });
    }
  }
}
