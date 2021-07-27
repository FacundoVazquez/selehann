import { Module } from '@nestjs/common';
import { UsersModule } from 'src/features/users/infrastructure/di/user.module';
import { AutomapperModule } from './config/automapper/mapping.module';
import { ConfigModule } from './config/configuration/config.module';
import { DatabaseModule } from './config/database/database.module';
import { LoggerModule } from './config/logger/logger.module';

@Module({
  imports: [ConfigModule, AutomapperModule, LoggerModule, DatabaseModule, UsersModule],
})
export class AppModule {}
