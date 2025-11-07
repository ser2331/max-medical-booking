import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ru: {
    translation: {
      // Общие
      continue: 'Продолжить',
      back: 'Назад',
      select: 'Выбрать',
      search: 'Поиск',
      cancel: 'Отмена',
      loading: 'Загрузка',
      error: 'Ошибка',

      booking: {
        title: 'Запись к врачу',
      },
      // Валидация
      validation: {
        required: 'Обязательное поле',
        consentRequired: 'Необходимо согласие на обработку данных',
        invalidEmail: 'Неверный формат email',
        invalidPhone: 'Неверный формат телефона',
        invalidSnils: 'Неверный формат СНИЛС',
      },

      //widget
      widget: {
        title: 'Медицинские заявки',
        initializing: 'Инициализация виджета...',
        authError: 'Ошибка авторизации виджета',
        loadError: 'Ошибка загрузки виджета',
      },

      // Ошибки
      errors: {
        network: 'Проблемы с соединением',
        auth: 'Ошибка авторизации',
        unknown: 'Неизвестная ошибка',
      },
    },
  },
  en: {
    translation: {
      // Common
      continue: 'Continue',
      back: 'Back',
      select: 'Select',
      search: 'Search',
      cancel: 'Cancel',
      error: 'Error',
      loading: 'Loading',

      booking: {
        title: 'Doctor Appointment',
      },
      // Validation
      validation: {
        required: 'Required field',
        consentRequired: 'Consent to data processing is required',
        invalidEmail: 'Invalid email format',
        invalidPhone: 'Invalid phone format',
        invalidSnils: 'Invalid SNILS format',
      },

      //widget
      widget: {
        title: 'Medical Requests',
        initializing: 'Initializing widget...',
        authError: 'Widget authentication error',
        loadError: 'Widget loading error',
      },

      // Errors
      errors: {
        network: 'Connection issues',
        auth: 'Authentication error',
        unknown: 'Unknown error',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
