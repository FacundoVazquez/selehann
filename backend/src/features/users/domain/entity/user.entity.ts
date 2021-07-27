import { AutoMap } from '@automapper/classes';
import { Entity } from 'src/app/interfaces';
import { Role } from '../roles/role.enum';

export interface IUser extends Entity {
  username: string;
  password: string;
  salt: string;
  role: Role;
}

export class User implements IUser {
  @AutoMap()
  id: string;
  createdAt: string;
  updatedAt: string;
  @AutoMap()
  username: string;
  password: string;
  salt: string;
  @AutoMap()
  role: Role;
}
