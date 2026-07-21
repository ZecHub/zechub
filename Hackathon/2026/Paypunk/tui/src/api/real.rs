use async_trait::async_trait;
use paypunk_api::Client;
use paypunk_types::{
    ArtifactSummary, EthereumIntent, Intent, ProtocolId, ProtocolMetadata, SubmitIntentResult,
};
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::oneshot;
use tracing::info;
use zeroize::Zeroizing;

use super::types::SyncStatus;
use super::types::*;
use super::WalletApi;

struct PendingSend {
    raw_artifact: Vec<u8>,
    keypunkd_signature: Vec<u8>,
    keypunkd_public_key: [u8; 32],
    derivation_path: String,
    protocol: ProtocolId,
}

pub struct RealWalletApi {
    client: Arc<Client>,
    pending: std::sync::Mutex<Option<PendingSend>>,
    pending_mnemonic: std::sync::Mutex<Option<Zeroizing<String>>>,
    protocol_metadata: Arc<std::sync::Mutex<HashMap<ProtocolId, ProtocolMetadata>>>,
    signer_mode: bool,
    pending_send_result: std::sync::Mutex<Option<oneshot::Receiver<Result<SendResult, String>>>>,
    send_phase: Arc<std::sync::Mutex<String>>,
}

impl RealWalletApi {
    pub async fn connect(socket_path: &str, signer_mode: bool) -> Result<Self, String> {
        let client = Client::connect(socket_path).await?;
        Ok(Self {
            client: Arc::new(client),
            pending: std::sync::Mutex::new(None),
            pending_mnemonic: std::sync::Mutex::new(None),
            protocol_metadata: Arc::new(std::sync::Mutex::new(HashMap::new())),
            signer_mode,
            pending_send_result: std::sync::Mutex::new(None),
            send_phase: Arc::new(std::sync::Mutex::new(String::new())),
        })
    }

    pub fn with_client(client: Client, signer_mode: bool) -> Self {
        Self {
            client: Arc::new(client),
            pending: std::sync::Mutex::new(None),
            pending_mnemonic: std::sync::Mutex::new(None),
            protocol_metadata: Arc::new(std::sync::Mutex::new(HashMap::new())),
            signer_mode,
            pending_send_result: std::sync::Mutex::new(None),
            send_phase: Arc::new(std::sync::Mutex::new(String::new())),
        }
    }
}

fn format_balance(raw: &str, decimals: u8, ticker: &str) -> String {
    let divisor = 10u128.pow(decimals as u32) as f64;
    let value = raw.parse::<f64>().unwrap_or(0.0) / divisor;
    format!("{:.8} {}", value, ticker)
}

impl RealWalletApi {
    async fn ensure_metadata(&self) {
        {
            let cache = self.protocol_metadata.lock().unwrap();
            if !cache.is_empty() {
                return;
            }
        }
        if let Ok(metadata) = self.client.get_protocol_metadata().await {
            let mut cache = self.protocol_metadata.lock().unwrap();
            for m in metadata {
                cache.insert(m.id, m);
            }
        }
    }

    fn explorer_url_from_cache(
        cache: &HashMap<ProtocolId, ProtocolMetadata>,
        protocol: &ProtocolId,
        tx_hash: &str,
    ) -> String {
        cache
            .get(protocol)
            .map(|m| m.block_explorer_template.replace("{tx_hash}", tx_hash))
            .unwrap_or_default()
    }

    async fn protocol_chain(&self, protocol: &ProtocolId) -> String {
        self.ensure_metadata().await;
        let cache = self.protocol_metadata.lock().unwrap();
        cache
            .get(protocol)
            .map(|m| m.chain_id.clone())
            .unwrap_or_else(|| "eip155:1".to_string())
    }

    async fn protocol_asset(&self, protocol: &ProtocolId) -> String {
        self.ensure_metadata().await;
        let cache = self.protocol_metadata.lock().unwrap();
        cache
            .get(protocol)
            .map(|m| m.native_asset.clone())
            .unwrap_or_else(|| "eip155:1/slip44:60".to_string())
    }

    async fn protocol_decimals(&self, protocol: &ProtocolId) -> u8 {
        self.ensure_metadata().await;
        let cache = self.protocol_metadata.lock().unwrap();
        cache.get(protocol).map(|m| m.decimals).unwrap_or(18)
    }

    async fn protocol_ticker(&self, protocol: &ProtocolId) -> String {
        self.ensure_metadata().await;
        let cache = self.protocol_metadata.lock().unwrap();
        cache
            .get(protocol)
            .map(|m| m.ticker.clone())
            .unwrap_or_else(|| "ETH".to_string())
    }

    async fn protocol_block_explorer_url(&self, protocol: &ProtocolId, tx_hash: &str) -> String {
        self.ensure_metadata().await;
        let cache = self.protocol_metadata.lock().unwrap();
        Self::explorer_url_from_cache(&cache, protocol, tx_hash)
    }
}

#[async_trait]
impl WalletApi for RealWalletApi {
    async fn get_setup(&self) -> SetupData {
        let mnemonic = self.client.generate_mnemonic();
        let words: Vec<String> = mnemonic.split_whitespace().map(|s| s.to_string()).collect();
        *self.pending_mnemonic.lock().unwrap() = Some(mnemonic);
        SetupData {
            app_version: "0.1.0".to_string(),
            wallet_exists: false,
            new_mnemonic: words,
            word_count: 12,
            import_methods: vec!["mnemonic".into()],
        }
    }

    async fn submit_setup_create(&self, input: SetupCreateInput) -> Result<(), ApiError> {
        let mnemonic = self
            .pending_mnemonic
            .lock()
            .unwrap()
            .take()
            .ok_or_else(|| ApiError("no pending mnemonic — generate seed first".into()))?;
        self.client
            .restore_seed(mnemonic, Zeroizing::new(input.password.clone()), None)
            .await
            .map_err(|e| ApiError(e))?;
        self.client
            .unlock(Zeroizing::new(input.password))
            .await
            .map(|_| ())
            .map_err(|e| ApiError(e))
    }

    async fn submit_setup_import(&self, input: SetupImportInput) -> Result<(), ApiError> {
        self.client
            .restore_seed(
                Zeroizing::new(input.secret.clone()),
                Zeroizing::new(input.password.clone()),
                None,
            )
            .await
            .map_err(|e| ApiError(e))?;
        self.client
            .unlock(Zeroizing::new(input.password))
            .await
            .map(|_| ())
            .map_err(|e| ApiError(e))
    }

    async fn get_assets(&self, account_id: &str) -> AssetsData {
        match self.client.get_account(account_id.to_string()).await {
            Ok(Some(account)) => {
                info!("TUI API: get_assets()");
                let chain = self.protocol_chain(&account.protocol).await;
                let asset = self.protocol_asset(&account.protocol).await;
                let decimals = self.protocol_decimals(&account.protocol).await;
                let ticker = self.protocol_ticker(&account.protocol).await;
                let caip10 = format!("{}:{}", chain, account.address);
                let balance = self
                    .client
                    .get_balance(caip10, asset.to_string())
                    .await
                    .map(|b| b.total.0.to_string())
                    .unwrap_or_else(|_| "0".to_string());
                let holdings = format_balance(&balance, decimals, &ticker);
                info!("TUI API: get_assets() holdings={}", holdings);
                AssetsData {
                    assets: vec![AssetRow {
                        name: ticker.clone(),
                        ticker,
                        price: "\u{2014}".into(),
                        price_change: "\u{2014}".into(),
                        price_change_up: true,
                        holdings_value: "\u{2014}".into(),
                        holdings_amount: holdings,
                        chain_id: chain,
                    }],
                }
            }
            _ => AssetsData { assets: vec![] },
        }
    }

    async fn get_home(&self) -> HomeData {
        match self.client.list_accounts().await {
            Ok(accounts) => {
                let mut account_rows = Vec::with_capacity(accounts.len());
                for a in &accounts {
                    let chain = self.protocol_chain(&a.protocol).await;
                    account_rows.push(AccountInfo {
                        account_id: a.id.clone(),
                        name: a.name.clone(),
                        address: a.address.clone(),
                        chain_id: chain,
                        protocol: format!("{:?}", a.protocol),
                    });
                }
                HomeData {
                    accounts: account_rows,
                    fiat_currency: "USD".into(),
                }
            }
            Err(_) => HomeData {
                accounts: vec![],
                fiat_currency: "USD".into(),
            },
        }
    }

    async fn submit_home(&self, _input: HomeInput) -> HomeData {
        self.get_home().await
    }

    async fn home_state(&self) -> ApiState<HomeData> {
        ApiState::Loaded(self.get_home().await)
    }

    async fn refresh_home(&self) {}

    async fn list_accounts(&self) -> Result<Vec<AccountInfo>, ApiError> {
        let accounts = self.client.list_accounts().await.map_err(ApiError)?;
        let mut result = Vec::with_capacity(accounts.len());
        for a in &accounts {
            let chain = self.protocol_chain(&a.protocol).await;
            result.push(AccountInfo {
                account_id: a.id.clone(),
                name: a.name.clone(),
                address: a.address.clone(),
                chain_id: chain,
                protocol: format!("{:?}", a.protocol),
            });
        }
        Ok(result)
    }

    async fn add_account(&self) -> Result<(), ApiError> {
        let accounts = self.client.list_accounts().await.map_err(ApiError)?;
        // Group accounts by protocol, find the one with the fewest accounts
        let mut protocol_counts: std::collections::HashMap<ProtocolId, usize> =
            std::collections::HashMap::new();
        for a in &accounts {
            *protocol_counts.entry(a.protocol).or_insert(0) += 1;
        }
        // Pick the protocol with the fewest accounts (to balance them), or first available
        let (target_protocol, next_index) = protocol_counts
            .iter()
            .min_by_key(|(_, &count)| count)
            .map(|(p, &count)| (*p, count as u32))
            .unwrap_or((ProtocolId::Ethereum, 0));
        let path = self.client.derivation_path(target_protocol, next_index);
        let name = format!("{target_protocol:?} Account {next_index}");
        let _ = self
            .client
            .create_account(target_protocol, path, next_index, name, None)
            .await
            .map_err(ApiError)?;
        Ok(())
    }

    async fn add_zcash_account(&self, birthday_height: u64) -> Result<(), ApiError> {
        let accounts = self.client.list_accounts().await.map_err(ApiError)?;
        let zcash_count = accounts
            .iter()
            .filter(|a| a.protocol == ProtocolId::Zcash)
            .count();
        let path = self
            .client
            .derivation_path(ProtocolId::Zcash, zcash_count as u32);
        let name = format!("Zcash Account {zcash_count}");
        self.client
            .create_account(
                ProtocolId::Zcash,
                path,
                zcash_count as u32,
                name,
                Some(birthday_height),
            )
            .await
            .map_err(ApiError)?;
        Ok(())
    }

    async fn get_receive(&self, account_id: &str) -> ReceiveData {
        match self.client.get_account(account_id.to_string()).await {
            Ok(Some(account)) => {
                let chain = self.protocol_chain(&account.protocol).await;
                let qr_payload = account.address.clone();
                ReceiveData {
                    address: account.address.clone(),
                    chain_id: chain,
                    address_format: "hex".to_string(),
                    qr_payload,
                    account_id: account_id.to_string(),
                }
            }
            _ => ReceiveData {
                address: "unknown".into(),
                chain_id: "eip155:1".into(),
                address_format: "hex".into(),
                qr_payload: String::new(),
                account_id: account_id.to_string(),
            },
        }
    }

    async fn submit_receive(&self, input: ReceiveInput) -> ReceiveData {
        self.get_receive(&input.selected_chain_id).await
    }

    async fn receive_state(&self, account_id: &str) -> ApiState<ReceiveData> {
        ApiState::Loaded(self.get_receive(account_id).await)
    }

    async fn refresh_receive(&self, _account_id: &str) {}

    async fn get_send(&self, account_id: &str) -> SendData {
        match self.client.get_account(account_id.to_string()).await {
            Ok(Some(account)) => {
                let chain = self.protocol_chain(&account.protocol).await;
                let asset = self.protocol_asset(&account.protocol).await;
                let decimals = self.protocol_decimals(&account.protocol).await;
                let caip10 = format!("{}:{}", chain, account.address);
                let balance = self
                    .client
                    .get_balance(caip10, asset)
                    .await
                    .map(|b| b.spendable.0.to_string())
                    .unwrap_or_else(|_| "0".to_string());
                SendData {
                    account_id: account_id.to_string(),
                    from_address: account.address,
                    spendable_balance: balance,
                    decimals,
                    chain_id: chain.to_string(),
                }
            }
            _ => SendData {
                account_id: account_id.to_string(),
                from_address: String::new(),
                spendable_balance: "0".to_string(),
                decimals: 18,
                chain_id: "eip155:1".to_string(),
            },
        }
    }

    async fn submit_send_review(&self, input: SendReviewInput) -> SendReviewData {
        let account = self
            .client
            .get_account(input.account_id.clone())
            .await
            .ok()
            .flatten();

        let (from_address, derivation_path, protocol) = match &account {
            Some(a) => (a.address.clone(), a.derivation_path.clone(), a.protocol),
            None => {
                return SendReviewData {
                    to_address: "error: account not found".into(),
                    amount: String::new(),
                    fee_estimate: String::new(),
                    total_amount: String::new(),
                    chain_id: input.chain_id,
                    nonce: 0,
                    skip_review: false,
                }
            }
        };

        let asset = self.protocol_asset(&protocol).await;
        let intent = match protocol {
            ProtocolId::Ethereum => Intent::Ethereum(EthereumIntent::Transfer {
                to: input.to_address.clone(),
                amount: input.amount.clone(),
                from: from_address,
                asset,
                data: None,
            }),
            ProtocolId::Zcash => Intent::Zcash(paypunk_types::ZcashIntent::Transfer {
                to: input.to_address.clone(),
                amount: input.amount.clone(),
                from: from_address,
                asset,
                memo: input.memo.clone(),
            }),
        };

        if self.signer_mode {
            let (tx, rx) = oneshot::channel();
            *self.pending_send_result.lock().unwrap() = Some(rx);
            let client = self.client.clone();
            let protocol_id = protocol;
            let intent = intent;
            let derivation_path = derivation_path;
            let send_phase = self.send_phase.clone();
            let metadata_cache = self.protocol_metadata.clone();

            tokio::spawn(async move {
                *send_phase.lock().unwrap() = match protocol_id {
                    ProtocolId::Zcash => "Proving & Signing...".to_string(),
                    ProtocolId::Ethereum => "Signing...".to_string(),
                };
                let result = match client.submit_intent(intent, &derivation_path).await {
                    Ok(SubmitIntentResult::SignatureApproved { signed_artifact }) => {
                        *send_phase.lock().unwrap() = "Broadcasting...".to_string();
                        match client
                            .broadcast_transaction(protocol_id, signed_artifact)
                            .await
                        {
                            Ok(tx_hash) => {
                                let url = Self::explorer_url_from_cache(
                                    &metadata_cache.lock().unwrap(),
                                    &protocol_id,
                                    &tx_hash,
                                );
                                Ok(SendResult {
                                    tx_hash,
                                    status: "broadcasted".to_string(),
                                    block_explorer_url: url,
                                })
                            }
                            Err(e) => Err(e),
                        }
                    }
                    Ok(_) => Err("unexpected preview in signer mode".to_string()),
                    Err(e) => Err(e),
                };
                *send_phase.lock().unwrap() = String::new();
                let _ = tx.send(result);
            });

            return SendReviewData {
                to_address: String::new(),
                amount: String::new(),
                fee_estimate: String::new(),
                total_amount: String::new(),
                chain_id: input.chain_id,
                nonce: 0,
                skip_review: true,
            };
        }

        match self.client.submit_intent(intent, &derivation_path).await {
            Ok(SubmitIntentResult::SignablePreview {
                raw_artifact,
                parsed_summary,
                keypunkd_signature,
                keypunkd_public_key,
            }) => {
                let pending = PendingSend {
                    raw_artifact,
                    keypunkd_signature,
                    keypunkd_public_key,
                    derivation_path,
                    protocol,
                };
                *self.pending.lock().unwrap() = Some(pending);

                if let Ok(summary) = postcard::from_bytes::<ArtifactSummary>(&parsed_summary) {
                    match &summary {
                        ArtifactSummary::Zcash(zcash) => {
                            let recipient_amount = zcash
                                .outputs
                                .iter()
                                .find(|o| o.address == input.to_address)
                                .map(|o| o.amount.clone())
                                .unwrap_or_else(|| {
                                    zcash
                                        .outputs
                                        .first()
                                        .map(|o| o.amount.clone())
                                        .unwrap_or_else(|| "0".to_string())
                                });
                            let amount_u = recipient_amount.parse::<u128>().unwrap_or(0);
                            let fee_u = zcash.fee.parse::<u128>().unwrap_or(0);
                            SendReviewData {
                                to_address: input.to_address.clone(),
                                amount: recipient_amount,
                                fee_estimate: zcash.fee.clone(),
                                total_amount: (amount_u + fee_u).to_string(),
                                chain_id: input.chain_id,
                                nonce: 0,
                                skip_review: false,
                            }
                        }
                        ArtifactSummary::Ethereum(eth) => {
                            let total = eth.amount.parse::<u128>().unwrap_or(0)
                                + eth.fee.parse::<u128>().unwrap_or(0);
                            SendReviewData {
                                to_address: eth.to.clone(),
                                amount: eth.amount.clone(),
                                fee_estimate: eth.fee.clone(),
                                total_amount: total.to_string(),
                                chain_id: input.chain_id,
                                nonce: eth.nonce,
                                skip_review: false,
                            }
                        }
                    }
                } else {
                    SendReviewData {
                        to_address: input.to_address,
                        amount: input.amount.clone(),
                        fee_estimate: "unknown".into(),
                        total_amount: input.amount,
                        chain_id: input.chain_id,
                        nonce: 0,
                        skip_review: false,
                    }
                }
            }
            Ok(SubmitIntentResult::SignatureApproved { .. }) => SendReviewData {
                to_address: "already signed".into(),
                amount: String::new(),
                fee_estimate: String::new(),
                total_amount: String::new(),
                chain_id: input.chain_id,
                nonce: 0,
                skip_review: false,
            },
            Err(e) => SendReviewData {
                to_address: format!("Error: {e}"),
                amount: String::new(),
                fee_estimate: String::new(),
                total_amount: String::new(),
                chain_id: input.chain_id,
                nonce: 0,
                skip_review: false,
            },
        }
    }

    async fn submit_send_confirm(&self, input: SendConfirmInput) -> SendResult {
        let pending = self.pending.lock().unwrap().take();
        let password = input.auth_confirmation.value.clone();

        match pending {
            Some(p) => {
                let to_addr = input.reviewed.to_address.clone();
                let is_own_account = self
                    .client
                    .list_accounts()
                    .await
                    .map(|accs| accs.iter().any(|a| a.address == to_addr))
                    .unwrap_or(false);
                if !is_own_account {
                    let _ = self
                        .add_address_book_entry(
                            format!("Sent to {}", &to_addr[..to_addr.len().min(20)]),
                            to_addr,
                            format!("{:?}", p.protocol),
                        )
                        .await;
                }

                let (tx, rx) = oneshot::channel();
                *self.pending_send_result.lock().unwrap() = Some(rx);

                let client = self.client.clone();
                let raw_artifact = p.raw_artifact;
                let keypunkd_signature = p.keypunkd_signature;
                let derivation_path = p.derivation_path;
                let protocol = p.protocol;
                let send_phase = self.send_phase.clone();
                let metadata_cache = self.protocol_metadata.clone();

                tokio::spawn(async move {
                    *send_phase.lock().unwrap() = match protocol {
                        ProtocolId::Zcash => "Proving & Signing...".to_string(),
                        ProtocolId::Ethereum => "Signing...".to_string(),
                    };
                    let result = match client
                        .approve_signature(
                            &raw_artifact,
                            &keypunkd_signature,
                            Zeroizing::new(password),
                            &derivation_path,
                        )
                        .await
                    {
                        Ok(signed_artifact) => {
                            *send_phase.lock().unwrap() = "Broadcasting...".to_string();
                            match client
                                .broadcast_transaction(protocol, signed_artifact)
                                .await
                            {
                                Ok(tx_hash) => {
                                    let url = Self::explorer_url_from_cache(
                                        &metadata_cache.lock().unwrap(),
                                        &protocol,
                                        &tx_hash,
                                    );
                                    Ok(SendResult {
                                        tx_hash,
                                        status: "broadcasted".into(),
                                        block_explorer_url: url,
                                    })
                                }
                                Err(e) => Err(format!("broadcast failed: {e}")),
                            }
                        }
                        Err(e) => Err(format!("signing failed: {e}")),
                    };
                    *send_phase.lock().unwrap() = String::new();
                    let _ = tx.send(result);
                });

                SendResult {
                    tx_hash: String::new(),
                    status: "pending".into(),
                    block_explorer_url: String::new(),
                }
            }
            None => SendResult {
                tx_hash: String::new(),
                status: "error: no pending transaction".into(),
                block_explorer_url: String::new(),
            },
        }
    }

    async fn send_state(&self, account_id: &str) -> ApiState<SendData> {
        ApiState::Loaded(self.get_send(account_id).await)
    }

    async fn refresh_send(&self, _account_id: &str) {}

    async fn poll_send_result(&self) -> Option<SendResult> {
        let mut guard = self.pending_send_result.lock().unwrap();
        if let Some(rx) = guard.as_mut() {
            match rx.try_recv() {
                Ok(Ok(result)) => {
                    *guard = None;
                    return Some(result);
                }
                Ok(Err(e)) => {
                    *guard = None;
                    *self.send_phase.lock().unwrap() = String::new();
                    return Some(SendResult {
                        tx_hash: String::new(),
                        status: format!("failed: {e}"),
                        block_explorer_url: String::new(),
                    });
                }
                Err(oneshot::error::TryRecvError::Empty) => {}
                Err(oneshot::error::TryRecvError::Closed) => {
                    *guard = None;
                }
            }
        }
        None
    }

    async fn poll_send_phase(&self) -> String {
        self.send_phase.lock().unwrap().clone()
    }

    async fn get_lock(&self) -> LockData {
        match self.client.get_lock_state().await {
            Ok((password_set, failed_attempts)) => LockData {
                auth_methods: LockAuthMethods { password_set },
                failed_attempts,
            },
            Err(_) => LockData {
                auth_methods: LockAuthMethods {
                    password_set: false,
                },
                failed_attempts: 0,
            },
        }
    }

    async fn submit_lock(&self, input: LockInput) -> Result<(), ApiError> {
        self.client
            .verify_password(zeroize::Zeroizing::new(input.credential.value))
            .await
            .map_err(|e| ApiError(e))
    }

    async fn get_settings(&self) -> SettingsData {
        match self.client.get_settings().await {
            Ok((auto_lock_minutes, fiat_currency)) => SettingsData {
                security: SecuritySettings { auto_lock_minutes },
                fiat_currency,
                app_version: "0.1.0".into(),
            },
            Err(_) => SettingsData {
                security: SecuritySettings {
                    auto_lock_minutes: 5,
                },
                fiat_currency: "USD".into(),
                app_version: "0.1.0".into(),
            },
        }
    }

    async fn submit_settings(&self, input: SettingsInput) -> Result<(), ApiError> {
        self.client
            .save_settings(
                input.updated_security.auto_lock_minutes,
                input.fiat_currency,
            )
            .await
            .map_err(|e| ApiError(e))
    }

    async fn submit_reveal_phrase(
        &self,
        input: RevealPhraseInput,
    ) -> Result<Vec<String>, ApiError> {
        let mnemonic = self
            .client
            .reveal_phrase(Zeroizing::new(input.value))
            .await
            .map_err(|e| ApiError(e))?;
        Ok(mnemonic.split_whitespace().map(|s| s.to_string()).collect())
    }

    async fn check_wallet_exists(&self) -> bool {
        self.client.check_wallet_exists().await.unwrap_or(false)
    }

    async fn unlock(&self, password: String) -> Result<UnlockData, ApiError> {
        if self.signer_mode {
            self.client
                .register_signer()
                .await
                .map(|accounts_count| UnlockData { accounts_count })
                .map_err(|e| ApiError(e))
        } else {
            self.client
                .unlock(Zeroizing::new(password))
                .await
                .map(|accounts_count| UnlockData { accounts_count })
                .map_err(|e| ApiError(e))
        }
    }

    async fn get_address_book(&self) -> AddressBookData {
        let mut entries = match self.client.get_address_book().await {
            Ok(entries) => entries
                .into_iter()
                .map(|e| AddressBookEntry {
                    name: e.name,
                    address: e.address,
                    protocol: e.protocol,
                })
                .collect::<Vec<_>>(),
            Err(_) => Vec::new(),
        };

        // Populate from wallet accounts
        if let Ok(accounts) = self.client.list_accounts().await {
            for acc in &accounts {
                let ticker = self.protocol_ticker(&acc.protocol).await;
                let exists = entries.iter().any(|e| e.address == acc.address);
                if !exists {
                    entries.push(AddressBookEntry {
                        name: format!("{} ({})", acc.name, ticker),
                        address: acc.address.clone(),
                        protocol: format!("{:?}", acc.protocol),
                    });
                }
            }
        }

        AddressBookData { entries }
    }

    async fn add_address_book_entry(&self, name: String, address: String, protocol: String) {
        let _ = self
            .client
            .add_address_book_entry(name, address, protocol)
            .await;
    }

    async fn get_sync_status(&self, protocol: &str) -> SyncStatus {
        let protocol_id = match protocol {
            "Zcash" => paypunk_types::ProtocolId::Zcash,
            "Ethereum" => paypunk_types::ProtocolId::Ethereum,
            _ => return SyncStatus::default(),
        };
        match self.client.get_sync_status(protocol_id).await {
            Ok(s) => SyncStatus {
                is_syncing: s.is_syncing,
                current_height: s.current_height,
                target_height: s.target_height,
            },
            Err(_) => SyncStatus::default(),
        }
    }

    async fn get_history(&self, account_id: &str) -> HistoryData {
        info!("get_history called for account_id={}", account_id);
        match self.client.get_account(account_id.to_string()).await {
            Ok(Some(account)) => {
                info!(
                    "get_history: found account protocol={:?} derivation_path={}",
                    account.protocol, account.derivation_path
                );
                let protocol = account.protocol;
                let decimals = self.protocol_decimals(&protocol).await;
                let ticker = self.protocol_ticker(&protocol).await;

                let account_index: u32 = account
                    .derivation_path
                    .rsplit('\'')
                    .nth(1)
                    .and_then(|s| s.split('/').last())
                    .and_then(|s| s.parse().ok())
                    .unwrap_or(0);

                info!(
                    "get_history: calling IPC with protocol={:?} account_index={}",
                    protocol, account_index
                );

                match self
                    .client
                    .get_history(protocol, account_index, None, 50)
                    .await
                {
                    Ok(entries) => {
                        info!("get_history: IPC returned {} entries", entries.len());
                        let rows: Vec<HistoryRow> = entries
                            .into_iter()
                            .map(|e| {
                                let direction = match e.direction {
                                    paypunk_types::TxDirection::Incoming => "Received".into(),
                                    paypunk_types::TxDirection::Outgoing => "Sent".into(),
                                    paypunk_types::TxDirection::SelfTransfer => "Self".into(),
                                };
                                let status = match e.status {
                                    paypunk_types::TxStatus::Pending => "Pending".into(),
                                    paypunk_types::TxStatus::Confirmed { .. } => "Confirmed".into(),
                                    paypunk_types::TxStatus::Failed { reason } => {
                                        format!("Failed: {reason}")
                                    }
                                    paypunk_types::TxStatus::NotFound => "Not found".into(),
                                };
                                let divisor = 10u128.pow(decimals as u32) as f64;
                                let amount_val = e.amount.0 as f64 / divisor;
                                let amount = format!("{:.8} {ticker}", amount_val);
                                HistoryRow {
                                    hash: e.hash,
                                    direction,
                                    counterparty: e.counterparty.0,
                                    amount,
                                    status,
                                    timestamp: e.timestamp,
                                }
                            })
                            .collect();
                        HistoryData {
                            rows,
                            next_cursor: None,
                            has_more: false,
                        }
                    }
                    Err(e) => {
                        info!("get_history: IPC error: {}", e);
                        HistoryData {
                            rows: vec![],
                            next_cursor: None,
                            has_more: false,
                        }
                    }
                }
            }
            Ok(None) => {
                info!("get_history: account not found for id={}", account_id);
                HistoryData {
                    rows: vec![],
                    next_cursor: None,
                    has_more: false,
                }
            }
            Err(e) => {
                info!("get_history: get_account error: {}", e);
                HistoryData {
                    rows: vec![],
                    next_cursor: None,
                    has_more: false,
                }
            }
        }
    }
}
