use blake2::Digest;
use keypunkd::crypto::Keypair;
use keypunkd::services::KeypunkService;
use paypunk_types::{
    Account, Balance, HistoryEntry, Intent, KeypunkdResponse, Page, ProtocolId, SyncStatus,
};
use rand::Rng;
use tracing::{info, warn};

use crate::database::{AccountsRepository, AddressBookRepository, Database, SignerStateRepository};
use crate::protocol_service::ProtocolService;

/// Forward a GetEncryptionKey request to keypunkd and return its X25519 public key.
pub async fn get_keypunk_encryption_key(service: &KeypunkService) -> Result<[u8; 32], String> {
    service.get_encryption_key().await
}

/// Verify a password by forwarding to keypunkd for seed decryption.
pub async fn verify_password(
    service: &KeypunkService,
    encrypted_password: Vec<u8>,
    client_public_key: [u8; 32],
) -> Result<(), String> {
    service
        .verify_password(encrypted_password, client_public_key)
        .await
}

/// Forward a GenerateSeed request to keypunkd with the encrypted password.
/// Returns the encrypted mnemonic from keypunkd.
pub async fn generate_seed(
    service: &KeypunkService,
    encrypted_password: Vec<u8>,
    client_public_key: [u8; 32],
) -> Result<Vec<u8>, String> {
    service
        .generate_seed(encrypted_password, client_public_key)
        .await
}

/// Forward a RestoreSeed request to keypunkd with the encrypted mnemonic and password.
pub async fn restore_seed(
    service: &KeypunkService,
    encrypted_mnemonic: Vec<u8>,
    encrypted_password: Vec<u8>,
    client_public_key: [u8; 32],
) -> Result<(), String> {
    service
        .restore_seed(encrypted_mnemonic, encrypted_password, client_public_key)
        .await
}

/// Forward an ExportViewingKey request to keypunkd to derive viewing key material
/// for the given protocol and derivation path.
pub async fn export_viewing_key(
    service: &KeypunkService,
    encrypted_password: Vec<u8>,
    client_public_key: [u8; 32],
    protocol: ProtocolId,
    derivation_path: String,
) -> Result<Vec<u8>, String> {
    service
        .export_viewing_key(
            encrypted_password,
            client_public_key,
            protocol,
            derivation_path,
        )
        .await
}

/// Forward an ExportMnemonic request to keypunkd to retrieve the stored mnemonic.
pub async fn export_mnemonic(
    service: &KeypunkService,
    encrypted_password: Vec<u8>,
    client_public_key: [u8; 32],
) -> Result<Vec<u8>, String> {
    service
        .export_mnemonic(encrypted_password, client_public_key)
        .await
}

/// Submit an intent: build the unsigned artifact via the protocol,
/// then forward to keypunkd for parsing and preview.
pub async fn submit_intent(
    keypunk_service: &KeypunkService,
    protocols: &ProtocolService,
    intent: &Intent,
    derivation_path: &str,
) -> Result<KeypunkdResponse, String> {
    // Determine protocol from intent
    let protocol_id = match intent {
        Intent::Zcash(_) => ProtocolId::Zcash,
        Intent::Ethereum(_) => ProtocolId::Ethereum,
    };

    // Build the unsigned artifact
    let protocol = protocols.get(protocol_id)?;
    let raw_artifact = protocol.build(intent).await?;

    // Forward to keypunkd for parsing and preview
    let chain_id = protocol.chain_id();
    keypunk_service
        .preview_artifact(
            raw_artifact,
            protocol_id,
            chain_id,
            derivation_path.to_string(),
        )
        .await
}

/// Approve and sign an artifact.
pub async fn approve_signature(
    keypunk_service: &KeypunkService,
    encrypted_payload: Vec<u8>,
    ephemeral_public_key: [u8; 32],
    derivation_path: String,
) -> Result<Vec<u8>, String> {
    keypunk_service
        .authorize_artifact(encrypted_payload, ephemeral_public_key, derivation_path)
        .await
}

// ── Local protocol operations ──────────────────────────────────────────────

/// Get the current sync status for the given protocol.
pub async fn get_sync_status(
    protocols: &ProtocolService,
    protocol: ProtocolId,
) -> Result<SyncStatus, String> {
    protocols.get(protocol)?.get_sync_status().await
}

/// Finalize a signed artifact into broadcast-ready bytes.
pub fn finalize_artifact(
    protocols: &ProtocolService,
    protocol: ProtocolId,
    signed: &[u8],
) -> Result<Vec<u8>, String> {
    protocols.get(protocol)?.finalize(signed)
}

/// Validate an address using the protocol service.
pub fn validate_address(protocols: &ProtocolService, protocol: ProtocolId, address: &str) -> bool {
    protocols
        .get(protocol)
        .map(|p| p.validate_address(address))
        .unwrap_or(false)
}

// ── Account operations ──────────────────────────────────────────────────────

/// Create a new account from a pre-derived viewing key stored in the database.
/// Accounts must be pre-derived via unlock (indices 0-29).
pub async fn create_account(
    db: &Database,
    protocols: &ProtocolService,
    repo: &dyn AccountsRepository,
    protocol: ProtocolId,
    derivation_path: String,
    account_index: u32,
    name: String,
    birthday_height: Option<u64>,
) -> Result<Account, String> {
    let conn = db.conn.as_ref().ok_or("database is locked")?;
    let conn = conn.lock().map_err(|e| e.to_string())?;

    let existing = repo.find_by_protocol(&conn, &protocol)?;
    if existing
        .iter()
        .any(|a| a.derivation_path == derivation_path)
    {
        return Err("account already exists".to_string());
    }

    if account_index > 29 {
        return Err(format!(
            "account index {account_index} is beyond pre-derived range (0-29). \
             Re-unlock with a higher count to access this account."
        ));
    }

    let viewing_key: Vec<u8> = conn
        .query_row(
            "SELECT viewing_key FROM pre_derived_keys WHERE protocol = ?1 AND account_index = ?2",
            rusqlite::params![format!("{:?}", protocol), account_index],
            |row| row.get(0),
        )
        .map_err(|_| {
            format!(
                "no pre-derived viewing key found for {protocol:?} account {account_index}. \
                 Generate seed and unlock first."
            )
        })?;

    let id: String = (0..16)
        .map(|_| {
            let hex = rand::thread_rng().gen_range(0..16);
            format!("{hex:x}")
        })
        .collect();

    let proto = protocols.get(protocol)?;
    let address = proto.derive_address_from_viewing_key(&viewing_key, 0)?;

    let account = Account {
        id,
        protocol,
        derivation_path,
        name,
        address,
        viewing_key,
        created_at: std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap_or_default()
            .as_secs(),
        birthday_height,
    };

    repo.save(&conn, &account)?;
    Ok(account)
}

/// Save a pre-derived viewing key to the database.
pub fn save_pre_derived_key(
    db: &Database,
    protocol: ProtocolId,
    account_index: u32,
    viewing_key: &[u8],
) -> Result<(), String> {
    let conn = db.conn.as_ref().ok_or("database is locked")?;
    let conn = conn.lock().map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT OR REPLACE INTO pre_derived_keys (protocol, account_index, viewing_key) VALUES (?1, ?2, ?3)",
        rusqlite::params![format!("{:?}", protocol), account_index, viewing_key],
    ).map_err(|e| format!("failed to save pre-derived key: {e}"))?;
    Ok(())
}

/// Get a pre-derived viewing key from the database.
pub fn get_pre_derived_key(
    db: &Database,
    protocol: ProtocolId,
    account_index: u32,
) -> Result<Vec<u8>, String> {
    let conn = db.conn.as_ref().ok_or("database is locked")?;
    let conn = conn.lock().map_err(|e| e.to_string())?;
    conn.query_row(
        "SELECT viewing_key FROM pre_derived_keys WHERE protocol = ?1 AND account_index = ?2",
        rusqlite::params![format!("{:?}", protocol), account_index],
        |row| row.get(0),
    )
    .map_err(|e| format!("pre-derived key not found: {e}"))
}

/// Bulk-derive accounts for the given derivation paths.
pub async fn bulk_derive_accounts(
    keypunk_service: &KeypunkService,
    protocols: &ProtocolService,
    db: &Database,
    repo: &dyn AccountsRepository,
    encrypted_password: Vec<u8>,
    client_public_key: [u8; 32],
    paths: Vec<(ProtocolId, String)>,
    birthday_height: Option<u64>,
) -> Result<Vec<Account>, String> {
    info!("bulk_derive_accounts() with {paths:?}");

    let keys = keypunk_service
        .bulk_export_viewing_keys(encrypted_password, client_public_key, paths)
        .await?;

    let mut accounts = Vec::new();
    for (protocol, path, viewing_key) in keys {
        // TODO: account_index_from_path is fragile — custom derivations and Metamask keys use
        // different path formats. Consider making account_index an explicit parameter.
        let account_index: u32 = path
            .rsplit('\'')
            .nth(1)
            .and_then(|s| s.split('/').last())
            .and_then(|s| s.parse().ok())
            .unwrap_or(0);

        let id: String = (0..16)
            .map(|_| {
                let hex = rand::thread_rng().gen_range(0..16);
                format!("{hex:x}")
            })
            .collect();

        let proto = protocols.get(protocol)?;
        let address = proto.derive_address_from_viewing_key(&viewing_key, 0)?;

        let account = Account {
            id,
            protocol,
            derivation_path: path,
            name: proto.default_account_name(account_index),
            address,
            viewing_key,
            created_at: std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .unwrap_or_default()
                .as_secs(),
            birthday_height: if proto.chain_id().reference == "regtest" {
                Some(0)
            } else {
                birthday_height
            },
        };

        let conn = db.conn.as_ref().ok_or("database is locked")?;
        let conn = conn.lock().map_err(|e| e.to_string())?;
        repo.save(&conn, &account)?;
        accounts.push(account);
    }

    Ok(accounts)
}

/// Register an offline signer: send viewing key derivation request to the signer
/// via the bridge, store the returned viewing keys and session key.
pub async fn register_signer(
    keypunk_service: &KeypunkService,
    protocols: &ProtocolService,
    db: &Database,
    accounts_repo: &dyn AccountsRepository,
    signer_repo: &dyn SignerStateRepository,
    keystore: &Keypair,
    paths: Vec<(ProtocolId, String)>,
    birthday_height: Option<u64>,
) -> Result<u32, String> {
    info!("register_signer() with {} paths", paths.len());

    let paypunkd_pk = keystore.public_key();
    let challenge: [u8; 32] = rand::thread_rng().gen();

    let response = keypunk_service
        .register_viewing_keys(paths.clone(), challenge, paypunkd_pk)
        .await?;

    let (keys, session_public_key, signed_challenge) = match response {
        KeypunkdResponse::ViewingKeysRegistered {
            keys,
            session_public_key,
            signed_challenge,
        } => (keys, session_public_key, signed_challenge),
        KeypunkdResponse::Error { message } => return Err(message),
        _ => return Err("unexpected response from signer".to_string()),
    };

    // Verify the signed challenge
    let hash = blake2::Blake2b::<blake2::digest::consts::U32>::digest(&challenge);
    let decrypted = keystore
        .decrypt_bytes(&signed_challenge, &session_public_key)
        .map_err(|e| format!("session verification failed: {e}"))?;
    if decrypted.as_slice() != hash.as_slice() {
        return Err("session verification failed: challenge mismatch".to_string());
    }

    // Store session public key
    {
        let conn = db.conn.as_ref().ok_or("database is locked")?;
        let conn = conn.lock().map_err(|e| e.to_string())?;
        signer_repo.save_session_key(&conn, &session_public_key)?;
    }

    // Store pre-derived keys and create accounts
    let mut account_count = 0u32;
    let mut indexes: std::collections::HashMap<ProtocolId, i32> = std::collections::HashMap::new();
    let mut created_accounts: Vec<(ProtocolId, Account)> = Vec::new();

    for (protocol, path, viewing_key) in &keys {
        *indexes.entry(*protocol).or_insert(-1) += 1;
        let account_index = *indexes.get(protocol).unwrap_or(&0) as u32;

        {
            let conn = db.conn.as_ref().ok_or("database is locked")?;
            let conn = conn.lock().map_err(|e| e.to_string())?;
            conn.execute(
                "INSERT OR REPLACE INTO pre_derived_keys (protocol, account_index, viewing_key) VALUES (?1, ?2, ?3)",
                rusqlite::params![format!("{:?}", protocol), account_index, viewing_key],
            ).map_err(|e| format!("failed to save pre-derived key: {e}"))?;
        }

        let proto = match protocols.get(*protocol) {
            Ok(p) => p,
            Err(_) => continue,
        };
        let address = proto.derive_address_from_viewing_key(viewing_key, 0)?;

        let id: String = (0..16)
            .map(|_| {
                let hex = rand::thread_rng().gen_range(0..16);
                format!("{hex:x}")
            })
            .collect();

        let account = Account {
            id,
            protocol: *protocol,
            derivation_path: path.clone(),
            name: proto.default_account_name(account_index),
            address,
            viewing_key: viewing_key.clone(),
            created_at: std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .unwrap_or_default()
                .as_secs(),
            birthday_height: if proto.chain_id().reference == "regtest" {
                Some(0)
            } else {
                birthday_height
            },
        };

        {
            let conn = db.conn.as_ref().ok_or("database is locked")?;
            let conn = conn.lock().map_err(|e| e.to_string())?;
            accounts_repo.save(&conn, &account)?;
        }

        created_accounts.push((*protocol, account));
        account_count += 1;
    }

    // Sync accounts (requires .await, no DB lock held)
    // Auto-fetch birthday for each protocol that supports it.
    use std::collections::HashMap as StdHashMap;
    let mut birthday_cache: StdHashMap<ProtocolId, u64> = StdHashMap::new();
    for (protocol, account) in &created_accounts {
        if let Ok(proto) = protocols.get(*protocol) {
            let bday = if let Some(&h) = birthday_cache.get(protocol) {
                h
            } else {
                let h = if proto.chain_id().reference == "regtest" {
                    Some(0)
                } else {
                    birthday_height
                };
                if let Some(height) = h {
                    birthday_cache.insert(*protocol, height);
                }
                h.unwrap_or(0)
            };
            if let Err(e) = proto
                .sync_account(&account.viewing_key, bday, &account.address)
                .await
            {
                warn!(?protocol, account = %account.id, error = %e, "sync_account after register failed");
            }
        }
    }

    info!(count = account_count, "signer registered successfully");
    db.mark_initialized()
        .map_err(|e| format!("failed to write marker: {e}"))?;
    Ok(account_count)
}

/// Verify an existing signer session by sending a challenge and checking the signed response.
pub async fn verify_signer_session(
    keypunk_service: &KeypunkService,
    db: &Database,
    signer_repo: &dyn SignerStateRepository,
    keystore: &Keypair,
) -> Result<(), String> {
    info!("verify_signer_session()");

    let session_pk = {
        let conn = db.conn.as_ref().ok_or("database is locked")?;
        let conn = conn.lock().map_err(|e| e.to_string())?;
        signer_repo
            .get_session_key(&conn)?
            .ok_or_else(|| "no session key stored — register first".to_string())?
    };

    let challenge: [u8; 32] = rand::thread_rng().gen();

    let response = keypunk_service.verify_signer_session(challenge).await?;

    let signed_challenge = match response {
        KeypunkdResponse::SessionVerified { signed_challenge } => signed_challenge,
        KeypunkdResponse::Error { message } => return Err(message),
        _ => return Err("unexpected response from signer".to_string()),
    };

    let hash = blake2::Blake2b::<blake2::digest::consts::U32>::digest(&challenge);
    let decrypted = keystore
        .decrypt_bytes(&signed_challenge, &session_pk)
        .map_err(|e| format!("session verification failed: {e}"))?;
    if decrypted.as_slice() != hash.as_slice() {
        return Err("session verification failed: challenge mismatch".to_string());
    }

    info!("signer session verified");
    Ok(())
}

/// List all accounts from the database.
pub fn list_accounts(db: &Database, repo: &dyn AccountsRepository) -> Result<Vec<Account>, String> {
    let conn = db.conn.as_ref().ok_or("database is locked")?;
    let conn = conn.lock().map_err(|e| e.to_string())?;
    repo.find_all(&conn)
}

/// Get a single account by ID.
pub fn get_account(
    db: &Database,
    repo: &dyn AccountsRepository,
    id: &str,
) -> Result<Option<Account>, String> {
    let conn = db.conn.as_ref().ok_or("database is locked")?;
    let conn = conn.lock().map_err(|e| e.to_string())?;
    repo.find_by_id(&conn, id)
}

/// Query the spendable, pending, and total balance for the given address and asset.
pub async fn get_balance(
    protocols: &ProtocolService,
    protocol: ProtocolId,
    address: &str,
    asset: &str,
) -> Result<Balance, String> {
    protocols.get(protocol)?.get_balance(address, asset).await
}

// ── Address Book ───────────────────────────────────────────────────────────

/// Get all address book entries from the database.
pub fn get_address_book(
    db: &Database,
    repo: &dyn AddressBookRepository,
) -> Result<Vec<crate::messages::AddressBookEntry>, String> {
    let conn = db.conn.as_ref().ok_or("database is locked")?;
    let conn = conn.lock().map_err(|e| e.to_string())?;
    repo.find_all(&conn)
}

/// Add a new entry to the address book.
pub fn add_address_book_entry(
    db: &Database,
    repo: &dyn AddressBookRepository,
    name: String,
    address: String,
    protocol: String,
) -> Result<(), String> {
    let conn = db.conn.as_ref().ok_or("database is locked")?;
    let conn = conn.lock().map_err(|e| e.to_string())?;
    repo.insert(
        &conn,
        &crate::messages::AddressBookEntry {
            name,
            address,
            protocol,
        },
    )
}

// ── Settings ────────────────────────────────────────────────────────────────

/// Get settings from the database. Returns defaults if not set.
pub fn get_settings(db: &Database) -> Result<(u32, String), String> {
    let conn = db.conn.as_ref().ok_or("database is locked")?;
    let conn = conn.lock().map_err(|e| e.to_string())?;

    let auto_lock = conn
        .query_row(
            "SELECT value FROM settings WHERE key = 'auto_lock_minutes'",
            [],
            |row| row.get::<_, String>(0),
        )
        .unwrap_or_else(|_| "5".to_string());

    let fiat = conn
        .query_row(
            "SELECT value FROM settings WHERE key = 'fiat_currency'",
            [],
            |row| row.get::<_, String>(0),
        )
        .unwrap_or_else(|_| "USD".to_string());

    let auto_lock_minutes = auto_lock.parse::<u32>().unwrap_or(5);
    Ok((auto_lock_minutes, fiat))
}

/// Save settings to the database.
pub fn save_settings(
    db: &Database,
    auto_lock_minutes: u32,
    fiat_currency: String,
) -> Result<(), String> {
    let conn = db.conn.as_ref().ok_or("database is locked")?;
    let conn = conn.lock().map_err(|e| e.to_string())?;

    conn.execute(
        "INSERT OR REPLACE INTO settings (key, value) VALUES ('auto_lock_minutes', ?1)",
        rusqlite::params![auto_lock_minutes.to_string()],
    )
    .map_err(|e| format!("failed to save auto_lock_minutes: {e}"))?;

    conn.execute(
        "INSERT OR REPLACE INTO settings (key, value) VALUES ('fiat_currency', ?1)",
        rusqlite::params![fiat_currency],
    )
    .map_err(|e| format!("failed to save fiat_currency: {e}"))?;

    Ok(())
}

// ── Protocol-routed operations ───────────────────────────────────────────

/// Create a transfer for the given protocol and account.
pub async fn create_transfer(
    protocols: &ProtocolService,
    protocol: ProtocolId,
    account: u32,
    to: &str,
    amount: u64,
    memo: Option<&str>,
    _lightwalletd_host: &str,
) -> Result<Vec<u8>, String> {
    protocols
        .get(protocol)?
        .create_transfer(account, to.to_string(), amount, memo.map(|m| m.to_string()))
        .await
}

/// Fetch transaction history for the given protocol and account.
pub async fn get_history(
    protocols: &ProtocolService,
    protocol: ProtocolId,
    account: u32,
    cursor: Option<String>,
    limit: u32,
) -> Result<Page<HistoryEntry>, String> {
    protocols
        .get(protocol)?
        .get_history(account, cursor, limit)
        .await
}

/// Sync the wallet state with the blockchain for the given protocol and account.
/// Background sync loop handles continuous syncing — this is a manual trigger.
pub async fn sync_wallet(_protocol: ProtocolId, _account: u32) -> Result<(), String> {
    // Background sync loop handles continuous syncing automatically.
    // This method exists as a manual trigger for cases where the caller
    // wants to force a sync outside the regular interval.
    Ok(())
}

/// Finalize and broadcast a signed transaction to the network.
/// Returns the transaction hash.
pub async fn broadcast_transaction(
    protocols: &ProtocolService,
    protocol: ProtocolId,
    raw_tx: &[u8],
) -> Result<String, String> {
    let (finalized, stored_txid) = protocols.get(protocol)?.store_and_finalize(raw_tx).await?;
    let broadcast_hash = protocols.get(protocol)?.broadcast(&finalized).await?;
    let tx_hash = stored_txid.clone().unwrap_or(broadcast_hash.clone());
    if let Some(ref stored) = &stored_txid {
        if stored != &broadcast_hash {
            tracing::warn!(
                ?protocol,
                stored_txid = %stored,
                broadcast_txid = %broadcast_hash,
                "txid mismatch between wallet DB and broadcast"
            );
        }
    }
    tracing::info!(?protocol, tx_hash = %tx_hash, "transaction broadcast");
    Ok(tx_hash)
}

/// Query the on-chain status of a transaction by its ID.
pub async fn get_transaction_status(
    protocols: &ProtocolService,
    protocol: ProtocolId,
    txid: String,
) -> Result<paypunk_types::TxStatus, String> {
    protocols.get(protocol)?.get_transaction_status(txid).await
}

/// Get the current block height from the blockchain.
pub async fn get_current_block_height(
    protocols: &ProtocolService,
    protocol: ProtocolId,
    lightwalletd_host: String,
) -> Result<paypunk_types::BlockHeight, String> {
    protocols
        .get(protocol)?
        .get_current_block_height(lightwalletd_host)
        .await
}

/// Estimate the fee for a transfer to the given address with the given amount and optional memo.
pub async fn estimate_fee(
    protocols: &ProtocolService,
    protocol: ProtocolId,
    to: &str,
    amount: u64,
    memo: Option<&str>,
    _lightwalletd_host: &str,
) -> Result<u64, String> {
    protocols
        .get(protocol)?
        .estimate_fee(to.to_string(), amount, memo.map(|m| m.to_string()))
        .await
}
