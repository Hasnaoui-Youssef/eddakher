import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps : true})
export class Revenue{

    @Prop({required : true})
    clientName : string;

    @Prop({required : true})
    description : string;

    @Prop({required : true})
    amount : number;

    @Prop({required : true, type : Date, default : new Date() })
    date : Date;
}

export const RevenueSchema = SchemaFactory.createForClass(Revenue);