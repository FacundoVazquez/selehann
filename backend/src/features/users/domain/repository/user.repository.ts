import { IRepository } from 'src/app/interfaces';
import { User } from '../entity/user.entity';

export type IUserRepository = IRepository<User>;
