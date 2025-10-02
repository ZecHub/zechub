use clap::{Parser, Subcommand};
use gtn_common::{AudioSetupCommand, PaymentPackage};
use gtn_dht::DHTQueryRequest;
use gtn_dht::{DHTConfig, DHTNode};
use gtn_payment::{create_zcash_system, ZConfig};
use libp2p::identity::Keypair;
use rust_decimal::Decimal;

use crate::config::Config;
use crate::service::{BroadcastConfig, BroadcastService, DiscoveryConfig, DiscoveryService};

use tracing_subscriber::{fmt, layer::SubscriberExt, util::SubscriberInitExt, EnvFilter};

mod config;
mod service;

/// Command line interfae for the global transparency network CLI.
#[derive(Parser)]
#[command(name = "gtn")]
#[command(about = "Global Transparency Network Relay Node CLI", long_about = None)]
struct Cli {
    // The corresponding wallet for the relay.
    #[arg(long)]
    mnemonic: Option<String>,

    // The setup fee rate for a relay to setup and open a stream.
    #[arg(long)]
    setup_fee_rate: rust_decimal::Decimal,

    // The fee paid per renewal interval.
    #[arg(long)]
    renewal_fee_rate: rust_decimal::Decimal,

    // Interval at which renewal fee must be paid. Minimum is enforced at 10 minutes.
    #[arg(long, default_value_t = 600000)]
    renewal_interval_ms: u32,

    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    Start,
}

fn init_tracing() -> Result<(), Box<dyn std::error::Error>> {
    let env_filter = EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new("trace"));
    tracing_subscriber::registry()
        .with(env_filter)
        .with(
            fmt::layer()
                .with_target(true)
                .with_thread_ids(true)
                .with_file(true)
                .with_line_number(true),
        )
        .init();
    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenvy::dotenv().ok();
    init_tracing()?;

    let cli = Cli::parse();

    match cli.command {
        Commands::Start => {
            start_relay(
                cli.mnemonic,
                cli.setup_fee_rate,
                cli.renewal_fee_rate,
                cli.renewal_interval_ms,
            )
            .await?
        }
    }

    Ok(())
}

async fn start_relay(
    mnemonic: Option<String>,
    setup_fee_rate: Decimal,
    renewal_fee_rate: Decimal,
    renewal_interval_ms: u32,
) -> Result<(), Box<dyn std::error::Error>> {
    let config = Config::from_env()?;
    let is_development_mode = config.development.is_development_mode;

    let (dht_to_audio_tx, to_audio_from_dht_rx) =
        tokio::sync::mpsc::unbounded_channel::<AudioSetupCommand>();

    let (discovery_to_dht_tx, discovery_to_dht_rx) =
        tokio::sync::mpsc::unbounded_channel::<DHTQueryRequest>();

    let (zdht_tx1, zdht_rx1) = tokio::sync::mpsc::unbounded_channel();
    let (zdht_tx2, zdht_rx2) = tokio::sync::mpsc::unbounded_channel();

    let (zaudio_tx1, zaudio_rx1) = tokio::sync::mpsc::unbounded_channel::<AudioSetupCommand>();

    let z_config = ZConfig {
        wallet_mnemonic: mnemonic,
        zebra_rpc_url: config.zcash.rpc_url.clone(),
        lightwalletd_rpc_url: config.zcash.lightwallet_d_endpoint.clone(),
    };

    let payment_package = PaymentPackage {
        setup_fee_rate,
        renewal_fee_rate,
        renewal_interval_ms,
    };

    let (mut block_monitor, mut payment_monitor) =
        create_zcash_system(z_config, zdht_rx2, zdht_tx1, zaudio_rx1, payment_package.clone())
            .await
            .unwrap();

    let payment_address = payment_monitor.payment_address().await;

    let keypair = Keypair::generate_ed25519();
    let peer_id = keypair.public().to_peer_id();

    let dht_node = DHTNode::new(
        DHTConfig {
            listen_address: config.dht.listen_address.clone(),
            listen_port: if is_development_mode {
                "0".to_string()
            } else {
                config.dht.listen_port.clone()
            },
            keypair,
        },
        payment_address.clone(),
        discovery_to_dht_rx,
        zdht_rx1,
        zdht_tx2,
        dht_to_audio_tx,
    );

    let discovery_service = DiscoveryService::new(DiscoveryConfig {
        peer_id,
        payment_address: payment_address.clone(),
        bind_address: if !is_development_mode {
            format!(
                "{}:{}",
                config.relay.discovery_bind_address, config.relay.discovery_bind_port
            )
        } else {
            format!("{}:{}", config.relay.discovery_bind_address, "8080")
        },
        stream_bind_address: if !is_development_mode {
            format!(
                "{}:{}",
                config.relay.audio_bind_address, config.relay.audio_bind_port
            )
        } else {
            format!("{}:{}", config.relay.audio_bind_address.clone(), "8081")
        },
    });

    let audio_service = BroadcastService::new(
        BroadcastConfig {
            bind_address: if !is_development_mode {
                format!(
                    "{}:{}",
                    config.relay.audio_bind_address, config.relay.audio_bind_port
                )
            } else {
                format!("{}:{}", config.relay.audio_bind_address.clone(), "8081")
            },
        },
        to_audio_from_dht_rx,
        zaudio_tx1,
        payment_address.clone()
    );

    let RelayNode {
        discovery,
        mut audio,
        mut node,
    } = RelayNode {
        discovery: discovery_service,
        audio: audio_service,
        node: dht_node,
    };

    let block_task = tokio::spawn(async move {
    let _  =block_monitor.monitor_blocks().await;
});

let payment_task = tokio::spawn(async move {
    let _ = payment_monitor.monitor_payments().await;
});

let discovery_task = tokio::spawn(async move {
    discovery.start_service(discovery_to_dht_tx).await
});

let audio_task = tokio::spawn(async move {
    audio.start_service(payment_package).await
});

let dht_task = tokio::spawn(async move {
    node.start_service().await
});

// Wait for all tasks
tokio::try_join!(block_task, payment_task, discovery_task, audio_task, dht_task)?;

    Ok(())
}

pub struct RelayNode {
    discovery: DiscoveryService,
    audio: BroadcastService,
    node: DHTNode,
}
