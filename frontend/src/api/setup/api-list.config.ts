import { buildBaseURL } from 'src/api/utils/api.utils';
import { APIList } from './types';

// Ejemplo para consumir una API
// const { baseURL, resources } = apis['GATEWAY'];
// const { verb, path, headers } = resources['USERS_GET_ONE'];
export const apis: APIList = {
  GATEWAY: {
    baseURL: buildBaseURL('GATEWAY', { domainSuffix: '/api/v1' }),
    resources: {
      AUTH_LOGIN: { path: 'auth/login', config: { verb: 'POST' } },
      AUTH_REGISTER: { path: 'auth/register', config: { verb: 'POST' } },
      AUTH_TOKEN: { path: 'auth/token', config: { verb: 'POST' } },
      USERS_GET_ONE: { path: 'users/:id', config: { verb: 'GET' } },
      USERS_GET_MANY: { path: 'users', config: { verb: 'GET' } },
      DEVELOPERS_ADD: { path: 'developers', config: { verb: 'POST' } },
      DEVELOPERS_GET_MANY: { path: 'developers', config: { verb: 'GET' } },
      DEVELOPERS_SET_STATUS: { path: 'developers/set/status', config: { verb: 'POST' } },
      DEVELOPERS_SET_ASSETS: { path: 'developers/:id/:action/assets', config: { verb: 'PUT' } },
      DEVELOPERS_SET_LICENSES: { path: 'developers/:id/:action/licenses', config: { verb: 'PUT' } },
      ASSETS_GET_MANY: { path: 'assets', config: { verb: 'GET' } },
      ASSETS_GET_MANY_BY_DEVELOPER: { path: 'assets/by/developer/:id', config: { verb: 'GET' } },
      LICENSES_GET_MANY: { path: 'licenses', config: { verb: 'GET' } },
      LICENSES_GET_MANY_BY_DEVELOPER: { path: 'licenses/by/developer/:id', config: { verb: 'GET' } },
    },
  },
};
