import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelServiceCategoryEntity } from '../../common/entities/hotel-service-category.entity';
import { Repository } from 'typeorm';
import { SERVER_URL } from '../../../config/common.config';
import { checkIsFileNotEmpty } from '../../utils/file-upload.utils';
import { ChangeHsCategoryDto } from './dto/change-hs-category.dto';
import { CreateHsCategoryDto } from './dto/create-hs-category.dto';

@Injectable()
export class HsCategoriesService {
  constructor(
    @InjectRepository(HotelServiceCategoryEntity)
    private readonly hsCategoryRepo: Repository<HotelServiceCategoryEntity>,
  ) {}

  async getCategories() {
    return await this.hsCategoryRepo.find();
  }

  async deleteCategory(id: string) {
    await this.hsCategoryRepo.delete(id);
    return true;
  }

  async changeCategory(
    id: string,
    image: Express.Multer.File,
    changeCategoryDto: ChangeHsCategoryDto,
    savedImgFolder: string,
  ) {
    const category = await this.hsCategoryRepo.findOne(id);
    if (!category) throw new HttpException('Категория с таким ID отсутствует в базе', HttpStatus.BAD_REQUEST);

    if (image && image.size) {
      category.image_url = `${SERVER_URL}/${savedImgFolder}/${image.filename}`;
    }
    Object.keys(changeCategoryDto).forEach((key: string) => {
      category[key] = changeCategoryDto[key];
    });

    return await this.hsCategoryRepo.save(category);
  }

  async createCategory(image: Express.Multer.File, createCategoryDto: CreateHsCategoryDto, savedImgFolder: string) {
    // checkIsFileNotEmpty(image);
    // const pathToImage = `${SERVER_URL}/${savedImgFolder}/${image.filename}`;
    const foodCategory = this.hsCategoryRepo.create({ ...createCategoryDto });
    return await this.hsCategoryRepo.save(foodCategory);
  }
}
