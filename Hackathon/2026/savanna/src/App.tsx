import { useCallback, useEffect, useRef, useState } from "react";
import Unlock from "./components/Unlock";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Charge from "./components/Charge";
import SettingsPanel from "./components/Settings";
import { Toast, type ToastData } from "./components/Toast";
import type { AppSettings } from "./lib/pdv";

type Screen = "loading" | "register" | "unlock" | "dashboard";

const DEFAULT_SETTINGS: AppSettings = { showUsd: true, opacity: 0.82 };

export default function App() {
  const [screen, setScreen] = useState<Screen>("loading");
  const [charging, setCharging] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [toast, setToast] = useState<ToastData | null>(null);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const toastId = useRef(0);

  useEffect(() => {
    window.pdv.isRegistered().then(({ registered }) =>
      setScreen(registered ? "unlock" : "register"),
    );
    window.pdv.getSettings().then((s) => {
      setSettings(s);
      applyOpacity(s.opacity);
    });
  }, []);

  function applyOpacity(opacity: number) {
    document.documentElement.style.setProperty("--app-opacity", String(opacity));
  }

  const handleSettingsChange = useCallback(
    async (patch: Partial<AppSettings>) => {
      const next = await window.pdv.setSettings(patch);
      setSettings(next);
      if (patch.opacity !== undefined) applyOpacity(next.opacity);
    },
    [],
  );

  useEffect(() => {
    if (screen !== "dashboard") return;
    const off = window.pdv.onPaymentUpdate(async ({ paymentId, status }) => {
      if (status === "PAID" || status === "UNDERPAID") {
        let amount = "";
        try {
          const s = await window.pdv.getStatus(paymentId);
          amount = s.receivedZec ?? "";
        } catch {
          /* ignore */
        }
        setToast({ id: ++toastId.current, status, amount });
      }
      setRefreshKey((k) => k + 1);
    });
    return off;
  }, [screen]);

  const handleSettled = useCallback(() => setRefreshKey((k) => k + 1), []);

  return (
    <div className="app-shell flex flex-col text-neutral-100 font-sans">
      <header className="drag-region flex items-center justify-between px-5 pt-4 pb-2">
        <span className="text-xs tracking-widest text-neutral-400 uppercase">
          Zcash · Point of Sale
        </span>
        <div className="flex items-center gap-1">
          {screen === "dashboard" && (
            <button
              onClick={() => setShowSettings(true)}
              className="rounded-lg p-1.5 text-neutral-500 transition hover:bg-white/10 hover:text-neutral-200"
              aria-label="Settings"
              title="Settings"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
          )}
          <button
            onClick={() => window.pdv.minimizeWindow()}
            className="rounded-lg p-1.5 text-neutral-500 transition hover:bg-white/10 hover:text-neutral-200"
            aria-label="Minimize"
            title="Minimize"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <button
            onClick={() => window.pdv.closeWindow()}
            className="rounded-lg p-1.5 text-neutral-500 transition hover:bg-red-500/20 hover:text-red-300"
            aria-label="Close"
            title="Close"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>
      </header>
      <main className="flex-1 overflow-hidden px-5 pb-5">
        {screen === "loading" && (
          <div className="flex h-full items-center justify-center text-neutral-500">
            Loading…
          </div>
        )}
        {screen === "register" && <Register onDone={() => setScreen("unlock")} />}
        {screen === "unlock" && <Unlock onDone={() => setScreen("dashboard")} />}
        {screen === "dashboard" && (
          <Dashboard
            onNewCharge={() => setCharging(true)}
            refreshKey={refreshKey}
            showUsd={settings.showUsd}
          />
        )}
      </main>

      {charging && (
        <Charge onClose={() => setCharging(false)} onSettled={handleSettled} />
      )}

      {showSettings && (
        <SettingsPanel
          settings={settings}
          onChange={handleSettingsChange}
          onClose={() => setShowSettings(false)}
        />
      )}

      {toast && <Toast data={toast} onDismiss={() => setToast(null)} />}
    </div>
  );
}
