// Типы для MAX Bridge
export interface WebAppUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  photo_url?: string;
}

export interface WebAppChat {
  id: number;
  type: string;
}

export interface WebAppInitData {
  query_id?: string;
  auth_date: number;
  hash: string;
  start_param?: string;
  user?: WebAppUser;
  chat?: WebAppChat;
}

export interface WebApp {
  initData: string;
  initDataUnsafe: WebAppInitData;
  platform: string;
  version: string;

  onEvent(eventType: string, callback: Function): void;
  offEvent(eventType: string, callback: Function): void;
  ready(): void;
  close(): void;
  requestContact(): Promise<string>;

  BackButton: {
    isVisible: boolean;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
    show(): void;
    hide(): void;
  };

  ScreenCapture: {
    isScreenCaptureEnabled: boolean;
    enableScreenCapture(): void;
    disableScreenCapture(): void;
  };

  HapticFeedback: {
    impactOccurred(
      style: 'soft' | 'light' | 'medium' | 'heavy' | 'rigid',
      disableVibrationFallback?: boolean,
    ): void;
    notificationOccurred(
      type: 'error' | 'success' | 'warning',
      disableVibrationFallback?: boolean,
    ): void;
    selectionChanged(): void;
  };

  DeviceStorage: {
    setItem(key: string, value: string): void;
    getItem(key: string): string | null;
    removeItem(key: string): void;
    clear(): void;
  };

  SecureStorage: {
    setItem(key: string, value: string): void;
    getItem(key: string): string | null;
    removeItem(key: string): void;
  };

  BiometricManager: {
    isInited: boolean;
    isBiometricAvailable: boolean;
    biometricType: string[];
    deviceId: string | null;
    isAccessRequested: boolean;
    isAccessGranted: boolean;
    isBiometricTokenSaved: boolean;
    init(): Promise<void>;
    requestAccess(): Promise<void>;
    authenticate(): Promise<void>;
    updateBiometricToken(token: string): void;
    openSettings(): void;
  };

  enableClosingConfirmation(): void;
  disableClosingConfirmation(): void;
  openLink(url: string): void;
  openMaxLink(url: string): void;
  shareContent(text: string, link: string): void;
  shareMaxContent(text: string, link: string): void;
  downloadFile(url: string, fileName: string): void;
  openCodeReader(fileSelect?: boolean): Promise<string>;
}

declare global {
  interface Window {
    WebApp?: WebApp;
  }
}
