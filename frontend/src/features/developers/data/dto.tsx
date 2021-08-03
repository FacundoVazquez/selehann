export interface FetchDevelopersDto {
  active?: boolean;
}

export interface SetDeveloperStatusDto {
  developerIds: string[];
  active: boolean;
}

export interface DeveloperDto {
  id: string;
  fullname: string;
  active: boolean;
}
