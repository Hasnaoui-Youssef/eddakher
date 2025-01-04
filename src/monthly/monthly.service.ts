import { Inject, Injectable } from '@nestjs/common';
import { EconomyService } from 'src/economy/economy.service';
import { ExpensesService } from 'src/expenses/expenses.service';
import { RevenueService } from 'src/revenue/revenue.service';

@Injectable()
export class MonthlyService {
    constructor(
        @Inject() private readonly revenueService : RevenueService,
        @Inject() private readonly economyService : EconomyService,
        @Inject() private readonly expenseService : ExpensesService
    ){}

    async getMonthlyReport(month : number, year : number){
        const expenses = await this.expenseService.findByMonth(month, year);
        const economies = await this.economyService.findByMonth(month, year);
        const revenues = await this.revenueService.findByMonth(month, year);
        const totalGains  = revenues.reduce((acc, revenue) => acc + revenue.amount, 0) + economies.reduce((acc, ec) => acc + ec.amount, 0);
        const totalExpenses = expenses.reduce((acc, exp) => acc + exp.paymentDetails.price, 0);
        return {
            expenses,
            economies,
            revenues,
            totalGains,
            totalExpenses,
            net : totalGains - totalExpenses
        }
    }
}
