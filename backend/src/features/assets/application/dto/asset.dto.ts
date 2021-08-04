import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';
import { AssetType } from 'src/features/_shared/domain/assets/asset.enum';

export class AssetDto {
  @AutoMap()
  @IsString()
  readonly id: string;
  @AutoMap()
  @IsString()
  readonly brand: string;
  @AutoMap()
  @IsString()
  readonly model: string;
  @AutoMap()
  readonly type: AssetType;
}
