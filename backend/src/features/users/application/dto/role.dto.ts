import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';

export class RoleDto {
  @AutoMap()
  @IsString()
  readonly role: string;
}
