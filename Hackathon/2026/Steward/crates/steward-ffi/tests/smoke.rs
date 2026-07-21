//! Host smoke test — exercises the **FFI surface itself** (the same functions the
//! Kotlin/Swift bindings call), proving the SDK works end-to-end even though a real
//! device cross-compile needs the Android NDK / Xcode toolchains.
//!
//! It drives everything through `steward_ffi::*` Strings/records: generate a
//! heartbeat key, sign + verify a beat, seal + open a share, and run a full 2-of-3
//! re-randomized FROST ceremony to an aggregate signature that verifies against `rk`.

use steward_ffi::*;

/// Heartbeat: key generation, sign/verify roundtrip, pubkey derivation, lapse gate.
#[test]
fn heartbeat_sign_verify_and_lapse() {
    let vault_id = "vault-42".to_string();
    let time = 1_752_000_000u64;

    let k = generate_heartbeat_key();
    assert_eq!(k.secret_hex.len(), 64);
    assert_eq!(k.pubkey_hex.len(), 64);
    // The derivation helper agrees with the generated pair.
    assert_eq!(heartbeat_pubkey(k.secret_hex.clone()).unwrap(), k.pubkey_hex);

    let sig = sign_heartbeat(k.secret_hex.clone(), vault_id.clone(), time).unwrap();
    assert!(verify_heartbeat(k.pubkey_hex.clone(), vault_id.clone(), time, sig.clone()));
    // Tampered vault id / time must NOT verify.
    assert!(!verify_heartbeat(k.pubkey_hex.clone(), "other".to_string(), time, sig.clone()));
    assert!(!verify_heartbeat(k.pubkey_hex.clone(), vault_id, time + 1, sig));

    // The dead-man's-switch gate: strict `>` past interval + grace.
    let (latest, interval, grace) = (1_000_000u64, 30 * 86_400, 7 * 86_400);
    let trip = latest + interval + grace;
    assert!(!is_lapsed(latest, interval, grace, trip)); // at the deadline — not yet
    assert!(is_lapsed(latest, interval, grace, trip + 1)); // one second past
}

/// Cross-impl vector: this SDK reproduces the fixed known-answer heartbeat from
/// `steward-core` (byte-identical to the web apps / `@noble/ed25519`).
#[test]
fn heartbeat_known_answer_vector() {
    let sk = "00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff".to_string();
    assert_eq!(
        heartbeat_pubkey(sk.clone()).unwrap(),
        "3ccd241cffc9b3618044b97d036d8614593d8b017c340f1dee8773385517654b"
    );
    assert_eq!(
        sign_heartbeat(sk, "vault-1".to_string(), 1_752_000_000).unwrap(),
        "0fa0a75b41478dee5dd0ca37efbd0ae5704093df0b5c5169d39c8f57df3c01f3\
         31f870ebbfd28ab1afbedf5950be8451b96754fb3bcbb9173574f5e629f91c05"
    );
}

/// Full guardian flow: split a 2-of-3 vault, seal + open every share, run round 1 /
/// round 2 for two guardians, aggregate, and verify against `rk`. Plus the
/// wrong-passphrase and single-use-nonce negative checks.
#[test]
fn seal_open_and_cosign_2_of_3_verifies_against_rk() {
    // --- Owner keygen (trusted dealer). ---
    let vault = split_authority(3, 2, None).unwrap();
    assert_eq!(vault.shares.len(), 3);
    assert_eq!(vault.group_ak_hex.len(), 64);

    // --- Each guardian seals its share, then opens it into a live handle. ---
    // `vault.shares` is identifier-sorted, so the first two are the coordinator's
    // canonical `t` lowest signers.
    let mut guardians: Vec<std::sync::Arc<Guardian>> = Vec::new();
    for share in &vault.shares {
        let pass = format!("correct horse battery staple :: {}", share.identifier_hex);
        let blob = seal_share(share.secret_share_json.clone(), pass.clone()).unwrap();
        let g = open_guardian(blob, pass).unwrap();
        assert_eq!(g.identifier(), share.identifier_hex);
        assert_eq!(g.pending_count(), 0);
        guardians.push(g);
    }

    // --- Wrong passphrase fails cleanly (indistinguishable from a corrupt blob). ---
    let blob0 = seal_share(vault.shares[0].secret_share_json.clone(), "pw".to_string()).unwrap();
    assert!(matches!(
        open_guardian(blob0, "definitely wrong".to_string()),
        Err(StewardError::BadPassphrase)
    ));

    let sighash_hex = hex::encode([7u8; 32]);
    let randomizer_le_hex = random_randomizer_hex();
    let session = "sess-1".to_string();

    // --- Round 1 for the two lowest-id guardians. ---
    let round1: Vec<String> =
        guardians.iter().take(2).map(|g| g.round1(session.clone()).unwrap()).collect();
    for g in guardians.iter().take(2) {
        assert_eq!(g.pending_count(), 1); // live nonces held between rounds
    }
    let pkg = build_signing_package(round1, sighash_hex.clone()).unwrap();

    // --- Round 2 for the two guardians (α by value). ---
    let round2: Vec<String> = guardians
        .iter()
        .take(2)
        .map(|g| g.round2(session.clone(), pkg.clone(), randomizer_le_hex.clone()).unwrap())
        .collect();
    for g in guardians.iter().take(2) {
        assert_eq!(g.pending_count(), 0); // nonces consumed → single-use discipline
    }

    // --- Aggregate + verify against rk. ---
    let sig_hex = aggregate_signature(
        round2,
        pkg.clone(),
        sighash_hex.clone(),
        randomizer_le_hex.clone(),
        vault.public_key_package_json.clone(),
    )
    .unwrap();
    assert_eq!(sig_hex.len(), 128, "64-byte RedPallas signature");

    assert!(verify_aggregate(
        sighash_hex.clone(),
        randomizer_le_hex.clone(),
        vault.public_key_package_json.clone(),
        sig_hex,
    )
    .unwrap());

    // The randomized verifying key is derivable and 32 bytes.
    let rk = randomized_verifying_key_hex(randomizer_le_hex.clone(), vault.public_key_package_json)
        .unwrap();
    assert_eq!(rk.len(), 64);

    // --- Negative: reusing a session's nonce after round 2 fails (single-use). ---
    assert!(matches!(
        guardians[0].round2(session, pkg, randomizer_le_hex),
        Err(StewardError::NoSession)
    ));
}

/// The enveloped `handle_relay_message` path: feed the guardian the coordinator's
/// `Round1Request` / `Round2Request` as hex, exactly as a relay would, and confirm
/// the returned `RelayAction`s and the aggregate.
#[test]
fn enveloped_relay_flow_two_guardians() {
    let vault = split_authority(3, 2, None).unwrap();
    let guardians: Vec<std::sync::Arc<Guardian>> = vault
        .shares
        .iter()
        .map(|s| {
            let blob = seal_share(s.secret_share_json.clone(), "pw".to_string()).unwrap();
            open_guardian(blob, "pw".to_string()).unwrap()
        })
        .collect();

    let sighash = [9u8; 32];
    let sighash_hex = hex::encode(sighash);
    let randomizer_le_hex = random_randomizer_hex();
    let session = "relay-sess".to_string();

    // Coordinator → guardians: Round1Request (hex of the wire Message JSON).
    let r1_req_hex = hex::encode(
        serde_json::json!({ "Round1Request": { "purpose": "NormalSpend", "sighash": sighash } })
            .to_string()
            .into_bytes(),
    );

    let mut round1_replies = Vec::new();
    for g in guardians.iter().take(2) {
        let action = g.handle_relay_message(session.clone(), r1_req_hex.clone()).unwrap();
        assert_eq!(action.action, "send");
        assert_eq!(action.kind, "round1");
        assert!(!action.done);
        // The reply hex decodes back to a Round1Reply message JSON.
        let msg = String::from_utf8(hex::decode(action.msg_hex.unwrap()).unwrap()).unwrap();
        round1_replies.push(msg);
    }

    let pkg = build_signing_package(round1_replies, sighash_hex.clone()).unwrap();

    // Coordinator → guardians: Round2Request.
    let r2_req = serde_json::json!({
        "Round2Request": {
            "signing_package": serde_json::from_str::<serde_json::Value>(&pkg).unwrap(),
            "randomizer_le": hex::decode(&randomizer_le_hex).unwrap(),
        }
    })
    .to_string();
    let r2_req_hex = hex::encode(r2_req.into_bytes());

    let mut round2_replies = Vec::new();
    for g in guardians.iter().take(2) {
        let action = g.handle_relay_message(session.clone(), r2_req_hex.clone()).unwrap();
        assert_eq!(action.kind, "round2");
        assert!(action.done);
        let msg = String::from_utf8(hex::decode(action.msg_hex.unwrap()).unwrap()).unwrap();
        round2_replies.push(msg);
    }

    let sig_hex = aggregate_signature(
        round2_replies,
        pkg,
        sighash_hex.clone(),
        randomizer_le_hex.clone(),
        vault.public_key_package_json.clone(),
    )
    .unwrap();
    assert!(verify_aggregate(
        sighash_hex,
        randomizer_le_hex,
        vault.public_key_package_json,
        sig_hex
    )
    .unwrap());
}

/// `wipe()` drops key material; subsequent round calls throw `Wiped`.
#[test]
fn wipe_makes_handle_inert() {
    let vault = split_authority(2, 2, None).unwrap();
    let blob =
        seal_share(vault.shares[0].secret_share_json.clone(), "pw".to_string()).unwrap();
    let g = open_guardian(blob, "pw".to_string()).unwrap();
    assert!(!g.identifier().is_empty());
    g.wipe();
    assert!(matches!(g.round1("s".to_string()), Err(StewardError::Wiped)));
}
