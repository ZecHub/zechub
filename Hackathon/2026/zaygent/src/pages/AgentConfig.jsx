import { useState, useEffect } from "react";
import { COLORS, chains } from "../constants/colors";

export default function AgentConfig() {
  const [riskLevel,      setRiskLevel]      = useState("MEDIUM");
  const [maxAlloc,       setMaxAlloc]       = useState(20);
  const [globalTP,       setGlobalTP]       = useState(300);
  const [globalSL,       setGlobalSL]       = useState(25);
  const [maxPositions,   setMaxPositions]   = useState(5);
  const [scanInterval,   setScanInterval]   = useState(30);
  const [enabledChains,  setEnabledChains]  = useState({ SOLANA: true, BSC: true, ETH: true, ZEC: true });
  const [autoStable,     setAutoStable]     = useState(true);
  const [honeyCheck,     setHoneyCheck]     = useState(true);
  const [liqCheck,       setLiqCheck]       = useState(true);
  const [dcaLadder,      setDcaLadder]      = useState(false);
  const [sentimentTrack, setSentimentTrack] = useState(false);
  const [saved,          setSaved]          = useState(false);
  const [isMobile,       setIsMobile]       = useState(window.innerWidth < 768);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const inputStyle = {
    width: "100%", background: "#0a0c0f", border: `1px solid ${COLORS.border}`,
    borderRadius: 6, padding: "8px 10px", color: COLORS.textPrimary,
    fontSize: 12, fontFamily: "monospace", outline: "none", boxSizing: "border-box",
  };
  const cardStyle = {
    background: COLORS.bgCard, border: `1px solid ${COLORS.border}`,
    borderRadius: 10, overflow: "hidden", marginBottom: 12,
  };
  const labelStyle = { fontSize: 9, color: COLORS.textSecondary, letterSpacing: 1, display: "block", marginBottom: 4 };

  const Toggle = ({ value, onChange, label, premium }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12, color: COLORS.textPrimary }}>{label}</span>
        {premium && <span style={{ background: COLORS.amber + "22", color: COLORS.amber, border: `1px solid ${COLORS.amber}44`, borderRadius: 3, padding: "1px 5px", fontSize: 8, fontWeight: 700 }}>PRO</span>}
      </div>
      <div onClick={() => onChange(!value)} style={{ width: 32, height: 17, borderRadius: 9, background: value ? COLORS.teal : COLORS.border, position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0 }}>
        <div style={{ position: "absolute", top: 2, left: value ? 15 : 2, width: 13, height: 13, borderRadius: "50%", background: value ? COLORS.bg : COLORS.textMuted, transition: "left 0.2s" }} />
      </div>
    </div>
  );

    const handleSave = async () => {
      setSaved(true);
      const config = { riskLevel, maxAllocation: maxAlloc, maxPositions, globalTP, globalSL, scanInterval, enabledChains, autoStable, honeyCheck, liqCheck, dcaLadder, sentimentTrack };
      try {
        // Save to server DB
        await fetch("http://localhost:5000/api/agent/config", {
          method:  "PUT",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(config),
        });
        // Also push directly to agent for immediate effect
        await fetch("http://localhost:5001/config", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(config),
        });
      } catch (err) {
        console.warn("Config save failed:", err.message);
      }
      setTimeout(() => setSaved(false), 2000);
    };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: isMobile ? 16 : 20, fontWeight: 600, color: COLORS.textPrimary, letterSpacing: 1 }}>Agent Config</h1>
        <p style={{ margin: 0, fontSize: 11, color: COLORS.textSecondary }}>Configure your autonomous trading agent parameters</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
        {/* Left */}
        <div>
          <div style={cardStyle}>
            <div style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}` }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.textSecondary, letterSpacing: 2 }}>RISK PROFILE</span>
            </div>
            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={labelStyle}>RISK LEVEL</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {["LOW", "MEDIUM", "HIGH", "DEGEN"].map(r => (
                    <button key={r} onClick={() => setRiskLevel(r)} style={{
                      flex: 1,
                      background: riskLevel === r ? (r === "DEGEN" ? COLORS.red : r === "HIGH" ? COLORS.amber : COLORS.teal) : COLORS.bg,
                      color:      riskLevel === r ? COLORS.bg : COLORS.textSecondary,
                      border:     `1px solid ${riskLevel === r ? "transparent" : COLORS.border}`,
                      borderRadius: 5, padding: "6px 4px", fontSize: 9,
                      fontFamily: "monospace", cursor: "pointer", fontWeight: 700,
                    }}>{r}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={labelStyle}>MAX ALLOCATION PER TRADE: {maxAlloc}%</label>
                <input type="range" min="5" max="100" step="5" value={maxAlloc} onChange={e => setMaxAlloc(Number(e.target.value))} style={{ width: "100%" }} />
              </div>
              <div>
                <label style={labelStyle}>MAX CONCURRENT POSITIONS: {maxPositions}</label>
                <input type="range" min="1" max="20" step="1" value={maxPositions} onChange={e => setMaxPositions(Number(e.target.value))} style={{ width: "100%" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div>
                  <label style={labelStyle}>TAKE PROFIT %</label>
                  <input type="number" value={globalTP} onChange={e => setGlobalTP(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>STOP LOSS %</label>
                  <input type="number" value={globalSL} onChange={e => setGlobalSL(e.target.value)} style={inputStyle} />
                </div>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}` }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.textSecondary, letterSpacing: 2 }}>EXECUTION SETTINGS</span>
            </div>
            <div style={{ padding: "0 14px" }}>
              <Toggle value={autoStable}     onChange={setAutoStable}     label="Auto-convert profits to stablecoins" />
              <Toggle value={honeyCheck}     onChange={setHoneyCheck}     label="Honeypot simulation check" />
              <Toggle value={liqCheck}       onChange={setLiqCheck}       label="Liquidity lock verification" />
              <Toggle value={dcaLadder}      onChange={setDcaLadder}      label="Multi-tier DCA ladders" premium />
              <Toggle value={sentimentTrack} onChange={setSentimentTrack} label="High-frequency sentiment tracking" premium />
            </div>
          </div>
        </div>

        {/* Right */}
        <div>
          <div style={cardStyle}>
            <div style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}` }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.textSecondary, letterSpacing: 2 }}>ACTIVE CHAINS</span>
            </div>
            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
              {Object.entries(enabledChains).map(([chain, enabled]) => (
                <div key={chain} onClick={() => setEnabledChains(p => ({ ...p, [chain]: !p[chain] }))}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: enabled ? chains[chain]?.color + "11" : COLORS.bg, border: `1px solid ${enabled ? chains[chain]?.color + "44" : COLORS.border}`, borderRadius: 7, padding: "10px 12px", cursor: "pointer", transition: "all 0.2s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: enabled ? chains[chain]?.color || COLORS.teal : COLORS.textMuted }} />
                    <span style={{ fontSize: 12, color: enabled ? COLORS.textPrimary : COLORS.textSecondary, fontWeight: 500 }}>{chain}</span>
                  </div>
                  <span style={{ fontSize: 10, color: enabled ? chains[chain]?.color || COLORS.teal : COLORS.textMuted, fontWeight: 700 }}>
                    {enabled ? "ENABLED" : "DISABLED"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}` }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.textSecondary, letterSpacing: 2 }}>DISCOVERY ENGINE</span>
            </div>
            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={labelStyle}>SCAN INTERVAL: {scanInterval}s</label>
                <input type="range" min="5" max="120" step="5" value={scanInterval} onChange={e => setScanInterval(Number(e.target.value))} style={{ width: "100%" }} />
              </div>
              <div>
                <label style={labelStyle}>DATA SOURCES</label>
                {["GeckoTerminal", "DEXscreener", "Fear & Greed Index", "LunarCrush (limited)"].map(src => (
                  <div key={src} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", background: COLORS.bg, borderRadius: 5, border: `1px solid ${COLORS.border}`, marginBottom: 6 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: COLORS.teal }} />
                    <span style={{ fontSize: 11, color: COLORS.textSecondary }}>{src}</span>
                  </div>
                ))}
              </div>
              <button onClick={handleSave}
                style={{ background: saved ? COLORS.green : COLORS.teal, color: COLORS.bg, border: "none", borderRadius: 6, padding: "10px", fontSize: 11, fontFamily: "monospace", fontWeight: 700, letterSpacing: 1, cursor: "pointer", transition: "background 0.2s" }}>
                {saved ? "✓ SAVED!" : "✓ SAVE CONFIGURATION"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}