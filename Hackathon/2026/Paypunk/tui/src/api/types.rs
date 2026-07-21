use std::fmt;

#[derive(Debug, Clone)]
pub struct ApiError(pub String);

impl fmt::Display for ApiError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.0)
    }
}

#[derive(Debug, Clone)]
pub enum ApiState<T> {
    Loading,
    Loaded(T),
    Error(String),
}

impl<T> ApiState<T> {
    pub fn as_ref(&self) -> ApiState<&T> {
        match self {
            ApiState::Loading => ApiState::Loading,
            ApiState::Loaded(v) => ApiState::Loaded(v),
            ApiState::Error(e) => ApiState::Error(e.clone()),
        }
    }
}

// ── Setup ──

#[derive(Debug, Clone)]
pub struct SetupData {
    pub app_version: String,
    pub wallet_exists: bool,
    pub new_mnemonic: Vec<String>,
    pub word_count: usize,
    pub import_methods: Vec<String>,
}

#[derive(Debug, Clone)]
pub struct WordVerification {
    pub index: usize,
    pub word: String,
}

#[derive(Debug, Clone)]
pub struct SetupCreateInput {
    pub verification_words: Vec<WordVerification>,
    pub backup_confirmed: bool,
    pub password: String,
}

#[derive(Debug, Clone)]
pub struct SetupImportInput {
    pub method: String,
    pub secret: String,
    pub password: String,
}

// ── Home ──

#[derive(Debug, Clone)]
pub struct AccountInfo {
    pub account_id: String,
    pub name: String,
    pub address: String,
    pub chain_id: String,
    pub protocol: String,
}

#[derive(Debug, Clone)]
pub struct HomeData {
    pub accounts: Vec<AccountInfo>,
    pub fiat_currency: String,
}

#[derive(Debug, Clone)]
pub struct HomeInput {
    pub selected_account_id: String,
    pub refresh: bool,
}

// ── Receive ──

#[derive(Debug, Clone)]
pub struct ReceiveData {
    pub address: String,
    pub chain_id: String,
    pub address_format: String,
    pub qr_payload: String,
    pub account_id: String,
}

#[derive(Debug, Clone)]
pub struct ReceiveInput {
    pub selected_chain_id: String,
}

// ── Send ──

#[derive(Debug, Clone)]
pub struct SendData {
    pub account_id: String,
    pub from_address: String,
    pub spendable_balance: String,
    pub decimals: u8,
    pub chain_id: String,
}

#[derive(Debug, Clone)]
pub struct SendReviewInput {
    pub to_address: String,
    pub amount: String,
    pub token_id: String,
    pub chain_id: String,
    pub account_id: String,
    pub memo: Option<String>,
}

#[derive(Debug, Clone)]
pub struct SendReviewData {
    pub to_address: String,
    pub amount: String,
    pub fee_estimate: String,
    pub total_amount: String,
    pub chain_id: String,
    pub nonce: u64,
    pub skip_review: bool,
}

#[derive(Debug, Clone)]
pub struct AuthConfirmation {
    pub auth_type: String,
    pub value: String,
}

#[derive(Debug, Clone)]
pub struct ReviewedDetails {
    pub to_address: String,
    pub amount: String,
    pub fee_estimate: String,
    pub total_amount: String,
}

#[derive(Debug, Clone)]
pub struct SendConfirmInput {
    pub reviewed: ReviewedDetails,
    pub auth_confirmation: AuthConfirmation,
    pub signed_tx: String,
}

#[derive(Debug, Clone)]
pub struct SendResult {
    pub tx_hash: String,
    pub status: String,
    pub block_explorer_url: String,
}

// ── Assets ──

#[derive(Debug, Clone)]
pub struct AssetRow {
    pub name: String,
    pub ticker: String,
    pub price: String,
    pub price_change: String,
    pub price_change_up: bool,
    pub holdings_value: String,
    pub holdings_amount: String,
    pub chain_id: String,
}

#[derive(Debug, Clone)]
pub struct AssetsData {
    pub assets: Vec<AssetRow>,
}

#[derive(Debug, Clone)]
pub struct LockData {
    pub auth_methods: LockAuthMethods,
    pub failed_attempts: u32,
}

#[derive(Debug, Clone)]
pub struct LockAuthMethods {
    pub password_set: bool,
}

#[derive(Debug, Clone)]
pub struct Credential {
    pub cred_type: String,
    pub value: String,
}

#[derive(Debug, Clone)]
pub struct LockInput {
    pub credential: Credential,
}

// ── Settings ──

#[derive(Debug, Clone)]
pub struct SecuritySettings {
    pub auto_lock_minutes: u32,
}

#[derive(Debug, Clone)]
pub struct SettingsData {
    pub security: SecuritySettings,
    pub fiat_currency: String,
    pub app_version: String,
}

#[derive(Debug, Clone)]
pub struct UpdatedSecurity {
    pub auto_lock_minutes: u32,
}

#[derive(Debug, Clone)]
pub struct SettingsInput {
    pub updated_security: UpdatedSecurity,
    pub fiat_currency: String,
}

#[derive(Debug, Clone)]
pub struct RevealPhraseInput {
    pub auth_type: String,
    pub value: String,
}

// ── Greeting / Unlock ──

#[derive(Debug, Clone)]
pub struct UnlockData {
    pub accounts_count: u32,
}

// ── Address Book ──

#[derive(Debug, Clone)]
pub struct AddressBookEntry {
    pub name: String,
    pub address: String,
    pub protocol: String,
}

#[derive(Debug, Clone)]
pub struct AddressBookData {
    pub entries: Vec<AddressBookEntry>,
}

#[derive(Debug, Clone, Default)]
pub struct SyncStatus {
    pub is_syncing: bool,
    pub current_height: u64,
    pub target_height: u64,
}

// ── History ──

#[derive(Debug, Clone)]
pub struct HistoryRow {
    pub hash: String,
    pub direction: String,
    pub counterparty: String,
    pub amount: String,
    pub status: String,
    pub timestamp: Option<u64>,
}

#[derive(Debug, Clone)]
pub struct HistoryData {
    pub rows: Vec<HistoryRow>,
    pub next_cursor: Option<String>,
    pub has_more: bool,
}
