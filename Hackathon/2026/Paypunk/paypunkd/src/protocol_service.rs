use paypunk_types::{Protocol, ProtocolId, ProtocolMetadata};
use std::collections::HashMap;

/// A registry of non-signer protocol implementations.
///
/// Protocols are registered at startup in `main.rs` and never change
/// during the lifetime of the daemon. Adding a new protocol means
/// implementing `Protocol` in the chain crate and registering it here.
pub struct ProtocolService {
    protocols: HashMap<ProtocolId, Box<dyn Protocol>>,
}

impl ProtocolService {
    pub fn new() -> Self {
        Self {
            protocols: HashMap::new(),
        }
    }

    pub fn register(&mut self, protocol: Box<dyn Protocol>) {
        self.protocols.insert(protocol.protocol_id(), protocol);
    }

    pub fn get(&self, id: ProtocolId) -> Result<&dyn Protocol, String> {
        self.protocols
            .get(&id)
            .map(|b| b.as_ref())
            .ok_or_else(|| format!("unsupported protocol: {id:?}"))
    }

    pub fn get_lightwalletd_host(&self, id: ProtocolId) -> Option<String> {
        self.protocols.get(&id).and_then(|p| p.lightwalletd_host())
    }

    pub fn protocols(&self) -> Vec<ProtocolId> {
        self.protocols.keys().copied().collect()
    }

    pub fn protocol_metadata(&self) -> Vec<ProtocolMetadata> {
        self.protocols
            .values()
            .map(|p| ProtocolMetadata {
                id: p.protocol_id(),
                chain_id: format!("{}:{}", p.chain_id().namespace, p.chain_id().reference),
                native_asset: p.native_asset(),
                ticker: p.ticker().to_string(),
                decimals: p.decimals(),
                block_explorer_template: p.block_explorer_url("{tx_hash}"),
            })
            .collect()
    }
}
