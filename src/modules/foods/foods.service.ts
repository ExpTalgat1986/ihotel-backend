import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodEntity } from '../../common/entities/food.entity';
import { Repository } from 'typeorm';
import { FilterFoodsListDto } from './dto/filter-foods-list.dto';
import { CreateFoodDto } from './dto/create-food.dto';
import { checkIsFileNotEmpty } from '../../utils/file-upload.utils';
import { ChangeFoodDto } from './dto/change-food.dto';
import { SERVER_URL } from '../../../config/common.config';

@Injectable()
export class FoodsService {
  constructor(@InjectRepository(FoodEntity) private readonly foodsRepo: Repository<FoodEntity>) {}

  async getFoodsList(filterListDto: FilterFoodsListDto) {
    let query = this.foodsRepo.createQueryBuilder('food').leftJoinAndSelect('food.category', 'category');
    if (filterListDto.category_id) {
      query = query.where('food.category_id = :categoryId', { categoryId: filterListDto.category_id });
    }
    return await query.getMany();
  }

  async changeFood(id: string, image: Express.Multer.File, changeFoodDto: ChangeFoodDto, savedImgFolder: string) {
    const food = await this.foodsRepo.findOne(id);
    if (!food) throw new HttpException('Блюдо с таким ID не существует в базе', HttpStatus.BAD_REQUEST);

    if (image && image.size) {
      food.image_url = `${SERVER_URL}/${savedImgFolder}/${image.filename}`;
    }
    Object.keys(changeFoodDto).forEach((key: string) => {
      if (key === 'is_available') changeFoodDto.is_available = changeFoodDto.is_available !== 'false';
      food[key] = changeFoodDto[key];
    });

    const savedFood = await this.foodsRepo.save(food);
    return await this.foodsRepo
      .createQueryBuilder('food')
      .leftJoinAndSelect('food.category', 'category')
      .where('food.id = :foodId', { foodId: savedFood.id })
      .getOne();
  }

  async createFood(image: Express.Multer.File, createFoodDto: CreateFoodDto, savedImgFolder: string) {
    checkIsFileNotEmpty(image);
    const pathToImage = `${SERVER_URL}/${savedImgFolder}/${image.filename}`;
    createFoodDto.is_available = createFoodDto.is_available !== 'false';
    const food = this.foodsRepo.create({ ...createFoodDto, image_url: pathToImage });
    const { id } = await this.foodsRepo.save(food);
    return await this.foodsRepo
      .createQueryBuilder('food')
      .leftJoinAndSelect('food.category', 'category')
      .where('food.id = :foodId', { foodId: id })
      .getOne();
  }

  async deleteFood(id: string) {
    await this.foodsRepo.delete(id);
    return true;
  }
}
