import { Theme } from '@/store/themeStore';
import { crtGreenTheme } from './crt-green';
import { goldenGateTheme } from './golden-gate';
import { millenniumTheme } from './millennium';
import { aquaZecTheme } from './aqua-zec';
import { zenithTheme } from './zenith';
import { lumenTheme } from './lumen';

// Export individual themes
export { crtGreenTheme } from './crt-green';
export { goldenGateTheme } from './golden-gate';
export { millenniumTheme } from './millennium';
export { aquaZecTheme } from './aqua-zec';
export { zenithTheme } from './zenith';
export { lumenTheme } from './lumen';

// All available themes — Zenith first (default), Lumen directly below ZRT Green
export const allThemes: Theme[] = [
  zenithTheme,
  crtGreenTheme,
  lumenTheme,
  goldenGateTheme,
  millenniumTheme,
  aquaZecTheme,
];

// Theme lookup by ID
export const themesById: Record<string, Theme> = {
  'zenith': zenithTheme,
  'crt-green': crtGreenTheme,
  'lumen': lumenTheme,
  'golden-gate': goldenGateTheme,
  'millennium': millenniumTheme,
  'aqua-zec': aquaZecTheme,
};

// Default theme
export const defaultTheme = zenithTheme;
