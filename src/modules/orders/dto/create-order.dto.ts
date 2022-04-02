import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { OrderListType } from '../../../common/types/order-list.type';

export class CreateOrderDto {
  @IsOptional()
  guest_number: string;

  @IsNotEmpty()
  @IsArray()
  order_list: Array<OrderListType>;
}
