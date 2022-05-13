import { Schema } from 'mongoose';
import { PROGRESS_COLLECTION } from './progress.constant';
import { USER_COLLECTION } from 'src/user/user.constant';
import { SESSION_COLLECTION } from 'src/session/session.constant';
export enum Status {
  COMPLETE = 'Complete',
  INCOMPLETE = 'Incomplete',
}

export interface IProgress {
  user_id: Schema.Types.ObjectId;
  session: Schema.Types.ObjectId;
  status: string;
  is_active: boolean;
  is_enable: boolean;
}

export const ProgressSchema = new Schema<IProgress>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: USER_COLLECTION,
      required: true,
    },
    session: {
      type: Schema.Types.ObjectId,
      ref: SESSION_COLLECTION,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Status,
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
    collection: PROGRESS_COLLECTION,
  },
);

ProgressSchema.pre(['find', 'findOne', 'findOneAndUpdate'], function () {
  this.lean();
});
