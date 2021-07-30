import { AutoMap } from '@automapper/classes';
import { IsEnum, IsOptional } from 'class-validator';
import { Role } from 'src/features/_shared/domain/roles/role.enum';

export class DeleteManyUserDto {
  @AutoMap()
  @IsOptional()
  @IsEnum(Role)
  readonly role?: Role;
}
