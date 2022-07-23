/**
 * This module helps in organizing environment variables, and provides following advantages
 * Helps in renaming the variables
 * Helps in maping the varibles and seeing if missed some variables. This can be done with unit test cases.
 */
import { registerAs } from '@nestjs/config';
import {
  IDb,
  IServer,
  IRoot,
  ITwilioAuthToken,
  ITwilioSID,
} from './env.config.interface';

export const db = registerAs(
  'db',
  (): IDb => ({
    connectionUrl: process.env.DB_URL,
  }),
);

export const server = registerAs(
  'server',
  (): IServer => ({
    port: parseInt(process.env.PORT),
    allowedClients: process.env.ALLOWED_CLIENTS?.split(','),
  }),
);

export const root = registerAs(
  'root',
  (): IRoot => ({
    env: process.env.NODE_ENV,
  }),
);

export const twilioAuth = registerAs(
  'twilioAuth',
  (): ITwilioAuthToken => ({
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  }),
);

export const twilioSid = registerAs(
  'twilioSid',
  (): ITwilioSID => ({
    twilioSid: process.env.TWILIO_SID,
  }),
);
