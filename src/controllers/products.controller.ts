import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './../services/products.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dtos';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAll(
    @Query('limit') limit: number,
    @Query('offset') offset = 5,
    @Query('brand') brand: string,
  ) {
    /* return {
      message: `Lista de productos: limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
    }; */
    return this.productsService.findAll();
  }

  @Get('filter')
  getFilter() {
    return `yo soy un filter`;
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    /* return {
      message: `Producto con id ${id}`,
    }; */
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    /* return {
      message: `acción de crear`,
      payload,
    }; */
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    /* return {
      id,
      payload,
    }; */
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    /* return {
      id,
    }; */
    return this.productsService.delete(id);
  }
}
