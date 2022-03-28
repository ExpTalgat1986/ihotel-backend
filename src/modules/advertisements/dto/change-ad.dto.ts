import { IsOptional, IsString } from 'class-validator';

export class ChangeAdDto {
  @IsOptional()
  @IsString()
  banner_url: string;
}
