//! The HTTP layer. **(increment B of P4)**
//!
//! Increment A drove the FROST ceremony over an in-process [`Transport`]. This
//! module puts it on the network so **separate guardian processes** can co-sign,
//! **without changing the ceremony or guardian logic** — the [`Transport`] trait is
//! preserved as the seam. Two things are added:
//!
//! 1. **A guardian-side client, [`HttpTransport`]**, which `impl`s [`Transport`] by
//!    hitting the relay endpoints. A remote [`Guardian`](crate::Guardian) runs its
//!    exact same state machine over this instead of an in-process [`Endpoint`].
//! 2. **An axum server** ([`router`]) with two planes:
//!    - a **relay plane** that *is* the transport hub for remote guardians, and
//!    - a **control plane** for vault CRUD, heartbeats, and proposing ceremonies.
//!
//! ## Design decision — the coordinator is its own HTTP relay
//! We do **not** stand up stock `frostd` (it is pinned to a yanked 2.x/orchard-fork
//! stack and needs mkcert/TLS). Because we control both client ends (they are ours),
//! the coordinator hosts the relay itself over plain HTTP. The server-side hub is
//! literally the increment-A [`InProcessRelay`]: the relay handlers translate an
//! HTTP `send`/`recv` into a relay [`Endpoint`] `send`/`recv`, and the coordinator's
//! own ceremony talks to that **same** hub directly in-process (no self-HTTP hop).
//! So the FIFO-mailbox semantics are byte-for-byte the ones already tested in
//! increment A.
//!
//! ### ⚠️ Trust tradeoff (documented, deliberate)
//! Unlike untrusted `frostd` — where every round message rides inside a client-to-
//! client Noise channel and the relay only sees ciphertext — **our coordinator-
//! hosted relay sees the (plaintext) FROST round messages**: the round-1
//! [`SigningCommitments`] and round-2 [`SignatureShare`]s. This is acceptable for
//! the MVP because *those messages do not leak the signing key*: a FROST commitment
//! is a public nonce commitment and a signature share is only usable inside its own
//! `(sighash, α, commitment-set)` context; neither reveals a guardian's secret
//! share. What we give up is transport-level confidentiality/deniability and defense
//! against a compromised relay tampering with routing (the ceremony still fails
//! *safely* — a bad share makes `aggregate`/`rk`-verify reject rather than mint a
//! bad signature). **Where Noise slots in later:** replace [`HttpTransport`]'s body
//! with a `Noise_K_25519_ChaChaPoly_BLAKE2s` (`snow`) channel between guardian and
//! guardian, keyed by the comm keypair that also does XEdDSA login (PROTOCOL.md §4)
//! — the relay then carries only ciphertext, and *nothing in the ceremony,
//! guardian, or this control plane has to change* because the [`Transport`] seam is
//! preserved.
//!
//! ## Sync ceremony in an async server
//! The ceremony ([`run_authorized_signing_session`]) is deliberately synchronous
//! (it polls with `std::thread::sleep`). Handlers do **not** rewrite it as async;
//! [`session`] runs it on a blocking thread via [`tokio::task::spawn_blocking`], so
//! it never stalls an async worker while the relay handlers keep serving the
//! guardians it is waiting on.
//!
//! ## Time
//! The policy gate needs `now`. In production that is wall-clock; for deterministic
//! tests it is injectable via the [`Clock`] trait ([`SystemClock`] in prod,
//! [`MockClock`] in tests) held on [`AppState`].
//!
//! [`SigningCommitments`]: steward_core::redpallas::round1::SigningCommitments
//! [`SignatureShare`]: steward_core::redpallas::round2::SignatureShare

use std::collections::{BTreeSet, HashMap};
// NB: `Path` is intentionally NOT imported here — `axum::extract::Path` owns that name
// in this module. Filesystem paths use `std::path::PathBuf` / fully-qualified `std::path::Path`.
use std::path::PathBuf;
use std::sync::atomic::{AtomicU64, Ordering};
use std::sync::{Arc, Mutex};
use std::time::{Duration, SystemTime, UNIX_EPOCH};

use axum::extract::{Path, State};
use axum::http::{HeaderMap, StatusCode};
use axum::response::{IntoResponse, Response};
use axum::routing::{get, post};
use axum::{Json, Router};
use serde::{Deserialize, Serialize};

use rand::rngs::OsRng;
use rand::RngCore;

use steward_core::heartbeat::{self, Heartbeat};
use steward_core::keys::split_authority;
use steward_core::policy::{HeartbeatPolicy, VaultState};
use steward_core::redpallas::keys::{KeyPackage, PublicKeyPackage, SecretShare};
use steward_core::redpallas::SigningKey;

use crate::authz::{CeremonyPurpose, VaultPolicy};
use crate::ceremony::{run_authorized_signing_session, SigningJob};
use crate::error::CoordinatorError;
use crate::guardian::Guardian;
use crate::transport::{
    InProcessRelay, ParticipantId, Recipient, Role, SessionId, Transport,
};

/// The HTTP header a caller uses to identify itself to the relay plane. This is the
/// relay's addressing model: identity is bound to the request (mirroring `frostd`'s
/// Bearer token, which fixes sender/receiver identity by the connection rather than
/// carrying it in each body). The reserved value [`ParticipantId::coordinator`]
/// addresses the coordinator's own mailbox.
pub const ID_HEADER: &str = "x-steward-id";

/// Default per-round timeout for a ceremony proposed over HTTP, if the request does
/// not override it. Generous because remote guardians poll over the network.
const DEFAULT_SESSION_TIMEOUT: Duration = Duration::from_secs(15);

/// Default per-round timeout for a **relay-mode** ceremony, if the request does not
/// override it. Generous on purpose: for an app-driven spend the ceremony only opens
/// *after* the PCZT build, so this is the window in which a human guardian must notice
/// the request, unlock, and approve. 90s proved too tight in practice (a live send timed
/// out at "0 of 2 co-signed"); 4 minutes is comfortable. It stays under the signer's 300s
/// relay callback budget because round 2 follows the human's approval on-device at once.
const RELAY_SESSION_TIMEOUT: Duration = Duration::from_secs(240);

// ---------------------------------------------------------------------------------
// Clock (injectable time for the policy gate)
// ---------------------------------------------------------------------------------

/// Source of `now` (unix seconds) for the dead-man's-switch gate. Real deployments
/// use [`SystemClock`]; tests inject a [`MockClock`] so the `Active`/`Recoverable`
/// transition is deterministic.
pub trait Clock: Send + Sync {
    /// Current time as unix seconds.
    fn now_secs(&self) -> u64;
}

/// Wall-clock time from [`SystemTime`].
#[derive(Debug, Clone, Copy, Default)]
pub struct SystemClock;

impl Clock for SystemClock {
    fn now_secs(&self) -> u64 {
        SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map(|d| d.as_secs())
            .unwrap_or(0)
    }
}

/// A test clock whose value can be set at will (thread-safe). Cloning shares the
/// same underlying instant, so a test can hold one handle and the server another.
#[derive(Debug, Clone, Default)]
pub struct MockClock(Arc<AtomicU64>);

impl MockClock {
    /// A mock clock pinned at `now` (unix seconds).
    pub fn new(now: u64) -> Self {
        Self(Arc::new(AtomicU64::new(now)))
    }

    /// Move the clock to `now` (unix seconds).
    pub fn set(&self, now: u64) {
        self.0.store(now, Ordering::SeqCst);
    }
}

impl Clock for MockClock {
    fn now_secs(&self) -> u64 {
        self.0.load(Ordering::SeqCst)
    }
}

// ---------------------------------------------------------------------------------
// Server state
// ---------------------------------------------------------------------------------

/// A vault's **public** record. The coordinator holds no secret shares — only the
/// group public key package, the guardian address set, the threshold, and (for an
/// inheritance vault) the dead-man's-switch policy.
#[derive(Clone)]
struct VaultRecord {
    threshold: u16,
    guardian_ids: Vec<ParticipantId>,
    public_key_package: PublicKeyPackage,
    /// The dead-man's-switch policy, or `None` for a **plain multisig** vault. A vault
    /// with a policy is an **inheritance** vault (heartbeat + heir + the trip gate);
    /// without one it is a plain t-of-n multisig (the switch turned OFF) — the
    /// non-inheritance presets (DAO/Treasury, Family, Personal cold vault, …).
    policy: Option<VaultPolicy>,
    /// A free-text purpose label for display — `"inheritance"` / `"treasury"` /
    /// `"family"` / `"personal"` / `"custom"`. Public config; drives the console's
    /// kind badge and framing. Never affects authorization (that is `policy`).
    purpose: String,
    /// The owner-chosen **human name** for the vault (e.g. "Family savings", "DAO treasury").
    /// Public config shown by **every** app (owner, guardians, integrators); the stable
    /// identifier remains the vault id. Defaults to the vault id when the owner supplies none.
    label: String,
    /// The heir's shielded receiving address (the release destination), for an
    /// inheritance vault. Recorded so the owner console can display *who* the vault
    /// would pass to. `None` for a plain multisig vault. Public config.
    heir: Option<String>,
    /// **DEMO ONLY.** For vaults seeded via `POST /demo/vault`, the coordinator also
    /// holds the guardian key packages so it can complete a full ceremony end-to-end
    /// *without* separate guardian processes — the glue that lets the owner console be
    /// driven standalone. A production vault created via `POST /vault` never sets this
    /// (`None`), so the coordinator holds **no** secret material for real vaults.
    demo_signers: Option<Vec<(ParticipantId, KeyPackage)>>,
    /// The vault's chain network — `"test"` or `"main"`. Selects the consensus params
    /// the signer derives the on-chain UA/UFVK under and which public endpoint `sync`
    /// scans. Defaults to `"test"` at creation.
    network: String,
    /// The vault's derived receiving Unified Address (`u1…` / `utest1…`), cached lazily
    /// on first `GET /vault/:id` by shelling out to `steward-signer derive-vault`.
    /// `None` until derived (or if the signer was unavailable).
    receiving_address: Option<String>,
    /// The vault's Unified Full Viewing Key, cached alongside `receiving_address` and fed
    /// to `sync`. `None` until derived.
    ufvk: Option<String>,
    /// Last-synced total balance in zatoshis, set by `POST /vault/:id/sync`. `None` until
    /// a sync has run — surfaced as `balance.zatoshis` on `GET /vault/:id`.
    balance_zat: Option<u64>,
    /// The owner's Ed25519 **heartbeat public key** (32-byte hex), recorded at creation for
    /// an inheritance vault; `None` for a plain multisig vault (there are no heartbeats to
    /// verify). Every `POST /vault/:id/heartbeat` is verified against this — the coordinator
    /// holds no secret for a real vault, so it can *check* proofs-of-life but never *forge*
    /// them. (A demo inheritance vault created without a supplied pubkey gets a
    /// coordinator-generated keypair whose secret is returned once, then discarded.)
    heartbeat_pubkey_hex: Option<String>,
    /// The latest VERIFIED signed proof-of-life — the **bulletin** guardians fetch via
    /// `GET /vault/:id/heartbeat` and re-verify themselves before acting on an inheritance
    /// release. `None` until the first valid heartbeat (seeded at creation for a
    /// coordinator-generated demo keypair; otherwise set by the owner's first heartbeat).
    latest_heartbeat: Option<Heartbeat>,
}

/// Project a live record onto its **public** on-disk shape. This is the only path a
/// `VaultRecord` reaches disk, and it copies public config **only** — the secret
/// `demo_signers` field simply has no counterpart in [`PersistedVault`], so it can
/// never be serialized. (See [`crate::persist`] for why this is opt-in, not opt-out.)
impl From<&VaultRecord> for crate::persist::PersistedVault {
    fn from(r: &VaultRecord) -> Self {
        Self {
            threshold: r.threshold,
            guardian_ids: r.guardian_ids.clone(),
            public_key_package: r.public_key_package.clone(),
            policy: r.policy.clone(),
            purpose: r.purpose.clone(),
            label: r.label.clone(),
            heir: r.heir.clone(),
            network: r.network.clone(),
            receiving_address: r.receiving_address.clone(),
            ufvk: r.ufvk.clone(),
            balance_zat: r.balance_zat,
            heartbeat_pubkey_hex: r.heartbeat_pubkey_hex.clone(),
            latest_heartbeat: r.latest_heartbeat.clone(),
        }
    }
}

/// Rehydrate a record from its persisted public shape at startup. **Secret shares are
/// never on disk**, so a restored vault has `demo_signers = None`: a *demo* vault can
/// no longer auto-sign in-process after a restart (re-seed it to demo again), but its
/// public config + heartbeat survive and a real-guardian relay ceremony still works —
/// real vaults never held shares on the coordinator in the first place.
impl From<crate::persist::PersistedVault> for VaultRecord {
    fn from(p: crate::persist::PersistedVault) -> Self {
        Self {
            threshold: p.threshold,
            guardian_ids: p.guardian_ids,
            public_key_package: p.public_key_package,
            policy: p.policy,
            purpose: p.purpose,
            label: p.label,
            heir: p.heir,
            demo_signers: None,
            network: p.network,
            receiving_address: p.receiving_address,
            ufvk: p.ufvk,
            balance_zat: p.balance_zat,
            heartbeat_pubkey_hex: p.heartbeat_pubkey_hex,
            latest_heartbeat: p.latest_heartbeat,
        }
    }
}

/// An open **relay-mode** ceremony a guardian can discover (via
/// [`GET /vault/:id/pending`](vault_pending)) and approve. Registered when a
/// [`SessionMode::Relay`] session is proposed and removed the instant the ceremony
/// resolves (quorum, timeout, or refusal). Holds only public/transaction-derived
/// data — never a share.
#[derive(Clone)]
struct PendingSession {
    /// The vault this ceremony belongs to (so `/pending` can filter by vault).
    vault_id: String,
    /// Why the ceremony runs (drives the guardian's plain-words approval card).
    purpose: CeremonyPurpose,
    /// The human-readable description shown to guardians.
    display: PendingDisplay,
    /// The invited guardian relay ids.
    invited: Vec<String>,
    /// Guardian ids that have sent at least one message to the coordinator on this
    /// session — a best-effort "who has approved & started co-signing" set, used only
    /// to light the seal's arcs. Not a security signal.
    approvers: BTreeSet<String>,
    /// The ZIP-312 randomizer α (32-byte LE, hex) this ceremony signs under. Recorded
    /// with the pending session per the relay-mode contract; not surfaced to clients.
    #[allow(dead_code)]
    randomizer_hex: String,
}

/// A plain-words description of a pending relay ceremony, for the guardian approval
/// UX — "see what you are signing, then decide".
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PendingDisplay {
    /// The purpose in plain words ("Release the vault to the heir", …).
    pub headline: String,
    /// The heir's shielded receiving address, if the vault records one.
    pub heir: Option<String>,
    /// The payment recipient address, if the proposer attached one (a `NormalSpend`).
    /// Best-effort display; the sighash below is the authoritative commitment.
    pub recipient: Option<String>,
    /// A human amount string, if the proposer attached one (best-effort display).
    pub amount: Option<String>,
    /// The 32-byte sighash (hex) the guardians will authorize — the exact message
    /// they are asked to sign.
    pub sighash: String,
}

/// Shared server state. Cheap to [`Clone`] (everything is behind `Arc`), as axum
/// requires for `State`.
#[derive(Clone)]
pub struct AppState {
    /// The relay hub — the same in-memory FIFO relay from increment A, now shared
    /// between the HTTP relay handlers and the coordinator's own ceremony endpoint.
    relay: InProcessRelay,
    /// Public vault records by vault id.
    vaults: Arc<Mutex<HashMap<String, VaultRecord>>>,
    /// Open relay-mode ceremonies by session id, for guardian discovery + approval.
    pending: Arc<Mutex<HashMap<String, PendingSession>>>,
    /// Injected time source for the policy gate.
    clock: Arc<dyn Clock>,
    /// Monotonic counters for minting vault ids and session ids.
    vault_seq: Arc<AtomicU64>,
    session_seq: Arc<AtomicU64>,
    /// Path to the on-disk vault store (`<data_dir>/vaults.json`), or `None` for a
    /// **memory-only** coordinator — the default, and what every test uses, so
    /// `cargo test` never reads or writes a shared on-disk store. The production
    /// binary opts in via [`with_persistence`](AppState::with_persistence).
    data_path: Option<Arc<PathBuf>>,
    /// Serializes saves so two concurrent mutations don't race their snapshot+rename.
    /// A **dedicated** lock: it never blocks vault reads/mutations, only other saves.
    persist_lock: Arc<Mutex<()>>,
    /// The coordinator's own base URL (`http://127.0.0.1:<port>`), handed to the signer's
    /// `sign-and-broadcast` as `--coordinator` so its FROST callback reaches **this** relay.
    /// Defaults to the signer's default; the binary overrides it with the real bind port.
    self_base_url: Arc<String>,
}

impl AppState {
    /// Build **memory-only** server state with a given clock (use a [`MockClock`] in
    /// tests). Holds nothing on disk, so `cargo test` stays hermetic — no test reads
    /// or writes a shared store. The production binary uses
    /// [`with_persistence`](AppState::with_persistence) instead.
    pub fn new(clock: Arc<dyn Clock>) -> Self {
        Self::build(clock, None)
    }

    /// Build server state backed by an on-disk vault store under `data_dir`
    /// (`<data_dir>/vaults.json`). On startup it **loads** any persisted vaults so a
    /// restart is transparent; thereafter every mutation is **saved** atomically.
    ///
    /// Only **public** config is persisted — never the demo secret shares (see
    /// [`crate::persist`]). A restored *demo* vault therefore cannot auto-sign
    /// in-process until re-seeded, but its public config + heartbeat survive and a
    /// real-guardian relay ceremony is unaffected.
    pub fn with_persistence(
        clock: Arc<dyn Clock>,
        data_dir: impl AsRef<std::path::Path>,
    ) -> std::io::Result<Self> {
        let data_dir = data_dir.as_ref();
        std::fs::create_dir_all(data_dir)?;
        let path = data_dir.join(crate::persist::STORE_FILE);
        let state = Self::build(clock, Some(Arc::new(path.clone())));
        if let Some(loaded) = crate::persist::load(&path)? {
            {
                let mut vaults = state.vaults.lock().map_err(|_| {
                    std::io::Error::other("vault store mutex poisoned during load")
                })?;
                for (id, pv) in loaded.vaults {
                    vaults.insert(id, VaultRecord::from(pv));
                }
            }
            // Restore the id counter past every loaded vault so a post-restart create
            // never collides with (and overwrites) an existing vault id.
            state.vault_seq.store(loaded.vault_seq.max(1), Ordering::SeqCst);
        }
        Ok(state)
    }

    fn build(clock: Arc<dyn Clock>, data_path: Option<Arc<PathBuf>>) -> Self {
        Self {
            relay: InProcessRelay::new(),
            vaults: Arc::new(Mutex::new(HashMap::new())),
            pending: Arc::new(Mutex::new(HashMap::new())),
            clock,
            vault_seq: Arc::new(AtomicU64::new(1)),
            session_seq: Arc::new(AtomicU64::new(1)),
            data_path,
            persist_lock: Arc::new(Mutex::new(())),
            self_base_url: Arc::new("http://127.0.0.1:8080".to_string()),
        }
    }

    /// Override the coordinator's own base URL. `POST /vault/:id/spend` passes it to the signer
    /// as `--coordinator` so the FROST co-signing callback reaches this relay on its real port.
    /// The binary sets it from the resolved bind port; tests keep the default.
    pub fn with_self_base_url(mut self, url: impl Into<String>) -> Self {
        self.self_base_url = Arc::new(url.into());
        self
    }

    /// Persist the current vault store to disk (**public config only**). A no-op for a
    /// memory-only [`AppState`] (tests). Call after every mutation, and **not** while
    /// holding the `vaults` lock — this takes that lock itself to snapshot.
    ///
    /// A failed save is logged, never fatal: the in-RAM state is still correct and the
    /// next mutation retries. The snapshot is taken under the `vaults` lock and the
    /// (atomic) file write happens after releasing it, so fs I/O never blocks handlers.
    fn persist(&self) {
        let Some(path) = self.data_path.clone() else {
            return; // memory-only (tests): never touch disk.
        };
        // Serialize saves so concurrent mutations don't interleave snapshot + rename.
        let _save_guard = match self.persist_lock.lock() {
            Ok(g) => g,
            Err(_) => return,
        };
        // Snapshot the PUBLIC shape under the vaults lock, then drop it before fs I/O.
        // `PersistedVault::from` copies only public fields — the secret `demo_signers`
        // are structurally absent from the on-disk shape and cannot be written.
        let snapshot: HashMap<String, crate::persist::PersistedVault> = {
            let vaults = match self.vaults.lock() {
                Ok(v) => v,
                Err(_) => return,
            };
            vaults
                .iter()
                .map(|(id, rec)| (id.clone(), crate::persist::PersistedVault::from(rec)))
                .collect()
        };
        let vault_seq = self.vault_seq.load(Ordering::SeqCst);
        if let Err(e) = crate::persist::save(&path, vault_seq, &snapshot) {
            eprintln!(
                "[persist] failed to save vault store to {}: {e}",
                path.display()
            );
        }
    }

    fn vaults(&self) -> Result<std::sync::MutexGuard<'_, HashMap<String, VaultRecord>>, AppError> {
        self.vaults
            .lock()
            .map_err(|_| AppError::internal("vault store mutex poisoned"))
    }

    fn pending(
        &self,
    ) -> Result<std::sync::MutexGuard<'_, HashMap<String, PendingSession>>, AppError> {
        self.pending
            .lock()
            .map_err(|_| AppError::internal("pending session store mutex poisoned"))
    }
}

// ---------------------------------------------------------------------------------
// Wire DTOs
// ---------------------------------------------------------------------------------

/// Relay `send` body: the opaque FROST message (hex) and its destination. `to`
/// omitted / empty routes to the coordinator (mirrors `frostd`'s empty
/// `recipients`); otherwise it names a participant id.
#[derive(Debug, Serialize, Deserialize)]
pub struct SendBody {
    /// Destination participant id; `None`/empty = the coordinator.
    #[serde(default)]
    pub to: Option<String>,
    /// The opaque relay payload, hex-encoded.
    pub msg_hex: String,
}

/// One message returned by the relay `recv` drain.
#[derive(Debug, Serialize, Deserialize)]
pub struct RecvItem {
    /// The sender's id (a participant id, or the reserved coordinator id).
    pub from: String,
    /// The opaque relay payload, hex-encoded.
    pub msg_hex: String,
}

/// Relay `recv` response: the caller's whole FIFO queue, drained (non-blocking,
/// like `frostd`'s `/receive`).
#[derive(Debug, Serialize, Deserialize)]
pub struct RecvResponse {
    /// Queued messages in FIFO order.
    pub messages: Vec<RecvItem>,
}

/// `POST /vault` — create a vault from **public** data only.
#[derive(Debug, Serialize, Deserialize)]
pub struct CreateVaultBody {
    /// Threshold `t`.
    pub threshold: u16,
    /// The guardian transport addresses (their relay ids).
    pub guardian_ids: Vec<String>,
    /// The group public key package (serde_json of the FROST type).
    pub public_key_package: PublicKeyPackage,
    /// The dead-man's-switch heartbeat policy. **Optional** — supply it for an
    /// **inheritance** vault; omit it for a **plain multisig** vault (no dead-man's-switch,
    /// no heir). When present the vault is an inheritance vault; when absent it is a plain
    /// t-of-n multisig whose only ceremonies are the owner-authorized spend/move.
    #[serde(default)]
    pub heartbeat: Option<HeartbeatPolicy>,
    /// The vault's chain network — `"test"` or `"main"`. Optional; defaults to `"test"`.
    #[serde(default)]
    pub network: Option<String>,
    /// The owner's Ed25519 **heartbeat public key** (32-byte hex). Only meaningful for an
    /// inheritance vault (ignored when `heartbeat` is absent). Optional even then: a real owner
    /// supplies their own, so the coordinator never holds the secret and can never forge a
    /// proof-of-life. If omitted for an inheritance vault, the coordinator mints a demo keypair
    /// and returns the secret in [`CreateVaultResponse::heartbeat_secret_hex`].
    #[serde(default)]
    pub heartbeat_pubkey: Option<String>,
    /// The heir's shielded receiving address (release destination) for an inheritance vault.
    /// Optional; ignored for a plain multisig vault.
    #[serde(default)]
    pub heir: Option<String>,
    /// A free-text purpose label for display (`"inheritance"` / `"treasury"` / `"family"` /
    /// `"personal"` / `"custom"`). Optional; defaults to `"inheritance"` when a heartbeat
    /// policy is present, else `"custom"`.
    #[serde(default)]
    pub purpose: Option<String>,
    /// The owner-chosen **human name** for the vault (e.g. "Family savings"). Optional;
    /// defaults to the vault id. Public config shown by every app.
    #[serde(default)]
    pub label: Option<String>,
}

/// `POST /vault` response.
#[derive(Debug, Serialize, Deserialize)]
pub struct CreateVaultResponse {
    /// The minted vault id.
    pub vault_id: String,
    /// **DEMO CONVENIENCE ONLY** — present only when no `heartbeat_pubkey` was supplied and
    /// the coordinator therefore generated one. The Ed25519 secret seed (32-byte hex) with
    /// which to sign this vault's heartbeats. A real owner supplies their own pubkey and never
    /// receives this (the coordinator never sees a real owner's secret).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub heartbeat_secret_hex: Option<String>,
}

/// A stubbed balance. The Zaino gRPC vault scanner is a later increment; this
/// records that honestly rather than reporting a fake number.
#[derive(Debug, Serialize, Deserialize)]
pub struct BalanceStub {
    /// Always `None` in this increment.
    pub zatoshis: Option<u64>,
    /// Why it is `None`.
    pub note: String,
}

/// `GET /vault/:id` — vault status evaluated at the server's `now`.
///
/// The heartbeat/dead-man's-switch fields (`state`, `last_heartbeat`, `trip_at`,
/// `interval_secs`, `grace_secs`) are **only meaningful for an inheritance vault** and are
/// `null` for a plain multisig vault (`inheritance_enabled == false`).
#[derive(Debug, Serialize, Deserialize)]
pub struct VaultStatus {
    /// The vault id.
    pub vault_id: String,
    /// Threshold `t`.
    pub threshold: u16,
    /// Guardian ids.
    pub guardians: Vec<String>,
    /// The free-text purpose label (`"inheritance"` / `"treasury"` / …), for the console's
    /// kind badge + framing.
    pub purpose: String,
    /// The owner-chosen human **name** for the vault. Public config; shown by owner + guardian
    /// apps (and any integrator). Falls back to the vault id when none was supplied.
    pub label: String,
    /// Whether this vault has a dead-man's-switch — `true` for an **inheritance** vault,
    /// `false` for a **plain multisig** vault. The heartbeat fields below are `null` when `false`.
    pub inheritance_enabled: bool,
    /// Dead-man's-switch state at `now`, or `null` for a plain multisig vault.
    pub state: Option<VaultState>,
    /// Unix seconds of the last recorded heartbeat, or `null` for a plain multisig vault.
    pub last_heartbeat: Option<u64>,
    /// Unix seconds at/after which the switch trips, or `null` for a plain multisig vault.
    pub trip_at: Option<u64>,
    /// Heartbeat interval in seconds (from the vault's policy), or `null` for a plain multisig vault.
    pub interval_secs: Option<u64>,
    /// Grace window in seconds after a missed heartbeat (from the vault's policy), or `null`
    /// for a plain multisig vault. With `trip_at`, lets a client derive the "waning" window.
    pub grace_secs: Option<u64>,
    /// The server's `now` used to evaluate `state` (unix seconds).
    pub now: u64,
    /// The heir's shielded address (release destination), if recorded at setup (inheritance only).
    pub heir: Option<String>,
    /// The FROST group verifying key = Orchard spend-validating key `ak`, 32-byte hex.
    /// Feed to `steward-signer derive-vault --ak <hex>` to derive THIS vault's on-chain
    /// Unified Address + UFVK — the same vault the guardians can co-sign for.
    pub group_ak_hex: String,
    /// The vault's chain network — `"test"` or `"main"`.
    pub network: String,
    /// The vault's derived on-chain receiving Unified Address (`u1…` / `utest1…`), derived
    /// lazily on first request by shelling out to the signer and cached thereafter. `null`
    /// if the signer is unavailable (the rest of the status is unaffected).
    pub receiving_address: Option<String>,
    /// Balance: `zatoshis` is the total from the last `POST /vault/:id/sync`, or `null` if
    /// never synced.
    pub balance: BalanceStub,
}

/// `POST /vault/:id/sync` success response — the signer's no-node on-chain scan result
/// for the vault's UFVK, verbatim (the coordinator also stores `total_zat` as the vault's
/// balance so `GET /vault/:id` reflects it).
#[derive(Debug, Serialize, Deserialize)]
pub struct VaultSyncResponse {
    /// `"test"` or `"main"` — the network the scan ran under.
    pub network: String,
    /// Whether the wallet is fully scanned to the chain tip.
    pub synced: bool,
    /// The endpoint chain-tip height at scan time.
    pub tip_height: u64,
    /// Total value across all pools (incl. pending), zatoshis.
    pub total_zat: u64,
    /// Orchard-pool total, zatoshis.
    pub orchard_zat: u64,
    /// Immediately-spendable value, zatoshis.
    pub spendable_zat: u64,
}

/// `POST /demo/vault` — a **demo-only** vault seed. The owner console cannot yet
/// produce FROST key material client-side, so this endpoint acts as trusted dealer:
/// it mints a fresh spend-authorizing key, splits it `t`-of-`n` via
/// [`split_authority`], stores the public package **plus** the guardian shares (see
/// [`VaultRecord::demo_signers`]) under a short heartbeat cadence, and returns the
/// shares so a real guardian client could load them. A production vault uses
/// [`create_vault`] with an externally-produced package instead.
#[derive(Debug, Serialize, Deserialize)]
pub struct DemoVaultBody {
    /// Threshold `t`.
    pub threshold: u16,
    /// Total guardians `n` (must equal `guardian_names.len()`).
    pub n: u16,
    /// Human names for the guardians; relay ids are derived from them.
    pub guardian_names: Vec<String>,
    /// Heartbeat interval in seconds (keep SHORT for the demo so the pulse decays live).
    /// **Optional** — supply it (with `grace_secs`) for an **inheritance** vault; omit both for
    /// a **plain multisig** vault (no dead-man's-switch). It is an error to supply one without
    /// the other.
    #[serde(default)]
    pub interval_secs: Option<u64>,
    /// Grace window in seconds after a missed heartbeat before release unlocks. Optional; see
    /// `interval_secs` (supply both or neither).
    #[serde(default)]
    pub grace_secs: Option<u64>,
    /// The heir's shielded receiving address (release destination), optional (inheritance only).
    #[serde(default)]
    pub heir: Option<String>,
    /// The vault's chain network — `"test"` or `"main"`. Optional; defaults to `"test"`.
    #[serde(default)]
    pub network: Option<String>,
    /// The owner's Ed25519 **heartbeat public key** (32-byte hex). Only meaningful for an
    /// inheritance vault. Optional: the owner console supplies its own (keeping the secret in
    /// the browser); if omitted (e.g. `scripts/demo-lifecycle.sh`), the coordinator mints a demo
    /// keypair and returns the secret in [`DemoVaultResponse::heartbeat_secret_hex`].
    #[serde(default)]
    pub heartbeat_pubkey: Option<String>,
    /// A free-text purpose label for display (`"inheritance"` / `"treasury"` / …). Optional;
    /// defaults to `"inheritance"` when a heartbeat cadence is present, else `"custom"`.
    #[serde(default)]
    pub purpose: Option<String>,
    /// The owner-chosen **human name** for the vault. Optional; defaults to the vault id.
    #[serde(default)]
    pub label: Option<String>,
}

/// `POST /demo/vault` response.
#[derive(Debug, Serialize, Deserialize)]
pub struct DemoVaultResponse {
    /// The minted vault id.
    pub vault_id: String,
    /// The derived guardian relay ids, in guardian order.
    pub guardian_ids: Vec<String>,
    /// The guardian secret shares, serialized as JSON (one per guardian). A real
    /// guardian client would load exactly its own entry; here they are returned in
    /// full because this is a demo dealer, not a production custody flow.
    pub shares_json: String,
    /// **DEMO CONVENIENCE ONLY** — present only when no `heartbeat_pubkey` was supplied and
    /// the coordinator generated one. The Ed25519 secret seed (32-byte hex) for signing this
    /// vault's heartbeats (what `scripts/demo-lifecycle.sh` signs with). `None` when the caller
    /// supplied its own pubkey (the owner console keeps its secret in the browser).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub heartbeat_secret_hex: Option<String>,
}

/// One guardian's share in the demo seed response.
#[derive(Debug, Serialize)]
struct DemoShareOut {
    guardian_id: String,
    secret_share: SecretShare,
}

/// `POST /vault/:id/heartbeat` request — a **signed** proof-of-life. The coordinator
/// verifies `sig_hex` against the vault's recorded heartbeat public key over the canonical
/// message `steward-heartbeat-v1 || vault_id || time(be u64)` before recording it. There is
/// deliberately **no** unsigned "just trust me" heartbeat path for a real vault.
#[derive(Debug, Serialize, Deserialize)]
pub struct HeartbeatBody {
    /// Unix seconds the owner signed as their proof-of-life.
    pub time: u64,
    /// Ed25519 signature (64-byte hex) over the canonical heartbeat message.
    pub sig_hex: String,
}

/// `POST /vault/:id/heartbeat` response (the switch state after recording the heartbeat).
#[derive(Debug, Serialize, Deserialize)]
pub struct HeartbeatResponse {
    /// The vault id.
    pub vault_id: String,
    /// New last-heartbeat timestamp (= the owner-signed `time`).
    pub last_heartbeat: u64,
    /// New trip time after advancing the deadline.
    pub trip_at: u64,
    /// State immediately after the heartbeat, evaluated at the server's `now`.
    pub state: VaultState,
}

/// `GET /vault/:id/heartbeat` — the latest signed proof-of-life **bulletin**, for guardians
/// to fetch and **independently re-verify** (rebuild the canonical message, check `sig_hex`
/// against `pubkey_hex`, and compute `is_lapsed` themselves) before arming a release. `time`
/// and `sig_hex` are `null` until the owner posts their first heartbeat.
#[derive(Debug, Serialize, Deserialize)]
pub struct HeartbeatBulletin {
    /// The vault id.
    pub vault_id: String,
    /// The owner's Ed25519 heartbeat public key (32-byte hex) — verify `sig_hex` against this.
    pub pubkey_hex: String,
    /// The owner-signed timestamp of the latest proof-of-life, or `null` if none yet.
    pub time: Option<u64>,
    /// The Ed25519 signature (64-byte hex) over the canonical message, or `null` if none yet.
    pub sig_hex: Option<String>,
    /// Heartbeat interval (seconds) — public policy, echoed so a guardian can compute
    /// `is_lapsed(time, interval, grace, now)` without a second request. Not a trust anchor:
    /// the *timestamp* is what the signature protects.
    pub interval_secs: u64,
    /// Grace window (seconds) after a missed heartbeat before the switch trips.
    pub grace_secs: u64,
}

/// How a proposed ceremony is co-signed.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Default, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum SessionMode {
    /// **Default** — the coordinator drives the demo vault's guardian shares
    /// in-process and completes the ceremony at once. This is what the owner console
    /// and `scripts/demo-lifecycle.sh` rely on; unchanged from the original behavior.
    #[default]
    Auto,
    /// The coordinator registers the session as **pending** and waits for **real
    /// remote guardians** to discover it via [`GET /vault/:id/pending`](vault_pending)
    /// and co-sign over the HTTP relay (no in-process demo signers are spawned).
    Relay,
}

/// `POST /vault/:id/session` — propose a signing ceremony.
#[derive(Debug, Serialize, Deserialize)]
pub struct CreateSessionBody {
    /// Relay session id the guardians will poll. If omitted the server mints one and
    /// returns it, but for a live ceremony the caller supplies it so guardians can
    /// start polling it up front.
    #[serde(default)]
    pub session_id: Option<String>,
    /// Why this ceremony runs — selects the authorization rule.
    pub purpose: CeremonyPurpose,
    /// 32-byte sighash, hex.
    pub sighash_hex: String,
    /// ZIP-312 randomizer α, 32-byte little-endian, hex.
    pub randomizer_hex: String,
    /// Invited signer set (relay ids). Defaults to the vault's full guardian set.
    #[serde(default)]
    pub participants: Option<Vec<String>>,
    /// Per-round timeout override, milliseconds.
    #[serde(default)]
    pub timeout_ms: Option<u64>,
    /// How to co-sign: `"auto"` (default, coordinator-driven demo shares) or
    /// `"relay"` (wait for real remote guardians on the relay).
    #[serde(default)]
    pub mode: SessionMode,
    /// A human amount string to show guardians in relay mode (e.g. `"10 ZEC"`).
    /// Display-only; does not affect what is signed.
    #[serde(default)]
    pub amount: Option<String>,
    /// The recipient address to show guardians for a `NormalSpend` payment. Display-only
    /// (advisory — the signature binds the sighash, see SPEC §9); `None` for a sweep/release.
    #[serde(default)]
    pub recipient: Option<String>,
}

/// One open relay-mode session, as returned by [`GET /vault/:id/pending`](vault_pending).
#[derive(Debug, Serialize, Deserialize)]
pub struct PendingSessionOut {
    /// The relay session id a guardian polls + co-signs under.
    pub session_id: String,
    /// Why the ceremony runs.
    pub purpose: CeremonyPurpose,
    /// Plain-words description for the approval card.
    pub display: PendingDisplay,
    /// The invited guardian relay ids.
    pub invited: Vec<String>,
    /// How many invited guardians have committed so far (best-effort, for the seal).
    pub approvals: usize,
}

/// `POST /vault/:id/session` success response.
#[derive(Debug, Serialize, Deserialize)]
pub struct CreateSessionResponse {
    /// The relay session the ceremony ran in.
    pub session_id: String,
    /// The aggregated re-randomized RedPallas signature (`R‖z`), hex. Already
    /// verified against `rk = ak + [α]G` server-side before return.
    pub signature_hex: String,
}

/// `POST /vault/:id/spend` — a real, app-driven payment (build → guardians co-sign → broadcast).
#[derive(Debug, Serialize, Deserialize)]
pub struct SpendBody {
    /// Recipient unified/shielded address (`u1…`/`utest1…`), validated against the vault network
    /// by the signer's PCZT build.
    pub to: String,
    /// Amount to send, in zatoshis (the fee is added on top by the signer).
    pub amount_zat: u64,
    /// Co-signing transport: `"relay"` (real guardians, **default**) or `"auto"` (a demo vault's
    /// in-process shares). Omit for the real multisig path.
    #[serde(default)]
    pub mode: Option<String>,
}

/// `POST /vault/:id/spend` success response.
#[derive(Debug, Serialize, Deserialize)]
pub struct SpendResponse {
    /// The broadcast transaction id (ZIP-244), hex — view it on a testnet/mainnet explorer.
    pub txid: String,
}

// ---------------------------------------------------------------------------------
// Error → HTTP status
// ---------------------------------------------------------------------------------

/// A handler error carrying the HTTP status to return.
#[derive(Debug)]
pub struct AppError {
    status: StatusCode,
    message: String,
}

impl AppError {
    fn new(status: StatusCode, message: impl Into<String>) -> Self {
        Self {
            status,
            message: message.into(),
        }
    }
    fn bad_request(message: impl Into<String>) -> Self {
        Self::new(StatusCode::BAD_REQUEST, message)
    }
    fn not_found(message: impl Into<String>) -> Self {
        Self::new(StatusCode::NOT_FOUND, message)
    }
    fn internal(message: impl Into<String>) -> Self {
        Self::new(StatusCode::INTERNAL_SERVER_ERROR, message)
    }
}

/// Map a coordinator error to an HTTP status. The dead-man's-switch refusal
/// ([`Unauthorized`](CoordinatorError::Unauthorized)) becomes **403 Forbidden**;
/// a missed quorum / failed verification is a **422**; everything else is a 500.
impl From<CoordinatorError> for AppError {
    fn from(e: CoordinatorError) -> Self {
        let status = match &e {
            CoordinatorError::Unauthorized(_) => StatusCode::FORBIDDEN,
            CoordinatorError::QuorumNotMet { .. } | CoordinatorError::VerificationFailed => {
                StatusCode::UNPROCESSABLE_ENTITY
            }
            _ => StatusCode::INTERNAL_SERVER_ERROR,
        };
        AppError::new(status, e.to_string())
    }
}

/// JSON error envelope.
#[derive(Serialize)]
struct ErrorBody {
    error: String,
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        (
            self.status,
            Json(ErrorBody {
                error: self.message,
            }),
        )
            .into_response()
    }
}

type ApiResult<T> = std::result::Result<T, AppError>;

// ---------------------------------------------------------------------------------
// Router
// ---------------------------------------------------------------------------------

/// Build the axum [`Router`] for both planes over the given [`AppState`].
///
/// Relay plane (the [`Transport`] over the wire):
/// - `POST /session/:id/send` — enqueue an opaque message to a recipient.
/// - `POST /session/:id/recv` — drain the caller's FIFO queue (non-blocking).
///
/// Control plane:
/// - `POST /vault` — create a vault (public data only).
/// - `GET  /vault/:id` — status at `now` (incl. `network` + derived `receiving_address`).
/// - `POST /vault/:id/sync` — scan the public endpoint for the vault's balance (via the signer).
/// - `POST /vault/:id/heartbeat` — record a **signed** heartbeat (verify + advance the deadline).
/// - `GET  /vault/:id/heartbeat` — the latest signed proof-of-life bulletin (for guardians to re-verify).
/// - `GET  /vault/:id/pending` — list open relay-mode ceremonies awaiting guardians.
/// - `POST /vault/:id/session` — propose + run an authorized ceremony (`auto`/`relay`).
pub fn router(state: AppState) -> Router {
    Router::new()
        .route("/session/{id}/send", post(relay_send))
        .route("/session/{id}/recv", post(relay_recv))
        .route("/demo/vault", post(demo_vault))
        .route("/vault", post(create_vault))
        .route("/vault/{id}", get(vault_status))
        .route("/vault/{id}/sync", post(vault_sync))
        .route("/vault/{id}/spend", post(vault_spend))
        .route("/vault/{id}/release", post(vault_release))
        .route(
            "/vault/{id}/heartbeat",
            post(vault_heartbeat).get(vault_heartbeat_get),
        )
        .route("/vault/{id}/pending", get(vault_pending))
        .route("/vault/{id}/session", post(session))
        .with_state(state)
}

/// The caller's relay identity, from the [`ID_HEADER`]. Maps the reserved
/// coordinator id to [`Role::Coordinator`]; any other id to a participant.
fn caller_role(headers: &HeaderMap) -> ApiResult<Role> {
    let id = headers
        .get(ID_HEADER)
        .ok_or_else(|| AppError::bad_request(format!("missing `{ID_HEADER}` header")))?
        .to_str()
        .map_err(|_| AppError::bad_request(format!("`{ID_HEADER}` is not valid UTF-8")))?;
    if id == ParticipantId::coordinator().0 {
        Ok(Role::Coordinator)
    } else {
        Ok(Role::Participant(ParticipantId::new(id)))
    }
}

// --- relay plane -----------------------------------------------------------------

async fn relay_send(
    State(state): State<AppState>,
    Path(session): Path<String>,
    headers: HeaderMap,
    Json(body): Json<SendBody>,
) -> ApiResult<StatusCode> {
    let role = caller_role(&headers)?;
    let to = match body.to.as_deref() {
        None | Some("") => Recipient::Coordinator,
        Some(id) if id == ParticipantId::coordinator().0 => Recipient::Coordinator,
        Some(id) => Recipient::Participant(ParticipantId::new(id)),
    };
    let msg = hex::decode(body.msg_hex.trim())
        .map_err(|e| AppError::bad_request(format!("msg_hex is not valid hex: {e}")))?;

    // Best-effort approval tracking for the seal UX: a guardian that posts to the
    // coordinator on a pending relay session has committed and started co-signing, so
    // light its arc. This never parses FROST and is not a security signal — the
    // ceremony's own quorum/verify checks remain the source of truth.
    if matches!(to, Recipient::Coordinator) {
        if let Role::Participant(pid) = &role {
            if let Ok(mut pending) = state.pending.lock() {
                if let Some(sess) = pending.get_mut(&session) {
                    if sess.invited.iter().any(|g| g == &pid.0) {
                        sess.approvers.insert(pid.0.clone());
                    }
                }
            }
        }
    }

    state
        .relay
        .endpoint(role)
        .send(&SessionId::new(session), to, msg)
        .map_err(AppError::from)?;
    Ok(StatusCode::ACCEPTED)
}

async fn relay_recv(
    State(state): State<AppState>,
    Path(session): Path<String>,
    headers: HeaderMap,
) -> ApiResult<Json<RecvResponse>> {
    let role = caller_role(&headers)?;
    let drained = state
        .relay
        .endpoint(role)
        .recv(&SessionId::new(session))
        .map_err(AppError::from)?;
    let messages = drained
        .into_iter()
        .map(|(from, payload)| RecvItem {
            from: from.0,
            msg_hex: hex::encode(payload),
        })
        .collect();
    Ok(Json(RecvResponse { messages }))
}

// --- control plane ---------------------------------------------------------------

async fn create_vault(
    State(state): State<AppState>,
    Json(body): Json<CreateVaultBody>,
) -> ApiResult<(StatusCode, Json<CreateVaultResponse>)> {
    if body.threshold == 0 || body.threshold as usize > body.guardian_ids.len() {
        return Err(AppError::bad_request(format!(
            "invalid threshold {} for {} guardians (need 1 <= t <= n)",
            body.threshold,
            body.guardian_ids.len()
        )));
    }
    let network = normalize_network(body.network.as_deref())?;
    let vault_id = format!("vault-{}", state.vault_seq.fetch_add(1, Ordering::SeqCst));

    // A heartbeat policy makes this an **inheritance** vault (heartbeat key + heir + the trip
    // gate); its absence makes it a **plain multisig** vault (the dead-man's-switch turned OFF).
    // For an inheritance vault, resolve the heartbeat key and anchor any coordinator-seeded
    // initial bulletin (demo path) at the policy's recorded last-heartbeat so it is consistent
    // with the switch from the start.
    let (policy, heartbeat_pubkey_hex, latest_heartbeat, heartbeat_secret_hex, heir) =
        match body.heartbeat {
            Some(hb) => {
                let (pk_hex, bulletin, secret) = resolve_heartbeat_key(
                    body.heartbeat_pubkey.as_deref(),
                    &vault_id,
                    hb.last_heartbeat,
                )?;
                (
                    Some(VaultPolicy::new(hb)),
                    Some(pk_hex),
                    bulletin,
                    secret,
                    body.heir.clone(),
                )
            }
            None => (None, None, None, None, None),
        };
    let purpose = resolve_purpose(body.purpose.as_deref(), policy.is_some());
    let label = resolve_label(body.label.as_deref(), &vault_id);

    let record = VaultRecord {
        threshold: body.threshold,
        guardian_ids: body
            .guardian_ids
            .into_iter()
            .map(ParticipantId::new)
            .collect(),
        public_key_package: body.public_key_package,
        policy,
        purpose,
        label,
        heir,
        demo_signers: None,
        network,
        receiving_address: None,
        ufvk: None,
        balance_zat: None,
        heartbeat_pubkey_hex,
        latest_heartbeat,
    };
    state.vaults()?.insert(vault_id.clone(), record);
    // Persist the new (public) vault so a restart doesn't orphan it.
    state.persist();
    Ok((
        StatusCode::CREATED,
        Json(CreateVaultResponse {
            vault_id,
            heartbeat_secret_hex,
        }),
    ))
}

/// Resolve a new vault's Ed25519 heartbeat key material.
///
/// - **Pubkey supplied** (a real owner, and the owner console): record it and hold **no**
///   secret — the coordinator can then verify proofs-of-life but can never forge one. No
///   initial bulletin (the owner posts their first signed heartbeat themselves).
/// - **Pubkey omitted** (`scripts/demo-lifecycle.sh`): a **demo convenience** — mint a fresh
///   keypair, seed an initial signed bulletin at `anchor_time` (so guardians have a verifiable
///   proof-of-life immediately), and return the SECRET so the caller can sign later heartbeats.
///   A production vault never takes this path.
///
/// Returns `(pubkey_hex, initial_bulletin, generated_secret_hex)`.
fn resolve_heartbeat_key(
    supplied_pubkey: Option<&str>,
    vault_id: &str,
    anchor_time: u64,
) -> ApiResult<(String, Option<Heartbeat>, Option<String>)> {
    match supplied_pubkey {
        Some(pk_hex) => {
            let pk = heartbeat::HeartbeatPubkey::from_hex(pk_hex.trim())
                .map_err(|e| AppError::bad_request(format!("invalid heartbeat_pubkey: {e}")))?;
            Ok((pk.pubkey_hex, None, None))
        }
        None => {
            // DEMO CONVENIENCE ONLY — never reached for a vault whose owner supplied a pubkey.
            let mut sk = [0u8; heartbeat::SECRET_LEN];
            OsRng.fill_bytes(&mut sk);
            let pubkey_hex = hex::encode(heartbeat::public_key(&sk));
            let sig_hex = hex::encode(heartbeat::sign_heartbeat(&sk, vault_id, anchor_time));
            Ok((
                pubkey_hex,
                Some(Heartbeat {
                    time: anchor_time,
                    sig_hex,
                }),
                Some(hex::encode(sk)),
            ))
        }
    }
}

/// Resolve the display purpose label. An explicit, non-empty label always wins; otherwise
/// default to `"inheritance"` for an inheritance vault (a policy is present) or `"custom"`
/// for a plain multisig vault.
fn resolve_purpose(supplied: Option<&str>, inheritance: bool) -> String {
    match supplied.map(str::trim) {
        Some(p) if !p.is_empty() => p.to_string(),
        _ if inheritance => "inheritance".to_string(),
        _ => "custom".to_string(),
    }
}

/// The vault's human name: the owner's supplied `label` if non-empty, else the vault id — so
/// every app always has *something* to show.
fn resolve_label(supplied: Option<&str>, vault_id: &str) -> String {
    match supplied.map(str::trim) {
        Some(l) if !l.is_empty() => l.to_string(),
        _ => vault_id.to_string(),
    }
}

/// Slugify a guardian name into a relay-id token (lowercase, ascii-alnum, dashes).
fn slug(name: &str) -> String {
    let mut s: String = name
        .trim()
        .to_lowercase()
        .chars()
        .map(|c| if c.is_ascii_alphanumeric() { c } else { '-' })
        .collect();
    while s.contains("--") {
        s = s.replace("--", "-");
    }
    let s = s.trim_matches('-').to_string();
    if s.is_empty() {
        "guardian".to_string()
    } else {
        s
    }
}

/// Derive unique relay ids from guardian names (dedup by numeric suffix).
fn derive_guardian_ids(names: &[String]) -> Vec<String> {
    let mut seen: std::collections::HashSet<String> = std::collections::HashSet::new();
    let mut out = Vec::with_capacity(names.len());
    for name in names {
        let base = slug(name);
        let mut id = base.clone();
        let mut k = 2u32;
        while seen.contains(&id) {
            id = format!("{base}-{k}");
            k += 1;
        }
        seen.insert(id.clone());
        out.push(id);
    }
    out
}

async fn demo_vault(
    State(state): State<AppState>,
    Json(body): Json<DemoVaultBody>,
) -> ApiResult<(StatusCode, Json<DemoVaultResponse>)> {
    let n = body.n;
    if body.guardian_names.len() != n as usize {
        return Err(AppError::bad_request(format!(
            "guardian_names has {} entries but n = {n}",
            body.guardian_names.len()
        )));
    }
    if body.threshold == 0 || body.threshold > n {
        return Err(AppError::bad_request(format!(
            "invalid threshold {} for n = {n} (need 1 <= t <= n)",
            body.threshold
        )));
    }
    // Validate the network up front so a bad value 400s before the key split.
    let network = normalize_network(body.network.as_deref())?;

    // A heartbeat cadence (interval + grace) makes this an **inheritance** vault; its absence
    // makes it a **plain multisig** vault (the dead-man's-switch turned OFF). Both-or-neither:
    // one without the other is ambiguous, so reject it up front.
    let inheritance = match (body.interval_secs, body.grace_secs) {
        (Some(_), Some(_)) => true,
        (None, None) => false,
        _ => {
            return Err(AppError::bad_request(
                "provide both interval_secs and grace_secs for an inheritance vault, \
                 or neither for a plain multisig vault",
            ))
        }
    };

    // Trusted-dealer split of a fresh spend-authorizing key into t-of-n shares.
    let mut rng = OsRng;
    let ask = SigningKey::new(&mut rng);
    let vault = split_authority(&ask, n, body.threshold, &mut rng)
        .map_err(|e| AppError::bad_request(format!("key split failed: {e}")))?;
    let key_packages = vault
        .key_packages()
        .map_err(|e| AppError::internal(format!("rebuild guardian key packages: {e}")))?;
    let public_key_package = vault.public_key_package.clone();

    let guardian_ids = derive_guardian_ids(&body.guardian_names);

    // Mint the id up front so a coordinator-generated heartbeat can be signed over it.
    let now = state.clock.now_secs();
    let vault_id = format!("vault-{}", state.vault_seq.fetch_add(1, Ordering::SeqCst));

    // Inheritance vault → a short cadence anchored at `now` (so the switch decays in real time)
    // plus a resolved heartbeat key: supplied pubkey (owner console) → no secret; omitted (the
    // demo-lifecycle script) → generate a keypair, seed an initial bulletin at `now`, and return
    // the secret so the script can sign later heartbeats. Plain multisig vault → none of this.
    let (policy, heartbeat_pubkey_hex, latest_heartbeat, heartbeat_secret_hex, heir) = if inheritance
    {
        let policy = VaultPolicy::new(HeartbeatPolicy {
            interval_secs: body.interval_secs.expect("checked: both present"),
            grace_secs: body.grace_secs.expect("checked: both present"),
            last_heartbeat: now,
        });
        let (pk_hex, bulletin, secret) =
            resolve_heartbeat_key(body.heartbeat_pubkey.as_deref(), &vault_id, now)?;
        (Some(policy), Some(pk_hex), bulletin, secret, body.heir.clone())
    } else {
        (None, None, None, None, None)
    };
    let purpose = resolve_purpose(body.purpose.as_deref(), inheritance);
    let label = resolve_label(body.label.as_deref(), &vault_id);

    // Pair each derived relay id with its FROST share (BTreeMap order is stable), and
    // build the shares payload the response returns.
    let mut demo_signers: Vec<(ParticipantId, KeyPackage)> = Vec::with_capacity(n as usize);
    let mut shares_out: Vec<DemoShareOut> = Vec::with_capacity(n as usize);
    for (i, (id, share)) in vault.shares.iter().enumerate() {
        let pid = ParticipantId::new(guardian_ids[i].clone());
        let kp = key_packages
            .get(id)
            .cloned()
            .ok_or_else(|| AppError::internal("missing key package for share"))?;
        demo_signers.push((pid, kp));
        shares_out.push(DemoShareOut {
            guardian_id: guardian_ids[i].clone(),
            secret_share: share.clone(),
        });
    }
    let shares_json = serde_json::to_string(&shares_out)
        .map_err(|e| AppError::internal(format!("serialize shares: {e}")))?;

    let record = VaultRecord {
        threshold: body.threshold,
        guardian_ids: demo_signers.iter().map(|(p, _)| p.clone()).collect(),
        public_key_package,
        policy,
        purpose,
        label,
        heir,
        demo_signers: Some(demo_signers),
        network,
        receiving_address: None,
        ufvk: None,
        balance_zat: None,
        heartbeat_pubkey_hex,
        latest_heartbeat,
    };
    state.vaults()?.insert(vault_id.clone(), record);
    // Persist the new vault's PUBLIC config. Its `demo_signers` shares are NOT written
    // (they stay RAM-only), so after a restart this demo vault keeps its config +
    // heartbeat but must be re-seeded to auto-sign in-process again.
    state.persist();
    Ok((
        StatusCode::CREATED,
        Json(DemoVaultResponse {
            vault_id,
            guardian_ids,
            shares_json,
            heartbeat_secret_hex,
        }),
    ))
}

/// The FROST group verifying key = Orchard spend-validating key `ak`, 32-byte hex — the
/// input to `steward-signer derive-vault --ak <hex>`.
fn group_ak_hex(record: &VaultRecord) -> String {
    record
        .public_key_package
        .verifying_key()
        .serialize()
        .map(hex::encode)
        .unwrap_or_default()
}

/// Normalize the optional `network` field of a create request to the wire vocabulary
/// (`"test"` / `"main"`), defaulting to `"test"`. Rejects anything else with a 400.
fn normalize_network(n: Option<&str>) -> ApiResult<String> {
    match n {
        None | Some("test") => Ok("test".to_string()),
        Some("main") => Ok("main".to_string()),
        Some(other) => Err(AppError::bad_request(format!(
            "invalid network {other:?} (expected \"test\" or \"main\")"
        ))),
    }
}

/// Best-effort: shell out to the signer to derive the vault's UA + UFVK and cache both on
/// the record. Never fatal — a missing/failing signer just leaves the cache untouched (the
/// address is then reported as `null`). The next request retries.
async fn derive_and_cache_address(state: &AppState, vault_id: &str, ak_hex: &str, network: &str) {
    let bin = crate::signer::locate();
    if !bin.exists {
        return;
    }
    match crate::signer::derive_vault(&bin.path, ak_hex, network).await {
        Ok(out) => {
            let mut changed = false;
            if let Ok(mut vaults) = state.vaults.lock() {
                if let Some(record) = vaults.get_mut(vault_id) {
                    record.receiving_address = Some(out.ua);
                    record.ufvk = Some(out.ufvk);
                    changed = true;
                }
            }
            // Persist the newly cached address/UFVK (lock released above first).
            if changed {
                state.persist();
            }
        }
        Err(e) => eprintln!("[signer] derive-vault failed for {vault_id}: {e}"),
    }
}

async fn vault_status(
    State(state): State<AppState>,
    Path(vault_id): Path<String>,
) -> ApiResult<Json<VaultStatus>> {
    let now = state.clock.now_secs();

    // First request only: capture what we need to derive the on-chain address, then release
    // the lock before the (awaiting) subprocess — the std Mutex must not be held across it.
    let derive_inputs = {
        let vaults = state.vaults()?;
        let record = vaults
            .get(&vault_id)
            .ok_or_else(|| AppError::not_found(format!("no such vault: {vault_id}")))?;
        record
            .receiving_address
            .is_none()
            .then(|| (group_ak_hex(record), record.network.clone()))
    };
    if let Some((ak_hex, network)) = derive_inputs {
        derive_and_cache_address(&state, &vault_id, &ak_hex, &network).await;
    }

    // Build the status from the (possibly just-updated) record.
    let vaults = state.vaults()?;
    let record = vaults
        .get(&vault_id)
        .ok_or_else(|| AppError::not_found(format!("no such vault: {vault_id}")))?;
    let balance_note = match record.balance_zat {
        Some(_) => "last synced total (zatoshis) — re-run POST /vault/:id/sync to refresh".to_string(),
        None => "not synced yet — POST /vault/:id/sync to scan the public endpoint".to_string(),
    };
    // The heartbeat / dead-man's-switch fields are meaningful only for an inheritance vault
    // (a policy is present); a plain multisig vault reports them all as `null`.
    let hb = record.policy.as_ref().map(|p| &p.heartbeat);
    Ok(Json(VaultStatus {
        vault_id: vault_id.clone(),
        threshold: record.threshold,
        guardians: record.guardian_ids.iter().map(|p| p.0.clone()).collect(),
        purpose: record.purpose.clone(),
        label: record.label.clone(),
        inheritance_enabled: record.policy.is_some(),
        state: hb.map(|h| h.state_at(now)),
        last_heartbeat: hb.map(|h| h.last_heartbeat),
        trip_at: hb.map(|h| h.trip_at()),
        interval_secs: hb.map(|h| h.interval_secs),
        grace_secs: hb.map(|h| h.grace_secs),
        now,
        heir: record.heir.clone(),
        group_ak_hex: group_ak_hex(record),
        network: record.network.clone(),
        receiving_address: record.receiving_address.clone(),
        balance: BalanceStub {
            zatoshis: record.balance_zat,
            note: balance_note,
        },
    }))
}

/// `POST /vault/:id/sync` — scan the public endpoint for the vault's balance via the signer.
///
/// Uses the cached UFVK (deriving + caching it first if this is the first on-chain call),
/// then shells out to `steward-signer sync --ufvk <ufvk> --network <net> --json` (≈60s cap).
/// On success it also stores `total_zat` as the vault's balance so `GET /vault/:id` reflects
/// the last sync. A missing/failing signer is a clean **502**, never a panic.
async fn vault_sync(
    State(state): State<AppState>,
    Path(vault_id): Path<String>,
) -> ApiResult<Json<VaultSyncResponse>> {
    // Locate the signer up front so a missing binary is an actionable 502 (not a null).
    let bin = crate::signer::locate();
    if !bin.exists {
        return Err(AppError::new(StatusCode::BAD_GATEWAY, bin.not_found_message()));
    }

    // Snapshot ak / network / cached UFVK under the lock, then drop it.
    let (ak_hex, network, cached_ufvk) = {
        let vaults = state.vaults()?;
        let record = vaults
            .get(&vault_id)
            .ok_or_else(|| AppError::not_found(format!("no such vault: {vault_id}")))?;
        (
            group_ak_hex(record),
            record.network.clone(),
            record.ufvk.clone(),
        )
    };

    // Derive + cache the UFVK if we do not have it yet (needed to scan).
    let ufvk = match cached_ufvk {
        Some(u) => u,
        None => match crate::signer::derive_vault(&bin.path, &ak_hex, &network).await {
            Ok(out) => {
                if let Ok(mut vaults) = state.vaults.lock() {
                    if let Some(record) = vaults.get_mut(&vault_id) {
                        record.receiving_address = Some(out.ua);
                        record.ufvk = Some(out.ufvk.clone());
                    }
                }
                // Persist the freshly derived address/UFVK cache (lock released above).
                state.persist();
                out.ufvk
            }
            Err(e) => {
                return Err(AppError::new(
                    StatusCode::BAD_GATEWAY,
                    format!("signer derive-vault failed (needed before sync): {e}"),
                ))
            }
        },
    };

    // Scan the public endpoint. The blocking work lives inside the subprocess.
    let out = crate::signer::sync(&bin.path, &ufvk, &network)
        .await
        .map_err(|e| AppError::new(StatusCode::BAD_GATEWAY, format!("signer sync failed: {e}")))?;

    // Reflect the last-synced total on the vault so GET /vault/:id shows it.
    if let Ok(mut vaults) = state.vaults.lock() {
        if let Some(record) = vaults.get_mut(&vault_id) {
            record.balance_zat = Some(out.total_zat);
        }
    }
    // Persist the cached balance (lock released above).
    state.persist();

    Ok(Json(VaultSyncResponse {
        network: out.network,
        synced: out.synced,
        tip_height: out.tip_height,
        total_zat: out.total_zat,
        orchard_zat: out.orchard_zat,
        spendable_zat: out.spendable_zat,
    }))
}

/// `POST /vault/:id/spend` — build, co-sign (FROST, the guardians), and broadcast a real payment.
///
/// The app-driven spend of SPEC §10: construct + Halo2-prove a PCZT to `to` for `amount_zat` from
/// the **synced** vault (viewing key only — no secret), run the §5 ceremony over its **real**
/// sighash (the vault's guardians co-signing over the relay, `mode: relay`), extract, and
/// broadcast — returning the txid. The relay never holds a share: build/broadcast touch no secret,
/// and the signature comes from the guardians. Requires a prior `sync` that found a confirmed note
/// ≥ the amount + fee, else the build fails fast (**422**). A missing signer is a clean **502**.
async fn vault_spend(
    State(state): State<AppState>,
    Path(vault_id): Path<String>,
    Json(body): Json<SpendBody>,
) -> ApiResult<Json<SpendResponse>> {
    if body.to.trim().is_empty() {
        return Err(AppError::bad_request("`to` (recipient address) is required"));
    }
    if body.amount_zat == 0 {
        return Err(AppError::bad_request("`amount_zat` must be greater than zero"));
    }
    let mode = match body.mode.as_deref() {
        None | Some("") | Some("relay") => "relay",
        Some("auto") => "auto",
        Some(other) => {
            return Err(AppError::bad_request(format!(
                "unknown mode {other:?} (want \"relay\" or \"auto\")"
            )))
        }
    };

    // Locate the signer up front so a missing binary is an actionable 502 (not a null).
    let bin = crate::signer::locate();
    if !bin.exists {
        return Err(AppError::new(StatusCode::BAD_GATEWAY, bin.not_found_message()));
    }

    // Snapshot ak / network / cached UFVK / balance / guardian ids under the lock, then drop it.
    let (ak_hex, network, cached_ufvk, balance, guardian_ids) = {
        let vaults = state.vaults()?;
        let record = vaults
            .get(&vault_id)
            .ok_or_else(|| AppError::not_found(format!("no such vault: {vault_id}")))?;
        (
            group_ak_hex(record),
            record.network.clone(),
            record.ufvk.clone(),
            record.balance_zat,
            record.guardian_ids.iter().map(|p| p.0.clone()).collect::<Vec<_>>(),
        )
    };

    // Cheap pre-check: if the last-synced balance can't cover the amount, fail fast (422) rather
    // than spend ~a minute proving a doomed PCZT. `build-pczt` is the authoritative check — it
    // also accounts for the fee + confirmations — but this catches the obvious case early.
    if let Some(bal) = balance {
        if body.amount_zat > bal {
            return Err(AppError::new(
                StatusCode::UNPROCESSABLE_ENTITY,
                format!(
                    "amount {} zat exceeds the last-synced balance {} zat — sync again or lower the amount",
                    body.amount_zat, bal
                ),
            ));
        }
    }

    // Derive + cache the UFVK if we do not have it yet (needed to build the PCZT).
    let ufvk = match cached_ufvk {
        Some(u) => u,
        None => match crate::signer::derive_vault(&bin.path, &ak_hex, &network).await {
            Ok(out) => {
                if let Ok(mut vaults) = state.vaults.lock() {
                    if let Some(record) = vaults.get_mut(&vault_id) {
                        record.receiving_address = Some(out.ua);
                        record.ufvk = Some(out.ufvk.clone());
                    }
                }
                state.persist();
                out.ufvk
            }
            Err(e) => {
                return Err(AppError::new(
                    StatusCode::BAD_GATEWAY,
                    format!("signer derive-vault failed (needed before spend): {e}"),
                ))
            }
        },
    };

    let uniq = state.session_seq.fetch_add(1, Ordering::SeqCst);
    let pczt_path = std::env::temp_dir().join(format!("steward-spend-{vault_id}-{uniq}.pczt"));
    let amount_human = format!("{} ZEC", zats_to_zec(body.amount_zat));

    // Pre-announce (relay only): advertise a "preparing" placeholder so a watching guardian sees
    // the incoming payment the instant the owner hits Send — during the multi-second build, not
    // only after. Its EMPTY sighash marks it NOT-yet-signable (the guardian shows it as "incoming"
    // and never co-signs it); the real co-sign session, with the real sighash, opens when the
    // signer's callback runs. Cleared on every exit path below.
    let prep_id = format!("{vault_id}-prep-{uniq}");
    if mode == "relay" {
        if let Ok(mut pending) = state.pending() {
            pending.insert(
                prep_id.clone(),
                PendingSession {
                    vault_id: vault_id.clone(),
                    purpose: CeremonyPurpose::NormalSpend,
                    display: PendingDisplay {
                        headline: "A payment is being prepared".into(),
                        heir: None,
                        recipient: Some(body.to.clone()),
                        amount: Some(amount_human.clone()),
                        sighash: String::new(), // empty ⇒ preparing, not yet signable
                    },
                    invited: guardian_ids.clone(),
                    approvers: BTreeSet::new(),
                    randomizer_hex: String::new(),
                },
            );
        }
    }

    // 1. Build + Halo2-prove the PCZT — the real sighash bound to `to` + amount. Insufficient
    //    funds / an unsynced wallet surfaces here as the signer's error tail → 422.
    if let Err(e) =
        crate::signer::build_pczt(&bin.path, &ufvk, &body.to, body.amount_zat, &network, &pczt_path).await
    {
        if mode == "relay" {
            let _ = state.pending().map(|mut p| p.remove(&prep_id));
        }
        return Err(AppError::new(
            StatusCode::UNPROCESSABLE_ENTITY,
            format!("could not build the spend (is the vault synced + funded for this amount?): {e}"),
        ));
    }

    // 2. Co-sign over the relay (the guardians approve the real sighash) + broadcast → txid.
    let result = crate::signer::sign_and_broadcast(
        &bin.path,
        &pczt_path,
        &vault_id,
        "NormalSpend",
        &network,
        mode,
        &body.to,
        &amount_human,
        state.self_base_url.as_str(),
    )
    .await;
    let _ = std::fs::remove_file(&pczt_path); // best-effort temp cleanup
    if mode == "relay" {
        let _ = state.pending().map(|mut p| p.remove(&prep_id)); // clear the "preparing" placeholder
    }

    let out = result
        .map_err(|e| AppError::new(StatusCode::BAD_GATEWAY, format!("co-sign + broadcast failed: {e}")))?;

    // The vault's balance is now stale; clear it so GET /vault/:id prompts a re-sync.
    if let Ok(mut vaults) = state.vaults.lock() {
        if let Some(record) = vaults.get_mut(&vault_id) {
            record.balance_zat = None;
        }
    }
    state.persist();

    Ok(Json(SpendResponse { txid: out.txid }))
}

/// POST /vault/:id/release body. `mode` is `"relay"` (default, live guardians) or `"auto"`
/// (a demo vault's in-process shares).
#[derive(Debug, Default, Deserialize)]
struct ReleaseBody {
    #[serde(default)]
    mode: Option<String>,
}

/// `POST /vault/:id/release` — the **inheritance release**. Sweeps the vault's *entire* spendable
/// balance (minus the ZIP-317 fee) to the heir's recorded shielded address, co-signed by the
/// guardian quorum, and broadcasts → txid. Only permitted once the dead-man's-switch has tripped
/// (`state == Recoverable`): a still-active inheritance vault is **403**, and a plain multisig
/// vault (no policy) or one with no heir address is **400**. Same viewing-key-only build as a
/// normal spend — no spend key is ever reconstructed; the guardians each re-verify the lapse
/// before contributing their share.
async fn vault_release(
    State(state): State<AppState>,
    Path(vault_id): Path<String>,
    Json(body): Json<ReleaseBody>,
) -> ApiResult<Json<SpendResponse>> {
    let mode = match body.mode.as_deref() {
        None | Some("") | Some("relay") => "relay",
        Some("auto") => "auto",
        Some(other) => {
            return Err(AppError::bad_request(format!(
                "unknown mode {other:?} (want \"relay\" or \"auto\")"
            )))
        }
    };

    // Snapshot public data + policy + heir under the lock, then drop it before the ceremony.
    let (ak_hex, network, cached_ufvk, balance, guardian_ids, policy, heir) = {
        let vaults = state.vaults()?;
        let record = vaults
            .get(&vault_id)
            .ok_or_else(|| AppError::not_found(format!("no such vault: {vault_id}")))?;
        (
            group_ak_hex(record),
            record.network.clone(),
            record.ufvk.clone(),
            record.balance_zat,
            record.guardian_ids.iter().map(|p| p.0.clone()).collect::<Vec<_>>(),
            record.policy.clone(),
            record.heir.clone(),
        )
    };

    // A plain multisig vault has no dead-man's-switch and can never be released — 400 (distinct
    // from the 403 "still active" an inheritance vault gives).
    if policy.is_none() {
        return Err(AppError::bad_request(
            "this vault has no inheritance policy (it is a plain multisig vault); it cannot be released",
        ));
    }
    let heir = heir.ok_or_else(|| {
        AppError::bad_request("this inheritance vault has no heir address recorded; nothing to release to")
    })?;

    // Gate: release is authorized only once the switch has tripped (Recoverable). Still-active →
    // 403. The guardians independently re-verify this before co-signing; this short-circuits here.
    // (Checked before the signer binary so a premature release is 403, not "signer missing".)
    crate::authz::authorize(
        policy.as_ref(),
        CeremonyPurpose::InheritanceRelease,
        state.clock.now_secs(),
    )?;

    let bin = crate::signer::locate();
    if !bin.exists {
        return Err(AppError::new(StatusCode::BAD_GATEWAY, bin.not_found_message()));
    }

    // Derive + cache the UFVK if we do not have it yet (needed to build the sweep PCZT).
    let ufvk = match cached_ufvk {
        Some(u) => u,
        None => match crate::signer::derive_vault(&bin.path, &ak_hex, &network).await {
            Ok(out) => {
                if let Ok(mut vaults) = state.vaults.lock() {
                    if let Some(record) = vaults.get_mut(&vault_id) {
                        record.receiving_address = Some(out.ua);
                        record.ufvk = Some(out.ufvk.clone());
                    }
                }
                state.persist();
                out.ufvk
            }
            Err(e) => {
                return Err(AppError::new(
                    StatusCode::BAD_GATEWAY,
                    format!("signer derive-vault failed (needed before release): {e}"),
                ))
            }
        },
    };

    let uniq = state.session_seq.fetch_add(1, Ordering::SeqCst);
    let pczt_path = std::env::temp_dir().join(format!("steward-release-{vault_id}-{uniq}.pczt"));
    let amount_human = match balance {
        Some(b) => format!("{} ZEC", zats_to_zec(b)),
        None => "the entire vault balance".to_string(),
    };

    // Pre-announce (relay): the guardians see an inheritance release being prepared.
    let prep_id = format!("{vault_id}-prep-{uniq}");
    if mode == "relay" {
        if let Ok(mut pending) = state.pending() {
            pending.insert(
                prep_id.clone(),
                PendingSession {
                    vault_id: vault_id.clone(),
                    purpose: CeremonyPurpose::InheritanceRelease,
                    display: PendingDisplay {
                        headline: "The vault is being released to the heir".into(),
                        heir: Some(heir.clone()),
                        recipient: Some(heir.clone()),
                        amount: Some(amount_human.clone()),
                        sighash: String::new(), // empty ⇒ preparing, not yet signable
                    },
                    invited: guardian_ids.clone(),
                    approvers: BTreeSet::new(),
                    randomizer_hex: String::new(),
                },
            );
        }
    }

    // 1. Build + Halo2-prove the SWEEP PCZT — the vault's whole balance to the heir, zero change.
    if let Err(e) =
        crate::signer::build_pczt_sweep(&bin.path, &ufvk, &heir, &network, &pczt_path).await
    {
        if mode == "relay" {
            let _ = state.pending().map(|mut p| p.remove(&prep_id));
        }
        return Err(AppError::new(
            StatusCode::UNPROCESSABLE_ENTITY,
            format!("could not build the release sweep (is the vault synced + funded?): {e}"),
        ));
    }

    // 2. Co-sign (each guardian verifies the lapse + approves the real sighash) + broadcast → txid.
    let result = crate::signer::sign_and_broadcast(
        &bin.path,
        &pczt_path,
        &vault_id,
        "InheritanceRelease",
        &network,
        mode,
        &heir,
        &amount_human,
        state.self_base_url.as_str(),
    )
    .await;
    let _ = std::fs::remove_file(&pczt_path);
    if mode == "relay" {
        let _ = state.pending().map(|mut p| p.remove(&prep_id));
    }

    let out = result
        .map_err(|e| AppError::new(StatusCode::BAD_GATEWAY, format!("co-sign + broadcast failed: {e}")))?;

    // The vault is now emptied to the heir; clear the cached balance so GET /vault/:id re-syncs.
    if let Ok(mut vaults) = state.vaults.lock() {
        if let Some(record) = vaults.get_mut(&vault_id) {
            record.balance_zat = None;
        }
    }
    state.persist();

    Ok(Json(SpendResponse { txid: out.txid }))
}

/// Format a zatoshi count as a trimmed ZEC string (no unit) — e.g. `1_050_000` → `"0.0105"`.
fn zats_to_zec(zat: u64) -> String {
    let whole = zat / 100_000_000;
    let frac = zat % 100_000_000;
    if frac == 0 {
        whole.to_string()
    } else {
        format!("{whole}.{frac:08}").trim_end_matches('0').to_string()
    }
}

/// `POST /vault/:id/heartbeat` — record a **signed** proof-of-life.
///
/// The heartbeat is a `{ time, sig_hex }` pair; the coordinator verifies `sig_hex` against
/// the vault's recorded heartbeat public key (via [`steward_core::heartbeat::verify_heartbeat`])
/// over the canonical message before recording it. A forged or garbled signature is a **400**;
/// a non-monotonic timestamp (replay / rollback) is a **409**. Only a valid, strictly-newer
/// heartbeat advances the switch — there is **no** unsigned "just trust me" path.
async fn vault_heartbeat(
    State(state): State<AppState>,
    Path(vault_id): Path<String>,
    Json(body): Json<HeartbeatBody>,
) -> ApiResult<Json<HeartbeatResponse>> {
    let now = state.clock.now_secs();
    let mut vaults = state.vaults()?;
    let record = vaults
        .get_mut(&vault_id)
        .ok_or_else(|| AppError::not_found(format!("no such vault: {vault_id}")))?;

    // A plain multisig vault has no dead-man's-switch, so there is nothing to advance and no
    // recorded heartbeat key to verify against → 400. (An inheritance vault always has both.)
    let pubkey_hex = match (&record.policy, &record.heartbeat_pubkey_hex) {
        (Some(_), Some(pk)) => pk.clone(),
        _ => {
            return Err(AppError::bad_request(
                "this vault has no dead-man's-switch (it is a plain multisig vault); \
                 there are no heartbeats to record",
            ))
        }
    };

    // 1. Verify the signature against the vault's recorded heartbeat public key. Without the
    //    owner's secret, no caller — not even a malicious relay — can produce a passing
    //    signature, so liveness cannot be forged. (Note this is a convenience check: each
    //    guardian re-verifies the bulletin itself; the coordinator is not trusted for the gate.)
    if !heartbeat::verify_heartbeat_hex(&pubkey_hex, &vault_id, body.time, &body.sig_hex) {
        return Err(AppError::bad_request(
            "heartbeat signature does not verify against the vault's recorded heartbeat \
             public key over steward-heartbeat-v1 || vault_id || time",
        ));
    }

    // 2. Reject a non-monotonic timestamp (replay of an older signed heartbeat), then
    // 3. advance the switch to the OWNER-SIGNED time (not the server clock).
    let (last_heartbeat, trip_at, hb_state) = {
        let policy = record.policy.as_mut().expect("policy present (checked above)");
        if body.time <= policy.heartbeat.last_heartbeat {
            return Err(AppError::new(
                StatusCode::CONFLICT,
                format!(
                    "heartbeat time {} is not newer than the last recorded heartbeat {} \
                     (monotonic proofs-of-life only)",
                    body.time, policy.heartbeat.last_heartbeat
                ),
            ));
        }
        policy.heartbeat.last_heartbeat = body.time;
        (
            policy.heartbeat.last_heartbeat,
            policy.heartbeat.trip_at(),
            policy.heartbeat.state_at(now),
        )
    };
    // Store the signed heartbeat as the bulletin guardians fetch + independently re-verify.
    record.latest_heartbeat = Some(Heartbeat {
        time: body.time,
        sig_hex: body.sig_hex,
    });

    let response = HeartbeatResponse {
        vault_id,
        last_heartbeat,
        trip_at,
        state: hb_state,
    };
    // Release the vault lock before persisting (persist() takes it to snapshot), then
    // save the advanced deadline + new bulletin so both survive a restart.
    drop(vaults);
    state.persist();
    Ok(Json(response))
}

/// `GET /vault/:id/heartbeat` — the latest signed proof-of-life **bulletin**.
///
/// Returns `{ pubkey_hex, time, sig_hex, interval_secs, grace_secs }`. This is what a guardian
/// fetches to gate an inheritance release **independently**: it rebuilds the canonical message,
/// verifies `sig_hex` against `pubkey_hex` itself, and computes `is_lapsed(time, interval,
/// grace, now)` on its own clock — never trusting the coordinator's `state` hint. `time` and
/// `sig_hex` are `null` until the owner posts their first heartbeat.
async fn vault_heartbeat_get(
    State(state): State<AppState>,
    Path(vault_id): Path<String>,
) -> ApiResult<Json<HeartbeatBulletin>> {
    // TODO(channel-b): this bulletin is channel A (relay-hosted). Channel B would additionally
    // expose (or a guardian would independently scan) the same signed `(time, sig)` published as
    // an on-chain Orchard memo, so liveness can be confirmed with no relay at all. The verified
    // `steward_core::heartbeat` bytes are identical across both channels — only the transport
    // differs — so a guardian's verify + `is_lapsed` gate is reused unchanged.
    let vaults = state.vaults()?;
    let record = vaults
        .get(&vault_id)
        .ok_or_else(|| AppError::not_found(format!("no such vault: {vault_id}")))?;
    // A plain multisig vault has no dead-man's-switch → no proof-of-life bulletin. 400 (the
    // same answer POST /heartbeat gives), so a guardian app can tell "no switch here" from
    // "not yet beaten". A guardian only ever fetches this to gate an InheritanceRelease, which
    // cannot be proposed on a no-policy vault anyway.
    let (policy, pubkey_hex) = match (&record.policy, &record.heartbeat_pubkey_hex) {
        (Some(p), Some(pk)) => (p, pk),
        _ => {
            return Err(AppError::bad_request(
                "this vault has no dead-man's-switch (it is a plain multisig vault); \
                 there is no heartbeat bulletin",
            ))
        }
    };
    let (time, sig_hex) = match &record.latest_heartbeat {
        Some(hb) => (Some(hb.time), Some(hb.sig_hex.clone())),
        None => (None, None),
    };
    Ok(Json(HeartbeatBulletin {
        vault_id: vault_id.clone(),
        pubkey_hex: pubkey_hex.clone(),
        time,
        sig_hex,
        interval_secs: policy.heartbeat.interval_secs,
        grace_secs: policy.heartbeat.grace_secs,
    }))
}

/// `GET /vault/:id/pending` — the open **relay-mode** ceremonies for this vault a
/// guardian can approve. A guardian web app polls this to discover a request to
/// co-sign; `approvals` reflects how many invited guardians have committed so far
/// (best-effort, for the seal). Empty in `auto` mode (those complete in-process).
async fn vault_pending(
    State(state): State<AppState>,
    Path(vault_id): Path<String>,
) -> ApiResult<Json<Vec<PendingSessionOut>>> {
    // 404 for an unknown vault so a guardian app can tell "no requests" from "wrong url".
    if !state.vaults()?.contains_key(&vault_id) {
        return Err(AppError::not_found(format!("no such vault: {vault_id}")));
    }
    let pending = state.pending()?;
    let mut out: Vec<PendingSessionOut> = pending
        .iter()
        .filter(|(_, s)| s.vault_id == vault_id)
        .map(|(session_id, s)| PendingSessionOut {
            session_id: session_id.clone(),
            purpose: s.purpose,
            display: s.display.clone(),
            invited: s.invited.clone(),
            approvals: s.approvers.len(),
        })
        .collect();
    // Stable order so a polling client sees a consistent list.
    out.sort_by(|a, b| a.session_id.cmp(&b.session_id));
    Ok(Json(out))
}

/// Plain-words headline for a ceremony purpose — the copy a guardian reads on the
/// approval card ("see what you are signing"). Mirrors `web/guardian`'s vocabulary.
fn purpose_headline(purpose: CeremonyPurpose) -> String {
    match purpose {
        CeremonyPurpose::InheritanceRelease => "Release the vault to the heir".to_string(),
        CeremonyPurpose::SocialRecoverySweep => {
            "Recover the vault to a new owner address".to_string()
        }
        CeremonyPurpose::NormalSpend => "Authorize a payment from the vault".to_string(),
    }
}

async fn session(
    State(state): State<AppState>,
    Path(vault_id): Path<String>,
    Json(body): Json<CreateSessionBody>,
) -> ApiResult<Json<CreateSessionResponse>> {
    // Snapshot the vault's public data + policy under the lock, then release it so
    // the (blocking) ceremony does not hold the vault mutex while it runs.
    let (public_key_package, policy, default_guardians, demo_signers, heir) = {
        let vaults = state.vaults()?;
        let record = vaults
            .get(&vault_id)
            .ok_or_else(|| AppError::not_found(format!("no such vault: {vault_id}")))?;
        (
            record.public_key_package.clone(),
            record.policy.clone(),
            record.guardian_ids.clone(),
            record.demo_signers.clone(),
            record.heir.clone(),
        )
    };

    let now = state.clock.now_secs();

    let session_id = body.session_id.clone().unwrap_or_else(|| {
        format!(
            "{vault_id}-sess-{}",
            state.session_seq.fetch_add(1, Ordering::SeqCst)
        )
    });

    let participants: Vec<ParticipantId> = match &body.participants {
        Some(ids) => ids.iter().cloned().map(ParticipantId::new).collect(),
        None => default_guardians,
    };

    let sighash = decode_32(&body.sighash_hex, "sighash_hex")?;
    let randomizer_le = decode_32(&body.randomizer_hex, "randomizer_hex")?;
    let randomizer = steward_core::sign::randomizer_from_le_bytes(&randomizer_le)
        .map_err(|e| AppError::bad_request(format!("invalid randomizer: {e}")))?;

    let purpose = body.purpose;

    // A plain multisig vault (no policy) can never authorize an InheritanceRelease — there is
    // no dead-man's-switch to trip — so reject it with **400** (distinct from the **403**
    // "still Active" gate an inheritance vault gives). NormalSpend / SocialRecoverySweep are the
    // plain-multisig spend/move and are owner-authorized for EVERY vault (handled below).
    if policy.is_none() && purpose == CeremonyPurpose::InheritanceRelease {
        return Err(AppError::bad_request(
            "this vault has no inheritance policy (it is a plain multisig vault); \
             an inheritance release cannot be proposed on it",
        ));
    }

    // Pre-authorize here so a refused ceremony (e.g. an InheritanceRelease while the switch is
    // still Active → 403) short-circuits *before* we register a pending session or spin up any
    // signers. The ceremony re-checks this same gate; the double check is cheap and pure.
    crate::authz::authorize(policy.as_ref(), purpose, now)?;

    match body.mode {
        // -------------------------------------------------------------- auto ---
        // Default, unchanged: the demo vault's guardian shares co-sign in-process, so
        // the owner console + `scripts/demo-lifecycle.sh` complete a ceremony on their
        // own with no external guardian clients.
        SessionMode::Auto => {
            let timeout = body
                .timeout_ms
                .map(Duration::from_millis)
                .unwrap_or(DEFAULT_SESSION_TIMEOUT);

            // DEMO ONLY: seed vaults carry their guardian shares (see `VaultRecord`),
            // so the coordinator can run the guardian side in-process. Production
            // vaults have `demo_signers = None` and rely on real remote guardians —
            // for those, use `mode: "relay"`.
            if let Some(signers) = demo_signers {
                for (pid, kp) in signers {
                    let relay = state.relay.clone();
                    let session_for_guardian = session_id.clone();
                    let guardian_timeout = timeout + Duration::from_secs(5);
                    std::thread::spawn(move || {
                        let endpoint = relay.endpoint(Role::Participant(pid));
                        let mut guardian = Guardian::new(kp);
                        let _ = guardian.run(
                            &endpoint,
                            &SessionId::new(session_for_guardian),
                            guardian_timeout,
                        );
                    });
                }
            }

            // The coordinator talks to the SAME relay hub the guardians reach over
            // HTTP, but does so in-process (no self-HTTP hop). Run the synchronous
            // ceremony on a blocking thread so it never stalls an async worker while
            // the relay handlers keep serving the guardians it is waiting on.
            let relay = state.relay.clone();
            let session_for_task = session_id.clone();
            let signature = tokio::task::spawn_blocking(move || {
                let coordinator = relay.endpoint(Role::Coordinator);
                let job = SigningJob {
                    session: SessionId::new(session_for_task),
                    participants,
                    public_key_package: &public_key_package,
                    sighash,
                    randomizer,
                    purpose,
                };
                run_authorized_signing_session(&coordinator, policy.as_ref(), now, &job, timeout)
            })
            .await
            .map_err(|e| AppError::internal(format!("ceremony task panicked/cancelled: {e}")))??;

            Ok(Json(CreateSessionResponse {
                session_id,
                signature_hex: encode_signature(&signature)?,
            }))
        }

        // ------------------------------------------------------------- relay ---
        // Register the session as pending and wait for REAL remote guardians to
        // discover it via `GET /vault/:id/pending` and co-sign over the relay. This
        // is the exact machinery `http_ceremony.rs` proves — only the guardians are
        // now external (browsers) instead of in-process demo shares.
        SessionMode::Relay => {
            let timeout = body
                .timeout_ms
                .map(Duration::from_millis)
                .unwrap_or(RELAY_SESSION_TIMEOUT);

            // Structural quorum: fewer invited guardians than the threshold can never
            // reach quorum, so answer 422 immediately rather than time out at 408.
            if let Some(t) = public_key_package.min_signers() {
                if participants.len() < t as usize {
                    return Err(AppError::new(
                        StatusCode::UNPROCESSABLE_ENTITY,
                        format!(
                            "quorum not met: {} guardian(s) invited but the threshold is {t}",
                            participants.len()
                        ),
                    ));
                }
            }

            // Advertise the request so guardian apps can discover + approve it.
            let invited: Vec<String> = participants.iter().map(|p| p.0.clone()).collect();
            state.pending()?.insert(
                session_id.clone(),
                PendingSession {
                    vault_id: vault_id.clone(),
                    purpose,
                    display: PendingDisplay {
                        headline: purpose_headline(purpose),
                        heir,
                        recipient: body.recipient.clone(),
                        amount: body.amount.clone(),
                        sighash: hex::encode(sighash),
                    },
                    invited,
                    approvers: BTreeSet::new(),
                    randomizer_hex: hex::encode(randomizer_le),
                },
            );

            let relay = state.relay.clone();
            let session_for_task = session_id.clone();
            let outcome = tokio::task::spawn_blocking(move || {
                let coordinator = relay.endpoint(Role::Coordinator);
                let job = SigningJob {
                    session: SessionId::new(session_for_task),
                    participants,
                    public_key_package: &public_key_package,
                    sighash,
                    randomizer,
                    purpose,
                };
                run_authorized_signing_session(&coordinator, policy.as_ref(), now, &job, timeout)
            })
            .await
            .map_err(|e| AppError::internal(format!("ceremony task panicked/cancelled: {e}")));

            // The session has resolved (quorum, timeout, or refusal) — stop
            // advertising it whatever happened.
            let _ = state.pending().map(|mut p| p.remove(&session_id));

            let signature = match outcome? {
                Ok(sig) => sig,
                // The too-few-invited case is handled above, so a QuorumNotMet here
                // means invited guardians did not co-sign in time → 408 Request Timeout.
                Err(CoordinatorError::QuorumNotMet { needed, got }) => {
                    return Err(AppError::new(
                        StatusCode::REQUEST_TIMEOUT,
                        format!(
                            "the guardians did not reach quorum in time: {got} of {needed} \
                             co-signed before the {}s timeout",
                            timeout.as_secs()
                        ),
                    ));
                }
                Err(e) => return Err(AppError::from(e)),
            };

            Ok(Json(CreateSessionResponse {
                session_id,
                signature_hex: encode_signature(&signature)?,
            }))
        }
    }
}

/// Hex-encode an aggregated signature (already verified against `rk` inside the
/// ceremony) for the wire.
fn encode_signature(signature: &steward_core::redpallas::Signature) -> ApiResult<String> {
    Ok(hex::encode(signature.serialize().map_err(|e| {
        AppError::internal(format!("signature serialize failed: {e}"))
    })?))
}

fn decode_32(hex_str: &str, field: &str) -> ApiResult<[u8; 32]> {
    let bytes = hex::decode(hex_str.trim())
        .map_err(|e| AppError::bad_request(format!("{field} is not valid hex: {e}")))?;
    bytes
        .try_into()
        .map_err(|_| AppError::bad_request(format!("{field} must be exactly 32 bytes")))
}

// ---------------------------------------------------------------------------------
// Guardian-side client: HttpTransport (implements the Transport seam)
// ---------------------------------------------------------------------------------

/// The guardian-side [`Transport`] implementation: `send`/`recv` hit the relay
/// endpoints over HTTP. Identity is **bound at construction** (the participant id
/// sent in [`ID_HEADER`] on every request), exactly like the in-process
/// [`Endpoint`] binds a [`Role`] and `frostd` binds a Bearer token — so the
/// [`Guardian`](crate::Guardian) state machine reuses it verbatim.
///
/// Uses a blocking HTTP client so it drops straight into the synchronous
/// [`Transport`] trait. Construct and drive it from an OS thread (or a
/// `spawn_blocking` task), never directly on an async worker.
pub struct HttpTransport {
    base_url: String,
    id: String,
    client: reqwest::blocking::Client,
}

impl HttpTransport {
    /// A transport that speaks as participant `id` against the relay at `base_url`
    /// (e.g. `http://127.0.0.1:PORT`).
    pub fn new(base_url: impl Into<String>, id: ParticipantId) -> crate::Result<Self> {
        let client = reqwest::blocking::Client::builder()
            .build()
            .map_err(|e| CoordinatorError::Transport(format!("http client build failed: {e}")))?;
        Ok(Self {
            base_url: base_url.into().trim_end_matches('/').to_string(),
            id: id.0,
            client,
        })
    }

    /// Construct a coordinator-identity client (rarely needed — the coordinator's
    /// own ceremony uses the in-process endpoint; this exists for symmetry/tests).
    pub fn coordinator(base_url: impl Into<String>) -> crate::Result<Self> {
        Self::new(base_url, ParticipantId::coordinator())
    }
}

impl Transport for HttpTransport {
    fn send(&self, session: &SessionId, to: Recipient, msg: Vec<u8>) -> crate::Result<()> {
        let to = match to {
            Recipient::Coordinator => None,
            Recipient::Participant(p) => Some(p.0),
        };
        let body = SendBody {
            to,
            msg_hex: hex::encode(msg),
        };
        let url = format!("{}/session/{}/send", self.base_url, session.0);
        self.client
            .post(url)
            .header(ID_HEADER, &self.id)
            .json(&body)
            .send()
            .and_then(|r| r.error_for_status())
            .map_err(|e| CoordinatorError::Transport(format!("relay send failed: {e}")))?;
        Ok(())
    }

    fn recv(&self, session: &SessionId) -> crate::Result<Vec<(ParticipantId, Vec<u8>)>> {
        let url = format!("{}/session/{}/recv", self.base_url, session.0);
        let resp: RecvResponse = self
            .client
            .post(url)
            .header(ID_HEADER, &self.id)
            .send()
            .and_then(|r| r.error_for_status())
            .and_then(|r| r.json())
            .map_err(|e| CoordinatorError::Transport(format!("relay recv failed: {e}")))?;
        resp.messages
            .into_iter()
            .map(|item| {
                let bytes = hex::decode(item.msg_hex).map_err(|e| {
                    CoordinatorError::Transport(format!("relay returned invalid hex: {e}"))
                })?;
                Ok((ParticipantId::new(item.from), bytes))
            })
            .collect()
    }
}
