import {
  Controller,
  Get,
  Post,
  Delete,
  UseInterceptors,
  Body,
  ValidationPipe,
  UsePipes,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/app/filters/http-exception.filter';
import getMessages from 'src/app/api-messages';
import { QueryParamsDTO } from 'src/app/dtos/query-params.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IPaginationQuery } from 'src/app/interfaces';
import { TranslatorInterceptor } from 'src/app/interceptors/response-translate.interceptor';
import { ParamsHandler } from 'src/app/custom-decorators/params-handler.decorator';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dtos/create-progress.dto';
import { DeleteProgressDto } from './dtos/delete-progress.dto';

const { RESOURCE_CREATED } = getMessages('session(s)');

UseFilters(HttpExceptionFilter);
@Controller('progress')
@ApiTags('Progress')
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Get()
  @UseInterceptors(TranslatorInterceptor)
  @ApiQuery({ type: QueryParamsDTO })
  async get(@ParamsHandler() pagination: IPaginationQuery) {
    const { $rpp, $page, $filter, $orderBy } = pagination;
    if ($rpp && $page) {
      return await this.progressService.getPaginatedProgress(
        $rpp,
        $page,
        $filter,
        $orderBy,
      );
    }
    return {
      data: await this.progressService.getFilteredProgress($filter, $orderBy),
    };
  }

  @Post()
  @ApiBody({ type: CreateProgressDto })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async insert(@Body() body: CreateProgressDto) {
    const createProgress = await this.progressService.insertSession(body);
    return { message: RESOURCE_CREATED, data: createProgress };
  }

  @Delete()
  @ApiBody({ type: DeleteProgressDto })
  async removeRecordFile(@Body() body: DeleteProgressDto) {
    console.log('controller user id=', body);
    const removeRecord = await this.progressService.deletePrevious(
      body.user_id,
    );

    return {
      data: removeRecord,
    };
  }
}
