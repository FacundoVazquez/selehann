import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { Asset } from '../../domain/entities/asset.entity';
import { AssetDto } from '../dto/asset.dto';
import { FindManyAssetsDto } from '../dto/find-many-assets.dto';

@Injectable()
export class AssetMapping {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  getAssetDto(asset: Asset): AssetDto {
    return this.mapper.map(asset, AssetDto, Asset);
  }

  getAssetFromFindManyAsset(dto: FindManyAssetsDto): Partial<Asset> {
    return this.mapper.map(dto, Asset, FindManyAssetsDto);
  }
}
