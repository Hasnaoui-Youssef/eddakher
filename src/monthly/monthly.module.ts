import { Module } from '@nestjs/common';
import { MonthlyService } from './monthly.service';
import { ExpensesModule } from 'src/expenses/expenses.module';
import { EconomyModule } from 'src/economy/economy.module';
import { RevenueModule } from 'src/revenue/revenue.module';
import { MonthlyController } from './monthly.controller';

@Module({
  imports : [ExpensesModule, EconomyModule, RevenueModule],
  providers: [MonthlyService],
  controllers: [MonthlyController]
})
export class MonthlyModule {}
