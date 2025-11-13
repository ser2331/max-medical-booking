import { useEffect } from 'react';
import i18n from 'i18next';
import { useMaxBridgeContext } from './providers/MaxBridgeProvider.tsx';
import { AppRouter } from './router/AppRouter';
import { LoadingSpinner, StyledPanel } from './components/ui/StyledComponents.tsx';
import { useWidgetSession } from '@/hooks/useWidgetSession.ts';
import { AUTH_DATA, WIDGET_CONFIG } from '@/constants.ts';
import { Flex } from '@maxhub/max-ui';

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
    return (
      <Flex
        align="center"
        justify="center"
        style={{
          height: '100dvh',
        }}
      >
        <LoadingSpinner size={20} appearance={'themed'} />
      </Flex>
    );
  }

  return (
    <StyledPanel className={'PANEL'}>
      <AppRouter />
    </StyledPanel>
  );
}

export default App;
