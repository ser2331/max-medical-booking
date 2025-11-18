// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import 'styled-components';
import { ThemeConfig } from './themes/theme.types.ts';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeConfig {}
}
