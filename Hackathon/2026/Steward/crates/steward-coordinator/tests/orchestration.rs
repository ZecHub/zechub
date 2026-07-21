//! End-to-end orchestration tests: a full re-randomized FROST ceremony over the
//! in-process transport, drop-tolerance, the quorum guard, the dead-man's-switch
//! gate (integration path), and the single-use nonce discipline.

use std::collections::BTreeMap;
use std::time::Duration;

use rand::{rngs::OsRng, RngCore};

use steward_core::keys::split_authority;
use steward_core::policy::HeartbeatPolicy;
use steward_core::redpallas::keys::{KeyPackage, PublicKeyPackage};
use steward_core::redpallas::rerandomized::Randomizer;
use steward_core::redpallas::round1::SigningCommitments;
use steward_core::redpallas::{Identifier, SigningKey};

use steward_coordinator::{
    ceremony::run_authorized_signing_session, run_signing_session, CeremonyPurpose,
    CoordinatorError, Guardian, InProcessRelay, Message, ParticipantId, Role, SessionId,
    SigningJob, VaultPolicy,
};

// --- helpers -------------------------------------------------------------------

/// A 2-of-3 vault: the public key package + guardian key packages in id order.
fn vault_2_of_3() -> (PublicKeyPackage, Vec<(ParticipantId, KeyPackage)>) {
    let mut rng = OsRng;
    let ask = SigningKey::new(&mut rng);
    let vault = split_authority(&ask, 3, 2, &mut rng).expect("split");
    let pkpkg = vault.public_key_package.clone();
    let guardians = vault
        .key_packages()
        .expect("key packages")
        .into_values()
        .enumerate()
        .map(|(i, kp)| (ParticipantId::new(format!("g{}", i + 1)), kp))
        .collect();
    (pkpkg, guardians)
}

fn random_sighash() -> [u8; 32] {
    let mut s = [0u8; 32];
    OsRng.fill_bytes(&mut s);
    s
}

/// Run one ceremony: spawn `spawn` guardians in scoped threads, invite `invited`,
/// drive the coordinator on this thread.
#[allow(clippy::too_many_arguments)]
fn run_ceremony(
    pkpkg: &PublicKeyPackage,
    spawn: Vec<(ParticipantId, KeyPackage)>,
    invited: Vec<ParticipantId>,
    sighash: [u8; 32],
    randomizer: Randomizer,
    purpose: CeremonyPurpose,
    coord_timeout: Duration,
    guardian_timeout: Duration,
) -> Result<steward_core::redpallas::Signature, CoordinatorError> {
    let relay = InProcessRelay::new();
    let session = SessionId::new("test-session");
    let job = SigningJob {
        session: session.clone(),
        participants: invited,
        public_key_package: pkpkg,
        sighash,
        randomizer,
        purpose,
    };
    std::thread::scope(|scope| {
        for (pid, kp) in spawn {
            let endpoint = relay.endpoint(Role::Participant(pid));
            let session = session.clone();
            scope.spawn(move || {
                let mut guardian = Guardian::new(kp);
                let _ = guardian.run(&endpoint, &session, guardian_timeout);
            });
        }
        let coordinator = relay.endpoint(Role::Coordinator);
        run_signing_session(&coordinator, &job, coord_timeout)
    })
}

fn commitments_of(m: Message) -> SigningCommitments {
    match m {
        Message::Round1Reply { commitments, .. } => commitments,
        _ => panic!("expected a Round1Reply"),
    }
}

// --- tests ---------------------------------------------------------------------

/// (DoD a) A full 2-of-3 re-randomized ceremony over the in-process transport
/// aggregates a signature that verifies against `rk` (and NOT the plain group key).
#[test]
fn full_2_of_3_ceremony_verifies_against_rk() {
    let (pkpkg, guardians) = vault_2_of_3();
    let invited: Vec<ParticipantId> = guardians.iter().map(|(p, _)| p.clone()).collect();

    let sighash = random_sighash();
    let randomizer = steward_core::sign::random_randomizer(&mut OsRng);

    let sig = run_ceremony(
        &pkpkg,
        guardians,
        invited,
        sighash,
        randomizer,
        CeremonyPurpose::NormalSpend,
        Duration::from_secs(5),
        Duration::from_secs(5),
    )
    .expect("ceremony should aggregate a signature");

    // Independently re-verify against the randomized key rk = ak + [alpha]G ...
    let rk = steward_core::sign::randomized_verifying_key(&randomizer, &pkpkg);
    rk.verify(&sighash, &sig)
        .expect("signature must verify against rk");
    // ... and it must NOT verify against the un-randomized group key.
    assert!(pkpkg.verifying_key().verify(&sighash, &sig).is_err());
}

/// (DoD - drop) With 3 invited but only 2 guardians online, the 2-of-3 ceremony
/// still completes.
#[test]
fn ceremony_tolerates_a_dropped_guardian() {
    let (pkpkg, mut guardians) = vault_2_of_3();
    let invited: Vec<ParticipantId> = guardians.iter().map(|(p, _)| p.clone()).collect();

    // Drop the third guardian: only spawn the first two.
    guardians.truncate(2);

    let sighash = random_sighash();
    let randomizer = steward_core::sign::random_randomizer(&mut OsRng);

    let sig = run_ceremony(
        &pkpkg,
        guardians,
        invited,
        sighash,
        randomizer,
        CeremonyPurpose::NormalSpend,
        Duration::from_secs(5),
        Duration::from_secs(5),
    )
    .expect("2 of 3 online should still reach quorum");

    let rk = steward_core::sign::randomized_verifying_key(&randomizer, &pkpkg);
    rk.verify(&sighash, &sig).expect("verifies against rk");
}

/// (DoD - quorum) With only 1 of 3 guardians online, the coordinator times out and
/// reports `QuorumNotMet` rather than producing a bogus signature.
#[test]
fn quorum_not_met_when_too_few_respond() {
    let (pkpkg, mut guardians) = vault_2_of_3();
    let invited: Vec<ParticipantId> = guardians.iter().map(|(p, _)| p.clone()).collect();

    // Only one guardian online — below the t=2 threshold.
    guardians.truncate(1);

    let err = run_ceremony(
        &pkpkg,
        guardians,
        invited,
        random_sighash(),
        steward_core::sign::random_randomizer(&mut OsRng),
        CeremonyPurpose::NormalSpend,
        Duration::from_millis(150),
        Duration::from_millis(400),
    )
    .expect_err("should fail to reach quorum");

    match err {
        CoordinatorError::QuorumNotMet { needed, got } => {
            assert_eq!(needed, 2);
            assert!(got < 2);
        }
        other => panic!("expected QuorumNotMet, got {other:?}"),
    }
}

/// (DoD b) The heartbeat gate on the integration path: an InheritanceRelease is
/// rejected while `Active` (no ceremony runs) and completes when `Recoverable`.
#[test]
fn inheritance_release_gate_end_to_end() {
    let (pkpkg, guardians) = vault_2_of_3();
    let invited: Vec<ParticipantId> = guardians.iter().map(|(p, _)| p.clone()).collect();

    let last_heartbeat = 1_000_000u64;
    let policy = VaultPolicy::new(HeartbeatPolicy {
        interval_secs: 30 * 86_400,
        grace_secs: 7 * 86_400,
        last_heartbeat,
    });
    let active_now = last_heartbeat + 10 * 86_400;
    let recoverable_now = last_heartbeat + 40 * 86_400;

    let sighash = random_sighash();
    let randomizer = steward_core::sign::random_randomizer(&mut OsRng);

    // --- Rejected while Active: the gate fires before any transport activity. ---
    let relay = InProcessRelay::new();
    let coordinator = relay.endpoint(Role::Coordinator);
    let job = SigningJob {
        session: SessionId::new("gate-active"),
        participants: invited.clone(),
        public_key_package: &pkpkg,
        sighash,
        randomizer,
        purpose: CeremonyPurpose::InheritanceRelease,
    };
    let err = run_authorized_signing_session(
        &coordinator,
        Some(&policy),
        active_now,
        &job,
        Duration::from_millis(200),
    )
    .expect_err("inheritance release must be refused while Active");
    assert!(matches!(err, CoordinatorError::Unauthorized(_)));

    // --- Allowed when Recoverable: the full ceremony runs and verifies. ---
    let relay = InProcessRelay::new();
    let session = SessionId::new("gate-recoverable");
    let job = SigningJob {
        session: session.clone(),
        participants: invited,
        public_key_package: &pkpkg,
        sighash,
        randomizer,
        purpose: CeremonyPurpose::InheritanceRelease,
    };
    let sig = std::thread::scope(|scope| {
        for (pid, kp) in guardians {
            let endpoint = relay.endpoint(Role::Participant(pid));
            let session = session.clone();
            scope.spawn(move || {
                let mut guardian = Guardian::new(kp);
                let _ = guardian.run(&endpoint, &session, Duration::from_secs(5));
            });
        }
        let coordinator = relay.endpoint(Role::Coordinator);
        run_authorized_signing_session(
            &coordinator,
            Some(&policy),
            recoverable_now,
            &job,
            Duration::from_secs(5),
        )
    })
    .expect("inheritance release must run once Recoverable");

    let rk = steward_core::sign::randomized_verifying_key(&randomizer, &pkpkg);
    rk.verify(&sighash, &sig).expect("verifies against rk");
}

/// (DoD c) Nonces are single-use and stored per session: consuming one session's
/// nonces at round 2 destroys them (a replay fails) and never touches another
/// session's, and each round-1 mints fresh nonces.
#[test]
fn nonces_are_single_use_and_per_session() {
    let (pkpkg, guardians) = vault_2_of_3();
    let ids: Vec<Identifier> = pkpkg.verifying_shares().keys().copied().collect();

    // Two guardians drive the rounds directly (no transport) so we can inspect the
    // nonce store between steps.
    let mut g1 = Guardian::new(guardians[0].1.clone());
    let mut g2 = Guardian::new(guardians[1].1.clone());
    let id1 = *g1.identifier();
    let id2 = *g2.identifier();

    let sess_a = SessionId::new("A");
    let sess_b = SessionId::new("B");
    let sighash_a = [7u8; 32];
    let sighash_b = [9u8; 32];
    let randomizer = steward_core::sign::random_randomizer(&mut OsRng);
    let randomizer_le: [u8; 32] = randomizer.serialize().try_into().unwrap();

    // Round 1: session A on both guardians, session B on g1 as well.
    let c1a = commitments_of(g1.round1(&sess_a, sighash_a));
    let c2a = commitments_of(g2.round1(&sess_a, sighash_a));
    let c1b = commitments_of(g1.round1(&sess_b, sighash_b));

    // g1 holds two independent live nonce slots (A and B); g2 holds one.
    assert_eq!(g1.pending_count(), 2);
    assert_eq!(g2.pending_count(), 1);

    // Each round-1 mints fresh nonces: g1's A and B commitments differ.
    assert_ne!(
        serde_json::to_vec(&c1a).unwrap(),
        serde_json::to_vec(&c1b).unwrap(),
        "nonces must be freshly generated per session"
    );

    // Complete round 2 for session A.
    let mut commitments = BTreeMap::new();
    commitments.insert(id1, c1a);
    commitments.insert(id2, c2a);
    let pkg_a = steward_core::sign::signing_package(commitments, &sighash_a);

    g1.round2(&sess_a, &pkg_a, randomizer_le)
        .expect("g1 signs session A");
    g2.round2(&sess_a, &pkg_a, randomizer_le)
        .expect("g2 signs session A");

    // Session A nonces destroyed; g1's session B slot is untouched.
    assert_eq!(g1.pending_count(), 1);
    assert_eq!(g2.pending_count(), 0);

    // Replaying round 2 for session A fails — the nonces are gone (single-use).
    assert!(
        g1.round2(&sess_a, &pkg_a, randomizer_le).is_err(),
        "a second round-2 for the same session must fail (nonce reuse forbidden)"
    );

    // ids sanity: the guardians we picked are the two lowest identifiers.
    assert!(ids.contains(&id1) && ids.contains(&id2));
}
