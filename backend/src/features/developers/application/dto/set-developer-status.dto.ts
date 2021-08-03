import { AutoMap } from '@automapper/classes';
import { IsBoolean, IsNotEmpty, IsString, IsUUID, ValidateIf } from 'class-validator';

export class SetDeveloperStatusDto {
  @AutoMap()
  @IsNotEmpty()
  @IsString({ each: true })
  // @IsUUID('4', { each: true })
  readonly developerIds: string[];

  @AutoMap()
  @IsBoolean()
  @IsNotEmpty()
  @ValidateIf((_, value) => value !== undefined)
  readonly active: boolean;
}
