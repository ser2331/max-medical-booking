//IFRAME FOR EXAMPLE
import { FC, useEffect, useRef } from 'react';
import { WIDGET_CONFIG } from '@/constants.ts';

interface IFrameWidgetProps {
  sessionId: string;
  onBack?: () => void;
}

export const IFrameWidget: FC<IFrameWidgetProps> = ({
                                                      sessionId,
                                                    }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const dataSentRef = useRef(false);

  useEffect(() => {
    if (sessionId && iframeRef.current && !dataSentRef.current) {
      dataSentRef.current = true;

      const widgetData = {
        isActualData: true,
        data: {
          sessionId,
          hideCreateButton: false,
          ...WIDGET_CONFIG,
        },
      };

      // Ждем пока iframe загрузится
      const sendData = () => {
        if (iframeRef.current?.contentWindow) {
          console.log('📤 Sending data to iframe:', widgetData);
          iframeRef.current.contentWindow.postMessage(widgetData, '*');
        }
      };

      // Пробуем несколько раз с задержками
      const timers = [
        setTimeout(sendData, 1000),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [sessionId]);

  return (
    <iframe
      ref={iframeRef}
      title="tm-widget"
      src="https://r78-rc.zdrav.netrika.ru/tm.widgets/"
      frameBorder="no"
      width="100%"
      height="100vh"
      style={{ border: 'none', height: '100vh' }}
    />
  );
};