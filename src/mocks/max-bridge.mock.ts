import { WebAppInitData, WebAppUser } from '../types/max-bridge';

export class MockWebApp {
  initData = '';
  initDataUnsafe: WebAppInitData;
  platform: 'ios' | 'android' | 'desktop' | 'web' = 'web';
  version = '25.9.16';

  BackButton = {
    isVisible: false,
    onClick: (callback: () => void) => {
      console.log('[Mock] BackButton onClick registered');
      this.backButtonCallbacks.push(callback);
    },
    offClick: (callback: () => void) => {
      this.backButtonCallbacks = this.backButtonCallbacks.filter(cb => cb !== callback);
    },
    show: () => {
      this.BackButton.isVisible = true;
      console.log('[Mock] BackButton shown');
    },
    hide: () => {
      this.BackButton.isVisible = false;
      console.log('[Mock] BackButton hidden');
    },
  };

  ScreenCapture = {
    isScreenCaptureEnabled: false,
    enableScreenCapture: () => {
      this.ScreenCapture.isScreenCaptureEnabled = true;
      console.log('[Mock] ScreenCapture enabled');
    },
    disableScreenCapture: () => {
      this.ScreenCapture.isScreenCaptureEnabled = false;
      console.log('[Mock] ScreenCapture disabled');
    },
  };

  HapticFeedback = {
    impactOccurred: (style: 'soft' | 'light' | 'medium' | 'heavy' | 'rigid') => {
      console.log(`[Mock] HapticFeedback: impactOccurred (${style})`);
    },
    notificationOccurred: (type: 'error' | 'success' | 'warning') => {
      console.log(`[Mock] HapticFeedback: notificationOccurred (${type})`);
    },
    selectionChanged: () => {
      console.log('[Mock] HapticFeedback: selectionChanged');
    },
  };

  DeviceStorage = {
    setItem: (key: string, value: string) => {
      localStorage.setItem(`max_device_${key}`, value);
      console.log(`[Mock] DeviceStorage: setItem ${key}`);
    },
    getItem: (key: string) => {
      const value = localStorage.getItem(`max_device_${key}`);
      console.log(`[Mock] DeviceStorage: getItem ${key} = ${value}`);
      return value;
    },
    removeItem: (key: string) => {
      localStorage.removeItem(`max_device_${key}`);
      console.log(`[Mock] DeviceStorage: removeItem ${key}`);
    },
    clear: () => {
      Object.keys(localStorage)
        .filter(key => key.startsWith('max_device_'))
        .forEach(key => localStorage.removeItem(key));
      console.log('[Mock] DeviceStorage: clear');
    },
  };

  SecureStorage = {
    setItem: (key: string, value: string) => {
      // В реальности это было бы защищенное хранилище
      sessionStorage.setItem(`max_secure_${key}`, value);
      console.log(`[Mock] SecureStorage: setItem ${key}`);
    },
    getItem: (key: string) => {
      const value = sessionStorage.getItem(`max_secure_${key}`);
      console.log(`[Mock] SecureStorage: getItem ${key}`);
      return value;
    },
    removeItem: (key: string) => {
      sessionStorage.removeItem(`max_secure_${key}`);
      console.log(`[Mock] SecureStorage: removeItem ${key}`);
    },
  };

  BiometricManager = {
    isInited: false,
    isBiometricAvailable: false,
    biometricType: ['unknown'],
    deviceId: null,
    isAccessRequested: false,
    isAccessGranted: false,
    isBiometricTokenSaved: false,
    init: async () => {
      this.BiometricManager.isInited = true;
      this.BiometricManager.isBiometricAvailable = Math.random() > 0.5;
      console.log('[Mock] BiometricManager: init');
    },
    requestAccess: async () => {
      this.BiometricManager.isAccessRequested = true;
      this.BiometricManager.isAccessGranted = Math.random() > 0.7;
      console.log('[Mock] BiometricManager: requestAccess', {
        granted: this.BiometricManager.isAccessGranted,
      });
      return this.BiometricManager.isAccessGranted;
    },
    authenticate: async () => {
      const success = Math.random() > 0.3;
      console.log('[Mock] BiometricManager: authenticate', { success });
      return success;
    },
    updateBiometricToken: async (token: string) => {
      this.BiometricManager.isBiometricTokenSaved = token !== '';
      console.log('[Mock] BiometricManager: updateBiometricToken');
    },
    openSettings: () => {
      console.log('[Mock] BiometricManager: openSettings');
    },
  };

  private events = new Map<string, (() => unknown)[]>();
  private backButtonCallbacks: (() => unknown)[] = [];

  constructor(user?: Partial<WebAppUser>) {
    const defaultUser: WebAppUser = {
      id: 123456789,
      first_name: 'Демо',
      last_name: 'Пользователь',
      username: 'demo_user',
      language_code: 'ru',
      photo_url: 'https://example.com/photo.jpg',
      ...user,
    };

    this.initDataUnsafe = {
      query_id: 'mock_query_id_' + Date.now(),
      auth_date: Math.floor(Date.now() / 1000),
      hash: 'mock_hash_' + Math.random().toString(36).substr(2, 9),
      start_param: 'test',
      user: defaultUser,
      chat: {
        id: 987654321,
        type: 'private',
      },
    };

    this.initData = JSON.stringify(this.initDataUnsafe);
  }

  onEvent = (eventName: string, callback: () => unknown) => {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName)!.push(callback);
    console.log(`[Mock] onEvent: ${eventName}`);
  };

  offEvent = (eventName: string, callback: () => unknown) => {
    const callbacks = this.events.get(eventName);
    if (callbacks) {
      this.events.set(
        eventName,
        callbacks.filter(cb => cb !== callback),
      );
    }
    console.log(`[Mock] offEvent: ${eventName}`);
  };

  ready = () => {
    console.log('[Mock] WebApp ready');
    this.triggerEvent('WebAppReady');
  };

  close = () => {
    console.log('[Mock] WebApp close');
    this.triggerEvent('WebAppClose');
    // В браузере просто обновляем страницу для демо
    window.location.reload();
  };

  requestContact = async (): Promise<string> => {
    console.log('[Mock] requestContact');
    return '+7 (999) 123-45-67';
  };

  enableClosingConfirmation = () => {
    console.log('[Mock] enableClosingConfirmation');
  };

  disableClosingConfirmation = () => {
    console.log('[Mock] disableClosingConfirmation');
  };

  openLink = (url: string) => {
    console.log(`[Mock] openLink: ${url}`);
    window.open(url, '_blank');
  };

  openMaxLink = (url: string) => {
    console.log(`[Mock] openMaxLink: ${url}`);
  };

  shareContent = (text: string, link: string) => {
    console.log(`[Mock] shareContent: ${text}`, { link });

    // Эмуляция нативного шаринга в браузере
    if (navigator.share) {
      navigator.share({ text, url: link });
    } else {
      console.log('Web Share API not supported');
    }
  };

  shareMaxContent = (text: string, link: string) => {
    console.log(`[Mock] shareMaxContent: ${text}`, { link });
  };

  downloadFile = (url: string, fileName: string) => {
    console.log(`[Mock] downloadFile: ${url}`, { fileName });

    // Эмуляция скачивания в браузере
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
  };

  openCodeReader = async (fileSelect = true): Promise<string> => {
    console.log(`[Mock] openCodeReader`, { fileSelect });

    // Имитация сканирования QR-кода
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('https://max.ru/demo?startapp=qr_scanned');
      }, 1500);
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private triggerEvent(eventName: string, _data?: unknown) {
    const callbacks = this.events.get(eventName) || [];
    callbacks.forEach(callback => callback());
  }

  // Методы для тестирования
  simulateBackButtonClick = () => {
    this.backButtonCallbacks.forEach(callback => callback());
  };

  simulateEvent = (eventName: string, data?: unknown) => {
    this.triggerEvent(eventName, data);
  };
}
