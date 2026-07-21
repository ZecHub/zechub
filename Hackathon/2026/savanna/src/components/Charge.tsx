import { useEffect, useState } from "react";
import type { PaymentCreated } from "../lib/pdv";
import { ChainStatusInline } from "./ChainStatusBar";
// Logo centralizado no QR. Coloque seu arquivo em src/assets/qr-logo.png.
// O Vite resolve/otimiza o import e devolve a URL final (dev e produção).
import qrLogo from "../assets/qr-logo.png";

type Status = "PENDING" | "PAID" | "UNDERPAID" | "EXPIRED";

function trimZec(n: number): string {
  return n.toFixed(8).replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
}

// Aceita vírgula OU ponto como separador decimal. Normaliza para ponto
// (formato interno usado por Number() e pela cobrança), remove qualquer
// caractere não numérico e garante um único separador decimal.
function normalizeAmount(v: string): string {
  // vírgula vira ponto; descarta tudo que não for dígito ou ponto
  let s = v.replace(/,/g, ".").replace(/[^\d.]/g, "");
  // mantém apenas o primeiro ponto (junta o resto dos dígitos)
  const firstDot = s.indexOf(".");
  if (firstDot !== -1) {
    s =
      s.slice(0, firstDot + 1) + s.slice(firstDot + 1).replace(/\./g, "");
  }
  return s;
}

export default function Charge({
  onClose,
  onSettled,
}: {
  onClose: () => void;
  onSettled: () => void;
}) {
  const [zec, setZec] = useState(""); // valor em ZEC (é o que vai para a cobrança)
  const [usd, setUsd] = useState(""); // valor em USD (espelho)
  const [payment, setPayment] = useState<PaymentCreated | null>(null);
  const [status, setStatus] = useState<Status>("PENDING");
  const [received, setReceived] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [zecUsd, setZecUsd] = useState<number | null>(null);

  useEffect(() => {
    window.pdv.getZecUsd().then(({ zecUsd }) => setZecUsd(zecUsd));
  }, []);

  // digitar em ZEC → atualiza USD
  function onZecChange(v: string) {
    const clean = normalizeAmount(v);
    setZec(clean);
    if (zecUsd && clean) setUsd((Number(clean) * zecUsd).toFixed(2));
    else if (!clean) setUsd("");
  }

  // digitar em USD → atualiza ZEC
  function onUsdChange(v: string) {
    const clean = normalizeAmount(v);
    setUsd(clean);
    if (zecUsd && zecUsd > 0 && clean) setZec(trimZec(Number(clean) / zecUsd));
    else if (!clean) setZec("");
  }

  // preset em dólar
  function setFromUsd(dollars: number) {
    setUsd(dollars.toFixed(2));
    if (zecUsd && zecUsd > 0) setZec(trimZec(dollars / zecUsd));
  }

  useEffect(() => {
    if (!payment) return;
    const off = window.pdv.onPaymentUpdate(async ({ paymentId }) => {
      if (paymentId !== payment.id && paymentId !== "*") return;
      const s = await window.pdv.getStatus(payment.id);
      setStatus(s.status as Status);
      setReceived(s.receivedZec);
      if (s.status === "PAID" || s.status === "UNDERPAID") onSettled();
    });
    return off;
  }, [payment, onSettled]);

  useEffect(() => {
    if (status === "PAID" || status === "UNDERPAID") {
      const t = setTimeout(onClose, 3500);
      return () => clearTimeout(t);
    }
  }, [status, onClose]);

  async function create() {
    setBusy(true);
    try {
      const p = await window.pdv.createPayment(zec);
      setPayment(p);
      setStatus("PENDING");
      setReceived(null);
    } finally {
      setBusy(false);
    }
  }

  const settled = status === "PAID" || status === "UNDERPAID";

  return (
    <div className="fixed inset-2 z-40 flex items-center justify-center rounded-[18px] bg-black/50 backdrop-blur-sm">
      <div className="relative m-4 w-full max-w-sm rounded-2xl bg-ink/90 p-5 ring-1 ring-white/10">
        {!settled && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 text-neutral-500 transition hover:text-neutral-200"
            aria-label="Close"
          >
            ✕
          </button>
        )}

        {!payment && (
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-medium">New charge</h2>

            {/* Campo ZEC */}
            <label className="text-xs text-neutral-400">
              Amount (ZEC)
              <div className="mt-1 flex items-baseline gap-2 rounded-2xl bg-black/40 px-4 py-3 ring-1 ring-white/10 focus-within:ring-white/25">
                <input
                  value={zec}
                  onChange={(e) => onZecChange(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && zec && create()}
                  autoFocus
                  inputMode="decimal"
                  placeholder="0.00"
                  className="w-full bg-transparent font-mono text-2xl outline-none"
                />
                <span className="font-mono text-sm text-neutral-500">ZEC</span>
              </div>
            </label>

            {/* Campo USD (espelho) */}
            {zecUsd && (
              <label className="text-xs text-neutral-400">
                Amount (USD)
                <div className="mt-1 flex items-baseline gap-2 rounded-2xl bg-black/40 px-4 py-3 ring-1 ring-white/10 focus-within:ring-white/25">
                  <span className="font-mono text-sm text-neutral-500">$</span>
                  <input
                    value={usd}
                    onChange={(e) => onUsdChange(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && zec && create()}
                    inputMode="decimal"
                    placeholder="0.00"
                    className="w-full bg-transparent font-mono text-2xl outline-none"
                  />
                  <span className="font-mono text-sm text-neutral-500">USD</span>
                </div>
              </label>
            )}

            {/* Presets */}
            {zecUsd && (
              <div className="flex flex-col gap-2">
                <p className="text-xs text-neutral-500">Quick amounts</p>
                <div className="grid grid-cols-3 gap-2">
                  {[5, 10, 15, 20, 50, 100].map((d) => (
                    <button
                      key={d}
                      onClick={() => setFromUsd(d)}
                      className="rounded-2xl bg-white/5 py-2.5 text-sm font-medium ring-1 ring-white/10 transition hover:bg-white/10"
                    >
                      ${d}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={create}
              disabled={busy || !zec || Number(zec) <= 0}
              className="rounded-2xl bg-white/10 py-3.5 text-sm font-medium ring-1 ring-white/15 transition hover:bg-white/15 disabled:opacity-40"
            >
              {busy ? "Generating…" : "Generate QR"}
            </button>
          </div>
        )}

        {payment && !settled && (
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <div className="font-mono text-2xl">{payment.amountZec} ZEC</div>
              {zecUsd && (
                <div className="font-mono text-xs text-neutral-500">
                  ≈ ${(Number(payment.amountZec) * zecUsd).toFixed(2)} USD
                </div>
              )}
            </div>
            <div className="relative rounded-2xl bg-white p-3">
              <img src={payment.qrDataUrl} alt="Zcash payment QR" width={260} />
              {/* Logo centralizado. O QR usa correção de erro nível H (~30%),
                  então o miolo pode ser coberto sem perder a leitura. O padding
                  branco cria a "zona morta" que os leitores esperam ao redor
                  do logo. Mantido pequeno (~22% do QR) por segurança. */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="rounded-lg bg-white p-1 shadow-sm">
                  <img
                    src={qrLogo}
                    alt=""
                    aria-hidden="true"
                    className="h-[58px] w-[58px] rounded-md object-contain"
                  />
                </div>
              </div>
            </div>
            <ChainStatusInline />
            <p className="flex items-center gap-2 text-sm text-neutral-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-neutral-400" />
              Waiting for payment…
            </p>
            <button
              onClick={onClose}
              className="mt-1 rounded-2xl px-4 py-2 text-sm text-neutral-400 ring-1 ring-white/10 transition hover:text-neutral-200"
            >
              Cancel
            </button>
          </div>
        )}

        {payment && settled && (
          <div className="flex flex-col items-center gap-4 py-6 success-pop">
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-full ${
                status === "PAID" ? "bg-zcash/20" : "bg-amber-400/20"
              }`}
            >
              {status === "PAID" ? (
                <svg viewBox="0 0 24 24" width="44" height="44" className="check-draw text-zcash">
                  <path
                    d="M4 12l5 5L20 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <span className="text-4xl font-bold text-amber-400">!</span>
              )}
            </div>

            <div className="text-center">
              <p
                className={`text-lg font-medium ${
                  status === "PAID" ? "text-zcash" : "text-amber-400"
                }`}
              >
                {status === "PAID" ? "Payment received" : "Underpaid"}
              </p>
              <p className="mt-1 font-mono text-2xl text-neutral-100">
                {received ?? payment.amountZec}{" "}
                <span className="text-sm text-neutral-500">ZEC</span>
              </p>
              {status === "UNDERPAID" && (
                <p className="mt-1 text-xs text-amber-400/80">
                  Expected {payment.amountZec} ZEC
                </p>
              )}
            </div>

            <button
              onClick={onClose}
              className="mt-2 rounded-2xl bg-white/10 px-6 py-2 text-sm font-medium ring-1 ring-white/15 transition hover:bg-white/15"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}