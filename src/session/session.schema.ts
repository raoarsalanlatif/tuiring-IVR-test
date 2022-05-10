import { Schema } from 'mongoose';
import { SESSION_COLLECTION } from './session.constant';
import { IMultilingual } from 'src/multilingual/multilingual.schema';
import { MultilingualSchema } from 'src/multilingual/multilingual.schema';
import { EXERCISE_COLLECTION } from 'src/exercises/exercise.constant';

export interface ISession {
  title: IMultilingual;
  description: IMultilingual;
  exercises: Schema.Types.ObjectId[];
  total_time: number;
  is_active: boolean;
  is_enable: boolean;
}

export const SessionSchema = new Schema<ISession>(
  {
    title: {
      type: MultilingualSchema,
      required: true,
      _id: false,
    },
    description: {
      type: MultilingualSchema,
      required: true,
      _id: false,
    },
    exercises: {
      type: [Schema.Types.ObjectId],
      ref: EXERCISE_COLLECTION,
      default: [],
    },
    total_time: {
      type: Number,
      required: false,
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
    collection: SESSION_COLLECTION,
  },
);

SessionSchema.pre(['find', 'findOne', 'findOneAndUpdate'], function () {
  this.lean();
});
