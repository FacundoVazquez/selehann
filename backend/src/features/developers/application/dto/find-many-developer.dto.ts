import { AutoMap } from '@automapper/classes';
import { IsBoolean, IsOptional } from 'class-validator';

export class FindManyDeveloperDto {
  @AutoMap()
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
