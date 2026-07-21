//! Zcash light-client wallet (feature `wallet`).
//!
//! Phase 5.1, layer 1: lightwalletd connectivity. Connects to a configurable
//! lightwalletd endpoint over gRPC/TLS and fetches chain info — the foundation
//! the per-group sync + balance build on. Network is selectable (testnet for
//! testing, mainnet once the pipeline is complete).
//!
//! Compact-block sync, account import, and balance reads layer on top of this
//! `CompactTxStreamerClient` in the next increment.

use serde::{Deserialize, Serialize};
use tonic::transport::{Channel, ClientTlsConfig};
use zcash_client_backend::proto::service::{
    compact_tx_streamer_client::CompactTxStreamerClient, Empty,
};
use zcash_protocol::consensus::Network;

use crate::error::CoreError;

/// Which Zcash network the wallet operates on.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum WalletNetwork {
    Test,
    Main,
}

impl WalletNetwork {
    pub fn from_str(s: &str) -> Self {
        match s {
            "main" => WalletNetwork::Main,
            _ => WalletNetwork::Test,
        }
    }

    /// The consensus parameters for this network (used by sync/address logic).
    pub fn params(self) -> Network {
        match self {
            WalletNetwork::Test => Network::TestNetwork,
            WalletNetwork::Main => Network::MainNetwork,
        }
    }

    /// The address/key encoding network type.
    pub fn network_type(self) -> zcash_protocol::consensus::NetworkType {
        match self {
            WalletNetwork::Test => zcash_protocol::consensus::NetworkType::Test,
            WalletNetwork::Main => zcash_protocol::consensus::NetworkType::Main,
        }
    }

    /// A sensible default public lightwalletd endpoint for this network.
    pub fn default_lightwalletd(self) -> &'static str {
        match self {
            WalletNetwork::Test => "https://testnet.zec.rocks:443",
            WalletNetwork::Main => "https://zec.rocks:443",
        }
    }

    /// On-disk directory name for this network's wallet data. Testnet and
    /// mainnet keep entirely separate databases, blocks caches, and pending
    /// transactions, so switching networks never shows one network's balance
    /// while pointed at the other's chain (and testnet data can't corrupt a
    /// mainnet db, or vice versa).
    pub fn dir_name(self) -> &'static str {
        match self {
            WalletNetwork::Test => "testnet",
            WalletNetwork::Main => "mainnet",
        }
    }
}

/// Chain info reported by a lightwalletd server (a connectivity probe).
#[derive(Debug, Clone, Serialize)]
pub struct LightwalletdInfo {
    pub chain_name: String,
    pub block_height: u64,
    pub estimated_height: u64,
    pub vendor: String,
    pub version: String,
    /// The consensus branch id the node currently expects, as lowercase hex
    /// (e.g. `5437f330`). A transaction built for a different branch is rejected
    /// with "incorrect consensus branch id".
    pub consensus_branch_id: String,
    /// The consensus branch id this wallet build would produce at the node's
    /// current height, lowercase hex. Filled in by the command layer (which
    /// knows the configured network). `None` when not computed.
    #[serde(default)]
    pub wallet_branch_id: Option<String>,
    /// True when `wallet_branch_id` matches `consensus_branch_id` — i.e. this
    /// build can create transactions the node will accept. `None` when unknown.
    #[serde(default)]
    pub branch_supported: Option<bool>,
}

/// The consensus branch id this build would use at `height` on `network`, as
/// lowercase 8-digit hex. Compared against the node's expected branch id to
/// detect a network-upgrade (e.g. Ironwood/NU7) mismatch before building a tx.
pub fn branch_id_for_height(network: WalletNetwork, height: u64) -> String {
    use zcash_protocol::consensus::{BlockHeight, BranchId};
    let params = network.params();
    let bid = BranchId::for_height(&params, BlockHeight::from_u32(height as u32));
    format!("{:08x}", u32::from(bid))
}

/// The NU6.3 / Ironwood consensus branch id (little-endian u32, printed as
/// 8-digit hex). Orchard actions mined under this upgrade prove against the
/// `PostNu6_3` circuit (the fixed circuit plus the `disableCrossAddress`
/// constraint). Testnet activated it at 4,134,000; mainnet has not (yet).
const NU6_3_BRANCH_ID: &str = "37a5165b";

/// The Orchard proving/verifying circuit version to use for a transaction mined
/// at `height` on `network`. This MUST match the consensus branch active at that
/// height, or the proof is rejected by the network:
///
/// - Post-NU6.3 (Ironwood, currently testnet only) → `PostNu6_3`.
/// - Post-NU6.2 (mainnet's current activation) → `FixedPostNu6_2`.
///
/// Deriving it from the live branch id — rather than hardcoding one network's
/// value — is what lets the same build produce valid transactions on both
/// networks, and automatically switches mainnet over once it activates NU6.3.
/// Both live networks are past NU6.2, so `FixedPostNu6_2` is the correct floor;
/// the historical `InsecurePreNu6_2` circuit is never used for new sends.
#[cfg(feature = "wallet")]
fn orchard_circuit_version_for_height(
    network: WalletNetwork,
    height: u64,
) -> orchard::circuit::OrchardCircuitVersion {
    use orchard::circuit::OrchardCircuitVersion;
    if branch_id_for_height(network, height) == NU6_3_BRANCH_ID {
        OrchardCircuitVersion::PostNu6_3
    } else {
        OrchardCircuitVersion::FixedPostNu6_2
    }
}

/// Normalize an endpoint: a bare `host:port` (e.g. `tz.ombie.cash:443`) is
/// assumed to be TLS and gets an `https://` scheme.
fn normalize_endpoint(url: &str) -> String {
    let url = url.trim();
    if url.contains("://") {
        url.to_string()
    } else {
        format!("https://{url}")
    }
}

/// True when the host component of a normalized URL is a loopback address —
/// plaintext gRPC is only tolerated against a local node (regtest/dev), never
/// against a remote lightwalletd where the traffic would cross the network.
fn is_loopback_host(normalized_url: &str) -> bool {
    let after_scheme = normalized_url
        .split_once("://")
        .map(|(_, rest)| rest)
        .unwrap_or(normalized_url);
    let host = after_scheme
        .split(['/', ':'])
        .next()
        .unwrap_or("")
        .trim_end_matches('.');
    host.eq_ignore_ascii_case("localhost")
        || host == "127.0.0.1"
        || host == "::1"
        || host == "[::1]"
}

/// Reject a lightwalletd endpoint that would send wallet traffic in cleartext.
/// `http://` is permitted only for loopback hosts (local regtest/dev); any
/// remote plaintext endpoint is refused so compact-block sync, balances, and
/// broadcasts are never exposed on the wire.
pub fn validate_endpoint_security(url: &str) -> Result<(), CoreError> {
    let normalized = normalize_endpoint(url);
    if normalized.starts_with("http://") && !is_loopback_host(&normalized) {
        return Err(CoreError::Connection(format!(
            "refusing plaintext (http://) lightwalletd endpoint '{}': \
             wallet traffic would be unencrypted. Use https:// (or a \
             127.0.0.1 endpoint for local testing).",
            url.trim()
        )));
    }
    Ok(())
}

/// Connect a gRPC client to a lightwalletd endpoint (TLS for `https://`).
async fn connect(url: &str) -> Result<CompactTxStreamerClient<Channel>, CoreError> {
    validate_endpoint_security(url)?;
    let url = normalize_endpoint(url);
    let mut endpoint = Channel::from_shared(url.clone())
        .map_err(|e| CoreError::Connection(format!("invalid lightwalletd URL: {e}")))?
        // Syncing streams compact blocks for minutes at a time. Without
        // keep-alive, a connection that dies silently — a NAT idle timeout, a
        // server restart, a dropped VPN — leaves the stream waiting forever with
        // no error and no progress. HTTP/2 pings detect the dead peer and fail
        // the request so the caller can retry. Note there is deliberately no
        // request `timeout()`: that would abort healthy long block streams.
        .connect_timeout(std::time::Duration::from_secs(15))
        .tcp_keepalive(Some(std::time::Duration::from_secs(30)))
        .http2_keep_alive_interval(std::time::Duration::from_secs(20))
        .keep_alive_timeout(std::time::Duration::from_secs(20))
        .keep_alive_while_idle(true);
    if url.starts_with("https://") {
        endpoint = endpoint
            .tls_config(ClientTlsConfig::new().with_webpki_roots())
            .map_err(|e| CoreError::Connection(format!("TLS config: {e}")))?;
    }
    // tonic renders a failed connect as the bare string "transport error"; the
    // DNS/refused/TLS cause is only reachable through the source chain.
    let channel = endpoint
        .connect()
        .await
        .map_err(|e| crate::neterr::connection_error("connecting to lightwalletd", &url, &e))?;
    Ok(CompactTxStreamerClient::new(channel))
}

/// Fetch chain info from a lightwalletd endpoint — used to verify reachability
/// and show the current chain height before syncing.
pub async fn lightwalletd_info(url: &str) -> Result<LightwalletdInfo, CoreError> {
    let mut client = connect(url).await?;
    let info = client
        .get_lightd_info(Empty {})
        .await
        .map_err(|e| CoreError::Connection(format!("get_lightd_info: {e}")))?
        .into_inner();
    Ok(LightwalletdInfo {
        chain_name: info.chain_name,
        block_height: info.block_height,
        estimated_height: info.estimated_height,
        vendor: info.vendor,
        version: info.version,
        consensus_branch_id: info.consensus_branch_id.trim().to_lowercase(),
        wallet_branch_id: None,
        branch_supported: None,
    })
}

// ---------------------------------------------------------------------------
// Per-group wallet: sqlite-backed account, sync, and balance.
//
// Each FROST group is one view-only Orchard account, stored in its own sqlite
// wallet under `<data_dir>/wallets/<group_id>/`. The group's UFVK (derived from
// its `ak`) is imported as a watch-only account; sync trial-decrypts compact
// blocks locally; balance is read from the wallet db.
// ---------------------------------------------------------------------------

use std::path::{Path, PathBuf};

use rand::rngs::OsRng;
use async_trait::async_trait;
use prost::Message;
use zcash_client_backend::data_api::chain::error::Error as ChainError;
use zcash_client_backend::data_api::chain::{BlockCache, BlockSource};
use zcash_client_backend::data_api::scanning::ScanRange;
use zcash_client_backend::data_api::wallet::{
    create_pczt_from_proposal, propose_standard_transfer_to_address, ConfirmationsPolicy,
};
use zcash_client_backend::data_api::{AccountBirthday, AccountPurpose, WalletRead, WalletWrite};
use zcash_client_backend::fees::StandardFeeRule;
use zcash_client_backend::wallet::OvkPolicy;
use zcash_client_backend::proto::compact_formats::CompactBlock;
use zcash_client_backend::proto::service::{BlockId, ChainSpec};
use zcash_client_sqlite::chain::init::init_blockmeta_db;
use zcash_client_sqlite::chain::BlockMeta;
use zcash_client_sqlite::util::SystemClock;
use zcash_client_sqlite::wallet::init::init_wallet_db;
use zcash_client_sqlite::{FsBlockDb, WalletDb};
use zcash_keys::keys::UnifiedFullViewingKey;
use zcash_primitives::block::BlockHash;
use zcash_protocol::consensus::BlockHeight;
use zcash_protocol::memo::{Memo, MemoBytes};

type GroupDb = WalletDb<rusqlite::Connection, Network, SystemClock, OsRng>;

/// `(wallet.sqlite path, fsblockdb dir)` for a group on a given network.
/// Scoped by network (`.../<group_id>/<network>/...`) so testnet and mainnet
/// each keep their own db, blocks cache, and balance — they never share state.
fn wallet_paths(data_dir: &Path, group_id: &str, network: WalletNetwork) -> (PathBuf, PathBuf) {
    let base = data_dir
        .join("wallets")
        .join(group_id)
        .join(network.dir_name());
    (base.join("wallet.sqlite"), base.join("blocks"))
}

/// Path of the on-disk record for a fully-signed transaction awaiting broadcast.
/// Keeping the signed PCZT lets a failed broadcast be retried without repeating
/// the whole FROST signing ceremony. Network-scoped like [`wallet_paths`].
fn pending_tx_path(
    data_dir: &Path,
    group_id: &str,
    network: WalletNetwork,
    ceremony_id: &str,
) -> PathBuf {
    data_dir
        .join("wallets")
        .join(group_id)
        .join(network.dir_name())
        .join("pending")
        .join(format!("{ceremony_id}.pczt.hex"))
}

/// Persist a signed-but-not-broadcast PCZT so it can be re-broadcast later.
pub fn save_pending_tx(
    data_dir: &Path,
    group_id: &str,
    network: WalletNetwork,
    ceremony_id: &str,
    signed_pczt_hex: &str,
) -> Result<PathBuf, CoreError> {
    let path = pending_tx_path(data_dir, group_id, network, ceremony_id);
    if let Some(parent) = path.parent() {
        std::fs::create_dir_all(parent)?;
        let _ = crate::keystore::restrict_dir_to_owner(parent);
    }
    std::fs::write(&path, signed_pczt_hex.as_bytes())?;
    let _ = crate::keystore::restrict_to_owner(&path);
    Ok(path)
}

/// Load a previously-saved signed PCZT for re-broadcast.
pub fn load_pending_tx(
    data_dir: &Path,
    group_id: &str,
    network: WalletNetwork,
    ceremony_id: &str,
) -> Result<String, CoreError> {
    let path = pending_tx_path(data_dir, group_id, network, ceremony_id);
    let hex = std::fs::read_to_string(&path).map_err(|e| {
        CoreError::Config(format!("no pending transaction for {ceremony_id}: {e}"))
    })?;
    Ok(hex.trim().to_string())
}

/// Remove a pending transaction record once it has been broadcast.
pub fn clear_pending_tx(data_dir: &Path, group_id: &str, network: WalletNetwork, ceremony_id: &str) {
    let path = pending_tx_path(data_dir, group_id, network, ceremony_id);
    let _ = std::fs::remove_file(path);
}

/// The `PRAGMA key` statement for a raw 32-byte SQLCipher key. Using the
/// `x'<hex>'` blob form supplies the key material directly (no passphrase KDF).
fn key_pragma(db_key: &[u8]) -> String {
    format!("PRAGMA key = \"x'{}'\";", hex::encode(db_key))
}

/// How long a connection waits for a competing lock before giving up with
/// `SQLITE_BUSY` ("database is locked").
///
/// SQLite defaults this to zero, so the sync writer and the UI's periodic read
/// queries (balances, notes, history) fail *immediately* the moment they
/// overlap, rather than waiting out each other's short-lived locks. Every
/// connection to a group wallet must set this.
const DB_BUSY_TIMEOUT: std::time::Duration = std::time::Duration::from_secs(30);

/// Put a group wallet into WAL mode. Must run *after* the SQLCipher key pragma.
///
/// In SQLite's default rollback-journal mode, every reader holds a SHARED lock,
/// and a writer can only commit once it upgrades to EXCLUSIVE — which requires
/// that no SHARED locks are held. The UI polls this db while a sync runs (scan
/// progress every 2s, notes every 15s, history every 35s), so a long catch-up
/// sync is starved out of the EXCLUSIVE lock, blows past `DB_BUSY_TIMEOUT`, and
/// dies with "database is locked" mid-way through a commitment-tree write.
///
/// WAL lets readers and the single writer proceed concurrently, so the sync
/// commits regardless of how often the UI reads. The mode is persisted in the
/// database header, so it only has to be set once per file.
///
/// `journal_mode` reports the mode actually in effect: a filesystem that cannot
/// support WAL (some network mounts) keeps the old mode rather than failing.
/// That is degraded but still correct, so don't turn it into a hard error.
fn set_wal_mode(conn: &rusqlite::Connection) -> Result<(), CoreError> {
    let _mode: String = conn
        .query_row("PRAGMA journal_mode = WAL;", [], |r| r.get(0))
        .map_err(|e| CoreError::Crypto(format!("set journal mode: {e}")))?;
    // Safe under WAL: a crash can lose the last commits but cannot corrupt the
    // db, and it keeps the block-scan write path from fsyncing on every batch.
    conn.execute_batch("PRAGMA synchronous = NORMAL;")
        .map_err(|e| CoreError::Crypto(format!("set synchronous: {e}")))?;
    Ok(())
}

/// Open a connection used only for reads (balances, notes, history, scan
/// progress), unlocking it with the SQLCipher key when the file is encrypted. A
/// pre-encryption plaintext db (not yet migrated by [`open_db`]) is read as-is.
///
/// Read-only by *convention*, not by open flag: this deliberately does NOT pass
/// `SQLITE_OPEN_READ_ONLY`. Under WAL (see [`set_wal_mode`]) a reader needs the
/// `-shm` shared-memory index, and a strictly read-only handle cannot create it
/// — so if the last connection closed cleanly (which removes `-wal`/`-shm`), a
/// read-only open of a WAL db fails outright with `SQLITE_CANTOPEN`. A writable
/// handle can materialize the index; callers here still only issue SELECTs, and
/// a read that takes no write lock cannot block the sync writer under WAL.
fn open_readonly_connection(
    db_path: &Path,
    db_key: &[u8],
) -> Result<rusqlite::Connection, CoreError> {
    let plaintext = is_plaintext_sqlite(db_path)?;
    let conn = rusqlite::Connection::open_with_flags(
        db_path,
        rusqlite::OpenFlags::SQLITE_OPEN_READ_WRITE | rusqlite::OpenFlags::SQLITE_OPEN_NO_MUTEX,
    )
    .map_err(|e| CoreError::Crypto(format!("open wallet db: {e}")))?;
    conn.busy_timeout(DB_BUSY_TIMEOUT)
        .map_err(|e| CoreError::Crypto(format!("set busy timeout: {e}")))?;
    if !plaintext {
        conn.execute_batch(&key_pragma(db_key))
            .map_err(|e| CoreError::Crypto(format!("unlock wallet db: {e}")))?;
    }
    // Same `WHERE x IN rarray(?)` support the writable connection registers;
    // zcash_client_sqlite's read queries rely on it too.
    rusqlite::vtab::array::load_module(&conn)
        .map_err(|e| CoreError::Crypto(format!("load rarray module: {e}")))?;
    Ok(conn)
}

/// Scan progress as `(fully_scanned_height, chain_tip_height)`.
///
/// Deliberately opens a *read-only* connection rather than reusing
/// [`group_status`], which takes the writable one: this is polled while
/// `sync_group` holds the writer for the whole catch-up, and a second writer
/// would simply block. Each scanned batch is committed, so the height observed
/// here advances during a sync that would otherwise look frozen.
pub fn sync_progress(
    data_dir: &Path,
    group_id: &str,
    network: WalletNetwork,
    db_key: &[u8],
) -> Result<(u64, u64), CoreError> {
    let (db_path, _) = wallet_paths(data_dir, group_id, network);
    if !db_path.exists() {
        return Ok((0, 0));
    }
    let conn = open_readonly_connection(&db_path, db_key)?;
    let db = WalletDb::from_connection(&conn, network.params(), SystemClock, OsRng);
    let summary = db
        .get_wallet_summary(ConfirmationsPolicy::default())
        .map_err(|e| CoreError::Crypto(format!("wallet summary: {e}")))?;
    Ok(summary.map_or((0, 0), |s| {
        (
            u64::from(s.fully_scanned_height()),
            u64::from(s.chain_tip_height()),
        )
    }))
}

/// Open a rusqlite connection and unlock it with the SQLCipher key, verifying
/// that the key actually decrypts the database (a wrong key or a plaintext file
/// fails here with `SQLITE_NOTADB`).
fn open_keyed_connection(
    db_path: &Path,
    db_key: &[u8],
) -> Result<rusqlite::Connection, CoreError> {
    let conn = rusqlite::Connection::open(db_path)
        .map_err(|e| CoreError::Crypto(format!("open wallet db: {e}")))?;
    // Sync writes while the UI reads on its refresh timers; wait out the other
    // connection's lock instead of failing with "database is locked".
    conn.busy_timeout(DB_BUSY_TIMEOUT)
        .map_err(|e| CoreError::Crypto(format!("set busy timeout: {e}")))?;
    conn.execute_batch(&key_pragma(db_key))
        .map_err(|e| CoreError::Crypto(format!("set wallet db key: {e}")))?;
    // Force the cipher to engage; fails cleanly if the key is wrong.
    conn.execute_batch("SELECT count(*) FROM sqlite_master;")
        .map_err(|e| CoreError::Crypto(format!("unlock wallet db: {e}")))?;
    set_wal_mode(&conn)?;
    // WalletDb::for_path normally registers this virtual table for `WHERE x IN
    // rarray(?)` queries used internally by zcash_client_sqlite/backend; since
    // we build the connection ourselves (to key it first), register it here too.
    rusqlite::vtab::array::load_module(&conn)
        .map_err(|e| CoreError::Crypto(format!("load rarray module: {e}")))?;
    Ok(conn)
}

/// True when the file begins with the standard plaintext SQLite header, i.e. it
/// is an unencrypted database (an encrypted SQLCipher file has no such header).
fn is_plaintext_sqlite(db_path: &Path) -> Result<bool, CoreError> {
    use std::io::Read;
    let mut f = std::fs::File::open(db_path)?;
    let mut magic = [0u8; 16];
    match f.read(&mut magic) {
        Ok(16) => Ok(&magic == b"SQLite format 3\0"),
        _ => Ok(false),
    }
}

/// One-time migration of a legacy plaintext wallet database to an encrypted
/// SQLCipher database keyed by `db_key`, preserving all data. Exports the
/// plaintext db into an attached encrypted copy, then atomically replaces the
/// original. See <https://www.zetetic.net/sqlcipher/sqlcipher-api/#sqlcipher_export>.
fn migrate_plaintext_to_encrypted(db_path: &Path, db_key: &[u8]) -> Result<(), CoreError> {
    let tmp = db_path.with_extension("sqlite.enc-tmp");
    let _ = std::fs::remove_file(&tmp);
    let conn = rusqlite::Connection::open(db_path)
        .map_err(|e| CoreError::Crypto(format!("open plaintext wallet db: {e}")))?;
    conn.execute_batch(&format!(
        "ATTACH DATABASE '{}' AS encrypted KEY \"x'{}'\";\
         SELECT sqlcipher_export('encrypted');\
         DETACH DATABASE encrypted;",
        tmp.to_string_lossy().replace('\'', "''"),
        hex::encode(db_key),
    ))
    .map_err(|e| CoreError::Crypto(format!("encrypt wallet db: {e}")))?;
    drop(conn);
    std::fs::rename(&tmp, db_path)?;
    let _ = crate::keystore::restrict_to_owner(db_path);
    Ok(())
}

fn open_db(db_path: &Path, network: WalletNetwork, db_key: &[u8]) -> Result<GroupDb, CoreError> {
    if let Some(parent) = db_path.parent() {
        std::fs::create_dir_all(parent)?;
        // The wallet db holds the group's UFVK and transaction history, so lock
        // the directory to the owner as defence in depth alongside encryption.
        let _ = crate::keystore::restrict_dir_to_owner(parent);
    }
    // Transparently upgrade a pre-encryption plaintext db to SQLCipher so no
    // history is lost when this version is first run.
    if db_path.exists() && is_plaintext_sqlite(db_path)? {
        migrate_plaintext_to_encrypted(db_path, db_key)?;
    }
    let conn = open_keyed_connection(db_path, db_key)?;
    let mut db = WalletDb::from_connection(conn, network.params(), SystemClock, OsRng);
    init_wallet_db(&mut db, None)
        .map_err(|e| CoreError::Crypto(format!("init wallet db: {e}")))?;
    // Restrict the sqlite file itself to owner-only.
    if db_path.exists() {
        let _ = crate::keystore::restrict_to_owner(db_path);
    }
    Ok(db)
}

/// Open a group wallet for *reading only* (balances, account ids): a `WalletDb`
/// over a keyed connection, but WITHOUT running `init_wallet_db`.
///
/// `init_wallet_db` opens a write transaction to check/apply schema migrations,
/// so calling it on every read takes a write lock. The balance panel polls
/// `group_status` every few seconds, so under `open_db` each poll fought the sync
/// writer for the single WAL write lock and intermittently lost with "database is
/// locked" mid commitment-tree write. Migrations already ran when the account was
/// created and run again on every sync, so a read never needs to migrate — a
/// SELECT under WAL takes only a shared lock and cannot block the writer.
fn open_db_read(db_path: &Path, network: WalletNetwork, db_key: &[u8]) -> Result<GroupDb, CoreError> {
    let conn = open_keyed_connection(db_path, db_key)?;
    Ok(WalletDb::from_connection(conn, network.params(), SystemClock, OsRng))
}

/// A single shielded/transparent pool's balance, broken into spendable now,
/// pending (maturing or unconfirmed), and total.
#[derive(Debug, Clone, Serialize, Default)]
pub struct PoolBalance {
    /// Confirmed and spendable right now.
    pub spendable_zatoshis: u64,
    /// Received but not yet spendable (awaiting confirmations / maturity).
    pub pending_zatoshis: u64,
    /// spendable + pending.
    pub total_zatoshis: u64,
}

/// Balance + sync status for a group's wallet.
#[derive(Debug, Clone, Serialize)]
pub struct WalletStatus {
    /// Whether the view-only account has been imported yet.
    pub initialized: bool,
    /// Receiving unified address (from the UFVK), for the configured network.
    pub address: Option<String>,
    /// Aggregate totals (kept for back-compat; equal to the Orchard pool since
    /// the group's UFVK is Orchard-only).
    pub total_zatoshis: u64,
    pub spendable_zatoshis: u64,
    /// Per-pool breakdown. With an Orchard-only group UFVK, `sapling` and
    /// `transparent` are zero — the group cannot hold/spend those pools.
    pub orchard: PoolBalance,
    pub sapling: PoolBalance,
    pub transparent: PoolBalance,
    /// Highest fully-scanned block, and the chain tip the wallet knows about.
    pub synced_height: u64,
    pub chain_tip_height: u64,
}

/// Read a group's wallet status from its local db (no network).
pub fn group_status(
    data_dir: &Path,
    group_id: &str,
    network: WalletNetwork,
    ufvk: &str,
    db_key: &[u8],
) -> Result<WalletStatus, CoreError> {
    let (db_path, _) = wallet_paths(data_dir, group_id, network);
    let address = ufvk_default_address(network, ufvk).ok();
    if !db_path.exists() {
        return Ok(WalletStatus {
            initialized: false,
            address,
            total_zatoshis: 0,
            spendable_zatoshis: 0,
            orchard: PoolBalance::default(),
            sapling: PoolBalance::default(),
            transparent: PoolBalance::default(),
            synced_height: 0,
            chain_tip_height: 0,
        });
    }
    // Read-only: no migration, so this poll never takes a write lock (see
    // open_db_read). The account was already created and migrated by
    // init_group_account before any status read can happen.
    let db = open_db_read(&db_path, network, db_key)?;
    let account_ids = db
        .get_account_ids()
        .map_err(|e| CoreError::Crypto(format!("wallet accounts: {e}")))?;
    if account_ids.is_empty() {
        return Ok(WalletStatus {
            initialized: false,
            address,
            total_zatoshis: 0,
            spendable_zatoshis: 0,
            orchard: PoolBalance::default(),
            sapling: PoolBalance::default(),
            transparent: PoolBalance::default(),
            synced_height: 0,
            chain_tip_height: 0,
        });
    }
    let summary = db
        .get_wallet_summary(ConfirmationsPolicy::default())
        .map_err(|e| CoreError::Crypto(format!("wallet summary: {e}")))?;
    let (total, spendable, orchard, sapling, transparent, synced, tip) = match summary {
        Some(s) => {
            let bal = s.account_balances().values().next();
            let total = bal.map(|b| u64::from(b.total())).unwrap_or(0);
            let spendable = bal.map(|b| u64::from(b.spendable_value())).unwrap_or(0);
            // Per-pool breakdown. Orchard is the only pool the group can hold;
            // sapling/transparent read 0 with an Orchard-only UFVK.
            let orchard = bal.map(|b| pool_balance(b.orchard_balance())).unwrap_or_default();
            let sapling = bal.map(|b| pool_balance(b.sapling_balance())).unwrap_or_default();
            let transparent = bal
                .map(|b| {
                    // Transparent (unshielded) has no maturity concept; treat the
                    // whole unshielded balance as spendable/total.
                    let t = u64::from(b.unshielded_balance().total());
                    PoolBalance {
                        spendable_zatoshis: t,
                        pending_zatoshis: 0,
                        total_zatoshis: t,
                    }
                })
                .unwrap_or_default();
            (
                total,
                spendable,
                orchard,
                sapling,
                transparent,
                u64::from(s.fully_scanned_height()),
                u64::from(s.chain_tip_height()),
            )
        }
        None => (
            0,
            0,
            PoolBalance::default(),
            PoolBalance::default(),
            PoolBalance::default(),
            0,
            0,
        ),
    };
    Ok(WalletStatus {
        initialized: true,
        address,
        total_zatoshis: total,
        spendable_zatoshis: spendable,
        orchard,
        sapling,
        transparent,
        synced_height: synced,
        chain_tip_height: tip,
    })
}

/// Convert a zcash_client_backend shielded-pool `Balance` into our `PoolBalance`.
/// Pending = value awaiting spendability + change awaiting confirmation.
fn pool_balance(b: &zcash_client_backend::data_api::Balance) -> PoolBalance {
    let spendable = u64::from(b.spendable_value());
    let pending = u64::from(b.value_pending_spendability())
        + u64::from(b.change_pending_confirmation());
    PoolBalance {
        spendable_zatoshis: spendable,
        pending_zatoshis: pending,
        total_zatoshis: u64::from(b.total()),
    }
}

/// First block a new testnet group's wallet scans when no birthday is recorded
/// or supplied. Sits comfortably before the NU6.3/Ironwood activation
/// (4,134,000), so a group funded any time during Ironwood testing is found by
/// a rebuilt wallet without the user having to supply a height.
const DEFAULT_TESTNET_BIRTHDAY: u64 = 3_800_000;

/// The birthday a brand-new wallet starts from when the caller gives no height
/// and none was recorded for the group.
///
/// Mainnet deliberately has no constant: its chain tip is around 3.4M (NU6.2
/// activated at 3,364,600), so any fixed height chosen for testnet would sit in
/// mainnet's *future* — the treestate would not exist and the wallet would scan
/// nothing. Mainnet therefore starts at the chain tip, which is correct for a
/// newly created group that cannot hold prior funds.
pub fn default_birthday_height(network: WalletNetwork) -> Option<u64> {
    match network {
        WalletNetwork::Test => Some(DEFAULT_TESTNET_BIRTHDAY),
        WalletNetwork::Main => None,
    }
}

/// Pick the first block to scan: the requested birthday held inside
/// `[nu5, tip]`, or the tip when nothing was requested.
///
/// Both bounds matter. Below NU5 there can be no Orchard notes, so scanning
/// there is pure cost. Above the tip there is no treestate to anchor the
/// birthday to, and the wallet would scan nothing at all — which is how a
/// testnet-shaped default silently breaks a mainnet wallet.
fn resolve_scan_from(requested: Option<u64>, nu5: u64, tip: u64) -> u64 {
    match requested {
        Some(h) => h.max(nu5).min(tip),
        None => tip,
    }
}

/// Import the group's UFVK as a view-only account and return the height its
/// scanning starts from. Idempotent: returns 0 if the account already exists.
/// Touches the network (fetches the tip and a treestate).
///
/// `birthday_height` is the first block to scan. Pass `Some(h)` to recover a
/// group whose funds arrived at or after `h` — for example after rebuilding a
/// wiped wallet database. Pass `None` to use [`default_birthday_height`].
///
/// Blocks before the birthday are never scanned, so a birthday set too late
/// makes existing funds invisible. The height is clamped into
/// `[NU5 activation, chain tip]`: Orchard notes cannot exist below NU5, and a
/// birthday above the tip has no treestate to anchor to.
pub async fn init_group_account(
    data_dir: &Path,
    group_id: &str,
    network: WalletNetwork,
    ufvk_str: &str,
    lightwalletd_url: &str,
    db_key: &[u8],
    birthday_height: Option<u64>,
) -> Result<u64, CoreError> {
    use zcash_protocol::consensus::{NetworkUpgrade, Parameters};

    let (db_path, _) = wallet_paths(data_dir, group_id, network);
    let mut db = open_db(&db_path, network, db_key)?;
    if !db
        .get_account_ids()
        .map_err(|e| CoreError::Crypto(format!("wallet accounts: {e}")))?
        .is_empty()
    {
        return Ok(0); // already imported
    }

    let params = network.params();
    let ufvk = UnifiedFullViewingKey::decode(&params, ufvk_str)
        .map_err(|e| CoreError::Crypto(format!("invalid UFVK: {e}")))?;

    let mut client = connect(lightwalletd_url).await?;
    let tip = client
        .get_latest_block(ChainSpec {})
        .await
        .map_err(|e| CoreError::Connection(format!("get_latest_block: {e}")))?
        .into_inner()
        .height;

    let nu5 = params
        .activation_height(NetworkUpgrade::Nu5)
        .map_or(0, |a| u64::from(u32::from(a)));
    let scan_from = resolve_scan_from(
        birthday_height.or_else(|| default_birthday_height(network)),
        nu5,
        tip,
    );

    // `AccountBirthday::height()` is `prior_chain_state.block_height() + 1`, so
    // request the frontier as of the block *before* the first one to scan.
    // Fetching the treestate at `scan_from` itself would skip that block — and
    // with it the transaction that funded the group.
    let treestate = client
        .get_tree_state(BlockId {
            height: scan_from.saturating_sub(1),
            hash: vec![],
        })
        .await
        .map_err(|e| CoreError::Connection(format!("get_tree_state: {e}")))?
        .into_inner();
    let birthday = AccountBirthday::from_treestate(treestate, None)
        .map_err(|_| CoreError::Crypto("could not derive account birthday from treestate".into()))?;

    db.import_account_ufvk(group_id, &ufvk, &birthday, AccountPurpose::ViewOnly, None)
        .map_err(|e| CoreError::Crypto(format!("import account: {e}")))?;
    Ok(scan_from)
}

/// A `BlockCache` over `FsBlockDb`. `FsBlockDb` ships only `BlockSource`, so we
/// wrap it and add the cache-management methods `sync::run` requires (cache
/// downloaded compact blocks as files on disk, read them back, prune them).
///
/// `FsBlockDb` holds a rusqlite `Connection` (not `Sync`), but `BlockCache`
/// requires `Sync`, so the inner db is behind a `Mutex`. The cache error type is
/// `io::Error` because `FsBlockDbError` does not implement `std::error::Error`,
/// which `sync::run` requires.
struct FsCache {
    inner: std::sync::Mutex<FsBlockDb>,
    blocks_dir: PathBuf,
}

fn io_err(e: impl std::fmt::Display) -> std::io::Error {
    std::io::Error::other(e.to_string())
}

impl FsCache {
    fn lock(&self) -> Result<std::sync::MutexGuard<'_, FsBlockDb>, std::io::Error> {
        self.inner.lock().map_err(|_| io_err("block cache lock poisoned"))
    }
}

impl BlockSource for FsCache {
    type Error = std::io::Error;

    fn with_blocks<F, WalletErrT>(
        &self,
        from_height: Option<BlockHeight>,
        limit: Option<usize>,
        mut with_block: F,
    ) -> Result<(), ChainError<WalletErrT, Self::Error>>
    where
        F: FnMut(CompactBlock) -> Result<(), ChainError<WalletErrT, Self::Error>>,
    {
        let db = self.lock().map_err(ChainError::BlockSource)?;
        let mut height = from_height.unwrap_or_else(|| BlockHeight::from_u32(0));
        let mut remaining = limit.unwrap_or(usize::MAX);
        while remaining > 0 {
            let meta = match db.find_block(height).map_err(|e| ChainError::BlockSource(io_err(e)))? {
                Some(m) => m,
                None => break, // contiguous run ended
            };
            let bytes = std::fs::read(meta.block_file_path(&self.blocks_dir))
                .map_err(ChainError::BlockSource)?;
            let block =
                CompactBlock::decode(&bytes[..]).map_err(|e| ChainError::BlockSource(io_err(e)))?;
            with_block(block)?;
            height = height + 1;
            remaining -= 1;
        }
        Ok(())
    }
}

#[async_trait]
impl BlockCache for FsCache {
    fn get_tip_height(
        &self,
        _range: Option<&ScanRange>,
    ) -> Result<Option<BlockHeight>, Self::Error> {
        self.lock()?.get_max_cached_height().map_err(io_err)
    }

    async fn read(&self, range: &ScanRange) -> Result<Vec<CompactBlock>, Self::Error> {
        let range = range.block_range().clone();
        let db = self.lock()?;
        let mut blocks = Vec::new();
        let mut height = range.start;
        while height < range.end {
            match db.find_block(height).map_err(io_err)? {
                Some(meta) => {
                    let bytes = std::fs::read(meta.block_file_path(&self.blocks_dir))?;
                    blocks.push(CompactBlock::decode(&bytes[..]).map_err(io_err)?);
                }
                None => break,
            }
            height = height + 1;
        }
        Ok(blocks)
    }

    async fn insert(&self, compact_blocks: Vec<CompactBlock>) -> Result<(), Self::Error> {
        let mut metas = Vec::with_capacity(compact_blocks.len());
        for cb in &compact_blocks {
            let meta = BlockMeta {
                height: BlockHeight::from_u32(cb.height as u32),
                block_hash: BlockHash::from_slice(&cb.hash),
                block_time: cb.time,
                sapling_outputs_count: cb.vtx.iter().map(|tx| tx.outputs.len() as u32).sum(),
                orchard_actions_count: cb.vtx.iter().map(|tx| tx.actions.len() as u32).sum(),
            };
            std::fs::write(meta.block_file_path(&self.blocks_dir), cb.encode_to_vec())?;
            metas.push(meta);
        }
        self.lock()?.write_block_metadata(&metas).map_err(io_err)
    }

    async fn delete(&self, range: ScanRange) -> Result<(), Self::Error> {
        // Remove cached blocks at/above the range start (keep everything below).
        let start = u32::from(range.block_range().start);
        self.lock()?
            .truncate_to_height(BlockHeight::from_u32(start.saturating_sub(1)))
            .map_err(io_err)
    }
}

/// Sync the group's wallet: download and trial-decrypt compact blocks from
/// lightwalletd into the local db. Long-running; touches the network.
pub async fn sync_group(
    data_dir: &Path,
    group_id: &str,
    network: WalletNetwork,
    lightwalletd_url: &str,
    db_key: &[u8],
    cancel: &tokio_util::sync::CancellationToken,
) -> Result<(), CoreError> {
    let (db_path, blocks_dir) = wallet_paths(data_dir, group_id, network);
    std::fs::create_dir_all(&blocks_dir)?;
    let mut db = open_db(&db_path, network, db_key)?;

    let mut inner = FsBlockDb::for_path(&blocks_dir)
        .map_err(|e| CoreError::Crypto(format!("block cache: {e}")))?;
    init_blockmeta_db(&mut inner)
        .map_err(|e| CoreError::Crypto(format!("init block cache: {e}")))?;
    let cache = FsCache {
        inner: std::sync::Mutex::new(inner),
        // FsBlockDb stores its compact-block files in `<root>/blocks`, so the
        // cache must read/write there (not the root we passed to `for_path`).
        blocks_dir: blocks_dir.join("blocks"),
    };

    let mut client = connect(lightwalletd_url).await?;
    let params = network.params();
    // `sync::run` scans in transactional batches, so dropping its future between
    // batches leaves the db consistent (just short of the tip). That makes it
    // safe to race against a cancellation token: "Sync Now" trips the token to
    // abandon a stalled run, and a fresh sync resumes from where this one left
    // off. Without this, a stuck stream would keep the sync pending forever.
    tokio::select! {
        biased;
        _ = cancel.cancelled() => Err(CoreError::Cancelled),
        res = zcash_client_backend::sync::run(
            &mut client, &params, &cache, &mut db, 1000,
        ) => res.map_err(|e| CoreError::Connection(format!("sync: {e}"))),
    }
}

/// One Orchard spend that the group must FROST-sign: its action index and the
/// per-spend re-randomization value α (hex of the canonical scalar encoding),
/// which becomes the FROST coordinator's `randomizer` for that signature.
#[derive(Debug, Clone, Serialize)]
pub struct SpendToSign {
    pub index: usize,
    pub alpha_hex: String,
}

/// A draft transaction: a built, unsigned PCZT plus the data the FROST signing
/// step needs (the shielded sighash to sign, and each spend's α). Building
/// moves no funds.
#[derive(Debug, Clone, Serialize)]
pub struct DraftTransaction {
    /// Hex of the serialized PCZT, carried into the signing/broadcast step.
    pub pczt_hex: String,
    /// The shielded sighash the group must FROST-sign (hex).
    pub sighash_hex: String,
    /// The Orchard spends to authorize (each FROST-signed with its own α).
    pub spends: Vec<SpendToSign>,
    pub fee_zatoshis: u64,
    pub amount_zatoshis: u64,
    pub recipient: String,
    /// True when the recipient is a transparent address, i.e. this transfer
    /// moves funds out of the group's shielded Orchard pool into the
    /// transparent pool (an "unshield"). The group's Orchard spend is still
    /// FROST-signed exactly as a normal shielded send; only the output differs.
    pub is_unshield: bool,
    /// Optional memo attached to the recipient's shielded output. Encrypted
    /// on-chain; only the recipient's viewing key can decrypt it. Always None
    /// for unshield transfers (transparent outputs carry no memo).
    pub memo: Option<String>,
}

/// Build an unsigned Orchard transfer as a PCZT and return its sighash. Uses
/// the standard ZIP-317 fee and greedy input selection. No signing, no
/// broadcast — this only constructs the transaction.
///
/// Before building, the wallet's chain tip is refreshed from lightwalletd so the
/// transaction's expiry height is anchored to the *current* tip. Otherwise a
/// stale tip yields an expiry that may already be in the past by broadcast time,
/// and the node rejects the tx ("must not be mined at a block height greater
/// than its expiry"). The signing ceremony must still complete within the
/// ~40-block expiry window (≈50 min on testnet) of the build.
pub async fn prepare_send(
    data_dir: &Path,
    group_id: &str,
    network: WalletNetwork,
    recipient: &str,
    amount_zatoshis: u64,
    memo: Option<String>,
    lightwalletd_url: &str,
    db_key: &[u8],
) -> Result<DraftTransaction, CoreError> {
    use zcash_keys::address::Address;
    use zcash_primitives::transaction::TxVersion;
    use zcash_protocol::value::Zatoshis;
    use zcash_protocol::ShieldedPool;

    let params = network.params();
    let (db_path, _) = wallet_paths(data_dir, group_id, network);
    let mut db = open_db(&db_path, network, db_key)?;

    // Anchor the expiry to the live chain tip, not whatever sync last recorded.
    let mut client = connect(lightwalletd_url).await?;
    let tip_height = client
        .get_latest_block(ChainSpec {})
        .await
        .map_err(|e| CoreError::Connection(format!("get_latest_block: {e}")))?
        .into_inner()
        .height;
    db.update_chain_tip(BlockHeight::from_u32(tip_height as u32))
        .map_err(|e| CoreError::Crypto(format!("update chain tip: {e}")))?;

    let account_id = *db
        .get_account_ids()
        .map_err(|e| CoreError::Crypto(format!("wallet accounts: {e}")))?
        .first()
        .ok_or_else(|| CoreError::Crypto("wallet not initialized".into()))?;

    let r = recipient.trim();
    let to = Address::decode(&params, r).ok_or_else(|| {
        // Give a network-mismatch hint when the address prefix clearly belongs
        // to the other network — saves a confusing round-trip for the user.
        let hint = match network {
            WalletNetwork::Main if r.starts_with("utest") || r.starts_with("ztestsapling") =>
                " — this looks like a testnet address but you are on mainnet",
            WalletNetwork::Test if (r.starts_with("u1") || r.starts_with("zs1") || r.starts_with("t1"))
                && !r.starts_with("utest") =>
                " — this looks like a mainnet address but you are on testnet",
            _ => "",
        };
        CoreError::Crypto(format!("invalid recipient address{hint}"))
    })?;
    // A transparent recipient means this is an unshield (Orchard → transparent).
    let is_unshield = matches!(to, Address::Transparent(_));
    let amount =
        Zatoshis::from_u64(amount_zatoshis).map_err(|e| CoreError::Crypto(format!("amount: {e}")))?;

    // Memos are only valid for shielded (Orchard) outputs; transparent outputs
    // carry no memo. Silently drop any memo supplied for an unshield.
    let memo_bytes: Option<MemoBytes> = if is_unshield {
        None
    } else {
        memo.as_deref().filter(|s| !s.is_empty()).map(|s| {
            s.parse::<Memo>()
                .map(|m| m.encode())
                .unwrap_or_else(|_| MemoBytes::empty())
        })
    };

    // Constrain the proposal to a version-5 transaction so it matches what the
    // PCZT builder can actually construct.
    //
    // `create_pczt_from_proposal` hardcodes TxVersion::V5 and rejects any step
    // that touches the Ironwood pool ("PCZT construction cannot yet produce an
    // Ironwood bundle"). Left unconstrained (`None`), the proposal is free to
    // route the payment or its change through Ironwood — which post-NU6.3 it
    // will, since the Orchard pool is sealed — and the PCZT builder then fails
    // with the opaque `ProposalNotSupported`. Passing the version here makes the
    // proposal itself avoid Ironwood, so an unbuildable plan is rejected during
    // proposal (with a specific reason) rather than after input selection.
    let proposal = propose_standard_transfer_to_address::<_, _, std::convert::Infallible>(
        &mut db,
        &params,
        StandardFeeRule::Zip317,
        account_id,
        ConfirmationsPolicy::default(),
        &to,
        amount,
        memo_bytes,
        None, // change memo
        ShieldedPool::Orchard,
        Some(TxVersion::V5),
    )
    .map_err(|e| CoreError::Ceremony(format!("propose transfer: {e:?}")))?;

    let fee = u64::from(proposal.steps().last().balance().fee_required());

    let pczt = create_pczt_from_proposal::<_, _, std::convert::Infallible, _, std::convert::Infallible, _>(
        &mut db,
        &params,
        account_id,
        OvkPolicy::Sender,
        &proposal,
        None, // target_expiry_height: use the proposal's default expiry
    )
    .map_err(|e| match e {
        // The PCZT builder only emits version-5 transactions, so it refuses any
        // plan that moves value through the Ironwood pool. Cyze signs via PCZT
        // (FROST needs it to expose each spend's α and to apply the group's
        // signature), so there is no fallback path until the Zcash crates can
        // build Ironwood PCZTs.
        zcash_client_backend::data_api::error::Error::ProposalNotSupported => CoreError::Ceremony(
            "this transaction needs the Ironwood pool, which the Zcash PCZT builder \
             cannot construct yet (it only builds version-5 transactions). Since \
             NU6.3 sealed the Orchard pool, shielded sends and shielded change now \
             require Ironwood. Unshielding to a transparent address may still work."
                .to_string(),
        ),
        other => CoreError::Ceremony(format!("create pczt: {other:?}")),
    })?;

    // Ironwood cohort: Pczt::serialize now consumes self and returns Result
    // (postcard EncodingError). Serialize a clone since `pczt` is still needed
    // below for the sighash and spend extraction.
    let pczt_hex = hex::encode(
        pczt.clone()
            .serialize()
            .map_err(|e| CoreError::Ceremony(format!("serialize pczt: {e:?}")))?,
    );

    let sighash = pczt::roles::signer::Signer::new(pczt.clone())
        .map_err(|e| CoreError::Ceremony(format!("signer: {e:?}")))?
        .shielded_sighash();

    // Read each real Orchard spend's α (the re-randomization the FROST signers
    // must use). Dummy padding actions have zero value and are skipped.
    let spends = orchard_spends_to_sign(pczt)?;

    Ok(DraftTransaction {
        pczt_hex,
        sighash_hex: hex::encode(sighash),
        spends,
        fee_zatoshis: fee,
        amount_zatoshis,
        recipient: recipient.to_string(),
        is_unshield,
        memo: if is_unshield { None } else { memo.filter(|s| !s.is_empty()) },
    })
}

/// Extract the (index, α) of each real Orchard spend in a PCZT. Requires
/// orchard's `unstable-frost` feature (which exposes `spend().alpha()`).
fn orchard_spends_to_sign(pczt: pczt::Pczt) -> Result<Vec<SpendToSign>, CoreError> {
    use ff::PrimeField;
    use orchard::value::NoteValue;
    use pczt::roles::low_level_signer::OrchardParseError;

    let mut spends = Vec::new();
    let mut parse_err: Option<String> = None;
    pczt::roles::low_level_signer::Signer::new(pczt)
        .sign_orchard_with(|_pczt, bundle, _| {
            for (index, action) in bundle.actions().iter().enumerate() {
                let is_real = action.spend().value().is_some_and(|v| v != NoteValue::default());
                if let (true, Some(alpha)) = (is_real, action.spend().alpha()) {
                    spends.push(SpendToSign {
                        index,
                        alpha_hex: hex::encode(alpha.to_repr()),
                    });
                }
            }
            Ok::<_, OrchardParseError>(())
        })
        .map_err(|e: OrchardParseError| {
            parse_err = Some(format!("{e:?}"));
        })
        .ok();
    if let Some(e) = parse_err {
        return Err(CoreError::Ceremony(format!("read orchard spends: {e}")));
    }
    Ok(spends)
}

/// Apply FROST-produced Orchard spend-auth signatures to a draft PCZT, returning
/// the signed PCZT (hex). `signatures` are (spend index, 64-byte sig hex).
pub fn apply_orchard_signatures(
    pczt_hex: &str,
    sighash_hex: &str,
    signatures: Vec<(usize, String)>,
) -> Result<String, CoreError> {
    use orchard::primitives::redpallas::{Signature, SpendAuth};
    use pczt::roles::low_level_signer::OrchardParseError;

    let pczt = pczt::Pczt::parse(
        &hex::decode(pczt_hex.trim()).map_err(|e| CoreError::Ceremony(format!("pczt hex: {e}")))?,
    )
    .map_err(|e| CoreError::Ceremony(format!("parse pczt: {e:?}")))?;
    let sighash: [u8; 32] = hex::decode(sighash_hex.trim())
        .ok()
        .and_then(|b| b.try_into().ok())
        .ok_or_else(|| CoreError::Ceremony("sighash must be 32 bytes hex".into()))?;

    let sigs: Vec<(usize, Signature<SpendAuth>)> = signatures
        .into_iter()
        .map(|(idx, sig_hex)| {
            let bytes: [u8; 64] = hex::decode(sig_hex.trim())
                .ok()
                .and_then(|b| b.try_into().ok())
                .ok_or_else(|| CoreError::Ceremony("signature must be 64 bytes hex".into()))?;
            Ok((idx, Signature::<SpendAuth>::from(bytes)))
        })
        .collect::<Result<_, CoreError>>()?;

    let mut apply_err: Option<String> = None;
    let signer = pczt::roles::low_level_signer::Signer::new(pczt)
        .sign_orchard_with(|_pczt, bundle, _| {
            for (idx, sig) in sigs {
                if let Err(e) = bundle.actions_mut()[idx].apply_signature(sighash, sig) {
                    apply_err = Some(format!("spend {idx}: {e:?}"));
                    break;
                }
            }
            Ok::<_, OrchardParseError>(())
        })
        .map_err(|e: OrchardParseError| CoreError::Ceremony(format!("apply: {e:?}")))?;
    if let Some(e) = apply_err {
        return Err(CoreError::Ceremony(format!("invalid signature for {e}")));
    }
    // Ironwood cohort: Pczt::serialize now returns Result (postcard EncodingError).
    Ok(hex::encode(signer.finish().serialize().map_err(|e| {
        CoreError::Ceremony(format!("serialize pczt: {e:?}"))
    })?))
}

/// Prove, finalize, and broadcast a fully spend-auth-signed PCZT, returning the
/// transaction id. The Orchard proof step is CPU-heavy (building the proving
/// key takes several seconds), so it runs on a blocking thread.
///
/// This is the final leg of the send pipeline: the group has already applied
/// its threshold signature to every spend ([`apply_orchard_signatures`]); here
/// we attach the zero-knowledge proof, finalize, extract the transaction (which
/// creates the binding signature), and submit it to lightwalletd.
pub async fn broadcast_signed(
    signed_pczt_hex: &str,
    network: WalletNetwork,
    url: &str,
) -> Result<String, CoreError> {
    let pczt = pczt::Pczt::parse(
        &hex::decode(signed_pczt_hex.trim())
            .map_err(|e| CoreError::Ceremony(format!("pczt hex: {e}")))?,
    )
    .map_err(|e| CoreError::Ceremony(format!("parse pczt: {e:?}")))?;

    // Select the Orchard circuit from the consensus branch active at the live
    // chain tip, so the proof matches what THIS network's validators expect
    // (PostNu6_3 on Ironwood testnet, FixedPostNu6_2 on mainnet-NU6.2). A stale
    // or hardcoded circuit produces a proof the network rejects. This runs
    // seconds before broadcast, so the tip is effectively the tx's mined branch.
    let mut client = connect(url).await?;
    let tip_height = client
        .get_latest_block(ChainSpec {})
        .await
        .map_err(|e| CoreError::Connection(format!("get_latest_block: {e}")))?
        .into_inner()
        .height;
    let circuit_version = orchard_circuit_version_for_height(network, tip_height);

    // Proving + finalize + extract is synchronous, CPU-bound work; keep it off
    // the async runtime so progress events and other tasks stay responsive.
    let (raw, txid) = tokio::task::spawn_blocking(move || -> Result<(Vec<u8>, String), CoreError> {
        use orchard::circuit::{ProvingKey, VerifyingKey};
        use pczt::roles::{
            prover::Prover, spend_finalizer::SpendFinalizer, tx_extractor::TransactionExtractor,
        };

        // TODO(ironwood-phase3): turnstile sends also populate an *Ironwood*
        // output bundle that needs `Prover::create_ironwood_proof` with an
        // ironwood_v3 ProvingKey; wire that once the send path targets Ironwood.

        // 1. Orchard zero-knowledge proof.
        let pk = ProvingKey::build(circuit_version);
        let pczt = Prover::new(pczt)
            .create_orchard_proof(&pk)
            .map_err(|e| CoreError::Ceremony(format!("orchard proof: {e:?}")))?
            .finish();

        // 2. Finalize spends (spend-auth signatures are already applied).
        let pczt = SpendFinalizer::new(pczt)
            .finalize_spends()
            .map_err(|e| CoreError::Ceremony(format!("finalize spends: {e:?}")))?;

        // 3. Extract the final transaction (creates the binding signature).
        let vk = VerifyingKey::build(circuit_version);
        let tx = TransactionExtractor::new(pczt)
            .with_orchard(&vk)
            .extract()
            .map_err(|e| CoreError::Ceremony(format!("extract transaction: {e:?}")))?;

        let txid = format!("{}", tx.txid());
        let mut raw = Vec::new();
        tx.write(&mut raw)
            .map_err(|e| CoreError::Ceremony(format!("serialize transaction: {e}")))?;
        Ok((raw, txid))
    })
    .await
    .map_err(|e| CoreError::Ceremony(format!("proving task panicked: {e}")))??;

    // 4. Submit to lightwalletd (reusing the connection opened above).
    let resp = client
        .send_transaction(zcash_client_backend::proto::service::RawTransaction { data: raw, height: 0 })
        .await
        .map_err(|e| CoreError::Connection(format!("send_transaction: {e}")))?
        .into_inner();
    if resp.error_code != 0 {
        return Err(CoreError::Connection(format!(
            "lightwalletd rejected the transaction (code {}): {}",
            resp.error_code, resp.error_message
        )));
    }
    Ok(txid)
}

/// A single transaction as seen from this wallet's perspective.
#[derive(Debug, Clone, Serialize)]
pub struct TxRecord {
    /// Transaction ID, hex, in display order (bytes reversed vs. on-disk storage).
    pub txid: String,
    /// Block height when mined; `None` for pending/unconfirmed.
    pub block_height: Option<u64>,
    /// Unix timestamp (seconds since epoch) from the mined block; `None` when unconfirmed.
    pub timestamp: Option<i64>,
    /// `"receive"` or `"send"`.
    pub direction: String,
    /// Value in zatoshis (always positive; for sends this is the total value
    /// of the output(s) created, not including change returned to the wallet).
    pub amount_zatoshis: u64,
    /// Network fee paid, if known (only present for sends created by this wallet).
    pub fee_zatoshis: Option<u64>,
    /// Decoded memo text, if one was attached to this transaction.
    pub memo: Option<String>,
    /// Recipient unified address for sends; `None` for self-transfers (note consolidation).
    pub recipient: Option<String>,
}

/// Read on-chain transaction history for a group's wallet — received funds and
/// sent transactions, newest confirmed first.
///
/// Uses direct SQLite queries because `zcash_client_backend 0.23` exposes no
/// clean transaction-list API on `WalletRead`. The tables queried are stable
/// parts of `zcash_client_sqlite`'s schema: `transactions`, `accounts`,
/// `orchard_received_notes`, and `sent_notes`.
/// Total number of Orchard notes this group has ever received. Used as a coarse
/// "wallet activity" signal to decide when to rotate the receive address (#3):
/// once the count grows, the currently-shown address may have been paid, so the
/// next view hands out a fresh diversifier. Returns 0 when no wallet db exists.
pub fn count_orchard_received_notes(
    data_dir: &Path,
    group_id: &str,
    network: WalletNetwork,
    db_key: &[u8],
) -> Result<u64, CoreError> {
    let (db_path, _) = wallet_paths(data_dir, group_id, network);
    if !db_path.exists() {
        return Ok(0);
    }
    let conn = open_readonly_connection(&db_path, db_key)?;
    let count: i64 = conn
        .query_row("SELECT COUNT(*) FROM orchard_received_notes", [], |row| {
            row.get(0)
        })
        .map_err(|e| CoreError::Crypto(format!("count received notes: {e}")))?;
    Ok(count.max(0) as u64)
}

/// A single unspent Orchard note that makes up part of the group's balance.
#[derive(Debug, Clone, Serialize)]
pub struct NoteRecord {
    /// Receiving transaction id (hex, display order) the note arrived in.
    pub received_txid: String,
    /// Note value in zatoshis.
    pub value_zatoshis: u64,
    /// `"spendable"` (confirmed, unspent), `"pending"` (unconfirmed incoming),
    /// or `"spending"` (a broadcast-but-unmined send is consuming it).
    pub status: String,
    /// Block height the note was received at; `None` while unconfirmed.
    pub received_height: Option<u64>,
    /// Confirmations so far (chain tip − received height + 1); 0 if unconfirmed.
    pub confirmations: u64,
    /// True when this note is change returned to the group by one of its sends.
    pub is_change: bool,
    /// Decoded memo, if any.
    pub memo: Option<String>,
}

/// List the unspent Orchard notes that comprise the group's balance, newest/
/// largest first. Notes already spent in a mined transaction are excluded.
/// Powers the "Review Notes" view: each note is one spend authorization, so the
/// count is also the number of FROST signing rounds a full-balance send needs.
pub fn wallet_notes(
    data_dir: &Path,
    group_id: &str,
    network: WalletNetwork,
    db_key: &[u8],
) -> Result<Vec<NoteRecord>, CoreError> {
    let (db_path, _) = wallet_paths(data_dir, group_id, network);
    if !db_path.exists() {
        return Ok(vec![]);
    }
    let conn = open_readonly_connection(&db_path, db_key)?;

    use rusqlite::OptionalExtension;
    let account_id: Option<i64> = conn
        .query_row("SELECT id FROM accounts LIMIT 1", [], |row| row.get(0))
        .optional()
        .map_err(|e| CoreError::Crypto(format!("get account id: {e}")))?;
    let Some(account_id) = account_id else {
        return Ok(vec![]);
    };
    let tip: Option<i64> = conn
        .query_row("SELECT MAX(height) FROM blocks", [], |row| row.get(0))
        .optional()
        .map_err(|e| CoreError::Crypto(format!("chain tip: {e}")))?
        .flatten();
    let tip = tip.unwrap_or(0);

    let mut stmt = conn
        .prepare(
            "SELECT t.txid, orn.value, orn.is_change, orn.memo, t.mined_height, \
             MAX(CASE WHEN spend_t.mined_height IS NOT NULL THEN 1 ELSE 0 END) AS spent_mined, \
             MAX(CASE WHEN s.orchard_received_note_id IS NOT NULL THEN 1 ELSE 0 END) AS has_spend \
             FROM orchard_received_notes orn \
             JOIN transactions t ON orn.transaction_id = t.id_tx \
             LEFT JOIN orchard_received_note_spends s ON s.orchard_received_note_id = orn.id \
             LEFT JOIN transactions spend_t ON spend_t.id_tx = s.transaction_id \
             WHERE orn.account_id = ?1 \
             GROUP BY orn.id \
             ORDER BY orn.value DESC",
        )
        .map_err(|e| CoreError::Crypto(format!("prepare notes query: {e}")))?;

    let rows = stmt
        .query_map([account_id], |row| {
            Ok((
                row.get::<_, Vec<u8>>(0)?,
                row.get::<_, u64>(1)?,
                row.get::<_, i64>(2)?,
                row.get::<_, Option<Vec<u8>>>(3)?,
                row.get::<_, Option<u64>>(4)?,
                row.get::<_, i64>(5)?,
                row.get::<_, i64>(6)?,
            ))
        })
        .map_err(|e| CoreError::Crypto(format!("execute notes query: {e}")))?;

    let mut notes = Vec::new();
    for row in rows {
        let (mut txid_bytes, value, is_change, memo_bytes, received_height, spent_mined, has_spend) =
            row.map_err(|e| CoreError::Crypto(format!("note row: {e}")))?;
        // A note spent in a mined transaction is gone — not part of the balance.
        if spent_mined == 1 {
            continue;
        }
        txid_bytes.reverse();
        let confirmations = match received_height {
            Some(h) if tip as u64 >= h => tip as u64 - h + 1,
            _ => 0,
        };
        let status = if received_height.is_none() {
            "pending" // incoming, not yet mined
        } else if has_spend == 1 {
            "spending" // a broadcast-but-unmined send is consuming it
        } else {
            "spendable"
        };
        notes.push(NoteRecord {
            received_txid: hex::encode(&txid_bytes),
            value_zatoshis: value,
            status: status.to_string(),
            received_height,
            confirmations,
            is_change: is_change != 0,
            memo: memo_bytes.as_deref().and_then(decode_zcash_memo),
        });
    }
    Ok(notes)
}

pub fn wallet_history(
    data_dir: &Path,
    group_id: &str,
    network: WalletNetwork,
    db_key: &[u8],
) -> Result<Vec<TxRecord>, CoreError> {
    let (db_path, _) = wallet_paths(data_dir, group_id, network);
    if !db_path.exists() {
        return Ok(vec![]);
    }

    let conn = open_readonly_connection(&db_path, db_key)?;

    // There is at most one account per group wallet.
    use rusqlite::OptionalExtension;
    let account_id: Option<i64> = conn
        .query_row("SELECT id FROM accounts LIMIT 1", [], |row| row.get(0))
        .optional()
        .map_err(|e| CoreError::Crypto(format!("get account id: {e}")))?;
    let Some(account_id) = account_id else {
        return Ok(vec![]);
    };

    let mut records: Vec<TxRecord> = Vec::new();

    // ── Received ────────────────────────────────────────────────────────────
    // Orchard notes for our account that are not change (is_change = 0 means
    // this note arrived in a transaction that we did NOT also spend from —
    // i.e., someone else sent us funds). Group by transaction so one tx = one
    // history entry, sum the note values, and pick the first real memo.
    {
        let mut stmt = conn
            .prepare(
                "SELECT t.txid, t.mined_height, b.time, SUM(orn.value), \
                 ( SELECT orn2.memo \
                   FROM orchard_received_notes orn2 \
                   WHERE orn2.transaction_id = t.id_tx \
                     AND orn2.account_id = ?1 \
                     AND orn2.is_change = 0 \
                     AND orn2.memo IS NOT NULL \
                   LIMIT 1 ), \
                 ( SELECT vt.fee_paid FROM v_transactions vt WHERE vt.txid = t.txid LIMIT 1 ) \
                 FROM orchard_received_notes orn \
                 JOIN transactions t ON orn.transaction_id = t.id_tx \
                 LEFT JOIN blocks b ON b.height = t.mined_height \
                 WHERE orn.account_id = ?1 AND orn.is_change = 0 \
                 GROUP BY t.id_tx \
                 HAVING SUM(orn.value) > 0 \
                 ORDER BY t.mined_height DESC NULLS LAST",
            )
            .map_err(|e| CoreError::Crypto(format!("prepare receive query: {e}")))?;

        let rows = stmt
            .query_map([account_id], |row| {
                Ok((
                    row.get::<_, Vec<u8>>(0)?,
                    row.get::<_, Option<u64>>(1)?,
                    row.get::<_, Option<i64>>(2)?,
                    row.get::<_, u64>(3)?,
                    row.get::<_, Option<Vec<u8>>>(4)?,
                    row.get::<_, Option<i64>>(5)?,
                ))
            })
            .map_err(|e| CoreError::Crypto(format!("execute receive query: {e}")))?;

        for row in rows {
            let (mut txid_bytes, block_height, timestamp, amount, memo_bytes, fee_paid) =
                row.map_err(|e| CoreError::Crypto(format!("receive row: {e}")))?;
            // zcash_client_sqlite stores txid in internal byte order; the
            // conventional display representation (block explorers, CLI) is
            // byte-reversed.
            txid_bytes.reverse();
            records.push(TxRecord {
                txid: hex::encode(&txid_bytes),
                block_height,
                timestamp,
                direction: "receive".to_string(),
                amount_zatoshis: amount,
                // The fee is on-chain and public. The wallet knows it whenever it
                // has the full transaction (v_transactions.fee_paid); it stays
                // None only when the sender's inputs were never fetched, in which
                // case the UI says the sender paid it rather than showing nothing.
                fee_zatoshis: fee_paid.map(|f| f.max(0) as u64),
                memo: memo_bytes.as_deref().and_then(decode_zcash_memo),
                recipient: None,
            });
        }
    }

    // ── Sent ────────────────────────────────────────────────────────────────
    // `sent_notes` only gets a row for the external recipient's output if this
    // wallet's *outgoing viewing key* successfully re-decrypts it during chain
    // scanning — that's best-effort and not always true (it depends on when the
    // account was imported/rescanned). Deriving the sent amount by summing
    // `sent_notes` therefore silently falls back to just the change value when
    // that recovery fails, which understates or (worse) overstates the amount.
    //
    // `v_transactions.account_balance_delta` has no such gap: it is the net
    // change in this account's balance for the tx, built purely from notes we
    // know we *spent* (nullifier-based) and notes we *received* as change
    // (our own IVK) — both always reliable regardless of OVK recovery. Per
    // that view's own documented contract (see the module doc comment in
    // zcash_client_sqlite for `v_transactions`), for a single-account wallet
    // the amount sent to addresses outside the wallet is
    // `-(account_balance_delta) - fee_paid` when `account_balance_delta < 0`.
    // The recipient address/memo are still opportunistically read from
    // `sent_notes` when that OVK recovery *did* succeed; otherwise they're
    // simply absent (shown as "-" by the UI) rather than causing a wrong amount.
    {
        let mut stmt = conn
            .prepare(
                "SELECT vt.txid, vt.mined_height, vt.block_time, vt.fee_paid, vt.account_balance_delta, \
                 MAX(sn.to_address) AS ext_address, \
                 ( SELECT sn2.memo \
                   FROM sent_notes sn2 \
                   WHERE sn2.transaction_id = t.id_tx \
                     AND sn2.from_account_id = ?1 \
                     AND sn2.to_account_id IS NULL \
                     AND sn2.memo IS NOT NULL \
                   LIMIT 1 ) \
                 FROM v_transactions vt \
                 JOIN transactions t ON t.txid = vt.txid \
                 LEFT JOIN sent_notes sn \
                   ON sn.transaction_id = t.id_tx \
                   AND sn.from_account_id = ?1 \
                   AND sn.to_account_id IS NULL \
                 WHERE vt.account_uuid = (SELECT uuid FROM accounts WHERE id = ?1) \
                   AND vt.account_balance_delta < 0 \
                 GROUP BY t.id_tx \
                 ORDER BY vt.mined_height DESC NULLS LAST",
            )
            .map_err(|e| CoreError::Crypto(format!("prepare send query: {e}")))?;

        let rows = stmt
            .query_map([account_id], |row| {
                Ok((
                    row.get::<_, Vec<u8>>(0)?,
                    row.get::<_, Option<u64>>(1)?,
                    row.get::<_, Option<i64>>(2)?,
                    row.get::<_, Option<i64>>(3)?,
                    row.get::<_, i64>(4)?,
                    row.get::<_, Option<String>>(5)?,
                    row.get::<_, Option<Vec<u8>>>(6)?,
                ))
            })
            .map_err(|e| CoreError::Crypto(format!("execute send query: {e}")))?;

        for row in rows {
            let (mut txid_bytes, block_height, timestamp, fee_paid, account_balance_delta, ext_address, memo_bytes) =
                row.map_err(|e| CoreError::Crypto(format!("send row: {e}")))?;
            txid_bytes.reverse();
            // account_balance_delta < 0 (guaranteed by the WHERE clause) is the
            // total decrease in our balance: amount sent externally + fee.
            let debit = account_balance_delta.unsigned_abs();
            let fee = fee_paid.map(|f| f.max(0) as u64).unwrap_or(0);
            let amount = debit.saturating_sub(fee);
            records.push(TxRecord {
                txid: hex::encode(&txid_bytes),
                block_height,
                timestamp,
                direction: "send".to_string(),
                amount_zatoshis: amount,
                fee_zatoshis: fee_paid.map(|f| f.max(0) as u64),
                memo: memo_bytes.as_deref().and_then(decode_zcash_memo),
                recipient: ext_address,
            });
        }
    }

    // Merge and sort: confirmed newest first, then pending (no block).
    records.sort_by(|a, b| match (b.block_height, a.block_height) {
        (Some(bh), Some(ah)) => bh.cmp(&ah),
        (None, Some(_)) => std::cmp::Ordering::Less,
        (Some(_), None) => std::cmp::Ordering::Greater,
        (None, None) => std::cmp::Ordering::Equal,
    });

    Ok(records)
}

/// Decode a raw Zcash memo blob (up to 512 bytes) to a UTF-8 string.
/// The 0xF6 sentinel byte signals an explicitly empty memo; all-zero padding
/// is also treated as absent. Returns `None` for either case.
fn decode_zcash_memo(bytes: &[u8]) -> Option<String> {
    if bytes.is_empty() || bytes[0] == 0xF6 {
        return None;
    }
    let text = String::from_utf8_lossy(bytes);
    let trimmed = text.trim_end_matches('\0').trim();
    if trimmed.is_empty() { None } else { Some(trimmed.to_string()) }
}

/// The receiving unified address for a UFVK string, encoded for `network`.
/// This is what the wallet's account would expose for receiving funds.
pub fn ufvk_default_address(network: WalletNetwork, ufvk: &str) -> Result<String, CoreError> {
    use zcash_keys::keys::{UnifiedAddressRequest, UnifiedFullViewingKey};
    let params = network.params();
    let ufvk = UnifiedFullViewingKey::decode(&params, ufvk)
        .map_err(|e| CoreError::Crypto(format!("invalid UFVK: {e}")))?;
    let (address, _) = ufvk
        .default_address(UnifiedAddressRequest::AllAvailableKeys)
        .map_err(|e| CoreError::Crypto(format!("address generation: {e}")))?;
    Ok(address.encode(&params))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn network_params_and_defaults() {
        assert_eq!(WalletNetwork::Test.params(), Network::TestNetwork);
        assert_eq!(WalletNetwork::Main.params(), Network::MainNetwork);
        assert!(WalletNetwork::Test.default_lightwalletd().starts_with("https://"));
        assert!(WalletNetwork::Main.default_lightwalletd().starts_with("https://"));
    }

    /// The receive address the wallet's key crate (`zcash_keys`) derives from
    /// our group UFVK must equal the address our derivation produced — proving
    /// our deterministically-derived keys are standard, wallet-usable Orchard
    /// keys, on both networks.
    #[test]
    fn ufvk_round_trips_to_our_address() {
        use orchard::keys::{FullViewingKey, SpendingKey};
        let sk = Option::<SpendingKey>::from(SpendingKey::from_bytes([9u8; 32])).unwrap();
        let ak: [u8; 32] = FullViewingKey::from(&sk).to_bytes()[..32].try_into().unwrap();

        for net in [WalletNetwork::Test, WalletNetwork::Main] {
            let keys = crate::zcash::derive_orchard_keys(&ak, net.network_type()).unwrap();
            let addr = ufvk_default_address(net, &keys.ufvk).unwrap();
            assert_eq!(addr, keys.address, "zcash_keys must agree on {net:?}");
        }
    }

    /// Mainnet activation heights, for readability in the tests below.
    const MAIN_NU5: u64 = 1_687_104;
    const TEST_NU5: u64 = 1_842_420;

    #[test]
    fn scan_from_defaults_to_the_tip_when_nothing_is_requested() {
        assert_eq!(resolve_scan_from(None, MAIN_NU5, 3_400_000), 3_400_000);
    }

    #[test]
    fn scan_from_honours_a_requested_birthday_inside_the_range() {
        assert_eq!(
            resolve_scan_from(Some(3_800_000), TEST_NU5, 4_200_000),
            3_800_000
        );
    }

    #[test]
    fn scan_from_never_precedes_nu5() {
        // Orchard notes cannot exist below NU5, so an earlier birthday is lifted.
        assert_eq!(resolve_scan_from(Some(1000), MAIN_NU5, 3_400_000), MAIN_NU5);
    }

    #[test]
    fn scan_from_never_exceeds_the_tip() {
        // The testnet default (3.8M) sits above mainnet's tip (~3.4M). Without
        // the clamp the treestate fetch would fail and the wallet would scan
        // nothing; instead a mainnet wallet quietly starts at the tip.
        let mainnet_tip = 3_400_000;
        assert_eq!(
            resolve_scan_from(Some(DEFAULT_TESTNET_BIRTHDAY), MAIN_NU5, mainnet_tip),
            mainnet_tip
        );
    }

    #[test]
    fn default_birthday_is_testnet_only() {
        assert_eq!(
            default_birthday_height(WalletNetwork::Test),
            Some(DEFAULT_TESTNET_BIRTHDAY)
        );
        // A fixed height would be in mainnet's future; it starts at the tip.
        assert_eq!(default_birthday_height(WalletNetwork::Main), None);
    }
}
