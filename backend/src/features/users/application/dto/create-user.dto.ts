import { AutoMap } from '@automapper/classes';
import { Optional } from '@nestjs/common';
import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/features/_shared/domain/roles/role.enum';

export class CreateUserDto {
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @AutoMap()
  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: Role;
}
