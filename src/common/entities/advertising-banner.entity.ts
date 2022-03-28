import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('advertising_banners')
export class AdvertisingBannerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  banner_url: string;

  @Column()
  banner_img: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
