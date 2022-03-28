import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('system_settings')
export class SystemSettingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  favicon_url: string;

  @Column()
  main_logo_url: string;

  @Column()
  application_name: string;

  @Column()
  welcome_text: string;

  @Column()
  concierge_phone: string;
}
