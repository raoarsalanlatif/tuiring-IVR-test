import { Connection } from 'mongoose';
import { ProgressSchema } from './progress.schema';
import { PROGRESS_PROVIDER_TOKEN } from './progress.constant';
import { PROGRESS_COLLECTION } from './progress.constant';
import { CONNECTION_PROVIDER } from 'src/database/database.constants';

export const ProgressModel = [
  {
    provide: PROGRESS_PROVIDER_TOKEN,
    useFactory: async (connection: Connection) =>
      connection.model(PROGRESS_COLLECTION, ProgressSchema),
    inject: [CONNECTION_PROVIDER],
  },
];
