import { Theme } from '@/store/themeStore';

export const crtGreenTheme: Theme = {
  id: 'crt-green',
  name: 'ZRT Green',
  era: 'Late 80s / Early 90s',
  description: 'Classic green phosphor terminal aesthetic with pixel fonts and hard borders',

  colors: {
    bgDesktop: '#0a0a1a',
    bgWindow: '#1a1a2e',
    bgTitlebar: '#2a3a2a',
    bgTitlebarInactive: '#1a2a1a',
    borderLight: '#4a5a4a',
    borderDark: '#0a0a0a',
    borderWindow: '#3a4a3a',
    textPrimary: '#00ff88',      // CRT green
    textSecondary: '#ffaa00',    // Amber
    textMuted: '#d4c896',        // Light yellow/cream for readability
    accentGold: '#f4b728',       // ZEC gold
    accentGreen: '#00ff88',
    accentOrange: '#ff6600',
    accentPurple: '#9966ff',
  },

  fonts: {
    primary: 'VT323, monospace',
    display: '"Press Start 2P", monospace',
    mono: 'VT323, monospace',
  },
  fontSizes: {
    base: 16,
    scale: 1.2,
  },

  borderRadius: {
    none: '0px',
    small: '0px',
    medium: '0px',
    large: '0px',
  },
  borderStyle: 'retro',

  windowChrome: {
    titlebarHeight: 28,
    buttonStyle: 'pixel',
    shadowEnabled: false,
  },

  taskbar: {
    height: 54,
    position: 'top',
    logoType: 'text',
    logoText: 'ZEC-OS',
    style: 'retro',
  },

  icons: {
    style: 'emoji',
  },
};
