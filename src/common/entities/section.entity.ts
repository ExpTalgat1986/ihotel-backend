import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import slugify from 'slugify';

@Entity('sections')
export class SectionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image_url: string;

  @Column()
  name_ru: string;

  @Column()
  name_kk: string;

  @Column()
  name_en: string;

  @Column({ nullable: true })
  slug: string;

  @Column()
  link: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  slugSectionName() {
    this.slug = slugify(this.name_ru, {
      lower: true,
    });
  }
}
