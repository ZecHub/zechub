//! No-node wallet sync against a public lightwalletd/Zaino endpoint.
//!
//! This is the milestone that proves the public-endpoint approach: from just the vault
//! **UFVK** (derived from the FROST group key `ak`) we
//! 1. create a local [`zcash_client_sqlite::WalletDb`] (a gitignored file under `--data-dir`),
//! 2. register the UFVK as a **spending-tracked** account with a recent birthday (so the scan
//!    only touches recent blocks — fast),
//! 3. drive [`zcash_client_backend::sync::run`] to scan from the endpoint to the chain tip, and
//! 4. read back the discovered Orchard balance.
//!
//! Blocks are cached in memory ([`MemBlockCache`]) — zcb's sync loop downloads a batch, scans it,
//! then deletes it, so with a near-tip birthday the working set stays tiny (nothing hits disk
//! except the WalletDb itself).
//!
//! ## APIs used (zcash_client_backend 0.21 / zcash_client_sqlite 0.19.1, verified against source)
//! * `WalletDb::for_path(path, Network, SystemClock, OsRng)` + `wallet::init::init_wallet_db(&mut db, None)`
//! * `WalletWrite::import_account_ufvk(name, &ufvk, &AccountBirthday, AccountPurpose::Spending{..}, src)`
//! * `AccountBirthday::from_treestate(GetTreeState(birthday-1), None)`
//! * `zcash_client_backend::sync::run(&mut client, &params, &cache, &mut db, batch_size)`
//! * `WalletRead::get_wallet_summary(ConfirmationsPolicy)` → per-account [`AccountBalance`]

use std::collections::BTreeMap;
use std::num::NonZeroU32;
use std::ops::Range;
use std::path::{Path, PathBuf};
use std::sync::{Arc, Mutex};

use anyhow::{anyhow, Context, Result};
use async_trait::async_trait;
use rand::rngs::OsRng;

use zcash_client_backend::{
    data_api::{
        chain::{error::Error as ChainError, BlockCache, BlockSource},
        scanning::ScanRange,
        wallet::ConfirmationsPolicy,
        Account, AccountBirthday, AccountPurpose, BirthdayError, WalletRead, WalletWrite,
    },
    proto::compact_formats::CompactBlock,
};
use zcash_client_sqlite::{util::SystemClock, wallet::init::init_wallet_db, AccountUuid, WalletDb};
use zcash_keys::keys::UnifiedFullViewingKey;
use zcash_protocol::consensus::{BlockHeight, Network};

use crate::grpc;

/// Concrete wallet DB type this crate uses (public testnet endpoint, system clock, OS rng).
pub type VaultWalletDb = WalletDb<rusqlite::Connection, Network, SystemClock, OsRng>;

/// The result of a sync: where the scan got to, plus the vault's discovered balance.
#[derive(Clone, Debug)]
pub struct SyncOutcome {
    pub account_id: AccountUuid,
    pub birthday: BlockHeight,
    pub chain_tip: BlockHeight,
    pub fully_scanned: BlockHeight,
    pub is_synced: bool,
    /// Total value (all pools, incl. pending) in zatoshis.
    pub total_zat: u64,
    /// Orchard-pool total in zatoshis.
    pub orchard_zat: u64,
    /// Immediately spendable value in zatoshis.
    pub spendable_zat: u64,
}

/// A stable per-vault subdirectory of `base`, namespaced by network AND viewing key, so each
/// (network, vault) gets its OWN WalletDb. A `zcash_client_sqlite` DB is bound to a single
/// network + account set: a shared file caused `init_wallet_db` to fail with "Network type
/// mismatch" (a testnet DB re-inited for mainnet) and, for two same-network vaults, made `sync`
/// reuse the wrong account. FNV-1a of the encoded UFVK gives a short, deterministic dir tag.
/// `sync` and `build-pczt` both route through here, so they always agree on the path.
pub fn vault_data_dir(base: &Path, params: Network, ufvk: &UnifiedFullViewingKey) -> PathBuf {
    let net = match params {
        Network::MainNetwork => "main",
        _ => "test",
    };
    let encoded = ufvk.encode(&params);
    let mut h: u64 = 0xcbf2_9ce4_8422_2325;
    for b in encoded.as_bytes() {
        h ^= *b as u64;
        h = h.wrapping_mul(0x0000_0100_0000_01b3);
    }
    base.join(net).join(format!("{h:016x}"))
}

/// Open (creating + migrating if needed) the vault WalletDb at `data_dir/wallet.sqlite`.
/// Callers pass a per-vault `data_dir` (see [`vault_data_dir`]) so networks/vaults never share.
pub fn open_wallet_db(data_dir: &Path, params: Network) -> Result<VaultWalletDb> {
    std::fs::create_dir_all(data_dir)
        .with_context(|| format!("creating data dir {}", data_dir.display()))?;
    let db_path = data_dir.join("wallet.sqlite");
    let mut db = WalletDb::for_path(&db_path, params, SystemClock, OsRng)
        .with_context(|| format!("opening WalletDb at {}", db_path.display()))?;
    init_wallet_db(&mut db, None).map_err(|e| anyhow!("init_wallet_db failed: {e:?}"))?;
    Ok(db)
}

/// Full no-node sync of the vault UFVK against `server`, returning the discovered balance.
///
/// * `birthday` — first block to scan. Pass a recent height (≈ tip) so the scan is fast; funds
///   must arrive at or after it. If `None`, defaults to `tip - default_lookback`.
pub async fn sync_vault(
    server: &str,
    params: Network,
    data_dir: &Path,
    ufvk: &UnifiedFullViewingKey,
    birthday: Option<BlockHeight>,
    default_lookback: u32,
    batch_size: u32,
) -> Result<SyncOutcome> {
    let mut db = open_wallet_db(&vault_data_dir(data_dir, params, ufvk), params)?;
    let mut client = grpc::connect(server).await?;

    // Pick a recent birthday if the caller didn't pin one.
    let tip = grpc::tip_height(&mut client).await?;
    let birthday_height = birthday.unwrap_or_else(|| {
        BlockHeight::from_u32(u32::from(tip).saturating_sub(default_lookback).max(1))
    });
    eprintln!(
        "[sync] endpoint tip = {tip}; using birthday = {birthday_height} (scanning {} blocks)",
        u32::from(tip).saturating_sub(u32::from(birthday_height))
    );

    // Register the vault UFVK as a spending-tracked account, unless it's already present.
    let account_id = match db.get_account_ids().map_err(|e| anyhow!("{e}"))?.first() {
        Some(existing) => {
            eprintln!("[sync] reusing existing account {existing:?} in WalletDb");
            *existing
        }
        None => {
            // Birthday's treestate is the state of the block PRIOR to the birthday height.
            let prior = BlockHeight::from_u32(u32::from(birthday_height).saturating_sub(1));
            let treestate = grpc::tree_state_at(&mut client, prior).await?;
            let acct_birthday = AccountBirthday::from_treestate(treestate, None).map_err(|e| {
                // BirthdayError impls neither Debug nor Display; unwrap its inner cause.
                match e {
                    BirthdayError::HeightInvalid(x) => anyhow!("birthday height invalid: {x}"),
                    BirthdayError::Decode(x) => anyhow!("birthday treestate decode failed: {x}"),
                }
            })?;
            let account = db
                .import_account_ufvk(
                    "steward-vault",
                    ufvk,
                    &acct_birthday,
                    AccountPurpose::Spending { derivation: None },
                    Some("steward"),
                )
                .map_err(|e| anyhow!("import_account_ufvk failed: {e}"))?;
            let id = account.id();
            eprintln!("[sync] imported vault account {id:?} (birthday {birthday_height})");
            id
        }
    };

    // Scan to the tip. zcb's sync loop drives GetSubtreeRoots + GetBlockRange + scan_cached_blocks.
    let cache = MemBlockCache::default();
    zcash_client_backend::sync::run(&mut client, &params, &cache, &mut db, batch_size)
        .await
        .map_err(|e| anyhow!("sync::run failed: {e}"))?;

    // Read the balance. A 1-confirmation policy so a freshly-mined faucet note is spendable.
    let policy = ConfirmationsPolicy::new_symmetrical(NonZeroU32::new(1).unwrap(), true);
    let summary = db
        .get_wallet_summary(policy)
        .map_err(|e| anyhow!("get_wallet_summary failed: {e}"))?;

    let (chain_tip, fully_scanned, is_synced, total, orchard, spendable) = match &summary {
        Some(s) => {
            let bal = s.account_balances().get(&account_id);
            (
                s.chain_tip_height(),
                s.fully_scanned_height(),
                s.is_synced(),
                bal.map(|b| u64::from(b.total())).unwrap_or(0),
                bal.map(|b| u64::from(b.orchard_balance().total())).unwrap_or(0),
                bal.map(|b| u64::from(b.spendable_value())).unwrap_or(0),
            )
        }
        None => (tip, birthday_height, false, 0, 0, 0),
    };

    Ok(SyncOutcome {
        account_id,
        birthday: birthday_height,
        chain_tip,
        fully_scanned,
        is_synced,
        total_zat: total,
        orchard_zat: orchard,
        spendable_zat: spendable,
    })
}

// ─────────────────────────────────────────────────────────────────────────────────────────
// In-memory BlockCache: implements zcb's `BlockSource` + async `BlockCache` over a BTreeMap.
// The sync loop inserts a batch, scans it, then deletes it, so this never grows unbounded.
// ─────────────────────────────────────────────────────────────────────────────────────────

/// A minimal in-memory compact-block cache keyed by height.
#[derive(Default, Clone)]
pub struct MemBlockCache {
    blocks: Arc<Mutex<BTreeMap<u64, CompactBlock>>>,
}

/// Error type for [`MemBlockCache`] (satisfies `std::error::Error + Send + Sync + 'static`).
#[derive(Debug, thiserror::Error)]
#[error("in-memory block cache error: {0}")]
pub struct MemCacheError(String);

impl BlockSource for MemBlockCache {
    type Error = MemCacheError;

    fn with_blocks<F, WalletErrT>(
        &self,
        from_height: Option<BlockHeight>,
        limit: Option<usize>,
        mut with_block: F,
    ) -> Result<(), ChainError<WalletErrT, Self::Error>>
    where
        F: FnMut(CompactBlock) -> Result<(), ChainError<WalletErrT, Self::Error>>,
    {
        let blocks = self.blocks.lock().expect("cache mutex poisoned");
        let start = from_height.map(u64::from).unwrap_or(0);
        // Feed contiguous blocks starting at `from_height` (short reads allowed; stop at a gap).
        let mut expected = from_height.map(u64::from);
        let mut count = 0usize;
        for (&h, blk) in blocks.range(start..) {
            if limit.is_some_and(|lim| count >= lim) {
                break;
            }
            if let Some(e) = expected {
                if h != e {
                    break;
                }
            }
            with_block(blk.clone())?;
            count += 1;
            expected = Some(h + 1);
        }
        Ok(())
    }
}

#[async_trait]
impl BlockCache for MemBlockCache {
    fn get_tip_height(
        &self,
        range: Option<&ScanRange>,
    ) -> Result<Option<BlockHeight>, Self::Error> {
        let blocks = self.blocks.lock().expect("cache mutex poisoned");
        let max = match range {
            Some(r) => {
                let lo = u64::from(r.block_range().start);
                let hi = u64::from(r.block_range().end);
                blocks.range(lo..hi).next_back().map(|(&h, _)| h)
            }
            None => blocks.keys().next_back().copied(),
        };
        Ok(max.map(|h| BlockHeight::from_u32(h as u32)))
    }

    async fn read(&self, range: &ScanRange) -> Result<Vec<CompactBlock>, Self::Error> {
        let blocks = self.blocks.lock().expect("cache mutex poisoned");
        let lo = u64::from(range.block_range().start);
        let hi = u64::from(range.block_range().end);
        Ok(blocks.range(lo..hi).map(|(_, b)| b.clone()).collect())
    }

    async fn insert(&self, compact_blocks: Vec<CompactBlock>) -> Result<(), Self::Error> {
        let mut blocks = self.blocks.lock().expect("cache mutex poisoned");
        for b in compact_blocks {
            blocks.insert(b.height, b);
        }
        Ok(())
    }

    async fn delete(&self, range: ScanRange) -> Result<(), Self::Error> {
        let Range { start, end } = *range.block_range();
        let (lo, hi) = (u64::from(start), u64::from(end));
        let mut blocks = self.blocks.lock().expect("cache mutex poisoned");
        let keys: Vec<u64> = blocks.range(lo..hi).map(|(&k, _)| k).collect();
        for k in keys {
            blocks.remove(&k);
        }
        Ok(())
    }
}
