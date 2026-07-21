use std::collections::HashSet;
use std::num::NonZeroU32;
use std::time::Duration;

use pepper_sync::config::{SyncConfig, TransparentAddressDiscovery};
use zingolib::config::{ChainType, ClientConfig, WalletConfig};
use zingolib::lightclient::LightClient;
use zingolib::wallet::WalletSettings;

use crate::memo::{SUBSCRIPTION_PREFIX, parse_subscription_memo};
use crate::scan::ScanError;

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub struct Subscription {
    pub topic: String,
    pub txid: String,
    pub height: u64,
}

pub struct MemoWatcher {
    indexer_uri: String,
    ufvk: String,
    birthday: u32,
    seen: HashSet<String>,
}

impl MemoWatcher {
    pub fn new(indexer_uri: impl Into<String>, ufvk: impl Into<String>, birthday: u32) -> Self {
        Self {
            indexer_uri: indexer_uri.into(),
            ufvk: ufvk.into(),
            birthday,
            seen: HashSet::new(),
        }
    }

    pub fn from_env(indexer_uri: impl Into<String>) -> Option<Self> {
        let ufvk = std::env::var("TURNSTILE_UFVK").ok()?;
        let birthday = std::env::var("TURNSTILE_BIRTHDAY")
            .ok()
            .and_then(|value| value.parse().ok())?;

        Some(Self::new(indexer_uri, ufvk, birthday))
    }

    pub async fn poll(&mut self) -> Result<Vec<Subscription>, ScanError> {
        let uri = self
            .indexer_uri
            .parse::<http::Uri>()
            .map_err(|_| ScanError::NetworkUnavailable)?;

        let wallet_dir = tempfile::tempdir().map_err(|_| ScanError::EphemeralStorageUnavailable)?;

        let config = ClientConfig::builder()
            .set_chain_type(ChainType::Mainnet)
            .set_indexer_uri(uri)
            .set_wallet_dir(wallet_dir.path().to_path_buf())
            .set_wallet_config(WalletConfig::Ufvk {
                ufvk: self.ufvk.clone(),
                birthday: self.birthday,
                wallet_settings: WalletSettings {
                    sync_config: SyncConfig {
                        transparent_address_discovery: TransparentAddressDiscovery::minimal(),
                        ..SyncConfig::default()
                    },
                    min_confirmations: NonZeroU32::new(1).expect("1 is non-zero"),
                },
            })
            .build();

        let mut client = LightClient::new(config, true)
            .await
            .map_err(|_| ScanError::InvalidViewingKey)?;

        client
            .sync_and_await()
            .await
            .map_err(|_| ScanError::NetworkUnavailable)?;

        let transfers = client
            .messages_containing(Some(SUBSCRIPTION_PREFIX))
            .await
            .map_err(|_| ScanError::NetworkUnavailable)?;

        let mut fresh = Vec::new();

        for transfer in &transfers {
            let txid = transfer.txid.to_string();

            for memo in &transfer.memos {
                let Some(topic) = parse_subscription_memo(memo) else {
                    continue;
                };

                let key = format!("{txid}:{topic}");
                if !self.seen.insert(key) {
                    continue;
                }

                fresh.push(Subscription {
                    topic,
                    txid: txid.clone(),
                    height: u32::from(transfer.blockheight) as u64,
                });
            }
        }

        drop(wallet_dir);

        Ok(fresh)
    }
}

pub async fn notify(
    ntfy_base: &str,
    topic: &str,
    title: &str,
    body: &str,
) -> Result<(), ScanError> {
    let url = format!("{}/{}", ntfy_base.trim_end_matches('/'), topic);

    let client = reqwest::Client::new();
    client
        .post(&url)
        .header("Title", title)
        .timeout(Duration::from_secs(10))
        .body(body.to_string())
        .send()
        .await
        .map_err(|_| ScanError::NetworkUnavailable)?;

    Ok(())
}
