import { IsNotEmpty, IsNumber } from "class-validator";

export class DateDTO{
    @IsNotEmpty()
    @IsNumber()
    month : number;

    @IsNotEmpty()
    @IsNumber()
    year : number;
}