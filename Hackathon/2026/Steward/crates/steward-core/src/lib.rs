//! # steward-core
//!
//! Core cryptography and policy logic for **Steward** — a t-of-n FROST threshold
//! vault for shielded Zcash (Orchard) with guardian social-recovery and a
//! dead-man's-switch inheritance flow.
//!
//! This crate is pure Rust (native + WASM). It contains **no transaction
//! construction** — the raw Orchard tx + sighash come from `steward-signer`
//! driving `zcash-sign`. Here we own: vault keygen (share the spend-authorizing
//! key), ZIP-312 re-randomized two-round signing, share recovery/rotation, and
//! the dead-man's-switch policy state machine.
//!
//! ## Modules
//! - [`error`] — crate error type.
//! - [`keys`] — vault key setup: split `ask` into t-of-n shares; derive the vault viewing key. *(P2)*
//! - [`sign`] — re-randomized FROST two-round signing over an externally supplied sighash + randomizer. *(P2)*
//! - [`recovery`] — guardian social-recovery via repairable shares; share refresh. *(P5/P8)*
//! - [`policy`] — heartbeat / dead-man's-switch state machine. *(P6)*
//! - [`heartbeat`] — guardian-verifiable signed proof-of-life (Ed25519); the trustless switch. *(P6)*

// The RedPallas ZIP-312 re-randomized FROST ciphersuite lives in `reddsa` behind
// the `frost` feature. Re-exported here as the crate's single source of truth.
// (Exact ciphersuite type confirmed by P0 research — see docs/PROTOCOL.md.)
pub use reddsa::frost::redpallas;

pub mod error;
pub mod heartbeat;
pub mod keys;
pub mod policy;
pub mod recovery;
pub mod sign;

pub use error::Error;
pub use heartbeat::{Heartbeat, HeartbeatPubkey};
