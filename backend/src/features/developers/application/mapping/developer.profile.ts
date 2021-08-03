import { ignore, mapFrom, mapWithArguments } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { Asset } from '../../../assets/domain/entities/asset.entity';
import { Developer } from '../../domain/entities/developer.entity';
import { License } from '../../../licenses/domain/entities/license.entity';
import {
  CreateDeveloperDto,
  DeleteManyDeveloperDto,
  DeleteOneDeveloperDto,
  FindManyDeveloperDto,
  FindOneDeveloperDto,
  UpdateDeveloperDto,
  DeveloperDto,
} from '../dto';
import { AssetDto } from '../../../assets/application/dto/asset.dto';
import { LicenseDto } from '../../../licenses/application/dto/license.dto';

@Injectable()
export class DeveloperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper.createMap(DeveloperDto, Developer);

      mapper
        .createMap(Developer, DeveloperDto)
        .forMember(
          (d) => d.assetIds,
          mapFrom((s) => s.assets?.map((a) => a.id)),
        )
        .forMember(
          (d) => d.licenseIds,
          mapFrom((s) => s.licenses?.map((l) => l.id)),
        );

      mapper.createMap(Asset, AssetDto);
      mapper.createMap(License, LicenseDto);

      mapper
        .createMap(CreateDeveloperDto, Developer)
        .forMember((d) => d.id, ignore())
        .forMember((d) => d.active, ignore())
        .forMember((d) => d.assets, ignore())
        .forMember((d) => d.licenses, ignore());

      mapper
        .createMap(FindOneDeveloperDto, Developer)
        .forMember((d) => d.fullname, ignore())
        .forMember((d) => d.active, ignore())
        .forMember((d) => d.assets, ignore())
        .forMember((d) => d.licenses, ignore());

      mapper
        .createMap(FindManyDeveloperDto, Developer)
        .forMember((d) => d.id, ignore())
        .forMember((d) => d.fullname, ignore())
        .forMember((d) => d.active, ignore())
        .forMember((d) => d.assets, ignore())
        .forMember((d) => d.licenses, ignore());

      mapper
        .createMap(UpdateDeveloperDto, Developer)
        .forMember((d) => d.id, ignore())
        .forMember((d) => d.assets, ignore())
        .forMember((d) => d.licenses, ignore());

      mapper
        .createMap(DeleteOneDeveloperDto, Developer)
        .forMember((d) => d.fullname, ignore())
        .forMember((d) => d.active, ignore())
        .forMember((d) => d.assets, ignore())
        .forMember((d) => d.licenses, ignore());

      mapper
        .createMap(DeleteManyDeveloperDto, Developer)
        .forMember((d) => d.id, ignore())
        .forMember((d) => d.fullname, ignore())
        .forMember((d) => d.active, ignore())
        .forMember((d) => d.assets, ignore())
        .forMember((d) => d.licenses, ignore());
    };
  }
}
