import { AutoMap } from '@automapper/classes';
import { IsString, NotEquals, ValidateIf } from 'class-validator';

export class UpdateUserDto {
  @AutoMap()
  @IsString()
  @NotEquals(null)
  @ValidateIf((_, value) => value !== undefined)
  readonly username?: string;

  @AutoMap()
  @IsString()
  @NotEquals(null)
  @ValidateIf((_, value) => value !== undefined)
  readonly password?: string;

  @AutoMap()
  @NotEquals(null)
  @ValidateIf((_, value) => value !== undefined)
  readonly roleId?: string;
}
