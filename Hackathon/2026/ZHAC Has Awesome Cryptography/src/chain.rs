//! Zcash chain interaction — LightwalletD endpoint discovery, selection, and config persistence.
//!
//! Ships a curated list of public LightwalletD gRPC endpoints (sourced from
//! the Hosh uptime monitor at <https://hosh.zec.rocks/zec>) and probes each
//! in parallel with `GetLightdInfo` to confirm liveness. The user picks one
//! interactively (or enters a custom URL) and the selection is persisted to
//! `~/.zhac/node.json` as an endpoint URL that [`require_node()`] hands to
//! [`crate::lightwalletd::LightwalletdClient`].

use std::fs;
use std::io::{self, Write};
use std::path::PathBuf;

use serde::{Deserialize, Serialize};

use crate::{Result, ZhacError};

// ── Curated public endpoints ────────────────────────────────────────────────

/// A curated public Zcash mainnet LightwalletD endpoint.
#[derive(Clone, Debug)]
pub struct Endpoint {
    /// Human-friendly label (operator / project).
    pub label: &'static str,
    /// Full gRPC-over-HTTP/2 endpoint URL, e.g. `https://zec.rocks:443`.
    pub url: &'static str,
}

/// The curated list of public Zcash mainnet LightwalletD servers.
///
/// Sourced from the Hosh uptime monitor and verified TCP-reachable.
/// Most run on port 443 behind Cloudflare; a few on the traditional 9067.
pub const CURATED_ENDPOINTS: &[Endpoint] = &[
    Endpoint { label: "zec.rocks (CF, 443)",            url: "https://zec.rocks:443" },
    Endpoint { label: "Cake Wallet (CF, 443)",          url: "https://zec-node.cakewallet.com:443" },
    Endpoint { label: "na.zec.rocks (CF, 443)",         url: "https://na.zec.rocks:443" },
    Endpoint { label: "eu.zec.rocks (CF, 443)",         url: "https://eu.zec.rocks:443" },
    Endpoint { label: "ap.zec.rocks (CF, 443)",         url: "https://ap.zec.rocks:443" },
    Endpoint { label: "sa.zec.rocks (CF, 443)",         url: "https://sa.zec.rocks:443" },
    Endpoint { label: "us.zec.stardust.rest (CF, 443)", url: "https://us.zec.stardust.rest:443" },
    Endpoint { label: "eu.zec.stardust.rest (CF, 443)", url: "https://eu.zec.stardust.rest:443" },
    Endpoint { label: "lwd.zcashexplorer.app (9067)",   url: "https://lwd.zcashexplorer.app:9067" },
    Endpoint { label: "carover0.xyz (9067)",            url: "https://carover0.xyz:9067" },
    Endpoint { label: "lwd.z0n.jp (CF, 443)",           url: "https://lwd.z0n.jp:443" },
    Endpoint { label: "cipherscan.app (CF, 443)",       url: "https://lightwalletd.mainnet.cipherscan.app:443" },
    Endpoint { label: "zec.0xrpc.io (CF, 443)",         url: "https://zec.0xrpc.io:443" },
    Endpoint { label: "zcashlw.devshore.ovh (CF, 443)", url: "https://zcashlw.devshore.ovh:443" },
    Endpoint { label: "z.ombie.cash (CF, 443)",         url: "https://z.ombie.cash:443" },
];

// ── Types ──────────────────────────────────────────────────────────────────

/// Persisted endpoint selection.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct NodeConfig {
    /// The LightwalletD gRPC endpoint URL.
    pub endpoint: String,
    /// Human-friendly label.
    pub label: String,
    /// Server version reported at selection time.
    pub version: String,
    /// Chain name ("main" / "test"), if known.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub chain: Option<String>,
    /// Unix timestamp (seconds) when the selection was made.
    pub selected_at: String,
}

// ── Config persistence ──────────────────────────────────────────────────────

/// Return the path to the ZHAC config directory (`~/.zhac/`).
pub fn config_dir() -> Result<PathBuf> {
    let home = std::env::var("HOME")
        .map_err(|_| ZhacError::Crypto("HOME environment variable not set".into()))?;
    let dir = PathBuf::from(home).join(".zhac");
    if !dir.exists() {
        fs::create_dir_all(&dir)?;
    }
    Ok(dir)
}

/// Return the path to the node config file (`~/.zhac/node.json`).
pub fn node_config_path() -> Result<PathBuf> {
    Ok(config_dir()?.join("node.json"))
}

/// Save the selected endpoint config to disk.
pub fn save_node_config(config: &NodeConfig) -> Result<()> {
    let path = node_config_path()?;
    let json = serde_json::to_string_pretty(config)
        .map_err(|e| ZhacError::Crypto(format!("serialize node config: {e}")))?;
    crate::keys::write_file_secure(&path, json.as_bytes())?;
    Ok(())
}

/// Load the saved endpoint config from disk.
pub fn load_node_config() -> Result<NodeConfig> {
    let path = node_config_path()?;
    if !path.exists() {
        return Err(ZhacError::Crypto(
            "No endpoint selected. Run `zhac node-select` to pick one.".into(),
        ));
    }
    let json = fs::read_to_string(&path)?;
    let config: NodeConfig = serde_json::from_str(&json)
        .map_err(|e| ZhacError::Crypto(format!("parse node config: {e}")))?;
    Ok(config)
}

/// Return the LightwalletD endpoint URL of the selected node, or an error.
pub fn require_node() -> Result<String> {
    let config = load_node_config()?;
    Ok(config.endpoint)
}

/// Check if an endpoint has been selected.
pub fn has_node() -> bool {
    node_config_path()
        .map(|p| p.exists())
        .unwrap_or(false)
}

// ── Endpoint probing ────────────────────────────────────────────────────────

/// Outcome of probing a LightwalletD endpoint.
#[derive(Clone, Debug)]
pub struct ProbeResult {
    pub alive: bool,
    pub block_height: u64,
    pub chain: Option<String>,
    pub version: String,
    pub error: Option<String>,
}

/// Probe a single LightwalletD endpoint by connecting and calling `GetLightdInfo`.
pub fn probe_endpoint(url: &str) -> ProbeResult {
    match crate::lightwalletd::LightwalletdClient::new(url) {
        Ok(client) => match client.get_lightd_info() {
            Ok(info) => {
                let tip = client.get_latest_block().map(|t| t.height).unwrap_or(0);
                ProbeResult {
                    alive: true,
                    block_height: tip,
                    chain: Some(info.chain_name.clone()),
                    version: info.version.clone(),
                    error: None,
                }
            }
            Err(e) => ProbeResult {
                alive: false, block_height: 0, chain: None,
                version: String::new(), error: Some(format!("{e}")),
            },
        },
        Err(e) => ProbeResult {
            alive: false, block_height: 0, chain: None,
            version: String::new(), error: Some(format!("{e}")),
        },
    }
}

/// Probe many endpoints in parallel using scoped threads.
fn parallel_probe(endpoints: &[Endpoint]) -> Vec<ProbeResult> {
    use std::sync::Mutex;
    let results: Mutex<Vec<ProbeResult>> =
        Mutex::new((0..endpoints.len()).map(|_| ProbeResult {
            alive: false, block_height: 0, chain: None,
            version: String::new(), error: Some("(not probed)".into()),
        }).collect());

    std::thread::scope(|s| {
        for (i, ep) in endpoints.iter().enumerate() {
            let url = ep.url.to_string();
            let results = &results;
            s.spawn(move || {
                results.lock().unwrap()[i] = probe_endpoint(&url);
            });
        }
    });
    results.into_inner().unwrap()
}

// ── Interactive endpoint selection ──────────────────────────────────────────

/// Run the interactive endpoint selector.
pub fn interactive_select() -> Result<NodeConfig> {
    eprintln!("╔══════════════════════════════════════════════════════════════╗");
    eprintln!("║    ZHAC Node Selector — LightwalletD gRPC Endpoints          ║");
    eprintln!("╚══════════════════════════════════════════════════════════════╝");
    eprintln!();

    loop {
        eprintln!("Options:");
        eprintln!("  1) Browse curated endpoints (probed in parallel)");
        eprintln!("  2) Enter custom endpoint URL (your own lightwalletd)");
        eprintln!("  3) Exit without selecting");
        eprintln!();
        eprint!("Choice (1-3): ");
        io::stderr().flush().ok();

        let mut input = String::new();
        io::stdin().read_line(&mut input)?;
        let choice = input.trim();

        match choice {
            "1" => match browse_endpoints() {
                Ok(config) => return Ok(config),
                Err(e) => { eprintln!("Error: {e}\n"); continue; }
            },
            "2" => match custom_endpoint_entry() {
                Ok(config) => return Ok(config),
                Err(e) => { eprintln!("Error: {e}\n"); continue; }
            },
            "3" => return Err(ZhacError::Crypto("endpoint selection cancelled".into())),
            _ => { eprintln!("Invalid choice. Enter 1, 2, or 3.\n"); }
        }
    }
}

fn browse_endpoints() -> Result<NodeConfig> {
    eprintln!();
    eprintln!("Probing {} curated endpoints in parallel...", CURATED_ENDPOINTS.len());
    eprintln!();

    let probes = parallel_probe(CURATED_ENDPOINTS);
    let alive: Vec<usize> = probes.iter().enumerate().filter(|(_, p)| p.alive).map(|(i, _)| i).collect();

    if alive.is_empty() {
        eprintln!("None of the curated endpoints responded. Try option 2 to enter");
        eprintln!("a custom endpoint URL (your own lightwalletd).");
        return Err(ZhacError::Crypto("no curated endpoints reachable".into()));
    }

    eprintln!("{} endpoint(s) responded:", alive.len());
    eprintln!();
    eprintln!("{:<4} {:<28} {:<40} {:<6} {:<8} {:<10}", "#", "Label", "Endpoint", "Chain", "Block", "Version");
    eprintln!("{}", "-".repeat(98));
    for (rank, &i) in alive.iter().enumerate() {
        let ep = &CURATED_ENDPOINTS[i];
        let p = &probes[i];
        eprintln!("{:<4} {:<28} {:<40} {:<6} {:<8} {:<10}",
            rank + 1, ep.label, ep.url,
            p.chain.as_deref().unwrap_or("?"), p.block_height,
            if p.version.is_empty() { "?" } else { &p.version });
    }
    eprintln!();
    if alive.len() < CURATED_ENDPOINTS.len() {
        eprintln!("Unreachable:");
        for (i, p) in probes.iter().enumerate() {
            if !p.alive {
                eprintln!("  ✗ {:<28} ({})", CURATED_ENDPOINTS[i].label, p.error.as_deref().unwrap_or("unknown"));
            }
        }
        eprintln!();
    }

    loop {
        eprint!("Select endpoint # (or 'c' for custom): ");
        io::stderr().flush().ok();
        let mut input = String::new();
        io::stdin().read_line(&mut input)?;
        let cmd = input.trim();

        if cmd == "c" { return custom_endpoint_entry(); }
        if let Ok(num) = cmd.parse::<usize>() {
            if num == 0 || num > alive.len() { eprintln!("Range: 1-{}", alive.len()); continue; }
            let ep = &CURATED_ENDPOINTS[alive[num - 1]];
            let p = &probes[alive[num - 1]];
            let config = NodeConfig {
                endpoint: ep.url.to_string(),
                label: ep.label.to_string(),
                version: p.version.clone(),
                chain: p.chain.clone(),
                selected_at: std::time::SystemTime::now()
                    .duration_since(std::time::UNIX_EPOCH)
                    .map(|d| format!("{}", d.as_secs()))
                    .unwrap_or_else(|_| "unknown".into()),
            };
            save_node_config(&config)?;
            eprintln!("\nEndpoint saved to ~/.zhac/node.json");
            eprintln!("  Endpoint: {}", config.endpoint);
            eprintln!("  Label:    {}", config.label);
            eprintln!("  Chain:    {}", config.chain.as_deref().unwrap_or("?"));
            eprintln!("  Block:    {}", p.block_height);
            return Ok(config);
        }
        eprintln!("Invalid input. Enter a number or 'c'.");
    }
}

fn custom_endpoint_entry() -> Result<NodeConfig> {
    eprintln!();
    eprintln!("── Custom Endpoint Entry ──");
    eprintln!("Enter the LightwalletD gRPC endpoint URL. Examples:");
    eprintln!("  https://zec.rocks:443           (public, TLS via Cloudflare)");
    eprintln!("  https://lwd.zcashexplorer.app:9067");
    eprintln!("  http://127.0.0.1:9067           (local lightwalletd, plaintext)");
    eprintln!();
    eprint!("Endpoint URL: ");
    io::stderr().flush().ok();

    let mut url_input = String::new();
    io::stdin().read_line(&mut url_input)?;
    let url = url_input.trim().to_string();

    if url.is_empty() { return Err(ZhacError::Crypto("no URL entered".into())); }
    if !url.starts_with("http://") && !url.starts_with("https://") {
        return Err(ZhacError::Crypto("endpoint must start with http:// or https://".into()));
    }

    eprintln!();
    eprint!("Probing {url} (GetLightdInfo) ... ");
    io::stderr().flush().ok();
    let probe = probe_endpoint(&url);

    if probe.alive {
        eprintln!("OK (chain: {}, block {})", probe.chain.as_deref().unwrap_or("?"), probe.block_height);
        let config = NodeConfig {
            endpoint: url.clone(), label: "(custom)".into(),
            version: probe.version.clone(), chain: probe.chain.clone(),
            selected_at: std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .map(|d| format!("{}", d.as_secs()))
                .unwrap_or_else(|_| "unknown".into()),
        };
        save_node_config(&config)?;
        eprintln!("\nEndpoint saved to ~/.zhac/node.json");
        eprintln!("  Endpoint: {}", config.endpoint);
        return Ok(config);
    }

    eprintln!("FAILED ({})", probe.error.as_deref().unwrap_or("unknown"));
    eprint!("\nSave anyway? (y/n): ");
    io::stderr().flush().ok();
    let mut confirm = String::new();
    io::stdin().read_line(&mut confirm)?;
    if confirm.trim().to_lowercase() != "y" {
        return Err(ZhacError::Crypto("endpoint selection cancelled".into()));
    }
    let config = NodeConfig {
        endpoint: url.clone(), label: "(custom, untested)".into(),
        version: String::new(), chain: None,
        selected_at: std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .map(|d| format!("{}", d.as_secs()))
            .unwrap_or_else(|_| "unknown".into()),
    };
    save_node_config(&config)?;
    eprintln!("\nEndpoint saved (untested) to ~/.zhac/node.json");
    Ok(config)
}

// ── Tests ──────────────────────────────────────────────────────────────────

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn curated_endpoints_are_https() {
        assert!(!CURATED_ENDPOINTS.is_empty());
        for ep in CURATED_ENDPOINTS {
            assert!(ep.url.starts_with("https://"), "{} not https", ep.label);
            assert!(!ep.label.is_empty());
        }
    }

    #[test]
    fn node_config_roundtrip() {
        let config = NodeConfig {
            endpoint: "https://zec.rocks:443".into(),
            label: "test".into(), version: "0.4.19".into(),
            chain: Some("main".into()), selected_at: "123".into(),
        };
        let json = serde_json::to_string(&config).unwrap();
        let r: NodeConfig = serde_json::from_str(&json).unwrap();
        assert_eq!(config.endpoint, r.endpoint);
        assert_eq!(config.label, r.label);
    }

    #[test]
    fn probe_endpoint_unreachable() {
        let r = probe_endpoint("http://127.0.0.1:1");
        assert!(!r.alive);
        assert!(r.error.is_some());
    }
}
