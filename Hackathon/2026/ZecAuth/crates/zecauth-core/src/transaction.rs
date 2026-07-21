use chrono::{DateTime, Duration, Utc};
use serde::{Serialize, Deserialize};
use std::fmt;
use std::str::FromStr;

use crate::challenge::generate_nonce;
use crate::error::ZecAuthError;
use crate::keys::{AuthKeyPair, AuthPublicKey, Network};

/// A transaction request from a dApp to a wallet.
///
/// This represents a dApp asking the connected user to approve a payment.
/// The wallet displays the request, the user approves or denies, and the
/// wallet signs an approval (or the spending transaction itself, if it
/// has full spending capability).
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TransactionRequest {
    /// The requesting dApp's domain.
    pub domain: String,

    /// Unique request ID (server-generated).
    pub request_id: String,

    /// Recipient Zcash address (unified address, sapling, or transparent).
    pub recipient: String,

    /// Amount in ZEC (as a string to preserve decimal precision).
    pub amount: String,

    /// Optional memo to include in the transaction.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub memo: Option<String>,

    /// Human-readable description of what this payment is for.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,

    /// Network (zcash:mainnet or zcash:testnet).
    pub chain: String,

    /// When the request was created.
    pub issued_at: DateTime<Utc>,

    /// When the request expires.
    pub expiration_time: DateTime<Utc>,
}

impl TransactionRequest {
    /// Create a new transaction request.
    pub fn new(
        domain: &str,
        recipient: &str,
        amount: &str,
        network: Network,
    ) -> Self {
        let now = Utc::now();
        Self {
            domain: domain.to_string(),
            request_id: generate_nonce(),
            recipient: recipient.to_string(),
            amount: amount.to_string(),
            memo: None,
            description: None,
            chain: network.chain_id().to_string(),
            issued_at: now,
            expiration_time: now + Duration::minutes(5),
        }
    }

    pub fn with_memo(mut self, memo: &str) -> Self {
        self.memo = Some(memo.to_string());
        self
    }

    pub fn with_description(mut self, description: &str) -> Self {
        self.description = Some(description.to_string());
        self
    }

    pub fn with_ttl(mut self, ttl_seconds: i64) -> Self {
        self.expiration_time = self.issued_at + Duration::seconds(ttl_seconds);
        self
    }

    pub fn is_expired(&self) -> bool {
        Utc::now() > self.expiration_time
    }

    pub fn validate(&self) -> Result<(), ZecAuthError> {
        if self.domain.is_empty() {
            return Err(ZecAuthError::InvalidChallenge("domain is empty".into()));
        }
        if self.recipient.is_empty() {
            return Err(ZecAuthError::InvalidChallenge("recipient is empty".into()));
        }
        if self.amount.is_empty() {
            return Err(ZecAuthError::InvalidChallenge("amount is empty".into()));
        }
        // Verify amount is a valid number
        self.amount.parse::<f64>()
            .map_err(|_| ZecAuthError::InvalidChallenge(format!("invalid amount: {}", self.amount)))?;
        if self.request_id.len() < 16 {
            return Err(ZecAuthError::InvalidChallenge("request_id too short".into()));
        }
        Ok(())
    }

    pub fn to_json(&self) -> Result<String, ZecAuthError> {
        serde_json::to_string(self)
            .map_err(|e| ZecAuthError::ParseError(format!("JSON serialization failed: {e}")))
    }

    pub fn from_json(json: &str) -> Result<Self, ZecAuthError> {
        serde_json::from_str(json)
            .map_err(|e| ZecAuthError::ParseError(format!("JSON parse failed: {e}")))
    }
}

/// Human-readable display — also the canonical signing format.
impl fmt::Display for TransactionRequest {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "{domain} requests a transaction from your Zcash wallet.\n\
             \n\
             Recipient: {recipient}\n\
             Amount: {amount} ZEC\n\
             Chain: {chain}\n\
             Request ID: {request_id}\n\
             Issued At: {issued_at}\n\
             Expiration Time: {expiration_time}",
            domain = self.domain,
            recipient = self.recipient,
            amount = self.amount,
            chain = self.chain,
            request_id = self.request_id,
            issued_at = self.issued_at.to_rfc3339(),
            expiration_time = self.expiration_time.to_rfc3339(),
        )?;

        if let Some(ref memo) = self.memo {
            write!(f, "\nMemo: {memo}")?;
        }
        if let Some(ref description) = self.description {
            write!(f, "\nDescription: {description}")?;
        }

        Ok(())
    }
}

impl FromStr for TransactionRequest {
    type Err = ZecAuthError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let lines: Vec<&str> = s.lines().collect();
        if lines.is_empty() {
            return Err(ZecAuthError::ParseError("empty message".into()));
        }

        let domain = lines[0]
            .strip_suffix(" requests a transaction from your Zcash wallet.")
            .ok_or_else(|| ZecAuthError::ParseError("invalid header line".into()))?
            .to_string();

        let mut recipient = None;
        let mut amount = None;
        let mut chain = None;
        let mut request_id = None;
        let mut issued_at = None;
        let mut expiration_time = None;
        let mut memo = None;
        let mut description = None;

        for line in &lines[1..] {
            let line = line.trim();
            if line.is_empty() { continue; }

            if let Some(val) = line.strip_prefix("Recipient: ") {
                recipient = Some(val.to_string());
            } else if let Some(val) = line.strip_prefix("Amount: ") {
                amount = Some(val.strip_suffix(" ZEC").unwrap_or(val).to_string());
            } else if let Some(val) = line.strip_prefix("Chain: ") {
                chain = Some(val.to_string());
            } else if let Some(val) = line.strip_prefix("Request ID: ") {
                request_id = Some(val.to_string());
            } else if let Some(val) = line.strip_prefix("Issued At: ") {
                issued_at = Some(
                    DateTime::parse_from_rfc3339(val)
                        .map_err(|e| ZecAuthError::ParseError(format!("invalid issued_at: {e}")))?
                        .with_timezone(&Utc),
                );
            } else if let Some(val) = line.strip_prefix("Expiration Time: ") {
                expiration_time = Some(
                    DateTime::parse_from_rfc3339(val)
                        .map_err(|e| ZecAuthError::ParseError(format!("invalid expiration_time: {e}")))?
                        .with_timezone(&Utc),
                );
            } else if let Some(val) = line.strip_prefix("Memo: ") {
                memo = Some(val.to_string());
            } else if let Some(val) = line.strip_prefix("Description: ") {
                description = Some(val.to_string());
            }
        }

        Ok(TransactionRequest {
            domain,
            request_id: request_id.ok_or_else(|| ZecAuthError::ParseError("missing Request ID".into()))?,
            recipient: recipient.ok_or_else(|| ZecAuthError::ParseError("missing Recipient".into()))?,
            amount: amount.ok_or_else(|| ZecAuthError::ParseError("missing Amount".into()))?,
            memo,
            description,
            chain: chain.ok_or_else(|| ZecAuthError::ParseError("missing Chain".into()))?,
            issued_at: issued_at.ok_or_else(|| ZecAuthError::ParseError("missing Issued At".into()))?,
            expiration_time: expiration_time.ok_or_else(|| ZecAuthError::ParseError("missing Expiration Time".into()))?,
        })
    }
}

/// The wallet's response to a transaction request.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum ApprovalStatus {
    /// User approved — wallet will broadcast (or has broadcast) the transaction.
    Approved,
    /// User denied the request.
    Denied,
}

/// A signed transaction approval from the wallet.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TransactionApproval {
    /// The wallet's ZecAuth public key.
    pub pubkey: AuthPublicKey,

    /// Approval or denial.
    pub status: ApprovalStatus,

    /// RedPallas signature over the canonical request message.
    pub signature: String,

    /// The original transaction request (canonical string format).
    pub message: String,

    /// Transaction ID (if the wallet broadcast the transaction).
    /// Only present when status is Approved and the wallet has full spending capability.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub txid: Option<String>,
}

impl TransactionApproval {
    /// Create a signed approval.
    pub fn approve(keypair: &AuthKeyPair, request: &TransactionRequest) -> Self {
        let message = request.to_string();
        let sig_bytes = keypair.sign(message.as_bytes());
        Self {
            pubkey: keypair.public_key().clone(),
            status: ApprovalStatus::Approved,
            signature: hex::encode(sig_bytes),
            message,
            txid: None,
        }
    }

    /// Create a signed denial.
    pub fn deny(keypair: &AuthKeyPair, request: &TransactionRequest) -> Self {
        let message = request.to_string();
        let sig_bytes = keypair.sign(message.as_bytes());
        Self {
            pubkey: keypair.public_key().clone(),
            status: ApprovalStatus::Denied,
            signature: hex::encode(sig_bytes),
            message,
            txid: None,
        }
    }

    /// Attach a transaction ID (when the wallet has broadcast the tx).
    pub fn with_txid(mut self, txid: &str) -> Self {
        self.txid = Some(txid.to_string());
        self
    }

    /// Verify the approval signature and check expiry/domain.
    pub fn verify(&self, expected_domain: &str, expected_chain: &str) -> Result<VerifiedApproval, ZecAuthError> {
        // Parse the request from the signed message
        let request: TransactionRequest = self.message.parse()?;
        request.validate()?;

        if request.is_expired() {
            return Err(ZecAuthError::ChallengeExpired);
        }
        if request.domain != expected_domain {
            return Err(ZecAuthError::InvalidChallenge(format!(
                "domain mismatch: expected '{}', got '{}'",
                expected_domain, request.domain
            )));
        }
        if request.chain != expected_chain {
            return Err(ZecAuthError::InvalidChallenge(format!(
                "chain mismatch: expected '{}', got '{}'",
                expected_chain, request.chain
            )));
        }

        // Verify signature
        let sig_bytes: [u8; 64] = hex::decode(&self.signature)
            .map_err(|e| ZecAuthError::ParseError(format!("invalid signature hex: {e}")))?
            .try_into()
            .map_err(|v: Vec<u8>| ZecAuthError::InvalidSignature(v.len()))?;

        self.pubkey.verify(self.message.as_bytes(), &sig_bytes)?;

        Ok(VerifiedApproval {
            pubkey: self.pubkey.clone(),
            status: self.status,
            request_id: request.request_id,
            recipient: request.recipient,
            amount: request.amount,
            txid: self.txid.clone(),
        })
    }

    pub fn to_json(&self) -> Result<String, ZecAuthError> {
        serde_json::to_string(self)
            .map_err(|e| ZecAuthError::ParseError(format!("JSON serialization failed: {e}")))
    }

    pub fn from_json(json: &str) -> Result<Self, ZecAuthError> {
        serde_json::from_str(json)
            .map_err(|e| ZecAuthError::ParseError(format!("JSON parse failed: {e}")))
    }
}

/// The result of a verified transaction approval.
#[derive(Debug, Clone)]
pub struct VerifiedApproval {
    pub pubkey: AuthPublicKey,
    pub status: ApprovalStatus,
    pub request_id: String,
    pub recipient: String,
    pub amount: String,
    pub txid: Option<String>,
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
    fn request_roundtrip_string() {
        let req = TransactionRequest::new(
            "myapp.com",
            "u1abc123def456",
            "0.5",
            Network::Mainnet,
        ).with_memo("Payment for service")
         .with_description("Monthly subscription");

        let text = req.to_string();
        let parsed: TransactionRequest = text.parse().unwrap();

        assert_eq!(parsed.domain, "myapp.com");
        assert_eq!(parsed.recipient, "u1abc123def456");
        assert_eq!(parsed.amount, "0.5");
        assert_eq!(parsed.memo, Some("Payment for service".into()));
        assert_eq!(parsed.description, Some("Monthly subscription".into()));
    }

    #[test]
    fn request_roundtrip_json() {
        let req = TransactionRequest::new("app.com", "u1xyz", "1.25", Network::Testnet);
        let json = req.to_json().unwrap();
        let parsed = TransactionRequest::from_json(&json).unwrap();
        assert_eq!(parsed.domain, "app.com");
        assert_eq!(parsed.amount, "1.25");
    }

    #[test]
    fn approve_and_verify() {
        let kp = AuthKeyPair::from_seed(&test_seed(), Network::Mainnet, 0).unwrap();
        let req = TransactionRequest::new("myapp.com", "u1addr", "0.1", Network::Mainnet);

        let approval = TransactionApproval::approve(&kp, &req);
        assert_eq!(approval.status, ApprovalStatus::Approved);

        let verified = approval.verify("myapp.com", "zcash:mainnet").unwrap();
        assert_eq!(verified.status, ApprovalStatus::Approved);
        assert_eq!(verified.amount, "0.1");
        assert_eq!(verified.recipient, "u1addr");
    }

    #[test]
    fn deny_and_verify() {
        let kp = AuthKeyPair::from_seed(&test_seed(), Network::Mainnet, 0).unwrap();
        let req = TransactionRequest::new("myapp.com", "u1addr", "0.1", Network::Mainnet);

        let denial = TransactionApproval::deny(&kp, &req);
        assert_eq!(denial.status, ApprovalStatus::Denied);

        let verified = denial.verify("myapp.com", "zcash:mainnet").unwrap();
        assert_eq!(verified.status, ApprovalStatus::Denied);
    }

    #[test]
    fn reject_wrong_domain() {
        let kp = AuthKeyPair::from_seed(&test_seed(), Network::Mainnet, 0).unwrap();
        let req = TransactionRequest::new("myapp.com", "u1addr", "0.1", Network::Mainnet);
        let approval = TransactionApproval::approve(&kp, &req);
        assert!(approval.verify("evil.com", "zcash:mainnet").is_err());
    }

    #[test]
    fn reject_tampered_amount() {
        let kp = AuthKeyPair::from_seed(&test_seed(), Network::Mainnet, 0).unwrap();
        let req = TransactionRequest::new("myapp.com", "u1addr", "0.1", Network::Mainnet);
        let mut approval = TransactionApproval::approve(&kp, &req);
        approval.message = approval.message.replace("0.1", "100.0");
        assert!(approval.verify("myapp.com", "zcash:mainnet").is_err());
    }
}
