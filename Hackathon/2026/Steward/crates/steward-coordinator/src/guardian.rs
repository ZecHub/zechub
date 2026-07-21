//! The guardian handler. **(P3)**
//!
//! A [`Guardian`] wraps exactly one FROST share ([`KeyPackage`]) and runs the two
//! signing rounds. This is the logic the future WASM/web guardian and the `frostd`
//! participant both reuse — the only thing that changes there is the [`Transport`]
//! implementation and where the [`KeyPackage`] is stored (an encrypted-at-rest
//! keystore).
//!
//! ### Nonce lifecycle (load-bearing)
//! Round 1 mints single-use [`SigningNonces`] and stores them **keyed by session**.
//! They are the guardian's most sensitive per-signature secret: reusing a nonce
//! across two signatures leaks the signing share. So round 2 **removes and drops**
//! the nonces the instant it produces a share, and a second round-2 call for the
//! same session fails. The future keystore must persist this slot and delete it on
//! the same boundary (`docs/PROTOCOL.md` §5; PLAN.md P3 "single-use nonce slot
//! deleted after round 2").

use std::collections::BTreeMap;
use std::time::{Duration, Instant};

use rand::rngs::OsRng;

use steward_core::redpallas::keys::KeyPackage;
use steward_core::redpallas::round1::SigningNonces;
use steward_core::redpallas::{Identifier, SigningPackage};

use crate::error::{CoordinatorError, Result};
use crate::message::{self, Message};
use crate::transport::{Recipient, SessionId, Transport};

/// Per-session secret round-1 state held between the two rounds.
struct Pending {
    /// The sighash this guardian committed to in round 1. Round 2 re-checks the
    /// coordinator's package against it, so the message cannot be swapped mid-ceremony.
    sighash: [u8; 32],
    /// The single-use nonces — dropped the instant round 2 completes.
    nonces: SigningNonces,
}

/// A guardian: one FROST share, driving the two signing rounds.
pub struct Guardian {
    identifier: Identifier,
    key_package: KeyPackage,
    // Live round-1 state per in-flight session. Empty between ceremonies.
    pending: BTreeMap<SessionId, Pending>,
}

impl Guardian {
    /// Build a guardian around its share.
    pub fn new(key_package: KeyPackage) -> Self {
        Self {
            identifier: *key_package.identifier(),
            key_package,
            pending: BTreeMap::new(),
        }
    }

    /// This guardian's FROST identifier.
    pub fn identifier(&self) -> &Identifier {
        &self.identifier
    }

    /// Number of sessions with live (unconsumed) nonces. A correctly behaving
    /// guardian returns to `0` after every completed or adjourned ceremony — the
    /// single-use discipline is observable here.
    pub fn pending_count(&self) -> usize {
        self.pending.len()
    }

    /// Round 1: commit. Mints single-use nonces, stores them under `session`, and
    /// returns the public commitments for the coordinator.
    pub fn round1(&mut self, session: &SessionId, sighash: [u8; 32]) -> Message {
        let (nonces, commitments) = steward_core::sign::commit(&self.key_package, &mut OsRng);
        self.pending.insert(session.clone(), Pending { sighash, nonces });
        Message::Round1Reply {
            identifier: self.identifier,
            commitments,
        }
    }

    /// Round 2: sign the coordinator's package under α, then **destroy** the nonces
    /// for `session`. Errors if there are no live nonces (no prior round 1, or a
    /// replay after they were already consumed).
    pub fn round2(
        &mut self,
        session: &SessionId,
        signing_package: &SigningPackage,
        randomizer_le: [u8; 32],
    ) -> Result<Message> {
        // Remove (not just read) → single-use. `pending` drops at end of scope,
        // taking the `SigningNonces` with it, even on the error paths below.
        let pending = self.pending.remove(session).ok_or_else(|| {
            CoordinatorError::Protocol(
                "no live nonces for this session (missing round 1, or nonces already consumed)"
                    .into(),
            )
        })?;
        let randomizer = steward_core::sign::randomizer_from_le_bytes(&randomizer_le)?;
        // `sign_share` re-checks that the package's message equals OUR round-1
        // sighash, so the coordinator cannot swap the message between rounds.
        let share = steward_core::sign::sign_share(
            &pending.sighash,
            &randomizer,
            &pending.nonces,
            &self.key_package,
            signing_package,
        )?;
        Ok(Message::Round2Reply {
            identifier: self.identifier,
            share,
        })
    }

    /// Discard any live round-1 state for `session` (coordinator adjourned it).
    pub fn adjourn(&mut self, session: &SessionId) {
        self.pending.remove(session);
    }

    /// Run this guardian's message loop over `transport` for `session` until it has
    /// completed (or been adjourned out of) round 2, or `timeout` elapses with no
    /// further messages. Used by the in-process demo/tests; a networked guardian
    /// runs this exact state machine over a `frostd` transport.
    pub fn run<T: Transport>(
        &mut self,
        transport: &T,
        session: &SessionId,
        timeout: Duration,
    ) -> Result<()> {
        let deadline = Instant::now() + timeout;
        loop {
            for (_sender, payload) in transport.recv(session)? {
                match message::decode(&payload)? {
                    Message::Round1Request { sighash, .. } => {
                        let reply = self.round1(session, sighash);
                        transport.send(session, Recipient::Coordinator, message::encode(&reply)?)?;
                    }
                    Message::Round2Request {
                        signing_package,
                        randomizer_le,
                    } => {
                        let reply = self.round2(session, &signing_package, randomizer_le)?;
                        transport.send(session, Recipient::Coordinator, message::encode(&reply)?)?;
                        return Ok(()); // done after round 2
                    }
                    Message::Adjourn => {
                        self.adjourn(session);
                        return Ok(());
                    }
                    // Replies are coordinator-bound; a guardian never sees its own.
                    Message::Round1Reply { .. } | Message::Round2Reply { .. } => {}
                }
            }
            if Instant::now() >= deadline {
                return Ok(()); // idle drop-out (nothing more arriving)
            }
            std::thread::sleep(crate::POLL_INTERVAL);
        }
    }
}
