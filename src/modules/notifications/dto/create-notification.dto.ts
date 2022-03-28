import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
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
  text_ru: string;

  @IsNotEmpty()
  @IsString()
  text_kz: string;

  @IsNotEmpty()
  @IsString()
  text_en: string;
}
