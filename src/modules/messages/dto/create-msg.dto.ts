import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMsgDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  guest_number: string;
}
