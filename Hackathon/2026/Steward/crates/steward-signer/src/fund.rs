//! Fauzec testnet faucet client (`https://fauzec.com`, API `/api/v1`).
//!
//! Verified schema (2026-07-07, from `https://fauzec.com/.well-known/openapi.json`):
//! * `POST /api/v1/claim` body: `{ network, address, captcha_token, amount_zat?, memo?, request_id? }`
//!   - `network`: `"testnet"` | `"mainnet"`; `address`: UA or Sapling; `captcha_token`: Cloudflare
//!     Turnstile token (REQUIRED — the faucet returns `error_code: "captcha_required"` without it).
//! * response: `{ request_id, network, state, outcome, txid, error_code, claim_amount_zat, ... }`
//!   - `state`: `pending | broadcasting | confirmed | failed`; `outcome`: `accepted | refused | failed`.
//! * `GET /api/v1/status/{network}/{request_id}` → same fields (poll `txid`/`state`).
//!
//! Rate limit: 1 TAZ per address / 24h (+ IP/24 throttle). Transport is `curl` (system binary)
//! so we add no HTTP/TLS crate to the pinned stack; responses are parsed with `serde_json`.

use std::io::Write;
use std::process::{Command, Stdio};

use anyhow::{anyhow, Context, Result};
use serde_json::Value;

/// Parsed faucet response (claim or status share the same envelope).
#[derive(Clone, Debug, Default)]
pub struct FaucetResponse {
    pub http_status: u16,
    pub request_id: Option<String>,
    pub state: Option<String>,
    pub outcome: Option<String>,
    pub txid: Option<String>,
    pub error_code: Option<String>,
    pub raw: String,
}

fn field(v: &Value, k: &str) -> Option<String> {
    v.get(k).and_then(|x| x.as_str()).map(str::to_owned)
}

fn parse(http_status: u16, raw: String) -> FaucetResponse {
    let v: Value = serde_json::from_str(&raw).unwrap_or(Value::Null);
    FaucetResponse {
        http_status,
        request_id: field(&v, "request_id"),
        state: field(&v, "state"),
        outcome: field(&v, "outcome"),
        txid: field(&v, "txid"),
        error_code: field(&v, "error_code"),
        raw,
    }
}

/// Run curl, optionally feeding `body` on stdin; return `(http_status, body_text)`.
fn curl(args: &[&str], body: Option<&str>) -> Result<(u16, String)> {
    const WRITE_OUT: &str = "\n__HTTP_STATUS__%{http_code}";
    let mut cmd = Command::new("curl");
    cmd.args(["-sS", "--max-time", "30", "-w", WRITE_OUT])
        .args(args)
        .stdin(if body.is_some() { Stdio::piped() } else { Stdio::null() })
        .stdout(Stdio::piped())
        .stderr(Stdio::inherit());
    let mut child = cmd.spawn().context("spawning curl (is it installed?)")?;
    if let Some(b) = body {
        child
            .stdin
            .take()
            .context("curl stdin")?
            .write_all(b.as_bytes())
            .context("writing request body to curl")?;
    }
    let out = child.wait_with_output().context("waiting for curl")?;
    let text = String::from_utf8_lossy(&out.stdout).to_string();
    let (raw, code) = match text.rsplit_once("__HTTP_STATUS__") {
        Some((raw, code)) => (
            raw.trim_end_matches('\n').to_string(),
            code.trim().parse::<u16>().unwrap_or(0),
        ),
        None => (text, 0),
    };
    Ok((code, raw))
}

/// `POST /api/v1/claim` — request `amount_zat` (default 1 TAZ) to `address`.
pub fn claim(
    base: &str,
    network: &str,
    address: &str,
    captcha_token: Option<&str>,
    amount_zat: Option<u64>,
) -> Result<FaucetResponse> {
    let mut body = serde_json::json!({
        "network": network,
        "address": address,
        // `captcha_token` is REQUIRED with minLength 1: an empty/omitted value is rejected as
        // `malformed_request` (400). A non-empty placeholder surfaces the accurate block —
        // `captcha_required` (403) — until a real Cloudflare Turnstile token is passed.
        "captcha_token": captcha_token.unwrap_or("MISSING-TURNSTILE-TOKEN"),
    });
    if let Some(a) = amount_zat {
        body["amount_zat"] = Value::from(a);
    }
    let url = format!("{}/api/v1/claim", base.trim_end_matches('/'));
    let (status, raw) = curl(
        &["-X", "POST", "-H", "Content-Type: application/json", "--data-binary", "@-", &url],
        Some(&body.to_string()),
    )?;
    Ok(parse(status, raw))
}

/// `GET /api/v1/status/{network}/{request_id}`.
pub fn status(base: &str, network: &str, request_id: &str) -> Result<FaucetResponse> {
    let url = format!(
        "{}/api/v1/status/{}/{}",
        base.trim_end_matches('/'),
        network,
        request_id
    );
    let (status, raw) = curl(&[&url], None)?;
    Ok(parse(status, raw))
}

/// Poll `status` every `interval_secs` until the claim reaches a terminal state or times out.
pub fn poll_until_terminal(
    base: &str,
    network: &str,
    request_id: &str,
    max_secs: u64,
    interval_secs: u64,
) -> Result<FaucetResponse> {
    let deadline = std::time::Instant::now() + std::time::Duration::from_secs(max_secs);
    loop {
        let last = status(base, network, request_id)?;
        eprintln!(
            "[fund] status: state={:?} outcome={:?} txid={:?}",
            last.state, last.outcome, last.txid
        );
        if matches!(last.state.as_deref(), Some("confirmed") | Some("failed")) {
            return Ok(last);
        }
        if std::time::Instant::now() >= deadline {
            return Err(anyhow!(
                "faucet claim did not reach a terminal state within {max_secs}s (last state {:?}); \
                 request_id={request_id}",
                last.state
            ));
        }
        std::thread::sleep(std::time::Duration::from_secs(interval_secs));
    }
}
