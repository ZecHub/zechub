'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WatchedAddress {
  address: string;
  label: string;
  color: string;
  addedAt: number;
}

const PALETTE = ['#FFD700', '#A78BFA', '#34D399', '#F97316', '#60A5FA', '#F472B6'];

interface WatchlistState {
  addresses: WatchedAddress[];
  addAddress: (address: string, label?: string) => void;
  removeAddress: (address: string) => void;
  updateLabel: (address: string, label: string) => void;
  updateColor: (address: string, color: string) => void;
  isWatched: (address: string) => boolean;
  getEntry: (address: string) => WatchedAddress | null;
  setAddresses: (addresses: WatchedAddress[]) => void;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      addresses: [],

      addAddress: (address, label) => {
        if (get().isWatched(address)) return;
        const color = PALETTE[get().addresses.length % PALETTE.length];
        const autoLabel = `${address.slice(0, 8)}…${address.slice(-4)}`;
        set(state => ({
          addresses: [...state.addresses, { address, label: label ?? autoLabel, color, addedAt: Date.now() }],
        }));
      },

      removeAddress: (address) =>
        set(state => ({ addresses: state.addresses.filter(a => a.address !== address) })),

      updateLabel: (address, label) =>
        set(state => ({ addresses: state.addresses.map(a => a.address === address ? { ...a, label } : a) })),

      updateColor: (address, color) =>
        set(state => ({ addresses: state.addresses.map(a => a.address === address ? { ...a, color } : a) })),

      isWatched: (address) => get().addresses.some(a => a.address === address),

      getEntry: (address) => get().addresses.find(a => a.address === address) ?? null,

      setAddresses: (addresses) => set({ addresses }),
    }),
    { name: 'zec-watchlist' }
  )
);

export { PALETTE };
