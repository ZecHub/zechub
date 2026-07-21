//! The coordinator ceremony. **(P4)**
//!
//! [`run_signing_session`] drives the full re-randomized FROST two-round ceremony
//! over any [`Transport`] and returns a signature that is **verified against the
//! randomized key `rk = ak + [α]G` before it is handed back** (a signature that
//! does not verify is unusable on-chain, so we fail loudly). The coordinator holds
//! only public data — the [`PublicKeyPackage`], the sighash and α — never a share.
//!
//! Flow (mirrors `docs/PROTOCOL.md` §5):
//! 1. broadcast a round-1 request to the invited signer set;
//! 2. collect [`SigningCommitments`] until `t` (the package threshold) arrive —
//!    tolerating dropped/slow guardians, but failing with [`QuorumNotMet`] if
//!    fewer than `t` respond before the timeout;
//! 3. fix the signer subset at exactly `t` committers, build the
//!    [`SigningPackage`], and adjourn the rest;
//! 4. collect the `t` [`SignatureShare`]s;
//! 5. [`aggregate`](steward_core::sign::aggregate) → verify against `rk` → return.
//!
//! [`QuorumNotMet`]: crate::error::CoordinatorError::QuorumNotMet
//! [`SigningCommitments`]: steward_core::redpallas::round1::SigningCommitments
//! [`SigningPackage`]: steward_core::redpallas::SigningPackage
//! [`SignatureShare`]: steward_core::redpallas::round2::SignatureShare

use std::collections::{BTreeMap, BTreeSet};
use std::time::{Duration, Instant};

use steward_core::redpallas::keys::PublicKeyPackage;
use steward_core::redpallas::rerandomized::Randomizer;
use steward_core::redpallas::round1::SigningCommitments;
use steward_core::redpallas::round2::SignatureShare;
use steward_core::redpallas::{Identifier, Signature};

use crate::authz::{CeremonyPurpose, VaultPolicy};
use crate::error::{CoordinatorError, Result};
use crate::message::{self, Message};
use crate::transport::{ParticipantId, Recipient, SessionId, Transport};

/// The public inputs to a signing ceremony. The coordinator holds no secrets — all
/// of this is either public group data or transaction-derived.
pub struct SigningJob<'a> {
    /// The relay session to run in.
    pub session: SessionId,
    /// The invited signer set (transport addresses). Must be at least `t`; the
    /// coordinator proceeds once any `t` of them commit.
    pub participants: Vec<ParticipantId>,
    /// The group's public key package (group key = Orchard `ak`, carries `t`).
    pub public_key_package: &'a PublicKeyPackage,
    /// The 32-byte sighash to sign (from `zcash-sign`).
    pub sighash: [u8; 32],
    /// The ZIP-312 randomizer α for this action (from `zcash-sign`) — passed
    /// through unchanged so the aggregate verifies against `rk`.
    pub randomizer: Randomizer,
    /// Why this ceremony is running (relayed to guardians for their approval UX).
    pub purpose: CeremonyPurpose,
}

/// Enforce the vault policy gate, then run the ceremony.
///
/// `policy` is **optional**: a plain multisig vault (`None`) has no dead-man's-switch,
/// so owner-authorized purposes ([`NormalSpend`](CeremonyPurpose::NormalSpend) /
/// [`SocialRecoverySweep`](CeremonyPurpose::SocialRecoverySweep)) always run and an
/// [`InheritanceRelease`](CeremonyPurpose::InheritanceRelease) is refused (there is no
/// switch to trip). An inheritance vault (`Some`) is gated by the switch: a release runs
/// only once it has tripped at `now`. See [`crate::authz::authorize`].
pub fn run_authorized_signing_session<T: Transport>(
    transport: &T,
    policy: Option<&VaultPolicy>,
    now: u64,
    job: &SigningJob<'_>,
    timeout: Duration,
) -> Result<Signature> {
    crate::authz::authorize(policy, job.purpose, now)?;
    run_signing_session(transport, job, timeout)
}

/// Drive the two-round re-randomized FROST ceremony to a verified signature.
///
/// `timeout` bounds each collection round independently. Round 1 returns as soon as
/// `t` commitments arrive (it does not wait out the timeout on the happy path); the
/// timeout only bites when too few guardians respond.
pub fn run_signing_session<T: Transport>(
    transport: &T,
    job: &SigningJob<'_>,
    timeout: Duration,
) -> Result<Signature> {
    let session = &job.session;
    let pkpkg = job.public_key_package;

    let t = pkpkg.min_signers().ok_or_else(|| {
        CoordinatorError::Protocol(
            "public key package records no threshold (min_signers = None)".into(),
        )
    })? as usize;

    if job.participants.len() < t {
        return Err(CoordinatorError::QuorumNotMet {
            needed: t,
            got: job.participants.len(),
        });
    }

    // --- Round 1: request commitments from every invited guardian. ---
    let round1_req = message::encode(&Message::Round1Request {
        purpose: job.purpose,
        sighash: job.sighash,
    })?;
    for p in &job.participants {
        transport.send(session, Recipient::Participant(p.clone()), round1_req.clone())?;
    }

    // Collect commitments (only from identifiers this group actually knows) until
    // we reach the threshold or run out of time.
    let known = pkpkg.verifying_shares();
    let mut commitments: BTreeMap<Identifier, SigningCommitments> = BTreeMap::new();
    let mut origin: BTreeMap<Identifier, ParticipantId> = BTreeMap::new();
    collect(transport, session, t, timeout, |sender, msg| {
        if let Message::Round1Reply {
            identifier,
            commitments: c,
        } = msg
        {
            // Count only a first commitment from a known guardian.
            if known.contains_key(&identifier) && !commitments.contains_key(&identifier) {
                commitments.insert(identifier, c);
                origin.insert(identifier, sender);
                return true;
            }
        }
        false
    })?;

    if commitments.len() < t {
        return Err(CoordinatorError::QuorumNotMet {
            needed: t,
            got: commitments.len(),
        });
    }

    // Fix the signer subset at exactly `t` committers (deterministic: the `t`
    // lowest identifiers). FROST requires the round-2 signers to match the signing
    // package's commitment set exactly, so we commit to a subset now.
    let chosen: Vec<Identifier> = commitments.keys().take(t).copied().collect();
    let chosen_commitments: BTreeMap<Identifier, SigningCommitments> = chosen
        .iter()
        .map(|id| (*id, commitments[id]))
        .collect();

    // Build the signing package over exactly those commitments + the sighash.
    let pkg = steward_core::sign::signing_package(chosen_commitments, &job.sighash);

    // --- Round 2: send the package + α to the chosen signers; adjourn the rest. ---
    let round2_req = message::encode(&Message::Round2Request {
        signing_package: pkg.clone(),
        randomizer_le: randomizer_le(&job.randomizer)?,
    })?;
    let chosen_pids: BTreeSet<String> = chosen.iter().map(|id| origin[id].0.clone()).collect();
    for id in &chosen {
        transport.send(
            session,
            Recipient::Participant(origin[id].clone()),
            round2_req.clone(),
        )?;
    }
    let adjourn = message::encode(&Message::Adjourn)?;
    for p in &job.participants {
        if !chosen_pids.contains(&p.0) {
            transport.send(session, Recipient::Participant(p.clone()), adjourn.clone())?;
        }
    }

    // Collect the shares — we need every one of the chosen signers.
    let need = chosen.len();
    let chosen_set: BTreeSet<Identifier> = chosen.iter().copied().collect();
    let mut shares: BTreeMap<Identifier, SignatureShare> = BTreeMap::new();
    collect(transport, session, need, timeout, |_sender, msg| {
        if let Message::Round2Reply { identifier, share } = msg {
            // Count only a first share from a chosen signer.
            if chosen_set.contains(&identifier) && !shares.contains_key(&identifier) {
                shares.insert(identifier, share);
                return true;
            }
        }
        false
    })?;

    if shares.len() < need {
        return Err(CoordinatorError::QuorumNotMet {
            needed: need,
            got: shares.len(),
        });
    }

    // --- Aggregate + verify against rk. ---
    let sig = steward_core::sign::aggregate(&job.sighash, &job.randomizer, &pkg, &shares, pkpkg)?;
    let rk = steward_core::sign::randomized_verifying_key(&job.randomizer, pkpkg);
    rk.verify(&job.sighash, &sig)
        .map_err(|_| CoordinatorError::VerificationFailed)?;
    Ok(sig)
}

/// Poll the coordinator's mailbox, handing each decoded message to `f`, until
/// `want` messages have been accepted (`f` decides what counts by mutating its
/// captured accumulator) or the timeout elapses. Because [`Transport::recv`] is a
/// non-blocking drain, this is the coordinator's own wait loop; it returns early
/// the moment enough have arrived, so a healthy quorum finishes without waiting out
/// the timeout.
fn collect<T, F>(
    transport: &T,
    session: &SessionId,
    want: usize,
    timeout: Duration,
    mut f: F,
) -> Result<()>
where
    T: Transport,
    F: FnMut(ParticipantId, Message) -> bool,
{
    let deadline = Instant::now() + timeout;
    let mut accepted = 0usize;
    loop {
        for (sender, payload) in transport.recv(session)? {
            let msg = message::decode(&payload)?;
            if f(sender, msg) {
                accepted += 1;
            }
        }
        if accepted >= want || Instant::now() >= deadline {
            return Ok(());
        }
        std::thread::sleep(crate::POLL_INTERVAL);
    }
}

/// Serialize α to its canonical 32-byte little-endian encoding for the wire.
fn randomizer_le(randomizer: &Randomizer) -> Result<[u8; 32]> {
    randomizer.serialize().try_into().map_err(|_| {
        CoordinatorError::Protocol("randomizer did not serialize to 32 bytes".into())
    })
}
