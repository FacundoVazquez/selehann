import { MongooseModuleOptions } from '@nestjs/mongoose';
import { configuration } from '../configuration/configuration';

export const options: MongooseModuleOptions = {
  uri: configuration.databases.mongo[0].options.uri,
  dbName: configuration.databases.mongo[0].options.dbName,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
