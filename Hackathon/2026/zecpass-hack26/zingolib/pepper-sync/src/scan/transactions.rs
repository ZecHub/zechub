use std::collections::{BTreeMap, BTreeSet, HashMap};

use tokio::sync::mpsc;

use incrementalmerkletree::Position;
use orchard::{
    Action,
    keys::Scope,
    note_encryption::OrchardDomain,
    primitives::redpallas::{Signature, SpendAuth},
};
use sapling_crypto::{
    bundle::{GrothProofBytes, OutputDescription},
    note_encryption::SaplingDomain,
};
use zcash_keys::{
    address::UnifiedAddress,
    keys::{OutgoingViewingKey, UnifiedFullViewingKey},
};
use zcash_note_encryption::{BatchDomain, Domain, ENC_CIPHERTEXT_SIZE, ShieldedOutput};
use zcash_primitives::transaction::{Transaction, TxId};
use zcash_protocol::{
    ShieldedProtocol,
    consensus::{self, BlockHeight, NetworkConstants},
    memo::Memo,
};

use zcash_transparent::bundle::{
    Authorization as TransparentAuthorization, Bundle as TransparentBundle, TxIn,
};
use zingo_memo::ParsedMemo;
use zingo_status::confirmation_status::ConfirmationStatus;
use zip32::AccountId;

use crate::{
    client::{self, FetchRequest},
    error::ScanError,
    keys::{self, KeyId, transparent::TransparentAddressId},
    wallet::{
        NullifierMap, OrchardNote, OutgoingNote, OutgoingNoteInterface, OutgoingOrchardNote,
        OutgoingSaplingNote, OutputId, SaplingNote, ScanTarget, TransparentCoin, WalletBlock,
        WalletNote, WalletTransaction,
    },
};

use super::DecryptedNoteData;

trait ShieldedOutputExt<D: Domain>: ShieldedOutput<D, ENC_CIPHERTEXT_SIZE> {
    fn out_ciphertext(&self) -> [u8; 80];

    fn value_commitment(&self) -> D::ValueCommitment;
}

impl<A> ShieldedOutputExt<OrchardDomain> for Action<A> {
    fn out_ciphertext(&self) -> [u8; 80] {
        self.encrypted_note().out_ciphertext
    }

    fn value_commitment(&self) -> <OrchardDomain as Domain>::ValueCommitment {
        self.cv_net().clone()
    }
}

impl<Proof> ShieldedOutputExt<SaplingDomain> for OutputDescription<Proof> {
    fn out_ciphertext(&self) -> [u8; 80] {
        *self.out_ciphertext()
    }

    fn value_commitment(&self) -> <SaplingDomain as Domain>::ValueCommitment {
        self.cv().clone()
    }
}

#[allow(clippy::too_many_arguments)]
pub(crate) async fn scan_transactions(
    fetch_request_sender: mpsc::UnboundedSender<FetchRequest>,
    consensus_parameters: &impl consensus::Parameters,
    ufvks: &HashMap<AccountId, UnifiedFullViewingKey>,
    scan_targets: BTreeSet<ScanTarget>,
    decrypted_note_data: DecryptedNoteData,
    wallet_blocks: &BTreeMap<BlockHeight, WalletBlock>,
    outpoint_map: &mut BTreeMap<OutputId, ScanTarget>,
    transparent_addresses: HashMap<String, TransparentAddressId>,
) -> Result<HashMap<TxId, WalletTransaction>, ScanError> {
    let mut wallet_transactions = HashMap::with_capacity(scan_targets.len());

    for scan_target in scan_targets {
        if scan_target.txid == TxId::from_bytes([0u8; 32]) {
            continue;
        }

        let (transaction, block_height) = client::get_transaction_and_block_height(
            fetch_request_sender.clone(),
            consensus_parameters,
            scan_target.txid,
        )
        .await?;

        if transaction.txid() != scan_target.txid {
            #[cfg(feature = "darkside_test")]
            tracing::error!(
                "server returned incorrect txid.\ntxid: {}\nserver reported: {}",
                scan_target.txid,
                transaction.txid()
            );

            #[cfg(not(feature = "darkside_test"))]
            return Err(ScanError::IncorrectTxid {
                txid_requested: scan_target.txid,
                txid_returned: transaction.txid(),
            });
        }

        let wallet_block = if let Some(wallet_block) = wallet_blocks.get(&block_height) {
            wallet_block.clone()
        } else {
            WalletBlock::from_compact_block(
                consensus_parameters,
                fetch_request_sender.clone(),
                &client::get_compact_block(fetch_request_sender.clone(), block_height).await?,
            )
            .await?
        };

        let confirmation_status = ConfirmationStatus::Confirmed(block_height);
        let wallet_transaction = scan_transaction(
            consensus_parameters,
            ufvks,
            scan_target.txid,
            transaction,
            confirmation_status,
            Some(&decrypted_note_data),
            &mut NullifierMap::new(),
            outpoint_map,
            &transparent_addresses,
            wallet_block.time(),
        )?;
        wallet_transactions.insert(scan_target.txid, wallet_transaction);
    }

    Ok(wallet_transactions)
}

/// Scans `transaction` with the given `status` and returns [`crate::wallet::WalletTransaction`], decrypting all
/// incoming and outgoing notes with `ufvks` and adding any transparent coins matching `transparent_addresses`.
///
/// `decrypted_note_data` will be `None` for pending transactions. For confirmed transactions, it must contain the
/// nullifiers and positions for each note to be decrypted. This will have been obtained during compact block scanning.
///
/// All inputs in `transaction` are inserted into the `nullifier_map` and `outpoint_map` to be used for spend detection.
/// For pending transactions, new maps are used instead of the wallet's maps as to keep confirmed spends isolated.
///
/// `txid` is used instead of `transaction.txid()` due to darkside testing bug.
#[allow(clippy::too_many_arguments)]
pub(crate) fn scan_transaction(
    consensus_parameters: &impl consensus::Parameters,
    ufvks: &HashMap<AccountId, UnifiedFullViewingKey>,
    txid: TxId,
    transaction: Transaction,
    status: ConfirmationStatus,
    decrypted_note_data: Option<&DecryptedNoteData>,
    nullifier_map: &mut NullifierMap,
    outpoint_map: &mut BTreeMap<OutputId, ScanTarget>,
    transparent_addresses: &HashMap<String, TransparentAddressId>,
    datetime: u32,
) -> Result<WalletTransaction, ScanError> {
    let block_height = status.get_height();
    let zip212_enforcement = zcash_primitives::transaction::components::sapling::zip212_enforcement(
        consensus_parameters,
        block_height,
    );
    let mut transparent_coins: Vec<TransparentCoin> = Vec::new();
    let mut sapling_notes: Vec<SaplingNote> = Vec::new();
    let mut orchard_notes: Vec<OrchardNote> = Vec::new();
    let mut outgoing_sapling_notes: Vec<OutgoingSaplingNote> = Vec::new();
    let mut outgoing_orchard_notes: Vec<OutgoingOrchardNote> = Vec::new();
    let mut encoded_memos = Vec::new();

    let mut sapling_ivks = Vec::new();
    let mut sapling_ovks = Vec::new();
    let mut orchard_ivks = Vec::new();
    let mut orchard_ovks = Vec::new();
    for (account_id, ufvk) in ufvks {
        if let Some(dfvk) = ufvk.sapling() {
            for scope in [Scope::External, Scope::Internal] {
                let key_id = KeyId::from_parts(*account_id, scope);
                sapling_ivks.push((
                    key_id,
                    sapling_crypto::note_encryption::PreparedIncomingViewingKey::new(
                        &dfvk.to_ivk(scope),
                    ),
                ));
                add_unified_ovk(
                    &mut sapling_ovks,
                    &mut orchard_ovks,
                    key_id,
                    dfvk.to_ovk(scope).into(),
                );
            }
        }

        if let Some(fvk) = ufvk.orchard() {
            for scope in [Scope::External, Scope::Internal] {
                let key_id = KeyId::from_parts(*account_id, scope);
                orchard_ivks.push((
                    key_id,
                    orchard::keys::PreparedIncomingViewingKey::new(&fvk.to_ivk(scope)),
                ));
                add_unified_ovk(
                    &mut sapling_ovks,
                    &mut orchard_ovks,
                    key_id,
                    fvk.to_ovk(scope).into(),
                );
            }
        }

        if let Some(tkeys) = ufvk.transparent() {
            add_unified_ovk(
                &mut sapling_ovks,
                &mut orchard_ovks,
                KeyId::from_parts(*account_id, Scope::External),
                OutgoingViewingKey::from(tkeys.external_ovk().as_bytes()),
            );
            add_unified_ovk(
                &mut sapling_ovks,
                &mut orchard_ovks,
                KeyId::from_parts(*account_id, Scope::Internal),
                OutgoingViewingKey::from(tkeys.internal_ovk().as_bytes()),
            );
        }
    }

    if let Some(bundle) = transaction.transparent_bundle() {
        let transparent_outputs = &bundle.vout;
        scan_incoming_coins(
            consensus_parameters,
            &mut transparent_coins,
            txid,
            transparent_addresses,
            transparent_outputs,
        );

        collect_outpoints(outpoint_map, txid, block_height, bundle);
    }

    if let Some(bundle) = transaction.sapling_bundle() {
        let sapling_outputs: Vec<(SaplingDomain, OutputDescription<GrothProofBytes>)> = bundle
            .shielded_outputs()
            .iter()
            .map(|output| (SaplingDomain::new(zip212_enforcement), output.clone()))
            .collect();

        scan_incoming_notes::<
            SaplingDomain,
            OutputDescription<GrothProofBytes>,
            sapling_crypto::Note,
            sapling_crypto::Nullifier,
        >(
            &mut sapling_notes,
            txid,
            sapling_ivks,
            &sapling_outputs,
            decrypted_note_data.map(|d| &d.sapling_nullifiers_and_positions),
        )?;

        scan_outgoing_notes(
            &mut outgoing_sapling_notes,
            txid,
            sapling_ovks,
            &sapling_outputs,
        )?;

        encoded_memos.append(&mut parse_encoded_memos(&sapling_notes));
    }

    if let Some(bundle) = transaction.orchard_bundle() {
        let orchard_actions: Vec<(OrchardDomain, Action<Signature<SpendAuth>>)> = bundle
            .actions()
            .iter()
            .map(|action| (OrchardDomain::for_action(action), action.clone()))
            .collect();

        scan_incoming_notes::<
            OrchardDomain,
            Action<Signature<SpendAuth>>,
            orchard::Note,
            orchard::note::Nullifier,
        >(
            &mut orchard_notes,
            txid,
            orchard_ivks,
            &orchard_actions,
            decrypted_note_data.map(|d| &d.orchard_nullifiers_and_positions),
        )?;

        scan_outgoing_notes(
            &mut outgoing_orchard_notes,
            txid,
            orchard_ovks,
            &orchard_actions,
        )?;

        encoded_memos.append(&mut parse_encoded_memos(&orchard_notes));
    }

    // collect nullifiers for pending transactions
    // nullifiers for confirmed transactions are collected during compact block scanning
    if status.is_pending() {
        collect_nullifiers(nullifier_map, block_height, txid, &transaction);
    }

    for encoded_memo in encoded_memos {
        match encoded_memo {
            ParsedMemo::Version0 { uas } => {
                add_recipient_unified_address(
                    consensus_parameters,
                    uas.clone(),
                    &mut outgoing_sapling_notes,
                )?;
                add_recipient_unified_address(
                    consensus_parameters,
                    uas,
                    &mut outgoing_orchard_notes,
                )?;
            }
            ParsedMemo::Version1 {
                uas,
                rejection_address_indexes: _,
            } => {
                add_recipient_unified_address(
                    consensus_parameters,
                    uas.clone(),
                    &mut outgoing_sapling_notes,
                )?;
                add_recipient_unified_address(
                    consensus_parameters,
                    uas,
                    &mut outgoing_orchard_notes,
                )?;

                // TODO: handle rejection addresses from encoded memos
            }
        }
    }

    Ok(WalletTransaction {
        txid,
        status,
        transaction,
        datetime,
        transparent_coins,
        sapling_notes,
        orchard_notes,
        outgoing_sapling_notes,
        outgoing_orchard_notes,
    })
}

fn add_unified_ovk(
    sapling_ovks: &mut Vec<(KeyId, sapling_crypto::keys::OutgoingViewingKey)>,
    orchard_ovks: &mut Vec<(KeyId, orchard::keys::OutgoingViewingKey)>,
    key_id: KeyId,
    ovk: OutgoingViewingKey,
) {
    sapling_ovks.push((key_id, ovk.into()));
    orchard_ovks.push((key_id, ovk.into()));
}

fn scan_incoming_coins<P: consensus::Parameters>(
    consensus_parameters: &P,
    transparent_coins: &mut Vec<TransparentCoin>,
    txid: TxId,
    transparent_addresses: &HashMap<String, TransparentAddressId>,
    transparent_outputs: &[zcash_transparent::bundle::TxOut],
) {
    for (output_index, output) in transparent_outputs.iter().enumerate() {
        if let Some(address) = output.recipient_address() {
            let encoded_address = keys::transparent::encode_address(consensus_parameters, address);
            if let Some((address, key_id)) = transparent_addresses.get_key_value(&encoded_address) {
                let output_id = OutputId::new(txid, output_index as u16);

                transparent_coins.push(TransparentCoin {
                    output_id,
                    key_id: *key_id,
                    address: address.clone(),
                    script: output.script_pubkey().clone(),
                    value: output.value(),
                    spending_transaction: None,
                });
            }
        }
    }
}

fn scan_incoming_notes<D, Op, N, Nf>(
    wallet_notes: &mut Vec<WalletNote<N, Nf>>,
    txid: TxId,
    ivks: Vec<(KeyId, D::IncomingViewingKey)>,
    outputs: &[(D, Op)],
    nullifiers_and_positions: Option<&HashMap<OutputId, (Nf, Position)>>,
) -> Result<(), ScanError>
where
    D: BatchDomain<Note = N>,
    D::Memo: AsRef<[u8]>,
    Op: ShieldedOutput<D, ENC_CIPHERTEXT_SIZE>,
    Nf: Copy,
{
    let (key_ids, ivks): (Vec<_>, Vec<_>) = ivks.into_iter().unzip();

    for (output_index, output) in zcash_note_encryption::batch::try_note_decryption(&ivks, outputs)
        .into_iter()
        .enumerate()
    {
        if let Some(((note, _, memo_bytes), key_index)) = output {
            let output_id = OutputId::new(txid, output_index as u16);
            let (nullifier, position) = nullifiers_and_positions.map_or(Ok((None, None)), |m| {
                m.get(&output_id)
                    .map(|(nf, pos)| (Some(*nf), Some(*pos)))
                    .ok_or(ScanError::DecryptedNoteDataNotFound(output_id))
            })?;
            wallet_notes.push(WalletNote {
                output_id,
                key_id: key_ids[key_index],
                note,
                nullifier,
                position,
                memo: Memo::from_bytes(memo_bytes.as_ref())?,
                spending_transaction: None,
                refetch_nullifier_ranges: Vec::new(),
            });
        }
    }

    Ok(())
}

fn scan_outgoing_notes<D, Op, N>(
    outgoing_notes: &mut Vec<OutgoingNote<N>>,
    txid: TxId,
    ovks: Vec<(KeyId, D::OutgoingViewingKey)>,
    outputs: &[(D, Op)],
) -> Result<(), ScanError>
where
    D: Domain<Note = N>,
    D::Memo: AsRef<[u8]>,
    Op: ShieldedOutputExt<D>,
{
    let (key_ids, ovks): (Vec<_>, Vec<_>) = ovks.into_iter().unzip();

    for (output_index, (domain, output)) in outputs.iter().enumerate() {
        if let Some(((note, _, memo_bytes), key_index)) = try_output_recovery_with_ovks(
            domain,
            &ovks,
            output,
            &output.value_commitment(),
            &output.out_ciphertext(),
        ) {
            outgoing_notes.push(OutgoingNote {
                output_id: OutputId::new(txid, output_index as u16),
                key_id: key_ids[key_index],
                note,
                memo: Memo::from_bytes(memo_bytes.as_ref())?,
                recipient_full_unified_address: None,
            });
        }
    }

    Ok(())
}

#[allow(clippy::type_complexity)]
fn try_output_recovery_with_ovks<D: Domain, Output: ShieldedOutput<D, ENC_CIPHERTEXT_SIZE>>(
    domain: &D,
    ovks: &[D::OutgoingViewingKey],
    output: &Output,
    cv: &D::ValueCommitment,
    out_ciphertext: &[u8; zcash_note_encryption::OUT_CIPHERTEXT_SIZE],
) -> Option<((D::Note, D::Recipient, D::Memo), usize)> {
    for (key_index, ovk) in ovks.iter().enumerate() {
        if let Some(decrypted_output) = zcash_note_encryption::try_output_recovery_with_ovk(
            domain,
            ovk,
            output,
            cv,
            out_ciphertext,
        ) {
            return Some((decrypted_output, key_index));
        }
    }
    None
}

fn parse_encoded_memos<N, Nf: Copy>(wallet_notes: &[WalletNote<N, Nf>]) -> Vec<ParsedMemo> {
    wallet_notes
        .iter()
        .filter_map(|note| {
            if let Memo::Arbitrary(ref encoded_memo_bytes) = note.memo {
                match zingo_memo::parse_zingo_memo(*encoded_memo_bytes.as_ref()) {
                    Ok(encoded_memo) => Some(encoded_memo),
                    Err(e) => {
                        tracing::error!("Failed to decode memo data. {e}");
                        None
                    }
                }
            } else {
                None
            }
        })
        .collect()
}

fn add_recipient_unified_address<P, Nz>(
    consensus_parameters: &P,
    unified_addresses: Vec<UnifiedAddress>,
    outgoing_notes: &mut [OutgoingNote<Nz>],
) -> Result<(), ScanError>
where
    P: consensus::Parameters + NetworkConstants,
    OutgoingNote<Nz>: OutgoingNoteInterface,
{
    for unified_address in unified_addresses {
        let encoded_address = match <OutgoingNote<Nz>>::SHIELDED_PROTOCOL {
            ShieldedProtocol::Sapling => unified_address.sapling().map(|address| {
                Ok(zcash_keys::encoding::encode_payment_address(
                    consensus_parameters.hrp_sapling_payment_address(),
                    address,
                ))
            }),
            ShieldedProtocol::Orchard => unified_address
                .orchard()
                .map(|address| keys::encode_orchard_receiver(consensus_parameters, address)),
        }
        .transpose()?;
        outgoing_notes
            .iter_mut()
            .filter(|note| {
                if let Ok(note_encoded_recipient) = note.encoded_recipient(consensus_parameters) {
                    encoded_address == Some(note_encoded_recipient)
                } else {
                    false
                }
            })
            .for_each(|note| {
                note.recipient_full_unified_address = Some(unified_address.clone());
            });
    }

    Ok(())
}

/// Converts and adds the nullifiers from a transaction to the nullifier map.
///
/// `txid` is used instead of `transaction.txid()` due to darkside testing bug.
fn collect_nullifiers(
    nullifier_map: &mut NullifierMap,
    block_height: BlockHeight,
    txid: TxId,
    transaction: &Transaction,
) {
    if let Some(bundle) = transaction.sapling_bundle() {
        bundle
            .shielded_spends()
            .iter()
            .map(sapling_crypto::bundle::SpendDescription::nullifier)
            .for_each(|nullifier| {
                nullifier_map.sapling.insert(
                    *nullifier,
                    ScanTarget {
                        block_height,
                        txid,
                        narrow_scan_area: false,
                    },
                );
            });
    }
    if let Some(bundle) = transaction.orchard_bundle() {
        bundle
            .actions()
            .iter()
            .map(orchard::Action::nullifier)
            .for_each(|nullifier| {
                nullifier_map.orchard.insert(
                    *nullifier,
                    ScanTarget {
                        block_height,
                        txid,
                        narrow_scan_area: false,
                    },
                );
            });
    }
}

/// Adds the outpoints from a transparent bundle to the outpoint map.
fn collect_outpoints<A: TransparentAuthorization>(
    outpoint_map: &mut BTreeMap<OutputId, ScanTarget>,
    txid: TxId,
    block_height: BlockHeight,
    transparent_bundle: &TransparentBundle<A>,
) {
    transparent_bundle
        .vin
        .iter()
        .map(TxIn::prevout)
        .for_each(|outpoint| {
            outpoint_map.insert(
                OutputId::from(outpoint),
                ScanTarget {
                    block_height,
                    txid,
                    narrow_scan_area: true,
                },
            );
        });
}
