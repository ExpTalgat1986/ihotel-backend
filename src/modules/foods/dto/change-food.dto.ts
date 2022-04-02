import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class ChangeFoodDto {
  @IsOptional()
  @IsNumber()
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
  @IsNumber()
  price: number;

  @IsOptional()
  @IsBoolean()
  is_available: boolean;
}
