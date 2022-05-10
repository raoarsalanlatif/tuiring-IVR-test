import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import { DatabaseModule } from 'src/database/database.module';
import { ProgressModule } from 'src/progress/progress.module';

@Module({
  imports: [DatabaseModule, ProgressModule],
  controllers: [UserController],
  providers: [UserService, ...UserModel],
  exports: [UserService],
})
export class UserModule {}
