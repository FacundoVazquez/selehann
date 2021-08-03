import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apis } from 'src/api/setup/api-list.config';
import { HttpResponse } from 'src/api/types';
import { buildAxiosRequestConfig } from 'src/api/utils/api.utils';
import { rejectRequest } from 'src/api/utils/axios.utils';
import { createHttpAsyncThunk, RootState } from 'src/app/store';
import { sleep } from 'src/utils/common.utils';
import { AssignRevokeResourcesDto } from '../../_data/types';
import { FetchLicensesDto, LicenseDto } from '../data/dto';
import { License, LicensesState } from '../data/types';

const FEATURE_NAME = 'resources/licenses';

//#region Async actions

export const fetchLicenses = createHttpAsyncThunk<void, LicenseDto[], { state: RootState; rejectValue: HttpResponse }>(
  FEATURE_NAME + '/fetchLicenses',
  async (options, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    const data = options?.body;

    // Configuracion del servicio
    const api = apis['GATEWAY'];
    const resource = api.resources['LICENSES_GET_MANY'];
    const config = buildAxiosRequestConfig(api, resource, options);

    // Llamado del servicio
    let response;

    try {
      response = await axios.request<LicenseDto[]>(config);
    } catch (err) {
      return rejectRequest(err, thunkApi);
    }

    // Mapeo de la respuesta
    const responseData = response.data;

    const licenses: License[] = response.data.map((l) => {
      const { id, ...rest } = l;
      return { key: id, ...rest };
    });

    return { status: response.status, data: responseData, mappedData: licenses } as HttpResponse<LicenseDto[], License[]>;
  },
);

export const fetchLicensesByDeveloper = createHttpAsyncThunk<void, LicenseDto[], { state: RootState; rejectValue: HttpResponse }>(
  FEATURE_NAME + '/fetchLicensesByDeveloper',
  async (options, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    const data = options?.body;

    // Configuracion del servicio
    const api = apis['GATEWAY'];
    const resource = api.resources['LICENSES_GET_MANY_BY_DEVELOPER'];
    const config = buildAxiosRequestConfig(api, resource, options);

    // Llamado del servicio
    let response;

    try {
      response = (await Promise.all([await sleep(1000), await axios.request<LicenseDto[]>(config)]))[1];
      // r.then(v => v[1].)
      //response = await axios.request<LicenseDto[]>(config);
    } catch (err) {
      return rejectRequest(err, thunkApi);
    }

    // Mapeo de la respuesta
    const responseData = response.data;

    const licenses: License[] = response.data.map((l) => {
      const { id, ...rest } = l;
      return { key: id, ...rest };
    });

    return { status: response.status, data: responseData, mappedData: licenses } as HttpResponse<LicenseDto[], License[]>;
  },
);

export const setLicenses = createHttpAsyncThunk<AssignRevokeResourcesDto, LicenseDto[], { state: RootState; rejectValue: HttpResponse }>(
  FEATURE_NAME + '/setLicenses',
  async (options, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    const data = options?.body;

    // Configuracion del servicio
    const api = apis['GATEWAY'];
    const resource = api.resources['DEVELOPERS_SET_LICENSES'];
    const config = buildAxiosRequestConfig(api, resource, options);

    // Llamado del servicio
    let response;

    try {
      response = await axios.request<LicenseDto[]>(config);
    } catch (err) {
      return rejectRequest(err, thunkApi);
    }

    // Mapeo de la respuesta
    const responseData = response.data;

    const assets: License[] = response.data.map((a) => {
      const { id, ...rest } = a;
      return { key: id, ...rest };
    });

    return { status: response.status, data: responseData, mappedData: assets } as HttpResponse<LicenseDto[], License[]>;
  },
);

//#endregion

const initialState: LicensesState = {
  data: {
    // paginator: { pageSize: 20, current: 1 },
  },
  ui: {},
};

const slice = createSlice({
  name: FEATURE_NAME,
  initialState,
  reducers: {
    cleanState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLicenses.pending, (state) => {
        state.data.fetchLicenses = { loading: true };
      })
      .addCase(fetchLicenses.fulfilled, (state, action) => {
        state.data.fetchLicenses = { ...state.data.fetchLicenses, response: action.payload, loading: false };
        state.data.licenses = [...action.payload.mappedData!];
      })
      .addCase(fetchLicenses.rejected, (state, action) => {
        state.data.fetchLicenses = { ...state.data.fetchLicenses, response: undefined, loading: false, error: action.payload };
      });
    builder
      .addCase(fetchLicensesByDeveloper.pending, (state) => {
        state.data.fetchLicensesByDeveloper = { loading: true };
      })
      .addCase(fetchLicensesByDeveloper.fulfilled, (state, action) => {
        state.data.fetchLicensesByDeveloper = { ...state.data.fetchLicenses, response: action.payload, loading: false };
        state.data.licensesByDeveloper = { ...state.data.licensesByDeveloper, [action.meta.arg.placeholders?.id!]: [...action.payload.mappedData!] };
      })
      .addCase(fetchLicensesByDeveloper.rejected, (state, action) => {
        state.data.fetchLicensesByDeveloper = { ...state.data.fetchLicenses, response: undefined, loading: false, error: action.payload };
      });
    builder
      .addCase(setLicenses.pending, (state) => {
        state.data.setLicenses = { loading: true };
      })
      .addCase(setLicenses.fulfilled, (state, action) => {
        state.data.setLicenses = { ...state.data.setLicenses, response: action.payload, loading: false };
        state.data.licensesByDeveloper = { ...state.data.licensesByDeveloper, [action.meta.arg.placeholders?.id!]: [...action.payload.mappedData!] };
      })
      .addCase(setLicenses.rejected, (state, action) => {
        state.data.setLicenses = { ...state.data.setLicenses, response: undefined, loading: false, error: action.payload };
      });
  },
});
const { cleanState } = slice.actions;

export { cleanState };

export default slice.reducer;
