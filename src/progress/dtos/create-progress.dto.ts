import {
  IsBoolean,
  IsOptional,
  IsString,
  IsArray,
  IsEnum,
} from 'class-validator';
import { Status } from '../progress.schema';

export class CreateProgressDto {
  @IsString()
  uuid: string;

  @IsString()
  session: string;

  @IsEnum(Status)
  status: string;

  @IsArray()
  texts: string[];

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsBoolean()
  @IsOptional()
  is_enable?: boolean;
}
