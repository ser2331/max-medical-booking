import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/redux-hooks.ts';
import { authenticateWidget, clearError, clearSession } from '../store/slices/authSlice.ts';
import { AuthData, RoleContext } from '../types/widget';

export const useWidgetSession = () => {
  const dispatch = useAppDispatch();
  const widgetState = useAppSelector(state => state.auth);

  const authenticate = useCallback(
    (authData: AuthData, roleContext: RoleContext) => {
      return dispatch(authenticateWidget({ authData, roleContext }));
    },
    [dispatch],
  );

  const logout = useCallback(() => {
    dispatch(clearSession());
  }, [dispatch]);

  const resetError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    sessionId: widgetState.sessionId,
    isLoading: widgetState.isLoading,
    error: widgetState.error,
    authenticate,
    logout,
    resetError,
  };
};
