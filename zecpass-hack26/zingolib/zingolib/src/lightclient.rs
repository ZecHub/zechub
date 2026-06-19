//! TODO: Add Mod Description Here!

use std::{
    fs::File,
    io::BufReader,
    path::{Path, PathBuf},
    sync::{
        Arc,
        atomic::{AtomicBool, AtomicU8},
    },
    time::Duration,
};

use json::JsonValue;
use tokio::{sync::RwLock, task::JoinHandle};

use bip0039::Mnemonic;
use zcash_client_backend::tor;
use zcash_keys::address::UnifiedAddress;
use zcash_protocol::consensus::BlockHeight;
use zcash_transparent::address::TransparentAddress;

use pepper_sync::{
    error::SyncError, keys::transparent::TransparentAddressId, sync::SyncResult, wallet::SyncMode,
};
use zingo_netutils::Indexer as _;

use crate::{
    config::{ChainType, ClientConfig, WalletConfig},
    utils::now,
    wallet::{
        LightWallet,
        balance::AccountBalance,
        error::{BalanceError, KeyError, SummaryError, WalletError},
        keys::unified::{ReceiverSelection, UnifiedAddressId},
        summary::data::{
            TransactionSummaries, ValueTransfers,
            finsight::{TotalMemoBytesToAddress, TotalSendsToAddress, TotalValueToAddress},
        },
    },
};
use error::LightClientError;

pub mod error;
pub mod propose;
pub mod save;
pub mod send;
pub mod sync;

pub const DEFAULT_REQUEST_TIMEOUT: Duration = Duration::from_secs(10);

/// Wallet struct owned by a [`crate::lightclient::LightClient`], with metadata and immutable wallet data stored outside
/// the read/write lock.
struct WalletMeta {
    /// Full path to wallet file.
    wallet_path: PathBuf,
    /// The chain type, extracted at construction for lock-free access.
    chain_type: ChainType,
    /// The wallet birthday height.
    birthday: BlockHeight,
    /// The mnemonic seed phrase, if this is a spending wallet.
    mnemonic: Option<Mnemonic>,
    /// The locked mutable wallet state.
    wallet_data: Arc<RwLock<LightWallet>>,
}

impl std::fmt::Debug for WalletMeta {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("WalletMeta")
            .field("wallet_path", &self.wallet_path)
            .field("chain_type", &self.chain_type)
            .field("birthday", &self.birthday)
            .field("mnemonic", &self.mnemonic)
            .finish()
    }
}

impl WalletMeta {
    /// Creates a new `WalletMeta` by wrapping a [`crate::wallet::LightWallet`] in a lock alongside metadata and
    /// immutable wallet data.
    fn new(wallet_path: PathBuf, wallet: LightWallet) -> Self {
        Self {
            wallet_path,
            chain_type: wallet.chain_type(),
            birthday: wallet.birthday(),
            mnemonic: wallet.mnemonic().cloned(),
            wallet_data: Arc::new(RwLock::new(wallet)),
        }
    }
}

/// Struct which owns and manages the [`crate::wallet::LightWallet`]. Responsible for network operations such as
/// storing the indexer URI, creating gRPC clients and syncing the wallet to the blockchain.
///
/// `sync_mode` is an atomic representation of [`pepper_sync::wallet::SyncMode`].
pub struct LightClient {
    indexer: zingo_netutils::GrpcIndexer,
    tor_client: Option<tor::Client>,
    wallet: WalletMeta,
    sync_mode: Arc<AtomicU8>,
    sync_handle: Option<JoinHandle<Result<SyncResult, SyncError<WalletError>>>>,
    save_active: Arc<AtomicBool>,
    save_handle: Option<JoinHandle<std::io::Result<()>>>,
}

impl LightClient {
    /// Creates a `LightClient` from [`crate::config::ClientConfig`].
    ///
    /// Will fail if a wallet file already exists in the given data directory unless `overwrite` is `true` or the
    /// [`crate::config::WalletConfig`] is of `Read` variant.
    /// `overwrite` has no effect if a wallet is being read from file.
    #[allow(clippy::result_large_err)]
    pub async fn new(config: ClientConfig, overwrite: bool) -> Result<Self, LightClientError> {
        // GrpcIndexer::new pre-builds a TLS endpoint, which requires a rustls CryptoProvider.
        // install_default is idempotent: Ok(()) on first call, Err on subsequent (ignored).
        let _ = rustls::crypto::ring::default_provider().install_default();

        let wallet = match config.wallet_config() {
            WalletConfig::Read => {
                let buffer = BufReader::new(
                    File::open(config.get_wallet_path()).map_err(LightClientError::FileError)?,
                );

                LightWallet::read(buffer, config.chain_type())
                    .map_err(LightClientError::FileError)?
            }
            _ => {
                #[cfg(not(any(target_os = "ios", target_os = "android")))]
                {
                    if !overwrite && config.get_wallet_path().exists() {
                        return Err(LightClientError::FileError(std::io::Error::new(
                            std::io::ErrorKind::AlreadyExists,
                            format!(
                                "Cannot save to given data directory as a wallet file already exists at:\n{}",
                                config.get_wallet_path().display()
                            ),
                        )));
                    }
                }

                LightWallet::new(config.chain_type(), config.wallet_config())?
            }
        };

        // Install the ring crypto provider for rustls. Required because both
        // `ring` and `aws-lc-rs` features are unified in via transitive deps,
        // preventing rustls from auto-selecting a provider.
        let _ = rustls::crypto::ring::default_provider().install_default();

        let indexer = zingo_netutils::GrpcIndexer::new(config.indexer_uri()).await?;

        Ok(LightClient {
            indexer,
            tor_client: None,
            wallet: WalletMeta::new(config.get_wallet_path().to_path_buf(), wallet),
            sync_mode: Arc::new(AtomicU8::new(SyncMode::NotRunning as u8)),
            sync_handle: None,
            save_active: Arc::new(AtomicBool::new(false)),
            save_handle: None,
        })
    }

    /// Returns the chain type for lock-free access.
    pub fn chain_type(&self) -> ChainType {
        self.wallet.chain_type
    }

    /// Returns the wallet birthday height for lock-free access.
    pub fn birthday(&self) -> u32 {
        u32::from(self.wallet.birthday)
    }

    /// Returns the wallet's mnemonic phrase as a string.
    pub fn mnemonic_phrase(&self) -> Option<String> {
        self.wallet
            .mnemonic
            .as_ref()
            .map(|m| m.phrase().to_string())
    }

    /// Returns full path to wallet file.
    pub fn wallet_path(&self) -> PathBuf {
        self.wallet.wallet_path.clone()
    }

    /// Returns path to the directory which holds the wallet file.
    pub fn wallet_dir(&self) -> Result<PathBuf, LightClientError> {
        self.wallet
            .wallet_path
            .parent()
            .map(Path::to_path_buf)
            .ok_or_else(|| {
                LightClientError::FileError(std::io::Error::other("wallet directory not found!"))
            })
    }

    /// Returns a reference to the locked mutable wallet state.
    // TODO: remove this from public API and replace with APIs to pass through all wallet methods without the consumer having access to the rwlock
    pub fn wallet(&self) -> &Arc<RwLock<LightWallet>> {
        &self.wallet.wallet_data
    }

    /// Returns tor client.
    pub fn tor_client(&self) -> Option<&tor::Client> {
        self.tor_client.as_ref()
    }

    /// Returns URI of the indexer the lightclient is connected to.
    pub fn indexer_uri(&self) -> &http::Uri {
        self.indexer.uri()
    }

    /// Set indexer URI.
    ///
    /// Replaces the current gRPC client(s) with new ones that point at the provided URI.
    pub async fn set_indexer_uri(
        &mut self,
        server: http::Uri,
    ) -> Result<(), zingo_netutils::GetClientError> {
        self.indexer = zingo_netutils::GrpcIndexer::new(server).await?;
        Ok(())
    }

    /// Creates a tor client for current price updates.
    ///
    /// If `tor_dir` is `None` it will be set to a directory named "tor" within the wallet's data directory.
    pub async fn create_tor_client(
        &mut self,
        tor_dir: Option<PathBuf>,
    ) -> Result<(), LightClientError> {
        let wallet_dir = self.wallet_dir()?;
        let tor_dir = tor_dir.unwrap_or_else(|| wallet_dir.join("tor"));
        tokio::fs::create_dir_all(tor_dir.as_path())
            .await
            .map_err(LightClientError::FileError)?;
        self.tor_client = Some(tor::Client::create(tor_dir.as_path(), |_| {}).await?);

        Ok(())
    }

    /// Removes the tor client.
    pub async fn remove_tor_client(&mut self) {
        self.tor_client = None;
    }

    /// Returns server information.
    // TODO: return concrete struct with from json impl
    pub async fn do_info(&mut self) -> String {
        match self.indexer.get_lightd_info(DEFAULT_REQUEST_TIMEOUT).await {
            Ok(i) => {
                let o = json::object! {
                    "version" => i.version,
                    "git_commit" => i.git_commit,
                    "server_uri" => self.indexer.uri().to_string(),
                    "vendor" => i.vendor,
                    "taddr_support" => i.taddr_support,
                    "chain_name" => i.chain_name,
                    "sapling_activation_height" => i.sapling_activation_height,
                    "consensus_branch_id" => i.consensus_branch_id,
                    "latest_block_height" => i.block_height
                };
                o.pretty(2)
            }
            Err(e) => format!("{e:?}"),
        }
    }

    /// Wrapper for [`crate::wallet::LightWallet::generate_unified_address`].
    pub async fn generate_unified_address(
        &mut self,
        receivers: ReceiverSelection,
        account_id: zip32::AccountId,
    ) -> Result<(UnifiedAddressId, UnifiedAddress), KeyError> {
        self.wallet()
            .write()
            .await
            .generate_unified_address(receivers, account_id)
    }

    /// Wrapper for [`crate::wallet::LightWallet::generate_transparent_address`].
    pub async fn generate_transparent_address(
        &mut self,
        account_id: zip32::AccountId,
        enforce_no_gap: bool,
    ) -> Result<(TransparentAddressId, TransparentAddress), KeyError> {
        self.wallet()
            .write()
            .await
            .generate_transparent_address(account_id, enforce_no_gap)
    }

    /// Wrapper for [`crate::wallet::LightWallet::unified_addresses_json`].
    pub async fn unified_addresses_json(&self) -> JsonValue {
        self.wallet().read().await.unified_addresses_json()
    }

    /// Wrapper for [`crate::wallet::LightWallet::transparent_addresses_json`].
    pub async fn transparent_addresses_json(&self) -> JsonValue {
        self.wallet().read().await.transparent_addresses_json()
    }

    /// Wrapper for [`crate::wallet::LightWallet::account_balance`].
    pub async fn account_balance(
        &self,
        account_id: zip32::AccountId,
    ) -> Result<AccountBalance, BalanceError> {
        self.wallet().read().await.account_balance(account_id)
    }

    /// Wrapper for [`crate::wallet::LightWallet::transaction_summaries`].
    pub async fn transaction_summaries(
        &self,
        reverse_sort: bool,
    ) -> Result<TransactionSummaries, SummaryError> {
        self.wallet()
            .read()
            .await
            .transaction_summaries(reverse_sort)
            .await
    }

    /// Wrapper for [`crate::wallet::LightWallet::value_transfers`].
    pub async fn value_transfers(
        &self,
        sort_highest_to_lowest: bool,
    ) -> Result<ValueTransfers, SummaryError> {
        self.wallet()
            .read()
            .await
            .value_transfers(sort_highest_to_lowest)
            .await
    }

    /// Wrapper for [`crate::wallet::LightWallet::messages_containing`].
    pub async fn messages_containing(
        &self,
        filter: Option<&str>,
    ) -> Result<ValueTransfers, SummaryError> {
        self.wallet().read().await.messages_containing(filter).await
    }

    /// Wrapper for [`crate::wallet::LightWallet::do_total_memobytes_to_address`].
    pub async fn do_total_memobytes_to_address(
        &self,
    ) -> Result<TotalMemoBytesToAddress, SummaryError> {
        self.wallet()
            .read()
            .await
            .do_total_memobytes_to_address()
            .await
    }

    /// Wrapper for [`crate::wallet::LightWallet::do_total_spends_to_address`].
    pub async fn do_total_spends_to_address(&self) -> Result<TotalSendsToAddress, SummaryError> {
        self.wallet()
            .read()
            .await
            .do_total_spends_to_address()
            .await
    }

    /// Wrapper for [`crate::wallet::LightWallet::do_total_value_to_address`].
    pub async fn do_total_value_to_address(&self) -> Result<TotalValueToAddress, SummaryError> {
        self.wallet().read().await.do_total_value_to_address().await
    }

    /// Creates a backup file of the current wallet file in the wallet directory.
    pub fn backup_wallet_file(&self) -> Result<(), LightClientError> {
        let backup_time = now();
        let backup_wallet_path = self.wallet_path().with_extension(
            self.wallet_path()
                .extension()
                .map(|e| format!("backup.{}.{}", backup_time, e.to_string_lossy()))
                .unwrap_or_else(|| format!("backup.{}.dat", backup_time)),
        );

        std::fs::copy(self.wallet_path(), backup_wallet_path)
            .map_err(LightClientError::FileError)?;

        Ok(())
    }
}

impl std::fmt::Debug for LightClient {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("LightClient")
            .field("indexer", &self.indexer)
            .field("wallet_meta", &self.wallet)
            .field("sync_mode", &self.sync_mode())
            .field(
                "save_active",
                &self.save_active.load(std::sync::atomic::Ordering::Acquire),
            )
            .finish()
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        config::{ChainType, ClientConfig, WalletConfig},
        lightclient::{LightClient, error::LightClientError},
        testutils::default_test_wallet_settings,
    };
    use tempfile::TempDir;
    use zingo_common_components::protocol::ActivationHeights;
    use zingo_test_vectors::seeds::CHIMNEY_BETTER_SEED;

    #[tokio::test]
    async fn new_wallet_from_phrase() {
        let temp_dir = TempDir::new().unwrap();
        let config = ClientConfig::builder()
            .set_chain_type(ChainType::Regtest(ActivationHeights::default()))
            .set_wallet_dir(temp_dir.path().to_path_buf())
            .set_wallet_config(WalletConfig::MnemonicPhrase {
                mnemonic_phrase: CHIMNEY_BETTER_SEED.to_string(),
                no_of_accounts: 1.try_into().unwrap(),
                birthday: 1,
                wallet_settings: default_test_wallet_settings(),
            })
            .build();

        let mut lc = LightClient::new(config.clone(), false).await.unwrap();

        lc.save_task().await;
        lc.wait_for_save().await;

        let lc_file_exists_error = LightClient::new(config, false).await.unwrap_err();

        assert!(matches!(
            lc_file_exists_error,
            LightClientError::FileError(_)
        ));

        // The first transparent address and unified address should be derived
        assert_eq!(
            "tmYd5GP6JxUxTUcz98NLPumEotvaMPaXytz".to_string(),
            lc.transparent_addresses_json().await[0]["encoded_address"]
        );
        assert_eq!(
            "uregtest15en5x5cnsc7ye3wfy0prnh3ut34ns9w40htunlh9htfl6k5p004ja5gprxfz8fygjeax07a8489wzjk8gsx65thcp6d3ku8umgaka6f0"
                .to_string(),
            lc.unified_addresses_json().await[0]["encoded_address"]
        );
    }
}
