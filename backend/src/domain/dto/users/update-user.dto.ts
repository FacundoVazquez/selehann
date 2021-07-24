import { Optional } from '@nestjs/common';
import { IsEnum, IsString } from 'class-validator';
import { Role } from 'src/domain/schemas/users/role.enum';

export class UpdateUserDto {
  @Optional()
  @IsString()
  readonly username: string;

  @Optional()
  @IsString()
  readonly password: string;

  @Optional()
  @IsEnum(Role)
  readonly role: Role;
}
