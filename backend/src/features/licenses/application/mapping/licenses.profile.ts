import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { License } from '../../domain/entities/license.entity';
import { LicenseDto } from '../dto/license.dto';

@Injectable()
export class LicenseProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper.createMap(LicenseDto, License);

      mapper.createMap(License, LicenseDto);
    };
  }
}
