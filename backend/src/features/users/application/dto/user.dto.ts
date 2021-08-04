import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';

export class UserDto {
  @AutoMap()
  @IsString()
  readonly id: string;
  @AutoMap()
  @IsString()
  readonly username: string;
  @AutoMap()
  @IsString()
  readonly roleId: string;
}
