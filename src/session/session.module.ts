import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { DatabaseModule } from 'src/database/database.module';
import { SessionModel } from './session.model';

@Module({
  imports: [DatabaseModule],
  controllers: [SessionController],
  providers: [SessionService, ...SessionModel],
  exports: [SessionService],
})
export class SessionModule {}
