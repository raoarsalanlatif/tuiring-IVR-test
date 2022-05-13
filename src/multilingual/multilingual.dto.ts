import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MultilingualDto {
  @ApiProperty({
    required: true,
    default: true,
  })
  @IsString()
  en: string;

  @ApiProperty({
    required: true,
    default: true,
  })
  @IsString()
  ar: string;
}
