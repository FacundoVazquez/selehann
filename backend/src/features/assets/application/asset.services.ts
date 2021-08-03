import { Injectable } from '@nestjs/common';
import { Developer } from 'src/features/developers/domain/entities/developer.entity';
import { EntityManager, In } from 'typeorm';
import { Asset } from '../domain/entities/asset.entity';
import { FindManyAssetsByDeveloper } from './dto/find-many-assets-by-developer.dto';
import { FindManyAssetsDto } from './dto/find-many-assets.dto';

import { AssetMapping } from './mapping/asset.mapping';

@Injectable()
export class AssetService {
  constructor(private readonly manager: EntityManager, private readonly assetMapping: AssetMapping) {}

  async findAssets(findManyAssetsDto: FindManyAssetsDto) {
    const assets = await this.manager.find(Asset, findManyAssetsDto);

    const assetsDto = assets.map((u) => this.assetMapping.getAssetDto(u));
    return assetsDto;
  }

  async findAssetsByUser(findManyAssetsByDeveloper: FindManyAssetsByDeveloper) {
    const assets = await this.manager.createQueryBuilder().relation(Developer, 'assets').of(findManyAssetsByDeveloper.id).loadMany<Asset>();

    const assetsDto = assets.map((u) => this.assetMapping.getAssetDto(u));
    return assetsDto;
  }
}
