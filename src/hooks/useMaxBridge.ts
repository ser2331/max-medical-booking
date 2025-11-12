// hooks/useMaxBridge.ts
import { useCallback, useEffect, useState } from 'react';
import type { SupportedFeatures, WebAppInitData, WebAppUser } from '../types/max-bridge';
import { MockWebApp } from '../mocks/max-bridge.mock';

// Функция для инициализации WebApp (реального или мока)
const initializeWebApp = () => {
  // Если уже есть WebApp (в MAX среде), используем его
  if (window.WebApp) {
    return window.WebApp;
  }

  // Если запущено не в MAX, создаем мок
  console.log('🚀 MAX environment not detected, using MockWebApp');

  const mockUser: Partial<WebAppUser> = {
    first_name: 'Демо',
    last_name: 'Пользователь',
    language_code: 'ru',
  };

  const mockWebApp = new MockWebApp(mockUser);
  window.WebApp = mockWebApp as MockWebApp;
  return window.WebApp;
};

// Проверяем поддержку методов в реальном времени (БЕЗ вызова методов)
const checkFeatureSupport = (): SupportedFeatures => {
  const webApp = window.WebApp;

  return {
    // Проверяем существование методов, НЕ вызываем их
    haptic: !!(
      webApp?.HapticFeedback &&
      typeof webApp.HapticFeedback.impactOccurred === 'function' &&
      typeof webApp.HapticFeedback.notificationOccurred === 'function' &&
      typeof webApp.HapticFeedback.selectionChanged === 'function'
    ),
    backButton: !!(
      webApp?.BackButton &&
      typeof webApp.BackButton.show === 'function' &&
      typeof webApp.BackButton.hide === 'function' &&
      typeof webApp.BackButton.onClick === 'function'
    ),
    openLink: !!(webApp && typeof webApp.openLink === 'function'),
    share: !!(webApp && typeof webApp.shareContent === 'function'),
    requestContact: !!(webApp && typeof webApp.requestContact === 'function'),
    screenCapture: !!(
      webApp?.ScreenCapture &&
      typeof webApp.ScreenCapture.enableScreenCapture === 'function' &&
      typeof webApp.ScreenCapture.disableScreenCapture === 'function'
    ),
    closingConfirmation: !!(
      webApp &&
      typeof webApp.enableClosingConfirmation === 'function' &&
      typeof webApp.disableClosingConfirmation === 'function'
    ),
  };
};

export const useMaxBridge = () => {
  const [isMaxApp, setIsMaxApp] = useState(false);
  const [initData, setInitData] = useState<WebAppInitData | null>(null);
  const [user, setUser] = useState<WebAppUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [supportedFeatures, setSupportedFeatures] = useState<SupportedFeatures>({
    haptic: false,
    backButton: false,
    openLink: false,
    share: false,
    requestContact: false,
    screenCapture: false,
    closingConfirmation: false,
  });

  // Инициализируем WebApp (реальный или мок)
  useEffect(() => {
    const webApp = initializeWebApp();
    const isRealMaxEnvironment = !!window.WebApp && !(webApp instanceof MockWebApp);

    setIsMaxApp(isRealMaxEnvironment);

    // Сохраняем данные инициализации
    setInitData(webApp.initDataUnsafe);
    setUser(webApp.initDataUnsafe?.user || null);

    // Проверяем поддерживаемые функции
    const features = checkFeatureSupport();
    setSupportedFeatures(features);

    // Сообщаем MAX, что приложение готово
    webApp.ready();
    setIsReady(true);

    console.log('✅ MAX Bridge initialized:', {
      environment: isRealMaxEnvironment ? 'REAL MAX' : 'MOCK',
      platform: webApp.platform,
      version: webApp.version,
      user: webApp.initDataUnsafe?.user,
      supportedFeatures: features,
    });
  }, []);

  // Получение стартовых параметров
  const getStartParam = useCallback((): string | null => {
    if (initData?.start_param) {
      return initData.start_param;
    }

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
      if (startParam.startsWith('{')) {
        return JSON.parse(startParam) as T;
      }

      const params = new URLSearchParams(startParam);
      const result: Record<string, boolean | number | string> = {};

      params.forEach((value, key) => {
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

  // Безопасный метод закрытия приложения
  const closeApp = useCallback(() => {
    if (window.WebApp?.close) {
      window.WebApp.close();
    }
  }, []);

  // Управление кнопкой "Назад"
  const showBackButton = useCallback(
    (show: boolean) => {
      if (supportedFeatures.backButton && window.WebApp?.BackButton) {
        if (show) {
          window.WebApp.BackButton.show();
        } else {
          window.WebApp.BackButton.hide();
        }
      }
    },
    [supportedFeatures.backButton],
  );

  const onBackButtonClick = useCallback(
    (callback: () => void) => {
      if (supportedFeatures.backButton && window.WebApp?.BackButton?.onClick) {
        window.WebApp.BackButton.onClick(callback);
      }
    },
    [supportedFeatures.backButton],
  );

  // Безопасная тактильная обратная связь
  const hapticFeedback = useCallback(
    async (
      type: 'impact' | 'notification' | 'selection',
      style: 'light' | 'medium' | 'heavy' = 'medium',
    ) => {
      if (!supportedFeatures.haptic || !window.WebApp?.HapticFeedback) {
        console.log('⚠️ Haptic feedback not supported');
        return;
      }

      try {
        switch (type) {
          case 'impact':
            window.WebApp.HapticFeedback.impactOccurred(style);
            break;
          case 'notification':
            window.WebApp.HapticFeedback.notificationOccurred('success');
            break;
          case 'selection':
            window.WebApp.HapticFeedback.selectionChanged();
            break;
        }
        console.log('✅ Haptic feedback sent:', type, style);
      } catch (error) {
        console.warn('❌ Haptic feedback failed:', error);
      }
    },
    [supportedFeatures.haptic],
  );

  // Открытие внешних ссылок
  const openExternalLink = useCallback(
    (url: string) => {
      if (supportedFeatures.openLink && window.WebApp?.openLink) {
        window.WebApp.openLink(url);
      } else {
        window.open(url, '_blank');
      }
    },
    [supportedFeatures.openLink],
  );

  // Безопасный запрос контакта
  const requestContact = useCallback(async (): Promise<string> => {
    if (supportedFeatures.requestContact && window.WebApp?.requestContact) {
      return await window.WebApp.requestContact();
    }
    throw new Error('Contact request not supported');
  }, [supportedFeatures.requestContact]);

  // Безопасное управление подтверждением закрытия
  const enableClosingConfirmation = useCallback(() => {
    if (supportedFeatures.closingConfirmation && window.WebApp?.enableClosingConfirmation) {
      window.WebApp.enableClosingConfirmation();
    }
  }, [supportedFeatures.closingConfirmation]);

  const disableClosingConfirmation = useCallback(() => {
    if (supportedFeatures.closingConfirmation && window.WebApp?.disableClosingConfirmation) {
      window.WebApp.disableClosingConfirmation();
    }
  }, [supportedFeatures.closingConfirmation]);

  // Управление захватом экрана
  const enableScreenCapture = useCallback(() => {
    if (supportedFeatures.screenCapture && window.WebApp?.ScreenCapture?.enableScreenCapture) {
      window.WebApp.ScreenCapture.enableScreenCapture();
    }
  }, [supportedFeatures.screenCapture]);

  const disableScreenCapture = useCallback(() => {
    if (supportedFeatures.screenCapture && window.WebApp?.ScreenCapture?.disableScreenCapture) {
      window.WebApp.ScreenCapture.disableScreenCapture();
    }
  }, [supportedFeatures.screenCapture]);

  // Общий метод для проверки доступности функции
  const isFeatureSupported = useCallback(
    (feature: keyof SupportedFeatures): boolean => {
      return supportedFeatures[feature];
    },
    [supportedFeatures],
  );

  return {
    // Состояние
    isMaxApp,
    isReady,
    initData,
    user,
    supportedFeatures,

    // Методы для работы с параметрами
    getStartParam,
    parseStartParam,

    // Основные методы Bridge
    closeApp,
    showBackButton,
    onBackButtonClick,
    hapticFeedback,
    openExternalLink,
    requestContact,

    // Дополнительные методы
    enableClosingConfirmation,
    disableClosingConfirmation,
    enableScreenCapture,
    disableScreenCapture,

    // Утилиты
    isFeatureSupported,

    // Прямой доступ к WebApp
    webApp: window.WebApp,
  };
};
