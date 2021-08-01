import { AutoMap } from '@automapper/classes';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/features/_shared/domain/roles/role.enum';

export class RegisterDto {
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
  @IsString()
  readonly repeatedPassword: string;

  @AutoMap()
  @IsEnum(Role)
  readonly role: Role;
}
