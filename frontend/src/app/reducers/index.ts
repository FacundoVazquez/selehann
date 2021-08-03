import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from '@reduxjs/toolkit';
import settingsReducer from 'src/features/settings/logic';
import menuReducer from 'src/features/navigator-menu/logic';
import authReducer from 'src/features/auth/logic';
import developersReducer from 'src/features/developers/logic';
import assetsReducer from 'src/features/resources/assets/logic';
import licensesReducer from 'src/features/resources/licenses/logic';
import sharedReducer from 'src/features/_shared/logic';

const reducers = {
  settings: settingsReducer,
  menu: menuReducer,
  auth: authReducer,
  developers: developersReducer,
  assets: assetsReducer,
  licenses: licensesReducer,
  shared: sharedReducer,
};

export const createRootReducer = (history: History) => {
  return combineReducers({
    ...reducers,
    router: connectRouter(history),
  });
};
