import { Module } from '@nestjs/common';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEntity } from '../../common/entities/food.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FoodEntity])],
  controllers: [FoodsController],
  providers: [FoodsService],
})
export class FoodsModule {}
