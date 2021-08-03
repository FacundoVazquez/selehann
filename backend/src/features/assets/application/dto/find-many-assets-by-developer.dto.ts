import { IsString } from 'class-validator';

export class FindManyAssetsByDeveloper {
  @IsString()
  id: string;
}
