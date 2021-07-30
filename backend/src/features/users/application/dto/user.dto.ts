import { AutoMap } from '@automapper/classes';
import { Role } from '../../../_shared/domain/roles/role.enum';

export class UserDto {
  @AutoMap()
  readonly id: string;
  @AutoMap()
  readonly username: string;
  @AutoMap()
  readonly role: Role;
}
