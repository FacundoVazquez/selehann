import { AutoMap } from '@automapper/classes';
import { IsEnum, IsString, NotEquals, ValidateIf } from 'class-validator';
import { Role } from 'src/features/_shared/domain/roles/role.enum';

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
  //@IsEnum(Role)
  @NotEquals(null)
  @ValidateIf((_, value) => value !== undefined)
  readonly roleId?: string;
}
