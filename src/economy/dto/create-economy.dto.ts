import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEconomyDto {
    @IsNotEmpty()
    @IsNumber()
    amount : number;

    @IsNotEmpty()
    @IsString()
    description : string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    date : Date = new Date();
}
