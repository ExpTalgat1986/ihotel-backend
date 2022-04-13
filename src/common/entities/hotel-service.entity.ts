import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { HotelServiceCategoryEntity } from './hotel-service-category.entity';

@Entity('hotel_services')
export class HotelServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_id: number;

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

  @ManyToOne(() => HotelServiceCategoryEntity, (hotelServiceCategory) => hotelServiceCategory.services)
  @JoinColumn({ name: 'category_id' })
  category: HotelServiceCategoryEntity;
}
