import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Theme type definitions
export interface ThemeColors {
  bgDesktop: string;
  bgWindow: string;
  bgInset?: string;              // Sunken panels: inputs, list areas, hover rows (defaults to #0a0a1a)
  bgTitlebar: string;
  bgTitlebarInactive: string;
  borderLight: string;
  borderDark: string;
  borderWindow: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accentGold: string;
  accentGreen: string;
  accentOrange: string;
  accentPurple: string;
}

export interface ThemeFonts {
  primary: string;
  display: string;
  mono: string;
}

export interface ThemeBorderRadius {
  none: string;
  small: string;
  medium: string;
  large: string;
}

export interface ThemeWindowChrome {
  titlebarHeight: number;
  buttonStyle: 'pixel' | 'beveled' | 'rounded' | 'flat';
  shadowEnabled: boolean;
  shadowStyle?: string;
}

export interface ThemeTaskbar {
  height: number;
  position: 'top' | 'bottom';
  logoType: 'text' | 'image';
  logoText?: string;
  logoImage?: string;
  style: 'retro' | 'beveled' | 'flat' | 'blur';
}

export interface ThemeIcons {
  style: 'emoji' | 'retro-ascii' | 'pixel-art' | 'flat' | 'glossy';
}

export interface Theme {
  id: string;
  name: string;
  era: string;
  description: string;

  colors: ThemeColors;
  fonts: ThemeFonts;
  fontSizes: {
    base: number;
    scale: number;
  };

  borderRadius: ThemeBorderRadius;
  borderStyle: 'retro' | 'beveled' | 'flat' | 'modern';

  windowChrome: ThemeWindowChrome;
  taskbar: ThemeTaskbar;
  icons: ThemeIcons;
}

export type BackgroundType = 'color' | 'builtin' | 'custom' | 'url';
export type BuiltinBackground = 'bg1' | 'bg2' | 'bg3';

interface ThemeState {
  // Current theme
  currentTheme: string;
  themes: Record<string, Theme>;

  // Background settings
  backgroundType: BackgroundType;
  backgroundColor: string;
  backgroundBuiltin: BuiltinBackground;
  backgroundCustom: string | null;
  backgroundUrl: string | null;

  // Actions
  setTheme: (themeId: string) => void;
  setBackgroundType: (type: BackgroundType) => void;
  setBackgroundColor: (color: string) => void;
  setBackgroundBuiltin: (bg: BuiltinBackground) => void;
  setBackgroundCustom: (dataUrl: string | null) => void;
  setBackgroundUrl: (url: string | null) => void;
  registerTheme: (theme: Theme) => void;
  getTheme: () => Theme;
}

// Apply theme to document
function applyThemeToDOM(theme: Theme) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  // Colors
  root.style.setProperty('--bg-desktop', theme.colors.bgDesktop);
  root.style.setProperty('--bg-window', theme.colors.bgWindow);
  root.style.setProperty('--bg-inset', theme.colors.bgInset ?? '#0a0a1a');
  root.style.setProperty('--bg-titlebar', theme.colors.bgTitlebar);
  root.style.setProperty('--bg-titlebar-inactive', theme.colors.bgTitlebarInactive);
  root.style.setProperty('--border-light', theme.colors.borderLight);
  root.style.setProperty('--border-dark', theme.colors.borderDark);
  root.style.setProperty('--border-window', theme.colors.borderWindow);
  root.style.setProperty('--text-primary', theme.colors.textPrimary);
  root.style.setProperty('--text-secondary', theme.colors.textSecondary);
  root.style.setProperty('--text-muted', theme.colors.textMuted);
  root.style.setProperty('--accent-gold', theme.colors.accentGold);
  root.style.setProperty('--accent-green', theme.colors.accentGreen);
  root.style.setProperty('--accent-orange', theme.colors.accentOrange);
  root.style.setProperty('--accent-purple', theme.colors.accentPurple);

  // Legacy variable mappings (for existing components)
  root.style.setProperty('--text-green', theme.colors.textPrimary);
  root.style.setProperty('--text-amber', theme.colors.textSecondary);

  // Fonts
  root.style.setProperty('--font-primary', theme.fonts.primary);
  root.style.setProperty('--font-display', theme.fonts.display);
  root.style.setProperty('--font-mono', theme.fonts.mono);

  // Border radius
  root.style.setProperty('--radius-none', theme.borderRadius.none);
  root.style.setProperty('--radius-sm', theme.borderRadius.small);
  root.style.setProperty('--radius-md', theme.borderRadius.medium);
  root.style.setProperty('--radius-lg', theme.borderRadius.large);

  // Window chrome
  root.style.setProperty('--titlebar-height', `${theme.windowChrome.titlebarHeight}px`);
  root.style.setProperty('--taskbar-height', `${theme.taskbar.height}px`);

  // Data attributes for CSS selectors
  root.setAttribute('data-theme', theme.id);
  root.setAttribute('data-border-style', theme.borderStyle);
  root.setAttribute('data-button-style', theme.windowChrome.buttonStyle);
  root.setAttribute('data-taskbar-position', theme.taskbar.position);
  root.setAttribute('data-taskbar-style', theme.taskbar.style);
  root.setAttribute('data-icon-style', theme.icons.style);
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      currentTheme: 'zenith',
      themes: {},

      // Background defaults
      backgroundType: 'builtin',
      backgroundColor: '#0a0a1a',
      backgroundBuiltin: 'bg3',
      backgroundCustom: null,
      backgroundUrl: null,

      setTheme: (themeId) => {
        const theme = get().themes[themeId];
        if (theme) {
          set({ currentTheme: themeId });
          applyThemeToDOM(theme);
        }
      },

      setBackgroundType: (type) => set({ backgroundType: type }),
      setBackgroundColor: (color) => set({ backgroundColor: color }),
      setBackgroundBuiltin: (bg) => set({ backgroundBuiltin: bg }),
      setBackgroundCustom: (dataUrl) => set({ backgroundCustom: dataUrl }),
      setBackgroundUrl: (url) => set({ backgroundUrl: url }),

      registerTheme: (theme) => {
        set((state) => ({
          themes: { ...state.themes, [theme.id]: theme },
        }));
        // Apply if this is the current theme
        if (get().currentTheme === theme.id) {
          applyThemeToDOM(theme);
        }
      },

      getTheme: () => {
        const state = get();
        return state.themes[state.currentTheme] || state.themes['zenith'];
      },
    }),
    {
      name: 'zec-os-theme',
      partialize: (state) => ({
        currentTheme: state.currentTheme,
        backgroundType: state.backgroundType,
        backgroundColor: state.backgroundColor,
        backgroundBuiltin: state.backgroundBuiltin,
        backgroundUrl: state.backgroundUrl,
        // Note: backgroundCustom is not persisted (stored in sessionStorage separately)
      }),
    }
  )
);

// Helper to initialize themes on app load
export function initializeThemes(themes: Theme[]) {
  const store = useThemeStore.getState();
  themes.forEach((theme) => store.registerTheme(theme));

  // Apply current theme on init
  const currentTheme = store.themes[store.currentTheme];
  if (currentTheme) {
    applyThemeToDOM(currentTheme);
  }
}
