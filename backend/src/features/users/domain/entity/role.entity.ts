import { AutoMap } from '@automapper/classes';
import { Entity, Persistable } from 'src/app/interfaces';
import { Role as RoleEnum } from '../../../_shared/domain/roles/role.enum';

export interface IRole extends Entity, Persistable {
  role: RoleEnum;
  active: boolean;
}

export class Role implements IRole {
  @AutoMap()
  id: string;
  createdAt: string;
  updatedAt: string;
  @AutoMap()
  active: boolean;
  @AutoMap()
  role: RoleEnum;
}
