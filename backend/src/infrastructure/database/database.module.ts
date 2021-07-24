import { MongooseModule } from '@nestjs/mongoose';
import { options, uri } from './database.config';

export const DatabaseModule = MongooseModule.forRoot(uri, options);
