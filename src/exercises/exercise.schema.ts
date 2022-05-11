import { Schema } from 'mongoose';
import { EXERCISE_COLLECTION } from './exercise.constant';
import { IMultilingual } from 'src/multilingual/multilingual.schema';
import { MultilingualSchema } from 'src/multilingual/multilingual.schema';

export interface IExercise {
  title: IMultilingual;
  description: IMultilingual;
  time: number;
  delay: number;
  text: string[];
  is_active: boolean;
  is_enable: boolean;
}

export const ExerciseSchema = new Schema<IExercise>(
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
    time: {
      type: Number,
      required: true,
    },
    delay: {
      type: Number,
      required: true,
    },
    text: {
      type: [String],
      required: true,
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
    collection: EXERCISE_COLLECTION,
  },
);

ExerciseSchema.pre(['find', 'findOne', 'findOneAndUpdate'], function () {
  this.lean();
});
