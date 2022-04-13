import { IsOptional, IsString } from 'class-validator';

export class ChangeHsCategoryDto {
  @IsOptional()
  @IsString()
  title_ru: string;

  @IsOptional()
  @IsString()
  title_en: string;

  @IsOptional()
  @IsString()
  title_kz: string;
}
