import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DateFormat = 'mdy' | 'dmy' | 'ymd';
export type TimeFormat = '12h' | '24h';
export type FontSize = 'small' | 'medium' | 'large' | 'xl';

interface SettingsState {
  dateFormat: DateFormat;
  timeFormat: TimeFormat;
  fontSize: FontSize;
  soundEnabled: boolean;
  volume: number;           // 0–1 master volume multiplier
  retroIcons: boolean;
  tipsEnabled: boolean;         // show the periodic tip flyout
  tipsIntervalMin: number;     // minutes between tips
  fontSizeVersion: number; // Increments on font size change to trigger re-renders

  setDateFormat: (format: DateFormat) => void;
  setTimeFormat: (format: TimeFormat) => void;
  setFontSize: (size: FontSize) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setVolume: (v: number) => void;
  setRetroIcons: (enabled: boolean) => void;
  setTipsEnabled: (enabled: boolean) => void;
  setTipsIntervalMin: (min: number) => void;
  setAll: (s: Partial<Pick<SettingsState, 'dateFormat' | 'timeFormat' | 'fontSize' | 'soundEnabled' | 'volume' | 'retroIcons'>>) => void;
}

export const FONT_SIZE_VALUES: Record<FontSize, number> = {
  small: 22,
  medium: 26,
  large: 30,
  xl: 34,
};

// Retro icon mapping (emoji -> ASCII/retro equivalent)
// Rule: every value must be unique; narrow ones get inner spaces per [ x ] convention
export const RETRO_ICONS: Record<string, string> = {
  // ── Stats / data ──
  '💰': '[ $$ ]',
  '💵': '[ $/ ]',
  '💎': '[ <> ]',
  '📈': '[ /\\ ]',
  '📉': '[ \\/ ]',
  '📊': '[ || ]',
  '📶': '[ == ]',
  '🧾': '[TX]',
  '📗': '[ S ]',
  // ── System / UI ──
  'ℹ️': '[ i ]',
  '⚙️': '[ O ]',
  '🔢': '[12]',
  '💻': '[>_]',
  '🔧': '[ + ]',
  '🔍': '[ ? ]',
  '⚠': '[ ! ]',
  '📵': '[ X ]',
  '🔊': '[ ♪ ]',
  '🔇': '[ x ]',
  '📡': '[ ~ ]',
  '📦': '[ [] ]',
  // ── Security / privacy ──
  '🔒': '[ ## ]',
  '🔓': '[ >> ]',
  '🛡️': '[ ** ]',
  // ── Network ──
  '🌊': '[~~~]',
  '🏊': '[~~]',
  // ── Actions ──
  '⚡': '[ !! ]',
  '🚀': '[ ^ ]',
  // ── Games ──
  '🎮': '[ ^^ ]',
  '🏓': '[o|]',
  // ── Apps added in v1.1 ──
  '⛏': '[ /# ]',      // Mining — pickaxe into block
  '🎨': '[ ~* ]',      // Themes — brush stroke
  '👁': '[ .O. ]',     // Watchlist — eye
  '⚖️': '[ =/= ]',     // Block Comparison — scales/diff
  '🌤️': '[ o~ ]',      // Privacy Weather — sun/cloud
  '⚔️': '[ >x< ]',     // Dark Forest — crossed swords
  '🏆': '[ \\o/ ]',    // Tournaments — trophy/cheer
  '🕸': '[ o-o ]',     // TX Graph — linked nodes
  '⏳': '[ .>> ]',     // Mempool — pending queue
  '📄': '[ rme ]',     // README — abbreviated
  '🧩': '[ {o} ]',     // Widgets folder — modular piece
};

export function getIcon(emoji: string, retroIcons: boolean): string {
  if (!retroIcons) return emoji;
  return RETRO_ICONS[emoji] || emoji;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      dateFormat: 'mdy',
      timeFormat: '24h',
      fontSize: 'medium',
      soundEnabled: true,
      volume: 0.8,
      retroIcons: false,
      tipsEnabled: true,
      tipsIntervalMin: 3,
      fontSizeVersion: 0,

      setDateFormat: (format) => set({ dateFormat: format }),
      setTimeFormat: (format) => set({ timeFormat: format }),
      setFontSize: (size) => {
        // Update font size and increment version to trigger re-renders
        set({ fontSize: size, fontSizeVersion: get().fontSizeVersion + 1 });
        // Also immediately update the DOM
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-font-size', size);
        }
      },
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      setVolume: (v) => set({ volume: Math.max(0, Math.min(1, v)) }),
      setRetroIcons: (enabled) => set({ retroIcons: enabled }),
      setTipsEnabled: (enabled) => set({ tipsEnabled: enabled }),
      setTipsIntervalMin: (min) => set({ tipsIntervalMin: Math.max(1, Math.min(60, Math.round(min))) }),
      setAll: (s) => set(state => {
        const nextFontSizeVersion = s.fontSize !== undefined && s.fontSize !== state.fontSize
          ? state.fontSizeVersion + 1
          : state.fontSizeVersion;
        if (s.fontSize && typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-font-size', s.fontSize);
        }
        return { ...s, fontSizeVersion: nextFontSizeVersion };
      }),
    }),
    {
      name: 'zec-os-settings',
    }
  )
);

// Helper to format date based on user preference
export function formatDate(date: Date, format: DateFormat): string {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const y = date.getFullYear() % 100;

  switch (format) {
    case 'mdy': return `${m}/${d}/${y}`;
    case 'dmy': return `${d}/${m}/${y}`;
    case 'ymd': return `${y}/${m}/${d}`;
  }
}

// Helper to format time based on user preference
export function formatTime(date: Date, format: TimeFormat): string {
  if (format === '24h') {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  } else {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }
}
