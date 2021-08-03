import { AutoMap } from '@automapper/classes';
import { IsMongoId, IsString, NotEquals, ValidateIf } from 'class-validator';

export class FindOneUserDto {
  @AutoMap()
  @IsMongoId()
  @NotEquals(null)
  @ValidateIf((_, value) => value !== undefined)
  readonly id?: string;

  @AutoMap()
  @IsString()
  @NotEquals(null)
  @ValidateIf((_, value) => value !== undefined)
  readonly username?: string;
}
