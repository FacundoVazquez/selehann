import { AutoMap } from '@automapper/classes';
import { IsMongoId, IsNotEmpty, IsOptional, IsString, NotEquals, ValidateIf } from 'class-validator';

export class FindOneUserDto {
  @AutoMap()
  @IsMongoId()
  @NotEquals(null)
  @ValidateIf((object, value) => value !== undefined)
  readonly id?: string;

  @AutoMap()
  @IsString()
  @NotEquals(null)
  @ValidateIf((object, value) => value !== undefined)
  readonly username?: string;
}
