import { FC } from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { MaxBridgeProvider } from './providers/MaxBridgeProvider';
import { ThemeProvider } from './providers/ThemeContext';

import App from './App.tsx';
import i18n from './i18n';
import { store } from '@/store/store.ts';

import './assets/style/index.scss';

// eslint-disable-next-line react-refresh/only-export-components
const Root: FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
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
        <Root />
      </I18nextProvider>
    </MaxBridgeProvider>
  </Provider>,
);
