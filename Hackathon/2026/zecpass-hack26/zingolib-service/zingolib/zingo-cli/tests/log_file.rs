use std::io::Write;
use std::path::PathBuf;
use std::process::{Command, Stdio};

/// Resolves the `zingo-cli` binary path.
///
/// First tries the compile-time path from `CARGO_BIN_EXE_zingo-cli`.
/// If that doesn't exist (e.g. nextest archive on a different machine),
/// falls back to locating it relative to the current test binary,
/// which is in `target/debug/deps/` — the `zingo-cli` binary is in
/// `target/debug/`.
fn zingo_cli_binary() -> PathBuf {
    let compile_time = PathBuf::from(env!("CARGO_BIN_EXE_zingo-cli"));
    if compile_time.exists() {
        return compile_time;
    }
    // Fallback: resolve relative to the test binary location.
    let test_exe = std::env::current_exe().expect("current_exe");
    let deps_dir = test_exe.parent().expect("deps dir");
    let target_dir = deps_dir.parent().expect("target dir");
    let candidate = target_dir.join("zingo-cli");
    assert!(
        candidate.exists(),
        "Could not find zingo-cli binary at {} or {}",
        compile_time.display(),
        candidate.display()
    );
    candidate
}

/// Launches zingo-cli in interactive mode with a local-only wallet
/// (seed + birthday, nosync) and verifies that the tracing subscriber
/// writes to the log file and not to stderr.
///
/// Uses RUST_LOG=info so that startup info messages are emitted,
/// providing observable output to verify the redirect.
#[test]
fn interactive_mode_redirects_tracing_to_log_file() {
    let tmp = tempfile::tempdir().expect("create temp dir");
    let log_path = tmp.path().join("cli.log");
    let data_dir = tmp.path().join("wallets");

    let mut child = Command::new(zingo_cli_binary())
        .env("RUST_LOG", "info")
        .arg("--server")
        .arg("https://zec.rocks:443")
        .arg("--data-dir")
        .arg(&data_dir)
        .arg("--log-file")
        .arg(&log_path)
        .arg("--nosync")
        .arg("--seed")
        .arg("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art")
        .arg("--birthday")
        .arg("600000")
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .expect("failed to spawn zingo-cli");

    std::thread::sleep(std::time::Duration::from_secs(3));
    if let Some(ref mut stdin) = child.stdin {
        let _ = writeln!(stdin, "quit");
    }

    let output = child.wait_with_output().expect("failed to wait on child");

    let log_contents = std::fs::read_to_string(&log_path).unwrap_or_default();
    assert!(
        log_contents.contains("Starting Zingo-CLI"),
        "Expected 'Starting Zingo-CLI' in log file at {}, but got:\n{log_contents}",
        log_path.display()
    );

    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(
        stderr.is_empty(),
        "Expected empty stderr (tracing should go to log file), but got:\n{stderr}"
    );
}

/// The error string that pepper_sync's `#[instrument(err)]` on
/// `get_latest_block` logs when the gRPC call fails.
const EXPECTED_ERROR: &str = "pepper_sync::client::fetch";

/// Starts a mock gRPC server where all methods return `DEADLINE_EXCEEDED`.
/// The `#[instrument(err)]` on pepper_sync's `get_latest_block` emits a
/// tracing ERROR when sync calls it and gets the error back.
///
/// Verifies:
/// - The log file contains `ERROR` and the specific error message
/// - stderr does NOT contain formatted tracing ERROR lines
#[tokio::test]
async fn tracing_error_from_pepper_sync_goes_to_log_file() {
    use zingo_grpc_proxy::tonic_reexport as tonic;
    use zingo_grpc_proxy::{CompactTxStreamerServer, ConfigurableMockStreamer, MockConfig};

    let config = MockConfig::all_error(tonic::Code::DeadlineExceeded, EXPECTED_ERROR);
    let svc = CompactTxStreamerServer::new(ConfigurableMockStreamer::new(config));

    let listener = tokio::net::TcpListener::bind("127.0.0.1:0")
        .await
        .expect("bind mock server");
    let port = listener.local_addr().expect("local addr").port();
    let server_uri = format!("http://127.0.0.1:{port}");

    let incoming = tokio_stream::wrappers::TcpListenerStream::new(listener);
    tokio::spawn(async move {
        tonic::transport::Server::builder()
            .add_service(svc)
            .serve_with_incoming(incoming)
            .await
            .ok();
    });
    tokio::time::sleep(std::time::Duration::from_millis(100)).await;

    let tmp = tempfile::tempdir().expect("create temp dir");
    let log_path = tmp.path().join("cli.log");
    let data_dir = tmp.path().join("wallets");

    let mut child = Command::new(zingo_cli_binary())
        .env("RUST_LOG", "error")
        .arg("--server")
        .arg(&server_uri)
        .arg("--data-dir")
        .arg(&data_dir)
        .arg("--log-file")
        .arg(&log_path)
        .arg("--seed")
        .arg("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art")
        .arg("--birthday")
        .arg("600000")
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .expect("failed to spawn zingo-cli");

    // pepper_sync's UNARY_RPC_TIMEOUT is 10s. Wait long enough for the
    // timeout to fire, the error to be logged, and the poll loop to run.
    std::thread::sleep(std::time::Duration::from_secs(12));

    if let Some(ref mut stdin) = child.stdin {
        let _ = writeln!(stdin, "quit");
    }

    let output = child.wait_with_output().expect("failed to wait on child");

    let log_contents = std::fs::read_to_string(&log_path).unwrap_or_default();
    assert!(
        log_contents.contains("ERROR") && log_contents.contains(EXPECTED_ERROR),
        "Expected tracing ERROR with '{EXPECTED_ERROR}' in log file at {}.\nLog contents:\n{log_contents}",
        log_path.display()
    );

    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(
        !stderr.contains(" ERROR "),
        "Tracing errors should go to the log file, not stderr. Got:\n{stderr}"
    );
}
