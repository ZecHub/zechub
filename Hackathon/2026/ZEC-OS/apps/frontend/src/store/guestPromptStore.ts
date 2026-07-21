import { create } from 'zustand';

interface GuestPromptState {
  visible: boolean;
  message: string;
  show: (message: string) => void;
  hide: () => void;
}

export const useGuestPromptStore = create<GuestPromptState>()((set) => ({
  visible: false,
  message: '',
  show: (message) => set({ visible: true, message }),
  hide: () => set({ visible: false }),
}));
