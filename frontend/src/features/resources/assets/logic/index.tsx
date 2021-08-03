import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apis } from 'src/api/setup/api-list.config';
import { HttpResponse } from 'src/api/types';
import { buildAxiosRequestConfig } from 'src/api/utils/api.utils';
import { rejectRequest } from 'src/api/utils/axios.utils';
import { createHttpAsyncThunk, RootState } from 'src/app/store';
import { AssignRevokeResourcesDto } from '../../_data/types';
import { AssetDto, FetchAssetsDto } from '../data/dto';
import { Asset, AssetsState } from '../data/types';

const FEATURE_NAME = 'resources/assets';

//#region Async actions

export const fetchAssets = createHttpAsyncThunk<void, AssetDto[], { state: RootState; rejectValue: HttpResponse }>(
  FEATURE_NAME + '/fetchAssets',
  async (options, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    const data = options?.body;

    // Configuracion del servicio
    const api = apis['GATEWAY'];
    const resource = api.resources['ASSETS_GET_MANY'];
    const config = buildAxiosRequestConfig(api, resource, options);

    // Llamado del servicio
    let response;

    try {
      response = await axios.request<AssetDto[]>(config);
    } catch (err) {
      return rejectRequest(err, thunkApi);
    }

    // Mapeo de la respuesta
    const responseData = response.data;

    const assets: Asset[] = response.data.map((a) => {
      const { id, ...rest } = a;
      return { key: id, ...rest };
    });

    return { status: response.status, data: responseData, mappedData: assets } as HttpResponse<AssetDto[], Asset[]>;
  },
);

export const fetchAssetsByDeveloper = createHttpAsyncThunk<FetchAssetsDto, AssetDto[], { state: RootState; rejectValue: HttpResponse }>(
  FEATURE_NAME + '/fetchAssetsByDeveloper',
  async (options, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    const data = options?.body;

    // Configuracion del servicio
    const api = apis['GATEWAY'];
    const resource = api.resources['ASSETS_GET_MANY_BY_DEVELOPER'];
    const config = buildAxiosRequestConfig(api, resource, options);

    // Llamado del servicio
    let response;

    try {
      response = await axios.request<AssetDto[]>(config);
    } catch (err) {
      return rejectRequest(err, thunkApi);
    }

    // Mapeo de la respuesta
    const responseData = response.data;

    const assets: Asset[] = response.data.map((a) => {
      const { id, ...rest } = a;
      return { key: id, ...rest };
    });

    return { status: response.status, data: responseData, mappedData: assets } as HttpResponse<AssetDto[], Asset[]>;
  },
);

export const setAssets = createHttpAsyncThunk<AssignRevokeResourcesDto, AssetDto[], { state: RootState; rejectValue: HttpResponse }>(
  FEATURE_NAME + '/setAssets',
  async (options, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    const data = options?.body;

    // Configuracion del servicio
    const api = apis['GATEWAY'];
    const resource = api.resources['DEVELOPERS_SET_ASSETS'];
    const config = buildAxiosRequestConfig(api, resource, options);

    // Llamado del servicio
    let response;

    try {
      response = await axios.request<AssetDto[]>(config);
    } catch (err) {
      return rejectRequest(err, thunkApi);
    }

    // Mapeo de la respuesta
    const responseData = response.data;

    const assets: Asset[] = response.data.map((a) => {
      const { id, ...rest } = a;
      return { key: id, ...rest };
    });

    return { status: response.status, data: responseData, mappedData: assets } as HttpResponse<AssetDto[], Asset[]>;
  },
);

//#endregion

const initialState: AssetsState = {
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
      .addCase(fetchAssets.pending, (state) => {
        state.data.fetchAssets = { loading: true };
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.data.fetchAssets = { ...state.data.fetchAssets, response: action.payload, loading: false };
        state.data.assets = [...action.payload.mappedData!];
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.data.fetchAssets = { ...state.data.fetchAssets, response: undefined, loading: false, error: action.payload };
      });
    builder
      .addCase(fetchAssetsByDeveloper.pending, (state) => {
        state.data.fetchAssetsByDeveloper = { loading: true };
      })
      .addCase(fetchAssetsByDeveloper.fulfilled, (state, action) => {
        state.data.fetchAssetsByDeveloper = { ...state.data.fetchAssets, response: action.payload, loading: false };
        state.data.assetsByDeveloper = { ...state.data.assetsByDeveloper, [action.meta.arg.placeholders?.id!]: [...action.payload.mappedData!] };
      })
      .addCase(fetchAssetsByDeveloper.rejected, (state, action) => {
        state.data.fetchAssetsByDeveloper = { ...state.data.fetchAssets, response: undefined, loading: false, error: action.payload };
      });
    builder
      .addCase(setAssets.pending, (state) => {
        state.data.setAssets = { loading: true };
      })
      .addCase(setAssets.fulfilled, (state, action) => {
        state.data.setAssets = { ...state.data.setAssets, response: action.payload, loading: false };
        state.data.assetsByDeveloper = { ...state.data.assetsByDeveloper, [action.meta.arg.placeholders?.id!]: [...action.payload.mappedData!] };
      })
      .addCase(setAssets.rejected, (state, action) => {
        state.data.setAssets = { ...state.data.setAssets, response: undefined, loading: false, error: action.payload };
      });
  },
});

const { cleanState } = slice.actions;

export { cleanState };

export default slice.reducer;
