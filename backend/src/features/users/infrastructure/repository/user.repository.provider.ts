import { UserRepository } from './mongodb/user.repository';

export const UserRepositoryProvider = {
  provide: 'USER_REPOSITORY',
  useClass: UserRepository,
};
