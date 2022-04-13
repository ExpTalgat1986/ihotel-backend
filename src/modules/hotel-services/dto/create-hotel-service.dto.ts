import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHotelServiceDto {
  @IsNotEmpty()
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
  price: number;

  @IsNotEmpty()
  is_available: boolean | string;
}
