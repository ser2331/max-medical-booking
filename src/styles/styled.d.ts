import 'styled-components';
import { theme } from './theme';

// Расширяем DefaultTheme styled-components
declare module 'styled-components' {
  type Theme = typeof theme;

  export interface DefaultTheme extends Theme {}
}
