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

export class CreateSessionDto {
  @IsObject()
  @Type(() => MultilingualDto)
  @ValidateNested()
  title: MultilingualDto;

  @IsObject()
  @Type(() => MultilingualDto)
  @ValidateNested()
  description: MultilingualDto;

  @IsArray()
  exercise: ObjectId[];

  @IsNumber()
  total_time: number;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsBoolean()
  @IsOptional()
  is_enable?: boolean;
}
