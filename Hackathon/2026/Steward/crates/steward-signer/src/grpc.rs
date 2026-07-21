//! Shared gRPC plumbing to a public lightwalletd/Zaino endpoint.
//!
//! Builds a `tonic 0.14` [`Channel`] (TLS via the `tls-webpki-roots` + `tls-ring` features)
//! and wraps zcb's generated [`CompactTxStreamerClient`]. Used by [`crate::sync`] (scan) and
//! [`crate::broadcast`] (SendTransaction). No local node — a public endpoint is all we need.
//!
//! Verified live (2026-07-07) against `https://zaino.testnet.unsafe.zec.rocks:443`.

use anyhow::{Context, Result};
use tonic::transport::{Channel, ClientTlsConfig, Endpoint};
use zcash_client_backend::proto::service::{
    compact_tx_streamer_client::CompactTxStreamerClient, BlockId, ChainSpec,
};
use zcash_protocol::consensus::BlockHeight;

/// Connect to a lightwalletd/Zaino gRPC endpoint and return a ready client.
///
/// `endpoint` — e.g. `https://zaino.testnet.unsafe.zec.rocks:443` (TLS auto-configured for
/// `https://`) or `http://127.0.0.1:9067` (plaintext).
pub async fn connect(endpoint: &str) -> Result<CompactTxStreamerClient<Channel>> {
    let mut ep = Endpoint::from_shared(endpoint.to_string())
        .with_context(|| format!("invalid gRPC endpoint: {endpoint}"))?;
    if endpoint.starts_with("https://") {
        ep = ep
            .tls_config(ClientTlsConfig::new().with_webpki_roots())
            .context("configuring TLS (webpki roots) for the gRPC channel")?;
    }
    let channel = ep
        .connect()
        .await
        .with_context(|| format!("connecting to lightwalletd/Zaino at {endpoint}"))?;

    // Compact-block streams and subtree-root batches can be sizeable; lift the decode cap.
    Ok(CompactTxStreamerClient::new(channel).max_decoding_message_size(256 * 1024 * 1024))
}

/// Fetch the current chain-tip height from the endpoint (used to pick a recent birthday so
/// the scan only touches recent blocks — the whole point of the no-node fast-sync).
pub async fn tip_height(client: &mut CompactTxStreamerClient<Channel>) -> Result<BlockHeight> {
    let latest = client
        .get_latest_block(ChainSpec::default())
        .await
        .context("GetLatestBlock RPC failed")?
        .into_inner();
    Ok(BlockHeight::from_u32(latest.height as u32))
}

/// Fetch the raw `TreeState` at `height` (the block PRIOR to a birthday), for
/// `AccountBirthday::from_treestate`.
pub async fn tree_state_at(
    client: &mut CompactTxStreamerClient<Channel>,
    height: BlockHeight,
) -> Result<zcash_client_backend::proto::service::TreeState> {
    Ok(client
        .get_tree_state(BlockId {
            height: u64::from(height),
            hash: vec![],
        })
        .await
        .with_context(|| format!("GetTreeState RPC failed at height {height}"))?
        .into_inner())
}
