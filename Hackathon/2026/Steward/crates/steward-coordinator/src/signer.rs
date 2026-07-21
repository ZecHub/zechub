//! Best-effort shell-out to the prebuilt **`steward-signer`** binary.
//!
//! The signer lives on an ISOLATED, deliberately-incompatible crate stack (`pczt 0.5.0`
//! plus the `conradoplg/orchard@4d001c5` fork; see its `Cargo.toml`), so the coordinator
//! **cannot link it** — it invokes the prebuilt binary as a subprocess and parses its
//! `--json` stdout. Every function here is **best-effort and non-fatal**: a missing or
//! failing binary yields an `Err(String)` the caller turns into a `null` field or a
//! clean 502; it never panics and never breaks an existing endpoint.
//!
//! Only two shapes are consumed — the signer's `derive-vault --json` and `sync --json`
//! objects — and only the fields the coordinator needs are deserialized.

use std::path::{Path, PathBuf};
use std::process::Stdio;
use std::time::Duration;

use serde::Deserialize;
use tokio::process::Command;

/// Default location of the prebuilt signer binary, **relative to the coordinator's CWD**
/// (the workspace root when launched via `cargo run -p steward-coordinator`). Overridable
/// with the `STEWARD_SIGNER_BIN` env var.
pub const DEFAULT_SIGNER_BIN: &str = "crates/steward-signer/target/debug/steward-signer";

/// The env var that overrides the signer binary path.
pub const SIGNER_BIN_ENV: &str = "STEWARD_SIGNER_BIN";

/// `steward-signer derive-vault --json` output.
#[derive(Debug, Clone, Deserialize)]
pub struct DeriveOut {
    /// `"test"` or `"main"` — echoes the network derivation ran under.
    #[allow(dead_code)]
    pub network: String,
    /// The vault's receiving Unified Address (`u1…` / `utest1…`).
    pub ua: String,
    /// The vault's Unified Full Viewing Key (`uview…`) — fed to `sync`.
    pub ufvk: String,
}

/// `steward-signer sync --json` output.
#[derive(Debug, Clone, Deserialize)]
pub struct SyncOut {
    /// `"test"` or `"main"` — echoes the network the scan ran under.
    pub network: String,
    /// Whether the wallet is fully scanned to the chain tip.
    pub synced: bool,
    /// The endpoint chain-tip height at scan time.
    pub tip_height: u64,
    /// Total value across all pools (incl. pending), zatoshis.
    pub total_zat: u64,
    /// Orchard-pool total, zatoshis.
    pub orchard_zat: u64,
    /// Immediately-spendable value, zatoshis.
    pub spendable_zat: u64,
}

/// The resolved signer binary path plus whether it currently exists on disk.
#[derive(Debug, Clone)]
pub struct SignerBin {
    /// The path we would invoke (reported verbatim in the not-found message).
    pub path: PathBuf,
    /// Whether that path is an existing file.
    pub exists: bool,
}

impl SignerBin {
    /// A clear, actionable "not found" message for a 502 body.
    pub fn not_found_message(&self) -> String {
        format!(
            "signer binary not found at {} — build it with \
             cargo build --manifest-path crates/steward-signer/Cargo.toml",
            self.path.display()
        )
    }
}

/// Resolve the signer binary: `STEWARD_SIGNER_BIN` env override › the default path
/// relative to CWD › an absolute fallback derived from the build-time workspace root
/// (`CARGO_MANIFEST_DIR/../../<default>`). If none exist, reports the CWD-relative
/// default as the expected location so the 502 message is actionable.
pub fn locate() -> SignerBin {
    // 1. Explicit override always wins (reported even if it does not exist).
    if let Ok(p) = std::env::var(SIGNER_BIN_ENV) {
        if !p.trim().is_empty() {
            let path = PathBuf::from(p);
            let exists = path.is_file();
            return SignerBin { path, exists };
        }
    }
    // 2. Default, relative to the current working directory.
    let rel = PathBuf::from(DEFAULT_SIGNER_BIN);
    if rel.is_file() {
        return SignerBin { path: rel, exists: true };
    }
    // 3. Absolute fallback: the workspace root captured at build time. `CARGO_MANIFEST_DIR`
    //    is `.../steward/crates/steward-coordinator`; two parents up is the workspace root.
    if let Some(root) = Path::new(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .and_then(Path::parent)
    {
        let abs = root.join(DEFAULT_SIGNER_BIN);
        if abs.is_file() {
            return SignerBin { path: abs, exists: true };
        }
    }
    // Nothing exists — report the CWD-relative default as the expected location.
    SignerBin { path: rel, exists: false }
}

/// Run `<signer> derive-vault --ak <ak_hex> --network <net> --json`. Best-effort;
/// derivation is pure crypto (no network), so a short cap suffices.
pub async fn derive_vault(bin: &Path, ak_hex: &str, network: &str) -> Result<DeriveOut, String> {
    let stdout = run(
        bin,
        &["derive-vault", "--ak", ak_hex, "--network", network, "--json"],
        Duration::from_secs(30),
    )
    .await?;
    parse_json_line(&stdout).map_err(|e| format!("parsing derive-vault JSON: {e}"))
}

/// Run `<signer> sync --ufvk <ufvk> --network <net> --json` (scans a public endpoint).
/// Testnet scans the default window in ≈7s, but a mainnet scan of the same block range
/// trial-decrypts far more shielded output — measured ≈105s — so the cap is 240s (≈2× margin)
/// to keep mainnet from tripping a timeout the way a too-tight cap would. Best-effort.
pub async fn sync(bin: &Path, ufvk: &str, network: &str) -> Result<SyncOut, String> {
    let stdout = run(
        bin,
        &["sync", "--ufvk", ufvk, "--network", network, "--json"],
        Duration::from_secs(240),
    )
    .await?;
    parse_json_line(&stdout).map_err(|e| format!("parsing sync JSON: {e}"))
}

/// `steward-signer sign-and-broadcast --json` output.
#[derive(Debug, Clone, Deserialize)]
pub struct SpendOut {
    /// The broadcast transaction id (ZIP-244), hex — what an explorer will show.
    pub txid: String,
    /// The lightwalletd/Zaino `SendTransaction` server message.
    #[allow(dead_code)]
    pub broadcast: String,
}

/// Run `<signer> build-pczt --ufvk <ufvk> --to <to> --amount-zat <n> --network <net> -o <out>`.
/// Constructs + Halo2-proves a spend from the per-(network,ufvk) WalletDb a prior `sync`
/// populated — so the vault must be synced **and** hold a confirmed note ≥ the amount, else the
/// signer fails at `propose_transfer` (surfaced as the error tail). Proving is CPU-heavy
/// (mainnet ≈ tens of seconds), hence the wide cap.
pub async fn build_pczt(
    bin: &Path,
    ufvk: &str,
    to: &str,
    amount_zat: u64,
    network: &str,
    out_path: &Path,
) -> Result<(), String> {
    let amount = amount_zat.to_string();
    let out = out_path.to_string_lossy();
    run(
        bin,
        &[
            "build-pczt", "--ufvk", ufvk, "--to", to, "--amount-zat", amount.as_str(),
            "--network", network, "-o", out.as_ref(),
        ],
        Duration::from_secs(300),
    )
    .await
    .map(|_| ())
}

/// Build + prove a **sweep** PCZT: the vault's entire spendable balance (minus the ZIP-317 fee)
/// to `to`, leaving zero change. Backs the inheritance release (`--sweep`, no `--amount-zat`).
pub async fn build_pczt_sweep(
    bin: &Path,
    ufvk: &str,
    to: &str,
    network: &str,
    out_path: &Path,
) -> Result<(), String> {
    let out = out_path.to_string_lossy();
    run(
        bin,
        &[
            "build-pczt", "--ufvk", ufvk, "--to", to, "--sweep",
            "--network", network, "-o", out.as_ref(),
        ],
        Duration::from_secs(300),
    )
    .await
    .map(|_| ())
}

/// Run `<signer> sign-and-broadcast … --json` on the proven PCZT: drive the FROST ceremony
/// (guardians co-sign the real sighash) and broadcast, returning the txid. `mode` is `"relay"`
/// (real remote guardians) or `"auto"` (a demo vault's in-process shares); `coordinator` is where
/// the signer's co-signing callback reaches this relay. In relay mode it blocks on a **live human**
/// approving, so the cap is wide (and > the signer's own 300s callback budget).
#[allow(clippy::too_many_arguments)]
#[allow(clippy::too_many_arguments)]
pub async fn sign_and_broadcast(
    bin: &Path,
    pczt_path: &Path,
    vault_id: &str,
    purpose: &str,
    network: &str,
    mode: &str,
    to: &str,
    amount_human: &str,
    coordinator: &str,
) -> Result<SpendOut, String> {
    let pczt = pczt_path.to_string_lossy();
    let stdout = run(
        bin,
        &[
            "sign-and-broadcast", "-i", pczt.as_ref(), "--vault-id", vault_id,
            "--purpose", purpose, "--mode", mode, "--to", to, "--amount", amount_human,
            "--network", network, "--coordinator", coordinator, "--json",
        ],
        Duration::from_secs(360),
    )
    .await?;
    parse_json_line(&stdout).map_err(|e| format!("parsing sign-and-broadcast JSON: {e}"))
}

/// Spawn the signer, capture stdout, and enforce a timeout. Returns stdout on success;
/// on spawn failure / non-zero exit / timeout returns a descriptive `Err`.
async fn run(bin: &Path, args: &[&str], timeout: Duration) -> Result<String, String> {
    let sub = args.first().copied().unwrap_or("");
    let mut cmd = Command::new(bin);
    cmd.args(args)
        .stdin(Stdio::null())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .kill_on_drop(true);

    let output = tokio::time::timeout(timeout, cmd.output())
        .await
        .map_err(|_| format!("signer `{sub}` timed out after {}s", timeout.as_secs()))?
        .map_err(|e| format!("failed to run signer at {}: {e}", bin.display()))?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        // Keep the last few lines — the actionable tail of the error.
        let mut tail: Vec<&str> = stderr.lines().rev().take(4).collect();
        tail.reverse();
        return Err(format!(
            "signer `{sub}` exited with status {:?}: {}",
            output.status.code(),
            tail.join(" | ")
        ));
    }
    Ok(String::from_utf8_lossy(&output.stdout).to_string())
}

/// Parse the last `{…}` line of stdout as JSON (robust to any stray leading output; the
/// signer routes all logs to stderr, so in practice stdout is exactly one JSON line).
fn parse_json_line<T: for<'de> Deserialize<'de>>(stdout: &str) -> Result<T, String> {
    let line = stdout
        .lines()
        .map(str::trim)
        .rev()
        .find(|l| l.starts_with('{'))
        .ok_or_else(|| format!("no JSON object in signer stdout: {stdout:?}"))?;
    serde_json::from_str(line).map_err(|e| format!("{e} (line: {line:?})"))
}
