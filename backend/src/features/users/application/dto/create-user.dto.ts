import { AutoMap } from '@automapper/classes';
import { Optional } from '@nestjs/common';
import { IsString, IsEnum } from 'class-validator';
import { Role } from 'src/features/_shared/domain/roles/role.enum';

export class CreateUserDto {
  @AutoMap()
  @Optional()
  @IsString()
  readonly username?: string;

  @AutoMap()
  @Optional()
  @IsString()
  readonly password?: string;

  @AutoMap()
  @Optional()
  @IsEnum(Role)
  readonly role?: Role;
}
