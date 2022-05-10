import {
  Controller,
  Get,
  Post,
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
import { SessionService } from './session.service';
import { CreateSessionDto } from './dtos/create-session.dto';

const { RESOURCE_CREATED } = getMessages('session(s)');

UseFilters(HttpExceptionFilter);
@Controller('session')
@ApiTags('Session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Get()
  @UseInterceptors(TranslatorInterceptor)
  @ApiQuery({ type: QueryParamsDTO })
  async get(@ParamsHandler() pagination: IPaginationQuery) {
    const { $rpp, $page, $filter, $orderBy } = pagination;
    if ($rpp && $page) {
      return await this.sessionService.getPaginatedSession(
        $rpp,
        $page,
        $filter,
        $orderBy,
      );
    }
    return {
      data: await this.sessionService.getFilteredSession($filter, $orderBy),
    };
  }

  @Post()
  @ApiBody({ type: CreateSessionDto })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async insert(@Body() body: CreateSessionDto) {
    const createSession = await this.sessionService.insertSession(body);
    return { message: RESOURCE_CREATED, data: createSession };
  }
}
