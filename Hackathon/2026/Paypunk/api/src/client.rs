use paypunk_ipc::IpcMessage;
use paypunk_ipc::IpcSender;
use paypunk_types::{
    Account, Balance, HistoryEntry, Intent, ProtocolId, ProtocolMetadata, SubmitIntentResult,
    SyncStatus,
};
use paypunkd::messages::AddressBookEntry;
use paypunkd::services::PaypunkService;
use tactix::{Recipient, Sender};
use zeroize::Zeroizing;

/// High-level wallet client that hides IPC and service details.
pub struct Client {
    service: PaypunkService,
}

impl Client {
    /// Connect to a running `paypunkd` instance over its Unix socket.
    pub async fn connect(socket_path: &str) -> Result<Self, String> {
        let ipc = IpcSender::connect(socket_path)
            .await
            .map_err(|e| e.to_string())?;
        let service = PaypunkService::new(ipc.recipient());
        Ok(Self { service })
    }

    /// Create a client from an existing IPC recipient, bypassing Unix sockets.
    /// Useful for testing where actors are wired directly in-process.
    pub fn with_recipient(recipient: Recipient<IpcMessage>) -> Self {
        Self {
            service: PaypunkService::new(recipient),
        }
    }

    /// Generate a new wallet seed, encrypt it with the given password,
    /// and return the 12-word BIP39 mnemonic.
    pub async fn generate_seed(
        &self,
        password: Zeroizing<String>,
    ) -> Result<Zeroizing<String>, String> {
        crate::functions::generate_seed(&self.service, password).await
    }

    /// Generate a random 12-word BIP39 mnemonic phrase without persisting anything.
    /// The returned value is wrapped in `Zeroizing` for memory safety.
    pub fn generate_mnemonic(&self) -> Zeroizing<String> {
        crate::functions::generate_mnemonic()
    }

    /// Restore a wallet from an existing BIP39 mnemonic seed phrase and password.
    pub async fn restore_seed(
        &self,
        mnemonic: Zeroizing<String>,
        password: Zeroizing<String>,
        birthday_height: Option<u64>,
    ) -> Result<(), String> {
        crate::functions::restore_seed(&self.service, mnemonic, password, birthday_height).await
    }

    /// Derive an address for the given protocol, account index, and diversifier index.
    ///
    /// Fetches the viewing key from keypunkd (using the wallet password) and derives
    /// the address locally via the protocol implementation.
    pub async fn derive_address(
        &self,
        password: Zeroizing<String>,
        protocol: ProtocolId,
        account: u32,
        index: u32,
    ) -> Result<String, String> {
        crate::functions::derive_address(&self.service, password, protocol, account, index).await
    }

    /// Submit an intent for the two-phase authorization flow.
    ///
    /// Phase 1: Builds the unsigned artifact, sends it to keypunkd for
    /// parsing and preview, and returns the preview data for user approval.
    pub async fn submit_intent(
        &self,
        intent: Intent,
        derivation_path: &str,
    ) -> Result<SubmitIntentResult, String> {
        crate::functions::submit_intent(&self.service, intent, derivation_path).await
    }

    /// Approve a previously previewed artifact.
    ///
    /// Phase 2: Encrypts the password along with the artifact and keypunkd's
    /// signature to keypunkd's public key, then sends for authorization.
    pub async fn approve_signature(
        &self,
        raw_artifact: &[u8],
        keypunkd_signature: &[u8],
        password: Zeroizing<String>,
        derivation_path: &str,
    ) -> Result<Vec<u8>, String> {
        crate::functions::approve_signature(
            &self.service,
            raw_artifact,
            keypunkd_signature,
            password,
            derivation_path,
        )
        .await
    }

    /// Query the balance for the given address and asset (CAIP-10 and CAIP-19).
    pub async fn get_balance(&self, address: String, asset: String) -> Result<Balance, String> {
        crate::functions::get_balance(&self.service, address, asset).await
    }

    /// Broadcast a finalized, signed transaction to the network.
    pub async fn broadcast_transaction(
        &self,
        protocol: ProtocolId,
        raw_tx: Vec<u8>,
    ) -> Result<String, String> {
        crate::functions::broadcast_transaction(&self.service, protocol, raw_tx).await
    }

    /// Create a new account from a pre-derived viewing key (no password needed).
    /// Accounts must be pre-derived via unlock (indices 0-29).
    pub async fn create_account(
        &self,
        protocol: ProtocolId,
        derivation_path: String,
        account_index: u32,
        name: String,
        birthday_height: Option<u64>,
    ) -> Result<Account, String> {
        crate::functions::create_account(
            &self.service,
            protocol,
            derivation_path,
            account_index,
            name,
            birthday_height,
        )
        .await
    }

    /// List all accounts from the database.
    pub async fn list_accounts(&self) -> Result<Vec<Account>, String> {
        crate::functions::list_accounts(&self.service).await
    }

    /// Get a single account by ID.
    pub async fn get_account(&self, id: String) -> Result<Option<Account>, String> {
        crate::functions::get_account(&self.service, id).await
    }

    /// Return the standard derivation path for the given protocol and account index.
    ///
    /// Delegates to the protocol crate's own derivation logic:
    /// - Zcash: `m/44'/133'/{account}'`
    /// - Ethereum (Metamask): `m/44'/60'/{account}'/0/0`
    pub fn derivation_path(&self, protocol: ProtocolId, account: u32) -> String {
        crate::functions::derivation_path(protocol, account)
    }

    /// Check whether a wallet seed exists on keypunkd.
    pub async fn check_wallet_exists(&self) -> Result<bool, String> {
        crate::functions::check_wallet_exists(&self.service).await
    }

    /// Unlock the wallet by decrypting the DB and deriving initial accounts.
    pub async fn unlock(&self, password: Zeroizing<String>) -> Result<u32, String> {
        crate::functions::unlock(&self.service, password).await
    }

    /// Get paypunkd's public encryption key.
    pub async fn get_paypunkd_encryption_key(&self) -> Result<[u8; 32], String> {
        self.service.get_paypunkd_encryption_key().await
    }

    /// Get protocol metadata from the daemon.
    pub async fn get_protocol_metadata(&self) -> Result<Vec<ProtocolMetadata>, String> {
        self.service.get_protocol_metadata().await
    }

    /// Get the sync status for the given protocol.
    pub async fn get_sync_status(&self, protocol: ProtocolId) -> Result<SyncStatus, String> {
        self.service.get_sync_status(protocol).await
    }

    /// Fetch transaction history for the given protocol and account.
    pub async fn get_history(
        &self,
        protocol: ProtocolId,
        account_id: u32,
        cursor: Option<String>,
        limit: u32,
    ) -> Result<Vec<HistoryEntry>, String> {
        self.service
            .get_history(protocol, account_id, cursor, limit)
            .await
    }

    /// Get the lock state (whether password is set and failed attempt count).
    pub async fn get_lock_state(&self) -> Result<(bool, u32), String> {
        self.service.get_lock_state().await
    }

    /// Verify the wallet password against keypunkd.
    pub async fn verify_password(&self, password: Zeroizing<String>) -> Result<(), String> {
        crate::functions::verify_password(&self.service, password).await
    }

    /// Get all address book entries.
    pub async fn get_address_book(&self) -> Result<Vec<AddressBookEntry>, String> {
        crate::functions::get_address_book(&self.service).await
    }

    /// Reveal the wallet mnemonic phrase.
    ///
    /// Returns the 12-word BIP39 mnemonic encrypted end-to-end over IPC.
    pub async fn reveal_phrase(
        &self,
        password: Zeroizing<String>,
    ) -> Result<Zeroizing<String>, String> {
        crate::functions::reveal_phrase(&self.service, password).await
    }

    /// Register an offline signer: derive viewing keys for 5 accounts per protocol.
    ///
    /// Sends the registration request to paypunkd which forwards it to the bridge.
    pub async fn register_signer(&self) -> Result<u32, String> {
        crate::functions::register_signer(&self.service).await
    }

    /// Verify an existing signer session (no password needed).
    ///
    /// Sends a challenge to the signer via the bridge. The signer signs it
    /// with its session key. If valid, the wallet unlocks.
    pub async fn verify_signer_session(&self) -> Result<(), String> {
        crate::functions::verify_signer_session(&self.service).await
    }

    /// Add an entry to the address book.
    pub async fn add_address_book_entry(
        &self,
        name: String,
        address: String,
        protocol: String,
    ) -> Result<(), String> {
        crate::functions::add_address_book_entry(&self.service, name, address, protocol).await
    }

    /// Get settings.
    pub async fn get_settings(&self) -> Result<(u32, String), String> {
        crate::functions::get_settings(&self.service).await
    }

    /// Save settings.
    pub async fn save_settings(
        &self,
        auto_lock_minutes: u32,
        fiat_currency: String,
    ) -> Result<(), String> {
        crate::functions::save_settings(&self.service, auto_lock_minutes, fiat_currency).await
    }
}
