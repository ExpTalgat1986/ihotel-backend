import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AdServiceCategoriesService } from './ad-service-categories.service';
import { CreateAdServiceCategoryDto } from './dto/create-ad-service-category.dto';
import { ChangeAdServiceCategoryDto } from './dto/change-ad-service-category.dto';

@Controller('ad-service-categories')
export class AdServiceCategoriesController {
  constructor(private readonly adServiceCategoriesService: AdServiceCategoriesService) {}

  @Get()
  getAllFoodCategories() {
    return this.adServiceCategoriesService.adServiceCategories();
  }

  @Post()
  createFoodCategory(@Body() createAdServiceCategoryDto: CreateAdServiceCategoryDto) {
    return this.adServiceCategoriesService.createAdCategory(createAdServiceCategoryDto);
  }

  @Put(':id')
  changeFoodCategory(@Param('id') id: string, @Body() changeAdServiceCategoryDto: ChangeAdServiceCategoryDto) {
    return this.adServiceCategoriesService.changeCategory(id, changeAdServiceCategoryDto);
  }

  @Delete(':id')
  deleteFoodCategory(@Param('id') id: string) {
    return this.adServiceCategoriesService.deleteCategory(id);
  }
}
