//! # steward-guardian-wasm
//!
//! The **on-device crypto core** a browser guardian runs. It wraps the tested FROST
//! crypto in [`steward_core`] behind a small `#[wasm_bindgen]` surface so a web
//! guardian can co-sign a Steward ceremony **without its secret share ever leaving
//! the device**:
//!
//! - the share lives encrypted at rest ([`seal_share`]): `argon2id(passphrase)` →
//!   XChaCha20-Poly1305 sealed blob;
//! - it is decrypted into a live [`Guardian`] handle ([`open_guardian`]) that keeps
//!   the `KeyPackage` **inside wasm memory** — it is never handed back to JS;
//! - the handle runs the two FROST rounds ([`Guardian::round1`], [`Guardian::round2`])
//!   with the **single-use nonce discipline** of `docs/PROTOCOL.md` §5 (nonces stored
//!   per session at round 1, deleted the instant round 2 produces a share).
//!
//! ## Wire compatibility (the whole point)
//! Round outputs are the **exact `serde_json` of the coordinator's [`Message`] enum**
//! (`crates/steward-coordinator/src/message.rs`). We cannot depend on
//! `steward-coordinator` from wasm (it pulls axum/tokio/reqwest), so the wire enum is
//! re-declared locally in [`wire`] over the *same* `steward_core::redpallas` FROST
//! types — identical variant/field names ⇒ **byte-identical** JSON. The host test
//! proves this by round-tripping the output through the real
//! `steward_coordinator::Message`.
//!
//! ## The α-by-value discipline (`docs/PROTOCOL.md` §5)
//! Round 2 signs under the **externally supplied** ZIP-312 randomizer α (32-byte LE,
//! straight from `zcash-sign`), threaded through `steward_core::sign::sign_share`
//! (the α-by-value path) — never a freshly generated α, or the aggregate would verify
//! against the wrong `rk`.
//!
//! ## TypeScript-facing envelope
//! [`Guardian::handle_relay_message`] is the "the TS only moves bytes" entry point:
//! feed it whatever hex the relay's `/session/{id}/recv` returned and it decodes the
//! [`Message`] envelope, runs the right round, and returns a small
//! [`RelayAction`] object telling the caller what (if anything) to POST to
//! `/session/{id}/send`. The browser code never has to understand FROST.
//!
//! [`Message`]: wire::Message

use std::collections::BTreeMap;
use std::fmt;

use rand::rngs::OsRng;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;
use zeroize::Zeroize;

use argon2::{Algorithm, Argon2, Params, Version};
use chacha20poly1305::aead::Aead;
use chacha20poly1305::{Key, KeyInit, XChaCha20Poly1305, XNonce};

use steward_core::redpallas::keys::{KeyPackage, SecretShare};
use steward_core::redpallas::round1::SigningNonces;
use steward_core::redpallas::{Identifier, SigningPackage};

// ---------------------------------------------------------------------------------
// Error
// ---------------------------------------------------------------------------------

/// The crate's internal error. All public `#[wasm_bindgen]` entry points map it to a
/// clean JS `Error` via [`JsError`]; the host tests match on it directly.
#[derive(Debug)]
enum GErr {
    Json(serde_json::Error),
    Hex(hex::FromHexError),
    /// KDF (argon2) failure.
    Kdf(String),
    /// AEAD open failed — **wrong passphrase or a corrupted blob** (indistinguishable
    /// by design: a wrong passphrase must not be told apart from tampering).
    BadPassphrase,
    /// A wrapped `steward-core` FROST error (commit/sign/aggregate/keygen).
    Frost(String),
    /// A malformed input (bad length, unknown blob version, non-32-byte field, …).
    Format(String),
    /// The handle has been [`wiped`](Guardian::wipe); no key material remains.
    Wiped,
    /// No live round-1 nonces for this session (missing round 1, or already consumed).
    NoSession,
    /// A guardian received a message it should never be sent (a coordinator-bound reply).
    Unexpected,
    /// The platform RNG (getrandom) failed.
    Rng(String),
}

impl fmt::Display for GErr {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            GErr::Json(e) => write!(f, "json error: {e}"),
            GErr::Hex(e) => write!(f, "hex decode error: {e}"),
            GErr::Kdf(e) => write!(f, "key-derivation error: {e}"),
            GErr::BadPassphrase => {
                write!(f, "could not open keystore: wrong passphrase or corrupted blob")
            }
            GErr::Frost(e) => write!(f, "frost error: {e}"),
            GErr::Format(e) => write!(f, "format error: {e}"),
            GErr::Wiped => write!(f, "guardian handle has been wiped (no key material)"),
            GErr::NoSession => write!(
                f,
                "no live nonces for this session (missing round 1, or nonces already consumed)"
            ),
            GErr::Unexpected => write!(f, "guardian received an unexpected coordinator-bound reply"),
            GErr::Rng(e) => write!(f, "rng error: {e}"),
        }
    }
}

impl std::error::Error for GErr {}

impl From<serde_json::Error> for GErr {
    fn from(e: serde_json::Error) -> Self {
        GErr::Json(e)
    }
}
impl From<hex::FromHexError> for GErr {
    fn from(e: hex::FromHexError) -> Self {
        GErr::Hex(e)
    }
}
impl From<steward_core::Error> for GErr {
    fn from(e: steward_core::Error) -> Self {
        GErr::Frost(e.to_string())
    }
}

// NOTE: `GErr` implements `std::error::Error`, so wasm-bindgen's blanket
// `impl<E: StdError> From<E> for JsError` already gives us `GErr -> JsError` (used by
// `?` in the public entry points). We must NOT add an explicit impl — it would conflict.

// ---------------------------------------------------------------------------------
// Wire protocol — a byte-for-byte local mirror of `steward_coordinator::message::Message`
// ---------------------------------------------------------------------------------

/// A local re-declaration of the coordinator ↔ guardian wire protocol, kept
/// **byte-identical** to `steward_coordinator::message::{Message, CeremonyPurpose}`
/// and `steward_coordinator::authz::CeremonyPurpose`.
///
/// We reuse the *same* `steward_core::redpallas` FROST types the coordinator uses and
/// mirror the exact variant/field names and order, so `serde_json` produces identical
/// bytes. We cannot simply depend on `steward-coordinator` here because it pulls in
/// axum/tokio/reqwest, none of which build for `wasm32-unknown-unknown`.
mod wire {
    use serde::{Deserialize, Serialize};
    use steward_core::redpallas::{
        round1::SigningCommitments, round2::SignatureShare, Identifier, SigningPackage,
    };

    /// Mirror of `steward_coordinator::authz::CeremonyPurpose` (externally tagged:
    /// `"NormalSpend"` / `"SocialRecoverySweep"` / `"InheritanceRelease"`).
    #[derive(Serialize, Deserialize, Clone, Copy, PartialEq, Eq, Debug)]
    pub enum CeremonyPurpose {
        NormalSpend,
        SocialRecoverySweep,
        InheritanceRelease,
    }

    /// Mirror of `steward_coordinator::message::Message`.
    #[derive(Serialize, Deserialize)]
    pub enum Message {
        Round1Request {
            purpose: CeremonyPurpose,
            sighash: [u8; 32],
        },
        Round1Reply {
            identifier: Identifier,
            commitments: SigningCommitments,
        },
        Round2Request {
            signing_package: SigningPackage,
            randomizer_le: [u8; 32],
        },
        Round2Reply {
            identifier: Identifier,
            share: SignatureShare,
        },
        Adjourn,
    }
}

// ---------------------------------------------------------------------------------
// Keystore — argon2id + XChaCha20-Poly1305
// ---------------------------------------------------------------------------------

/// Sealed-blob format version.
const BLOB_VERSION: u8 = 1;
/// Argon2id memory cost, KiB (19 MiB — argon2 crate / OWASP default).
const ARGON2_M_COST: u32 = 19_456;
/// Argon2id time cost (iterations).
const ARGON2_T_COST: u32 = 2;
/// Argon2id parallelism.
const ARGON2_P_COST: u32 = 1;
/// Derived key length (XChaCha20-Poly1305 key size).
const KEY_LEN: usize = 32;
/// Argon2id salt length, bytes.
const SALT_LEN: usize = 16;
/// XChaCha20-Poly1305 nonce length, bytes.
const XNONCE_LEN: usize = 24;

/// The sealed keystore blob. Self-describing (carries the KDF params + salt + nonce)
/// so [`open_guardian`] needs only the blob and the passphrase. Serialized as a JSON
/// string; all binary fields are hex.
#[derive(Serialize, Deserialize)]
struct SealedBlob {
    /// Format version (== [`BLOB_VERSION`]).
    v: u8,
    /// KDF identifier (always `"argon2id"`).
    kdf: String,
    /// Argon2id memory cost (KiB).
    m_cost: u32,
    /// Argon2id time cost.
    t_cost: u32,
    /// Argon2id parallelism.
    p_cost: u32,
    /// Argon2id salt, hex.
    salt: String,
    /// XChaCha20-Poly1305 nonce (24 bytes), hex.
    nonce: String,
    /// Ciphertext ‖ Poly1305 tag, hex.
    ct: String,
}

/// Fill `buf` with cryptographically secure random bytes (crypto.getRandomValues on
/// wasm, the OS CSPRNG on host).
fn fill_random(buf: &mut [u8]) -> Result<(), GErr> {
    getrandom::getrandom(buf).map_err(|e| GErr::Rng(e.to_string()))
}

/// Derive a 32-byte key from `passphrase` with Argon2id and the given params.
fn derive_key(
    passphrase: &str,
    salt: &[u8],
    m_cost: u32,
    t_cost: u32,
    p_cost: u32,
) -> Result<[u8; KEY_LEN], GErr> {
    let params = Params::new(m_cost, t_cost, p_cost, Some(KEY_LEN))
        .map_err(|e| GErr::Kdf(format!("bad argon2 params: {e}")))?;
    let argon = Argon2::new(Algorithm::Argon2id, Version::V0x13, params);
    let mut key = [0u8; KEY_LEN];
    argon
        .hash_password_into(passphrase.as_bytes(), salt, &mut key)
        .map_err(|e| GErr::Kdf(e.to_string()))?;
    Ok(key)
}

/// Seal a guardian's [`SecretShare`] (as its JSON) under `passphrase`.
///
/// Validates the JSON is a real `SecretShare`, re-serializes it canonically, then
/// `argon2id(passphrase)` → XChaCha20-Poly1305 seals it. Returns the [`SealedBlob`]
/// JSON string.
fn seal_share_core(secret_share_json: &str, passphrase: &str) -> Result<String, GErr> {
    // Parse to validate — a garbage share should fail *here*, not at signing time.
    let share: SecretShare = serde_json::from_str(secret_share_json)?;
    let mut plaintext = serde_json::to_vec(&share)?;

    let mut salt = [0u8; SALT_LEN];
    fill_random(&mut salt)?;
    let mut nonce = [0u8; XNONCE_LEN];
    fill_random(&mut nonce)?;

    let mut key = derive_key(passphrase, &salt, ARGON2_M_COST, ARGON2_T_COST, ARGON2_P_COST)?;
    let cipher = XChaCha20Poly1305::new(Key::from_slice(&key));
    let ct = cipher
        .encrypt(XNonce::from_slice(&nonce), plaintext.as_ref())
        .map_err(|_| GErr::Kdf("AEAD seal failed".into()))?;

    key.zeroize();
    plaintext.zeroize();

    let blob = SealedBlob {
        v: BLOB_VERSION,
        kdf: "argon2id".to_string(),
        m_cost: ARGON2_M_COST,
        t_cost: ARGON2_T_COST,
        p_cost: ARGON2_P_COST,
        salt: hex::encode(salt),
        nonce: hex::encode(nonce),
        ct: hex::encode(ct),
    };
    Ok(serde_json::to_string(&blob)?)
}

/// Open a [`SealedBlob`] with `passphrase` and rebuild the [`Guardian`]'s
/// [`KeyPackage`]. A wrong passphrase (or tampered blob) fails as
/// [`GErr::BadPassphrase`].
fn open_guardian_core(sealed_blob: &str, passphrase: &str) -> Result<GuardianCore, GErr> {
    let blob: SealedBlob = serde_json::from_str(sealed_blob)?;
    if blob.v != BLOB_VERSION {
        return Err(GErr::Format(format!("unsupported blob version {}", blob.v)));
    }
    if blob.kdf != "argon2id" {
        return Err(GErr::Format(format!("unsupported kdf {}", blob.kdf)));
    }
    let salt = hex::decode(&blob.salt)?;
    let nonce = hex::decode(&blob.nonce)?;
    let ct = hex::decode(&blob.ct)?;
    if nonce.len() != XNONCE_LEN {
        return Err(GErr::Format(format!(
            "nonce must be {XNONCE_LEN} bytes, got {}",
            nonce.len()
        )));
    }
    if salt.len() < 8 {
        return Err(GErr::Format("salt too short".into()));
    }

    let mut key = derive_key(passphrase, &salt, blob.m_cost, blob.t_cost, blob.p_cost)?;
    let cipher = XChaCha20Poly1305::new(Key::from_slice(&key));
    let mut plaintext = cipher
        .decrypt(XNonce::from_slice(&nonce), ct.as_ref())
        .map_err(|_| GErr::BadPassphrase)?;
    key.zeroize();

    let share: SecretShare = serde_json::from_slice(&plaintext)?;
    plaintext.zeroize();

    let key_package = KeyPackage::try_from(share).map_err(|e| GErr::Frost(e.to_string()))?;
    Ok(GuardianCore::new(key_package))
}

// ---------------------------------------------------------------------------------
// Guardian core (pure Rust; host-testable)
// ---------------------------------------------------------------------------------

/// Per-session secret round-1 state, held between the two rounds.
struct Pending {
    /// The sighash committed to in round 1, when known (the enveloped
    /// [`Guardian::handle_relay_message`] path learns it from the coordinator's
    /// `Round1Request`; the bare [`Guardian::round1`] path does not and derives it
    /// from the round-2 signing package instead). When `Some`, round 2 re-checks the
    /// coordinator's package against it, so the message cannot be swapped mid-ceremony.
    sighash: Option<[u8; 32]>,
    /// The single-use nonces — dropped (and zeroized by frost-core) the instant round
    /// 2 completes.
    nonces: SigningNonces,
}

/// The pure guardian state machine. [`Guardian`] is a thin `#[wasm_bindgen]` wrapper
/// over this; the host tests drive this directly.
struct GuardianCore {
    identifier: Identifier,
    /// The decrypted signing keypair. `None` after [`wipe`](GuardianCore::wipe).
    key_package: Option<KeyPackage>,
    /// Live round-1 state per in-flight session. Empty between ceremonies.
    pending: BTreeMap<String, Pending>,
}

/// What [`GuardianCore::on_message`] decided to do with an inbound relay message.
struct Reply {
    /// The reply to route to the coordinator, if any (already `serde_json` bytes).
    payload: Option<Vec<u8>>,
    /// Whether this session is finished for the guardian (round 2 done, or adjourned).
    done: bool,
    /// A short tag for the caller's UX/logging.
    kind: &'static str,
}

impl GuardianCore {
    fn new(key_package: KeyPackage) -> Self {
        Self {
            identifier: *key_package.identifier(),
            key_package: Some(key_package),
            pending: BTreeMap::new(),
        }
    }

    /// The FROST identifier as canonical hex (the exact hex that appears, quoted, as
    /// the `identifier` field on the wire).
    fn identifier_hex(&self) -> String {
        serde_json::to_string(&self.identifier)
            .map(|s| s.trim_matches('"').to_string())
            .unwrap_or_default()
    }

    /// Number of sessions with live (unconsumed) nonces — the single-use discipline is
    /// observable here (returns to 0 after every completed/adjourned ceremony).
    fn pending_count(&self) -> usize {
        self.pending.len()
    }

    fn key_package(&self) -> Result<&KeyPackage, GErr> {
        self.key_package.as_ref().ok_or(GErr::Wiped)
    }

    /// Round 1: mint single-use nonces (storing `sighash` alongside them when known),
    /// return the `Round1Reply` message JSON.
    fn commit_round1(&mut self, session: &str, sighash: Option<[u8; 32]>) -> Result<String, GErr> {
        let (nonces, commitments) = steward_core::sign::commit(self.key_package()?, &mut OsRng);
        self.pending
            .insert(session.to_string(), Pending { sighash, nonces });
        let msg = wire::Message::Round1Reply {
            identifier: self.identifier,
            commitments,
        };
        Ok(serde_json::to_string(&msg)?)
    }

    /// Round 2: load the stored nonces, sign under α **by value**, then delete the
    /// nonces. Returns the `Round2Reply` message JSON.
    fn round2_inner(
        &mut self,
        session: &str,
        signing_package: &SigningPackage,
        randomizer_le: [u8; 32],
    ) -> Result<String, GErr> {
        // Remove (not read) → single-use. `pending` is owned here and drops at the end
        // of scope, taking the nonces with it (zeroized) on every path below.
        let pending = self.pending.remove(session).ok_or(GErr::NoSession)?;
        let key_package = self.key_package()?;

        let randomizer = steward_core::sign::randomizer_from_le_bytes(&randomizer_le)?;
        // Prefer the sighash we committed to at round 1 (anti-swap); otherwise take it
        // from the package. Either way `sign_share` re-checks package.message == sighash.
        let sighash: [u8; 32] = match pending.sighash {
            Some(s) => s,
            None => <[u8; 32]>::try_from(&signing_package.message()[..])
                .map_err(|_| GErr::Format("signing package message is not 32 bytes".into()))?,
        };

        let share = steward_core::sign::sign_share(
            &sighash,
            &randomizer,
            &pending.nonces,
            key_package,
            signing_package,
        )?;
        let msg = wire::Message::Round2Reply {
            identifier: self.identifier,
            share,
        };
        Ok(serde_json::to_string(&msg)?)
    }

    /// Bare round 2 from wire strings: parse the package + α hex, then [`round2_inner`].
    fn round2(
        &mut self,
        session: &str,
        signing_package_json: &str,
        randomizer_le_hex: &str,
    ) -> Result<String, GErr> {
        let signing_package: SigningPackage = serde_json::from_str(signing_package_json)?;
        let randomizer_le = decode_32_hex(randomizer_le_hex)?;
        self.round2_inner(session, &signing_package, randomizer_le)
    }

    /// Discard any live round-1 state for `session` (the coordinator adjourned it).
    fn adjourn(&mut self, session: &str) {
        self.pending.remove(session);
    }

    /// Zeroize/drop all key material: the `KeyPackage` and every live nonce.
    fn wipe(&mut self) {
        // Dropping the KeyPackage zeroizes its SigningShare (frost-core ZeroizeOnDrop);
        // clearing `pending` drops every SigningNonces (likewise zeroized on drop).
        self.key_package = None;
        self.pending.clear();
    }

    /// Envelope handler: decode a relay [`wire::Message`] and run the matching round.
    /// This is what the TypeScript drives — it never has to understand FROST.
    fn on_message(&mut self, session: &str, bytes: &[u8]) -> Result<Reply, GErr> {
        let msg: wire::Message = serde_json::from_slice(bytes)?;
        match msg {
            wire::Message::Round1Request { sighash, .. } => {
                let json = self.commit_round1(session, Some(sighash))?;
                Ok(Reply {
                    payload: Some(json.into_bytes()),
                    done: false,
                    kind: "round1",
                })
            }
            wire::Message::Round2Request {
                signing_package,
                randomizer_le,
            } => {
                let json = self.round2_inner(session, &signing_package, randomizer_le)?;
                Ok(Reply {
                    payload: Some(json.into_bytes()),
                    done: true,
                    kind: "round2",
                })
            }
            wire::Message::Adjourn => {
                self.adjourn(session);
                Ok(Reply {
                    payload: None,
                    done: true,
                    kind: "adjourn",
                })
            }
            // Replies are coordinator-bound; a guardian should never receive one.
            wire::Message::Round1Reply { .. } | wire::Message::Round2Reply { .. } => {
                Err(GErr::Unexpected)
            }
        }
    }

    /// [`on_message`] over hex, producing the JS-facing [`RelayAction`].
    fn handle_relay_action(&mut self, session: &str, incoming_hex: &str) -> Result<RelayAction, GErr> {
        let bytes = hex::decode(incoming_hex.trim())?;
        let reply = self.on_message(session, &bytes)?;
        Ok(RelayAction {
            action: if reply.payload.is_some() { "send" } else { "none" },
            // Guardian replies always route to the coordinator (SendBody.to = null).
            to: None,
            msg_hex: reply.payload.map(hex::encode),
            done: reply.done,
            kind: reply.kind,
        })
    }
}

/// Decode a 32-byte value from hex (accepts surrounding whitespace).
fn decode_32_hex(s: &str) -> Result<[u8; 32], GErr> {
    let bytes = hex::decode(s.trim())?;
    <[u8; 32]>::try_from(bytes.as_slice())
        .map_err(|_| GErr::Format("expected 32 bytes (64 hex chars)".into()))
}

/// The instruction returned by [`Guardian::handle_relay_message`] telling the browser
/// what to do next. The TS just moves bytes: if `action == "send"`, POST
/// `{ to, msg_hex }` to `/session/{id}/send`; if `"none"`, there is nothing to send.
#[derive(Serialize)]
struct RelayAction {
    /// `"send"` (there is a reply to POST) or `"none"` (adjourned / nothing to send).
    action: &'static str,
    /// Destination for the relay `SendBody.to`; `null` means the coordinator.
    to: Option<String>,
    /// The reply to POST as `SendBody.msg_hex` (hex of the `Message` JSON), or `null`.
    msg_hex: Option<String>,
    /// Whether this session is finished for the guardian (stop polling it).
    done: bool,
    /// `"round1"` | `"round2"` | `"adjourn"` — for UX/logging only.
    kind: &'static str,
}

// ---------------------------------------------------------------------------------
// #[wasm_bindgen] surface
// ---------------------------------------------------------------------------------

/// Seal a guardian's secret share for encrypted-at-rest storage.
///
/// `secret_share_json` is the `serde_json` of a `steward_core` `SecretShare` (exactly
/// what the vault dealer hands each guardian). Returns a self-describing sealed-blob
/// JSON string: `argon2id(passphrase)` → XChaCha20-Poly1305 seal, carrying its salt,
/// nonce and KDF params. A malformed share is rejected here.
#[wasm_bindgen]
pub fn seal_share(secret_share_json: &str, passphrase: &str) -> Result<String, JsError> {
    Ok(seal_share_core(secret_share_json, passphrase)?)
}

/// Open a sealed blob into a live [`Guardian`] handle.
///
/// Decrypts with `passphrase`, rebuilds the `KeyPackage`, and returns a handle that
/// keeps the key material **inside wasm memory** (never returned to JS). A wrong
/// passphrase (or tampered blob) throws a clean JS `Error`.
#[wasm_bindgen]
pub fn open_guardian(sealed_blob: &str, passphrase: &str) -> Result<Guardian, JsError> {
    let core = open_guardian_core(sealed_blob, passphrase)?;
    Ok(Guardian { core })
}

/// A live guardian: one decrypted FROST share plus its per-session single-use nonces.
/// The `KeyPackage` stays inside wasm memory for the handle's whole lifetime and is
/// never exposed to JavaScript.
#[wasm_bindgen]
pub struct Guardian {
    core: GuardianCore,
}

#[wasm_bindgen]
impl Guardian {
    /// This guardian's FROST identifier, as canonical hex.
    #[wasm_bindgen(getter)]
    pub fn identifier(&self) -> String {
        self.core.identifier_hex()
    }

    /// Number of sessions with live (unconsumed) round-1 nonces. `0` between
    /// ceremonies; the single-use discipline is observable here.
    #[wasm_bindgen(getter, js_name = pendingCount)]
    pub fn pending_count(&self) -> usize {
        self.core.pending_count()
    }

    /// Round 1: commit. Mints single-use signing nonces, stores them under
    /// `session_id`, and returns the `Round1Reply` message JSON the coordinator
    /// expects on the relay.
    pub fn round1(&mut self, session_id: &str) -> Result<String, JsError> {
        Ok(self.core.commit_round1(session_id, None)?)
    }

    /// Round 2: sign the coordinator's `signing_package` (JSON) under the ZIP-312
    /// randomizer α (`randomizer_le_hex`, 32-byte little-endian) **by value**, then
    /// delete this session's nonces. Returns the `Round2Reply` message JSON. A missing
    /// or already-consumed session throws.
    pub fn round2(
        &mut self,
        session_id: &str,
        signing_package_json: &str,
        randomizer_le_hex: &str,
    ) -> Result<String, JsError> {
        Ok(self
            .core
            .round2(session_id, signing_package_json, randomizer_le_hex)?)
    }

    /// The "TS only moves bytes" entry point. Feed it the hex a relay
    /// `/session/{id}/recv` returned (the coordinator's enveloped `Message`); it runs
    /// the right round and returns a [`RelayAction`] object
    /// `{ action, to, msg_hex, done, kind }` describing what to POST (if anything) to
    /// `/session/{id}/send`. The browser never parses FROST.
    #[wasm_bindgen(js_name = handleRelayMessage)]
    pub fn handle_relay_message(
        &mut self,
        session_id: &str,
        incoming_msg_hex: &str,
    ) -> Result<JsValue, JsError> {
        let action = self.core.handle_relay_action(session_id, incoming_msg_hex)?;
        serde_wasm_bindgen::to_value(&action).map_err(|e| JsError::new(&e.to_string()))
    }

    /// Discard any live round-1 state for `session_id` (the coordinator adjourned it).
    pub fn adjourn(&mut self, session_id: &str) {
        self.core.adjourn(session_id);
    }

    /// Zeroize and drop all key material (the `KeyPackage` and every live nonce). The
    /// handle is inert afterwards — any further round call throws.
    pub fn wipe(&mut self) {
        self.core.wipe();
    }
}

// ---------------------------------------------------------------------------------
// Host tests (`cargo test` — the crate's rlib target builds on host)
// ---------------------------------------------------------------------------------

#[cfg(test)]
mod tests {
    use super::*;
    use rand::{rngs::OsRng, RngCore};
    use std::time::{Duration, Instant};

    use steward_core::keys::split_authority;
    use steward_core::redpallas::round1::SigningCommitments;
    use steward_core::redpallas::{Identifier, SigningKey};

    /// Seal + open a 2-of-3 vault's guardians, run round1/round2 for two of them, then
    /// aggregate and verify the signature against `rk` — plus wrong-passphrase and
    /// nonce-reuse negative checks. Every round output is proven byte-identical to the
    /// real `steward_coordinator::Message`.
    #[test]
    fn seal_open_sign_2_of_3_verifies_against_rk() {
        let mut rng = OsRng;
        let ask = SigningKey::new(&mut rng);
        let vault = split_authority(&ask, 3, 2, &mut rng).expect("split");
        let pkpkg = vault.public_key_package.clone();

        // --- Seal each share, then open it back into a guardian handle. ---
        let mut sealed: Vec<String> = Vec::new();
        let mut guardians: Vec<GuardianCore> = Vec::new();
        for (id, share) in &vault.shares {
            let share_json = serde_json::to_string(share).unwrap();
            let pass = format!("correct horse battery staple :: {}", hex::encode(id.serialize()));
            let blob = seal_share_core(&share_json, &pass).expect("seal");
            let g = open_guardian_core(&blob, &pass).expect("open");
            assert_eq!(&g.identifier, id, "opened handle must carry the share's identifier");
            sealed.push(blob);
            guardians.push(g);
        }
        // `vault.shares` (a BTreeMap) iterates in ascending id order, so `guardians` is
        // id-sorted — the two we sign with are the coordinator's canonical `t` lowest.

        let mut sighash = [0u8; 32];
        rng.fill_bytes(&mut sighash);
        let randomizer = steward_core::sign::random_randomizer(&mut rng);
        let randomizer_le_hex = hex::encode(randomizer.serialize());
        let session = "sess-1";

        // --- Round 1 for the two signers; collect commitments via the REAL coordinator Message. ---
        let mut commitments: BTreeMap<Identifier, SigningCommitments> = BTreeMap::new();
        for g in guardians.iter_mut().take(2) {
            let r1_json = g.commit_round1(session, None).expect("round1");
            let decoded: steward_coordinator::Message =
                serde_json::from_str(&r1_json).expect("round1 must decode as coordinator Message");
            // Byte-for-byte: re-serializing the real coordinator type reproduces our bytes.
            assert_eq!(
                serde_json::to_vec(&decoded).unwrap(),
                r1_json.as_bytes(),
                "Round1Reply must be byte-identical to the coordinator wire format"
            );
            match decoded {
                steward_coordinator::Message::Round1Reply {
                    identifier,
                    commitments: c,
                } => {
                    assert_eq!(identifier, g.identifier);
                    commitments.insert(identifier, c);
                }
                _ => panic!("expected Round1Reply"),
            }
        }
        assert_eq!(commitments.len(), 2);

        // Coordinator assembles the signing package over the sighash.
        let pkg = steward_core::sign::signing_package(commitments, &sighash);
        let pkg_json = serde_json::to_string(&pkg).unwrap();

        // --- Round 2 for the two signers; α passed BY VALUE as LE hex. ---
        let mut shares = BTreeMap::new();
        for g in guardians.iter_mut().take(2) {
            let r2_json = g
                .round2(session, &pkg_json, &randomizer_le_hex)
                .expect("round2");
            let decoded: steward_coordinator::Message =
                serde_json::from_str(&r2_json).expect("round2 must decode as coordinator Message");
            assert_eq!(
                serde_json::to_vec(&decoded).unwrap(),
                r2_json.as_bytes(),
                "Round2Reply must be byte-identical to the coordinator wire format"
            );
            match decoded {
                steward_coordinator::Message::Round2Reply { identifier, share } => {
                    assert_eq!(identifier, g.identifier);
                    shares.insert(identifier, share);
                }
                _ => panic!("expected Round2Reply"),
            }
            // Nonces consumed → session count back to zero for this guardian.
            assert_eq!(g.pending_count(), 0);
        }

        // --- Aggregate + verify against rk = ak + [alpha]G. ---
        let sig =
            steward_core::sign::aggregate(&sighash, &randomizer, &pkg, &shares, &pkpkg).expect("aggregate");
        let rk = steward_core::sign::randomized_verifying_key(&randomizer, &pkpkg);
        rk.verify(&sighash, &sig)
            .expect("aggregate signature must verify against rk");
        // And NOT against the un-randomized group key.
        assert!(pkpkg.verifying_key().verify(&sighash, &sig).is_err());

        // --- Negative: reusing a session's nonce after round 2 fails. ---
        assert!(
            guardians[0]
                .round2(session, &pkg_json, &randomizer_le_hex)
                .is_err(),
            "a second round-2 for the same session must fail (single-use nonce)"
        );

        // --- Negative: wrong passphrase fails cleanly. ---
        assert!(
            matches!(
                open_guardian_core(&sealed[0], "definitely the wrong passphrase"),
                Err(GErr::BadPassphrase)
            ),
            "wrong passphrase must fail as BadPassphrase"
        );
    }

    /// End-to-end interop: run WASM guardian cores as the participants of a full
    /// ceremony driven by the **actual** `steward_coordinator` over its in-process
    /// relay, and confirm the aggregated signature verifies against `rk`. Proves the
    /// enveloped `handle_relay_message` path speaks the coordinator's protocol exactly.
    #[test]
    fn wasm_guardians_cosign_a_real_coordinator_ceremony() {
        use steward_coordinator::{
            run_signing_session, CeremonyPurpose, InProcessRelay, ParticipantId, Recipient, Role,
            SessionId, SigningJob, Transport,
        };

        let mut rng = OsRng;
        let ask = SigningKey::new(&mut rng);
        let vault = split_authority(&ask, 3, 2, &mut rng).expect("split");
        let pkpkg = vault.public_key_package.clone();

        // Seal + open all three guardians; pair each with a relay participant id.
        let mut sealed: Vec<(ParticipantId, String, String)> = Vec::new();
        for (i, (id, share)) in vault.shares.iter().enumerate() {
            let _ = id;
            let share_json = serde_json::to_string(share).unwrap();
            let pass = format!("guardian-pass-{i}");
            let blob = seal_share_core(&share_json, &pass).unwrap();
            sealed.push((ParticipantId::new(format!("g{}", i + 1)), blob, pass));
        }
        let invited: Vec<ParticipantId> = sealed.iter().map(|(p, _, _)| p.clone()).collect();

        // Open every guardian's keystore BEFORE the ceremony window. This is both
        // realistic (the device is unlocked, then the ceremony runs) and necessary in
        // a debug build, where Argon2id (19 MiB, 2 passes) is slow enough that opening
        // inside the threads would blow the coordinator's round-1 timeout.
        let cores: Vec<(ParticipantId, GuardianCore)> = sealed
            .iter()
            .map(|(pid, blob, pass)| (pid.clone(), open_guardian_core(blob, pass).expect("open")))
            .collect();

        let mut sighash = [0u8; 32];
        rng.fill_bytes(&mut sighash);
        let randomizer = steward_core::sign::random_randomizer(&mut rng);

        let relay = InProcessRelay::new();
        let session = SessionId::new("interop-session");
        let job = SigningJob {
            session: session.clone(),
            participants: invited,
            public_key_package: &pkpkg,
            sighash,
            randomizer,
            purpose: CeremonyPurpose::NormalSpend,
        };

        let sig = std::thread::scope(|scope| {
            for (pid, mut core) in cores {
                let endpoint = relay.endpoint(Role::Participant(pid));
                let session = session.clone();
                scope.spawn(move || {
                    // The guardian's message loop over the relay — the exact state
                    // machine the browser TS drives, here in a thread.
                    let deadline = Instant::now() + Duration::from_secs(20);
                    loop {
                        for (_from, payload) in endpoint.recv(&session).unwrap() {
                            let reply = core.on_message(&session.0, &payload).expect("handle");
                            if let Some(bytes) = reply.payload {
                                endpoint
                                    .send(&session, Recipient::Coordinator, bytes)
                                    .unwrap();
                            }
                            if reply.done {
                                return;
                            }
                        }
                        if Instant::now() >= deadline {
                            return;
                        }
                        std::thread::sleep(Duration::from_millis(2));
                    }
                });
            }
            let coordinator = relay.endpoint(Role::Coordinator);
            run_signing_session(&coordinator, &job, Duration::from_secs(20))
        })
        .expect("real coordinator + wasm guardians should aggregate a signature");

        let rk = steward_core::sign::randomized_verifying_key(&randomizer, &pkpkg);
        rk.verify(&sighash, &sig)
            .expect("interop signature must verify against rk");
        assert!(pkpkg.verifying_key().verify(&sighash, &sig).is_err());
    }

    /// `wipe()` drops key material; subsequent round calls fail.
    #[test]
    fn wipe_makes_the_handle_inert() {
        let mut rng = OsRng;
        let ask = SigningKey::new(&mut rng);
        let vault = split_authority(&ask, 2, 2, &mut rng).unwrap();
        let (_, share) = vault.shares.iter().next().unwrap();
        let share_json = serde_json::to_string(share).unwrap();
        let blob = seal_share_core(&share_json, "pw").unwrap();
        let mut g = open_guardian_core(&blob, "pw").unwrap();

        assert!(!g.identifier_hex().is_empty());
        g.wipe();
        assert!(matches!(g.commit_round1("s", None), Err(GErr::Wiped)));
    }

    /// The local `wire` enum + `SealedBlob` shapes, printed for the wire-format report.
    #[test]
    fn print_wire_samples() {
        let mut rng = OsRng;
        let ask = SigningKey::new(&mut rng);
        let vault = split_authority(&ask, 2, 2, &mut rng).unwrap();
        let (_, share) = vault.shares.iter().next().unwrap();

        let share_json = serde_json::to_string(share).unwrap();
        let blob = seal_share_core(&share_json, "pw").unwrap();
        let mut g = open_guardian_core(&blob, "pw").unwrap();

        let r1 = g.commit_round1("s", None).unwrap();
        println!("\nSEALED_BLOB = {blob}");
        println!("\nIDENTIFIER  = {}", g.identifier_hex());
        println!("\nROUND1_REPLY = {r1}");

        // Build a package so we can print a Round2Reply too.
        let decoded: steward_coordinator::Message = serde_json::from_str(&r1).unwrap();
        let (id, c) = match decoded {
            steward_coordinator::Message::Round1Reply { identifier, commitments } => {
                (identifier, commitments)
            }
            _ => unreachable!(),
        };
        let mut commitments = BTreeMap::new();
        commitments.insert(id, c);
        // 2-of-2 needs both; add the second guardian.
        let (_, share2) = vault.shares.iter().nth(1).unwrap();
        let blob2 = seal_share_core(&serde_json::to_string(share2).unwrap(), "pw2").unwrap();
        let mut g2 = open_guardian_core(&blob2, "pw2").unwrap();
        let r1b = g2.commit_round1("s", None).unwrap();
        let decoded2: steward_coordinator::Message = serde_json::from_str(&r1b).unwrap();
        let (id2, c2) = match decoded2 {
            steward_coordinator::Message::Round1Reply { identifier, commitments } => {
                (identifier, commitments)
            }
            _ => unreachable!(),
        };
        commitments.insert(id2, c2);

        let sighash = [0u8; 32];
        let randomizer = steward_core::sign::random_randomizer(&mut rng);
        let randomizer_le_hex = hex::encode(randomizer.serialize());
        let pkg = steward_core::sign::signing_package(commitments, &sighash);
        let pkg_json = serde_json::to_string(&pkg).unwrap();
        let r2 = g.round2("s", &pkg_json, &randomizer_le_hex).unwrap();
        println!("\nSIGNING_PACKAGE = {pkg_json}");
        println!("\nROUND2_REPLY = {r2}");
    }
}
