import { IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ExecutionContext } from '@nestjs/common';

const getDigit = (_data: string, ctx: ExecutionContext): number => {
  const request = ctx.switchToHttp().getRequest();
  return request.body.Digits;
};
export enum CallForwardOptions {
  Welcome = 0,
  RedirectToAnotherNumber = 1,
  VoiceMail = 2,
}

export class CreateCallDto {
  @ApiProperty({
    description:
      'This attribute of call forwarding body will either receive 0, 1 or 2 as an argument e.g option=0 for welcome, option=1 for calling another number or option=2 for voice mail',
    required: true,
    default: 0,
  })
  @IsEnum(CallForwardOptions)
  @IsNumber()
  option: number;
}
