//! The guardian handle — an on-device co-signer (§5 of the spec).
//!
//! [`open_guardian`] decrypts a sealed share into a [`Guardian`] object that keeps
//! the FROST [`KeyPackage`] **inside** the object (it is never returned across the
//! FFI boundary) and runs the two re-randomized FROST rounds with the **single-use
//! nonce discipline**: nonces are minted at round 1, stored per session, and dropped
//! (zeroized by frost-core) the instant round 2 produces a share.
//!
//! This is a faithful re-implementation of `steward-guardian-wasm`'s pure
//! `GuardianCore` + `wire` mirror, minus the `wasm_bindgen` glue — the two produce
//! **byte-identical** wire output over the same [`steward_core`] FROST types, so a
//! mobile guardian and a browser guardian interoperate in the same ceremony.
//!
//! [`KeyPackage`]: steward_core::redpallas::keys::KeyPackage

use std::collections::BTreeMap;
use std::sync::{Arc, Mutex};

use rand::rngs::OsRng;

use steward_core::redpallas::keys::KeyPackage;
use steward_core::redpallas::round1::SigningNonces;
use steward_core::redpallas::{Identifier, SigningPackage};

use crate::decode_32;
use crate::error::StewardError;
use crate::keystore::open_guardian_core;

// ---------------------------------------------------------------------------------
// Wire protocol — a byte-for-byte local mirror of `steward_coordinator::message::Message`
// ---------------------------------------------------------------------------------

/// A local re-declaration of the coordinator ↔ guardian wire protocol, kept
/// **byte-identical** to `steward_coordinator::message::Message` (and to
/// `steward-guardian-wasm`'s copy). We reuse the *same* `steward_core::redpallas`
/// FROST types and mirror the exact variant/field names/order, so `serde_json`
/// produces identical bytes. We do not depend on `steward-coordinator` (it pulls
/// axum/tokio/reqwest — unwanted in a mobile library).
pub(crate) mod wire {
    use serde::{Deserialize, Serialize};
    use steward_core::redpallas::{
        round1::SigningCommitments, round2::SignatureShare, Identifier, SigningPackage,
    };

    /// Mirror of `steward_coordinator::authz::CeremonyPurpose` (externally tagged).
    #[derive(Serialize, Deserialize, Clone, Copy, PartialEq, Eq, Debug)]
    pub enum CeremonyPurpose {
        /// An owner-authorized spend.
        NormalSpend,
        /// An owner-authorized recovery sweep to a fresh address.
        SocialRecoverySweep,
        /// The dead-man's-switch release to the heir (gated by each guardian's
        /// independent heartbeat check — see the spec §6.3).
        InheritanceRelease,
    }

    /// Mirror of `steward_coordinator::message::Message`.
    #[derive(Serialize, Deserialize)]
    pub enum Message {
        /// Coordinator → guardian: open round 1 (purpose + the 32-byte sighash).
        Round1Request {
            /// Why this ceremony is running.
            purpose: CeremonyPurpose,
            /// The 32-byte sighash to be signed.
            sighash: [u8; 32],
        },
        /// Guardian → coordinator: round-1 commitments.
        Round1Reply {
            /// The replying guardian's identifier.
            identifier: Identifier,
            /// Public commitments to the single-use nonces.
            commitments: SigningCommitments,
        },
        /// Coordinator → guardian: round 2 (the signing package + α, 32-byte LE).
        Round2Request {
            /// The package assembled from the collected commitments.
            signing_package: SigningPackage,
            /// α, 32-byte little-endian, straight from `zcash-sign`.
            randomizer_le: [u8; 32],
        },
        /// Guardian → coordinator: the round-2 re-randomized signature share.
        Round2Reply {
            /// The replying guardian's identifier.
            identifier: Identifier,
            /// The re-randomized signature share.
            share: SignatureShare,
        },
        /// Coordinator → guardian: not selected / session ended — discard nonces.
        Adjourn,
    }
}

// ---------------------------------------------------------------------------------
// Guardian core (pure Rust; host-testable)
// ---------------------------------------------------------------------------------

/// Per-session secret round-1 state, held between the two rounds.
struct Pending {
    /// The sighash committed to at round 1, when known (the enveloped
    /// [`handle_relay_message`](Guardian::handle_relay_message) path learns it from
    /// the coordinator's `Round1Request`; the bare [`round1`](Guardian::round1) path
    /// does not, and derives it from the round-2 package instead). When `Some`, round
    /// 2 re-checks the package against it, so the message cannot be swapped mid-ceremony.
    sighash: Option<[u8; 32]>,
    /// The single-use nonces — dropped (and zeroized by frost-core) the instant round
    /// 2 completes.
    nonces: SigningNonces,
}

/// The pure guardian state machine. [`Guardian`] is a thin UniFFI wrapper over this
/// (behind a `Mutex`); the host tests can drive `Guardian` directly.
pub(crate) struct GuardianCore {
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
    pub(crate) fn new(key_package: KeyPackage) -> Self {
        Self {
            identifier: *key_package.identifier(),
            key_package: Some(key_package),
            pending: BTreeMap::new(),
        }
    }

    /// The FROST identifier as canonical hex (the exact hex that appears, quoted, as
    /// the `identifier` field on the wire).
    fn identifier_hex(&self) -> String {
        crate::identifier_hex(&self.identifier)
    }

    /// Number of sessions with live (unconsumed) nonces — the single-use discipline
    /// is observable here (returns to 0 after every completed/adjourned ceremony).
    fn pending_count(&self) -> usize {
        self.pending.len()
    }

    fn key_package(&self) -> Result<&KeyPackage, StewardError> {
        self.key_package.as_ref().ok_or(StewardError::Wiped)
    }

    /// Round 1: mint single-use nonces (storing `sighash` alongside them when known),
    /// return the `Round1Reply` message JSON.
    fn commit_round1(
        &mut self,
        session: &str,
        sighash: Option<[u8; 32]>,
    ) -> Result<String, StewardError> {
        let (nonces, commitments) = steward_core::sign::commit(self.key_package()?, &mut OsRng);
        self.pending.insert(session.to_string(), Pending { sighash, nonces });
        let msg = wire::Message::Round1Reply { identifier: self.identifier, commitments };
        Ok(serde_json::to_string(&msg)?)
    }

    /// Round 2: load the stored nonces, sign under α **by value**, then delete the
    /// nonces. Returns the `Round2Reply` message JSON.
    fn round2_inner(
        &mut self,
        session: &str,
        signing_package: &SigningPackage,
        randomizer_le: [u8; 32],
    ) -> Result<String, StewardError> {
        // Remove (not read) → single-use. `pending` is owned here and drops at the end
        // of scope, taking the nonces with it (zeroized) on every path below.
        let pending = self.pending.remove(session).ok_or(StewardError::NoSession)?;
        let key_package = self.key_package()?;

        let randomizer = steward_core::sign::randomizer_from_le_bytes(&randomizer_le)?;
        // Prefer the sighash we committed to at round 1 (anti-swap); otherwise take it
        // from the package. Either way `sign_share` re-checks package.message == sighash.
        let sighash: [u8; 32] = match pending.sighash {
            Some(s) => s,
            None => <[u8; 32]>::try_from(&signing_package.message()[..]).map_err(|_| {
                StewardError::Format { msg: "signing package message is not 32 bytes".into() }
            })?,
        };

        let share = steward_core::sign::sign_share(
            &sighash,
            &randomizer,
            &pending.nonces,
            key_package,
            signing_package,
        )?;
        let msg = wire::Message::Round2Reply { identifier: self.identifier, share };
        Ok(serde_json::to_string(&msg)?)
    }

    /// Bare round 2 from wire strings: parse the package + α hex, then [`round2_inner`].
    fn round2(
        &mut self,
        session: &str,
        signing_package_json: &str,
        randomizer_le_hex: &str,
    ) -> Result<String, StewardError> {
        let signing_package: SigningPackage = serde_json::from_str(signing_package_json)?;
        let randomizer_le = decode_32(randomizer_le_hex)?;
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
    /// This is what the mobile app drives — it never has to understand FROST.
    fn on_message(&mut self, session: &str, bytes: &[u8]) -> Result<Reply, StewardError> {
        let msg: wire::Message = serde_json::from_slice(bytes)?;
        match msg {
            wire::Message::Round1Request { sighash, .. } => {
                let json = self.commit_round1(session, Some(sighash))?;
                Ok(Reply { payload: Some(json.into_bytes()), done: false, kind: "round1" })
            }
            wire::Message::Round2Request { signing_package, randomizer_le } => {
                let json = self.round2_inner(session, &signing_package, randomizer_le)?;
                Ok(Reply { payload: Some(json.into_bytes()), done: true, kind: "round2" })
            }
            wire::Message::Adjourn => {
                self.adjourn(session);
                Ok(Reply { payload: None, done: true, kind: "adjourn" })
            }
            // Replies are coordinator-bound; a guardian should never receive one.
            wire::Message::Round1Reply { .. } | wire::Message::Round2Reply { .. } => {
                Err(StewardError::Unexpected)
            }
        }
    }

    /// [`on_message`] over hex, producing the caller-facing [`RelayAction`].
    fn handle_relay_action(
        &mut self,
        session: &str,
        incoming_hex: &str,
    ) -> Result<RelayAction, StewardError> {
        let bytes = hex::decode(incoming_hex.trim())?;
        let reply = self.on_message(session, &bytes)?;
        Ok(RelayAction {
            action: if reply.payload.is_some() { "send".to_string() } else { "none".to_string() },
            // Guardian replies always route to the coordinator (SendBody.to = null).
            to: None,
            msg_hex: reply.payload.map(hex::encode),
            done: reply.done,
            kind: reply.kind.to_string(),
        })
    }
}

/// The instruction returned by [`Guardian::handle_relay_message`] telling the app
/// what to do next. The caller just moves bytes: if `action == "send"`, POST
/// `{ to, msg_hex }` to `/session/{id}/send`; if `"none"`, there is nothing to send.
#[derive(uniffi::Record)]
pub struct RelayAction {
    /// `"send"` (there is a reply to POST) or `"none"` (adjourned / nothing to send).
    pub action: String,
    /// Destination for the relay `SendBody.to`; `None` means the coordinator.
    pub to: Option<String>,
    /// The reply to POST as `SendBody.msg_hex` (hex of the `Message` JSON), or `None`.
    pub msg_hex: Option<String>,
    /// Whether this session is finished for the guardian (stop polling it).
    pub done: bool,
    /// `"round1"` | `"round2"` | `"adjourn"` — for UX/logging only.
    pub kind: String,
}

// ---------------------------------------------------------------------------------
// UniFFI object surface
// ---------------------------------------------------------------------------------

/// A live guardian: one decrypted FROST share plus its per-session single-use
/// nonces. The `KeyPackage` stays **inside** this object for its whole lifetime and
/// is never exposed across the FFI boundary. The inner state is behind a `Mutex` so
/// the object is `Send + Sync` (UniFFI hands the app an `Arc<Guardian>`).
#[derive(uniffi::Object)]
pub struct Guardian {
    core: Mutex<GuardianCore>,
}

impl Guardian {
    fn from_core(core: GuardianCore) -> Arc<Self> {
        Arc::new(Self { core: Mutex::new(core) })
    }

    fn lock(&self) -> std::sync::MutexGuard<'_, GuardianCore> {
        // Poisoning can only happen if a prior holder panicked mid-method; recover
        // the guard rather than cascade a panic across the FFI boundary.
        self.core.lock().unwrap_or_else(|p| p.into_inner())
    }
}

#[uniffi::export]
impl Guardian {
    /// This guardian's FROST identifier, as canonical hex.
    pub fn identifier(&self) -> String {
        self.lock().identifier_hex()
    }

    /// Number of sessions with live (unconsumed) round-1 nonces. `0` between
    /// ceremonies; the single-use discipline is observable here.
    pub fn pending_count(&self) -> u32 {
        self.lock().pending_count() as u32
    }

    /// Round 1: commit. Mints single-use signing nonces, stores them under
    /// `session_id`, and returns the `Round1Reply` message JSON the coordinator
    /// expects on the relay. Throws [`StewardError::Wiped`] after [`wipe`](Self::wipe).
    pub fn round1(&self, session_id: String) -> Result<String, StewardError> {
        self.lock().commit_round1(&session_id, None)
    }

    /// Round 2: sign the coordinator's `signing_package` (JSON) under the ZIP-312
    /// randomizer α (`randomizer_le_hex`, 32-byte little-endian) **by value**, then
    /// delete this session's nonces. Returns the `Round2Reply` message JSON. A
    /// missing or already-consumed session throws [`StewardError::NoSession`].
    pub fn round2(
        &self,
        session_id: String,
        signing_package_json: String,
        randomizer_le_hex: String,
    ) -> Result<String, StewardError> {
        self.lock().round2(&session_id, &signing_package_json, &randomizer_le_hex)
    }

    /// The "the app only moves bytes" entry point. Feed it the hex a relay
    /// `/session/{id}/recv` returned (the coordinator's enveloped `Message`); it runs
    /// the right round and returns a [`RelayAction`] describing what to POST (if
    /// anything) to `/session/{id}/send`. The app never parses FROST.
    pub fn handle_relay_message(
        &self,
        session_id: String,
        incoming_msg_hex: String,
    ) -> Result<RelayAction, StewardError> {
        self.lock().handle_relay_action(&session_id, &incoming_msg_hex)
    }

    /// Discard any live round-1 state for `session_id` (the coordinator adjourned it).
    pub fn adjourn(&self, session_id: String) {
        self.lock().adjourn(&session_id);
    }

    /// Zeroize and drop all key material (the `KeyPackage` and every live nonce). The
    /// handle is inert afterwards — any further round call throws
    /// [`StewardError::Wiped`]. Call this on lock/logout.
    pub fn wipe(&self) {
        self.lock().wipe();
    }
}

/// Open a sealed share blob into a live [`Guardian`] handle.
///
/// Decrypts with `passphrase`, rebuilds the `KeyPackage`, and returns a handle that
/// keeps the key material inside the object (never returned to the app). A wrong
/// passphrase (or a tampered blob) throws [`StewardError::BadPassphrase`]. Unlock
/// **once** (not per relay poll); call [`Guardian::wipe`] on lock/logout.
#[uniffi::export]
pub fn open_guardian(
    sealed_blob: String,
    passphrase: String,
) -> Result<Arc<Guardian>, StewardError> {
    let core = open_guardian_core(&sealed_blob, &passphrase)?;
    Ok(Guardian::from_core(core))
}
