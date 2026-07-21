use paypunk_ipc::IpcMessage;
use paypunk_types::{
    Account, Balance, HistoryEntry, Intent, ProtocolId, ProtocolMetadata, SyncStatus,
};
use tactix::{Recipient, Sender};

use crate::messages::{AddressBookEntry, PaypunkdRequest, PaypunkdResponse};

pub struct PaypunkService {
    recipient: Recipient<IpcMessage>,
}

impl PaypunkService {
    pub fn new(recipient: Recipient<IpcMessage>) -> Self {
        Self { recipient }
    }

    async fn send(&self, request: PaypunkdRequest) -> Result<PaypunkdResponse, String> {
        let payload =
            postcard::to_allocvec(&request).map_err(|e| format!("serialize error: {e}"))?;
        let msg = IpcMessage::new(payload);
        let response_bytes = self.recipient.ask(msg).await?;
        postcard::from_bytes(&response_bytes).map_err(|e| format!("deserialize error: {e}"))
    }

    pub async fn get_keypunk_encryption_key(&self) -> Result<[u8; 32], String> {
        match self.send(PaypunkdRequest::GetKeypunkEncryptionKey).await? {
            PaypunkdResponse::KeypunkEncryptionKey { key } => Ok(key),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn generate_seed(
        &self,
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
    ) -> Result<Vec<u8>, String> {
        match self
            .send(PaypunkdRequest::GenerateSeed {
                encrypted_password,
                client_public_key,
            })
            .await?
        {
            PaypunkdResponse::SeedGenerated { encrypted_mnemonic } => Ok(encrypted_mnemonic),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn restore_seed(
        &self,
        encrypted_mnemonic: Vec<u8>,
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
        birthday_height: Option<u64>,
    ) -> Result<(), String> {
        match self
            .send(PaypunkdRequest::RestoreSeed {
                encrypted_mnemonic,
                encrypted_password,
                client_public_key,
                birthday_height,
            })
            .await?
        {
            PaypunkdResponse::SeedRestored => Ok(()),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn submit_intent(
        &self,
        intent: Intent,
        derivation_path: String,
    ) -> Result<PaypunkdResponse, String> {
        self.send(PaypunkdRequest::SubmitIntent {
            intent,
            derivation_path,
        })
        .await
    }

    pub async fn approve_signature(
        &self,
        encrypted_payload: Vec<u8>,
        ephemeral_public_key: [u8; 32],
        derivation_path: String,
    ) -> Result<Vec<u8>, String> {
        match self
            .send(PaypunkdRequest::ApproveSignature {
                encrypted_payload,
                ephemeral_public_key,
                derivation_path,
            })
            .await?
        {
            PaypunkdResponse::SignatureApproved { signed_artifact } => Ok(signed_artifact),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn derive_address(
        &self,
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
        protocol: ProtocolId,
        derivation_path: String,
        index: u32,
    ) -> Result<String, String> {
        match self
            .send(PaypunkdRequest::DeriveAddress {
                encrypted_password,
                client_public_key,
                protocol,
                derivation_path,
                index,
            })
            .await?
        {
            PaypunkdResponse::AddressDerived { address } => Ok(address),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn get_balance(&self, address: String, asset: String) -> Result<Balance, String> {
        match self
            .send(PaypunkdRequest::GetBalance { address, asset })
            .await?
        {
            PaypunkdResponse::Balance { balance } => Ok(balance),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn broadcast_transaction(
        &self,
        protocol: ProtocolId,
        raw_tx: Vec<u8>,
    ) -> Result<String, String> {
        match self
            .send(PaypunkdRequest::BroadcastTransaction { protocol, raw_tx })
            .await?
        {
            PaypunkdResponse::TransactionBroadcasted { tx_hash } => Ok(tx_hash),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn create_account(
        &self,
        protocol: ProtocolId,
        derivation_path: String,
        account_index: u32,
        name: String,
        birthday_height: Option<u64>,
    ) -> Result<Account, String> {
        match self
            .send(PaypunkdRequest::CreateAccount {
                protocol,
                derivation_path,
                account_index,
                name,
                birthday_height,
            })
            .await?
        {
            PaypunkdResponse::AccountCreated { account } => Ok(account),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn list_accounts(&self) -> Result<Vec<Account>, String> {
        match self.send(PaypunkdRequest::ListAccounts).await? {
            PaypunkdResponse::AccountsList { accounts } => Ok(accounts),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn get_account(&self, id: String) -> Result<Option<Account>, String> {
        match self.send(PaypunkdRequest::GetAccount { id }).await? {
            PaypunkdResponse::AccountFound { account } => Ok(account),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn get_paypunkd_encryption_key(&self) -> Result<[u8; 32], String> {
        match self.send(PaypunkdRequest::GetPaypunkdEncryptionKey).await? {
            PaypunkdResponse::PaypunkdEncryptionKey { key } => Ok(key),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn has_seed(&self) -> Result<bool, String> {
        match self.send(PaypunkdRequest::HasSeed).await? {
            PaypunkdResponse::HasSeed { exists } => Ok(exists),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn get_lock_state(&self) -> Result<(bool, u32), String> {
        match self.send(PaypunkdRequest::GetLockState).await? {
            PaypunkdResponse::LockState {
                password_set,
                failed_attempts,
            } => Ok((password_set, failed_attempts)),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn verify_password(
        &self,
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
    ) -> Result<(), String> {
        match self
            .send(PaypunkdRequest::VerifyPassword {
                encrypted_password,
                client_public_key,
            })
            .await?
        {
            PaypunkdResponse::PasswordVerified => Ok(()),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn get_sync_status(&self, protocol: ProtocolId) -> Result<SyncStatus, String> {
        match self
            .send(PaypunkdRequest::GetSyncStatus { protocol })
            .await?
        {
            PaypunkdResponse::SyncStatusResult { status } => Ok(status),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response".to_string()),
        }
    }

    pub async fn get_supported_protocols(&self) -> Result<Vec<ProtocolId>, String> {
        match self.send(PaypunkdRequest::GetSupportedProtocols).await? {
            PaypunkdResponse::SupportedProtocols { protocols, .. } => Ok(protocols),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn get_protocol_metadata(&self) -> Result<Vec<ProtocolMetadata>, String> {
        match self.send(PaypunkdRequest::GetSupportedProtocols).await? {
            PaypunkdResponse::SupportedProtocols { metadata, .. } => Ok(metadata),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn unlock(
        &self,
        encrypted_keypunkd_password: Vec<u8>,
        keypunkd_client_pk: [u8; 32],
        paths: Vec<(ProtocolId, String)>,
    ) -> Result<u32, String> {
        match self
            .send(PaypunkdRequest::Unlock {
                encrypted_keypunkd_password,
                keypunkd_client_pk,
                paths,
            })
            .await?
        {
            PaypunkdResponse::UnlockSuccess { accounts_count } => Ok(accounts_count),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn bulk_derive_accounts(
        &self,
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
        paths: Vec<(ProtocolId, String)>,
    ) -> Result<Vec<Account>, String> {
        match self
            .send(PaypunkdRequest::BulkDeriveAccounts {
                encrypted_password,
                client_public_key,
                paths,
            })
            .await?
        {
            PaypunkdResponse::AccountsBulkDerived { accounts } => Ok(accounts),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn get_history(
        &self,
        protocol: ProtocolId,
        account_id: u32,
        cursor: Option<String>,
        limit: u32,
    ) -> Result<Vec<HistoryEntry>, String> {
        match self
            .send(PaypunkdRequest::GetHistory {
                protocol,
                account_id,
                cursor,
                limit,
            })
            .await?
        {
            PaypunkdResponse::HistoryResult { entries, .. } => Ok(entries),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn get_address_book(&self) -> Result<Vec<AddressBookEntry>, String> {
        match self.send(PaypunkdRequest::GetAddressBook).await? {
            PaypunkdResponse::AddressBookData { entries } => Ok(entries),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn add_address_book_entry(
        &self,
        name: String,
        address: String,
        protocol: String,
    ) -> Result<(), String> {
        match self
            .send(PaypunkdRequest::AddAddressBookEntry {
                name,
                address,
                protocol,
            })
            .await?
        {
            PaypunkdResponse::AddressBookEntryAdded => Ok(()),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn get_settings(&self) -> Result<(u32, String), String> {
        match self.send(PaypunkdRequest::GetSettings).await? {
            PaypunkdResponse::SettingsResult {
                auto_lock_minutes,
                fiat_currency,
            } => Ok((auto_lock_minutes, fiat_currency)),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn save_settings(
        &self,
        auto_lock_minutes: u32,
        fiat_currency: String,
    ) -> Result<(), String> {
        match self
            .send(PaypunkdRequest::SaveSettings {
                auto_lock_minutes,
                fiat_currency,
            })
            .await?
        {
            PaypunkdResponse::SettingsSaved => Ok(()),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn reveal_phrase(
        &self,
        encrypted_password: Vec<u8>,
        client_public_key: [u8; 32],
    ) -> Result<Vec<u8>, String> {
        match self
            .send(PaypunkdRequest::RevealPhrase {
                encrypted_password,
                client_public_key,
            })
            .await?
        {
            PaypunkdResponse::PhraseRevealed { encrypted_mnemonic } => Ok(encrypted_mnemonic),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn register_signer(&self, paths: Vec<(ProtocolId, String)>) -> Result<u32, String> {
        match self.send(PaypunkdRequest::RegisterSigner { paths }).await? {
            PaypunkdResponse::SignerRegistered { accounts_count } => Ok(accounts_count),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }

    pub async fn verify_signer_session(&self) -> Result<(), String> {
        match self.send(PaypunkdRequest::VerifySignerSession).await? {
            PaypunkdResponse::SignerSessionVerified => Ok(()),
            PaypunkdResponse::Error { message } => Err(message),
            _ => Err("unexpected response variant".to_string()),
        }
    }
}
