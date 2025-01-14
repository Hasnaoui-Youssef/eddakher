import { Body, Controller, Inject, Post } from '@nestjs/common';
import { DateDTO } from 'src/common/dto/date-query.dto';
import { MonthlyService } from './monthly.service';

@Controller('monthly')
export class MonthlyController {
    constructor(@Inject() private readonly monthlyService : MonthlyService){}

    @Post()
    getMonthlyReport(@Body() dateDTO : DateDTO){
        return this.monthlyService.getMonthlyReport(dateDTO.month, dateDTO.year);
    }
}
