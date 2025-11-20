import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { commonApi } from './common.api';

import authSlice from '@/store/slices/authSlice.ts';
import stepperSlice from '@/store/slices/stepperSlice.ts';

const rootReducer = combineReducers({
  auth: authSlice,
  stepper: stepperSlice,
  [commonApi.reducerPath]: commonApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(commonApi.middleware),
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
