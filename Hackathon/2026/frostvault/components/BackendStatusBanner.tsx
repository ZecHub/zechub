"use client";

import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { checkBackendHealth } from "@/lib/api/client";

export function BackendStatusBanner() {
  const [reachable, setReachable] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function check() {
      const ok = await checkBackendHealth();
      if (!cancelled) setReachable(ok);
    }
    check();
    const interval = setInterval(check, 8000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (reachable !== false) return null;

  return (
    <div className="border-b border-pending/30 bg-pending/10 px-6 py-2.5">
      <div className="mx-auto flex max-w-6xl items-center gap-2 text-sm text-pending">
        <AlertTriangle className="h-4 w-4 shrink-0" />
        <span>
          Local FrostVault backend not reachable. Run{" "}
          <code className="font-mono">cargo run</code> in <code className="font-mono">backend/</code>{" "}
          to perform real FROST DKG and signing ceremonies.
        </span>
      </div>
    </div>
  );
}
