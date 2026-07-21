import { create } from 'zustand';

interface BlockTxViewerContext {
  mode: 'block-tx-viewer';
  blockHeight: number;
  blockHash: string;
  transactions: string[];
  currentIndex: number;
}

interface SearchContext {
  mode: 'search';
  query: string;
  type: 'block' | 'transaction' | 't-address' | 'z-address' | 'auto';
}

export interface BlockMapContext {
  mode: 'block-map';
  blockHeight: number;
  blockHash: string;
  transactions: string[];
  time: number;
  size: number;
}

export interface ChainPulseContext {
  mode: 'chain-pulse';
  blockHeight: number;
  blockHash: string;
  transactions: string[];
  time: number;
}

export interface TxGraphContext {
  mode: 'tx-graph';
  txid: string;
}

type PendingAction = BlockTxViewerContext | SearchContext | BlockMapContext | ChainPulseContext | TxGraphContext;

interface ExplorerState {
  pendingActions: Record<string, PendingAction>;

  queueBlockTxViewer: (windowId: string, context: Omit<BlockTxViewerContext, 'mode'>) => void;
  queueSearch: (windowId: string, query: string, type: SearchContext['type']) => void;
  queueBlockMap: (windowId: string, context: Omit<BlockMapContext, 'mode'>) => void;
  queueChainPulse: (windowId: string, context: Omit<ChainPulseContext, 'mode'>) => void;
  queueTxGraph: (windowId: string, txid: string) => void;

  consumeAction: (windowId: string) => PendingAction | null;
}

export const useExplorerStore = create<ExplorerState>((set, get) => ({
  pendingActions: {},

  queueBlockTxViewer: (windowId, context) => {
    set((state) => ({
      pendingActions: { ...state.pendingActions, [windowId]: { mode: 'block-tx-viewer', ...context } },
    }));
  },

  queueSearch: (windowId, query, type) => {
    set((state) => ({
      pendingActions: { ...state.pendingActions, [windowId]: { mode: 'search', query, type } },
    }));
  },

  queueBlockMap: (windowId, context) => {
    set((state) => ({
      pendingActions: { ...state.pendingActions, [windowId]: { mode: 'block-map', ...context } },
    }));
  },

  queueChainPulse: (windowId, context) => {
    set((state) => ({
      pendingActions: { ...state.pendingActions, [windowId]: { mode: 'chain-pulse', ...context } },
    }));
  },

  queueTxGraph: (windowId, txid) => {
    set((state) => ({
      pendingActions: { ...state.pendingActions, [windowId]: { mode: 'tx-graph', txid } },
    }));
  },

  consumeAction: (windowId) => {
    const action = get().pendingActions[windowId];
    if (action) {
      set((state) => {
        const { [windowId]: _, ...rest } = state.pendingActions;
        return { pendingActions: rest };
      });
    }
    return action || null;
  },
}));
