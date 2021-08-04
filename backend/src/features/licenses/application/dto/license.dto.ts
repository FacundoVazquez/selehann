import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';

export class LicenseDto {
  @AutoMap()
  @IsString()
  readonly id: string;
  @AutoMap()
  @IsString()
  readonly software: string;
}
