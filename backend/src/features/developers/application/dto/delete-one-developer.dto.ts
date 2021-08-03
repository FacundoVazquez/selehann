import { AutoMap } from '@automapper/classes';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteOneDeveloperDto {
  @AutoMap()
  @IsNotEmpty()
  readonly id: string;
}
