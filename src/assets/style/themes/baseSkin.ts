import { baseTheme } from './baseTheme';
import { ThemeConfig } from '@/assets/style/themes/theme.types.ts';

// Функции для работы с CSS переменными
const getCssVariable = (name: string): string => {
  return `var(--${name})`;
};

// Светлая тема на основе CSS переменных
export const lightTheme: ThemeConfig = {
  ...baseTheme,
  name: 'gorzdrav-light',
  mode: 'light',
  colors: {
    // Основные цвета
    mainBackground: getCssVariable('widget-main-background'),
    black: getCssVariable('widget-black'),
    blackPure: getCssVariable('widget-black-pure'),
    blue: getCssVariable('widget-blue'),
    blueDark: getCssVariable('widget-blue-dark'),
    blueHover: getCssVariable('widget-blue-hover'),
    blueLight: getCssVariable('widget-blue-light'),
    blueHighlight: getCssVariable('widget-blue-highlight'),
    white: getCssVariable('widget-white'),

    // Серые оттенки
    grey1: getCssVariable('widget-grey-1'),
    grey2: getCssVariable('widget-grey-2'),
    grey3: getCssVariable('widget-grey-3'),
    grey4: getCssVariable('widget-grey-4'),
    grey5: getCssVariable('widget-grey-5'),
    grey6: getCssVariable('widget-grey-6'),

    // Красные оттенки
    red: getCssVariable('widget-red'),
    redLight: getCssVariable('widget-red-light'),
    redLight2: getCssVariable('widget-red-light-2'),
    redExtra: getCssVariable('widget-red-extra'),
    redMessage: getCssVariable('widget-red-message'),

    // Оранжевые оттенки
    orange: getCssVariable('widget-oragne'),
    orangeLight: getCssVariable('widget-orange-light'),
    redLink: getCssVariable('widget-red-link'),

    // Зеленые оттенки
    green: getCssVariable('widget-green'),
    greenLight: getCssVariable('widget-green-light'),

    // Статусы
    statusInProgress: getCssVariable('status-in-progress'),
    statusCanceled: getCssVariable('status-canceled'),
    statusFinished: getCssVariable('status-finished'),

    // Фон
    mainBackgroundColor: getCssVariable('main-background-color'),
    cardMetadataColor: getCssVariable('card-metadata--color'),

    // Инпуты
    inputBorder: getCssVariable('input-border'),
    inputBorderHover: getCssVariable('input-border-hover'),
    inputBorderActive: getCssVariable('input-border-active'),
    inputBorderError: getCssVariable('input-border-error'),
    inputLabelError: getCssVariable('input-label-error'),
    inputBackground: getCssVariable('input-background'),
    inputLabelColor: getCssVariable('input-label-color'),

    // Карточки
    cardElemBackground: getCssVariable('card-elem--background'),

    // Просроченные элементы
    overdueBorder: getCssVariable('overdue-border'),
    overdueBackground: getCssVariable('overdue-background'),
    overdueDate: getCssVariable('overdue-date'),

    // Транзишены
    transitionElemColor: getCssVariable('transition-elem--color'),
    transitionElemBackground: getCssVariable('transition-elem--background'),
    transitionElemBackgroundHover: getCssVariable('transition-elem--background-hover'),

    // Формы
    formBlockBorder: getCssVariable('form-block-border'),

    // Футер формы
    footerFormButtonSubmitBackground: getCssVariable('footer-form--button-submit--background'),
    footerFormButtonSubmitBackgroundHover: getCssVariable(
      'footer-form--button-submit--background-hover',
    ),
    footerFormButtonSubmitColor: getCssVariable('footer-form--button-submit--color'),
    footerFormButtonSubmitColorHover: getCssVariable('footer-form--button-submit--color-hover'),
    footerFormButtonCancelBackground: getCssVariable('footer-form--button-cancel--background'),
    footerFormButtonCancelColor: getCssVariable('footer-form--button-cancel--color'),
    footerFormButtonCancelBackgroundHover: getCssVariable(
      'footer-form--button-cancel--background-hover',
    ),
    footerFormButtonCancelColorHover: getCssVariable('footer-form--button-cancel--color-hover'),

    // Кнопки формы
    formButtonColor: getCssVariable('form-button-color'),
    formButtonBackground: getCssVariable('form-button-background'),
    formButtonColorHover: getCssVariable('form-button-color-hover'),
    formButtonBackgroundHover: getCssVariable('form-button-background-hover'),
    formButtonCancelColor: getCssVariable('form-button-cancel-color'),
    formButtonCancelBackground: getCssVariable('form-button-cancel-background'),
    formButtonCancelColorHover: getCssVariable('form-button-cancel-color-hover'),
    formButtonCancelBackgroundHover: getCssVariable('form-button-cancel-background-hover'),

    // Другое
    stickyStyle: getCssVariable('sticky-style'),
  },
};

// Темная тема - используем те же CSS переменные, но с другим набором значений в :root
export const darkTheme: ThemeConfig = {
  ...baseTheme,
  name: 'gorzdrav-dark',
  mode: 'dark',
  colors: {
    // Основные цвета (используем те же переменные, но значения будут переопределены в CSS)
    mainBackground: getCssVariable('widget-main-background'),
    black: getCssVariable('widget-black'),
    blackPure: getCssVariable('widget-black-pure'),
    blue: getCssVariable('widget-blue'),
    blueDark: getCssVariable('widget-blue-dark'),
    blueHover: getCssVariable('widget-blue-hover'),
    blueLight: getCssVariable('widget-blue-light'),
    blueHighlight: getCssVariable('widget-blue-highlight'),
    white: getCssVariable('widget-white'),

    // Серые оттенки
    grey1: getCssVariable('widget-grey-1'),
    grey2: getCssVariable('widget-grey-2'),
    grey3: getCssVariable('widget-grey-3'),
    grey4: getCssVariable('widget-grey-4'),
    grey5: getCssVariable('widget-grey-5'),
    grey6: getCssVariable('widget-grey-6'),

    // Красные оттенки
    red: getCssVariable('widget-red'),
    redLight: getCssVariable('widget-red-light'),
    redLight2: getCssVariable('widget-red-light-2'),
    redExtra: getCssVariable('widget-red-extra'),
    redMessage: getCssVariable('widget-red-message'),

    // Оранжевые оттенки
    orange: getCssVariable('widget-oragne'),
    orangeLight: getCssVariable('widget-orange-light'),
    redLink: getCssVariable('widget-red-link'),

    // Зеленые оттенки
    green: getCssVariable('widget-green'),
    greenLight: getCssVariable('widget-green-light'),

    // Статусы
    statusInProgress: getCssVariable('status-in-progress'),
    statusCanceled: getCssVariable('status-canceled'),
    statusFinished: getCssVariable('status-finished'),

    // Фон
    mainBackgroundColor: getCssVariable('main-background-color'),
    cardMetadataColor: getCssVariable('card-metadata--color'),

    // Инпуты
    inputBorder: getCssVariable('input-border'),
    inputBorderHover: getCssVariable('input-border-hover'),
    inputBorderActive: getCssVariable('input-border-active'),
    inputBorderError: getCssVariable('input-border-error'),
    inputLabelError: getCssVariable('input-label-error'),
    inputBackground: getCssVariable('input-background'),
    inputLabelColor: getCssVariable('input-label-color'),

    // Карточки
    cardElemBackground: getCssVariable('card-elem--background'),

    // Просроченные элементы
    overdueBorder: getCssVariable('overdue-border'),
    overdueBackground: getCssVariable('overdue-background'),
    overdueDate: getCssVariable('overdue-date'),

    // Транзишены
    transitionElemColor: getCssVariable('transition-elem--color'),
    transitionElemBackground: getCssVariable('transition-elem--background'),
    transitionElemBackgroundHover: getCssVariable('transition-elem--background-hover'),

    // Формы
    formBlockBorder: getCssVariable('form-block-border'),

    // Футер формы
    footerFormButtonSubmitBackground: getCssVariable('footer-form--button-submit--background'),
    footerFormButtonSubmitBackgroundHover: getCssVariable(
      'footer-form--button-submit--background-hover',
    ),
    footerFormButtonSubmitColor: getCssVariable('footer-form--button-submit--color'),
    footerFormButtonSubmitColorHover: getCssVariable('footer-form--button-submit--color-hover'),
    footerFormButtonCancelBackground: getCssVariable('footer-form--button-cancel--background'),
    footerFormButtonCancelColor: getCssVariable('footer-form--button-cancel--color'),
    footerFormButtonCancelBackgroundHover: getCssVariable(
      'footer-form--button-cancel--background-hover',
    ),
    footerFormButtonCancelColorHover: getCssVariable('footer-form--button-cancel--color-hover'),

    // Кнопки формы
    formButtonColor: getCssVariable('form-button-color'),
    formButtonBackground: getCssVariable('form-button-background'),
    formButtonColorHover: getCssVariable('form-button-color-hover'),
    formButtonBackgroundHover: getCssVariable('form-button-background-hover'),
    formButtonCancelColor: getCssVariable('form-button-cancel-color'),
    formButtonCancelBackground: getCssVariable('form-button-cancel-background'),
    formButtonCancelColorHover: getCssVariable('form-button-cancel-color-hover'),
    formButtonCancelBackgroundHover: getCssVariable('form-button-cancel-background-hover'),

    // Другое
    stickyStyle: getCssVariable('sticky-style'),
  },
};
