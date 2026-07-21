import { Theme } from '@/store/themeStore';

export const aquaZecTheme: Theme = {
  id: 'aqua-zec',
  name: 'Aqua ZEC',
  era: 'Early 2000s',
  description: 'Mac OS X Aqua-inspired gloss and curves with ZEC gold accents',

  colors: {
    bgDesktop: '#0d3a6e',          // Deep blue Aqua desktop
    bgWindow: '#dce8f5',           // Light icy blue window chrome
    bgInset: '#eef5fb',            // Lighter icy inset for inputs/lists
    bgTitlebar: '#a8c4e0',         // Blue-silver titlebar
    bgTitlebarInactive: '#c8d8ec',
    borderLight: '#e8f0f8',
    borderDark: '#5580aa',
    borderWindow: '#7aaad0',
    textPrimary: '#00cc77',        // ZEC green (content areas stay dark)
    textSecondary: '#e8a000',      // Warm gold
    textMuted: '#6688aa',          // Muted blue-gray
    accentGold: '#f5a623',         // Warm Aqua-era gold
    accentGreen: '#34c759',        // Apple green
    accentOrange: '#ff6b00',
    accentPurple: '#7b5ea7',       // Soft purple
  },

  fonts: {
    primary: '"Lucida Grande", Geneva, "Helvetica Neue", sans-serif',
    display: '"Lucida Grande", Geneva, "Helvetica Neue", sans-serif',
    mono: 'Monaco, "Courier New", monospace',
  },
  fontSizes: {
    base: 14,
    scale: 1.15,
  },

  borderRadius: {
    none: '0px',
    small: '8px',
    medium: '12px',
    large: '18px',
  },
  borderStyle: 'flat',

  windowChrome: {
    titlebarHeight: 26,
    buttonStyle: 'rounded',
    shadowEnabled: true,
    shadowStyle: '0 8px 24px rgba(0,40,100,0.45)',
  },

  taskbar: {
    height: 54,
    position: 'top',
    logoType: 'image',
    logoImage: '/zec-logo.svg',
    style: 'blur',
  },

  icons: {
    style: 'glossy',
  },
};
