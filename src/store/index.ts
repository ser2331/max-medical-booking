import { configureStore } from '@reduxjs/toolkit';
import { commonApi } from './common.api';
import authSlice from '@/store/slices/authSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    //  редюсеры

    [commonApi.reducerPath]: commonApi.reducer,
  },

  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(commonApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
