import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useAppSelector } from '@/store/redux-hooks.ts';
import { useDebug } from '@/hooks/useDebug';

import { DebugPanel } from '@/components/debug/DebugPanel';
import { AppSpin } from '@/components/ui/AppSpin.tsx';
import { WIDGET_CONFIG } from '@/constants.ts';

import { getUrl } from '@/config/env';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  main {
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

interface WindowWithWidget {
  [key: string]: ((containerId: string) => void) | undefined;
  renderTMWidget?: (containerId: string) => void;
  renderWidget?: (containerId: string) => void;
  unmountTMWidget?: (containerId: string) => void;
}

const name = 'TMWidget';

export const MicroFrontend = () => {
  const [widgetRendered, setWidgetRendered] = useState(false);
  const [loadPhase, setLoadPhase] = useState<
    'idle' | 'fetching' | 'loading' | 'rendering' | 'complete' | 'error'
  >('idle');

  const isInitializedRef = useRef(false);
  const dataSentRef = useRef(false);
  const fetchInterceptedRef = useRef(false);
  const renderAttemptsRef = useRef(0);
  const containerId = `${name}-container`;

  const { sessionId } = useAppSelector(state => state.auth);
  const { host, url } = getUrl();

  const { debugInfo, addDebugInfo, clearDebugInfo } = useDebug();

  // Сбрасываем состояния при размонтировании
  useEffect(() => {
    return () => {
      isInitializedRef.current = false;
      dataSentRef.current = false;
      fetchInterceptedRef.current = false;
      renderAttemptsRef.current = 0;
      setWidgetRendered(false);
      setLoadPhase('idle');
      clearDebugInfo();
    };
  }, []);

  // Перехват fetch запросов виджета (только один раз)
  useEffect(() => {
    if (!sessionId || fetchInterceptedRef.current) return;

    const originalFetch = window.fetch;
    fetchInterceptedRef.current = true;
    addDebugInfo('fetchInterceptor', 'installed');

    window.fetch = function (...args) {
      const requestUrl = args[0];

      if (typeof requestUrl === 'string' && requestUrl.includes('/tm-widgets/api/registerUser')) {
        addDebugInfo('fetchIntercepted', 'registerUser');
        return Promise.resolve({
          ok: true,
          json: async () => ({
            success: true,
            result: { sessionId },
          }),
        } as Response);
      }

      // Перехват authorize и других API запросов - делаем абсолютными URL
      // if (typeof requestUrl === 'string' && requestUrl.includes('/tm-widgets/api')) {
      //   const newUrl = `${url}${requestUrl}`;
      //   addDebugInfo('fetchUrlRewritten', JSON.stringify({ from: requestUrl, to: newUrl }));
      //   args[0] = newUrl;
      // }

      return originalFetch.apply(this, args);
    };

    return () => {
      window.fetch = originalFetch;
      fetchInterceptedRef.current = false;
    };
  }, [sessionId, url]);

  // Функция отправки данных в виджет
  const sendDataToWidget = useCallback(() => {
    if (!sessionId || dataSentRef.current) return;

    const widgetData = {
      isActualData: true,
      data: {
        sessionId,
        hideCreateButton: false,
        ...WIDGET_CONFIG,
      },
    };

    dataSentRef.current = true;
    addDebugInfo('dataSent', 'true');
    addDebugInfo('widgetData', JSON.stringify(widgetData));

    window.postMessage(widgetData, '*');
  }, [sessionId]);

  // Отправка данных после загрузки виджета
  useEffect(() => {
    if (sessionId && widgetRendered) {
      addDebugInfo('sendingDataToWidget', JSON.stringify({ sessionId, widgetRendered }));
      sendDataToWidget();
    }
  }, [sessionId, widgetRendered, sendDataToWidget]);

  // Попытка рендера виджета с ретраями
  const attemptRender = useCallback(
    (windowWithWidget: WindowWithWidget, attempt = 1): Promise<boolean> => {
      return new Promise(resolve => {
        const renderFunction = windowWithWidget.renderTMWidget || windowWithWidget.renderWidget;

        if (!renderFunction) {
          addDebugInfo('renderAttemptFailed', `No render function (attempt ${attempt})`);
          resolve(false);
          return;
        }

        addDebugInfo('renderAttempt', JSON.stringify(attempt));

        try {
          renderFunction(containerId);
          addDebugInfo('renderCalled', 'true');

          // Даем время на рендер и проверяем результат
          setTimeout(() => {
            const container = document.getElementById(containerId);
            const hasContent = (container?.children?.length || 0) > 0;

            addDebugInfo(
              'renderCheck',
              JSON.stringify({
                hasContent,
                childrenCount: container?.children?.length || 0,
                attempt,
              }),
            );

            if (hasContent) {
              setWidgetRendered(true);
              setLoadPhase('complete');
              addDebugInfo('renderSuccess', JSON.stringify(true));
              resolve(true);
            } else if (attempt < 3) {
              // Ретрай через 500мс
              setTimeout(() => {
                attemptRender(windowWithWidget, attempt + 1).then(resolve);
              }, 500);
            } else {
              addDebugInfo('renderFailed', `After ${attempt} attempts`);
              resolve(false);
            }
          }, 300);
        } catch (err) {
          addDebugInfo('renderError', JSON.stringify(err));
          resolve(false);
        }
      });
    },
    [containerId],
  );

  // Загрузка и инициализация виджета
  useEffect(() => {
    if (isInitializedRef.current) {
      addDebugInfo('skipLoad', 'Already initialized');
      return;
    }

    setLoadPhase('fetching');
    addDebugInfo('loadStarted', 'true');
    addDebugInfo('host', host);

    const scriptId = `micro-frontend-script-${name}`;
    const styleId = `micro-frontend-style-${name}`;
    const scriptConfigId = `micro-frontend-script-config-${name}`;

    const windowWithWidget = window as unknown as WindowWithWidget;

    // Очистка предыдущего виджета если он существует
    if (windowWithWidget.unmountTMWidget) {
      addDebugInfo('unmountPrevious', 'true');
      windowWithWidget.unmountTMWidget(containerId);
    }

    // Проверяем, не загружен ли уже скрипт
    if (document.getElementById(scriptId)) {
      addDebugInfo('scriptAlreadyExists', 'true');
      attemptRender(windowWithWidget).then(success => {
        addDebugInfo('existingScriptRender', JSON.stringify(success));
      });
      return;
    }

    // Загрузка asset-manifest
    fetch(`${host}/asset-manifest.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        setLoadPhase('loading');
        addDebugInfo('manifestFetched', 'true');
        return response.json();
      })
      .then(
        (manifest: {
          files?: { 'main.js'?: string; 'main.css'?: string };
          'main.js'?: string;
          'main.css'?: string;
          entrypoints?: string[];
        }) => {
          addDebugInfo('manifest', JSON.stringify(manifest));

          const fixedHost = getUrl().url;
          const mainJs = manifest.files?.['main.js'] || manifest['main.js'];
          const mainCss = manifest.files?.['main.css'] || manifest['main.css'];

          if (!mainJs) {
            throw new Error('Main JS file not found in manifest');
          }

          addDebugInfo('assets', JSON.stringify({ mainJs, mainCss }));

          //Загрузка Config
          const scriptConfig = document.createElement('script');
          scriptConfig.src = `${url}/config.js?v=${new Date().getTime()}`;
          scriptConfig.id = scriptConfigId;

          // Загрузка CSS
          if (mainCss) {
            const cssUrl = mainCss.startsWith('http')
              ? mainCss
              : `${fixedHost}${mainCss.startsWith('/') ? '' : '/'}${mainCss}`;

            addDebugInfo('loadingCSS', cssUrl);

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssUrl;
            link.id = styleId;
            link.onload = () => addDebugInfo('cssLoaded', 'true');
            link.onerror = () => addDebugInfo('cssError', 'true');
            document.head.appendChild(link);
          }

          // Загрузка JS
          const jsUrl = mainJs.startsWith('http')
            ? mainJs
            : `${fixedHost}${mainJs.startsWith('/') ? '' : '/'}${mainJs}`;

          addDebugInfo('loadingJS', jsUrl);

          const script = document.createElement('script');
          script.id = scriptId;
          script.src = jsUrl;

          script.onload = () => {
            addDebugInfo('scriptLoaded', 'true');
            isInitializedRef.current = true;
            setLoadPhase('rendering');

            // Даем время скрипту на инициализацию
            setTimeout(() => {
              attemptRender(windowWithWidget).then(success => {
                addDebugInfo('finalRenderResult', JSON.stringify(success));
              });
            }, 100);
          };

          script.onerror = error => {
            setLoadPhase('error');
            addDebugInfo('scriptError', JSON.stringify(error));
          };

          document.head.appendChild(script);
          addDebugInfo('scriptAddedToDOM', 'true');
        },
      )
      .catch(error => {
        setLoadPhase('error');
        addDebugInfo('loadError', error.message);
        console.error('Widget loading error:', error);
      });

    return () => {
      if (process.env.NODE_ENV === 'production') {
        addDebugInfo('cleanup', 'true');

        const unmountFunction = windowWithWidget.unmountTMWidget;
        if (unmountFunction) {
          unmountFunction(containerId);
        }

        const script = document.getElementById(scriptId);
        if (script) {
          script.remove();
          addDebugInfo('scriptRemoved', 'true');
        }

        // Сбрасываем ref'ы при очистке
        isInitializedRef.current = false;
        dataSentRef.current = false;
      }
    };
  }, [host, containerId, attemptRender]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Логируем все сообщения от виджета
      if (event.data && typeof event.data === 'object') {
        addDebugInfo('widgetMessage', event.data);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Дебаг панель */}
      <DebugPanel
        debugInfo={debugInfo}
        clearDebugInfo={clearDebugInfo}
        title="MicroFrontend Debug"
      />

      {/* Лоадер или контент */}
      {!widgetRendered && loadPhase !== 'complete' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
          }}
        >
          <AppSpin />
          <div style={{ marginTop: '10px', color: '#666' }}>
            {loadPhase === 'fetching' && 'Загрузка манифеста...'}
            {loadPhase === 'loading' && 'Загрузка виджета...'}
            {loadPhase === 'rendering' && 'Рендеринг...'}
            {loadPhase === 'error' && 'Ошибка загрузки'}
          </div>
        </div>
      )}

      <Container id={containerId} />
    </div>
  );
};
