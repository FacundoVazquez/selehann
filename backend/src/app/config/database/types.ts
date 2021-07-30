import { MongooseModuleOptions } from '@nestjs/mongoose';

export interface MongoDB {
  options: MongooseModuleOptions;
}
