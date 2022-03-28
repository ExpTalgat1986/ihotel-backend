import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdDto {
  @IsNotEmpty()
  @IsString()
  banner_url: string;
}
