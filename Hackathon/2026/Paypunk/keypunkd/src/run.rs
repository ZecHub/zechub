use crate::crypto::Keypair;
use crate::keypunk::Keypunk;
use crate::keypunkd::Keypunkd;
use crate::protocol::ProtocolService;
use crate::seed_store::FilesystemSeedStore;
use paypunk_chains_zcash::to_local_params;
use paypunk_ipc::IpcReceiver;
use paypunk_types::ProtocolId;
use tactix::Actor;
use tracing::info;
use tracing_subscriber::EnvFilter;

pub struct Config {
    pub socket_path: String,
    pub data_dir: String,
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
    let seed_store = FilesystemSeedStore::new(
        std::path::PathBuf::from(&config.data_dir)
            .join("seed.enc")
            .into_boxed_path(),
    );

    let (params, network_type) = match config.zcash_network.to_lowercase().as_str() {
        "mainnet" => (
            zcash_protocol::consensus::Network::MainNetwork,
            zcash_protocol::consensus::NetworkType::Main,
        ),
        "testnet" => (
            zcash_protocol::consensus::Network::TestNetwork,
            zcash_protocol::consensus::NetworkType::Test,
        ),
        "regtest" => (
            zcash_protocol::consensus::Network::TestNetwork,
            zcash_protocol::consensus::NetworkType::Regtest,
        ),
        _ => {
            tracing::warn!(
                "unknown zcash network '{}', defaulting to regtest",
                config.zcash_network
            );
            (
                zcash_protocol::consensus::Network::TestNetwork,
                zcash_protocol::consensus::NetworkType::Regtest,
            )
        }
    };

    let mut protocols = ProtocolService::new();
    protocols.register(
        ProtocolId::Zcash,
        Box::new(paypunk_chains_zcash::signer::ZcashSignerProtocol::new(
            to_local_params(params, network_type),
            network_type,
        )),
    );
    protocols.register(
        ProtocolId::Ethereum,
        Box::new(paypunk_chains_ethereum::signer::EthereumSignerProtocol::new()),
    );
    info!("registered protocols: Zcash, Ethereum");

    let inner = Keypunk::new(keystore, seed_store, protocols);
    let keypunkd = Keypunkd::new(inner).start();

    let server = IpcReceiver::bind_with(&config.socket_path, secret, public).await?;
    info!("keypunkd listening on {}", config.socket_path);

    let serve = tokio::spawn(async move {
        if let Err(e) = server.serve(keypunkd).await {
            tracing::error!(error = %e, "server error");
        }
    });

    tokio::signal::ctrl_c().await?;
    info!("shutting down");
    serve.abort();
    Ok(())
}
