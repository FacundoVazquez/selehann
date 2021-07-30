import { UserRepository } from './mongodb/user.repository';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export const UserRepositoryProvider = {
  provide: USER_REPOSITORY,
  useClass: UserRepository,
};
