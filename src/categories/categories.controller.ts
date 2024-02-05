import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('createCategory')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get('getCategory')
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('findById/:id')
  findById(@Param('id') id: string) {
    return this.categoriesService.findById(id);
  }
  @Get('findByCode')
  findByCode(@Body()body: CreateCategoryDto) {
    return this.categoriesService.findByCode(body);
  }
  @Patch('updateCategory/:id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete('deleteCategory/:id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
