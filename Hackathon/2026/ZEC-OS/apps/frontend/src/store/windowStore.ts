import { create } from 'zustand';

export interface WindowState {
  id: string;
  type: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minSize?: { width: number; height: number };
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  flashMessage?: string;
}

interface WindowStore {
  windows: WindowState[];
  activeWindowId: string | null;
  nextZIndex: number;

  openWindow: (config: Omit<WindowState, 'zIndex' | 'minimized' | 'maximized'>) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
  updateWindow: (id: string, updates: Partial<WindowState>) => void;
}

// Keep a window's top-left within the visible viewport, leaving a margin so the
// titlebar is always grabbable.
function clampToViewport(pos: { x: number; y: number }, size: { width: number; height: number }) {
  if (typeof window === 'undefined') return pos;
  const margin = 40;
  const maxX = Math.max(0, window.innerWidth - Math.min(size.width, window.innerWidth) - margin);
  const maxY = Math.max(0, window.innerHeight - 80);
  return {
    x: Math.min(Math.max(0, pos.x), maxX),
    y: Math.min(Math.max(0, pos.y), maxY),
  };
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  activeWindowId: null,
  nextZIndex: 1,

  openWindow: (config) => {
    const { windows, nextZIndex } = get();

    // Check if window already exists — focus it, and pull it back into view in
    // case it was parked off-screen (cascading placement can push x/y past the
    // viewport, making a "focused" window invisible).
    if (windows.find(w => w.id === config.id)) {
      get().focusWindow(config.id);
      set((state) => ({
        windows: state.windows.map(w =>
          w.id === config.id
            ? { ...w, position: clampToViewport(w.position, w.size), minimized: false, flashMessage: 'already open — you never left.' }
            : w
        ),
      }));
      return;
    }

    const newWindow: WindowState = {
      ...config,
      zIndex: nextZIndex,
      minimized: false,
      maximized: false,
    };

    set({
      windows: [...windows, newWindow],
      activeWindowId: config.id,
      nextZIndex: nextZIndex + 1,
    });
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter(w => w.id !== id),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }));
  },

  focusWindow: (id) => {
    const { nextZIndex } = get();
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, zIndex: nextZIndex, minimized: false } : w
      ),
      activeWindowId: id,
      nextZIndex: nextZIndex + 1,
    }));
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, minimized: true } : w
      ),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }));
  },

  maximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, maximized: true } : w
      ),
    }));
  },

  restoreWindow: (id) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, maximized: false } : w
      ),
    }));
  },

  updatePosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, position } : w
      ),
    }));
  },

  updateSize: (id, size) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, size } : w
      ),
    }));
  },

  updateWindow: (id, updates) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, ...updates } : w
      ),
    }));
  },
}));
