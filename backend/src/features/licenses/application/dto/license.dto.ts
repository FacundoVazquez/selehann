import { AutoMap } from '@automapper/classes';

export class LicenseDto {
  @AutoMap()
  readonly id: string;
  @AutoMap()
  readonly software: string;
}
