import { PartialType } from '@nestjs/mapped-types';
import { CreateEconomyDto } from './create-economy.dto';

export class UpdateEconomyDto extends PartialType(CreateEconomyDto) {}
