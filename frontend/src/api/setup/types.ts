// Para agregar una nueva API, se debe actualizar las interfaces en el siguiente orden:
// 1) Agregar una nueva interface 'Resource<Nombre>'.
// 2) Definir los recursos necesarios dentro de la interface creada.
// 3) Definir la api dentro de la interface 'APIs', proveyendo la interface creada en el paso 1.

import { API, Resource } from '../types';

export interface APIList {
  GATEWAY: API<ResourcesGateway>;
}

// Resources

export interface ResourcesGateway {
  AUTH_LOGIN: Resource;
  AUTH_REGISTER: Resource;
  AUTH_TOKEN: Resource;
  USERS_GET_ONE: Resource;
  USERS_GET_MANY: Resource;
  DEVELOPERS_ADD: Resource;
  DEVELOPERS_GET_MANY: Resource;
  DEVELOPERS_SET_STATUS: Resource;
  DEVELOPERS_SET_ASSETS: Resource;
  DEVELOPERS_SET_LICENSES: Resource;
  ASSETS_GET_MANY: Resource;
  ASSETS_GET_MANY_BY_DEVELOPER: Resource;
  LICENSES_GET_MANY: Resource;
  LICENSES_GET_MANY_BY_DEVELOPER: Resource;
}
