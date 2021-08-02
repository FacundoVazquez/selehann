import { Module } from '@nestjs/common';
import { AuthModule } from 'src/features/auth/infrastructure/di/auth.module';
import { DevelopersModule } from 'src/features/developers/infrastructure/di/user.module';
import { UsersModule } from 'src/features/users/infrastructure/di/user.module';
import { AutomapperModule } from './config/automapper/mapping.module';
import { DatabaseModule } from './config/database/database.module';
import { LoggerModule } from './config/logger/logger.module';

@Module({
  imports: [AutomapperModule, LoggerModule, DatabaseModule, UsersModule, DevelopersModule, AuthModule],
})
export class AppModule {}
