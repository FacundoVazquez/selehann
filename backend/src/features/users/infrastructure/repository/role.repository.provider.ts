import { RoleRepository } from './mongodb/role.repository';

export const ROLE_REPOSITORY = 'ROLE_REPOSITORY';

export const RoleRepositoryProvider = {
  provide: ROLE_REPOSITORY,
  useClass: RoleRepository,
};
