import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFoodDto {
  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  @IsNotEmpty()
  @IsString()
  title_ru: string;

  @IsNotEmpty()
  @IsString()
  title_kz: string;

  @IsNotEmpty()
  @IsString()
  title_en: string;

  @IsNotEmpty()
  @IsString()
  description_ru: string;

  @IsNotEmpty()
  @IsString()
  description_kz: string;

  @IsNotEmpty()
  @IsString()
  description_en: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsBoolean()
  is_available: boolean;
}
