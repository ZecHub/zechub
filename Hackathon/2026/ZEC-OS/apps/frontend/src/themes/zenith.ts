import { Theme } from '@/store/themeStore';

export const zenithTheme: Theme = {
  id: 'zenith',
  name: 'Zenith',
  era: 'Modern',
  description: 'Clean dark mode with sharp geometry, backdrop blur, and ZEC gold highlights',

  colors: {
    bgDesktop: '#0c0c12',          // Near-black with blue tint
    bgWindow: '#16161f',           // Dark blue-gray window
    bgTitlebar: '#0f0f18',         // Slightly darker titlebar
    bgTitlebarInactive: '#131318',
    borderLight: '#2a2a3e',
    borderDark: '#06060c',
    borderWindow: '#1e1e2e',
    textPrimary: '#c8d0e8',        // Soft cool white for chrome labels
    textSecondary: '#f4b728',      // ZEC gold
    textMuted: '#5a5a7a',          // Dim blue-gray
    accentGold: '#f4b728',         // ZEC gold
    accentGreen: '#00e676',        // Bright green
    accentOrange: '#ff6d00',
    accentPurple: '#7c4dff',       // Electric purple
  },

  fonts: {
    primary: 'Inter, "SF Pro Display", system-ui, sans-serif',
    display: 'Inter, "SF Pro Display", system-ui, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
  },
  fontSizes: {
    base: 13,
    scale: 1.1,
  },

  borderRadius: {
    none: '0px',
    small: '6px',
    medium: '10px',
    large: '16px',
  },
  borderStyle: 'modern',

  windowChrome: {
    titlebarHeight: 32,
    buttonStyle: 'flat',
    shadowEnabled: true,
    shadowStyle: '0 4px 32px rgba(0,0,0,0.7)',
  },

  taskbar: {
    height: 54,
    position: 'top',
    logoType: 'image',
    logoImage: '/zec-logo.svg',
    style: 'blur',
  },

  icons: {
    style: 'flat',
  },
};
