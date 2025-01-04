import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRevenueDto {
    @IsNotEmpty()
    @IsString()
    clientName : string;

    @IsOptional()
    @IsString()
    description : string;

    @IsNotEmpty()
    @IsNumber()
    amount : number;
    
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    date : Date = new Date();
}
