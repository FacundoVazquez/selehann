import { Key } from 'react';

export interface FetchAssetsDto {
  id: Key;
}

export interface AssetDto {
  id: string;
  brand: string;
  model: string;
  type: string;
}
