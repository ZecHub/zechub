pub mod address;
pub mod common;
#[cfg(feature = "wallet")]
pub mod protocol;
pub mod signer;

#[cfg(feature = "wallet")]
pub mod lsp_client;
#[cfg(feature = "wallet")]
pub mod scan_actor;
#[cfg(feature = "wallet")]
pub mod wallet_actor;

use zcash_protocol::consensus::Parameters;
use zcash_protocol::consensus::{BlockHeight, Network, NetworkType, NetworkUpgrade};
use zcash_protocol::local_consensus::LocalNetwork;

#[cfg(feature = "wallet")]
use std::path::Path;

#[cfg(feature = "wallet")]
pub use protocol::ZcashProtocol;
pub use signer::ZcashSignerProtocol;

#[cfg(feature = "wallet")]
use tactix::{Actor, Recipient, Sender};
#[cfg(feature = "wallet")]
use zcash_client_backend::data_api::wallet::ConfirmationsPolicy;

#[cfg(feature = "wallet")]
pub use scan_actor::{Sync, SyncNewAccount};
#[cfg(feature = "wallet")]
pub use wallet_actor::{
    EstimateFee, GetBalance, GetBlockHeight, GetChainTip, GetHistory, GetMinBirthday, GetStatus,
    GetTxStatus, ProposeAndBuild, RegisterAccount, ScanBlocks, ScanUpdate, StoreTransaction,
    WalletDbActor,
};

/// Patch the orchard shard scan range views for regtest, where all upgrades activate
/// at block 1 but the zcash_protocol crate's TestNetwork has NU5 at 1842420.
#[cfg(feature = "wallet")]
fn patch_orchard_views_for_regtest(db_path: &Path) -> Result<(), String> {
    let conn = rusqlite::Connection::open(db_path)
        .map_err(|e| format!("failed to open db for view patch: {e}"))?;
    conn.execute_batch(
        "DROP VIEW IF EXISTS v_orchard_shards_scan_state;
         DROP VIEW IF EXISTS v_orchard_shard_unscanned_ranges;
         DROP VIEW IF EXISTS v_orchard_shard_scan_ranges;

         CREATE VIEW v_orchard_shard_scan_ranges AS
         SELECT
             shard.shard_index,
             shard.shard_index << 16 AS start_position,
             (shard.shard_index + 1) << 16 AS end_position_exclusive,
             IFNULL(prev_shard.subtree_end_height, 0) AS subtree_start_height,
             shard.subtree_end_height,
             shard.contains_marked,
             scan_queue.block_range_start,
             scan_queue.block_range_end,
             scan_queue.priority
         FROM orchard_tree_shards shard
         LEFT OUTER JOIN orchard_tree_shards prev_shard
             ON shard.shard_index = prev_shard.shard_index + 1
         INNER JOIN scan_queue ON (
             IFNULL(prev_shard.subtree_end_height, 0) < scan_queue.block_range_end AND
             (
                 scan_queue.block_range_start <= shard.subtree_end_height OR
                 shard.subtree_end_height IS NULL
             )
         );

         CREATE VIEW v_orchard_shard_unscanned_ranges AS
         WITH wallet_birthday AS (SELECT MIN(birthday_height) AS height FROM accounts)
         SELECT
             shard_index, start_position, end_position_exclusive,
             subtree_start_height, subtree_end_height, contains_marked,
             block_range_start, block_range_end, priority
         FROM v_orchard_shard_scan_ranges
         INNER JOIN wallet_birthday
         WHERE priority > 10
         AND block_range_end > wallet_birthday.height;

         CREATE VIEW v_orchard_shards_scan_state AS
         SELECT
             shard_index, start_position, end_position_exclusive,
             subtree_start_height, subtree_end_height, contains_marked,
             MAX(priority) AS max_priority
         FROM v_orchard_shard_scan_ranges
         GROUP BY
             shard_index, start_position, end_position_exclusive,
             subtree_start_height, subtree_end_height, contains_marked;",
    )
    .map_err(|e| format!("failed to patch orchard views: {e}"))?;
    Ok(())
}

/// Convert a Network and NetworkType to a LocalNetwork with the correct activation heights.
pub fn to_local_params(params: Network, network_type: NetworkType) -> LocalNetwork {
    match network_type {
        NetworkType::Regtest => LocalNetwork {
            overwinter: Some(BlockHeight::from_u32(1)),
            sapling: Some(BlockHeight::from_u32(1)),
            blossom: Some(BlockHeight::from_u32(1)),
            heartwood: Some(BlockHeight::from_u32(1)),
            canopy: Some(BlockHeight::from_u32(1)),
            nu5: Some(BlockHeight::from_u32(1)),
            nu6: Some(BlockHeight::from_u32(1)),
            nu6_1: Some(BlockHeight::from_u32(1)),
            nu6_2: Some(BlockHeight::from_u32(1)),
        },
        _ => LocalNetwork {
            overwinter: params.activation_height(NetworkUpgrade::Overwinter),
            sapling: params.activation_height(NetworkUpgrade::Sapling),
            blossom: params.activation_height(NetworkUpgrade::Blossom),
            heartwood: params.activation_height(NetworkUpgrade::Heartwood),
            canopy: params.activation_height(NetworkUpgrade::Canopy),
            nu5: params.activation_height(NetworkUpgrade::Nu5),
            nu6: params.activation_height(NetworkUpgrade::Nu6),
            nu6_1: params.activation_height(NetworkUpgrade::Nu6_1),
            nu6_2: params.activation_height(NetworkUpgrade::Nu6_2),
        },
    }
}

/// Open (or create) the wallet database, retrying once if the database is stale.
///
/// If the database file exists but is in a bad state (corrupted, readonly from a
/// stale WAL, etc.), we delete it and start fresh. This is safe because the
/// wallet DB only contains scanned chain data — keys live in keypunkd.
#[cfg(feature = "wallet")]
fn open_wallet_db(
    db_path: &Path,
    params: LocalNetwork,
    network_type: NetworkType,
) -> Result<
    zcash_client_sqlite::WalletDb<
        rusqlite::Connection,
        LocalNetwork,
        zcash_client_sqlite::util::SystemClock,
        rand_core::OsRng,
    >,
    String,
> {
    let maybe_db = (|| -> Result<_, String> {
        let mut db = zcash_client_sqlite::WalletDb::for_path(
            db_path,
            params,
            zcash_client_sqlite::util::SystemClock,
            rand_core::OsRng,
        )
        .map_err(|e| format!("{e}"))?;
        zcash_client_sqlite::wallet::init::init_wallet_db(&mut db, None)
            .map_err(|e| format!("{e}"))?;

        // Enable WAL mode so concurrent readers (e.g. GetHistory, GetTxStatus)
        // don't block the scan actor's writes.
        let wal_conn = rusqlite::Connection::open(db_path)
            .map_err(|e| format!("failed to open db for WAL mode: {e}"))?;
        wal_conn
            .execute_batch("PRAGMA journal_mode=WAL;")
            .map_err(|e| format!("failed to enable WAL mode: {e}"))?;

        if network_type == NetworkType::Regtest {
            patch_orchard_views_for_regtest(db_path)?;
        }

        Ok(db)
    })();

    match maybe_db {
        Ok(db) => Ok(db),
        Err(e) => {
            // If the DB file exists, a database-level error means it's stale.
            // Delete and retry once.
            if db_path.exists() {
                tracing::warn!("wallet DB is stale, deleting and recreating: {e}");
                let _ = std::fs::remove_file(db_path);
                let _ = std::fs::remove_file(db_path.with_extension("db-wal"));
                let _ = std::fs::remove_file(db_path.with_extension("db-shm"));

                let mut db = zcash_client_sqlite::WalletDb::for_path(
                    db_path,
                    params,
                    zcash_client_sqlite::util::SystemClock,
                    rand_core::OsRng,
                )
                .map_err(|e| format!("failed to open zcash wallet db: {e}"))?;
                zcash_client_sqlite::wallet::init::init_wallet_db(&mut db, None)
                    .map_err(|e| format!("failed to initialize zcash wallet db: {e}"))?;
                let wal_conn = rusqlite::Connection::open(db_path)
                    .map_err(|e| format!("failed to open db for WAL mode: {e}"))?;
                wal_conn
                    .execute_batch("PRAGMA journal_mode=WAL;")
                    .map_err(|e| format!("failed to enable WAL mode: {e}"))?;
                if network_type == NetworkType::Regtest {
                    patch_orchard_views_for_regtest(db_path)?;
                }
                Ok(db)
            } else {
                Err(format!("failed to open zcash wallet db: {e}"))
            }
        }
    }
}

/// Result of creating a fully-initialized Zcash protocol stack.
#[cfg(feature = "wallet")]
pub struct ZcashStack {
    pub protocol: ZcashProtocol,
    /// Recipient for `Sync` messages (used by the background sync loop in paypunkd).
    pub sync_recipient: Recipient<Sync>,
}

/// Create a fully-initialized Zcash protocol with a running WalletDbActor
/// and ScanActor.
#[cfg(feature = "wallet")]
pub async fn create_protocol(
    data_dir: &Path,
    lightwalletd_host: String,
    zcash_network: &str,
) -> Result<ZcashStack, String> {
    let (params, network_type) = match zcash_network.to_lowercase().as_str() {
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
                zcash_network
            );
            (
                zcash_protocol::consensus::Network::TestNetwork,
                zcash_protocol::consensus::NetworkType::Regtest,
            )
        }
    };
    let local_params = to_local_params(params, network_type);

    let zcash_db_dir = data_dir.join("zcash").join(zcash_network);
    std::fs::create_dir_all(&zcash_db_dir)
        .map_err(|e| format!("failed to create zcash db dir: {e}"))?;
    let zcash_db_path = zcash_db_dir.join("wallet.db");

    let wallet_db = open_wallet_db(&zcash_db_path, local_params, network_type)?;

    let confirmations = match network_type {
        zcash_protocol::consensus::NetworkType::Regtest => ConfirmationsPolicy::MIN,
        _ => ConfirmationsPolicy::default(),
    };

    // Start the wallet actor (handles non-scan operations)
    let wallet_actor = WalletDbActor::new(
        wallet_db,
        to_local_params(params, network_type),
        network_type,
        zcash_db_path.clone(),
        confirmations,
        lightwalletd_host.clone(),
    )
    .start();

    // Start the scan actor (fetches blocks, delegates DB writes to WalletDbActor)
    let get_chain_tip: Recipient<GetChainTip> = wallet_actor.clone().recipient();
    let get_min_birthday: Recipient<GetMinBirthday> = wallet_actor.clone().recipient();
    let scan_blocks: Recipient<ScanBlocks> = wallet_actor.clone().recipient();
    let scan_actor = scan_actor::ScanActor::new(
        to_local_params(params, network_type),
        network_type,
        lightwalletd_host.clone(),
        get_chain_tip,
        get_min_birthday,
        scan_blocks,
    )
    .start();
    let scan_sync_recipient: Recipient<Sync> = scan_actor.clone().recipient();
    let scan_recipient: Recipient<SyncNewAccount> = scan_actor.clone().recipient();
    let stack_sync_recipient: Recipient<Sync> = scan_actor.recipient();

    let protocol = ZcashProtocol::new(
        to_local_params(params, network_type),
        network_type,
        Some(wallet_actor),
        Some(scan_recipient),
        Some(scan_sync_recipient),
        Some(lightwalletd_host),
    );

    Ok(ZcashStack {
        protocol,
        sync_recipient: stack_sync_recipient,
    })
}

/// Return the standard Zcash derivation path for a given account index.
///
/// Zcash uses ZIP32 for per-account key derivation. The path identifies the
/// account; addresses are derived from the resulting `UnifiedSpendingKey`
/// using diversifier indices (not BIP44 address-level indices).
///
/// Path: `m/44'/133'/{account}'`
pub fn derivation_path(account: u32) -> String {
    format!("m/44'/133'/{account}'")
}
