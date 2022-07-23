import { Module } from '@nestjs/common';
import { CallForwardingController } from './call-forwarding.controller';
import { CallForwardingService } from './call-forwarding.service';
import { DatabaseModule } from 'src/database/database.module';
import { CallModel } from './call-forwarding.model';

@Module({
  imports: [DatabaseModule],
  controllers: [CallForwardingController],
  providers: [CallForwardingService, ...CallModel],
  exports: [CallForwardingService],
})
export class CallForwardingModule {}
