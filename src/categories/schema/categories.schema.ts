import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
@Schema()
export class Category 
{
  @Prop()
  name: String
  @Prop()
  description: String  
  @Prop()
  code:String
 
};
export const categorySchema=SchemaFactory.createForClass(Category)