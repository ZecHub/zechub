import { useEffect, useState } from "react";

export interface ToastData {
  id: number;
  status: "PAID" | "UNDERPAID";
  amount: string;
}

export function Toast({
  data,
  onDismiss,
}: {
  data: ToastData;
  onDismiss: () => void;
}) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLeaving(true), 4000);
    const t2 = setTimeout(onDismiss, 4400);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [onDismiss]);

  const paid = data.status === "PAID";

  return (
    <div
      className={`pointer-events-none fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-xl px-4 py-3 shadow-xl ring-1 backdrop-blur-md ${
        paid
          ? "bg-zcash/15 ring-zcash/40"
          : "bg-amber-500/15 ring-amber-400/40"
      } ${leaving ? "toast-out" : "toast-in"}`}
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full ${
          paid ? "bg-zcash/30" : "bg-amber-400/30"
        }`}
      >
        {paid ? (
          <svg viewBox="0 0 24 24" width="18" height="18" className="check-draw">
            <path
              d="M4 12l5 5L20 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={paid ? "text-zcash" : ""}
            />
          </svg>
        ) : (
          <span className="text-amber-300 text-lg font-bold">!</span>
        )}
      </span>
      <div>
        <p className="text-sm font-medium text-neutral-100">
          {paid ? "Payment received" : "Underpaid"}
        </p>
        <p className="font-mono text-xs text-neutral-300">{data.amount} ZEC</p>
      </div>
    </div>
  );
}
