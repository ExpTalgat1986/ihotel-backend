import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column()
  guest_number: string;

  @Column({ type: 'jsonb' })
  order_list: string;

  @Column({ precision: 10, scale: 2, type: 'numeric' })
  total_sum: number;

  @Column()
  order_status_id: number;

  @Column({ nullable: true })
  moderator_id: number;
}
