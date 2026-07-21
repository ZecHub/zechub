use paypunk_types::{
    Account, Balance, HistoryEntry, Intent, ProtocolId, ProtocolMetadata, SyncStatus,
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AddressBookEntry {
    pub name: String,
    pub address: String,
    pub protocol: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum PaypunkdRequest {
    // Get the public key for Keypunk to encrypt data to keypunk
    GetKeypunkEncryptionKey,
    // Generate a new seed phrase and encrypt it with the given password
    GenerateSeed {
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
    },
    // Restore the given seed phrase and encrypt it with the given password
    RestoreSeed {
        encrypted_mnemonic: Vec<u8>,
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32], // Clients public key for further communication
        birthday_height: Option<u64>,
    },
    // Submit a intent that can be interpreted as a chain operation
    SubmitIntent {
        intent: Intent,
        derivation_path: String, // Define the account using the derivation path
    },
    // Approve a signature request. User includes their password with the request - plus the raw article a signature and a hashed pasword
    ApproveSignature {
        encrypted_payload: Vec<u8>, // Encode payload: raw_len(4) + raw + sig_len(4) + sig + hashed_pw
        ephemeral_public_key: [u8; 32],
        derivation_path: String,
    },
    // Derive a new address from the given derivation path for the given protocol
    DeriveAddress {
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
        protocol: ProtocolId,
        derivation_path: String,
        index: u32, // TODO: why do we need this index?
    },
    // Request an address balance
    GetBalance {
        address: String,
        asset: String,
    },
    // Broadcast a signed transaction
    BroadcastTransaction {
        protocol: ProtocolId,
        raw_tx: Vec<u8>,
    },
    // Create an account in the database based on the derivation path and account index.
    CreateAccount {
        protocol: ProtocolId,
        derivation_path: String,
        account_index: u32,
        name: String,
        birthday_height: Option<u64>,
    },
    ListAccounts,
    GetAccount {
        id: String,
    },
    GetPaypunkdEncryptionKey,
    HasSeed,
    GetSupportedProtocols,
    // Poll sync status for the given protocol
    GetSyncStatus {
        protocol: ProtocolId,
    },
    Unlock {
        encrypted_keypunkd_password: Vec<u8>,
        keypunkd_client_pk: [u8; 32],
        paths: Vec<(ProtocolId, String)>,
    },
    BulkDeriveAccounts {
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
        paths: Vec<(ProtocolId, String)>,
    },
    // Fetch transaction history for the given protocol and account
    GetHistory {
        protocol: ProtocolId,
        account_id: u32,
        cursor: Option<String>,
        limit: u32,
    },
    // Query the lock state (password set, failed attempts)
    GetLockState,
    // Verify a password against keypunkd
    VerifyPassword {
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
    },
    // Get all address book entries
    GetAddressBook,
    // Add an entry to the address book
    AddAddressBookEntry {
        name: String,
        address: String,
        protocol: String,
    },
    // Get settings
    GetSettings,
    // Save settings
    SaveSettings {
        auto_lock_minutes: u32,
        fiat_currency: String,
    },
    // Reveal the wallet mnemonic phrase (forwarded to keypunkd)
    RevealPhrase {
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
    },
    // Create a transfer (PCZT pipeline)
    CreateTransfer {
        protocol: ProtocolId,
        account: u32,
        to: String,
        amount: u64,
        memo: Option<String>,
        lightwalletd_host: String,
    },
    // Estimate fee for a transfer
    EstimateFee {
        protocol: ProtocolId,
        to: String,
        amount: u64,
        memo: Option<String>,
        lightwalletd_host: String,
    },
    // Get the current block height
    GetCurrentBlockHeight {
        protocol: ProtocolId,
        lightwalletd_host: String,
    },
    // Get the status of a transaction
    GetTransactionStatus {
        protocol: ProtocolId,
        txid: String,
    },
    // Register an offline signer: derive and return viewing keys for the given paths
    RegisterSigner {
        paths: Vec<(ProtocolId, String)>,
    },
    // Verify an existing signer session (no password needed)
    VerifySignerSession,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum PaypunkdResponse {
    KeypunkEncryptionKey {
        key: [u8; 32],
    },
    SeedGenerated {
        encrypted_mnemonic: Vec<u8>,
    },
    SeedRestored,
    SignablePreview {
        raw_artifact: Vec<u8>,
        parsed_summary: Vec<u8>,
        keypunkd_signature: Vec<u8>,
        keypunkd_public_key: [u8; 32],
    },
    SignatureApproved {
        signed_artifact: Vec<u8>,
    },
    Balance {
        balance: Balance,
    },
    AddressDerived {
        address: String,
    },
    TransactionBroadcasted {
        tx_hash: String,
    },
    AccountCreated {
        account: Account,
    },
    AccountsList {
        accounts: Vec<Account>,
    },
    AccountFound {
        account: Option<Account>,
    },
    PaypunkdEncryptionKey {
        key: [u8; 32],
    },
    HasSeed {
        exists: bool,
    },
    SupportedProtocols {
        protocols: Vec<ProtocolId>,
        metadata: Vec<ProtocolMetadata>,
    },
    UnlockSuccess {
        accounts_count: u32,
    },
    AccountsBulkDerived {
        accounts: Vec<Account>,
    },
    SyncStatusResult {
        status: SyncStatus,
    },
    HistoryResult {
        entries: Vec<HistoryEntry>,
        next_cursor: Option<String>,
        has_more: bool,
    },
    LockState {
        password_set: bool,
        failed_attempts: u32,
    },
    PasswordVerified,
    AddressBookData {
        entries: Vec<AddressBookEntry>,
    },
    AddressBookEntryAdded,
    SettingsResult {
        auto_lock_minutes: u32,
        fiat_currency: String,
    },
    SettingsSaved,
    PhraseRevealed {
        encrypted_mnemonic: Vec<u8>,
    },
    TransferCreated {
        pczt_bytes: Vec<u8>,
    },
    FeeEstimated {
        fee: u64,
    },
    BlockHeightResult {
        height: paypunk_types::BlockHeight,
    },
    TransactionStatusResult {
        status: paypunk_types::TxStatus,
    },
    SignerRegistered {
        accounts_count: u32,
    },
    SignerSessionVerified,
    Error {
        message: String,
    },
}
