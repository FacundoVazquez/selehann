import { AutoMap } from '@automapper/classes';
import { Role } from 'src/features/users/domain/entity/role.enum';

export class UserDto {
  @AutoMap()
  readonly id: string;
  @AutoMap()
  readonly username: string;
  @AutoMap()
  readonly role: Role;
}
