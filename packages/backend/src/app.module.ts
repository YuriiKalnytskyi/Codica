import { Module } from '@nestjs/common';import { AppController } from './app.controller';import { CommonModule } from './module/common/common.module';import { BankModule } from './module/bank/bank.module';import { TransactionModule } from './module/transaction/transaction.module';import { CategoryModule } from './module/category/category.module';import { StatisticsModule } from './module/statistics/statistics.module';@Module({  imports: [CommonModule, BankModule, TransactionModule, CategoryModule, StatisticsModule],  controllers: [AppController]})export class AppModule {}