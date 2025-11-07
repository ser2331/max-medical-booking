import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { AppDispatch, RootState } from '@/store';
import {
  authenticateWidget,
  clearError,
  clearSession,
} from '../store/slices/authSlice.ts';
import { AuthData, RoleContext } from '../types/widget';

export const useWidgetSession = () => {
  const dispatch = useDispatch<AppDispatch>();
  const widgetState = useSelector((state: RootState) => state.auth);

  const authenticate = useCallback((authData: AuthData, roleContext: RoleContext) => {
    return dispatch(authenticateWidget({ authData, roleContext }));
  }, [dispatch]);

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