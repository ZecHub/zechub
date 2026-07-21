//! Headless smoke test of the full Tauri command layer.
//!
//! Uses Tauri's mock runtime (no display required) to drive two app
//! instances — Alice and Bob — through the complete user journey:
//! keystore creation, contact exchange, server trust, a 2-of-2 DKG, and a
//! signing session with the approval gate, against a real frostd.

use std::process::{Child, Command};
use std::sync::mpsc as std_mpsc;
use std::time::Duration;

use frost_app_lib::commands;
use frost_app_lib::state::AppState;
use tauri::{Listener, Manager};

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
    let path = std::path::Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("binaries")
        .join("frostd-x86_64-unknown-linux-gnu");
    path.exists().then_some(path)
}

async fn start_server() -> Option<TestServer> {
    let frostd = frostd_path()?;
    let dir = tempfile::tempdir().unwrap();
    let cert = frost_app_core::tls::generate_self_signed(&[]).unwrap();
    let cert_path = dir.path().join("cert.pem");
    let key_path = dir.path().join("key.pem");
    frost_app_core::tls::write_cert_files(&cert, &cert_path, &key_path).unwrap();

    let port = std::net::TcpListener::bind("127.0.0.1:0")
        .unwrap()
        .local_addr()
        .unwrap()
        .port();
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

    let client = frost_app_core::transport::FrostdClient::new(
        format!("https://127.0.0.1:{}", server.port),
        &frost_app_core::transport::ServerTrust::PinnedCertificate(
            server.cert_pem.clone().into_bytes(),
        ),
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

/// A mock-runtime app instance with its own data dir, as if it were a
/// separate user's installation.
struct UserApp {
    app: tauri::App<tauri::test::MockRuntime>,
    _dir: tempfile::TempDir,
}

fn make_user() -> UserApp {
    let dir = tempfile::tempdir().unwrap();
    let app = tauri::test::mock_builder()
        .manage(AppState::with_dir(dir.path().to_path_buf()))
        .build(tauri::test::mock_context(tauri::test::noop_assets()))
        .unwrap();
    UserApp { app, _dir: dir }
}

#[tokio::test(flavor = "multi_thread")]
async fn full_user_journey() {
    tauri::async_runtime::set(tokio::runtime::Handle::current());

    let Some(server) = start_server().await else {
        eprintln!("skipping: sidecar frostd binary not built (run scripts/build-sidecar.sh)");
        return;
    };
    let server_url = format!("127.0.0.1:{}", server.port);

    let alice = make_user();
    let bob = make_user();
    let alice_state = alice.app.state::<AppState>();
    let bob_state = bob.app.state::<AppState>();

    // Surface ceremony failures and progress in test output.
    for (name, user) in [("alice", &alice), ("bob", &bob)] {
        for event in ["dkg:progress", "dkg:failed", "signing:progress", "signing:failed"] {
            let label = format!("{name} {event}");
            user.app.handle().listen(event, move |e| {
                eprintln!("[{label}] {}", e.payload());
            });
        }
    }

    // --- Keystores ---
    commands::keystore::create_keystore(alice_state.clone(), "alice-passphrase".into())
        .await
        .expect("alice keystore");
    commands::keystore::create_keystore(bob_state.clone(), "bob-passphrase".into())
        .await
        .expect("bob keystore");
    let status = commands::keystore::keystore_status(alice_state.clone())
        .await
        .unwrap();
    assert!(status.exists && status.unlocked);

    // Lock/unlock round-trip exercises the encrypted file path.
    commands::keystore::lock_keystore(alice_state.clone())
        .await
        .unwrap();
    assert!(
        commands::keystore::unlock_keystore(alice_state.clone(), "wrong".into())
            .await
            .is_err(),
        "wrong passphrase must fail"
    );
    commands::keystore::unlock_keystore(alice_state.clone(), "alice-passphrase".into())
        .await
        .expect("unlock with correct passphrase");

    // --- Contact exchange ---
    let alice_contact = commands::contacts::export_my_contact(alice_state.clone(), "alice".into())
        .await
        .unwrap();
    let bob_contact = commands::contacts::export_my_contact(bob_state.clone(), "bob".into())
        .await
        .unwrap();
    commands::contacts::add_contact(alice_state.clone(), bob_contact.text.clone(), None)
        .await
        .expect("alice imports bob");
    commands::contacts::add_contact(bob_state.clone(), alice_contact.text.clone(), None)
        .await
        .expect("bob imports alice");
    assert_eq!(
        commands::contacts::list_contacts(alice_state.clone())
            .await
            .unwrap()
            .len(),
        1
    );

    // --- Server config + cert trust (TOFU) ---
    for state in [&alice_state, &bob_state] {
        commands::server::set_server_url((*state).clone(), server_url.clone())
            .await
            .unwrap();
        commands::server::trust_server_cert(
            (*state).clone(),
            server_url.clone(),
            server.cert_pem.clone(),
        )
        .await
        .unwrap();
        let test = commands::server::test_server_connection((*state).clone(), server_url.clone())
            .await
            .unwrap();
        assert!(test.ok, "connection test must pass: {:?}", test.error);
    }

    // --- DKG: Alice initiates a 2-of-2 with Bob; Bob joins ---
    commands::dkg::start_dkg(
        alice.app.handle().clone(),
        commands::dkg::StartDkgArgs {
            suite: frost_app_core::ciphersuite::Suite::Ed25519,
            description: "smoke test group".into(),
            threshold: 2,
            participants: vec![bob_contact.pubkey.clone()],
            server_url: Some(server_url.clone()),
            session_id: None,
        },
    )
    .await
    .expect("alice starts DKG");

    tokio::time::sleep(Duration::from_millis(1500)).await;
    commands::dkg::start_dkg(
        bob.app.handle().clone(),
        commands::dkg::StartDkgArgs {
            suite: frost_app_core::ciphersuite::Suite::Ed25519,
            description: "smoke test group".into(),
            threshold: 2,
            participants: vec![],
            server_url: Some(server_url.clone()),
            session_id: None,
        },
    )
    .await
    .expect("bob joins DKG");

    // Wait until the group lands in both keystores.
    let group_id = wait_for_group(&alice_state).await;
    let bob_group_id = wait_for_group(&bob_state).await;
    assert_eq!(group_id, bob_group_id, "both must derive the same group");

    // --- Signing: Alice coordinates, both sign (2-of-2) ---
    let (sig_tx, sig_rx) = std_mpsc::channel::<String>();
    alice.app.handle().listen("signing:complete", move |event| {
        let payload: serde_json::Value = serde_json::from_str(event.payload()).unwrap();
        if let Some(sig) = payload["signature_hex"].as_str() {
            let _ = sig_tx.send(sig.to_string());
        }
    });

    // Capture the signing session id the coordinator creates, so the test
    // is deterministic even if a just-completed DKG session is still being
    // torn down on the server.
    let (sid_tx, sid_rx) = std_mpsc::channel::<String>();
    alice.app.handle().listen("signing:progress", move |event| {
        let payload: serde_json::Value = serde_json::from_str(event.payload()).unwrap();
        if payload["event"]["phase"] == "session_created" {
            if let Some(sid) = payload["event"]["session_id"].as_str() {
                let _ = sid_tx.send(sid.to_string());
            }
        }
    });

    let message_hex = hex::encode(b"smoke test message");
    commands::signing::create_signing_session(
        alice.app.handle().clone(),
        commands::signing::CreateSigningSessionArgs {
            group_id: group_id.clone(),
            message_hex: message_hex.clone(),
            signers: vec![alice_contact.pubkey.clone(), bob_contact.pubkey.clone()],
            server_url: Some(server_url.clone()),
        },
    )
    .await
    .expect("alice creates signing session");

    let session_id: uuid::Uuid = tokio::task::spawn_blocking(move || {
        sid_rx
            .recv_timeout(Duration::from_secs(10))
            .expect("coordinator must create a session")
    })
    .await
    .unwrap()
    .parse()
    .unwrap();

    // Bob's inbox must surface this exact signing session (alongside any
    // session still being cleaned up), attributed to alice and matching the
    // group.
    {
        let mut seen = false;
        for _ in 0..30 {
            let pending = commands::signing::list_pending_sessions(
                bob_state.clone(),
                Some(server_url.clone()),
            )
            .await
            .unwrap_or_default();
            if let Some(p) = pending.iter().find(|p| p.session_id == session_id) {
                assert_eq!(p.coordinator.as_deref(), Some("alice"));
                assert!(p.matching_groups.contains(&group_id));
                seen = true;
                break;
            }
            tokio::time::sleep(Duration::from_secs(1)).await;
        }
        assert!(seen, "bob must see the signing session in his inbox");
    }

    // Alice is the coordinator and also a selected signer, so she contributes
    // her share locally — only Bob joins over the network. Bob approves (the
    // approval oneshot is buffered, so approving right after join is valid).
    let bob_ceremony = commands::signing::join_signing_session(
        bob.app.handle().clone(),
        commands::signing::JoinSigningSessionArgs {
            group_id: group_id.clone(),
            session_id,
            server_url: Some(server_url.clone()),
        },
    )
    .await
    .expect("join signing session");
    commands::signing::respond_to_signing(
        bob.app.state::<AppState>().clone(),
        bob_ceremony,
        true,
    )
    .await
    .expect("approve");

    // The coordinator must emit the final signature.
    let signature_hex = tokio::task::spawn_blocking(move || {
        sig_rx
            .recv_timeout(Duration::from_secs(60))
            .expect("signature within 60s")
    })
    .await
    .unwrap();
    assert!(!signature_hex.is_empty());
    eprintln!("smoke test signature: {signature_hex}");
}

async fn wait_for_group(state: &tauri::State<'_, AppState>) -> String {
    for _ in 0..60 {
        let groups = commands::groups::list_groups(state.clone()).await.unwrap();
        if let Some(g) = groups.first() {
            assert_eq!(g.threshold, 2);
            assert_eq!(g.num_participants, 2);
            return g.id.clone();
        }
        tokio::time::sleep(Duration::from_secs(1)).await;
    }
    panic!("DKG did not complete within 60s");
}
