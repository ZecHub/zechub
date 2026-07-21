use chrono::{DateTime, Duration, Utc};
use rand::Rng;
use serde::{Serialize, Deserialize};
use std::fmt;
use std::str::FromStr;

use crate::error::ZecAuthError;
use crate::keys::Network;
use crate::scope::RequestedScopes;

/// Minimum nonce length (alphanumeric characters).
const MIN_NONCE_LENGTH: usize = 16;

/// A ZecAuth challenge message (inspired by EIP-4361 / SIWE).
///
/// This is the structured message that the wallet displays to the user
/// and signs with the auth private key.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChallengeMessage {
    /// The requesting dApp's domain (e.g., "myapp.com").
    pub domain: String,

    /// The resource being accessed (e.g., "https://myapp.com/dashboard").
    pub uri: String,

    /// Protocol version. Always 1 for this spec.
    pub version: u32,

    /// Chain identifier in CAIP-2 format (e.g., "zcash:mainnet").
    pub chain: String,

    /// Cryptographically random nonce, >=16 alphanumeric characters.
    pub nonce: String,

    /// When the challenge was created (ISO 8601 UTC).
    pub issued_at: DateTime<Utc>,

    /// When the challenge expires (ISO 8601 UTC).
    pub expiration_time: DateTime<Utc>,

    /// Optional human-readable statement shown to the user.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub statement: Option<String>,

    /// Optional list of resource URIs the session grants access to.
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub resources: Vec<String>,

    /// Requested permission scopes.
    #[serde(default, skip_serializing_if = "RequestedScopes::is_empty")]
    pub scopes: RequestedScopes,
}

impl ChallengeMessage {
    /// Create a new challenge with a generated nonce and default TTL (5 minutes).
    pub fn new(domain: &str, uri: &str, network: Network) -> Self {
        let now = Utc::now();
        Self {
            domain: domain.to_string(),
            uri: uri.to_string(),
            version: 1,
            chain: network.chain_id().to_string(),
            nonce: generate_nonce(),
            issued_at: now,
            expiration_time: now + Duration::minutes(5),
            statement: None,
            resources: Vec::new(),
            scopes: RequestedScopes::default(),
        }
    }

    /// Create a new challenge with a custom TTL.
    pub fn with_ttl(domain: &str, uri: &str, network: Network, ttl_seconds: i64) -> Self {
        let now = Utc::now();
        Self {
            domain: domain.to_string(),
            uri: uri.to_string(),
            version: 1,
            chain: network.chain_id().to_string(),
            nonce: generate_nonce(),
            issued_at: now,
            expiration_time: now + Duration::seconds(ttl_seconds),
            scopes: RequestedScopes::default(),
            statement: None,
            resources: Vec::new(),
        }
    }

    /// Set the optional human-readable statement.
    pub fn with_statement(mut self, statement: &str) -> Self {
        self.statement = Some(statement.to_string());
        self
    }

    /// Set requested permission scopes.
    pub fn with_scopes(mut self, scopes: RequestedScopes) -> Self {
        self.scopes = scopes;
        self
    }

    /// Add a resource URI.
    pub fn with_resource(mut self, resource: &str) -> Self {
        self.resources.push(resource.to_string());
        self
    }

    /// Validate the challenge message.
    pub fn validate(&self) -> Result<(), ZecAuthError> {
        if self.domain.is_empty() {
            return Err(ZecAuthError::InvalidChallenge("domain is empty".into()));
        }
        if self.uri.is_empty() {
            return Err(ZecAuthError::InvalidChallenge("uri is empty".into()));
        }
        if self.version != 1 {
            return Err(ZecAuthError::InvalidChallenge(format!(
                "unsupported version: {}",
                self.version
            )));
        }
        if self.nonce.len() < MIN_NONCE_LENGTH {
            return Err(ZecAuthError::InvalidChallenge(format!(
                "nonce too short: {} < {}",
                self.nonce.len(),
                MIN_NONCE_LENGTH
            )));
        }
        if !self.nonce.chars().all(|c| c.is_ascii_alphanumeric()) {
            return Err(ZecAuthError::InvalidChallenge(
                "nonce must be alphanumeric".into(),
            ));
        }
        if self.chain != "zcash:mainnet" && self.chain != "zcash:testnet" {
            return Err(ZecAuthError::InvalidChallenge(format!(
                "unsupported chain: {}",
                self.chain
            )));
        }
        Ok(())
    }

    /// Check if the challenge has expired.
    pub fn is_expired(&self) -> bool {
        Utc::now() > self.expiration_time
    }

    /// Serialize to the canonical signing format (the bytes that get signed).
    pub fn to_signing_bytes(&self) -> Vec<u8> {
        self.to_string().into_bytes()
    }

    /// Serialize to JSON for transport (QR codes, deep links).
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

/// Human-readable display format — this is also the canonical signing format.
impl fmt::Display for ChallengeMessage {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "{domain} wants you to sign in with your Zcash wallet.\n\
             \n\
             URI: {uri}\n\
             Version: {version}\n\
             Chain: {chain}\n\
             Nonce: {nonce}\n\
             Issued At: {issued_at}\n\
             Expiration Time: {expiration_time}",
            domain = self.domain,
            uri = self.uri,
            version = self.version,
            chain = self.chain,
            nonce = self.nonce,
            issued_at = self.issued_at.to_rfc3339(),
            expiration_time = self.expiration_time.to_rfc3339(),
        )?;

        if let Some(ref statement) = self.statement {
            write!(f, "\nStatement: {statement}")?;
        }

        if !self.resources.is_empty() {
            write!(f, "\nResources:")?;
            for resource in &self.resources {
                write!(f, "\n- {resource}")?;
            }
        }

        Ok(())
    }
}

/// Parse a challenge message from its canonical string format.
impl FromStr for ChallengeMessage {
    type Err = ZecAuthError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let lines: Vec<&str> = s.lines().collect();

        if lines.is_empty() {
            return Err(ZecAuthError::ParseError("empty message".into()));
        }

        // First line: "<domain> wants you to sign in with your Zcash wallet."
        let first_line = lines[0];
        let domain = first_line
            .strip_suffix(" wants you to sign in with your Zcash wallet.")
            .ok_or_else(|| ZecAuthError::ParseError("invalid header line".into()))?
            .to_string();

        let mut uri = None;
        let mut version = None;
        let mut chain = None;
        let mut nonce = None;
        let mut issued_at = None;
        let mut expiration_time = None;
        let mut statement = None;
        let mut resources = Vec::new();
        let mut in_resources = false;

        for line in &lines[1..] {
            let line = line.trim();
            if line.is_empty() {
                continue;
            }

            if in_resources {
                if let Some(resource) = line.strip_prefix("- ") {
                    resources.push(resource.to_string());
                    continue;
                }
                in_resources = false;
            }

            if let Some(val) = line.strip_prefix("URI: ") {
                uri = Some(val.to_string());
            } else if let Some(val) = line.strip_prefix("Version: ") {
                version = Some(
                    val.parse::<u32>()
                        .map_err(|_| ZecAuthError::ParseError("invalid version".into()))?,
                );
            } else if let Some(val) = line.strip_prefix("Chain: ") {
                chain = Some(val.to_string());
            } else if let Some(val) = line.strip_prefix("Nonce: ") {
                nonce = Some(val.to_string());
            } else if let Some(val) = line.strip_prefix("Issued At: ") {
                issued_at = Some(
                    DateTime::parse_from_rfc3339(val)
                        .map_err(|e| ZecAuthError::ParseError(format!("invalid issued_at: {e}")))?
                        .with_timezone(&Utc),
                );
            } else if let Some(val) = line.strip_prefix("Expiration Time: ") {
                expiration_time = Some(
                    DateTime::parse_from_rfc3339(val)
                        .map_err(|e| {
                            ZecAuthError::ParseError(format!("invalid expiration_time: {e}"))
                        })?
                        .with_timezone(&Utc),
                );
            } else if let Some(val) = line.strip_prefix("Statement: ") {
                statement = Some(val.to_string());
            } else if line == "Resources:" {
                in_resources = true;
            }
        }

        let msg = ChallengeMessage {
            domain,
            uri: uri.ok_or_else(|| ZecAuthError::ParseError("missing URI".into()))?,
            version: version
                .ok_or_else(|| ZecAuthError::ParseError("missing Version".into()))?,
            chain: chain.ok_or_else(|| ZecAuthError::ParseError("missing Chain".into()))?,
            nonce: nonce.ok_or_else(|| ZecAuthError::ParseError("missing Nonce".into()))?,
            issued_at: issued_at
                .ok_or_else(|| ZecAuthError::ParseError("missing Issued At".into()))?,
            expiration_time: expiration_time.ok_or_else(|| {
                ZecAuthError::ParseError("missing Expiration Time".into())
            })?,
            statement,
            resources,
            scopes: RequestedScopes::default(),
        };

        msg.validate()?;
        Ok(msg)
    }
}

/// Generate a cryptographically random alphanumeric nonce.
pub fn generate_nonce() -> String {
    let mut rng = rand::thread_rng();
    (0..32)
        .map(|_| {
            let idx = rng.gen_range(0..36);
            if idx < 10 {
                (b'0' + idx) as char
            } else {
                (b'a' + idx - 10) as char
            }
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn challenge_roundtrip_string() {
        let challenge = ChallengeMessage::new("myapp.com", "https://myapp.com/dashboard", Network::Mainnet)
            .with_statement("Access your dashboard");

        let text = challenge.to_string();
        let parsed: ChallengeMessage = text.parse().unwrap();

        assert_eq!(parsed.domain, "myapp.com");
        assert_eq!(parsed.uri, "https://myapp.com/dashboard");
        assert_eq!(parsed.version, 1);
        assert_eq!(parsed.chain, "zcash:mainnet");
        assert_eq!(parsed.nonce, challenge.nonce);
        assert_eq!(parsed.statement, Some("Access your dashboard".into()));
    }

    #[test]
    fn challenge_roundtrip_json() {
        let challenge = ChallengeMessage::new("example.com", "https://example.com", Network::Testnet);
        let json = challenge.to_json().unwrap();
        let parsed = ChallengeMessage::from_json(&json).unwrap();
        assert_eq!(parsed.domain, "example.com");
        assert_eq!(parsed.chain, "zcash:testnet");
    }

    #[test]
    fn challenge_with_resources() {
        let challenge = ChallengeMessage::new("app.com", "https://app.com", Network::Mainnet)
            .with_resource("https://app.com/api")
            .with_resource("https://app.com/profile");

        let text = challenge.to_string();
        let parsed: ChallengeMessage = text.parse().unwrap();
        assert_eq!(parsed.resources.len(), 2);
        assert_eq!(parsed.resources[0], "https://app.com/api");
    }

    #[test]
    fn challenge_validation_rejects_empty_domain() {
        let mut challenge = ChallengeMessage::new("x", "https://x.com", Network::Mainnet);
        challenge.domain = String::new();
        assert!(challenge.validate().is_err());
    }

    #[test]
    fn challenge_validation_rejects_short_nonce() {
        let mut challenge = ChallengeMessage::new("x.com", "https://x.com", Network::Mainnet);
        challenge.nonce = "short".to_string();
        assert!(challenge.validate().is_err());
    }

    #[test]
    fn nonce_is_alphanumeric_and_long_enough() {
        let nonce = generate_nonce();
        assert!(nonce.len() >= MIN_NONCE_LENGTH);
        assert!(nonce.chars().all(|c| c.is_ascii_alphanumeric()));
    }

    #[test]
    fn nonces_are_unique() {
        let n1 = generate_nonce();
        let n2 = generate_nonce();
        assert_ne!(n1, n2);
    }

    #[test]
    fn signing_bytes_are_deterministic() {
        let challenge = ChallengeMessage::new("app.com", "https://app.com", Network::Mainnet);
        let bytes1 = challenge.to_signing_bytes();
        let bytes2 = challenge.to_signing_bytes();
        assert_eq!(bytes1, bytes2);
    }
}
