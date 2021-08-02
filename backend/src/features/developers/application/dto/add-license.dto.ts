import { AutoMap } from '@automapper/classes';
import { IsArray, IsBoolean, IsMongoId, IsString, NotEquals, ValidateIf } from 'class-validator';

export class AddLicensesDto {
  @AutoMap()
  @IsArray()
  @IsString({ each: true })
  @NotEquals(null)
  @ValidateIf((object, value) => value !== undefined)
  readonly licenseIds?: string[];
}
