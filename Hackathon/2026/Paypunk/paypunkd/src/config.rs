use std::path::{Path, PathBuf};

use paypunk_config::PaypunkConfig;

/// Source of configuration values — allows swapping hardcoded defaults
/// for user-config-file values later without changing consumers.
pub trait ConfigSource {
    fn paypunkd_socket_path(&self) -> &str;
    fn keypunkd_socket_path(&self) -> &str;
    fn data_dir(&self) -> &Path;
    fn config_dir(&self) -> &Path;
    fn ethereum_rpc_url(&self) -> &str;
    fn lightwalletd_host(&self) -> &str;
    fn zcash_network(&self) -> &str;
}

/// Hardcoded default configuration.
///
/// All values are compile-time constants.
pub struct HardcodedConfig;

impl HardcodedConfig {
    fn home_dir() -> PathBuf {
        PathBuf::from(std::env::var("HOME").expect("HOME environment variable must be set"))
    }
}

impl ConfigSource for HardcodedConfig {
    fn paypunkd_socket_path(&self) -> &str {
        "/tmp/paypunkd.sock"
    }

    fn keypunkd_socket_path(&self) -> &str {
        "/tmp/keypunkd.sock"
    }

    fn data_dir(&self) -> &Path {
        let path = Self::home_dir().join(".local/share/paypunk/");
        Box::leak(path.into_boxed_path())
    }

    fn config_dir(&self) -> &Path {
        let path = Self::home_dir().join(".config/paypunk/");
        Box::leak(path.into_boxed_path())
    }

    fn ethereum_rpc_url(&self) -> &str {
        "http://127.0.0.1:8545"
    }

    fn lightwalletd_host(&self) -> &str {
        "http://127.0.0.1:9067"
    }

    fn zcash_network(&self) -> &str {
        "regtest"
    }
}

/// Wraps a `PaypunkConfig` (from the paypunk-config crate) as a `ConfigSource`.
pub struct TomlConfig {
    config: PaypunkConfig,
}

impl TomlConfig {
    pub fn new(config: PaypunkConfig) -> Self {
        Self { config }
    }
}

impl ConfigSource for TomlConfig {
    fn paypunkd_socket_path(&self) -> &str {
        &self.config.paypunkd_socket_path
    }

    fn keypunkd_socket_path(&self) -> &str {
        &self.config.keypunkd_socket_path
    }

    fn data_dir(&self) -> &Path {
        Path::new(&self.config.data_dir)
    }

    fn config_dir(&self) -> &Path {
        Path::new(&self.config.config_dir)
    }

    fn ethereum_rpc_url(&self) -> &str {
        &self.config.ethereum_rpc_url
    }

    fn lightwalletd_host(&self) -> &str {
        &self.config.lightwalletd_host
    }

    fn zcash_network(&self) -> &str {
        &self.config.zcash_network
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_hardcoded_config_defaults() {
        let config = HardcodedConfig;
        assert!(config.paypunkd_socket_path().contains("paypunkd.sock"));
        assert!(config.keypunkd_socket_path().contains("keypunkd.sock"));
        assert!(config.data_dir().to_string_lossy().contains("paypunk"));
    }

    #[test]
    fn test_config_source_trait() {
        let config: &dyn ConfigSource = &HardcodedConfig;
        assert!(!config.paypunkd_socket_path().is_empty());
    }

    #[test]
    fn test_toml_config_wrapper() {
        let pc = paypunk_config::PaypunkConfig::default();
        let config = TomlConfig::new(pc);
        assert!(config.paypunkd_socket_path().contains("paypunkd.sock"));
        assert!(config.keypunkd_socket_path().contains("keypunkd.sock"));
        assert!(!config.ethereum_rpc_url().is_empty());
    }
}
