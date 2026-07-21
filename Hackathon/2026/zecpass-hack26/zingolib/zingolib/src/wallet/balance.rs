//! Balance methods and types for `crate::wallet::LightWallet`.

use pepper_sync::wallet::{
    KeyIdInterface, NoteInterface, OrchardNote, OutputInterface, SaplingNote, TransparentCoin,
    WalletTransaction,
};
use zcash_client_backend::data_api::WalletRead;
use zcash_primitives::transaction::fees::zip317::MARGINAL_FEE;
use zcash_protocol::{PoolType, value::Zatoshis};

use crate::utils;

use super::{
    LightWallet,
    error::{BalanceError, KeyError},
    keys::unified::UnifiedKeyStore,
};

/// Minimum number of confirmations required for transparent coinbase outputs.
/// Per Zcash consensus rules (ZIP-213), transparent coinbase outputs cannot be
/// spent until they are 100 blocks deep.
const COINBASE_MATURITY: u32 = 100;

/// Balance for a wallet account.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct AccountBalance {
    /// Sum of unspent orchard note values in confirmed blocks excluding dust.
    pub confirmed_orchard_balance: Option<Zatoshis>,
    /// Sum of unspent orchard note values in unconfirmed blocks excluding dust.
    pub unconfirmed_orchard_balance: Option<Zatoshis>,
    /// Sum of confirmed and unconfirmed orchard balances.
    pub total_orchard_balance: Option<Zatoshis>,

    /// Sum of unspent sapling note values in confirmed blocks excluding dust.
    pub confirmed_sapling_balance: Option<Zatoshis>,
    /// Sum of unspent sapling note values in unconfirmed blocks excluding dust.
    pub unconfirmed_sapling_balance: Option<Zatoshis>,
    /// Sum of confirmed and unconfirmed sapling balances.
    pub total_sapling_balance: Option<Zatoshis>,

    /// Sum of unspent transparent coin values in confirmed blocks excluding dust.
    pub confirmed_transparent_balance: Option<Zatoshis>,
    /// Sum of unspent transparent coin values in unconfirmed blocks excluding dust.
    pub unconfirmed_transparent_balance: Option<Zatoshis>,
    /// Sum of confirmed and unconfirmed transparent balances.
    pub total_transparent_balance: Option<Zatoshis>,
}

impl std::fmt::Display for AccountBalance {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "[
    confirmed_orchard_balance: {}
    unconfirmed_orchard_balance: {}
    total_orchard_balance: {}

    confirmed_sapling_balance: {}
    unconfirmed_sapling_balance: {}
    total_sapling_balance: {}

    confirmed_transparent_balance: {}
    unconfirmed_transparent_balance: {}
    total_transparent_balance: {}
]",
            self.confirmed_orchard_balance
                .map_or("no view capability".to_string(), |zats| {
                    format_zatoshis(zats)
                }),
            self.unconfirmed_orchard_balance
                .map_or("no view capability".to_string(), |zats| {
                    format_zatoshis(zats)
                }),
            self.total_orchard_balance
                .map_or("no view capability".to_string(), |zats| {
                    format_zatoshis(zats)
                }),
            self.confirmed_sapling_balance
                .map_or("no view capability".to_string(), |zats| {
                    format_zatoshis(zats)
                }),
            self.unconfirmed_sapling_balance
                .map_or("no view capability".to_string(), |zats| {
                    format_zatoshis(zats)
                }),
            self.total_sapling_balance
                .map_or("no view capability".to_string(), |zats| {
                    format_zatoshis(zats)
                }),
            self.confirmed_transparent_balance
                .map_or("no view capability".to_string(), |zats| {
                    format_zatoshis(zats)
                }),
            self.unconfirmed_transparent_balance
                .map_or("no view capability".to_string(), |zats| {
                    format_zatoshis(zats)
                }),
            self.total_transparent_balance
                .map_or("no view capability".to_string(), |zats| {
                    format_zatoshis(zats)
                }),
        )
    }
}

impl From<AccountBalance> for json::JsonValue {
    fn from(value: AccountBalance) -> Self {
        json::object! {
            "confirmed_orchard_balance" => value.confirmed_orchard_balance.map(zcash_protocol::value::Zatoshis::into_u64),
            "unconfirmed_orchard_balance" => value.unconfirmed_orchard_balance.map(zcash_protocol::value::Zatoshis::into_u64),
            "total_orchard_balance" => value.total_orchard_balance.map(zcash_protocol::value::Zatoshis::into_u64),
            "confirmed_sapling_balance" => value.confirmed_sapling_balance.map(zcash_protocol::value::Zatoshis::into_u64),
            "unconfirmed_sapling_balance" => value.unconfirmed_sapling_balance.map(zcash_protocol::value::Zatoshis::into_u64),
            "total_sapling_balance" => value.total_sapling_balance.map(zcash_protocol::value::Zatoshis::into_u64),
            "confirmed_transparent_balance" => value.confirmed_transparent_balance.map(zcash_protocol::value::Zatoshis::into_u64),
            "unconfirmed_transparent_balance" => value.unconfirmed_transparent_balance.map(zcash_protocol::value::Zatoshis::into_u64),
            "total_transparent_balance" => value.total_transparent_balance.map(zcash_protocol::value::Zatoshis::into_u64),
        }
    }
}

fn format_zatoshis(zatoshis: Zatoshis) -> String {
    let zats = zatoshis.into_u64().to_string();
    let digits: Vec<char> = zats.chars().rev().collect();
    let mut formatted = String::new();

    for (index, digit) in digits.iter().enumerate() {
        if index > 0 && index % 3 == 0 {
            formatted.push('_');
        }
        formatted.push(*digit);
    }

    formatted.chars().rev().collect()
}

impl LightWallet {
    /// Checks if a transparent output has reached coinbase maturity.
    ///
    /// Returns `true` if the output can be included in balance calculations:
    /// - For non-transparent outputs: always `true`
    /// - For regular transparent outputs: always `true`
    /// - For coinbase transparent outputs: `true` only if >= 100 confirmations
    fn is_transparent_output_mature<Op: OutputInterface>(
        &self,
        transaction: &WalletTransaction,
    ) -> bool {
        // Only transparent outputs need coinbase maturity check
        if Op::POOL_TYPE != PoolType::Transparent {
            return true;
        }

        // Check if this is a coinbase transaction
        let is_coinbase = transaction
            .transaction()
            .transparent_bundle()
            .is_some_and(|bundle| bundle.is_coinbase());

        if is_coinbase {
            let current_height = self
                .sync_state
                .last_known_chain_height()
                .unwrap_or(self.birthday);
            let tx_height = transaction.status().get_height();

            // Work with u32 values
            let current_height_u32: u32 = current_height.into();
            let tx_height_u32: u32 = tx_height.into();

            if current_height_u32 < tx_height_u32 {
                return false;
            }

            let confirmations = current_height_u32 - tx_height_u32;
            confirmations >= COINBASE_MATURITY
        } else {
            true
        }
    }

    /// Returns account balance.
    pub fn account_balance(
        &self,
        account_id: zip32::AccountId,
    ) -> Result<AccountBalance, BalanceError> {
        let confirmed_orchard_balance =
            match self.confirmed_balance_excluding_dust::<OrchardNote>(account_id) {
                Ok(zats) => Some(zats),
                Err(BalanceError::KeyError(KeyError::NoViewCapability)) => None,
                Err(e) => return Err(e),
            };
        let unconfirmed_orchard_balance =
            match self.unconfirmed_balance_excluding_dust::<OrchardNote>(account_id) {
                Ok(zats) => Some(zats),
                Err(BalanceError::KeyError(KeyError::NoViewCapability)) => None,
                Err(e) => return Err(e),
            };
        let total_orchard_balance =
            confirmed_orchard_balance.and_then(|confirmed| unconfirmed_orchard_balance + confirmed);

        let confirmed_sapling_balance =
            match self.confirmed_balance_excluding_dust::<SaplingNote>(account_id) {
                Ok(zats) => Some(zats),
                Err(BalanceError::KeyError(KeyError::NoViewCapability)) => None,
                Err(e) => return Err(e),
            };
        let unconfirmed_sapling_balance =
            match self.unconfirmed_balance_excluding_dust::<SaplingNote>(account_id) {
                Ok(zats) => Some(zats),
                Err(BalanceError::KeyError(KeyError::NoViewCapability)) => None,
                Err(e) => return Err(e),
            };
        let total_sapling_balance =
            confirmed_sapling_balance.and_then(|confirmed| unconfirmed_sapling_balance + confirmed);

        let confirmed_transparent_balance =
            match self.confirmed_balance_excluding_dust::<TransparentCoin>(account_id) {
                Ok(zats) => Some(zats),
                Err(BalanceError::KeyError(KeyError::NoViewCapability)) => None,
                Err(e) => return Err(e),
            };
        let unconfirmed_transparent_balance =
            match self.unconfirmed_balance_excluding_dust::<TransparentCoin>(account_id) {
                Ok(zats) => Some(zats),
                Err(BalanceError::KeyError(KeyError::NoViewCapability)) => None,
                Err(e) => return Err(e),
            };
        let total_transparent_balance = confirmed_transparent_balance
            .and_then(|confirmed| unconfirmed_transparent_balance + confirmed);

        Ok(AccountBalance {
            confirmed_orchard_balance,
            unconfirmed_orchard_balance,
            total_orchard_balance,
            confirmed_sapling_balance,
            unconfirmed_sapling_balance,
            total_sapling_balance,
            confirmed_transparent_balance,
            unconfirmed_transparent_balance,
            total_transparent_balance,
        })
    }

    /// Returns the total balance of the all unspent outputs of a given pool type and `account_id` matching the output
    /// and transaction criteria specified by the `filter_function`.
    ///
    /// # Error
    ///
    /// Returns an error if:
    /// - no keys are found for the given `account_id`
    /// - the UFVK does not have viewing capability for the given pool type
    /// - the balance summation exceeds the valid range of zatoshis
    pub fn get_filtered_balance<Op, F>(
        &self,
        filter_function: F,
        account_id: zip32::AccountId,
    ) -> Result<Zatoshis, BalanceError>
    where
        Op: OutputInterface,
        F: Fn(&Op, &WalletTransaction) -> bool,
    {
        match &self
            .unified_key_store
            .get(&account_id)
            .ok_or(KeyError::NoAccountKeys)?
        {
            UnifiedKeyStore::Spend(_) => (),
            UnifiedKeyStore::View(ufvk) => match Op::POOL_TYPE {
                PoolType::Transparent => {
                    if ufvk.transparent().is_none() {
                        return Err(KeyError::NoViewCapability.into());
                    }
                }
                PoolType::SAPLING => {
                    if ufvk.sapling().is_none() {
                        return Err(KeyError::NoViewCapability.into());
                    }
                }
                PoolType::ORCHARD => {
                    if ufvk.orchard().is_none() {
                        return Err(KeyError::NoViewCapability.into());
                    }
                }
            },
            UnifiedKeyStore::Empty => return Err(KeyError::NoViewCapability.into()),
        }

        Ok(utils::conversion::zatoshis_from_u64(
            self.wallet_transactions
                .values()
                .fold(0, |acc, transaction| {
                    acc + Op::transaction_outputs(transaction)
                        .iter()
                        .filter(|&output| {
                            filter_function(output, transaction)
                                && output.spending_transaction().is_none()
                                && output.key_id().account_id() == account_id
                        })
                        .map(pepper_sync::wallet::OutputInterface::value)
                        .sum::<u64>()
                }),
        )?)
    }

    /// Returns the total balance of the all unspent outputs of a given pool type and `account_id` matching the output
    /// and transaction criteria specified by the mutable `filter_function`.
    ///
    /// # Error
    ///
    /// Returns an error if:
    /// - no keys are found for the given `account_id`
    /// - the UFVK does not have viewing capability for the given pool type
    /// - the balance summation exceeds the valid range of zatoshis
    pub fn get_filtered_balance_mut<Op, F>(
        &self,
        mut filter_function: F,
        account_id: zip32::AccountId,
    ) -> Result<Zatoshis, BalanceError>
    where
        Op: OutputInterface,
        F: FnMut(&Op, &WalletTransaction) -> bool,
    {
        match &self
            .unified_key_store
            .get(&account_id)
            .ok_or(KeyError::NoAccountKeys)?
        {
            UnifiedKeyStore::Spend(_) => (),
            UnifiedKeyStore::View(ufvk) => match Op::POOL_TYPE {
                PoolType::Transparent => {
                    if ufvk.transparent().is_none() {
                        return Err(KeyError::NoViewCapability.into());
                    }
                }
                PoolType::SAPLING => {
                    if ufvk.sapling().is_none() {
                        return Err(KeyError::NoViewCapability.into());
                    }
                }
                PoolType::ORCHARD => {
                    if ufvk.orchard().is_none() {
                        return Err(KeyError::NoViewCapability.into());
                    }
                }
            },
            UnifiedKeyStore::Empty => return Err(KeyError::NoViewCapability.into()),
        }

        Ok(utils::conversion::zatoshis_from_u64(
            self.wallet_transactions
                .values()
                .fold(0, |acc, transaction| {
                    acc + Op::transaction_outputs(transaction)
                        .iter()
                        .filter(|&output| {
                            filter_function(output, transaction)
                                && output.spending_transaction().is_none()
                                && output.key_id().account_id() == account_id
                        })
                        .map(pepper_sync::wallet::OutputInterface::value)
                        .sum::<u64>()
                }),
        )?)
    }

    /// Returns total balance of unspent notes in confirmed blocks for a given shielded pool and `account_id`.
    ///
    /// # Error
    ///
    /// Returns an error if:
    /// - no keys are found for the given `account_id`
    /// - the UFVK does not have viewing capability for the given pool type
    /// - the balance summation exceeds the valid range of zatoshis
    pub fn confirmed_balance<Op>(
        &self,
        account_id: zip32::AccountId,
    ) -> Result<Zatoshis, BalanceError>
    where
        Op: OutputInterface,
    {
        self.get_filtered_balance::<Op, _>(
            |_output, transaction: &WalletTransaction| {
                transaction.status().is_confirmed()
                    && self.is_transparent_output_mature::<Op>(transaction)
            },
            account_id,
        )
    }

    /// Returns total balance of unspent notes in confirmed blocks for a given shielded pool and `account_id`,
    /// excluding any notes with value less than marginal fee (`5_000`).
    ///
    /// # Error
    ///
    /// Returns an error if:
    /// - no keys are found for the given `account_id`
    /// - the UFVK does not have viewing capability for the given pool type
    /// - the balance summation exceeds the valid range of zatoshis
    pub fn confirmed_balance_excluding_dust<Op>(
        &self,
        account_id: zip32::AccountId,
    ) -> Result<Zatoshis, BalanceError>
    where
        Op: OutputInterface,
    {
        self.get_filtered_balance::<Op, _>(
            |output, transaction: &WalletTransaction| {
                Op::value(output) > MARGINAL_FEE.into_u64()
                    && transaction.status().is_confirmed()
                    && self.is_transparent_output_mature::<Op>(transaction)
            },
            account_id,
        )
    }

    /// Returns total balance of unspent notes not yet confirmed on the block chain for a given shielded pool and
    /// `account_id`.
    ///
    /// # Error
    ///
    /// Returns an error if:
    /// - no keys are found for the given `account_id`
    /// - the UFVK does not have viewing capability for the given pool type
    /// - the balance summation exceeds the valid range of zatoshis
    pub fn unconfirmed_balance<Op>(
        &self,
        account_id: zip32::AccountId,
    ) -> Result<Zatoshis, BalanceError>
    where
        Op: OutputInterface,
    {
        self.get_filtered_balance::<Op, _>(
            |_, transaction: &WalletTransaction| transaction.status().is_pending(),
            account_id,
        )
    }

    /// Returns total balance of unspent notes not yet confirmed on the block chain for a given shielded pool and
    /// `account_id`, excluding any notes with value less than marginal fee (`5_000`).
    ///
    /// # Error
    ///
    /// Returns an error if:
    /// - no keys are found for the given `account_id`
    /// - the UFVK does not have viewing capability for the given pool type
    /// - the balance summation exceeds the valid range of zatoshis
    pub fn unconfirmed_balance_excluding_dust<Op>(
        &self,
        account_id: zip32::AccountId,
    ) -> Result<Zatoshis, BalanceError>
    where
        Op: OutputInterface,
    {
        self.get_filtered_balance::<Op, _>(
            |note, transaction: &WalletTransaction| {
                Op::value(note) > MARGINAL_FEE.into_u64() && transaction.status().is_pending()
            },
            account_id,
        )
    }

    /// Returns total balance of spendable notes for a given shielded pool and `account_id`.
    ///
    /// Spendable notes are:
    /// - confirmed
    /// - not dust (note value larger than `5_000` zats)
    /// - the wallet can build a witness for the note's commitment
    /// - satisfy the number of minimum confirmations set by the wallet
    /// - the nullifier derived from the note does not appear in a transaction input (spend) on chain
    ///
    /// If `include_potentially_spent_notes` is `true`, notes will be included even if the wallet's current sync state
    /// is incomplete and it is unknown if the note has already been spent (the nullifier has not appeared on chain *yet*).
    ///
    /// # Error
    ///
    /// Returns an error if:
    /// - no keys are found for the given `account_id`
    /// - the UFVK does not have viewing capability for the given pool type
    /// - the balance summation exceeds the valid range of zatoshis
    pub fn spendable_balance<N>(
        &self,
        account_id: zip32::AccountId,
        include_potentially_spent_notes: bool,
    ) -> Result<Zatoshis, BalanceError>
    where
        N: NoteInterface,
    {
        let Some(spend_horizon) = self.spend_horizon(false) else {
            return Ok(Zatoshis::ZERO);
        };
        let Some((_, anchor_height)) = self
            .get_target_and_anchor_heights(self.wallet_settings.min_confirmations)
            .expect("infallible")
        else {
            return Ok(Zatoshis::ZERO);
        };

        let spendable_balance = self.get_filtered_balance::<N, _>(
            |note, transaction: &WalletTransaction| {
                N::value(note) > MARGINAL_FEE.into_u64()
                    && transaction.status().is_confirmed()
                    && transaction.status().get_height() <= anchor_height
                    && note.position().is_some()
                    && self.can_build_witness::<N>(transaction.status().get_height(), anchor_height)
                    && (include_potentially_spent_notes
                        || self.note_spends_confirmed(
                            transaction.status().get_height(),
                            spend_horizon,
                            note.refetch_nullifier_ranges(),
                        ))
            },
            account_id,
        )?;

        Ok(spendable_balance)
    }

    /// Returns total spendable balance of all shielded pools of a given `account_id`.
    ///
    /// See [`Self::spendable_balance`] for more information.
    ///
    /// # Error
    ///
    /// Returns an error if:
    /// - no keys are found for the given `account_id`
    /// - the balance summation exceeds the valid range of zatoshis
    pub fn shielded_spendable_balance(
        &self,
        account_id: zip32::AccountId,
        include_potentially_spent_notes: bool,
    ) -> Result<Zatoshis, BalanceError> {
        let orchard_balance = match self
            .spendable_balance::<OrchardNote>(account_id, include_potentially_spent_notes)
        {
            Ok(zats) => Ok(zats),
            Err(BalanceError::KeyError(KeyError::NoViewCapability)) => Ok(Zatoshis::ZERO),
            Err(e) => Err(e),
        }?;
        let sapling_balance = match self
            .spendable_balance::<SaplingNote>(account_id, include_potentially_spent_notes)
        {
            Ok(zats) => Ok(zats),
            Err(BalanceError::KeyError(KeyError::NoViewCapability)) => Ok(Zatoshis::ZERO),
            Err(e) => Err(e),
        }?;

        (orchard_balance + sapling_balance).ok_or(BalanceError::Overflow)
    }
}

#[cfg(any(test, feature = "testutils"))]
mod test {

    // FIXME: zingo2 rewrite as an integration test
    // #[tokio::test]
    // async fn confirmed_balance_excluding_dust() {
    //     let wallet = LightWallet::new(
    //         ZingoConfigBuilder::default().create().chain,
    //         WalletBase::FreshEntropy,
    //         1.into(),
    //     )
    //     .unwrap();
    //     let confirmed_tx_record = TransactionRecordBuilder::default()
    //         .status(ConfirmationStatus::Confirmed(80.into()))
    //         .transparent_outputs(TransparentOutputBuilder::default())
    //         .sapling_notes(SaplingNoteBuilder::default())
    //         .sapling_notes(SaplingNoteBuilder::default())
    //         .sapling_notes(
    //             SaplingNoteBuilder::default()
    //                 .note(
    //                     SaplingCryptoNoteBuilder::default()
    //                         .value(sapling_crypto::value::NoteValue::from_raw(3_000))
    //                         .clone(),
    //                 )
    //                 .clone(),
    //         )
    //         .orchard_notes(OrchardNoteBuilder::default())
    //         .orchard_notes(OrchardNoteBuilder::default())
    //         .orchard_notes(
    //             OrchardNoteBuilder::default()
    //                 .note(
    //                     OrchardCryptoNoteBuilder::default()
    //                         .value(orchard::value::NoteValue::from_raw(5_001))
    //                         .clone(),
    //                 )
    //                 .clone(),
    //         )
    //         .orchard_notes(
    //             OrchardNoteBuilder::default()
    //                 .note(
    //                     OrchardCryptoNoteBuilder::default()
    //                         .value(orchard::value::NoteValue::from_raw(2_000))
    //                         .clone(),
    //                 )
    //                 .clone(),
    //         )
    //         .build();
    //     let mempool_tx_record = TransactionRecordBuilder::default()
    //         .status(ConfirmationStatus::Mempool(95.into()))
    //         .transparent_outputs(TransparentOutputBuilder::default())
    //         .sapling_notes(SaplingNoteBuilder::default())
    //         .orchard_notes(OrchardNoteBuilder::default())
    //         .build();
    //     {
    //         let mut tx_map = wallet
    //             .transaction_context
    //             .transaction_metadata_set
    //             .write()
    //             .await;
    //         tx_map
    //             .transaction_records_by_id
    //             .insert_transaction_record(confirmed_tx_record);
    //         tx_map
    //             .transaction_records_by_id
    //             .insert_transaction_record(mempool_tx_record);
    //     }

    //     assert_eq!(
    //         wallet.confirmed_balance_excluding_dust::<Sapling>().await,
    //         Some(400_000)
    //     );
    //     assert_eq!(
    //         wallet.confirmed_balance_excluding_dust::<Orchard>().await,
    //         Some(1_605_001)
    //     );
    // }
}
