import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('notifications')
export class NotificationEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column()
  title_ru: string;

  @Column()
  title_kz: string;

  @Column()
  title_en: string;

  @Column()
  text_ru: string;

  @Column()
  text_kz: string;

  @Column()
  text_en: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
