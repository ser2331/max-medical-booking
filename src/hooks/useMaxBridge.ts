import { useCallback, useEffect, useState } from 'react';
import type { WebAppInitData, WebAppUser } from '../types/max-bridge';
import { MaxDataValidator } from '../utils/validation';

const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN || 'your-bot-token-here';

export const useMaxBridge = () => {
  const [isMaxApp, setIsMaxApp] = useState(false);
  const [initData, setInitData] = useState<WebAppInitData | null>(null);
  const [user, setUser] = useState<WebAppUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [validator] = useState(() => new MaxDataValidator(BOT_TOKEN));

  // Проверяем, запущено ли приложение в MAX и валидируем данные
  useEffect(() => {
    const isMaxEnvironment = !!window.WebApp;
    setIsMaxApp(isMaxEnvironment);

    if (isMaxEnvironment && window.WebApp) {
      const webApp = window.WebApp;

      // Валидация данных
      const isDataValid = validator.validateInitData(webApp.initData);
      setIsValidated(isDataValid);

      if (isDataValid) {
        // Сохраняем данные инициализации
        setInitData(webApp.initDataUnsafe);
        setUser(webApp.initDataUnsafe.user || null);

        // Сообщаем MAX, что приложение готово
        webApp.ready();
        setIsReady(true);

        console.log('MAX Bridge initialized:', {
          platform: webApp.platform,
          version: webApp.version,
          user: webApp.initDataUnsafe.user,
          startParam: webApp.initDataUnsafe.start_param,
          validated: true,
        });
      } else {
        console.error('MAX Bridge data validation failed!');
        // Можно показать ошибку или использовать ограниченный функционал
      }
    }
  }, [validator]);

  // Получение стартовых параметров
  const getStartParam = useCallback((): string | null => {
    if (initData?.start_param) {
      return initData.start_param;
    }

    // Альтернативный способ получения из URL
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('startapp') || urlParams.get('start_param');
    }

    return null;
  }, [initData]);

  // Парсинг стартовых параметров
  const parseStartParam = useCallback(<T = unknown>(): T | null => {
    const startParam = getStartParam();
    if (!startParam) return null;

    try {
      // Если параметры в JSON формате
      if (startParam.startsWith('{')) {
        return JSON.parse(startParam) as T;
      }

      // Если простые параметры в формате key=value&key2=value2
      const params = new URLSearchParams(startParam);
      const result: Record<string, boolean | number | string> = {};

      params.forEach((value, key) => {
        // Пытаемся парсить числа и булевы значения
        if (value === 'true') result[key] = true;
        else if (value === 'false') result[key] = false;
        else if (!isNaN(Number(value)) && value !== '') result[key] = Number(value);
        else result[key] = value;
      });

      return result as T;
    } catch (error) {
      console.error('Error parsing start param:', error);
      return null;
    }
  }, [getStartParam]);

  // Методы для работы с Bridge (остаются без изменений)
  const closeApp = useCallback(() => {
    if (window.WebApp) {
      window.WebApp.close();
    }
  }, []);

  const requestPhone = useCallback(async (): Promise<string> => {
    if (window.WebApp) {
      return await window.WebApp.requestContact();
    }
    throw new Error('MAX Bridge not available');
  }, []);

  const showBackButton = useCallback((show: boolean) => {
    if (window.WebApp) {
      if (show) {
        window.WebApp.BackButton.show();
      } else {
        window.WebApp.BackButton.hide();
      }
    }
  }, []);

  const onBackButtonClick = useCallback((callback: () => void) => {
    if (window.WebApp) {
      window.WebApp.BackButton.onClick(callback);
    }
  }, []);

  const hapticFeedback = useCallback(
    (type: 'impact' | 'notification' | 'selection', options?: {
      style: 'soft' | 'light' | 'medium' | 'heavy' | 'rigid',
      type?: 'error' | 'success' | 'warning'
    }) => {
      if (window.WebApp) {
        switch (type) {
          case 'impact':
            window.WebApp.HapticFeedback.impactOccurred(options?.style || 'medium');
            break;
          case 'notification':
            window.WebApp.HapticFeedback.notificationOccurred(options?.type || 'success');
            break;
          case 'selection':
            window.WebApp.HapticFeedback.selectionChanged();
            break;
        }
      }
    },
    [],
  );

  const openExternalLink = useCallback((url: string) => {
    if (window.WebApp) {
      window.WebApp.openLink(url);
    } else {
      window.open(url, '_blank');
    }
  }, []);

  const shareContent = useCallback((text: string, link: string) => {
    if (window.WebApp) {
      window.WebApp.shareContent(text, link);
    }
  }, []);

  const setScreenCapture = useCallback((enabled: boolean) => {
    if (window.WebApp) {
      if (enabled) {
        window.WebApp.ScreenCapture.enableScreenCapture();
      } else {
        window.WebApp.ScreenCapture.disableScreenCapture();
      }
    }
  }, []);

  const enableClosingConfirmation = useCallback(() => {
    if (window.WebApp) {
      window.WebApp.enableClosingConfirmation();
    }
  }, []);

  const disableClosingConfirmation = useCallback(() => {
    if (window.WebApp) {
      window.WebApp.disableClosingConfirmation();
    }
  }, []);

  return {
    // Состояние
    isMaxApp,
    isReady,
    isValidated,
    initData,
    user,

    // Методы для работы с параметрами
    getStartParam,
    parseStartParam,

    // Методы Bridge
    closeApp,
    requestPhone,
    showBackButton,
    onBackButtonClick,
    hapticFeedback,
    openExternalLink,
    shareContent,
    setScreenCapture,
    enableClosingConfirmation,
    disableClosingConfirmation,

    // Прямой доступ к WebApp
    webApp: window.WebApp,
  };
};
