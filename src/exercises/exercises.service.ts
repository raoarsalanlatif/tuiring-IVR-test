import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { IPageinatedDataTable } from 'src/app/interfaces';
import getMessages from 'src/app/api-messages';
import { IExercise } from './exercise.schema';
import { EXERCISE_PROVIDER_TOKEN } from './exercise.constant';
import { CreateExerciseDto } from './dtos/create-exercise.dto';

const { RESOURCE_ALREADY_EXIST } = getMessages('User(s)');
@Injectable()
export class ExercisesService {
  constructor(
    @Inject(EXERCISE_PROVIDER_TOKEN)
    private exerciseModel: Model<IExercise>,
  ) {}

  async getExerciseByName(title: string): Promise<IExercise> {
    return await this.exerciseModel.findOne({
      'title.en': title,
      is_enable: true,
    });
  }

  async getPaginatedExercise(
    rpp: number,
    page: number,
    filter: Object,
    orderBy: Object,
  ): Promise<IPageinatedDataTable> {
    const skip: number = (page - 1) * rpp;
    const totalDocuments: number = await this.exerciseModel.countDocuments(
      filter,
    );
    const totalPages: number = Math.ceil(totalDocuments / rpp);
    page = page > totalPages ? totalPages : page;

    const notifications = await this.exerciseModel
      .find(filter)
      .sort(orderBy)
      .skip(skip)
      .limit(rpp);

    return {
      pages: `Page ${page} of ${totalPages}`,
      total: totalDocuments,
      data: notifications,
    };
  }

  async getFilteredExercise($filter: Object, $orderBy: Object) {
    return await this.exerciseModel.find($filter).sort($orderBy);
  }

  async insertExercise(exerciseObject: CreateExerciseDto) {
    const { title, description, time, text, is_active, is_enable } =
      exerciseObject;

    const ifExists = await this.getExerciseByName(title.en);
    if (ifExists) {
      throw new ConflictException(RESOURCE_ALREADY_EXIST);
    }

    return await new this.exerciseModel({
      title,
      description,
      time,
      text,
      is_active,
      is_enable,
    }).save();
  }
}
