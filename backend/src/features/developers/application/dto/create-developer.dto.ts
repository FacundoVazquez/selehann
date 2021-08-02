import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeveloperDto {
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  readonly fullname: string;
}
