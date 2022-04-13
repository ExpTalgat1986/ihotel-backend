import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodCategoryEntity } from '../../common/entities/food-category.entity';
import { Repository } from 'typeorm';
import { CreateFoodCategoryDto } from './dto/create-food-category.dto';
import { checkIsFileNotEmpty } from '../../utils/file-upload.utils';
import { ChangeFoodCategoryDto } from './dto/change-food-category.dto';
import { SERVER_URL } from '../../../config/common.config';

@Injectable()
export class FoodCategoriesService {
  constructor(
    @InjectRepository(FoodCategoryEntity) private readonly foodCategoryRepo: Repository<FoodCategoryEntity>,
  ) {}

  async getFoodCategories() {
    return await this.foodCategoryRepo.find();
  }

  async deleteCategory(id: string) {
    await this.foodCategoryRepo.delete(id);
    return true;
  }

  async changeCategory(
    id: string,
    image: Express.Multer.File,
    changeCategoryDto: ChangeFoodCategoryDto,
    savedImgFolder: string,
  ) {
    const foodCategory = await this.foodCategoryRepo.findOne(id);
    if (!foodCategory) throw new HttpException('Категория с таким ID отсутствует в базе', HttpStatus.BAD_REQUEST);

    if (image && image.size) {
      foodCategory.image_url = `${SERVER_URL}/${savedImgFolder}/${image.filename}`;
    }
    Object.keys(changeCategoryDto).forEach((key: string) => {
      foodCategory[key] = changeCategoryDto[key];
    });

    return await this.foodCategoryRepo.save(foodCategory);
  }

  async createFoodCategory(
    image: Express.Multer.File,
    createFoodCategoryDto: CreateFoodCategoryDto,
    savedImgFolder: string,
  ) {
    checkIsFileNotEmpty(image);
    const pathToImage = `${SERVER_URL}/${savedImgFolder}/${image.filename}`;
    const foodCategory = this.foodCategoryRepo.create({ ...createFoodCategoryDto, image_url: pathToImage });
    return await this.foodCategoryRepo.save(foodCategory);
  }
}
