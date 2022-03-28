import { IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsPhoneNumber('KZ')
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(2)
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @Length(2)
  last_name: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string;

  @IsOptional()
  @IsNumber()
  role_id: number;

  @IsOptional()
  @IsString()
  @Length(12, 12)
  iin: string;
}
