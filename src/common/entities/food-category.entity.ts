import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
