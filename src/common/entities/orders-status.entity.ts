import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders_statuses')
export class OrdersStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}
