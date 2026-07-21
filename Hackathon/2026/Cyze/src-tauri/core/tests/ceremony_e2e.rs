//! End-to-end ceremony tests against a real frostd instance.
//!
//! Spawns the sidecar frostd binary with a freshly generated self-signed
//! certificate, then runs full DKG and signing ceremonies between three
//! in-process participants, for both ciphersuites.
//!
//! Skipped (with a message) if the sidecar binary hasn't been built yet
//! (`scripts/build-sidecar.sh`).

use std::process::{Child, Command};
use std::time::Duration;

use frost_app_core::ciphersuite::Suite;
use frost_app_core::dkg::{run_dkg, DkgParams};
use frost_app_core::signing::{
    run_coordinator, run_participant, CoordinatorParams, ParticipantParams,
};
use frost_app_core::tls;
use frost_app_core::transport::{FrostdClient, ServerTrust};
use frost_client::cipher::{Cipher, PrivateKey};
use frost_client::api::PublicKey;
use tokio::sync::{mpsc, oneshot};
use tokio_util::sync::CancellationToken;

struct TestServer {
    child: Child,
    port: u16,
    cert_pem: String,
    _dir: tempfile::TempDir,
}

impl Drop for TestServer {
    fn drop(&mut self) {
        let _ = self.child.kill();
        let _ = self.child.wait();
    }
}

fn frostd_path() -> Option<std::path::PathBuf> {
    let triple = "x86_64-unknown-linux-gnu";
    let path = std::path::Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("..")
        .join("binaries")
        .join(format!("frostd-{triple}"));
    path.exists().then_some(path)
}

fn free_port() -> u16 {
    std::net::TcpListener::bind("127.0.0.1:0")
        .unwrap()
        .local_addr()
        .unwrap()
        .port()
}

async fn start_server() -> Option<TestServer> {
    let frostd = frostd_path()?;
    let dir = tempfile::tempdir().unwrap();
    let cert = tls::generate_self_signed(&[]).unwrap();
    let cert_path = dir.path().join("cert.pem");
    let key_path = dir.path().join("key.pem");
    tls::write_cert_files(&cert, &cert_path, &key_path).unwrap();

    let port = free_port();
    let child = Command::new(frostd)
        .args([
            "--ip",
            "127.0.0.1",
            "--port",
            &port.to_string(),
            "--tls-cert",
            &cert_path.to_string_lossy(),
            "--tls-key",
            &key_path.to_string_lossy(),
        ])
        .stdout(std::process::Stdio::null())
        .stderr(std::process::Stdio::null())
        .spawn()
        .expect("failed to spawn frostd");

    let server = TestServer {
        child,
        port,
        cert_pem: cert.cert_pem,
        _dir: dir,
    };

    // Wait for the server to answer.
    let client = FrostdClient::new(
        format!("https://127.0.0.1:{port}"),
        &ServerTrust::PinnedCertificate(server.cert_pem.clone().into_bytes()),
    )
    .unwrap();
    for _ in 0..40 {
        if client.challenge().await.is_ok() {
            return Some(server);
        }
        tokio::time::sleep(Duration::from_millis(250)).await;
    }
    panic!("frostd did not become healthy");
}

struct User {
    privkey: PrivateKey,
    pubkey: PublicKey,
}

fn new_user() -> User {
    let (privkey, pubkey) = Cipher::generate_keypair().unwrap();
    User { privkey, pubkey }
}

async fn dkg_and_sign(suite: Suite) {
    let Some(server) = start_server().await else {
        eprintln!("skipping: sidecar frostd binary not built (run scripts/build-sidecar.sh)");
        return;
    };
    let server_url = format!("127.0.0.1:{}", server.port);
    let trust = ServerTrust::PinnedCertificate(server.cert_pem.clone().into_bytes());

    let users: Vec<User> = (0..3).map(|_| new_user()).collect();
    let all_pubkeys: Vec<PublicKey> = users.iter().map(|u| u.pubkey.clone()).collect();

    // --- DKG: user 0 initiates a 2-of-3, users 1 and 2 join. ---
    let mut handles = Vec::new();
    for (i, user) in users.iter().enumerate() {
        let params = DkgParams {
            server_url: server_url.clone(),
            trust: trust.clone(),
            comm_privkey: user.privkey.clone(),
            comm_pubkey: user.pubkey.clone(),
            description: "e2e test group".into(),
            min_signers: 2,
            participants: if i == 0 { all_pubkeys.clone() } else { vec![] },
            known_pubkeys: all_pubkeys.clone(),
            session_id: None,
        };
        let (tx, mut rx) = mpsc::channel(32);
        // Drain events so senders never block.
        tokio::spawn(async move { while rx.recv().await.is_some() {} });
        let cancel = CancellationToken::new();
        // Joiners wait briefly so the initiator's session exists.
        let delay = if i == 0 { 0 } else { 1500 };
        handles.push(tokio::spawn(async move {
            tokio::time::sleep(Duration::from_millis(delay)).await;
            run_dkg(suite, params, tx, cancel).await
        }));
    }

    let mut outputs = Vec::new();
    for handle in handles {
        outputs.push(handle.await.unwrap().expect("DKG must succeed"));
    }
    assert_eq!(outputs[0].group_id, outputs[1].group_id);
    assert_eq!(outputs[0].group_id, outputs[2].group_id);
    let group_id = outputs[0].group_id.clone();
    eprintln!("DKG complete: group {group_id}");

    // --- Signing: user 0 coordinates, users 1 and 2 sign. ---
    let message = b"frost-app e2e test message".to_vec();
    let signers: Vec<(PublicKey, Vec<u8>)> = outputs[0]
        .group
        .participant
        .values()
        .filter(|p| p.pubkey == users[1].pubkey || p.pubkey == users[2].pubkey)
        .map(|p| (p.pubkey.clone(), p.identifier.clone()))
        .collect();
    assert_eq!(signers.len(), 2);

    let coord_params = CoordinatorParams {
        server_url: server_url.clone(),
        trust: trust.clone(),
        comm_privkey: users[0].privkey.clone(),
        comm_pubkey: users[0].pubkey.clone(),
        public_key_package: outputs[0].group.public_key_package.clone(),
        message: message.clone(),
        signers,
        self_key_package: outputs[0].group.key_package.clone(),
        randomizer: None,
        send_context: Vec::new(),
    };
    let (coord_tx, mut coord_rx) = mpsc::channel(32);
    let coord_cancel = CancellationToken::new();
    let coordinator =
        tokio::spawn(
            async move { run_coordinator(suite, coord_params, coord_tx, coord_cancel).await },
        );

    // Grab the session id from the coordinator's events.
    let session_id = loop {
        match coord_rx.recv().await.expect("coordinator events") {
            frost_app_core::events::CoordinatorEvent::SessionCreated { session_id } => {
                break session_id
            }
            _ => continue,
        }
    };
    tokio::spawn(async move { while coord_rx.recv().await.is_some() {} });

    for i in [1usize, 2] {
        let output = &outputs[i];
        let params = ParticipantParams {
            server_url: server_url.clone(),
            trust: trust.clone(),
            comm_privkey: users[i].privkey.clone(),
            comm_pubkey: users[i].pubkey.clone(),
            key_package: output.group.key_package.clone(),
            session_id,
            group_pubkeys: all_pubkeys.clone(),
        };
        let (tx, mut rx) = mpsc::channel(32);
        let (approve_tx, approve_rx) = oneshot::channel();
        let cancel = CancellationToken::new();
        let expected_hex = hex::encode(&message);
        // Approve as soon as the approval gate reports the right message.
        tokio::spawn(async move {
            let mut approve_tx = Some(approve_tx);
            while let Some(event) = rx.recv().await {
                if let frost_app_core::events::ParticipantEvent::AwaitingApproval { message_hex, .. } =
                    &event
                {
                    assert_eq!(message_hex, &expected_hex, "must show the real message");
                    if let Some(tx) = approve_tx.take() {
                        let _ = tx.send(true);
                    }
                }
            }
        });
        tokio::spawn(async move {
            run_participant(suite, params, approve_rx, tx, cancel)
                .await
                .expect("participant must succeed")
        });
    }

    let result = coordinator.await.unwrap().expect("signing must succeed");
    assert!(!result.signature.is_empty());
    eprintln!(
        "signing complete: signature {}",
        hex::encode(&result.signature)
    );

    // Independent verification for the non-rerandomized suite.
    if suite == Suite::Ed25519 {
        use frost_core::keys::PublicKeyPackage;
        use frost_ed25519::Ed25519Sha512;
        let pkp: PublicKeyPackage<Ed25519Sha512> =
            postcard::from_bytes(&outputs[0].group.public_key_package).unwrap();
        let sig = frost_core::Signature::<Ed25519Sha512>::deserialize(&result.signature).unwrap();
        pkp.verifying_key()
            .verify(&message, &sig)
            .expect("signature must verify against the group key");
    }
}

#[tokio::test(flavor = "multi_thread")]
async fn dkg_and_sign_ed25519() {
    dkg_and_sign(Suite::Ed25519).await;
}

#[tokio::test(flavor = "multi_thread")]
async fn dkg_and_sign_redpallas() {
    dkg_and_sign(Suite::RedPallas).await;
}

/// A rejected approval must abort the ceremony without producing a share.
#[tokio::test(flavor = "multi_thread")]
async fn participant_rejection_aborts() {
    let Some(server) = start_server().await else {
        eprintln!("skipping: sidecar frostd binary not built");
        return;
    };
    let server_url = format!("127.0.0.1:{}", server.port);
    let trust = ServerTrust::PinnedCertificate(server.cert_pem.clone().into_bytes());

    let users: Vec<User> = (0..2).map(|_| new_user()).collect();
    let all_pubkeys: Vec<PublicKey> = users.iter().map(|u| u.pubkey.clone()).collect();

    // 2-of-2 DKG.
    let mut handles = Vec::new();
    for (i, user) in users.iter().enumerate() {
        let params = DkgParams {
            server_url: server_url.clone(),
            trust: trust.clone(),
            comm_privkey: user.privkey.clone(),
            comm_pubkey: user.pubkey.clone(),
            description: "rejection test".into(),
            min_signers: 2,
            participants: if i == 0 { all_pubkeys.clone() } else { vec![] },
            known_pubkeys: all_pubkeys.clone(),
            session_id: None,
        };
        let (tx, mut rx) = mpsc::channel(32);
        tokio::spawn(async move { while rx.recv().await.is_some() {} });
        let delay = if i == 0 { 0 } else { 1500 };
        handles.push(tokio::spawn(async move {
            tokio::time::sleep(Duration::from_millis(delay)).await;
            run_dkg(Suite::Ed25519, params, tx, CancellationToken::new()).await
        }));
    }
    let mut outputs = Vec::new();
    for handle in handles {
        outputs.push(handle.await.unwrap().expect("DKG must succeed"));
    }

    let signers: Vec<(PublicKey, Vec<u8>)> = outputs[0]
        .group
        .participant
        .values()
        .map(|p| (p.pubkey.clone(), p.identifier.clone()))
        .collect();

    let coord_params = CoordinatorParams {
        server_url: server_url.clone(),
        trust: trust.clone(),
        comm_privkey: users[0].privkey.clone(),
        comm_pubkey: users[0].pubkey.clone(),
        public_key_package: outputs[0].group.public_key_package.clone(),
        message: b"should never be signed".to_vec(),
        signers,
        self_key_package: outputs[0].group.key_package.clone(),
        randomizer: None,
        send_context: Vec::new(),
    };
    let (coord_tx, mut coord_rx) = mpsc::channel(32);
    let coord_cancel = CancellationToken::new();
    let coord_cancel2 = coord_cancel.clone();
    let coordinator =
        tokio::spawn(
            async move { run_coordinator(Suite::Ed25519, coord_params, coord_tx, coord_cancel).await },
        );
    let session_id = loop {
        match coord_rx.recv().await.expect("coordinator events") {
            frost_app_core::events::CoordinatorEvent::SessionCreated { session_id } => {
                break session_id
            }
            _ => continue,
        }
    };
    tokio::spawn(async move { while coord_rx.recv().await.is_some() {} });

    // User 0 (the coordinator) is among the signers and contributes its share
    // locally. User 1 is the only external signer, and rejects — so the
    // ceremony can never complete. We expect user 1's task to fail fast, then
    // cancel the coordinator.
    let params = ParticipantParams {
        server_url: server_url.clone(),
        trust: trust.clone(),
        comm_privkey: users[1].privkey.clone(),
        comm_pubkey: users[1].pubkey.clone(),
        key_package: outputs[1].group.key_package.clone(),
        session_id,
        group_pubkeys: all_pubkeys.clone(),
    };
    let (tx, mut rx) = mpsc::channel(32);
    let (approve_tx, approve_rx) = oneshot::channel();
    tokio::spawn(async move {
        let mut approve_tx = Some(approve_tx);
        while let Some(event) = rx.recv().await {
            if matches!(
                event,
                frost_app_core::events::ParticipantEvent::AwaitingApproval { .. }
            ) {
                if let Some(tx) = approve_tx.take() {
                    let _ = tx.send(false); // reject
                }
            }
        }
    });

    let rejected = run_participant(
        Suite::Ed25519,
        params,
        approve_rx,
        tx,
        CancellationToken::new(),
    )
    .await;
    assert!(rejected.is_err(), "rejection must abort the ceremony");

    // The coordinator can never finish without participant 1's share.
    coord_cancel2.cancel();
    let r = coordinator.await.unwrap();
    assert!(r.is_err(), "coordinator must not produce a signature");
}
