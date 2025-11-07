import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/store/slices/authSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    //  редюсеры
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
