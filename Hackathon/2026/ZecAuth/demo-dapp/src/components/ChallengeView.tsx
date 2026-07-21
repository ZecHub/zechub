import { useState, useEffect, useCallback, useRef } from "react";
import type { ChallengeData } from "@zecauth/dapp";
import StyledQR from "./StyledQR";
import Shield from "./Shield";
import { pollForResponse, type VerifyPayload } from "../api";

interface Props {
  challenge: ChallengeData;
  onVerify: (payload: VerifyPayload) => Promise<void>;
  onCancel: () => void;
}

const QR_SIZE = 264;

function truncate(s: string, head = 8, tail = 6): string {
  if (!s || s.length <= head + tail + 1) return s;
  return `${s.slice(0, head)}…${s.slice(-tail)}`;
}

export default function ChallengeView({ challenge, onVerify, onCancel }: Props) {
  // The SDK returns the raw server challenge as an untyped record; pull out the bits we show.
  const c = challenge.challenge as { domain: string; nonce: string; expiration_time: string };
  const [timeLeft, setTimeLeft] = useState("");
  const [expired, setExpired] = useState(false);
  const [status, setStatus] = useState<"waiting" | "received" | "verifying" | "error">("waiting");
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [showManual, setShowManual] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [copied, setCopied] = useState(false);
  const settledRef = useRef(false);

  // Countdown
  useEffect(() => {
    const expiry = new Date(c.expiration_time).getTime();
    function tick() {
      const diff = Math.max(0, Math.floor((expiry - Date.now()) / 1000));
      if (diff <= 0) { setTimeLeft("0:00"); setExpired(true); return; }
      setTimeLeft(`${Math.floor(diff / 60)}:${(diff % 60).toString().padStart(2, "0")}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [challenge]);

  // Auto-detect wallet response via WebSocket + polling fallback
  useEffect(() => {
    let ws: WebSocket | null = null;
    let pollingId: ReturnType<typeof setInterval> | null = null;
    let cancelled = false;

    function handleResponse(data: VerifyPayload) {
      if (cancelled || settledRef.current) return;
      settledRef.current = true;
      setStatus("received");

      // Small delay to show "received" state before verifying
      setTimeout(async () => {
        setStatus("verifying");
        try {
          await onVerify(data);
        } catch (err) {
          setVerifyError(err instanceof Error ? err.message : "Verification failed");
          setStatus("error");
          settledRef.current = false;
        }
      }, 500);
    }

    function startPolling() {
      if (pollingId || cancelled) return;
      const nonce = c.nonce;
      pollingId = setInterval(async () => {
        if (cancelled || settledRef.current) return;
        const response = await pollForResponse(nonce);
        if (response) handleResponse(response);
      }, 2000);
    }

    // Try WebSocket first
    try {
      const wsUrl = challenge.ws_url;
      if (wsUrl) {
        ws = new WebSocket(wsUrl);
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.error) { startPolling(); return; }
            if (data.pubkey && data.signature && data.message) {
              handleResponse(data);
            }
          } catch { /* ignore */ }
        };
        ws.onerror = () => startPolling();
        ws.onclose = () => { if (!cancelled && !settledRef.current) startPolling(); };
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
  }, [challenge, onVerify]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(challenge.challenge_json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [challenge]);

  const handleManualSubmit = useCallback(async () => {
    setVerifyError(null);
    const text = responseText.trim();
    if (!text) { setVerifyError("Paste the signed response JSON first."); return; }

    let payload: VerifyPayload;
    try { payload = JSON.parse(text); } catch { setVerifyError("Invalid JSON."); return; }
    if (!payload.pubkey || !payload.signature || !payload.message) {
      setVerifyError('Missing "pubkey", "signature", or "message" field.'); return;
    }

    setStatus("verifying");
    try { await onVerify(payload); }
    catch (err) {
      setVerifyError(err instanceof Error ? err.message : "Verification failed");
      setStatus("error");
    }
  }, [responseText, onVerify]);

  return (
    <div className="v-stagger">
      {/* QR panel */}
      <div className="v-panel">
        <span className="v-bk tl" /><span className="v-bk tr" /><span className="v-bk bl" /><span className="v-bk br" />

        <div className="v-center">
          <div className="v-eyebrow">Scan to authenticate</div>
          <h2 className="v-display xs" style={{ marginTop: 10 }}>Sign the challenge</h2>
        </div>

        <div className="v-qrwrap" style={{ ["--v-scan-h" as string]: `${QR_SIZE}px` }}>
          <span className="v-bk tl" /><span className="v-bk tr" /><span className="v-bk bl" /><span className="v-bk br" />
          <span className="v-scan" />
          <StyledQR
            value={
              challenge.request_url
                ? // Short link — wallet fetches the full challenge from the server. Keeps the
                  // QR at a low version so the styled (dotted + logo) rendering stays scannable.
                  `zecauth://${c.domain}?req=${encodeURIComponent(challenge.request_url)}`
                : `zecauth://${c.domain}?challenge=${encodeURIComponent(challenge.challenge_json)}`
            }
            size={QR_SIZE}
            dotColor="#14110a"
            bgColor="#fbf8f0"
            finderColor="#14110a"
            logo={
              <span className="v-qremblem">
                <Shield size={42} stroke={54} />
              </span>
            }
          />
        </div>

        {/* Capabilities embedded in this challenge — the wallet shows these to the user too. */}
        {challenge.capabilities.length > 0 && (
          <div className="v-chips center" style={{ marginTop: 18 }}>
            <span className="v-reqtag">Requesting</span>
            {challenge.capabilities.map((cap) => (
              <span key={cap.id} title={cap.description} className="v-chip">{cap.label}</span>
            ))}
          </div>
        )}

        {/* Status */}
        <div style={{ marginTop: 22 }}>
          {status === "waiting" && !expired && (
            <div className="v-statline"><span className="v-dot gold v-pulse" />Waiting for signature · <span className="v-mono" style={{ color: "var(--v-accent)" }}>{timeLeft}</span></div>
          )}
          {status === "received" && (
            <div className="v-statline"><span className="v-dot pos" /><span style={{ color: "var(--v-pos)" }}>Response received</span></div>
          )}
          {status === "verifying" && (
            <div className="v-statline"><span className="v-spinner" /><span style={{ color: "var(--v-accent)" }}>Verifying…</span></div>
          )}
          {status === "error" && (
            <div className="v-statline"><span style={{ color: "var(--v-neg)" }}>Verification failed</span></div>
          )}
          {expired && status === "waiting" && (
            <div className="v-statline"><span style={{ color: "var(--v-neg)" }}>Challenge expired</span></div>
          )}
        </div>

        <div className="v-meta">
          <div><div className="k">Domain</div><div className="val">{c.domain}</div></div>
          <div style={{ textAlign: "right" }}><div className="k">Nonce</div><div className="val">{truncate(c.nonce)}</div></div>
        </div>
      </div>

      {/* CLI Instructions (for demo) */}
      <div className="v-panel" style={{ padding: 0 }}>
        <span className="v-bk tl" /><span className="v-bk tr" /><span className="v-bk bl" /><span className="v-bk br" />
        <button className="v-collapse-hd" style={{ padding: "18px 20px" }} onClick={() => setShowManual(!showManual)}>
          <span className="lbl">
            <span className="v-capbox sm">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
            </span>
            CLI instructions
          </span>
          <span className={`v-chev${showManual ? " open" : ""}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
          </span>
        </button>

        {showManual && (
          <div className="v-fade" style={{ padding: "0 20px 20px" }}>
            <p className="v-capdesc" style={{ marginBottom: 8 }}>Copy the challenge and run:</p>
            <div className="v-code">
              cargo run -p zecauth-cli -- sign --challenge '<span className="arg">…</span>'
            </div>
            <button onClick={handleCopy} className="v-textbtn" style={{ marginTop: 10 }}>
              {copied ? "Copied!" : "Copy challenge JSON"}
            </button>
            <p className="v-hint" style={{ marginTop: 8 }}>The CLI will auto-submit to the server. This page updates instantly.</p>

            {/* Manual paste fallback */}
            <details style={{ marginTop: 16 }}>
              <summary className="v-disclo">Manual paste (if auto-submit doesn't work)</summary>
              <div style={{ marginTop: 12 }}>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows={3}
                  placeholder="Paste signed response JSON here…"
                  className="v-field area"
                />
                {verifyError && <p className="v-errortext" style={{ marginTop: 6 }}>{verifyError}</p>}
                <button onClick={handleManualSubmit} disabled={expired} className="v-btn sm" style={{ marginTop: 10 }}>
                  Verify manually
                </button>
              </div>
            </details>
          </div>
        )}
      </div>

      <button onClick={onCancel} className="v-link">Cancel</button>
    </div>
  );
}
