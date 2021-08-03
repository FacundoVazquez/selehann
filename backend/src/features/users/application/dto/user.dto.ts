import { AutoMap } from '@automapper/classes';

export class UserDto {
  @AutoMap()
  readonly id: string;
  @AutoMap()
  readonly username: string;
  @AutoMap()
  readonly roleId: string;
}
