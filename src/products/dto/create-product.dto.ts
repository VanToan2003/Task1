import { IsNotEmpty } from "class-validator"

export class CreateProductDto {
    @IsNotEmpty()
    name:String
    price:Number
    description:String
    code:String
    category_id:String
}
