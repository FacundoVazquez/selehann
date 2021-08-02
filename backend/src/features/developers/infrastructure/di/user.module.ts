import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeveloperMapping } from '../../application/mapping/developer.mapping';
import { DeveloperProfile } from '../../application/mapping/developer.profile';
import { DeveloperService } from '../../application/service/developer.service';
import { Developer } from '../../domain/entity/developer.entity';
import { DeveloperController } from '../adapters/controller/user.controller';
import { DeveloperRepositoryProvider } from '../repository/developer.repository.provider';
import { developerSchema } from '../repository/mongodb/schemas/developer.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Developer.name, schema: developerSchema }])],
  controllers: [DeveloperController],
  providers: [DeveloperMapping, DeveloperProfile, DeveloperService, DeveloperRepositoryProvider],
  exports: [DeveloperMapping, DeveloperService, MongooseModule],
})
export class DevelopersModule {}
