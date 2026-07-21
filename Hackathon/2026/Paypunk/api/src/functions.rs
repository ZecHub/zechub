use argon2::Argon2;
use bip39::{Language, Mnemonic};
use keypunkd::crypto::Keypair;
use paypunk_types::{Account, Balance, HistoryEntry, Intent, ProtocolId, SubmitIntentResult};
use paypunkd::messages::AddressBookEntry;
use zeroize::Zeroizing;

fn hash_for_domain(password: &str, domain: &[u8]) -> Zeroizing<String> {
    let mut hash = [0u8; 32];
    Argon2::default()
        .hash_password_into(password.as_bytes(), domain, &mut hash)
        .expect("Argon2id key derivation should not fail with valid parameters");
    Zeroizing::new(hex::encode(hash))
}

/// Return the standard derivation path for the given protocol and account index.
///
/// Delegates to the protocol crate's own `derivation_path()` function so that
/// each chain owns its path format. This also allows callers to bypass the
/// dispatcher and call protocol-specific functions directly when a custom
/// derivation is needed (e.g., disposable addresses).
pub fn derivation_path(protocol: ProtocolId, account: u32) -> String {
    match protocol {
        ProtocolId::Zcash => paypunk_chains_zcash::derivation_path(account),
        ProtocolId::Ethereum => paypunk_chains_ethereum::derivation_path(account),
    }
}

/// Build the default set of registration paths: 2 accounts per protocol.
pub fn default_registration_paths(protocols: &[ProtocolId]) -> Vec<(ProtocolId, String)> {
    let mut paths = Vec::new();
    for &protocol in protocols {
        for account in 0..2 {
            paths.push((protocol, derivation_path(protocol, account)));
        }
    }
    paths
}

/// Register an offline signer: send viewing key paths to paypunkd,
/// which forwards to the bridge/signer. Returns the number of accounts derived.
pub async fn register_signer(service: &paypunkd::services::PaypunkService) -> Result<u32, String> {
    let protocols = service.get_supported_protocols().await?;
    let paths = default_registration_paths(&protocols);

    service.register_signer(paths).await
}

/// Verify an existing signer session (no password needed).
pub async fn verify_signer_session(
    service: &paypunkd::services::PaypunkService,
) -> Result<(), String> {
    service.verify_signer_session().await
}

pub async fn check_wallet_exists(
    service: &paypunkd::services::PaypunkService,
) -> Result<bool, String> {
    service.has_seed().await
}

/// Generate a random 12-word BIP39 mnemonic phrase without persisting anything.
/// The mnemonic is wrapped in `Zeroizing` so it is zeroed from memory on drop.
pub fn generate_mnemonic() -> Zeroizing<String> {
    let mnemonic = Mnemonic::generate_in(Language::English, 12)
        .expect("12-word mnemonic generation is infallible");
    Zeroizing::new(mnemonic.to_string())
}

/// Unlock the wallet by deriving initial accounts.
///
/// 1. Creates ephemeral keypair
/// 2. Fetches keypunkd's public key from paypunkd
/// 3. Queries paypunkd for supported protocols
/// 4. Builds derivation paths for each supported protocol
/// 5. Encrypts password to keypunkd's key (for bulk derivation)
/// 6. Sends Unlock to paypunkd with encrypted payload and paths
/// 7. Returns accounts count from UnlockSuccess
pub async fn unlock(
    service: &paypunkd::services::PaypunkService,
    password: Zeroizing<String>,
) -> Result<u32, String> {
    let client_keypair = Keypair::new();
    let keypunk_pk = service.get_keypunk_encryption_key().await?;
    let client_pk = client_keypair.public_key();

    let encrypted_keypunkd_password = client_keypair.encrypt(
        hash_for_domain(&password, b"keypunkd-seed-key"),
        &keypunk_pk,
    );

    // Query supported protocols and build derivation paths for each (accounts 0..30)
    let protocols = service.get_supported_protocols().await?;
    let mut paths = Vec::new();
    for &protocol in &protocols {
        for account in 0..30 {
            paths.push((protocol, derivation_path(protocol, account)));
        }
    }

    service
        .unlock(encrypted_keypunkd_password, client_pk, paths)
        .await
}

/// Generate a new wallet seed.
pub async fn generate_seed(
    service: &paypunkd::services::PaypunkService,
    password: Zeroizing<String>,
) -> Result<Zeroizing<String>, String> {
    let client_keypair = Keypair::new();
    let server_pk = service.get_keypunk_encryption_key().await?;
    let encrypted_password =
        client_keypair.encrypt(hash_for_domain(&password, b"keypunkd-seed-key"), &server_pk);
    let client_pk = client_keypair.public_key();

    let encrypted_mnemonic = service.generate_seed(encrypted_password, client_pk).await?;

    let mnemonic = client_keypair
        .decrypt(&encrypted_mnemonic, &server_pk)
        .map_err(|e| e.to_string())?;
    Ok(mnemonic)
}

/// Restore a wallet from an existing BIP39 mnemonic seed phrase.
pub async fn restore_seed(
    service: &paypunkd::services::PaypunkService,
    mnemonic: Zeroizing<String>,
    password: Zeroizing<String>,
    birthday_height: Option<u64>,
) -> Result<(), String> {
    let client_keypair = Keypair::new();
    let server_pk = service.get_keypunk_encryption_key().await?;
    let encrypted_mnemonic = client_keypair.encrypt(mnemonic, &server_pk);
    let encrypted_password =
        client_keypair.encrypt(hash_for_domain(&password, b"keypunkd-seed-key"), &server_pk);
    let client_pk = client_keypair.public_key();

    service
        .restore_seed(
            encrypted_mnemonic,
            encrypted_password,
            client_pk,
            birthday_height,
        )
        .await
}

/// Derive an address for the given protocol, account index, and address index.
pub async fn derive_address(
    service: &paypunkd::services::PaypunkService,
    password: Zeroizing<String>,
    protocol: ProtocolId,
    account: u32,
    index: u32,
) -> Result<String, String> {
    let client_keypair = Keypair::new();
    let server_pk = service.get_keypunk_encryption_key().await?;
    let encrypted_password =
        client_keypair.encrypt(hash_for_domain(&password, b"keypunkd-seed-key"), &server_pk);
    let client_pk = client_keypair.public_key();
    let derivation_path = derivation_path(protocol, account);

    service
        .derive_address(
            encrypted_password,
            client_pk,
            protocol,
            derivation_path,
            index,
        )
        .await
}

/// Submit an intent for preview.
///
/// Returns the raw artifact, parsed summary, keypunkd's signature over
/// H(raw, parsed, path), and keypunkd's public key for verification.
pub async fn submit_intent(
    service: &paypunkd::services::PaypunkService,
    intent: Intent,
    derivation_path: &str,
) -> Result<SubmitIntentResult, String> {
    match service
        .submit_intent(intent, derivation_path.to_string())
        .await?
    {
        paypunkd::messages::PaypunkdResponse::SignablePreview {
            raw_artifact,
            parsed_summary,
            keypunkd_signature,
            keypunkd_public_key,
        } => Ok(SubmitIntentResult::SignablePreview {
            raw_artifact,
            parsed_summary,
            keypunkd_signature,
            keypunkd_public_key,
        }),
        paypunkd::messages::PaypunkdResponse::SignatureApproved { signed_artifact } => {
            Ok(SubmitIntentResult::SignatureApproved { signed_artifact })
        }
        paypunkd::messages::PaypunkdResponse::Error { message } => Err(message),
        _ => Err("unexpected response from paypunkd".to_string()),
    }
}

/// Approve a previously previewed artifact by encrypting the password
/// along with the artifact and signature to keypunkd.
pub async fn approve_signature(
    service: &paypunkd::services::PaypunkService,
    raw_artifact: &[u8],
    keypunkd_signature: &[u8],
    password: Zeroizing<String>,
    derivation_path: &str,
) -> Result<Vec<u8>, String> {
    let client_keypair = Keypair::new();
    let server_pk = service.get_keypunk_encryption_key().await?;
    let client_pk = client_keypair.public_key();

    let hashed_password = hash_for_domain(&password, b"keypunkd-seed-key");
    // Encode payload: raw_len(4) + raw + sig_len(4) + sig + hashed_pw
    let mut payload = Vec::new();
    payload.extend_from_slice(&(raw_artifact.len() as u32).to_le_bytes());
    payload.extend_from_slice(raw_artifact);
    payload.extend_from_slice(&(keypunkd_signature.len() as u32).to_le_bytes());
    payload.extend_from_slice(keypunkd_signature);
    payload.extend_from_slice(hashed_password.as_bytes());

    let encrypted_payload = client_keypair.encrypt_bytes(&payload, &server_pk);

    service
        .approve_signature(encrypted_payload, client_pk, derivation_path.to_string())
        .await
}

/// Query the balance for the given address and asset (CAIP-10 and CAIP-19).
pub async fn get_balance(
    service: &paypunkd::services::PaypunkService,
    address: String,
    asset: String,
) -> Result<Balance, String> {
    service.get_balance(address, asset).await
}

/// Broadcast a finalized, signed transaction to the network.
pub async fn broadcast_transaction(
    service: &paypunkd::services::PaypunkService,
    protocol: ProtocolId,
    raw_tx: Vec<u8>,
) -> Result<String, String> {
    service.broadcast_transaction(protocol, raw_tx).await
}

/// Create a new account from a pre-derived viewing key (no password needed).
pub async fn create_account(
    service: &paypunkd::services::PaypunkService,
    protocol: ProtocolId,
    derivation_path: String,
    account_index: u32,
    name: String,
    birthday_height: Option<u64>,
) -> Result<Account, String> {
    service
        .create_account(
            protocol,
            derivation_path,
            account_index,
            name,
            birthday_height,
        )
        .await
}

/// List all accounts from the database.
pub async fn list_accounts(
    service: &paypunkd::services::PaypunkService,
) -> Result<Vec<Account>, String> {
    service.list_accounts().await
}

/// Get a single account by ID.
pub async fn get_account(
    service: &paypunkd::services::PaypunkService,
    id: String,
) -> Result<Option<Account>, String> {
    service.get_account(id).await
}

/// Fetch transaction history for the given protocol and account.
pub async fn get_history(
    service: &paypunkd::services::PaypunkService,
    protocol: ProtocolId,
    account_id: u32,
    cursor: Option<String>,
    limit: u32,
) -> Result<Vec<HistoryEntry>, String> {
    service
        .get_history(protocol, account_id, cursor, limit)
        .await
}

/// Verify the wallet password against keypunkd.
pub async fn verify_password(
    service: &paypunkd::services::PaypunkService,
    password: Zeroizing<String>,
) -> Result<(), String> {
    let client_keypair = Keypair::new();
    let server_pk = service.get_keypunk_encryption_key().await?;
    let encrypted_password =
        client_keypair.encrypt(hash_for_domain(&password, b"keypunkd-seed-key"), &server_pk);
    let client_pk = client_keypair.public_key();
    service.verify_password(encrypted_password, client_pk).await
}

/// Get all address book entries.
pub async fn get_address_book(
    service: &paypunkd::services::PaypunkService,
) -> Result<Vec<AddressBookEntry>, String> {
    service.get_address_book().await
}

/// Reveal the wallet mnemonic phrase.
///
/// Creates an ephemeral keypair, encrypts the password to keypunkd's public key,
/// sends the RevealPhrase request via paypunkd, and decrypts the returned mnemonic.
pub async fn reveal_phrase(
    service: &paypunkd::services::PaypunkService,
    password: Zeroizing<String>,
) -> Result<Zeroizing<String>, String> {
    let client_keypair = Keypair::new();
    let server_pk = service.get_keypunk_encryption_key().await?;
    let encrypted_password =
        client_keypair.encrypt(hash_for_domain(&password, b"keypunkd-seed-key"), &server_pk);
    let client_pk = client_keypair.public_key();

    let encrypted_mnemonic = service.reveal_phrase(encrypted_password, client_pk).await?;

    let mnemonic = client_keypair
        .decrypt(&encrypted_mnemonic, &server_pk)
        .map_err(|e| e.to_string())?;
    Ok(mnemonic)
}

/// Add an entry to the address book.
pub async fn add_address_book_entry(
    service: &paypunkd::services::PaypunkService,
    name: String,
    address: String,
    protocol: String,
) -> Result<(), String> {
    service
        .add_address_book_entry(name, address, protocol)
        .await
}

/// Get settings.
pub async fn get_settings(
    service: &paypunkd::services::PaypunkService,
) -> Result<(u32, String), String> {
    service.get_settings().await
}

/// Save settings.
pub async fn save_settings(
    service: &paypunkd::services::PaypunkService,
    auto_lock_minutes: u32,
    fiat_currency: String,
) -> Result<(), String> {
    service
        .save_settings(auto_lock_minutes, fiat_currency)
        .await
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_hash_for_domain_returns_hex_string() {
        let hash = hash_for_domain("mypassword", b"test-domain");
        assert_eq!(hash.len(), 64);
        assert!(hash.chars().all(|c| c.is_ascii_hexdigit()));
    }

    #[test]
    fn test_hash_for_domain_deterministic() {
        let a = hash_for_domain("password", b"test-domain-long");
        let b = hash_for_domain("password", b"test-domain-long");
        assert_eq!(*a, *b);
    }

    #[test]
    fn test_hash_for_domain_different_domains() {
        let a = hash_for_domain("password", b"domain-a-long-1");
        let b = hash_for_domain("password", b"domain-b-long-2");
        assert_ne!(*a, *b);
    }

    #[test]
    fn test_hash_for_domain_different_passwords() {
        let a = hash_for_domain("password-one", b"test-domain-long");
        let b = hash_for_domain("password-two", b"test-domain-long");
        assert_ne!(*a, *b);
    }
}
