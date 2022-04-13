import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FoodEntity } from './food.entity';

@Entity('food_categories')
export class FoodCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  image_url: string;

  @Column()
  title_ru: string;

  @Column()
  title_en: string;

  @Column()
  title_kz: string;

  @OneToMany(() => FoodEntity, (food) => food.category)
  foods: FoodEntity[];
}
