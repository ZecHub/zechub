use std::{
    cmp,
    collections::{BTreeMap, BTreeSet, HashMap},
};

use incrementalmerkletree::{Marking, Position, Retention};
use orchard::tree::MerkleHashOrchard;
use sapling_crypto::Node;
use tokio::sync::mpsc;
use zcash_keys::keys::UnifiedFullViewingKey;
use zcash_note_encryption::Domain;
use zcash_primitives::block::BlockHash;
use zcash_protocol::consensus::{self, BlockHeight};
use zingo_netutils::lightwallet_protocol::{
    CompactBlock, CompactOrchardAction, CompactSaplingOutput,
};
use zip32::AccountId;

use crate::{
    client::{self, FetchRequest},
    error::{ContinuityError, ScanError, ServerError},
    keys::{KeyId, ScanningKeyOps, ScanningKeys},
    utils::{
        get_compact_action, get_compact_block_hash, get_compact_block_height,
        get_compact_block_prev_hash, get_compact_output_description, get_compact_tx_txid,
    },
    wallet::{NullifierMap, OutputId, ScanTarget, TreeBounds, WalletBlock},
    witness::WitnessData,
};

#[cfg(not(feature = "darkside_test"))]
use zcash_protocol::{PoolType, ShieldedProtocol};

use self::runners::{BatchRunners, DecryptedOutput};

use super::{DecryptedNoteData, InitialScanData, ScanData, collect_nullifiers};

mod runners;

pub(super) fn scan_compact_blocks<P>(
    compact_blocks: Vec<CompactBlock>,
    consensus_parameters: &P,
    ufvks: &HashMap<AccountId, UnifiedFullViewingKey>,
    initial_scan_data: InitialScanData,
    trial_decrypt_task_size: usize,
) -> Result<ScanData, ScanError>
where
    P: consensus::Parameters + Sync + Send + 'static,
{
    check_continuity(
        &compact_blocks,
        initial_scan_data.start_seam_block.as_ref(),
        initial_scan_data.end_seam_block.as_ref(),
    )?;

    let scanning_keys = ScanningKeys::from_account_ufvks(ufvks.clone());
    let mut runners = trial_decrypt(
        consensus_parameters,
        &scanning_keys,
        &compact_blocks,
        trial_decrypt_task_size,
    )?;

    let mut wallet_blocks: BTreeMap<BlockHeight, WalletBlock> = BTreeMap::new();
    let mut nullifiers = NullifierMap::new();
    let mut decrypted_scan_targets = BTreeSet::new();
    let mut decrypted_note_data = DecryptedNoteData::new();
    let mut witness_data = WitnessData::new(
        Position::from(u64::from(initial_scan_data.sapling_initial_tree_size)),
        Position::from(u64::from(initial_scan_data.orchard_initial_tree_size)),
    );
    let mut sapling_initial_tree_size;
    let mut orchard_initial_tree_size;
    let mut sapling_final_tree_size = initial_scan_data.sapling_initial_tree_size;
    let mut orchard_final_tree_size = initial_scan_data.orchard_initial_tree_size;
    for block in &compact_blocks {
        sapling_initial_tree_size = sapling_final_tree_size;
        orchard_initial_tree_size = orchard_final_tree_size;

        let block_height = get_compact_block_height(block);

        for transaction in &block.vtx {
            // collect trial decryption results by transaction
            let incoming_sapling_outputs = runners.sapling.collect_results(
                get_compact_block_hash(block),
                get_compact_tx_txid(transaction),
            );
            let incoming_orchard_outputs = runners.orchard.collect_results(
                get_compact_block_hash(block),
                get_compact_tx_txid(transaction),
            );

            // gather the txids of all transactions relevant to the wallet
            // the edge case of transactions that this capability created but did not receive change
            // or create outgoing data is handled when the nullifiers are added and linked
            for output_id in incoming_sapling_outputs.keys() {
                decrypted_scan_targets.insert(ScanTarget {
                    block_height,
                    txid: output_id.txid(),
                    narrow_scan_area: false,
                });
            }
            for output_id in incoming_orchard_outputs.keys() {
                decrypted_scan_targets.insert(ScanTarget {
                    block_height,
                    txid: output_id.txid(),
                    narrow_scan_area: false,
                });
            }

            collect_nullifiers(
                &mut nullifiers,
                get_compact_block_height(block),
                transaction,
            )?;

            witness_data.sapling_leaves_and_retentions.extend(
                calculate_sapling_leaves_and_retentions(
                    &transaction.outputs,
                    &incoming_sapling_outputs,
                )?,
            );
            witness_data.orchard_leaves_and_retentions.extend(
                calculate_orchard_leaves_and_retentions(
                    &transaction.actions,
                    &incoming_orchard_outputs,
                )?,
            );

            calculate_nullifiers_and_positions(
                sapling_final_tree_size,
                &scanning_keys.sapling,
                &incoming_sapling_outputs,
                &mut decrypted_note_data.sapling_nullifiers_and_positions,
            );
            calculate_nullifiers_and_positions(
                orchard_final_tree_size,
                &scanning_keys.orchard,
                &incoming_orchard_outputs,
                &mut decrypted_note_data.orchard_nullifiers_and_positions,
            );

            sapling_final_tree_size += u32::try_from(transaction.outputs.len())
                .expect("should not be more than 2^32 outputs in a transaction");
            orchard_final_tree_size += u32::try_from(transaction.actions.len())
                .expect("should not be more than 2^32 outputs in a transaction");
        }

        set_checkpoint_retentions(
            block_height,
            &mut witness_data.sapling_leaves_and_retentions,
        );
        set_checkpoint_retentions(
            block_height,
            &mut witness_data.orchard_leaves_and_retentions,
        );

        let wallet_block = WalletBlock {
            block_height: get_compact_block_height(block),
            block_hash: get_compact_block_hash(block),
            prev_hash: get_compact_block_prev_hash(block),
            time: block.time,
            txids: block.vtx.iter().map(get_compact_tx_txid).collect(),
            tree_bounds: TreeBounds {
                sapling_initial_tree_size,
                sapling_final_tree_size,
                orchard_initial_tree_size,
                orchard_final_tree_size,
            },
        };

        check_tree_size(block, &wallet_block)?;

        wallet_blocks.insert(wallet_block.block_height(), wallet_block);
    }

    Ok(ScanData {
        nullifiers,
        wallet_blocks,
        decrypted_scan_targets,
        decrypted_note_data,
        witness_data,
    })
}

fn trial_decrypt<P>(
    consensus_parameters: &P,
    scanning_keys: &ScanningKeys,
    compact_blocks: &[CompactBlock],
    trial_decrypt_task_size: usize,
) -> Result<BatchRunners<(), ()>, ScanError>
where
    P: consensus::Parameters + Send + 'static,
{
    let mut runners = BatchRunners::<(), ()>::for_keys(trial_decrypt_task_size, scanning_keys);
    for block in compact_blocks {
        runners.add_block(consensus_parameters, block.clone())?;
    }
    runners.flush();

    Ok(runners)
}

/// Checks height and hash continuity of a batch of compact blocks.
///
/// If available, also checks continuity with the blocks adjacent to the `compact_blocks` forming the start and end
/// seams of the scan ranges.
fn check_continuity(
    compact_blocks: &[CompactBlock],
    start_seam_block: Option<&WalletBlock>,
    end_seam_block: Option<&WalletBlock>,
) -> Result<(), ContinuityError> {
    let mut prev_height: Option<BlockHeight> = None;
    let mut prev_hash: Option<BlockHash> = None;

    if let Some(start_seam_block) = start_seam_block {
        prev_height = Some(start_seam_block.block_height());
        prev_hash = Some(start_seam_block.block_hash());
    }

    for block in compact_blocks {
        if let Some(prev_height) = prev_height
            && get_compact_block_height(block) != prev_height + 1
        {
            return Err(ContinuityError::HeightDiscontinuity {
                height: get_compact_block_height(block),
                previous_block_height: prev_height,
            });
        }

        if let Some(prev_hash) = prev_hash
            && get_compact_block_prev_hash(block) != prev_hash
        {
            return Err(ContinuityError::HashDiscontinuity {
                height: get_compact_block_height(block),
                prev_hash: get_compact_block_prev_hash(block),
                previous_block_hash: prev_hash,
            });
        }

        prev_height = Some(get_compact_block_height(block));
        prev_hash = Some(get_compact_block_hash(block));
    }

    if let Some(end_seam_block) = end_seam_block {
        let prev_height = prev_height.expect("compact blocks should not be empty");
        if end_seam_block.block_height() != prev_height + 1 {
            return Err(ContinuityError::HeightDiscontinuity {
                height: end_seam_block.block_height(),
                previous_block_height: prev_height,
            });
        }

        let prev_hash = prev_hash.expect("compact blocks should not be empty");
        if end_seam_block.prev_hash() != prev_hash {
            return Err(ContinuityError::HashDiscontinuity {
                height: end_seam_block.block_height(),
                prev_hash: end_seam_block.prev_hash(),
                previous_block_hash: prev_hash,
            });
        }
    }

    Ok(())
}

fn check_tree_size(
    compact_block: &CompactBlock,
    wallet_block: &WalletBlock,
) -> Result<(), ScanError> {
    if let Some(chain_metadata) = &compact_block.chain_metadata {
        if chain_metadata.sapling_commitment_tree_size
            != wallet_block.tree_bounds().sapling_final_tree_size
        {
            #[cfg(feature = "darkside_test")]
            {
                tracing::error!(
                    "darkside compact block sapling tree size incorrect.\nwallet block: {}\ncompact_block: {}",
                    wallet_block.tree_bounds().sapling_final_tree_size,
                    compact_block
                        .chain_metadata
                        .expect("should exist in this scope")
                        .sapling_commitment_tree_size
                );
                return Ok(());
            }

            #[cfg(not(feature = "darkside_test"))]
            return Err(ScanError::IncorrectTreeSize {
                shielded_protocol: PoolType::Shielded(ShieldedProtocol::Sapling),
                block_metadata_size: chain_metadata.sapling_commitment_tree_size,
                calculated_size: wallet_block.tree_bounds().sapling_final_tree_size,
            });
        }
        if chain_metadata.orchard_commitment_tree_size
            != wallet_block.tree_bounds().orchard_final_tree_size
        {
            #[cfg(feature = "darkside_test")]
            {
                tracing::error!(
                    "darkside compact block orchard tree size incorrect.\nwallet block: {}\ncompact_block: {}",
                    wallet_block.tree_bounds().orchard_final_tree_size,
                    compact_block
                        .chain_metadata
                        .expect("should exist in this scope")
                        .orchard_commitment_tree_size
                );
                return Ok(());
            }

            #[cfg(not(feature = "darkside_test"))]
            return Err(ScanError::IncorrectTreeSize {
                shielded_protocol: PoolType::Shielded(ShieldedProtocol::Orchard),
                block_metadata_size: chain_metadata.orchard_commitment_tree_size,
                calculated_size: wallet_block.tree_bounds().orchard_final_tree_size,
            });
        }
    }

    Ok(())
}

/// Calculates nullifiers and positions of incoming decrypted outputs for a given compact transaction and insert into hash map
/// `tree_size` is the tree size of the corresponding shielded pool up to - and not including - the compact transaction
/// being processed
fn calculate_nullifiers_and_positions<D, K, Nf>(
    tree_size: u32,
    keys: &HashMap<KeyId, K>,
    incoming_decrypted_outputs: &HashMap<OutputId, DecryptedOutput<D, ()>>,
    nullifiers_and_positions: &mut HashMap<OutputId, (Nf, Position)>,
) where
    D: Domain,
    K: ScanningKeyOps<D, Nf>,
{
    for (output_id, incoming_output) in incoming_decrypted_outputs {
        let position = Position::from(u64::from(tree_size + u32::from(output_id.output_index())));
        let key = keys
            .get(&incoming_output.ivk_tag)
            .expect("key should be available as it was used to decrypt output");
        let nullifier = key
            .nf(&incoming_output.note, position)
            .expect("only fvks currently supported");
        nullifiers_and_positions.insert(*output_id, (nullifier, position));
    }
}

// TODO: unify sapling and orchard leaf and retention fns
/// Calculates the sapling note commitment tree leaves and shardtree retentions for a given compact transaction
fn calculate_sapling_leaves_and_retentions<D: Domain>(
    outputs: &[CompactSaplingOutput],
    incoming_decrypted_outputs: &HashMap<OutputId, DecryptedOutput<D, ()>>,
) -> Result<Vec<(Node, Retention<BlockHeight>)>, ScanError> {
    let incoming_output_indexes = incoming_decrypted_outputs
        .keys()
        .copied()
        .map(|output_id| output_id.output_index())
        .collect::<Vec<_>>();

    if outputs.is_empty() {
        Ok(Vec::new())
    } else {
        let leaves_and_retentions = outputs
            .iter()
            .enumerate()
            .map(|(output_index, output)| {
                let note_commitment = get_compact_output_description(output)
                    .map_err(|_| ScanError::InvalidSaplingOutput)?
                    .cmu;
                let leaf = sapling_crypto::Node::from_cmu(&note_commitment);
                let decrypted: bool = incoming_output_indexes.contains(&(output_index as u16));
                let retention = if decrypted {
                    Retention::Marked
                } else {
                    Retention::Ephemeral
                };

                Ok((leaf, retention))
            })
            .collect::<Result<_, ScanError>>()?;

        Ok(leaves_and_retentions)
    }
}

// calculates the orchard note commitment tree leaves and shardtree retentions for a given compact transaction
fn calculate_orchard_leaves_and_retentions<D: Domain>(
    actions: &[CompactOrchardAction],
    incoming_decrypted_outputs: &HashMap<OutputId, DecryptedOutput<D, ()>>,
) -> Result<Vec<(MerkleHashOrchard, Retention<BlockHeight>)>, ScanError> {
    let incoming_output_indexes = incoming_decrypted_outputs
        .keys()
        .copied()
        .map(|output_id| output_id.output_index())
        .collect::<Vec<_>>();

    if actions.is_empty() {
        Ok(Vec::new())
    } else {
        let leaves_and_retentions = actions
            .iter()
            .enumerate()
            .map(|(output_index, output)| {
                let note_commitment = get_compact_action(output)
                    .map_err(|_| ScanError::InvalidOrchardAction)?
                    .cmx();
                let leaf = MerkleHashOrchard::from_cmx(&note_commitment);
                let decrypted: bool = incoming_output_indexes.contains(&(output_index as u16));
                let retention = if decrypted {
                    Retention::Marked
                } else {
                    Retention::Ephemeral
                };

                Ok((leaf, retention))
            })
            .collect::<Result<_, ScanError>>()?;

        Ok(leaves_and_retentions)
    }
}

pub(crate) async fn calculate_block_tree_bounds(
    consensus_parameters: &impl consensus::Parameters,
    fetch_request_sender: mpsc::UnboundedSender<FetchRequest>,
    compact_block: &CompactBlock,
) -> Result<TreeBounds, ServerError> {
    let (sapling_final_tree_size, orchard_final_tree_size) =
        if let Some(chain_metadata) = compact_block.chain_metadata {
            (
                chain_metadata.sapling_commitment_tree_size,
                chain_metadata.orchard_commitment_tree_size,
            )
        } else {
            let sapling_activation_height = consensus_parameters
                .activation_height(consensus::NetworkUpgrade::Sapling)
                .expect("should have some sapling activation height");

            match get_compact_block_height(compact_block).cmp(&sapling_activation_height) {
                cmp::Ordering::Greater => {
                    let frontiers = client::get_frontiers(
                        fetch_request_sender.clone(),
                        get_compact_block_height(compact_block),
                    )
                    .await?;
                    (
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
                    )
                }
                cmp::Ordering::Equal => (0, 0),
                cmp::Ordering::Less => panic!("pre-sapling not supported!"),
            }
        };

    let sapling_output_count: u32 = compact_block
        .vtx
        .iter()
        .map(|tx| tx.outputs.len())
        .sum::<usize>()
        .try_into()
        .expect("Sapling output count cannot exceed a u32");
    let orchard_output_count: u32 = compact_block
        .vtx
        .iter()
        .map(|tx| tx.actions.len())
        .sum::<usize>()
        .try_into()
        .expect("Sapling output count cannot exceed a u32");

    Ok(TreeBounds {
        sapling_initial_tree_size: sapling_final_tree_size.saturating_sub(sapling_output_count),
        sapling_final_tree_size,
        orchard_initial_tree_size: orchard_final_tree_size.saturating_sub(orchard_output_count),
        orchard_final_tree_size,
    })
}

fn set_checkpoint_retentions<L>(
    block_height: BlockHeight,
    leaves_and_retentions: &mut [(L, Retention<BlockHeight>)],
) {
    if let Some((_leaf, retention)) = leaves_and_retentions.last_mut() {
        match retention {
            Retention::Marked => {
                *retention = Retention::Checkpoint {
                    id: block_height,
                    marking: Marking::Marked,
                };
            }
            Retention::Ephemeral => {
                *retention = Retention::Checkpoint {
                    id: block_height,
                    marking: Marking::None,
                };
            }
            // NOTE: if there are no outputs in the block, this last retention will be a checkpoint and nothing will need to be mutated.
            _ => (),
        }
    }
}
