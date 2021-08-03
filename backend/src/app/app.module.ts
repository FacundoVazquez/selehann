import { Module } from '@nestjs/common';
import { AssetsModule } from 'src/features/assets/infrastructure/di/asset.module';
import { AuthModule } from 'src/features/auth/infrastructure/di/auth.module';
import { DevelopersModule } from 'src/features/developers/infrastructure/di/developer.module';
import { LicensesModule } from 'src/features/licenses/infrastructure/di/license.module';
import { UsersModule } from 'src/features/users/infrastructure/di/user.module';
import { Connection } from 'typeorm';
import { AutomapperModule } from './config/automapper/mapping.module';
import { MySqlDatabaseModule } from './config/database/database.module';
import { LoggerModule } from './config/logger/logger.module';

@Module({
  imports: [AutomapperModule, LoggerModule, MySqlDatabaseModule, AuthModule, UsersModule, DevelopersModule, AssetsModule, LicensesModule],
})
export class AppModule {
  // constructor(private connection: Connection) {}
}
