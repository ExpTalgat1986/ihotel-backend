import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdServiceCategoryDto {
  @IsNotEmpty()
  @IsString()
  title_ru: string;

  @IsNotEmpty()
  @IsString()
  title_en: string;

  @IsNotEmpty()
  @IsString()
  title_kz: string;
}
