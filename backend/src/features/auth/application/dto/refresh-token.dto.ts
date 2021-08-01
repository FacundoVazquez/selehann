import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  readonly refreshToken: string;
}
