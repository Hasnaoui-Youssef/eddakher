import { Module } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { RevenueController } from './revenue.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Revenue, RevenueSchema } from './revenue.schema';

@Module({
  imports : [
    MongooseModule.forFeature([{
      name : Revenue.name, schema : RevenueSchema
    }])
  ],
  controllers: [RevenueController],
  providers: [RevenueService],
  exports : [RevenueService],
})
export class RevenueModule {}
