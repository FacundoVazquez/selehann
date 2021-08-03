import { AutoMap } from '@automapper/classes';
import { IsArray, IsString, NotEquals, ValidateIf } from 'class-validator';

export class AssignResourceDto {
  @AutoMap()
  @IsArray()
  @IsString({ each: true })
  @NotEquals(null)
  @ValidateIf((_, value) => value !== undefined)
  readonly resourceIds?: string[];
}
