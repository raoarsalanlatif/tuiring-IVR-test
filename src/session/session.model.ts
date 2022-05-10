import { Connection } from 'mongoose';
import { SessionSchema } from './session.schema';
import { SESSION_PROVIDER_TOKEN } from './session.constant';
import { SESSION_COLLECTION } from './session.constant';
import { CONNECTION_PROVIDER } from 'src/database/database.constants';

export const SessionModel = [
  {
    provide: SESSION_PROVIDER_TOKEN,
    useFactory: async (connection: Connection) =>
      connection.model(SESSION_COLLECTION, SessionSchema),
    inject: [CONNECTION_PROVIDER],
  },
];
