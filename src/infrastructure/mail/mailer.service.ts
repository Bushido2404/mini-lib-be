import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailerService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendMail(to: string, subject: string, text: string) {
    await this.resend.emails.send({
      from: process.env.MAIL_FROM as string,
      to,
      subject,
      text,
    });
  }
}
