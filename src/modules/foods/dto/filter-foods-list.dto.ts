import { IsNumberString, IsOptional } from 'class-validator';

export class FilterFoodsListDto {
  @IsOptional()
  @IsNumberString()
  category_id: string;
}
