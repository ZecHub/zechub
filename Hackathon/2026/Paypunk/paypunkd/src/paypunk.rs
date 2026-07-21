use std::collections::HashMap;

use keypunkd::crypto::Keypair;
use paypunk_types::{KeypunkdResponse, ProtocolId};
use tracing::{debug, info, warn};

use crate::database::repository::{
    SqliteAccountsRepository, SqliteAddressBookRepository, SqliteSignerStateRepository,
};
use crate::database::{AccountsRepository, AddressBookRepository, Database, SignerStateRepository};
use crate::messages::{PaypunkdRequest, PaypunkdResponse};
use crate::protocol_service::ProtocolService;
use crate::usecases;

pub struct Paypunk {
    keypunk_service: keypunkd::services::KeypunkService,
    protocols: ProtocolService,
    db: Database,
    accounts_repo: Box<dyn AccountsRepository>,
    address_book_repo: Box<dyn AddressBookRepository>,
    signer_state_repo: Box<dyn SignerStateRepository>,
    keystore: Keypair,
    failed_attempts: u32,
}

impl Paypunk {
    pub fn new(
        recipient: tactix::Recipient<paypunk_ipc::IpcMessage>,
        protocols: ProtocolService,
        db: Database,
        keystore: Keypair,
    ) -> Self {
        Self {
            keypunk_service: keypunkd::services::KeypunkService::new(recipient),
            protocols,
            db,
            accounts_repo: Box::new(SqliteAccountsRepository),
            address_book_repo: Box::new(SqliteAddressBookRepository),
            signer_state_repo: Box::new(SqliteSignerStateRepository),
            keystore,
            failed_attempts: 0,
        }
    }

    fn respond<T>(
        &self,
        label: &str,
        result: Result<T, String>,
        map_ok: impl FnOnce(T) -> PaypunkdResponse,
    ) -> PaypunkdResponse {
        match result {
            Ok(v) => map_ok(v),
            Err(e) => {
                warn!(error = %e, "{label} failed");
                PaypunkdResponse::Error { message: e }
            }
        }
    }

    async fn get_keypunk_encryption_key(&self) -> PaypunkdResponse {
        info!("forwarding GetKeypunkEncryptionKey to keypunkd");
        self.respond(
            "get_keypunk_encryption_key",
            usecases::get_keypunk_encryption_key(&self.keypunk_service).await,
            |key| PaypunkdResponse::KeypunkEncryptionKey { key },
        )
    }

    async fn generate_seed(
        &self,
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
    ) -> PaypunkdResponse {
        info!("forwarding GenerateSeed to keypunkd");
        match usecases::generate_seed(&self.keypunk_service, encrypted_password, client_public_key)
            .await
        {
            Ok(encrypted_mnemonic) => {
                if let Err(e) = self.db.mark_initialized() {
                    warn!(error = %e, "generate_seed: failed to write marker");
                }
                PaypunkdResponse::SeedGenerated { encrypted_mnemonic }
            }
            Err(e) => {
                warn!(error = %e, "generate_seed failed");
                PaypunkdResponse::Error { message: e }
            }
        }
    }

    async fn restore_seed(
        &self,
        encrypted_mnemonic: Vec<u8>,
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
        birthday_height: Option<u64>,
    ) -> PaypunkdResponse {
        info!("forwarding RestoreSeed to keypunkd");
        match usecases::restore_seed(
            &self.keypunk_service,
            encrypted_mnemonic,
            encrypted_password,
            client_public_key,
        )
        .await
        {
            Ok(()) => {
                if let Some(height) = birthday_height {
                    if let Err(e) = self.save_birthday_height(height) {
                        warn!(error = %e, "restore_seed: failed to save birthday_height");
                    }
                }
                if let Err(e) = self.db.mark_initialized() {
                    warn!(error = %e, "restore_seed: failed to write marker");
                }
                PaypunkdResponse::SeedRestored
            }
            Err(e) => {
                warn!(error = %e, "restore_seed failed");
                PaypunkdResponse::Error { message: e }
            }
        }
    }

    async fn submit_intent(
        &self,
        intent: paypunk_types::Intent,
        derivation_path: String,
    ) -> PaypunkdResponse {
        info!("handling SubmitIntent");
        match usecases::submit_intent(
            &self.keypunk_service,
            &self.protocols,
            &intent,
            &derivation_path,
        )
        .await
        {
            Ok(KeypunkdResponse::ArtifactPreview {
                raw_artifact,
                parsed_summary,
                signature,
                keypunkd_public_key,
            }) => PaypunkdResponse::SignablePreview {
                raw_artifact,
                parsed_summary,
                keypunkd_signature: signature,
                keypunkd_public_key,
            },
            Ok(KeypunkdResponse::ArtifactAuthorized { signed_artifact }) => {
                PaypunkdResponse::SignatureApproved { signed_artifact }
            }
            Ok(KeypunkdResponse::Error { message }) => {
                info!("submit_intent: keypunkd error: {message}");
                PaypunkdResponse::Error { message }
            }
            Err(e) => {
                info!("submit_intent: error: {e}");
                PaypunkdResponse::Error { message: e }
            }
            _ => PaypunkdResponse::Error {
                message: "unexpected response from keypunkd".to_string(),
            },
        }
    }

    async fn approve_signature(
        &self,
        encrypted_payload: Vec<u8>,
        ephemeral_public_key: [u8; 32],
        derivation_path: String,
    ) -> PaypunkdResponse {
        info!("handling ApproveSignature");
        self.respond(
            "approve_signature",
            usecases::approve_signature(
                &self.keypunk_service,
                encrypted_payload,
                ephemeral_public_key,
                derivation_path,
            )
            .await,
            |signed_artifact| PaypunkdResponse::SignatureApproved { signed_artifact },
        )
    }

    async fn get_balance(&self, address: String, asset: String) -> PaypunkdResponse {
        info!("querying balance");
        let protocol = self
            .protocols
            .protocols()
            .iter()
            .find_map(|&pid| {
                self.protocols.get(pid).ok().and_then(|p| {
                    let chain = p.chain_id();
                    if address.starts_with(&format!("{}:", chain.namespace)) {
                        Some(pid)
                    } else {
                        None
                    }
                })
            })
            .unwrap_or(ProtocolId::Ethereum);
        self.respond(
            "get_balance",
            usecases::get_balance(&self.protocols, protocol, &address, &asset).await,
            |balance| PaypunkdResponse::Balance { balance },
        )
    }

    async fn derive_address(
        &mut self,
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
        protocol: ProtocolId,
        derivation_path: String,
        index: u32,
    ) -> PaypunkdResponse {
        info!(?protocol, derivation_path, index, "deriving address");
        self.respond(
            "derive_address",
            usecases::export_viewing_key(
                &self.keypunk_service,
                encrypted_password,
                client_public_key,
                protocol,
                derivation_path,
            )
            .await
            .and_then(|viewing_key| {
                let proto = self.protocols.get(protocol)?;
                let addr = proto.derive_address_from_viewing_key(&viewing_key, index)?;
                info!("derive_address -> {addr}");
                Ok(addr)
            }),
            |address| PaypunkdResponse::AddressDerived { address },
        )
    }

    async fn broadcast_transaction(
        &self,
        protocol: ProtocolId,
        raw_tx: Vec<u8>,
    ) -> PaypunkdResponse {
        info!(?protocol, "broadcasting transaction");
        let result = usecases::broadcast_transaction(&self.protocols, protocol, &raw_tx).await;
        match &result {
            Ok(ref tx_hash) => {
                info!(?protocol, tx_hash = %tx_hash, "transaction broadcast successfully")
            }
            Err(ref e) => warn!(?protocol, error = %e, "broadcast_transaction failed"),
        }
        self.respond("broadcast_transaction", result, |tx_hash| {
            PaypunkdResponse::TransactionBroadcasted { tx_hash }
        })
    }

    async fn create_account(
        &self,
        protocol: ProtocolId,
        derivation_path: String,
        account_index: u32,
        name: String,
        birthday_height: Option<u64>,
    ) -> PaypunkdResponse {
        info!(
            ?protocol,
            account_index,
            name,
            ?birthday_height,
            "creating account"
        );

        let birthday = match birthday_height {
            Some(h) => Some(h),
            None => match self.get_birthday_height() {
                Some(h) => Some(h),
                None => self.auto_birthday(protocol).await,
            },
        };

        let result = usecases::create_account(
            &self.db,
            &self.protocols,
            self.accounts_repo.as_ref(),
            protocol,
            derivation_path,
            account_index,
            name,
            birthday,
        )
        .await;

        match result {
            Ok(account) => {
                if let Ok(proto) = self.protocols.get(protocol) {
                    let birthday = account.birthday_height.unwrap_or(0);
                    if let Err(e) = proto
                        .sync_account(&account.viewing_key, birthday, &account.address)
                        .await
                    {
                        warn!(
                            ?protocol,
                            account = %account.id,
                            error = %e,
                            "sync_account after create_account failed"
                        );
                    }
                }

                PaypunkdResponse::AccountCreated { account }
            }
            Err(e) => PaypunkdResponse::Error { message: e },
        }
    }

    async fn list_accounts(&self) -> PaypunkdResponse {
        info!("listing accounts");
        self.respond(
            "list_accounts",
            usecases::list_accounts(&self.db, self.accounts_repo.as_ref()),
            |accounts| PaypunkdResponse::AccountsList { accounts },
        )
    }

    async fn get_account(&self, id: String) -> PaypunkdResponse {
        info!(id, "getting account");
        self.respond(
            "get_account",
            usecases::get_account(&self.db, self.accounts_repo.as_ref(), &id),
            |account| PaypunkdResponse::AccountFound { account },
        )
    }

    fn get_supported_protocols(&self) -> PaypunkdResponse {
        info!("handling GetSupportedProtocols");
        PaypunkdResponse::SupportedProtocols {
            protocols: self.protocols.protocols(),
            metadata: self.protocols.protocol_metadata(),
        }
    }

    fn get_paypunkd_encryption_key(&self) -> PaypunkdResponse {
        info!("handling GetPaypunkdEncryptionKey");
        PaypunkdResponse::PaypunkdEncryptionKey {
            key: self.keystore.public_key(),
        }
    }

    async fn has_seed(&self) -> PaypunkdResponse {
        info!("checking wallet exists in database");
        let exists = self.db.wallet_exists();
        PaypunkdResponse::HasSeed { exists }
    }

    async fn get_sync_status(&self, protocol: ProtocolId) -> PaypunkdResponse {
        self.respond(
            "get_sync_status",
            usecases::get_sync_status(&self.protocols, protocol).await,
            |status| PaypunkdResponse::SyncStatusResult { status },
        )
    }

    async fn get_history(
        &self,
        protocol: ProtocolId,
        account_id: u32,
        cursor: Option<String>,
        limit: u32,
    ) -> PaypunkdResponse {
        info!(?protocol, account_id, "handling GetHistory");
        self.respond(
            "get_history",
            usecases::get_history(&self.protocols, protocol, account_id, cursor, limit).await,
            |page| PaypunkdResponse::HistoryResult {
                entries: page.items,
                next_cursor: page.next_cursor,
                has_more: page.has_more,
            },
        )
    }

    async fn get_lock_state(&self) -> PaypunkdResponse {
        info!("handling GetLockState");
        let password_set = match self.has_seed().await {
            PaypunkdResponse::HasSeed { exists } => exists,
            _ => false,
        };
        PaypunkdResponse::LockState {
            password_set,
            failed_attempts: self.failed_attempts,
        }
    }

    async fn verify_password(
        &mut self,
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
    ) -> PaypunkdResponse {
        info!("handling VerifyPassword");
        match self
            .keypunk_service
            .verify_password(encrypted_password, client_public_key)
            .await
        {
            Ok(()) => {
                self.failed_attempts = 0;
                PaypunkdResponse::PasswordVerified
            }
            Err(e) => {
                self.failed_attempts += 1;
                PaypunkdResponse::Error { message: e }
            }
        }
    }

    fn get_address_book(&self) -> PaypunkdResponse {
        info!("handling GetAddressBook");
        self.respond(
            "get_address_book",
            usecases::get_address_book(&self.db, self.address_book_repo.as_ref()),
            |entries| PaypunkdResponse::AddressBookData { entries },
        )
    }

    fn add_address_book_entry(
        &self,
        name: String,
        address: String,
        protocol: String,
    ) -> PaypunkdResponse {
        info!("handling AddAddressBookEntry");
        self.respond(
            "add_address_book_entry",
            usecases::add_address_book_entry(
                &self.db,
                self.address_book_repo.as_ref(),
                name,
                address,
                protocol,
            ),
            |()| PaypunkdResponse::AddressBookEntryAdded,
        )
    }

    fn get_settings(&self) -> PaypunkdResponse {
        info!("handling GetSettings");
        self.respond(
            "get_settings",
            usecases::get_settings(&self.db),
            |(auto_lock_minutes, fiat_currency)| PaypunkdResponse::SettingsResult {
                auto_lock_minutes,
                fiat_currency,
            },
        )
    }

    fn save_settings(&self, auto_lock_minutes: u32, fiat_currency: String) -> PaypunkdResponse {
        info!("handling SaveSettings");
        self.respond(
            "save_settings",
            usecases::save_settings(&self.db, auto_lock_minutes, fiat_currency),
            |()| PaypunkdResponse::SettingsSaved,
        )
    }

    fn save_birthday_height(&self, height: u64) -> Result<(), String> {
        let conn = self.db.conn.as_ref().ok_or("database is locked")?;
        let conn = conn.lock().map_err(|e| e.to_string())?;
        conn.execute(
            "INSERT OR REPLACE INTO settings (key, value) VALUES ('birthday_height', ?1)",
            rusqlite::params![height.to_string()],
        )
        .map_err(|e| format!("failed to save birthday_height: {e}"))?;
        Ok(())
    }

    fn get_birthday_height(&self) -> Option<u64> {
        let conn = self.db.conn.as_ref().ok_or("database is locked").ok()?;
        let conn = conn.lock().ok()?;
        conn.query_row(
            "SELECT value FROM settings WHERE key = 'birthday_height'",
            [],
            |row| row.get::<_, String>(0),
        )
        .ok()
        .and_then(|s| s.parse::<u64>().ok())
    }

    /// Auto-determine a birthday height for a new account.
    ///
    /// For regtest, returns 0 (scan from block 2) because regtest has very
    /// few blocks and notes may exist at any height.  For mainnet/testnet,
    /// fetches the current chain tip so the initial scan is short — the
    /// background sync loop will keep up with new blocks.
    async fn auto_birthday(&self, protocol: ProtocolId) -> Option<u64> {
        let proto = self.protocols.get(protocol).ok()?;

        if proto.chain_id().reference == "regtest" {
            info!(
                ?protocol,
                "auto-birthday: regtest — using 0 (full scan from block 2)"
            );
            return Some(0);
        }

        let lightwalletd_host = self.protocols.get_lightwalletd_host(protocol)?;
        match proto.get_current_block_height(lightwalletd_host).await {
            Ok(height) => {
                info!(?protocol, height = height.0, "auto-birthday fetched tip");
                Some(height.0)
            }
            Err(e) => {
                warn!(?protocol, error = %e, "auto-birthday: failed to fetch tip");
                None
            }
        }
    }

    async fn reveal_phrase(
        &self,
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
    ) -> PaypunkdResponse {
        info!("forwarding RevealPhrase to keypunkd");
        self.respond(
            "reveal_phrase",
            usecases::export_mnemonic(&self.keypunk_service, encrypted_password, client_public_key)
                .await,
            |encrypted_mnemonic| PaypunkdResponse::PhraseRevealed { encrypted_mnemonic },
        )
    }

    async fn create_transfer(
        &self,
        protocol: ProtocolId,
        account: u32,
        to: String,
        amount: u64,
        memo: Option<String>,
        lightwalletd_host: String,
    ) -> PaypunkdResponse {
        info!(?protocol, account, "handling CreateTransfer");
        self.respond(
            "create_transfer",
            usecases::create_transfer(
                &self.protocols,
                protocol,
                account,
                &to,
                amount,
                memo.as_deref(),
                &lightwalletd_host,
            )
            .await,
            |pczt_bytes| PaypunkdResponse::TransferCreated { pczt_bytes },
        )
    }

    async fn estimate_fee(
        &self,
        protocol: ProtocolId,
        to: String,
        amount: u64,
        memo: Option<String>,
        lightwalletd_host: String,
    ) -> PaypunkdResponse {
        info!(?protocol, "handling EstimateFee");
        self.respond(
            "estimate_fee",
            usecases::estimate_fee(
                &self.protocols,
                protocol,
                &to,
                amount,
                memo.as_deref(),
                &lightwalletd_host,
            )
            .await,
            |fee| PaypunkdResponse::FeeEstimated { fee },
        )
    }

    async fn get_current_block_height(
        &self,
        protocol: ProtocolId,
        lightwalletd_host: String,
    ) -> PaypunkdResponse {
        info!(?protocol, "handling GetCurrentBlockHeight");
        self.respond(
            "get_current_block_height",
            usecases::get_current_block_height(&self.protocols, protocol, lightwalletd_host).await,
            |height| PaypunkdResponse::BlockHeightResult { height },
        )
    }

    async fn get_transaction_status(&self, protocol: ProtocolId, txid: String) -> PaypunkdResponse {
        info!(?protocol, "handling GetTransactionStatus");
        self.respond(
            "get_transaction_status",
            usecases::get_transaction_status(&self.protocols, protocol, txid).await,
            |status| PaypunkdResponse::TransactionStatusResult { status },
        )
    }

    async fn unlock(
        &mut self,
        encrypted_keypunkd_password: Vec<u8>,
        keypunkd_client_pk: [u8; 32],
        paths: Vec<(ProtocolId, String)>,
    ) -> PaypunkdResponse {
        info!("handling Unlock");

        if let Err(e) = self.db.ensure_file_exists() {
            return PaypunkdResponse::Error {
                message: format!("failed to reinitialize database: {e}"),
            };
        }

        let accounts = match usecases::list_accounts(&self.db, self.accounts_repo.as_ref()) {
            Ok(a) => a,
            Err(e) => {
                return PaypunkdResponse::Error {
                    message: format!("failed to list accounts: {e}"),
                }
            }
        };
        info!("list_accounts {accounts:?}");
        let accounts_count = accounts.len() as u32;

        if accounts.is_empty() {
            info!("no accounts found, bulk-deriving from keypunkd");

            let keys = self
                .keypunk_service
                .bulk_export_viewing_keys(encrypted_keypunkd_password, keypunkd_client_pk, paths)
                .await;

            match keys {
                Ok(derived) => {
                    let mut indexes: HashMap<&ProtocolId, i32> = HashMap::new();
                    for (protocol, path, viewing_key) in &derived {
                        *indexes.entry(protocol).or_insert(-1) += 1;
                        let account_index = *indexes.get(protocol).unwrap_or(&0);
                        info!("key returned: {path}");
                        info!("key: account_index={account_index}, path={path}");
                        let _ = usecases::save_pre_derived_key(
                            &self.db,
                            *protocol,
                            u32::try_from(account_index).unwrap(),
                            viewing_key,
                        );
                    }

                    // Resolve birthday: stored from restore-seed, or auto-fetch tip.
                    let birthday = match self.get_birthday_height() {
                        Some(h) => Some(h),
                        None => {
                            let mut height = None;
                            for pid in self.protocols.protocols() {
                                if height.is_none() {
                                    height = self.auto_birthday(pid).await;
                                }
                            }
                            height
                        }
                    };
                    info!(
                        ?birthday,
                        "unlock: resolved birthday for first-time accounts"
                    );

                    for pid in self.protocols.protocols() {
                        let proto = match self.protocols.get(pid) {
                            Ok(p) => p,
                            Err(_) => continue,
                        };
                        for account_index in 0..1 {
                            let path = proto.default_derivation_path(account_index);
                            let name = proto.default_account_name(account_index);

                            let _ = usecases::create_account(
                                &self.db,
                                &self.protocols,
                                self.accounts_repo.as_ref(),
                                pid,
                                path,
                                account_index,
                                name,
                                birthday,
                            )
                            .await;
                        }
                    }

                    if let Ok(accounts) =
                        usecases::list_accounts(&self.db, self.accounts_repo.as_ref())
                    {
                        for pid in self.protocols.protocols() {
                            if let Ok(proto) = self.protocols.get(pid) {
                                for account in accounts.iter().filter(|a| a.protocol == pid) {
                                    let bday = account.birthday_height.unwrap_or(0);
                                    if let Err(e) = proto
                                        .sync_account(&account.viewing_key, bday, &account.address)
                                        .await
                                    {
                                        warn!(
                                            ?pid,
                                            account = %account.id,
                                            error = %e,
                                            "sync_account after unlock failed"
                                        );
                                    }
                                }
                            }
                        }
                    }

                    info!(count = derived.len(), "cached pre-derived viewing keys");
                    if let Err(e) = self.db.mark_initialized() {
                        warn!(error = %e, "unlock: failed to write marker");
                    }
                    PaypunkdResponse::UnlockSuccess {
                        accounts_count: derived.len() as u32,
                    }
                }
                Err(e) => PaypunkdResponse::Error {
                    message: format!("failed to bulk-derive accounts: {e}"),
                },
            }
        } else {
            if let Ok(accounts) = usecases::list_accounts(&self.db, self.accounts_repo.as_ref()) {
                for pid in self.protocols.protocols() {
                    if let Ok(proto) = self.protocols.get(pid) {
                        for account in accounts.iter().filter(|a| a.protocol == pid) {
                            let bday = account.birthday_height.unwrap_or(0);
                            if let Err(e) = proto
                                .sync_account(&account.viewing_key, bday, &account.address)
                                .await
                            {
                                warn!(
                                    ?pid,
                                    account = %account.id,
                                    error = %e,
                                    "sync_account after unlock failed"
                                );
                            }
                        }
                    }
                }
            }
            if let Err(e) = self.db.mark_initialized() {
                warn!(error = %e, "unlock: failed to write marker");
            }
            PaypunkdResponse::UnlockSuccess { accounts_count }
        }
    }

    async fn bulk_derive_accounts(
        &self,
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
        paths: Vec<(ProtocolId, String)>,
    ) -> PaypunkdResponse {
        info!("handling BulkDeriveAccounts");
        let birthday = self.get_birthday_height();
        self.respond(
            "bulk_derive_accounts",
            usecases::bulk_derive_accounts(
                &self.keypunk_service,
                &self.protocols,
                &self.db,
                self.accounts_repo.as_ref(),
                encrypted_password,
                client_public_key,
                paths,
                birthday,
            )
            .await,
            |accounts| PaypunkdResponse::AccountsBulkDerived { accounts },
        )
    }

    async fn register_signer(&self, paths: Vec<(ProtocolId, String)>) -> PaypunkdResponse {
        info!("handling RegisterSigner");

        let birthday = match self.get_birthday_height() {
            Some(h) => Some(h),
            None => {
                let mut height = None;
                for pid in self.protocols.protocols() {
                    if height.is_none() {
                        height = self.auto_birthday(pid).await;
                    }
                }
                height
            }
        };
        self.respond(
            "register_signer",
            usecases::register_signer(
                &self.keypunk_service,
                &self.protocols,
                &self.db,
                self.accounts_repo.as_ref(),
                self.signer_state_repo.as_ref(),
                &self.keystore,
                paths,
                birthday,
            )
            .await,
            |accounts_count| PaypunkdResponse::SignerRegistered { accounts_count },
        )
    }

    async fn verify_signer_session(&self) -> PaypunkdResponse {
        info!("handling VerifySignerSession");
        self.respond(
            "verify_signer_session",
            usecases::verify_signer_session(
                &self.keypunk_service,
                &self.db,
                self.signer_state_repo.as_ref(),
                &self.keystore,
            )
            .await,
            |()| PaypunkdResponse::SignerSessionVerified,
        )
    }

    pub async fn handle_request(
        &mut self,
        request: PaypunkdRequest,
        _sender_public_key: Option<[u8; 32]>,
    ) -> PaypunkdResponse {
        debug!(?request, "dispatching request");

        match request {
            PaypunkdRequest::GetKeypunkEncryptionKey => self.get_keypunk_encryption_key().await,
            PaypunkdRequest::GenerateSeed {
                encrypted_password,
                client_public_key,
            } => {
                self.generate_seed(encrypted_password, client_public_key)
                    .await
            }
            PaypunkdRequest::RestoreSeed {
                encrypted_mnemonic,
                encrypted_password,
                client_public_key,
                birthday_height,
            } => {
                self.restore_seed(
                    encrypted_mnemonic,
                    encrypted_password,
                    client_public_key,
                    birthday_height,
                )
                .await
            }
            PaypunkdRequest::SubmitIntent {
                intent,
                derivation_path,
            } => self.submit_intent(intent, derivation_path).await,
            PaypunkdRequest::ApproveSignature {
                encrypted_payload,
                ephemeral_public_key,
                derivation_path,
            } => {
                self.approve_signature(encrypted_payload, ephemeral_public_key, derivation_path)
                    .await
            }
            PaypunkdRequest::GetBalance { address, asset } => {
                self.get_balance(address, asset).await
            }
            PaypunkdRequest::DeriveAddress {
                encrypted_password,
                client_public_key,
                protocol,
                derivation_path,
                index,
            } => {
                self.derive_address(
                    encrypted_password,
                    client_public_key,
                    protocol,
                    derivation_path,
                    index,
                )
                .await
            }
            PaypunkdRequest::BroadcastTransaction { protocol, raw_tx } => {
                self.broadcast_transaction(protocol, raw_tx).await
            }
            PaypunkdRequest::CreateAccount {
                protocol,
                derivation_path,
                account_index,
                name,
                birthday_height,
            } => {
                self.create_account(
                    protocol,
                    derivation_path,
                    account_index,
                    name,
                    birthday_height,
                )
                .await
            }
            PaypunkdRequest::ListAccounts => self.list_accounts().await,
            PaypunkdRequest::GetAccount { id } => self.get_account(id).await,
            PaypunkdRequest::GetPaypunkdEncryptionKey => self.get_paypunkd_encryption_key(),
            PaypunkdRequest::HasSeed => self.has_seed().await,
            PaypunkdRequest::GetSupportedProtocols => self.get_supported_protocols(),
            PaypunkdRequest::Unlock {
                encrypted_keypunkd_password,
                keypunkd_client_pk,
                paths,
            } => {
                self.unlock(encrypted_keypunkd_password, keypunkd_client_pk, paths)
                    .await
            }
            PaypunkdRequest::GetSyncStatus { protocol } => self.get_sync_status(protocol).await,
            PaypunkdRequest::BulkDeriveAccounts {
                encrypted_password,
                client_public_key,
                paths,
            } => {
                self.bulk_derive_accounts(encrypted_password, client_public_key, paths)
                    .await
            }
            PaypunkdRequest::GetHistory {
                protocol,
                account_id,
                cursor,
                limit,
            } => self.get_history(protocol, account_id, cursor, limit).await,
            PaypunkdRequest::GetLockState => self.get_lock_state().await,
            PaypunkdRequest::VerifyPassword {
                encrypted_password,
                client_public_key,
            } => {
                self.verify_password(encrypted_password, client_public_key)
                    .await
            }
            PaypunkdRequest::GetAddressBook => self.get_address_book(),
            PaypunkdRequest::AddAddressBookEntry {
                name,
                address,
                protocol,
            } => self.add_address_book_entry(name, address, protocol),
            PaypunkdRequest::GetSettings => self.get_settings(),
            PaypunkdRequest::SaveSettings {
                auto_lock_minutes,
                fiat_currency,
            } => self.save_settings(auto_lock_minutes, fiat_currency),
            PaypunkdRequest::RevealPhrase {
                encrypted_password,
                client_public_key,
            } => {
                self.reveal_phrase(encrypted_password, client_public_key)
                    .await
            }
            PaypunkdRequest::CreateTransfer {
                protocol,
                account,
                to,
                amount,
                memo,
                lightwalletd_host,
            } => {
                self.create_transfer(protocol, account, to, amount, memo, lightwalletd_host)
                    .await
            }
            PaypunkdRequest::EstimateFee {
                protocol,
                to,
                amount,
                memo,
                lightwalletd_host,
            } => {
                self.estimate_fee(protocol, to, amount, memo, lightwalletd_host)
                    .await
            }
            PaypunkdRequest::GetCurrentBlockHeight {
                protocol,
                lightwalletd_host,
            } => {
                self.get_current_block_height(protocol, lightwalletd_host)
                    .await
            }
            PaypunkdRequest::GetTransactionStatus { protocol, txid } => {
                self.get_transaction_status(protocol, txid).await
            }
            PaypunkdRequest::RegisterSigner { paths } => self.register_signer(paths).await,
            PaypunkdRequest::VerifySignerSession => self.verify_signer_session().await,
        }
    }
}
