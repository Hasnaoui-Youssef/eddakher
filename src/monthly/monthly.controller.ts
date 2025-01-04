import { Body, Controller, Get, Inject } from '@nestjs/common';
import { DateDTO } from 'src/common/dto/date-query.dto';
import { MonthlyService } from './monthly.service';

@Controller('monthly')
export class MonthlyController {
    constructor(@Inject() private readonly monthlyService : MonthlyService){}

    @Get()
    getMonthlyReport(@Body() dateDTO : DateDTO){
        return this.monthlyService.getMonthlyReport(dateDTO.month, dateDTO.year);
    }
}
