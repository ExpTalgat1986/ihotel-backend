import { IsOptional, IsString } from 'class-validator';

export class ChangeAdServiceDto {
  @IsOptional()
  category_id: number;

  @IsOptional()
  @IsString()
  title_ru: string;

  @IsOptional()
  @IsString()
  title_kz: string;

  @IsOptional()
  @IsString()
  title_en: string;

  @IsOptional()
  @IsString()
  description_ru: string;

  @IsOptional()
  @IsString()
  description_kz: string;

  @IsOptional()
  @IsString()
  description_en: string;

  @IsOptional()
  price: number;

  @IsOptional()
  is_available: boolean | string;
}
