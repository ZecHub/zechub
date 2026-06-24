//! Module for configuration and construction of [`crate::lightclient::LightClient`] and [`crate::wallet::LightWallet`].

use std::{
    collections::BTreeMap,
    num::NonZeroU32,
    path::{Path, PathBuf},
};

use bip0039::{English, Mnemonic};
use http::uri::InvalidUri;

use zcash_protocol::consensus::{BlockHeight, Parameters};

use pepper_sync::config::{SyncConfig, TransparentAddressDiscovery};
use zingo_common_components::protocol::ActivationHeights;

use crate::wallet::{
    WalletBase, WalletSettings,
    error::{KeyError, WalletError},
    keys::unified::UnifiedKeyStore,
};

/// Default indexer uri
pub const DEFAULT_INDEXER_URI: &str = "https://zec.rocks:443";
/// Default indexer uri (testnet)
pub const DEFAULT_INDEXER_URI_TESTNET: &str = "https://testnet.zec.rocks";
/// Default wallet file name
pub const DEFAULT_WALLET_NAME: &str = "zingo-wallet.dat";

/// The network types a lightclient can connect to.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum ChainType {
    /// Mainnet
    Mainnet,
    /// Testnet
    Testnet,
    /// Regtest
    Regtest(ActivationHeights),
}

impl std::fmt::Display for ChainType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let chain = match self {
            ChainType::Mainnet => "mainnet",
            ChainType::Testnet => "testnet",
            ChainType::Regtest(_) => "regtest",
        };
        write!(f, "{chain}")
    }
}

impl TryFrom<&str> for ChainType {
    type Error = InvalidChainType;

    fn try_from(value: &str) -> Result<Self, Self::Error> {
        match value {
            "mainnet" => Ok(ChainType::Mainnet),
            "testnet" => Ok(ChainType::Testnet),
            "regtest" => Ok(ChainType::Regtest(ActivationHeights::default())),
            _ => Err(InvalidChainType(value.to_string())),
        }
    }
}

pub(crate) mod consealed {
    use zcash_protocol::consensus::{
        BlockHeight, MAIN_NETWORK, NetworkType, NetworkUpgrade, Parameters, TEST_NETWORK,
    };

    use super::ChainType;

    impl Parameters for ChainType {
        fn network_type(&self) -> NetworkType {
            match self {
                ChainType::Mainnet => NetworkType::Main,
                ChainType::Testnet => NetworkType::Test,
                ChainType::Regtest(_) => NetworkType::Regtest,
            }
        }

        fn activation_height(&self, nu: NetworkUpgrade) -> Option<BlockHeight> {
            match self {
                ChainType::Mainnet => MAIN_NETWORK.activation_height(nu),
                ChainType::Testnet => TEST_NETWORK.activation_height(nu),
                ChainType::Regtest(activation_heights) => match nu {
                    NetworkUpgrade::Overwinter => {
                        activation_heights.overwinter().map(BlockHeight::from_u32)
                    }
                    NetworkUpgrade::Sapling => {
                        activation_heights.sapling().map(BlockHeight::from_u32)
                    }
                    NetworkUpgrade::Blossom => {
                        activation_heights.blossom().map(BlockHeight::from_u32)
                    }
                    NetworkUpgrade::Heartwood => {
                        activation_heights.heartwood().map(BlockHeight::from_u32)
                    }
                    NetworkUpgrade::Canopy => {
                        activation_heights.canopy().map(BlockHeight::from_u32)
                    }
                    NetworkUpgrade::Nu5 => activation_heights.nu5().map(BlockHeight::from_u32),
                    NetworkUpgrade::Nu6 => activation_heights.nu6().map(BlockHeight::from_u32),
                    NetworkUpgrade::Nu6_1 => activation_heights.nu6_1().map(BlockHeight::from_u32),
                },
            }
        }
    }
}

/// Invalid chain type.
#[derive(thiserror::Error, Debug)]
#[error("Invalid chain type '{0}'. Expected one of: 'mainnet', 'testnet' or 'regtest'.")]
pub struct InvalidChainType(String);

/// Configuration data for the construction of a [`crate::wallet::LightWallet`].
#[derive(Clone, Debug, PartialEq, Eq)]
pub enum WalletConfig {
    /// Generate a wallet with a new seed for a number of accounts.
    NewSeed {
        no_of_accounts: NonZeroU32,
        chain_height: u32,
        wallet_settings: WalletSettings,
    },
    /// Generate a wallet from a mnemonic phrase for a number of accounts.
    MnemonicPhrase {
        mnemonic_phrase: String,
        no_of_accounts: NonZeroU32,
        birthday: u32,
        wallet_settings: WalletSettings,
    },
    /// Generate a wallet from an encoded unified full viewing key.
    // TODO: take concrete UFVK type
    Ufvk {
        ufvk: String,
        birthday: u32,
        wallet_settings: WalletSettings,
    },
    /// Generate a wallet from a unified spending key.
    // TODO: take concrete USK type
    Usk {
        usk: Vec<u8>,
        birthday: u32,
        wallet_settings: WalletSettings,
    },
    /// Read from wallet file.
    Read,
}

impl WalletConfig {
    /// Resolves the wallet config into the base data needed to construct the wallet.
    ///
    /// `NewSeed` generates the wallet base data from a new 24-word mnemonic.
    #[allow(clippy::result_large_err)]
    pub(crate) fn resolve(self, chain_type: ChainType) -> Result<WalletBase, WalletError> {
        match self {
            WalletConfig::NewSeed {
                no_of_accounts,
                chain_height,
                wallet_settings,
            } => {
                let sapling_activation_height = chain_type
                    .activation_height(zcash_protocol::consensus::NetworkUpgrade::Sapling)
                    .expect("should have some sapling activation height");
                let birthday =
                    sapling_activation_height.max(BlockHeight::from_u32(chain_height) - 100);

                WalletConfig::MnemonicPhrase {
                    mnemonic_phrase: Mnemonic::<English>::generate(bip0039::Count::Words24)
                        .into_phrase(),
                    no_of_accounts,
                    birthday: u32::from(birthday),
                    wallet_settings,
                }
                .resolve(chain_type)
            }
            WalletConfig::MnemonicPhrase {
                mnemonic_phrase: mnemonic,
                no_of_accounts,
                birthday,
                wallet_settings,
            } => {
                let mnemonic = Mnemonic::from_phrase(mnemonic)?;
                let no_of_accounts = u32::from(no_of_accounts);
                let unified_key_store = (0..no_of_accounts)
                    .map(|account_index| {
                        let account_id = zip32::AccountId::try_from(account_index)?;
                        Ok((
                            account_id,
                            UnifiedKeyStore::new_from_mnemonic(chain_type, &mnemonic, account_id)?,
                        ))
                    })
                    .collect::<Result<BTreeMap<_, _>, KeyError>>()?;
                Ok(WalletBase {
                    unified_key_store,
                    mnemonic: Some(mnemonic),
                    birthday: BlockHeight::from_u32(birthday),
                    wallet_settings,
                })
            }
            WalletConfig::Ufvk {
                ufvk,
                birthday,
                wallet_settings,
            } => {
                let mut unified_key_store = BTreeMap::new();
                unified_key_store.insert(
                    zip32::AccountId::ZERO,
                    UnifiedKeyStore::new_from_ufvk(chain_type, ufvk)?,
                );
                Ok(WalletBase {
                    unified_key_store,
                    mnemonic: None,
                    birthday: BlockHeight::from_u32(birthday),
                    wallet_settings,
                })
            }
            WalletConfig::Usk {
                usk,
                birthday,
                wallet_settings,
            } => {
                let mut unified_key_store = BTreeMap::new();
                unified_key_store.insert(
                    zip32::AccountId::ZERO,
                    UnifiedKeyStore::new_from_usk(usk.as_slice())?,
                );
                Ok(WalletBase {
                    unified_key_store,
                    mnemonic: None,
                    birthday: BlockHeight::from_u32(birthday),
                    wallet_settings,
                })
            }
            WalletConfig::Read => Err(WalletError::WalletAlreadyCreated),
        }
    }
}

/// Constructs a http::Uri from a `server` string. If `server` is `None` use the `DEFAULT_INDEXER_URI`.
/// If the provided string is missing the http prefix, a prefix of `http://` will be added.
/// If the provided string is missing a port, a port of `:9067` will be added.
pub fn construct_lightwalletd_uri(server: Option<String>) -> Result<http::Uri, InvalidUri> {
    match server {
        Some(s) => {
            if s.is_empty() {
                return Ok(http::Uri::default());
            } else {
                let mut s = if s.starts_with("http") {
                    s
                } else {
                    "http://".to_string() + &s
                };
                let uri: http::Uri = s.parse()?;
                if uri.port().is_none() {
                    s += ":9067";
                }
                s
            }
        }
        None => DEFAULT_INDEXER_URI.to_string(),
    }
    .parse()
}

/// Configuration data for the construction of a [`crate::lightclient::LightClient`].
#[derive(Clone, Debug)]
pub struct ClientConfig {
    /// URI of the indexer the lightclient is connected to.
    indexer_uri: http::Uri,
    /// Chain type of the blockchain the lightclient is connected to.
    chain_type: ChainType,
    /// Directory where the wallet file will be created. By default, this will be in ~/.zcash on Linux and %APPDATA%\Zcash on Windows.
    wallet_dir: PathBuf,
    /// Wallet file name. This will be created in the `wallet_dir`.
    wallet_name: String,
    /// Wallet config.
    wallet_config: WalletConfig,
}

impl ClientConfig {
    /// Constructs a default builder.
    #[must_use]
    pub fn builder() -> ClientConfigBuilder {
        ClientConfigBuilder::default()
    }

    /// Returns indexer URI.
    #[must_use]
    pub fn indexer_uri(&self) -> http::Uri {
        self.indexer_uri.clone()
    }

    /// Returns wallet directory.
    #[must_use]
    pub fn chain_type(&self) -> ChainType {
        self.chain_type
    }

    /// Returns wallet directory.
    #[must_use]
    pub fn wallet_dir(&self) -> PathBuf {
        self.wallet_dir.clone()
    }

    /// Returns wallet file name.
    #[must_use]
    pub fn wallet_name(&self) -> &str {
        &self.wallet_name
    }

    /// Returns wallet config.
    #[must_use]
    pub fn wallet_config(&self) -> WalletConfig {
        self.wallet_config.clone()
    }

    /// Returns full path to wallet file.
    #[must_use]
    pub fn get_wallet_path(&self) -> Box<Path> {
        let mut wallet_path = self.wallet_dir();
        wallet_path.push(self.wallet_name());

        wallet_path.into_boxed_path()
    }
}

/// Builder for [`ClientConfig`].
#[derive(Clone, Debug)]
pub struct ClientConfigBuilder {
    indexer_uri: Option<http::Uri>,
    chain_type: ChainType,
    wallet_dir: Option<PathBuf>,
    wallet_name: Option<String>,
    wallet_config: WalletConfig,
}

impl ClientConfigBuilder {
    /// Constructs a new builder for [`ClientConfig`].
    pub fn new() -> Self {
        Self::default()
    }

    /// Set indexer URI.
    ///
    /// TODO: Will be renamed `set_indexer` and accept an `Indexer` type from
    /// `zingo-netutils` instead of `http::Uri`.
    pub fn set_indexer_uri(mut self, indexer_uri: http::Uri) -> Self {
        self.indexer_uri = Some(indexer_uri);
        self
    }

    /// Set chain type.
    pub fn set_chain_type(mut self, chain_type: ChainType) -> Self {
        self.chain_type = chain_type;
        self
    }

    /// Set wallet directory.
    pub fn set_wallet_dir(mut self, dir: PathBuf) -> Self {
        self.wallet_dir = Some(dir);
        self
    }

    /// Set wallet file name.
    pub fn set_wallet_name(mut self, wallet_name: String) -> Self {
        self.wallet_name = Some(wallet_name);
        self
    }

    /// Set wallet config.
    pub fn set_wallet_config(mut self, wallet_config: WalletConfig) -> Self {
        self.wallet_config = wallet_config;
        self
    }

    /// Build a [`ClientConfig`] from the builder.
    pub fn build(self) -> ClientConfig {
        let wallet_dir = wallet_dir_or_default(self.wallet_dir, self.chain_type);
        let wallet_name = wallet_name_or_default(self.wallet_name);
        ClientConfig {
            indexer_uri: self
                .indexer_uri
                .clone()
                .unwrap_or_else(|| DEFAULT_INDEXER_URI.parse().expect("valid constant URI")),
            chain_type: self.chain_type,
            wallet_dir,
            wallet_name,
            wallet_config: self.wallet_config,
        }
    }
}

impl Default for ClientConfigBuilder {
    fn default() -> Self {
        Self {
            indexer_uri: None,
            wallet_dir: None,
            wallet_name: None,
            chain_type: ChainType::Mainnet,
            wallet_config: WalletConfig::NewSeed {
                no_of_accounts: NonZeroU32::try_from(1).expect("hard coded non-zero integer"),
                chain_height: 1,
                wallet_settings: WalletSettings {
                    sync_config: SyncConfig {
                        transparent_address_discovery: TransparentAddressDiscovery::minimal(),
                        performance_level: pepper_sync::config::PerformanceLevel::High,
                    },
                    min_confirmations: NonZeroU32::try_from(3)
                        .expect("hard coded non-zero integer"),
                },
            },
        }
    }
}

fn wallet_name_or_default(opt_wallet_name: Option<String>) -> String {
    let wallet_name = opt_wallet_name.unwrap_or_else(|| DEFAULT_WALLET_NAME.into());
    if wallet_name.is_empty() {
        DEFAULT_WALLET_NAME.into()
    } else {
        wallet_name
    }
}

fn wallet_dir_or_default(opt_wallet_dir: Option<PathBuf>, chain: ChainType) -> PathBuf {
    let wallet_dir: PathBuf;
    #[cfg(any(target_os = "ios", target_os = "android"))]
    {
        // TODO: handle errors
        wallet_dir = opt_wallet_dir.unwrap();
    }

    #[cfg(not(any(target_os = "ios", target_os = "android")))]
    {
        wallet_dir = opt_wallet_dir.clone().unwrap_or_else(|| {
            let mut dir = dirs::data_dir().expect("Couldn't determine user's data directory!");

            #[cfg(any(target_os = "macos", target_os = "windows"))]
            {
                dir.push("Zcash");
            }

            #[cfg(not(any(target_os = "macos", target_os = "windows")))]
            {
                dir.push(".zcash");
            }

            match chain {
                ChainType::Mainnet => {}
                ChainType::Testnet => dir.push("testnet3"),
                ChainType::Regtest(_) => dir.push("regtest"),
            }

            dir
        });

        // Create directory if it doesn't exist on non-mobile platforms
        match std::fs::create_dir_all(wallet_dir.clone()) {
            Ok(()) => {}
            Err(e) => {
                panic!("Couldn't create zcash directory!\n {e}");
            }
        }
    }

    wallet_dir
}

#[cfg(test)]
mod tests {
    use crate::config::{ChainType, ClientConfig};

    #[tokio::test]
    async fn test_load_clientconfig() {
        let valid_uri = crate::config::construct_lightwalletd_uri(Some(
            crate::config::DEFAULT_INDEXER_URI.to_string(),
        ))
        .unwrap();

        let temp_dir = tempfile::TempDir::new().unwrap();
        let temp_path = temp_dir.path().to_path_buf();

        let valid_config = ClientConfig::builder()
            .set_indexer_uri(valid_uri.clone())
            .set_chain_type(ChainType::Mainnet)
            .set_wallet_dir(temp_path)
            .build();

        assert_eq!(valid_config.indexer_uri(), valid_uri);
        assert_eq!(valid_config.chain_type(), ChainType::Mainnet);
    }
}
