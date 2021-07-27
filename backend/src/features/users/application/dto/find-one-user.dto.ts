import { AutoMap } from '@automapper/classes';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FindOneUserDto {
  @AutoMap()
  @IsOptional()
  @IsMongoId()
  readonly id?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  readonly username?: string;
}
