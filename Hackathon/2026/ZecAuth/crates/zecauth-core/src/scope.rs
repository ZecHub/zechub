use serde::{Serialize, Deserialize};
use std::fmt;

/// A permission scope that a dApp can request from the wallet.
///
/// Scopes define what the dApp is allowed to do within the session.
/// The wallet can approve all, some, or none of the requested scopes.
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(tag = "type", content = "params")]
pub enum Scope {
    /// Basic authentication — proves wallet ownership. Always implicitly granted.
    #[serde(rename = "auth")]
    Auth,

    /// Permission to request payments from the user (wallet will still prompt each time).
    /// Params: optional max amount per request in ZEC.
    #[serde(rename = "request_payment")]
    RequestPayment {
        /// Maximum amount per payment request in ZEC. Wallet rejects requests above this.
        #[serde(skip_serializing_if = "Option::is_none")]
        max_amount: Option<String>,
    },

    /// Permission to read a point-in-time balance snapshot (privacy-sensitive).
    #[serde(rename = "view_balance")]
    ViewBalance,

    /// Permission to read a point-in-time transaction-history snapshot (privacy-sensitive).
    #[serde(rename = "view_history")]
    ViewHistory,

    /// Permission to read a point-in-time snapshot of *incoming* payments only
    /// (privacy-sensitive, but narrower than full history).
    #[serde(rename = "view_incoming")]
    ViewIncoming,

    /// Permission to a read-only **full viewing key** (UFVK) — an ongoing watch of balance
    /// and full history. The most powerful view grant (still carries no spend authority).
    #[serde(rename = "view_full")]
    ViewFull,

    /// Permission to read the wallet's receiving address (privacy trade-off).
    #[serde(rename = "view_address")]
    ViewAddress,

    /// Custom scope for extensibility.
    #[serde(rename = "custom")]
    Custom {
        name: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        description: Option<String>,
    },
}

impl Scope {
    pub fn request_payment(max_amount: Option<&str>) -> Self {
        Self::RequestPayment {
            max_amount: max_amount.map(String::from),
        }
    }

    pub fn custom(name: &str, description: Option<&str>) -> Self {
        Self::Custom {
            name: name.to_string(),
            description: description.map(String::from),
        }
    }

    /// Human-readable label for display in the wallet UI.
    pub fn label(&self) -> &str {
        match self {
            Self::Auth => "Authenticate",
            Self::RequestPayment { .. } => "Request payments",
            Self::ViewBalance => "View balance",
            Self::ViewHistory => "View transaction history",
            Self::ViewIncoming => "View incoming payments",
            Self::ViewFull => "Full viewing key",
            Self::ViewAddress => "View receiving address",
            Self::Custom { name, .. } => name,
        }
    }

    /// Human-readable description for display in the wallet UI.
    pub fn description(&self) -> String {
        match self {
            Self::Auth => "Prove you control this wallet (identity only)".to_string(),
            Self::RequestPayment { max_amount: Some(max) } => {
                format!("Request payments up to {max} ZEC (you approve each one)")
            }
            Self::RequestPayment { max_amount: None } => {
                "Request payments of any amount (you approve each one)".to_string()
            }
            Self::ViewBalance => "Read your wallet balance (a one-time snapshot)".to_string(),
            Self::ViewHistory => "Read your transaction history (a one-time snapshot)".to_string(),
            Self::ViewIncoming => "See payments you've received (a one-time snapshot)".to_string(),
            Self::ViewFull => {
                "Read-only full viewing key — watch your balance and full history ongoing (cannot spend)".to_string()
            }
            Self::ViewAddress => "Read your receiving address".to_string(),
            Self::Custom { description, .. } => {
                description.clone().unwrap_or_else(|| "Custom permission".to_string())
            }
        }
    }

    /// Whether this scope reveals privacy-sensitive information.
    pub fn is_privacy_sensitive(&self) -> bool {
        matches!(
            self,
            Self::ViewBalance | Self::ViewHistory | Self::ViewIncoming | Self::ViewFull | Self::ViewAddress
        )
    }
}

impl fmt::Display for Scope {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}: {}", self.label(), self.description())
    }
}

/// The set of scopes requested by a dApp in a challenge.
#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct RequestedScopes {
    /// Required scopes — the dApp will not accept a connection without these.
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub required: Vec<Scope>,

    /// Optional scopes — the dApp can function without these but prefers them.
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub optional: Vec<Scope>,
}

impl RequestedScopes {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn require(mut self, scope: Scope) -> Self {
        self.required.push(scope);
        self
    }

    pub fn optional(mut self, scope: Scope) -> Self {
        self.optional.push(scope);
        self
    }

    pub fn is_empty(&self) -> bool {
        self.required.is_empty() && self.optional.is_empty()
    }
}

/// The scopes the wallet has granted (included in the auth response).
#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct GrantedScopes {
    /// The scopes that were approved by the user.
    pub approved: Vec<Scope>,

    /// The scopes that were denied by the user.
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub denied: Vec<Scope>,
}

impl GrantedScopes {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn approve(mut self, scope: Scope) -> Self {
        self.approved.push(scope);
        self
    }

    pub fn deny(mut self, scope: Scope) -> Self {
        self.denied.push(scope);
        self
    }

    /// Check if a specific scope was granted.
    pub fn has(&self, scope: &Scope) -> bool {
        self.approved.contains(scope)
    }

    /// Check if all required scopes from a request were granted.
    pub fn satisfies(&self, requested: &RequestedScopes) -> bool {
        requested.required.iter().all(|s| self.approved.contains(s))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn scope_serde_roundtrip() {
        let scopes = RequestedScopes::new()
            .require(Scope::Auth)
            .require(Scope::request_payment(Some("1.0")))
            .optional(Scope::ViewBalance);

        let json = serde_json::to_string(&scopes).unwrap();
        let parsed: RequestedScopes = serde_json::from_str(&json).unwrap();
        assert_eq!(parsed.required.len(), 2);
        assert_eq!(parsed.optional.len(), 1);
    }

    #[test]
    fn granted_satisfies_required() {
        let requested = RequestedScopes::new()
            .require(Scope::Auth)
            .require(Scope::request_payment(None))
            .optional(Scope::ViewBalance);

        let granted = GrantedScopes::new()
            .approve(Scope::Auth)
            .approve(Scope::request_payment(None))
            .deny(Scope::ViewBalance);

        assert!(granted.satisfies(&requested));
        assert!(granted.has(&Scope::Auth));
        assert!(!granted.has(&Scope::ViewBalance));
    }

    #[test]
    fn unsatisfied_required_scope() {
        let requested = RequestedScopes::new()
            .require(Scope::Auth)
            .require(Scope::ViewBalance);

        let granted = GrantedScopes::new()
            .approve(Scope::Auth)
            .deny(Scope::ViewBalance);

        assert!(!granted.satisfies(&requested));
    }

    #[test]
    fn privacy_sensitive_detection() {
        assert!(!Scope::Auth.is_privacy_sensitive());
        assert!(!Scope::request_payment(None).is_privacy_sensitive());
        assert!(Scope::ViewBalance.is_privacy_sensitive());
        assert!(Scope::ViewHistory.is_privacy_sensitive());
        assert!(Scope::ViewAddress.is_privacy_sensitive());
    }
}
