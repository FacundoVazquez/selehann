import { ignore, mapFrom, mapWithArguments } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { Developer } from '../../domain/entity/developer.entity';
import {
  CreateDeveloperDto,
  DeleteManyDeveloperDto,
  DeleteOneDeveloperDto,
  FindManyDeveloperDto,
  FindOneDeveloperDto,
  UpdateDeveloperDto,
  DeveloperDto,
} from '../dto';

@Injectable()
export class DeveloperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper.createMap(DeveloperDto, Developer);

      mapper.createMap(Developer, DeveloperDto);
      /* 
        .beforeMap((s, d) => {
          console.log('Mapped Init', s, d);
        })
        .afterMap((s, d) => {
          console.log('Mapped OK', s, d);
        }); */

      mapper
        .createMap(CreateDeveloperDto, Developer)
        .forMember((d) => d.id, ignore())
        .forMember((d) => d.active, ignore())
        .forMember((d) => d.assetIds, ignore())
        .forMember((d) => d.licenseIds, ignore());

      mapper
        .createMap(FindOneDeveloperDto, Developer)
        .forMember((d) => d.fullname, ignore())
        .forMember((d) => d.active, ignore())
        .forMember((d) => d.assetIds, ignore())
        .forMember((d) => d.licenseIds, ignore());

      mapper
        .createMap(FindManyDeveloperDto, Developer)
        .forMember((d) => d.id, ignore())
        .forMember((d) => d.fullname, ignore())
        .forMember((d) => d.active, ignore())
        .forMember((d) => d.assetIds, ignore())
        .forMember((d) => d.licenseIds, ignore());

      mapper
        .createMap(UpdateDeveloperDto, Developer)
        .forMember((d) => d.id, ignore())
        .forMember((d) => d.assetIds, ignore())
        .forMember((d) => d.licenseIds, ignore());

      mapper
        .createMap(DeleteOneDeveloperDto, Developer)
        .forMember((d) => d.fullname, ignore())
        .forMember((d) => d.active, ignore())
        .forMember((d) => d.assetIds, ignore())
        .forMember((d) => d.licenseIds, ignore());

      mapper
        .createMap(DeleteManyDeveloperDto, Developer)
        .forMember((d) => d.id, ignore())
        .forMember((d) => d.fullname, ignore())
        .forMember((d) => d.active, ignore())
        .forMember((d) => d.assetIds, ignore())
        .forMember((d) => d.licenseIds, ignore());
    };
  }
}
