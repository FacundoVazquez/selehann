import { AutoMap } from '@automapper/classes';
import { IsString, IsEnum } from 'class-validator';
import { Role } from 'src/features/users/domain/entity/role.enum';

export class CreateUserDto {
  @AutoMap()
  @IsString()
  readonly username: string;

  @AutoMap()
  @IsString()
  readonly password: string;

  @AutoMap()
  @IsEnum(Role)
  readonly role: Role;
}
