import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100dvh !important;
    font-family: ${props => props.theme.typography.fontFamily.primary};
  }

  body {
    height: 100dvh !important;
    line-height: 1.4;
    background-color: ${props => props.theme.colors.background.primary};
    color: ${props => props.theme.colors.text.primary};

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeSpeed;

    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* Стили для разных скинов */
  [data-skin="gorzdrav"] {
    /* Специфичные стили для GorZdrav */
  }

  [data-skin="max"] {
    /* Специфичные стили для MAX */
  }

  [data-skin="custom"] {
    /* Специфичные стили для кастомных скинов */
  }

  /* Адаптивные улучшения */
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    html {
      font-size: 14px;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    html {
      font-size: 13px;
    }
  }

  /* Совместимость с MAX UI */
  .max-ui-component {
    /* Используем CSS переменные для совместимости */
    --color-background-accent: ${props => props.theme.colors.primary};
    --color-text-primary: ${props => props.theme.colors.text.primary};
  }
`;
