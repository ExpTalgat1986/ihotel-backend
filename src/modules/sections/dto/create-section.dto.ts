import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSectionDto {
  @IsNotEmpty()
  @IsString()
  name_ru: string;

  @IsNotEmpty()
  @IsString()
  name_kk: string;

  @IsNotEmpty()
  @IsString()
  name_en: string;

  @IsNotEmpty()
  @IsString()
  link: string;
}
