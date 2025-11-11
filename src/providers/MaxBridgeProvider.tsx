import React, { createContext, type ReactNode, useContext } from 'react';
import { useMaxBridge } from '../hooks/useMaxBridge';
import type { MaxBridgeContextType } from '../types/max-bridge.ts';

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

  return <MaxBridgeContext.Provider value={bridge}>{children}</MaxBridgeContext.Provider>;
};
