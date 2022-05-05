import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { HsCategoriesService } from './hs-categories.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createMulterOptions, HOTEL_SERVICE_CATEGORY_IMG_PATH } from '../../utils/file-upload.utils';
import { CreateHsCategoryDto } from './dto/create-hs-category.dto';
import { ChangeHsCategoryDto } from './dto/change-hs-category.dto';

@Controller('hs-categories')
export class HsCategoriesController {
  constructor(private readonly hsCategoryService: HsCategoriesService) {}

  @Get()
  getAllCategories() {
    return this.hsCategoryService.getCategories();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', createMulterOptions(HOTEL_SERVICE_CATEGORY_IMG_PATH)))
  createFoodCategory(@UploadedFile() file: Express.Multer.File, @Body() createCategoryDto: CreateHsCategoryDto) {
    return this.hsCategoryService.createCategory(file, createCategoryDto, HOTEL_SERVICE_CATEGORY_IMG_PATH);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', createMulterOptions(HOTEL_SERVICE_CATEGORY_IMG_PATH)))
  changeFoodCategory(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() changeCategoryDto: ChangeHsCategoryDto,
  ) {
    return this.hsCategoryService.changeCategory(id, file, changeCategoryDto, HOTEL_SERVICE_CATEGORY_IMG_PATH);
  }

  @Delete(':id')
  deleteFoodCategory(@Param('id') id: string) {
    return this.hsCategoryService.deleteCategory(id);
  }
}
