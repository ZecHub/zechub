//! The coordinator ↔ guardian wire protocol.
//!
//! Payloads are `serde_json` of the FROST round structs
//! ([`SigningCommitments`], [`SignatureShare`], [`SigningPackage`]) — exactly what
//! the real `frostd` carries **inside** its Noise channel (`docs/PROTOCOL.md`
//! §4). Keeping the serialization identical here means it is forward-compatible
//! with the production transport: only the outer envelope (in-process bytes today,
//! Noise ciphertext later) changes.
//!
//! The ZIP-312 randomizer α is carried as its raw **32-byte little-endian**
//! encoding (the bytes `zcash-sign` prints on its `Randomizer #n` line), never
//! regenerated — see [`crate::ceremony`].

use serde::{Deserialize, Serialize};

use steward_core::redpallas::{
    round1::SigningCommitments, round2::SignatureShare, Identifier, SigningPackage,
};

use crate::authz::CeremonyPurpose;
use crate::error::Result;

/// A single message between the coordinator and a guardian.
#[derive(Serialize, Deserialize)]
pub enum Message {
    /// Coordinator → guardian: open round 1. Carries the ceremony purpose and the
    /// 32-byte sighash so the guardian can display/verify **what** it is about to
    /// authorize before committing. (A fuller guardian also checks tx metadata —
    /// amount/heir — against this sighash; that approval hook is a later increment.)
    Round1Request {
        /// Why this ceremony is running (drives the guardian's approval UX).
        purpose: CeremonyPurpose,
        /// The 32-byte sighash to be signed.
        sighash: [u8; 32],
    },

    /// Guardian → coordinator: round-1 signing commitments.
    Round1Reply {
        /// The replying guardian's FROST identifier.
        identifier: Identifier,
        /// Its public commitments to its single-use nonces.
        commitments: SigningCommitments,
    },

    /// Coordinator → guardian: round 2. Carries the assembled signing package and
    /// the ZIP-312 randomizer α (32-byte little-endian).
    Round2Request {
        /// The signing package built from the collected round-1 commitments.
        signing_package: SigningPackage,
        /// α, 32-byte little-endian, straight from `zcash-sign` — never regenerated.
        randomizer_le: [u8; 32],
    },

    /// Guardian → coordinator: round-2 re-randomized signature share.
    Round2Reply {
        /// The replying guardian's FROST identifier.
        identifier: Identifier,
        /// Its re-randomized signature share over the sighash under α.
        share: SignatureShare,
    },

    /// Coordinator → guardian: this guardian was not selected for (or the session
    /// ended before) round 2. It must **discard its single-use nonces** and stop.
    Adjourn,
}

/// Encode a message to its `serde_json` wire bytes.
pub fn encode(msg: &Message) -> Result<Vec<u8>> {
    Ok(serde_json::to_vec(msg)?)
}

/// Decode a message from its `serde_json` wire bytes.
pub fn decode(bytes: &[u8]) -> Result<Message> {
    Ok(serde_json::from_slice(bytes)?)
}
