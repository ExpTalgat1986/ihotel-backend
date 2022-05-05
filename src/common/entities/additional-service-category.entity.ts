import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AdditionalServiceEntity } from './additional-service.entity';

@Entity('additional_service_categories')
export class AdditionalServiceCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToMany(() => AdditionalServiceEntity, (adService) => adService.category)
  services: AdditionalServiceEntity[];
}
