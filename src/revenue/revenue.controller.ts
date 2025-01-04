import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { DateDTO } from 'src/common/dto/date-query.dto';

@Controller('revenue')
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}

  @Post()
  create(@Body() createRevenueDto: CreateRevenueDto) {
    return this.revenueService.create(createRevenueDto);
  }

  @Get()
  findAll() {
    return this.revenueService.findAll();
  }

  @Get('month')
  findByMonth(@Body() dateDTO : DateDTO){
    return this.revenueService.findByMonth(dateDTO.month, dateDTO.year);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.revenueService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.revenueService.remove(id);
  }
}
