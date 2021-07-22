import { Module } from '@nestjs/common';
import { UsersModule } from './infrastructure/users/users.module';
import { UsersController } from './app/users/users.controller';

@Module({
  imports: [UsersModule],
  controllers: [UsersController],
})
export class AppModule {}
