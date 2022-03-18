import { IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { IsPhoneNumberExists } from '../../../common/validations/is-entity-exists';

export class LoginDto {
  @IsNotEmpty()
  @IsPhoneNumber('KZ')
  @IsPhoneNumberExists({
    message: 'Пользователь с номером $value не зарегистрирован',
  })
  readonly phone_number: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  readonly password: string;
}
