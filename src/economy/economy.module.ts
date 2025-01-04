import { Module } from '@nestjs/common';
import { EconomyService } from './economy.service';
import { EconomyController } from './economy.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Economy, EconomySchema } from './economy.schema';

@Module({
  imports : [
    MongooseModule.forFeature([{
      name : Economy.name, schema : EconomySchema
    }])
  ],
  controllers: [EconomyController],
  providers: [EconomyService],
  exports : [EconomyService],
})
export class EconomyModule {}
