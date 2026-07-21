import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Page = "/" | "/scan" | "/preview" | "/signing" | "/result" | "/register";

export interface ScanResult {
  rawArtifact: Uint8Array;
  previewSignature: Uint8Array;
  derivationPath: string;
}

interface NavContextValue {
  page: Page;
  navigate: (to: Page) => void;
  serverKey: Uint8Array | null;
  setServerKey: (key: Uint8Array | null) => void;
  scanResult: ScanResult | null;
  setScanResult: (result: ScanResult | null) => void;
}

const NavContext = createContext<NavContextValue | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>("/");
  const [serverKey, setServerKey] = useState<Uint8Array | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const navigate = useCallback((to: Page) => {
    setPage(to);
  }, []);
  return (
    <NavContext.Provider value={{ page, navigate, serverKey, setServerKey, scanResult, setScanResult }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav(): NavContextValue {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used within NavProvider");
  return ctx;
}
