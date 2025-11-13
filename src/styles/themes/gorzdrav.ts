import { baseTheme, ThemeConfig } from './index';

export const gorzdravLightTheme: ThemeConfig = {
  ...baseTheme,
  name: 'gorzdrav-light',
  mode: 'light',
  colors: {
    primary: '#2d7bb3', // Основной синий с сайта
    primaryHover: '#256a9c',
    secondary: '#f8f9fa',
    accent: '#e74c3c', // Акцентный красный для важных действий
    success: '#27ae60',
    warning: '#f39c12',
    error: '#e74c3c',

    background: {
      primary: '#ffffff',
      secondary: '#f8f9fa', // Светло-серый фон как на сайте
      tertiary: '#e9ecef',
      card: '#ffffff',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },

    text: {
      primary: '#2c3e50', // Основной темно-синий текст
      secondary: '#6c757d', // Серый текст
      tertiary: '#95a5a6',
      accent: '#2d7bb3', // Синий для ссылок и акцентов
      inverted: '#ffffff',
    },

    border: {
      primary: '#dee2e6', // Светло-серая граница
      secondary: '#e9ecef',
      accent: '#2d7bb3',
    },

    status: {
      active: '#2d7bb3',
      completed: '#27ae60',
      pending: '#f39c12',
      cancelled: '#e74c3c',
    },
  },
};

export const gorzdravDarkTheme: ThemeConfig = {
  ...baseTheme,
  name: 'gorzdrav-dark',
  mode: 'dark',
  colors: {
    primary: '#3498db',
    primaryHover: '#2980b9',
    secondary: '#34495e',
    accent: '#e74c3c',
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
      primary: '#ecf0f1',
      secondary: '#bdc3c7',
      tertiary: '#95a5a6',
      accent: '#3498db',
      inverted: '#2c3e50',
    },

    border: {
      primary: '#34495e',
      secondary: '#2c3e50',
      accent: '#3498db',
    },

    status: {
      active: '#3498db',
      completed: '#27ae60',
      pending: '#f39c12',
      cancelled: '#e74c3c',
    },
  },
};
