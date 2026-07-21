import { create } from "zustand";
import * as cmd from "../ipc/commands";

interface KeystoreState {
  exists: boolean;
  unlocked: boolean;
  loaded: boolean;
  refresh: () => Promise<void>;
  setUnlocked: (unlocked: boolean) => void;
}

export const useKeystore = create<KeystoreState>((set) => ({
  exists: false,
  unlocked: false,
  loaded: false,
  refresh: async () => {
    const status = await cmd.keystoreStatus();
    set({ exists: status.exists, unlocked: status.unlocked, loaded: true });
  },
  setUnlocked: (unlocked) => set({ unlocked }),
}));
