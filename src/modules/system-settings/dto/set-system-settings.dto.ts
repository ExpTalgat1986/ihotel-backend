import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class SetSystemSettingsDto {
  @IsNotEmpty()
  @IsString()
  application_name: string;

  @IsNotEmpty()
  @IsString()
  welcome_text: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('KZ')
  concierge_phone: string;
}
