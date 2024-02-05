import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from'./schema/products.schema'


@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly productModel: Model< Product>) {}
 async create(createProductDto: CreateProductDto) {
    
    const newcar=new this.productModel(createProductDto)
    return newcar.save();
   
  }

 async findAll(pageParam: number , limitParam: number ,sortBy:string,filterObject:any) {
    let page = pageParam;
    let limit = limitParam;
  
    // const filterObject = keyword ? { name: { $regex: new RegExp(keyword, 'i') } } : {};
   
    // Đảm bảo giá trị không âm
    page = Math.max(1, page);
    limit = Math.max(1, limit);
  
    const skip = limit * (page - 1);
  
    let query= await this.productModel
      .find(filterObject)
      .skip(skip)
      .limit(limit)
      .sort(sortBy)
      
     
     
      
      return query
    
      
  }

  findOne(body) {
    const code =body.code
    return this.productModel.findOne({code});
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });

    if (!updatedProduct) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return updatedProduct;
  }

  async remove(id: string) {
    const cleanedId = id.trim().replace(/\n/g, '');
    const deletedProduct = await this.productModel.findByIdAndDelete(cleanedId);

    if (!deletedProduct) {
      throw new NotFoundException(`Product with name ${id} not found`);
    }

    return deletedProduct;
  }
}
