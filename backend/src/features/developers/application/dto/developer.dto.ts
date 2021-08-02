import { AutoMap } from '@automapper/classes';

export class DeveloperDto {
  @AutoMap()
  readonly id: string;
  @AutoMap()
  readonly fullname: string;
  @AutoMap()
  readonly active: boolean;
  @AutoMap()
  readonly assetIds: string[];
  @AutoMap()
  readonly licenseIds: string[];
}
