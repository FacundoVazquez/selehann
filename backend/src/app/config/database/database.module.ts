import { TypeOrmModule } from '@nestjs/typeorm';
import { mySqlDbConnection } from './database.config';

export const MySqlDatabaseModule = TypeOrmModule.forRoot(mySqlDbConnection);
