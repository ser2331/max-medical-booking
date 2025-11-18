import { lightTheme, darkTheme } from './baseSkin.ts';
import { Skin, SkinName } from '@/styles/themes/theme.types.ts';

// Реестр всех скинов
export const skins: Record<SkinName, Skin> = {
  baseSkin: {
    name: 'baseSkin',
    displayName: 'ГорЗдрав СПб',
    light: lightTheme,
    dark: darkTheme,
  },
  max: {
    name: 'max',
    displayName: 'Макс',
    light: lightTheme,
    dark: darkTheme,
  },
  moscow: {
    name: 'moscow',
    displayName: 'Москва',
    light: lightTheme,
    dark: darkTheme,
  },
  gorzdravClassic: {
    name: 'gorzdravClassic',
    displayName: 'ГорЗдрав Классик',
    light: lightTheme,
    dark: darkTheme,
  },
} as const;

// Функция для получения темы
export const getTheme = (skin: SkinName, mode: 'light' | 'dark') => {
  return skins[skin][mode];
};

// Хелпер для проверки доступных скинов
export const getAvailableSkins = (): SkinName[] => {
  return Object.keys(skins) as SkinName[];
};

// Хелпер для получения displayName скина
export const getSkinDisplayName = (skin: SkinName): string => {
  return skins[skin].displayName;
};
