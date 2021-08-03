import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { Asset } from '../../domain/entities/asset.entity';
import { AssetDto } from '../dto/asset.dto';

@Injectable()
export class AssetProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper.createMap(AssetDto, Asset);

      mapper.createMap(Asset, AssetDto);
    };
  }
}
