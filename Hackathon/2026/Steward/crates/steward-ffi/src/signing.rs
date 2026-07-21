//! Coordinator-side & advanced signing primitives (§5 of the spec).
//!
//! A mobile app that *runs* a ceremony (not just co-signs one) needs to assemble the
//! signing package from the guardians' round-1 replies and aggregate their round-2
//! shares. These helpers take the exact wire `Message` JSON strings the [`Guardian`]
//! emits, so the app only ever moves opaque strings around.
//!
//! The ZIP-312 randomizer α is threaded **by value** (32-byte little-endian, from
//! `zcash-sign`); [`random_randomizer_hex`] exists only for local simulation/tests.
//!
//! [`Guardian`]: crate::Guardian

use std::collections::BTreeMap;

use rand::rngs::OsRng;

use steward_core::redpallas::keys::PublicKeyPackage;
use steward_core::redpallas::round1::SigningCommitments;
use steward_core::redpallas::round2::SignatureShare;
use steward_core::redpallas::{Identifier, Signature, SigningPackage};

use crate::decode_32;
use crate::error::StewardError;
use crate::guardian::wire;

/// Coordinator: assemble the `SigningPackage` (JSON) over `sighash_hex` from the
/// guardians' round-1 replies.
///
/// Each element of `round1_replies` is a `Round1Reply` message JSON — exactly what
/// [`Guardian::round1`](crate::Guardian::round1) returns. Pass the `t` you selected.
#[uniffi::export]
pub fn build_signing_package(
    round1_replies: Vec<String>,
    sighash_hex: String,
) -> Result<String, StewardError> {
    let sighash = decode_32(&sighash_hex)?;
    let mut commitments: BTreeMap<Identifier, SigningCommitments> = BTreeMap::new();
    for reply in &round1_replies {
        match serde_json::from_str::<wire::Message>(reply)? {
            wire::Message::Round1Reply { identifier, commitments: c } => {
                commitments.insert(identifier, c);
            }
            _ => {
                return Err(StewardError::Format {
                    msg: "expected a Round1Reply message".into(),
                })
            }
        }
    }
    let pkg = steward_core::sign::signing_package(commitments, &sighash);
    Ok(serde_json::to_string(&pkg)?)
}

/// Coordinator: aggregate the guardians' round-2 replies into the final 64-byte
/// RedPallas signature (hex), re-randomized by α.
///
/// Each element of `round2_replies` is a `Round2Reply` message JSON — exactly what
/// [`Guardian::round2`](crate::Guardian::round2) returns. The result verifies against
/// `rk = ak + [α]G` (see [`verify_aggregate`]) — **not** the un-randomized group key.
#[uniffi::export]
pub fn aggregate_signature(
    round2_replies: Vec<String>,
    signing_package_json: String,
    sighash_hex: String,
    randomizer_le_hex: String,
    public_key_package_json: String,
) -> Result<String, StewardError> {
    let sighash = decode_32(&sighash_hex)?;
    let randomizer_le = decode_32(&randomizer_le_hex)?;
    let randomizer = steward_core::sign::randomizer_from_le_bytes(&randomizer_le)?;
    let pkg: SigningPackage = serde_json::from_str(&signing_package_json)?;
    let pkpkg: PublicKeyPackage = serde_json::from_str(&public_key_package_json)?;

    let mut shares: BTreeMap<Identifier, SignatureShare> = BTreeMap::new();
    for reply in &round2_replies {
        match serde_json::from_str::<wire::Message>(reply)? {
            wire::Message::Round2Reply { identifier, share } => {
                shares.insert(identifier, share);
            }
            _ => {
                return Err(StewardError::Format {
                    msg: "expected a Round2Reply message".into(),
                })
            }
        }
    }

    let sig = steward_core::sign::aggregate(&sighash, &randomizer, &pkg, &shares, &pkpkg)?;
    let bytes = sig.serialize().map_err(|e| StewardError::Frost { msg: e.to_string() })?;
    Ok(hex::encode(bytes))
}

/// Verify a 64-byte hex signature against `rk = ak + [α]G` for the given randomizer
/// and public package — the same check the coordinator does before broadcasting.
/// Returns `false` on any decode/verify failure (only structural errors throw).
#[uniffi::export]
pub fn verify_aggregate(
    sighash_hex: String,
    randomizer_le_hex: String,
    public_key_package_json: String,
    sig_hex: String,
) -> Result<bool, StewardError> {
    let sighash = decode_32(&sighash_hex)?;
    let randomizer_le = decode_32(&randomizer_le_hex)?;
    let randomizer = steward_core::sign::randomizer_from_le_bytes(&randomizer_le)?;
    let pkpkg: PublicKeyPackage = serde_json::from_str(&public_key_package_json)?;

    let sig_bytes = hex::decode(sig_hex.trim())?;
    let Ok(sig) = Signature::deserialize(&sig_bytes) else {
        return Ok(false);
    };
    let rk = steward_core::sign::randomized_verifying_key(&randomizer, &pkpkg);
    Ok(rk.verify(&sighash, &sig).is_ok())
}

/// The randomized group verifying key `rk = ak + [α]G` (32-byte hex) for the given
/// randomizer and public package.
#[uniffi::export]
pub fn randomized_verifying_key_hex(
    randomizer_le_hex: String,
    public_key_package_json: String,
) -> Result<String, StewardError> {
    let randomizer_le = decode_32(&randomizer_le_hex)?;
    let randomizer = steward_core::sign::randomizer_from_le_bytes(&randomizer_le)?;
    let pkpkg: PublicKeyPackage = serde_json::from_str(&public_key_package_json)?;
    let rk = steward_core::sign::randomized_verifying_key(&randomizer, &pkpkg);
    let bytes = rk.serialize().map_err(|e| StewardError::Frost { msg: e.to_string() })?;
    Ok(hex::encode(bytes))
}

/// Generate a uniformly random ZIP-312 randomizer α (32-byte little-endian hex).
///
/// **Simulation / testing only.** In production α is fixed by the transaction builder
/// (`zcash-sign`) and must be threaded by value; a freshly generated α would not
/// match the transaction's `rk` and the signature would be unusable on-chain.
#[uniffi::export]
pub fn random_randomizer_hex() -> String {
    hex::encode(steward_core::sign::random_randomizer(&mut OsRng).serialize())
}
