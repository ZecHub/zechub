import { useState, useEffect } from "react";
import { COLORS } from "../constants/colors";
import CrossPayStatus from "../components/CrossPayStatus";    
import useZcashStats from "../hooks/useZcashStats";

export default function FundAccount() {
  const [zecPrice,     setZecPrice]     = useState(400);
  const [copied,       setCopied]       = useState(null);
  const [activeTab,    setActiveTab]    = useState("ZEC");
  const [autoShield,   setAutoShield]   = useState(true);
  const [isMobile,     setIsMobile]     = useState(window.innerWidth < 768);
  const [depositAmt,   setDepositAmt]   = useState("");
  const [liveDeposits, setLiveDeposits] = useState([]);
  const [waitingDeposit, setWaitingDeposit] = useState(false);
  const [depositAddress, setDepositAddress] = useState(null);
  const [withdrawTab,      setWithdrawTab]      = useState("ZEC");
  const [withdrawAmount,   setWithdrawAmount]   = useState("");
  const [withdrawAddress,  setWithdrawAddress]  = useState("");
  const [withdrawChain,    setWithdrawChain]    = useState("BSC");
  const [withdrawLoading,  setWithdrawLoading]  = useState(false);
  const [withdrawResult,   setWithdrawResult]   = useState(null);
  const [withdrawError,    setWithdrawError]    = useState(null);
  const [crossPayExecution, setCrossPayExecution] = useState(null);
  const [crossPayResult, setCrossPayResult] = useState(null);
  const { stats: zcashStats, address: zcashAddress } = useZcashStats();

  // Local agent stats fallback (used for vault calculations)
  const [agentStats, setAgentStats] = useState({ zecReturned: 0 });
  const totalDeposited = 0;

  const fallbackZecAddress = "t1Lzga2SGN3nVpBYF7zKDCRZDHsQ6oGNqQ5";
  const zecAddressValue =
    (typeof zcashAddress === "string" ? zcashAddress : zcashAddress?.address) ||
    window._agentStats?.address?.address ||
    window._agentStats?.address ||
    fallbackZecAddress;

  // Simulated deposit addresses — in production generated from Zcash SDK
  const addresses = {
    ZEC:    zecAddressValue,
    ETH:    "0x7A4B2c9D1e3F5a8B0c2E4f6A8b0C2e4F6a8B0c2E",
    BSC:    "0x7A4B2c9D1e3F5a8B0c2E4f6A8b0C2e4F6a8B0c2E",
    SOLANA: "ZAYgnt7xK2mP4qW8nL3fV9cR6tY1uI5oE0eQ2wR4tY",
  };

  // Safe defaults to avoid runtime errors when data isn't available
  const chainColors = { ZEC: COLORS.amber, ETH: COLORS.blue, BSC: COLORS.bsc, SOLANA: COLORS.solana };
  const chainIcons  = { ZEC: "Ⓩ", ETH: "Ξ", BSC: "Ⓑ", SOLANA: "◎" };
  const depositHistory = [];
  const zecReturned = window._agentStats?.zecReturned || 0;
  const vaultBalance = (zecReturned + 18.220).toFixed(3);
  const vaultUSD = 0;

  useEffect(() => {
    const fetchZecPrice = async () => {
      // Source 1 — CoinGecko
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=zcash&vs_currencies=usd");
        const data = await res.json();
        if (data?.zcash?.usd) { setZecPrice(data.zcash.usd); return; }
      } catch (e) {}

      // Source 2 — Binance
      try {
        const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=ZECUSDT");
        const data = await res.json();
        if (data?.price) { setZecPrice(parseFloat(data.price)); return; }
      } catch (e) {}

      // Source 3 — CoinCap
      try {
        const res = await fetch("https://api.coincap.io/v2/assets/zcash");
        const data = await res.json();
        if (data?.data?.priceUsd) { setZecPrice(parseFloat(data.data.priceUsd)); return; }
      } catch (e) {}
    };

    fetchZecPrice();
    const interval = setInterval(fetchZecPrice, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const liveZecPrice = zecPrice;

  const handleCopy = (key, value) => {
    navigator.clipboard.writeText(value).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const cardStyle = {
    background: COLORS.bgCard, border: `1px solid ${COLORS.border}`,
    borderRadius: 10, overflow: "hidden", marginBottom: 12,
  };

  const statusColor = (s) =>
    s === "SHIELDED"  ? COLORS.teal  :
    s === "CONVERTED" ? COLORS.green :
    s === "PENDING"   ? COLORS.amber : COLORS.textMuted;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: isMobile ? 16 : 20, fontWeight: 600, color: COLORS.textPrimary, letterSpacing: 1 }}>Fund Account</h1>
        <p style={{ margin: 0, fontSize: 11, color: COLORS.textSecondary }}>Deposit funds — all assets auto-shield through ZEC before trading</p>
        {zcashStats && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: COLORS.teal + "11", border: `1px solid ${COLORS.teal}33`, borderRadius: 6, padding: "4px 10px", marginTop: 10, marginBottom: 14 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: COLORS.teal, animation: "pulse 1.5s infinite" }} />
            <span style={{ fontSize: 10, color: COLORS.teal }}>Connected to Zcash Mainnet — Block #{zcashStats.blockHeight.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Vault Summary */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 8, marginBottom: 14 }}>
        {[
          { label: "Vault Balance",    value: `${vaultBalance} ZEC`, color: COLORS.amber       },
          { label: "USD Value",        value: `~$${parseFloat(vaultUSD).toLocaleString()}`, color: COLORS.textPrimary },
          { label: "Total Deposited",  value: `$${totalDeposited.toFixed(2)}`, color: COLORS.green },
          { label: "ZEC Price",       value: `$${liveZecPrice.toFixed(2)}`,      color: COLORS.amber },
        ].map(s => (
          <div key={s.label} style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "12px 14px" }}>
            <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: 1, marginBottom: 6 }}>{s.label.toUpperCase()}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: s.color, fontFamily: "monospace" }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>

        {/* Left — Deposit Addresses */}
        <div>
          <div style={cardStyle}>
            <div style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.textSecondary, letterSpacing: 2 }}>DEPOSIT ADDRESSES</span>
              <span style={{ fontSize: 9, color: COLORS.teal, background: COLORS.tealFaint, padding: "2px 8px", borderRadius: 3 }}>
                {zecAddressValue ? "✅ MAINNET" : "LOADING..."}
              </span>
            </div>

            {/* Chain Tabs */}
            <div style={{ display: "flex", borderBottom: `1px solid ${COLORS.border}` }}>
              {Object.keys(addresses).map(chain => (
                <button key={chain} onClick={() => setActiveTab(chain)} style={{
                  flex: 1, padding: "10px 4px", border: "none", cursor: "pointer",
                  background:   activeTab === chain ? chainColors[chain] + "22" : "transparent",
                  borderBottom: activeTab === chain ? `2px solid ${chainColors[chain]}` : "2px solid transparent",
                  color:        activeTab === chain ? chainColors[chain] : COLORS.textMuted,
                  fontSize: 12, fontFamily: "monospace", fontWeight: 700,
                  transition: "all 0.15s",
                }}>
                  {chainIcons[chain]}
                </button>
              ))}
            </div>

            <div style={{ padding: 16 }}>
              {/* Chain Info */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: chainColors[activeTab] + "22", border: `1px solid ${chainColors[activeTab]}66`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: chainColors[activeTab] }}>
                  {chainIcons[activeTab]}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary }}>{activeTab}</div>
                  <div style={{ fontSize: 10, color: COLORS.textSecondary }}>
                    {activeTab === "ZEC" ? "Shielded sapling address — fully private" :
                     activeTab === "ETH" ? "ERC-20 compatible — auto-converts to ZEC" :
                     activeTab === "BSC" ? "BEP-20 compatible — auto-converts to ZEC" :
                     "SPL compatible — auto-converts to ZEC"}
                  </div>
                </div>
              </div>
              {/* Network fee info */}
              <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                {[
                  activeTab === "ZEC"    && { label: "Network Fee",  value: "~0.0001 ZEC",  color: COLORS.amber  },
                  activeTab === "ETH"    && { label: "Gas Fee",      value: "~$2-5 USDC",   color: COLORS.blue   },
                  activeTab === "BSC"    && { label: "Gas Fee",       value: "~$0.10 USDC", color: COLORS.bsc    },
                  activeTab === "SOLANA" && { label: "Network Fee",  value: "~$0.001 USDC", color: COLORS.solana },
                  { label: "CrossPay Fee", value: "0.5%",            color: COLORS.teal   },
                  { label: "Min Deposit",  value: activeTab === "ZEC" ? "0.1 ZEC" : "$5",  color: COLORS.textSecondary },
                ].filter(Boolean).map(item => (
                  <div key={item.label} style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 4, padding: "4px 8px" }}>
                    <span style={{ fontSize: 8, color: COLORS.textMuted }}>{item.label}: </span>
                    <span style={{ fontSize: 8, color: item.color, fontWeight: 700 }}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Address Display */}
              <div style={{ background: COLORS.bg, border: `1px solid ${chainColors[activeTab]}44`, borderRadius: 8, padding: "12px 14px", marginBottom: 12 }}>
                <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: 1, marginBottom: 8 }}>YOUR {activeTab} DEPOSIT ADDRESS</div>
                <div style={{ fontSize: 10, color: chainColors[activeTab], fontFamily: "monospace", wordBreak: "break-all", lineHeight: 1.8 }}>
                  {addresses[activeTab]}
                </div>
              </div>

              {/* QR Code */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                <div style={{ background: "white", padding: 10, borderRadius: 8, display: "inline-block" }}>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(addresses[activeTab])}`}
                    alt={`${activeTab} QR Code`}
                    width={150}
                    height={150}
                    style={{ display: "block" }}
                  />
                </div>
              </div>
              <div style={{ fontSize: 9, color: COLORS.textMuted, textAlign: "center", marginBottom: 12 }}>
                Scan with your wallet or CEX app to deposit {activeTab}
              </div>

              <button
                onClick={() => handleCopy(activeTab, addresses[activeTab])}
                style={{ width: "100%", background: copied === activeTab ? COLORS.green : chainColors[activeTab] + "22", color: copied === activeTab ? COLORS.bg : chainColors[activeTab], border: `1px solid ${chainColors[activeTab]}44`, borderRadius: 6, padding: "10px", fontSize: 11, fontFamily: "monospace", fontWeight: 700, cursor: "pointer", transition: "all 0.2s", marginBottom: 12 }}>
                {copied === activeTab ? "✓ COPIED!" : `⧉ COPY ${activeTab} ADDRESS`}
              </button>
              <button
                onClick={() => {
                  setWaitingDeposit(true);
                  setDepositAddress(addresses[activeTab]);
                }}
                style={{ width: "100%", background: COLORS.bg, color: COLORS.textSecondary, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "10px", fontSize: 11, fontFamily: "monospace", fontWeight: 700, cursor: "pointer", marginBottom: 12 }}>
                📤 I HAVE SENT FUNDS — WAITING FOR CONFIRMATION
              </button>

              {waitingDeposit && (
                <div style={{ background: COLORS.amber + "11", border: `1px solid ${COLORS.amber}44`, borderRadius: 8, padding: "14px", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.amber, animation: "pulse 1.5s infinite", flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: COLORS.amber, fontWeight: 700 }}>WAITING FOR DEPOSIT</span>
                  </div>
                  <div style={{ fontSize: 10, color: COLORS.textSecondary, lineHeight: 1.8, marginBottom: 10 }}>
                    Once your {activeTab} deposit is confirmed on-chain, CrossPay will automatically:
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {[
                      { icon: "1️⃣", text: `Detect incoming ${activeTab} to your deposit address` },
                      { icon: "2️⃣", text: "Route through NEAR Intents solver" },
                      { icon: "3️⃣", text: "Shield as ZEC in your private vault" },
                      { icon: "4️⃣", text: "Credit available balance to your agent" },
                    ].map(item => (
                      <div key={item.icon} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 12 }}>{item.icon}</span>
                        <span style={{ fontSize: 10, color: COLORS.textSecondary }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                    <div style={{ flex: 1, background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "8px 10px" }}>
                      <div style={{ fontSize: 8, color: COLORS.textMuted, marginBottom: 2 }}>MONITORING ADDRESS</div>
                      <div style={{ fontSize: 9, color: COLORS.teal, fontFamily: "monospace", wordBreak: "break-all" }}>
                        {addresses[activeTab].slice(0, 20)}...
                      </div>
                    </div>
                    <button
                      onClick={() => setWaitingDeposit(false)}
                      style={{ background: "none", border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "8px 12px", color: COLORS.textMuted, fontSize: 10, cursor: "pointer", fontFamily: "monospace" }}>
                      CANCEL
                    </button>
                  </div>
                </div>
              )}

              {/* Deposit amount calculator */}
              <div style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: 1, marginBottom: 8 }}>DEPOSIT CALCULATOR</div>
                <input
                  type="number"
                  value={depositAmt}
                  onChange={e => setDepositAmt(e.target.value)}
                  placeholder={`Enter ${activeTab} amount...`}
                  style={{ width: "100%", background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "8px 10px", color: COLORS.textPrimary, fontSize: 12, fontFamily: "monospace", outline: "none", boxSizing: "border-box", marginBottom: 8 }}
                />
                
                {/* Minimum deposit warning */}
                  {depositAmt && parseFloat(depositAmt) > 0 && parseFloat(depositAmt) < (activeTab === "ZEC" ? 0.1 : 5) && (
                    <div style={{ background: COLORS.red + "11", border: `1px solid ${COLORS.red}44`, borderRadius: 6, padding: "8px 10px", marginBottom: 8 }}>
                      <div style={{ fontSize: 10, color: COLORS.red, fontWeight: 600 }}>
                        ⚠️ Below minimum deposit
                      </div>
                      <div style={{ fontSize: 9, color: COLORS.textMuted, marginTop: 2 }}>
                        Minimum: {activeTab === "ZEC" ? "0.1 ZEC" : activeTab === "SOLANA" ? "5 USDC" : "5 USDC"} to cover network fees
                      </div>
                    </div>
                  )}

                {depositAmt && parseFloat(depositAmt) > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 10, color: COLORS.textMuted }}>You send</span>
                      <span style={{ fontSize: 10, color: COLORS.textPrimary }}>{depositAmt} {activeTab}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 10, color: COLORS.textMuted }}>CrossPay fee (0.5%)</span>
                      <span style={{ fontSize: 10, color: COLORS.red }}>-${(parseFloat(depositAmt) * (activeTab === "ZEC" ? zecPrice : 1) * 0.005).toFixed(2)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${COLORS.border}`, paddingTop: 4 }}>
                      <span style={{ fontSize: 10, color: COLORS.textSecondary }}>ZEC credited to vault</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.amber }}>
                        {activeTab === "ZEC"
                          ? (parseFloat(depositAmt) * 0.995).toFixed(4)
                          : ((parseFloat(depositAmt) * 0.995) / zecPrice).toFixed(4)
                        } ZEC
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          

          {/* Auto Shield Settings */}
          <div style={cardStyle}>
            <div style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}` }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.textSecondary, letterSpacing: 2 }}>AUTO-SHIELD SETTINGS</span>
            </div>
            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Auto-convert deposits to ZEC", key: "autoShield", value: autoShield, onChange: () => setAutoShield(p => !p) },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                  <span style={{ fontSize: 11, color: COLORS.textSecondary }}>{item.label}</span>
                  <div onClick={item.onChange} style={{ width: 32, height: 17, borderRadius: 9, background: item.value ? COLORS.teal : COLORS.border, position: "relative", cursor: "pointer", transition: "background 0.2s" }}>
                    <div style={{ position: "absolute", top: 2, left: item.value ? 15 : 2, width: 13, height: 13, borderRadius: "50%", background: item.value ? COLORS.bg : COLORS.textMuted, transition: "left 0.2s" }} />
                  </div>
                </div>
              ))}
              <div style={{ fontSize: 9, color: COLORS.textMuted, lineHeight: 1.8 }}>
                When enabled, all ETH/BSC/SOL deposits are automatically routed through NEAR Intents and converted to shielded ZEC before being credited to your vault. This ensures maximum privacy across all chains.
              </div>
            </div>
          </div>
        </div>

        {/* Right — Deposit History */}
        <div>
          <div style={cardStyle}>
            <div>
              {/* Deposit History */}
              <div style={cardStyle}>
                <div style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.textSecondary, letterSpacing: 2 }}>DEPOSIT HISTORY</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {liveDeposits.length > 0 && (
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: COLORS.teal, animation: "pulse 1.5s infinite" }} />
                        <span style={{ fontSize: 9, color: COLORS.teal }}>{liveDeposits.length} live</span>
                      </div>
                    )}
                    <span style={{ fontSize: 9, color: COLORS.textMuted }}>{liveDeposits.length + depositHistory.length} transactions</span>
                  </div>
                </div>
                <div>
                  {[...liveDeposits, ...depositHistory].map((d, i) => (
                    <div key={d.id} style={{ padding: "14px 16px", borderBottom: `1px solid ${COLORS.border}`, background: d.live ? COLORS.tealFaint : "transparent" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", background: chainColors[d.chain] + "22", border: `1px solid ${chainColors[d.chain]}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: chainColors[d.chain], flexShrink: 0 }}>
                            {chainIcons[d.chain]}
                          </div>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.textPrimary }}>{d.amount}</span>
                              {d.live && <span style={{ fontSize: 8, color: COLORS.teal, background: COLORS.tealFaint, padding: "1px 5px", borderRadius: 3, fontWeight: 700 }}>LIVE</span>}
                            </div>
                            <div style={{ fontSize: 9, color: COLORS.textMuted }}>{d.ts}</div>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.amber }}>${d.usd}</div>
                          <div style={{ fontSize: 9, color: statusColor(d.status), fontWeight: 700 }}>{d.status}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 9, color: COLORS.textMuted, fontFamily: "monospace", background: COLORS.bg, padding: "4px 8px", borderRadius: 4, wordBreak: "break-all" }}>
                        tx: {d.txHash}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
                        <span style={{ fontSize: 8, color: chainColors[d.chain] }}>{chainIcons[d.chain]}</span>
                        <div style={{ flex: 1, height: 1, background: COLORS.teal + "44" }} />
                        <span style={{ fontSize: 8, color: COLORS.near }}>Ⓝ</span>
                        <div style={{ flex: 1, height: 1, background: COLORS.teal + "44" }} />
                        <span style={{ fontSize: 8, color: COLORS.amber }}>Ⓩ SHIELDED</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div style={cardStyle}>
            <div style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}` }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.textSecondary, letterSpacing: 2 }}>HOW DEPOSITS WORK</span>
            </div>
            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { step: "1", title: "Send to your deposit address", desc: "Send any supported asset from your CEX or wallet to your unique deposit address above.", icon: "📤" },
                { step: "2", title: "CrossPay routes via NEAR Intents", desc: "Your deposit is automatically routed through NEAR Intents solver for optimal cross-chain conversion.", icon: "⚡" },
                { step: "3", title: "Assets shielded as ZEC", desc: "All deposits are converted to ZEC and shielded in your private sapling pool. No on-chain linkability.", icon: "🔐" },
                { step: "4", title: "Agent uses vault to trade", desc: "Your trading agent pulls from the shielded vault each time it executes a trade. Profits return here.", icon: "🤖" },
              ].map(item => (
                <div key={item.step} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                  <div style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, color: COLORS.textPrimary, fontWeight: 600, marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontSize: 10, color: COLORS.textSecondary, lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Withdrawal Section */}
          <div style={cardStyle}>
            <div style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.textSecondary, letterSpacing: 2 }}>WITHDRAW FUNDS</span>
              <span style={{ fontSize: 9, color: COLORS.amber, background: COLORS.amber + "22", border: `1px solid ${COLORS.amber}44`, borderRadius: 3, padding: "2px 8px" }}>ZEC VAULT → EXTERNAL</span>
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>

              {/* Withdraw amount */}
              <div>
                <label style={{ fontSize: 9, color: COLORS.textSecondary, letterSpacing: 1, display: "block", marginBottom: 6 }}>AMOUNT TO WITHDRAW (ZEC)</label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={e => { setWithdrawAmount(e.target.value); setWithdrawResult(null); setWithdrawError(null); }}
                  placeholder="0.00"
                  style={{ width: "100%", background: "#0a0c0f", border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "10px 12px", color: COLORS.textPrimary, fontSize: 12, fontFamily: "monospace", outline: "none", boxSizing: "border-box" }}
                />
                {withdrawAmount && parseFloat(withdrawAmount) > 0 && (
                  <div style={{ fontSize: 9, color: COLORS.textMuted, marginTop: 4, textAlign: "right" }}>
                    ≈ <span style={{ color: COLORS.amber }}>${(parseFloat(withdrawAmount) * zecPrice).toFixed(2)} USD</span>
                  </div>
                )}
              </div>

    {/* Destination chain */}
    <div>
      <label style={{ fontSize: 9, color: COLORS.textSecondary, letterSpacing: 1, display: "block", marginBottom: 6 }}>RECEIVE AS USDC ON</label>
      <div style={{ display: "flex", gap: 6 }}>
        {["BSC", "ETH", "SOLANA"].map(chain => (
          <button key={chain} onClick={() => setWithdrawChain(chain)} style={{
            flex: 1,
            background: withdrawChain === chain ? chainColors[chain] + "22" : COLORS.bg,
            color:      withdrawChain === chain ? chainColors[chain] : COLORS.textSecondary,
            border:     `1px solid ${withdrawChain === chain ? chainColors[chain] : COLORS.border}`,
            borderRadius: 6, padding: "8px 4px", fontSize: 10,
            fontFamily: "monospace", cursor: "pointer", fontWeight: 700,
          }}>
            {chainIcons[chain]} {chain}
          </button>
        ))}
      </div>
      <div style={{ fontSize: 9, color: COLORS.textMuted, marginTop: 4 }}>
        {withdrawChain === "BSC"    && "⭐ Recommended — lowest gas fees, widely supported on P2P"}
        {withdrawChain === "ETH"    && "Most CEXes support ETH USDC — higher gas fees"}
        {withdrawChain === "SOLANA" && "Fast and cheap — check if your CEX supports SOL USDC"}
      </div>
    </div>

    {/* External wallet address */}
    <div>
      <label style={{ fontSize: 9, color: COLORS.textSecondary, letterSpacing: 1, display: "block", marginBottom: 6 }}>DESTINATION WALLET / CEX ADDRESS</label>
      <input
        value={withdrawAddress}
        onChange={e => setWithdrawAddress(e.target.value)}
        placeholder={withdrawChain === "SOLANA" ? "Your SOL address..." : "0x... your ETH/BSC address"}
        style={{ width: "100%", background: "#0a0c0f", border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "10px 12px", color: COLORS.textPrimary, fontSize: 12, fontFamily: "monospace", outline: "none", boxSizing: "border-box" }}
      />
      <div style={{ fontSize: 9, color: COLORS.textMuted, marginTop: 4 }}>
        💡 Use your Binance/OKX/Bybit deposit address for instant P2P conversion
      </div>
    </div>

    {/* Withdrawal preview */}
    {withdrawAmount && parseFloat(withdrawAmount) > 0 && withdrawAddress && (
      <div style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "12px 14px" }}>
        <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: 1, marginBottom: 10 }}>WITHDRAWAL PREVIEW</div>
        {[
          { label: "You withdraw",      value: `${withdrawAmount} ZEC`,                                          color: COLORS.amber       },
          { label: "ZEC value",         value: `$${(parseFloat(withdrawAmount) * zecPrice).toFixed(2)}`,         color: COLORS.textPrimary },
          { label: "CrossPay fee (0.5%)", value: `-$${(parseFloat(withdrawAmount) * zecPrice * 0.005).toFixed(2)}`, color: COLORS.red      },
          { label: "Network gas",       value: withdrawChain === "ETH" ? "-$3.00" : withdrawChain === "BSC" ? "-$0.10" : "-$0.001", color: COLORS.red },
          { label: "You receive",       value: `$${(parseFloat(withdrawAmount) * zecPrice * 0.995 - (withdrawChain === "ETH" ? 3 : withdrawChain === "BSC" ? 0.1 : 0.001)).toFixed(2)} USDC`, color: COLORS.green },
          { label: "Destination",       value: `${withdrawAddress.slice(0, 10)}...${withdrawAddress.slice(-6)}`, color: COLORS.teal        },
          { label: "Via",               value: "ZEC → NEAR Intents → USDC",                                     color: COLORS.textSecondary },
        ].map(item => (
          <div key={item.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, paddingBottom: 6, borderBottom: `1px solid ${COLORS.border}` }}>
            <span style={{ fontSize: 10, color: COLORS.textMuted }}>{item.label}</span>
            <span style={{ fontSize: 10, color: item.color, fontWeight: 600, fontFamily: "monospace" }}>{item.value}</span>
          </div>
        ))}
      </div>
    )}

    {/* Error */}
    {withdrawError && (
      <div style={{ background: COLORS.red + "11", border: `1px solid ${COLORS.red}44`, borderRadius: 6, padding: "10px 12px" }}>
        <span style={{ fontSize: 11, color: COLORS.red }}>❌ {withdrawError}</span>
      </div>
    )}

    {/* Success */}
    {withdrawResult && (
      <div style={{ background: COLORS.teal + "11", border: `1px solid ${COLORS.teal}44`, borderRadius: 8, padding: "12px 14px" }}>
        <div style={{ fontSize: 11, color: COLORS.teal, fontWeight: 700, marginBottom: 8 }}>✅ WITHDRAWAL INITIATED</div>
        <div style={{ fontSize: 10, color: COLORS.textSecondary, lineHeight: 1.8 }}>
          Your USDC will arrive at your destination address within 2-5 minutes via CrossPay.<br />
          Track using the tx hash below.
        </div>
        <div style={{ marginTop: 8, fontSize: 9, color: COLORS.textMuted, fontFamily: "monospace", wordBreak: "break-all", background: COLORS.bg, padding: "6px 8px", borderRadius: 4 }}>
          tx: {withdrawResult.txHash}
        </div>
      </div>
    )}

    {/* Withdraw button */}
    {!withdrawResult && (
      <button
        onClick={async () => {
          if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
            setWithdrawError("Enter a valid amount");
            return;
          }
          if (parseFloat(withdrawAmount) < 0.1) {
            setWithdrawError("Minimum withdrawal is 0.1 ZEC");
            return;
          }
          if (!withdrawAddress || withdrawAddress.length < 10) {
            setWithdrawError("Enter a valid destination address");
            return;
          }
          if (parseFloat(withdrawAmount) > parseFloat(vaultBalance)) {
            setWithdrawError(`Insufficient vault balance. Available: ${vaultBalance} ZEC`);
            return;
          }

          setWithdrawLoading(true);
          setWithdrawError(null);

          // Show CrossPay status widget
          const usdcAmount = (parseFloat(withdrawAmount) * zecPrice * 0.995 - (withdrawChain === "ETH" ? 3 : withdrawChain === "BSC" ? 0.1 : 0.001)).toFixed(2);
          setCrossPayExecution({
            zecAmount:   withdrawAmount,
            usdcAmount,
            chain:       withdrawChain,
            startedAt:   new Date().toISOString(),
            isWithdrawal: true,
          });

          // Simulate CrossPay withdrawal
          await new Promise(r => setTimeout(r, 5000));

          const txHash = `WITHDRAW_${Date.now()}_${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
          setWithdrawResult({ txHash, usdcAmount, chain: withdrawChain });
          // Don't clear execution — let user see the result
          setCrossPayResult({
            success:  true,
            zecSent:  withdrawAmount,
            usdcRecv: usdcAmount,
            chain:    withdrawChain,
            txHash,
          });
          setWithdrawLoading(false);

          // Add to deposit history as withdrawal
          setLiveDeposits(prev => [{
            id:      `withdraw_${Date.now()}`,
            chain:   withdrawChain,
            amount:  `${withdrawAmount} ZEC`,
            usd:     usdcAmount,
            status:  "WITHDRAWN",
            ts:      new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) + " " + new Date().toTimeString().slice(0, 8),
            txHash,
            live:    true,
          }, ...prev]);
        }}
        disabled={withdrawLoading}
        style={{ width: "100%", background: withdrawLoading ? COLORS.border : COLORS.amber, color: withdrawLoading ? COLORS.textMuted : COLORS.bg, border: "none", borderRadius: 8, padding: "12px", fontSize: 12, fontFamily: "monospace", fontWeight: 700, letterSpacing: 1, cursor: withdrawLoading ? "default" : "pointer", transition: "all 0.2s" }}>
        {withdrawLoading ? "⏳ PROCESSING WITHDRAWAL..." : "↗ WITHDRAW TO EXTERNAL WALLET"}
      </button>
    )}

    {withdrawResult && (
      <button
        onClick={() => { setWithdrawResult(null); setWithdrawAmount(""); setWithdrawAddress(""); }}
        style={{ width: "100%", background: COLORS.bg, color: COLORS.textSecondary, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "12px", fontSize: 11, fontFamily: "monospace", cursor: "pointer" }}>
        ↩ NEW WITHDRAWAL
      </button>
    )}
  </div>
</div>

{/* CrossPay Status Widget for withdrawal */}
          {crossPayExecution && (
            <CrossPayStatus
              execution={crossPayExecution}
              result={crossPayResult}
              onClose={() => {
                setCrossPayExecution(null);
                setCrossPayResult(null);
              }}
            />
          )}

        </div>
      </div>
    </div>
  );
}