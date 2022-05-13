import {
  IsBoolean,
  IsOptional,
  IsString,
  IsArray,
  IsEnum,
} from 'class-validator';
import { Status } from '../progress.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProgressDto {
  @ApiProperty({
    description: 'user_id mongo id e.g user_id= 624ea2841cd832e0db8466da',
    required: true,
    default: '',
  })
  @IsString()
  user_id: string;

  @ApiProperty({
    description: 'session mongo id e.g session= 624ea2841cd832e0db8466da',
    required: true,
    default: '',
  })
  @IsString()
  session: string;

  @ApiProperty({
    description: 'Status Enum e.g Status=Completed or Status=Inompleted',
    required: true,
    default: '',
  })
  @IsEnum(Status)
  status: string;

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
