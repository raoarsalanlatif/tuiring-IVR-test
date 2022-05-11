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

export class CreateExerciseDto {
  @IsObject()
  @Type(() => MultilingualDto)
  @ValidateNested()
  title: MultilingualDto;

  @IsObject()
  @Type(() => MultilingualDto)
  @ValidateNested()
  description: MultilingualDto;

  @IsNumber()
  time: number;

  @IsNumber()
  delay: number;

  @IsArray()
  text: string[];

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsBoolean()
  @IsOptional()
  is_enable?: boolean;
}
