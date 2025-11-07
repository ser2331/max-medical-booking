export const theme = {
  // Используем CSS переменные MAX UI как основу
  colors: {
    primary: 'var(--color-background-accent)',
    secondary: 'var(--color-background-secondary)',
    tertiary: 'var(--color-background-tertiary)',
    success: 'var(--color-background-success)',
    warning: 'var(--color-background-warning)',
    error: 'var(--color-background-error)',
    text: {
      primary: 'var(--color-text-primary)',
      secondary: 'var(--color-text-secondary)',
      accent: 'var(--color-text-accent)',
    },
    border: {
      primary: 'var(--color-border-primary)',
      secondary: 'var(--color-border-secondary)',
      accent: 'var(--color-border-accent)',
    },
  },

  // Совместимые с MAX UI отступы
  spacing: {
    xs: 'var(--spacing-xs, 4px)',
    sm: 'var(--spacing-sm, 8px)',
    md: 'var(--spacing-md, 16px)',
    lg: 'var(--spacing-lg, 24px)',
    xl: 'var(--spacing-xl, 32px)',
  },

  // Breakpoints, которые не конфликтуют с MAX UI
  breakpoints: {
    // Используем em вместо px для лучшей accessibility
    xs: '20em', // 320px
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '64em', // 1024px
    xl: '80em', // 1280px
  },

  borderRadius: {
    small: 'var(--radius-small, 8px)',
    medium: 'var(--radius-medium, 12px)',
    large: 'var(--radius-large, 16px)',
  },
} as const;

// Светлая тема
export const lightTheme = {
  ...theme,
  mode: 'light' as const,
  colors: {
    ...theme.colors,
    // Переопределяем CSS переменные для светлой темы
    custom: {
      background: '#ffffff',
      surface: '#f8f9fa',
      card: '#ffffff',
      overlay: 'rgba(0, 0, 0, 0.1)',
    },
  },
};

// Темная тема
export const darkTheme = {
  ...theme,
  mode: 'dark' as const,
  colors: {
    ...theme.colors,
    // Переопределяем CSS переменные для темной темы
    custom: {
      background: '#1a1a1a',
      surface: '#2d2d2d',
      card: '#2d2d2d',
      overlay: 'rgba(255, 255, 255, 0.1)',
    },
  },
};

export type Theme = typeof theme;
export type ThemeMode = 'light' | 'dark';

export const getTheme = (mode: ThemeMode) => {
  return mode === 'light' ? lightTheme : darkTheme;
};