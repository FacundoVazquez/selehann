import { AutoMap } from '@automapper/classes';
import { Entity, Persistable } from 'src/app/interfaces';
import { ApiProperty } from '@nestjs/swagger';
//import { Role } from '../roles/role.enum';
import { Role } from './role.entity';

export interface IUser extends Entity, Persistable {
  username: string;
  password: string;
  salt: string;
  role: Role;
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
  role: Role;
  @ApiProperty()
  verifyPassword: (submittedPassword: string) => boolean;
}
