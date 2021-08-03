import { AutoMap } from '@automapper/classes';
import { AssetType } from 'src/features/_shared/domain/assets/asset.enum';

export class AssetDto {
  @AutoMap()
  readonly id: string;
  @AutoMap()
  readonly brand: string;
  @AutoMap()
  readonly model: string;
  @AutoMap()
  readonly type: AssetType;
}
