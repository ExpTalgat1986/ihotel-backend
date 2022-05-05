import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdditionalServiceCategoryEntity } from '../../common/entities/additional-service-category.entity';
import { Repository } from 'typeorm';
import { CreateAdServiceCategoryDto } from './dto/create-ad-service-category.dto';
import { ChangeAdServiceCategoryDto } from './dto/change-ad-service-category.dto';

@Injectable()
export class AdServiceCategoriesService {
  constructor(
    @InjectRepository(AdditionalServiceCategoryEntity)
    private readonly adServiceCategoryRepo: Repository<AdditionalServiceCategoryEntity>,
  ) {}

  async adServiceCategories() {
    return await this.adServiceCategoryRepo.find();
  }

  async createAdCategory(createAdServiceCategoryDto: CreateAdServiceCategoryDto) {
    const category = this.adServiceCategoryRepo.create({ ...createAdServiceCategoryDto });
    return await this.adServiceCategoryRepo.save(category);
  }

  async changeCategory(id: string, changeAdServiceCategoryDto: ChangeAdServiceCategoryDto) {
    const category = await this.adServiceCategoryRepo.findOne(id);
    if (!category) throw new HttpException('Категория с таким ID отсутствует в базе', HttpStatus.BAD_REQUEST);

    Object.keys(changeAdServiceCategoryDto).forEach((key: string) => {
      category[key] = changeAdServiceCategoryDto[key];
    });

    return await this.adServiceCategoryRepo.save(category);
  }

  async deleteCategory(id: string) {
    await this.adServiceCategoryRepo.delete(id);
    return true;
  }
}
