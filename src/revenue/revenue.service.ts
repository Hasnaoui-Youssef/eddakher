import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Revenue } from './revenue.schema';
import { Model } from 'mongoose';

@Injectable()
export class RevenueService {
  private readonly logger = new Logger(RevenueService.name)

  constructor(@InjectModel(Revenue.name) private readonly RevenueModel : Model<Revenue>){}

  async create(createRevenueDto: CreateRevenueDto) {
    try{
      const revenue = new this.RevenueModel(createRevenueDto);
      const savedRevenue = await revenue.save();
      return savedRevenue;
    }catch(error){
      this.logger.error(`Failed to create revenue : ${error}`);
      throw new BadRequestException(`Unable to create revenue ${error.message}`);
    }
  }

  async findAll() {
    try{
      const revenues = await this.RevenueModel.find();
      return revenues;
    }catch(error){
      this.logger.error(`Failed to find revenues : ${error}`);
      throw new BadRequestException(`Unable to find revenues ${error.message}`);
    }
  }

  async findOne(id: string) {
    try{
      const revenue = await this.RevenueModel.findById(id);
      return revenue;
    }catch(error){
      this.logger.error(`Failed to find revenue : ${error}`);
      throw new BadRequestException(`Unable to find revenue ${error.message}`);
    }
  }

  async findByMonth(month : number, year : number){
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 1);
    const revenues = await this.RevenueModel.find( { date : { "$gte" : startOfMonth , "$lte" : endOfMonth }})
    return revenues;
  }


  async remove(id: string) {
    try{
      const revenue = await this.RevenueModel.findByIdAndDelete(id);
      return revenue;
    }catch(error){
      this.logger.error(`Failed to delete revenue : ${error}`);
      throw new BadRequestException(`Unable to delete revenue ${error.message}`);
    }
  }
}
