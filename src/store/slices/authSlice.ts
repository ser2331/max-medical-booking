import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthData, RoleContext } from '@/types/widget.ts';
import { getUrl } from '@/config/env';

interface WidgetState {
  sessionId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: WidgetState = {
  sessionId: null,
  isLoading: false,
  error: null,
};

export const authenticateWidget = createAsyncThunk(
  'TelemedicineServices/authenticate',
  async ({ authData, roleContext }: { authData: AuthData; roleContext: RoleContext }) => {
    const WIDGET_API_BASE = getUrl().api;

    // Шаг 1: Авторизация
    const authResponse = await fetch(`${WIDGET_API_BASE}/sign-in`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: authData.authToken,
      },
      body: JSON.stringify({
        userId: authData.userId,
      }),
    });

    if (!authResponse.ok) {
      throw new Error(`Auth failed: ${authResponse.status}`);
    }

    const authResult = await authResponse.json();

    if (!authResult.success) {
      throw new Error('Authentication failed');
    }

    // Шаг 2: Регистрация пользователя с ролевым контекстом
    const registerResponse = await fetch(`${WIDGET_API_BASE}/registerUser/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: authResult.result.sessionId,
      },
      body: JSON.stringify({
        roleContext: [roleContext],
      }),
    });

    if (!registerResponse.ok) {
      throw new Error(`Registration failed: ${registerResponse.status}`);
    }

    const registerResult = await registerResponse.json();

    if (!registerResult.success) {
      throw new Error('User registration failed');
    }

    return {
      sessionId: registerResult.result.sessionId,
    };
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearSession: state => {
      state.sessionId = null;
      state.error = null;
    },
    setSession: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(authenticateWidget.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authenticateWidget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sessionId = action.payload.sessionId;
        state.error = null;
      })
      .addCase(authenticateWidget.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Unknown error occurred';
      });
  },
});

export const { clearSession, setSession, clearError } = authSlice.actions;
export default authSlice.reducer;
