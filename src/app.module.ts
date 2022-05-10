import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { db, root, server } from './config/env.config';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';
import { ExercisesModule } from './exercises/exercises.module';
import { ProgressModule } from './progress/progress.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [root, db, server],
    }),
    DatabaseModule,
    HealthModule,
    UserModule,
    ExercisesModule,
    ProgressModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
