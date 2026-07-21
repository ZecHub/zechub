use std::collections::HashMap;
use std::sync::Arc;
use std::sync::Mutex;

use async_trait::async_trait;
use paypunk_types::{
    BlockHeight, ChainId, HistoryEntry, Intent, Page, Protocol, ProtocolId, SyncStatus, TxStatus,
    ZcashIntent,
};
use pczt::roles::{spend_finalizer::SpendFinalizer, tx_extractor::TransactionExtractor};
use tactix::{Addr, Recipient, Sender};
use tokio;
use zcash_protocol::local_consensus::LocalNetwork;

use crate::scan_actor::{Sync, SyncNewAccount};
use crate::wallet_actor::{
    EstimateFee, GetBalance, GetBlockHeight, GetHistory, GetStatus, GetTxStatus, ProposeAndBuild,
    RegisterAccount, StoreTransaction, WalletDbActor,
};
use tracing::warn;

pub struct ZcashProtocol {
    pub params: LocalNetwork,
    network_type: zcash_protocol::consensus::NetworkType,
    wallet_addr: Option<Addr<WalletDbActor>>,
    scan_recipient: Option<Arc<Recipient<SyncNewAccount>>>,
    sync_recipient: Option<Arc<Recipient<Sync>>>,
    pub lightwalletd_host: Option<String>,
    address_viewing_keys: Arc<Mutex<HashMap<String, Vec<u8>>>>,
}

impl ZcashProtocol {
    pub fn new(
        params: LocalNetwork,
        network_type: zcash_protocol::consensus::NetworkType,
        wallet_addr: Option<Addr<WalletDbActor>>,
        scan_recipient: Option<Recipient<SyncNewAccount>>,
        sync_recipient: Option<Recipient<Sync>>,
        lightwalletd_host: Option<String>,
    ) -> Self {
        Self {
            params,
            network_type,
            wallet_addr,
            scan_recipient: scan_recipient.map(Arc::new),
            sync_recipient: sync_recipient.map(Arc::new),
            lightwalletd_host,
            address_viewing_keys: Arc::new(Mutex::new(HashMap::new())),
        }
    }

    pub fn wallet_addr(&self) -> Option<Addr<WalletDbActor>> {
        self.wallet_addr.clone()
    }

    pub fn scan_recipient(&self) -> Option<Arc<Recipient<SyncNewAccount>>> {
        self.scan_recipient.clone()
    }
}

#[async_trait]
impl Protocol for ZcashProtocol {
    fn protocol_id(&self) -> ProtocolId {
        ProtocolId::Zcash
    }

    async fn build(&self, intent: &Intent) -> Result<Vec<u8>, String> {
        match intent {
            Intent::Zcash(ZcashIntent::Transfer {
                to,
                amount,
                from,
                memo,
                ..
            }) => {
                if !self.validate_address(from) {
                    return Err(format!("invalid from address: {from}"));
                }

                let wallet = self
                    .wallet_addr
                    .as_ref()
                    .ok_or_else(|| "WalletDb not initialized — sync required".to_string())?;

                let viewing_key = {
                    let map = self
                        .address_viewing_keys
                        .lock()
                        .map_err(|e| e.to_string())?;
                    map.get(from).cloned()
                }
                .ok_or_else(|| format!("no viewing key found for from address: {from}"))?;

                let amount_f64: f64 = amount.parse().map_err(|_| "invalid amount".to_string())?;
                let amount_zat = (amount_f64 * 100_000_000.0) as u64;

                wallet
                    .ask(ProposeAndBuild {
                        public_key: viewing_key,
                        account: 0,
                        to: to.clone(),
                        amount: amount_zat,
                        memo: memo.clone(),
                    })
                    .await
            }
            _ => Err("unexpected intent variant for Zcash protocol".to_string()),
        }
    }

    fn validate_address(&self, address: &str) -> bool {
        zcash_address::ZcashAddress::try_from_encoded(address).is_ok()
    }

    fn finalize(&self, signed: &[u8]) -> Result<Vec<u8>, String> {
        let pczt = pczt::Pczt::parse(signed).map_err(|e| format!("PCZT parse failed: {e:?}"))?;

        let finalized = SpendFinalizer::new(pczt)
            .finalize_spends()
            .map_err(|e| format!("finalize_spends failed: {e:?}"))?;

        let orchard_vk = orchard::circuit::VerifyingKey::build();
        let tx = TransactionExtractor::new(finalized)
            .with_orchard(&orchard_vk)
            .extract()
            .map_err(|e| format!("extract failed: {e:?}"))?;

        let mut raw_tx = Vec::new();
        tx.write(&mut raw_tx)
            .map_err(|e| format!("tx serialize failed: {e}"))?;

        Ok(raw_tx)
    }

    async fn store_and_finalize(
        &self,
        signed_pczt: &[u8],
    ) -> Result<(Vec<u8>, Option<String>), String> {
        tracing::info!(
            "store_and_finalize: first bytes {:?} len={}",
            &signed_pczt[..signed_pczt.len().min(8)],
            signed_pczt.len()
        );
        let mut txid_hex: Option<String> = None;
        if let Some(wallet) = &self.wallet_addr {
            let txid = wallet
                .ask(StoreTransaction {
                    pczt_bytes: signed_pczt.to_vec(),
                })
                .await?;
            tracing::info!(txid = %txid, "stored transaction in wallet db");
            txid_hex = Some(txid);
        }
        let finalized = self.finalize(signed_pczt)?;
        Ok((finalized, txid_hex))
    }

    async fn get_balance(
        &self,
        address: &str,
        _asset: &str,
    ) -> Result<paypunk_types::Balance, String> {
        let wallet = self
            .wallet_addr
            .as_ref()
            .ok_or_else(|| "WalletDb not initialized — sync required".to_string())?;

        let parsed = paypunk_types::caip::AccountId::parse(address)
            .map_err(|e| format!("invalid CAIP-10 address: {e}"))?;

        // Validate the raw Zcash address format before proceeding
        zcash_address::ZcashAddress::try_from_encoded(&parsed.account_address)
            .map_err(|e| format!("invalid Zcash address: {e}"))?;

        let viewing_key = {
            let map = self
                .address_viewing_keys
                .lock()
                .map_err(|e| e.to_string())?;
            map.get(&parsed.account_address).cloned()
        };

        let viewing_key = match viewing_key {
            Some(vk) => vk,
            None => {
                return Ok(paypunk_types::Balance {
                    spendable: paypunk_types::Amount(0),
                    pending: paypunk_types::Amount(0),
                    total: paypunk_types::Amount(0),
                });
            }
        };

        let balance = wallet.ask(GetBalance { viewing_key }).await?;
        Ok(balance)
    }

    async fn broadcast(&self, finalized_tx: &[u8]) -> Result<String, String> {
        let host = self
            .lightwalletd_host
            .as_ref()
            .ok_or_else(|| "lightwalletd not configured".to_string())?;

        let mut lsp = crate::lsp_client::LspClient::connect(host, self.params).await?;
        let result = lsp.broadcast_tx(finalized_tx).await?;

        Ok(result)
    }

    // ── Protocol metadata ───────────────────────────────────────────────────

    fn chain_id(&self) -> ChainId {
        match self.network_type {
            zcash_protocol::consensus::NetworkType::Main => ChainId {
                namespace: "zcash".to_string(),
                reference: "mainnet".to_string(),
            },
            zcash_protocol::consensus::NetworkType::Test => ChainId {
                namespace: "zcash".to_string(),
                reference: "testnet".to_string(),
            },
            zcash_protocol::consensus::NetworkType::Regtest => ChainId {
                namespace: "zcash".to_string(),
                reference: "regtest".to_string(),
            },
        }
    }

    fn native_asset(&self) -> String {
        match self.network_type {
            zcash_protocol::consensus::NetworkType::Main => "zcash:mainnet/slip44:133".to_string(),
            _ => "zcash:testnet/slip44:133".to_string(),
        }
    }

    fn ticker(&self) -> &str {
        "ZEC"
    }

    fn decimals(&self) -> u8 {
        8
    }

    fn block_explorer_url(&self, tx_hash: &str) -> String {
        match self.network_type {
            zcash_protocol::consensus::NetworkType::Main => {
                format!("https://mainnet.zcashexplorer.app/tx/{}", tx_hash)
            }
            _ => {
                format!("https://testnet.zcashexplorer.app/tx/{}", tx_hash)
            }
        }
    }

    fn default_derivation_path(&self, account: u32) -> String {
        crate::derivation_path(account)
    }

    fn default_account_name(&self, account_index: u32) -> String {
        format!("Zcash Account {account_index}")
    }

    fn lightwalletd_host(&self) -> Option<String> {
        self.lightwalletd_host.clone()
    }

    // ── Key operations ──────────────────────────────────────────────────────

    fn derive_address_from_viewing_key(&self, vk: &[u8], index: u32) -> Result<String, String> {
        crate::address::derive_from_fvk(vk, index, self.network_type).map_err(|e| e.to_string())
    }

    // ── Chain sync ──────────────────────────────────────────────────────────

    async fn get_sync_status(&self) -> Result<SyncStatus, String> {
        let wallet = self
            .wallet_addr
            .as_ref()
            .ok_or_else(|| "WalletDb not initialized".to_string())?;
        let status = wallet.ask(GetStatus).await?;
        Ok(status)
    }

    // ── Transfer operations ──────────────────────────────────────────────────

    async fn create_transfer(
        &self,
        account: u32,
        to: String,
        amount: u64,
        memo: Option<String>,
    ) -> Result<Vec<u8>, String> {
        let wallet = self
            .wallet_addr
            .as_ref()
            .ok_or_else(|| "WalletDb not initialized".to_string())?;
        wallet
            .ask(ProposeAndBuild {
                public_key: vec![],
                account,
                to,
                amount,
                memo,
            })
            .await
    }

    async fn estimate_fee(
        &self,
        to: String,
        amount: u64,
        memo: Option<String>,
    ) -> Result<u64, String> {
        let wallet = self
            .wallet_addr
            .as_ref()
            .ok_or_else(|| "WalletDb not initialized".to_string())?;
        let fee: u64 = wallet.ask(EstimateFee { to, amount, memo }).await?;
        Ok(fee)
    }

    // ── History & status ────────────────────────────────────────────────────

    async fn get_history(
        &self,
        account: u32,
        cursor: Option<String>,
        limit: u32,
    ) -> Result<Page<HistoryEntry>, String> {
        let wallet = self
            .wallet_addr
            .as_ref()
            .ok_or_else(|| "WalletDb not initialized".to_string())?;
        let page: Page<HistoryEntry> = wallet
            .ask(GetHistory {
                account,
                cursor,
                limit,
            })
            .await?;
        Ok(page)
    }

    async fn get_transaction_status(&self, txid: String) -> Result<TxStatus, String> {
        let wallet = self
            .wallet_addr
            .as_ref()
            .ok_or_else(|| "WalletDb not initialized".to_string())?;
        let status: TxStatus = wallet.ask(GetTxStatus { txid }).await?;
        Ok(status)
    }

    async fn get_current_block_height(
        &self,
        lightwalletd_host: String,
    ) -> Result<BlockHeight, String> {
        let wallet = self
            .wallet_addr
            .as_ref()
            .ok_or_else(|| "WalletDb not initialized".to_string())?;
        let height: paypunk_types::BlockHeight =
            wallet.ask(GetBlockHeight { lightwalletd_host }).await?;
        Ok(height)
    }

    async fn sync_account(
        &self,
        viewing_key: &[u8],
        birthday_height: u64,
        address: &str,
    ) -> Result<(), String> {
        if viewing_key.len() != 96 {
            return Err(format!(
                "expected 96-byte Orchard FVK, got {} bytes",
                viewing_key.len(),
            ));
        }

        {
            let mut map = self
                .address_viewing_keys
                .lock()
                .map_err(|e| e.to_string())?;
            map.insert(address.to_string(), viewing_key.to_vec());
        }

        // Import FVK into the wallet DB (fast, non-blocking)
        let wallet = self
            .wallet_addr
            .as_ref()
            .ok_or_else(|| "WalletDb not initialized".to_string())?;
        let _ = wallet
            .ask(RegisterAccount {
                fvk: viewing_key.to_vec(),
                birthday_height,
            })
            .await?;

        // Trigger initial scan in the background (non-blocking for the caller)
        if let Some(scan) = &self.scan_recipient {
            let scan = scan.clone();
            tokio::spawn(async move {
                if let Err(e) = scan.ask(SyncNewAccount { birthday_height }).await {
                    warn!("SyncNewAccount failed: {e}");
                }
            });
        }

        Ok(())
    }

    async fn sync_incremental(&self) -> Result<(), String> {
        if let Some(sync) = &self.sync_recipient {
            let sync = sync.clone();
            tokio::spawn(async move {
                let _ = sync.ask(Sync).await;
            });
        }
        Ok(())
    }
}
