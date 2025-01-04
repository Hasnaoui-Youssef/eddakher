import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateExpenseDto {
    @IsOptional()
    @IsString()
    description : string;

    @IsNotEmpty()
    @IsString()
    clientName : string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(["virement", "check", "cash"])
    paymentMethod : string;

    @IsNotEmpty()
    paymentDetails : CreateVirementDto | CreateCashDto | CreateCheckDto;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    date : Date = new Date();

}

class CreateVirementDto {
    @IsNotEmpty()
    @IsString()
    RIB : string;

    @IsNotEmpty()
    @IsNumber()
    bankFee : number;

    @IsNotEmpty()
    @IsNumber()
    price : number;
}
class CreateCheckDto {
    @IsNotEmpty()
    @IsString()
    checkNumber : string;

    @IsNotEmpty()
    @IsNumber()
    price : number;
}

class CreateCashDto {
    @IsNotEmpty()
    @IsNumber()
    price : number;
}
