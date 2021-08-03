import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeveloperMapping } from '../../application/mapping/developer.mapping';
import { DeveloperProfile } from '../../application/mapping/developer.profile';
import { DeveloperService } from '../../application/developer.services';
import { Developer } from '../../domain/entities/developer.entity';
import { DeveloperController } from '../adapters/developer.controller';
import { AssetMapping } from 'src/features/assets/application/mapping/asset.mapping';
import { LicenseMapping } from 'src/features/licenses/application/mapping/licenses.mapping';

@Module({
  imports: [TypeOrmModule.forFeature([Developer])],
  controllers: [DeveloperController],
  providers: [DeveloperMapping, AssetMapping, LicenseMapping, DeveloperProfile, DeveloperService],
  exports: [DeveloperMapping, DeveloperService, TypeOrmModule],
})
export class DevelopersModule {}
