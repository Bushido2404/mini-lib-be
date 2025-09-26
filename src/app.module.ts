import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';
import { UserModule } from './modules/user/user.module';
import { BookModule } from './modules/book/book.module';
import { PatronModule } from './modules/patron/patron.module';
import { LoanModule } from './modules/loan/loan.module';
@Module({
  imports: [DatabaseModule, UserModule, BookModule, PatronModule, LoanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
