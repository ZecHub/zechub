//! Vault-state persistence — **public config only, NEVER secrets**.
//!
//! The coordinator keeps every vault in RAM ([`AppState`](crate::http::AppState)).
//! Without this module a restart would **orphan the funds**: the group public key,
//! guardian set, heir, network, cached on-chain address, and — critically — the
//! signed **heartbeat bulletin** would all be lost. This module gives the
//! coordinator a tiny on-disk store so a restart is transparent.
//!
//! ## The one rule: persist public config, never secret shares
//! [`PersistedVault`] mirrors [`VaultRecord`](crate::http)'s **public** fields and
//! *deliberately omits* the demo secret shares (`demo_signers`). Persistence is
//! therefore **opt-in per field**: a secret cannot reach disk unless someone adds
//! it to `PersistedVault` on purpose — the default is safe. (Contrast a blanket
//! `#[derive(Serialize)]` on the whole record, which would be opt-*out* and would
//! silently write any future secret field until someone remembered `#[serde(skip)]`.)
//!
//! The coordinator holds no secret shares for a **real** vault anyway — a real
//! guardian keeps its own share off-box; `demo_signers` is RAM-only glue that lets
//! a *demo* vault co-sign in-process with no external guardian clients.
//!
//! **Consequence (documented here + logged once at startup):** after a restart a
//! *demo* vault can no longer auto-sign in-process (its shares are gone), but its
//! public config and heartbeat survive, and a **real-guardian relay ceremony still
//! works** (real vaults never had shares on the coordinator). This is the point —
//! it keeps the coordinator honest: it never writes secrets to disk.
//!
//! ## Durability
//! [`save`] writes to a unique temp file, `fsync`s it, then atomically `rename`s it
//! over the store, so a crash mid-write can never corrupt or truncate the store —
//! the previous file stays intact until the rename commits.

use std::collections::HashMap;
use std::io::{self, Write};
use std::path::{Path, PathBuf};
use std::sync::atomic::{AtomicU64, Ordering};

use serde::{Deserialize, Serialize};

use steward_core::heartbeat::Heartbeat;
use steward_core::redpallas::keys::PublicKeyPackage;

use crate::authz::VaultPolicy;
use crate::transport::ParticipantId;

/// Default data directory when `STEWARD_DATA_DIR` is unset.
pub const DEFAULT_DATA_DIR: &str = "steward-coordinator-data";
/// The store file name inside the data directory.
pub const STORE_FILE: &str = "vaults.json";
/// On-disk format version — bumped only on an incompatible shape change.
const STORE_VERSION: u32 = 1;

/// The on-disk mirror of a vault's **public** record. Every field here is public
/// config the owner console and guardians already see over the wire (the group
/// verifying key, the guardian ids, the dead-man's-switch policy, the heir, the
/// network, the cached address/UFVK/balance, and the signed heartbeat bulletin).
///
/// The secret `demo_signers` shares are intentionally **not a field**, so they can
/// never be written to disk — persistence is opt-in per field (see the module docs).
#[derive(Debug, Serialize, Deserialize)]
pub(crate) struct PersistedVault {
    pub threshold: u16,
    pub guardian_ids: Vec<ParticipantId>,
    pub public_key_package: PublicKeyPackage,
    /// The dead-man's-switch policy, or `None` for a plain multisig vault. `#[serde(default)]`
    /// so a store written before presets (a bare `policy` object) still loads — `Option` reads
    /// a present object as `Some`.
    #[serde(default)]
    pub policy: Option<VaultPolicy>,
    /// The display purpose label. `#[serde(default)]` (empty) for a pre-presets store.
    #[serde(default)]
    pub purpose: String,
    /// The owner-chosen human name. `#[serde(default)]` (empty) for a pre-label store; a restored
    /// vault with an empty label falls back to its id in the UI.
    #[serde(default)]
    pub label: String,
    pub heir: Option<String>,
    pub network: String,
    pub receiving_address: Option<String>,
    pub ufvk: Option<String>,
    pub balance_zat: Option<u64>,
    /// The owner's heartbeat public key (inheritance vault) or `None` (plain multisig).
    /// `#[serde(default)]` so a pre-presets store (a bare `String`) still loads as `Some`.
    #[serde(default)]
    pub heartbeat_pubkey_hex: Option<String>,
    pub latest_heartbeat: Option<Heartbeat>,
}

/// The whole store as it sits on disk: a version tag, the vault-id sequence high
/// water mark (so ids don't collide after a restart), and the public vault records.
/// Owned shape, used by [`load`].
#[derive(Debug, Deserialize)]
struct StoreFile {
    version: u32,
    /// The next value `vault_seq` would mint — restored so a post-restart create
    /// never reuses an existing vault id.
    vault_seq: u64,
    vaults: HashMap<String, PersistedVault>,
}

/// Borrowing shape used by [`save`] so the vault map need not be cloned to serialize.
#[derive(Serialize)]
struct StoreFileRef<'a> {
    version: u32,
    vault_seq: u64,
    vaults: &'a HashMap<String, PersistedVault>,
}

/// What [`load`] hands back: the restored vault records + the vault-id counter.
pub(crate) struct Loaded {
    pub vault_seq: u64,
    pub vaults: HashMap<String, PersistedVault>,
}

/// Resolve the data directory: `STEWARD_DATA_DIR` env var, else [`DEFAULT_DATA_DIR`]
/// (relative to the process's working directory).
pub fn data_dir_from_env() -> PathBuf {
    std::env::var_os("STEWARD_DATA_DIR")
        .map(PathBuf::from)
        .unwrap_or_else(|| PathBuf::from(DEFAULT_DATA_DIR))
}

/// Load the store from `path`. Returns `Ok(None)` when the file does not exist yet
/// (a fresh coordinator); an error if it exists but cannot be read/parsed or is an
/// unknown version — so an operator notices a corrupt/incompatible store rather than
/// silently discarding it (and then overwriting it on the next save).
pub(crate) fn load(path: &Path) -> io::Result<Option<Loaded>> {
    let bytes = match std::fs::read(path) {
        Ok(b) => b,
        Err(e) if e.kind() == io::ErrorKind::NotFound => return Ok(None),
        Err(e) => return Err(e),
    };
    let store: StoreFile = serde_json::from_slice(&bytes).map_err(|e| {
        io::Error::new(
            io::ErrorKind::InvalidData,
            format!("{} is not a valid Steward vault store: {e}", path.display()),
        )
    })?;
    if store.version != STORE_VERSION {
        return Err(io::Error::new(
            io::ErrorKind::InvalidData,
            format!(
                "{} has store version {} but this coordinator understands {STORE_VERSION}",
                path.display(),
                store.version
            ),
        ));
    }
    Ok(Some(Loaded {
        vault_seq: store.vault_seq,
        vaults: store.vaults,
    }))
}

/// Monotonic suffix so two concurrent writers never pick the same temp file name.
static TMP_SEQ: AtomicU64 = AtomicU64::new(0);

/// Atomically write the store to `path` (temp file + `fsync` + `rename`). Creates the
/// parent directory if needed. Safe against a crash mid-write: the existing store is
/// untouched until the final rename commits.
pub(crate) fn save(
    path: &Path,
    vault_seq: u64,
    vaults: &HashMap<String, PersistedVault>,
) -> io::Result<()> {
    let store = StoreFileRef {
        version: STORE_VERSION,
        vault_seq,
        vaults,
    };
    let json = serde_json::to_vec_pretty(&store)
        .map_err(|e| io::Error::other(format!("serialize vault store: {e}")))?;

    let dir = path
        .parent()
        .filter(|p| !p.as_os_str().is_empty())
        .unwrap_or_else(|| Path::new("."));
    std::fs::create_dir_all(dir)?;

    let n = TMP_SEQ.fetch_add(1, Ordering::Relaxed);
    let tmp = dir.join(format!(".{STORE_FILE}.{}.{n}.tmp", std::process::id()));

    // Write + fsync the temp file, then atomically rename it over the store. On any
    // failure, best-effort clean up the temp file so a crashed write leaves no litter.
    match write_and_sync(&tmp, &json).and_then(|()| std::fs::rename(&tmp, path)) {
        Ok(()) => Ok(()),
        Err(e) => {
            let _ = std::fs::remove_file(&tmp);
            Err(e)
        }
    }
}

/// Create + write + fsync a file (durability before the rename).
fn write_and_sync(tmp: &Path, bytes: &[u8]) -> io::Result<()> {
    let mut f = std::fs::File::create(tmp)?;
    f.write_all(bytes)?;
    f.sync_all()
}

#[cfg(test)]
mod tests {
    use super::*;

    // A minimal public vault record for round-trip tests. Uses a real FROST public key
    // package split from a fresh key, so the serde path exercises the actual FROST types.
    fn sample() -> (String, PersistedVault) {
        use steward_core::keys::split_authority;
        use steward_core::redpallas::SigningKey;
        let mut rng = rand::rngs::OsRng;
        let ask = SigningKey::new(&mut rng);
        let vault = split_authority(&ask, 3, 2, &mut rng).expect("split");
        let pv = PersistedVault {
            threshold: 2,
            guardian_ids: vec![
                ParticipantId::new("amara"),
                ParticipantId::new("bjorn"),
                ParticipantId::new("chen"),
            ],
            public_key_package: vault.public_key_package.clone(),
            policy: Some(VaultPolicy::new(steward_core::policy::HeartbeatPolicy {
                interval_secs: 6,
                grace_secs: 3,
                last_heartbeat: 1_000_000,
            })),
            purpose: "inheritance".into(),
            label: "Amara's legacy".into(),
            heir: Some("u1heirdemoaddress".into()),
            network: "test".into(),
            receiving_address: Some("utest1demo".into()),
            ufvk: Some("uviewtest1demo".into()),
            balance_zat: Some(12_345),
            heartbeat_pubkey_hex: Some("aa".repeat(32)),
            latest_heartbeat: Some(Heartbeat {
                time: 1_000_000,
                sig_hex: "bb".repeat(64),
            }),
        };
        ("vault-1".into(), pv)
    }

    // A plain **multisig** vault (the dead-man's-switch turned OFF): no policy, no heir, no
    // heartbeat key. This is the non-inheritance preset shape that must survive a restart too.
    fn sample_multisig() -> (String, PersistedVault) {
        use steward_core::keys::split_authority;
        use steward_core::redpallas::SigningKey;
        let mut rng = rand::rngs::OsRng;
        let ask = SigningKey::new(&mut rng);
        let vault = split_authority(&ask, 5, 3, &mut rng).expect("split");
        let pv = PersistedVault {
            threshold: 3,
            guardian_ids: (1..=5).map(|i| ParticipantId::new(format!("g{i}"))).collect(),
            public_key_package: vault.public_key_package.clone(),
            policy: None,
            purpose: "treasury".into(),
            label: "DAO treasury".into(),
            heir: None,
            network: "test".into(),
            receiving_address: None,
            ufvk: None,
            balance_zat: None,
            heartbeat_pubkey_hex: None,
            latest_heartbeat: None,
        };
        ("vault-2".into(), pv)
    }

    #[test]
    fn save_load_round_trip_preserves_public_config() {
        let dir = std::env::temp_dir().join(format!("steward-persist-test-{}", std::process::id()));
        let _ = std::fs::remove_dir_all(&dir);
        let path = dir.join(STORE_FILE);

        let (id, pv) = sample();
        let ak_hex = pv
            .public_key_package
            .verifying_key()
            .serialize()
            .map(hex::encode)
            .unwrap();
        let mut map = HashMap::new();
        map.insert(id.clone(), pv);

        save(&path, 2, &map).expect("save");

        let loaded = load(&path).expect("load").expect("some");
        assert_eq!(loaded.vault_seq, 2);
        let got = loaded.vaults.get(&id).expect("vault present");
        assert_eq!(got.threshold, 2);
        assert_eq!(got.heir.as_deref(), Some("u1heirdemoaddress"));
        assert_eq!(got.purpose, "inheritance");
        assert!(got.policy.is_some(), "an inheritance vault keeps its policy");
        assert_eq!(got.heartbeat_pubkey_hex.as_deref(), Some(&*"aa".repeat(32)));
        assert_eq!(got.network, "test");
        assert_eq!(got.balance_zat, Some(12_345));
        assert_eq!(got.latest_heartbeat.as_ref().map(|h| h.time), Some(1_000_000));
        // The group verifying key (ak) survives the round trip byte-for-byte.
        let got_ak = got
            .public_key_package
            .verifying_key()
            .serialize()
            .map(hex::encode)
            .unwrap();
        assert_eq!(got_ak, ak_hex);

        let _ = std::fs::remove_dir_all(&dir);
    }

    #[test]
    fn on_disk_json_contains_no_secret_material() {
        let dir =
            std::env::temp_dir().join(format!("steward-persist-secrets-{}", std::process::id()));
        let _ = std::fs::remove_dir_all(&dir);
        let path = dir.join(STORE_FILE);

        let (id, pv) = sample();
        let mut map = HashMap::new();
        map.insert(id, pv);
        save(&path, 2, &map).expect("save");

        let text = std::fs::read_to_string(&path).expect("read");
        // The secret detectors: a FROST secret lives in a `signing_share` field; the demo
        // shares live under `demo_signers`. Neither may ever appear on disk. (Note the PUBLIC
        // `verifying_shares` of the key package legitimately do — that is not a secret.)
        assert!(
            !text.contains("signing_share"),
            "persisted store must not contain a signing_share"
        );
        assert!(
            !text.contains("demo_signers"),
            "persisted store must not contain demo_signers"
        );

        let _ = std::fs::remove_dir_all(&dir);
    }

    #[test]
    fn plain_multisig_vault_round_trips_with_no_policy() {
        let dir =
            std::env::temp_dir().join(format!("steward-persist-multisig-{}", std::process::id()));
        let _ = std::fs::remove_dir_all(&dir);
        let path = dir.join(STORE_FILE);

        // Persist BOTH kinds together, then reload — a restart must preserve each.
        let (inh_id, inh) = sample();
        let (ms_id, ms) = sample_multisig();
        let mut map = HashMap::new();
        map.insert(inh_id.clone(), inh);
        map.insert(ms_id.clone(), ms);
        save(&path, 3, &map).expect("save");

        let loaded = load(&path).expect("load").expect("some");
        // The plain multisig vault comes back with NO switch, NO heir, NO heartbeat key.
        let got = loaded.vaults.get(&ms_id).expect("multisig vault present");
        assert_eq!(got.threshold, 3);
        assert_eq!(got.purpose, "treasury");
        assert!(got.policy.is_none(), "a plain multisig vault has no dead-man's-switch");
        assert!(got.heir.is_none());
        assert!(got.heartbeat_pubkey_hex.is_none());
        assert!(got.latest_heartbeat.is_none());
        // ...while the inheritance vault alongside it keeps its policy.
        let inh_got = loaded.vaults.get(&inh_id).expect("inheritance vault present");
        assert!(inh_got.policy.is_some());

        let _ = std::fs::remove_dir_all(&dir);
    }

    #[test]
    fn missing_file_loads_as_none() {
        let path = std::env::temp_dir().join(format!("steward-none-{}.json", std::process::id()));
        let _ = std::fs::remove_file(&path);
        assert!(load(&path).expect("load ok").is_none());
    }
}
