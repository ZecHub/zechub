import { useState, useEffect } from "react";
import { COLORS, chains } from "../constants/colors";
import Badge from "../components/Badge";
import StatCard from "../components/StatCard";

export default function Markets() {
  const [filter,    setFilter]    = useState("ALL");
  const [search,    setSearch]    = useState("");
  const [tokens,    setTokens]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [isMobile,  setIsMobile]  = useState(window.innerWidth < 768);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  // Fetch live tokens from the agent
  useEffect(() => {
    const fetchTokens = async () => {
      setLoading(true);
      try {
        const res  = await fetch("http://localhost:5001/markets");
        const data = await res.json();
        if (data.success && data.tokens?.length > 0) {
          setTokens(data.tokens.map(t => ({
            name:    t.name,
            chain:   t.chain,
            price:   t.price < 0.01 ? t.price.toFixed(6) : t.price.toFixed(4),
            change:  `${t.change24h >= 0 ? "+" : ""}${t.change24h.toFixed(2)}%`,
            vol:     formatNum(t.volume24h),
            mcap:    formatNum(t.mcap),
            up:      t.change24h >= 0,
            address: t.address,
          })));
        }
      } catch (err) {
        console.warn("Markets fetch error:", err.message);
      }
      setLoading(false);
    };

    fetchTokens();
    const interval = setInterval(fetchTokens, 15000);
    return () => clearInterval(interval);
  }, []);

  const formatNum = (val) => {
    const n = Number(val);
    if (!Number.isFinite(n) || n === 0) return "$0";
    if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
    if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
    if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
    return `$${n.toFixed(2)}`;
  };

  const filtered = tokens.filter(t =>
    (filter === "ALL" || t.chain === filter) &&
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const topGainer = tokens.reduce((a, b) =>
    parseFloat(a.change) > parseFloat(b.change) ? a : b, { change: "0%" }
  );
  const topLoser = tokens.reduce((a, b) =>
    parseFloat(a.change) < parseFloat(b.change) ? a : b, { change: "0%" }
  );
  const totalVol = tokens.reduce((s, t) => {
    const v = parseFloat(t.vol.replace(/[$BMK]/g, "")) *
      (t.vol.includes("B") ? 1e9 : t.vol.includes("M") ? 1e6 : t.vol.includes("K") ? 1e3 : 1);
    return s + v;
  }, 0);

  const inputStyle = {
    background: COLORS.bgCard, border: `1px solid ${COLORS.border}`,
    borderRadius: 6, padding: "7px 12px", color: COLORS.textPrimary,
    fontSize: 11, fontFamily: "monospace", outline: "none",
  };

  return (
    <div>
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: isMobile ? 16 : 20, fontWeight: 600, color: COLORS.textPrimary, letterSpacing: 1 }}>Markets</h1>
          <p style={{ margin: 0, fontSize: 11, color: COLORS.textSecondary }}>
            Live cross-chain token feed — GeckoTerminal
            {loading && <span style={{ color: COLORS.amber }}> · refreshing...</span>}
          </p>
        </div>
        <span style={{ fontSize: 9, color: COLORS.textMuted }}>{tokens.length} tokens live</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 8, marginBottom: 14 }}>
        <StatCard label="Trending"   value={`${tokens.length}`}      color={COLORS.teal}  />
        <StatCard label="Volume"     value={formatNum(totalVol)}                           />
        <StatCard label="Top Gainer" value={topGainer.change}         color={COLORS.green} />
        <StatCard label="Top Loser"  value={topLoser.change}          color={COLORS.red}   />
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
          style={{ ...inputStyle, width: isMobile ? "100%" : 180 }} />
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {["ALL", "SOLANA", "ETH", "BSC"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? COLORS.teal : COLORS.bgCard,
              color:      filter === f ? COLORS.bg   : COLORS.textSecondary,
              border:     `1px solid ${filter === f ? COLORS.teal : COLORS.border}`,
              borderRadius: 5, padding: "5px 10px", fontSize: 9,
              fontFamily: "monospace", cursor: "pointer", fontWeight: 600,
            }}>{f}</button>
          ))}
        </div>
        <span style={{ fontSize: 10, color: COLORS.textMuted, marginLeft: "auto" }}>{filtered.length} tokens</span>
      </div>

      <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: "hidden" }}>
        {loading && tokens.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: COLORS.textMuted, letterSpacing: 1 }}>🔍 Fetching live market data...</div>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <div style={{ minWidth: 560 }}>
              <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 70px 100px 80px 80px 80px 80px", gap: 6, padding: "8px 12px", borderBottom: `1px solid ${COLORS.border}` }}>
                {["#", "TOKEN", "CHAIN", "PRICE", "24H%", "VOL", "MCAP", ""].map(h => (
                  <span key={h} style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: 1 }}>{h}</span>
                ))}
              </div>
              {filtered.map((t, i) => (
                <div key={`${t.name}_${t.chain}_${i}`} style={{ display: "grid", gridTemplateColumns: "32px 1fr 70px 100px 80px 80px 80px 80px", gap: 6, padding: "10px 12px", borderBottom: `1px solid ${COLORS.border}`, alignItems: "center" }}>
                  <span style={{ fontSize: 10, color: COLORS.textMuted }}>{i + 1}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: chains[t.chain]?.color + "22", border: `1px solid ${chains[t.chain]?.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: chains[t.chain]?.color, fontWeight: 700, flexShrink: 0 }}>{t.name[0]}</div>
                    <span style={{ fontSize: 11, color: COLORS.textPrimary, fontWeight: 600 }}>{t.name}</span>
                  </div>
                  <Badge chain={t.chain} />
                  <span style={{ fontSize: 10, color: COLORS.textPrimary, fontFamily: "monospace" }}>${t.price}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: t.up ? COLORS.green : COLORS.red }}>{t.change}</span>
                  <span style={{ fontSize: 10, color: COLORS.textSecondary }}>{t.vol}</span>
                  <span style={{ fontSize: 10, color: COLORS.textSecondary }}>{t.mcap}</span>
                  <button
                    onClick={() => {
                      if (t.address) {
                        window._sniperCA    = t.address;
                        window._sniperChain = t.chain;
                        // Navigate to dashboard
                        window._navigateTo = "Dashboard";
                        window.dispatchEvent(new CustomEvent("zaygent:navigate", { detail: "Dashboard" }));
                      }
                    }}
                    style={{ background: COLORS.tealFaint, color: COLORS.teal, border: `1px solid ${COLORS.teal}44`, borderRadius: 4, padding: "3px 8px", fontSize: 9, fontFamily: "monospace", cursor: "pointer", fontWeight: 700 }}>
                    SNIPE
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}