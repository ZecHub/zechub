use std::collections::HashMap;
use std::path::PathBuf;
use std::sync::atomic::{AtomicI64, Ordering};

use frost_app_core::keystore::Keystore;
use frost_client::cli::config::Config;
use serde::{Deserialize, Serialize};
use tokio::sync::{oneshot, Mutex, RwLock};
use tokio_util::sync::CancellationToken;
use uuid::Uuid;

use crate::error::{AppError, AppResult};

/// Current time in epoch milliseconds (monotonic-ish wall clock; only used for
/// idle-duration comparisons where small clock jumps are harmless).
fn now_millis() -> i64 {
    std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .map(|d| d.as_millis() as i64)
        .unwrap_or(0)
}

/// Non-secret app settings, stored as plaintext JSON so they are readable
/// before the keystore is unlocked.
#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct Settings {
    /// Display name for the local user, shown wherever this identity appears
    /// (own participant entries in groups, signer lists, etc.).
    #[serde(default)]
    pub username: Option<String>,
    /// Last external server the user connected to, `host:port`.
    pub server_url: Option<String>,
    /// Port for the embedded frostd sidecar.
    pub sidecar_port: Option<u16>,
    /// When true, the embedded frostd binds `0.0.0.0` (reachable from the LAN).
    /// Defaults to false: bind loopback (`127.0.0.1`) only, so the server is not
    /// exposed to the local network unless the user explicitly opts in.
    #[serde(default)]
    pub sidecar_bind_lan: Option<bool>,
    /// PEM certs trusted for specific external servers, keyed by `host:port`.
    #[serde(default)]
    pub trusted_certs: HashMap<String, String>,
    /// Local nicknames/aliases for contacts, keyed by hex comm pubkey.
    #[serde(default)]
    pub contact_aliases: HashMap<String, String>,
    /// Zcash network for wallet features: "test" (default) or "main".
    #[serde(default)]
    pub wallet_network: Option<String>,
    /// lightwalletd endpoint for the selected network.
    #[serde(default)]
    pub lightwalletd_url: Option<String>,
    /// Idle minutes before the keystore auto-locks. `None` uses the default
    /// (10 min); `Some(0)` disables auto-lock entirely.
    #[serde(default)]
    pub auto_lock_minutes: Option<u64>,
    /// Rotating receive-address state per group (keyed by group id). Tracks the
    /// diversifier index currently handed out and the received-note count when
    /// it was issued, so the address rotates once it has plausibly been used.
    #[serde(default)]
    pub receive_state: HashMap<String, ReceiveState>,
    /// First block scanned for each group's wallet (keyed by group id). Recorded
    /// here rather than only inside the wallet database, which lives under
    /// `wallets/` and is deleted whenever the wallet is rebuilt. Without it a
    /// rebuilt wallet re-imports its account at the current chain tip and never
    /// scans the blocks that funded the group, so the balance reads zero.
    #[serde(default)]
    pub wallet_birthdays: HashMap<String, u64>,
    /// Active session profile: "coordinator" or "participant". Toggled by the
    /// sidebar profile switch; drives which saved configuration is in use.
    #[serde(default)]
    pub session_role: Option<String>,
    /// How a coordinator exposes the embedded server: "direct", "tunnel", or
    /// "nginx". Saved so it can be reused on future launches.
    #[serde(default)]
    pub coordinator_exposure: Option<String>,
    /// True once the user has completed the first-run Session Configuration, so
    /// they aren't prompted again unless they revisit it.
    #[serde(default)]
    pub session_configured: Option<bool>,
}

/// Per-group rotating receive-address bookkeeping (#3). Non-secret; the actual
/// address is derived on demand from the group's public `ak` at `index`.
#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct ReceiveState {
    /// Diversifier index of the address currently handed out for this group.
    pub index: u32,
    /// Orchard received-note count at the moment `index` was issued. When the
    /// live count exceeds this, the shown address may have been paid and is
    /// rotated to the next index.
    pub baseline_notes: u64,
}

/// Keystore contents held in memory while unlocked. The unlocked
/// [`KeystoreFile`] carries the data-encryption key and key slots, so config
/// mutations re-encrypt transparently without rotating the DEK or invalidating
/// the recovery slot.
pub struct UnlockedState {
    pub config: Config,
    pub file: frost_app_core::keystore::KeystoreFile,
}

/// Handle to a running ceremony task (DKG or signing).
pub struct CeremonyHandle {
    pub cancel: CancellationToken,
    /// Present for participant signing ceremonies that are paused at the
    /// approval gate; resolving it releases the round-2 signature share.
    pub approval: Option<oneshot::Sender<bool>>,
}

pub struct AppState {
    pub data_dir: PathBuf,
    pub unlocked: RwLock<Option<UnlockedState>>,
    pub ceremonies: Mutex<HashMap<Uuid, CeremonyHandle>>,
    pub sidecar: Mutex<Option<crate::sidecar::SidecarHandle>>,
    /// Optional Cloudflare quick tunnel exposing the embedded server publicly.
    pub tunnel: Mutex<Option<crate::tunnel::TunnelHandle>>,
    /// Cancellation token for the in-flight wallet sync of each group, so a
    /// "Sync Now" can abandon a stalled sync and restart it cleanly.
    pub sync_cancels: Mutex<HashMap<String, CancellationToken>>,
    /// Epoch-millis of the last user activity, used to drive the idle auto-lock.
    pub last_activity: AtomicI64,
}

impl AppState {
    pub fn new() -> Self {
        let data_dir = std::env::var("FROST_APP_DATA_DIR")
            .map(PathBuf::from)
            .unwrap_or_else(|_| {
                dirs::data_local_dir()
                    .expect("no local data dir on this platform")
                    .join("frost-app")
            });
        Self::with_dir(data_dir)
    }

    pub fn with_dir(data_dir: PathBuf) -> Self {
        Self {
            data_dir,
            unlocked: RwLock::new(None),
            ceremonies: Mutex::new(HashMap::new()),
            sidecar: Mutex::new(None),
            tunnel: Mutex::new(None),
            sync_cancels: Mutex::new(HashMap::new()),
            last_activity: AtomicI64::new(now_millis()),
        }
    }

    /// Record user activity now, deferring the idle auto-lock.
    pub fn touch_activity(&self) {
        self.last_activity.store(now_millis(), Ordering::Relaxed);
    }

    /// Milliseconds since the last recorded activity.
    pub fn idle_millis(&self) -> i64 {
        now_millis().saturating_sub(self.last_activity.load(Ordering::Relaxed))
    }

    pub fn keystore(&self) -> Keystore {
        Keystore::new(self.data_dir.join("keystore.frost"))
    }

    pub fn settings_path(&self) -> PathBuf {
        self.data_dir.join("settings.json")
    }

    pub fn load_settings(&self) -> Settings {
        std::fs::read_to_string(self.settings_path())
            .ok()
            .and_then(|s| serde_json::from_str(&s).ok())
            .unwrap_or_default()
    }

    pub fn save_settings(&self, settings: &Settings) -> AppResult<()> {
        std::fs::create_dir_all(&self.data_dir)?;
        // Lock the app data directory to the owner so sibling files (keystore,
        // wallet dbs, settings) are not exposed to other local users.
        let _ = frost_app_core::keystore::restrict_dir_to_owner(&self.data_dir);
        let path = self.settings_path();
        std::fs::write(
            &path,
            serde_json::to_string_pretty(settings)
                .map_err(|e| AppError::new("config", e.to_string()))?,
        )?;
        let _ = frost_app_core::keystore::restrict_to_owner(&path);
        Ok(())
    }

    /// Run `f` against the unlocked config, then re-encrypt and persist it.
    pub async fn mutate_config<T>(
        &self,
        f: impl FnOnce(&mut Config) -> AppResult<T>,
    ) -> AppResult<T> {
        let mut guard = self.unlocked.write().await;
        let unlocked = guard.as_mut().ok_or_else(AppError::locked)?;
        let result = f(&mut unlocked.config)?;
        let toml = frost_app_core::config::serialize_config(&unlocked.config)
            .map_err(AppError::from)?;
        self.keystore()
            .save_file(&unlocked.file, toml.as_bytes())
            .map_err(AppError::from)?;
        Ok(result)
    }

    /// Read-only access to the unlocked config.
    pub async fn with_config<T>(
        &self,
        f: impl FnOnce(&Config) -> AppResult<T>,
    ) -> AppResult<T> {
        let guard = self.unlocked.read().await;
        let unlocked = guard.as_ref().ok_or_else(AppError::locked)?;
        f(&unlocked.config)
    }

    /// Derive the SQLCipher key for a group's wallet database from the unlocked
    /// keystore DEK. Deterministic per (keystore, group), so the same key is
    /// recovered on every unlock; requires the keystore to be unlocked.
    pub async fn wallet_db_key(
        &self,
        group_id: &str,
    ) -> AppResult<zeroize::Zeroizing<[u8; 32]>> {
        let guard = self.unlocked.read().await;
        let unlocked = guard.as_ref().ok_or_else(AppError::locked)?;
        let info = format!("wallet-db:{group_id}");
        Ok(unlocked.file.derive_subkey(info.as_bytes()))
    }
}
