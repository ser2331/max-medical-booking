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

  /* Кастомные стили скроллбара для Webkit браузеров (Chrome, Safari, Edge) */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background.secondary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border.primary};
    border-radius: 4px;
    transition: all 0.3s ease;
    
    &:hover {
      background: ${props => props.theme.colors.border.accent};
    }
    
    &:active {
      background: ${props => props.theme.colors.primary};
    }
  }

  ::-webkit-scrollbar-corner {
    background: ${props => props.theme.colors.background.secondary};
  }

  /* Кастомные стили скроллбара для Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${props =>
      `${props.theme.colors.border.primary} ${props.theme.colors.background.secondary}`};
  }

  /* Стили для скроллбара в темной теме */
  [data-theme="dark"] {
    ::-webkit-scrollbar-track {
      background: ${props => props.theme.colors.background.tertiary};
    }

    ::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.border.secondary};
      
      &:hover {
        background: ${props => props.theme.colors.border.accent};
      }
      
      &:active {
        background: ${props => props.theme.colors.primary};
      }
    }

    * {
      scrollbar-color: ${props =>
        `${props.theme.colors.border.secondary} ${props.theme.colors.background.tertiary}`};
    }
  }

  /* Стили для скроллбара в светлой теме */
  [data-theme="light"] {
    ::-webkit-scrollbar-track {
      background: ${props => props.theme.colors.background.secondary};
    }

    ::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.border.primary};
      
      &:hover {
        background: ${props => props.theme.colors.primary + '80'};
      }
      
      &:active {
        background: ${props => props.theme.colors.primary};
      }
    }
  }

  /* Стили для тонкого скроллбара (для небольших элементов) */
  .thin-scrollbar {
    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.border.secondary};
      border-radius: 2px;
    }

    scrollbar-width: thin;
  }

  /* Стили для скроллбара с акцентным цветом */
  .accent-scrollbar {
    &::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.primary};
      
      &:hover {
        background: ${props => props.theme.colors.primaryHover};
      }
    }

    scrollbar-color: ${props =>
      `${props.theme.colors.primary} ${props.theme.colors.background.secondary}`};
  }

  /* Стили для скроллбара в карточках */
  .card-scrollbar {
    &::-webkit-scrollbar-track {
      background: ${props => props.theme.colors.background.card};
      border-radius: 0 4px 4px 0;
    }

    &::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.border.primary};
      border-radius: 4px;
    }
  }

  /* Стили для горизонтального скроллбара */
  .horizontal-scrollbar {
    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: ${props => props.theme.colors.background.secondary};
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.border.primary};
      border-radius: 3px;
    }
  }

  /* Отключение скроллбара но с сохранением функциональности скролла */
  .hidden-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari and Opera */
    }
  }

  /* Плавный скролл для всей страницы */
  html {
    scroll-behavior: smooth;
  }

  /* Стили для разных скинов */
  [data-skin="gorzdrav"] {
    /* Специфичные стили для GorZdrav */
    ::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.primary};
      
      &:hover {
        background: ${props => props.theme.colors.primaryHover};
      }
    }
  }

  [data-skin="max"] {
    /* Специфичные стили для MAX */
    ::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.secondary};
      
      &:hover {
        background: ${props => props.theme.colors.secondary};
      }
    }
  }

  [data-skin="custom"] {
    /* Специфичные стили для кастомных скинов */
  }

  /* Адаптивные улучшения */
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    html {
      font-size: 14px;
    }
    
    /* Уменьшаем скроллбар на мобильных устройствах */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    html {
      font-size: 13px;
    }
    
    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
  }

  /* Анимация появления скроллбара */
  .animated-scrollbar {
    &::-webkit-scrollbar-thumb {
      opacity: 0.7;
      transition: opacity 0.3s ease, background-color 0.3s ease;
    }
    
    &:hover::-webkit-scrollbar-thumb {
      opacity: 1;
    }
  }
`;
