import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class DeleteProgressDto {
  @ApiProperty({
    description: 'user_id mongo id e.g user_id= 624ea2841cd832e0db8466da',
    required: true,
    default: '',
  })
  @IsMongoId()
  user_id: ObjectId;
}
