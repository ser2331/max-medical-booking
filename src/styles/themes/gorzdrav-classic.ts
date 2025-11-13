import { baseTheme, ThemeConfig } from './index';

export const gorzdravClassicLightTheme: ThemeConfig = {
  ...baseTheme,
  name: 'gorzdrav-classic-light',
  mode: 'light',
  colors: {
    // Основные цвета из CSS
    primary: '#00AA8A', // Основной зеленый GorZdrav
    primaryHover: '#008c72', // Темнее для hover
    secondary: '#F1F3F6', // Светло-серый фон
    accent: '#EB5757', // Красный акцент
    success: '#00AA8A', // Зеленый для успеха
    warning: '#ffa726', // Оранжевый для предупреждений
    error: '#EB5757', // Красный для ошибок

    background: {
      primary: '#ffffff', // Белый фон
      secondary: '#F1F3F6', // Светло-серый
      tertiary: '#E4FBF6', // Светло-зеленый (billet--2)
      card: '#ffffff', // Карточки
      overlay: 'rgba(0, 0, 0, 0.5)', // Затемнение
    },

    text: {
      primary: '#002D40', // Основной темно-синий текст
      secondary: '#002D40', // Вторичный текст
      tertiary: '#6c757d', // Третичный текст
      accent: '#00AA8A', // Акцентный зеленый
      inverted: '#ffffff', // Белый текст
    },

    border: {
      primary: '#DADADA', // Основная граница
      secondary: '#e9ecef', // Вторичная граница
      accent: '#00AA8A', // Акцентная граница
    },

    status: {
      active: '#00AA8A', // Активный статус
      completed: '#00AA8A', // Завершенный
      pending: '#ffa726', // В ожидании
      cancelled: '#EB5757', // Отменен
    },
  },
  typography: {
    ...baseTheme.typography,
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      xxl: '24px',
    },
  },
  spacing: {
    ...baseTheme.spacing,
    xs: '8px',
    sm: '15px',
    md: '20px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    small: '4px',
    medium: '6px', // Основной радиус из CSS
    large: '8px',
    xl: '12px',
  },
  shadows: {
    small: '0 1px 3px rgba(0, 0, 0, 0.1)',
    medium: '1px 4px 4px rgba(0, 170, 138, 0.7)', // Тень для иконок
    large: '0 4px 8px rgba(0, 0, 0, 0.15)',
  },
  components: {
    ...baseTheme.components,
    button: {
      borderRadius: '6px',
      padding: '12px 24px',
    },
    card: {
      borderRadius: '6px',
      padding: '25px',
    },
    input: {
      borderRadius: '6px',
      border: '1px solid #DADADA',
    },
  },
};

export const gorzdravClassicDarkTheme: ThemeConfig = {
  ...gorzdravClassicLightTheme,
  name: 'gorzdrav-classic-dark',
  mode: 'dark',
  colors: {
    ...gorzdravClassicLightTheme.colors,
    primary: '#00AA8A',
    primaryHover: '#00c49a',
    secondary: '#2d3748',
    accent: '#ff6b6b',
    success: '#00AA8A',
    warning: '#ffa726',
    error: '#ff6b6b',

    background: {
      primary: '#1a202c',
      secondary: '#2d3748',
      tertiary: '#1a3a32', // Темно-зеленый
      card: '#2d3748',
      overlay: 'rgba(0, 0, 0, 0.7)',
    },

    text: {
      primary: '#e2e8f0',
      secondary: '#cbd5e0',
      tertiary: '#a0aec0',
      accent: '#00AA8A',
      inverted: '#1a202c',
    },

    border: {
      primary: '#4a5568',
      secondary: '#2d3748',
      accent: '#00AA8A',
    },
  },
};
