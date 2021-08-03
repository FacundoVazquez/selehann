import { AutoMap } from '@automapper/classes';
import { IsArray, IsBoolean, IsString, NotEquals, ValidateIf } from 'class-validator';

export class UpdateDeveloperDto {
  @AutoMap()
  @IsString()
  @NotEquals(null)
  @ValidateIf((_, value) => value !== undefined)
  readonly fullname?: string;

  @AutoMap()
  @IsBoolean()
  @NotEquals(null)
  @ValidateIf((_, value) => value !== undefined)
  readonly active?: boolean;
}
