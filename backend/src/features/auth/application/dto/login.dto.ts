import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
