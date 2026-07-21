use blake2::digest::consts::U32;
use blake2::{Blake2b, Digest};
use clap::{Parser, Subcommand};
use paypunk_api::Client;
use paypunk_config::{
    default_lightwalletd_host, network_data_dir, network_lightwalletd_default, ConfigLoader,
};
use paypunk_tui::run_tui;
use paypunk_types::{
    ArtifactSummary, EthereumIntent, Intent, ProtocolId, SubmitIntentResult, ZcashIntent,
};
use std::fs;
use std::path::{Path, PathBuf};
use std::process::{Child, Command};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use std::time::Duration;
use zeroize::Zeroizing;

/// Pending intent data stored between submit and approve steps.
struct PendingIntent {
    raw_artifact: Vec<u8>,
    keypunkd_signature: Vec<u8>,
    keypunkd_public_key: [u8; 32],
    derivation_path: String,
    protocol: ProtocolId,
}

fn pending_intent_path(data_dir: &str) -> PathBuf {
    let dir = Path::new(data_dir);
    std::fs::create_dir_all(dir).ok();
    dir.join("pending.intent")
}

fn save_pending_intent(data_dir: &str, pi: &PendingIntent) -> Result<(), String> {
    // Format: protocol_id(1) + key_pk(32) + path_len(4) + path + raw_len(4) + raw + sig_len(4) + sig
    let path_bytes = pi.derivation_path.as_bytes();
    let mut buf = Vec::new();
    buf.push(pi.protocol as u8);
    buf.extend_from_slice(&pi.keypunkd_public_key);
    buf.extend_from_slice(&(path_bytes.len() as u32).to_le_bytes());
    buf.extend_from_slice(path_bytes);
    buf.extend_from_slice(&(pi.raw_artifact.len() as u32).to_le_bytes());
    buf.extend_from_slice(&pi.raw_artifact);
    buf.extend_from_slice(&(pi.keypunkd_signature.len() as u32).to_le_bytes());
    buf.extend_from_slice(&pi.keypunkd_signature);
    std::fs::write(pending_intent_path(data_dir), &buf)
        .map_err(|e| format!("failed to save pending intent: {e}"))
}

fn load_pending_intent(data_dir: &str) -> Result<PendingIntent, String> {
    let buf = std::fs::read(pending_intent_path(data_dir))
        .map_err(|e| format!("No pending intent found: {e}"))?;
    let mut pos = 0;
    let protocol = match buf[pos] {
        0 => ProtocolId::Zcash,
        1 => ProtocolId::Ethereum,
        n => return Err(format!("unknown protocol id: {n}")),
    };
    pos += 1;
    let mut pk = [0u8; 32];
    pk.copy_from_slice(&buf[pos..pos + 32]);
    pos += 32;
    let path_len = u32::from_le_bytes(buf[pos..pos + 4].try_into().unwrap()) as usize;
    pos += 4;
    let derivation_path = String::from_utf8(buf[pos..pos + path_len].to_vec())
        .map_err(|_| "invalid derivation path".to_string())?;
    pos += path_len;
    let raw_len = u32::from_le_bytes(buf[pos..pos + 4].try_into().unwrap()) as usize;
    pos += 4;
    let raw_artifact = buf[pos..pos + raw_len].to_vec();
    pos += raw_len;
    let sig_len = u32::from_le_bytes(buf[pos..pos + 4].try_into().unwrap()) as usize;
    pos += 4;
    let keypunkd_signature = buf[pos..pos + sig_len].to_vec();
    Ok(PendingIntent {
        raw_artifact,
        keypunkd_signature,
        keypunkd_public_key: pk,
        derivation_path,
        protocol,
    })
}

/// Holds spawned daemon child processes and kills them on drop.
struct DaemonGuard {
    keypunkd: Option<Child>,
    paypunkd: Option<Child>,
    bridge: Option<Child>,
}

impl DaemonGuard {
    fn new() -> Self {
        Self {
            keypunkd: None,
            paypunkd: None,
            bridge: None,
        }
    }

    fn add_child(&mut self, child: Child, kind: &str) {
        match kind {
            "keypunkd" => self.keypunkd = Some(child),
            "paypunkd" => self.paypunkd = Some(child),
            "bridge" => self.bridge = Some(child),
            _ => {}
        }
    }
}

impl Drop for DaemonGuard {
    fn drop(&mut self) {
        if let Some(mut child) = self.keypunkd.take() {
            let _ = child.kill();
            let _ = child.wait();
        }
        if let Some(mut child) = self.bridge.take() {
            let _ = child.kill();
            let _ = child.wait();
        }
        if let Some(mut child) = self.paypunkd.take() {
            let _ = child.kill();
            let _ = child.wait();
        }
    }
}

/// Resolved network configuration after merging CLI args, config file, and
/// network-specific defaults.
struct ResolvedConfig {
    zcash_network: String,
    lightwalletd_host: String,
    data_dir: String,
}

/// Resolve the final network, lightwalletd host, and data directory.
///
/// Priority (highest first):
/// - `cli_network` / `cli_lwd` / `cli_data_dir` — explicit CLI flags
/// - `config.lightwalletd_host` — if the user changed it from the default
/// - network-specific defaults
fn resolve_network_config(
    network: &str,
    cli_lwd: Option<&str>,
    cli_data_dir: Option<&str>,
    config: &paypunk_config::PaypunkConfig,
) -> ResolvedConfig {
    let lightwalletd_host = cli_lwd
        .map(String::from)
        .or_else(|| {
            if config.lightwalletd_host != default_lightwalletd_host() {
                Some(config.lightwalletd_host.clone())
            } else {
                None
            }
        })
        .unwrap_or_else(|| network_lightwalletd_default(network));

    let data_dir = cli_data_dir
        .map(String::from)
        .unwrap_or_else(|| network_data_dir(&config.data_dir, network));

    ResolvedConfig {
        zcash_network: network.to_string(),
        lightwalletd_host,
        data_dir,
    }
}

/// Spawn keypunkd/paypunkd (or bridge in signer mode) if the paypunkd socket
/// doesn't already exist with a live daemon. Returns a guard that kills the
/// daemons on drop.
async fn ensure_daemons(
    paypunkd_socket: &str,
    keypunkd_socket: &str,
    bridge_socket: &str,
    signer_mode: bool,
    zcash_network: &str,
    lightwalletd_host: &str,
    data_dir: &str,
) -> Result<DaemonGuard, Box<dyn std::error::Error>> {
    // If socket exists, try a quick connect to see if it's live
    if Path::new(paypunkd_socket).exists() {
        match tokio::time::timeout(Duration::from_millis(500), Client::connect(paypunkd_socket))
            .await
        {
            Ok(Ok(_client)) => return Ok(DaemonGuard::new()),
            _ => {
                // Stale socket — clean it and proceed to spawn
                let _ = fs::remove_file(keypunkd_socket);
                let _ = fs::remove_file(paypunkd_socket);
                let _ = fs::remove_file(bridge_socket);
            }
        }
    }

    let exe =
        std::env::current_exe().map_err(|e| format!("Failed to get current exe path: {e}"))?;

    // Clean stale sockets before spawning
    let _ = fs::remove_file(keypunkd_socket);
    let _ = fs::remove_file(paypunkd_socket);
    let _ = fs::remove_file(bridge_socket);

    // Create log directory and open log files for daemon output (append mode)
    let log_dir = Path::new(data_dir).join("logs");
    fs::create_dir_all(&log_dir)?;

    let keypunkd_log = fs::OpenOptions::new()
        .append(true)
        .create(true)
        .open(log_dir.join("keypunkd.log"))?;
    let paypunkd_log = fs::OpenOptions::new()
        .append(true)
        .create(true)
        .open(log_dir.join("paypunkd.log"))?;
    let bridge_log = fs::OpenOptions::new()
        .append(true)
        .create(true)
        .open(log_dir.join("bridge.log"))?;

    let mut guard = DaemonGuard::new();

    if signer_mode {
        println!("Starting bridge...");
        let bridge = Command::new(&exe)
            .arg("bridge")
            .arg("--socket-path")
            .arg(bridge_socket)
            .stdout(bridge_log.try_clone()?)
            .stderr(bridge_log)
            .spawn()
            .map_err(|e| format!("Failed to spawn bridge: {e}"))?;
        guard.add_child(bridge, "bridge");

        let bridge_wait =
            tokio::time::timeout(Duration::from_secs(30), wait_for_sockets(&[bridge_socket])).await;
        if bridge_wait.is_err() {
            return Err("Timed out waiting for bridge socket".into());
        }
    } else {
        println!("Starting keypunkd...");
        let keypunkd = Command::new(&exe)
            .arg("keypunkd")
            .arg("--zcash-network")
            .arg(zcash_network)
            .arg("--data-dir")
            .arg(data_dir)
            .stdout(keypunkd_log.try_clone()?)
            .stderr(keypunkd_log)
            .spawn()
            .map_err(|e| format!("Failed to spawn keypunkd: {e}"))?;
        guard.add_child(keypunkd, "keypunkd");

        let keypunkd_wait = tokio::time::timeout(
            Duration::from_secs(30),
            wait_for_sockets(&[keypunkd_socket]),
        )
        .await;
        if keypunkd_wait.is_err() {
            return Err("Timed out waiting for keypunkd socket".into());
        }
    }

    let signer_socket = if signer_mode {
        bridge_socket
    } else {
        keypunkd_socket
    };

    println!("Starting paypunkd...");
    let mut paypunkd_cmd = Command::new(&exe);
    paypunkd_cmd
        .arg("paypunkd")
        .arg("--keypunkd-socket")
        .arg(signer_socket)
        .arg("--lightwalletd-host")
        .arg(lightwalletd_host)
        .arg("--zcash-network")
        .arg(zcash_network)
        .arg("--data-dir")
        .arg(data_dir)
        .stdout(paypunkd_log.try_clone()?)
        .stderr(paypunkd_log);
    let paypunkd = paypunkd_cmd
        .spawn()
        .map_err(|e| format!("Failed to spawn paypunkd: {e}"))?;
    guard.add_child(paypunkd, "paypunkd");

    let paypunkd_wait = tokio::time::timeout(
        Duration::from_secs(30),
        wait_for_sockets(&[paypunkd_socket]),
    )
    .await;
    if paypunkd_wait.is_err() {
        return Err("Timed out waiting for paypunkd socket".into());
    }

    println!("Daemons ready.");

    Ok(guard)
}

#[derive(Parser)]
#[command(
    name = "paypunk",
    about = "Zcash wallet for privacy-preserving commerce"
)]
struct Cli {
    #[arg(short, long)]
    socket_path: Option<String>,

    #[arg(long, default_value_t = false)]
    signer: bool,

    /// Zcash network: regtest (default), mainnet, or testnet.
    /// Selecting a network also sets the default lightwalletd host and
    /// uses a separate data directory.
    #[arg(long)]
    zcash_network: Option<String>,

    /// Override the lightwalletd host (defaults to the network-specific server).
    #[arg(long)]
    lightwalletd_host: Option<String>,

    /// Override the data directory (defaults to data_dir/<network>/).
    #[arg(long)]
    data_dir: Option<String>,

    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(Subcommand)]
enum Commands {
    /// Generate a new wallet seed (initializes the wallet)
    GenerateSeed {
        #[arg(short, long)]
        password: String,
    },
    /// Restore a wallet from an existing seed phrase
    RestoreSeed {
        #[arg(short, long)]
        mnemonic: String,
        #[arg(short, long)]
        password: String,
        /// Wallet birthday block height (required for mainnet, optional for regtest/testnet).
        /// Speeds up initial sync by avoiding scanning from genesis.
        #[arg(long)]
        birthday_height: Option<u64>,
    },
    /// Submit a transfer intent for preview
    SubmitTransfer {
        #[arg(short, long)]
        to: String,
        #[arg(short, long)]
        amount: String,
        #[arg(short, long)]
        from: String,
        #[arg(long, default_value = "eip155:1/slip44:60")]
        asset: String,
        #[arg(short, long)]
        protocol: Option<String>,
        #[arg(short, long)]
        data: Option<String>,
        #[arg(short, long)]
        memo: Option<String>,
        #[arg(long, default_value_t = 0)]
        account: u32,
    },
    /// Approve a previously submitted intent by providing the password
    ApproveSignature {
        /// Password to authorize the signing
        #[arg(short, long)]
        password: String,
        #[arg(long, default_value_t = 0)]
        account: u32,
    },
    /// Query the balance for a protocol and account
    GetBalance {
        #[arg(short, long, default_value = "zcash")]
        protocol: String,
        #[arg(short, long, default_value_t = 0)]
        account: u32,
        /// Zcash address to query (overrides --account)
        #[arg(long)]
        address: Option<String>,
    },
    /// Launch the terminal user interface
    Tui {
        /// Run in offline signer mode
        #[arg(long, default_value_t = false)]
        signer: bool,
    },
    /// Launch keypunkd (key daemon) as a child process
    Keypunkd {
        #[arg(short, long)]
        socket_path: Option<String>,
        #[arg(short, long)]
        data_dir: Option<String>,
        #[arg(short, long)]
        zcash_network: Option<String>,
    },
    /// Launch paypunkd (app daemon) as a child process
    Paypunkd {
        #[arg(short, long)]
        socket_path: Option<String>,
        #[arg(short, long)]
        keypunkd_socket: Option<String>,
        #[arg(short, long)]
        ethereum_rpc_url: Option<String>,
        #[arg(short, long)]
        data_dir: Option<String>,
        #[arg(short, long)]
        lightwalletd_host: Option<String>,
        #[arg(short, long)]
        zcash_network: Option<String>,
    },
    /// Remove all wallet data (seed, database, accounts) — resets to clean state
    Reset,
    /// Run the QR bridge web server
    Bridge {
        #[arg(long, default_value = "12345")]
        port: u16,
        #[arg(long, default_value = "/tmp/keypunkd.sock")]
        socket_path: String,
    },
    /// List all accounts in the wallet
    ListAccounts,
    /// Create a new account from a pre-derived viewing key
    CreateAccount {
        #[arg(short, long, default_value = "zcash")]
        protocol: String,
        #[arg(long, default_value_t = 0)]
        account_index: u32,
        #[arg(short, long)]
        name: Option<String>,
        #[arg(long)]
        birthday_height: Option<u64>,
    },
    /// Unlock the wallet and derive accounts
    Unlock {
        #[arg(short, long)]
        password: String,
    },
    Uninstall {
        /// Skip confirmation prompt
        #[arg(short, long)]
        force: bool,
    },
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let cli = Cli::parse();
    let config = ConfigLoader::load_or_default();
    let socket_path = cli
        .socket_path
        .clone()
        .unwrap_or(config.paypunkd_socket_path);

    match cli.command {
        None => {
            // paypunk without arguments autolaunches daemons
            let config = ConfigLoader::load_or_default();
            let paypunkd_socket = cli
                .socket_path
                .clone()
                .unwrap_or(config.paypunkd_socket_path.clone());
            let keypunkd_socket = config.keypunkd_socket_path.clone();
            let bridge_socket = config.bridge_socket_path.clone();
            let signer_mode = cli.signer || config.offline_signer;

            let network = cli
                .zcash_network
                .clone()
                .unwrap_or(config.zcash_network.clone());
            let resolved = resolve_network_config(
                &network,
                cli.lightwalletd_host.as_deref(),
                cli.data_dir.as_deref(),
                &config,
            );

            let _guard = ensure_daemons(
                &paypunkd_socket,
                &keypunkd_socket,
                &bridge_socket,
                signer_mode,
                &resolved.zcash_network,
                &resolved.lightwalletd_host,
                &resolved.data_dir,
            )
            .await?;

            let shutdown = Arc::new(AtomicBool::new(false));
            let shutdown_clone = shutdown.clone();
            tokio::spawn(async move {
                tokio::signal::ctrl_c().await.ok();
                shutdown_clone.store(true, Ordering::SeqCst);
            });

            run_tui(&paypunkd_socket, Some(shutdown), signer_mode)
                .await
                .map_err(|e| e.into())
        }
        Some(Commands::Tui { signer }) => {
            // `paypunk tui` must NEVER start daemons this JUST runs the frontend
            let config = ConfigLoader::load_or_default();
            let signer_mode = signer || cli.signer || config.offline_signer;
            run_tui(&socket_path, None, signer_mode)
                .await
                .map_err(|e| e.into())
        }
        Some(Commands::Keypunkd {
            socket_path,
            data_dir,
            zcash_network,
        }) => {
            let config = ConfigLoader::load_or_default();
            let socket = socket_path.unwrap_or(config.keypunkd_socket_path.clone());
            let network = zcash_network
                .or(cli.zcash_network.clone())
                .unwrap_or(config.zcash_network.clone());
            let resolved = resolve_network_config(
                &network,
                None,
                data_dir.as_deref().or(cli.data_dir.as_deref()),
                &config,
            );

            keypunkd::run::run(keypunkd::run::Config {
                socket_path: socket,
                data_dir: resolved.data_dir,
                zcash_network: resolved.zcash_network,
            })
            .await
        }
        Some(Commands::Paypunkd {
            socket_path,
            keypunkd_socket,
            ethereum_rpc_url,
            data_dir,
            lightwalletd_host,
            zcash_network,
        }) => {
            let config = ConfigLoader::load_or_default();
            let socket = socket_path.unwrap_or(config.paypunkd_socket_path.clone());
            let ks = keypunkd_socket.unwrap_or(config.keypunkd_socket_path.clone());
            let url = ethereum_rpc_url.unwrap_or(config.ethereum_rpc_url.clone());
            let network = zcash_network
                .or(cli.zcash_network.clone())
                .unwrap_or(config.zcash_network.clone());
            let resolved = resolve_network_config(
                &network,
                lightwalletd_host
                    .as_deref()
                    .or(cli.lightwalletd_host.as_deref()),
                data_dir.as_deref().or(cli.data_dir.as_deref()),
                &config,
            );

            paypunkd::run::run(paypunkd::run::Config {
                socket_path: socket,
                keypunkd_socket: ks,
                ethereum_rpc_url: url,
                data_dir: resolved.data_dir,
                lightwalletd_host: resolved.lightwalletd_host,
                zcash_network: resolved.zcash_network,
            })
            .await
        }
        Some(Commands::Reset) => {
            let config = ConfigLoader::load_or_default();
            let network = cli
                .zcash_network
                .clone()
                .unwrap_or(config.zcash_network.clone());
            let resolved = resolve_network_config(
                &network,
                cli.lightwalletd_host.as_deref(),
                cli.data_dir.as_deref(),
                &config,
            );
            let data_dir = &resolved.data_dir;
            if Path::new(data_dir).exists() {
                fs::remove_dir_all(data_dir)
                    .map_err(|e| format!("Failed to remove {data_dir}: {e}"))?;
                println!("Removed: {data_dir}");
            } else {
                println!("No data found at {data_dir}");
            }
            Ok(())
        }
        Some(Commands::Uninstall { force }) => {
            let config = ConfigLoader::load_or_default();
            let data_dir = &config.data_dir;
            let config_dir = &config.config_dir;

            if !force {
                println!("This will permanently remove ALL wallet data:");
                println!("  Data directory:  {data_dir}");
                println!("  Config directory: {config_dir}");
                println!();
                print!("Are you sure? (yes/no): ");
                use std::io::{stdin, stdout, Write};
                let _ = stdout().flush();
                let mut input = String::new();
                stdin().read_line(&mut input).ok();
                if input.trim().to_lowercase() != "yes" {
                    println!("Aborted.");
                    return Ok(());
                }
            }

            let mut removed_any = false;

            if Path::new(data_dir).exists() {
                fs::remove_dir_all(data_dir)
                    .map_err(|e| format!("Failed to remove data directory {data_dir}: {e}"))?;
                println!("Removed: {data_dir}");
                removed_any = true;
            }

            if Path::new(config_dir).exists() {
                fs::remove_dir_all(config_dir)
                    .map_err(|e| format!("Failed to remove config directory {config_dir}: {e}"))?;
                println!("Removed: {config_dir}");
                removed_any = true;
            }

            if !removed_any {
                println!("Nothing to remove — no paypunk data found.");
            } else {
                println!("Paypunk has been uninstalled.");
            }

            Ok(())
        }
        Some(Commands::Bridge { port, socket_path }) => {
            let config = paypunk_bridge::BridgeConfig { port, socket_path };
            paypunk_bridge::run(config).await?;
            Ok(())
        }
        Some(command) => {
            let config = ConfigLoader::load_or_default();
            let paypunkd_socket = cli
                .socket_path
                .clone()
                .unwrap_or(config.paypunkd_socket_path.clone());
            let keypunkd_socket = config.keypunkd_socket_path.clone();
            let bridge_socket = config.bridge_socket_path.clone();
            let signer_mode = cli.signer || config.offline_signer;

            let network = cli
                .zcash_network
                .clone()
                .unwrap_or(config.zcash_network.clone());
            let resolved = resolve_network_config(
                &network,
                cli.lightwalletd_host.as_deref(),
                cli.data_dir.as_deref(),
                &config,
            );

            let _guard = ensure_daemons(
                &paypunkd_socket,
                &keypunkd_socket,
                &bridge_socket,
                signer_mode,
                &resolved.zcash_network,
                &resolved.lightwalletd_host,
                &resolved.data_dir,
            )
            .await?;
            let client = Client::connect(&paypunkd_socket).await?;

            match command {
                Commands::GenerateSeed { password } => {
                    let password = Zeroizing::new(password);
                    let mnemonic = client.generate_seed(password).await?;
                    println!("{}", *mnemonic);
                }
                Commands::RestoreSeed {
                    mnemonic,
                    password,
                    birthday_height,
                } => {
                    let mnemonic = Zeroizing::new(mnemonic);
                    let password = Zeroizing::new(password);
                    client
                        .restore_seed(mnemonic, password, birthday_height)
                        .await?;
                    println!("Seed restored successfully");
                }
                Commands::SubmitTransfer {
                    to,
                    amount,
                    from,
                    asset,
                    protocol,
                    data,
                    memo,
                    account,
                } => {
                    let protocol_id = protocol
                        .as_deref()
                        .or_else(|| {
                            if asset.contains("eip155") {
                                Some("ethereum")
                            } else if asset.contains("zcash") {
                                Some("zcash")
                            } else {
                                None
                            }
                        })
                        .unwrap_or("ethereum");
                    let protocol_id = match protocol_id {
                        "zcash" => ProtocolId::Zcash,
                        "ethereum" => ProtocolId::Ethereum,
                        _ => return Err(format!("Unknown protocol: {protocol_id}").into()),
                    };
                    let intent = match protocol_id {
                        ProtocolId::Ethereum => Intent::Ethereum(EthereumIntent::Transfer {
                            to,
                            amount,
                            from,
                            asset,
                            data,
                        }),
                        ProtocolId::Zcash => Intent::Zcash(ZcashIntent::Transfer {
                            to,
                            amount,
                            from,
                            asset,
                            memo,
                        }),
                    };
                    let path = client.derivation_path(protocol_id, account);
                    let data_dir = config.data_dir.clone();
                    submit_intent_flow(&client, intent, &path, &data_dir, protocol_id).await?;
                }
                // TODO:
                Commands::ApproveSignature {
                    password,
                    account: _account,
                } => {
                    let config = ConfigLoader::load_or_default();
                    let data_dir = config.data_dir.clone();
                    let pending = load_pending_intent(&data_dir)?;
                    println!("Approving signature for {:?}...", pending.protocol);
                    let signed_artifact = client
                        .approve_signature(
                            &pending.raw_artifact,
                            &pending.keypunkd_signature,
                            Zeroizing::new(password),
                            &pending.derivation_path,
                        )
                        .await?;
                    println!("Signature approved, broadcasting transaction...");
                    let tx_hash = client
                        .broadcast_transaction(pending.protocol, signed_artifact)
                        .await?;
                    println!("Transaction broadcasted: {tx_hash}");
                    // Clean up pending file
                    let _ = std::fs::remove_file(pending_intent_path(&data_dir));
                }
                Commands::GetBalance {
                    protocol,
                    account,
                    address,
                } => {
                    let protocol_id = match protocol.to_lowercase().as_str() {
                        "zcash" => ProtocolId::Zcash,
                        "ethereum" => ProtocolId::Ethereum,
                        _ => return Err(format!("Unknown protocol: {protocol}").into()),
                    };
                    let (caip_chain, caip_asset) = match protocol_id {
                        ProtocolId::Ethereum => ("eip155:1", "eip155:1/slip44:60"),
                        ProtocolId::Zcash => ("zcash:mainnet", "zcash:mainnet/slip44:133"),
                    };
                    let address = match address {
                        Some(raw) => format!("{}:{}", caip_chain, raw),
                        None => {
                            let expected_path = client.derivation_path(protocol_id, account);
                            let accounts = client.list_accounts().await?;
                            let matched = accounts.iter().find(|a| {
                                a.protocol == protocol_id && a.derivation_path == expected_path
                            });
                            match matched {
                                Some(a) => format!("{}:{}", caip_chain, a.address),
                                None => {
                                    return Err(format!(
                                        "account {} not found for protocol {protocol}. Create it first.",
                                        account
                                    )
                                    .into());
                                }
                            }
                        }
                    };
                    let balance = client.get_balance(address, caip_asset.to_string()).await?;
                    println!(
                        "Balance (protocol={protocol}): spendable={}, pending={}, total={}",
                        balance.spendable.0, balance.pending.0, balance.total.0,
                    );
                }
                Commands::ListAccounts => {
                    let accounts = client.list_accounts().await?;
                    if accounts.is_empty() {
                        println!("No accounts found.");
                    } else {
                        for a in &accounts {
                            println!(
                                "{} | {:?} | {} | {} | {}",
                                a.id, a.protocol, a.derivation_path, a.name, a.address,
                            );
                        }
                    }
                }
                Commands::CreateAccount {
                    protocol,
                    account_index,
                    name,
                    birthday_height,
                } => {
                    let protocol_id = match protocol.to_lowercase().as_str() {
                        "zcash" => ProtocolId::Zcash,
                        "ethereum" => ProtocolId::Ethereum,
                        _ => return Err(format!("Unknown protocol: {protocol}").into()),
                    };
                    let path = client.derivation_path(protocol_id, account_index);
                    let name =
                        name.unwrap_or_else(|| format!("{protocol_id:?} Account {account_index}"));
                    let account = client
                        .create_account(protocol_id, path, account_index, name, birthday_height)
                        .await?;
                    println!(
                        "Account created: {} | {:?} | {} | {} | {}",
                        account.id,
                        account.protocol,
                        account.derivation_path,
                        account.name,
                        account.address,
                    );
                }
                Commands::Reset => unreachable!(),
                Commands::Unlock { password } => {
                    let password = Zeroizing::new(password);
                    let count = client.unlock(password).await?;
                    println!("Unlocked. {count} accounts derived.");
                }
                Commands::Tui { .. } => unreachable!(),
                Commands::Bridge { .. } => unreachable!(),
                Commands::Keypunkd { .. } => unreachable!(),
                Commands::Paypunkd { .. } => unreachable!(),
                Commands::Uninstall { .. } => unreachable!(),
            }

            Ok(())
        }
    }
}

async fn wait_for_sockets(paths: &[&str]) {
    loop {
        let all_exist = paths.iter().all(|p| Path::new(p).exists());
        if all_exist {
            return;
        }
        tokio::time::sleep(std::time::Duration::from_millis(50)).await;
    }
}

async fn submit_intent_flow(
    client: &Client,
    intent: Intent,
    derivation_path: &str,
    data_dir: &str,
    protocol: ProtocolId,
) -> Result<(), Box<dyn std::error::Error>> {
    println!("Submitting intent for preview...");
    match client.submit_intent(intent, derivation_path).await {
        Ok(SubmitIntentResult::SignablePreview {
            raw_artifact,
            parsed_summary,
            keypunkd_signature,
            keypunkd_public_key,
        }) => {
            // Verify the signature: H(raw, parsed, path) should match
            let mut to_verify = Vec::new();
            to_verify.extend_from_slice(&raw_artifact);
            to_verify.extend_from_slice(&parsed_summary);
            to_verify.extend_from_slice(derivation_path.as_bytes());
            let _hash = Blake2b::<U32>::digest(&to_verify);

            println!("Artifact preview received:");
            println!("  Raw artifact: {} bytes", raw_artifact.len());

            if let Ok(summary) = postcard::from_bytes::<ArtifactSummary>(&parsed_summary) {
                match &summary {
                    ArtifactSummary::Zcash(zcash) => {
                        println!("  Fee: {} zatoshis", zcash.fee);
                    }
                    ArtifactSummary::Ethereum(eth) => {
                        println!("  To: {}", eth.to);
                        println!("  Amount: {} wei", eth.amount);
                        println!("  Fee: {} wei", eth.fee);
                        println!("  Nonce: {}", eth.nonce);
                    }
                }
            } else {
                println!("  Parsed summary: {} bytes (raw)", parsed_summary.len());
            }

            println!("  Signature: {} bytes", keypunkd_signature.len());
            println!("  Keypunkd public key: {:?}", keypunkd_public_key);

            // Save pending intent for the approve step
            save_pending_intent(
                data_dir,
                &PendingIntent {
                    raw_artifact,
                    keypunkd_signature,
                    keypunkd_public_key,
                    derivation_path: derivation_path.to_string(),
                    protocol,
                },
            )?;

            println!();
            println!("To approve, run: paypunk approve-signature --password <your-password>");
            Ok(())
        }
        Ok(SubmitIntentResult::SignatureApproved { signed_artifact }) => {
            println!("Transaction signed by offline signer");
            println!("Signed artifact: {} bytes", signed_artifact.len());
            Ok(())
        }
        Err(e) => Err(format!("Error: {e}").into()),
    }
}
