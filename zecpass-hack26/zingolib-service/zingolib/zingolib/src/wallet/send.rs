//! This mod contains pieces of the impl `LightWallet` that are invoked during a send.

use std::ops::Range;

use nonempty::NonEmpty;

use zcash_client_backend::data_api::wallet::SpendingKeys;
use zcash_client_backend::proposal::Proposal;

use pepper_sync::sync::{ScanPriority, ScanRange};
use pepper_sync::wallet::NoteInterface;
use zcash_primitives::transaction::fees::zip317;
use zcash_protocol::consensus::{BlockHeight, Parameters as _};
use zcash_protocol::{ShieldedProtocol, TxId};

use super::LightWallet;
use super::error::{CalculateTransactionError, KeyError};

impl LightWallet {
    /// Creates and stores transaction from the given `proposal`, returning the txids for each calculated transaction.
    pub(crate) async fn calculate_transactions<NoteRef>(
        &mut self,
        proposal: Proposal<zip317::FeeRule, NoteRef>,
        sending_account: zip32::AccountId,
    ) -> Result<NonEmpty<TxId>, CalculateTransactionError<NoteRef>> {
        let calculated_txids = match proposal.steps().len() {
            1 => {
                self.create_proposed_transactions(proposal, sending_account)
                    .await?
            }
            2 if proposal.steps()[1]
                .transaction_request()
                .payments()
                .values()
                .any(|payment| {
                    matches!(
                        payment
                            .recipient_address()
                            .clone()
                            .convert_if_network::<zcash_keys::address::Address>(
                                self.chain_type.network_type()
                            ),
                        Ok(zcash_keys::address::Address::Tex(_))
                    )
                }) =>
            {
                self.create_proposed_transactions(proposal, sending_account)
                    .await?
            }

            _ => return Err(CalculateTransactionError::NonTexMultiStep),
        };
        self.save_required = true;

        Ok(calculated_txids)
    }

    async fn create_proposed_transactions<NoteRef>(
        &mut self,
        proposal: Proposal<zcash_primitives::transaction::fees::zip317::FeeRule, NoteRef>,
        sending_account: zip32::AccountId,
    ) -> Result<NonEmpty<TxId>, CalculateTransactionError<NoteRef>> {
        let chain_type = self.chain_type;
        let usk: zcash_keys::keys::UnifiedSpendingKey = self
            .unified_key_store
            .get(&sending_account)
            .ok_or(KeyError::NoAccountKeys)?
            .try_into()?;

        // TODO:  Remove fallible sapling operations from Orchard only sends.
        let (sapling_output, sapling_spend): (Vec<u8>, Vec<u8>) =
            crate::wallet::utils::read_sapling_params()
                .map_err(CalculateTransactionError::SaplingParams)?;
        let sapling_prover =
            zcash_proofs::prover::LocalTxProver::from_bytes(&sapling_spend, &sapling_output);
        zcash_client_backend::data_api::wallet::create_proposed_transactions(
            self,
            &chain_type,
            &sapling_prover,
            &sapling_prover,
            &SpendingKeys::new(usk),
            zcash_client_backend::wallet::OvkPolicy::Sender,
            &proposal,
            None,
        )
        .map_err(CalculateTransactionError::Calculation)
    }

    pub(crate) fn can_build_witness<N>(
        &self,
        note_height: BlockHeight,
        anchor_height: BlockHeight,
    ) -> bool
    where
        N: NoteInterface,
    {
        let Some(birthday) = self.sync_state.wallet_birthday() else {
            return false;
        };
        let scan_ranges = self.sync_state.scan_ranges();

        match N::SHIELDED_PROTOCOL {
            ShieldedProtocol::Orchard => check_note_shards_are_scanned(
                note_height,
                anchor_height,
                birthday,
                scan_ranges,
                self.sync_state.orchard_shard_ranges(),
            ),
            ShieldedProtocol::Sapling => check_note_shards_are_scanned(
                note_height,
                anchor_height,
                birthday,
                scan_ranges,
                self.sync_state.sapling_shard_ranges(),
            ),
        }
    }
}

fn check_note_shards_are_scanned(
    note_height: BlockHeight,
    anchor_height: BlockHeight,
    wallet_birthday: BlockHeight,
    scan_ranges: &[ScanRange],
    shard_ranges: &[Range<BlockHeight>],
) -> bool {
    let incomplete_shard_range = if let Some(shard_range) = shard_ranges.last() {
        shard_range.end - 1..anchor_height + 1
    } else {
        wallet_birthday..anchor_height + 1
    };
    let mut shard_ranges = shard_ranges.to_vec();
    shard_ranges.push(incomplete_shard_range);

    let mut scanned_ranges = scan_ranges
        .iter()
        .filter(|scan_range| {
            scan_range.priority() == ScanPriority::Scanned
                || scan_range.priority() == ScanPriority::ScannedWithoutMapping
                || scan_range.priority() == ScanPriority::RefetchingNullifiers
        })
        .cloned()
        .collect::<Vec<_>>();
    'main: loop {
        if scanned_ranges.is_empty() {
            break;
        }
        let mut peekable_ranges = scanned_ranges.iter().enumerate().peekable();
        while let Some((index, range)) = peekable_ranges.next() {
            if let Some((next_index, next_range)) = peekable_ranges.peek() {
                if range.block_range().end == next_range.block_range().start {
                    assert!(*next_index == index + 1);
                    scanned_ranges.splice(
                        index..=*next_index,
                        vec![ScanRange::from_parts(
                            Range {
                                start: range.block_range().start,
                                end: next_range.block_range().end,
                            },
                            ScanPriority::Scanned,
                        )],
                    );
                    continue 'main;
                }
            } else {
                break 'main;
            }
        }
    }

    // a single block may contain two shards at the boundary so we check both are scanned in this case
    shard_ranges
        .iter()
        .filter(|&shard_range| shard_range.contains(&note_height))
        .all(|note_shard_range| {
            scanned_ranges
                .iter()
                .map(ScanRange::block_range)
                .any(|block_range| {
                    block_range.contains(&(note_shard_range.end - 1))
                        && (block_range.contains(&note_shard_range.start)
                            || note_shard_range.start < wallet_birthday)
                })
        })
}

#[cfg(test)]
mod tests {
    use std::str::FromStr;

    use zcash_address::ZcashAddress;
    use zcash_client_backend::zip321::TransactionRequest;
    use zcash_protocol::memo::{Memo, MemoBytes};
    use zcash_protocol::value::Zatoshis;

    use crate::data::receivers::{Receivers, transaction_request_from_receivers};

    #[test]
    fn test_build_request() {
        let amount_1 = Zatoshis::const_from_u64(20000);
        let recipient_address_1 =
            ZcashAddress::try_from_encoded("utest17wwv8nuvdnpjsxtu6ndz6grys5x8wphcwtzmg75wkx607c7cue9qz5kfraqzc7k9dfscmylazj4nkwazjj26s9rhyjxm0dcqm837ykgh2suv0at9eegndh3kvtfjwp3hhhcgk55y9d2ys56zkw8aaamcrv9cy0alj0ndvd0wll4gxhrk9y4yy9q9yg8yssrencl63uznqnkv7mk3w05").unwrap();
        let memo_1 = None;

        let amount_2 = Zatoshis::const_from_u64(20000);
        let recipient_address_2 =
            ZcashAddress::try_from_encoded("utest17wwv8nuvdnpjsxtu6ndz6grys5x8wphcwtzmg75wkx607c7cue9qz5kfraqzc7k9dfscmylazj4nkwazjj26s9rhyjxm0dcqm837ykgh2suv0at9eegndh3kvtfjwp3hhhcgk55y9d2ys56zkw8aaamcrv9cy0alj0ndvd0wll4gxhrk9y4yy9q9yg8yssrencl63uznqnkv7mk3w05").unwrap();
        let memo_2 = Some(MemoBytes::from(
            Memo::from_str("the lake wavers along the beach").expect("string can memofy"),
        ));

        let rec: Receivers = vec![
            crate::data::receivers::Receiver {
                recipient_address: recipient_address_1,
                amount: amount_1,
                memo: memo_1,
            },
            crate::data::receivers::Receiver {
                recipient_address: recipient_address_2,
                amount: amount_2,
                memo: memo_2,
            },
        ];
        let request: TransactionRequest =
            transaction_request_from_receivers(rec).expect("rec can requestify");

        assert_eq!(
            request.total().expect("total").expect("amounts present"),
            (amount_1 + amount_2).expect("add")
        );
    }

    mod check_note_shards_are_scanned {
        use pepper_sync::sync::{ScanPriority, ScanRange};
        use zcash_protocol::consensus::BlockHeight;

        use crate::wallet::send::check_note_shards_are_scanned;

        #[test]
        fn birthday_within_note_shard_range() {
            let min_confirmations = 3;
            let wallet_birthday = BlockHeight::from_u32(10);
            let last_known_chain_height = BlockHeight::from_u32(202);
            let note_height = BlockHeight::from_u32(20);
            let anchor_height = last_known_chain_height + 1 - min_confirmations;
            let scan_ranges = vec![ScanRange::from_parts(
                wallet_birthday..last_known_chain_height + 1,
                ScanPriority::Scanned,
            )];
            let shard_ranges = vec![
                1.into()..51.into(),
                50.into()..101.into(),
                100.into()..151.into(),
            ];

            assert!(check_note_shards_are_scanned(
                note_height,
                anchor_height,
                wallet_birthday,
                &scan_ranges,
                &shard_ranges,
            ));
        }

        #[test]
        fn note_within_complete_shard() {
            let min_confirmations = 3;
            let wallet_birthday = BlockHeight::from_u32(10);
            let last_known_chain_height = BlockHeight::from_u32(202);
            let note_height = BlockHeight::from_u32(70);
            let anchor_height = last_known_chain_height + 1 - min_confirmations;
            let scan_ranges = vec![ScanRange::from_parts(
                wallet_birthday..last_known_chain_height + 1,
                ScanPriority::Scanned,
            )];
            let shard_ranges = vec![
                1.into()..51.into(),
                50.into()..101.into(),
                100.into()..151.into(),
            ];

            assert!(check_note_shards_are_scanned(
                note_height,
                anchor_height,
                wallet_birthday,
                &scan_ranges,
                &shard_ranges,
            ));
        }

        #[test]
        fn note_within_incomplete_shard() {
            let min_confirmations = 3;
            let wallet_birthday = BlockHeight::from_u32(10);
            let last_known_chain_height = BlockHeight::from_u32(202);
            let note_height = BlockHeight::from_u32(170);
            let anchor_height = last_known_chain_height + 1 - min_confirmations;
            let scan_ranges = vec![ScanRange::from_parts(
                wallet_birthday..last_known_chain_height + 1,
                ScanPriority::Scanned,
            )];
            let shard_ranges = vec![
                1.into()..51.into(),
                50.into()..101.into(),
                100.into()..151.into(),
            ];

            assert!(check_note_shards_are_scanned(
                note_height,
                anchor_height,
                wallet_birthday,
                &scan_ranges,
                &shard_ranges,
            ));
        }

        #[test]
        fn note_height_on_shard_boundary() {
            let min_confirmations = 3;
            let wallet_birthday = BlockHeight::from_u32(10);
            let last_known_chain_height = BlockHeight::from_u32(202);
            let note_height = BlockHeight::from_u32(100);
            let anchor_height = last_known_chain_height + 1 - min_confirmations;
            let scan_ranges = vec![ScanRange::from_parts(
                wallet_birthday..last_known_chain_height + 1,
                ScanPriority::Scanned,
            )];
            let shard_ranges = vec![
                1.into()..51.into(),
                50.into()..101.into(),
                100.into()..151.into(),
            ];

            assert!(check_note_shards_are_scanned(
                note_height,
                anchor_height,
                wallet_birthday,
                &scan_ranges,
                &shard_ranges,
            ));
        }
    }
}
