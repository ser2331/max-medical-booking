import { ThemeConfig } from '@/assets/style/themes/theme.types.ts';

export const baseTheme: Omit<ThemeConfig, 'colors' | 'name' | 'mode'> = {
  typography: {
    fontFamily: {
      primary:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      secondary:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      xxl: '24px',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    xs: '4px',
    xsm: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xml: '36px',
    xxl: '48px',
    xxxl: '100px',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    xl: '16px',
  },
  shadows: {
    small: '0px 0px 6px 0px #0000001a',
    medium: '1px 6px 12px 0px #0000001A',
    large: '0px 6px 20px 0px #0000001A',
    xlarge: '0px 10px 36px 0px #0000001A',
  },
  breakpoints: {
    xs: '320px',
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  components: {
    button: {
      borderRadius: '8px',
      padding: '12px 24px',
    },
    card: {
      borderRadius: '12px',
      padding: '20px',
    },
    input: {
      borderRadius: '8px',
      border: '1px solid',
    },
  },
} as const;
