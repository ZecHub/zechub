//! Increment-B end-to-end HTTP tests.
//!
//! Boots the axum coordinator on an ephemeral port and drives **real guardian
//! clients** ([`HttpTransport`], in OS threads) through a full re-randomized FROST
//! ceremony over HTTP — the exact same [`Guardian`] state machine as the in-process
//! tests, only the transport changed. Also exercises the control plane: a heartbeat
//! POST advances the deadline, and an `InheritanceRelease` is rejected with **403**
//! while `Active` and **succeeds** once the injected [`MockClock`] is past trip time.

use std::collections::BTreeSet;
use std::sync::Arc;
use std::thread::JoinHandle;
use std::time::{Duration, Instant};

use rand::{rngs::OsRng, RngCore};
use reqwest::blocking::Client;
use reqwest::StatusCode;
use serde::Deserialize;

use steward_core::keys::split_authority;
use steward_core::policy::HeartbeatPolicy;
use steward_core::redpallas::keys::{KeyPackage, PublicKeyPackage, SecretShare};
use steward_core::redpallas::rerandomized::Randomizer;
use steward_core::redpallas::{Identifier, Signature, SigningKey};

use steward_coordinator::http::{
    CreateSessionBody, CreateSessionResponse, CreateVaultBody, CreateVaultResponse, DemoVaultBody,
    DemoVaultResponse, HeartbeatBody, HeartbeatBulletin, HeartbeatResponse, PendingSessionOut,
    SessionMode, VaultStatus,
};
use steward_coordinator::{
    router, AppState, CeremonyPurpose, Guardian, HttpTransport, MockClock, ParticipantId, SessionId,
};

// --- vault setup -----------------------------------------------------------------

const LAST_HEARTBEAT: u64 = 1_000_000;
const INTERVAL: u64 = 30 * 86_400;
const GRACE: u64 = 7 * 86_400;
const ACTIVE_NOW: u64 = LAST_HEARTBEAT + 10 * 86_400; // < trip → Active
const RECOVERABLE_NOW: u64 = LAST_HEARTBEAT + 40 * 86_400; // >= trip → Recoverable

/// A 2-of-3 vault: the public key package + guardian (relay id, key package) pairs.
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

fn randomizer_le_hex(r: &Randomizer) -> String {
    let bytes: [u8; 32] = r.serialize().try_into().expect("randomizer is 32 bytes");
    hex::encode(bytes)
}

// --- guardian clients over HTTP --------------------------------------------------

/// Spawn `guardians` as real remote clients, each polling `session_id` over HTTP via
/// [`HttpTransport`]. Returns the join handles; join them after the ceremony.
fn spawn_guardians(
    base_url: &str,
    session_id: &str,
    guardians: Vec<(ParticipantId, KeyPackage)>,
) -> Vec<JoinHandle<()>> {
    guardians
        .into_iter()
        .map(|(pid, kp)| {
            let base = base_url.to_string();
            let session = session_id.to_string();
            std::thread::spawn(move || {
                let transport =
                    HttpTransport::new(base, pid).expect("build guardian HttpTransport");
                let mut guardian = Guardian::new(kp);
                // Generous idle timeout so the guardian outlasts the coordinator
                // starting the ceremony; it returns immediately after round 2.
                guardian
                    .run(&transport, &SessionId::new(session), Duration::from_secs(20))
                    .expect("guardian run loop");
            })
        })
        .collect()
}

/// Fire `POST /vault/:id/session` (blocks until the ceremony finishes) and return
/// the raw HTTP response.
fn propose_session(
    client: &Client,
    base_url: &str,
    vault_id: &str,
    body: &CreateSessionBody,
) -> reqwest::blocking::Response {
    client
        .post(format!("{base_url}/vault/{vault_id}/session"))
        .json(body)
        .send()
        .expect("session request")
}

// --- the test --------------------------------------------------------------------

#[tokio::test(flavor = "multi_thread", worker_threads = 4)]
async fn full_ceremony_and_policy_gate_over_http() {
    // --- boot the server on an ephemeral port with an injectable clock. ---
    let (pkpkg, guardians) = vault_2_of_3();
    let clock = MockClock::new(ACTIVE_NOW);
    let state = AppState::new(Arc::new(clock.clone()));

    let listener = tokio::net::TcpListener::bind("127.0.0.1:0")
        .await
        .expect("bind ephemeral port");
    let addr = listener.local_addr().expect("local addr");
    let base_url = format!("http://{addr}");
    tokio::spawn(async move {
        axum::serve(listener, router(state)).await.expect("serve");
    });

    // Public data the test keeps to independently verify signatures against `rk`.
    let pkpkg_for_verify = pkpkg.clone();

    // All blocking client work (control-plane reqwest + guardian OS threads) runs on
    // a blocking thread, off the async workers that serve the requests.
    let result = tokio::task::spawn_blocking(move || {
        let client = Client::new();

        // --- create the vault (public data only). ---
        let create = CreateVaultBody {
            threshold: 2,
            guardian_ids: guardians.iter().map(|(p, _)| p.0.clone()).collect(),
            public_key_package: pkpkg,
            // A heartbeat policy is present → an INHERITANCE vault (the switch is on).
            heartbeat: Some(HeartbeatPolicy {
                interval_secs: INTERVAL,
                grace_secs: GRACE,
                last_heartbeat: LAST_HEARTBEAT,
            }),
            network: None,
            heartbeat_pubkey: None, // omitted → coordinator mints a demo keypair, returns the secret
            heir: None,
            purpose: None,
            label: None,
        };
        let created: CreateVaultResponse = client
            .post(format!("{base_url}/vault"))
            .json(&create)
            .send()
            .expect("create vault")
            .error_for_status()
            .expect("vault created")
            .json()
            .expect("vault id");
        let vault_id = created.vault_id.clone();
        // The demo secret the coordinator returned (no pubkey was supplied) — used to sign a
        // real proof-of-life in step 4.
        let hb_secret = created
            .heartbeat_secret_hex
            .clone()
            .expect("coordinator generated a demo heartbeat secret when no pubkey was supplied");

        // Spawn only TWO of the three guardians → also proves drop-tolerance over HTTP.
        let online: Vec<(ParticipantId, KeyPackage)> = guardians.into_iter().take(2).collect();
        let invited: Vec<String> = ["g1", "g2", "g3"].iter().map(|s| s.to_string()).collect();

        // ============================================================
        // 1. Happy path: NormalSpend, full ceremony over HTTP.
        // ============================================================
        let sighash = random_sighash();
        let randomizer = steward_core::sign::random_randomizer(&mut OsRng);
        let normal_sig = {
            let session_id = "sess-normal";
            let handles = spawn_guardians(&base_url, session_id, online.clone());
            let body = CreateSessionBody {
                session_id: Some(session_id.to_string()),
                purpose: steward_coordinator::CeremonyPurpose::NormalSpend,
                sighash_hex: hex::encode(sighash),
                randomizer_hex: randomizer_le_hex(&randomizer),
                participants: Some(invited.clone()),
                timeout_ms: Some(15_000),
                mode: SessionMode::Auto,
                amount: None,
                recipient: None,
            };
            let resp = propose_session(&client, &base_url, &vault_id, &body);
            let status = resp.status();
            let parsed: CreateSessionResponse = resp.json().expect("session response json");
            for h in handles {
                h.join().expect("guardian thread");
            }
            assert_eq!(status, StatusCode::OK, "normal spend must succeed");
            (sighash, randomizer, parsed.signature_hex)
        };

        // ============================================================
        // 2. InheritanceRelease REJECTED (403) while Active.
        //    Gate fires before any transport activity → no guardians needed.
        // ============================================================
        {
            let body = CreateSessionBody {
                session_id: Some("sess-active".to_string()),
                purpose: steward_coordinator::CeremonyPurpose::InheritanceRelease,
                sighash_hex: hex::encode(random_sighash()),
                randomizer_hex: randomizer_le_hex(&steward_core::sign::random_randomizer(
                    &mut OsRng,
                )),
                participants: Some(invited.clone()),
                timeout_ms: Some(2_000),
                mode: SessionMode::Auto,
                amount: None,
                recipient: None,
            };
            let resp = propose_session(&client, &base_url, &vault_id, &body);
            assert_eq!(
                resp.status(),
                StatusCode::FORBIDDEN,
                "inheritance release must be 403 while the dead-man's-switch is Active"
            );
        }

        // ============================================================
        // 3. InheritanceRelease SUCCEEDS once the clock is past trip time.
        // ============================================================
        clock.set(RECOVERABLE_NOW);
        let inh_sighash = random_sighash();
        let inh_randomizer = steward_core::sign::random_randomizer(&mut OsRng);
        let inh_sig = {
            let session_id = "sess-recoverable";
            let handles = spawn_guardians(&base_url, session_id, online.clone());
            let body = CreateSessionBody {
                session_id: Some(session_id.to_string()),
                purpose: steward_coordinator::CeremonyPurpose::InheritanceRelease,
                sighash_hex: hex::encode(inh_sighash),
                randomizer_hex: randomizer_le_hex(&inh_randomizer),
                participants: Some(invited.clone()),
                timeout_ms: Some(15_000),
                mode: SessionMode::Auto,
                amount: None,
                recipient: None,
            };
            let resp = propose_session(&client, &base_url, &vault_id, &body);
            let status = resp.status();
            let parsed: CreateSessionResponse = resp.json().expect("session response json");
            for h in handles {
                h.join().expect("guardian thread");
            }
            assert_eq!(
                status,
                StatusCode::OK,
                "inheritance release must succeed once Recoverable"
            );
            (inh_sighash, inh_randomizer, parsed.signature_hex)
        };

        // ============================================================
        // 4. Heartbeat POST advances the deadline.
        // ============================================================
        let before: VaultStatus = client
            .get(format!("{base_url}/vault/{vault_id}"))
            .send()
            .expect("status")
            .json()
            .expect("status json");
        // An inheritance vault reports its trip time; unwrap it for the deadline comparison.
        let trip_before = before.trip_at.expect("inheritance vault has a trip time");

        // Sign a REAL proof-of-life at the (mock) recoverable time and post it. RECOVERABLE_NOW
        // is strictly newer than the create-time heartbeat, so it advances the switch and, being
        // the fresh last-heartbeat, resets the vault to Active.
        let hb_sk = steward_core::heartbeat::decode_secret(&hb_secret).expect("secret hex");
        let hb_body = HeartbeatBody {
            time: RECOVERABLE_NOW,
            sig_hex: hex::encode(steward_core::heartbeat::sign_heartbeat(
                &hb_sk,
                &vault_id,
                RECOVERABLE_NOW,
            )),
        };
        let hb: HeartbeatResponse = client
            .post(format!("{base_url}/vault/{vault_id}/heartbeat"))
            .json(&hb_body)
            .send()
            .expect("heartbeat")
            .error_for_status()
            .expect("heartbeat ok")
            .json()
            .expect("heartbeat json");

        (normal_sig, inh_sig, trip_before, hb)
    })
    .await
    .expect("client orchestration");

    let ((n_sighash, n_rand, n_sig_hex), (i_sighash, i_rand, i_sig_hex), trip_before, hb) = result;

    // --- independently verify BOTH aggregated signatures against rk = ak + [α]G. ---
    verify_against_rk(&pkpkg_for_verify, &n_rand, &n_sighash, &n_sig_hex, "normal spend");
    verify_against_rk(
        &pkpkg_for_verify,
        &i_rand,
        &i_sighash,
        &i_sig_hex,
        "inheritance release",
    );

    // --- the heartbeat advanced the deadline (owner proof-of-life). ---
    assert!(
        hb.trip_at > trip_before,
        "heartbeat must advance the deadline: {} !> {}",
        hb.trip_at,
        trip_before
    );
    // last_heartbeat was set to the server's `now` (the injected recoverable time)...
    assert_eq!(hb.last_heartbeat, RECOVERABLE_NOW);
    // ...so the switch reset to Active.
    assert_eq!(hb.state, steward_core::policy::VaultState::Active);
}

/// Deserialize a hex signature and assert it verifies against the randomized key
/// `rk` (and NOT the plain group key) — the on-chain-usability check.
fn verify_against_rk(
    pkpkg: &PublicKeyPackage,
    randomizer: &Randomizer,
    sighash: &[u8; 32],
    sig_hex: &str,
    label: &str,
) {
    let bytes = hex::decode(sig_hex).expect("signature hex");
    let sig = Signature::deserialize(&bytes).expect("deserialize signature");
    let rk = steward_core::sign::randomized_verifying_key(randomizer, pkpkg);
    rk.verify(sighash, &sig)
        .unwrap_or_else(|_| panic!("{label}: signature must verify against rk"));
    assert!(
        pkpkg.verifying_key().verify(sighash, &sig).is_err(),
        "{label}: signature must NOT verify against the un-randomized group key"
    );
}

// =================================================================================
// Relay-mode (`mode: "relay"`) end-to-end — the EXACT flow the browser guardian uses
// =================================================================================
//
// A demo vault is seeded (the browser guardian's enrollment source: `shares_json`),
// then a `mode: "relay"` ceremony is proposed. Real remote guardians ([`HttpTransport`]
// in OS threads) DISCOVER the request via `GET /vault/:id/pending` — never told the
// session id up front — and co-sign over the relay. Proves: discovery, co-sign, the
// returned signature verifies vs `rk`, `approvals` rises on the seal, and the 408
// timeout + `/pending` clean-up paths. `auto` mode is untouched (tested above).

/// One element of a demo vault's `shares_json` — mirrors the coordinator's private
/// `DemoShareOut`. This is exactly what a browser guardian loads at enrollment: its
/// own `{ guardian_id, secret_share }` entry.
#[derive(Deserialize)]
struct DemoShareIn {
    guardian_id: String,
    secret_share: SecretShare,
}

/// What a relay guardian observed when it discovered its request via `/pending`, plus
/// whether it then co-signed.
struct Discovery {
    discovered: bool,
    co_signed: bool,
    invited_len: usize,
    headline: String,
    heir: Option<String>,
    amount: Option<String>,
}

/// Drain the open relay-mode sessions a vault is advertising.
fn fetch_pending(client: &Client, base_url: &str, vault_id: &str) -> Vec<PendingSessionOut> {
    client
        .get(format!("{base_url}/vault/{vault_id}/pending"))
        .send()
        .and_then(|r| r.error_for_status())
        .and_then(|r| r.json::<Vec<PendingSessionOut>>())
        .unwrap_or_default()
}

/// A real remote guardian, driven exactly as the browser will: POLL
/// `GET /vault/:id/pending` until a request invites it, then run the FROST state
/// machine over [`HttpTransport`] for the *discovered* `session_id`.
fn spawn_relay_guardian(
    base_url: &str,
    vault_id: &str,
    guardian_id: String,
    key_package: KeyPackage,
    run_timeout: Duration,
) -> JoinHandle<Discovery> {
    let base = base_url.to_string();
    let vid = vault_id.to_string();
    std::thread::spawn(move || {
        let client = Client::new();
        // --- Discover: poll /pending until a session invites us. ---
        let deadline = Instant::now() + Duration::from_secs(15);
        let mut found: Option<(String, Discovery)> = None;
        while Instant::now() < deadline {
            if let Some(s) = fetch_pending(&client, &base, &vid)
                .into_iter()
                .find(|s| s.invited.iter().any(|g| g == &guardian_id))
            {
                found = Some((
                    s.session_id.clone(),
                    Discovery {
                        discovered: true,
                        co_signed: false,
                        invited_len: s.invited.len(),
                        headline: s.display.headline.clone(),
                        heir: s.display.heir.clone(),
                        amount: s.display.amount.clone(),
                    },
                ));
                break;
            }
            std::thread::sleep(Duration::from_millis(60));
        }
        let (session_id, mut disc) = match found {
            Some(x) => x,
            None => {
                return Discovery {
                    discovered: false,
                    co_signed: false,
                    invited_len: 0,
                    headline: String::new(),
                    heir: None,
                    amount: None,
                }
            }
        };
        // --- Co-sign the discovered session over the relay (same state machine as auto). ---
        let transport = HttpTransport::new(base, ParticipantId::new(guardian_id))
            .expect("build guardian HttpTransport");
        let mut guardian = Guardian::new(key_package);
        disc.co_signed = guardian
            .run(&transport, &SessionId::new(session_id), run_timeout)
            .is_ok();
        disc
    })
}

#[tokio::test(flavor = "multi_thread", worker_threads = 4)]
async fn relay_mode_ceremony_with_real_guardians_over_http() {
    // NormalSpend / SocialRecoverySweep are owner-authorized (allowed regardless of
    // the switch), so a plain Active clock suffices.
    let clock = MockClock::new(1_000_000);
    let state = AppState::new(Arc::new(clock));

    let listener = tokio::net::TcpListener::bind("127.0.0.1:0")
        .await
        .expect("bind ephemeral port");
    let addr = listener.local_addr().expect("local addr");
    let base_url = format!("http://{addr}");
    tokio::spawn(async move {
        axum::serve(listener, router(state)).await.expect("serve");
    });

    let result = tokio::task::spawn_blocking(move || {
        let client = Client::new();

        // --- Seed a DEMO vault: the browser guardian's enrollment source. ---
        let seed: DemoVaultResponse = client
            .post(format!("{base_url}/demo/vault"))
            .json(&DemoVaultBody {
                threshold: 2,
                n: 3,
                guardian_names: vec!["Amara".into(), "Bjorn".into(), "Chen".into()],
                // interval + grace present → an INHERITANCE demo vault.
                interval_secs: Some(30 * 86_400),
                grace_secs: Some(7 * 86_400),
                heir: Some("u1heir9orchard7demoreceiver".into()),
                network: None,
                heartbeat_pubkey: None,
                purpose: None,
                label: None,
            })
            .send()
            .expect("seed demo vault")
            .error_for_status()
            .expect("demo vault created")
            .json()
            .expect("demo vault response");
        let vault_id = seed.vault_id.clone();

        // Parse shares_json exactly as a guardian app does, and reconstruct the group
        // public key package from the shares' commitment so we can verify vs rk.
        let parsed: Vec<DemoShareIn> =
            serde_json::from_str(&seed.shares_json).expect("parse shares_json");
        assert_eq!(parsed.len(), 3, "a 3-guardian demo vault yields 3 shares");
        let ids: BTreeSet<Identifier> =
            parsed.iter().map(|s| *s.secret_share.identifier()).collect();
        let pkpkg = PublicKeyPackage::from_commitment(&ids, parsed[0].secret_share.commitment())
            .expect("reconstruct public key package from the shares' commitment");
        let key_package = |gid: &str| -> KeyPackage {
            let s = parsed
                .iter()
                .find(|s| s.guardian_id == gid)
                .expect("share for guardian");
            KeyPackage::try_from(s.secret_share.clone()).expect("key package")
        };

        // =====================================================================
        // Scenario A — happy path: 2 of 3 guardians discover + co-sign → verified sig.
        // =====================================================================
        let a_sighash = random_sighash();
        let a_randomizer = steward_core::sign::random_randomizer(&mut OsRng);
        let (a_status, a_body, a_disc, a_cleared) = {
            // Two come online; the third never polls (drop-tolerant over HTTP).
            let g1 = spawn_relay_guardian(
                &base_url,
                &vault_id,
                seed.guardian_ids[0].clone(),
                key_package(&seed.guardian_ids[0]),
                Duration::from_secs(20),
            );
            let g2 = spawn_relay_guardian(
                &base_url,
                &vault_id,
                seed.guardian_ids[1].clone(),
                key_package(&seed.guardian_ids[1]),
                Duration::from_secs(20),
            );

            let body = CreateSessionBody {
                session_id: None, // minted by the server; guardians DISCOVER it via /pending
                purpose: CeremonyPurpose::SocialRecoverySweep,
                sighash_hex: hex::encode(a_sighash),
                randomizer_hex: randomizer_le_hex(&a_randomizer),
                participants: Some(seed.guardian_ids.clone()),
                timeout_ms: Some(20_000),
                mode: SessionMode::Relay,
                amount: Some("10 ZEC".into()),
                recipient: Some("utest1payee-recovery".into()),
            };
            let resp = client
                .post(format!("{base_url}/vault/{vault_id}/session"))
                .json(&body)
                .send()
                .expect("relay session request");
            let status = resp.status();
            let body_text = resp.text().unwrap_or_default();
            let disc = vec![g1.join().expect("g1 thread"), g2.join().expect("g2 thread")];
            let cleared = fetch_pending(&client, &base_url, &vault_id).is_empty();
            (status, body_text, disc, cleared)
        };

        // =====================================================================
        // Scenario B — only 1 of 2 required guardians online: /pending advertises
        // the request with a rising approval, then the ceremony times out (408).
        // =====================================================================
        let (b_status, b_saw, b_max_approvals, b_disc, b_cleared) = {
            let g = spawn_relay_guardian(
                &base_url,
                &vault_id,
                seed.guardian_ids[2].clone(),
                key_package(&seed.guardian_ids[2]),
                Duration::from_secs(4),
            );

            let body = CreateSessionBody {
                session_id: None,
                purpose: CeremonyPurpose::NormalSpend,
                sighash_hex: hex::encode(random_sighash()),
                randomizer_hex: randomizer_le_hex(&steward_core::sign::random_randomizer(
                    &mut OsRng,
                )),
                participants: Some(seed.guardian_ids.clone()),
                timeout_ms: Some(2_500), // short: quorum can't be met with 1 of 2
                mode: SessionMode::Relay,
                amount: Some("0.25 ZEC".into()),
                recipient: None,
            };
            // Propose on its own thread so we can watch /pending while it blocks.
            let propose = {
                let client = client.clone();
                let base = base_url.clone();
                let vid = vault_id.clone();
                std::thread::spawn(move || {
                    client
                        .post(format!("{base}/vault/{vid}/session"))
                        .json(&body)
                        .send()
                        .expect("relay session request")
                        .status()
                })
            };

            // Watch /pending until the ceremony resolves: record the shape + max approvals.
            let mut saw: Option<PendingSessionOut> = None;
            let mut max_approvals = 0usize;
            while !propose.is_finished() {
                if let Some(s) = fetch_pending(&client, &base_url, &vault_id).into_iter().next() {
                    max_approvals = max_approvals.max(s.approvals);
                    saw = Some(s);
                }
                std::thread::sleep(Duration::from_millis(25));
            }
            let status = propose.join().expect("propose thread");
            let disc = g.join().expect("guardian thread");
            let cleared = fetch_pending(&client, &base_url, &vault_id).is_empty();
            (status, saw, max_approvals, disc, cleared)
        };

        (
            (a_status, a_body, a_sighash, a_randomizer, a_disc, a_cleared),
            (b_status, b_saw, b_max_approvals, b_disc, b_cleared),
            pkpkg,
        )
    })
    .await
    .expect("client orchestration");

    let (
        (a_status, a_body, a_sighash, a_randomizer, a_disc, a_cleared),
        (b_status, b_saw, b_max_approvals, b_disc, b_cleared),
        pkpkg,
    ) = result;

    // --- Scenario A: quorum reached over the relay → verified signature. ---
    assert_eq!(
        a_status,
        StatusCode::OK,
        "relay-mode quorum must return 200; body: {a_body}"
    );
    let a_parsed: CreateSessionResponse =
        serde_json::from_str(&a_body).expect("session response json");
    for d in &a_disc {
        assert!(d.discovered, "each guardian must discover the request via /pending");
        assert!(d.co_signed, "each guardian must co-sign the discovered session");
        assert_eq!(d.invited_len, 3, "all three guardians are invited");
        assert_eq!(d.headline, "Recover the vault to a new owner address");
        assert_eq!(d.heir.as_deref(), Some("u1heir9orchard7demoreceiver"));
        assert_eq!(d.amount.as_deref(), Some("10 ZEC"));
    }
    // The signature the browsers would broadcast verifies against rk = ak + [α]G.
    verify_against_rk(
        &pkpkg,
        &a_randomizer,
        &a_sighash,
        &a_parsed.signature_hex,
        "relay social-recovery sweep",
    );
    assert!(
        a_cleared,
        "the pending session must be cleared once the ceremony resolves"
    );

    // --- Scenario B: /pending shape + rising approvals, then a 408 timeout. ---
    assert_eq!(
        b_status,
        StatusCode::REQUEST_TIMEOUT,
        "a 1-of-2 relay ceremony must time out with 408"
    );
    let seen = b_saw.expect("/pending must advertise the open request");
    assert_eq!(seen.invited.len(), 3);
    assert_eq!(seen.purpose, CeremonyPurpose::NormalSpend);
    assert_eq!(seen.display.headline, "Authorize a payment from the vault");
    assert_eq!(seen.display.amount.as_deref(), Some("0.25 ZEC"));
    assert!(
        b_max_approvals >= 1,
        "the lone guardian's commitment must light an approval arc (best-effort seal UX)"
    );
    assert!(b_disc.discovered, "the guardian discovered the request via /pending");
    assert!(
        b_cleared,
        "the timed-out session must be cleared from /pending"
    );
}

// =================================================================================
// The guardian's INDEPENDENT inheritance gate — the keystone of the trustless switch
// =================================================================================
//
// This is exactly what `web/guardian` does before it will arm an `InheritanceRelease`: it
// never trusts the coordinator's `state` flag. It fetches the signed heartbeat bulletin,
// re-verifies the Ed25519 signature ITSELF over the canonical message, and computes
// `is_lapsed` against the owner's own signed timestamp on its own clock. This test drives the
// real HTTP endpoints and runs the guardian's decision through `steward_core::heartbeat` — the
// same crypto the browser mirrors with `@noble/ed25519`.

#[tokio::test(flavor = "multi_thread", worker_threads = 4)]
async fn guardian_independently_gates_release_on_signed_heartbeat() {
    use steward_core::heartbeat;

    const T0: u64 = 2_000_000; // the owner's signed proof-of-life
    const IV: u64 = 30 * 86_400;
    const GR: u64 = 7 * 86_400;

    let clock = MockClock::new(T0);
    let state = AppState::new(Arc::new(clock.clone()));
    let listener = tokio::net::TcpListener::bind("127.0.0.1:0")
        .await
        .expect("bind ephemeral port");
    let addr = listener.local_addr().expect("local addr");
    let base_url = format!("http://{addr}");
    tokio::spawn(async move {
        axum::serve(listener, router(state)).await.expect("serve");
    });

    let (pkpkg, _guardians) = vault_2_of_3();

    let (bulletin, forged_status, unsigned_status) = tokio::task::spawn_blocking(move || {
        let client = Client::new();

        // Create a vault with NO supplied pubkey → the coordinator mints a demo keypair and
        // hands back the secret the OWNER will sign with. Anchor the initial bulletin at T0-1.
        let created: CreateVaultResponse = client
            .post(format!("{base_url}/vault"))
            .json(&CreateVaultBody {
                threshold: 2,
                guardian_ids: vec!["g1".into(), "g2".into(), "g3".into()],
                public_key_package: pkpkg,
                heartbeat: Some(HeartbeatPolicy {
                    interval_secs: IV,
                    grace_secs: GR,
                    last_heartbeat: T0 - 1,
                }),
                network: None,
                heartbeat_pubkey: None,
                heir: None,
                purpose: None,
                label: None,
            })
            .send()
            .expect("create vault")
            .error_for_status()
            .expect("vault created")
            .json()
            .expect("vault json");
        let vault_id = created.vault_id.clone();
        let sk = heartbeat::decode_secret(
            &created
                .heartbeat_secret_hex
                .expect("coordinator returned the demo heartbeat secret"),
        )
        .expect("secret hex");

        // OWNER posts a real signed proof-of-life at T0.
        let good_sig = hex::encode(heartbeat::sign_heartbeat(&sk, &vault_id, T0));
        let good = client
            .post(format!("{base_url}/vault/{vault_id}/heartbeat"))
            .json(&HeartbeatBody {
                time: T0,
                sig_hex: good_sig,
            })
            .send()
            .expect("post heartbeat")
            .status();
        assert_eq!(good, StatusCode::OK, "a valid signed heartbeat is accepted");

        // A MALICIOUS RELAY tries to FORGE liveness far in the future with a bogus signature.
        // Without the owner's key it cannot produce a passing signature → rejected (400).
        let forged = client
            .post(format!("{base_url}/vault/{vault_id}/heartbeat"))
            .json(&HeartbeatBody {
                time: T0 + IV + GR + 10_000,
                sig_hex: "aa".repeat(64),
            })
            .send()
            .expect("post forged heartbeat")
            .status();

        // And an entirely unsigned heartbeat (empty body) is a 4xx — there is no "just trust
        // me" path (serde rejects the missing fields with 422 Unprocessable Entity).
        let unsigned = client
            .post(format!("{base_url}/vault/{vault_id}/heartbeat"))
            .json(&serde_json::json!({}))
            .send()
            .expect("post unsigned heartbeat")
            .status();

        // GUARDIAN fetches the bulletin it will independently verify.
        let bulletin: HeartbeatBulletin = client
            .get(format!("{base_url}/vault/{vault_id}/heartbeat"))
            .send()
            .expect("get bulletin")
            .error_for_status()
            .expect("bulletin ok")
            .json()
            .expect("bulletin json");

        (bulletin, forged, unsigned)
    })
    .await
    .expect("client orchestration");

    // --- the relay could not forge/fake a heartbeat without the owner's key. ---
    assert_eq!(
        forged_status,
        StatusCode::BAD_REQUEST,
        "a forged (bad-signature) heartbeat must be rejected — the relay cannot forge liveness"
    );
    assert!(
        unsigned_status.is_client_error(),
        "an unsigned heartbeat must be rejected (no just-trust-me path); got {unsigned_status}"
    );

    // --- GUARDIAN-SIDE decision (mirrors web/guardian's @noble/ed25519 verify + is_lapsed). ---
    let time = bulletin.time.expect("a signed heartbeat is on record");
    let sig_hex = bulletin.sig_hex.clone().expect("a signature is on record");
    assert_eq!(time, T0, "the bulletin carries the owner's signed timestamp");

    // 1. Verify the signature INDEPENDENTLY over the canonical message.
    assert!(
        heartbeat::verify_heartbeat_hex(&bulletin.pubkey_hex, &bulletin.vault_id, time, &sig_hex),
        "the guardian verifies the owner's signed heartbeat itself"
    );

    // 2. With a recent signed heartbeat, the switch has NOT lapsed → the guardian REFUSES to
    //    arm, no matter what a relay's `state` flag claims. `is_lapsed` is strict `>`, so even
    //    exactly at the deadline it is not yet armed.
    let deadline = time + bulletin.interval_secs + bulletin.grace_secs;
    assert!(
        !heartbeat::is_lapsed(time, bulletin.interval_secs, bulletin.grace_secs, time + 5),
        "well inside the window: not lapsed → guardian refuses"
    );
    assert!(
        !heartbeat::is_lapsed(time, bulletin.interval_secs, bulletin.grace_secs, deadline),
        "exactly at the deadline: not yet lapsed → guardian still refuses"
    );

    // 3. Only once now passes the SIGNED time + interval + grace does the guardian arm — judged
    //    from the signature, never the server flag.
    assert!(
        heartbeat::is_lapsed(time, bulletin.interval_secs, bulletin.grace_secs, deadline + 1),
        "one second past the deadline (by the signed time) → guardian arms"
    );

    // 4. A relay that flips the bulletin's timestamp to fabricate a lapse fails the guardian's
    //    own verification — it cannot move a signed timestamp.
    assert!(
        !heartbeat::verify_heartbeat_hex(
            &bulletin.pubkey_hex,
            &bulletin.vault_id,
            time + 999_999,
            &sig_hex
        ),
        "a relay cannot forge a different signed timestamp; the guardian's verify rejects it"
    );
}

// =================================================================================
// A PLAIN MULTISIG vault (the dead-man's-switch turned OFF) — proves the multisig claim
// =================================================================================
//
// The non-inheritance presets (DAO/Treasury, Family, Personal cold vault) create a plain
// t-of-n multisig: no heartbeat, no heir, no inheritance release. This drives that shape
// end-to-end over HTTP: create with NO cadence → GET /vault shows `inheritance_enabled=false`
// with null heartbeat fields; POST /heartbeat is 400; an InheritanceRelease is 400; but a
// SocialRecoverySweep ceremony STILL co-signs a real, rk-verified 64-byte signature (the
// plain-multisig spend/move is always owner-authorized — the whole point of the claim).

#[tokio::test(flavor = "multi_thread", worker_threads = 4)]
async fn plain_multisig_vault_has_no_switch_but_still_co_signs() {
    let clock = MockClock::new(1_000_000);
    let state = AppState::new(Arc::new(clock));

    let listener = tokio::net::TcpListener::bind("127.0.0.1:0")
        .await
        .expect("bind ephemeral port");
    let addr = listener.local_addr().expect("local addr");
    let base_url = format!("http://{addr}");
    tokio::spawn(async move {
        axum::serve(listener, router(state)).await.expect("serve");
    });

    let (status_body, hb_status, inh_status, sweep_sighash, sweep_rand, sweep_sig, pkpkg) =
        tokio::task::spawn_blocking(move || {
            let client = Client::new();

            // --- Seed a DAO/Treasury vault: 3-of-5, NO interval/grace → plain multisig. ---
            let seed: DemoVaultResponse = client
                .post(format!("{base_url}/demo/vault"))
                .json(&DemoVaultBody {
                    threshold: 3,
                    n: 5,
                    guardian_names: vec![
                        "Amara".into(),
                        "Bjorn".into(),
                        "Chen".into(),
                        "Dara".into(),
                        "Esi".into(),
                    ],
                    interval_secs: None, // no dead-man's-switch
                    grace_secs: None,
                    heir: None,
                    network: None,
                    heartbeat_pubkey: None,
                    purpose: Some("treasury".into()),
                    label: Some("DAO ops treasury".into()),
                })
                .send()
                .expect("seed demo vault")
                .error_for_status()
                .expect("demo vault created")
                .json()
                .expect("demo vault response");
            let vault_id = seed.vault_id.clone();

            // Reconstruct the group public key package from the shares (to verify vs rk later).
            let parsed: Vec<DemoShareIn> =
                serde_json::from_str(&seed.shares_json).expect("parse shares_json");
            let ids: BTreeSet<Identifier> =
                parsed.iter().map(|s| *s.secret_share.identifier()).collect();
            let pkpkg =
                PublicKeyPackage::from_commitment(&ids, parsed[0].secret_share.commitment())
                    .expect("reconstruct public key package");

            // --- GET /vault/:id → the plain-multisig shape (null switch fields). ---
            let status_body = client
                .get(format!("{base_url}/vault/{vault_id}"))
                .send()
                .expect("status")
                .text()
                .unwrap_or_default();

            // --- POST /heartbeat → 400: there is no switch to beat. ---
            let hb_status = client
                .post(format!("{base_url}/vault/{vault_id}/heartbeat"))
                .json(&HeartbeatBody {
                    time: 2_000_000,
                    sig_hex: "aa".repeat(64),
                })
                .send()
                .expect("heartbeat")
                .status();

            // --- InheritanceRelease → 400: there is no inheritance policy. ---
            let inh_status = client
                .post(format!("{base_url}/vault/{vault_id}/session"))
                .json(&CreateSessionBody {
                    session_id: Some("ms-inh".into()),
                    purpose: CeremonyPurpose::InheritanceRelease,
                    sighash_hex: hex::encode(random_sighash()),
                    randomizer_hex: randomizer_le_hex(&steward_core::sign::random_randomizer(
                        &mut OsRng,
                    )),
                    participants: Some(seed.guardian_ids.clone()),
                    timeout_ms: Some(2_000),
                    mode: SessionMode::Auto,
                    amount: None,
                    recipient: None,
                })
                .send()
                .expect("inheritance session")
                .status();

            // --- SocialRecoverySweep (auto) → 200 + a real co-signed signature. ---
            let sweep_sighash = random_sighash();
            let sweep_rand = steward_core::sign::random_randomizer(&mut OsRng);
            let resp = client
                .post(format!("{base_url}/vault/{vault_id}/session"))
                .json(&CreateSessionBody {
                    session_id: Some("ms-sweep".into()),
                    purpose: CeremonyPurpose::SocialRecoverySweep,
                    sighash_hex: hex::encode(sweep_sighash),
                    randomizer_hex: randomizer_le_hex(&sweep_rand),
                    participants: Some(seed.guardian_ids.clone()),
                    timeout_ms: Some(15_000),
                    mode: SessionMode::Auto,
                    amount: None,
                    recipient: None,
                })
                .send()
                .expect("sweep session");
            let sweep_status = resp.status();
            let sweep_body = resp.text().unwrap_or_default();
            assert_eq!(
                sweep_status,
                StatusCode::OK,
                "a plain-multisig sweep must still co-sign; body: {sweep_body}"
            );
            let sweep: CreateSessionResponse =
                serde_json::from_str(&sweep_body).expect("sweep response json");

            (
                status_body,
                hb_status,
                inh_status,
                sweep_sighash,
                sweep_rand,
                sweep.signature_hex,
                pkpkg,
            )
        })
        .await
        .expect("client orchestration");

    // --- GET /vault: no dead-man's-switch, no heir, purpose surfaced. ---
    let status: VaultStatus = serde_json::from_str(&status_body).expect("status json");
    assert!(
        !status.inheritance_enabled,
        "a plain multisig vault reports inheritance_enabled=false"
    );
    assert_eq!(status.purpose, "treasury");
    assert!(status.state.is_none(), "state is null for a plain multisig vault");
    assert!(
        status.trip_at.is_none() && status.interval_secs.is_none() && status.grace_secs.is_none(),
        "all switch fields are null for a plain multisig vault"
    );
    assert!(status.heir.is_none(), "a plain multisig vault records no heir");
    assert_eq!(status.threshold, 3);
    assert_eq!(status.guardians.len(), 5);

    // --- heartbeat + inheritance release are BOTH refused with 400. ---
    assert_eq!(
        hb_status,
        StatusCode::BAD_REQUEST,
        "a plain multisig vault has no heartbeats to record"
    );
    assert_eq!(
        inh_status,
        StatusCode::BAD_REQUEST,
        "a plain multisig vault has no inheritance release"
    );

    // --- but the SWEEP produced a REAL signature that verifies against rk = ak + [α]G. ---
    assert_eq!(sweep_sig.len(), 128, "a real 64-byte RedPallas signature (128 hex)");
    verify_against_rk(
        &pkpkg,
        &sweep_rand,
        &sweep_sighash,
        &sweep_sig,
        "plain-multisig social-recovery sweep",
    );
}

/// The real fund-moving `POST /vault/:id/release` (inheritance sweep-to-heir) must refuse, at the
/// HTTP boundary and BEFORE it ever touches the signer, three cases: a still-active inheritance
/// vault (403 — the dead-man's-switch has not tripped), an inheritance vault with no heir address
/// (400 — nothing to release to), and a plain multisig vault with no switch at all (400). This
/// pins the endpoint's authorization gates independently of the (unavailable-in-CI) signer.
#[tokio::test]
async fn release_endpoint_authz_gates() {
    let (pkpkg, guardians) = vault_2_of_3();
    let clock = MockClock::new(ACTIVE_NOW); // switch NOT tripped
    let state = AppState::new(Arc::new(clock));
    let listener = tokio::net::TcpListener::bind("127.0.0.1:0")
        .await
        .expect("bind ephemeral port");
    let base_url = format!("http://{}", listener.local_addr().expect("local addr"));
    tokio::spawn(async move {
        axum::serve(listener, router(state)).await.expect("serve");
    });

    let guardian_ids: Vec<String> = guardians.iter().map(|(p, _)| p.0.clone()).collect();

    tokio::task::spawn_blocking(move || {
        let client = Client::new();
        let inheritance = |heir: Option<String>| CreateVaultBody {
            threshold: 2,
            guardian_ids: guardian_ids.clone(),
            public_key_package: pkpkg.clone(),
            heartbeat: Some(HeartbeatPolicy {
                interval_secs: INTERVAL,
                grace_secs: GRACE,
                last_heartbeat: LAST_HEARTBEAT,
            }),
            network: None,
            heartbeat_pubkey: None,
            heir,
            purpose: None,
            label: None,
        };
        let create = |body: &CreateVaultBody| -> String {
            client
                .post(format!("{base_url}/vault"))
                .json(body)
                .send()
                .expect("create vault")
                .error_for_status()
                .expect("vault created")
                .json::<CreateVaultResponse>()
                .expect("vault id")
                .vault_id
        };
        let release = |vault_id: &str| {
            client
                .post(format!("{base_url}/vault/{vault_id}/release"))
                .json(&serde_json::json!({ "mode": "auto" }))
                .send()
                .expect("release request")
                .status()
        };

        // (a) inheritance vault WITH a heir, but still Active → 403.
        let active = create(&inheritance(Some("u1heir9orchard7demoreceiver".into())));
        assert_eq!(
            release(&active),
            StatusCode::FORBIDDEN,
            "release must be 403 while the dead-man's-switch is Active"
        );

        // (b) inheritance vault with NO heir recorded → 400.
        let no_heir = create(&inheritance(None));
        assert_eq!(
            release(&no_heir),
            StatusCode::BAD_REQUEST,
            "release must be 400 when no heir address is recorded"
        );

        // (c) plain multisig vault (no heartbeat → no switch) → 400.
        let mut plain = inheritance(None);
        plain.heartbeat = None;
        let plain_id = create(&plain);
        assert_eq!(
            release(&plain_id),
            StatusCode::BAD_REQUEST,
            "release must be 400 on a plain multisig vault (no inheritance policy)"
        );
    })
    .await
    .expect("blocking client work");
}
