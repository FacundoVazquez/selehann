import { AutoMap } from '@automapper/classes';
import { Entity, Persistable } from 'src/app/interfaces';
import { Role } from 'src/features/_shared/domain/roles/role.enum';

export interface IUser extends Entity, Persistable {
  username: string;
  password: string;
  salt: string;
  roleId: Role;

  verifyPassword: (submittedPassword: string) => boolean;
}

export class User implements IUser {
  @AutoMap()
  id: string;
  createdAt: string;
  updatedAt: string;
  @AutoMap()
  username: string;
  @AutoMap()
  password: string;
  salt: string;
  @AutoMap()
  roleId: Role;

  verifyPassword: (submittedPassword: string) => boolean;
}
