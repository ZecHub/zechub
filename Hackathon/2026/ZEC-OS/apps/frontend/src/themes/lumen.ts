import { Theme } from '@/store/themeStore';

// Lumen — bright, modern, maximum legibility. No retro fonts, no CRT effects.
// Designed for users who find retro interfaces hard to navigate.
// All text/background pairs meet WCAG AA contrast on the theme's own surfaces.
export const lumenTheme: Theme = {
  id: 'lumen',
  name: 'Lumen',
  era: 'Modern',
  description: 'Bright, clean, high-legibility interface — modern fonts, soft light surfaces, zero retro',

  colors: {
    bgDesktop: '#dfe4ee',          // Soft cool gray — bright without glare
    bgWindow: '#f7f9fc',           // Near-white window surface
    bgInset: '#eaeef5',            // Sunken panels: inputs, lists, hover rows
    bgTitlebar: '#eceff5',
    bgTitlebarInactive: '#e3e6ee',
    borderLight: '#ffffff',
    borderDark: '#b7bfd0',
    borderWindow: '#cdd4e2',
    textPrimary: '#232a3d',        // Dark slate — ~12:1 on window bg
    textSecondary: '#8a6400',      // Deep amber — readable gold accent on light
    textMuted: '#5f6779',          // Still ~5.8:1 on window bg
    accentGold: '#9a7305',         // Dark gold — legible on light surfaces
    accentGreen: '#0b7a45',
    accentOrange: '#c2410c',
    accentPurple: '#5b4bd6',
  },

  fonts: {
    primary: 'Inter, "SF Pro Text", "Segoe UI", system-ui, sans-serif',
    display: 'Inter, "SF Pro Display", "Segoe UI", system-ui, sans-serif',
    mono: '"SF Mono", "JetBrains Mono", Menlo, Consolas, monospace',
  },
  fontSizes: {
    base: 14,
    scale: 1.05,
  },

  borderRadius: {
    none: '0px',
    small: '8px',
    medium: '12px',
    large: '18px',
  },
  borderStyle: 'modern',

  windowChrome: {
    titlebarHeight: 34,
    buttonStyle: 'rounded',
    shadowEnabled: true,
    shadowStyle: '0 12px 32px rgba(35, 42, 61, 0.16)',
  },

  taskbar: {
    height: 52,
    position: 'top',
    logoType: 'image',
    logoImage: '/zec-logo.svg',
    style: 'blur',
  },

  icons: {
    style: 'flat',
  },
};
