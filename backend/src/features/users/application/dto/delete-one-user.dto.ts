import { AutoMap } from '@automapper/classes';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class DeleteOneUserDto {
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  readonly id: string;
}
