import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { apis } from 'src/api/setup/api-list.config';
import { HttpResponse } from 'src/api/types';
import { buildAxiosRequestConfig } from 'src/api/utils/api.utils';
import { rejectRequest } from 'src/api/utils/axios.utils';
import { createHttpAsyncThunk, RootState } from 'src/app/store';
import { Paginator } from 'src/features/_shared/data/interfaces';
import { DeveloperDto, FetchDevelopersDto, SetDeveloperStatusDto } from '../data/dto';
import { Developer, DevelopersState } from '../data/types';

const FEATURE_NAME = 'developers';

//#region Async actions

export const fetchDevelopers = createHttpAsyncThunk<FetchDevelopersDto, DeveloperDto[], { state: RootState; rejectValue: HttpResponse }>(
  FEATURE_NAME + '/fetchDevelopers',
  async (options, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    const data = options?.body;

    // Configuracion del servicio
    const api = apis['GATEWAY'];
    const resource = api.resources['DEVELOPERS_GET_MANY'];
    const config = buildAxiosRequestConfig(api, resource, options);

    // Llamado del servicio
    let response;

    try {
      response = await axios.request<DeveloperDto[]>(config);
    } catch (err) {
      return rejectRequest(err, thunkApi);
    }

    // Mapeo de la respuesta
    const responseData = response.data;

    const developers: Developer[] = response.data.map((d) => {
      const { id, ...rest } = d;
      return { key: id, ...rest };
    });

    return { status: response.status, data: responseData, mappedData: developers } as HttpResponse<DeveloperDto[], Developer[]>;
  },
);

export const setDeveloperStatus = createHttpAsyncThunk<SetDeveloperStatusDto, DeveloperDto[], { state: RootState; rejectValue: HttpResponse }>(
  FEATURE_NAME + '/setDeveloperStatus',
  async (options, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    const data = options?.body;

    // Configuracion del servicio
    const api = apis['GATEWAY'];
    const resource = api.resources['DEVELOPERS_SET_STATUS'];
    const config = buildAxiosRequestConfig(api, resource, options);

    // Llamado del servicio
    let response;

    try {
      response = await axios.request<DeveloperDto[]>(config);
    } catch (err) {
      return rejectRequest(err, thunkApi);
    }

    // Mapeo de la respuesta
    const responseData = response.data;

    const developers: Developer[] = response.data.map((d) => {
      const { id, ...rest } = d;
      return { key: id, ...rest };
    });

    const mappedData = getState().developers.data.developers?.map((d) => (d.key !== developers[0].key ? d : developers[0]));

    return { status: response.status, data: responseData, mappedData } as HttpResponse<DeveloperDto[], Developer[]>;
  },
);

//#endregion

const initialState: DevelopersState = {
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
      .addCase(fetchDevelopers.pending, (state) => {
        state.data.fetchDevelopers = { loading: true };
      })
      .addCase(fetchDevelopers.fulfilled, (state, action) => {
        state.data.fetchDevelopers = { ...state.data.fetchDevelopers, response: action.payload, loading: false };
        state.data.developers = [...action.payload.mappedData!];
      })
      .addCase(fetchDevelopers.rejected, (state, action) => {
        state.data.fetchDevelopers = { ...state.data.fetchDevelopers, response: undefined, loading: false, error: action.payload };
      });
    builder
      .addCase(setDeveloperStatus.pending, (state) => {
        state.data.setDeveloperStatus = { loading: true };
      })
      .addCase(setDeveloperStatus.fulfilled, (state, action) => {
        state.data.setDeveloperStatus = { ...state.data.setDeveloperStatus, response: action.payload, loading: false };
        state.data.developers = [...action.payload.mappedData!];
      })
      .addCase(setDeveloperStatus.rejected, (state, action) => {
        state.data.setDeveloperStatus = { ...state.data.setDeveloperStatus, response: undefined, loading: false, error: action.payload };
      });
  },
});

const { cleanState } = slice.actions;

export { cleanState };

export default slice.reducer;
