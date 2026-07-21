use bip39::Mnemonic;
use paypunk_types::ProtocolId;
use tracing::{debug, info};
use zeroize::Zeroizing;

use crate::{
    crypto::Keypair,
    errors::{GenerateError, RestoreError},
    key,
    protocol::ProtocolService,
    seed_store::SeedStore,
};

/// Generate a new BIP39 seed, encrypt it with the user's password, and persist to the seed store.
/// Also persists the encrypted mnemonic for later reveal.
/// Returns the encrypted mnemonic for the client to display.
pub fn generate_seed(
    keystore: &Keypair,
    encrypted_password: &[u8],
    client_pk: &[u8; 32],
    store: &impl SeedStore,
) -> Result<Vec<u8>, GenerateError> {
    debug!("decrypting password");
    let password = keystore.decrypt(encrypted_password, client_pk)?;

    debug!("generating BIP39 seed");
    let (seed, mnemonic) = key::generate_seed();

    debug!("encrypting seed with password");
    let encrypted = key::encrypt_seed(&seed, &*password)?;

    debug!("encrypting mnemonic with password");
    let encrypted_mnemonic = key::encrypt_mnemonic(&mnemonic, &*password)?;

    debug!("persisting encrypted seed and mnemonic");
    store.write(&encrypted)?;
    store.write_mnemonic(&encrypted_mnemonic)?;

    let mnemonic = Zeroizing::new(mnemonic);
    debug!("encrypting mnemonic for client");
    Ok(keystore.encrypt(mnemonic, client_pk))
}

/// Restore a wallet from an existing BIP39 mnemonic phrase.
/// Validates the mnemonic, derives the seed, encrypts with password, and persists.
/// Also persists the encrypted mnemonic for later reveal.
pub fn restore_seed(
    keystore: &Keypair,
    encrypted_mnemonic: &[u8],
    encrypted_password: &[u8],
    client_pk: &[u8; 32],
    store: &impl SeedStore,
) -> Result<(), RestoreError> {
    debug!("decrypting password");
    let password = keystore.decrypt(encrypted_password, client_pk)?;

    debug!("decrypting mnemonic");
    let mnemonic_str = keystore.decrypt(encrypted_mnemonic, client_pk)?;

    debug!("validating BIP39 mnemonic");
    let mnemonic = Mnemonic::parse_in(bip39::Language::English, &*mnemonic_str)
        .map_err(|e| RestoreError::InvalidMnemonic(e.to_string()))?;

    let seed_bytes = mnemonic.to_seed_normalized("");
    let mut seed = [0u8; 64];
    seed.copy_from_slice(&seed_bytes);

    debug!("encrypting seed with password");
    let encrypted = key::encrypt_seed(&seed, &*password)?;

    debug!("encrypting mnemonic with password");
    let encrypted_mnemonic_blob = key::encrypt_mnemonic(&*mnemonic_str, &*password)?;

    debug!("persisting encrypted seed and mnemonic");
    store.write(&encrypted)?;
    store.write_mnemonic(&encrypted_mnemonic_blob)?;

    Ok(())
}

/// Decrypt the seed from the store using the given password.
///
/// Returns the 64-byte BIP39 seed.
pub fn decrypt_seed(
    encrypted_password: &[u8],
    client_pk: &[u8; 32],
    keystore: &Keypair,
    store: &impl SeedStore,
) -> Result<[u8; 64], String> {
    debug!("decrypting password");
    let password = keystore
        .decrypt(encrypted_password, client_pk)
        .map_err(|e| format!("password decryption failed: {e}"))?;

    debug!("reading encrypted seed from store");
    let encrypted = store
        .read()
        .map_err(|e| format!("read seed failed: {e}"))?
        .ok_or_else(|| "no seed found — wallet not initialized".to_string())?;

    debug!("decrypting seed");
    key::decrypt_seed(&encrypted, &*password).map_err(|e| format!("seed decryption failed: {e}"))
}

/// Validate a BIP39 mnemonic phrase.
///
/// Returns `true` if the phrase is a valid 12-word English BIP39 mnemonic.
pub fn validate_mnemonic(phrase: &str) -> bool {
    Mnemonic::parse_in(bip39::Language::English, phrase).is_ok()
}

/// Read and decrypt the stored mnemonic, then re-encrypt it to the client's public key.
pub fn export_mnemonic(
    encrypted_password: &[u8],
    client_pk: &[u8; 32],
    keystore: &Keypair,
    store: &impl SeedStore,
) -> Result<Vec<u8>, String> {
    debug!("decrypting password");
    let password = keystore
        .decrypt(encrypted_password, client_pk)
        .map_err(|e| format!("password decryption failed: {e}"))?;

    debug!("reading encrypted mnemonic from store");
    let encrypted_mnemonic = store
        .read_mnemonic()
        .map_err(|e| format!("read mnemonic failed: {e}"))?
        .ok_or_else(|| "no mnemonic found — wallet not initialized".to_string())?;

    debug!("decrypting mnemonic");
    let mnemonic = key::decrypt_mnemonic(&encrypted_mnemonic, &*password)
        .map_err(|e| format!("mnemonic decryption failed: {e}"))?;

    let mnemonic = Zeroizing::new(mnemonic);
    debug!("encrypting mnemonic for client");
    Ok(keystore.encrypt(mnemonic, client_pk))
}

/// Export viewing key material for the given protocol and derivation path.
pub fn export_viewing_key(
    seed: &[u8; 64],
    registry: &ProtocolService,
    protocol_id: ProtocolId,
    path: &str,
) -> Result<Vec<u8>, String> {
    let protocol = registry
        .get(protocol_id)
        .ok_or_else(|| format!("unknown protocol: {protocol_id:?}"))?;
    protocol.export_viewing(seed, path)
}

/// Bulk-export viewing keys for multiple (protocol, path) pairs.
pub fn bulk_export_viewing_keys(
    seed: &[u8; 64],
    registry: &ProtocolService,
    paths: &[(ProtocolId, String)],
) -> Result<Vec<(ProtocolId, String, Vec<u8>)>, String> {
    let mut keys = Vec::new();
    for (protocol, path) in paths {
        info!("bulk_export_viewing_keys -> path: {path}");
        let key = export_viewing_key(seed, registry, *protocol, path)?;
        keys.push((*protocol, path.clone(), key));
    }
    Ok(keys)
}

/// Parse an unsigned artifact into a serialized ArtifactSummary for user preview.
pub fn preview_artifact(
    registry: &ProtocolService,
    protocol: ProtocolId,
    raw_artifact: &[u8],
) -> Result<Vec<u8>, String> {
    let deriver = registry
        .get(protocol)
        .ok_or_else(|| format!("unknown protocol: {protocol:?}"))?;
    deriver.parse_artifact(raw_artifact)
}

/// Sign an artifact with the decrypted seed.
pub fn sign_artifact(
    seed: &[u8; 64],
    registry: &ProtocolService,
    path: &str,
    raw_artifact: &[u8],
) -> Result<Vec<u8>, String> {
    // Find the protocol by trying each one until we find one that accepts the artifact
    // In practice, the protocol is known from context
    for id in [ProtocolId::Zcash, ProtocolId::Ethereum] {
        if let Some(deriver) = registry.get(id) {
            if let Ok(signed) = deriver.sign(seed, path, raw_artifact) {
                return Ok(signed);
            }
        }
    }
    Err("no protocol could sign the artifact".to_string())
}
