//! Sync implementations for [`crate::lightclient::LightClient`] and related types.

use std::borrow::BorrowMut;
use std::sync::atomic;
use std::time::Duration;

use futures::FutureExt;
use pepper_sync::error::{SyncError, SyncModeError, SyncRecoveryObservables};
use pepper_sync::wallet::SyncMode;

use crate::data::PollReport;
use crate::wallet::error::WalletError;

use super::LightClient;
use super::SyncResult;
use super::error::LightClientError;

impl LightClient {
    /// Launches a task for syncing the wallet to the latest state of the block chain, storing the handle in the
    /// `sync_handle` field.
    // TODO: add realtime sync updates to zingo-cli when it can handle printing during user input
    pub async fn sync(&mut self) -> Result<(), LightClientError> {
        if self.sync_mode() != SyncMode::NotRunning {
            return Err(LightClientError::SyncModeError(
                SyncModeError::SyncAlreadyRunning,
            ));
        }

        let client = self.indexer.clone();
        let chain_type = self.chain_type();
        let sync_config = self
            .wallet()
            .read()
            .await
            .wallet_settings
            .sync_config
            .clone();
        let wallet = self.wallet().clone();
        let sync_mode = self.sync_mode.clone();
        let sync_handle = tokio::spawn(async move {
            pepper_sync::sync(client, &chain_type, wallet, sync_mode, sync_config).await
        });
        self.sync_handle = Some(sync_handle);

        Ok(())
    }

    /// Clear the wallet data obtained from the blockchain and launch sync from wallet birthday.
    ///
    /// If sync is already running, stops sync and waits for it to shutdown before clearing the wallet and rescanning.
    pub async fn rescan(&mut self) -> Result<(), LightClientError> {
        if self.sync_mode() != SyncMode::NotRunning {
            self.stop_sync().expect("infallible in this scope");

            let mut interval = tokio::time::interval(Duration::from_millis(500));
            interval.set_missed_tick_behavior(tokio::time::MissedTickBehavior::Delay);
            interval.tick().await;
            while matches!(self.poll_sync(), PollReport::NotReady) {
                interval.tick().await;
            }
        }
        self.wallet().write().await.clear_all();
        self.sync().await
    }

    /// Returns the lightclient's sync mode in non-atomic (enum) form.
    pub fn sync_mode(&self) -> SyncMode {
        SyncMode::from_atomic_u8(self.sync_mode.clone())
            .expect("this library does not allow setting of non-valid sync mode variants")
    }

    /// Pause the sync engine, releasing the wallet lock until [`crate::lightclient::LightClient::resume_sync`] is called.
    ///
    /// Returns an error if sync is not running or paused.
    pub fn pause_sync(&self) -> Result<(), SyncModeError> {
        if self.sync_mode() != SyncMode::Running {
            return Err(SyncModeError::SyncNotRunning);
        }
        self.sync_mode
            .store(SyncMode::Paused as u8, atomic::Ordering::Release);

        Ok(())
    }

    /// Stop the sync engine after the next batch is scanned.
    ///
    /// Returns an error if sync is not running.
    pub fn stop_sync(&self) -> Result<(), SyncModeError> {
        if self.sync_mode() == SyncMode::NotRunning {
            return Err(SyncModeError::SyncNotRunning);
        }
        self.sync_mode
            .store(SyncMode::Shutdown as u8, atomic::Ordering::Release);

        Ok(())
    }

    /// Resume scanning after [`crate::lightclient::LightClient::pause_sync`] has been called.
    ///
    /// Returns an error if sync is not paused.
    pub fn resume_sync(&self) -> Result<(), SyncModeError> {
        if self.sync_mode() != SyncMode::Paused {
            return Err(SyncModeError::SyncNotPaused);
        }
        self.sync_mode
            .store(SyncMode::Running as u8, atomic::Ordering::Release);

        Ok(())
    }

    /// Polls the sync task, returning [`self::PollReport`].
    pub fn poll_sync(&mut self) -> PollReport<SyncResult, SyncError<WalletError>> {
        if let Some(mut sync_handle) = self.sync_handle.take() {
            if let Some(sync_result) = sync_handle.borrow_mut().now_or_never() {
                self.sync_mode
                    .store(SyncMode::NotRunning as u8, atomic::Ordering::Release);
                PollReport::Ready(sync_result.expect("task panicked"))
            } else {
                self.sync_handle = Some(sync_handle);
                PollReport::NotReady
            }
        } else {
            PollReport::NoHandle
        }
    }

    /// Awaits until sync has successfully completed or failed.
    /// Returns [`pepper_sync::sync::SyncResult`] if successful.
    /// Returns [`crate::lightclient::error::LightClientError`] on failure.
    pub async fn await_sync(&mut self) -> Result<SyncResult, LightClientError> {
        let mut interval = tokio::time::interval(Duration::from_millis(500));
        interval.set_missed_tick_behavior(tokio::time::MissedTickBehavior::Delay);
        loop {
            interval.tick().await;
            match self.poll_sync() {
                PollReport::NoHandle => return Err(LightClientError::SyncNotRunning),
                PollReport::NotReady => (),
                PollReport::Ready(result) => return result.map_err(LightClientError::SyncError),
            }
        }
    }

    /// Calls [`crate::lightclient::LightClient::sync`] and then [`crate::lightclient::LightClient::await_sync`].
    pub async fn sync_and_await(&mut self) -> Result<SyncResult, LightClientError> {
        self.sync().await?;
        self.await_sync().await
    }

    /// Calls [`crate::lightclient::LightClient::rescan`] and then [`crate::lightclient::LightClient::await_sync`].
    pub async fn rescan_and_await(&mut self) -> Result<SyncResult, LightClientError> {
        self.rescan().await?;
        self.await_sync().await
    }

    /// Polls the sync task and, if it failed, returns the recommended
    /// recovery action alongside the error description.
    ///
    /// This is the primary entry point for consumers (CLI, mobile, PC)
    /// that need to decide whether to retry, switch servers, or give up
    /// after a sync failure.
    ///
    /// Returns `None` if sync has not been launched, is still running,
    /// or completed successfully.
    pub fn poll_sync_recovery(&mut self) -> Option<(SyncRecoveryObservables, String)> {
        match self.poll_sync() {
            PollReport::Ready(Err(e)) => {
                let action = e.recovery_recommendation();
                let description = e.to_string();
                Some((action, description))
            }
            _ => None,
        }
    }
}

#[cfg(test)]
pub mod test {
    use crate::{lightclient::LightClient, wallet::disk::testing::examples};

    /// loads a wallet from example data
    /// turns on the internet tube
    /// and syncs to the present blockchain moment
    pub(crate) async fn sync_example_wallet(
        wallet_case: examples::NetworkSeedVersion,
    ) -> LightClient {
        // install default crypto provider (ring)
        if let Err(e) = rustls::crypto::ring::default_provider().install_default() {
            log::error!("Error installing crypto provider: {e:?}");
        }

        let mut lc = wallet_case.load_example_wallet().await;

        let sync_result = lc.sync_and_await().await.unwrap();
        tracing::info!("{sync_result}");
        tracing::info!("{:?}", lc.account_balance(zip32::AccountId::ZERO).await);
        lc
    }

    mod testnet {
        use super::{examples, sync_example_wallet};
        /// this is a live sync test. its execution time scales linearly since last updated
        #[ignore = "live chain experiment"]
        #[tokio::test]
        async fn testnet_sync_mskmgdbhotbpetcjwcspgopp() {
            sync_example_wallet(examples::NetworkSeedVersion::Testnet(
                examples::TestnetSeedVersion::MobileShuffle(examples::MobileShuffleVersion::Latest),
            ))
            .await;
        }
        /// this is a live sync test. its execution time scales linearly since last updated
        #[ignore = "live chain experiment"]
        #[tokio::test]
        async fn testnet_sync_cbbhrwiilgbrababsshsmtpr() {
            sync_example_wallet(examples::NetworkSeedVersion::Testnet(
                examples::TestnetSeedVersion::ChimneyBetter(examples::ChimneyBetterVersion::Latest),
            ))
            .await;
        }
    }
    /// this is a live sync test. its execution time scales linearly since last updated
    #[tokio::test]
    #[ignore = "testnet and mainnet tests should be ignored due to increasingly large execution times"]
    async fn mainnet_sync() {
        sync_example_wallet(examples::NetworkSeedVersion::Mainnet(
            examples::MainnetSeedVersion::HotelHumor(examples::HotelHumorVersion::Gf0aaf9347),
        ))
        .await;
    }
}
