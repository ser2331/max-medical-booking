import { css } from 'styled-components';
import { theme } from './theme';

// Типизированные медиа-запросы
export const breakpoints = {
  xs: `(max-width: ${theme.breakpoints.xs})`,
  sm: `(max-width: ${theme.breakpoints.sm})`,
  md: `(max-width: ${theme.breakpoints.md})`,
  lg: `(max-width: ${theme.breakpoints.lg})`,
  xl: `(max-width: ${theme.breakpoints.xl})`,
  hover: '(hover: hover)',
  touch: '(hover: none) and (pointer: coarse)',
} as const;

// Media query helper
export const media = {
  xs: `@media ${breakpoints.xs}`,
  sm: `@media ${breakpoints.sm}`,
  md: `@media ${breakpoints.md}`,
  lg: `@media ${breakpoints.lg}`,
  xl: `@media ${breakpoints.xl}`,
  hover: `@media ${breakpoints.hover}`,
  touch: `@media ${breakpoints.touch}`,
};

// Адаптивные утилиты
export const responsive = {
  // Адаптивный padding
  padding: css`
    padding: ${theme.spacing.md};

    ${media.md} {
      padding: ${theme.spacing.sm};
    }

    ${media.xs} {
      padding: ${theme.spacing.xs};
    }
  `,

  // Адаптивный gap
  gap: css`
    gap: ${theme.spacing.md};

    ${media.md} {
      gap: ${theme.spacing.sm};
    }

    ${media.xs} {
      gap: ${theme.spacing.xs};
    }
  `,

  // Адаптивный font-size
  text: {
    small: css`
      font-size: 14px;

      ${media.xs} {
        font-size: 13px;
      }
    `,
    medium: css`
      font-size: 16px;

      ${media.xs} {
        font-size: 15px;
      }
    `,
    large: css`
      font-size: 18px;

      ${media.xs} {
        font-size: 16px;
      }
    `,
  },
};
