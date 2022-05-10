import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { ExerciseModel } from './exercise.model';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ExercisesController],
  providers: [ExercisesService, ...ExerciseModel],
  exports: [ExercisesService],
})
export class ExercisesModule {}
