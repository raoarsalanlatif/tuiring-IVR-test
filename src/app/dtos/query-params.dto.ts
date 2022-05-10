//NOTE: We don't need to use this, as we have CLI plugin enabled
//However here we needed description which is not posssible
//without manually setting ApiProperty decorator
import { ApiProperty } from '@nestjs/swagger';

export class QueryParamsDTO {
  @ApiProperty({ description: 'Page number e.g. $page=1' })
  $page?: number;
  @ApiProperty({ description: 'How many records per page should be returned e.g. $rpp=10' })
  $rpp?: number;
  @ApiProperty({ description: 'How to apply ordering to the returned data e.g. $orderBy=name desc' })
  $orderBy?: string;
  @ApiProperty({ description: 'How to apply filter to the returned data e.g. $filter=price lt 10.00' })
  $filter?: string;
}
