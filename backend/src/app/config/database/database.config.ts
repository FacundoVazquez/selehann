import { Asset } from 'src/features/assets/domain/entities/asset.entity';
import { Developer } from 'src/features/developers/domain/entities/developer.entity';
import { License } from 'src/features/licenses/domain/entities/license.entity';
import { Role } from 'src/features/users/domain/entities/role.entity';
import { User } from 'src/features/users/domain/entities/user.entity';
import { configuration } from '../configuration/configuration';
import { TypeOrmModuleOptions } from './types';

export const mySqlDbConnection: TypeOrmModuleOptions = {
  type: 'mysql',
  host: configuration.databases.mysql[0].host,
  port: configuration.databases.mysql[0].port,
  username: configuration.databases.mysql[0].username,
  password: configuration.databases.mysql[0].password,
  database: configuration.databases.mysql[0].database,
  entities: [User, Role, Developer, Asset, License],
  //entities: [__dirname + '/**/*.entity.ts'],
  migrationsTableName: '_migrations',
  migrations: ['src/app/config/database/mysql/migrations/*{.ts,.js}'],
  migrationsRun: true,
  logging: configuration.databases.logger,
  //logger: configuration.databases.logger ? 'debug' : undefined,
  synchronize: false,
  dropSchema: false,
};

console.log(mySqlDbConnection);
