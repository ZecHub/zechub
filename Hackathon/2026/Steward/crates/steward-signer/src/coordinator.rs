//! The cross-workspace hex seam: fetch an aggregated FROST spend-auth signature from the
//! running `steward-coordinator` HTTP server (its guardians produce it).
//!
//! `POST {base}/vault/{id}/session` with `{ purpose, sighash_hex, randomizer_hex, mode, … }`
//! (matches `steward_coordinator::http::CreateSessionBody`; `purpose` serializes as the bare
//! variant name, e.g. `"NormalSpend"`). The server runs the heartbeat-gated re-randomized signing
//! ceremony and returns `{ session_id, signature_hex }` — the 64-byte `R‖z` already verified
//! against `rk = ak + [α]G`.
//!
//! Two modes: **auto** (a demo vault's shares co-sign in-process, completes at once) and **relay**
//! (real remote guardians discover the session via `GET /vault/:id/pending` and co-sign — so we
//! allow a wide curl budget for a human to notice, unlock, and approve). The recipient + amount
//! ride along as display metadata for the guardians' approval card (advisory; the signature binds
//! the sighash — see SPEC §9).
//!
//! Transport is `curl` (no HTTP crate added to the pinned stack); parsing via `serde_json`.

use anyhow::{anyhow, Context, Result};
use serde_json::{json, Map, Value};

/// One request for an aggregated spend-auth signature over `(sighash, α)`.
pub struct SessionRequest<'a> {
    /// Coordinator base URL, e.g. `http://127.0.0.1:8080`.
    pub base: &'a str,
    /// The vault id registered with the coordinator.
    pub vault_id: &'a str,
    /// Ceremony purpose, e.g. `"NormalSpend"`.
    pub purpose: &'a str,
    /// 32-byte sighash, hex.
    pub sighash_hex: &'a str,
    /// ZIP-312 randomizer α, 32-byte little-endian, hex.
    pub randomizer_hex: &'a str,
    /// `"auto"` (demo shares, in-process) or `"relay"` (real remote guardians co-sign).
    pub mode: &'a str,
    /// Display-only recipient address for the guardians' approval card.
    pub recipient: Option<&'a str>,
    /// Display-only human amount (e.g. `"0.01 ZEC"`).
    pub amount: Option<&'a str>,
}

/// Ask the coordinator for the aggregated 64-byte signature over `sighash` under randomizer `α`.
pub fn request_signature(req: &SessionRequest) -> Result<[u8; 64]> {
    let mut body = Map::new();
    body.insert("purpose".into(), json!(req.purpose));
    body.insert("sighash_hex".into(), json!(req.sighash_hex));
    body.insert("randomizer_hex".into(), json!(req.randomizer_hex));
    body.insert("mode".into(), json!(req.mode));
    if let Some(r) = req.recipient {
        body.insert("recipient".into(), json!(r));
    }
    if let Some(a) = req.amount {
        body.insert("amount".into(), json!(a));
    }
    let body = Value::Object(body).to_string();

    let url = format!("{}/vault/{}/session", req.base.trim_end_matches('/'), req.vault_id);

    // A relay ceremony blocks on a human guardian approving; auto completes at once.
    let max_time = if req.mode == "relay" { "300" } else { "60" };
    let out = std::process::Command::new("curl")
        .args([
            "-sS", "--max-time", max_time, "-X", "POST", "-H", "Content-Type: application/json",
            "--data-binary", &body, &url,
        ])
        .output()
        .context("spawning curl for coordinator session")?;
    let text = String::from_utf8_lossy(&out.stdout).to_string();

    let v: Value = serde_json::from_str(&text)
        .with_context(|| format!("coordinator returned non-JSON: {text}"))?;
    // Surface the coordinator's error envelope ({"error": …}) instead of a confusing "missing
    // signature_hex" — e.g. a 403 heartbeat gate or a 422 quorum-not-met.
    if let Some(err) = v.get("error").and_then(|x| x.as_str()) {
        return Err(anyhow!("coordinator refused the ceremony: {err}"));
    }
    let sig_hex = v
        .get("signature_hex")
        .and_then(|x| x.as_str())
        .ok_or_else(|| anyhow!("coordinator response missing `signature_hex`: {text}"))?;

    let bytes = hex::decode(sig_hex).context("decoding signature_hex")?;
    <[u8; 64]>::try_from(bytes.as_slice())
        .map_err(|_| anyhow!("aggregated signature is {} bytes, expected 64", bytes.len()))
}
