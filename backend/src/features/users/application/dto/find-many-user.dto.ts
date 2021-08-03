import { AutoMap } from '@automapper/classes';
import { IsEnum, NotEquals, ValidateIf } from 'class-validator';
import { Role } from 'src/features/_shared/domain/roles/role.enum';

export class FindManyUserDto {
  @AutoMap()
  @IsEnum(Role)
  @NotEquals(null)
  @ValidateIf((_, value) => value !== undefined)
  readonly role?: Role;
}
