//! Core logic for the FROST companion app: encrypted keystore, frostd
//! transport, and DKG/signing ceremony state machines.
//!
//! This crate is Tauri-free so everything can be tested with plain
//! `cargo test`. The Tauri app crate is a thin adapter that forwards
//! ceremony events to the frontend.

pub mod ciphersuite;
pub mod config;
pub mod dkg;
pub mod error;
pub mod events;
pub mod keystore;
pub mod neterr;
pub mod signing;
pub mod tls;
pub mod transport;
#[cfg(feature = "zcash")]
pub mod zcash;
#[cfg(feature = "wallet")]
pub mod wallet;

pub use error::CoreError;
