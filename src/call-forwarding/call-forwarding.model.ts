import { Connection } from 'mongoose';
import { CallSchema } from './call-forwarding.schema';
import { CALL_PROVIDER_TOKEN } from './call-forwarding.constant';
import { CALL_COLLECTION } from './call-forwarding.constant';
import { CONNECTION_PROVIDER } from 'src/database/database.constants';

export const CallModel = [
  {
    provide: CALL_PROVIDER_TOKEN,
    useFactory: async (connection: Connection) =>
      connection.model(CALL_COLLECTION, CallSchema),
    inject: [CONNECTION_PROVIDER],
  },
];
