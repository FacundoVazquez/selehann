import { AutoMap } from '@automapper/classes';
import { Entity } from 'src/app/interfaces';
import { Role } from '../roles/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export interface IUser extends Entity {
  username: string;
  password: string;
  salt: string;
  role: Role;
  validatePassword: (submittedPassword: string) => boolean;
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
  validatePassword: (submittedPassword: string) => boolean;
}
