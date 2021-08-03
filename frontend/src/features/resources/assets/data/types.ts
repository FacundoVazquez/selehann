import { Key } from 'react';
import { RequestState } from 'src/features/_shared/data/interfaces';
import { IElement } from 'src/types';
import { AssignRevokeResourcesDto } from '../../_data/types';
import { AssetDto, FetchAssetsDto } from './dto';

export interface AssetsState {
  data: Partial<DataState>;
  ui: Partial<UIState>;
}

export interface DataState {
  fetchAssets: RequestState<FetchAssetsDto, AssetDto[]>;
  assets: Asset[];
  fetchAssetsByDeveloper: RequestState<FetchAssetsDto, AssetDto[]>;
  assetsByDeveloper: { [key: string]: Asset[] };
  setAssets: RequestState<AssignRevokeResourcesDto, AssetDto[]>;
}

export interface UIState {}

export interface Asset extends IElement {
  brand: string;
  model: string;
  type: string;
}
