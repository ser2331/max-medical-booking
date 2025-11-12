// types/max-bridge.types.ts
export interface WebAppUser {
  id: number;
  first_name: string;
  last_name: string;
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
  auth_date?: number;
  hash?: string;
  start_param?: string;
  user?: WebAppUser;
  chat?: WebAppChat;
}

export interface HapticFeedback {
  impactOccurred: (
    style: 'soft' | 'light' | 'medium' | 'heavy' | 'rigid',
    disableVibrationFallback?: boolean,
  ) => void;
  notificationOccurred: (
    type: 'error' | 'success' | 'warning',
    disableVibrationFallback?: boolean,
  ) => void;
  selectionChanged: () => void;
}

export interface BackButton {
  isVisible: boolean;
  onClick: (callback: () => void) => void;
  offClick: (callback: () => void) => void;
  show: () => void;
  hide: () => void;
}

export interface ScreenCapture {
  isScreenCaptureEnabled: boolean;
  enableScreenCapture: () => void;
  disableScreenCapture: () => void;
}

export interface DeviceStorage {
  setItem: (key: string, value: string) => void;
  getItem: (key: string) => string | null;
  removeItem: (key: string) => void;
  clear: () => void;
}

export interface SecureStorage {
  setItem: (key: string, value: string) => void;
  getItem: (key: string) => string | null;
  removeItem: (key: string) => void;
}

export interface BiometricManager {
  isInited: boolean;
  isBiometricAvailable: boolean;
  biometricType: string[];
  deviceId: string | null;
  isAccessRequested: boolean;
  isAccessGranted: boolean;
  isBiometricTokenSaved: boolean;
  init: () => Promise<void>;
  requestAccess: () => Promise<boolean>;
  authenticate: () => Promise<boolean>;
  updateBiometricToken: (token: string) => Promise<void>;
  openSettings: () => void;
}

export interface WebApp {
  initData: string;
  initDataUnsafe: WebAppInitData;
  platform: 'ios' | 'android' | 'desktop' | 'web';
  version: string;

  onEvent: (eventName: string, callback: () => unknown) => void;
  offEvent: (eventName: string, callback: () => unknown) => void;
  ready: () => void;
  close: () => void;
  requestContact: () => Promise<string>;

  BackButton: BackButton;
  ScreenCapture: ScreenCapture;
  HapticFeedback: HapticFeedback;
  DeviceStorage: DeviceStorage;
  SecureStorage: SecureStorage;
  BiometricManager: BiometricManager;

  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
  openLink: (url: string) => void;
  openMaxLink: (url: string) => void;
  shareContent: (text: string, link: string) => void;
  shareMaxContent: (text: string, link: string) => void;
  downloadFile: (url: string, fileName: string) => void;
  openCodeReader: (fileSelect?: boolean) => Promise<string>;
}

declare global {
  interface Window {
    WebApp?: WebApp;
  }
}

export interface SupportedFeatures {
  haptic: boolean;
  backButton: boolean;
  openLink: boolean;
  share: boolean;
  requestContact: boolean;
  screenCapture: boolean;
  closingConfirmation: boolean;
}

export interface MaxBridgeContextType {
  // Состояние
  isMaxApp: boolean;
  isReady: boolean;
  initData: WebAppInitData | null;
  user: WebAppUser | null;
  supportedFeatures: SupportedFeatures;

  // Методы для работы с параметрами
  getStartParam: () => string | null;
  parseStartParam: <T = string>() => T | null;

  // Основные методы Bridge
  closeApp: () => void;
  showBackButton: (show: boolean) => void;
  onBackButtonClick: (callback: () => void) => void;
  hapticFeedback: (
    type: 'impact' | 'notification' | 'selection',
    style?: 'light' | 'medium' | 'heavy',
  ) => Promise<void>;
  openExternalLink: (url: string) => void;
  requestContact: () => Promise<string>;

  // Дополнительные методы
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
  enableScreenCapture: () => void;
  disableScreenCapture: () => void;

  // Утилиты
  isFeatureSupported: (feature: keyof SupportedFeatures) => boolean;

  // Прямой доступ
  webApp: WebApp | undefined;
}
