import { DeveloperRepository } from './mongodb/developer.repository';

export const DEVELOPER_REPOSITORY = 'DEVELOPER_REPOSITORY';

export const DeveloperRepositoryProvider = {
  provide: DEVELOPER_REPOSITORY,
  useClass: DeveloperRepository,
};
