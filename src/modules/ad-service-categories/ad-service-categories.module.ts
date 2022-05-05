import { Module } from '@nestjs/common';
import { AdServiceCategoriesController } from './ad-service-categories.controller';
import { AdServiceCategoriesService } from './ad-service-categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdditionalServiceCategoryEntity } from '../../common/entities/additional-service-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdditionalServiceCategoryEntity])],
  controllers: [AdServiceCategoriesController],
  providers: [AdServiceCategoriesService],
})
export class AdServiceCategoriesModule {}
