//! LightwalletD gRPC client for Zcash.
//!
//! Replaces the old zcashd JSON-RPC client. Instead of speaking the
//! full-node JSON-RPC protocol (which requires a zcashd/zebrad with RPC
//! enabled — something almost no public node exposes), this module speaks the
//! **LightwalletD** gRPC protocol (`cash.z.wallet.sdk.rpc.CompactTxStreamer`),
//! which is what every real Zcash light wallet uses (Zashi, Ywallet, Zkool,
//! Cake Wallet).
//!
//! ## Why LightwalletD
//!
//! - Public LightwalletD servers exist and are meant to be used by arbitrary
//!   clients (unlike P2P nodes, which almost never expose RPC).
//! - It serves **compact blocks**: stripped blocks containing only the
//!   shielded spends/outputs needed to detect payments and scan balances —
//!   ~100x smaller than full blocks, so mobile/CLI wallets can scan the chain.
//! - The server does the heavy indexing; the client does the cryptography.
//!
//! ## Sync-over-async
//!
//! tonic's generated client is async. The rest of zhac is synchronous, so this
//! module owns a dedicated multi-threaded tokio runtime and exposes **blocking**
//! methods (`get_latest_block`, `get_block_range`, …) that internally
//! `block_on` the async client. Streaming RPCs are collected into `Vec`s
//! before returning, keeping the call sites synchronous.

use std::sync::Arc;
use std::time::Duration;

use tonic::transport::{Channel, ClientTlsConfig};
use tonic::Request;

use crate::{Result, ZhacError};

pub mod grpc {
    tonic::include_proto!("cash.z.wallet.sdk.rpc");
}

use grpc::{
    compact_tx_streamer_client::CompactTxStreamerClient, BlockId, BlockRange, ChainSpec, Empty,
    LightdInfo, RawTransaction, TreeState, TxFilter,
};

/// How long to wait for a single gRPC call before giving up.
const RPC_TIMEOUT_SECS: u64 = 30;

/// A sync wrapper over the async LightwalletD gRPC client.
///
/// Construct with [`LightwalletdClient::new`]; all methods are blocking.
pub struct LightwalletdClient {
    /// Endpoint string as given by the user (e.g. `https://lwdv3.zecwallet.co:9067`).
    endpoint: String,
    /// Owned tokio runtime — every async call runs on it.
    rt: tokio::runtime::Runtime,
    /// The async gRPC client, shared (cheaply cloneable) across calls.
    client: CompactTxStreamerClient<Channel>,
}

impl std::fmt::Debug for LightwalletdClient {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("LightwalletdClient")
            .field("endpoint", &self.endpoint)
            .finish()
    }
}

impl LightwalletdClient {
    /// Connect to a LightwalletD server.
    ///
    /// `endpoint` must be a full gRPC-over-HTTP/2 endpoint, e.g.
    /// `https://lwdv3.zecwallet.co:9067`. Plain `http://` is allowed for
    /// local servers (`http://127.0.0.1:9067`) but a warning is printed for
    /// remote plaintext connections.
    pub fn new(endpoint: &str) -> Result<Self> {
        if endpoint.starts_with("http://")
            && !endpoint.contains("127.0.0.1")
            && !endpoint.contains("localhost")
        {
            eprintln!("WARNING: connecting to a remote LightwalletD server over");
            eprintln!("         plaintext HTTP. Block-hash binding for auth can be");
            eprintln!("         MITM'd. Use https:// for remote servers.");
        }
        if !endpoint.starts_with("http://") && !endpoint.starts_with("https://") {
            return Err(ZhacError::Crypto(format!(
                "endpoint must start with http:// or https:// (got: {endpoint})"
            )));
        }

        let rt = tokio::runtime::Builder::new_multi_thread()
            .enable_all()
            .build()
            .map_err(|e| ZhacError::Crypto(format!("start tokio runtime: {e}")))?;

        let endpoint_url: tonic::transport::Uri = endpoint
            .parse()
            .map_err(|e| ZhacError::Crypto(format!("parse endpoint {endpoint}: {e}")))?;

        let channel = rt.block_on(async {
            let mut builder = Channel::builder(endpoint_url)
                .connect_timeout(Duration::from_secs(10))
                .timeout(Duration::from_secs(RPC_TIMEOUT_SECS));
            if endpoint.starts_with("https://") {
                builder = builder
                    .tls_config(ClientTlsConfig::new().with_webpki_roots())
                    .map_err(|e| ZhacError::Crypto(format!("TLS config: {e}")))?;
            }
            builder
                .connect()
                .await
                .map_err(|e| ZhacError::Crypto(format!("connect to {endpoint}: {e}")))
        })?;

        let client = CompactTxStreamerClient::new(channel);

        Ok(Self {
            endpoint: endpoint.trim_end_matches('/').to_string(),
            rt,
            client,
        })
    }

    /// The endpoint this client is connected to.
    pub fn endpoint(&self) -> &str {
        &self.endpoint
    }

    // ── Internal helper: run a future on our runtime. ────────────────────────
    fn block<T>(&self, fut: impl std::future::Future<Output = Result<T>>) -> Result<T> {
        self.rt.block_on(fut)
    }

    // ── Internal: get a fresh handle to the async client. ───────────────────
    //
    // Each call clones the client (cheap — it shares the underlying Channel),
    // so the `&mut self` from the generated async API is satisfied without
    // requiring `&mut self` on our sync wrapper.
    fn async_client(&self) -> CompactTxStreamerClient<Channel> {
        self.client.clone()
    }

    // ── RPCs ─────────────────────────────────────────────────────────────────

    /// `GetLatestBlock` — the tip of the best chain (height + hash).
    ///
    /// This is the chain-state anchor used by `mainnet-info`,
    /// `auth-challenge`, and `auth-verify`. `hash` is in the canonical
    /// little-endian byte form returned by LightwalletD; we hex-encode it
    /// reversed to display the big-endian explorer form.
    pub fn get_latest_block(&self) -> Result<ChainTip> {
        let mut client = self.async_client();
        self.block(async move {
            let resp = client
                .get_latest_block(Request::new(ChainSpec {}))
                .await
                .map_err(rpc_err("GetLatestBlock"))?
                .into_inner();
            Ok(ChainTip {
                height: resp.height,
                hash: resp.hash.clone(),
            })
        })
    }

    /// `GetLightdInfo` — server/chain metadata (version, chain name,
    /// sapling activation height, consensus branch id, …).
    pub fn get_lightd_info(&self) -> Result<LightdInfo> {
        let mut client = self.async_client();
        self.block(async move {
            let resp = client
                .get_lightd_info(Request::new(Empty {}))
                .await
                .map_err(rpc_err("GetLightdInfo"))?
                .into_inner();
            Ok(resp)
        })
    }

    /// `GetTreeState` at a given height — the Sapling/Orchard note
    /// commitment tree state. Used to (re)start a balance scan mid-chain.
    pub fn get_tree_state(&self, height: u64) -> Result<TreeState> {
        let mut client = self.async_client();
        self.block(async move {
            let resp = client
                .get_tree_state(Request::new(BlockId {
                    height,
                    hash: Vec::new(),
                }))
                .await
                .map_err(rpc_err("GetTreeState"))?
                .into_inner();
            Ok(resp)
        })
    }

    /// `GetBlockRange` — stream of compact blocks `[start, end]` inclusive,
    /// collected into a `Vec`. Used by the Sapling balance scanner.
    pub fn get_block_range(
        &self,
        start: u64,
        end: u64,
        on_progress: Option<&dyn Fn(u64)>,
    ) -> Result<Vec<grpc::CompactBlock>> {
        let mut client = self.async_client();
        let progress = on_progress.map(Arc::new);
        self.block(async move {
            let stream = client
                .get_block_range(Request::new(BlockRange {
                    start: Some(BlockId {
                        height: start,
                        hash: Vec::new(),
                    }),
                    end: Some(BlockId {
                        height: end,
                        hash: Vec::new(),
                    }),
                }))
                .await
                .map_err(rpc_err("GetBlockRange"))?
                .into_inner();

            let mut out = Vec::new();
            let mut stream = stream;
            let mut last_report = 0u64;
            loop {
                match stream.message().await {
                    Ok(Some(block)) => {
                        let h = block.height;
                        out.push(block);
                        if let Some(cb) = &progress {
                            if h >= last_report + 1000 || h == end {
                                cb(h);
                                last_report = h;
                            }
                        }
                    }
                    Ok(None) => break,
                    Err(e) => return Err(rpc_err("GetBlockRange")(e)),
                }
            }
            Ok(out)
        })
    }

    /// `GetTransaction` — the full raw transaction (bytes) by txid.
    ///
    /// `txid_hex` is the big-endian explorer form; LightwalletD expects the
    /// little-endian byte reversal, which we perform here.
    pub fn get_transaction(&self, txid_hex: &str) -> Result<RawTransaction> {
        let hash_bytes = hex::decode(txid_hex)
            .map_err(|e| ZhacError::Crypto(format!("decode txid: {e}")))?;
        if hash_bytes.len() != 32 {
            return Err(ZhacError::Crypto(format!(
                "txid must be 32 bytes, got {}",
                hash_bytes.len()
            )));
        }
        // txid is displayed big-endian; the wire format is little-endian.
        let mut hash_le = hash_bytes;
        hash_le.reverse();

        let mut client = self.async_client();
        self.block(async move {
            let resp = client
                .get_transaction(Request::new(TxFilter {
                    block: None,
                    index: 0,
                    hash: hash_le,
                }))
                .await
                .map_err(rpc_err("GetTransaction"))?
                .into_inner();
            Ok(resp)
        })
    }
}

/// The chain tip: height + best block hash (raw little-endian bytes from the
/// server).
#[derive(Clone, Debug)]
pub struct ChainTip {
    /// Best chain height.
    pub height: u64,
    /// Best block hash in **little-endian** wire bytes.
    pub hash: Vec<u8>,
}

impl ChainTip {
    /// Best block hash in the big-endian hex form used by block explorers
    /// and by zhac's auth challenge (the displayed/signed form).
    pub fn hash_hex_be(&self) -> String {
        let mut be = self.hash.clone();
        be.reverse();
        hex::encode(be)
    }
}

/// Chain-state info returned by `mainnet-info`-style queries, normalized
/// from `GetLightdInfo` + `GetLatestBlock`.
#[derive(Clone, Debug)]
pub struct ChainInfo {
    /// "main" or "test".
    pub chain: String,
    /// Latest block height on the best chain.
    pub blocks: u64,
    /// Best block hash (big-endian hex, explorer form).
    pub best_block_hash: String,
    /// Estimated height if the server is syncing (== blocks when caught up).
    pub estimated_height: u64,
    /// Sapling activation height.
    pub sapling_activation_height: u64,
    /// Consensus branch id (hex).
    pub consensus_branch_id: String,
    /// lightwalletd server version.
    pub server_version: String,
    /// Underlying zcashd/zebrad subversion string (e.g. "/MagicBean:9.0.6/").
    pub subversion: String,
}

impl LightwalletdClient {
    /// Combined chain-state query: one `GetLightdInfo` + one `GetLatestBlock`.
    /// This is the single call used by `mainnet-info`, `auth-challenge`, and
    /// `auth-verify`.
    pub fn get_chain_info(&self) -> Result<ChainInfo> {
        let info = self.get_lightd_info()?;
        let tip = self.get_latest_block()?;
        Ok(ChainInfo {
            chain: info.chain_name,
            blocks: tip.height,
            best_block_hash: tip.hash_hex_be(),
            estimated_height: info.estimated_height,
            sapling_activation_height: info.sapling_activation_height,
            consensus_branch_id: info.consensus_branch_id,
            server_version: info.version,
            subversion: info.zcashd_subversion,
        })
    }

    /// Look up the block hash at a specific height (big-endian explorer form),
    /// via `GetBlock` + reading its `hash` field. Used by `auth-verify` to
    /// confirm the token's claimed block hash matches the chain at that
    /// height (replay/forgery protection).
    pub fn get_block_hash(&self, height: u64) -> Result<String> {
        let mut client = self.async_client();
        self.block(async move {
            let resp = client
                .get_block(Request::new(BlockId {
                    height,
                    hash: Vec::new(),
                }))
                .await
                .map_err(rpc_err("GetBlock"))?
                .into_inner();
            let mut be = resp.hash;
            be.reverse();
            Ok(hex::encode(be))
        })
    }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/// Map a tonic `Status` error into a `ZhacError` with a useful message,
/// prefixed with the RPC name so call sites stay debuggable.
fn rpc_err(
    rpc: &'static str,
) -> impl Fn(tonic::Status) -> ZhacError {
    move |e: tonic::Status| {
        let code = e.code();
        let msg = e.message();
        match code {
            tonic::Code::Unavailable => ZhacError::Crypto(format!(
                "{rpc}: server unreachable — {msg}. Check the endpoint and network."
            )),
            tonic::Code::Unauthenticated | tonic::Code::PermissionDenied => {
                ZhacError::Crypto(format!("{rpc}: access denied — {msg}"))
            }
            tonic::Code::InvalidArgument => {
                ZhacError::Crypto(format!("{rpc}: bad request — {msg}"))
            }
            tonic::Code::NotFound => ZhacError::Crypto(format!("{rpc}: not found — {msg}")),
            _ => ZhacError::Crypto(format!("{rpc}: gRPC {code} — {msg}")),
        }
    }
}

// ── Tests ───────────────────────────────────────────────────────────────────

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn chain_tip_hash_hex_be_reverses_bytes() {
        let tip = ChainTip {
            height: 1,
            // little-endian wire form
            hash: vec![
                0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e,
                0x0f, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b,
                0x1c, 0x1d, 0x1e, 0x1f, 0x20,
            ],
        };
        // big-endian explorer form = reverse
        assert_eq!(
            tip.hash_hex_be(),
            "201f1e1d1c1b1a191817161514131211100f0e0d0c0b0a090807060504030201"
        );
    }

    #[test]
    fn empty_hash_gives_empty_hex() {
        let tip = ChainTip {
            height: 0,
            hash: Vec::new(),
        };
        assert_eq!(tip.hash_hex_be(), "");
    }

    #[test]
    fn endpoint_must_have_scheme() {
        let r = LightwalletdClient::new("lwdv3.zecwallet.co:9067");
        assert!(r.is_err());
        let err = format!("{}", r.unwrap_err());
        assert!(err.contains("http://") || err.contains("scheme"));
    }

    #[test]
    fn endpoint_https_accepted() {
        // Construction only parses the URL; it does NOT connect, so an
        // unresolvable host still succeeds at the parse/validate stage
        // before attempting a connection.
        let r = LightwalletdClient::new("https://invalid.invalid:9067");
        // This attempts a real connect (10s timeout) and is expected to err,
        // but the error must be a *connection* error, not a parse error.
        let err = match r {
            Ok(_) => String::new(),
            Err(e) => format!("{e}"),
        };
        assert!(
            err.contains("connect") || err.is_empty(),
            "expected connect error, got: {err}"
        );
    }
}
