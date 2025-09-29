import { Injectable } from '@nestjs/common';
import type { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { SendEmailJob } from '../contracts/send-email.contract';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('email') private readonly emailQueue: Queue) {}

  async sendEmail(job: SendEmailJob) {
    return this.emailQueue.add('send', job);
  }
}
