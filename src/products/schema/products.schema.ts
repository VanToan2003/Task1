import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
@Schema()
export class Product{
    @Prop()
    name:String
    @Prop()
    price:Number
    @Prop()
    description:String
    @Prop()
    code:String
    @Prop()
    category_id:String
} 
export const productSchema=SchemaFactory.createForClass(Product)