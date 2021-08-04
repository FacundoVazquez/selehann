import { AutoMap } from '@automapper/classes';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class DeveloperDto {
  @AutoMap()
  @IsOptional()
  @IsString()
  readonly id: string;
  @AutoMap()
  @IsOptional()
  @IsString()
  readonly fullname: string;
  @AutoMap()
  @IsOptional()
  @IsBoolean()
  readonly active: boolean;
  @AutoMap()
  @IsOptional()
  @IsString({ each: true })
  readonly assetIds: string[];
  @AutoMap()
  @IsOptional()
  @IsString({ each: true })
  readonly licenseIds: string[];
}
