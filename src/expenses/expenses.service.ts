import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './expenses.schema';
import { Model } from 'mongoose';

@Injectable()
export class ExpensesService {
  private readonly logger = new Logger(ExpensesService.name);

  constructor(@InjectModel(Expense.name) private readonly ExpenseModel : Model<Expense>) {

  }


  async create(createExpenseDto: CreateExpenseDto) : Promise<Expense> {
    try{
      const expense = new this.ExpenseModel(createExpenseDto);
      const savedExpense = await expense.save();
      return savedExpense;

    }catch(error){
      this.logger.error(`Failed to create new expense : ${error}`)
      throw new BadRequestException(`Cannot create new expense : ${error.message}`)
    }

  }

  async findAll() : Promise<Expense[]> {
    try{
      const expenses = await this.ExpenseModel.find();
      return expenses;
    }catch(error){ 
      this.logger.error(`Failed to find expenses : ${error}`)
      throw new InternalServerErrorException(`Cannot find expenses : ${error.message}`)
    }
  }

  async findOne(id: string) : Promise<Expense> {
    try{
      const expense = await this.ExpenseModel.findById(id);
      return expense;
    }catch(error){ 
      this.logger.error(`Failed to find expense : ${error}`)
      throw new NotFoundException(`Cannot find expense : ${error.message}`)
    }
  }

  async findByMonth(month : number, year : number){
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 1);
    const expenses = this.ExpenseModel.find({ date : { "$gte" : startOfMonth, "$lte" : endOfMonth}})
    return expenses;
  }

  async remove(id: string) : Promise<Expense> {
    try{
      const expense = await this.ExpenseModel.findByIdAndDelete(id);
      return expense;
    }catch(error){
      this.logger.error(`Failed to delete expense : ${error}`)
      throw new NotFoundException(`Cannot delete expense : ${error.message}`)
    }
  }
}
