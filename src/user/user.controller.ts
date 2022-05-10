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
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

const { RESOURCE_CREATED } = getMessages('user(s)');

UseFilters(HttpExceptionFilter);
@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseInterceptors(TranslatorInterceptor)
  @ApiQuery({ type: QueryParamsDTO })
  async get(@ParamsHandler() pagination: IPaginationQuery) {
    const { $rpp, $page, $filter, $orderBy } = pagination;
    if ($rpp && $page) {
      return await this.userService.getPaginatedUser(
        $rpp,
        $page,
        $filter,
        $orderBy,
      );
    }
    return {
      data: await this.userService.getFilteredUser($filter, $orderBy),
    };
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async insert(@Body() body: CreateUserDto) {
    const createNotification = await this.userService.insertUser(body);
    return { message: RESOURCE_CREATED, data: createNotification };
  }
}
