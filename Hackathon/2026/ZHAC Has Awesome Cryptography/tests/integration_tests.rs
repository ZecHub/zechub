use std::fs;
use std::process::Command;

fn binary() -> Command {
    let mut cmd = Command::new(env!("CARGO_BIN_EXE_zhac"));
    cmd.env("ZHAC_PASSPHRASE", "test-passphrase-123");
    cmd
}

fn temp_dir() -> std::path::PathBuf {
    let dir = std::env::temp_dir().join(format!("zhac-test-{}-{}", std::process::id(), rand_u64()));
    fs::create_dir_all(&dir).unwrap();
    dir
}

fn rand_u64() -> u64 {
    use std::time::SystemTime;
    SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap()
        .as_nanos() as u64
}

fn assert_success(cmd: &mut Command, msg: &str) {
    let output = cmd.output().expect("failed to execute zhac");
    assert!(
        output.status.success(),
        "{msg}\nstdout: {}\nstderr: {}",
        String::from_utf8_lossy(&output.stdout),
        String::from_utf8_lossy(&output.stderr)
    );
}

fn assert_failure(cmd: &mut Command, msg: &str) {
    let output = cmd.output().expect("failed to execute zhac");
    assert!(
        !output.status.success(),
        "{msg}: command should have failed"
    );
}

#[test]
fn test_gen_key_and_key_info() {
    let dir = temp_dir();
    let priv_path = dir.join("test.priv");
    let pub_path = dir.join("test.pub");

    assert_success(
        binary().args([
            "gen-key",
            "-o",
            priv_path.to_str().unwrap(),
            "-p",
            pub_path.to_str().unwrap(),
        ]),
        "gen-key should succeed",
    );
    assert!(priv_path.exists(), "private key file should exist");
    assert!(pub_path.exists(), "public key file should exist");

    let pub_content = fs::read_to_string(&pub_path).unwrap();
    assert!(pub_content.contains("zhac1"));
    assert!(pub_content.contains("zhac1"));

    assert_success(
        binary().args(["key-info", "-k", pub_path.to_str().unwrap()]),
        "key-info should succeed",
    );
}

#[test]
fn test_gen_key_with_passphrase() {
    let dir = temp_dir();
    let priv_path = dir.join("encrypted.priv");
    let pub_path = dir.join("encrypted.pub");

    assert_success(
        binary().args([
            "gen-key",
            "-o",
            priv_path.to_str().unwrap(),
            "-p",
            pub_path.to_str().unwrap(),
            "-w",
            "test-passphrase-123",
        ]),
        "gen-key with passphrase should succeed",
    );

    let priv_content = fs::read_to_string(&priv_path).unwrap();
    assert!(priv_content.contains("encrypted") || priv_content.contains("v2:"), "should be encrypted");
}

#[test]
fn test_encrypt_decrypt_roundtrip() {
    let dir = temp_dir();
    let priv_path = dir.join("alice.priv");
    let pub_path = dir.join("alice.pub");
    let msg_path = dir.join("message.txt");
    let ct_path = dir.join("message.zhac");
    let pt_path = dir.join("decrypted.txt");

    binary()
        .args([
            "gen-key",
            "-o",
            priv_path.to_str().unwrap(),
            "-p",
            pub_path.to_str().unwrap(),
        ])
        .output()
        .unwrap();

    fs::write(&msg_path, b"Hello from the integration test!").unwrap();

    assert_success(
        binary().args([
            "encrypt",
            "-k",
            pub_path.to_str().unwrap(),
            "-i",
            msg_path.to_str().unwrap(),
            "-o",
            ct_path.to_str().unwrap(),
        ]),
        "encrypt should succeed",
    );

    assert_success(
        binary().args([
            "decrypt",
            "-k",
            priv_path.to_str().unwrap(),
            "-i",
            ct_path.to_str().unwrap(),
            "-o",
            pt_path.to_str().unwrap(),
        ]),
        "decrypt should succeed",
    );

    let decrypted = fs::read_to_string(&pt_path).unwrap();
    assert_eq!(decrypted, "Hello from the integration test!");
}

#[test]
fn test_sign_verify_roundtrip() {
    let dir = temp_dir();
    let priv_path = dir.join("signer.priv");
    let pub_path = dir.join("signer.pub");
    let msg_path = dir.join("doc.txt");
    let sig_path = dir.join("doc.sig");

    binary()
        .args([
            "gen-key",
            "-o",
            priv_path.to_str().unwrap(),
            "-p",
            pub_path.to_str().unwrap(),
        ])
        .output()
        .unwrap();

    fs::write(&msg_path, b"Document to sign").unwrap();

    assert_success(
        binary().args([
            "sign",
            "-k",
            priv_path.to_str().unwrap(),
            "-i",
            msg_path.to_str().unwrap(),
            "-o",
            sig_path.to_str().unwrap(),
        ]),
        "sign should succeed",
    );

    assert_success(
        binary().args([
            "verify",
            "-k",
            pub_path.to_str().unwrap(),
            "-i",
            msg_path.to_str().unwrap(),
            "-s",
            sig_path.to_str().unwrap(),
        ]),
        "verify should succeed",
    );
}

#[test]
fn test_verify_tampered_message_fails() {
    let dir = temp_dir();
    let priv_path = dir.join("signer.priv");
    let pub_path = dir.join("signer.pub");
    let msg_path = dir.join("doc.txt");
    let tampered_path = dir.join("tampered.txt");
    let sig_path = dir.join("doc.sig");

    binary()
        .args([
            "gen-key",
            "-o",
            priv_path.to_str().unwrap(),
            "-p",
            pub_path.to_str().unwrap(),
        ])
        .output()
        .unwrap();

    fs::write(&msg_path, b"Original message").unwrap();
    fs::write(&tampered_path, b"Tampered message").unwrap();

    binary()
        .args([
            "sign",
            "-k",
            priv_path.to_str().unwrap(),
            "-i",
            msg_path.to_str().unwrap(),
            "-o",
            sig_path.to_str().unwrap(),
        ])
        .output()
        .unwrap();

    assert_failure(
        binary().args([
            "verify",
            "-k",
            pub_path.to_str().unwrap(),
            "-i",
            tampered_path.to_str().unwrap(),
            "-s",
            sig_path.to_str().unwrap(),
        ]),
        "verify of tampered message should fail",
    );
}

#[test]
fn test_fingerprint_command() {
    let dir = temp_dir();
    let priv_path = dir.join("fp.priv");
    let pub_path = dir.join("fp.pub");

    binary()
        .args([
            "gen-key",
            "-o",
            priv_path.to_str().unwrap(),
            "-p",
            pub_path.to_str().unwrap(),
        ])
        .output()
        .unwrap();

    let output = binary()
        .args(["fingerprint", "-k", pub_path.to_str().unwrap()])
        .output()
        .unwrap();

    assert!(output.status.success(), "fingerprint should succeed");
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("pub   "), "should show key type");
    assert!(stdout.len() > 20, "should have fingerprint output");
}

#[test]
fn test_multi_recipient_encrypt_decrypt() {
    let dir = temp_dir();
    let priv_a = dir.join("alice.priv");
    let pub_a = dir.join("alice.pub");
    let priv_b = dir.join("bob.priv");
    let pub_b = dir.join("bob.pub");
    let msg_path = dir.join("multi.txt");
    let ct_path = dir.join("multi.zhac");
    let pt_a = dir.join("dec_a.txt");
    let pt_b = dir.join("dec_b.txt");

    binary()
        .args([
            "gen-key",
            "-o",
            priv_a.to_str().unwrap(),
            "-p",
            pub_a.to_str().unwrap(),
        ])
        .output()
        .unwrap();
    binary()
        .args([
            "gen-key",
            "-o",
            priv_b.to_str().unwrap(),
            "-p",
            pub_b.to_str().unwrap(),
        ])
        .output()
        .unwrap();

    fs::write(&msg_path, b"Multi-recipient secret message").unwrap();

    assert_success(
        binary().args([
            "encrypt",
            "-k",
            pub_a.to_str().unwrap(),
            "-k",
            pub_b.to_str().unwrap(),
            "-i",
            msg_path.to_str().unwrap(),
            "-o",
            ct_path.to_str().unwrap(),
        ]),
        "multi-encrypt should succeed",
    );

    assert_success(
        binary().args([
            "decrypt",
            "-k",
            priv_a.to_str().unwrap(),
            "-i",
            ct_path.to_str().unwrap(),
            "-o",
            pt_a.to_str().unwrap(),
        ]),
        "alice should decrypt",
    );

    assert_success(
        binary().args([
            "decrypt",
            "-k",
            priv_b.to_str().unwrap(),
            "-i",
            ct_path.to_str().unwrap(),
            "-o",
            pt_b.to_str().unwrap(),
        ]),
        "bob should decrypt",
    );

    assert_eq!(
        fs::read_to_string(&pt_a).unwrap(),
        "Multi-recipient secret message"
    );
    assert_eq!(
        fs::read_to_string(&pt_b).unwrap(),
        "Multi-recipient secret message"
    );
}

#[test]
fn test_encrypt_decrypt_cli_roundtrip() {
    let dir = temp_dir();
    let priv_path = dir.join("enc.priv");
    let pub_path = dir.join("enc.pub");
    let msg_path = dir.join("enc_msg.txt");
    let ct_path = dir.join("enc_msg.zhac");
    let pt_path = dir.join("enc_decrypted.txt");

    let output = binary()
        .args([
            "gen-key",
            "-o",
            priv_path.to_str().unwrap(),
            "-p",
            pub_path.to_str().unwrap(),
        ])
        .output()
        .unwrap();
    assert!(output.status.success());

    fs::write(&msg_path, b"Encrypt-decrypt roundtrip test").unwrap();
    assert_success(
        binary().args([
            "encrypt",
            "-k",
            pub_path.to_str().unwrap(),
            "-i",
            msg_path.to_str().unwrap(),
            "-o",
            ct_path.to_str().unwrap(),
        ]),
        "encrypt should succeed",
    );

    assert_success(
        binary().args([
            "decrypt",
            "-k",
            priv_path.to_str().unwrap(),
            "-i",
            ct_path.to_str().unwrap(),
            "-o",
            pt_path.to_str().unwrap(),
        ]),
        "decrypt should succeed",
    );

    let decrypted = fs::read_to_string(&pt_path).unwrap();
    assert_eq!(decrypted, "Encrypt-decrypt roundtrip test");
}

#[test]
fn test_quiet_flag_suppresses_output() {
    let dir = temp_dir();
    let priv_path = dir.join("quiet.priv");
    let pub_path = dir.join("quiet.pub");

    let output = binary()
        .args([
            "--quiet",
            "gen-key",
            "-o",
            priv_path.to_str().unwrap(),
            "-p",
            pub_path.to_str().unwrap(),
        ])
        .output()
        .unwrap();

    assert!(output.status.success());
    assert!(output.stderr.is_empty(), "quiet should suppress stderr");
}

#[test]
fn test_threshold_trusted_dealer_sign() {
    let dir = temp_dir();
    let shares_dir = dir.join("shares");
    let r1_dir = dir.join("r1");
    let pkg_dir = dir.join("pkg");
    let shares_out = dir.join("shares_out");

    fs::create_dir_all(&shares_out).unwrap();

    // Trusted dealer keygen (2-of-3)
    assert_success(
        binary().args([
            "threshold-sign",
            "trusted-dealer",
            "-t",
            "2",
            "-n",
            "3",
            "-o",
            shares_dir.to_str().unwrap(),
        ]),
        "trusted-dealer should succeed",
    );

    // Round 1 for participants 1 and 3
    let r1_p1 = r1_dir.join("p1");
    let r1_p3 = r1_dir.join("p3");
    fs::create_dir_all(&r1_p1).unwrap();
    fs::create_dir_all(&r1_p3).unwrap();

    assert_success(
        binary().args([
            "threshold-sign",
            "round1",
            "-k",
            shares_dir.join("key_package_1.bin").to_str().unwrap(),
            "-o",
            r1_p1.to_str().unwrap(),
        ]),
        "round1 p1 should succeed",
    );

    assert_success(
        binary().args([
            "threshold-sign",
            "round1",
            "-k",
            shares_dir.join("key_package_3.bin").to_str().unwrap(),
            "-o",
            r1_p3.to_str().unwrap(),
        ]),
        "round1 p3 should succeed",
    );

    // Build signing package
    let comm_dir = dir.join("commitments");
    fs::create_dir_all(&comm_dir).unwrap();
    fs::copy(r1_p1.join("commitments.bin"), comm_dir.join("1.bin")).unwrap();
    fs::copy(r1_p3.join("commitments.bin"), comm_dir.join("3.bin")).unwrap();

    assert_success(
        binary().args([
            "threshold-sign",
            "build-package",
            "-m",
            "threshold test message",
            "-c",
            comm_dir.to_str().unwrap(),
            "-o",
            pkg_dir.to_str().unwrap(),
        ]),
        "build-package should succeed",
    );

    // Round 2
    let s1_path = shares_out.join("1.share");
    let s3_path = shares_out.join("3.share");

    assert_success(
        binary().args([
            "threshold-sign",
            "round2",
            "-k",
            shares_dir.join("key_package_1.bin").to_str().unwrap(),
            "-n",
            r1_p1.join("nonces.bin").to_str().unwrap(),
            "-p",
            pkg_dir.join("signing_package.bin").to_str().unwrap(),
            "-o",
            s1_path.to_str().unwrap(),
        ]),
        "round2 p1 should succeed",
    );

    assert_success(
        binary().args([
            "threshold-sign",
            "round2",
            "-k",
            shares_dir.join("key_package_3.bin").to_str().unwrap(),
            "-n",
            r1_p3.join("nonces.bin").to_str().unwrap(),
            "-p",
            pkg_dir.join("signing_package.bin").to_str().unwrap(),
            "-o",
            s3_path.to_str().unwrap(),
        ]),
        "round2 p3 should succeed",
    );

    // Aggregate
    let sig_path = dir.join("threshold.sig");
    assert_success(
        binary().args([
            "threshold-sign",
            "aggregate",
            "-b",
            pkg_dir.to_str().unwrap(),
            "-s",
            shares_out.to_str().unwrap(),
            "-k",
            shares_dir.join("public_key_package.bin").to_str().unwrap(),
            "-o",
            sig_path.to_str().unwrap(),
        ]),
        "aggregate should succeed",
    );

    // Verify
    assert_success(
        binary().args([
            "threshold-sign",
            "threshold-verify",
            "-s",
            sig_path.to_str().unwrap(),
            "-m",
            "threshold test message",
            "-k",
            shares_dir.join("public_key_package.bin").to_str().unwrap(),
        ]),
        "threshold-verify should succeed",
    );
}

#[test]
fn test_auth_signature_only_verify() {
    let dir = temp_dir();
    let priv_path = dir.join("auth.priv");
    let pub_path = dir.join("auth.pub");
    let token_path = dir.join("token.json");

    binary()
        .args([
            "gen-key",
            "-o",
            priv_path.to_str().unwrap(),
            "-p",
            pub_path.to_str().unwrap(),
        ])
        .output()
        .unwrap();

    // Create an auth token using the library (mock challenge, no node needed)
    use zhac::auth::{AuthChallenge, AuthToken};
    use zhac::keys::ZhacKeyPair;

    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let challenge = AuthChallenge::create_mock(
        2_000_000,
        "0000000000000000000000000000000000000000000000000000000000000000",
    );
    let token = AuthToken::create_with_pubkey(challenge, &kp.private_key, &kp.public_key).unwrap();
    let json = token.to_json().unwrap();
    fs::write(&token_path, &json).unwrap();

    // Write the public key to a file in PEM format
    let pub_str = kp.public_key.to_zhac_address();
    fs::write(
        &pub_path,
        format!("# ZHAC public key\n{pub_str}\n"),
    )
    .unwrap();
    let priv_str = kp.private_key.to_zhac_secret();
    fs::write(
        &priv_path,
        format!("# ZHAC private key\n{priv_str}\n"),
    )
    .unwrap();

    // Verify with --signature-only (no node needed)
    let output = binary()
        .args(["auth-verify", "-t", token_path.to_str().unwrap(), "-s"])
        .output()
        .unwrap();

    assert!(
        output.status.success(),
        "auth-verify -s should succeed\nstderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(
        stdout.contains("VALID"),
        "should show VALID\nstdout: {stdout}"
    );
}

#[test]
fn test_auth_verify_tampered_token_fails() {
    let dir = temp_dir();
    let token_path = dir.join("tampered_token.json");

    use zhac::auth::{AuthChallenge, AuthToken};
    use zhac::keys::ZhacKeyPair;

    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let challenge = AuthChallenge::create_mock(
        2_000_000,
        "0000000000000000000000000000000000000000000000000000000000000000",
    );
    let mut token =
        AuthToken::create_with_pubkey(challenge, &kp.private_key, &kp.public_key).unwrap();

    // Tamper with the block height after signing
    token.challenge.block_height = 1_999_999;
    let json = token.to_json().unwrap();
    fs::write(&token_path, &json).unwrap();

    // Signature-only verification should fail
    let output = binary()
        .args(["auth-verify", "-t", token_path.to_str().unwrap(), "-s"])
        .output()
        .unwrap();

    assert!(
        !output.status.success(),
        "tampered token should fail verification"
    );
}

#[test]
fn test_mainnet_info_fails_gracefully_on_no_node() {
    // Try connecting to a port where no node is running
    let output = binary()
        .args(["mainnet-info", "-r", "http://127.0.0.1:1"])
        .output()
        .unwrap();

    assert!(
        !output.status.success(),
        "should fail when no node is available"
    );
    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(
        stderr.to_lowercase().contains("error")
            || stderr.to_lowercase().contains("connect")
            || stderr.to_lowercase().contains("transport"),
        "should show connection error\nstderr: {stderr}"
    );
}

#[test]
fn test_import_seed_and_export_seed_roundtrip() {
    let dir = temp_dir();
    let priv_path = dir.join("imported.priv");
    let pub_path = dir.join("imported.pub");

    // Generate a key, export its seed, then re-import
    let orig_priv = dir.join("orig.priv");
    let orig_pub = dir.join("orig.pub");
    binary()
        .args([
            "gen-key",
            "-o",
            orig_priv.to_str().unwrap(),
            "-p",
            orig_pub.to_str().unwrap(),
        ])
        .output()
        .unwrap();

    // Export seed
    let export_output = binary()
        .args(["export-seed", "-k", orig_priv.to_str().unwrap()])
        .output()
        .unwrap();
    assert!(export_output.status.success(), "export-seed should succeed");
    let seed_hex = String::from_utf8_lossy(&export_output.stdout)
        .trim()
        .to_string();
    assert_eq!(seed_hex.len(), 64, "seed should be 64 hex chars (32 bytes)");

    // Import seed
    assert_success(
        binary().args([
            "import-seed",
            "-s",
            &seed_hex,
            "-o",
            priv_path.to_str().unwrap(),
            "-p",
            pub_path.to_str().unwrap(),
        ]),
        "import-seed should succeed",
    );
    assert!(priv_path.exists(), "imported private key should exist");
    assert!(pub_path.exists(), "imported public key should exist");

    // Re-export and verify seed matches
    let reexport_output = binary()
        .args(["export-seed", "-k", priv_path.to_str().unwrap()])
        .output()
        .unwrap();
    assert!(
        reexport_output.status.success(),
        "re-export-seed should succeed"
    );
    let reexported_hex = String::from_utf8_lossy(&reexport_output.stdout)
        .trim()
        .to_string();
    assert_eq!(
        seed_hex, reexported_hex,
        "seed should roundtrip through import/export"
    );

    // Verify the imported key can sign and verify
    let msg = dir.join("msg.txt");
    let sig = dir.join("msg.sig");
    fs::write(&msg, b"import test message").unwrap();

    assert_success(
        binary().args([
            "sign",
            "-k",
            priv_path.to_str().unwrap(),
            "-i",
            msg.to_str().unwrap(),
            "-o",
            sig.to_str().unwrap(),
        ]),
        "signing with imported key should succeed",
    );
    assert_success(
        binary().args([
            "verify",
            "-k",
            pub_path.to_str().unwrap(),
            "-i",
            msg.to_str().unwrap(),
            "-s",
            sig.to_str().unwrap(),
        ]),
        "verifying with imported key should succeed",
    );
}

#[test]
fn test_auth_mock_challenge_and_verify() {
    let dir = temp_dir();
    let priv_path = dir.join("mock_auth.priv");
    let pub_path = dir.join("mock_auth.pub");
    let token_path = dir.join("mock_token.json");

    binary()
        .args([
            "gen-key",
            "-o",
            priv_path.to_str().unwrap(),
            "-p",
            pub_path.to_str().unwrap(),
        ])
        .output()
        .unwrap();

    // Create mock auth token (no node required)
    assert_success(
        binary().args([
            "auth-challenge",
            "-k",
            priv_path.to_str().unwrap(),
            "-p",
            pub_path.to_str().unwrap(),
            "--mock",
            "-o",
            token_path.to_str().unwrap(),
        ]),
        "auth-challenge --mock should succeed",
    );

    // Verify signature-only
    let output = binary()
        .args(["auth-verify", "-t", token_path.to_str().unwrap(), "-s"])
        .output()
        .unwrap();

    assert!(
        output.status.success(),
        "auth-verify -s should succeed\nstderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(
        stdout.contains("VALID"),
        "should show VALID\nstdout: {stdout}"
    );
}

#[test]
fn test_encrypt_empty_plaintext() {
    let dir = temp_dir();
    let priv_path = dir.join("empty.priv");
    let pub_path = dir.join("empty.pub");
    let msg_path = dir.join("empty.txt");
    let ct_path = dir.join("empty.zhac");
    let pt_path = dir.join("empty_dec.txt");

    binary()
        .args(["gen-key", "-o", priv_path.to_str().unwrap(), "-p", pub_path.to_str().unwrap()])
        .output()
        .unwrap();

    fs::write(&msg_path, b"").unwrap();

    assert_success(
        binary().args([
            "encrypt", "-k", pub_path.to_str().unwrap(),
            "-i", msg_path.to_str().unwrap(),
            "-o", ct_path.to_str().unwrap(),
        ]),
        "encrypt empty plaintext should succeed",
    );

    assert_success(
        binary().args([
            "decrypt", "-k", priv_path.to_str().unwrap(),
            "-i", ct_path.to_str().unwrap(),
            "-o", pt_path.to_str().unwrap(),
        ]),
        "decrypt empty plaintext should succeed",
    );

    let decrypted = fs::read(&pt_path).unwrap();
    assert!(decrypted.is_empty(), "decrypted empty plaintext should be empty");
}

#[test]
fn test_wrong_passphrase_fails() {
    let dir = temp_dir();
    let priv_path = dir.join("wrong_pw.priv");
    let pub_path = dir.join("wrong_pw.pub");

    assert_success(
        binary()
            .env("ZHAC_PASSPHRASE", "correct")
            .args([
                "gen-key",
                "-o", priv_path.to_str().unwrap(),
                "-p", pub_path.to_str().unwrap(),
                "-w", "correct",
            ]),
        "gen-key with passphrase should succeed",
    );

    let result = binary()
        .env("ZHAC_PASSPHRASE", "wrong_passphrase")
        .args(["export-seed", "-k", priv_path.to_str().unwrap()])
        .output()
        .unwrap();
    assert!(
        !result.status.success(),
        "export-seed with wrong passphrase should fail"
    );
}

#[test]
fn test_gen_key_with_passphrase_stdin() {
    let dir = temp_dir();
    let priv_path = dir.join("stdin.priv");
    let pub_path = dir.join("stdin.pub");

    let mut cmd = binary();
    cmd.args([
        "gen-key",
        "-o", priv_path.to_str().unwrap(),
        "-p", pub_path.to_str().unwrap(),
        "--passphrase-stdin",
    ]);

    use std::io::Write;
    let mut child = cmd.stdin(std::process::Stdio::piped()).spawn().unwrap();
    if let Some(mut stdin) = child.stdin.take() {
        stdin.write_all(b"stdin-passphrase-123\n").unwrap();
    }
    let output = child.wait_with_output().unwrap();
    assert!(
        output.status.success(),
        "gen-key with --passphrase-stdin should succeed\nstderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );

    let priv_content = fs::read_to_string(&priv_path).unwrap();
    assert!(priv_content.contains("encrypted") || priv_content.contains("v2:"), "should be encrypted");
}
