import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Role } from '../../domain/entities/role.entity';
import { RoleDto } from '../dto/role.dto';

@Injectable()
export class RoleMapping {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  getRole(role: Role): Role {
    return plainToClass(Role, role);
  }

  getRoleDto(role: Role): RoleDto {
    return this.mapper.map(role, RoleDto, Role);
  }
}
