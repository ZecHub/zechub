//! Trait implementations for interfacing [`crate::wallet::LightWallet`] with [`pepper_sync`] sync engine.

use std::collections::{BTreeMap, HashMap};

use pepper_sync::{
    keys::transparent::TransparentAddressId,
    wallet::{
        NullifierMap, OutputId, ScanTarget, ShardTrees, SyncState, WalletBlock,
        traits::{
            SyncBlocks, SyncNullifiers, SyncOutPoints, SyncShardTrees, SyncTransactions, SyncWallet,
        },
    },
};
use zcash_keys::{address::UnifiedAddress, keys::UnifiedFullViewingKey};
use zcash_protocol::consensus::BlockHeight;
use zip32::{AccountId, DiversifierIndex};

use super::{
    LightWallet,
    error::{KeyError, WalletError},
    keys::unified::UnifiedAddressId,
};

impl SyncWallet for LightWallet {
    type Error = WalletError;

    fn get_birthday(&self) -> Result<BlockHeight, Self::Error> {
        Ok(self.birthday())
    }

    fn get_sync_state(&self) -> Result<&SyncState, Self::Error> {
        Ok(&self.sync_state)
    }

    fn get_sync_state_mut(&mut self) -> Result<&mut SyncState, Self::Error> {
        Ok(&mut self.sync_state)
    }

    fn get_unified_full_viewing_keys(
        &self,
    ) -> Result<HashMap<AccountId, UnifiedFullViewingKey>, Self::Error> {
        self.unified_key_store
            .iter()
            .map(|(account_id, key)| Ok((*account_id, UnifiedFullViewingKey::try_from(key)?)))
            .collect()
    }

    // The unified address index for a given account is equal to the orchard diversifier index used to derive the orchard address.
    fn add_orchard_address(
        &mut self,
        account_id: zip32::AccountId,
        address: orchard::Address,
        diversifier_index: DiversifierIndex,
    ) -> Result<(), Self::Error> {
        let Ok(address_index) = u32::try_from(diversifier_index) else {
            return Ok(());
        };
        let address_id = UnifiedAddressId {
            account_id,
            address_index,
        };
        let unified_address = if let Some(wallet_address) = self.unified_addresses.get(&address_id)
        {
            if wallet_address.orchard() == Some(&address) {
                return Ok(());
            }

            UnifiedAddress::from_receivers(Some(address), wallet_address.sapling().copied(), None)
                .expect("guaranteed to have at least 1 shielded receiver")
        } else {
            UnifiedAddress::from_receivers(Some(address), None, None)
                .expect("guaranteed to have at least 1 shielded receiver")
        };
        self.unified_addresses.insert(address_id, unified_address);

        Ok(())
    }

    // The unified address index for a given account is equal to the (n-1)th valid sapling diversifier incrementing
    // from a diversifier index of 0.
    // For example, if the sapling address is associated with the 10th valid diversifier, this address will be added
    // to the unified address of index 9.
    // Unified address discovery for sapling addresses is limited to a maximum sapling diversifier index of 2^16 as
    // very high indexes become computationally expensive.
    fn add_sapling_address(
        &mut self,
        account_id: zip32::AccountId,
        address: sapling_crypto::PaymentAddress,
        diversifier_index: DiversifierIndex,
    ) -> Result<(), Self::Error> {
        if u128::from(diversifier_index) > 2 ^ 16 {
            return Ok(());
        }

        let address_index = self
            .unified_key_store
            .get(&account_id)
            .ok_or(KeyError::NoAccountKeys)?
            .determine_nth_valid_sapling_diversifier(diversifier_index)?
            - 1;
        let address_id = UnifiedAddressId {
            account_id,
            address_index,
        };
        let unified_address = if let Some(wallet_address) = self.unified_addresses.get(&address_id)
        {
            if wallet_address.sapling() == Some(&address) {
                return Ok(());
            }

            UnifiedAddress::from_receivers(wallet_address.orchard().copied(), Some(address), None)
                .expect("guaranteed to have at least 1 shielded receiver")
        } else {
            UnifiedAddress::from_receivers(None, Some(address), None)
                .expect("guaranteed to have at least 1 shielded receiver")
        };
        self.unified_addresses.insert(address_id, unified_address);

        Ok(())
    }

    fn get_transparent_addresses(
        &self,
    ) -> Result<&BTreeMap<TransparentAddressId, String>, Self::Error> {
        Ok(&self.transparent_addresses)
    }

    fn get_transparent_addresses_mut(
        &mut self,
    ) -> Result<&mut BTreeMap<TransparentAddressId, String>, Self::Error> {
        Ok(&mut self.transparent_addresses)
    }

    fn set_save_flag(&mut self) -> Result<(), Self::Error> {
        self.save_required = true;
        Ok(())
    }
}

impl SyncBlocks for LightWallet {
    fn get_wallet_block(&self, block_height: BlockHeight) -> Result<WalletBlock, Self::Error> {
        self.wallet_blocks
            .get(&block_height)
            .cloned()
            .ok_or(WalletError::BlockNotFound(block_height))
    }

    fn get_wallet_blocks_mut(
        &mut self,
    ) -> Result<&mut BTreeMap<BlockHeight, WalletBlock>, Self::Error> {
        Ok(&mut self.wallet_blocks)
    }
}

impl SyncTransactions for LightWallet {
    fn get_wallet_transactions(
        &self,
    ) -> Result<
        &HashMap<zcash_primitives::transaction::TxId, pepper_sync::wallet::WalletTransaction>,
        Self::Error,
    > {
        Ok(&self.wallet_transactions)
    }

    fn get_wallet_transactions_mut(
        &mut self,
    ) -> Result<
        &mut HashMap<zcash_primitives::transaction::TxId, pepper_sync::wallet::WalletTransaction>,
        Self::Error,
    > {
        Ok(&mut self.wallet_transactions)
    }
}

impl SyncNullifiers for LightWallet {
    fn get_nullifiers(&self) -> Result<&NullifierMap, Self::Error> {
        Ok(&self.nullifier_map)
    }

    fn get_nullifiers_mut(&mut self) -> Result<&mut NullifierMap, Self::Error> {
        Ok(&mut self.nullifier_map)
    }
}

impl SyncOutPoints for LightWallet {
    fn get_outpoints(&self) -> Result<&BTreeMap<OutputId, ScanTarget>, Self::Error> {
        Ok(&self.outpoint_map)
    }

    fn get_outpoints_mut(&mut self) -> Result<&mut BTreeMap<OutputId, ScanTarget>, Self::Error> {
        Ok(&mut self.outpoint_map)
    }
}

impl SyncShardTrees for LightWallet {
    fn get_shard_trees(&self) -> Result<&ShardTrees, Self::Error> {
        Ok(&self.shard_trees)
    }

    fn get_shard_trees_mut(&mut self) -> Result<&mut ShardTrees, Self::Error> {
        Ok(&mut self.shard_trees)
    }
}
