import { IsString } from 'class-validator';

export class MultilingualDto {
  @IsString()
  en: string;

  @IsString()
  ar: string;
}
