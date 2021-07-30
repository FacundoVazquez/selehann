import { AuthRepository } from './mongodb/auth.repository';

export const AUTH_REPOSITORY = 'AUTH_REPOSITORY';

export const AuthRepositoryProvider = {
  provide: AUTH_REPOSITORY,
  useClass: AuthRepository,
};
