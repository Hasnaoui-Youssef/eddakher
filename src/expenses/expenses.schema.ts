import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { PaymentMethod } from "src/common/enums/payment-method.enum";


@Schema({id : false})
class Virement  extends Document {
  @Prop({required : true})
  RIB : string;

  @Prop({required : true})
  bankFee : number;

  @Prop({required : true})
  price : number;
}


@Schema({id : false})
class Check extends Document {
  @Prop({required : true})
  checkNumber : string;

  @Prop({required : true})
  price : number;
}

@Schema({id : false})
class Cash extends Document {
  @Prop({required : true})
  price : number;
}

@Schema({timestamps : true})
export class Expense extends Document {


  @Prop()
  description : string;

  @Prop({ required : true})
  clientName : string;

  @Prop({required : true, enum : Object.values(PaymentMethod)})  
  paymentMethod : string;

  @Prop({required : true, type : mongoose.Schema.Types.Mixed})
  paymentDetails : Check | Virement | Cash;

  @Prop({required : true, type : Date, default : new Date()})
  date : Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
//Add validation pre save to make sure payment details and payment method match

ExpenseSchema.pre('save', function (next) {
  const validFields = {
    cash : ['price'],
    virement : ['price', 'RIB', 'bankFee'],
    check : ['checkNumber', 'price']
  }

  const validDetails = (details : any, allowed : string[]) => {
    const checkArray = [];
    for(const key in details){
      if(!allowed.includes(key)){
        return false;
      }
      checkArray.push(key);
    }
    for(const field of allowed){
      if(!checkArray.includes(field)){
        return false;
      }
    }
    return true;
  }

  switch(this.paymentMethod){
    case PaymentMethod.Cash : {
      if(!(validDetails(this.paymentDetails, validFields.cash))){
        throw new Error("Payment details do not conform to payment method");
      }
      break;
    }
    case PaymentMethod.Check : {
      if(!(validDetails(this.paymentDetails, validFields.check))){
        throw new Error("Payment details do not conform to payment method");
      }
      break;
    }
    case PaymentMethod.Virement : {
      if(!(validDetails(this.paymentDetails, validFields.virement))){
        throw new Error("Payment details do not conform to payment method");
      }
      break;
    }
    default : {
      throw new Error("Invalid payment method");
    }
  }
  next();
})