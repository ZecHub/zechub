export interface PaymentCreated {
  id: string;
  uri: string;
  qrDataUrl: string;
  address: string;
  amountZec: string;
  expiresAt: string;
}

export interface PaymentRow {
  id: string;
  amountZec: string;
  receivedZec: string | null;
  status: string;
  txid: string | null;
  createdAt: string;
  detectedAt: string | null;
}

export interface DashboardSummary {
  balanceZec: string;
  receivedTodayZec: string;
  paymentsToday: number;
  zecUsd: number | null;
  balanceUsd: number | null;
  receivedTodayUsd: number | null;
}

export interface ChainTx {
  txid: string;
  height: number;
  confirmations: number;
  valueZec: string;
  receivedZec: string;
  receivedUsd: number | null;
  expectedZec: string | null;
  orderId: string | null;
  memo: string | null;
  isPdvCharge: boolean;
}

export interface ChainStatus {
  online: boolean; // zkool_graphql respondeu
  chainHeight: number | null; // ponta da chain
  syncedHeight: number | null; // altura já processada pela conta
  syncing: boolean; // ainda falta baixar/processar blocos
}

export interface AppSettings {
  showUsd: boolean;
  opacity: number;
}

export interface PDVApi {
  isRegistered(): Promise<{ registered: boolean }>;
  register(
    ufvk: string,
    password: string,
    name?: string,
  ): Promise<{ ok: boolean; idAccount: number }>;
  unlock(password: string): Promise<{ ok: boolean }>;
  createPayment(amountZec: string, ttlMinutes?: number): Promise<PaymentCreated>;
  getStatus(
    id: string,
  ): Promise<{ status: string; receivedZec: string | null; txid: string | null }>;
  listPayments(limit?: number): Promise<PaymentRow[]>;
  dashboardSummary(): Promise<DashboardSummary>;
  chainTransactions(): Promise<ChainTx[]>;
  chainStatus(): Promise<ChainStatus>;
  openExternal(url: string): Promise<{ ok: boolean }>;
  getSettings(): Promise<AppSettings>;
  setSettings(patch: Partial<AppSettings>): Promise<AppSettings>;
  getZecUsd(): Promise<{ zecUsd: number | null }>;
  minimizeWindow(): Promise<void>;
  closeWindow(): Promise<void>;
  onPaymentUpdate(
    cb: (data: { paymentId: string; status: string }) => void,
  ): () => void;
}

declare global {
  interface Window {
    pdv: PDVApi;
  }
}