import { IsArray, IsNotEmpty } from 'class-validator';
import { OrderListType } from '../../../common/types/order-list.type';

export class CreateOrderDto {
  @IsNotEmpty()
  guest_number: string;

  @IsNotEmpty()
  full_name: string;

  @IsNotEmpty()
  @IsArray()
  order_list: Array<OrderListType>;
}
