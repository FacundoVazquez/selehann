import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getEnvironment } from 'src/configuration/configuration.utils';
import { getDeviceType } from 'src/utils/mobile.utils';
import { getScreenOrientation } from 'src/utils/screen.utils';
import { ConfiguracionSliceState as SettingsSliceState, Device, ScreenOrientation } from '../data/types';

const FEATURE_NAME = 'settings';

// Slice

const initialState: SettingsSliceState = {
  environment: getEnvironment(),
  device: getDeviceType(),
  orientation: getScreenOrientation({ width: window.innerWidth, height: window.innerHeight }),
};

const slice = createSlice({
  name: FEATURE_NAME,
  initialState,
  reducers: {
    setDevice(state, action: PayloadAction<Device>) {
      state.device = action.payload;
    },
    setOrientation(state, action: PayloadAction<ScreenOrientation>) {
      state.orientation = action.payload;
    },
  },
});

export const { setDevice, setOrientation } = slice.actions;

export default slice.reducer;
