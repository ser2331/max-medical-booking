import React from 'react';
import ReactDOM from 'react-dom/client';
import { MaxUI } from '@maxhub/max-ui';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { MaxBridgeProvider } from './providers/MaxBridgeProvider';
import { ThemeProvider } from 'styled-components';
import {
  ThemeProvider as AppThemeProvider,
  useTheme,
} from './providers/ThemeContext.tsx';

import { I18nextProvider } from 'react-i18next';
import { store } from './store';
import App from './App.tsx';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import '@maxhub/max-ui/dist/styles.css';
import i18n from './i18n';

// Компонент-обертка для применения темы MAX UI
// eslint-disable-next-line react-refresh/only-export-components
const ThemedApp: React.FC = () => {
  const { colorScheme } = useTheme();

  return (
    <MaxUI colorScheme={colorScheme}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <HashRouter>
          <App />
        </HashRouter>
      </ThemeProvider>
    </MaxUI>
  );
};

// Проверяем, что элемент root существует
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <MaxBridgeProvider>
      <I18nextProvider i18n={i18n}>
        <MaxUI colorScheme="light">
          <AppThemeProvider>
            <ThemedApp />
          </AppThemeProvider>
        </MaxUI>
      </I18nextProvider>
    </MaxBridgeProvider>
  </Provider>,
);
