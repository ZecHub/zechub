// Chain tests that modify HOME are run sequentially to avoid race conditions.

use std::sync::Mutex;

static CHAIN_TEST_LOCK: Mutex<()> = Mutex::new(());

use zhac::chain::{
    CURATED_ENDPOINTS, NodeConfig,
    config_dir, has_node, load_node_config, node_config_path, probe_endpoint,
    require_node, save_node_config,
};

#[test]
fn curated_endpoints_are_https() {
    assert!(!CURATED_ENDPOINTS.is_empty());
    for ep in CURATED_ENDPOINTS {
        assert!(ep.url.starts_with("https://"), "{} not https", ep.label);
        assert!(!ep.label.is_empty());
    }
}

#[test]
fn node_config_roundtrip() {
    let config = NodeConfig {
        endpoint: "https://zec.rocks:443".into(),
        label: "test".into(),
        version: "0.4.19".into(),
        chain: Some("main".into()),
        selected_at: "1234567890".into(),
    };
    let json = serde_json::to_string(&config).unwrap();
    let r: NodeConfig = serde_json::from_str(&json).unwrap();
    assert_eq!(config.endpoint, r.endpoint);
    assert_eq!(config.label, r.label);
    assert_eq!(config.version, r.version);
    assert_eq!(config.chain, r.chain);
}

#[test]
fn save_and_load_node_config() {
    let dir = tempfile::tempdir().unwrap();
    let _guard = CHAIN_TEST_LOCK.lock().unwrap();
    let orig_home = std::env::var("HOME").unwrap_or_default();
    std::env::set_var("HOME", dir.path());

    let config = NodeConfig {
        endpoint: "https://zec.rocks:443".into(),
        label: "test".into(),
        version: "0.4.19".into(),
        chain: Some("main".into()),
        selected_at: "999".into(),
    };
    save_node_config(&config).unwrap();
    let loaded = load_node_config().unwrap();
    assert_eq!(loaded.endpoint, config.endpoint);

    std::env::set_var("HOME", orig_home);
}

#[test]
fn require_node_returns_error_without_config() {
    let dir = tempfile::tempdir().unwrap();
    let _guard = CHAIN_TEST_LOCK.lock().unwrap();
    let orig_home = std::env::var("HOME").unwrap_or_default();
    std::env::set_var("HOME", dir.path());

    let result = require_node();
    assert!(result.is_err());

    std::env::set_var("HOME", orig_home);
}

#[test]
fn has_node_returns_false_without_config() {
    let dir = tempfile::tempdir().unwrap();
    let _guard = CHAIN_TEST_LOCK.lock().unwrap();
    let orig_home = std::env::var("HOME").unwrap_or_default();
    std::env::set_var("HOME", dir.path());

    assert!(!has_node());

    std::env::set_var("HOME", orig_home);
}

#[test]
fn has_node_returns_true_with_config() {
    let dir = tempfile::tempdir().unwrap();
    let _guard = CHAIN_TEST_LOCK.lock().unwrap();
    let orig_home = std::env::var("HOME").unwrap_or_default();
    std::env::set_var("HOME", dir.path().as_os_str());

    std::fs::create_dir_all(dir.path().join(".zhac")).unwrap();

    let config = NodeConfig {
        endpoint: "https://zec.rocks:443".into(),
        label: "test".into(),
        version: String::new(),
        chain: None,
        selected_at: "0".into(),
    };
    save_node_config(&config).unwrap();
    assert!(has_node());

    let _ = std::fs::remove_file(dir.path().join(".zhac").join("node.json"));
    std::env::set_var("HOME", &orig_home);
}

#[test]
fn config_dir_creates_directory() {
    let dir = tempfile::tempdir().unwrap();
    let _guard = CHAIN_TEST_LOCK.lock().unwrap();
    let orig_home = std::env::var("HOME").unwrap_or_default();
    std::env::set_var("HOME", dir.path());

    let path = config_dir().unwrap();
    assert!(path.exists());
    assert!(path.to_string_lossy().contains(".zhac"));

    std::env::set_var("HOME", orig_home);
}

#[test]
fn node_config_path_in_config_dir() {
    let dir = tempfile::tempdir().unwrap();
    let _guard = CHAIN_TEST_LOCK.lock().unwrap();
    let orig_home = std::env::var("HOME").unwrap_or_default();
    std::env::set_var("HOME", dir.path());

    let path = node_config_path().unwrap();
    assert!(path.to_string_lossy().contains("node.json"));
    assert!(path.to_string_lossy().contains(".zhac"));

    std::env::set_var("HOME", orig_home);
}

#[test]
fn probe_endpoint_unreachable() {
    let r = probe_endpoint("http://127.0.0.1:1");
    assert!(!r.alive);
    assert!(r.error.is_some());
}
