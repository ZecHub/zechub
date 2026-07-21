use reddsa::orchard::SpendAuth;
use reddsa::{SigningKey, VerificationKey, Signature};
use zip32::{ChildIndex, arbitrary};
use rand::rngs::OsRng;
use rand::SeedableRng;
use rand_chacha::ChaCha20Rng;
use serde::{Serialize, Deserialize};

use crate::error::ZecAuthError;

/// Context string for ZecAuth key derivation (globally unique, <=252 bytes).
const ZECAUTH_CONTEXT: &[u8] = b"ZcashZecauthAuth";

/// ZIP-32 purpose index for ZecAuth authentication keys.
const ZECAUTH_PURPOSE: u32 = 616;

/// SLIP-44 coin type for Zcash mainnet.
const ZCASH_MAINNET_COIN_TYPE: u32 = 133;

/// SLIP-44 coin type for testnet.
const ZCASH_TESTNET_COIN_TYPE: u32 = 1;

/// Network selection for key derivation.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum Network {
    Mainnet,
    Testnet,
}

impl Network {
    pub fn coin_type(self) -> u32 {
        match self {
            Network::Mainnet => ZCASH_MAINNET_COIN_TYPE,
            Network::Testnet => ZCASH_TESTNET_COIN_TYPE,
        }
    }

    pub fn chain_id(self) -> &'static str {
        match self {
            Network::Mainnet => "zcash:mainnet",
            Network::Testnet => "zcash:testnet",
        }
    }
}

impl std::fmt::Display for Network {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Network::Mainnet => write!(f, "mainnet"),
            Network::Testnet => write!(f, "testnet"),
        }
    }
}

impl std::str::FromStr for Network {
    type Err = ZecAuthError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "mainnet" | "zcash:mainnet" => Ok(Network::Mainnet),
            "testnet" | "zcash:testnet" => Ok(Network::Testnet),
            _ => Err(ZecAuthError::ParseError(format!("unknown network: {s}"))),
        }
    }
}

/// A serializable ZecAuth public key (the user's protocol identity).
#[derive(Debug, Clone)]
pub struct AuthPublicKey {
    inner: VerificationKey<SpendAuth>,
    bytes: [u8; 32],
}

impl PartialEq for AuthPublicKey {
    fn eq(&self, other: &Self) -> bool {
        self.bytes == other.bytes
    }
}

impl Eq for AuthPublicKey {}

impl AuthPublicKey {
    /// Verify a signature against this public key.
    pub fn verify(&self, message: &[u8], signature: &[u8; 64]) -> Result<(), ZecAuthError> {
        let sig = Signature::<SpendAuth>::from(*signature);
        self.inner
            .verify(message, &sig)
            .map_err(|_| ZecAuthError::VerificationFailed)
    }

    /// Serialize to 32 bytes.
    pub fn to_bytes(&self) -> [u8; 32] {
        self.bytes
    }

    /// Serialize to hex string.
    pub fn to_hex(&self) -> String {
        hex::encode(self.bytes)
    }

    /// Deserialize from 32 bytes.
    pub fn from_bytes(bytes: [u8; 32]) -> Result<Self, ZecAuthError> {
        let inner = VerificationKey::<SpendAuth>::try_from(bytes)
            .map_err(|_| ZecAuthError::InvalidPublicKey)?;
        Ok(Self { inner, bytes })
    }

    /// Deserialize from hex string.
    pub fn from_hex(s: &str) -> Result<Self, ZecAuthError> {
        let bytes: [u8; 32] = hex::decode(s)
            .map_err(|e| ZecAuthError::ParseError(format!("invalid hex: {e}")))?
            .try_into()
            .map_err(|v: Vec<u8>| {
                ZecAuthError::ParseError(format!("expected 32 bytes, got {}", v.len()))
            })?;
        Self::from_bytes(bytes)
    }
}

impl Serialize for AuthPublicKey {
    fn serialize<S: serde::Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
        serializer.serialize_str(&self.to_hex())
    }
}

impl<'de> Deserialize<'de> for AuthPublicKey {
    fn deserialize<D: serde::Deserializer<'de>>(deserializer: D) -> Result<Self, D::Error> {
        let s = String::deserialize(deserializer)?;
        Self::from_hex(&s).map_err(serde::de::Error::custom)
    }
}

/// A ZecAuth authentication keypair (private + public).
///
/// Derived deterministically from a Zcash wallet seed at the path:
/// `m / 616' / coin_type' / account'`
pub struct AuthKeyPair {
    signing_key: SigningKey<SpendAuth>,
    public_key: AuthPublicKey,
}

impl AuthKeyPair {
    /// Derive an authentication keypair from a Zcash wallet seed.
    ///
    /// The derivation path is `m / 616' / coin_type' / account'` using
    /// ZIP-32 arbitrary key derivation with the context string "ZcashZecauthAuth".
    ///
    /// # Arguments
    /// * `seed` - The wallet seed bytes (32-252 bytes)
    /// * `network` - Mainnet or Testnet (determines coin_type)
    /// * `account` - Account index (0 for default)
    pub fn from_seed(
        seed: &[u8],
        network: Network,
        account: u32,
    ) -> Result<Self, ZecAuthError> {
        Self::derive(seed, network, account, ZECAUTH_CONTEXT)
    }

    /// Derive a **domain-scoped** authentication keypair.
    ///
    /// This is the privacy-preserving variant. Each domain produces a completely
    /// independent keypair — the same seed yields different public keys for
    /// `myapp.com` vs `shop.com`. No cross-dApp correlation is possible by
    /// comparing pubkeys.
    ///
    /// Wallets SHOULD use this method for all sign-in and transaction-approval
    /// operations. The domain is taken from the challenge / transaction request.
    ///
    /// Derivation: same ZIP-32 path as `from_seed`, but the context string is
    /// `"ZcashZecauthAuth:<domain>"` instead of `"ZcashZecauthAuth"`.
    ///
    /// # Arguments
    /// * `seed`    - The wallet seed bytes (32-252 bytes)
    /// * `network` - Mainnet or Testnet
    /// * `account` - Account index (0 for default)
    /// * `domain`  - The requesting dApp's domain (e.g. `"myapp.com"`)
    pub fn from_seed_for_domain(
        seed: &[u8],
        network: Network,
        account: u32,
        domain: &str,
    ) -> Result<Self, ZecAuthError> {
        // "ZcashZecauthAuth:" is 17 bytes; domain names are typically < 235 bytes.
        // The context must stay within ZIP-32's 252-byte limit.
        let context = format!("ZcashZecauthAuth:{domain}");
        if context.len() > 252 {
            return Err(ZecAuthError::KeyDerivation(format!(
                "domain too long: context would be {} bytes (max 252)",
                context.len()
            )));
        }
        Self::derive(seed, network, account, context.as_bytes())
    }

    /// Internal derivation — shared by `from_seed` and `from_seed_for_domain`.
    fn derive(
        seed: &[u8],
        network: Network,
        account: u32,
        context: &[u8],
    ) -> Result<Self, ZecAuthError> {
        if seed.len() < 32 || seed.len() > 252 {
            return Err(ZecAuthError::KeyDerivation(format!(
                "seed must be 32-252 bytes, got {}",
                seed.len()
            )));
        }

        let path = [
            ChildIndex::hardened(ZECAUTH_PURPOSE),
            ChildIndex::hardened(network.coin_type()),
            ChildIndex::hardened(account),
        ];

        let derived = arbitrary::SecretKey::from_path(context, seed, &path);

        // Use the derived bytes as a seed for a deterministic CSPRNG, then generate
        // a valid RedPallas signing key from it. This ensures the key is always a
        // valid Pallas scalar while remaining fully deterministic.
        let mut rng = ChaCha20Rng::from_seed(*derived.data());
        let sk: SigningKey<SpendAuth> = SigningKey::new(&mut rng);

        let vk: VerificationKey<SpendAuth> = (&sk).into();
        let vk_bytes: [u8; 32] = vk.into();

        // Reconstruct the VerificationKey from bytes (since From consumes it)
        let vk_restored = VerificationKey::<SpendAuth>::try_from(vk_bytes)
            .map_err(|_| ZecAuthError::KeyDerivation("failed to reconstruct verification key".into()))?;

        Ok(Self {
            signing_key: sk,
            public_key: AuthPublicKey {
                inner: vk_restored,
                bytes: vk_bytes,
            },
        })
    }

    /// Sign a message with the authentication private key.
    pub fn sign(&self, message: &[u8]) -> [u8; 64] {
        let sig: Signature<SpendAuth> = self.signing_key.sign(OsRng, message);
        sig.into()
    }

    /// Get the public key (the user's ZecAuth identity).
    pub fn public_key(&self) -> &AuthPublicKey {
        &self.public_key
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn test_seed() -> [u8; 32] {
        // Deterministic test seed
        let mut seed = [0u8; 32];
        for (i, byte) in seed.iter_mut().enumerate() {
            *byte = i as u8;
        }
        seed
    }

    #[test]
    fn deterministic_key_derivation() {
        let seed = test_seed();
        let kp1 = AuthKeyPair::from_seed(&seed, Network::Mainnet, 0).unwrap();
        let kp2 = AuthKeyPair::from_seed(&seed, Network::Mainnet, 0).unwrap();
        assert_eq!(kp1.public_key().to_bytes(), kp2.public_key().to_bytes());
    }

    #[test]
    fn different_accounts_produce_different_keys() {
        let seed = test_seed();
        let kp0 = AuthKeyPair::from_seed(&seed, Network::Mainnet, 0).unwrap();
        let kp1 = AuthKeyPair::from_seed(&seed, Network::Mainnet, 1).unwrap();
        assert_ne!(kp0.public_key().to_bytes(), kp1.public_key().to_bytes());
    }

    #[test]
    fn different_networks_produce_different_keys() {
        let seed = test_seed();
        let main = AuthKeyPair::from_seed(&seed, Network::Mainnet, 0).unwrap();
        let test = AuthKeyPair::from_seed(&seed, Network::Testnet, 0).unwrap();
        assert_ne!(main.public_key().to_bytes(), test.public_key().to_bytes());
    }

    #[test]
    fn sign_and_verify() {
        let seed = test_seed();
        let kp = AuthKeyPair::from_seed(&seed, Network::Mainnet, 0).unwrap();
        let msg = b"test challenge message";
        let sig = kp.sign(msg);
        assert!(kp.public_key().verify(msg, &sig).is_ok());
    }

    #[test]
    fn reject_tampered_message() {
        let seed = test_seed();
        let kp = AuthKeyPair::from_seed(&seed, Network::Mainnet, 0).unwrap();
        let sig = kp.sign(b"original message");
        assert!(kp.public_key().verify(b"tampered message", &sig).is_err());
    }

    #[test]
    fn reject_wrong_key() {
        let seed1 = test_seed();
        let mut seed2 = test_seed();
        seed2[0] = 0xff;

        let kp1 = AuthKeyPair::from_seed(&seed1, Network::Mainnet, 0).unwrap();
        let kp2 = AuthKeyPair::from_seed(&seed2, Network::Mainnet, 0).unwrap();

        let msg = b"test message";
        let sig = kp1.sign(msg);
        assert!(kp2.public_key().verify(msg, &sig).is_err());
    }

    #[test]
    fn pubkey_hex_roundtrip() {
        let seed = test_seed();
        let kp = AuthKeyPair::from_seed(&seed, Network::Mainnet, 0).unwrap();
        let hex_str = kp.public_key().to_hex();
        let restored = AuthPublicKey::from_hex(&hex_str).unwrap();
        assert_eq!(kp.public_key().to_bytes(), restored.to_bytes());
    }

    #[test]
    fn pubkey_serde_roundtrip() {
        let seed = test_seed();
        let kp = AuthKeyPair::from_seed(&seed, Network::Mainnet, 0).unwrap();
        let json = serde_json::to_string(kp.public_key()).unwrap();
        let restored: AuthPublicKey = serde_json::from_str(&json).unwrap();
        assert_eq!(kp.public_key().to_bytes(), restored.to_bytes());
    }

    #[test]
    fn reject_short_seed() {
        let seed = [0u8; 16];
        assert!(AuthKeyPair::from_seed(&seed, Network::Mainnet, 0).is_err());
    }

    // ── Per-domain key isolation tests ──────────────────────────────────────

    #[test]
    fn different_domains_produce_different_keys() {
        let seed = test_seed();
        let kp_a = AuthKeyPair::from_seed_for_domain(&seed, Network::Mainnet, 0, "myapp.com").unwrap();
        let kp_b = AuthKeyPair::from_seed_for_domain(&seed, Network::Mainnet, 0, "shop.com").unwrap();
        assert_ne!(kp_a.public_key().to_bytes(), kp_b.public_key().to_bytes(),
            "different domains must produce different keys");
    }

    #[test]
    fn domain_key_differs_from_global_key() {
        let seed = test_seed();
        let global = AuthKeyPair::from_seed(&seed, Network::Mainnet, 0).unwrap();
        let scoped = AuthKeyPair::from_seed_for_domain(&seed, Network::Mainnet, 0, "myapp.com").unwrap();
        assert_ne!(global.public_key().to_bytes(), scoped.public_key().to_bytes(),
            "domain-scoped key must differ from the global key");
    }

    #[test]
    fn domain_key_is_deterministic() {
        let seed = test_seed();
        let kp1 = AuthKeyPair::from_seed_for_domain(&seed, Network::Mainnet, 0, "myapp.com").unwrap();
        let kp2 = AuthKeyPair::from_seed_for_domain(&seed, Network::Mainnet, 0, "myapp.com").unwrap();
        assert_eq!(kp1.public_key().to_bytes(), kp2.public_key().to_bytes(),
            "same domain must always produce the same key");
    }

    #[test]
    fn domain_key_sign_and_verify() {
        let seed = test_seed();
        let kp = AuthKeyPair::from_seed_for_domain(&seed, Network::Mainnet, 0, "myapp.com").unwrap();
        let msg = b"myapp.com wants you to sign in";
        let sig = kp.sign(msg);
        assert!(kp.public_key().verify(msg, &sig).is_ok());
    }

    #[test]
    fn domain_key_rejects_cross_domain_signature() {
        // A signature made with myapp.com's key must not verify against shop.com's key
        let seed = test_seed();
        let kp_myapp = AuthKeyPair::from_seed_for_domain(&seed, Network::Mainnet, 0, "myapp.com").unwrap();
        let kp_shop  = AuthKeyPair::from_seed_for_domain(&seed, Network::Mainnet, 0, "shop.com").unwrap();
        let msg = b"some challenge message";
        let sig = kp_myapp.sign(msg);
        assert!(kp_shop.public_key().verify(msg, &sig).is_err(),
            "cross-domain signature must be rejected");
    }

    #[test]
    fn domain_too_long_rejected() {
        let seed = test_seed();
        let long_domain = "a".repeat(240); // context would be 17 + 240 = 257 > 252
        assert!(AuthKeyPair::from_seed_for_domain(&seed, Network::Mainnet, 0, &long_domain).is_err());
    }
}
