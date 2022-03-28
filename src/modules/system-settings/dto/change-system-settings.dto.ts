import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class ChangeSystemSettingsDto {
  @IsOptional()
  @IsString()
  application_name: string;

  @IsOptional()
  @IsString()
  welcome_text: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber('KZ')
  concierge_phone: string;
}
