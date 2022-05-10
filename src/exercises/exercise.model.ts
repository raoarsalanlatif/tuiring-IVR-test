import { Connection } from 'mongoose';
import { ExerciseSchema } from './exercise.schema';
import { EXERCISE_PROVIDER_TOKEN } from './exercise.constant';
import { EXERCISE_COLLECTION } from './exercise.constant';
import { CONNECTION_PROVIDER } from 'src/database/database.constants';

export const ExerciseModel = [
  {
    provide: EXERCISE_PROVIDER_TOKEN,
    useFactory: async (connection: Connection) =>
      connection.model(EXERCISE_COLLECTION, ExerciseSchema),
    inject: [CONNECTION_PROVIDER],
  },
];
