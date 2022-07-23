export interface IAppEnv {
  env: string;
  db: {
    connectionUrl: string;
  };
  server: {
    port: number;
    allowedClients: string[];
  };
}

export interface IDb {
  connectionUrl: string;
}

export interface IRoot {
  env: String;
}

export interface IServer {
  port: number;
  allowedClients: string[];
}

export interface ITwilioSID {
  twilioSid: String;
}

export interface ITwilioAuthToken {
  twilioAuthToken: String;
}
