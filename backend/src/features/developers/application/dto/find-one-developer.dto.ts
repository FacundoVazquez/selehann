import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindOneDeveloperDto {
  @AutoMap()
  @IsNotEmpty()
  //@IsUUID()
  readonly id: string;
}
