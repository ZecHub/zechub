use paypunk_types::{ProtocolId, SignerProtocol};
use std::collections::HashMap;

/// A hardcoded signer protocol service.
///
/// Protocols are registered at startup in `main.rs` and never change
/// during the lifetime of the daemon. Adding a new protocol means
/// implementing `SignerProtocol` in the chain crate and registering it here.
pub struct ProtocolService {
    protocols: HashMap<ProtocolId, Box<dyn SignerProtocol>>,
}

impl ProtocolService {
    pub fn new() -> Self {
        Self {
            protocols: HashMap::new(),
        }
    }

    pub fn register(&mut self, id: ProtocolId, protocol: Box<dyn SignerProtocol>) {
        self.protocols.insert(id, protocol);
    }

    pub fn get(&self, id: ProtocolId) -> Option<&dyn SignerProtocol> {
        self.protocols.get(&id).map(|b| b.as_ref())
    }
}
