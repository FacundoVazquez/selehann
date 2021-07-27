import { AutoMap } from '@automapper/classes';
import { Optional } from '@nestjs/common';
import { IsEnum, IsString } from 'class-validator';
import { Role } from 'src/features/users/domain/entity/role.enum';

export class UpdateUserDto {
  @AutoMap()
  @Optional()
  @IsString()
  readonly username: string;

  @AutoMap()
  @Optional()
  @IsString()
  readonly password: string;

  @AutoMap()
  @Optional()
  @IsEnum(Role)
  readonly role: Role;
}
