import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OrderListType } from '../types/order-list.type';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column()
  guest_number: string;

  @Column({ type: 'jsonb' })
  order_list: Array<OrderListType>;

  @Column({ precision: 10, scale: 2, type: 'numeric' })
  total_sum: number;

  @Column()
  order_status_id: number;

  @Column({ nullable: true })
  moderator_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
