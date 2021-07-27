import { AuthRepository } from './mongodb/auth.repository';

export const AuthRepositoryProvider = {
  provide: 'AUTH_REPOSITORY',
  useClass: AuthRepository,
};
