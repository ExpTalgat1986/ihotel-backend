import { Module } from '@nestjs/common';
import { HsCategoriesController } from './hs-categories.controller';
import { HsCategoriesService } from './hs-categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelServiceCategoryEntity } from '../../common/entities/hotel-service-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HotelServiceCategoryEntity])],
  controllers: [HsCategoriesController],
  providers: [HsCategoriesService],
})
export class HsCategoriesModule {}
