import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodEntity } from '../../common/entities/food.entity';
import { Repository } from 'typeorm';
import { FilterFoodsListDto } from './dto/filter-foods-list.dto';
import { CreateFoodDto } from './dto/create-food.dto';
import { checkIsFileNotEmpty } from '../../utils/file-upload.utils';
import { ChangeFoodDto } from './dto/change-food.dto';

@Injectable()
export class FoodsService {
  constructor(@InjectRepository(FoodEntity) private readonly foodsRepo: Repository<FoodEntity>) {}

  async getFoodsList(filterListDto: FilterFoodsListDto) {
    let query = this.foodsRepo.createQueryBuilder('food');
    if (filterListDto.category_id) {
      query = query.where('food.category_id = :categoryId', { categoryId: filterListDto.category_id });
    }
    return await query.getMany();
  }

  async changeFood(id: string, image: Express.Multer.File, changeFoodDto: ChangeFoodDto, savedImgFolder: string) {
    const food = await this.foodsRepo.findOne(id);
    if (!food) throw new HttpException('Блюдо с таким ID не существует в базе', HttpStatus.BAD_REQUEST);

    if (image && image.size) {
      food.image_url = `${savedImgFolder}/${image.filename}`;
    }
    Object.keys(changeFoodDto).forEach((key: string) => {
      food[key] = changeFoodDto[key];
    });

    return await this.foodsRepo.save(food);
  }

  async createFood(image: Express.Multer.File, createFoodDto: CreateFoodDto, savedImgFolder: string) {
    checkIsFileNotEmpty(image);
    const pathToImage = `${savedImgFolder}/${image.filename}`;
    const food = this.foodsRepo.create({ ...createFoodDto, image_url: pathToImage });
    return await this.foodsRepo.save(food);
  }

  async deleteFood(id: string) {
    await this.foodsRepo.delete(id);
    return true;
  }
}
