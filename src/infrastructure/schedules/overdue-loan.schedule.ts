import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LoanService } from '../../modules/loan/services/loan.services';
import { QueueService } from '../../modules/queue/services/queue.service';

@Injectable()
export class OverdueLoanSchedule {
  constructor(
    private loanService: LoanService,
    private queueService: QueueService
  ) {}

  @Cron('0 0 * * *') // Setiap hari jam 12 malam
  async sendReturnReminders() {
    console.log('Running daily return reminder job...');

    try {
      const unreturnedLoans = await this.loanService.findUnreturnedLoans();
      console.log(`Found ${unreturnedLoans.length} unreturned loans`);

      for (const loan of unreturnedLoans) {
        const patron = loan.patronId as any;
        const book = loan.bookId as any;

        if (patron?.email) {
          await this.queueService.sendEmail({
            to: patron.email,
            subject: 'Reminder: Buku Harus Dikembalikan',
            body: `Halo ${patron.firstName || 'Peminjam'}, buku "${book?.title || 'Unknown'}" yang Anda pinjam pada tanggal ${new Date(loan.borrowedDate).toLocaleDateString()} belum dikembalikan. Mohon segera dikembalikan ke perpustakaan.`,
          });
          console.log(`Reminder sent to ${patron.email}`);
        }
      }

      console.log('Return reminder job completed');
    } catch (error) {
      console.error('Error in return reminder job:', error);
    }
  }
}
