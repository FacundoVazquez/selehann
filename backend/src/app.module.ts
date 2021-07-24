import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UsersModule } from './infrastructure/users/users.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [LoggerModule.forRoot(), DatabaseModule, UsersModule],
})
export class AppModule {}
