import { AutoMap } from '@automapper/classes';
import { Entity, Persistable } from 'src/app/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/features/_shared/domain/roles/role.enum';

//import { Role } from './role.entity';

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
  @ApiProperty()
  verifyPassword: (submittedPassword: string) => boolean;
}
