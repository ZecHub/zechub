import { useState, useCallback, useEffect, useRef } from "react";
import {
  CAPABILITIES,
  type ZecAuth,
  type ZecAuthSession,
  type TxRequestData,
  type TransactionResult,
  type DisclosedTx,
} from "@zecauth/dapp";
import { pollForTxResponse, type TxApprovalPayload } from "../api";

interface Props {
  auth: ZecAuthSession;
  /** The same ZecAuth dApp-SDK client used to connect — drives the payment request flow. */
  zecauth: ZecAuth;
  onDisconnect: () => void;
}

function truncateKey(key: string): string {
  if (key.length <= 16) return key;
  return `${key.slice(0, 6)}…${key.slice(-6)}`;
}

const Brackets = () => (
  <>
    <span className="v-bk tl" /><span className="v-bk tr" /><span className="v-bk bl" /><span className="v-bk br" />
  </>
);
const CheckIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 12.5 10 18 19.5 6.5" /></svg>
);

type TxState = "idle" | "pending" | "approved" | "denied";
type LedgerRow = { label: string; value: string; mono?: boolean; tone?: "gold" | "pos" };

export default function Authenticated({ auth, zecauth, onDisconnect }: Props) {
  const [txState, setTxState] = useState<TxState>("idle");
  const [txRequest, setTxRequest] = useState<TxRequestData | null>(null);
  const [txResult, setTxResult] = useState<TransactionResult | null>(null);
  const [txError, setTxError] = useState<string | null>(null);
  const [responseText, setResponseText] = useState("");
  const [copied, setCopied] = useState(false);

  // Form state
  const [recipient, setRecipient] = useState("u1demo_recipient_address");
  const [amount, setAmount] = useState("0.25");
  const [description, setDescription] = useState("Demo payment");

  // What the user approved / declined in their wallet — we act on these.
  const canPay = auth.capabilities.includes("sign-transaction");
  const requestedIncoming =
    auth.capabilities.includes("view-incoming") || auth.denied.includes("view-incoming");
  const incoming: DisclosedTx[] | null = auth.disclosures?.incomingPayments ?? null;

  // Payment verifier — checks the wallet-disclosed incoming payments for a matching amount.
  const [verifyAmount, setVerifyAmount] = useState("0.25");
  const [verifyResult, setVerifyResult] = useState<null | { ok: boolean; match?: DisclosedTx }>(null);
  const runVerify = useCallback(() => {
    const want = parseFloat(verifyAmount);
    const match = (incoming ?? []).find((p) => parseFloat(p.amountZec) >= want);
    setVerifyResult({ ok: !!match, match });
  }, [verifyAmount, incoming]);

  const handleRequestTx = useCallback(async () => {
    setTxError(null);
    try {
      // Goes through the SDK — which only allows this because we declared the
      // "sign-transaction" capability when constructing the client.
      const data = await zecauth.createTransactionRequest({
        recipient,
        amount,
        description: description || undefined,
      });
      setTxRequest(data);
      setTxState("pending");
    } catch (err) {
      setTxError(err instanceof Error ? err.message : "Failed to create request");
    }
  }, [zecauth, recipient, amount, description]);

  const handleCopyRequest = useCallback(async () => {
    if (txRequest) {
      await navigator.clipboard.writeText(txRequest.request_json);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [txRequest]);

  const handleSubmitApproval = useCallback(async () => {
    setTxError(null);
    const text = responseText.trim();
    if (!text) { setTxError("Paste the signed approval JSON."); return; }

    let payload: TxApprovalPayload;
    try { payload = JSON.parse(text); } catch { setTxError("Invalid JSON."); return; }

    try {
      const result = await zecauth.submitTransactionApproval(payload);
      setTxResult(result);
      setTxState(result.status === "approved" ? "approved" : "denied");
    } catch (err) {
      setTxError(err instanceof Error ? err.message : "Verification failed");
    }
  }, [zecauth, responseText]);

  const handleResetTx = useCallback(() => {
    setTxState("idle");
    setTxRequest(null);
    setTxResult(null);
    setTxError(null);
    setResponseText("");
  }, []);

  // Auto-detect tx approval via WebSocket + polling fallback
  const txSettledRef = useRef(false);
  useEffect(() => {
    if (txState !== "pending" || !txRequest) return;
    txSettledRef.current = false;

    let ws: WebSocket | null = null;
    let pollingId: ReturnType<typeof setInterval> | null = null;
    let cancelled = false;

    async function handleTxResponse(data: TxApprovalPayload) {
      if (cancelled || txSettledRef.current) return;
      txSettledRef.current = true;
      try {
        const result = await zecauth.submitTransactionApproval(data);
        setTxResult(result);
        setTxState(result.status === "approved" ? "approved" : "denied");
      } catch (err) {
        setTxError(err instanceof Error ? err.message : "Verification failed");
        txSettledRef.current = false;
      }
    }

    function startPolling() {
      if (pollingId || cancelled) return;
      pollingId = setInterval(async () => {
        if (cancelled || txSettledRef.current) return;
        const resp = await pollForTxResponse(txRequest!.request.request_id);
        if (resp) handleTxResponse(resp);
      }, 2000);
    }

    try {
      const wsUrl = txRequest.ws_url;
      if (wsUrl) {
        ws = new WebSocket(wsUrl);
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.error) { startPolling(); return; }
            if (data.pubkey && data.signature && data.message) {
              handleTxResponse(data);
            }
          } catch { /* ignore */ }
        };
        ws.onerror = () => startPolling();
        ws.onclose = () => { if (!cancelled && !txSettledRef.current) startPolling(); };
      } else {
        startPolling();
      }
    } catch {
      startPolling();
    }

    return () => {
      cancelled = true;
      if (ws) { ws.onclose = null; ws.close(); }
      if (pollingId) clearInterval(pollingId);
    };
  }, [txState, txRequest, zecauth]);

  const ledger: LedgerRow[] = [
    { label: "Identity", value: truncateKey(auth.pubkey), mono: true, tone: "gold" },
    { label: "App", value: auth.domain },
    { label: "Chain", value: auth.chain },
    { label: "Key scope", value: "Per-app", tone: "pos" },
    // Shown only when the wallet shared a receiving address (view-address capability).
    ...(auth.disclosures?.address
      ? [{ label: "Shared address", value: truncateKey(auth.disclosures.address), mono: true } as LedgerRow]
      : []),
    // Shown only when the wallet shared a read-only viewing key (view-balance/history).
    ...(auth.disclosures?.viewingKey
      ? [{ label: "Viewing key", value: truncateKey(auth.disclosures.viewingKey), mono: true, tone: "pos" } as LedgerRow]
      : []),
  ];

  return (
    <div className="v-stagger">
      {/* Verified + identity ledger */}
      <div className="v-panel">
        <Brackets />
        <div className="v-verified">
          <span className="v-badge v-scalein">
            <svg className="v-drawcheck" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 12.5 10 18 19.5 6.5" /></svg>
          </span>
          <div>
            <div className="v-eyebrow" style={{ color: "var(--v-pos)" }}>Signature verified</div>
            <h2 className="v-display sm" style={{ marginTop: 6 }}>Wallet connected</h2>
          </div>
        </div>

        <div className="v-ledger" style={{ marginTop: 24 }}>
          {ledger.map((row) => (
            <div className="v-lrow" key={row.label}>
              <span className="v-lk">{row.label}</span>
              <span className={`v-lv${row.mono ? " mono" : ""}${row.tone ? " " + row.tone : ""}`}>{row.value}</span>
            </div>
          ))}
        </div>

        {auth.disclosures?.viewingKey && (
          <p className="v-hint" style={{ marginTop: 14 }}>
            <span style={{ color: "var(--v-pos)" }}>●</span> This app received a <span style={{ color: "var(--v-ink2)" }}>read-only viewing key</span>.
            Import it into a lightwalletd scanner to verify incoming payments — it carries no spend authority.
          </p>
        )}
      </div>

      {/* What the user approved / declined — the dApp acts on this. */}
      <div className="v-panel">
        <Brackets />
        <div className="v-seclabel"><span>Permissions granted</span></div>
        <div className="v-chips" style={{ marginTop: 12 }}>
          {auth.capabilities.map((id) => (
            <span key={id} className="v-pill"><CheckIcon />{CAPABILITIES[id]?.label ?? id}</span>
          ))}
        </div>
        {auth.denied.length > 0 && (
          <>
            <div className="v-seclabel" style={{ marginTop: 20 }}><span>You declined</span></div>
            <div className="v-chips" style={{ marginTop: 12 }}>
              {auth.denied.map((id) => (
                <span key={id} className="v-pill off">{CAPABILITIES[id]?.label ?? id}</span>
              ))}
            </div>
            <p className="v-hint" style={{ marginTop: 14 }}>This app sees exactly what you allowed — declined permissions are disabled below.</p>
          </>
        )}
      </div>

      {/* Payment verifier — verifies a received payment from the wallet's disclosed incoming list. */}
      {requestedIncoming && (
        <div className="v-panel">
          <Brackets />
          <div className="v-divlabel">
            <span className="v-capbox sm" style={{ color: "var(--v-pos)", borderColor: "var(--v-pos-line)", background: "var(--v-pos-wash)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" /></svg>
            </span>
            Payment verifier
          </div>

          <div style={{ marginTop: 18 }}>
            {!auth.capabilities.includes("view-incoming") ? (
              <p className="v-capdesc">You declined sharing incoming payments, so this app can't verify payments. <span style={{ color: "var(--v-ink)" }}>(Reconnect to allow it.)</span></p>
            ) : incoming === null ? (
              <p className="v-capdesc">No incoming payments were shared — your wallet may not be synced yet.</p>
            ) : (
              <div className="v-fade">
                <p className="v-capdesc" style={{ marginBottom: 12 }}>
                  Using <span style={{ color: "var(--v-pos)" }}>{incoming.length}</span> received payment{incoming.length === 1 ? "" : "s"} the wallet disclosed — no txid, no scanner. Check whether one covers an expected amount:
                </p>
                <div className="v-field-row">
                  <input
                    type="text"
                    value={verifyAmount}
                    onChange={(e) => { setVerifyAmount(e.target.value); setVerifyResult(null); }}
                    className="v-field"
                    style={{ flex: 1 }}
                    placeholder="Amount in ZEC"
                  />
                  <button onClick={runVerify} className="v-btn pos sm" style={{ width: "auto", padding: "0 20px" }}>Verify</button>
                </div>
                {verifyResult && (
                  <div className={`v-inset ${verifyResult.ok ? "pos" : "neg"}`} style={{ marginTop: 12 }}>
                    {verifyResult.ok && verifyResult.match ? (
                      <div>
                        <p style={{ color: "var(--v-pos)", fontWeight: 600, fontSize: 13, marginBottom: 4 }}>✓ Payment verified</p>
                        <p className="v-capdesc">Received <span style={{ color: "var(--v-ink)" }}>{verifyResult.match.amountZec} ZEC</span> · tx <span className="v-mono" style={{ fontSize: 11 }}>{truncateKey(verifyResult.match.txid)}</span>{verifyResult.match.minedHeight ? ` · block ${verifyResult.match.minedHeight}` : ""}</p>
                      </div>
                    ) : (
                      <p style={{ color: "var(--v-neg)", fontSize: 13 }}>No received payment of at least {verifyAmount} ZEC found.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Transaction Request Section */}
      <div className="v-panel">
        <Brackets />
        <div className="v-divlabel">
          <span className="v-capbox sm" style={{ color: "var(--v-info)", borderColor: "rgba(110,151,230,0.3)", background: "var(--v-info-wash)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2.5" x2="12" y2="21.5" /><path d="M17 6H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
          </span>
          Request payment authorization
        </div>

        <div style={{ marginTop: 18 }}>
          {!canPay && (
            <p className="v-capdesc">
              You declined <span style={{ color: "var(--v-ink)" }}>payment requests</span> for this app, so it can't ask you to sign transactions. The server enforces this too — a <span className="v-mono" style={{ fontSize: 11 }}>/tx/request</span> from this session is rejected.
            </p>
          )}

          {canPay && txState === "idle" && (
            <div className="v-stack v-fade">
              <div>
                <label className="v-flabel">Recipient</label>
                <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} className="v-field" />
              </div>
              <div className="v-grid2">
                <div>
                  <label className="v-flabel">Amount · ZEC</label>
                  <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className="v-field" />
                </div>
                <div>
                  <label className="v-flabel">Description</label>
                  <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="v-field" />
                </div>
              </div>
              {txError && <p className="v-errortext">{txError}</p>}
              <button onClick={handleRequestTx} className="v-btn info">Send request to wallet</button>
            </div>
          )}

          {txState === "pending" && txRequest && (
            <div className="v-stack v-fade">
              <div className="v-inset">
                <div className="v-irow"><span className="k">Recipient</span><span>{truncateKey(txRequest.request.recipient)}</span></div>
                <div className="v-irow"><span className="k">Amount</span><span style={{ color: "var(--v-accent)" }}>{txRequest.request.amount} ZEC</span></div>
                {txRequest.request.description && <div className="v-irow"><span className="k">Description</span><span style={{ color: "var(--v-ink)" }}>{txRequest.request.description}</span></div>}
              </div>

              <div style={{ textAlign: "center" }}>
                <div className="v-statline"><span className="v-dot gold v-pulse" />Waiting for wallet approval…</div>
                <p className="v-hint" style={{ marginTop: 6 }}>Pushed to your connected wallet — approve it there</p>
              </div>

              {/* CLI instructions */}
              <details>
                <summary className="v-disclo" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
                  CLI instructions
                </summary>
                <div style={{ marginTop: 12 }} className="v-stack">
                  <div className="v-code">cargo run -p zecauth-cli -- approve-tx --request '<span className="arg">…</span>'</div>
                  <button onClick={handleCopyRequest} className="v-textbtn">{copied ? "Copied!" : "Copy request JSON"}</button>
                  <p className="v-hint">The CLI will auto-submit. This page updates instantly.</p>

                  <details>
                    <summary className="v-disclo">Manual paste</summary>
                    <div style={{ marginTop: 10 }}>
                      <textarea value={responseText} onChange={(e) => setResponseText(e.target.value)} rows={3} placeholder="Paste signed approval JSON…" className="v-field area" />
                      <button onClick={handleSubmitApproval} className="v-btn info sm" style={{ marginTop: 10 }}>Verify manually</button>
                    </div>
                  </details>
                </div>
              </details>

              {txError && <p className="v-errortext">{txError}</p>}
              <button onClick={handleResetTx} className="v-btn ghost">Cancel</button>
            </div>
          )}

          {(txState === "approved" || txState === "denied") && txResult && (
            <div className="v-fade">
              <div className={`v-inset ${txState === "approved" ? "pos" : "neg"}`} style={{ textAlign: "center", padding: "22px 18px" }}>
                <div className="v-badge" style={{ margin: "0 auto 12px", color: txState === "approved" ? "var(--v-pos)" : "var(--v-neg)", borderColor: txState === "approved" ? "var(--v-pos-line)" : "rgba(232,118,90,0.3)", background: txState === "approved" ? "var(--v-pos-wash)" : "var(--v-neg-wash)" }}>
                  {txState === "approved"
                    ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 12.5 10 18 19.5 6.5" /></svg>
                    : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>}
                </div>
                <p style={{ fontSize: 16, fontWeight: 600, color: txState === "approved" ? "var(--v-pos)" : "var(--v-neg)" }}>
                  Transaction {txState === "approved" ? "approved" : "denied"}
                </p>
                <p className="v-capdesc" style={{ marginTop: 4 }}>{txResult.amount} ZEC to {truncateKey(txResult.recipient)}</p>
              </div>
              <button onClick={handleResetTx} className="v-btn ghost" style={{ marginTop: 14 }}>New request</button>
            </div>
          )}
        </div>
      </div>

      {/* Disconnect */}
      <button onClick={onDisconnect} className="v-btn ghost">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2.2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
        End session
      </button>
    </div>
  );
}
