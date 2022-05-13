import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  Body,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/app/filters/http-exception.filter';
import getMessages from 'src/app/api-messages';
import { QueryParamsDTO } from 'src/app/dtos/query-params.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IPaginationQuery } from 'src/app/interfaces';
import { TranslatorInterceptor } from 'src/app/interceptors/response-translate.interceptor';
import { ParamsHandler } from 'src/app/custom-decorators/params-handler.decorator';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dtos/create-exercise.dto';

const { RESOURCE_CREATED } = getMessages('exercise(s)');

UseFilters(HttpExceptionFilter);
@Controller('exercises')
@ApiTags('exercise')
export class ExercisesController {
  constructor(private exerciseService: ExercisesService) {}

  @Get()
  @ApiQuery({ type: QueryParamsDTO })
  @UseInterceptors(TranslatorInterceptor)
  async get(@ParamsHandler() pagination: IPaginationQuery) {
    const { $rpp, $page, $filter, $orderBy } = pagination;
    if ($rpp && $page) {
      return await this.exerciseService.getPaginatedExercise(
        $rpp,
        $page,
        $filter,
        $orderBy,
      );
    }
    return {
      data: await this.exerciseService.getFilteredExercise($filter, $orderBy),
    };
  }

  @Get('seed-model')
  async seed() {
    return await this.exerciseService.seed();
  }

  @Post()
  @ApiBody({ type: CreateExerciseDto })
  async insert(@Body() body: CreateExerciseDto) {
    const createExercise = await this.exerciseService.insertExercise(body);
    return { message: RESOURCE_CREATED, data: createExercise };
  }
}
