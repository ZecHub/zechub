//! # steward-signer — Steward's PCZT transaction engine
//!
//! This crate owns the **shielded-transaction pipeline** for the Steward threshold
//! vault. It is built on Zcash's **NU6.2-native** crate stack (`orchard 0.14` with the
//! `FixedPostNu6_2` circuit, `pczt 0.7`, `zcash_client_backend 0.23`, `zcash_protocol 0.9`)
//! — the wave that produces the post-GHSA-2x4w-pxqw-58v9 Orchard proof mainnet requires.
//! It is its own isolated workspace root (so its resolution never contaminates the parent
//! `steward` workspace) and it does NOT depend on `steward-core`. Signing is now **inline**
//! via the `pczt` Signer roles — the old external `zcash-sign` subprocess (pre-NU6.2) is gone.
//!
//! ## Pipeline (docs/PROTOCOL.md §3), in canonical order
//! ```text
//! [construct]        zcb propose_transfer + create_pczt_from_proposal → unsigned/unproven v5 PCZT
//! [prove]            pczt::roles::prover::Prover  (public Orchard ProvingKey, FixedPostNu6_2; NO ask)
//! [sign_pczt]        INLINE: pczt Signer::shielded_sighash() + low_level_signer applies one
//!                    FROST-aggregated 64-byte RedPallas sig per non-dummy Orchard action.
//! [finalize_extract] pczt SpendFinalizer + TransactionExtractor (FixedPostNu6_2 VK) → Transaction
//! [broadcast]        CompactTxStreamer::SendTransaction → Zaino / lightwalletd
//! ```
//!
//! ## The seam to `steward-core`
//! [`sign::sign_pczt`] takes a **caller-supplied closure**
//! `FnMut([u8;32] sighash, [u8;32] alpha, usize idx) -> [u8;64]`. That closure is the
//! only place FROST enters: `steward-core` (via the coordinator/guardians) produces the
//! aggregated 64-byte RedPallas SpendAuth signature. This crate never imports FROST types.
//!
//! ## Runtime status
//! **Compiles against the real NU6.2 crate APIs; broadcast NOT run against mainnet here.** A live
//! run needs a Zaino-synced [`zcash_client_sqlite::WalletDb`] (for `construct`); signing is
//! self-contained (no external binary). Runtime caveats are documented at each function.

pub mod broadcast;
pub mod build_pczt;
pub mod construct;
pub mod coordinator;
pub mod error;
pub mod finalize_extract;
pub mod fund;
pub mod grpc;
pub mod prove;
pub mod sign;
pub mod sync;
pub mod vault_ufvk;

pub use error::SignDriverError;
pub use vault_ufvk::VaultUfvk;

/// Re-export of the exact `pczt` type the whole pipeline threads, so downstream code
/// (and the `steward-signer` bin) names the same `Pczt` this crate was pinned against.
pub use pczt::Pczt;
