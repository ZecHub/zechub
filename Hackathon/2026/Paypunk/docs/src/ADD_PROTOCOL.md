# Adding a New Chain

> **Note:** This is a work in progress. The trait system is stable in design but only Zcash and Ethereum are implemented. Only simple transfers are supported — more complex intent variants (swaps, staking, etc.) will require extending the `Intent` enum pattern described below.

This guide walks through implementing a new cryptocurrency protocol in paypunk. The architecture is designed so that adding a chain means implementing two traits and registering them — not rearchitecting the wallet.

## Overview

Each chain requires:

1. **`Protocol` trait** (wallet side) — builds unsigned transactions, finalizes/broadcasts signed ones, queries balances, exposes metadata. Lives in `paypunkd`.
2. **`SignerProtocol` trait** (signer side) — derives viewing keys, parses artifacts for preview, signs with the seed. Lives in `keypunkd`.
3. **Intent variants** — a new `ProtocolId`, `Intent` variant, and `ArtifactSummary` variant in `paypunk-types`.

The two existing implementations serve as templates:

- **Ethereum** (`protocols/ethereum/`) — the minimal template. Uses trait defaults for sync/history, no wallet DB, separate signer unit struct. Start here if your chain doesn't need chain scanning.
- **Zcash** (`protocols/zcash/`) — the full-featured template. Overrides every method, has a `create_protocol` factory that spawns actor tasks, supports multi-network, uses a `wallet` cargo feature to keep the signer side light.

## Step 1: Add types to `paypunk-types`

Edit `types/src/lib.rs`:

### Add a `ProtocolId` variant

```rust
#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq, Hash)]
pub enum ProtocolId {
    Zcash,
    Ethereum,
    Monero,  // your new chain
}
```

### Add an `Intent` variant and intent enum

```rust
pub enum Intent {
    Zcash(ZcashIntent),
    Ethereum(EthereumIntent),
    Monero(MoneroIntent),  // your new variant
}

pub enum MoneroIntent {
    Transfer {
        to: String,
        amount: String,
        from: String,
        asset: String,
        memo: Option<String>,
    },
}
```

### Add an `ArtifactSummary` variant

```rust
pub enum ArtifactSummary {
    Zcash(ZcashArtifactSummary),
    Ethereum(EthereumArtifactSummary),
    Monero(MoneroArtifactSummary),  // your new variant
}

pub struct MoneroArtifactSummary {
    pub to: String,
    pub amount: String,
    pub fee: String,
}
```

## Step 2: Create the protocol crate

Create `protocols/monero/Cargo.toml`:

```toml
[package]
name = "paypunk-chains-monero"
version = "0.1.0"
edition = "2021"

[dependencies]
paypunk-types.workspace = true
async-trait.workspace = true
postcard = { workspace = true, features = ["alloc"] }
# Add your chain's crypto crates here
```

Add to the workspace `Cargo.toml`:

```toml
# In [workspace] members:
"protocols/monero",

# In [workspace.dependencies]:
paypunk-chains-monero = { path = "protocols/monero" }
```

### Optional: wallet feature gate

If your chain has heavy wallet dependencies (like Zcash's `zcash_client_sqlite`), use a feature gate so keypunkd stays light:

```toml
[features]
default = ["wallet"]
wallet = ["dep:monero-wallet", "dep:rusqlite"]
```

## Step 3: Implement `SignerProtocol`

The signer protocol runs in `keypunkd` where the seed lives. It has three required methods:

```rust
#[async_trait::async_trait]
pub trait SignerProtocol: Send + Sync {
    /// Derive and export a viewing key from a seed at the given BIP32 path.
    /// Returns protocol-specific viewing-key bytes.
    fn export_viewing(&self, seed: &[u8; 64], path: &str) -> Result<Vec<u8>, String>;

    /// Parse an unsigned artifact into a serialized ArtifactSummary (postcard).
    fn parse_artifact(&self, artifact: &[u8]) -> Result<Vec<u8>, String>;

    /// Sign an unsigned artifact with the key derived from seed at path.
    fn sign(&self, seed: &[u8; 64], path: &str, artifact: &[u8]) -> Result<Vec<u8>, String>;
}
```

Create `protocols/monero/src/signer.rs`:

```rust
use paypunk_types::SignerProtocol;

pub struct MoneroSignerProtocol;

impl MoneroSignerProtocol {
    pub fn new() -> Self { Self }
}

#[async_trait::async_trait]
impl SignerProtocol for MoneroSignerProtocol {
    fn export_viewing(&self, seed: &[u8; 64], path: &str) -> Result<Vec<u8>, String> {
        // Derive viewing key from seed at path
        // Return protocol-specific bytes (must be parseable by your Protocol::derive_address_from_viewing_key)
        todo!()
    }

    fn parse_artifact(&self, artifact: &[u8]) -> Result<Vec<u8>, String> {
        // Parse the unsigned transaction and serialize an ArtifactSummary
        // The TUI displays this to the user before signing
        let summary = ArtifactSummary::Monero(MoneroArtifactSummary { /* ... */ });
        postcard::to_allocvec(&summary).map_err(|e| e.to_string())
    }

    fn sign(&self, seed: &[u8; 64], path: &str, artifact: &[u8]) -> Result<Vec<u8>, String> {
        // Derive spending key from seed at path, sign the artifact
        // Return signed artifact bytes
        todo!()
    }
}
```

Reference: `protocols/ethereum/src/signer.rs` is the cleanest minimal example.

## Step 4: Implement `Protocol`

The protocol runs in `paypunkd` and handles all non-secret operations. Required methods (no defaults):

| Method | Purpose |
|--------|---------|
| `protocol_id()` | Return your `ProtocolId` |
| `build(intent)` | Construct an unsigned artifact from an `Intent` |
| `store_and_finalize(signed)` | Store and finalize a signed artifact into a broadcastable transaction |
| `finalize(signed)` | Finalize a signed artifact (synchronous) |
| `broadcast(tx)` | Submit a finalized transaction to the network |
| `validate_address(addr)` | Check if an address is valid for your chain |
| `get_balance(addr, asset)` | Query balance for an address and CAIP-19 asset |
| `chain_id()` | Return CAIP-2 chain ID (e.g. `monero:mainnet`) |
| `native_asset()` | Return CAIP-19 native asset (e.g. `monero:mainnet/slip44:128`) |
| `ticker()` | Return ticker symbol (e.g. `"XMR"`) |
| `decimals()` | Return decimal places (e.g. `12` for XMR) |
| `block_explorer_url(tx_hash)` | Return block explorer URL template |
| `default_derivation_path(account)` | Return BIP32/ZIP32 derivation path |
| `default_account_name(index)` | Return default account name |
| `derive_address_from_viewing_key(vk, index)` | Derive an address from viewing key bytes |

Optional methods with defaults (override if your chain supports them):

| Method | Default |
|--------|---------|
| `get_sync_status()` | Returns error |
| `create_transfer(...)` | Returns error |
| `estimate_fee(...)` | Returns error |
| `get_history(...)` | Returns empty page |
| `get_transaction_status(txid)` | Returns error |
| `get_current_block_height(host)` | Returns error |
| `lightwalletd_host()` | Returns `None` |
| `sync_account(...)` | No-op |
| `sync_incremental()` | No-op |

Create `protocols/monero/src/protocol.rs`:

```rust
use paypunk_types::{Protocol, ProtocolId, Intent, Balance, ChainId, /* ... */ };

pub struct MoneroProtocol {
    // RPC client, network params, etc.
}

#[async_trait::async_trait]
impl Protocol for MoneroProtocol {
    fn protocol_id(&self) -> ProtocolId { ProtocolId::Monero }

    async fn build(&self, intent: &Intent) -> Result<Vec<u8>, String> {
        match intent {
            Intent::Monero(MoneroIntent::Transfer { to, amount, .. }) => {
                // Build unsigned transaction
            }
            _ => return Err("unexpected intent variant for Monero protocol".into()),
        }
    }

    // ... implement all required methods
}
```

Reference: `protocols/ethereum/src/protocol.rs` shows the minimal set; `protocols/zcash/src/protocol.rs` shows full sync support.

## Step 5: Add derivation path helper

Create `protocols/monero/src/lib.rs`:

```rust
pub fn derivation_path(account: u32) -> String {
    format!("m/44'/128'/{account}'")  // Monero SLIP-44 coin type 128
}
```

The path must be consistent between `Protocol::default_derivation_path` (paypunkd) and `SignerProtocol::export_viewing` (keypunkd), since the same path string is passed over IPC and stored in the database.

## Step 6: Register in `paypunkd`

Edit `paypunkd/src/run.rs`:

```rust
let monero = paypunk_chains_monero::MoneroProtocol::new(/* config */);
protocols.register(Box::new(monero));
```

Add a match arm in `paypunkd/src/usecases.rs` (`submit_intent` function):

```rust
Intent::Monero(_) => ProtocolId::Monero,
```

## Step 7: Register in `keypunkd`

Edit `keypunkd/src/run.rs`:

```rust
protocols.register(
    ProtocolId::Monero,
    Box::new(paypunk_chains_monero::MoneroSignerProtocol::new()),
);
```

## Step 8: Add config fields (if needed)

If your chain needs configuration (RPC URL, network type, etc.):

1. Add fields to `paypunkd/src/run.rs::Config`
2. Add corresponding fields to `config/src/lib.rs::PaypunkConfig` with defaults and env var overrides
3. Plumb them through the CLI in `cli/src/main.rs` if needed

## Step 9: Write tests

Add tests in `protocols/monero/src/` and integration tests in `tests/tests/`. The existing integration test pattern (`tests/tests/integration_test.rs`) wires up the full actor chain in-memory.

## Checklist

- [ ] `types/src/lib.rs` — `ProtocolId`, `Intent`, `ArtifactSummary` variants added
- [ ] `protocols/monero/` crate created and added to workspace
- [ ] `SignerProtocol` implemented (3 methods)
- [ ] `Protocol` implemented (15 required + optional overrides)
- [ ] Derivation path helper added
- [ ] Registered in `paypunkd/src/run.rs`
- [ ] Intent dispatch added in `paypunkd/src/usecases.rs`
- [ ] Registered in `keypunkd/src/run.rs`
- [ ] Config fields added (if needed)
- [ ] Tests written
- [ ] `cargo build` passes
- [ ] `cargo test` passes
- [ ] `cargo fmt --all --check` passes
