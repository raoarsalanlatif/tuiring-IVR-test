import { IsBoolean, IsOptional, IsString, IsEnum } from 'class-validator';
import { U_Package } from '../user.schema';

export class CreateUserDto {
  @IsString()
  uuid: string;

  @IsString()
  @IsEnum(U_Package)
  user_package: string;

  @IsString()
  start_date: Date;

  @IsString()
  end_date: Date;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsBoolean()
  @IsOptional()
  is_enable?: boolean;
}
