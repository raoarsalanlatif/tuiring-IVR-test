import { IsBoolean, IsOptional, IsString, IsEnum } from 'class-validator';
import { U_Package } from '../user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'uuid e.g uuid= 123e4567-e89b-12d3-a456-426614174000',
    required: true,
    default: '',
  })
  @IsString()
  uuid: string;

  @ApiProperty({
    description:
      'User Package e.g user_package=One Month or user_package=One Week or user_package=Six Month ',
    required: true,
    default: '',
  })
  @IsString()
  @IsEnum(U_Package)
  user_package: string;

  @ApiProperty({
    description: 'Start Date e.g start_date=2022-04-07',
    required: true,
    default: '',
  })
  @IsString()
  start_date: string;

  @ApiProperty({
    description: 'End Date e.g start_date=2022-04-14',
    required: true,
    default: '',
  })
  @IsString()
  end_date: string;

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
