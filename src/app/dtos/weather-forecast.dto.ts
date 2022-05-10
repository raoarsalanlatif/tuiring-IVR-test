import { ApiProperty } from '@nestjs/swagger';

export class WeatherForecastParamsDTO {
  @ApiProperty({ description: 'User Id e.g. $userId=623ba2830e71f074d70ad85c' })
  $userId?: string;
  @ApiProperty({ description: 'date or timeStamp e.g. $timeStamp=2022-03-23T22:43:15.878+00:00 or $timeStamp=2022-03-23' })
  $rpp?: string;
}
