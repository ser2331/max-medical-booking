import { useEffect } from 'react';
import i18n from 'i18next';
import { ToastContainer } from 'react-toastify';

import { AppRouter } from './router/AppRouter';

import { useMaxBridgeContext } from './providers/MaxBridgeProvider.tsx';
import { useWidgetSession } from '@/hooks/useWidgetSession.ts';

import { AppLoader } from '@/components/ui/AppLoader.tsx';
import { Main } from './components/ui/StyledComponents.tsx';
import { AUTH_DATA, WIDGET_CONFIG } from '@/constants.ts';
import { CircleAlertIcon } from '@/assets/icons/CircleAlertIcon.tsx';
import { BadgeCheckIcon } from '@/assets/icons/BadgeCheckIcon.tsx';

function App() {
  const { initData } = useMaxBridgeContext();
  const { sessionId, isLoading, error, authenticate } = useWidgetSession();

  // Авторизация виджета при загрузке приложения
  useEffect(() => {
    if (!sessionId && !isLoading && !error) {
      authenticate(AUTH_DATA, WIDGET_CONFIG.roleContext);
    }
  }, [sessionId, isLoading, error, authenticate]);

  useEffect(() => {
    if (initData?.user?.language_code) {
      i18n.changeLanguage(initData.user.language_code);
    }
  }, [initData]);

  if (isLoading && !sessionId) {
    return <AppLoader />;
  }

  return (
    <Main className={'PANEL'}>
      <ToastContainer
        theme="light"
        icon={({ type }) => {
          switch (type) {
            case 'error':
              return <CircleAlertIcon />;
            case 'success':
              return <BadgeCheckIcon />;
            default:
              return null;
          }
        }}
      />
      <AppRouter />
    </Main>
  );
}

export default App;
