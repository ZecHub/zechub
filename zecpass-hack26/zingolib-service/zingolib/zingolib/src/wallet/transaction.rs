use zcash_primitives::transaction::TxId;
use zcash_protocol::value::Zatoshis;

use pepper_sync::wallet::{
    OrchardNote, OutgoingNoteInterface, OutputId, OutputInterface, SaplingNote, TransparentCoin,
    WalletTransaction,
};

use super::LightWallet;
use super::error::{FeeError, SpendError};
use super::summary::data::{SendType, TransactionKind};
use crate::get_zennies_for_zingo_address;
use crate::wallet::error::WalletError;

impl LightWallet {
    /// Gets all outputs of a given type spent in the given `transaction`.
    pub(super) fn find_spends<Op: OutputInterface>(
        &self,
        transaction: &WalletTransaction,
        fail_on_miss: bool,
    ) -> Result<Vec<&Op>, SpendError> {
        let spends = self
            .wallet_outputs::<Op>()
            .into_iter()
            .filter_map(|output| {
                output.spending_transaction().and_then(|txid| {
                    if txid == transaction.txid() {
                        let spend = Op::transaction_inputs(transaction)
                            .into_iter()
                            .find(|&input| output.spend_link() == Some(input.clone()));

                        if spend.is_none() {
                            return Some(Err(SpendError::IncorrectSpendingTransaction {
                                output_id: output.output_id(),
                                txid,
                            }));
                        }

                        Some(Ok(output))
                    } else {
                        None
                    }
                })
            })
            .collect::<Result<Vec<_>, SpendError>>()?;

        if fail_on_miss {
            let spend_links = spends
                .iter()
                .filter_map(|&spend| spend.spend_link())
                .collect::<Vec<_>>();

            for input in Op::transaction_inputs(transaction) {
                if !spend_links.contains(input) {
                    return Err(SpendError::SpendNotFound {
                        pool: Op::POOL_TYPE,
                        txid: transaction.txid(),
                        spend: format!("{input:?}"),
                    });
                }
            }
        }

        Ok(spends)
    }

    /// Calculate the fee for a transaction in the wallet.
    ///
    /// Fails if transparent spends are not found in the wallet.
    // TODO: write integration test
    pub fn calculate_transaction_fee(
        &self,
        transaction: &WalletTransaction,
    ) -> Result<Zatoshis, FeeError> {
        Ok(transaction
            .transaction()
            .fee_paid(|outpoint| -> Result<Option<Zatoshis>, FeeError> {
                let outpoint = OutputId::from(outpoint);
                let prevout = self
                    .wallet_outputs::<TransparentCoin>()
                    .into_iter()
                    .find(|&output| output.output_id() == outpoint)
                    .ok_or(FeeError::SpendNotFound {
                        txid: transaction.txid(),
                        spend: format!("{outpoint:?}"),
                    })?;

                Ok(Some(
                    Zatoshis::from_u64(prevout.value()).expect("value converted from checked type"),
                ))
            })?
            .expect("fee should not be negative"))
    }

    /// Removes failed transaction with the given `txid` from the wallet.
    ///
    /// # Error
    ///
    /// Returns error if transaction is not `Failed` or does not exist in the wallet.
    pub fn remove_failed_transaction(&mut self, txid: TxId) -> Result<(), WalletError> {
        match self
            .wallet_transactions
            .get(&txid)
            .map(|tx| tx.status().is_failed())
        {
            Some(true) => {
                self.wallet_transactions.remove(&txid);
                self.save_required = true;
                Ok(())
            }
            Some(false) => Err(WalletError::RemovalError),
            None => Err(WalletError::TransactionNotFound(txid)),
        }
    }

    /// Determine the kind of transaction from the current state of wallet data.
    pub(crate) fn transaction_kind(
        &self,
        transaction: &WalletTransaction,
    ) -> Result<TransactionKind, SpendError> {
        let zfz_address = get_zennies_for_zingo_address(self.chain_type);

        let transparent_spends = self.find_spends::<TransparentCoin>(transaction, false)?;
        let sapling_spends = self.find_spends::<SaplingNote>(transaction, false)?;
        let orchard_spends = self.find_spends::<OrchardNote>(transaction, false)?;

        if transparent_spends.is_empty()
            && sapling_spends.is_empty()
            && orchard_spends.is_empty()
            && transaction.outgoing_sapling_notes().is_empty()
            && transaction.outgoing_orchard_notes().is_empty()
        {
            Ok(TransactionKind::Received)
        } else if !transparent_spends.is_empty()
            && sapling_spends.is_empty()
            && orchard_spends.is_empty()
            && transaction.outgoing_sapling_notes().is_empty()
            && transaction.outgoing_orchard_notes().is_empty()
            && (!transaction.orchard_notes().is_empty() || !transaction.sapling_notes().is_empty())
        {
            Ok(TransactionKind::Sent(SendType::Shield))
        } else if transaction
            .transaction()
            .transparent_bundle()
            .is_none_or(|bundle| bundle.vout.len() == transaction.transparent_coins().len())
            && transaction
                .outgoing_sapling_notes()
                .iter()
                .all(|outgoing_note| {
                    self.is_sapling_address_in_unified_addresses(&outgoing_note.note().recipient())
                        .is_some()
                        || outgoing_note.key_id().scope == zip32::Scope::Internal
                        || outgoing_note
                            .encoded_recipient_full_unified_address(&self.chain_type)
                            .is_some_and(|unified_address| unified_address == *zfz_address)
                })
            && transaction
                .outgoing_orchard_notes()
                .iter()
                .all(|outgoing_note| {
                    self.is_orchard_address_in_unified_addresses(&outgoing_note.note().recipient())
                        .is_some()
                        || outgoing_note.key_id().scope == zip32::Scope::Internal
                        || outgoing_note
                            .encoded_recipient_full_unified_address(&self.chain_type)
                            .is_some_and(|unified_address| unified_address == *zfz_address)
                })
        {
            Ok(TransactionKind::Sent(SendType::SendToSelf))
        } else {
            Ok(TransactionKind::Sent(SendType::Send))
        }
    }
}

#[cfg(test)]
mod tests {
    use pepper_sync::wallet::WalletTransaction;
    use zcash_primitives::transaction::TxId;
    use zingo_status::confirmation_status::ConfirmationStatus;
    use zingo_test_vectors::seeds::HOSPITAL_MUSEUM_SEED;

    use crate::{
        config::{ChainType, WalletConfig},
        testutils::default_test_wallet_settings,
        wallet::{LightWallet, error::WalletError},
    };

    fn test_wallet() -> LightWallet {
        LightWallet::new(
            ChainType::Mainnet,
            WalletConfig::MnemonicPhrase {
                mnemonic_phrase: HOSPITAL_MUSEUM_SEED.to_string(),
                no_of_accounts: 1.try_into().unwrap(),
                birthday: 419_200,
                wallet_settings: default_test_wallet_settings(),
            },
        )
        .unwrap()
    }

    #[test]
    fn remove_failed_transaction_not_found() {
        let mut wallet = test_wallet();
        let txid = TxId::from_bytes([0u8; 32]);

        let result = wallet.remove_failed_transaction(txid);

        assert!(matches!(result, Err(WalletError::TransactionNotFound(id)) if id == txid));
    }

    #[test]
    fn remove_failed_transaction_not_failed() {
        let mut wallet = test_wallet();
        let txid = TxId::from_bytes([1u8; 32]);
        let status = ConfirmationStatus::Calculated(1.into());
        wallet
            .wallet_transactions
            .insert(txid, WalletTransaction::new_for_test(txid, status));

        let result = wallet.remove_failed_transaction(txid);

        assert!(matches!(result, Err(WalletError::RemovalError)));
        assert!(wallet.wallet_transactions.contains_key(&txid));
    }

    #[test]
    fn remove_failed_transaction_success() {
        let mut wallet = test_wallet();
        let txid = TxId::from_bytes([2u8; 32]);
        let status = ConfirmationStatus::Failed(1.into());
        wallet
            .wallet_transactions
            .insert(txid, WalletTransaction::new_for_test(txid, status));

        let result = wallet.remove_failed_transaction(txid);

        assert!(result.is_ok());
        assert!(!wallet.wallet_transactions.contains_key(&txid));
        assert!(wallet.save_required);
    }
}
