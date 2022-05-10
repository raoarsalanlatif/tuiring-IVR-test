import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { IPageinatedDataTable } from 'src/app/interfaces';
import getMessages from 'src/app/api-messages';
import { ISession } from './session.schema';
import { SESSION_PROVIDER_TOKEN } from './session.constant';
import { CreateSessionDto } from './dtos/create-session.dto';

const { RESOURCE_ALREADY_EXIST } = getMessages('User(s)');

@Injectable()
export class SessionService {
  constructor(
    @Inject(SESSION_PROVIDER_TOKEN)
    private sessionModel: Model<ISession>,
  ) {}

  async getSessionByName(title: string): Promise<ISession> {
    return await this.sessionModel
      .findOne({
        'title.en': title,
        is_enable: true,
      })
      .populate({ path: 'exercise', match: { is_enable: true } });
  }

  async getPaginatedSession(
    rpp: number,
    page: number,
    filter: Object,
    orderBy: Object,
  ): Promise<IPageinatedDataTable> {
    const skip: number = (page - 1) * rpp;
    const totalDocuments: number = await this.sessionModel.countDocuments(
      filter,
    );
    const totalPages: number = Math.ceil(totalDocuments / rpp);
    page = page > totalPages ? totalPages : page;

    const notifications = await this.sessionModel
      .find(filter)
      .sort(orderBy)
      .skip(skip)
      .limit(rpp)
      .populate({ path: 'exercise', match: { is_enable: true } });
    return {
      pages: `Page ${page} of ${totalPages}`,
      total: totalDocuments,
      data: notifications,
    };
  }

  async getFilteredSession($filter: Object, $orderBy: Object) {
    return await this.sessionModel
      .find($filter)
      .sort($orderBy)
      .populate({ path: 'exercise', match: { is_enable: true } });
  }

  async insertSession(sessionObject: CreateSessionDto) {
    const { title, description, exercise, total_time, is_active, is_enable } =
      sessionObject;

    const ifExists = await this.getSessionByName(title.en);
    if (ifExists) {
      throw new ConflictException(RESOURCE_ALREADY_EXIST);
    }

    return await new this.sessionModel({
      title,
      description,
      exercise,
      total_time,
      is_active,
      is_enable,
    }).save();
  }
}
