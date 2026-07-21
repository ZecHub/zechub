import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { COLORS } from "../constants/colors";
import PnLCard from "./PnLCard";

export default function PnLCardModal({ trade, onClose }) {
  const [options, setOptions] = useState({
    showPct:       true,
    showAmount:    true,
    showChain:     true,
    showShield:    true,
    showEntryMcap: true,
    showExitMcap:  true,
    priceMode:     "both", // "price", "mcap", "both"
    theme:         "dark",
  });
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef(null);

  const toggle   = (key) => setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  const setTheme = (theme) => setOptions(prev => ({ ...prev, theme }));
  const setPriceMode = (priceMode) => setOptions(prev => ({ ...prev, priceMode }));

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `zaygent-${trade.token || "trade"}-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Download error:", err);
    }
    setDownloading(false);
  };

  const Toggle = ({ label, value, onToggle }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${COLORS.border}` }}>
      <span style={{ fontSize: 11, color: COLORS.textSecondary }}>{label}</span>
      <div onClick={onToggle} style={{ width: 32, height: 17, borderRadius: 9, background: value ? COLORS.teal : COLORS.border, position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0 }}>
        <div style={{ position: "absolute", top: 2, left: value ? 15 : 2, width: 13, height: 13, borderRadius: "50%", background: value ? COLORS.bg : COLORS.textMuted, transition: "left 0.2s" }} />
      </div>
    </div>
  );

  const SegmentedControl = ({ label, options: opts, value, onChange }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: 1, marginBottom: 6 }}>{label}</div>
      <div style={{ display: "flex", gap: 4 }}>
        {opts.map(o => (
          <button key={o.value} onClick={() => onChange(o.value)} style={{
            flex: 1,
            background: value === o.value ? COLORS.teal + "22" : COLORS.bg,
            color:      value === o.value ? COLORS.teal : COLORS.textSecondary,
            border:     `1px solid ${value === o.value ? COLORS.teal : COLORS.border}`,
            borderRadius: 5, padding: "5px 4px", fontSize: 9,
            fontFamily: "monospace", cursor: "pointer", fontWeight: 600,
          }}>{o.label}</button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
      <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 12, width: "100%", maxWidth: 860, maxHeight: "90vh", overflow: "auto", display: "flex", flexDirection: "column" }}>

        {/* Modal Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: `1px solid ${COLORS.border}`, flexShrink: 0 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.textSecondary, letterSpacing: 2 }}>DOWNLOAD PNL CARD</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: COLORS.textSecondary, fontSize: 18, cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, padding: 20 }}>

          {/* Left — Card Preview */}
          <div>
            <div style={{ fontSize: 9, color: COLORS.textSecondary, letterSpacing: 1, marginBottom: 12 }}>CARD PREVIEW</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PnLCard ref={cardRef} trade={trade} options={options} />
            </div>
          </div>

          {/* Right — Controls */}
          <div>
            <div style={{ fontSize: 9, color: COLORS.textSecondary, letterSpacing: 1, marginBottom: 12 }}>CUSTOMISE CARD</div>

            {/* Theme */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: 1, marginBottom: 6 }}>CARD THEME</div>
              <div style={{ display: "flex", gap: 6 }}>
                {[
                  { key: "dark",   label: "Dark",   color: COLORS.teal  },
                  { key: "profit", label: "Profit", color: COLORS.green },
                  { key: "loss",   label: "Loss",   color: COLORS.red   },
                ].map(t => (
                  <button key={t.key} onClick={() => setTheme(t.key)} style={{
                    flex: 1,
                    background: options.theme === t.key ? t.color + "22" : COLORS.bg,
                    color:      options.theme === t.key ? t.color : COLORS.textSecondary,
                    border:     `1px solid ${options.theme === t.key ? t.color : COLORS.border}`,
                    borderRadius: 6, padding: "7px 4px", fontSize: 10,
                    fontFamily: "monospace", cursor: "pointer", fontWeight: 600,
                  }}>{t.label}</button>
                ))}
              </div>
            </div>

            {/* Price Mode */}
            <SegmentedControl
              label="ENTRY / EXIT DISPLAY MODE"
              options={[
                { value: "price", label: "Price Only" },
                { value: "mcap",  label: "MCap Only"  },
                { value: "both",  label: "Both"       },
              ]}
              value={options.priceMode}
              onChange={setPriceMode}
            />

            {/* Toggles */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: 1, marginBottom: 6 }}>SHOW / HIDE</div>
              <Toggle label="PnL Percentage"     value={options.showPct}       onToggle={() => toggle("showPct")}       />
              <Toggle label="PnL Amount (ZEC)"   value={options.showAmount}    onToggle={() => toggle("showAmount")}    />
              <Toggle label="Entry MCap"         value={options.showEntryMcap} onToggle={() => toggle("showEntryMcap")} />
              <Toggle label="Exit MCap"          value={options.showExitMcap}  onToggle={() => toggle("showExitMcap")}  />
              <Toggle label="Chain Badge"        value={options.showChain}     onToggle={() => toggle("showChain")}     />
              <Toggle label="Shielded ZEC Badge" value={options.showShield}    onToggle={() => toggle("showShield")}    />
            </div>

            {/* Trade Summary */}
            <div style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "12px 14px", marginBottom: 16 }}>
              <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: 1, marginBottom: 10 }}>TRADE DETAILS</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  { label: "Token",       value: trade.token       || "—" },
                  { label: "Chain",       value: trade.chain       || "—" },
                  { label: "Operation",   value: trade.op || trade.operation || "—" },
                  { label: "Entry Price", value: trade.entryPrice || trade.price ? `$${trade.entryPrice || trade.price}` : "—" },
                  { label: "Entry MCap",  value: trade.entryMcap   || "—" },
                  { label: "Exit Price",  value: trade.exitPrice   ? `$${trade.exitPrice}` : "—" },
                  { label: "Exit MCap",   value: trade.exitMcap    || "—" },
                  { label: "Amount",      value: trade.amount      || "—" },
                  { label: "PnL",         value: trade.pnl         || "—" },
                  { label: "ZEC Funded",  value: trade.zec ? `$${trade.zec}` : "—" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 10, color: COLORS.textMuted }}>{item.label}</span>
                    <span style={{ fontSize: 10, color: COLORS.textPrimary, fontFamily: "monospace" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Button */}
            <button onClick={handleDownload} disabled={downloading}
              style={{ width: "100%", background: downloading ? COLORS.border : COLORS.teal, color: downloading ? COLORS.textMuted : COLORS.bg, border: "none", borderRadius: 8, padding: "12px", fontSize: 12, fontFamily: "monospace", fontWeight: 700, letterSpacing: 2, cursor: downloading ? "default" : "pointer", transition: "all 0.2s" }}>
              {downloading ? "⏳ GENERATING..." : "⬇ DOWNLOAD PNG"}
            </button>
            <div style={{ fontSize: 9, color: COLORS.textMuted, textAlign: "center", marginTop: 8, lineHeight: 1.6 }}>
              Saves as PNG — shareable on Twitter, Telegram, Discord
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}