import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetMapping } from '../../application/mapping/asset.mapping';
import { AssetProfile } from '../../application/mapping/asset.profile';
import { AssetService } from '../../application/asset.services';
import { Asset } from '../../domain/entities/asset.entity';
import { AssetController } from '../adapters/asset.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Asset])],
  controllers: [AssetController],
  providers: [AssetMapping, AssetProfile, AssetService],
  exports: [AssetMapping, AssetService, TypeOrmModule],
})
export class AssetsModule {}
