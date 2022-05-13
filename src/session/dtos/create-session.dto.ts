import {
  IsBoolean,
  IsOptional,
  IsString,
  IsArray,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MultilingualDto } from 'src/multilingual/multilingual.dto';
import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto {
  @ApiProperty({
    description: 'uuid mongo id e.g uuid= 624ea2841cd832e0db8466da',
    required: true,
    default: { en: '', ar: '' },
  })
  @IsObject()
  @Type(() => MultilingualDto)
  @ValidateNested()
  title: MultilingualDto;

  @ApiProperty({
    description: 'title e.g title={ en: Session 1, ur: الجلسة 1}',
    required: true,
    default: { en: '', ar: '' },
  })
  @IsObject()
  @Type(() => MultilingualDto)
  @ValidateNested()
  description: MultilingualDto;

  @ApiProperty({
    description:
      'Array of exercise mongo ids that will populated with GET request e.g text=[624ea2841cd832e0db8466da,624ea2841cd832e0db8466da] etc',
    required: true,
    default: [],
  })
  @IsArray()
  exercises: ObjectId[];

  @ApiProperty({
    description: 'total time in seconds e.g total_time=5',
    required: true,
    default: 0,
  })
  @IsNumber()
  total_time: number;

  @ApiProperty({
    description: 'Boolean expression e.g is_enable=true or is_enable=false',
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
