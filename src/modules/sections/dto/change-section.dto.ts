import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ChangeSectionDto {
  @IsOptional()
  @IsString()
  name_ru: string;

  @IsOptional()
  @IsString()
  name_kk: string;

  @IsOptional()
  @IsString()
  name_en: string;

  @IsOptional()
  @IsString()
  link: string;
}
