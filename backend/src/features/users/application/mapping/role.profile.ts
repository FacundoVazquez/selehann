import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { Role } from '../../domain/entities/role.entity';
import { RoleDto } from '../dto/role.dto';

@Injectable()
export class RoleProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper.createMap(RoleDto, Role);

      mapper.createMap(Role, RoleDto);
    };
  }
}
