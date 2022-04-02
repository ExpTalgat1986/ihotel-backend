import { IsNumber, IsOptional } from 'class-validator';

export class ChangeOrderDto {
  @IsOptional()
  guest_number: string;

  @IsOptional()
  @IsNumber()
  total_sum: number;

  @IsOptional()
  @IsNumber()
  order_status_id: number;

  @IsOptional()
  @IsNumber()
  moderator_id: number;
}
