//! Module for reading and updating the fields of [`crate::wallet::SyncState`] which tracks the wallet's state of sync.

use std::{
    cmp,
    collections::{BTreeSet, HashMap},
    ops::Range,
};

use tokio::sync::mpsc;

use zcash_primitives::transaction::TxId;
use zcash_protocol::{
    ShieldedProtocol,
    consensus::{self, BlockHeight, NetworkUpgrade},
};

use crate::{
    client::{self, FetchRequest},
    error::{ServerError, SyncError},
    keys::transparent::TransparentAddressId,
    scan::task::ScanTask,
    sync::ScanRange,
    wallet::{
        InitialSyncState, ScanTarget, SyncState, TreeBounds, WalletTransaction,
        traits::{SyncBlocks, SyncNullifiers, SyncWallet},
    },
};

use super::{ScanPriority, VERIFY_BLOCK_RANGE_SIZE};

const NARROW_SCAN_AREA: u32 = 10_000;

#[cfg(not(feature = "darkside_test"))]
use zingo_netutils::lightwallet_protocol::SubtreeRoot;

/// Used to determine which end of the scan range is verified.
pub(super) enum VerifyEnd {
    VerifyHighest,
    VerifyLowest,
}

/// Returns the `scan_targets` for a given `block_range` from the wallet's [`crate::wallet::SyncState`]
fn find_scan_targets(
    sync_state: &SyncState,
    block_range: &Range<BlockHeight>,
) -> BTreeSet<ScanTarget> {
    sync_state
        .scan_targets
        .range(
            ScanTarget {
                block_height: block_range.start,
                txid: TxId::from_bytes([0; 32]),
                narrow_scan_area: false,
            }..ScanTarget {
                block_height: block_range.end,
                txid: TxId::from_bytes([0; 32]),
                narrow_scan_area: false,
            },
        )
        .copied()
        .collect()
}

/// Update scan ranges for scanning.
/// Returns the block height that reorg detection will start from.
pub(super) fn update_scan_ranges(
    consensus_parameters: &impl consensus::Parameters,
    last_known_chain_height: BlockHeight,
    chain_height: BlockHeight,
    sync_state: &mut SyncState,
) -> BlockHeight {
    reset_scan_ranges(sync_state);
    create_scan_range(last_known_chain_height, chain_height, sync_state);
    let scan_targets = sync_state.scan_targets.clone();
    set_found_note_scan_ranges(
        consensus_parameters,
        sync_state,
        ShieldedProtocol::Orchard,
        scan_targets.into_iter(),
    );
    set_chain_tip_scan_range(consensus_parameters, sync_state, chain_height);
    merge_scan_ranges(sync_state, ScanPriority::ChainTip);

    let reorg_detection_start_height = sync_state
        .highest_scanned_height()
        .expect("scan ranges must be non-empty")
        + 1;
    if reorg_detection_start_height <= chain_height {
        set_verify_scan_range(
            sync_state,
            reorg_detection_start_height,
            VerifyEnd::VerifyLowest,
        );
    }

    reorg_detection_start_height
}

/// Merges all adjacent ranges of a given `scan_priority`.
pub(super) fn merge_scan_ranges(sync_state: &mut SyncState, scan_priority: ScanPriority) {
    'main: loop {
        let filtered_ranges = sync_state
            .scan_ranges()
            .iter()
            .cloned()
            .enumerate()
            .filter(|(_, scan_range)| scan_range.priority() == scan_priority)
            .collect::<Vec<_>>();
        if filtered_ranges.is_empty() {
            break;
        }
        let mut peekable_ranges = filtered_ranges.iter().peekable();
        while let Some((index, range)) = peekable_ranges.next() {
            if let Some((next_index, next_range)) = peekable_ranges.peek() {
                if range.block_range().end == next_range.block_range().start {
                    assert!(*next_index == *index + 1);
                    sync_state.scan_ranges.splice(
                        *index..=*next_index,
                        vec![ScanRange::from_parts(
                            Range {
                                start: range.block_range().start,
                                end: next_range.block_range().end,
                            },
                            scan_priority,
                        )],
                    );
                    continue 'main;
                }
            } else {
                break 'main;
            }
        }
    }
}

/// Create scan range between the wallet height and the chain height from the server.
fn create_scan_range(
    last_known_chain_height: BlockHeight,
    chain_height: BlockHeight,
    sync_state: &mut SyncState,
) {
    if last_known_chain_height == chain_height {
        return;
    }

    let new_scan_range = ScanRange::from_parts(
        Range {
            start: last_known_chain_height + 1,
            end: chain_height + 1,
        },
        ScanPriority::Historic,
    );
    sync_state.scan_ranges.push(new_scan_range);
}

/// Splits the range containing [`truncate_height` + 1] and removes all ranges containing block heights above
/// `truncate_height`.
/// If `truncate_height` is zero, the sync state will be cleared completely.
pub(super) fn truncate_scan_ranges(truncate_height: BlockHeight, sync_state: &mut SyncState) {
    if truncate_height == zcash_protocol::consensus::H0 {
        *sync_state = SyncState::new();
    }
    let Some((index, range_to_split)) = sync_state
        .scan_ranges()
        .iter()
        .cloned()
        .enumerate()
        .find(|(_index, range)| range.block_range().contains(&(truncate_height + 1)))
    else {
        return;
    };

    if let Some((first_segment, second_segment)) = range_to_split.split_at(truncate_height + 1) {
        let split_ranges = vec![first_segment, second_segment];
        sync_state.scan_ranges.splice(index..=index, split_ranges);
    }

    let truncated_scan_ranges = sync_state.scan_ranges[..sync_state
        .scan_ranges()
        .partition_point(|range| range.block_range().start <= truncate_height)]
        .to_vec();
    sync_state.scan_ranges = truncated_scan_ranges;
}

/// Resets scan ranges to recover from previous sync interruptions.
///
/// A range that was previously scanning when sync was last interrupted is set to `FoundNote` to be prioritised for
/// scanning.
/// A range that was previously refetching nullifiers when sync was last interrupted is set to `ScannedWithoutMapping`
/// so the nullifiers can be fetched again.
fn reset_scan_ranges(sync_state: &mut SyncState) {
    let previously_scanning_scan_ranges = sync_state
        .scan_ranges
        .iter()
        .filter(|&range| range.priority() == ScanPriority::Scanning)
        .cloned()
        .collect::<Vec<_>>();
    for scan_range in previously_scanning_scan_ranges {
        set_scan_priority(
            sync_state,
            scan_range.block_range(),
            ScanPriority::FoundNote,
        );
    }

    let previously_refetching_nullifiers_scan_ranges = sync_state
        .scan_ranges
        .iter()
        .filter(|&range| range.priority() == ScanPriority::RefetchingNullifiers)
        .cloned()
        .collect::<Vec<_>>();
    for scan_range in previously_refetching_nullifiers_scan_ranges {
        set_scan_priority(
            sync_state,
            scan_range.block_range(),
            ScanPriority::ScannedWithoutMapping,
        );
    }
}

/// Splits out the highest or lowest `VERIFY_BLOCK_RANGE_SIZE` blocks from the scan range containing the given `block height`
/// and sets it's priority to `Verify`.
/// Returns a clone of the scan range to be verified.
pub(super) fn set_verify_scan_range(
    sync_state: &mut SyncState,
    block_height: BlockHeight,
    verify_end: VerifyEnd,
) -> ScanRange {
    let (index, scan_range) = sync_state
        .scan_ranges()
        .iter()
        .enumerate()
        .find(|(_, range)| range.block_range().contains(&block_height))
        .expect("scan range containing given block height should always exist!");

    let block_range_to_verify = match verify_end {
        VerifyEnd::VerifyHighest => Range {
            start: scan_range.block_range().end - VERIFY_BLOCK_RANGE_SIZE,
            end: scan_range.block_range().end,
        },
        VerifyEnd::VerifyLowest => Range {
            start: scan_range.block_range().start,
            end: scan_range.block_range().start + VERIFY_BLOCK_RANGE_SIZE,
        },
    };

    let split_ranges = split_out_scan_range(
        scan_range.clone(),
        block_range_to_verify,
        ScanPriority::Verify,
    );

    let scan_range_to_verify = match verify_end {
        VerifyEnd::VerifyHighest => split_ranges
            .last()
            .expect("vec should always be non-empty")
            .clone(),
        VerifyEnd::VerifyLowest => split_ranges
            .first()
            .expect("vec should always be non-empty")
            .clone(),
    };

    sync_state.scan_ranges.splice(index..=index, split_ranges);

    scan_range_to_verify
}

/// Punches in the chain tip block range with `ScanPriority::ChainTip`.
///
/// Determines the chain tip block range by finding the lowest start height of the latest incomplete shard for each
/// shielded protocol.
fn set_chain_tip_scan_range(
    consensus_parameters: &impl consensus::Parameters,
    sync_state: &mut SyncState,
    chain_height: BlockHeight,
) {
    let sapling_incomplete_shard = determine_block_range(
        consensus_parameters,
        sync_state,
        chain_height,
        Some(ShieldedProtocol::Sapling),
    );
    let orchard_incomplete_shard = determine_block_range(
        consensus_parameters,
        sync_state,
        chain_height,
        Some(ShieldedProtocol::Orchard),
    );

    let chain_tip = if sapling_incomplete_shard.start < orchard_incomplete_shard.start {
        sapling_incomplete_shard
    } else {
        orchard_incomplete_shard
    };

    punch_scan_priority(sync_state, chain_tip, ScanPriority::ChainTip);
}

/// Punches in the `shielded_protocol` shard block ranges surrounding each scan target with `ScanPriority::FoundNote`.
///
/// If all `scan_targets` have the `narrow_scan_area` set to `true`, `shielded_protocol` is irrelevant.
pub(super) fn set_found_note_scan_ranges<T: Iterator<Item = ScanTarget>>(
    consensus_parameters: &impl consensus::Parameters,
    sync_state: &mut SyncState,
    shielded_protocol: ShieldedProtocol,
    scan_targets: T,
) {
    for scan_target in scan_targets {
        set_found_note_scan_range(
            consensus_parameters,
            sync_state,
            if scan_target.narrow_scan_area {
                None
            } else {
                Some(shielded_protocol)
            },
            scan_target.block_height,
        );
    }
}

/// Punches in the `shielded_protocol` shard block range surrounding the `block_height` with `ScanPriority::FoundNote`.
///
/// If `shielded_protocol` is `None`, punch in the surrounding [`self::NARROW_SCAN_AREA`] blocks starting from the
/// closest lower multiple of [`self::NARROW_SCAN_AREA`] to `block_height`.
pub(super) fn set_found_note_scan_range(
    consensus_parameters: &impl consensus::Parameters,
    sync_state: &mut SyncState,
    shielded_protocol: Option<ShieldedProtocol>,
    block_height: BlockHeight,
) {
    let block_range = determine_block_range(
        consensus_parameters,
        sync_state,
        block_height,
        shielded_protocol,
    );
    punch_scan_priority(sync_state, block_range, ScanPriority::FoundNote);
}

pub(super) fn set_scanned_scan_range(
    sync_state: &mut SyncState,
    scanned_range: Range<BlockHeight>,
    nullifiers_mapped: bool,
) {
    let Some((index, scan_range)) =
        sync_state
            .scan_ranges
            .iter()
            .enumerate()
            .find(|(_, scan_range)| {
                scan_range.block_range().contains(&scanned_range.start)
                    && scan_range.block_range().contains(&(scanned_range.end - 1))
            })
    else {
        panic!("scan range containing scanned range should exist!");
    };

    let split_ranges = split_out_scan_range(
        scan_range.clone(),
        scanned_range.clone(),
        if nullifiers_mapped {
            ScanPriority::Scanned
        } else {
            ScanPriority::ScannedWithoutMapping
        },
    );
    sync_state.scan_ranges.splice(index..=index, split_ranges);
}

pub(super) fn reset_refetching_nullifiers_scan_range(
    sync_state: &mut SyncState,
    invalid_refetch_range: Range<BlockHeight>,
) {
    let Some((index, scan_range)) =
        sync_state
            .scan_ranges
            .iter()
            .enumerate()
            .find(|(_, scan_range)| {
                scan_range
                    .block_range()
                    .contains(&invalid_refetch_range.start)
                    && scan_range
                        .block_range()
                        .contains(&(invalid_refetch_range.end - 1))
            })
    else {
        panic!("scan range containing invalid refetch range should exist!");
    };

    let split_ranges = split_out_scan_range(
        scan_range.clone(),
        invalid_refetch_range.clone(),
        ScanPriority::ScannedWithoutMapping,
    );
    sync_state.scan_ranges.splice(index..=index, split_ranges);
}

/// Sets the scan range in `sync_state` with `block_range` to the given `scan_priority`.
///
/// Panics if no scan range is found in `sync_state` with a block range of exactly `block_range`.
pub(super) fn set_scan_priority(
    sync_state: &mut SyncState,
    block_range: &Range<BlockHeight>,
    scan_priority: ScanPriority,
) {
    if let Some((index, range)) = sync_state
        .scan_ranges
        .iter()
        .enumerate()
        .find(|(_, range)| range.block_range() == block_range)
    {
        sync_state.scan_ranges[index] =
            ScanRange::from_parts(range.block_range().clone(), scan_priority);
    } else {
        panic!("scan range with block range {block_range:?} not found!")
    }
}

/// Punches in a `scan_priority` for a given `block_range`.
///
/// This function will set all scan ranges in `sync_state` with block range bounds contained by `block_range` to
/// the given `scan_priority`.
/// If any scan ranges in `sync_state` are found to overlap with the given `block_range`, they will be split at the
/// boundary and the new scan ranges contained by `block_range` will be set to `scan_priority`.
/// Any scan ranges that fully contain the `block_range` will be split out with the given `scan_priority`.
/// Any scan ranges with `Scanning`, `RefetchingNullifiers` or `Scanned` priority or with higher (or equal) priority than
/// `scan_priority` will be ignored.
pub(super) fn punch_scan_priority(
    sync_state: &mut SyncState,
    block_range: Range<BlockHeight>,
    scan_priority: ScanPriority,
) {
    let mut scan_ranges_contained_by_block_range = Vec::new();
    let mut scan_ranges_for_splitting = Vec::new();

    for (index, scan_range) in sync_state.scan_ranges().iter().enumerate() {
        if scan_range.priority() == ScanPriority::Scanned
            || scan_range.priority() == ScanPriority::ScannedWithoutMapping
            || scan_range.priority() == ScanPriority::Scanning
            || scan_range.priority() == ScanPriority::RefetchingNullifiers
            || scan_range.priority() >= scan_priority
        {
            continue;
        }

        match (
            block_range.contains(&scan_range.block_range().start),
            block_range.contains(&(scan_range.block_range().end - 1)),
            scan_range.block_range().contains(&block_range.start),
        ) {
            (true, true, _) => scan_ranges_contained_by_block_range.push(scan_range.clone()),
            (true, false, _) | (false, true, _) => {
                scan_ranges_for_splitting.push((index, scan_range.clone()));
            }
            (false, false, true) => scan_ranges_for_splitting.push((index, scan_range.clone())),
            (false, false, false) => {}
        }
    }

    for scan_range in scan_ranges_contained_by_block_range {
        set_scan_priority(sync_state, scan_range.block_range(), scan_priority);
    }

    // split out the scan ranges in reverse order to maintain the correct index for lower scan ranges
    for (index, scan_range) in scan_ranges_for_splitting.into_iter().rev() {
        let split_ranges = split_out_scan_range(scan_range, block_range.clone(), scan_priority);
        sync_state.scan_ranges.splice(index..=index, split_ranges);
    }
}

/// Determines the block range which contains all the note commitments for the shard of a given `shielded_protocol` surrounding
/// the specified `block_height`.
///
/// If no shard range exists for the given `block_height`, return the range of the incomplete shard at the chain tip.
/// If `block_height` contains note commitments from multiple shards, return the block range of all of those shards combined.
///
/// If `shielded_protocol` is `None`, return the surrounding [`self::NARROW_SCAN_AREA`] blocks starting from the
/// closest lower multiple of [`self::NARROW_SCAN_AREA`] to `block_height`.
fn determine_block_range(
    consensus_parameters: &impl consensus::Parameters,
    sync_state: &SyncState,
    block_height: BlockHeight,
    shielded_protocol: Option<ShieldedProtocol>,
) -> Range<BlockHeight> {
    if let Some(mut shielded_protocol) = shielded_protocol {
        loop {
            match shielded_protocol {
                ShieldedProtocol::Sapling => {
                    if block_height
                        < consensus_parameters
                            .activation_height(consensus::NetworkUpgrade::Sapling)
                            .expect("network activation height should be set")
                    {
                        panic!("pre-sapling not supported");
                    } else {
                        break;
                    }
                }
                ShieldedProtocol::Orchard => {
                    if block_height
                        < consensus_parameters
                            .activation_height(consensus::NetworkUpgrade::Nu5)
                            .expect("network activation height should be set")
                    {
                        shielded_protocol = ShieldedProtocol::Sapling;
                    } else {
                        break;
                    }
                }
            }
        }

        let shard_ranges = match shielded_protocol {
            ShieldedProtocol::Sapling => sync_state.sapling_shard_ranges.as_slice(),
            ShieldedProtocol::Orchard => sync_state.orchard_shard_ranges.as_slice(),
        };

        let target_ranges = shard_ranges
            .iter()
            .filter(|range| range.contains(&block_height))
            .cloned()
            .collect::<Vec<_>>();

        if target_ranges.is_empty() {
            let start = if let Some(range) = shard_ranges.last() {
                range.end - 1
            } else {
                sync_state
                    .wallet_birthday()
                    .expect("scan range should not be empty")
            };
            let end = sync_state
                .last_known_chain_height()
                .expect("scan range should not be empty")
                + 1;

            let range = Range { start, end };

            assert!(
                range.contains(&block_height),
                "block height should always be within the incomplete shard at chain tip when no complete shard range is found!"
            );

            range
        } else {
            Range {
                start: target_ranges
                    .first()
                    .expect("should not be empty in this scope")
                    .start,
                end: target_ranges
                    .last()
                    .expect("should not be empty in this scope")
                    .end,
            }
        }
    } else {
        let block_height = u32::from(block_height);
        let lower_bound = BlockHeight::from_u32(block_height - (block_height % NARROW_SCAN_AREA));
        let higher_bound = lower_bound + NARROW_SCAN_AREA;

        lower_bound..higher_bound
    }
}

/// Takes a `scan_range` and splits it at `block_range.start` and `block_range.end`, returning a vec of scan ranges where
/// the scan range contained within the specified `block_range` has the given `scan_priority`.
///
/// If `block_range` goes beyond the bounds of `scan_range.block_range()` no splitting will occur at the upper and/or
/// lower bound but the priority will still be updated.
///
/// Panics if no blocks in `block_range` are contained within `scan_range.block_range()`.
fn split_out_scan_range(
    scan_range: ScanRange,
    block_range: Range<BlockHeight>,
    scan_priority: ScanPriority,
) -> Vec<ScanRange> {
    let mut split_ranges = Vec::new();
    if let Some((lower_range, higher_range)) = scan_range.split_at(block_range.start) {
        split_ranges.push(lower_range);
        if let Some((middle_range, higher_range)) = higher_range.split_at(block_range.end) {
            // `scan_range` is split at the upper and lower bound of `block_range`
            split_ranges.push(ScanRange::from_parts(
                middle_range.block_range().clone(),
                scan_priority,
            ));
            split_ranges.push(higher_range);
        } else {
            // `scan_range` is split only at the lower bound of `block_range`
            split_ranges.push(ScanRange::from_parts(
                higher_range.block_range().clone(),
                scan_priority,
            ));
        }
    } else if let Some((lower_range, higher_range)) = scan_range.split_at(block_range.end) {
        // `scan_range` is split only at the upper bound of `block_range`
        split_ranges.push(ScanRange::from_parts(
            lower_range.block_range().clone(),
            scan_priority,
        ));
        split_ranges.push(higher_range);
    } else {
        // `scan_range` is not split as it is fully contained within `block_range`
        // only scan priority is updated
        assert!(scan_range.block_range().start >= block_range.start);
        assert!(scan_range.block_range().end <= block_range.end);

        split_ranges.push(ScanRange::from_parts(
            scan_range.block_range().clone(),
            scan_priority,
        ));
    }

    split_ranges
}

/// Selects and prepares the next scan range for scanning.
///
/// Sets the range for scanning to `Scanning` priority in the wallet `sync_state` but returns the scan range with its
/// initial priority for use in scanning and post-scan processing.
/// If the selected range is of `ScannedWithoutMapping` priority, the range is set to `RefetchingNullifiers` in the
/// wallet `sync_state` but returns the scan range with priority `ScannedWithoutMapping` for use in scanning and
/// post-scan processing.
/// Returns `None` if there are no more ranges to scan.
///
/// Set `nullifier_map_limit_exceeded` to `true` if the nullifiers are not going to be mapped to the wallet's main
/// nullifier map due to performance constraints.
fn select_scan_range(
    consensus_parameters: &impl consensus::Parameters,
    sync_state: &mut SyncState,
    nullifier_map_limit_exceeded: bool,
) -> Option<ScanRange> {
    let (first_unscanned_index, first_unscanned_range) = sync_state
        .scan_ranges
        .iter()
        .enumerate()
        .find(|(_, scan_range)| {
            scan_range.priority() != ScanPriority::Scanned
                && scan_range.priority() != ScanPriority::RefetchingNullifiers
        })?;
    let (selected_index, selected_scan_range) =
        if first_unscanned_range.priority() == ScanPriority::ScannedWithoutMapping {
            // prioritise re-fetching the nullifiers when a range with priority `ScannedWithoutMapping` is the first
            // unscanned range.
            // the `first_unscanned_range` may have `Scanning` priority here as we must select a `ScannedWithoutMapping` range only when all ranges below are `Scanned`. if a `ScannedwithoutMapping` range is selected and completes *before* a lower range that is currently `Scanning`, the nullifiers will need to be discarded and re-fetched afterwards. so this avoids a race condition that results in a sync inefficiency.
            (first_unscanned_index, first_unscanned_range.clone())
        } else {
            // scan ranges are sorted from lowest to highest priority.
            // scan ranges with the same priority are sorted in block height order.
            // the highest priority scan range is then selected from the end of the list, the highest priority with highest
            // starting block height.
            // if the highest priority is `Historic` the range with the lowest starting block height is selected instead.
            // if nullifiers are not being mapped to the wallet's main nullifier map due to performance constraints
            // (`nullifier_map_limit_exceeded` is set `true`) then the range with the highest priority and lowest starting block
            // height is selected to allow notes to be spendable quickly on rescan, otherwise spends would not be detected as nullifiers will be temporarily discarded.
            // TODO: add this documentation of performance levels and order of scanning to pepper-sync doc comments
            let mut scan_ranges_priority_sorted: Vec<(usize, ScanRange)> =
                sync_state.scan_ranges.iter().cloned().enumerate().collect();
            if nullifier_map_limit_exceeded {
                scan_ranges_priority_sorted
                    .sort_by(|(_, a), (_, b)| b.block_range().start.cmp(&a.block_range().start));
            }
            scan_ranges_priority_sorted.sort_by_key(|(_, scan_range)| scan_range.priority());

            scan_ranges_priority_sorted
                .last()
                .map(|(index, highest_priority_range)| {
                    if highest_priority_range.priority() == ScanPriority::Historic {
                        if nullifier_map_limit_exceeded {
                            // in this case, scan ranges are already sorted from highest to lowest and we are selecting
                            // the last range (lowest range with historic priority)
                            (*index, highest_priority_range.clone())
                        } else {
                            // in this case, scan ranges are sorted from lowest to highest and we are selecting
                            // the lowest range with historic priority
                            scan_ranges_priority_sorted
                                .iter()
                                .find(|(_, range)| range.priority() == ScanPriority::Historic)
                                .expect("range with Historic priority exists in this scope")
                                .clone()
                        }
                    } else {
                        // select the last range in the list
                        (*index, highest_priority_range.clone())
                    }
                })?
        };

    let selected_priority = selected_scan_range.priority();

    if selected_priority == ScanPriority::Scanned
        || selected_priority == ScanPriority::Scanning
        || selected_priority == ScanPriority::RefetchingNullifiers
    {
        return None;
    }

    // historic scan ranges can be larger than a shard block range so must be split out.
    // otherwise, just set the scan priority of selected range to `Scanning` in sync state.
    // if the selected range is of `ScannedWithoutMapping` priority, set the range to `RefetchingNullifiers` priority
    // instead of `Scanning`.
    let selected_block_range = match selected_priority {
        ScanPriority::Historic => {
            let shard_block_range = determine_block_range(
                consensus_parameters,
                sync_state,
                selected_scan_range.block_range().start,
                Some(ShieldedProtocol::Orchard),
            );
            let split_ranges = split_out_scan_range(
                selected_scan_range,
                shard_block_range,
                ScanPriority::Scanning,
            );
            let selected_block_range = split_ranges
                .first()
                .expect("split ranges should always be non-empty")
                .block_range()
                .clone();
            sync_state
                .scan_ranges
                .splice(selected_index..=selected_index, split_ranges);

            selected_block_range
        }
        ScanPriority::ScannedWithoutMapping => {
            let selected_scan_range = sync_state
                .scan_ranges
                .get_mut(selected_index)
                .expect("scan range should exist due to previous logic");

            *selected_scan_range = ScanRange::from_parts(
                selected_scan_range.block_range().clone(),
                ScanPriority::RefetchingNullifiers,
            );

            selected_scan_range.block_range().clone()
        }
        _ => {
            let selected_scan_range = sync_state
                .scan_ranges
                .get_mut(selected_index)
                .expect("scan range should exist due to previous logic");

            *selected_scan_range = ScanRange::from_parts(
                selected_scan_range.block_range().clone(),
                ScanPriority::Scanning,
            );

            selected_scan_range.block_range().clone()
        }
    };

    Some(ScanRange::from_parts(
        selected_block_range,
        selected_priority,
    ))
}

/// Creates a scan task to be sent to a [`crate::scan::task::ScanWorker`] for scanning.
pub(crate) fn create_scan_task<W>(
    consensus_parameters: &impl consensus::Parameters,
    wallet: &mut W,
    nullifier_map_limit_exceeded: bool,
) -> Result<Option<ScanTask>, W::Error>
where
    W: SyncWallet + SyncBlocks + SyncNullifiers,
{
    if let Some(selected_range) = select_scan_range(
        consensus_parameters,
        wallet.get_sync_state_mut()?,
        nullifier_map_limit_exceeded,
    ) {
        if selected_range.priority() == ScanPriority::ScannedWithoutMapping {
            // all continuity checks and scanning is already complete, the scan worker will only re-fetch the nullifiers
            // for final spend detection.
            Ok(Some(ScanTask::from_parts(
                selected_range,
                None,
                None,
                BTreeSet::new(),
                HashMap::new(),
            )))
        } else {
            let start_seam_block = wallet
                .get_wallet_block(selected_range.block_range().start - 1)
                .ok();
            let end_seam_block = wallet
                .get_wallet_block(selected_range.block_range().end)
                .ok();

            let scan_targets =
                find_scan_targets(wallet.get_sync_state()?, selected_range.block_range());
            let transparent_addresses: HashMap<String, TransparentAddressId> = wallet
                .get_transparent_addresses()?
                .iter()
                .map(|(id, address)| (address.clone(), *id))
                .collect();

            Ok(Some(ScanTask::from_parts(
                selected_range,
                start_seam_block,
                end_seam_block,
                scan_targets,
                transparent_addresses,
            )))
        }
    } else {
        Ok(None)
    }
}

/// Sets the `initial_sync_state` field at the start of the sync session
pub(super) async fn set_initial_state<W>(
    consensus_parameters: &impl consensus::Parameters,
    fetch_request_sender: mpsc::UnboundedSender<FetchRequest>,
    wallet: &mut W,
    chain_height: BlockHeight,
) -> Result<(), SyncError<W::Error>>
where
    W: SyncWallet + SyncBlocks,
{
    let sync_state = wallet.get_sync_state().map_err(SyncError::WalletError)?;
    let birthday = sync_state
        .wallet_birthday()
        .expect("scan ranges must be non-empty");
    let fully_scanned_height = sync_state
        .fully_scanned_height()
        .expect("scan ranges must be non-empty");
    let previously_scanned_blocks = calculate_scanned_blocks(sync_state);
    let (previously_scanned_sapling_outputs, previously_scanned_orchard_outputs) =
        calculate_scanned_outputs(wallet).map_err(SyncError::WalletError)?;
    let (birthday_sapling_initial_tree_size, birthday_orchard_initial_tree_size) =
        if let Ok(block) = wallet.get_wallet_block(birthday) {
            (
                block.tree_bounds.sapling_initial_tree_size,
                block.tree_bounds.orchard_initial_tree_size,
            )
        } else {
            final_tree_sizes(
                consensus_parameters,
                fetch_request_sender.clone(),
                wallet,
                birthday - 1,
            )
            .await?
        };
    let (chain_tip_sapling_final_tree_size, chain_tip_orchard_final_tree_size) = final_tree_sizes(
        consensus_parameters,
        fetch_request_sender.clone(),
        wallet,
        chain_height,
    )
    .await?;

    wallet
        .get_sync_state_mut()
        .map_err(SyncError::WalletError)?
        .initial_sync_state = InitialSyncState {
        sync_start_height: if chain_height > fully_scanned_height {
            fully_scanned_height + 1
        } else {
            chain_height
        },
        wallet_tree_bounds: TreeBounds {
            sapling_initial_tree_size: birthday_sapling_initial_tree_size,
            sapling_final_tree_size: chain_tip_sapling_final_tree_size,
            orchard_initial_tree_size: birthday_orchard_initial_tree_size,
            orchard_final_tree_size: chain_tip_orchard_final_tree_size,
        },
        previously_scanned_blocks,
        previously_scanned_sapling_outputs,
        previously_scanned_orchard_outputs,
    };

    Ok(())
}

pub(super) fn calculate_scanned_blocks(sync_state: &SyncState) -> u32 {
    sync_state
        .scan_ranges()
        .iter()
        .filter(|scan_range| {
            scan_range.priority() == ScanPriority::Scanned
                || scan_range.priority() == ScanPriority::ScannedWithoutMapping
                || scan_range.priority() == ScanPriority::RefetchingNullifiers
        })
        .map(super::ScanRange::block_range)
        .fold(0, |acc, block_range| {
            acc + (block_range.end - block_range.start)
        })
}

pub(super) fn calculate_scanned_outputs<W>(wallet: &W) -> Result<(u32, u32), W::Error>
where
    W: SyncWallet + SyncBlocks,
{
    Ok(wallet
        .get_sync_state()?
        .scan_ranges()
        .iter()
        .filter(|scan_range| {
            scan_range.priority() == ScanPriority::Scanned
                || scan_range.priority() == ScanPriority::ScannedWithoutMapping
                || scan_range.priority() == ScanPriority::RefetchingNullifiers
        })
        .map(|scanned_range| scanned_range_tree_bounds(wallet, scanned_range.block_range().clone()))
        .collect::<Result<Vec<_>, _>>()?
        .iter()
        .fold((0, 0), |acc, tree_bounds| {
            (
                acc.0
                    + (tree_bounds.sapling_final_tree_size - tree_bounds.sapling_initial_tree_size),
                acc.1
                    + (tree_bounds.orchard_final_tree_size - tree_bounds.orchard_initial_tree_size),
            )
        }))
}

/// Gets `block_height` final tree sizes from wallet block if it exists, otherwise from frontiers fetched from server.
async fn final_tree_sizes<W>(
    consensus_parameters: &impl consensus::Parameters,
    fetch_request_sender: mpsc::UnboundedSender<FetchRequest>,
    wallet: &mut W,
    block_height: BlockHeight,
) -> Result<(u32, u32), ServerError>
where
    W: SyncBlocks,
{
    if let Ok(block) = wallet.get_wallet_block(block_height) {
        Ok((
            block.tree_bounds().sapling_final_tree_size,
            block.tree_bounds().orchard_final_tree_size,
        ))
    } else {
        // TODO: move this whole block into `client::get_frontiers`
        let sapling_activation_height = consensus_parameters
            .activation_height(NetworkUpgrade::Sapling)
            .expect("should have some sapling activation height");

        match block_height.cmp(&(sapling_activation_height - 1)) {
            cmp::Ordering::Greater => {
                let frontiers =
                    client::get_frontiers(fetch_request_sender.clone(), block_height).await?;
                Ok((
                    frontiers
                        .final_sapling_tree()
                        .tree_size()
                        .try_into()
                        .expect("should not be more than 2^32 note commitments in the tree!"),
                    frontiers
                        .final_orchard_tree()
                        .tree_size()
                        .try_into()
                        .expect("should not be more than 2^32 note commitments in the tree!"),
                ))
            }
            cmp::Ordering::Equal => Ok((0, 0)),
            cmp::Ordering::Less => panic!("pre-sapling not supported!"),
        }
    }
}

/// Gets the initial and final tree sizes of a `scanned_range`.
///
/// Panics if `scanned_range` wallet block bounds are not found in the wallet.
fn scanned_range_tree_bounds<W>(
    wallet: &W,
    scanned_range: Range<BlockHeight>,
) -> Result<TreeBounds, W::Error>
where
    W: SyncBlocks,
{
    let start_block = wallet.get_wallet_block(scanned_range.start)?;
    let end_block = wallet.get_wallet_block(scanned_range.end - 1)?;

    Ok(TreeBounds {
        sapling_initial_tree_size: start_block.tree_bounds().sapling_initial_tree_size,
        sapling_final_tree_size: end_block.tree_bounds().sapling_final_tree_size,
        orchard_initial_tree_size: start_block.tree_bounds().orchard_initial_tree_size,
        orchard_final_tree_size: end_block.tree_bounds().orchard_final_tree_size,
    })
}

/// Creates block ranges that contain all outputs for the shards associated with `subtree_roots` and adds them to
/// `sync_state`.
///
/// The network upgrade activation height for the `shielded_protocol` is the first shard start height for the case
/// where shard ranges in `sync_state` are empty.
#[cfg(not(feature = "darkside_test"))]
pub(super) fn add_shard_ranges(
    consensus_parameters: &impl consensus::Parameters,
    shielded_protocol: ShieldedProtocol,
    sync_state: &mut SyncState,
    subtree_roots: &[SubtreeRoot],
) {
    let network_upgrade_activation_height = match shielded_protocol {
        ShieldedProtocol::Sapling => consensus_parameters
            .activation_height(consensus::NetworkUpgrade::Sapling)
            .expect("activation height should exist for this network upgrade!"),
        ShieldedProtocol::Orchard => consensus_parameters
            .activation_height(consensus::NetworkUpgrade::Nu5)
            .expect("activation height should exist for this network upgrade!"),
    };

    let shard_ranges: &mut Vec<Range<BlockHeight>> = match shielded_protocol {
        ShieldedProtocol::Sapling => sync_state.sapling_shard_ranges.as_mut(),
        ShieldedProtocol::Orchard => sync_state.orchard_shard_ranges.as_mut(),
    };

    let highest_subtree_completing_height = if let Some(shard_range) = shard_ranges.last() {
        shard_range.end - 1
    } else {
        network_upgrade_activation_height
    };

    subtree_roots
        .iter()
        .map(|subtree_root| {
            BlockHeight::from_u32(
                subtree_root
                    .completing_block_height
                    .try_into()
                    .expect("overflow should never occur"),
            )
        })
        .fold(
            highest_subtree_completing_height,
            |previous_subtree_completing_height, subtree_completing_height| {
                shard_ranges.push(Range {
                    start: previous_subtree_completing_height,
                    end: subtree_completing_height + 1,
                });

                tracing::debug!(
                    "{:?} subtree root height: {}",
                    shielded_protocol,
                    subtree_completing_height
                );

                subtree_completing_height
            },
        );
}

/// Updates the `shielded_protocol` shard range to `FoundNote` scan priority if the `wallet_transaction` contains
/// a note from the corresponding `shielded_protocol`.
pub(super) fn update_found_note_shard_priority(
    consensus_parameters: &impl consensus::Parameters,
    sync_state: &mut SyncState,
    shielded_protocol: ShieldedProtocol,
    wallet_transaction: &WalletTransaction,
) {
    let found_note = match shielded_protocol {
        ShieldedProtocol::Sapling => !wallet_transaction.sapling_notes().is_empty(),
        ShieldedProtocol::Orchard => !wallet_transaction.orchard_notes().is_empty(),
    };
    if found_note {
        set_found_note_scan_range(
            consensus_parameters,
            sync_state,
            Some(shielded_protocol),
            wallet_transaction.status().get_height(),
        );
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn truncate_scan_ranges() {
        let mut sync_state = SyncState::new();
        sync_state.scan_ranges = vec![
            ScanRange::from_parts(1.into()..99.into(), ScanPriority::Historic),
            ScanRange::from_parts(100.into()..199.into(), ScanPriority::Historic),
            ScanRange::from_parts(200.into()..299.into(), ScanPriority::Historic),
            ScanRange::from_parts(300.into()..399.into(), ScanPriority::Historic),
        ];

        super::truncate_scan_ranges(250.into(), &mut sync_state);

        assert_eq!(
            sync_state.scan_ranges,
            vec![
                ScanRange::from_parts(1.into()..99.into(), ScanPriority::Historic),
                ScanRange::from_parts(100.into()..199.into(), ScanPriority::Historic),
                ScanRange::from_parts(200.into()..251.into(), ScanPriority::Historic),
            ]
        );
    }
}
