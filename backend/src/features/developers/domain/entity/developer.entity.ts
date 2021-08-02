import { AutoMap } from '@automapper/classes';
import { Entity, Persistable } from 'src/app/interfaces';

//import { Role } from './role.entity';

export interface IDeveloper extends Entity, Persistable {
  fullname: string;
  active: boolean;
  assetIds: string[];
  licenseIds: string[];
  addAssets: (assetIds: string[]) => void;
  deleteAssets: (assetIds: string[]) => void;
}

export class Developer implements IDeveloper {
  @AutoMap()
  id: string;
  createdAt: string;
  updatedAt: string;
  @AutoMap()
  fullname: string;
  @AutoMap()
  active: boolean;
  @AutoMap()
  assetIds: string[];
  @AutoMap()
  licenseIds: string[];

  addAssets: (assetIds: string[]) => void;
  deleteAssets: (assetIds: string[]) => void;
}
