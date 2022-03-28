import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
