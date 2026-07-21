import { create } from 'zustand';

interface TickerStore {
  visible: boolean;
  show: () => void;
  hide: () => void;
}

export const useTickerStore = create<TickerStore>((set) => ({
  visible: true,
  show: () => set({ visible: true }),
  hide: () => set({ visible: false }),
}));
