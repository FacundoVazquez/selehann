import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IRole, Role } from '../../domain/entity/role.entity';
import { RoleDto } from '../dto/role.dto';

@Injectable()
export class RoleMapping {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  getRole(role: IRole): Role {
    return plainToClass(Role, role);
  }

  getRoleDto(role: Role): RoleDto {
    return this.mapper.map(role, RoleDto, Role);
  }
}
