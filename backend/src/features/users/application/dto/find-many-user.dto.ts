import { AutoMap } from '@automapper/classes';
import { IsEnum, IsString, NotEquals, ValidateIf } from 'class-validator';

export class FindManyUserDto {
  @AutoMap()
  @IsString()
  @NotEquals(null)
  @ValidateIf((_, value) => value !== undefined)
  readonly role?: string;
}
