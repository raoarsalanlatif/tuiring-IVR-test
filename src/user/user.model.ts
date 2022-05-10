import { Connection } from 'mongoose';
import { UserSchema } from './user.schema';
import { USER_PROVIDER_TOKEN } from './user.constant';
import { USER_COLLECTION } from './user.constant';
import { CONNECTION_PROVIDER } from 'src/database/database.constants';

export const UserModel = [
  {
    provide: USER_PROVIDER_TOKEN,
    useFactory: async (connection: Connection) =>
      connection.model(USER_COLLECTION, UserSchema),
    inject: [CONNECTION_PROVIDER],
  },
];
