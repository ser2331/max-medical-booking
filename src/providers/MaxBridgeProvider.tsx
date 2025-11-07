import React, { createContext, type ReactNode, useContext } from 'react';
import { useMaxBridge } from '../hooks/useMaxBridge';
import type {
  WebApp,
  WebAppInitData,
  WebAppUser,
} from '../types/max-bridge.ts';

interface MaxBridgeContextType {
  isMaxApp: boolean;
  isReady: boolean;
  isValidated: boolean;
  initData: WebAppInitData | null;
  user: WebAppUser | null;
  closeApp: () => void;
  requestPhone: () => Promise<string>;
  showBackButton: (show: boolean) => void;
  onBackButtonClick: (callback: () => void) => void;
  hapticFeedback: (type: 'impact' | 'notification' | 'selection', options?: {
    style: 'soft' | 'light' | 'medium' | 'heavy' | 'rigid',
    type?: 'error' | 'success' | 'warning'
  }) => void;
  openExternalLink: (url: string) => void;
  shareContent: (text: string, link: string) => void;
  setScreenCapture: (enabled: boolean) => void;
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
  getStartParam: () => string | null;
  parseStartParam: () => null;
  webApp: WebApp | undefined;
}

const MaxBridgeContext = createContext<MaxBridgeContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useMaxBridgeContext = () => {
  const context = useContext(MaxBridgeContext);
  if (!context) {
    throw new Error('useMaxBridgeContext must be used within MaxBridgeProvider');
  }
  return context;
};

interface MaxBridgeProviderProps {
  children: ReactNode;
}

export const MaxBridgeProvider: React.FC<MaxBridgeProviderProps> = ({ children }) => {
  const bridge = useMaxBridge();

  return (
    <MaxBridgeContext.Provider
      value={bridge}>{children}
    </MaxBridgeContext.Provider>);
};
