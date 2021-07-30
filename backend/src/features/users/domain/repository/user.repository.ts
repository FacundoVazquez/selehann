import { IRepository } from 'src/app/interfaces';
import { Role } from '../entity/role.entity';
import { User } from '../entity/user.entity';

export type Username = User['username'];
export type Password = User['password'];

export type IUserRepository = IRepository<User>;
export type IRoleRepository = IRepository<Role>;
