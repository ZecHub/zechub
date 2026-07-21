use pepper_sync::config::{SyncConfig, TransparentAddressDiscovery};
use zingolib::config::{ChainType, ClientConfig, WalletConfig};
use zingolib::lightclient::LightClient;
use zingolib::wallet::WalletSettings;

use crate::pools::PoolBalances;
use crate::scan::{ScanError, ScanRequest, ScanResult, effective_birthday, validate};

pub struct ScanBackend {
    endpoints: Vec<String>,
}

impl ScanBackend {
    pub fn new(indexer_uri: impl Into<String>) -> Self {
        Self {
            endpoints: vec![indexer_uri.into()],
        }
    }

    pub fn from_env() -> Self {
        Self {
            endpoints: crate::indexer::from_env(),
        }
    }

    pub fn indexer_uri(&self) -> &str {
        self.endpoints.first().map(String::as_str).unwrap_or("")
    }

    pub fn endpoints(&self) -> &[String] {
        &self.endpoints
    }

    pub async fn scan(&self, request: &ScanRequest) -> Result<ScanResult, ScanError> {
        validate(request)?;

        let tip = crate::tip::chain_tip_with_fallback(&self.endpoints)
            .await
            .ok()
            .map(|(height, _)| height);
        let birthday = effective_birthday(request.birthday, tip)?;

        let mut last = ScanError::NetworkUnavailable;

        for endpoint in &self.endpoints {
            match self.scan_via(endpoint, request, birthday).await {
                Ok(result) => return Ok(result),
                Err(ScanError::NetworkUnavailable) => {
                    tracing::warn!(indexer = %endpoint, "indexer unreachable, trying the next");
                    last = ScanError::NetworkUnavailable;
                }
                Err(error) => return Err(error),
            }
        }

        Err(last)
    }

    async fn scan_via(
        &self,
        endpoint: &str,
        request: &ScanRequest,
        birthday: u32,
    ) -> Result<ScanResult, ScanError> {
        let uri = endpoint
            .parse::<http::Uri>()
            .map_err(|_| ScanError::NetworkUnavailable)?;

        let wallet_dir = tempfile::tempdir().map_err(|_| ScanError::EphemeralStorageUnavailable)?;

        let settings = WalletSettings {
            sync_config: SyncConfig {
                transparent_address_discovery: TransparentAddressDiscovery::recovery(),
                ..SyncConfig::default()
            },
            ..WalletSettings::default()
        };

        let config = ClientConfig::builder()
            .set_chain_type(ChainType::Mainnet)
            .set_indexer_uri(uri)
            .set_wallet_dir(wallet_dir.path().to_path_buf())
            .set_wallet_config(WalletConfig::Ufvk {
                ufvk: request.ufvk.trim().to_string(),
                birthday,
                wallet_settings: settings,
            })
            .build();

        let outcome = run(config).await;

        drop(wallet_dir);

        outcome
    }
}

async fn run(config: ClientConfig) -> Result<ScanResult, ScanError> {
    let mut client = LightClient::new(config, true)
        .await
        .map_err(|_| ScanError::InvalidViewingKey)?;

    let sync = client
        .sync_and_await()
        .await
        .map_err(|_| ScanError::NetworkUnavailable)?;

    let balance = client
        .account_balance(zip32::AccountId::ZERO)
        .await
        .map_err(|_| ScanError::NetworkUnavailable)?;

    Ok(ScanResult::new(
        PoolBalances::new(
            balance.total_transparent_balance.map(|z| z.into_u64()),
            balance.total_sapling_balance.map(|z| z.into_u64()),
            balance.total_orchard_balance.map(|z| z.into_u64()),
        ),
        u32::from(sync.sync_start_height) as u64,
        u32::from(sync.sync_end_height) as u64,
    ))
}
