import { Module } from '@nestjs/common';
import { FoodCategoriesController } from './food-categories.controller';
import { FoodCategoriesService } from './food-categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodCategoryEntity } from '../../common/entities/food-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FoodCategoryEntity])],
  controllers: [FoodCategoriesController],
  providers: [FoodCategoriesService],
})
export class FoodCategoriesModule {}
