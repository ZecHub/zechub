import { Theme } from '@/store/themeStore';

export const millenniumTheme: Theme = {
  id: 'millennium',
  name: 'Zennium',
  era: 'Late 90s',
  description: 'Mac OS 9 Platinum inspired with rounded corners and soft gradients',

  colors: {
    bgDesktop: '#5f5f8f',        // Purple-gray desktop
    bgWindow: '#e8e8e8',         // Platinum gray window frame
    bgInset: '#f8f8f8',          // Light sunken inputs on platinum
    bgTitlebar: '#cccccc',       // Lighter platinum taskbar
    bgTitlebarInactive: '#aaaaaa',
    borderLight: '#ffffff',
    borderDark: '#666666',
    borderWindow: '#999999',
    textPrimary: '#006644',      // Dark green for light backgrounds
    textSecondary: '#8b4513',    // Saddle brown / burnt orange
    textMuted: '#4a5a4a',
    accentGold: '#996622',       // Dark reddish gold
    accentGreen: '#006644',      // Dark green
    accentOrange: '#a0522d',     // Sienna / burnt orange
    accentPurple: '#663399',     // Dark purple
  },

  fonts: {
    primary: 'Charcoal, Chicago, "Lucida Grande", sans-serif',
    display: 'Charcoal, Chicago, "Lucida Grande", sans-serif',
    mono: 'Monaco, "Courier New", monospace',
  },
  fontSizes: {
    base: 14,
    scale: 1.15,
  },

  borderRadius: {
    none: '0px',
    small: '6px',
    medium: '8px',
    large: '12px',
  },
  borderStyle: 'flat',

  windowChrome: {
    titlebarHeight: 24,
    buttonStyle: 'rounded',
    shadowEnabled: true,
    shadowStyle: '0 4px 12px rgba(0,0,0,0.3)',
  },

  taskbar: {
    height: 54,
    position: 'top',
    logoType: 'image',
    logoImage: '/zec-logo.svg',
    style: 'flat',
  },

  icons: {
    style: 'flat',
  },
};
