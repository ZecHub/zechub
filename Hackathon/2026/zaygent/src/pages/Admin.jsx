import { useState } from "react";
import { COLORS } from "../constants/colors";

const SERVER_URL = "http://localhost:5000";

export default function Admin() {
  const [ticketKey,   setTicketKey]   = useState("");
  const [result,      setResult]      = useState(null);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState(null);
  const [resolved,    setResolved]    = useState(false);

  const inputStyle = {
    width: "100%", background: "#0a0c0f", border: `1px solid ${COLORS.border}`,
    borderRadius: 6, padding: "10px 12px", color: COLORS.textPrimary,
    fontSize: 12, fontFamily: "monospace", outline: "none", boxSizing: "border-box",
  };

  const cardStyle = {
    background: COLORS.bgCard, border: `1px solid ${COLORS.border}`,
    borderRadius: 10, overflow: "hidden", marginBottom: 12,
  };

  const handleLookup = async () => {
    if (!ticketKey.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setResolved(false);

    try {
      const res  = await fetch(`${SERVER_URL}/api/support/lookup/${encodeURIComponent(ticketKey.trim())}`);
      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Ticket not found");
      } else {
        setResult(data.ticket);
      }
    } catch (err) {
      setError("Could not connect to server — make sure the server is running");
    }
    setLoading(false);
  };

  const handleResolve = async () => {
    if (!result?.ticketKey) return;
    setLoading(true);
    try {
      const res  = await fetch(`${SERVER_URL}/api/support/resolve/${encodeURIComponent(result.ticketKey)}`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (data.success) {
        setResolved(true);
        setResult(prev => ({ ...prev, status: "RESOLVED" }));
      }
    } catch (err) {
      setError("Could not resolve ticket");
    }
    setLoading(false);
  };

  const statusColor = (status) => {
    switch (status) {
      case "OPEN":          return COLORS.amber;
      case "INVESTIGATING": return COLORS.blue;
      case "RESOLVED":      return COLORS.teal;
      case "EXPIRED":       return COLORS.textMuted;
      default:              return COLORS.textSecondary;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: COLORS.textPrimary, letterSpacing: 1 }}>
          Support Admin Panel
        </h1>
        <p style={{ margin: 0, fontSize: 11, color: COLORS.textSecondary }}>
          Selective disclosure — single transaction diagnostic lookup only
        </p>
      </div>

      {/* Privacy Notice */}
      <div style={{ background: COLORS.tealFaint, border: `1px solid ${COLORS.teal}33`, borderRadius: 8, padding: "12px 16px", marginBottom: 16, display: "flex", gap: 10, alignItems: "flex-start" }}>
        <span style={{ color: COLORS.teal, fontSize: 14, flexShrink: 0 }}>🔐</span>
        <div>
          <div style={{ fontSize: 11, color: COLORS.teal, fontWeight: 600, marginBottom: 2 }}>PRIVACY PROTECTED LOOKUP</div>
          <div style={{ fontSize: 10, color: COLORS.textSecondary, lineHeight: 1.6 }}>
            This panel only reveals diagnostic data for the specific transaction linked to the support key.
            User wallet identity, holdings, strategy profiles, and trade history remain completely private.
            Access expires automatically once the ticket is resolved.
          </div>
        </div>
      </div>

      {/* Lookup Form */}
      <div style={cardStyle}>
        <div style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}` }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.textSecondary, letterSpacing: 2 }}>TICKET LOOKUP</span>
        </div>
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={{ fontSize: 9, color: COLORS.textSecondary, letterSpacing: 1, display: "block", marginBottom: 6 }}>
              SUPPORT RECEIPT KEY
            </label>
            <input
              value={ticketKey}
              onChange={e => setTicketKey(e.target.value)}
              placeholder="ST-TICKET-######::SIG-######"
              style={inputStyle}
              onKeyDown={e => e.key === "Enter" && handleLookup()}
            />
          </div>
          <button
            onClick={handleLookup}
            disabled={loading || !ticketKey.trim()}
            style={{
              background: loading || !ticketKey.trim() ? COLORS.border : COLORS.teal,
              color:      loading || !ticketKey.trim() ? COLORS.textMuted : COLORS.bg,
              border: "none", borderRadius: 6, padding: "10px",
              fontSize: 11, fontFamily: "monospace", fontWeight: 700,
              letterSpacing: 1, cursor: loading || !ticketKey.trim() ? "default" : "pointer",
              transition: "all 0.2s",
            }}>
            {loading ? "⏳ LOOKING UP..." : "🔍 LOOKUP TICKET"}
          </button>

          {error && (
            <div style={{ background: COLORS.red + "11", border: `1px solid ${COLORS.red}44`, borderRadius: 6, padding: "10px 12px" }}>
              <span style={{ fontSize: 11, color: COLORS.red }}>❌ {error}</span>
            </div>
          )}
        </div>
      </div>

      {/* Result */}
      {result && (
        <div>
          {/* Ticket Status */}
          <div style={cardStyle}>
            <div style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}` }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.textSecondary, letterSpacing: 2 }}>TICKET STATUS</span>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                {[
                  { label: "Ticket Key",  value: result.ticketKey,                    color: COLORS.teal        },
                  { label: "Status",      value: result.status,                       color: statusColor(result.status) },
                  { label: "Created",     value: new Date(result.createdAt).toLocaleString(), color: COLORS.textPrimary },
                  { label: "Expires",     value: new Date(result.expiresAt).toLocaleString(), color: COLORS.amber       },
                ].map(item => (
                  <div key={item.label} style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "10px 12px" }}>
                    <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: 1, marginBottom: 4 }}>{item.label.toUpperCase()}</div>
                    <div style={{ fontSize: 11, color: item.color, fontFamily: "monospace", wordBreak: "break-all" }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Diagnostic Data */}
              {result.diagnosticData && Object.keys(result.diagnosticData).length > 0 && (
                <div>
                  <div style={{ fontSize: 9, color: COLORS.textSecondary, letterSpacing: 1, marginBottom: 8 }}>DIAGNOSTIC DATA</div>
                  <div style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "12px 14px" }}>
                    {Object.entries(result.diagnosticData).map(([key, val]) => (
                      <div key={key} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                        <span style={{ fontSize: 10, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>{key}</span>
                        <span style={{ fontSize: 10, color: COLORS.textPrimary, fontFamily: "monospace" }}>
                          {typeof val === "object" ? JSON.stringify(val) : String(val)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Privacy Reminder */}
              <div style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "10px 12px", marginTop: 12 }}>
                <div style={{ fontSize: 9, color: COLORS.textMuted, lineHeight: 1.6 }}>
                  ⚠️ This view is limited to the single transaction above.<br />
                  Wallet identity, holdings, and strategy data are not accessible from this panel.
                </div>
              </div>

              {/* Resolve Button */}
              {result.status !== "RESOLVED" && result.status !== "EXPIRED" && (
                <button
                  onClick={handleResolve}
                  disabled={loading || resolved}
                  style={{
                    width: "100%", marginTop: 12,
                    background: resolved ? COLORS.green : COLORS.tealFaint,
                    color:      resolved ? COLORS.bg    : COLORS.teal,
                    border:     `1px solid ${resolved ? COLORS.green : COLORS.teal}44`,
                    borderRadius: 6, padding: "10px",
                    fontSize: 11, fontFamily: "monospace", fontWeight: 700,
                    letterSpacing: 1, cursor: loading ? "default" : "pointer",
                    transition: "all 0.2s",
                  }}>
                  {resolved ? "✓ TICKET RESOLVED — DATA CLEARED" : "✓ MARK AS RESOLVED"}
                </button>
              )}

              {(result.status === "RESOLVED" || resolved) && (
                <div style={{ background: COLORS.green + "11", border: `1px solid ${COLORS.green}44`, borderRadius: 6, padding: "10px 12px", marginTop: 12, textAlign: "center" }}>
                  <span style={{ fontSize: 11, color: COLORS.green }}>✓ Ticket resolved — all diagnostic data has been cleared</span>
                </div>
              )}

              {result.status === "EXPIRED" && (
                <div style={{ background: COLORS.red + "11", border: `1px solid ${COLORS.red}44`, borderRadius: 6, padding: "10px 12px", marginTop: 12, textAlign: "center" }}>
                  <span style={{ fontSize: 11, color: COLORS.red }}>⚠️ This ticket has expired — access is no longer available</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* How it works */}
      {!result && !error && (
        <div style={cardStyle}>
          <div style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}` }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.textSecondary, letterSpacing: 2 }}>HOW IT WORKS</span>
          </div>
          <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { step: "1", title: "User reports a stuck transaction", desc: "User generates a single-use support receipt key from the Privacy Center or Dashboard." },
              { step: "2", title: "User shares the key", desc: "The key is pasted here. It contains only the internal transaction ID — no wallet data." },
              { step: "3", title: "Admin sees only that transaction", desc: "Diagnostic data for that single transaction is revealed. Nothing else is accessible." },
              { step: "4", title: "Ticket resolved", desc: "Admin marks it resolved. All diagnostic data is permanently cleared from the system." },
            ].map(item => (
              <div key={item.step} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: COLORS.tealFaint, border: `1px solid ${COLORS.teal}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: COLORS.teal, fontWeight: 700, flexShrink: 0 }}>
                  {item.step}
                </div>
                <div>
                  <div style={{ fontSize: 11, color: COLORS.textPrimary, fontWeight: 600, marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 10, color: COLORS.textSecondary, lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}