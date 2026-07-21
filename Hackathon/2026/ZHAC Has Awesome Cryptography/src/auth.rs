//! Zcash Login — privacy-preserving authentication using Zcash Sapling primitives.
//!
//! Implements a challenge-response authentication protocol where:
//!
//! 1. The **prover** signs a challenge with their ZHAC private key (RedJubjub SpendAuth).
//! 2. The challenge is bound to the current Zcash mainnet block height and best block hash,
//!    proving the authentication is fresh and tied to real chain state.
//! 3. The **verifier** checks the signature AND independently queries a
//!    LightwalletD server to confirm the block height and hash match —
//!    preventing replay attacks.
//! 4. Nonces are persisted to `~/.zhac/nonces.json` so replay protection
//!    survives across CLI invocations and server restarts.
//!
//! ## Protocol
//!
//! ```text
//! Challenge = {
//!     nonce:           [u8; 32],   // random nonce (replay protection)
//!     block_height:    u64,         // current Zcash mainnet block height
//!     best_block_hash: String,      // best block hash from mainnet
//!     timestamp:       u64,         // unix timestamp
//! }
//!
//! Signed message = nonce ‖ block_height_le ‖ best_block_hash_bytes ‖ timestamp_le
//!
//! AuthToken = {
//!     public_key:  String,          // zhac1... address
//!     challenge:   Challenge,
//!     signature:   [u8; 64],        // RedJubjub SpendAuth signature
//! }
//! ```

use std::collections::HashSet;
use std::fs;
use std::path::PathBuf;
use std::time::{SystemTime, UNIX_EPOCH};

use rand::RngCore;
use serde::{Deserialize, Serialize};

use crate::keys::{ZhacPrivateKey, ZhacPublicKey, ZhacSignature};
use crate::lightwalletd::LightwalletdClient;
use crate::sign;
use crate::{Result, ZhacError};

/// Maximum block height tolerance (propagation delay).
const BLOCK_TOLERANCE: u64 = 1;

/// Maximum timestamp skew (5 minutes).
const TIMESTAMP_TOLERANCE_SECS: u64 = 300;

/// In-memory + persistent nonce cache for replay protection.
///
/// Nonces are stored in memory for fast lookup and persisted to
/// `~/.zhac/nonces.json` so protection survives across invocations.
pub struct NonceCache {
    seen: HashSet<[u8; 32]>,
    path: Option<PathBuf>,
}

impl Default for NonceCache {
    fn default() -> Self {
        Self::new()
    }
}

impl NonceCache {
    /// Create a new empty in-memory nonce cache.
    pub fn new() -> Self {
        Self { seen: HashSet::new(), path: None }
    }

    /// Load nonce cache from the default path (`~/.zhac/nonces.json`).
    /// If the file doesn't exist, starts with an empty cache.
    pub fn open() -> Result<Self> {
        let path = crate::chain::config_dir()?.join("nonces.json");
        let seen = if path.exists() {
            let json = fs::read_to_string(&path).unwrap_or_default();
            let arr: Vec<Vec<u8>> = serde_json::from_str(&json).unwrap_or_default();
            arr.into_iter()
                .filter_map(|v| {
                    if v.len() == 32 {
                        let mut a = [0u8; 32];
                        a.copy_from_slice(&v);
                        Some(a)
                    } else {
                        None
                    }
                })
                .collect()
        } else {
            HashSet::new()
        };
        Ok(Self { seen, path: Some(path) })
    }

    /// Check if a nonce has been seen before, and insert it if not.
    /// Returns `true` if the nonce is new (not replayed), `false` if replayed.
    /// If a persistence path is set, the cache is saved to disk on insert.
    pub fn check_and_insert(&mut self, nonce: &[u8; 32]) -> bool {
        let is_new = self.seen.insert(*nonce);
        if is_new {
            if let Err(e) = self.persist() {
                eprintln!("Warning: could not persist nonce cache: {e}");
            }
        }
        is_new
    }

    /// Clear the nonce cache (both memory and disk).
    pub fn clear(&mut self) {
        self.seen.clear();
        if let Some(ref path) = self.path {
            let _ = fs::remove_file(path);
        }
    }

    /// Save the nonce cache to disk.
    fn persist(&self) -> Result<()> {
        let path = self.path.as_ref()
            .ok_or_else(|| ZhacError::Crypto("no persistence path set".into()))?;
        let arr: Vec<Vec<u8>> = self.seen.iter().map(|n| n.to_vec()).collect();
        let json = serde_json::to_string(&arr)
            .map_err(|e| ZhacError::Crypto(format!("serialize nonces: {e}")))?;
        crate::keys::write_file_secure(path, json.as_bytes())?;
        Ok(())
    }
}

/// Authentication challenge — bound to Zcash mainnet chain state.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct AuthChallenge {
    pub nonce: [u8; 32],
    pub block_height: u64,
    pub best_block_hash: String,
    pub timestamp: u64,
}

/// Authentication token — challenge + signature proving key ownership.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct AuthToken {
    pub public_key: String,
    pub challenge: AuthChallenge,
    pub signature: Vec<u8>,
}

impl AuthChallenge {
    /// Create a new challenge bound to the current Zcash mainnet state.
    pub fn create(client: &LightwalletdClient) -> Result<Self> {
        let info = client.get_chain_info()?;
        let mut nonce = [0u8; 32];
        rand::rngs::OsRng.fill_bytes(&mut nonce);
        let timestamp = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map(|d| d.as_secs())
            .unwrap_or(0);
        Ok(Self { nonce, block_height: info.blocks, best_block_hash: info.best_block_hash, timestamp })
    }

    /// Create a challenge with a mock block height (for testing without a node).
    pub fn create_mock(block_height: u64, best_block_hash: &str) -> Self {
        let mut nonce = [0u8; 32];
        rand::rngs::OsRng.fill_bytes(&mut nonce);
        let timestamp = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map(|d| d.as_secs())
            .unwrap_or(0);
        Self { nonce, block_height, best_block_hash: best_block_hash.to_string(), timestamp }
    }

    /// Serialize the challenge into the canonical byte sequence that gets signed.
    ///
    /// Format: `nonce (32) ‖ block_height (8 LE) ‖ best_block_hash (32 bytes) ‖ timestamp (8 LE)`
    pub fn to_signing_bytes(&self) -> Result<Vec<u8>> {
        let mut bytes = Vec::with_capacity(32 + 8 + 32 + 8);
        bytes.extend_from_slice(&self.nonce);
        bytes.extend_from_slice(&self.block_height.to_le_bytes());
        let hash_bytes = hex::decode(&self.best_block_hash)
            .map_err(|e| ZhacError::Crypto(format!("invalid block hash hex: {e}")))?;
        if hash_bytes.len() != 32 {
            return Err(ZhacError::Crypto(format!(
                "block hash must be 32 bytes (64 hex chars), got {} bytes", hash_bytes.len()
            )));
        }
        bytes.extend_from_slice(&hash_bytes);
        bytes.extend_from_slice(&self.timestamp.to_le_bytes());
        Ok(bytes)
    }
}

impl AuthToken {
    /// Create an auth token by signing a challenge with a private key.
    pub fn create(challenge: AuthChallenge, private_key: &ZhacPrivateKey) -> Result<Self> {
        let signing_bytes = challenge.to_signing_bytes()?;
        let sig = sign::sign(&signing_bytes, private_key)?;
        Ok(Self {
            public_key: private_key.to_public_key(&[0u8; 11])?.to_zhac_address(),
            challenge, signature: sig.to_bytes(),
        })
    }

    /// Create an auth token with a specific public key (for testing or FROST).
    pub fn create_with_pubkey(
        challenge: AuthChallenge,
        private_key: &ZhacPrivateKey,
        public_key: &ZhacPublicKey,
    ) -> Result<Self> {
        let signing_bytes = challenge.to_signing_bytes()?;
        let sig = sign::sign(&signing_bytes, private_key)?;
        Ok(Self { public_key: public_key.to_zhac_address(), challenge, signature: sig.to_bytes() })
    }

    /// Verify this auth token against a LightwalletD server.
    ///
    /// Checks: signature, block height (within tolerance), block hash,
    /// timestamp freshness, and nonce replay protection.
    pub fn verify(
        &self,
        client: &LightwalletdClient,
        nonce_cache: &mut NonceCache,
    ) -> Result<VerificationResult> {
        let pk = ZhacPublicKey::from_zhac_address(&self.public_key)?;
        let sig = ZhacSignature::from_bytes(&self.signature)?;
        let signing_bytes = self.challenge.to_signing_bytes()?;
        sign::verify(&signing_bytes, &sig, &pk)
            .map_err(|e| ZhacError::Crypto(format!("signature verification failed: {e}")))?;

        let info = client.get_chain_info()?;

        let height_diff = self.challenge.block_height.abs_diff(info.blocks);
        if height_diff > BLOCK_TOLERANCE {
            return Ok(VerificationResult {
                valid: false,
                reason: format!(
                    "block height mismatch: token has {} but server reports {} (tolerance: {})",
                    self.challenge.block_height, info.blocks, BLOCK_TOLERANCE
                ),
                chain: info.chain, node_height: info.blocks, key_id: pk.key_id(),
            });
        }

        if self.challenge.best_block_hash != info.best_block_hash {
            let expected_hash = client.get_block_hash(self.challenge.block_height)?;
            if expected_hash != self.challenge.best_block_hash {
                return Ok(VerificationResult {
                    valid: false,
                    reason: format!(
                        "block hash mismatch: server has {} at height {} but token claims {}",
                        expected_hash, self.challenge.block_height, self.challenge.best_block_hash
                    ),
                    chain: info.chain, node_height: info.blocks, key_id: pk.key_id(),
                });
            }
        }

        let now = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map(|d| d.as_secs())
            .unwrap_or(0);
        let time_diff = self.challenge.timestamp.abs_diff(now);
        if time_diff > TIMESTAMP_TOLERANCE_SECS {
            return Ok(VerificationResult {
                valid: false,
                reason: format!(
                    "timestamp expired: token is {}s old (max: {}s)",
                    time_diff, TIMESTAMP_TOLERANCE_SECS
                ),
                chain: info.chain, node_height: info.blocks, key_id: pk.key_id(),
            });
        }

        if !nonce_cache.check_and_insert(&self.challenge.nonce) {
            return Ok(VerificationResult {
                valid: false,
                reason: "nonce replay detected: this token has already been used".into(),
                chain: info.chain, node_height: info.blocks, key_id: pk.key_id(),
            });
        }

        Ok(VerificationResult {
            valid: true, reason: "authenticated".into(),
            chain: info.chain, node_height: info.blocks, key_id: pk.key_id(),
        })
    }

    /// Verify the signature only (without connecting to a Zcash node).
    pub fn verify_signature_only(&self) -> Result<bool> {
        let pk = ZhacPublicKey::from_zhac_address(&self.public_key)?;
        let sig = ZhacSignature::from_bytes(&self.signature)?;
        let signing_bytes = self.challenge.to_signing_bytes()?;
        match sign::verify(&signing_bytes, &sig, &pk) {
            Ok(()) => Ok(true),
            Err(_) => Ok(false),
        }
    }

    /// Serialize to JSON for storage or transmission.
    pub fn to_json(&self) -> Result<String> {
        serde_json::to_string_pretty(self)
            .map_err(|e| ZhacError::Crypto(format!("serialize auth token: {e}")))
    }

    /// Deserialize from JSON.
    pub fn from_json(json: &str) -> Result<Self> {
        serde_json::from_str(json)
            .map_err(|e| ZhacError::Crypto(format!("deserialize auth token: {e}")))
    }
}

/// Result of auth token verification.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct VerificationResult {
    pub valid: bool,
    pub reason: String,
    pub chain: String,
    pub node_height: u64,
    pub key_id: String,
}

// ── Tests ──────────────────────────────────────────────────────────────────

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn mock_challenge_signing_bytes_roundtrip() {
        let challenge = AuthChallenge::create_mock(1_000_000, &"00".repeat(32));
        let bytes = challenge.to_signing_bytes().unwrap();
        assert_eq!(bytes.len(), 32 + 8 + 32 + 8);
    }

    #[test]
    fn nonce_cache_detects_replay() {
        let dir = tempfile::tempdir().unwrap();
        let orig_home = std::env::var("HOME").unwrap_or_default();
        std::env::set_var("HOME", dir.path());
        std::fs::create_dir_all(dir.path().join(".zhac")).unwrap();

        let mut cache = NonceCache::open().unwrap();
        let nonce = [42u8; 32];
        assert!(cache.check_and_insert(&nonce));   // first time: new
        assert!(!cache.check_and_insert(&nonce));  // second time: replay

        // Reload from disk — replay protection persists
        let mut cache2 = NonceCache::open().unwrap();
        assert!(!cache2.check_and_insert(&nonce));  // still replayed

        std::env::set_var("HOME", orig_home);
    }
}
