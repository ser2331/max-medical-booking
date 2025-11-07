import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '@/store';
import { WIDGET_CONFIG } from '@/constants.ts';
import { getUrl } from '@/config/env';

// Styled Components
const Container = styled.main`
    width: 100%;
    height: 100%;
`;


interface WindowWithWidget {
  [key: string]: ((containerId: string) => void) | undefined;

  renderTMWidget?: (containerId: string) => void;
  renderWidget?: (containerId: string) => void;
  unmountTMWidget?: (containerId: string) => void;
}

const name = 'TMWidget';

function MicroFrontend() {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const isInitializedRef = useRef(false);
  const dataSentRef = useRef(false);
  const fetchInterceptedRef = useRef(false);
  const containerId = `${name}-container`;
  const { sessionId } = useSelector((state: RootState) => state.auth);
  const { host, url } = getUrl();

  // Сбрасываем состояния при размонтировании
  useEffect(() => {
    return () => {
      isInitializedRef.current = false;
      dataSentRef.current = false;
      fetchInterceptedRef.current = false;
      setWidgetLoaded(false);
    };
  }, []);

  // Перехват fetch запросов виджета (только один раз)
  useEffect(() => {
    if (!sessionId || fetchInterceptedRef.current) return;

    const originalFetch = window.fetch;
    fetchInterceptedRef.current = true;

    window.fetch = function(...args) {
      const requestUrl = args[0];

      if (typeof requestUrl === 'string' && requestUrl.includes('/tm-widgets/api/registerUser')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            success: true,
            result: { sessionId },
          }),
        } as Response);
      }

      // Перехват authorize и других API запросов - делаем абсолютными URL
      if (typeof requestUrl === 'string' && requestUrl.includes('/tm-widgets/api')) {
        args[0] = `${url}${requestUrl}`;
      }

      return originalFetch.apply(this, args);
    };

    return () => {
      window.fetch = originalFetch;
      fetchInterceptedRef.current = false;
    };
  }, [sessionId]);

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
    window.postMessage(widgetData, '*');
  }, [sessionId]);

  // Отправка данных после загрузки виджета
  useEffect(() => {
    if (sessionId && widgetLoaded) {
      sendDataToWidget();
    }
  }, [sessionId, widgetLoaded, sendDataToWidget]);

  // Загрузка и инициализация виджета
  useEffect(() => {
    if (isInitializedRef.current) return;

    const scriptId = `micro-frontend-script-${name}`;
    const windowWithWidget = window as unknown as WindowWithWidget;

    // Очистка предыдущего виджета если он существует
    if (windowWithWidget.unmountTMWidget) {
      windowWithWidget.unmountTMWidget(containerId);
    }

    if (document.getElementById(scriptId)) {
      const renderFunction = windowWithWidget[`render${name}`];
      if (renderFunction) {
        renderFunction(containerId);
        setWidgetLoaded(true);
      }
      return;
    }

    fetch(`${host}/asset-manifest.json`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return response.json();
      })
      .then((manifest: {
        files?: { 'main.js'?: string; 'main.css'?: string };
        'main.js'?: string;
        'main.css'?: string;
        entrypoints?: string[];
      }) => {
        const fixedHost = getUrl().url;
        const mainJs = manifest.files?.['main.js'] || manifest['main.js'];
        const mainCss = manifest.files?.['main.css'] || manifest['main.css'];

        if (!mainJs) throw new Error('Main JS file not found');

        // Загрузка CSS
        if (mainCss) {
          const cssUrl = mainCss.startsWith('http') ? mainCss : `${fixedHost}${mainCss.startsWith('/') ? '' : '/'}${mainCss}`;
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = cssUrl;
          document.head.appendChild(link);
        }

        // Загрузка JS
        const jsUrl = mainJs.startsWith('http') ? mainJs : `${fixedHost}${mainJs.startsWith('/') ? '' : '/'}${mainJs}`;
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = jsUrl;

        script.onload = () => {
          isInitializedRef.current = true;
          const renderFunction = windowWithWidget.renderTMWidget || windowWithWidget.renderWidget;

          if (renderFunction) {
            renderFunction(containerId);
            setWidgetLoaded(true);
          } else {
            console.error('❌ No render function found');
          }
        };

        script.onerror = (error) => {
          console.error('❌ Script loading failed:', error);
        };

        document.head.appendChild(script);
      })
      .catch(console.error);

    return () => {
      if (process.env.NODE_ENV === 'production') {
        const unmountFunction = windowWithWidget.unmountTMWidget;
        if (unmountFunction) {
          unmountFunction(containerId);
        }

        const script = document.getElementById(scriptId);
        if (script) script.remove();

        // Сбрасываем ref'ы при очистке
        isInitializedRef.current = false;
        dataSentRef.current = false;
      }
    };
  }, [host, containerId]);

  return <Container id={containerId} />;
}

export default MicroFrontend;