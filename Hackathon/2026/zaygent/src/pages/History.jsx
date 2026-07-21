import useTradeHistory from "../hooks/useTradeHistory";
import { useState, useEffect } from "react";
import { COLORS, chains, ops } from "../constants/colors";
import Badge from "../components/Badge";
import StatCard from "../components/StatCard";
import PnLCardModal from "../components/PnLCardModal";

export default function History() {
  const [filterOp,      setFilterOp]      = useState("ALL");
  const [filterChain,   setFilterChain]   = useState("ALL");
  const [search,        setSearch]        = useState("");
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [isMobile,      setIsMobile]      = useState(window.innerWidth < 768);
  const liveTrades = useTradeHistory();

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

const allTrades = liveTrades;

const filtered = allTrades.filter(h =>
  (filterOp    === "ALL" || h.op    === filterOp)    &&
  (filterChain === "ALL" || h.chain === filterChain) &&
  h.token.toLowerCase().includes(search.toLowerCase())
);

const wins     = allTrades.filter(h => h.profit).length;
const losses   = allTrades.filter(h => h.op === "SL Exit").length;
const totalZec = allTrades.reduce((s, h) => s + parseFloat(h.zec || 0), 0).toFixed(2);

  const inputStyle = {
    background: COLORS.bgCard, border: `1px solid ${COLORS.border}`,
    borderRadius: 6, padding: "6px 10px", color: COLORS.textPrimary,
    fontSize: 11, fontFamily: "monospace", outline: "none",
  };

  return (
    <div>
      {selectedTrade && <PnLCardModal trade={selectedTrade} onClose={() => setSelectedTrade(null)} />}

      <p style={{ margin: 0, fontSize: 11, color: COLORS.textSecondary }}>
        Full trade execution log —{" "}
        {liveTrades.length > 0
          ? <span style={{ color: COLORS.teal }}>● {liveTrades.length} live trades</span>
          : <span style={{ color: COLORS.textMuted }}>waiting for agent trades...</span>
        }
      </p>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 8, marginBottom: 14 }}>
        <StatCard label="Trades"    value={allTrades.length} />
        <StatCard label="Win Rate" value={allTrades.length > 0 ? `${((wins / allTrades.length) * 100).toFixed(0)}%` : "0%"} color={COLORS.green} />        <StatCard label="SL Exits"  value={losses}              color={COLORS.red}   />
        <StatCard label="ZEC Total" value={`$${totalZec}`}      color={COLORS.amber} />
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search token..."
          style={{ ...inputStyle, width: isMobile ? "100%" : 150 }} />
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {["ALL", ...ops].map(o => (
            <button key={o} onClick={() => setFilterOp(o)} style={{
              background: filterOp === o ? COLORS.teal : COLORS.bgCard,
              color:      filterOp === o ? COLORS.bg   : COLORS.textSecondary,
              border:     `1px solid ${filterOp === o ? COLORS.teal : COLORS.border}`,
              borderRadius: 4, padding: "4px 8px", fontSize: 9,
              fontFamily: "monospace", cursor: "pointer", fontWeight: 600,
            }}>{o}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {["ALL", "SOLANA", "ETH", "BSC"].map(c => (
            <button key={c} onClick={() => setFilterChain(c)} style={{
              background: filterChain === c ? (chains[c]?.color || COLORS.teal) : COLORS.bgCard,
              color:      filterChain === c ? COLORS.bg : COLORS.textSecondary,
              border:     `1px solid ${filterChain === c ? (chains[c]?.color || COLORS.teal) : COLORS.border}`,
              borderRadius: 4, padding: "4px 8px", fontSize: 9,
              fontFamily: "monospace", cursor: "pointer", fontWeight: 600,
            }}>{c}</button>
          ))}
        </div>
        <span style={{ fontSize: 10, color: COLORS.textMuted, marginLeft: "auto" }}>{filtered.length} records</span>
      </div>

      {/* Table */}
      {allTrades.length === 0 && (
        <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "40px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 24, marginBottom: 10 }}>🤖</div>
          <div style={{ fontSize: 13, color: COLORS.textPrimary, marginBottom: 6 }}>No trades yet</div>
          <div style={{ fontSize: 11, color: COLORS.textSecondary }}>
            Agent trades will appear here in real time as they execute
          </div>
        </div>
      )}

      <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: 620 }}>
            <div style={{ display: "grid", gridTemplateColumns: "70px 55px 70px 1fr 90px 70px 70px 60px 70px", gap: 6, padding: "8px 12px", borderBottom: `1px solid ${COLORS.border}` }}>
              {["TIME", "CHAIN", "OP", "TOKEN", "ZEC", "PNL", "STATUS", "ZEC?", "CARD"].map(h => (
                <span key={h} style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: 1 }}>{h}</span>
              ))}
            </div>
            <div style={{ maxHeight: 420, overflow: "auto" }}>
              {filtered.map(item => (
                <div key={item.id} style={{ display: "grid", gridTemplateColumns: "70px 55px 70px 1fr 90px 70px 70px 60px 70px", gap: 6, padding: "9px 12px", borderBottom: `1px solid ${COLORS.border}`, fontSize: 10, fontFamily: "monospace", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 9, color: COLORS.textMuted }}>{item.date || "—"}</div>
                      <div style={{ fontSize: 10, color: COLORS.textSecondary }}>{item.ts}</div>
                    </div>
                  <Badge chain={item.chain} />
                  <span style={{ color: item.profit ? COLORS.teal : item.op === "SL Exit" ? COLORS.red : COLORS.textSecondary, fontWeight: 600 }}>{item.op}</span>
                  <span style={{ color: COLORS.textPrimary }}>
                    {item.amount} <span style={{ color: COLORS.textSecondary }}>{item.token}</span>
                  </span>
                  <span style={{ color: COLORS.amber }}>${item.zec}</span>
                  <span style={{ color: item.pnl?.startsWith("+") ? COLORS.green : COLORS.red, fontWeight: 700 }}>{item.pnl || "—"}</span>
                  <span style={{ fontSize: 9, color: item.profit ? COLORS.green : item.op === "SL Exit" ? COLORS.red : COLORS.textSecondary }}>
                    {item.profit ? "PROFIT" : item.op === "SL Exit" ? "STOPPED" : "NEUTRAL"}
                  </span>
                  <span style={{ fontSize: 9, color: item.shielded ? COLORS.teal : COLORS.textMuted }}>
                    {item.shielded ? "✓" : "—"}
                  </span>
                  <button onClick={() => setSelectedTrade(item)} style={{ background: COLORS.tealFaint, color: COLORS.teal, border: `1px solid ${COLORS.teal}44`, borderRadius: 4, padding: "3px 6px", fontSize: 9, fontFamily: "monospace", cursor: "pointer", fontWeight: 700 }}>⬇</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}