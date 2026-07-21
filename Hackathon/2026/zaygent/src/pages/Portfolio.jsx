import { useState, useEffect } from "react";
import { COLORS, STRATEGIES, PORTFOLIO_HOLDINGS } from "../constants/colors";
import Badge from "../components/Badge";
import DonutChart from "../components/DonutChart";
import StatCard from "../components/StatCard";
import PnLCardModal from "../components/PnLCardModal";
import useAgentPositions from "../hooks/useAgentPositions";

export default function Portfolio() {
  const donutData = PORTFOLIO_HOLDINGS.map(h => ({ value: h.pct, color: h.color }));
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [isMobile,      setIsMobile]      = useState(window.innerWidth < 768);
  const { positions, snipes, agentOnline, loading, lastUpdated } = useAgentPositions(10000);
  const allPositions = [...positions, ...snipes];

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  return (
    <div>
      {selectedTrade && <PnLCardModal trade={selectedTrade} onClose={() => setSelectedTrade(null)} />}

      <div style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: isMobile ? 16 : 20, fontWeight: 600, color: COLORS.textPrimary, letterSpacing: 1 }}>Portfolio</h1>
        <p style={{ margin: 0, fontSize: 11, color: COLORS.textSecondary }}>Holdings, performance, and PnL breakdown</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 8, marginBottom: 14 }}>
        <StatCard label="Total Value" value={`$${(allPositions.length * 135.32).toFixed(0) || "0"}`} />
        <StatCard label="ZEC Returned" value={`${(window._agentStats?.zecReturned || 0).toFixed(4)} ZEC`} color={COLORS.amber} />
        <StatCard label="TP Hits"     value={window._agentStats?.tpHits  || 0} color={COLORS.green} />
        <StatCard label="Positions"   value={allPositions.length || 0}          color={COLORS.teal}  />
      </div>

      {/* Live Agent Positions */}
      {allPositions.length > 0 && (
        <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.teal}44`, borderRadius: 10, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.teal, letterSpacing: 2 }}>🤖 LIVE AGENT POSITIONS</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.teal, animation: "pulse 1.5s infinite" }} />
              <span style={{ fontSize: 9, color: COLORS.textMuted }}>{lastUpdated ? lastUpdated.toLocaleTimeString() : "LIVE"}</span>
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <div style={{ minWidth: 480 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 100px 100px 80px 80px", gap: 8, padding: "6px 14px", borderBottom: `1px solid ${COLORS.border}` }}>
                {["TOKEN", "CHAIN", "ENTRY", "TOKENS", "TP %", "SL %"].map(h => (
                  <span key={h} style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: 1 }}>{h}</span>
                ))}
              </div>
              {allPositions.map((p, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 70px 100px 100px 80px 80px", gap: 8, padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}`, alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.teal, animation: "pulse 1.5s infinite" }} />
                    <span style={{ fontSize: 12, color: COLORS.textPrimary, fontWeight: 600 }}>{(p.token || "").trim()}</span>
                  </div>
                  <span style={{ fontSize: 10, color: COLORS.textSecondary }}>{p.chain}</span>
                  <span style={{ fontSize: 10, color: COLORS.textPrimary, fontFamily: "monospace" }}>
                    ${parseFloat(p.entryPrice || 0) < 0.01
                      ? parseFloat(p.entryPrice || 0).toFixed(6)
                      : parseFloat(p.entryPrice || 0).toFixed(4)}
                  </span>
                  <span style={{ fontSize: 10, color: COLORS.textSecondary, fontFamily: "monospace" }}>
                    {parseFloat(p.tokensHeld || 0) > 1000
                      ? parseFloat(p.tokensHeld || 0).toFixed(2)
                      : parseFloat(p.tokensHeld || 0).toFixed(4)}
                  </span>
                  <span style={{ fontSize: 10, color: COLORS.green }}>+{p.takeProfit}%</span>
                  <span style={{ fontSize: 10, color: COLORS.red }}>-{p.stopLoss}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {agentOnline && allPositions.length === 0 && !loading && (
        <div style={{ background: COLORS.tealFaint, border: `1px solid ${COLORS.teal}33`, borderRadius: 8, padding: "12px 16px", marginBottom: 12, fontSize: 11, color: COLORS.textSecondary }}>
          🤖 Agent is online — no open positions currently. Scanning for opportunities...
        </div>
      )}

      {!agentOnline && (
        <div style={{ background: COLORS.amber+"11", border: `1px solid ${COLORS.amber}33`, borderRadius: 8, padding: "12px 16px", marginBottom: 12, fontSize: 11, color: COLORS.amber }}>
          ⚠️ Agent offline — start the agent to see live positions
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.6fr", gap: 12, marginBottom: 12 }}>
        {/* Donut */}
        <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: COLORS.textSecondary, letterSpacing: 2, marginBottom: 14 }}>ALLOCATION</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center" }}>
            <DonutChart data={donutData} size={isMobile ? 100 : 130} label="$11.1K" sublabel="TOTAL" />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {PORTFOLIO_HOLDINGS.map(h => (
                <div key={h.token} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: h.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 10, color: COLORS.textSecondary, flex: 1 }}>{h.token}</span>
                  <span style={{ fontSize: 10, color: h.color }}>{h.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Holdings */}
        <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: "hidden" }}>
          <div style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}` }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.textSecondary, letterSpacing: 2 }}>HOLDINGS</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <div style={{ minWidth: 400 }}>
              {PORTFOLIO_HOLDINGS.map(h => (
                <div key={h.token} style={{ display: "grid", gridTemplateColumns: "1fr 70px 90px 70px 90px", gap: 8, padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}`, alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: h.color + "22", border: `1px solid ${h.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: h.color, fontWeight: 700 }}>{h.token[0]}</div>
                    <span style={{ fontSize: 11, color: COLORS.textPrimary, fontWeight: 600 }}>{h.token}</span>
                  </div>
                  <Badge chain={h.chain} />
                  <span style={{ fontSize: 10, color: COLORS.textSecondary, fontFamily: "monospace" }}>{h.amount}</span>
                  <span style={{ fontSize: 10, color: COLORS.textPrimary, fontFamily: "monospace" }}>{h.value}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ flex: 1, height: 3, background: COLORS.border, borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${h.pct}%`, background: h.color }} />
                    </div>
                    <span style={{ fontSize: 9, color: h.color }}>{h.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Strategy Performance */}
      {/* Strategy Performance — Post Hackathon */}
      <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: "hidden", opacity: 0.5 }}>
        <div style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.textSecondary, letterSpacing: 2 }}>STRATEGY PERFORMANCE</span>
          <span style={{ fontSize: 9, color: COLORS.amber, background: COLORS.amber + "22", border: `1px solid ${COLORS.amber}44`, borderRadius: 4, padding: "2px 8px", letterSpacing: 1 }}>COMING SOON</span>
        </div>
        <div style={{ padding: "40px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>📊</div>
          <div style={{ fontSize: 13, color: COLORS.textPrimary, fontWeight: 600, marginBottom: 6 }}>Advanced Strategy Analytics</div>
          <div style={{ fontSize: 11, color: COLORS.textSecondary, lineHeight: 1.8, maxWidth: 400, margin: "0 auto" }}>
            Detailed per-strategy performance tracking, win rate analytics, drawdown analysis, and PnL attribution will be available in the next release.
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
            {["Win Rate Analytics", "Drawdown Analysis", "PnL Attribution", "Strategy Comparison"].map(f => (
              <span key={f} style={{ fontSize: 9, color: COLORS.textMuted, background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 4, padding: "4px 10px", letterSpacing: 1 }}>{f}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}