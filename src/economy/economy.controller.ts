import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EconomyService } from './economy.service';
import { CreateEconomyDto } from './dto/create-economy.dto';
import { DateDTO } from 'src/common/dto/date-query.dto';

@Controller('economy')
export class EconomyController {
  constructor(private readonly economyService: EconomyService) {}

  @Post()
  create(@Body() createEconomyDto: CreateEconomyDto) {
    return this.economyService.create(createEconomyDto);
  }

  @Get()
  findAll() {
    return this.economyService.findAll();
  }

  @Get('month')
  findByMonth(@Body() dateDTO : DateDTO){
    return this.economyService.findByMonth(dateDTO.month, dateDTO.year);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.economyService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.economyService.remove(id);
  }
}
