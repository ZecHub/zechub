use crate::database::Database;
use crate::paypunk::Paypunk;
use crate::paypunkd::Paypunkd;
use crate::protocol_service::ProtocolService;
use keypunkd::crypto::Keypair;
use paypunk_ipc::{IpcReceiver, IpcSender};
use tactix::{Actor, Sender};
use tracing::info;
use tracing_subscriber::EnvFilter;

pub struct Config {
    pub socket_path: String,
    pub keypunkd_socket: String,
    pub ethereum_rpc_url: String,
    pub data_dir: String,
    pub lightwalletd_host: String,
    pub zcash_network: String,
}

pub async fn run(config: Config) -> Result<(), Box<dyn std::error::Error>> {
    let _ = tracing_subscriber::fmt()
        .with_env_filter(
            EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new("info")),
        )
        .try_init();

    let keystore = Keypair::new();
    let (secret, public) = keystore.keypair();

    info!("connecting to keypunkd");
    let keypunkd = {
        let mut retries = 0;
        loop {
            match IpcSender::connect(&config.keypunkd_socket).await {
                Ok(sender) => break sender,
                Err(_e) if retries < 30 => {
                    retries += 1;
                    tokio::time::sleep(std::time::Duration::from_millis(500)).await;
                }
                Err(e) => return Err(e.into()),
            }
        }
    };
    let recipient = keypunkd.recipient();

    // Create protocols
    let mut protocols = ProtocolService::new();

    let zcash_stack = paypunk_chains_zcash::create_protocol(
        std::path::Path::new(&config.data_dir),
        config.lightwalletd_host.clone(),
        &config.zcash_network,
    )
    .await?;
    let zcash = zcash_stack.protocol;
    let zcash_scan_recipient = Some(zcash_stack.sync_recipient);
    protocols.register(Box::new(zcash));

    let eth_client =
        paypunk_chains_ethereum::rpc::HttpRpcClient::new(config.ethereum_rpc_url.clone());
    let ethereum = paypunk_chains_ethereum::protocol::EthereumProtocol::new(eth_client);
    protocols.register(Box::new(ethereum));
    info!("registered protocols: Zcash, Ethereum");

    let db = Database::open(std::path::Path::new(&config.data_dir))
        .map_err(|e| format!("failed to open database: {e}"))?;
    info!("database opened");

    let paypunk = Paypunk::new(recipient, protocols, db, keystore);
    let paypunkd = Paypunkd::new(paypunk).start();

    // Background sync loop — sends to ScanActor so scanning doesn't block
    // the WalletDbActor from handling other requests.
    if let Some(scan_recipient) = zcash_scan_recipient {
        let interval_secs = 10u64;
        tokio::spawn(async move {
            let mut interval = tokio::time::interval(std::time::Duration::from_secs(interval_secs));
            loop {
                interval.tick().await;
                match scan_recipient.ask(paypunk_chains_zcash::Sync).await {
                    Ok(msg) => {
                        tracing::info!(?msg, "sync cycle completed");
                    }
                    Err(e) => {
                        tracing::error!(?e, "sync cycle failed");
                    }
                }
            }
        });
        info!("background sync loop started (interval={interval_secs}s, scan actor)");
    }

    let server = IpcReceiver::bind_with(&config.socket_path, secret, public).await?;
    info!("paypunkd listening on {}", config.socket_path);

    let serve = tokio::spawn(async move {
        if let Err(e) = server.serve(paypunkd).await {
            tracing::error!(error = %e, "server error");
        }
    });

    tokio::signal::ctrl_c().await?;
    info!("shutting down");
    serve.abort();
    Ok(())
}
