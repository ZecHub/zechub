//! # ZHAC
//!
//! Connects to Zcash mainnet via the **LightwalletD** gRPC protocol
//! (`CompactTxStreamer`) for chain-state-bound authentication and shielded
//! balance scanning. This is the same protocol used by Zashi, Ywallet, Zkool,
//! and Cake Wallet — public LightwalletD servers are meant to be used by
//! arbitrary clients.
//!
//! ## Core feature: Zcash Login
//!
//! Your shielded Zcash address is your identity. Prove ownership by signing a
//! challenge bound to live mainnet block state. The verifier checks the
//! signature AND queries a LightwalletD server to confirm freshness —
//! preventing replay attacks.
//!
//! - [`keys`] — key derivation, diversifier hashing, wallet-format types
//! - [`encoding`] — Bech32m (`zhac1…` / `zhacsecret1…`) address serialisation
//! - [`encrypt`] — DH-KA over Jubjub + HKDF + ChaCha20Poly1305 AEAD
//! - [`sign`] — RedJubjub Schnorr signatures (SpendAuth domain)
//! - [`threshold`] — FROST threshold signatures (t-of-n, RFC 9591)
//! - [`lightwalletd`] — gRPC LightwalletD client (chain tip, compact blocks, tx lookup)
//! - [`auth`] — Zcash Login: chain-state-bound authentication protocol
//! - [`auth_server`] — Demo HTTP server that accepts Zcash Login tokens
//! - [`zcash_wallet`] — Real Zcash Sapling/Orchard key derivation + chain scanning

pub mod auth;
pub mod auth_server;
pub mod chain;
pub mod encoding;
pub mod encrypt;
pub mod keys;
pub mod lightwalletd;
pub mod sign;
pub mod threshold;

#[cfg(feature = "net")]
pub mod net;

/// Crate-level error type.
#[derive(Debug, thiserror::Error)]
pub enum ZhacError {
    #[error("invalid key material: {0}")]
    InvalidKey(String),
    #[error("encoding error: {0}")]
    Encoding(String),
    #[error("cryptographic error: {0}")]
    Crypto(String),
    #[error("invalid signature: {0}")]
    Signature(String),
    #[error("invalid ciphertext format: {0}")]
    Format(String),
    #[error("I/O error: {0}")]
    Io(#[from] std::io::Error),
}

/// Convenience alias.
pub type Result<T> = std::result::Result<T, ZhacError>;
