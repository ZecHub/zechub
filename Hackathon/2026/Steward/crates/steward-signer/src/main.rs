//! `steward-signer` — CLI over the no-node vault on-chain pipeline.
//!
//! From a FROST group key `ak` to a funded, spendable testnet Orchard account — using only a
//! **public** lightwalletd/Zaino endpoint (no local node):
//! ```text
//! derive-vault  --ak <hex>                     → vault UFVK + receiving UA (deterministic from ak)
//! fund          --address <ua>                 → Fauzec faucet claim → 1 TAZ (poll to confirmation)
//! sync          --ufvk <uview…>                → local WalletDb + scan public endpoint → balance
//! build-pczt    --to <ua> --amount-zat <n>     → propose_transfer + create_pczt + Halo2 prove
//! sign-and-broadcast -i <proven.pczt> --vault-id <id>
//!                                              → zcash-sign ⇄ coordinator FROST sig → extract → broadcast
//! ```
//! Also keeps the original `vault-ufvk` / `sign` subcommands for back-compat.

use std::path::PathBuf;

use anyhow::{anyhow, bail, Context, Result};
use zcash_keys::keys::UnifiedFullViewingKey;
use zcash_protocol::consensus::Network;

use steward_signer::{
    broadcast::broadcast,
    build_pczt::{build_and_prove, build_and_prove_sweep},
    coordinator,
    finalize_extract::{finalize_extract, serialize_transaction},
    fund,
    prove::prove,
    sign::sign_pczt,
    sync::sync_vault,
    vault_ufvk::vault_ufvk,
    Pczt,
};

// Verified live 2026-07-07. Per-network default light-node endpoints (still overridable with
// --server). testnet.zec.rocks answered + synced live (the two docs/PROTOCOL endpoints —
// zaino.testnet.unsafe.zec.rocks, lwd.testnet.zec.pro — were both DOWN at run time: 503 / 521);
// zec.rocks is its mainnet peer.
const DEFAULT_SERVER_TEST: &str = "https://testnet.zec.rocks:443";
const DEFAULT_SERVER_MAIN: &str = "https://zec.rocks:443";
const DEFAULT_FAUCET: &str = "https://fauzec.com";
const DEFAULT_COORDINATOR: &str = "http://127.0.0.1:8080";
const DEFAULT_DATA_DIR: &str = "steward-signer-data";

fn main() -> Result<()> {
    let args: Vec<String> = std::env::args().skip(1).collect();
    let rest = &args.get(1..).unwrap_or(&[]).to_vec();
    match args.first().map(String::as_str) {
        Some("derive-vault") => cmd_derive_vault(rest),
        Some("vault-ufvk") => cmd_vault_ufvk_positional(rest), // back-compat: `vault-ufvk <ak> [main|test]`
        Some("fund") => cmd_fund(rest),
        Some("sync") => cmd_sync(rest),
        Some("build-pczt") => cmd_build_pczt(rest),
        Some("sign-and-broadcast") => cmd_sign_and_broadcast(rest),
        Some("sign") => cmd_sign(rest),
        _ => {
            eprintln!("{USAGE}");
            std::process::exit(2);
        }
    }
}

const USAGE: &str = "\
steward-signer — Steward no-node vault on-chain engine

USAGE:
  steward-signer derive-vault --ak <hex> [--network test|main] [--json]
  steward-signer fund   --address <ua> [--amount-zat <n>] [--captcha <token>]
                        [--faucet <base_url>] [--no-poll]
  steward-signer sync   --ufvk <uview…> [--birthday <height>] [--data-dir <dir>]
                        [--server <grpc_url>] [--network test|main] [--lookback <n>] [--batch <n>] [--json]
  steward-signer build-pczt --to <ua> (--amount-zat <n> | --sweep) [--data-dir <dir>] [-o <out.pczt>]
                        [--network test|main] [--confirmations <n>]
  steward-signer sign-and-broadcast -i <proven.pczt> --vault-id <id>
                        [--coordinator <url>] [--server <grpc_url>] [--network test|main]
                        [--purpose NormalSpend] [-o <raw_tx>]

  # back-compat:
  steward-signer vault-ufvk <ak_hex> [main|test]
  steward-signer sign -i <unproven.pczt> -o <raw_tx> [main|test] [--broadcast <url>]

DEFAULTS: server=testnet.zec.rocks:443 (test) | zec.rocks:443 (main)  faucet=fauzec.com  coordinator=127.0.0.1:8080";

// ── tiny flag parsing ──────────────────────────────────────────────────────────────────────

fn flag<'a>(args: &'a [String], name: &str) -> Option<&'a str> {
    args.iter().position(|a| a == name).and_then(|i| args.get(i + 1)).map(String::as_str)
}
fn has_flag(args: &[String], name: &str) -> bool {
    args.iter().any(|a| a == name)
}
fn network_of(args: &[String]) -> Network {
    match flag(args, "--network") {
        Some("main") => Network::MainNetwork,
        _ => Network::TestNetwork,
    }
}
/// The wire network tag (`"test"` / `"main"`) for `--json` output — matches the
/// coordinator's `network` field vocabulary exactly.
fn network_str(params: &Network) -> &'static str {
    match params {
        Network::MainNetwork => "main",
        _ => "test",
    }
}
/// The default light-node endpoint for a network (overridable with `--server`).
fn default_server(params: &Network) -> &'static str {
    match params {
        Network::MainNetwork => DEFAULT_SERVER_MAIN,
        _ => DEFAULT_SERVER_TEST,
    }
}
fn data_dir_of(args: &[String]) -> PathBuf {
    PathBuf::from(flag(args, "--data-dir").unwrap_or(DEFAULT_DATA_DIR))
}
fn ak_from_hex(hex_str: &str) -> Result<[u8; 32]> {
    let v = hex::decode(hex_str).context("--ak is not valid hex")?;
    <[u8; 32]>::try_from(v.as_slice())
        .map_err(|_| anyhow!("ak must be exactly 32 bytes, got {}", v.len()))
}

// ── derive-vault ────────────────────────────────────────────────────────────────────────────

fn cmd_derive_vault(args: &[String]) -> Result<()> {
    let ak_hex = flag(args, "--ak").context("missing --ak <hex>")?;
    let ak = ak_from_hex(ak_hex)?;
    let params = network_of(args);
    let vault = vault_ufvk(&params, &ak)?;
    if has_flag(args, "--json") {
        // Single clean JSON object on stdout (no log noise) — the coordinator parses this.
        let out = serde_json::json!({
            "network": network_str(&params),
            "ua": vault.receiving_ua,
            "ufvk": vault.ufvk,
        });
        println!("{out}");
    } else {
        println!("Vault receiving UA:       {}", vault.receiving_ua);
        println!("Unified Full Viewing Key: {}", vault.ufvk);
    }
    Ok(())
}

fn cmd_vault_ufvk_positional(args: &[String]) -> Result<()> {
    let ak_hex = args.first().context("missing <ak_hex>")?;
    let ak = ak_from_hex(ak_hex)?;
    let params = match args.get(1).map(String::as_str) {
        Some("main") => Network::MainNetwork,
        _ => Network::TestNetwork,
    };
    let vault = vault_ufvk(&params, &ak)?;
    println!("Unified Full Viewing Key: {}", vault.ufvk);
    println!("Vault receiving UA:       {}", vault.receiving_ua);
    Ok(())
}

// ── fund (Fauzec) ─────────────────────────────────────────────────────────────────────────────

fn cmd_fund(args: &[String]) -> Result<()> {
    let address = flag(args, "--address").context("missing --address <ua>")?;
    let faucet = flag(args, "--faucet").unwrap_or(DEFAULT_FAUCET);
    let network = match network_of(args) {
        Network::MainNetwork => "mainnet",
        Network::TestNetwork => "testnet",
    };
    let captcha = flag(args, "--captcha");
    let amount = flag(args, "--amount-zat").and_then(|s| s.parse::<u64>().ok());

    if captcha.is_none() {
        eprintln!(
            "[fund] NOTE: no --captcha token supplied. Fauzec requires a Cloudflare Turnstile \
             token; the claim will return error_code=captcha_required. Solve the captcha at \
             {faucet} to obtain a token, then pass it via --captcha."
        );
    }

    let resp = fund::claim(faucet, network, address, captcha, amount)?;
    println!("[fund] POST /api/v1/claim → HTTP {}", resp.http_status);
    println!("       state={:?} outcome={:?} error_code={:?}", resp.state, resp.outcome, resp.error_code);
    println!("       request_id={:?} txid={:?}", resp.request_id, resp.txid);
    println!("       raw: {}", resp.raw);

    if let Some(code) = &resp.error_code {
        if !code.is_empty() {
            bail!("faucet refused the claim: error_code={code} (see raw above)");
        }
    }

    if !has_flag(args, "--no-poll") {
        if let Some(rid) = resp.request_id.clone() {
            eprintln!("[fund] polling status until confirmed (up to 300s)…");
            let final_resp = fund::poll_until_terminal(faucet, network, &rid, 300, 10)?;
            println!("[fund] FINAL state={:?} txid={:?}", final_resp.state, final_resp.txid);
            if let Some(txid) = final_resp.txid {
                println!("Funding txid: {txid}");
            }
        }
    }
    Ok(())
}

// ── sync (no-node scan) ───────────────────────────────────────────────────────────────────────

fn cmd_sync(args: &[String]) -> Result<()> {
    let ufvk_str = flag(args, "--ufvk").context("missing --ufvk <uview…>")?;
    let params = network_of(args);
    let server = flag(args, "--server")
        .map(str::to_string)
        .unwrap_or_else(|| default_server(&params).to_string());
    let data_dir = data_dir_of(args);
    let birthday = flag(args, "--birthday")
        .map(|s| s.parse::<u32>().map(zcash_protocol::consensus::BlockHeight::from_u32))
        .transpose()
        .context("--birthday must be a block height")?;
    let lookback: u32 = flag(args, "--lookback").and_then(|s| s.parse().ok()).unwrap_or(2000);
    let batch: u32 = flag(args, "--batch").and_then(|s| s.parse().ok()).unwrap_or(1000);

    let ufvk = UnifiedFullViewingKey::decode(&params, ufvk_str)
        .map_err(|e| anyhow!("decoding UFVK: {e}"))?;

    let rt = tokio::runtime::Builder::new_multi_thread()
        .enable_all()
        .build()
        .context("building tokio runtime")?;
    let outcome = rt.block_on(sync_vault(
        &server, params, &data_dir, &ufvk, birthday, lookback, batch,
    ))?;

    if has_flag(args, "--json") {
        // Single clean JSON object on stdout — all sync progress went to stderr (see sync.rs).
        let out = serde_json::json!({
            "network": network_str(&params),
            "synced": outcome.is_synced,
            "tip_height": u32::from(outcome.chain_tip),
            "total_zat": outcome.total_zat,
            "orchard_zat": outcome.orchard_zat,
            "spendable_zat": outcome.spendable_zat,
        });
        println!("{out}");
        return Ok(());
    }

    println!("──────────── vault sync ────────────");
    println!("account:         {:?}", outcome.account_id);
    println!("birthday:        {}", outcome.birthday);
    println!("chain tip:       {}", outcome.chain_tip);
    println!("fully scanned:   {}", outcome.fully_scanned);
    println!("synced:          {}", outcome.is_synced);
    println!("─────────────── balance ───────────");
    println!("total:           {} zat", outcome.total_zat);
    println!("orchard:         {} zat", outcome.orchard_zat);
    println!("spendable:       {} zat", outcome.spendable_zat);
    if outcome.total_zat > 0 {
        println!("\n✓ FUNDED NOTE DISCOVERED via public endpoint (no node).");
    } else {
        println!("\n(no funds yet — fund the UA first, wait for confirmation, then re-run sync)");
    }
    Ok(())
}

// ── build-pczt ────────────────────────────────────────────────────────────────────────────────

fn cmd_build_pczt(args: &[String]) -> Result<()> {
    let ufvk_str = flag(args, "--ufvk").context("missing --ufvk <uview…>")?;
    let to = flag(args, "--to").context("missing --to <ua>")?;
    // --sweep sends the entire spendable balance (minus fee) to --to, leaving zero change (the
    // inheritance release). Mutually exclusive with --amount-zat.
    let sweep = has_flag(args, "--sweep");
    let params = network_of(args);
    let data_dir = data_dir_of(args);
    let confirmations: u32 = flag(args, "--confirmations").and_then(|s| s.parse().ok()).unwrap_or(1);
    let out = PathBuf::from(flag(args, "-o").unwrap_or("vault-proven.pczt"));

    let ufvk = UnifiedFullViewingKey::decode(&params, ufvk_str)
        .map_err(|e| anyhow!("decoding UFVK: {e}"))?;

    let proven = if sweep {
        build_and_prove_sweep(params, &data_dir, &ufvk, to, confirmations)?
    } else {
        let amount: u64 = flag(args, "--amount-zat")
            .context("missing --amount-zat <n> (or pass --sweep)")?
            .parse()
            .context("--amount-zat must be an integer")?;
        build_and_prove(params, &data_dir, &ufvk, to, amount, confirmations)?
    };
    let bytes = proven.serialize();
    std::fs::write(&out, &bytes).with_context(|| format!("writing PCZT to {}", out.display()))?;
    println!("wrote proven PCZT ({} bytes) to {}", bytes.len(), out.display());
    Ok(())
}

// ── sign-and-broadcast (last mile) ──────────────────────────────────────────────────────────────

fn cmd_sign_and_broadcast(args: &[String]) -> Result<()> {
    let in_path = PathBuf::from(flag(args, "-i").context("missing -i <proven.pczt>")?);
    let vault_id = flag(args, "--vault-id").context("missing --vault-id <id>")?.to_string();
    let coord = flag(args, "--coordinator").unwrap_or(DEFAULT_COORDINATOR).to_string();
    let params = network_of(args);
    let server = flag(args, "--server")
        .map(str::to_string)
        .unwrap_or_else(|| default_server(&params).to_string());
    let purpose = flag(args, "--purpose").unwrap_or("NormalSpend").to_string();
    // Co-signing transport: "auto" (demo shares) or "relay" (real remote guardians).
    let mode = flag(args, "--mode").unwrap_or("auto").to_string();
    // Display metadata for the guardians' approval card (advisory; the sighash is what binds).
    let recipient = flag(args, "--to").map(str::to_string);
    let amount = flag(args, "--amount").map(str::to_string);
    let out = flag(args, "-o").map(PathBuf::from);

    let proven = Pczt::parse(&std::fs::read(&in_path).with_context(|| format!("reading {}", in_path.display()))?)
        .map_err(|e| anyhow!("parsing proven PCZT: {e:?}"))?;

    // FROST seam: each (sighash, α) → coordinator ceremony → aggregated 64-byte sig.
    let seam_err: std::cell::RefCell<Option<anyhow::Error>> = std::cell::RefCell::new(None);
    let signed = sign_pczt(&proven, |sighash, alpha, _idx| {
        let sighash_hex = hex::encode(sighash);
        let randomizer_hex = hex::encode(alpha);
        match coordinator::request_signature(&coordinator::SessionRequest {
            base: &coord,
            vault_id: &vault_id,
            purpose: &purpose,
            sighash_hex: &sighash_hex,
            randomizer_hex: &randomizer_hex,
            mode: &mode,
            recipient: recipient.as_deref(),
            amount: amount.as_deref(),
        }) {
            Ok(sig) => sig,
            Err(e) => {
                *seam_err.borrow_mut() = Some(e);
                [0u8; 64]
            }
        }
    });
    if let Some(e) = seam_err.into_inner() {
        return Err(e.context("coordinator FROST signing failed"));
    }
    let signed = signed?;

    let tx = finalize_extract(signed)?;
    // The ZIP-244 txid is stable over the effecting data (independent of the spend-auth
    // signatures), so it is the canonical id an explorer will show once this broadcasts.
    let txid = tx.txid().to_string();
    let raw = serialize_transaction(&tx)?;
    let json = has_flag(args, "--json");
    if let Some(o) = &out {
        std::fs::write(o, &raw).with_context(|| format!("writing raw tx to {}", o.display()))?;
        if !json {
            println!("wrote {} raw tx bytes to {}", raw.len(), o.display());
        }
    }

    let rt = tokio::runtime::Builder::new_current_thread().enable_all().build()?;
    let msg = rt.block_on(broadcast(server, raw))?;
    if json {
        // One clean JSON line on stdout for the coordinator's /spend to parse.
        println!("{}", serde_json::json!({ "txid": txid, "broadcast": msg }));
    } else {
        println!("broadcast accepted — txid {txid} (server message: {msg:?})");
    }
    Ok(())
}

// ── back-compat `sign` (placeholder signature closure) ─────────────────────────────────────────

fn cmd_sign(args: &[String]) -> Result<()> {
    let mut in_path: Option<PathBuf> = None;
    let mut out_path: Option<PathBuf> = None;
    let mut network: Option<String> = None;
    let mut broadcast_url: Option<String> = None;
    let mut it = args.iter();
    while let Some(a) = it.next() {
        match a.as_str() {
            "-i" => in_path = it.next().map(PathBuf::from),
            "-o" => out_path = it.next().map(PathBuf::from),
            "--broadcast" => broadcast_url = it.next().cloned(),
            "main" | "test" => network = Some(a.clone()),
            other => bail!("unexpected argument: {other}"),
        }
    }
    let in_path = in_path.context("missing -i <unproven.pczt>")?;
    let out_path = out_path.context("missing -o <raw_tx_out>")?;

    let unproven = Pczt::parse(&std::fs::read(&in_path)?)
        .map_err(|e| anyhow!("parsing input PCZT: {e:?}"))?;
    let proven = prove(unproven)?;
    // Back-compat placeholder: applies all-zero (invalid) signatures — kept only so the
    // proof/finalize/extract plumbing can be exercised without a coordinator. The `main`/`test`
    // arg no longer selects a signer binary (signing is inline); it is now ignored.
    let _ = &network;
    let signed = sign_pczt(&proven, |_s, _a, _i| [0u8; 64])?;
    let tx = finalize_extract(signed)?;
    let raw = serialize_transaction(&tx)?;
    std::fs::write(&out_path, &raw)?;
    println!("wrote {} raw tx bytes to {}", raw.len(), out_path.display());

    if let Some(url) = broadcast_url {
        let rt = tokio::runtime::Builder::new_current_thread().enable_all().build()?;
        let msg = rt.block_on(broadcast(url, raw))?;
        println!("broadcast accepted (server message: {msg:?})");
    }
    Ok(())
}
