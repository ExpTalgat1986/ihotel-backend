import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('additional_services')
export class AdditionalServiceEntity {
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

  @Column()
  is_available: boolean;
}
