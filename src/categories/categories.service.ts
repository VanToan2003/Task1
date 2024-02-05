import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schema/categories.schema';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel('Category') private readonly categoryModel: Model< Category>) {}
  create(createCategoryDto: CreateCategoryDto) {
    const newcar=new this.categoryModel(createCategoryDto)
    return newcar.save();
  }

  findAll() {
    return this.categoryModel.find();
  }

  findById(id: string) {
    
    const category = this.categoryModel.findOne({_id: id});
    if(!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category
  }
  findByCode(body) {
    const code=body.code;
   
    
    const category = this.categoryModel.findOne({code});
    if(!category) {
      throw new NotFoundException(`Category with id ${code} not found`);
    }
    return category
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const updatedCategory = await this.categoryModel.findByIdAndUpdate(id,updateCategoryDto, { new: true });

    if (!updatedCategory) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return updatedCategory;
  }

 async remove(id: string) {
  const cleanedId = id.trim().replace(/\n/g, '');
    const deletedCategory = await this.categoryModel.findByIdAndDelete(cleanedId)

    if (!deletedCategory) {  
      throw new NotFoundException(`Category with name ${id} not found`);
    }

    return deletedCategory;
  }
}
