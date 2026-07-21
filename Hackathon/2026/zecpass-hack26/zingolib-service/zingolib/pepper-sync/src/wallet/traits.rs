//! Traits for interfacing a wallet with the sync engine

use std::collections::{BTreeMap, BTreeSet, HashMap};

use tokio::sync::mpsc;
use zip32::DiversifierIndex;

use orchard::tree::MerkleHashOrchard;
use shardtree::ShardTree;
use shardtree::store::memory::MemoryShardStore;
use shardtree::store::{Checkpoint, ShardStore, TreeState};
use zcash_keys::keys::UnifiedFullViewingKey;
use zcash_primitives::transaction::TxId;
use zcash_protocol::consensus::BlockHeight;
use zcash_protocol::{PoolType, ShieldedProtocol};
use zip32::AccountId;

use crate::error::{ServerError, SyncError};
use crate::keys::transparent::TransparentAddressId;
use crate::sync::{MAX_REORG_ALLOWANCE, ScanRange};
use crate::wallet::{
    NullifierMap, OutputId, ShardTrees, SyncState, WalletBlock, WalletTransaction,
};
use crate::witness::LocatedTreeData;
use crate::{Orchard, Sapling, SyncDomain, client, set_transactions_failed};

use super::{FetchRequest, ScanTarget, witness};

/// Trait for interfacing wallet with the sync engine.
pub trait SyncWallet {
    /// Errors associated with interfacing the sync engine with wallet data
    type Error: std::fmt::Debug + std::fmt::Display + std::error::Error;

    /// Returns the block height wallet was created.
    fn get_birthday(&self) -> Result<BlockHeight, Self::Error>;

    /// Returns a reference to wallet sync state.
    fn get_sync_state(&self) -> Result<&SyncState, Self::Error>;

    /// Returns a mutable reference to wallet sync state.
    fn get_sync_state_mut(&mut self) -> Result<&mut SyncState, Self::Error>;

    /// Returns all unified full viewing keys known to this wallet.
    fn get_unified_full_viewing_keys(
        &self,
    ) -> Result<HashMap<AccountId, UnifiedFullViewingKey>, Self::Error>;

    /// Add orchard address to wallet's unified address list.
    fn add_orchard_address(
        &mut self,
        account_id: zip32::AccountId,
        address: orchard::Address,
        diversifier_index: DiversifierIndex,
    ) -> Result<(), Self::Error>;

    /// Add sapling address to wallet's unified address list.
    fn add_sapling_address(
        &mut self,
        account_id: zip32::AccountId,
        address: sapling_crypto::PaymentAddress,
        diversifier_index: DiversifierIndex,
    ) -> Result<(), Self::Error>;

    /// Returns a reference to all transparent addresses known to this wallet.
    fn get_transparent_addresses(
        &self,
    ) -> Result<&BTreeMap<TransparentAddressId, String>, Self::Error>;

    /// Returns a mutable reference to all transparent addresses known to this wallet.
    fn get_transparent_addresses_mut(
        &mut self,
    ) -> Result<&mut BTreeMap<TransparentAddressId, String>, Self::Error>;

    /// Aids in-memory wallets to only save when the wallet state has changed by setting a flag to mark that save is
    /// required.
    /// Persitance wallets may use the default implementation.
    fn set_save_flag(&mut self) -> Result<(), Self::Error> {
        Ok(())
    }
}

/// Trait for interfacing [`crate::wallet::WalletBlock`]s with wallet data
pub trait SyncBlocks: SyncWallet {
    /// Get a stored wallet compact block from wallet data by block height
    ///
    /// Must return error if block is not found
    fn get_wallet_block(&self, block_height: BlockHeight) -> Result<WalletBlock, Self::Error>;

    /// Get mutable reference to wallet blocks
    fn get_wallet_blocks_mut(
        &mut self,
    ) -> Result<&mut BTreeMap<BlockHeight, WalletBlock>, Self::Error>;

    /// Append wallet compact blocks to wallet data
    fn append_wallet_blocks(
        &mut self,
        mut wallet_blocks: BTreeMap<BlockHeight, WalletBlock>,
    ) -> Result<(), Self::Error> {
        self.get_wallet_blocks_mut()?.append(&mut wallet_blocks);

        Ok(())
    }

    /// Removes all wallet blocks above the given `block_height`.
    fn truncate_wallet_blocks(&mut self, truncate_height: BlockHeight) -> Result<(), Self::Error> {
        self.get_wallet_blocks_mut()?
            .retain(|block_height, _| *block_height <= truncate_height);

        Ok(())
    }
}

/// Trait for interfacing [`crate::wallet::WalletTransaction`]s with wallet data
pub trait SyncTransactions: SyncWallet {
    /// Get reference to wallet transactions
    fn get_wallet_transactions(&self) -> Result<&HashMap<TxId, WalletTransaction>, Self::Error>;

    /// Get mutable reference to wallet transactions
    fn get_wallet_transactions_mut(
        &mut self,
    ) -> Result<&mut HashMap<TxId, WalletTransaction>, Self::Error>;

    /// Insert wallet transaction
    fn insert_wallet_transaction(
        &mut self,
        wallet_transaction: WalletTransaction,
    ) -> Result<(), Self::Error> {
        self.get_wallet_transactions_mut()?
            .insert(wallet_transaction.txid(), wallet_transaction);

        Ok(())
    }

    /// Extend wallet transaction map with new wallet transactions
    fn extend_wallet_transactions(
        &mut self,
        wallet_transactions: HashMap<TxId, WalletTransaction>,
    ) -> Result<(), Self::Error> {
        self.get_wallet_transactions_mut()?
            .extend(wallet_transactions);

        Ok(())
    }

    /// Sets all confirmed wallet transactions above the given `block_height` to `Failed` status.
    /// Also sets any output's `spending_transaction` field to `None` if it's spending transaction was set to `Failed`
    /// status.
    fn truncate_wallet_transactions(
        &mut self,
        truncate_height: BlockHeight,
    ) -> Result<(), Self::Error> {
        let invalid_txids: Vec<TxId> = self
            .get_wallet_transactions()?
            .values()
            .filter(|tx| tx.status().is_confirmed_after(&truncate_height))
            .map(|tx| tx.transaction().txid())
            .collect();

        set_transactions_failed(self.get_wallet_transactions_mut()?, invalid_txids);

        Ok(())
    }
}

/// Trait for interfacing nullifiers with wallet data
pub trait SyncNullifiers: SyncWallet {
    /// Get wallet nullifier map
    fn get_nullifiers(&self) -> Result<&NullifierMap, Self::Error>;

    /// Get mutable reference to wallet nullifier map
    fn get_nullifiers_mut(&mut self) -> Result<&mut NullifierMap, Self::Error>;

    /// Append nullifiers to wallet nullifier map
    fn append_nullifiers(&mut self, nullifiers: &mut NullifierMap) -> Result<(), Self::Error> {
        self.get_nullifiers_mut()?
            .sapling
            .append(&mut nullifiers.sapling);
        self.get_nullifiers_mut()?
            .orchard
            .append(&mut nullifiers.orchard);

        Ok(())
    }

    /// Removes all mapped nullifiers above the given `block_height`.
    fn truncate_nullifiers(&mut self, truncate_height: BlockHeight) -> Result<(), Self::Error> {
        let nullifier_map = self.get_nullifiers_mut()?;
        nullifier_map
            .sapling
            .retain(|_, scan_target| scan_target.block_height <= truncate_height);
        nullifier_map
            .orchard
            .retain(|_, scan_target| scan_target.block_height <= truncate_height);

        Ok(())
    }
}

/// Trait for interfacing outpoints with wallet data
pub trait SyncOutPoints: SyncWallet {
    /// Get wallet outpoint map
    fn get_outpoints(&self) -> Result<&BTreeMap<OutputId, ScanTarget>, Self::Error>;

    /// Get mutable reference to wallet outpoint map
    fn get_outpoints_mut(&mut self) -> Result<&mut BTreeMap<OutputId, ScanTarget>, Self::Error>;

    /// Append outpoints to wallet outpoint map
    fn append_outpoints(
        &mut self,
        outpoints: &mut BTreeMap<OutputId, ScanTarget>,
    ) -> Result<(), Self::Error> {
        self.get_outpoints_mut()?.append(outpoints);

        Ok(())
    }

    /// Removes all mapped outpoints above the given `block_height`.
    fn truncate_outpoints(&mut self, truncate_height: BlockHeight) -> Result<(), Self::Error> {
        self.get_outpoints_mut()?
            .retain(|_, scan_target| scan_target.block_height <= truncate_height);

        Ok(())
    }
}

/// Trait for interfacing shard tree data with wallet data
pub trait SyncShardTrees: SyncWallet {
    /// Get reference to shard trees
    fn get_shard_trees(&self) -> Result<&ShardTrees, Self::Error>;

    /// Get mutable reference to shard trees
    fn get_shard_trees_mut(&mut self) -> Result<&mut ShardTrees, Self::Error>;

    /// Update wallet shard trees with new shard tree data.
    ///
    /// `highest_scanned_height` is the height of the highest scanned block in the wallet not including the `scan_range` we are updating.
    fn update_shard_trees(
        &mut self,
        fetch_request_sender: mpsc::UnboundedSender<FetchRequest>,
        scan_range: &ScanRange,
        highest_scanned_height: BlockHeight,
        sapling_located_trees: Vec<LocatedTreeData<sapling_crypto::Node>>,
        orchard_located_trees: Vec<LocatedTreeData<MerkleHashOrchard>>,
    ) -> impl std::future::Future<Output = Result<(), SyncError<Self::Error>>> + Send
    where
        Self: std::marker::Send,
    {
        async move {
            let shard_trees = self.get_shard_trees_mut().map_err(SyncError::WalletError)?;

            // limit the range that checkpoints are manually added to the top MAX_REORG_ALLOWANCE scanned blocks for efficiency.
            // As we sync the chain tip first and have spend-before-sync, we will always choose anchors very close to chain
            // height and we will also never need to truncate to checkpoints lower than this height.
            let checkpoint_range = if scan_range.block_range().start > highest_scanned_height {
                let verification_window_start = scan_range
                    .block_range()
                    .end
                    .saturating_sub(MAX_REORG_ALLOWANCE);

                std::cmp::max(scan_range.block_range().start, verification_window_start)
                    ..scan_range.block_range().end
            } else if scan_range.block_range().end
                > highest_scanned_height.saturating_sub(MAX_REORG_ALLOWANCE) + 1
            {
                let verification_window_start =
                    highest_scanned_height.saturating_sub(MAX_REORG_ALLOWANCE) + 1;

                std::cmp::max(scan_range.block_range().start, verification_window_start)
                    ..scan_range.block_range().end
            } else {
                BlockHeight::from_u32(0)..BlockHeight::from_u32(0)
            };

            // in the case that sapling and/or orchard note commitments are not in an entire block there will be no retention
            // at that height. Therefore, to prevent anchor and truncate errors, checkpoints are manually added first and
            // copy the tree state from the previous checkpoint where the commitment tree has not changed as of that block.
            for checkpoint_height in
                u32::from(checkpoint_range.start)..u32::from(checkpoint_range.end)
            {
                let checkpoint_height = BlockHeight::from_u32(checkpoint_height);

                add_checkpoint::<
                    Sapling,
                    sapling_crypto::Node,
                    { sapling_crypto::NOTE_COMMITMENT_TREE_DEPTH },
                    { witness::SHARD_HEIGHT },
                >(
                    fetch_request_sender.clone(),
                    checkpoint_height,
                    &sapling_located_trees,
                    &mut shard_trees.sapling,
                )
                .await?;
                add_checkpoint::<
                    Orchard,
                    MerkleHashOrchard,
                    { orchard::NOTE_COMMITMENT_TREE_DEPTH as u8 },
                    { witness::SHARD_HEIGHT },
                >(
                    fetch_request_sender.clone(),
                    checkpoint_height,
                    &orchard_located_trees,
                    &mut shard_trees.orchard,
                )
                .await?;
            }

            for tree in sapling_located_trees {
                shard_trees
                    .sapling
                    .insert_tree(tree.subtree, tree.checkpoints)?;
            }
            for tree in orchard_located_trees {
                shard_trees
                    .orchard
                    .insert_tree(tree.subtree, tree.checkpoints)?;
            }

            Ok(())
        }
    }

    /// Removes all shard tree data above the given `block_height`.
    ///
    /// A `truncate_height` of zero should replace the shard trees with empty trees.
    fn truncate_shard_trees(
        &mut self,
        truncate_height: BlockHeight,
    ) -> Result<(), SyncError<Self::Error>> {
        if truncate_height == zcash_protocol::consensus::H0 {
            let shard_trees = self.get_shard_trees_mut().map_err(SyncError::WalletError)?;
            tracing::info!("Clearing shard trees.");
            shard_trees.sapling =
                ShardTree::new(MemoryShardStore::empty(), MAX_REORG_ALLOWANCE as usize);
            shard_trees.orchard =
                ShardTree::new(MemoryShardStore::empty(), MAX_REORG_ALLOWANCE as usize);
        } else {
            if !self
                .get_shard_trees_mut()
                .map_err(SyncError::WalletError)?
                .sapling
                .truncate_to_checkpoint(&truncate_height)?
            {
                tracing::error!("Sapling shard tree is broken! Beginning rescan.");
                return Err(SyncError::TruncationError(
                    truncate_height,
                    PoolType::SAPLING,
                ));
            }
            if !self
                .get_shard_trees_mut()
                .map_err(SyncError::WalletError)?
                .orchard
                .truncate_to_checkpoint(&truncate_height)?
            {
                tracing::error!("Sapling shard tree is broken! Beginning rescan.");
                return Err(SyncError::TruncationError(
                    truncate_height,
                    PoolType::ORCHARD,
                ));
            }
        }

        Ok(())
    }
}

// TODO: move into `update_shard_trees` trait method
async fn add_checkpoint<D, L, const DEPTH: u8, const SHARD_HEIGHT: u8>(
    fetch_request_sender: mpsc::UnboundedSender<FetchRequest>,
    checkpoint_height: BlockHeight,
    located_trees: &[LocatedTreeData<L>],
    shard_tree: &mut shardtree::ShardTree<
        shardtree::store::memory::MemoryShardStore<L, BlockHeight>,
        DEPTH,
        SHARD_HEIGHT,
    >,
) -> Result<(), ServerError>
where
    L: Clone + PartialEq + incrementalmerkletree::Hashable,
    D: SyncDomain,
{
    let checkpoint = if let Some((_, position)) = located_trees
        .iter()
        .flat_map(|tree| tree.checkpoints.iter())
        .find(|(height, _)| **height == checkpoint_height)
    {
        Checkpoint::at_position(*position)
    } else {
        let mut previous_checkpoint = None;
        shard_tree
            .store()
            .for_each_checkpoint(1_000, |height, checkpoint| {
                if *height == checkpoint_height - 1 {
                    previous_checkpoint = Some(checkpoint.clone());
                }
                Ok(())
            })
            .expect("infallible");

        let tree_state = if let Some(checkpoint) = previous_checkpoint {
            checkpoint.tree_state()
        } else {
            let frontiers =
                client::get_frontiers(fetch_request_sender.clone(), checkpoint_height).await?;
            let tree_size = match D::SHIELDED_PROTOCOL {
                ShieldedProtocol::Sapling => frontiers.final_sapling_tree().tree_size(),
                ShieldedProtocol::Orchard => frontiers.final_orchard_tree().tree_size(),
            };
            if tree_size == 0 {
                TreeState::Empty
            } else {
                TreeState::AtPosition(incrementalmerkletree::Position::from(tree_size - 1))
            }
        };

        Checkpoint::from_parts(tree_state, BTreeSet::new())
    };

    shard_tree
        .store_mut()
        .add_checkpoint(checkpoint_height, checkpoint)
        .expect("infallible");

    Ok(())
}
