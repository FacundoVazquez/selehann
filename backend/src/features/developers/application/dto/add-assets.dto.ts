import { AutoMap } from '@automapper/classes';
import { IsArray, IsBoolean, IsString, NotEquals, ValidateIf } from 'class-validator';

export class AddAssetsDto {
  @AutoMap()
  @IsArray()
  @IsString({ each: true })
  @NotEquals(null)
  @ValidateIf((object, value) => value !== undefined)
  readonly assetIds?: string[];
}
