import { contextBridge, ipcRenderer } from "electron";

// Superfície mínima. O renderer (caixa) nunca recebe UFVK, senha ou chaves.
contextBridge.exposeInMainWorld("pdv", {
  isRegistered: () => ipcRenderer.invoke("wallet:isRegistered"),
  register: (ufvk: string, password: string, name?: string) =>
    ipcRenderer.invoke("wallet:register", { ufvk, password, name }),
  unlock: (password: string) =>
    ipcRenderer.invoke("wallet:unlock", { password }),
  createPayment: (amountZec: string, ttlMinutes?: number) =>
    ipcRenderer.invoke("payment:create", { amountZec, ttlMinutes }),
  getStatus: (id: string) => ipcRenderer.invoke("payment:status", { id }),
  listPayments: (limit?: number) =>
    ipcRenderer.invoke("payments:list", { limit }),
  dashboardSummary: () => ipcRenderer.invoke("dashboard:summary"),
  chainTransactions: () => ipcRenderer.invoke("chain:transactions"),
  chainStatus: () => ipcRenderer.invoke("chain:status"),
  openExternal: (url: string) =>
    ipcRenderer.invoke("shell:openExternal", { url }),
  getSettings: () => ipcRenderer.invoke("settings:get"),
  setSettings: (patch: { showUsd?: boolean; opacity?: number }) =>
    ipcRenderer.invoke("settings:set", patch),
  getZecUsd: () => ipcRenderer.invoke("price:zecUsd"),
  minimizeWindow: () => ipcRenderer.invoke("window:minimize"),
  closeWindow: () => ipcRenderer.invoke("window:close"),
  onPaymentUpdate: (cb: (data: { paymentId: string; status: string }) => void) => {
    const handler = (_e: unknown, data: { paymentId: string; status: string }) =>
      cb(data);
    ipcRenderer.on("payment:update", handler);
    return () => ipcRenderer.removeListener("payment:update", handler);
  },
});