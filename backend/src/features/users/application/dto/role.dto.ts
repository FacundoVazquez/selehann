import { AutoMap } from '@automapper/classes';

export class RoleDto {
  @AutoMap()
  readonly role: string;
}
