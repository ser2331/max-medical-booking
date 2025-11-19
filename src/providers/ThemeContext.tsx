import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { SkinName, ThemeConfig } from '@/assets/style/themes/theme.types.ts';
import { getAvailableSkins, getTheme } from '@/assets/style/themes';

interface ThemeContextType {
  colorScheme: 'light' | 'dark';
  currentSkin: SkinName;
  availableSkins: SkinName[];
  toggleColorScheme: () => void;
  setColorScheme: (scheme: 'light' | 'dark') => void;
  setSkin: (skin: SkinName) => void;
  currentTheme: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const isValidSkin = (skin: string): skin is SkinName => {
  return getAvailableSkins().includes(skin as SkinName);
};

const isValidColorScheme = (scheme: string): scheme is 'light' | 'dark' => {
  return scheme === 'light' || scheme === 'dark';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('color-scheme');
      if (saved && isValidColorScheme(saved)) {
        return saved;
      }
    } catch (error) {
      console.warn('Failed to read color scheme from localStorage:', error);
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [currentSkin, setCurrentSkin] = useState<SkinName>(() => {
    try {
      const saved = localStorage.getItem('current-skin');
      if (saved && isValidSkin(saved)) {
        return saved;
      }
    } catch (error) {
      console.warn('Failed to read skin from localStorage:', error);
    }

    return 'baseSkin';
  });

  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(() =>
    getTheme(currentSkin, colorScheme),
  );

  const toggleColorScheme = useCallback(() => {
    setColorScheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const setSkin = useCallback((skin: SkinName) => {
    if (isValidSkin(skin)) {
      setCurrentSkin(skin);
      try {
        localStorage.setItem('current-skin', skin);
      } catch (error) {
        console.warn('Failed to save skin to localStorage:', error);
      }
    } else {
      console.warn(`Invalid skin: ${skin}`);
    }
  }, []);

  const setColorSchemeCallback = useCallback((scheme: 'light' | 'dark') => {
    if (isValidColorScheme(scheme)) {
      setColorScheme(scheme);
    }
  }, []);

  const applyCssVariables = useCallback((theme: ThemeConfig) => {
    const root = document.documentElement;

    Object.entries(theme.colors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        root.style.setProperty(`--theme-${key}`, value);
      }
    });

    Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
      root.style.setProperty(`--theme-font-size-${key}`, value);
    });

    Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
      root.style.setProperty(`--theme-font-weight-${key}`, value.toString());
    });

    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--theme-spacing-${key}`, value);
    });

    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--theme-border-radius-${key}`, value);
    });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const hasManualSelection = localStorage.getItem('color-scheme');
      if (!hasManualSelection) {
        setColorScheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    const theme = getTheme(currentSkin, colorScheme);
    setCurrentTheme(theme);

    try {
      localStorage.setItem('color-scheme', colorScheme);
    } catch (error) {
      console.warn('Failed to save color scheme to localStorage:', error);
    }

    document.documentElement.setAttribute('data-theme', colorScheme);
    document.documentElement.setAttribute('data-skin', currentSkin);

    // Применяем CSS переменные
    applyCssVariables(theme);
  }, [colorScheme, currentSkin, applyCssVariables]);

  const contextValue: ThemeContextType = {
    colorScheme,
    currentSkin,
    availableSkins: getAvailableSkins(),
    toggleColorScheme,
    setColorScheme: setColorSchemeCallback,
    setSkin,
    currentTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
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
