export interface ColorPalette {
  // Основные цвета
  mainBackground: string;
  black: string;
  blackPure: string;
  blue: string;
  blueDark: string;
  blueHover: string;
  blueLight: string;
  blueHighlight: string;
  white: string;

  // Серые оттенки
  grey1: string;
  grey2: string;
  grey3: string;
  grey4: string;
  grey5: string;
  grey6: string;

  // Красные оттенки
  red: string;
  redLight: string;
  redLight2: string;
  redExtra: string;
  redMessage: string;

  // Оранжевые оттенки
  orange: string;
  orangeLight: string;
  redLink: string;

  // Зеленые оттенки
  green: string;
  greenLight: string;

  // Статусы
  statusInProgress: string;
  statusCanceled: string;
  statusFinished: string;

  // Фон
  mainBackgroundColor: string;
  cardMetadataColor: string;

  // Инпуты
  inputBorder: string;
  inputBorderHover: string;
  inputBorderActive: string;
  inputBorderError: string;
  inputLabelError: string;
  inputBackground: string;
  inputLabelColor: string;

  // Карточки
  cardElemBackground: string;

  // Просроченные элементы
  overdueBorder: string;
  overdueBackground: string;
  overdueDate: string;

  // Транзишены
  transitionElemColor: string;
  transitionElemBackground: string;
  transitionElemBackgroundHover: string;

  // Формы
  formBlockBorder: string;

  // Футер формы
  footerFormButtonSubmitBackground: string;
  footerFormButtonSubmitBackgroundHover: string;
  footerFormButtonSubmitColor: string;
  footerFormButtonSubmitColorHover: string;
  footerFormButtonCancelBackground: string;
  footerFormButtonCancelColor: string;
  footerFormButtonCancelBackgroundHover: string;
  footerFormButtonCancelColorHover: string;

  // Кнопки формы
  formButtonColor: string;
  formButtonBackground: string;
  formButtonColorHover: string;
  formButtonBackgroundHover: string;
  formButtonCancelColor: string;
  formButtonCancelBackground: string;
  formButtonCancelColorHover: string;
  formButtonCancelBackgroundHover: string;

  // Другое
  stickyStyle: string;
}

export interface ThemeConfig {
  name: string;
  mode: 'light' | 'dark';
  colors: ColorPalette;
  typography: {
    fontFamily: {
      primary: string;
      secondary: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  spacing: {
    xs: string;
    xsm: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xml: string;
    xxl: string;
    xxxl: string;
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
    xl: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
    xlarge: string;
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  components: {
    button: {
      borderRadius: string;
      padding: string;
    };
    card: {
      borderRadius: string;
      padding: string;
    };
    input: {
      borderRadius: string;
      border: string;
    };
  };
}

export type SkinName = 'baseSkin' | 'max' | 'moscow' | 'gorzdravClassic';

export interface Skin {
  name: string;
  displayName: string;
  light: ThemeConfig;
  dark: ThemeConfig;
}
