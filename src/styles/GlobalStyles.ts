import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body, #root {
        height: 100%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    }

    body {
        background: var(--color-background-primary);
        color: var(--color-text-primary);
        line-height: 1.4;

        /* Улучшаем рендеринг на мобильных */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeSpeed;
    }

    /* Совместимость с MAX UI */
    .max-ui-component {
        /* Сброс стилей которые могут конфликтовать */
    }

    /* Адаптивные улучшения */
    @media (max-width: 30em) {
        html {
            font-size: 14px;
        }
    }

    @media (max-width: 20em) {
        html {
            font-size: 13px;
        }
    }
`;
