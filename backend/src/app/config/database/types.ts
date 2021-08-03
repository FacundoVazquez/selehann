import { TypeOrmModuleOptions as TypeOrmModuleOptionsNest } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export type TypeOrmModuleOptions = TypeOrmModuleOptionsNest & Partial<MysqlConnectionOptions>;
