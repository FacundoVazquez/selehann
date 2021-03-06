import { RequestState } from 'src/features/_shared/data/interfaces';
import { IElement } from 'src/types';
import { AssignRevokeResourcesDto } from '../../_data/types';
import { LicenseDto, FetchLicensesDto } from './dto';

export interface LicensesState {
  data: Partial<DataState>;
  ui: Partial<UIState>;
}
export interface DataState {
  fetchLicenses: RequestState<FetchLicensesDto, LicenseDto[]>;
  licenses: License[];
  fetchLicensesByDeveloper: RequestState<FetchLicensesDto, LicenseDto[]>;
  licensesByDeveloper: { [key: string]: License[] };
  setLicenses: RequestState<AssignRevokeResourcesDto, LicenseDto[]>;
}

export interface UIState {}

export interface License extends IElement {
  software: string;
}
