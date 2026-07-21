#![warn(missing_docs)]
#![allow(clippy::result_large_err)]
#![doc = r#"
# Pepper Sync

## Overview
Pepper-sync is a rust-based sync engine library for wallets operating on the zcash network and provides the following features:
- Non-linear scanning, allowing chain tip and targetted scanning.
- Spend-before-sync, combines the shard roots with high priority chain tip scanning to enable spending of notes as they are scanned.
- Speed, trial decryption and tree building are computed in parallel and a multi-task architecture maximizes throughput for fetching and scanning.
- Scan by shards, uses subtree metadata to create scan ranges that contain all note commitments to each shard to enable faster spending of decrypted outputs.
- Fixed memory batching, each scan worker receives a batch with a fixed number of outputs for stable memory usage.
- Pause/resume and stop, the sync engine can be paused to allow the wallet to perform time critical tasks that would require the acquisition of the wallet lock multiple times in quick succession. It can also be stopped before the wallet is fully synchronized.

## Terminology
- Chain height - highest block height of best chain from the server.
- Chain tip - the range of blocks at the top of the blockchain; Starting from the lowest block which contains the last note commitment to the latest shard of each shielded protocol; Ending at the chain height.
- Wallet height - highest block height of blockchain known to the wallet.
- Fully scanned height - block height in which the wallet has completed scanning all blocks equal to and below this height.
- Shard range - the range of blocks that contain all note commitments to a fully completed shard for a given shielded protocol.
- Nullifier map - a map of all the nullifiers collected from each transaction's shielded inputs/spends during scanning.
- Outpoint map - a map of all the outpoints collected from each transaction's transparent inputs/spends during scanning.
- Coin - transparent output.

## Initialization
1. Launch the mempool monitor for scanning transactions in the mempool.
2. Run transparent address discovery, creating scan targets for any previously unscanned transactions containing inputs or outputs related to transparent addresses generated from the wallet's keys or stored in the wallet, up to the configured gap limit.
3. Fetch subtree metadata from the server for shard range scanning and add the initial frontiers to the wallet's shard trees.
4. Create a new scan range from [wallet height + 1] to chain height. For first time sync, wallet height is [wallet birthday - 1].
5. Update wallet height to chain height.
6. Uses scan targets from transparent address discovery and targetted scanning to set "found note" priority ranges.
7. Finds the upper range bound of the latest orchard and sapling shard ranges and splits the scan range at the lowest height of the two, setting the upper scan range to priority "chain tip". This ensures that both the sapling and orchard note commitments are scanned in the latest incomplete shard at the chain tip.
8. Set the first 10 blocks after the highest previously scanned blocks to "verify" priority to check for re-org.

## Scanning
1. If the "batcher" task is idle, set the highest priority scan range to "Scanning" priority and send it to the "batcher" task. If the scan priority is "Historic", first split an orchard shard range off the lower end. If the lowest unscanned range is of "ScannedWithoutMapping" priority, prioritize this range and set it to "RefetchingNullifiers" priority. If all scan ranges in the wallet's sync state are "scanned", shutdown the sync process.
2. Batch the scan range:
  2a. Stream compact blocks from server until a fixed threshold of outputs is reached. If the entire scan range is batched, the "batcher" task goes idle.
  2b. Store the batch and wait until it is taken by an idle "scan worker" before returning to step 2a
3. Scan each batch:
  3a. Check block hash and height continuity
  3b. Collect all inputs in each compact block to populate the nullifier maps and outpoint maps for spend detection
  3c. Trial decrypt all notes in each compact block
  3d. Fetch and scan full transactions containing any successfully decrypted notes, creating wallet transactions
  3e. Derive the nullifier and position of each successfully decrypted note
  3f. Calculate the note commitment leaf and shard tree retention for each successfully decrypted note
  3g. Create wallet blocks from compact blocks
  3h. Send scan results back to main sync task for processing
4. Process scan results:
  4a. Set surrounding shard ranges of all incoming notes to "found note" to prioritize their spendability
  4b. Discover unified addresses not known to the wallet but in use on chain
  4c. Add wallet transactions (containing wallet notes and coins) to the wallet
  4d. Add nullifiers to the wallet's nullifier map
  4e. Add outpoints, to the wallet's outpoint map
  4f. Update the wallet's shard trees
  4g. Check output id of all coins in wallet against the outpoint map. If a spend is found, update the coin's spend status and set the surrounding narrow range of blocks to "found note" priority
  4h. Check derived nullifiers of all notes in wallet against the nullifier map. If a spend is found, update the note's spend status and set the surrounding shard range of its corresponding shielded protocol to "found note" priority
  4i. Add wallet blocks to the wallet. Only retaining blocks at scan ranges bounds, blocks containing relevant transactions to the wallet or blocks within the max verification window of the highest scanned block in the wallet
  4j. Set the scan range containing the batch of scanned blocks to "scanned" priority
  4k. Merge all adjacent scanned ranges together
  4l. Clean wallet of data that is no longer relevant
5. Scan mempool transactions.
6. Repeat all steps.

## Verification
After the sync process is initialized, it will be in a state of verification, only scanning ranges of "verify" priority to check for re-orgs. If a continuity check fails, it will set the 10 blocks below the current "verify" scan range to "verify" and truncate the wallet data. This will repeat until the continuity checks passes - proceeding to scan all other scan ranges - or the maximum verification window is exceeded, returning an error.

## Configuration
### Transparent Address Discovery
- Gap limit - number of unused addresses for each account
- Scopes - whether external, internal and/or refund (a.k.a ephemeral) addresses will be discovered and relevant transactions scanned.

### Performance Level
- Low
-- Number of outputs per batch is quartered
-- Nullifier map only contains chain tip
- Medium
-- Nullifier map only contains chain tip
- High
-- Nullifier map has a large maximum size
- Maximum
-- Number of outputs per batch is quadrupled
-- Nullifier map has no maximum size

"#]
#![doc = r"
## Sync Diagram
"]
#![doc = simple_mermaid::mermaid!("../diagrams/sync.mmd")]
#![doc = r"
## Initialization Diagram
"]
#![doc = simple_mermaid::mermaid!("../diagrams/initialization.mmd")]
#![doc = r"
## Verification Diagram
"]
#![doc = simple_mermaid::mermaid!("../diagrams/verification.mmd")]
#![doc = r"
## Scan Worker Diagram
"]
#![doc = simple_mermaid::mermaid!("../diagrams/scan_worker.mmd")]
#![doc = r"
## Process Scan Results Diagram
"]
#![doc = simple_mermaid::mermaid!("../diagrams/process_scan_results.mmd")]

pub(crate) mod client;
pub mod config;
pub mod error;
pub mod keys;
pub(crate) mod scan;
pub mod sync;
pub(crate) mod utils;
pub mod wallet;
pub(crate) mod witness;

pub use sync::add_scan_targets;
pub use sync::reset_spends;
pub use sync::scan_pending_transaction;
pub use sync::set_transactions_failed;
pub use sync::sync;
pub use sync::sync_status;

#[cfg(test)]
mod mocks;

use zcash_protocol::ShieldedProtocol;

pub(crate) trait SyncDomain {
    const SHIELDED_PROTOCOL: ShieldedProtocol;
}

pub(crate) struct Sapling;

impl SyncDomain for Sapling {
    const SHIELDED_PROTOCOL: ShieldedProtocol = ShieldedProtocol::Sapling;
}

pub(crate) struct Orchard;

impl SyncDomain for Orchard {
    const SHIELDED_PROTOCOL: ShieldedProtocol = ShieldedProtocol::Orchard;
}
