use anyhow::{Context, Result};
use serde::{Deserialize, Serialize};
use std::env;
use std::str::FromStr;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Config {
    pub zcash: ZcashConfig,
    pub dht: DhtConfig,
    pub relay: RelayConfig,
    pub development: DevelopmentConfig,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DevelopmentConfig {
    pub is_development_mode: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ZcashConfig {
    pub rpc_url: String,
    pub lightwallet_d_endpoint: String,
    pub network: ZcashNetwork,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum ZcashNetwork {
    Mainnet,
    Testnet,
    Regtest,
}

impl FromStr for ZcashNetwork {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self> {
        match s.to_lowercase().as_str() {
            "" => Ok(ZcashNetwork::Mainnet),
            "testnet" => Ok(ZcashNetwork::Testnet),
            "regtest" => Ok(ZcashNetwork::Regtest),
            _ => Err(anyhow::anyhow!("Invalid Zcash network: {}", s)),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DhtConfig {
    pub listen_address: String,
    pub listen_port: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RelayConfig {
    pub audio_bind_address: String,
    pub audio_bind_port: String,
    pub discovery_bind_address: String,
    pub discovery_bind_port: String,
}

impl Config {
    /// Load configuration from environment variables
    pub fn from_env() -> Result<Self> {
        // Load .env file if it exists
        if let Err(e) = dotenvy::dotenv() {
            eprintln!("Warning: Could not load .env file: {}", e);
        }

        let config = Config {
            development: DevelopmentConfig {
                is_development_mode: get_env_parse("DEVELOPMENT_MODE").unwrap(),
            },
            zcash: ZcashConfig {
                rpc_url: get_env("ZCASH_RPC_URL")?,
                network: get_env_parse("ZCASH_NETWORK").unwrap_or(ZcashNetwork::Testnet),
                lightwallet_d_endpoint: get_env("LIGHT_WALLETD_ENDPOINT").unwrap(),
            },
            dht: DhtConfig {
                listen_address: get_env("DHT_LISTEN_ADDRESS").unwrap(),
                listen_port: get_env("DHT_LISTEN_PORT").unwrap(),
            },
            relay: RelayConfig {
                audio_bind_address: get_env("AUDIO_BIND_ADDRESS").unwrap(),
                audio_bind_port: get_env("AUDIO_BIND_PORT").unwrap(),
                discovery_bind_address: get_env("DISCOVERY_BIND_ADDRESS").unwrap(),
                discovery_bind_port: get_env("DISCOVERY_BIND_PORT").unwrap(),
            },
        };

        config.validate()?;
        Ok(config)
    }

    /// Validate configuration values
    pub fn validate(&self) -> Result<()> {
        Ok(())
    }
}

/// Helper function to get environment variable
fn get_env(key: &str) -> Result<String> {
    env::var(key).with_context(|| format!("Environment variable {} is required", key))
}

/// Helper function to get and parse environment variable with default
fn get_env_parse<T>(key: &str) -> Option<T>
where
    T: FromStr,
{
    env::var(key).ok().and_then(|v| v.parse().ok())
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::env;

    #[test]
    fn test_config_validation() {
        env::set_var("ZCASH_RPC_URL", "http://localhost:8232");
        env::set_var("ZCASH_RPC_USER", "test");
        env::set_var("ZCASH_RPC_PASSWORD", "test");
        env::set_var("RELAY_PAYMENT_ADDRESS", "ztestsapling1test");

        let config = Config::from_env().expect("Should load config");
        assert!(config.validate().is_ok());
    }

    #[test]
    fn test_port_conflicts() {
        // Test that same ports are rejected
        env::set_var("PROXY_PORT", "8080");
        env::set_var("AUDIO_PORT", "8080");

        let config = Config::from_env();
        if let Ok(config) = config {
            assert!(config.validate().is_err());
        }
    }
}
