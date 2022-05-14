import {
  IsBoolean,
  IsOptional,
  IsNumber,
  IsArray,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MultilingualDto } from 'src/multilingual/multilingual.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExerciseDto {
  @ApiProperty({
    description: 'title e.g title={ en: Flash, ar: فلاش}',
    required: false,
    default: { en: '', ar: '' },
  })
  @IsObject()
  @Type(() => MultilingualDto)
  @ValidateNested()
  title: MultilingualDto;

  @ApiProperty({
    description: 'title e.g title={ en: Contract and Relax, ur: عقد واسترخ}',
    required: true,
    default: { en: '', ar: '' },
  })
  @IsObject()
  @Type(() => MultilingualDto)
  @ValidateNested()
  description: MultilingualDto;

  @ApiProperty({
    description: 'time in seconds e.g time=4',
    required: true,
    default: 0,
  })
  @IsNumber()
  time: number;

  @ApiProperty({
    description: 'delay in seconds e.g delay=5',
    required: true,
    default: 0,
  })
  @IsNumber()
  delay: number;

  @ApiProperty({
    description:
      'Array of texts that will be shown with each exercise e.g text=[contract,relax] etc',
    required: true,
    default: [],
  })
  @IsArray()
  text: string[];

  @ApiProperty({
    description: 'Boolean expression e.g is_active=true or is_active=false',
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({
    description: 'Boolean expression e.g is_enable=true or is_enable=false',
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  is_enable?: boolean;
}
