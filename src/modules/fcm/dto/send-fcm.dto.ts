import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class SendFcmDto {
  @IsNotEmpty()
  @IsIn(['MESSAGE', 'ORDER'])
  type: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
