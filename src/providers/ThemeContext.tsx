// contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

type ColorScheme = 'light' | 'dark';

interface ThemeContextType {
  colorScheme: ColorScheme;
  toggleColorScheme: () => void;
  setColorScheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    // Пробуем получить из localStorage
    const saved = localStorage.getItem('color-scheme') as ColorScheme;
    if (saved && (saved === 'light' || saved === 'dark')) {
      return saved;
    }

    // Проверяем системные настройки
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  });

  const toggleColorScheme = () => {
    setColorScheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    // Сохраняем в localStorage
    localStorage.setItem('color-scheme', colorScheme);

    // Применяем к документу
    document.documentElement.setAttribute('data-theme', colorScheme);
  }, [colorScheme]);

  return (
    <ThemeContext.Provider
      value={{ colorScheme, toggleColorScheme, setColorScheme }}>
      {children}
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