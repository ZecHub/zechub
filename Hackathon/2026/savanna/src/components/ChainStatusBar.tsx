import { useEffect, useRef, useState } from "react";
import type { ChainStatus } from "../lib/pdv";

// Polling do estado da chain. Reaproveitado pelo dashboard e pelo modal de
// cobrança para não duplicar a lógica de fetch/intervalo.
function useChainStatus(intervalMs = 8000): ChainStatus | null {
  const [status, setStatus] = useState<ChainStatus | null>(null);

  useEffect(() => {
    let alive = true;
    const load = () =>
      window.pdv
        .chainStatus()
        .then((s) => {
          if (alive) setStatus(s);
        })
        .catch(() => {
          // se a própria IPC falhar, trata como offline
          if (alive)
            setStatus({
              online: false,
              chainHeight: null,
              syncedHeight: null,
              syncing: false,
            });
        });
    load();
    const iv = setInterval(load, intervalMs);
    return () => {
      alive = false;
      clearInterval(iv);
    };
  }, [intervalMs]);

  return status;
}

function Dot({ className }: { className: string }) {
  return <span className={`h-2 w-2 rounded-full ${className}`} />;
}

// Dispara um "flash" curto sempre que `value` muda, para dar feedback visual
// de que um novo bloco foi sincronizado.
function useBlockFlash(value: number | null): boolean {
  const [flash, setFlash] = useState(false);
  const prev = useRef<number | null>(null);

  useEffect(() => {
    if (value === null) return;
    if (prev.current !== null && value !== prev.current) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 600);
      prev.current = value;
      return () => clearTimeout(t);
    }
    prev.current = value;
  }, [value]);

  return flash;
}

// Variante compacta (uma linha) para o modal de cobrança.
// Faz polling mais frequente (padrão 3s) para acompanhar de perto a
// sincronização e imprime a altura que está avançando: enquanto sincroniza,
// mostra a altura JÁ processada pela conta (syncedHeight), que sobe bloco a
// bloco; quando alcança a ponta, mostra a altura da chain.
export function ChainStatusInline({
  intervalMs = 3000,
}: {
  intervalMs?: number;
}) {
  const status = useChainStatus(intervalMs);

  // altura "corrente": a sincronizada enquanto sincroniza, senão a da chain
  const currentHeight =
    status?.syncing && status.syncedHeight !== null
      ? status.syncedHeight
      : (status?.chainHeight ?? null);

  const flash = useBlockFlash(currentHeight);

  if (!status) {
    return (
      <span className="flex items-center gap-1.5 text-[11px] text-neutral-500">
        <Dot className="animate-pulse bg-neutral-500" />
        Checking node…
      </span>
    );
  }

  if (!status.online) {
    return (
      <span className="flex items-center gap-1.5 text-[11px] text-red-400">
        <Dot className="bg-red-400" />
        Node offline
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2 text-[11px] text-neutral-400">
      {status.syncing ? (
        <span className="flex items-center gap-1.5 text-amber-400">
          <Dot className="animate-pulse bg-amber-400" />
          Syncing
        </span>
      ) : (
        <span className="flex items-center gap-1.5 text-zcash">
          <Dot className="bg-zcash" />
          Synced
        </span>
      )}
      {currentHeight !== null && (
        <span
          className={`font-mono transition-colors duration-300 ${
            flash ? "text-zcash" : "text-neutral-500"
          }`}
        >
          block {currentHeight.toLocaleString("en-US")}
          {status.syncing &&
            status.chainHeight !== null &&
            ` / ${status.chainHeight.toLocaleString("en-US")}`}
        </span>
      )}
    </span>
  );
}

// Variante do dashboard: mostra chain (sync + altura) e o estado do
// zkool_graphql separadamente, conforme pedido.
export function ChainStatusBar({ intervalMs }: { intervalMs?: number }) {
  const status = useChainStatus(intervalMs);

  const online = status?.online ?? false;
  const syncing = status?.syncing ?? false;
  const height = status?.chainHeight ?? null;

  return (
    <div className="flex items-center justify-between rounded-2xl bg-black/20 px-3 py-2 ring-1 ring-white/5">
      {/* Estado da blockchain */}
      <div className="flex items-center gap-2">
        {status === null ? (
          <>
            <Dot className="animate-pulse bg-neutral-500" />
            <span className="text-[11px] text-neutral-500">Checking…</span>
          </>
        ) : !online ? (
          <>
            <Dot className="bg-neutral-600" />
            <span className="text-[11px] text-neutral-500">Chain —</span>
          </>
        ) : syncing ? (
          <>
            <Dot className="animate-pulse bg-amber-400" />
            <span className="text-[11px] text-amber-400">Syncing</span>
          </>
        ) : (
          <>
            <Dot className="bg-zcash" />
            <span className="text-[11px] text-zcash">Synced</span>
          </>
        )}
        {height !== null && (
          <span className="font-mono text-[11px] text-neutral-500">
            block {height.toLocaleString("en-US")}
          </span>
        )}
      </div>

      {/* Estado do zkool_graphql */}
      <div className="flex items-center gap-1.5" title="zkool_graphql backend">
        <Dot
          className={
            status === null
              ? "animate-pulse bg-neutral-500"
              : online
                ? "bg-zcash"
                : "bg-red-400"
          }
        />
        <span
          className={`text-[11px] ${
            status === null
              ? "text-neutral-500"
              : online
                ? "text-neutral-400"
                : "text-red-400"
          }`}
        >
          zkool_graphql {status === null ? "…" : online ? "online" : "offline"}
        </span>
      </div>
    </div>
  );
}
