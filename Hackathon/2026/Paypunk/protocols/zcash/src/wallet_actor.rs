use std::collections::HashMap;
use std::path::PathBuf;
use std::str::FromStr;

use rand_core::OsRng;
use tactix::{Actor, Ctx, Handler, Message};
use tracing::{info, warn};
use zcash_address::unified::{Encoding, Fvk, Ufvk};
use zcash_client_backend::data_api::chain::scan_cached_blocks;
use zcash_client_backend::data_api::chain::BlockSource;
use zcash_client_backend::data_api::error::Error as DataApiError;
use zcash_client_backend::data_api::wallet::create_pczt_from_proposal;
use zcash_client_backend::data_api::wallet::extract_and_store_transaction_from_pczt;
use zcash_client_backend::data_api::wallet::propose_standard_transfer_to_address;
use zcash_client_backend::data_api::wallet::ConfirmationsPolicy;
use zcash_client_backend::data_api::{
    Account, AccountBirthday, AccountPurpose, WalletRead, WalletWrite,
};
use zcash_client_backend::fees::StandardFeeRule;
use zcash_client_backend::proto::compact_formats::CompactBlock;
use zcash_client_backend::wallet::OvkPolicy;
use zcash_client_sqlite::error::SqliteClientError;
use zcash_client_sqlite::util::SystemClock;
use zcash_client_sqlite::AccountUuid;
use zcash_client_sqlite::ReceivedNoteId;
use zcash_client_sqlite::WalletDb;
use zcash_keys::keys::UnifiedFullViewingKey;
use zcash_protocol::consensus::{BlockHeight, NetworkType};
use zcash_protocol::local_consensus::LocalNetwork;
use zcash_protocol::memo::Memo;
use zcash_protocol::ShieldedProtocol;

use crate::lsp_client::LspClient;
use paypunk_types::{Address, Amount, HistoryEntry, Page, SyncStatus, TxDirection, TxStatus};

/// Build an unsigned PCZT for a transfer.
#[derive(Debug, Message)]
#[response(Result<Vec<u8>, String>)]
pub struct ProposeAndBuild {
    pub public_key: Vec<u8>,
    pub account: u32,
    pub to: String,
    pub amount: u64,
    pub memo: Option<String>,
}

/// Register a new account (parse FVK, get tree state, import into WalletDb).
#[derive(Debug, Message)]
#[response(Result<String, String>)]
pub struct RegisterAccount {
    pub fvk: Vec<u8>,
    pub birthday_height: u64,
}

/// Get the current sync status.
#[derive(Debug, Message)]
#[response(Result<SyncStatus, String>)]
pub struct GetStatus;

/// Get the balance for a specific UFVK.
#[derive(Debug, Message)]
#[response(Result<paypunk_types::Balance, String>)]
pub struct GetBalance {
    pub viewing_key: Vec<u8>,
}

/// Fetch transaction history for the given account.
#[derive(Debug, Message)]
#[response(Result<Page<HistoryEntry>, String>)]
pub struct GetHistory {
    pub account: u32,
    pub cursor: Option<String>,
    pub limit: u32,
}

/// Get the current block height from lightwalletd.
#[derive(Debug, Message)]
#[response(Result<paypunk_types::BlockHeight, String>)]
pub struct GetBlockHeight {
    pub lightwalletd_host: String,
}

/// Extract and store a signed PCZT in the wallet DB, returning the txid hex.
#[derive(Debug, Message)]
#[response(Result<String, String>)]
pub struct StoreTransaction {
    pub pczt_bytes: Vec<u8>,
}

/// Get the status of a transaction by its txid.
#[derive(Debug, Message)]
#[response(Result<TxStatus, String>)]
pub struct GetTxStatus {
    pub txid: String,
}

/// Estimate the fee for a transfer.
#[derive(Debug, Message)]
#[response(Result<u64, String>)]
pub struct EstimateFee {
    pub to: String,
    pub amount: u64,
    pub memo: Option<String>,
}

/// Update sync status from the ScanActor (fire-and-forget).
#[derive(Debug, Message)]
#[response(Result<(), String>)]
pub struct ScanUpdate(pub SyncStatus);

/// Get the current chain tip height from the wallet DB.
#[derive(Debug, Message)]
#[response(Result<u64, String>)]
pub struct GetChainTip;

/// Get the minimum birthday height across all registered accounts.
#[derive(Debug, Message)]
#[response(Result<u64, String>)]
pub struct GetMinBirthday;

/// Scan blocks that have been fetched from lightwalletd.
#[derive(Debug, Message)]
#[response(Result<String, String>)]
pub struct ScanBlocks {
    pub blocks: Vec<CompactBlock>,
    pub from_height: BlockHeight,
    pub chain_state: zcash_client_backend::data_api::chain::ChainState,
    pub target_height: BlockHeight,
}

/// Tactix actor wrapping `zcash_client_sqlite::WalletDb`.
///
/// Handles non-scan operations: balance queries, transfer building, history.
/// Chain scanning is delegated to `ScanActor` so that the wallet remains
/// responsive during long sync operations.
pub struct WalletDbActor {
    db: WalletDb<rusqlite::Connection, LocalNetwork, SystemClock, OsRng>,
    params: LocalNetwork,
    network_type: NetworkType,
    current_height: u64,
    target_height: u64,
    is_syncing: bool,
    db_path: PathBuf,
    fvk_to_account_id: HashMap<Vec<u8>, AccountUuid>,
    confirmations_policy: ConfirmationsPolicy,
    lightwalletd_host: String,
    accounts: Vec<(Vec<u8>, u64)>,
}

impl WalletDbActor {
    pub fn new(
        db: WalletDb<rusqlite::Connection, LocalNetwork, SystemClock, OsRng>,
        params: LocalNetwork,
        network_type: NetworkType,
        db_path: PathBuf,
        confirmations_policy: ConfirmationsPolicy,
        lightwalletd_host: String,
    ) -> Self {
        Self {
            db,
            params,
            network_type,
            is_syncing: false,
            current_height: 0,
            target_height: 0,
            db_path,
            fvk_to_account_id: HashMap::new(),
            confirmations_policy,
            lightwalletd_host,
            accounts: Vec::new(),
        }
    }

    /// Return the appropriate consensus parameters for transaction building and scanning.
    fn build_params(&self) -> LocalNetwork {
        self.params
    }

    /// Log diagnostics about why notes may not be spendable.
    fn log_spendability_diagnostics(&self, account_id: AccountUuid) {
        let conn = match rusqlite::Connection::open(&self.db_path) {
            Ok(c) => c,
            Err(e) => {
                warn!("diagnostics: failed to open DB: {e}");
                return;
            }
        };

        let uuid = account_id.expose_uuid();

        // 1. Chain tip from scan_queue
        let chain_tip: Option<u32> = conn
            .query_row(
                "SELECT MAX(block_range_end) - 1 FROM scan_queue",
                [],
                |row| row.get(0),
            )
            .unwrap_or(None);
        info!("diagnostics: chain_tip={chain_tip:?}");

        // 2. Scan queue entries
        match conn.prepare(
            "SELECT block_range_start, block_range_end, priority FROM scan_queue ORDER BY block_range_start",
        ) {
            Ok(mut stmt) => {
                if let Ok(mut rows) = stmt.query([]) {
                    while let Ok(Some(row)) = rows.next() {
                        let start: u32 = row.get::<_, u32>(0).unwrap_or(0);
                        let end: u32 = row.get::<_, u32>(1).unwrap_or(0);
                        let priority: i64 = row.get::<_, i64>(2).unwrap_or(0);
                        info!("diagnostics: scan_queue {start}..{end} priority={priority}");
                    }
                }
            }
            Err(e) => warn!("diagnostics: scan_queue prepare failed: {e}"),
        }

        // 3. Orchard tree checkpoints (last 10)
        match conn.prepare(
            "SELECT checkpoint_id, position FROM orchard_tree_checkpoints ORDER BY checkpoint_id DESC LIMIT 10",
        ) {
            Ok(mut stmt) => {
                if let Ok(mut rows) = stmt.query([]) {
                    while let Ok(Some(row)) = rows.next() {
                        let height: u32 = row.get::<_, u32>(0).unwrap_or(0);
                        let position: Option<u64> = row.get::<_, Option<u64>>(1).unwrap_or(None);
                        info!("diagnostics: orchard_checkpoint height={height} position={position:?}");
                    }
                }
            }
            Err(e) => warn!("diagnostics: checkpoints prepare failed: {e}"),
        }

        // 4. Orchard received notes for this account
        match conn.prepare(
            "SELECT rn.id, rn.value, rn.is_change, rn.witness_stabilized,
                    rn.commitment_tree_position, t.mined_height
             FROM orchard_received_notes rn
             INNER JOIN accounts ON accounts.id = rn.account_id
             INNER JOIN transactions t ON t.id_tx = rn.transaction_id
             WHERE accounts.uuid = ?1
             AND rn.id NOT IN (
                 SELECT orchard_received_note_id FROM orchard_received_note_spends
             )",
        ) {
            Ok(mut stmt) => {
                if let Ok(mut rows) = stmt.query([uuid]) {
                    while let Ok(Some(row)) = rows.next() {
                        let id: i64 = row.get::<_, i64>(0).unwrap_or(0);
                        let value: i64 = row.get::<_, i64>(1).unwrap_or(0);
                        let is_change: bool = row.get::<_, bool>(2).unwrap_or(false);
                        let witness_stabilized: bool = row.get::<_, bool>(3).unwrap_or(false);
                        let position: Option<u64> = row.get::<_, Option<u64>>(4).unwrap_or(None);
                        let mined_height: Option<u32> =
                            row.get::<_, Option<u32>>(5).unwrap_or(None);
                        info!(
                            "diagnostics: orchard_note id={id} value={value} is_change={is_change} \
                             witness_stabilized={witness_stabilized} position={position:?} mined_height={mined_height:?}"
                        );
                    }
                }
            }
            Err(e) => warn!("diagnostics: notes prepare failed: {e}"),
        }

        // 5. Orchard shard scan state
        match conn.prepare(
            "SELECT shard_index, subtree_start_height, subtree_end_height, max_priority
             FROM v_orchard_shards_scan_state
             ORDER BY shard_index",
        ) {
            Ok(mut stmt) => {
                if let Ok(mut rows) = stmt.query([]) {
                    while let Ok(Some(row)) = rows.next() {
                        let shard_index: u64 = row.get::<_, u64>(0).unwrap_or(0);
                        let start_height: Option<u32> =
                            row.get::<_, Option<u32>>(1).unwrap_or(None);
                        let end_height: Option<u32> = row.get::<_, Option<u32>>(2).unwrap_or(None);
                        let max_priority: Option<i64> =
                            row.get::<_, Option<i64>>(3).unwrap_or(None);
                        info!(
                            "diagnostics: orchard_shard idx={shard_index} start={start_height:?} end={end_height:?} max_priority={max_priority:?}"
                        );
                    }
                }
            }
            Err(e) => warn!("diagnostics: shard_state prepare failed: {e}"),
        }

        // 6. Unscanned ranges in orchard shards
        let unscanned_res = conn.prepare(
            "SELECT shard_index, block_range_start, block_range_end, priority
             FROM v_orchard_shard_unscanned_ranges
             ORDER BY block_range_start",
        );
        match unscanned_res {
            Ok(mut stmt) => {
                if let Ok(mut rows) = stmt.query([]) {
                    while let Ok(Some(row)) = rows.next() {
                        let shard_index: u64 = row.get::<_, u64>(0).unwrap_or(0);
                        let start: u32 = row.get::<_, u32>(1).unwrap_or(0);
                        let end: u32 = row.get::<_, u32>(2).unwrap_or(0);
                        let priority: i64 = row.get::<_, i64>(3).unwrap_or(0);
                        info!(
                            "diagnostics: orchard_unscanned shard={shard_index} {start}..{end} priority={priority}"
                        );
                    }
                }
            }
            Err(e) => warn!("diagnostics: unscanned prepare failed: {e}"),
        }
    }

    /// If the wallet DB file was deleted (e.g. by `paypunk reset` while the
    /// daemon is running), reinitialize the connection so writes don't go to
    /// an orphaned inode.
    fn ensure_db_file_exists(&mut self) -> Result<(), String> {
        if !self.db_path.exists() {
            tracing::warn!("wallet DB file deleted, reinitializing");
            if let Some(parent) = self.db_path.parent() {
                std::fs::create_dir_all(parent)
                    .map_err(|e| format!("failed to create wallet db dir: {e}"))?;
            }
            let mut new_db = zcash_client_sqlite::WalletDb::for_path(
                &self.db_path,
                self.params,
                zcash_client_sqlite::util::SystemClock,
                rand_core::OsRng,
            )
            .map_err(|e| format!("failed to recreate wallet db: {e}"))?;
            zcash_client_sqlite::wallet::init::init_wallet_db(&mut new_db, None)
                .map_err(|e| format!("failed to init wallet db: {e}"))?;
            let wal_conn = rusqlite::Connection::open(&self.db_path)
                .map_err(|e| format!("failed to open db for WAL mode: {e}"))?;
            wal_conn
                .execute_batch("PRAGMA journal_mode=WAL;")
                .map_err(|e| format!("failed to enable WAL mode: {e}"))?;
            self.db = new_db;
        }
        Ok(())
    }

    async fn register_account(
        &mut self,
        fvk: Vec<u8>,
        birthday_height: u64,
    ) -> Result<String, String> {
        // If the DB file was deleted out from under us, reinitialize first.
        self.ensure_db_file_exists()?;

        info!("register_account: parsing 96-byte Orchard FVK");
        let fvk_bytes: [u8; 96] = fvk
            .try_into()
            .map_err(|_| "FVK must be 96 bytes".to_string())?;
        let _valid = orchard::keys::FullViewingKey::from_bytes(&fvk_bytes)
            .ok_or("invalid Orchard FVK bytes")?;

        let ufvk_item = Fvk::Orchard(fvk_bytes);
        let ufvk_container = Ufvk::try_from_items(vec![ufvk_item])
            .map_err(|e| format!("failed to build UFVK container: {e}"))?;
        let ufvk = UnifiedFullViewingKey::parse(&ufvk_container)
            .map_err(|e| format!("failed to parse UFVK: {e}"))?;

        // Connect to lightwalletd early — we need it for birthday resolution and tree state
        info!("register_account: connecting to lightwalletd");
        let mut lsp = LspClient::connect(&self.lightwalletd_host, self.params).await?;

        // Resolve birthday: 0 means "no explicit birthday known".
        // For regtest, scan from block 2 (tree state at block 1 is the first
        // block with Orchard active; block 0 tree state is unreliable).
        // For mainnet/testnet, use the current chain tip to avoid scanning
        // millions of blocks — the background sync will catch new blocks.
        let birthday = if birthday_height == 0 {
            if self.network_type == NetworkType::Regtest {
                info!("register_account: birthday_height is 0, using block 2 (regtest)");
                BlockHeight::from_u32(2)
            } else {
                let latest = lsp.get_latest_height().await?;
                info!(
                    "register_account: birthday_height is 0, using latest chain tip {}",
                    u32::from(latest)
                );
                latest
            }
        } else {
            BlockHeight::from_u32(birthday_height as u32)
        };

        // Fetch tree state at birthday-1 for the account birthday
        let prev_height = if birthday > BlockHeight::from_u32(0) {
            birthday - 1
        } else {
            birthday
        };
        info!(
            "register_account: getting tree state at height {}",
            u32::from(prev_height)
        );
        let tree_state = lsp.get_tree_state(prev_height).await?;
        let chain_state = tree_state
            .to_chain_state()
            .map_err(|e| format!("invalid tree state: {e}"))?;

        {
            let account_name = format!("Zcash Account {}", self.fvk_to_account_id.len());
            let account_birthday = AccountBirthday::from_parts(chain_state.clone(), None);

            let account_uuid = match self.db.import_account_ufvk(
                &account_name,
                &ufvk,
                &account_birthday,
                AccountPurpose::Spending { derivation: None },
                None,
            ) {
                Ok(acct) => {
                    info!("register_account: imported UFVK as '{account_name}'");
                    acct.id()
                }
                Err(e) => {
                    info!("register_account: UFVK import skipped (already registered?): {e}");

                    // The account already exists in the wallet DB from a previous
                    // run. Truncate to the new birthday's chain state so the
                    // upcoming scan starts fresh. Without this, the existing chain
                    // tip (e.g. 145) causes update_chain_tip to silently skip
                    // backwards updates, and put_blocks may fail on tree
                    // state mismatches.
                    info!(
                        "register_account: truncating wallet DB to chain state at block {}",
                        u32::from(prev_height)
                    );
                    self.db
                        .truncate_to_chain_state(chain_state)
                        .map_err(|e| format!("truncate_to_chain_state failed: {e}"))?;

                    let acct = self
                        .db
                        .get_account_for_ufvk(&ufvk)
                        .map_err(|e| format!("failed to query account by UFVK: {e}"))?
                        .ok_or_else(|| "account not found after import".to_string())?;
                    acct.id()
                }
            };

            self.fvk_to_account_id
                .insert(fvk_bytes.to_vec(), account_uuid);
        }

        // Store account for incremental sync (use adjusted birthday, not raw input)
        self.accounts
            .push((fvk_bytes.to_vec(), u64::from(birthday)));

        info!("register_account: FVK imported, scanning delegated to ScanActor");
        let msg = format!(
            "registered account with birthday at block {}",
            u64::from(birthday),
        );
        Ok(msg)
    }
}

/// Try to find an account in the WalletDb by its 96-byte Orchard FVK.
fn lookup_account_by_fvk(
    db: &mut WalletDb<rusqlite::Connection, LocalNetwork, SystemClock, OsRng>,
    fvk_bytes: &[u8],
) -> Result<Option<AccountUuid>, String> {
    let bytes: [u8; 96] = fvk_bytes
        .try_into()
        .map_err(|_| "FVK must be 96 bytes".to_string())?;

    let ufvk_item = zcash_address::unified::Fvk::Orchard(bytes);
    let ufvk_container = zcash_address::unified::Ufvk::try_from_items(vec![ufvk_item])
        .map_err(|e| format!("failed to build UFVK container: {e}"))?;
    let ufvk = UnifiedFullViewingKey::parse(&ufvk_container)
        .map_err(|e| format!("failed to parse UFVK: {e}"))?;

    match db.get_account_for_ufvk(&ufvk) {
        Ok(Some(acct)) => Ok(Some(acct.id())),
        Ok(None) => Ok(None),
        Err(e) => Err(format!("get_account_for_ufvk failed: {e}")),
    }
}

/// In-memory block source holding pre-fetched compact blocks.
struct VecBlockSource {
    blocks: std::sync::Arc<Vec<CompactBlock>>,
}

impl BlockSource for VecBlockSource {
    type Error = String;

    fn with_blocks<F, WalletErrT>(
        &self,
        from_height: Option<BlockHeight>,
        limit: Option<usize>,
        mut with_block: F,
    ) -> Result<(), zcash_client_backend::data_api::chain::error::Error<WalletErrT, Self::Error>>
    where
        F: FnMut(
            zcash_client_backend::proto::compact_formats::CompactBlock,
        ) -> Result<
            (),
            zcash_client_backend::data_api::chain::error::Error<WalletErrT, Self::Error>,
        >,
    {
        let from = from_height.map(u64::from).unwrap_or(0);
        let limit = limit.unwrap_or(usize::MAX);
        let mut count = 0;
        for block in self.blocks.iter() {
            let h = block.height;
            if h >= from && count < limit {
                with_block(block.clone()).map_err(|e| match e {
                    zcash_client_backend::data_api::chain::error::Error::Wallet(e) => {
                        zcash_client_backend::data_api::chain::error::Error::Wallet(e)
                    }
                    zcash_client_backend::data_api::chain::error::Error::BlockSource(e) => {
                        zcash_client_backend::data_api::chain::error::Error::BlockSource(e)
                    }
                    zcash_client_backend::data_api::chain::error::Error::Scan(e) => {
                        zcash_client_backend::data_api::chain::error::Error::Scan(e)
                    }
                })?;
                count += 1;
            }
        }
        Ok(())
    }
}

impl Actor for WalletDbActor {}

impl Handler<ProposeAndBuild> for WalletDbActor {
    async fn handle(&mut self, msg: ProposeAndBuild, _ctx: &Ctx<Self>) -> Result<Vec<u8>, String> {
        // Debug: log wallet summary before proposing
        match self.db.get_wallet_summary(self.confirmations_policy) {
            Ok(Some(summary)) => {
                for (aid, ab) in summary.account_balances() {
                    let ob = ab.orchard_balance();
                    info!(
                        "ProposeAndBuild: account={:?} orchard spendable={} pending_change={} pending_spendable={}",
                        aid,
                        u64::from(ob.spendable_value()),
                        u64::from(ob.change_pending_confirmation()),
                        u64::from(ob.value_pending_spendability()),
                    );
                }
            }
            Ok(None) => info!("ProposeAndBuild: wallet summary is None (sync first?)"),
            Err(e) => info!("ProposeAndBuild: get_wallet_summary error: {e}"),
        }

        let to_addr = zcash_address::ZcashAddress::try_from_encoded(&msg.to)
            .map_err(|e| format!("invalid recipient address: {e}"))?;

        let zcash_addr = to_addr
            .convert()
            .map_err(|e| format!("unsupported address type: {e}"))?;

        let amount_zat = zcash_protocol::value::Zatoshis::from_u64(msg.amount)
            .map_err(|_| "invalid amount".to_string())?;

        let account_id = if !msg.public_key.is_empty() {
            let target_uuid = self.fvk_to_account_id.get(&msg.public_key).copied();
            match target_uuid {
                Some(uuid) => uuid,
                None => match lookup_account_by_fvk(&mut self.db, &msg.public_key) {
                    Ok(Some(uuid)) => {
                        self.fvk_to_account_id.insert(msg.public_key.clone(), uuid);
                        uuid
                    }
                    Ok(None) => {
                        return Err(
                            "viewing key not found in wallet — account not registered".to_string()
                        );
                    }
                    Err(e) => return Err(format!("account lookup by FVK failed: {e}")),
                },
            }
        } else {
            let account_ids = self
                .db
                .get_account_ids()
                .map_err(|e| format!("get_account_ids failed: {e}"))?;

            let summary = self
                .db
                .get_wallet_summary(self.confirmations_policy)
                .map_err(|e| format!("get_wallet_summary failed: {e}"))?
                .ok_or("wallet summary not available")?;

            account_ids
                .iter()
                .find(|aid| {
                    summary
                        .account_balances()
                        .get(aid)
                        .map(|b| u64::from(b.orchard_balance().spendable_value()) >= msg.amount)
                        .unwrap_or(false)
                })
                .ok_or("no account with sufficient balance")?
                .to_owned()
        };

        info!(
            "ProposeAndBuild: using account_id={:?} amount={} to={}",
            account_id, msg.amount, msg.to,
        );

        let memo = msg
            .memo
            .as_deref()
            .map(Memo::from_str)
            .transpose()
            .map_err(|e| format!("invalid memo: {e}"))?
            .map(zcash_protocol::memo::MemoBytes::from);

        let params = self.build_params();

        self.log_spendability_diagnostics(account_id);

        let proposal = propose_standard_transfer_to_address::<
            WalletDb<rusqlite::Connection, LocalNetwork, SystemClock, OsRng>,
            LocalNetwork,
            SqliteClientError,
        >(
            &mut self.db,
            &params,
            StandardFeeRule::Zip317,
            account_id,
            self.confirmations_policy,
            &zcash_addr,
            amount_zat,
            memo,
            None,
            ShieldedProtocol::Orchard,
        )
        .map_err(
            |e: DataApiError<SqliteClientError, _, _, _, _, ReceivedNoteId>| {
                let msg = format!("propose_transfer failed: {e}");
                warn!("{msg}");
                msg
            },
        )?;

        let pczt = create_pczt_from_proposal::<
            WalletDb<rusqlite::Connection, LocalNetwork, SystemClock, OsRng>,
            LocalNetwork,
            SqliteClientError,
            StandardFeeRule,
            SqliteClientError,
            ReceivedNoteId,
        >(
            &mut self.db,
            &params,
            account_id,
            OvkPolicy::Sender,
            &proposal,
        )
        .map_err(|e| format!("create_pczt_from_proposal failed: {e}"))?;

        Ok(pczt.serialize())
    }
}

impl Handler<RegisterAccount> for WalletDbActor {
    async fn handle(&mut self, msg: RegisterAccount, _ctx: &Ctx<Self>) -> Result<String, String> {
        self.register_account(msg.fvk, msg.birthday_height).await
    }
}

impl Handler<GetStatus> for WalletDbActor {
    async fn handle(&mut self, _msg: GetStatus, _ctx: &Ctx<Self>) -> Result<SyncStatus, String> {
        Ok(SyncStatus {
            is_syncing: self.is_syncing,
            current_height: self.current_height,
            target_height: self.target_height,
        })
    }
}

impl Handler<ScanUpdate> for WalletDbActor {
    async fn handle(&mut self, msg: ScanUpdate, _ctx: &Ctx<Self>) -> Result<(), String> {
        self.is_syncing = msg.0.is_syncing;
        self.current_height = msg.0.current_height;
        self.target_height = msg.0.target_height;
        Ok(())
    }
}

impl Handler<GetChainTip> for WalletDbActor {
    async fn handle(&mut self, _msg: GetChainTip, _ctx: &Ctx<Self>) -> Result<u64, String> {
        let tip = self
            .db
            .chain_height()
            .map_err(|e| format!("chain_height failed: {e}"))?;
        info!("trace: WalletDbActor.GetChainTip: {:?}", tip);
        Ok(tip.map(|h| h.into()).unwrap_or(0))
    }
}

impl Handler<GetMinBirthday> for WalletDbActor {
    async fn handle(&mut self, _msg: GetMinBirthday, _ctx: &Ctx<Self>) -> Result<u64, String> {
        if self.accounts.is_empty() {
            return Ok(0);
        }
        let min = self.accounts.iter().map(|(_, b)| *b).min().unwrap_or(0);
        Ok(min)
    }
}

impl Handler<ScanBlocks> for WalletDbActor {
    async fn handle(&mut self, msg: ScanBlocks, _ctx: &Ctx<Self>) -> Result<String, String> {
        self.ensure_db_file_exists()?;
        let block_source = VecBlockSource {
            blocks: std::sync::Arc::new(msg.blocks),
        };
        let block_count = block_source.blocks.len();
        let from_u64: u64 = msg.from_height.into();
        let target_u64: u64 = msg.target_height.into();
        info!("wallet_actor: scanning {block_count} blocks from {from_u64} to {target_u64}");

        self.is_syncing = true;
        self.target_height = target_u64;

        let params = self.build_params();
        scan_cached_blocks(
            &params,
            &block_source,
            &mut self.db,
            msg.from_height,
            &msg.chain_state,
            block_count,
        )
        .map_err(|e| {
            self.is_syncing = false;
            format!("scan_cached_blocks failed: {e}")
        })?;

        info!("wallet_actor: scan_cached_blocks OK, updating chain tip");
        self.db
            .update_chain_tip(msg.target_height)
            .map_err(|e| format!("update_chain_tip failed: {e}"))?;
        info!("wallet_actor: chain tip updated to {target_u64}");

        let latest_u64: u64 = msg.target_height.into();
        self.current_height = latest_u64;
        self.is_syncing = false;

        Ok(format!("synced to block {latest_u64}"))
    }
}

impl Handler<GetBalance> for WalletDbActor {
    async fn handle(
        &mut self,
        msg: GetBalance,
        _ctx: &Ctx<Self>,
    ) -> Result<paypunk_types::Balance, String> {
        info!("GetBalance received by wallet actor");

        let target_uuid = self.fvk_to_account_id.get(&msg.viewing_key).copied();

        let target_uuid = match target_uuid {
            Some(uuid) => uuid,
            None => {
                // Not found in in-memory map — try to look up the account
                // in the WalletDb directly.
                info!("GetBalance: fvk not in memory map, querying WalletDb");
                match lookup_account_by_fvk(&mut self.db, &msg.viewing_key) {
                    Ok(Some(uuid)) => {
                        self.fvk_to_account_id.insert(msg.viewing_key.clone(), uuid);
                        uuid
                    }
                    Ok(None) => {
                        info!("GetBalance: viewing key not found in WalletDb, returning zero");
                        return Ok(paypunk_types::Balance {
                            spendable: Amount(0),
                            pending: Amount(0),
                            total: Amount(0),
                        });
                    }
                    Err(e) => {
                        info!("GetBalance: WalletDb lookup failed: {e}");
                        return Ok(paypunk_types::Balance {
                            spendable: Amount(0),
                            pending: Amount(0),
                            total: Amount(0),
                        });
                    }
                }
            }
        };

        let summary = self
            .db
            .get_wallet_summary(self.confirmations_policy)
            .map_err(|e| format!("get_wallet_summary failed: {e}"))?
            .ok_or("wallet summary not available — sync first")?;

        let acct_balance = summary.account_balances().get(&target_uuid);

        let (spendable, pending, total) = match acct_balance {
            Some(bal) => {
                let ob = bal.orchard_balance();
                let s: u64 = u64::from(ob.spendable_value());
                let pc: u64 = u64::from(ob.change_pending_confirmation());
                let ps: u64 = u64::from(ob.value_pending_spendability());
                let pending = pc + ps;
                (s as u128, pending as u128, (s + pending) as u128)
            }
            None => (0, 0, 0),
        };

        info!(
            "GetBalance: uuid={:?} spendable={}, pending={}, value={}",
            target_uuid, spendable, pending, total
        );

        Ok(paypunk_types::Balance {
            spendable: Amount(spendable),
            pending: Amount(pending),
            total: Amount(total),
        })
    }
}

impl Handler<GetHistory> for WalletDbActor {
    async fn handle(
        &mut self,
        msg: GetHistory,
        _ctx: &Ctx<Self>,
    ) -> Result<Page<HistoryEntry>, String> {
        let reader = rusqlite::Connection::open(&self.db_path)
            .map_err(|e| format!("failed to open wallet db for reading: {e}"))?;

        let account_db_id: i64 = reader
            .query_row(
                "SELECT id FROM accounts ORDER BY id LIMIT 1 OFFSET ?",
                rusqlite::params![msg.account as i64],
                |row| row.get(0),
            )
            .map_err(|e| format!("failed to look up account: {e}"))?;

        let mut stmt = reader
            .prepare(
                "SELECT t.txid, t.block, b.time,
                    (SELECT COALESCE(SUM(value), 0) FROM sent_notes
                     WHERE transaction_id = t.id_tx AND from_account_id = :acct
                       AND (to_account_id IS NULL OR to_account_id != :acct)) AS sent_away,
                    (SELECT COALESCE(SUM(value), 0) FROM sent_notes
                     WHERE transaction_id = t.id_tx AND from_account_id = :acct
                       AND to_account_id = :acct) AS sent_self,
                    (SELECT COALESCE(SUM(value), 0) FROM sapling_received_notes
                     WHERE transaction_id = t.id_tx AND account_id = :acct)
                    + (SELECT COALESCE(SUM(value), 0) FROM orchard_received_notes
                     WHERE transaction_id = t.id_tx AND account_id = :acct) AS received
                 FROM transactions t
                 LEFT JOIN blocks b ON t.block = b.height
                 WHERE t.id_tx IN (
                     SELECT transaction_id FROM sent_notes WHERE from_account_id = :acct
                     UNION
                     SELECT transaction_id FROM sapling_received_notes WHERE account_id = :acct
                     UNION
                     SELECT transaction_id FROM orchard_received_notes WHERE account_id = :acct
                 )
                 ORDER BY t.id_tx DESC
                 LIMIT :limit",
            )
            .map_err(|e| format!("prepare failed: {e}"))?;

        let tx_rows = stmt
            .query_map(
                rusqlite::named_params! {
                    ":acct": account_db_id,
                    ":limit": msg.limit as i64,
                },
                |row| {
                    let txid_blob: Vec<u8> = row.get(0)?;
                    let block: Option<i64> = row.get(1)?;
                    let block_time: Option<i64> = row.get(2)?;
                    let sent_away: i64 = row.get(3)?;
                    let sent_self: i64 = row.get(4)?;
                    let received: i64 = row.get(5)?;
                    Ok((txid_blob, block, block_time, sent_away, sent_self, received))
                },
            )
            .map_err(|e| format!("query failed: {e}"))?;

        let mut entries: Vec<HistoryEntry> = Vec::new();
        for row in tx_rows {
            let (txid_blob, block, block_time, sent_away, sent_self, received) =
                row.map_err(|e| format!("row error: {e}"))?;

            let (direction, amount) = if sent_away > 0 {
                (TxDirection::Outgoing, Amount(sent_away as u128))
            } else if sent_self > 0 {
                (TxDirection::SelfTransfer, Amount(sent_self as u128))
            } else {
                (TxDirection::Incoming, Amount(received as u128))
            };

            let status = match block {
                Some(h) => TxStatus::Confirmed {
                    confirmations: h as u64,
                },
                None => TxStatus::Pending,
            };

            let hash = hex::encode(&txid_blob);
            let timestamp = block_time.map(|t| t as u64);

            entries.push(HistoryEntry {
                hash,
                direction,
                counterparty: Address(String::new()),
                amount,
                status,
                timestamp,
            });
        }

        Ok(Page {
            items: entries,
            next_cursor: None,
            has_more: false,
        })
    }
}

impl Handler<GetBlockHeight> for WalletDbActor {
    async fn handle(
        &mut self,
        msg: GetBlockHeight,
        _ctx: &Ctx<Self>,
    ) -> Result<paypunk_types::BlockHeight, String> {
        let mut lsp = LspClient::connect(&msg.lightwalletd_host, self.params).await?;
        let height = lsp.get_latest_height().await?;
        let height_u64: u64 = height.into();
        Ok(paypunk_types::BlockHeight(height_u64))
    }
}

impl Handler<StoreTransaction> for WalletDbActor {
    async fn handle(&mut self, msg: StoreTransaction, _ctx: &Ctx<Self>) -> Result<String, String> {
        let pczt =
            pczt::Pczt::parse(&msg.pczt_bytes).map_err(|e| format!("PCZT parse failed: {e:?}"))?;
        let orchard_vk = orchard::circuit::VerifyingKey::build();
        let txid = extract_and_store_transaction_from_pczt::<
            WalletDb<rusqlite::Connection, LocalNetwork, SystemClock, OsRng>,
            ReceivedNoteId,
        >(&mut self.db, pczt, None, Some(&orchard_vk))
        .map_err(|e| format!("store transaction failed: {e}"))?;
        Ok(hex::encode(txid.as_ref()))
    }
}

impl Handler<GetTxStatus> for WalletDbActor {
    async fn handle(&mut self, msg: GetTxStatus, _ctx: &Ctx<Self>) -> Result<TxStatus, String> {
        let reader = rusqlite::Connection::open(&self.db_path)
            .map_err(|e| format!("failed to open wallet db: {e}"))?;

        let txid_bytes = hex::decode(&msg.txid).map_err(|e| format!("invalid txid hex: {e}"))?;

        let status = reader
            .query_row(
                "SELECT block FROM transactions WHERE txid = ?1",
                rusqlite::params![txid_bytes],
                |row| row.get::<_, Option<i64>>(0),
            )
            .map(|block| match block {
                Some(h) => TxStatus::Confirmed {
                    confirmations: h as u64,
                },
                None => TxStatus::Pending,
            })
            .unwrap_or(TxStatus::NotFound);

        Ok(status)
    }
}

impl Handler<EstimateFee> for WalletDbActor {
    async fn handle(&mut self, msg: EstimateFee, _ctx: &Ctx<Self>) -> Result<u64, String> {
        let to_addr = zcash_address::ZcashAddress::try_from_encoded(&msg.to)
            .map_err(|e| format!("invalid recipient address: {e}"))?;

        let zcash_addr = to_addr
            .convert()
            .map_err(|e| format!("unsupported address type: {e}"))?;

        let amount_zat = zcash_protocol::value::Zatoshis::from_u64(msg.amount)
            .map_err(|_| "invalid amount".to_string())?;

        let account_ids = self
            .db
            .get_account_ids()
            .map_err(|e| format!("get_account_ids failed: {e}"))?;
        let account_id = account_ids
            .first()
            .ok_or("no accounts in wallet")?
            .to_owned();

        let memo = msg
            .memo
            .as_deref()
            .map(Memo::from_str)
            .transpose()
            .map_err(|e| format!("invalid memo: {e}"))?
            .map(zcash_protocol::memo::MemoBytes::from);

        let proposal = propose_standard_transfer_to_address::<
            WalletDb<rusqlite::Connection, LocalNetwork, SystemClock, OsRng>,
            LocalNetwork,
            SqliteClientError,
        >(
            &mut self.db,
            &self.params,
            StandardFeeRule::Zip317,
            account_id,
            self.confirmations_policy,
            &zcash_addr,
            amount_zat,
            memo,
            None,
            ShieldedProtocol::Orchard,
        )
        .map_err(
            |e: DataApiError<SqliteClientError, _, _, _, _, ReceivedNoteId>| {
                format!("propose_transfer failed: {e}")
            },
        )?;

        let fee = proposal.steps().first().balance().fee_required();
        Ok(u64::from(fee))
    }
}
