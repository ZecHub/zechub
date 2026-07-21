# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `error::SyncRecoveryObservables` enum with variants `MaybeRecoverableServer`,
  `ServerUnavailable`, and `Abort` — classifies sync errors for consumer retry logic.
- `error::SyncError::is_retryable()` — returns `true` for transient errors
  (server timeouts, connection drops, mempool failures).
- `error::SyncError::recovery_recommendation()` — maps any sync error to a
  `SyncRecoveryObservables` without callers needing to match on error internals.
- `error::ServerError::is_retryable()` — distinguishes transport failures from
  invalid server data.
- `error::ServerError::recovery_recommendation()` — server-level recovery classification.

### Changed

### Removed

## [0.3.0]

### Changed

- `sync::sync` fn: `client` parameter now takes a `CompactTxStreamerClient<tonic::Channel>`

## [0.2.0] - 2026-02-26

### Added
- `wallet::WalletTransaction::update_status`
- `wallet::WalletTransaction::new_for_test`
- `sync::set_transactions_failed` - also re-exported in lib.rs

### Changed
- `error::SyncError`:
  - added `BirthdayBelowSapling` variant which is returned when `sync` is called with wallet birthday below sapling activation height.
  - `ChainError` variant now includes the wallet height and chain height.
- `error::ScanError`:
  - `InvalidMemoBytes` variant now uses `zcash_protocol::memo::Error` instead of deprecated `zcash_primitives::memo::Error` type.
- `keys::KeyID` now uses `zip32::AccountId` directly instead of `zcash_primitives` re-export.
- `keys::ScanningKeyOps` trait now uses `zip32::AccountId` directly instead of `zcash_primitives` re-export.
- `keys::TransparentAddressId` now uses `zip32::AccountId` directly instead of `zcash_primitives` re-export.
- `sync::ScanPriority`:
  - added `RefetchingNullifiers` variant.
- `wallet::SyncState`:
  - incremented to serialized version 3 to account for changes to `ScanPriority`
  - `wallet_height` method renamed to `last_known_chain_height`.
- `wallet::NoteInterface` trait: added `refetch_nullifier_ranges` method.
- `wallet::SaplingNote`:
  - implemented `refetch_nullifier_ranges` method.
  - updated serialization to account for new `WalletNote` field.
- `wallet::OrchardNote`:
  - implemented `refetch_nullifier_ranges` method.
  - updated serialization to account for new `WalletNote` field.
- `wallet::WalletNote`:
  - incremented to serialized version 1 to account for changes to `WalletNote` struct.

### Removed

## [0.1.0] - 2026-01-09
