//! `LightClient` saves internally when it gets to a checkpoint. If has filesystem access, it saves to file at those points. otherwise, it passes the save buffer to the FFI.

use futures::FutureExt as _;
use log::error;

use std::{borrow::BorrowMut as _, fs::remove_file, sync::atomic};

use super::LightClient;
use crate::data::PollReport;

/// Writes `bytes` to file at `wallet_path`.
fn write_to_path(wallet_path: &std::path::Path, bytes: &[u8]) -> std::io::Result<()> {
    let temp_wallet_path: std::path::PathBuf = wallet_path.with_extension(
        wallet_path
            .extension()
            .map(|e| format!("{}.tmp", e.to_string_lossy()))
            .unwrap_or_else(|| "tmp".to_string()),
    );
    let file = std::fs::OpenOptions::new()
        .create(true)
        .truncate(true)
        .write(true)
        .open(&temp_wallet_path)?;
    let mut writer = std::io::BufWriter::new(file);
    std::io::Write::write_all(&mut writer, bytes)?;

    let file = writer.into_inner().map_err(|e| e.into_error())?;
    file.sync_all()?;
    std::fs::rename(&temp_wallet_path, wallet_path)?;

    // NOTE: in windows no need to sync the folder, only for linux & macOS.
    #[cfg(unix)]
    {
        if let Some(parent) = wallet_path.parent() {
            let wallet_dir = std::fs::File::open(parent)?;
            let _ignore_error = wallet_dir.sync_all(); // NOTE: error is ignored as syncing dirs on windows OS may return an error
        }
    }

    Ok(())
}
impl LightClient {
    /// Launches a task for saving the wallet data to persistance when the wallet's `save_required` flag is set.
    pub async fn save_task(&mut self) {
        if self.save_active.load(atomic::Ordering::Acquire) {
            return;
        }

        self.save_active.store(true, atomic::Ordering::Release);
        let save_active = self.save_active.clone();
        let wallet = self.wallet().clone();
        let wallet_path = self.wallet_path();
        let mut interval = tokio::time::interval(std::time::Duration::from_secs(1));
        interval.set_missed_tick_behavior(tokio::time::MissedTickBehavior::Delay);
        let save_handle = tokio::spawn(async move {
            loop {
                interval.tick().await;
                if let Some(wallet_bytes) = wallet.write().await.save()? {
                    write_to_path(&wallet_path, &wallet_bytes)?;
                }
                if !save_active.load(atomic::Ordering::Acquire) {
                    return Ok(());
                }
            }
        });
        self.save_handle = Some(save_handle);
    }

    /// Wait until the wallet's `save_required` flag is not set.
    pub async fn wait_for_save(&self) {
        let mut interval = tokio::time::interval(std::time::Duration::from_secs(1));
        interval.set_missed_tick_behavior(tokio::time::MissedTickBehavior::Delay);
        loop {
            interval.tick().await;
            if !self.wallet().read().await.save_required {
                return;
            }
        }
    }

    /// Polls the save task, returning [`self::PollReport`].
    fn poll_save_task(&mut self) -> PollReport<(), std::io::Error> {
        if let Some(mut save_handle) = self.save_handle.take() {
            if let Some(save_result) = save_handle.borrow_mut().now_or_never() {
                PollReport::Ready(save_result.expect("task panicked"))
            } else {
                self.save_handle = Some(save_handle);
                PollReport::NotReady
            }
        } else {
            PollReport::NoHandle
        }
    }

    /// Checks the save task handle in case of failure.
    /// On save task failure, restarts the save task and returns the error.
    pub async fn check_save_error(&mut self) -> std::io::Result<()> {
        match self.poll_save_task() {
            PollReport::Ready(save_result) => {
                if save_result.is_err() {
                    self.save_task().await;
                }
                save_result
            }
            _ => Ok(()),
        }
    }

    pub async fn shutdown_save_task(&mut self) -> std::io::Result<()> {
        self.save_active.store(false, atomic::Ordering::Release);
        if let Some(save_handle) = self.save_handle.take() {
            save_handle.await.expect("task panicked")
        } else {
            Ok(())
        }
    }

    /// Only relevant in non-mobile, this function removes the save file.
    // TodO: can we shred it?
    pub async fn do_delete(&self) -> Result<(), String> {
        // Check if the file exists before attempting to delete
        if self.wallet_path().exists() {
            match remove_file(self.wallet_path()) {
                Ok(()) => {
                    log::debug!("File deleted successfully!");
                    Ok(())
                }
                Err(e) => {
                    let err = format!("ERR: {e}");
                    error!("{err}");
                    log::debug!("DELETE FAIL ON FILE!");
                    Err(e.to_string())
                }
            }
        } else {
            let err = "Error: File does not exist, nothing to delete.".to_string();
            error!("{err}");
            log::debug!("File does not exist, nothing to delete.");
            Err(err)
        }
    }
}
