import { useEffect } from 'react';
import i18n from 'i18next';
import { useMaxBridgeContext } from './providers/MaxBridgeProvider.tsx';
import { AppRouter } from './router/AppRouter';
import { StyledPanel } from './components/ui/StyledComponents.tsx';

function App() {
  const { initData } = useMaxBridgeContext();

  useEffect(() => {
    if (initData?.user?.language_code) {
      i18n.changeLanguage(initData.user.language_code);
    }
  }, [initData]);
  return (
    <StyledPanel style={{ minHeight: '100vh' }}>
      <AppRouter />
    </StyledPanel>
  );
}

export default App;
