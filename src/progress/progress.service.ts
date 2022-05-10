import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { IPageinatedDataTable } from 'src/app/interfaces';
import getMessages from 'src/app/api-messages';
import { IProgress } from './progress.schema';
import { CreateProgressDto } from './dtos/create-progress.dto';
import { PROGRESS_PROVIDER_TOKEN } from './progress.constant';

const { RESOURCE_ALREADY_EXIST } = getMessages('Progress(s)');

@Injectable()
export class ProgressService {
  constructor(
    @Inject(PROGRESS_PROVIDER_TOKEN)
    private progressModel: Model<IProgress>,
  ) {}

  async getProgressByName(title: string): Promise<IProgress> {
    return await this.progressModel
      .findOne({ title: title, is_enable: true })
      .populate({ path: 'uuid session', match: { is_enable: true } });
  }

  async getPaginatedProgress(
    rpp: number,
    page: number,
    filter: Object,
    orderBy: Object,
  ): Promise<IPageinatedDataTable> {
    const skip: number = (page - 1) * rpp;
    const totalDocuments: number = await this.progressModel.countDocuments(
      filter,
    );
    const totalPages: number = Math.ceil(totalDocuments / rpp);
    page = page > totalPages ? totalPages : page;

    const notifications = await this.progressModel
      .find(filter)
      .sort(orderBy)
      .skip(skip)
      .limit(rpp)
      .populate({ path: 'uuid session', match: { is_enable: true } });
    return {
      pages: `Page ${page} of ${totalPages}`,
      total: totalDocuments,
      data: notifications,
    };
  }

  async getFilteredProgress($filter: Object, $orderBy: Object) {
    return await this.progressModel
      .find($filter)
      .sort($orderBy)
      .populate({ path: 'uuid session', match: { is_enable: true } });
  }

  async insertSession(sessionObject: CreateProgressDto) {
    const { uuid, session, is_active, is_enable } = sessionObject;

    return await new this.progressModel({
      uuid,
      session,
      is_active,
      is_enable,
    }).save();
  }

  async deletePrevious(uuid: string) {
    await this.progressModel.deleteMany({ uuid: uuid });
  }
}
