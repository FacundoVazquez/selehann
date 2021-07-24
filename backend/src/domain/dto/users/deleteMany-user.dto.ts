import { IsEnum, IsOptional } from 'class-validator';
import { Role } from 'src/domain/schemas/users/role.enum';

export class DeleteManyUserDto {
  @IsOptional()
  @IsEnum(Role)
  readonly role: Role;
}
