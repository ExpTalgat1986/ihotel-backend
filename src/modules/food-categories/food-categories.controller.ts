import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FoodCategoriesService } from './food-categories.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createMulterOptions, FOOD_CATEGORY_IMG_PATH } from '../../utils/file-upload.utils';
import { CreateFoodCategoryDto } from './dto/create-food-category.dto';
import { ChangeFoodCategoryDto } from './dto/change-food-category.dto';

@Controller('food-categories')
export class FoodCategoriesController {
  constructor(private readonly foodCategoriesService: FoodCategoriesService) {}

  @Get()
  getAllFoodCategories() {
    return this.foodCategoriesService.getFoodCategories();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', createMulterOptions(FOOD_CATEGORY_IMG_PATH)))
  createFoodCategory(@UploadedFile() file: Express.Multer.File, @Body() createFoodCategoryDto: CreateFoodCategoryDto) {
    return this.foodCategoriesService.createFoodCategory(file, createFoodCategoryDto, FOOD_CATEGORY_IMG_PATH);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', createMulterOptions(FOOD_CATEGORY_IMG_PATH)))
  changeFoodCategory(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() changeFoodCategoryDto: ChangeFoodCategoryDto,
  ) {
    return this.foodCategoriesService.changeCategory(id, file, changeFoodCategoryDto, FOOD_CATEGORY_IMG_PATH);
  }

  @Delete(':id')
  deleteFoodCategory(@Param('id') id: string) {
    return this.foodCategoriesService.deleteCategory(id);
  }
}
