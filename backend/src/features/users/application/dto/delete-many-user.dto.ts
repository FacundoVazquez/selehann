import { AutoMap } from '@automapper/classes';
import { IsString, NotEquals, ValidateIf } from 'class-validator';

export class DeleteManyUserDto {
  @AutoMap()
  @IsString()
  @NotEquals(null)
  @ValidateIf((_, value) => value !== undefined)
  readonly role?: string;
}
