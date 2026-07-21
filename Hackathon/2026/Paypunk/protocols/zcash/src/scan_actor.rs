use std::cmp;

use tactix::{Actor, Ctx, Handler, Message, Recipient, Sender};
use tracing::info;
use zcash_client_backend::data_api::chain::ChainState;
use zcash_client_backend::proto::compact_formats::CompactBlock;
use zcash_protocol::consensus::{BlockHeight, NetworkType};
use zcash_protocol::local_consensus::LocalNetwork;

use crate::lsp_client::LspClient;
use crate::wallet_actor::{GetChainTip, GetMinBirthday, ScanBlocks};

const SCAN_CHUNK_SIZE: u32 = 20;

/// Incremental sync from current chain tip using stored accounts.
#[derive(Debug, Message)]
#[response(Result<String, String>)]
pub struct Sync;

/// Initial sync for a newly registered account from its birthday.
#[derive(Debug, Message)]
#[response(Result<String, String>)]
pub struct SyncNewAccount {
    pub birthday_height: u64,
}

/// Tactix actor that coordinates chain scanning.
///
/// Does NOT own a `WalletDb` connection — all database operations are
/// delegated to the `WalletDbActor` via messages. This actor only fetches
/// blocks from lightwalletd and sends them to the `WalletDbActor` for
/// scanning.
pub struct ScanActor {
    params: LocalNetwork,
    network_type: NetworkType,
    lightwalletd_host: String,
    get_chain_tip: Recipient<GetChainTip>,
    get_min_birthday: Recipient<GetMinBirthday>,
    scan_blocks: Recipient<ScanBlocks>,
    is_syncing: bool,
}

impl ScanActor {
    pub fn new(
        params: LocalNetwork,
        network_type: NetworkType,
        lightwalletd_host: String,
        get_chain_tip: Recipient<GetChainTip>,
        get_min_birthday: Recipient<GetMinBirthday>,
        scan_blocks: Recipient<ScanBlocks>,
    ) -> Self {
        Self {
            params,
            network_type,
            lightwalletd_host,
            get_chain_tip,
            get_min_birthday,
            scan_blocks,
            is_syncing: false,
        }
    }

    async fn sync_from_tip(&mut self) -> Result<String, String> {
        info!(
            "scan_actor: connecting to lightwalletd at {}",
            self.lightwalletd_host
        );
        let mut lsp = LspClient::connect(&self.lightwalletd_host, self.params).await?;
        let latest = lsp.get_latest_height().await?;
        let latest_u64: u64 = latest.into();
        info!("scan_actor: latest height = {latest_u64}");

        // Get current chain tip from WalletDbActor
        let chain_tip: u64 = self.get_chain_tip.ask(GetChainTip).await?;

        let from_height = if chain_tip > 0 {
            let next = BlockHeight::from_u32(chain_tip as u32 + 1);
            info!("scan_actor: current chain tip is {chain_tip}, fetching from {next:?}");
            next
        } else {
            let min_birthday: u64 = self.get_min_birthday.ask(GetMinBirthday).await?;
            if min_birthday == 0 {
                info!("scan_actor: no chain tip and no registered accounts, nothing to sync");
                return Ok("no chain tip, nothing to sync".to_string());
            }
            let birthday = if min_birthday <= 1 {
                BlockHeight::from_u32(2)
            } else {
                BlockHeight::from_u32(min_birthday as u32)
            };
            info!("scan_actor: no chain tip, scanning from account birthday {birthday:?}");
            birthday
        };

        if from_height > latest {
            info!("scan_actor: already at tip (height={latest_u64})");
            return Ok(format!("already at tip (height={latest_u64})"));
        }

        self.sync_blocks_in_chunks(&mut lsp, from_height, latest)
            .await?;

        info!("scan_actor: scan complete");
        let msg = format!("synced to block {}", latest_u64);
        Ok(msg)
    }

    async fn sync_new_account(&mut self, birthday_height: u64) -> Result<String, String> {
        info!("scan_actor: initial sync for new account from birthday={birthday_height}");
        let mut lsp = LspClient::connect(&self.lightwalletd_host, self.params).await?;
        let latest = lsp.get_latest_height().await?;
        let latest_u64: u64 = latest.into();

        let birthday = if birthday_height == 0 {
            if self.network_type == NetworkType::Regtest {
                info!("scan_actor: birthday_height is 0, scanning from block 2 (regtest)");
                BlockHeight::from_u32(2)
            } else {
                info!("scan_actor: birthday_height is 0, using latest chain tip {latest_u64}");
                latest
            }
        } else {
            BlockHeight::from_u32(birthday_height as u32)
        };

        if birthday > latest {
            info!("scan_actor: birthday after latest tip, nothing to sync");
            return Ok("birthday after tip, nothing to sync".to_string());
        }

        self.sync_blocks_in_chunks(&mut lsp, birthday, latest)
            .await?;

        info!("scan_actor: initial sync complete");
        let msg = format!(
            "synced new account from block {} to {}",
            u64::from(birthday),
            latest_u64
        );
        Ok(msg)
    }

    /// Fetch and scan blocks from `from_height` to `target_height` in chunks,
    /// avoiding a single massive fetch for wallets far behind the tip.
    async fn sync_blocks_in_chunks(
        &self,
        lsp: &mut LspClient,
        from_height: BlockHeight,
        target_height: BlockHeight,
    ) -> Result<(), String> {
        let mut current = from_height;
        while current <= target_height {
            let chunk_end_ord = cmp::min(
                u32::from(current) + SCAN_CHUNK_SIZE - 1,
                u32::from(target_height),
            );
            let chunk_end = BlockHeight::from_u32(chunk_end_ord);

            info!("scan_actor: fetching blocks from {current:?} to {chunk_end:?}");
            let blocks = lsp.get_block_range(current, chunk_end).await?;
            let block_count = blocks.len();
            info!("scan_actor: fetched {block_count} blocks");

            if block_count > 0 {
                let prev_height = if current > BlockHeight::from_u32(0) {
                    current - 1
                } else {
                    current
                };
                let tree_state = lsp.get_tree_state(prev_height).await?;
                let chain_state = tree_state
                    .to_chain_state()
                    .map_err(|e| format!("invalid tree state: {e}"))?;

                self.send_blocks_to_wallet(blocks, current, chain_state, chunk_end)
                    .await?;
            }

            current = BlockHeight::from_u32(u32::from(chunk_end) + 1);
        }
        Ok(())
    }

    /// Send fetched blocks to WalletDbActor for scanning against its DB.
    async fn send_blocks_to_wallet(
        &self,
        blocks: Vec<CompactBlock>,
        from_height: BlockHeight,
        chain_state: ChainState,
        target_height: BlockHeight,
    ) -> Result<(), String> {
        self.scan_blocks
            .ask(ScanBlocks {
                blocks,
                from_height,
                chain_state,
                target_height,
            })
            .await?;
        Ok(())
    }
}

impl Actor for ScanActor {}

impl Handler<Sync> for ScanActor {
    async fn handle(&mut self, _msg: Sync, _ctx: &Ctx<Self>) -> Result<String, String> {
        if self.is_syncing {
            return Err("scan already in progress".to_string());
        }
        self.is_syncing = true;

        let result = self.sync_from_tip().await;

        match &result {
            Ok(msg) => {
                self.is_syncing = false;
                info!("scan_actor: sync complete: {msg}");
                Ok(msg.clone())
            }
            Err(e) => {
                self.is_syncing = false;
                info!("scan_actor: sync failed: {e}");
                Err(e.clone())
            }
        }
    }
}

impl Handler<SyncNewAccount> for ScanActor {
    async fn handle(&mut self, msg: SyncNewAccount, _ctx: &Ctx<Self>) -> Result<String, String> {
        if self.is_syncing {
            return Err("scan already in progress".to_string());
        }
        self.is_syncing = true;

        let result = self.sync_new_account(msg.birthday_height).await;

        match &result {
            Ok(msg) => {
                self.is_syncing = false;
                info!("scan_actor: new account sync complete: {msg}");
                Ok(msg.clone())
            }
            Err(e) => {
                self.is_syncing = false;
                info!("scan_actor: new account sync failed: {e}");
                Err(e.clone())
            }
        }
    }
}
