import { RequestState } from 'src/features/_shared/data/interfaces';
import { IElement } from 'src/types';
import { AddDeveloperDto, DeveloperDto, FetchDevelopersDto, SetDeveloperStatusDto } from './dto';

export interface DevelopersState {
  data: Partial<DataState>;
  ui: Partial<UIState>;
}
export interface DataState {
  fetchDevelopers: RequestState<FetchDevelopersDto, DeveloperDto[]>;
  setDeveloperStatus: RequestState<SetDeveloperStatusDto, DeveloperDto[]>;
  addDeveloper: RequestState<AddDeveloperDto, DeveloperDto>;
  developers: Developer[];
}

export interface UIState {}

export interface Developer extends IElement {
  fullname: string;
  active: boolean;
}
