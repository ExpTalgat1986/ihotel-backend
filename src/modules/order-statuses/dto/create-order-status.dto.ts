import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderStatusDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
