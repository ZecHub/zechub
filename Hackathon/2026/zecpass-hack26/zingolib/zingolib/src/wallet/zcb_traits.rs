use std::{collections::HashMap, convert::Infallible, num::NonZeroU32};

use secrecy::SecretVec;
use shardtree::{ShardTree, error::ShardTreeError, store::ShardStore};
use zcash_address::ZcashAddress;
use zcash_client_backend::{
    data_api::{
        Account, AccountBirthday, AccountPurpose, Balance, BlockMetadata, InputSource,
        NullifierQuery, ORCHARD_SHARD_HEIGHT, ReceivedNotes, ReceivedTransactionOutput,
        SAPLING_SHARD_HEIGHT, TargetValue, TransactionDataRequest, TransparentKeyOrigin,
        TransparentOutputFilter, WalletCommitmentTrees, WalletRead, WalletSummary, WalletUtxo,
        WalletWrite, Zip32Derivation,
        chain::{ChainState, CommitmentTreeRoot},
        error::FindAccountForAddressError,
        wallet::{ConfirmationsPolicy, TargetHeight},
    },
    wallet::{Exposure, NoteId, ReceivedNote, TransparentAddressMetadata, WalletTransparentOutput},
};
use zcash_keys::{address::UnifiedAddress, keys::UnifiedFullViewingKey};
use zcash_primitives::{
    block::BlockHash,
    transaction::{Transaction, TxId},
};
use zcash_protocol::{
    PoolType, ShieldedProtocol,
    consensus::{self, BlockHeight, Parameters},
    memo::Memo,
};
use zcash_transparent::address::TransparentAddress;
use zcash_transparent::bundle::{OutPoint, TxOut};
use zcash_transparent::keys::TransparentKeyScope;

use super::{LightWallet, error::WalletError, output::OutputRef};
use crate::wallet::output::RemainingNeeded;
use pepper_sync::{
    error::SyncError,
    keys::transparent::{self, TransparentScope},
    wallet::{
        KeyIdInterface, NoteInterface, OrchardNote, OrchardShardStore, OutputId, OutputInterface,
        SaplingNote, SaplingShardStore, traits::SyncWallet,
    },
};
use zingo_status::confirmation_status::ConfirmationStatus;

pub struct ZingoAccount(zip32::AccountId, UnifiedFullViewingKey);

impl Account for ZingoAccount {
    type AccountId = zip32::AccountId;

    fn id(&self) -> Self::AccountId {
        self.0
    }

    fn name(&self) -> Option<&str> {
        None
    }

    fn source(&self) -> &zcash_client_backend::data_api::AccountSource {
        unimplemented!()
    }

    fn ufvk(&self) -> Option<&UnifiedFullViewingKey> {
        Some(&self.1)
    }

    fn uivk(&self) -> zcash_keys::keys::UnifiedIncomingViewingKey {
        unimplemented!()
    }

    fn birthday_height(&self) -> BlockHeight {
        unimplemented!()
    }
}

impl WalletRead for LightWallet {
    type Error = WalletError;
    type AccountId = zip32::AccountId;
    type Account = ZingoAccount;

    fn get_account_ids(&self) -> Result<Vec<Self::AccountId>, Self::Error> {
        Ok(self.unified_key_store.keys().copied().collect())
    }

    fn get_account(
        &self,
        _account_id: Self::AccountId,
    ) -> Result<Option<Self::Account>, Self::Error> {
        unimplemented!()
    }

    fn get_derived_account(
        &self,
        _account_id: &Zip32Derivation,
    ) -> Result<Option<Self::Account>, Self::Error> {
        unimplemented!()
    }

    fn validate_seed(
        &self,
        _account_id: Self::AccountId,
        _seed: &secrecy::SecretVec<u8>,
    ) -> Result<bool, Self::Error> {
        unimplemented!()
    }

    fn seed_relevance_to_derived_accounts(
        &self,
        _seed: &secrecy::SecretVec<u8>,
    ) -> Result<zcash_client_backend::data_api::SeedRelevance<Self::AccountId>, Self::Error> {
        unimplemented!()
    }

    fn get_account_for_ufvk(
        &self,
        ufvk: &UnifiedFullViewingKey,
    ) -> Result<Option<Self::Account>, Self::Error> {
        let Some((account_id, unified_key)) =
            self.unified_key_store.iter().find(|(_, unified_key)| {
                UnifiedFullViewingKey::try_from(*unified_key).is_ok_and(|account_ufvk| {
                    account_ufvk.encode(&self.chain_type) == *ufvk.encode(&self.chain_type)
                })
            })
        else {
            return Ok(None);
        };

        Ok(Some(ZingoAccount(*account_id, unified_key.try_into()?)))
    }

    fn list_addresses(
        &self,
        _account: Self::AccountId,
    ) -> Result<Vec<zcash_client_backend::data_api::AddressInfo>, Self::Error> {
        unimplemented!()
    }

    fn get_last_generated_address_matching(
        &self,
        _account: Self::AccountId,
        _address_filter: zcash_keys::keys::UnifiedAddressRequest,
    ) -> Result<Option<UnifiedAddress>, Self::Error> {
        unimplemented!()
    }

    fn get_account_birthday(&self, _account: Self::AccountId) -> Result<BlockHeight, Self::Error> {
        unimplemented!()
    }

    fn get_wallet_birthday(&self) -> Result<Option<BlockHeight>, Self::Error> {
        unimplemented!()
    }

    fn get_wallet_summary(
        &self,
        _min_confirmations: ConfirmationsPolicy,
    ) -> Result<Option<WalletSummary<Self::AccountId>>, Self::Error> {
        unimplemented!()
    }

    fn chain_height(&self) -> Result<Option<BlockHeight>, Self::Error> {
        Ok(self.sync_state.last_known_chain_height())
    }

    fn get_block_hash(&self, _block_height: BlockHeight) -> Result<Option<BlockHash>, Self::Error> {
        unimplemented!()
    }

    fn block_metadata(&self, _height: BlockHeight) -> Result<Option<BlockMetadata>, Self::Error> {
        unimplemented!()
    }

    fn block_fully_scanned(&self) -> Result<Option<BlockMetadata>, Self::Error> {
        unimplemented!()
    }

    fn get_max_height_hash(&self) -> Result<Option<(BlockHeight, BlockHash)>, Self::Error> {
        unimplemented!()
    }

    fn block_max_scanned(&self) -> Result<Option<BlockMetadata>, Self::Error> {
        unimplemented!()
    }

    fn suggest_scan_ranges(
        &self,
    ) -> Result<Vec<zcash_client_backend::data_api::scanning::ScanRange>, Self::Error> {
        unimplemented!()
    }

    fn get_target_and_anchor_heights(
        &self,
        min_confirmations: NonZeroU32,
    ) -> Result<Option<(TargetHeight, BlockHeight)>, Self::Error> {
        let target_height = if let Some(height) = self.sync_state.last_known_chain_height() {
            height + 1
        } else {
            return Ok(None);
        };

        let max_checkpoint_height = self
            .shard_trees
            .sapling
            .store()
            .max_checkpoint_id()
            .expect("infallible")
            .expect("should be at least 1 checkpoint");

        let anchor_height = std::cmp::min(
            max_checkpoint_height,
            target_height - min_confirmations.get(),
        );

        Ok(Some((
            target_height.into(),
            std::cmp::max(1.into(), anchor_height),
        )))
    }

    fn get_tx_height(&self, txid: TxId) -> Result<Option<BlockHeight>, Self::Error> {
        Ok(self
            .wallet_transactions
            .get(&txid)
            .and_then(|transaction| transaction.status().get_confirmed_height()))
    }

    fn get_unified_full_viewing_keys(
        &self,
    ) -> Result<HashMap<Self::AccountId, UnifiedFullViewingKey>, Self::Error> {
        unimplemented!()
    }

    fn get_memo(&self, _note_id: NoteId) -> Result<Option<Memo>, Self::Error> {
        unimplemented!()
    }

    fn get_transaction(&self, _txid: TxId) -> Result<Option<Transaction>, Self::Error> {
        unimplemented!()
    }

    fn get_sapling_nullifiers(
        &self,
        _query: NullifierQuery,
    ) -> Result<Vec<(Self::AccountId, sapling_crypto::Nullifier)>, Self::Error> {
        unimplemented!()
    }

    fn get_orchard_nullifiers(
        &self,
        _query: NullifierQuery,
    ) -> Result<Vec<(Self::AccountId, orchard::note::Nullifier)>, Self::Error> {
        unimplemented!()
    }

    fn get_transparent_receivers(
        &self,
        account: Self::AccountId,
        // TODO: only get internal receivers if true
        _include_change: bool,
        _include_standalone_receivers: bool,
    ) -> Result<HashMap<TransparentAddress, TransparentAddressMetadata>, Self::Error> {
        self.transparent_addresses
            .iter()
            .filter(|(address_id, _)| {
                address_id.account_id() == account && address_id.scope() != TransparentScope::Refund
            })
            .map(|(address_id, encoded_address)| {
                let address = ZcashAddress::try_from_encoded(encoded_address)?
                    .convert_if_network::<TransparentAddress>(self.chain_type.network_type())
                    .expect("incorrect network should be checked on wallet load");
                let address_metadata = TransparentAddressMetadata::derived(
                    address_id.scope().into(),
                    address_id.address_index(),
                    Exposure::CannotKnow, // TODO: add exposure to wallet transparent address metadata
                    None,
                );

                Ok((address, address_metadata))
            })
            .collect()
    }

    fn get_ephemeral_transparent_receivers(
        &self,
        account: Self::AccountId,
        _exposure_depth: u32,
        _exclude_used: bool,
    ) -> Result<HashMap<TransparentAddress, TransparentAddressMetadata>, Self::Error> {
        self.transparent_addresses
            .iter()
            .filter(|(address_id, _)| {
                address_id.account_id() == account && address_id.scope() == TransparentScope::Refund
            })
            .map(|(address_id, encoded_address)| {
                let address = ZcashAddress::try_from_encoded(encoded_address)?
                    .convert_if_network::<TransparentAddress>(self.chain_type.network_type())
                    .expect("incorrect network should be checked on wallet load");
                let address_metadata = TransparentAddressMetadata::derived(
                    address_id.scope().into(),
                    address_id.address_index(),
                    Exposure::CannotKnow, // TODO: add exposure to wallet transparent address metadata
                    None,
                );

                Ok((address, address_metadata))
            })
            .collect()
    }

    fn get_transparent_balances(
        &self,
        _account: Self::AccountId,
        _max_height: TargetHeight,
        _confirmations_policy: ConfirmationsPolicy,
    ) -> Result<HashMap<TransparentAddress, (TransparentKeyOrigin, Balance)>, Self::Error> {
        unimplemented!()
    }

    fn get_transparent_address_metadata(
        &self,
        account: Self::AccountId,
        address: &TransparentAddress,
    ) -> Result<Option<TransparentAddressMetadata>, Self::Error> {
        Ok(
            if let Some(result) = self
                .get_transparent_receivers(account, true, true)?
                .get(address)
            {
                Some(result.clone())
            } else {
                self.get_ephemeral_transparent_receivers(account, u32::MAX, false)?
                    .get(address)
                    .cloned()
            },
        )
    }

    fn utxo_query_height(
        &self,
        _account: Self::AccountId,
    ) -> Result<zcash_protocol::consensus::BlockHeight, Self::Error> {
        unimplemented!()
    }

    fn transaction_data_requests(&self) -> Result<Vec<TransactionDataRequest>, Self::Error> {
        unimplemented!()
    }

    fn find_account_for_address<P: Parameters>(
        &self,
        _params: &P,
        _address: &zcash_keys::address::Address,
    ) -> Result<Option<Self::AccountId>, FindAccountForAddressError<Self::Error>> {
        unimplemented!()
    }

    fn get_received_outputs(
        &self,
        _txid: TxId,
        _target_height: TargetHeight,
        _confirmations_policy: ConfirmationsPolicy,
    ) -> Result<Vec<ReceivedTransactionOutput>, Self::Error> {
        unimplemented!()
    }
}

impl WalletWrite for LightWallet {
    type UtxoRef = u32;

    fn create_account(
        &mut self,
        _account_name: &str,
        _seed: &SecretVec<u8>,
        _birthday: &AccountBirthday,
        _key_source: Option<&str>,
    ) -> Result<(Self::AccountId, zcash_keys::keys::UnifiedSpendingKey), Self::Error> {
        unimplemented!()
    }

    fn import_account_hd(
        &mut self,
        _account_name: &str,
        _seed: &SecretVec<u8>,
        _account_index: zip32::AccountId,
        _birthday: &AccountBirthday,
        _key_source: Option<&str>,
    ) -> Result<(Self::Account, zcash_keys::keys::UnifiedSpendingKey), Self::Error> {
        unimplemented!()
    }

    fn import_account_ufvk(
        &mut self,
        _account_name: &str,
        _unified_key: &UnifiedFullViewingKey,
        _birthday: &AccountBirthday,
        _purpose: AccountPurpose,
        _key_source: Option<&str>,
    ) -> Result<Self::Account, Self::Error> {
        unimplemented!()
    }

    fn delete_account(&mut self, _account: Self::AccountId) -> Result<(), Self::Error> {
        unimplemented!()
    }

    fn get_next_available_address(
        &mut self,
        _account: Self::AccountId,
        _request: zcash_keys::keys::UnifiedAddressRequest,
    ) -> Result<Option<(UnifiedAddress, zip32::DiversifierIndex)>, Self::Error> {
        unimplemented!()
    }

    fn get_address_for_index(
        &mut self,
        _account: Self::AccountId,
        _diversifier_index: zip32::DiversifierIndex,
        _request: zcash_keys::keys::UnifiedAddressRequest,
    ) -> Result<Option<UnifiedAddress>, Self::Error> {
        unimplemented!()
    }

    fn update_chain_tip(&mut self, _tip_height: BlockHeight) -> Result<(), Self::Error> {
        unimplemented!()
    }

    fn put_blocks(
        &mut self,
        _from_state: &zcash_client_backend::data_api::chain::ChainState,
        _blocks: Vec<zcash_client_backend::data_api::ScannedBlock<Self::AccountId>>,
    ) -> Result<(), Self::Error> {
        unimplemented!()
    }

    fn put_received_transparent_utxo(
        &mut self,
        _output: &WalletTransparentOutput,
    ) -> Result<Self::UtxoRef, Self::Error> {
        unimplemented!()
    }

    fn store_decrypted_tx(
        &mut self,
        _received_tx: zcash_client_backend::data_api::DecryptedTransaction<
            Transaction,
            Self::AccountId,
        >,
    ) -> Result<(), Self::Error> {
        unimplemented!()
    }

    fn set_tx_trust(&mut self, _txid: TxId, _trusted: bool) -> Result<(), Self::Error> {
        unimplemented!()
    }

    fn store_transactions_to_be_sent(
        &mut self,
        transactions: &[zcash_client_backend::data_api::SentTransaction<Self::AccountId>],
    ) -> Result<(), Self::Error> {
        let chain_type = self.chain_type;

        for sent_transaction in transactions {
            // this is a workaround as Transaction does not implement Clone
            let mut transaction_bytes = vec![];
            sent_transaction
                .tx()
                .write(&mut transaction_bytes)
                .map_err(WalletError::TransactionWrite)?;
            let transaction = Transaction::read(
                transaction_bytes.as_slice(),
                consensus::BranchId::for_height(
                    &self.chain_type,
                    sent_transaction.target_height().into(),
                ),
            )
            .map_err(WalletError::TransactionRead)?;

            match pepper_sync::scan_pending_transaction(
                &chain_type,
                &SyncWallet::get_unified_full_viewing_keys(self)?,
                self,
                transaction,
                ConfirmationStatus::Calculated(sent_transaction.target_height().into()),
                sent_transaction.created().unix_timestamp() as u32,
            ) {
                Ok(()) => (),
                Err(SyncError::ScanError(e)) => return Err(e.into()),
                Err(SyncError::WalletError(e)) => return Err(e),
                Err(_) => {
                    panic!("`scan_pending_transactions` should only return scan or wallet errors")
                }
            }
        }

        Ok(())
    }

    fn truncate_to_height(&mut self, _max_height: BlockHeight) -> Result<BlockHeight, Self::Error> {
        unimplemented!()
    }

    fn truncate_to_chain_state(&mut self, _chain_state: ChainState) -> Result<(), Self::Error> {
        unimplemented!()
    }

    fn rewind_to_height(&mut self, _max_height: BlockHeight) -> Result<BlockHeight, Self::Error> {
        unimplemented!()
    }

    fn reserve_next_n_ephemeral_addresses(
        &mut self,
        account_id: Self::AccountId,
        n: usize,
    ) -> Result<Vec<(TransparentAddress, TransparentAddressMetadata)>, Self::Error> {
        Ok(self
            .generate_refund_addresses(n, account_id)?
            .into_iter()
            .map(|(address_id, address)| {
                (
                    address,
                    TransparentAddressMetadata::derived(
                        TransparentKeyScope::EPHEMERAL,
                        address_id.address_index(),
                        Exposure::CannotKnow, // TODO: add exposure to wallet transparent address metadata
                        None,
                    ),
                )
            })
            .collect())
    }

    fn set_transaction_status(
        &mut self,
        _txid: TxId,
        _status: zcash_client_backend::data_api::TransactionStatus,
    ) -> Result<(), Self::Error> {
        unimplemented!()
    }

    fn notify_address_checked(
        &mut self,
        _request: zcash_client_backend::data_api::TransactionsInvolvingAddress,
        _as_of_height: BlockHeight,
    ) -> Result<(), Self::Error> {
        unimplemented!()
    }
}

impl WalletCommitmentTrees for LightWallet {
    type Error = Infallible;
    type SaplingShardStore<'a> = SaplingShardStore;
    type OrchardShardStore<'a> = OrchardShardStore;

    fn with_sapling_tree_mut<F, A, E>(&mut self, mut callback: F) -> Result<A, E>
    where
        for<'a> F: FnMut(
            &'a mut ShardTree<
                Self::SaplingShardStore<'a>,
                { sapling_crypto::NOTE_COMMITMENT_TREE_DEPTH },
                { SAPLING_SHARD_HEIGHT },
            >,
        ) -> Result<A, E>,
        E: From<ShardTreeError<Self::Error>>,
    {
        callback(&mut self.shard_trees.sapling)
    }

    fn put_sapling_subtree_roots(
        &mut self,
        start_index: u64,
        roots: &[CommitmentTreeRoot<sapling_crypto::Node>],
    ) -> Result<(), ShardTreeError<Self::Error>> {
        self.with_sapling_tree_mut(|t| {
            for (root, i) in roots.iter().zip(0u64..) {
                let root_addr = incrementalmerkletree::Address::from_parts(
                    SAPLING_SHARD_HEIGHT.into(),
                    start_index + i,
                );
                t.insert(root_addr, *root.root_hash())?;
            }
            Ok::<_, ShardTreeError<Self::Error>>(())
        })?;

        Ok(())
    }

    fn with_orchard_tree_mut<F, A, E>(&mut self, mut callback: F) -> Result<A, E>
    where
        for<'a> F: FnMut(
            &'a mut ShardTree<
                Self::OrchardShardStore<'a>,
                { orchard::NOTE_COMMITMENT_TREE_DEPTH as u8 },
                { ORCHARD_SHARD_HEIGHT },
            >,
        ) -> Result<A, E>,
        E: From<ShardTreeError<Self::Error>>,
    {
        callback(&mut self.shard_trees.orchard)
    }

    fn put_orchard_subtree_roots(
        &mut self,
        start_index: u64,
        roots: &[CommitmentTreeRoot<orchard::tree::MerkleHashOrchard>],
    ) -> Result<(), ShardTreeError<Self::Error>> {
        self.with_orchard_tree_mut(|t| {
            for (root, i) in roots.iter().zip(0u64..) {
                let root_addr = incrementalmerkletree::Address::from_parts(
                    ORCHARD_SHARD_HEIGHT.into(),
                    start_index + i,
                );
                t.insert(root_addr, *root.root_hash())?;
            }
            Ok::<_, ShardTreeError<Self::Error>>(())
        })?;

        Ok(())
    }
}

impl InputSource for LightWallet {
    type Error = WalletError;
    type AccountId = zip32::AccountId;
    type NoteRef = OutputRef;

    fn get_spendable_note(
        &self,
        _txid: &TxId,
        _protocol: ShieldedProtocol,
        _index: u32,
        _target_height: TargetHeight,
    ) -> Result<
        Option<
            zcash_client_backend::wallet::ReceivedNote<
                Self::NoteRef,
                zcash_client_backend::wallet::Note,
            >,
        >,
        Self::Error,
    > {
        unimplemented!()
    }

    fn select_spendable_notes(
        &self,
        account: Self::AccountId,
        target_value: TargetValue,
        sources: &[ShieldedProtocol],
        _target_height: TargetHeight,
        confirmations_policy: ConfirmationsPolicy,
        exclude: &[Self::NoteRef],
    ) -> Result<ReceivedNotes<Self::NoteRef>, Self::Error> {
        let (_, anchor_height) = self
            .get_target_and_anchor_heights(confirmations_policy.trusted())
            .expect("infallible")
            .ok_or(WalletError::NoSyncData)?;

        let mut exclude_sapling = exclude
            .iter()
            .filter(|&note_id| note_id.pool_type() == PoolType::SAPLING)
            .map(|note_id| OutputId::new(note_id.txid(), note_id.output_index()))
            .collect::<Vec<_>>();
        let mut exclude_orchard = exclude
            .iter()
            .filter(|&note_id| note_id.pool_type() == PoolType::ORCHARD)
            .map(|note_id| OutputId::new(note_id.txid(), note_id.output_index()))
            .collect::<Vec<_>>();

        let (selected_sapling_notes, selected_orchard_notes) = match target_value {
            TargetValue::AtLeast(at_least_value) => {
                let mut remaining_value_needed = RemainingNeeded::Positive(at_least_value);

                // prioritises selecting spendable notes that are guaranteed to be unspent first
                let mut selected_sapling_notes = Vec::new();
                let mut selected_orchard_notes = Vec::new();
                for include_potentially_spent_notes in [false, true] {
                    // prioritise note selection for the given `sources`
                    if sources.contains(&ShieldedProtocol::Sapling) {
                        let notes = self
                            .select_spendable_notes_by_pool::<SaplingNote>(
                                &mut remaining_value_needed,
                                anchor_height,
                                &exclude_sapling,
                                account,
                                include_potentially_spent_notes,
                            )?
                            .into_iter()
                            .cloned()
                            .collect::<Vec<_>>();
                        exclude_sapling.extend(notes.iter().map(OutputInterface::output_id));
                        selected_sapling_notes.extend(notes);
                    }
                    if sources.contains(&ShieldedProtocol::Orchard) {
                        let notes = self
                            .select_spendable_notes_by_pool::<OrchardNote>(
                                &mut remaining_value_needed,
                                anchor_height,
                                &exclude_orchard,
                                account,
                                include_potentially_spent_notes,
                            )?
                            .into_iter()
                            .cloned()
                            .collect::<Vec<_>>();
                        exclude_orchard.extend(notes.iter().map(OutputInterface::output_id));
                        selected_orchard_notes.extend(notes);
                    }

                    let notes = self
                        .select_spendable_notes_by_pool::<SaplingNote>(
                            &mut remaining_value_needed,
                            anchor_height,
                            &exclude_sapling,
                            account,
                            include_potentially_spent_notes,
                        )?
                        .into_iter()
                        .cloned()
                        .collect::<Vec<_>>();
                    exclude_sapling.extend(notes.iter().map(OutputInterface::output_id));
                    selected_sapling_notes.extend(notes);

                    let notes = self
                        .select_spendable_notes_by_pool::<OrchardNote>(
                            &mut remaining_value_needed,
                            anchor_height,
                            &exclude_orchard,
                            account,
                            include_potentially_spent_notes,
                        )?
                        .into_iter()
                        .cloned()
                        .collect::<Vec<_>>();
                    exclude_orchard.extend(notes.iter().map(OutputInterface::output_id));
                    selected_orchard_notes.extend(notes);
                }
                (selected_sapling_notes, selected_orchard_notes)
            }
            TargetValue::AllFunds(max_spend_mode) => {
                // FIXME: this is not the criteria for `MaxSpendMode::Everything`. this should return an error if sync is not complete in this case.
                let include_potentially_spent_notes = matches!(
                    max_spend_mode,
                    zcash_client_backend::data_api::MaxSpendMode::Everything
                );
                (
                    // FIXME: note filters implemented in `spendable_notes_by_pool` have been missed here such as filtering dust
                    self.spendable_notes::<SaplingNote>(
                        anchor_height,
                        &exclude_sapling,
                        account,
                        include_potentially_spent_notes,
                    )?
                    .into_iter()
                    .cloned()
                    .collect::<Vec<_>>(),
                    self.spendable_notes::<OrchardNote>(
                        anchor_height,
                        &exclude_orchard,
                        account,
                        include_potentially_spent_notes,
                    )?
                    .into_iter()
                    .cloned()
                    .collect::<Vec<_>>(),
                )
            }
        };

        /* TODO: Priority
        if selected
            .iter()
            .filter(|n| n.0.protocol() == ShieldedProtocol::Sapling)
            .count()
            == 1
            || selected
                .iter()
                .filter(|n| n.0.protocol() == ShieldedProtocol::Orchard)
                .count()
                == 1
        {
            // since we maxed out the target value with only one note in at least one Shielded Pool
            //  we have an option to sweep a dust note into a grace input.
            // we will sweep the biggest dust note we can
            if !dust_notes.is_empty() {
                sweep_dust_into_grace(&mut selected, dust_notes);
            }
            // TODO: re-introduce this optimisation, current bug is that we don't select a note from the same pool as the single selected note
            // (and we don't have information about the pool(s) the outputs are being created for)
            // this is ok for dust as it is excluded if the dust is from a pool where grace inputs are available. however, this doesn't work for
            // non-dust
            //
            // } else {
            //     // we have no extra dust, but we can still save a marginal fee by adding the next smallest note to change
            //     if let Some(smallest_note) = unselected.pop() {
            //         selected.push(smallest_note);
            //     };
            // }
        }
        */

        let sapling_recieved_notes = selected_sapling_notes
            .iter()
            .map(|note| {
                ReceivedNote::from_parts(
                    OutputRef::new(
                        OutputId::new(note.output_id().txid(), note.output_id().output_index()),
                        PoolType::SAPLING,
                    ),
                    note.output_id().txid(),
                    note.output_id().output_index(),
                    note.note().clone(),
                    note.key_id().scope,
                    note.position()
                        .expect("note selection should filter on notes with positions"),
                    None, // mined_height. TODO: How should we use this here?
                    None, // max_shielding_input_height. TODO: How should we use this here?
                )
            })
            .collect::<Vec<_>>();
        let orchard_recieved_notes = selected_orchard_notes
            .iter()
            .map(|note| {
                ReceivedNote::from_parts(
                    OutputRef::new(
                        OutputId::new(note.output_id().txid(), note.output_id().output_index()),
                        PoolType::ORCHARD,
                    ),
                    note.output_id().txid(),
                    note.output_id().output_index(),
                    *note.note(),
                    note.key_id().scope,
                    note.position()
                        .expect("note selection should filter on notes with positions"),
                    None, // mined_height. TODO: How should we use this here?
                    None, // max_shielding_input_height. TODO: How should we use this here?
                )
            })
            .collect::<Vec<_>>();

        Ok(ReceivedNotes::new(
            sapling_recieved_notes,
            orchard_recieved_notes,
        ))
    }

    fn get_account_metadata(
        &self,
        _account: Self::AccountId,
        _selector: &zcash_client_backend::data_api::NoteFilter,
        _target_height: TargetHeight,
        _exclude: &[Self::NoteRef],
    ) -> Result<zcash_client_backend::data_api::AccountMeta, Self::Error> {
        unimplemented!()
    }

    fn get_unspent_transparent_output(
        &self,
        _outpoint: &OutPoint,
        _target_height: TargetHeight,
    ) -> Result<Option<WalletUtxo>, Self::Error> {
        unimplemented!()
    }

    fn get_spendable_transparent_outputs(
        &self,
        address: &TransparentAddress,
        target_height: TargetHeight,
        confirmations_policy: ConfirmationsPolicy,
        _output_filter: TransparentOutputFilter,
    ) -> Result<Vec<WalletUtxo>, Self::Error> {
        let address = transparent::encode_address(&self.chain_type, *address);

        // TODO: add recipient key scope metadata
        Ok(self
            .spendable_transparent_coins(
                target_height.into(),
                confirmations_policy.allow_zero_conf_shielding(),
                false,
            )
            .into_iter()
            .filter(|&output| output.address() == address)
            .filter_map(|output| {
                WalletTransparentOutput::from_parts(
                    output.output_id().into(),
                    TxOut::new(
                        output.value().try_into().expect("value from checked type"),
                        output.script().clone(),
                    ),
                    Some(
                        self.output_transaction(output)
                            .status()
                            .get_confirmed_height()
                            .expect("output must be confirmed in this scope"),
                    ),
                )
                .map(|transparent_output| WalletUtxo::new(transparent_output, None))
            })
            .collect())
    }

    fn select_unspent_notes(
        &self,
        _account: Self::AccountId,
        _sources: &[ShieldedProtocol],
        _target_height: TargetHeight,
        _exclude: &[Self::NoteRef],
    ) -> Result<ReceivedNotes<Self::NoteRef>, Self::Error> {
        unimplemented!()
    }
}
