import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { filter } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get("getProduct")
  findAll(@Query() query: any) {
    const { page, sort, limit, filter, ...filterOj} = query;
    return this.productsService.findAll(page, limit, sort, filterOj);
  }

  @Get('productByCode')
  findOne(@Body() productCode) {
    return this.productsService.findOne(productCode);
  }

  @Patch('updateProduct/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete('deleteProduct/:id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
