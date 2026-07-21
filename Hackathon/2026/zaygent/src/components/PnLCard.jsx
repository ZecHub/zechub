import { forwardRef } from "react";
import { COLORS } from "../constants/colors";

const PnLCard = forwardRef(({ trade, options }, ref) => {
  const {
    showPct       = true,
    showAmount    = true,
    showChain     = true,
    showShield    = true,
    showEntryMcap = true,
    showExitMcap  = true,
    priceMode     = "both", // "price", "mcap", "both"
    theme         = "dark",
  } = options || {};

  const isProfit  = trade.profit || trade.isProfit || trade.pnl?.startsWith("+");
  const isStopped = trade.op === "SL Exit" || trade.operation === "SL Exit";
  const isOngoing = trade.op === "Ongoing" || (!trade.pnl && !isStopped);

  const themes = {
    dark:   { bg: "#0a0c0f", card: "#0f1217", border: isProfit ? "#00e5b4" : isStopped ? "#ef4444" : "#3b82f6" },
    profit: { bg: "#021a12", card: "#032617", border: "#00e5b4" },
    loss:   { bg: "#1a0202", card: "#260303", border: "#ef4444" },
  };

  const t = themes[theme] || themes.dark;

  const statusColor = isProfit ? COLORS.teal : isStopped ? COLORS.red : COLORS.blue;
  const statusLabel = isProfit ? "TP HIT ✓" : isStopped ? "SL EXIT ✗" : "ONGOING ●";
  const pnlColor    = isProfit ? COLORS.teal : isStopped ? COLORS.red : COLORS.amber;

  const chainColors = {
    SOLANA: "#9945ff", BSC: "#f0b90b", ETH: "#627eea", ZEC: "#f4b728",
  };
  const chainColor = chainColors[trade.chain] || COLORS.teal;

  // Entry / Exit display helpers
  const entryPrice = trade.entryPrice || trade.price || null;
  const exitPrice  = trade.exitPrice  || null;
  const entryMcap  = trade.entryMcap  || null;
  const exitMcap   = trade.exitMcap   || null;

  const showEntryPrice = priceMode === "price" || priceMode === "both";
  const showEntryMcapVal = (priceMode === "mcap" || priceMode === "both") && showEntryMcap;
  const showExitPrice  = !isOngoing && (priceMode === "price" || priceMode === "both");
  const showExitMcapVal  = !isOngoing && (priceMode === "mcap" || priceMode === "both") && showExitMcap;

  return (
    <div ref={ref} style={{
      width: 360,
      background: t.bg,
      borderRadius: 16,
      overflow: "hidden",
      fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
      border: `1px solid ${t.border}`,
      boxShadow: `0 0 30px ${t.border}33`,
    }}>
      {/* Header */}
      <div style={{ background: t.card, padding: "16px 20px", borderBottom: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: COLORS.teal, fontSize: 16, fontWeight: 700, letterSpacing: 2 }}>ZAY</span>
            <span style={{ color: COLORS.textPrimary, fontSize: 16, fontWeight: 300, letterSpacing: 2 }}>GENT</span>
          </div>
          <div style={{ fontSize: 9, color: COLORS.textSecondary, letterSpacing: 2, marginTop: 2 }}>TRADE RECEIPT</div>
        </div>
        <div style={{ background: statusColor + "22", border: `1px solid ${statusColor}66`, borderRadius: 6, padding: "4px 10px" }}>
          <span style={{ fontSize: 10, color: statusColor, fontWeight: 700, letterSpacing: 1 }}>{statusLabel}</span>
        </div>
      </div>

      {/* Token Info */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.textPrimary, letterSpacing: 1 }}>
              {trade.token}
            </div>
            {showChain && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: chainColor }} />
                <span style={{ fontSize: 10, color: chainColor, letterSpacing: 1 }}>{trade.chain}</span>
              </div>
            )}
          </div>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: chainColor + "22", border: `1px solid ${chainColor}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: chainColor, fontWeight: 700 }}>
            {trade.token?.[0]}
          </div>
        </div>

        {/* Entry / Exit Block */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>

          {/* Entry */}
          <div style={{ background: COLORS.bg, borderRadius: 8, padding: "10px 12px", border: `1px solid ${COLORS.border}` }}>
            <div style={{ fontSize: 9, color: COLORS.teal, letterSpacing: 1, marginBottom: 6, fontWeight: 700 }}>ENTRY</div>
            {showEntryPrice && entryPrice && (
              <div style={{ marginBottom: 4 }}>
                <div style={{ fontSize: 8, color: COLORS.textMuted, letterSpacing: 1 }}>PRICE</div>
                <div style={{ fontSize: 12, color: COLORS.textPrimary, fontWeight: 600 }}>${entryPrice}</div>
              </div>
            )}
            {showEntryMcapVal && entryMcap && (
              <div>
                <div style={{ fontSize: 8, color: COLORS.textMuted, letterSpacing: 1 }}>MCAP</div>
                <div style={{ fontSize: 12, color: COLORS.textPrimary, fontWeight: 600 }}>{entryMcap}</div>
              </div>
            )}
            {!entryPrice && !entryMcap && (
              <div style={{ fontSize: 11, color: COLORS.textMuted }}>—</div>
            )}
            <div style={{ marginTop: 6 }}>
              <div style={{ fontSize: 8, color: COLORS.textMuted, letterSpacing: 1 }}>AMOUNT</div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary }}>{trade.amount || "—"}</div>
            </div>
          </div>

          {/* Exit */}
          <div style={{ background: COLORS.bg, borderRadius: 8, padding: "10px 12px", border: `1px solid ${isOngoing ? COLORS.border : statusColor + "44"}` }}>
            <div style={{ fontSize: 9, color: isOngoing ? COLORS.textMuted : statusColor, letterSpacing: 1, marginBottom: 6, fontWeight: 700 }}>
              {isOngoing ? "EXIT (OPEN)" : "EXIT"}
            </div>
            {showExitPrice && exitPrice && (
              <div style={{ marginBottom: 4 }}>
                <div style={{ fontSize: 8, color: COLORS.textMuted, letterSpacing: 1 }}>PRICE</div>
                <div style={{ fontSize: 12, color: COLORS.textPrimary, fontWeight: 600 }}>${exitPrice}</div>
              </div>
            )}
            {showExitMcapVal && exitMcap && (
              <div>
                <div style={{ fontSize: 8, color: COLORS.textMuted, letterSpacing: 1 }}>MCAP</div>
                <div style={{ fontSize: 12, color: COLORS.textPrimary, fontWeight: 600 }}>{exitMcap}</div>
              </div>
            )}
            {isOngoing && (
              <div style={{ fontSize: 10, color: COLORS.amber }}>Still running...</div>
            )}
            {!isOngoing && !exitPrice && !exitMcap && (
              <div style={{ fontSize: 11, color: COLORS.textMuted }}>—</div>
            )}
            <div style={{ marginTop: 6 }}>
              <div style={{ fontSize: 8, color: COLORS.textMuted, letterSpacing: 1 }}>OP</div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary }}>{trade.op || trade.operation || "—"}</div>
            </div>
          </div>
        </div>

        {/* PnL Display */}
        {(showPct || showAmount) && (
          <div style={{ background: pnlColor + "11", border: `1px solid ${pnlColor}33`, borderRadius: 10, padding: "16px 20px", marginBottom: 16, textAlign: "center" }}>
            <div style={{ fontSize: 9, color: COLORS.textSecondary, letterSpacing: 2, marginBottom: 8 }}>PERFORMANCE</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
              {showPct && (
                <div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: pnlColor, letterSpacing: 1 }}>
                    {trade.pnl || trade.pnlPct || (isOngoing ? "LIVE" : "—")}
                  </div>
                  <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: 1 }}>RETURN %</div>
                </div>
              )}
              {showPct && showAmount && trade.zec && (
                <div style={{ width: 1, height: 40, background: COLORS.border }} />
              )}
              {showAmount && trade.zec && (
                <div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: pnlColor }}>${trade.zec} ZEC</div>
                  <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: 1 }}>FUNDED</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {showShield && (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 12, color: COLORS.amber }}>Ⓩ</span>
            <span style={{ fontSize: 9, color: COLORS.textSecondary, letterSpacing: 1 }}>SHIELDED VIA ZEC</span>
          </div>
        )}
        <div style={{ marginLeft: "auto" }}>
          <span style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: 1 }}>zaygent.io</span>
        </div>
      </div>

      {/* Bottom accent line */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${t.border}, transparent)` }} />
    </div>
  );
});

PnLCard.displayName = "PnLCard";
export default PnLCard;