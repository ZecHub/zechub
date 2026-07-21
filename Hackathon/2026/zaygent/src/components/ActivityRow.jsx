import { COLORS } from "../constants/colors";
import Badge from "./Badge";

export default function ActivityRow({ item, fresh }) {
  const isHolding = item.op === "Holding";
  const isBought  = item.op === "Bought" || item.op === "Sniped" || item.op === "DCA In";
  const isSold    = item.op === "TP Hit" || item.op === "SL Exit" || item.op === "Sold";

  const formatPrice = (p) => {
    if (!p || p === "—") return "—";
    const n = parseFloat(p);
    if (isNaN(n)) return "—";
    return n < 0.01 ? `$${n.toFixed(6)}` : `$${n.toFixed(4)}`;
  };

  const formatAmount = (a) => {
    if (!a || a === "—") return "—";
    const n = parseFloat(a);
    if (isNaN(n)) return "—";
    return n > 1000 ? `${n.toFixed(2)}` : `${n.toFixed(4)}`;
  };

  // Format date and time from item.ts or current time
  const now       = new Date();
  const dateStr   = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  const timeStr   = item.ts || now.toTimeString().slice(0, 8);

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "90px 56px 72px 1fr 80px 72px",
      gap: 8,
      padding: "8px 12px",
      borderBottom: `1px solid ${COLORS.border}`,
      fontSize: 11,
      fontFamily: "monospace",
      alignItems: "center",
      background: fresh ? COLORS.tealFaint : "transparent",
      transition: "background 1s ease",
    }}>

      {/* Date / Time */}
      <div>
        <div style={{ fontSize: 9, color: COLORS.textMuted }}>{dateStr}</div>
        <div style={{ fontSize: 10, color: COLORS.textSecondary }}>{timeStr}</div>
      </div>

      {/* Chain */}
      <Badge chain={item.chain} />

      {/* Operation */}
      <span style={{
        color:      isSold ? COLORS.green : isHolding ? COLORS.amber : COLORS.teal,
        fontWeight: 600,
      }}>
        {item.op}
      </span>

      {/* Details */}
      <div>
        <div style={{ color: COLORS.textPrimary, fontWeight: 600, marginBottom: 2 }}>
          {(item.token || "").trim()}
        </div>
        {isBought && (
          <>
            <div style={{ fontSize: 9, color: COLORS.textMuted }}>
              @ <span style={{ color: COLORS.textSecondary }}>{formatPrice(item.price)}</span>
            </div>
            <div style={{ fontSize: 9, color: COLORS.textMuted }}>
              {formatAmount(item.amount)} <span style={{ color: COLORS.textSecondary }}>tokens</span>
            </div>
          </>
        )}
        {isSold && (
          <>
            <div style={{ fontSize: 9, color: COLORS.textMuted }}>
              @ <span style={{ color: COLORS.textSecondary }}>{formatPrice(item.price)}</span>
            </div>
            {item.pnl && (
              <div style={{ fontSize: 9, fontWeight: 700, color: item.pnl?.startsWith("+") ? COLORS.green : COLORS.red }}>
                {item.pnl}
              </div>
            )}
          </>
        )}
        {isHolding && (
  <>
            {item.currentPrice && (
              <div style={{ fontSize: 9, color: COLORS.textMuted }}>
                now <span style={{ color: COLORS.textSecondary }}>{formatPrice(item.currentPrice)}</span>
              </div>
            )}
            {item.pnl && (
              <div style={{ fontSize: 9, fontWeight: 700, color: item.pnl?.startsWith("+") ? COLORS.green : COLORS.red }}>
                {item.pnl}
              </div>
            )}
          </>
        )}
      </div>

      {/* ZEC funded */}
      <span style={{ color: COLORS.amber, fontSize: 10 }}>
        {item.zec && item.zec !== "—" ? `$${item.zec} ZEC` : "—"}
      </span>

      {/* Shield status */}
      {item.shielded
        ? <span style={{ color: COLORS.teal,      fontSize: 10, fontWeight: 700 }}>[SHIELDED]</span>
        : <span style={{ color: COLORS.textMuted, fontSize: 10 }}>[PUBLIC]</span>
      }
    </div>
  );
}