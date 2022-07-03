import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { IPageinatedDataTable } from 'src/app/interfaces';
import getMessages from 'src/app/api-messages';
import { IUser } from './user.schema';
import { USER_PROVIDER_TOKEN } from './user.constant';
import { CreateUserDto } from './dtos/create-user.dto';
import { ProgressService } from 'src/progress/progress.service';

const { RESOURCE_ALREADY_EXIST } = getMessages('User(s)');

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_PROVIDER_TOKEN)
    private userModel: Model<IUser>,
    private progressService: ProgressService,
  ) {}

  async getUserByName(uuid: string): Promise<IUser> {
    return await this.userModel.findOne({ uuid: uuid, is_enable: true });
  }

  async getPaginatedUser(
    rpp: number,
    page: number,
    filter: Object,
    orderBy: Object,
  ): Promise<IPageinatedDataTable> {
    const skip: number = (page - 1) * rpp;
    const totalDocuments: number = await this.userModel.countDocuments(filter);
    const totalPages: number = Math.ceil(totalDocuments / rpp);
    page = page > totalPages ? totalPages : page;

    const notifications = await this.userModel
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

  async getFilteredUser($filter: Object, $orderBy: Object) {
    return await this.userModel.find($filter).sort($orderBy);
  }

  async insertUser(userObject: CreateUserDto) {
    const { uuid, user_package, start_date, end_date, is_active, is_enable } =
      userObject;

    const ifExists = await this.getUserByName(uuid);
    if (ifExists) {
      await this.progressService.deletePrevious(ifExists._id);
      return await this.userModel.updateOne({ uuid: uuid }, userObject, {
        new: true,
      });
    }

    return await new this.userModel({
      uuid,
      user_package,
      start_date,
      end_date,
      is_active,
      is_enable,
    }).save();
  }
}
