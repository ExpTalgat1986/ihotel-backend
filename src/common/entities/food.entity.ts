import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FoodCategoryEntity } from './food-category.entity';

@Entity('foods')
export class FoodEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_id: number;

  @Column({ nullable: true })
  icon_url: string;

  @Column({ nullable: true })
  image_url: string;

  @Column()
  title_ru: string;

  @Column()
  title_en: string;

  @Column()
  title_kz: string;

  @Column()
  description_ru: string;

  @Column()
  description_en: string;

  @Column()
  description_kz: string;

  @Column({ precision: 10, scale: 2, type: 'numeric' })
  price: number;

  @Column({ type: 'boolean' })
  is_available: boolean | string;

  @ManyToOne(() => FoodCategoryEntity, (foodCategory) => foodCategory.foods)
  @JoinColumn({ name: 'category_id' })
  category: FoodCategoryEntity;
}
