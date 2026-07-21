//! # steward-testvectors
//!
//! Deterministic byte vectors shared between the Rust core and the TypeScript
//! guardian client, asserting parity of keygen, re-randomized signing, and
//! policy encoding. Vectors are generated here and checked in the TS test suite.

// TODO(P2/P3): emit_vectors() -> serde_json, plus round-trip assertions.
