import { baseTheme, ThemeConfig } from './index';

export const moscowLightTheme: ThemeConfig = {
  ...baseTheme,
  name: 'moscow-light',
  mode: 'light',
  colors: {
    primary: '#d52b1e', // Красный Москвы
    primaryHover: '#b22222',
    secondary: '#f8f9fa',
    accent: '#0056b3', // Синий акцент
    success: '#27ae60',
    warning: '#f39c12',
    error: '#e74c3c',

    background: {
      primary: '#ffffff',
      secondary: '#f5f5f5',
      tertiary: '#e9ecef',
      card: '#ffffff',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },

    text: {
      primary: '#333333',
      secondary: '#666666',
      tertiary: '#999999',
      accent: '#d52b1e',
      inverted: '#ffffff',
    },

    border: {
      primary: '#dddddd',
      secondary: '#eeeeee',
      accent: '#d52b1e',
    },

    status: {
      active: '#d52b1e',
      completed: '#27ae60',
      pending: '#f39c12',
      cancelled: '#e74c3c',
    },
  },
};

export const moscowDarkTheme: ThemeConfig = {
  ...baseTheme,
  name: 'moscow-dark',
  mode: 'dark',
  colors: {
    primary: '#ff6b6b',
    primaryHover: '#ff5252',
    secondary: '#34495e',
    accent: '#4dabf7',
    success: '#27ae60',
    warning: '#f39c12',
    error: '#e74c3c',

    background: {
      primary: '#1a1a1a',
      secondary: '#2d2d2d',
      tertiary: '#3d3d3d',
      card: '#2d2d2d',
      overlay: 'rgba(255, 255, 255, 0.1)',
    },

    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
      tertiary: '#999999',
      accent: '#ff6b6b',
      inverted: '#1a1a1a',
    },

    border: {
      primary: '#444444',
      secondary: '#333333',
      accent: '#ff6b6b',
    },

    status: {
      active: '#ff6b6b',
      completed: '#27ae60',
      pending: '#f39c12',
      cancelled: '#e74c3c',
    },
  },
};
