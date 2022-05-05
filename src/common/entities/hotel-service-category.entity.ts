import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HotelServiceEntity } from './hotel-service.entity';

@Entity('hotel_service_categories')
export class HotelServiceCategoryEntity {
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

  @OneToMany(() => HotelServiceEntity, (hotelService) => hotelService.category)
  services: HotelServiceEntity[];
}
