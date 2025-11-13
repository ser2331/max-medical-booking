import { ThemeConfig } from './index';
import { gorzdravDarkTheme, gorzdravLightTheme } from './gorzdrav';
import { maxDarkTheme, maxLightTheme } from './max';
import { moscowDarkTheme, moscowLightTheme } from '@/styles/themes/moscow.ts';
import {
  gorzdravClassicDarkTheme,
  gorzdravClassicLightTheme,
} from '@/styles/themes/gorzdrav-classic.ts';

export type SkinName = 'gorzdrav' | 'max' | 'moscow' | 'gorzdravClassic';

export interface Skin {
  name: string;
  displayName: string;
  light: ThemeConfig;
  dark: ThemeConfig;
}

// Реестр всех скинов
export const skins: Record<SkinName, Skin> = {
  gorzdrav: {
    name: 'gorzdrav',
    displayName: 'ГорЗдрав СПб',
    light: gorzdravLightTheme,
    dark: gorzdravDarkTheme,
  },
  max: {
    name: 'max',
    displayName: 'MAX Messenger',
    light: maxLightTheme,
    dark: maxDarkTheme,
  },
  moscow: {
    name: 'moscow',
    displayName: 'Москва',
    light: moscowLightTheme,
    dark: moscowDarkTheme,
  },
  gorzdravClassic: {
    name: 'gorzdravClassic',
    displayName: 'ГорЗдрав классическая',
    light: gorzdravClassicLightTheme,
    dark: gorzdravClassicDarkTheme,
  },
};

// Функция для получения темы
export const getTheme = (skin: SkinName, mode: 'light' | 'dark'): ThemeConfig => {
  return skins[skin][mode];
};
