use serde::{Serialize, Deserialize};

use crate::challenge::ChallengeMessage;
use crate::error::ZecAuthError;
use crate::keys::{AuthKeyPair, AuthPublicKey};
use crate::scope::GrantedScopes;

/// A signed authentication response from the wallet.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AuthResponse {
    /// The wallet's ZecAuth public key (hex-encoded).
    pub pubkey: AuthPublicKey,

    /// The RedPallas signature over the challenge message (hex-encoded, 64 bytes).
    pub signature: String,

    /// The original challenge message (canonical string format).
    pub message: String,

    /// Scopes granted by the wallet (if the challenge requested scopes).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub granted_scopes: Option<GrantedScopes>,

    /// Account index the wallet authenticated with (default 0).
    #[serde(default)]
    pub account: u32,
}

impl AuthResponse {
    /// Create a signed response from a keypair and challenge.
    pub fn sign(keypair: &AuthKeyPair, challenge: &ChallengeMessage) -> Self {
        let message = challenge.to_string();
        let sig_bytes = keypair.sign(message.as_bytes());
        Self {
            pubkey: keypair.public_key().clone(),
            signature: hex::encode(sig_bytes),
            message,
            granted_scopes: None,
            account: 0,
        }
    }

    /// Create a signed response with granted scopes and account.
    pub fn sign_with_scopes(
        keypair: &AuthKeyPair,
        challenge: &ChallengeMessage,
        scopes: GrantedScopes,
        account: u32,
    ) -> Self {
        let message = challenge.to_string();
        let sig_bytes = keypair.sign(message.as_bytes());
        Self {
            pubkey: keypair.public_key().clone(),
            signature: hex::encode(sig_bytes),
            message,
            granted_scopes: Some(scopes),
            account,
        }
    }

    /// Verify this response: check signature, nonce format, and expiry.
    ///
    /// Returns the authenticated public key on success.
    pub fn verify(&self) -> Result<VerifiedAuth, ZecAuthError> {
        // Parse the challenge message from the response
        let challenge: ChallengeMessage = self.message.parse()?;

        // Validate challenge fields
        challenge.validate()?;

        // Check expiry
        if challenge.is_expired() {
            return Err(ZecAuthError::ChallengeExpired);
        }

        // Decode signature
        let sig_bytes: [u8; 64] = hex::decode(&self.signature)
            .map_err(|e| ZecAuthError::ParseError(format!("invalid signature hex: {e}")))?
            .try_into()
            .map_err(|v: Vec<u8>| ZecAuthError::InvalidSignature(v.len()))?;

        // Verify the cryptographic signature
        self.pubkey.verify(self.message.as_bytes(), &sig_bytes)?;

        Ok(VerifiedAuth {
            pubkey: self.pubkey.clone(),
            domain: challenge.domain,
            chain: challenge.chain,
            nonce: challenge.nonce,
            granted_scopes: self.granted_scopes.clone(),
            account: self.account,
        })
    }

    /// Serialize to JSON for transport.
    pub fn to_json(&self) -> Result<String, ZecAuthError> {
        serde_json::to_string(self)
            .map_err(|e| ZecAuthError::ParseError(format!("JSON serialization failed: {e}")))
    }

    /// Deserialize from JSON.
    pub fn from_json(json: &str) -> Result<Self, ZecAuthError> {
        serde_json::from_str(json)
            .map_err(|e| ZecAuthError::ParseError(format!("JSON parse failed: {e}")))
    }
}

/// The result of a successful authentication verification.
#[derive(Debug, Clone)]
pub struct VerifiedAuth {
    /// The authenticated user's public key.
    pub pubkey: AuthPublicKey,

    /// The domain that was authenticated against.
    pub domain: String,

    /// The chain (e.g., "zcash:mainnet").
    pub chain: String,

    /// The nonce that was consumed (must be marked as used by the server).
    pub nonce: String,

    /// Scopes granted by the wallet.
    pub granted_scopes: Option<GrantedScopes>,

    /// Account index the wallet used.
    pub account: u32,
}

/// Server-side helper: verify an incoming auth response against expected parameters.
///
/// This performs all verification checks:
/// 1. Signature is valid for the pubkey + message
/// 2. Challenge fields are well-formed
/// 3. Challenge has not expired
/// 4. Domain matches the expected domain
/// 5. Chain matches the expected chain
pub fn verify_response(
    response: &AuthResponse,
    expected_domain: &str,
    expected_chain: &str,
) -> Result<VerifiedAuth, ZecAuthError> {
    let verified = response.verify()?;

    if verified.domain != expected_domain {
        return Err(ZecAuthError::InvalidChallenge(format!(
            "domain mismatch: expected '{}', got '{}'",
            expected_domain, verified.domain
        )));
    }

    if verified.chain != expected_chain {
        return Err(ZecAuthError::InvalidChallenge(format!(
            "chain mismatch: expected '{}', got '{}'",
            expected_chain, verified.chain
        )));
    }

    Ok(verified)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::keys::Network;

    fn test_seed() -> [u8; 32] {
        let mut seed = [0u8; 32];
        for (i, byte) in seed.iter_mut().enumerate() {
            *byte = i as u8;
        }
        seed
    }

    #[test]
    fn sign_and_verify_response() {
        let seed = test_seed();
        let kp = AuthKeyPair::from_seed(&seed, Network::Mainnet, 0).unwrap();
        let challenge = ChallengeMessage::new("myapp.com", "https://myapp.com", Network::Mainnet);

        let response = AuthResponse::sign(&kp, &challenge);
        let verified = response.verify().unwrap();

        assert_eq!(verified.domain, "myapp.com");
        assert_eq!(verified.chain, "zcash:mainnet");
        assert_eq!(verified.pubkey.to_bytes(), kp.public_key().to_bytes());
    }

    #[test]
    fn verify_with_domain_check() {
        let seed = test_seed();
        let kp = AuthKeyPair::from_seed(&seed, Network::Mainnet, 0).unwrap();
        let challenge = ChallengeMessage::new("myapp.com", "https://myapp.com", Network::Mainnet);

        let response = AuthResponse::sign(&kp, &challenge);
        let result = verify_response(&response, "myapp.com", "zcash:mainnet");
        assert!(result.is_ok());
    }

    #[test]
    fn reject_wrong_domain() {
        let seed = test_seed();
        let kp = AuthKeyPair::from_seed(&seed, Network::Mainnet, 0).unwrap();
        let challenge = ChallengeMessage::new("myapp.com", "https://myapp.com", Network::Mainnet);

        let response = AuthResponse::sign(&kp, &challenge);
        let result = verify_response(&response, "evil.com", "zcash:mainnet");
        assert!(result.is_err());
    }

    #[test]
    fn reject_wrong_chain() {
        let seed = test_seed();
        let kp = AuthKeyPair::from_seed(&seed, Network::Mainnet, 0).unwrap();
        let challenge = ChallengeMessage::new("myapp.com", "https://myapp.com", Network::Mainnet);

        let response = AuthResponse::sign(&kp, &challenge);
        let result = verify_response(&response, "myapp.com", "zcash:testnet");
        assert!(result.is_err());
    }

    #[test]
    fn reject_tampered_message() {
        let seed = test_seed();
        let kp = AuthKeyPair::from_seed(&seed, Network::Mainnet, 0).unwrap();
        let challenge = ChallengeMessage::new("myapp.com", "https://myapp.com", Network::Mainnet);

        let mut response = AuthResponse::sign(&kp, &challenge);
        // Tamper with the message
        response.message = response.message.replace("myapp.com", "evil.com");
        assert!(response.verify().is_err());
    }

    #[test]
    fn response_json_roundtrip() {
        let seed = test_seed();
        let kp = AuthKeyPair::from_seed(&seed, Network::Mainnet, 0).unwrap();
        let challenge = ChallengeMessage::new("myapp.com", "https://myapp.com", Network::Mainnet);

        let response = AuthResponse::sign(&kp, &challenge);
        let json = response.to_json().unwrap();
        let parsed = AuthResponse::from_json(&json).unwrap();

        assert_eq!(parsed.signature, response.signature);
        assert_eq!(parsed.message, response.message);
        assert!(parsed.verify().is_ok());
    }
}
