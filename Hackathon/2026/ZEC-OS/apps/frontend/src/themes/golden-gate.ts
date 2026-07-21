import { Theme } from '@/store/themeStore';

export const goldenGateTheme: Theme = {
  id: 'golden-gate',
  name: 'Golden Gatez',
  era: 'Mid 90s',
  description: 'Classic Win95-era beveled borders with ZEC gold accents',

  colors: {
    bgDesktop: '#008080',        // Teal desktop
    bgWindow: '#c0c0c0',         // Silver/gray window border frame
    bgInset: '#ffffff',          // Classic sunken white inputs on silver
    bgTitlebar: '#c0c0c0',       // Light gray taskbar background
    bgTitlebarInactive: '#808080', // Gray inactive titlebar
    borderLight: '#ffffff',      // White highlight
    borderDark: '#404040',       // Dark shadow
    borderWindow: '#808080',     // Window border
    textPrimary: '#00ff88',      // CRT green for content
    textSecondary: '#cc7700',    // Dark amber for taskbar (visible on gray)
    textMuted: '#a0a090',        // Lighter gray-yellow for dark content areas
    accentGold: '#996600',       // Dark gold (visible on light gray taskbar)
    accentGreen: '#00ff88',      // CRT green
    accentOrange: '#cc5500',     // Dark orange (visible on light backgrounds)
    accentPurple: '#9966ff',     // Purple accent
  },

  fonts: {
    primary: '"MS Sans Serif", "Segoe UI", Tahoma, sans-serif',
    display: '"MS Sans Serif", "Segoe UI", Tahoma, sans-serif',
    mono: '"Courier New", Courier, monospace',
  },
  fontSizes: {
    base: 14,
    scale: 1.15,
  },

  borderRadius: {
    none: '0px',
    small: '0px',
    medium: '0px',
    large: '0px',
  },
  borderStyle: 'beveled',

  windowChrome: {
    titlebarHeight: 24,
    buttonStyle: 'beveled',
    shadowEnabled: true,
    shadowStyle: '2px 2px 0px rgba(0,0,0,0.5)',
  },

  taskbar: {
    height: 44,
    position: 'top',
    logoType: 'image',
    logoImage: '/zec-logo.svg',
    style: 'beveled',
  },

  icons: {
    style: 'pixel-art',
  },
};
