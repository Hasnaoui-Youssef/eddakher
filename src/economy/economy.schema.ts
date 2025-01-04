import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({timestamps : true})
export class Economy{
    @Prop({required : true})
    amount : number;

    @Prop({required : true})
    description : string;

    @Prop({required : true, type : Date, default : new Date()})
    date : Date;
}

export const EconomySchema = SchemaFactory.createForClass(Economy);