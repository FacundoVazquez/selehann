import { Id, IRepository } from 'src/app/interfaces';
import { Developer } from '../entity/developer.entity';

export interface IDeveloperRepository extends IRepository<Developer> {
  addAssets(id: Id, assetIds: string[]): Promise<Developer>;
  addLicenses(id: Id, licensesId: string[]): Promise<Developer>;
}
