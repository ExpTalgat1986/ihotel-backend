import { IsOptional, IsString } from 'class-validator';

export class ChangeNotificationDto {
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
  text_ru: string;

  @IsOptional()
  @IsString()
  text_kz: string;

  @IsOptional()
  @IsString()
  text_en: string;
}
