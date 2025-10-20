use serde::{Deserialize, Serialize};

/// GTN Memo Field Protocol (MFP)
///
/// A memo field protocol outlining the message format expected in a zcash memo.
/// - RESERVE: Broadcaster requests relay capacity
/// - RENEW: Broadcaster extends existing stream

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type")]
pub enum GtnMemo {
    /// Broadcaster requests relay node to reserve streaming capacity
    #[serde(rename = "RESERVE")]
    Reserve { session_pk: String },

    /// Broadcaster requests relay node to extend the stream
    #[serde(rename = "RENEW")]
    Renew { session_pk: String, stream_id: String }
}

impl GtnMemo {
    /// Parse memo string into typed message
    pub fn from_str(memo_str: &str) -> Result<Self, serde_json::Error> {
        let cleaned = memo_str.trim().trim_matches('"');
        serde_json::from_str(cleaned)
    }
}
