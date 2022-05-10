import { Schema } from 'mongoose';
import { USER_COLLECTION } from './user.constant';

export enum U_Package {
  WEEKLY = 'One week',
  MONTHLY = 'One Month',
  SIXMONTH = 'Six Months',
}

export interface IUser {
  uuid: string;
  user_package: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  is_enable: boolean;
}

export const UserSchema = new Schema<IUser>(
  {
    uuid: {
      type: String,
      required: true,
    },
    user_package: {
      type: String,
      required: true,
      enum: U_Package,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_enable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    collection: USER_COLLECTION,
  },
);

UserSchema.pre(['find', 'findOne', 'findOneAndUpdate'], function () {
  this.lean();
});
