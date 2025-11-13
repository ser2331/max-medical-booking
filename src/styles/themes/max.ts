import { baseTheme, ThemeConfig } from './index';

export const maxLightTheme: ThemeConfig = {
  ...baseTheme,
  name: 'max-light',
  mode: 'light',
  colors: {
    primary: '#007bff',
    primaryHover: '#0056b3',
    secondary: '#f8f9fa',
    accent: '#dc3545',
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',

    background: {
      primary: '#ffffff',
      secondary: '#f8f9fa',
      tertiary: '#e9ecef',
      card: '#ffffff',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },

    text: {
      primary: '#212529',
      secondary: '#6c757d',
      tertiary: '#adb5bd',
      accent: '#007bff',
      inverted: '#ffffff',
    },

    border: {
      primary: '#dee2e6',
      secondary: '#e9ecef',
      accent: '#007bff',
    },

    status: {
      active: '#007bff',
      completed: '#28a745',
      pending: '#ffc107',
      cancelled: '#dc3545',
    },
  },
  components: {
    ...baseTheme.components,
    button: {
      borderRadius: '8px',
      padding: '12px 24px',
    },
    card: {
      borderRadius: '12px',
      padding: '20px',
    },
  },
};

export const maxDarkTheme: ThemeConfig = {
  ...maxLightTheme,
  name: 'max-dark',
  mode: 'dark',
  // Темная тема наследует светлую, но переопределяет цвета
  colors: {
    ...maxLightTheme.colors,
    background: {
      primary: '#1a1a1a',
      secondary: '#2d2d2d',
      tertiary: '#3d3d3d',
      card: '#2d2d2d',
      overlay: 'rgba(255, 255, 255, 0.1)',
    },
    text: {
      primary: '#f8f9fa',
      secondary: '#adb5bd',
      tertiary: '#6c757d',
      accent: '#4dabf7',
      inverted: '#212529',
    },
  },
};
