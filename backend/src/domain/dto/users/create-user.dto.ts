import { IsString, IsEnum } from 'class-validator';
import { Role } from 'src/domain/schemas/users/role.enum';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsEnum(Role)
  readonly role: Role;
}
