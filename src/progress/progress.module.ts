import { Module } from '@nestjs/common';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { DatabaseModule } from 'src/database/database.module';
import { ProgressModel } from './progress.model';

@Module({
  imports: [DatabaseModule],
  controllers: [ProgressController],
  providers: [ProgressService, ...ProgressModel],
  exports: [ProgressService],
})
export class ProgressModule {}
