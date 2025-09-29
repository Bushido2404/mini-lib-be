import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';
import { UserModule } from './modules/user/user.module';
import { BookModule } from './modules/book/book.module';
import { PatronModule } from './modules/patron/patron.module';
import { LoanModule } from './modules/loan/loan.module';
import { AuthModule } from './modules/auth/auth.module';
import { QueueModule } from './modules/queue/queue.module';
import { ScheduleModule } from '@nestjs/schedule';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    DatabaseModule,
    UserModule,
    AuthModule,
    BookModule,
    PatronModule,
    LoanModule,
    QueueModule,
    InfrastructureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
