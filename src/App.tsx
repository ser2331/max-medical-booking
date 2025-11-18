import { useEffect } from 'react';
import i18n from 'i18next';
import { useMaxBridgeContext } from './providers/MaxBridgeProvider.tsx';
import { AppRouter } from './router/AppRouter';
import { Main } from './components/ui/StyledComponents.tsx';
import { useWidgetSession } from '@/hooks/useWidgetSession.ts';
import { AUTH_DATA, WIDGET_CONFIG } from '@/constants.ts';
import { AppLoader } from '@/components/ui/AppLoader.tsx';

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
      <AppRouter />
    </Main>
  );
}

export default App;
