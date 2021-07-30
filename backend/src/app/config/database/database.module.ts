import { MongooseModule } from '@nestjs/mongoose';
import { options } from './database.config';

export const DatabaseModule = MongooseModule.forRoot(options.uri, options);
