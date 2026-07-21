use super::types::*;
use super::WalletApi;
use async_trait::async_trait;
use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use tokio::sync::oneshot;

struct MockData {
    accounts: Vec<AccountInfo>,
    next_account_index: u32,
    address_book: Vec<AddressBookEntry>,
    balances: HashMap<String, String>, // account_id → raw spendable balance
    sync_in_progress: bool,
    sync_current: u64,
    sync_target: u64,
}

pub struct MockWalletApi {
    wallet_exists: bool,
    data: Mutex<MockData>,
    home_cache: Mutex<Option<HomeData>>,
    send_cache: Mutex<HashMap<String, SendData>>,
    receive_cache: Mutex<HashMap<String, ReceiveData>>,
    pending_account_id: Mutex<Option<String>>,
    pending_send_result: Mutex<Option<oneshot::Receiver<Result<SendResult, String>>>>,
    send_phase: Arc<Mutex<String>>,
}

impl MockWalletApi {
    pub fn new() -> Self {
        Self {
            wallet_exists: false,
            data: Mutex::new(MockData {
                accounts: vec![
                    AccountInfo {
                        account_id: "acc_1".into(),
                        name: "Ethereum Wallet".into(),
                        chain_id: "eip155:1".into(),
                        address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e".into(),
                        protocol: "Ethereum".into(),
                    },
                    AccountInfo {
                        account_id: "acc_2".into(),
                        name: "Zcash Wallet".into(),
                        chain_id: "bip122:00040fe8ec8471911baa1f7c215a71e9".into(),
                        address: "t1YhnKpPk6KxqGHgK7LKzK5qLpK5qLpK5qL".into(),
                        protocol: "Zcash".into(),
                    },
                ],
                next_account_index: 3,
                address_book: vec![
                    AddressBookEntry {
                        name: "Alice (Ethereum)".into(),
                        address: "0x1234567890abcdef1234567890abcdef12345678".into(),
                        protocol: "Ethereum".into(),
                    },
                    AddressBookEntry {
                        name: "Bob (Zcash)".into(),
                        address: "t1BobAddress33charsLongxxxxxxxxxxxxxxx".into(),
                        protocol: "Zcash".into(),
                    },
                ],
                balances: HashMap::from([
                    ("acc_1".into(), "1420000000000000000".into()),
                    ("acc_2".into(), "500000000".into()),
                ]),
                sync_in_progress: false,
                sync_current: 0,
                sync_target: 0,
            }),
            home_cache: Mutex::new(None),
            send_cache: Mutex::new(HashMap::new()),
            receive_cache: Mutex::new(HashMap::new()),
            pending_account_id: Mutex::new(None),
            pending_send_result: Mutex::new(None),
            send_phase: Arc::new(Mutex::new(String::new())),
        }
    }

    pub fn set_wallet_exists(&mut self, exists: bool) {
        self.wallet_exists = exists;
    }
}

#[async_trait]
impl WalletApi for MockWalletApi {
    async fn get_setup(&self) -> SetupData {
        SetupData {
            app_version: "1.0.0".to_string(),
            wallet_exists: self.wallet_exists,
            new_mnemonic: vec![
                "ribbon".into(),
                "velvet".into(),
                "ocean".into(),
                "puzzle".into(),
                "harvest".into(),
                "guitar".into(),
                "shadow".into(),
                "ladder".into(),
                "comfort".into(),
                "raven".into(),
                "spring".into(),
                "anchor".into(),
            ],
            word_count: 12,
            import_methods: vec!["mnemonic".into(), "privateKey".into()],
        }
    }

    async fn submit_setup_create(&self, _input: SetupCreateInput) -> Result<(), ApiError> {
        Ok(())
    }

    async fn submit_setup_import(&self, _input: SetupImportInput) -> Result<(), ApiError> {
        Ok(())
    }

    async fn get_assets(&self, account_id: &str) -> AssetsData {
        let data = self.data.lock().unwrap();
        let raw_balance = data.balances.get(account_id).cloned();
        drop(data);

        if let Some(bal_str) = raw_balance {
            let (decimals, ticker, name) = if account_id.contains("bip122") {
                (8u8, "ZEC", "Zcash")
            } else {
                (18u8, "ETH", "Ethereum")
            };
            let divisor = 10u128.pow(decimals as u32) as f64;
            let value = bal_str.parse::<f64>().unwrap_or(0.0) / divisor;
            let holdings = format!("{:.8} {}", value, ticker);

            AssetsData {
                assets: vec![AssetRow {
                    name: name.into(),
                    ticker: ticker.into(),
                    price: if account_id.contains("bip122") {
                        "$28.50".into()
                    } else {
                        "$2,000.00".into()
                    },
                    price_change: if account_id.contains("bip122") {
                        "▲ 1.25%".into()
                    } else {
                        "▲ 5.45%".into()
                    },
                    price_change_up: true,
                    holdings_value: "\u{2014}".into(),
                    holdings_amount: holdings,
                    chain_id: account_id.into(),
                }],
            }
        } else {
            AssetsData { assets: vec![] }
        }
    }

    async fn get_home(&self) -> HomeData {
        let data = self.data.lock().unwrap();
        HomeData {
            accounts: data.accounts.clone(),
            fiat_currency: "USD".into(),
        }
    }

    async fn submit_home(&self, _input: HomeInput) -> HomeData {
        self.get_home().await
    }

    async fn list_accounts(&self) -> Result<Vec<AccountInfo>, ApiError> {
        let data = self.data.lock().unwrap();
        Ok(data.accounts.clone())
    }

    async fn add_account(&self) -> Result<(), ApiError> {
        let mut data = self.data.lock().unwrap();
        let index = data.next_account_index;
        data.next_account_index += 1;

        let account_id = format!("acc_{}", index);
        let is_eth = index % 2 == 0;
        let (name, chain_id, address, protocol) = if is_eth {
            (
                format!("Ethereum Account {}", index),
                "eip155:1".into(),
                format!("0x{:040x}", index),
                "Ethereum".into(),
            )
        } else {
            (
                format!("Zcash Account {}", index),
                "bip122:00040fe8ec8471911baa1f7c215a71e9".into(),
                format!("t1{:33}", index),
                "Zcash".into(),
            )
        };

        data.accounts.push(AccountInfo {
            account_id,
            name,
            chain_id,
            address,
            protocol,
        });
        Ok(())
    }

    async fn add_zcash_account(&self, _birthday_height: u64) -> Result<(), ApiError> {
        self.add_account().await
    }

    async fn get_receive(&self, account_id: &str) -> ReceiveData {
        let data = self.data.lock().unwrap();
        let account = data.accounts.iter().find(|a| a.account_id == account_id);

        match account {
            Some(acc) if acc.protocol == "Zcash" => ReceiveData {
                address: acc.address.clone(),
                chain_id: acc.chain_id.clone(),
                address_format: "transparent".into(),
                qr_payload: format!("zcash:{}", acc.address),
                account_id: account_id.to_string(),
            },
            Some(acc) => ReceiveData {
                address: acc.address.clone(),
                chain_id: acc.chain_id.clone(),
                address_format: "hex".into(),
                qr_payload: format!("ethereum:{}", acc.address),
                account_id: account_id.to_string(),
            },
            None => ReceiveData {
                address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e".into(),
                chain_id: "eip155:1".into(),
                address_format: "hex".into(),
                qr_payload: "ethereum:0x742d35Cc6634C0532925a3b844Bc454e4438f44e".into(),
                account_id: account_id.to_string(),
            },
        }
    }

    async fn submit_receive(&self, input: ReceiveInput) -> ReceiveData {
        if input.selected_chain_id.contains("bip122") {
            ReceiveData {
                address: "t1YhnKpPk6KxqGHgK7LKzK5qLpK5qLpK5qL".into(),
                chain_id: "bip122:00040fe8ec8471911baa1f7c215a71e9".into(),
                address_format: "transparent".into(),
                qr_payload: "zcash:t1YhnKpPk6KxqGHgK7LKzK5qLpK5qLpK5qL".into(),
                account_id: "acc_2".into(),
            }
        } else {
            self.get_receive("acc_1").await
        }
    }

    async fn get_send(&self, account_id: &str) -> SendData {
        let data = self.data.lock().unwrap();
        let account = data.accounts.iter().find(|a| a.account_id == account_id);
        let balance = data
            .balances
            .get(account_id)
            .cloned()
            .unwrap_or_else(|| "0".into());

        match account {
            Some(acc) if acc.protocol == "Zcash" => SendData {
                account_id: account_id.to_string(),
                from_address: acc.address.clone(),
                spendable_balance: balance,
                decimals: 8,
                chain_id: acc.chain_id.clone(),
            },
            Some(acc) => SendData {
                account_id: account_id.to_string(),
                from_address: acc.address.clone(),
                spendable_balance: balance,
                decimals: 18,
                chain_id: acc.chain_id.clone(),
            },
            None => SendData {
                account_id: account_id.to_string(),
                from_address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e".into(),
                spendable_balance: balance,
                decimals: 18,
                chain_id: "eip155:1".into(),
            },
        }
    }

    async fn submit_send_review(&self, input: SendReviewInput) -> SendReviewData {
        let _ = input.memo;
        *self.pending_account_id.lock().unwrap() = Some(input.account_id.clone());
        let fee_est = "409500000000000";
        let total = format!(
            "{}",
            input.amount.parse::<u128>().unwrap_or(0) + fee_est.parse::<u128>().unwrap_or(0)
        );
        SendReviewData {
            to_address: input.to_address,
            amount: input.amount,
            fee_estimate: fee_est.to_string(),
            total_amount: total,
            chain_id: input.chain_id,
            nonce: 42,
            skip_review: false,
        }
    }

    async fn submit_send_confirm(&self, input: SendConfirmInput) -> SendResult {
        // Save recipient to address book
        let to_addr = input.reviewed.to_address.clone();
        self.add_address_book_entry(
            format!("Sent to {}", &to_addr[..to_addr.len().min(20)]),
            to_addr,
            "Ethereum".into(),
        )
        .await;

        // Deduct from balance
        let total = input.reviewed.total_amount.parse::<u128>().unwrap_or(0);
        {
            let mut data = self.data.lock().unwrap();
            let account_id = self.pending_account_id.lock().unwrap().clone();
            if let Some(ref aid) = account_id {
                if let Some(bal) = data.balances.get_mut(aid) {
                    let current = bal.parse::<u128>().unwrap_or(0);
                    *bal = current.saturating_sub(total).to_string();
                }
            }
        }

        // Invalidate caches so next fetch returns fresh data
        self.send_cache.lock().unwrap().clear();

        let (tx, rx) = oneshot::channel();
        *self.pending_send_result.lock().unwrap() = Some(rx);
        let send_phase = self.send_phase.clone();

        tokio::spawn(async move {
            *send_phase.lock().unwrap() = "Signing...".to_string();
            tokio::time::sleep(std::time::Duration::from_millis(300)).await;
            *send_phase.lock().unwrap() = "Broadcasting...".to_string();
            tokio::time::sleep(std::time::Duration::from_millis(300)).await;
            let tx_hash: String =
                "0x02f8b00182002a8459682f00851b572f4e9a7b3c8d2e1f0a4b6c8d0e1f2a3b4c5d6e7f8a9b"
                    .into();
            *send_phase.lock().unwrap() = String::new();
            let _ = tx.send(Ok(SendResult {
                tx_hash: tx_hash.clone(),
                status: "broadcasted".into(),
                block_explorer_url: format!("https://etherscan.io/tx/{}", tx_hash),
            }));
        });

        SendResult {
            tx_hash: String::new(),
            status: "pending".into(),
            block_explorer_url: String::new(),
        }
    }

    async fn get_lock(&self) -> LockData {
        LockData {
            auth_methods: LockAuthMethods { password_set: true },
            failed_attempts: 0,
        }
    }

    async fn submit_lock(&self, _input: LockInput) -> Result<(), ApiError> {
        Ok(())
    }

    async fn get_settings(&self) -> SettingsData {
        SettingsData {
            security: SecuritySettings {
                auto_lock_minutes: 5,
            },
            fiat_currency: "USD".into(),
            app_version: "1.0.0".into(),
        }
    }

    async fn submit_settings(&self, _input: SettingsInput) -> Result<(), ApiError> {
        Ok(())
    }

    async fn submit_reveal_phrase(
        &self,
        _input: RevealPhraseInput,
    ) -> Result<Vec<String>, ApiError> {
        Ok(vec![
            "ribbon".into(),
            "velvet".into(),
            "ocean".into(),
            "puzzle".into(),
            "harvest".into(),
            "guitar".into(),
            "shadow".into(),
            "ladder".into(),
            "comfort".into(),
            "raven".into(),
            "spring".into(),
            "anchor".into(),
        ])
    }

    async fn check_wallet_exists(&self) -> bool {
        false
    }

    async fn unlock(&self, _password: String) -> Result<UnlockData, ApiError> {
        Ok(UnlockData { accounts_count: 2 })
    }

    async fn home_state(&self) -> ApiState<HomeData> {
        let should_fetch = self.home_cache.lock().unwrap().is_none();
        if should_fetch {
            let data = self.get_home().await;
            *self.home_cache.lock().unwrap() = Some(data);
        }
        ApiState::Loaded(self.home_cache.lock().unwrap().as_ref().unwrap().clone())
    }

    async fn refresh_home(&self) {
        *self.home_cache.lock().unwrap() = None;
    }

    async fn receive_state(&self, account_id: &str) -> ApiState<ReceiveData> {
        let data = {
            let cache = self.receive_cache.lock().unwrap();
            cache.get(account_id).cloned()
        };
        if let Some(data) = data {
            return ApiState::Loaded(data);
        }
        let real = self.get_receive(account_id).await;
        self.receive_cache
            .lock()
            .unwrap()
            .insert(account_id.to_string(), real.clone());
        ApiState::Loaded(real)
    }

    async fn refresh_receive(&self, account_id: &str) {
        self.receive_cache.lock().unwrap().remove(account_id);
    }

    async fn send_state(&self, account_id: &str) -> ApiState<SendData> {
        let data = {
            let cache = self.send_cache.lock().unwrap();
            cache.get(account_id).cloned()
        };
        if let Some(data) = data {
            return ApiState::Loaded(data);
        }
        let real = self.get_send(account_id).await;
        self.send_cache
            .lock()
            .unwrap()
            .insert(account_id.to_string(), real.clone());
        ApiState::Loaded(real)
    }

    async fn refresh_send(&self, account_id: &str) {
        self.send_cache.lock().unwrap().remove(account_id);
    }

    async fn get_address_book(&self) -> AddressBookData {
        let data = self.data.lock().unwrap();
        let mut entries = data.address_book.clone();

        // Include all wallet accounts
        for acc in &data.accounts {
            let exists = entries.iter().any(|e| e.address == acc.address);
            if !exists {
                entries.push(AddressBookEntry {
                    name: format!("{} (my {})", acc.name, acc.protocol),
                    address: acc.address.clone(),
                    protocol: acc.protocol.clone(),
                });
            }
        }

        AddressBookData { entries }
    }

    async fn add_address_book_entry(&self, name: String, address: String, protocol: String) {
        let mut data = self.data.lock().unwrap();
        let exists = data.address_book.iter().any(|e| e.address == address);
        if !exists {
            data.address_book.push(AddressBookEntry {
                name,
                address,
                protocol,
            });
        }
    }

    async fn get_sync_status(&self, _protocol: &str) -> SyncStatus {
        SyncStatus {
            is_syncing: false,
            current_height: 2800000,
            target_height: 2800000,
        }
    }

    async fn get_history(&self, _account_id: &str) -> HistoryData {
        HistoryData {
            rows: vec![
                HistoryRow {
                    hash: "0xabcd...1234".into(),
                    direction: "Sent".into(),
                    counterparty: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e".into(),
                    amount: "0.05000000 ZEC".into(),
                    status: "Confirmed".into(),
                    timestamp: Some(1700000000),
                },
                HistoryRow {
                    hash: "0xef01...5678".into(),
                    direction: "Received".into(),
                    counterparty: "0x1234567890abcdef1234567890abcdef12345678".into(),
                    amount: "0.10000000 ZEC".into(),
                    status: "Pending".into(),
                    timestamp: Some(1699900000),
                },
            ],
            next_cursor: None,
            has_more: false,
        }
    }

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
}
