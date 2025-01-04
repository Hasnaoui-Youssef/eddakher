import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';
import { ExpensesModule } from './expenses/expenses.module';
import { RevenueModule } from './revenue/revenue.module';
import { EconomyModule } from './economy/economy.module';
import { MonthlyModule } from './monthly/monthly.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal : true
  }),
  MongooseModule.forRoot(process.env.MONGO_URI),
  ExpensesModule,
  RevenueModule,
  EconomyModule,
  MonthlyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
