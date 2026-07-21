pub mod mock;
pub mod real;
pub mod types;

use async_trait::async_trait;
use types::*;

#[async_trait]
pub trait WalletApi {
    async fn get_setup(&self) -> SetupData;
    async fn submit_setup_create(&self, input: SetupCreateInput) -> Result<(), ApiError>;
    async fn submit_setup_import(&self, input: SetupImportInput) -> Result<(), ApiError>;

    // Home — replace get_wallets with account-based methods
    async fn get_home(&self) -> HomeData;
    async fn submit_home(&self, input: HomeInput) -> HomeData;
    async fn home_state(&self) -> ApiState<HomeData>;
    async fn refresh_home(&self);
    async fn list_accounts(&self) -> Result<Vec<AccountInfo>, ApiError>;
    async fn add_account(&self) -> Result<(), ApiError>;
    async fn add_zcash_account(&self, birthday_height: u64) -> Result<(), ApiError>;

    // Assets — takes account_id
    async fn get_assets(&self, account_id: &str) -> AssetsData;

    // Receive — takes account_id
    async fn get_receive(&self, account_id: &str) -> ReceiveData;
    async fn submit_receive(&self, input: ReceiveInput) -> ReceiveData;
    async fn receive_state(&self, account_id: &str) -> ApiState<ReceiveData>;
    async fn refresh_receive(&self, account_id: &str);

    // Send — takes account_id
    async fn get_send(&self, account_id: &str) -> SendData;
    async fn submit_send_review(&self, input: SendReviewInput) -> SendReviewData;
    async fn submit_send_confirm(&self, input: SendConfirmInput) -> SendResult;
    async fn send_state(&self, account_id: &str) -> ApiState<SendData>;
    async fn refresh_send(&self, account_id: &str);

    async fn get_lock(&self) -> LockData;
    async fn submit_lock(&self, input: LockInput) -> Result<(), ApiError>;

    async fn get_settings(&self) -> SettingsData;
    async fn submit_settings(&self, input: SettingsInput) -> Result<(), ApiError>;
    async fn submit_reveal_phrase(&self, input: RevealPhraseInput)
        -> Result<Vec<String>, ApiError>;

    async fn check_wallet_exists(&self) -> bool;
    async fn unlock(&self, password: String) -> Result<UnlockData, ApiError>;

    // Address book
    async fn get_address_book(&self) -> AddressBookData;
    async fn add_address_book_entry(&self, name: String, address: String, protocol: String);

    // Sync
    async fn get_sync_status(&self, protocol: &str) -> SyncStatus;

    // History
    async fn get_history(&self, account_id: &str) -> HistoryData;

    async fn poll_send_result(&self) -> Option<SendResult>;
    async fn poll_send_phase(&self) -> String;
}
