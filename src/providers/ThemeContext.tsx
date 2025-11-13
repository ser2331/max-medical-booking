import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { getTheme, SkinName, skins } from '../styles/themes/manager';
import { ThemeConfig } from '@/styles/themes';

interface ThemeContextType {
  colorScheme: 'light' | 'dark';
  currentSkin: SkinName;
  availableSkins: typeof skins;
  toggleColorScheme: () => void;
  setColorScheme: (scheme: 'light' | 'dark') => void;
  setSkin: (skin: SkinName) => void;
  currentTheme: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('color-scheme') as 'light' | 'dark';
    if (saved && (saved === 'light' || saved === 'dark')) {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [currentSkin, setCurrentSkin] = useState<SkinName>(() => {
    return (localStorage.getItem('current-skin') as SkinName) || 'max';
  });

  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(getTheme(currentSkin, colorScheme));

  const toggleColorScheme = () => {
    setColorScheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const setSkin = (skin: SkinName) => {
    setCurrentSkin(skin);
    localStorage.setItem('current-skin', skin);
  };

  useEffect(() => {
    const theme = getTheme(currentSkin, colorScheme);
    setCurrentTheme(theme);

    localStorage.setItem('color-scheme', colorScheme);
    document.documentElement.setAttribute('data-theme', colorScheme);
    document.documentElement.setAttribute('data-skin', currentSkin);

    // Применяем CSS переменные
    applyCssVariables(theme);
  }, [colorScheme, currentSkin]);

  // Функция для применения CSS переменных
  const applyCssVariables = (theme: ThemeConfig) => {
    const root = document.documentElement;

    // Применяем основные цвета
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        root.style.setProperty(`--theme-${key}`, value);
      } else if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          root.style.setProperty(`--theme-${key}-${subKey}`, subValue as string);
        });
      }
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        currentSkin,
        availableSkins: skins,
        toggleColorScheme,
        setColorScheme,
        setSkin,
        currentTheme,
      }}
    >
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
