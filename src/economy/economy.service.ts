import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateEconomyDto } from './dto/create-economy.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Economy } from './economy.schema';
import { Model } from 'mongoose';

@Injectable()
export class EconomyService {
  
  private readonly logger = new Logger(EconomyService.name)

  constructor(@InjectModel(Economy.name) private readonly EconomyModel : Model<Economy>){}

  async create(createEconomyDto: CreateEconomyDto) {
    try{
      const economy = new this.EconomyModel(createEconomyDto);
      const savedEconomy = await economy.save();
      return savedEconomy;
    }catch(error){
      this.logger.error(`Failed to create economy : ${error}`);
      throw new BadRequestException(`Unable to create economy ${error.message}`);
    }
  }

  async findAll() {
    try{
     const economies = await this.EconomyModel.find();
     return economies;
    }catch(error){
      this.logger.error(`Failed to find economies : ${error}`);
      throw new BadRequestException(`Unable to find economies ${error.message}`);
    }
  }

  async findOne(id: string) {
    try{
     const economy = await this.EconomyModel.findById(id);
     return economy;
    }catch(error){
      this.logger.error(`Failed to find economy : ${error}`);
      throw new BadRequestException(`Unable to find economy ${error.message}`);
    }
  }
  
  async findByMonth( month : number, year : number){
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 1);
    const economies = this.EconomyModel.find({ date : { "$gte" : startOfMonth , "$lte" : endOfMonth }})
    return economies;
  }

  async remove(id: string) {
    try{
     const economy = await this.EconomyModel.findByIdAndDelete(id);
     return economy;
    }catch(error){
      this.logger.error(`Failed to delete economy : ${error}`);
      throw new BadRequestException(`Unable to delete economy ${error.message}`);
    }
  }
}
