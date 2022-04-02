import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FilterFoodsListDto } from './dto/filter-foods-list.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { createMulterOptions, FOOD_IMG_PATH } from '../../utils/file-upload.utils';
import { CreateFoodDto } from './dto/create-food.dto';
import { ChangeFoodDto } from './dto/change-food.dto';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Get()
  getFoodsList(@Query() filterListDto: FilterFoodsListDto) {
    return this.foodsService.getFoodsList(filterListDto);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', createMulterOptions(FOOD_IMG_PATH)))
  createFood(@UploadedFile() file: Express.Multer.File, @Body() createFoodDto: CreateFoodDto) {
    return this.foodsService.createFood(file, createFoodDto, FOOD_IMG_PATH);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', createMulterOptions(FOOD_IMG_PATH)))
  changeFood(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Body() changeFoodDto: ChangeFoodDto) {
    return this.foodsService.changeFood(id, file, changeFoodDto, FOOD_IMG_PATH);
  }

  @Delete(':id')
  deleteFood(@Param('id') id: string) {
    return this.foodsService.deleteFood(id);
  }
}
