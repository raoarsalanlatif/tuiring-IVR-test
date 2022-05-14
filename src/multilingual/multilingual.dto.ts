import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MultilingualDto {
  @ApiProperty({
    required: true,
    default: '',
  })
  @IsString()
  en: string;

  @ApiProperty({
    required: true,
    default: '',
  })
  @IsString()
  ar: string;
}
