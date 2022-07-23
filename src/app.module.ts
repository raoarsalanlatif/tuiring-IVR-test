import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { db, root, server } from './config/env.config';
import { HealthModule } from './health/health.module';
import { TwilioModule } from 'nestjs-twilio';
import { CallForwardingModule } from './call-forwarding/call-forwarding.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [root, db, server],
    }),
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
    DatabaseModule,
    HealthModule,
    CallForwardingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
