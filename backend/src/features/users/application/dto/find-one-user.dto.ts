import { AutoMap } from '@automapper/classes';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FindOneUserDto {
  @AutoMap()
  @IsNotEmpty()
  @IsMongoId()
  readonly id: string;
}
