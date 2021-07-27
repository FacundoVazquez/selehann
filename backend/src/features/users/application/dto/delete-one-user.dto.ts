import { AutoMap } from '@automapper/classes';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteOneUserDto {
  @AutoMap()
  @IsNotEmpty()
  @IsMongoId()
  readonly id: string;
}
