import { MongooseModuleOptions } from '@nestjs/mongoose';

export const uri = 'mongodb+srv://admin:admin@cluster0.ohs1t.mongodb.net';
export const options: MongooseModuleOptions = {
  dbName: 'test',
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
