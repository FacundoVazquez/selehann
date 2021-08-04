import { AutoMap } from '@automapper/classes';
import { IsEnum, IsString } from 'class-validator';
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
  @IsEnum(AssetType)
  readonly type: AssetType;
}
