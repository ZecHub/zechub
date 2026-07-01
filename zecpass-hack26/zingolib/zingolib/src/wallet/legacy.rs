use std::{
    collections::HashMap,
    io::{self, Read, Write},
};

use byteorder::{LittleEndian, ReadBytesExt};
use orchard::tree::MerkleHashOrchard;
use prost::Message;

use incrementalmerkletree::{Address, Hashable, Level, Position, witness::IncrementalWitness};
use shardtree::{
    LocatedPrunableTree, ShardTree,
    store::{Checkpoint, ShardStore as _, memory::MemoryShardStore},
};
use zcash_client_backend::{
    proto::compact_formats::CompactBlock, serialization::shardtree::read_shard,
};
use zcash_encoding::{CompactSize, Optional, Vector};
use zcash_primitives::{
    merkle_tree::{HashSer, read_commitment_tree, read_incremental_witness},
    transaction::TxId,
};
use zcash_protocol::{
    consensus::BlockHeight,
    memo::{Memo, MemoBytes},
};
use zingo_status::confirmation_status::ConfirmationStatus;

use super::{keys::legacy::WalletCapability, traits::ReadableWriteable};

/// TODO: Add Doc Comment Here!
#[derive(Clone, PartialEq)]
pub struct BlockData {
    /// TODO: Add Doc Comment Here!
    pub(crate) ecb: Vec<u8>,
    /// TODO: Add Doc Comment Here!
    pub height: u64,
}

impl BlockData {
    pub(crate) fn new_with(height: u64, hash: &[u8]) -> Self {
        let hash = hash.iter().copied().rev().collect::<Vec<_>>();

        let cb = CompactBlock {
            hash,
            ..Default::default()
        };

        let mut ecb = vec![];
        cb.encode(&mut ecb).unwrap();

        Self { ecb, height }
    }

    /// TODO: Add Doc Comment Here!
    pub fn read<R: Read>(mut reader: R) -> io::Result<Self> {
        let height = reader.read_i32::<LittleEndian>()? as u64;

        let mut hash_bytes = [0; 32];
        reader.read_exact(&mut hash_bytes)?;
        hash_bytes.reverse();

        // We don't need this, but because of a quirk, the version is stored later, so we can't actually
        // detect the version here. So we write an empty tree and read it back here
        let tree: sapling_crypto::CommitmentTree = read_commitment_tree(&mut reader)?;
        let _tree = if tree.size() == 0 { None } else { Some(tree) };

        let version = reader.read_u64::<LittleEndian>()?;

        let ecb = if version <= 11 {
            vec![]
        } else {
            Vector::read(&mut reader, byteorder::ReadBytesExt::read_u8)?
        };

        if ecb.is_empty() {
            Ok(BlockData::new_with(height, &hash_bytes))
        } else {
            Ok(BlockData { ecb, height })
        }
    }
}

/// `HashMap` of all transactions in a wallet, keyed by txid.
/// Note that the parent is expected to hold a `RwLock`, so we will assume that all accesses to
/// this struct are threadsafe/locked properly.
pub struct TxMap {
    /// TODO: Doc-comment!
    pub transaction_records_by_id: TransactionRecordsById,
}

impl TxMap {
    /// TODO: Doc-comment!
    pub fn serialized_version() -> u64 {
        23
    }

    /// TODO: Doc-comment!
    pub fn read_old<R: Read>(
        mut reader: R,
        wallet_capability: &WalletCapability,
    ) -> io::Result<Self> {
        // Note, witness_trees will be Some(x) if the wallet has spend capability
        // so this check is a very un-ergonomic way of checking if the wallet
        // can spend.
        let mut witness_trees = wallet_capability.get_trees_witness_trees();
        let mut old_inc_witnesses = if witness_trees.is_some() {
            Some((Vec::new(), Vec::new()))
        } else {
            None
        };
        let txs = Vector::read_collected_mut(&mut reader, |r| {
            let mut txid_bytes = [0u8; 32];
            r.read_exact(&mut txid_bytes)?;

            Ok((
                TxId::from_bytes(txid_bytes),
                TransactionRecord::read(r, (wallet_capability, old_inc_witnesses.as_mut()))
                    .unwrap(),
            ))
        })?;

        let map = TransactionRecordsById::from_map(txs);

        if let Some((mut old_sap_wits, mut old_orch_wits)) = old_inc_witnesses {
            old_sap_wits.sort_by(|(_w1, height1), (_w2, height2)| height1.cmp(height2));
            let sap_tree = &mut witness_trees.as_mut().unwrap().witness_tree_sapling;
            for (sap_wit, height) in old_sap_wits {
                sap_tree
                    .insert_witness_nodes(sap_wit, height - 1)
                    .expect("infallible");
                sap_tree.checkpoint(height).expect("infallible");
            }
            old_orch_wits.sort_by(|(_w1, height1), (_w2, height2)| height1.cmp(height2));
            let orch_tree = &mut witness_trees.as_mut().unwrap().witness_tree_orchard;
            for (orch_wit, height) in old_orch_wits {
                orch_tree
                    .insert_witness_nodes(orch_wit, height - 1)
                    .expect("infallible");
                orch_tree.checkpoint(height).expect("infallible");
            }
        }

        Ok(Self {
            transaction_records_by_id: map,
        })
    }

    /// TODO: Doc-comment!
    #[allow(unused_assignments)]
    pub fn read<R: Read>(mut reader: R, wallet_capability: &WalletCapability) -> io::Result<Self> {
        let version = reader.read_u64::<LittleEndian>()?;
        if version > Self::serialized_version() {
            return Err(io::Error::new(
                io::ErrorKind::InvalidData,
                "Can't read wallettxns because of incorrect version",
            ));
        }

        let mut witness_trees = wallet_capability.get_trees_witness_trees();
        let mut old_inc_witnesses = if witness_trees.is_some() {
            Some((Vec::new(), Vec::new()))
        } else {
            None
        };
        let map: HashMap<_, _> = Vector::read_collected_mut(&mut reader, |r| {
            let mut txid_bytes = [0u8; 32];
            r.read_exact(&mut txid_bytes)?;

            Ok((
                TxId::from_bytes(txid_bytes),
                TransactionRecord::read(r, (wallet_capability, old_inc_witnesses.as_mut()))?,
            ))
        })?;

        let _mempool: Vec<(TxId, TransactionRecord)> = if version <= 20 {
            Vector::read_collected_mut(&mut reader, |r| {
                let mut txid_bytes = [0u8; 32];
                r.read_exact(&mut txid_bytes)?;
                let transaction_metadata =
                    TransactionRecord::read(r, (wallet_capability, old_inc_witnesses.as_mut()))?;

                Ok((TxId::from_bytes(txid_bytes), transaction_metadata))
            })?
        } else {
            vec![]
        };

        if version >= 22 {
            witness_trees = Optional::read(reader, |r| WitnessTrees::read(r))?;
        } else if let Some((mut old_sap_wits, mut old_orch_wits)) = old_inc_witnesses {
            old_sap_wits.sort_by(|(_w1, height1), (_w2, height2)| height1.cmp(height2));
            let sap_tree = &mut witness_trees.as_mut().unwrap().witness_tree_sapling;
            for (sap_wit, height) in old_sap_wits {
                sap_tree
                    .insert_witness_nodes(sap_wit, height - 1)
                    .expect("infallible");
                sap_tree.checkpoint(height).expect("infallible");
            }
            old_orch_wits.sort_by(|(_w1, height1), (_w2, height2)| height1.cmp(height2));
            let orch_tree = &mut witness_trees.as_mut().unwrap().witness_tree_orchard;
            for (orch_wit, height) in old_orch_wits {
                orch_tree
                    .insert_witness_nodes(orch_wit, height - 1)
                    .expect("infallible");
                orch_tree.checkpoint(height).expect("infallible");
            }
        }

        Ok(Self {
            transaction_records_by_id: TransactionRecordsById::from_map(map),
        })
    }
}

/// A convenience wrapper, to impl behavior on.
pub struct TransactionRecordsById(pub HashMap<TxId, TransactionRecord>);

impl TransactionRecordsById {
    /// Constructs a `TransactionRecordsById` from a `HashMap`
    pub fn from_map(map: HashMap<TxId, TransactionRecord>) -> Self {
        TransactionRecordsById(map)
    }
}

///  Everything (SOMETHING) about a transaction
#[allow(dead_code)]
pub struct TransactionRecord {
    /// the relationship of the transaction to the blockchain. can be either Broadcast (to mempool}, or Confirmed.
    pub status: zingo_status::confirmation_status::ConfirmationStatus,
    /// Timestamp of Tx. Added in v4
    pub datetime: u64,
    /// Txid of this transaction. It's duplicated here (It is also the Key in the `HashMap` that points to this
    /// `WalletTx` in `LightWallet::txs`)
    pub txid: TxId,
    /// List of all nullifiers spent by this wallet in this Tx.
    pub spent_sapling_nullifiers: Vec<sapling_crypto::Nullifier>,
    /// List of all nullifiers spent by this wallet in this Tx. These nullifiers belong to the wallet.
    pub spent_orchard_nullifiers: Vec<orchard::note::Nullifier>,
    /// List of all sapling notes received by this wallet in this tx. Some of these might be change notes.
    pub sapling_notes: Vec<SaplingNote>,
    /// List of all sapling notes received by this wallet in this tx. Some of these might be change notes.
    pub orchard_notes: Vec<OrchardNote>,
    /// List of all Utxos by this wallet received in this Tx. Some of these might be change notes
    pub transparent_outputs: Vec<TransparentOutput>,
    /// Total amount of transparent funds that belong to us that were spent by this wallet in this Tx.
    pub total_transparent_value_spent: u64,
    /// Total value of all the sapling nullifiers that were spent by this wallet in this Tx
    pub total_sapling_value_spent: u64,
    /// Total value of all the orchard nullifiers that were spent by this wallet in this Tx
    pub total_orchard_value_spent: u64,
    /// All outgoing sends
    pub outgoing_tx_data: Vec<OutgoingTxData>,
    /// Price of Zec when this Tx was created
    pub price: Option<f64>,
}

impl TransactionRecord {
    /// TODO: Add Doc Comment Here!
    #[allow(clippy::type_complexity)]
    pub fn read<R: Read>(
        mut reader: R,
        (wallet_capability, mut trees): (
            &WalletCapability,
            Option<&mut (
                Vec<(
                    IncrementalWitness<sapling_crypto::Node, COMMITMENT_TREE_LEVELS>,
                    BlockHeight,
                )>,
                Vec<(
                    IncrementalWitness<MerkleHashOrchard, COMMITMENT_TREE_LEVELS>,
                    BlockHeight,
                )>,
            )>,
        ),
    ) -> io::Result<Self> {
        let version = reader.read_u64::<LittleEndian>()?;

        let block = BlockHeight::from_u32(reader.read_i32::<LittleEndian>()? as u32);

        let pending = if version <= 20 {
            false
        } else {
            reader.read_u8()? == 1
        };

        let datetime = if version >= 4 {
            reader.read_u64::<LittleEndian>()?
        } else {
            0
        };

        let mut transaction_id_bytes = [0u8; 32];
        reader.read_exact(&mut transaction_id_bytes)?;

        let transaction_id = TxId::from_bytes(transaction_id_bytes);

        let sapling_notes = zcash_encoding::Vector::read_collected_mut(&mut reader, |r| {
            SaplingNote::read(r, (wallet_capability, trees.as_mut().map(|t| &mut t.0)))
        })?;
        let orchard_notes = if version > 22 {
            zcash_encoding::Vector::read_collected_mut(&mut reader, |r| {
                OrchardNote::read(r, (wallet_capability, trees.as_mut().map(|t| &mut t.1)))
            })?
        } else {
            vec![]
        };

        let utxos = zcash_encoding::Vector::read(&mut reader, |r| TransparentOutput::read(r))?;

        let total_transparent_value_spent = reader.read_u64::<LittleEndian>()?;
        let total_sapling_value_spent = reader.read_u64::<LittleEndian>()?;
        let total_orchard_value_spent = if version >= 22 {
            reader.read_u64::<LittleEndian>()?
        } else {
            0
        };

        let outgoing_metadata = match version {
            ..24 => zcash_encoding::Vector::read(&mut reader, |r| OutgoingTxData::read_old(r))?,
            24.. => zcash_encoding::Vector::read(&mut reader, |r| OutgoingTxData::read(r))?,
        };
        let _full_tx_scanned = reader.read_u8()? > 0;

        let zec_price = if version <= 4 {
            None
        } else {
            zcash_encoding::Optional::read(
                &mut reader,
                byteorder::ReadBytesExt::read_f64::<LittleEndian>,
            )?
        };

        let spent_sapling_nullifiers = if version <= 5 {
            vec![]
        } else {
            zcash_encoding::Vector::read(&mut reader, |r| {
                let mut n = [0u8; 32];
                r.read_exact(&mut n)?;
                Ok(sapling_crypto::Nullifier(n))
            })?
        };

        let spent_orchard_nullifiers = if version <= 21 {
            vec![]
        } else {
            zcash_encoding::Vector::read(&mut reader, |r| {
                let mut n = [0u8; 32];
                r.read_exact(&mut n)?;
                Ok(orchard::note::Nullifier::from_bytes(&n).unwrap())
            })?
        };
        let status = if pending {
            ConfirmationStatus::Transmitted(block)
        } else {
            ConfirmationStatus::Confirmed(block)
        };

        Ok(Self {
            status,
            datetime,
            txid: transaction_id,
            sapling_notes,
            orchard_notes,
            transparent_outputs: utxos,
            spent_sapling_nullifiers,
            spent_orchard_nullifiers,
            total_transparent_value_spent,
            total_sapling_value_spent,
            total_orchard_value_spent,
            outgoing_tx_data: outgoing_metadata,
            price: zec_price,
        })
    }
}

impl ReadableWriteable<(sapling_crypto::Diversifier, &WalletCapability)> for sapling_crypto::Note {
    const VERSION: u8 = 1;

    fn read<R: Read>(
        mut reader: R,
        (diversifier, wallet_capability): (sapling_crypto::Diversifier, &WalletCapability),
    ) -> io::Result<Self> {
        let _version = Self::get_version(&mut reader)?;
        let value = reader.read_u64::<LittleEndian>()?;
        let rseed = read_sapling_rseed(&mut reader)?;

        Ok(
            sapling_crypto::zip32::DiversifiableFullViewingKey::try_from(
                &wallet_capability.unified_key_store,
            )
            .expect("to get an fvk from the unified key store")
            .fvk()
            .vk
            .to_payment_address(diversifier)
            .unwrap()
            .create_note(sapling_crypto::value::NoteValue::from_raw(value), rseed),
        )
    }

    fn write<W: Write>(&self, mut _writer: W, _input: ()) -> io::Result<()> {
        unimplemented!()
    }
}

// Reading a note also needs the corresponding address to read from.
fn read_sapling_rseed<R: Read>(mut reader: R) -> io::Result<sapling_crypto::Rseed> {
    let note_type = reader.read_u8()?;

    let mut r_bytes: [u8; 32] = [0; 32];
    reader.read_exact(&mut r_bytes)?;

    let r = match note_type {
        1 => sapling_crypto::Rseed::BeforeZip212(jubjub::Fr::from_bytes(&r_bytes).unwrap()),
        2 => sapling_crypto::Rseed::AfterZip212(r_bytes),
        _ => return Err(io::Error::new(io::ErrorKind::InvalidInput, "Bad note type")),
    };

    Ok(r)
}

impl ReadableWriteable<(orchard::keys::Diversifier, &WalletCapability)> for orchard::note::Note {
    const VERSION: u8 = 1;

    fn read<R: Read>(
        mut reader: R,
        (diversifier, wallet_capability): (orchard::keys::Diversifier, &WalletCapability),
    ) -> io::Result<Self> {
        let _version = Self::get_version(&mut reader)?;
        let value = reader.read_u64::<LittleEndian>()?;
        let mut nullifier_bytes = [0; 32];
        reader.read_exact(&mut nullifier_bytes)?;
        let rho_nullifier = Option::from(orchard::note::Rho::from_bytes(&nullifier_bytes))
            .ok_or(io::Error::new(io::ErrorKind::InvalidInput, "Bad Nullifier"))?;

        let mut random_seed_bytes = [0; 32];
        reader.read_exact(&mut random_seed_bytes)?;
        let random_seed = Option::from(orchard::note::RandomSeed::from_bytes(
            random_seed_bytes,
            &rho_nullifier,
        ))
        .ok_or(io::Error::new(
            io::ErrorKind::InvalidInput,
            "Nullifier not for note",
        ))?;

        let fvk = orchard::keys::FullViewingKey::try_from(&wallet_capability.unified_key_store)
            .expect("to get an fvk from the unified key store");
        Option::from(orchard::note::Note::from_parts(
            fvk.address(diversifier, orchard::keys::Scope::External),
            orchard::value::NoteValue::from_raw(value),
            rho_nullifier,
            random_seed,
        ))
        .ok_or(io::Error::new(io::ErrorKind::InvalidInput, "Invalid note"))
    }

    fn write<W: Write>(&self, mut _writer: W, _input: ()) -> io::Result<()> {
        unimplemented!()
    }
}

/// TODO: Add Doc Comment Here!
#[derive(Clone, PartialEq)]
pub struct TransparentOutput {
    /// TODO: Add Doc Comment Here!
    pub address: String,
    /// TODO: Add Doc Comment Here!
    pub txid: TxId,
    /// TODO: Add Doc Comment Here!
    pub output_index: u64,
    /// TODO: Add Doc Comment Here!
    pub script: Vec<u8>,
    /// TODO: Add Doc Comment Here!
    pub value: u64,
    /// whether, where, and when it was spent
    spend: Option<(TxId, ConfirmationStatus)>,
    /// Output is from a coinbase transaction
    pub is_coinbase: bool,
}

impl TransparentOutput {
    /// TODO: Add Doc Comment Here!
    pub fn read<R: std::io::Read>(mut reader: R) -> std::io::Result<Self> {
        let version = reader.read_u64::<byteorder::LittleEndian>()?;

        let address_len = reader.read_i32::<byteorder::LittleEndian>()?;
        let mut address_bytes = vec![0; address_len as usize];
        reader.read_exact(&mut address_bytes)?;
        let address = String::from_utf8(address_bytes).unwrap();
        assert_eq!(address.chars().take(1).collect::<Vec<char>>()[0], 't');

        let mut transaction_id_bytes = [0; 32];
        reader.read_exact(&mut transaction_id_bytes)?;
        let transaction_id = TxId::from_bytes(transaction_id_bytes);

        let output_index = reader.read_u64::<byteorder::LittleEndian>()?;
        let value = reader.read_u64::<byteorder::LittleEndian>()?;
        let _height = reader.read_i32::<byteorder::LittleEndian>()?;

        let script = zcash_encoding::Vector::read(&mut reader, |r| {
            let mut byte = [0; 1];
            r.read_exact(&mut byte)?;
            Ok(byte[0])
        })?;

        let spent = zcash_encoding::Optional::read(&mut reader, |r| {
            let mut transaction_bytes = [0u8; 32];
            r.read_exact(&mut transaction_bytes)?;
            Ok(TxId::from_bytes(transaction_bytes))
        })?;

        let spent_at_height = if version <= 1 {
            None
        } else {
            zcash_encoding::Optional::read(&mut reader, |r| {
                r.read_i32::<byteorder::LittleEndian>()
            })?
        };

        let _pending_spent = if version == 3 {
            zcash_encoding::Optional::read(&mut reader, |r| {
                let mut transaction_bytes = [0u8; 32];
                r.read_exact(&mut transaction_bytes)?;

                let height = r.read_u32::<byteorder::LittleEndian>()?;
                Ok((TxId::from_bytes(transaction_bytes), height))
            })?
        } else {
            None
        };

        let spent_tuple: Option<(TxId, u32)> = if let Some(txid) = spent {
            if let Some(height) = spent_at_height {
                Some((txid, height as u32))
            } else {
                Some((txid, 0))
            }
        } else {
            None
        };
        let spend =
            spent_tuple.map(|(txid, height)| (txid, ConfirmationStatus::Confirmed(height.into())));

        let is_coinbase = if version >= 5 {
            reader.read_u8()? != 0
        } else {
            false
        };

        Ok(TransparentOutput {
            address,
            txid: transaction_id,
            output_index,
            script,
            value,
            spend,
            is_coinbase,
        })
    }
}

/// TODO: Add Doc Comment Here!
#[derive(Clone)]
#[allow(dead_code)]
pub struct SaplingNote {
    /// TODO: Add Doc Comment Here!
    pub diversifier: sapling_crypto::Diversifier,
    /// TODO: Add Doc Comment Here!
    pub sapling_crypto_note: sapling_crypto::Note,
    // The position of this note's value commitment in the global commitment tree
    // We need to create a witness to it, to spend
    pub(crate) witnessed_position: Option<Position>,
    // The note's index in its containing transaction
    pub(crate) output_index: Option<u32>,
    /// TODO: Add Doc Comment Here!
    pub nullifier: Option<sapling_crypto::Nullifier>,
    /// whether, where, and when it was spent
    spend: Option<(TxId, ConfirmationStatus)>,
    /// TODO: Add Doc Comment Here!
    pub memo: Option<Memo>,
    /// DEPRECATED
    pub is_change: bool,
    /// If the spending key is available in the wallet (i.e., whether to keep witness up-to-date) Todo should this data point really be here?
    pub have_spending_key: bool,
}

impl
    ReadableWriteable<(
        &WalletCapability,
        Option<
            &mut Vec<(
                IncrementalWitness<sapling_crypto::Node, COMMITMENT_TREE_LEVELS>,
                BlockHeight,
            )>,
        >,
    )> for SaplingNote
{
    const VERSION: u8 = 5;

    fn read<R: Read>(
        mut reader: R,
        (wallet_capability, inc_wit_vec): (
            &WalletCapability,
            Option<
                &mut Vec<(
                    IncrementalWitness<sapling_crypto::Node, COMMITMENT_TREE_LEVELS>,
                    BlockHeight,
                )>,
            >,
        ),
    ) -> io::Result<Self> {
        let external_version = Self::get_version(&mut reader)?;

        if external_version < 2 {
            let mut discarded_bytes = vec![0u8; 169];
            reader
                .read_exact(&mut discarded_bytes)
                .expect("To not used this data.");
        }

        let mut diversifier_bytes = [0u8; 11];
        reader.read_exact(&mut diversifier_bytes)?;
        let diversifier = sapling_crypto::Diversifier(diversifier_bytes);

        let note = sapling_crypto::Note::read(&mut reader, (diversifier, wallet_capability))?;

        let witnessed_position = match external_version {
            5.. => Optional::read(&mut reader, <R>::read_u64::<LittleEndian>)?.map(Position::from),
            4 => Some(Position::from(reader.read_u64::<LittleEndian>()?)),
            ..4 => {
                let witnesses_vec = Vector::read(&mut reader, |r| read_incremental_witness(r))?;

                let top_height = reader.read_u64::<LittleEndian>()?;
                let witnesses =
                    WitnessCache::<sapling_crypto::Node>::new(witnesses_vec, top_height);

                let pos = witnesses
                    .last()
                    .map(incrementalmerkletree::witness::IncrementalWitness::witnessed_position);
                for (i, witness) in witnesses.witnesses.into_iter().rev().enumerate().rev() {
                    let height = BlockHeight::from(top_height as u32 - i as u32);
                    if let Some(&mut ref mut wits) = inc_wit_vec {
                        wits.push((witness, height));
                    }
                }
                pos
            }
        };

        let read_nullifier = |r: &mut R| {
            let mut nullifier = [0u8; 32];
            r.read_exact(&mut nullifier)?;
            Ok(sapling_crypto::Nullifier::from_slice(&nullifier).unwrap())
        };

        let nullifier = match external_version {
            5.. => Optional::read(&mut reader, read_nullifier)?,
            ..5 => Some(read_nullifier(&mut reader)?),
        };

        let spend = Optional::read(&mut reader, |r| {
            let mut transaction_id_bytes = [0u8; 32];
            r.read_exact(&mut transaction_id_bytes)?;
            let status = if let 5.. = external_version {
                ReadableWriteable::read(r, ())
            } else {
                let height = r.read_u32::<LittleEndian>()?;
                Ok(ConfirmationStatus::Confirmed(BlockHeight::from_u32(height)))
            }?;
            Ok((TxId::from_bytes(transaction_id_bytes), status))
        })?;

        // Note that the spent field is now an enum, that contains what used to be
        // a separate 'pending_spent' field. As they're mutually exclusive states,
        // they are now stored in the same field.
        if external_version < 3 {
            let _pending_spent = {
                Optional::read(&mut reader, |r| {
                    let mut transaction_bytes = [0u8; 32];
                    r.read_exact(&mut transaction_bytes)?;

                    let height = r.read_u32::<LittleEndian>()?;
                    Ok((TxId::from_bytes(transaction_bytes), height))
                })?
            };
        }

        let memo = Optional::read(&mut reader, |r| {
            let mut memo_bytes = [0u8; 512];
            r.read_exact(&mut memo_bytes)?;

            // Attempt to read memo, first as text, else as arbitrary 512 bytes
            match MemoBytes::from_bytes(&memo_bytes) {
                Ok(mb) => match Memo::try_from(mb.clone()) {
                    Ok(m) => Ok(m),
                    Err(_) => Ok(Memo::Future(mb)),
                },
                Err(e) => Err(io::Error::new(
                    io::ErrorKind::InvalidInput,
                    format!("Couldn't create memo: {e}"),
                )),
            }
        })?;

        let is_change: bool = reader.read_u8()? > 0;

        let have_spending_key = reader.read_u8()? > 0;

        let output_index = if external_version >= 4 {
            match reader.read_u32::<LittleEndian>()? {
                u32::MAX => None,
                otherwise => Some(otherwise),
            }
        } else {
            None
        };

        Ok(Self {
            diversifier,
            sapling_crypto_note: note,
            witnessed_position,
            nullifier,
            spend,
            memo,
            is_change,
            have_spending_key,
            output_index,
        })
    }

    fn write<W: Write>(&self, mut _writer: W, _input: ()) -> io::Result<()> {
        unimplemented!()
    }
}

/// TODO: Add Doc Comment Here!
#[derive(Clone, PartialEq)]
pub struct OrchardNote {
    /// TODO: Add Doc Comment Here!
    pub diversifier: orchard::keys::Diversifier,
    /// TODO: Add Doc Comment Here!
    pub orchard_crypto_note: orchard::note::Note,
    /// The position of this note's value commitment in the global commitment tree
    /// We need to create a witness to it, to spend
    pub witnessed_position: Option<Position>,
    /// The note's index in its containing transaction
    pub(crate) output_index: Option<u32>,
    pub(crate) nullifier: Option<orchard::note::Nullifier>,
    /// whether, where, and when it was spent
    spend: Option<(TxId, ConfirmationStatus)>,
    /// TODO: Add Doc Comment Here!
    pub memo: Option<Memo>,
    /// DEPRECATED
    pub is_change: bool,
    /// If the spending key is available in the wallet (i.e., whether to keep witness up-to-date)
    pub have_spending_key: bool,
}

impl
    ReadableWriteable<(
        &WalletCapability,
        Option<
            &mut Vec<(
                IncrementalWitness<MerkleHashOrchard, COMMITMENT_TREE_LEVELS>,
                BlockHeight,
            )>,
        >,
    )> for OrchardNote
{
    const VERSION: u8 = 5;

    fn read<R: Read>(
        mut reader: R,
        (wallet_capability, inc_wit_vec): (
            &WalletCapability,
            Option<
                &mut Vec<(
                    IncrementalWitness<MerkleHashOrchard, COMMITMENT_TREE_LEVELS>,
                    BlockHeight,
                )>,
            >,
        ),
    ) -> io::Result<Self> {
        let external_version = Self::get_version(&mut reader)?;

        if external_version < 2 {
            let mut discarded_bytes = vec![0u8; 96];
            reader
                .read_exact(&mut discarded_bytes)
                .expect("To not used this data.");
        }

        let mut diversifier_bytes = [0u8; 11];
        reader.read_exact(&mut diversifier_bytes)?;
        let diversifier = orchard::keys::Diversifier::from_bytes(diversifier_bytes);

        let note = orchard::Note::read(&mut reader, (diversifier, wallet_capability))?;

        let witnessed_position = match external_version {
            5.. => Optional::read(&mut reader, <R>::read_u64::<LittleEndian>)?.map(Position::from),
            4 => Some(Position::from(reader.read_u64::<LittleEndian>()?)),
            ..4 => {
                let witnesses_vec = Vector::read(&mut reader, |r| read_incremental_witness(r))?;

                let top_height = reader.read_u64::<LittleEndian>()?;
                let witnesses = WitnessCache::<MerkleHashOrchard>::new(witnesses_vec, top_height);

                let pos = witnesses
                    .last()
                    .map(incrementalmerkletree::witness::IncrementalWitness::witnessed_position);
                for (i, witness) in witnesses.witnesses.into_iter().rev().enumerate().rev() {
                    let height = BlockHeight::from(top_height as u32 - i as u32);
                    if let Some(&mut ref mut wits) = inc_wit_vec {
                        wits.push((witness, height));
                    }
                }
                pos
            }
        };

        let read_nullifier = |r: &mut R| {
            let mut nullifier = [0u8; 32];
            r.read_exact(&mut nullifier)?;
            Ok(orchard::note::Nullifier::from_bytes(&nullifier).unwrap())
        };

        let nullifier = match external_version {
            5.. => Optional::read(&mut reader, read_nullifier)?,
            ..5 => Some(read_nullifier(&mut reader)?),
        };

        let spend = Optional::read(&mut reader, |r| {
            let mut transaction_id_bytes = [0u8; 32];
            r.read_exact(&mut transaction_id_bytes)?;
            let status = if let 5.. = external_version {
                ReadableWriteable::read(r, ())
            } else {
                let height = r.read_u32::<LittleEndian>()?;
                Ok(ConfirmationStatus::Confirmed(BlockHeight::from_u32(height)))
            }?;
            Ok((TxId::from_bytes(transaction_id_bytes), status))
        })?;

        // Note that the spent field is now an enum, that contains what used to be
        // a separate 'pending_spent' field. As they're mutually exclusive states,
        // they are now stored in the same field.
        if external_version < 3 {
            let _pending_spent = {
                Optional::read(&mut reader, |r| {
                    let mut transaction_bytes = [0u8; 32];
                    r.read_exact(&mut transaction_bytes)?;

                    let height = r.read_u32::<LittleEndian>()?;
                    Ok((TxId::from_bytes(transaction_bytes), height))
                })?
            };
        }

        let memo = Optional::read(&mut reader, |r| {
            let mut memo_bytes = [0u8; 512];
            r.read_exact(&mut memo_bytes)?;

            // Attempt to read memo, first as text, else as arbitrary 512 bytes
            match MemoBytes::from_bytes(&memo_bytes) {
                Ok(mb) => match Memo::try_from(mb.clone()) {
                    Ok(m) => Ok(m),
                    Err(_) => Ok(Memo::Future(mb)),
                },
                Err(e) => Err(io::Error::new(
                    io::ErrorKind::InvalidInput,
                    format!("Couldn't create memo: {e}"),
                )),
            }
        })?;

        let is_change: bool = reader.read_u8()? > 0;

        let have_spending_key = reader.read_u8()? > 0;

        let output_index = if external_version >= 4 {
            match reader.read_u32::<LittleEndian>()? {
                u32::MAX => None,
                otherwise => Some(otherwise),
            }
        } else {
            None
        };

        Ok(Self {
            diversifier,
            orchard_crypto_note: note,
            witnessed_position,
            nullifier,
            spend,
            memo,
            is_change,
            have_spending_key,
            output_index,
        })
    }

    fn write<W: Write>(&self, mut _writer: W, _input: ()) -> io::Result<()> {
        unimplemented!()
    }
}

/// Only for `TransactionRecords` *from* "this" capability
#[derive(Clone)]
#[allow(dead_code)]
pub struct OutgoingTxData {
    /// TODO: Add Doc Comment Here!
    pub recipient_address: String,
    /// Amount to this receiver
    pub value: u64,
    /// Note to the receiver, why not an option?
    pub memo: Memo,
    /// What if it wasn't provided?  How does this relate to
    /// `recipient_address`?
    pub recipient_ua: Option<String>,
    /// This output's index in its containing transaction
    pub output_index: Option<u64>,
}

impl OutgoingTxData {
    /// Before version 0, `OutgoingTxData` didn't have a version field
    pub fn read_old<R: Read>(mut reader: R) -> io::Result<Self> {
        let address_len = reader.read_u64::<LittleEndian>()?;
        let mut address_bytes = vec![0; address_len as usize];
        reader.read_exact(&mut address_bytes)?;
        let address = String::from_utf8(address_bytes).unwrap();

        let value = reader.read_u64::<LittleEndian>()?;

        let mut memo_bytes = [0u8; 512];
        reader.read_exact(&mut memo_bytes)?;
        let memo = match MemoBytes::from_bytes(&memo_bytes) {
            Ok(mb) => match Memo::try_from(mb.clone()) {
                Ok(m) => Ok(m),
                Err(_) => Ok(Memo::Future(mb)),
            },
            Err(e) => Err(io::Error::new(
                io::ErrorKind::InvalidInput,
                format!("Couldn't create memo: {e}"),
            )),
        }?;

        Ok(OutgoingTxData {
            recipient_address: address,
            value,
            memo,
            recipient_ua: None,
            output_index: None,
        })
    }

    /// Read an `OutgoingTxData` from its serialized
    /// representation
    pub fn read<R: Read>(mut reader: R) -> io::Result<Self> {
        let _external_version = CompactSize::read(&mut reader)?;
        let address_len = reader.read_u64::<LittleEndian>()?;
        let mut address_bytes = vec![0; address_len as usize];
        reader.read_exact(&mut address_bytes)?;
        let address = String::from_utf8(address_bytes).unwrap();

        let value = reader.read_u64::<LittleEndian>()?;

        let mut memo_bytes = [0u8; 512];
        reader.read_exact(&mut memo_bytes)?;
        let memo = match MemoBytes::from_bytes(&memo_bytes) {
            Ok(mb) => match Memo::try_from(mb.clone()) {
                Ok(m) => Ok(m),
                Err(_) => Ok(Memo::Future(mb)),
            },
            Err(e) => Err(io::Error::new(
                io::ErrorKind::InvalidInput,
                format!("Couldn't create memo: {e}"),
            )),
        }?;
        let output_index = Optional::read(&mut reader, CompactSize::read)?;

        Ok(OutgoingTxData {
            recipient_address: address,
            value,
            memo,
            recipient_ua: None,
            output_index,
        })
    }
}

/// TODO: Add Doc Comment Here!
pub const COMMITMENT_TREE_LEVELS: u8 = 32;
/// TODO: Add Doc Comment Here!
pub const MAX_SHARD_LEVEL: u8 = 16;
/// TODO: Add Doc Comment Here!
pub const MAX_REORG: usize = 100;

/// TODO: Add Doc Comment Here!
#[derive(Debug)]
pub struct WitnessTrees {
    /// TODO: Add Doc Comment Here!
    pub witness_tree_sapling: ShardTree<SapStore, COMMITMENT_TREE_LEVELS, MAX_SHARD_LEVEL>,
    /// TODO: Add Doc Comment Here!
    pub witness_tree_orchard: ShardTree<OrchStore, COMMITMENT_TREE_LEVELS, MAX_SHARD_LEVEL>,
}

impl WitnessTrees {
    /// TODO: Add Doc Comment Here!
    pub fn read<R: Read>(mut reader: R) -> io::Result<Self> {
        let _serialized_version = reader.read_u8()?;
        let witness_tree_sapling = read_shardtree(&mut reader)?;
        let witness_tree_orchard = read_shardtree(reader)?;
        Ok(Self {
            witness_tree_sapling,
            witness_tree_orchard,
        })
    }
}

impl Default for WitnessTrees {
    fn default() -> WitnessTrees {
        Self {
            witness_tree_sapling: shardtree::ShardTree::new(MemoryShardStore::empty(), MAX_REORG),
            witness_tree_orchard: shardtree::ShardTree::new(MemoryShardStore::empty(), MAX_REORG),
        }
    }
}

fn read_shardtree<
    H: Hashable + Clone + HashSer + Eq,
    C: Ord + std::fmt::Debug + Copy + From<u32>,
    R: Read,
>(
    mut reader: R,
) -> io::Result<shardtree::ShardTree<MemoryShardStore<H, C>, COMMITMENT_TREE_LEVELS, MAX_SHARD_LEVEL>>
{
    let shards = Vector::read(&mut reader, |r| {
        let level = Level::from(r.read_u8()?);
        let index = r.read_u64::<LittleEndian>()?;
        let root_addr = Address::from_parts(level, index);
        let shard = read_shard(r)?;

        LocatedPrunableTree::from_parts(root_addr, shard).map_err(|addr| {
            std::io::Error::new(
                std::io::ErrorKind::InvalidData,
                format!("parent node in root has level 0 relative to root address: {addr:?}"),
            )
        })
    })?;
    let mut store = MemoryShardStore::empty();
    for shard in shards {
        store.put_shard(shard).expect("Infallible");
    }
    let checkpoints = Vector::read(&mut reader, |r| {
        let checkpoint_id = C::from(r.read_u32::<LittleEndian>()?);
        let tree_state = match r.read_u8()? {
            0 => shardtree::store::TreeState::Empty,
            1 => shardtree::store::TreeState::AtPosition(Position::from(
                r.read_u64::<LittleEndian>()?,
            )),
            otherwise => {
                return Err(io::Error::new(
                    io::ErrorKind::InvalidData,
                    format!("error reading TreeState: expected boolean value, found {otherwise}"),
                ));
            }
        };
        let marks_removed = Vector::read(r, |r| r.read_u64::<LittleEndian>().map(Position::from))?;
        Ok((
            checkpoint_id,
            Checkpoint::from_parts(tree_state, marks_removed.into_iter().collect()),
        ))
    })?;
    for (checkpoint_id, checkpoint) in checkpoints {
        store
            .add_checkpoint(checkpoint_id, checkpoint)
            .expect("Infallible");
    }
    store.put_cap(read_shard(reader)?).expect("Infallible");
    Ok(shardtree::ShardTree::new(store, MAX_REORG))
}

pub(crate) type SapStore = MemoryShardStore<sapling_crypto::Node, BlockHeight>;
pub(crate) type OrchStore = MemoryShardStore<MerkleHashOrchard, BlockHeight>;

/// TODO: Add Doc Comment Here!
#[allow(dead_code)]
#[derive(Clone)]
pub struct WitnessCache<Node: Hashable> {
    /// TODO: Add Doc Comment Here!
    pub(crate) witnesses: Vec<IncrementalWitness<Node, 32>>,
    /// TODO: Add Doc Comment Here!
    pub top_height: u64,
}

impl<Node: Hashable> WitnessCache<Node> {
    /// TODO: Add Doc Comment Here!
    pub fn new(witnesses: Vec<IncrementalWitness<Node, 32>>, top_height: u64) -> Self {
        Self {
            witnesses,
            top_height,
        }
    }

    /// TODO: Add Doc Comment Here!
    pub fn last(&self) -> Option<&IncrementalWitness<Node, 32>> {
        self.witnesses.last()
    }
}

impl ReadableWriteable for ConfirmationStatus {
    const VERSION: u8 = 0;

    fn read<R: Read>(mut reader: R, _input: ()) -> io::Result<Self> {
        let _external_version = Self::get_version(&mut reader);
        let status = reader.read_u8()?;
        let height = BlockHeight::from_u32(reader.read_u32::<LittleEndian>()?);
        match status {
            0 => Ok(Self::Calculated(height)),
            1 => Ok(Self::Transmitted(height)),
            2 => Ok(Self::Mempool(height)),
            3 => Ok(Self::Confirmed(height)),
            _ => Err(io::Error::new(
                io::ErrorKind::InvalidData,
                "Bad confirmation status",
            )),
        }
    }

    fn write<W: Write>(&self, mut _writer: W, _input: ()) -> io::Result<()> {
        unimplemented!()
    }
}

/// TODO: Add Doc Comment Here!
#[allow(clippy::enum_variant_names)]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum MemoDownloadOption {
    /// TODO: Add Doc Comment Here!
    NoMemos,
    /// TODO: Add Doc Comment Here!
    WalletMemos,
    /// TODO: Add Doc Comment Here!
    AllMemos,
}

/// TODO: Add Doc Comment Here!
#[allow(dead_code)]
#[derive(Debug, Clone, Copy)]
pub struct WalletOptions {
    pub(crate) download_memos: MemoDownloadOption,
    /// TODO: Add Doc Comment Here!
    pub transaction_size_filter: Option<u32>,
}

/// TODO: Add Doc Comment Here!
pub const MAX_TRANSACTION_SIZE_DEFAULT: u32 = 500;

impl Default for WalletOptions {
    fn default() -> Self {
        WalletOptions {
            download_memos: MemoDownloadOption::WalletMemos,
            transaction_size_filter: Some(MAX_TRANSACTION_SIZE_DEFAULT),
        }
    }
}

impl WalletOptions {
    /// TODO: Add Doc Comment Here!
    pub fn read<R: Read>(mut reader: R) -> io::Result<Self> {
        let external_version = reader.read_u64::<LittleEndian>()?;

        let download_memos = match reader.read_u8()? {
            0 => MemoDownloadOption::NoMemos,
            1 => MemoDownloadOption::WalletMemos,
            2 => MemoDownloadOption::AllMemos,
            v => {
                return Err(io::Error::new(
                    io::ErrorKind::InvalidData,
                    format!("Bad download option {v}"),
                ));
            }
        };

        let transaction_size_filter = if external_version > 1 {
            Optional::read(reader, |mut r| r.read_u32::<LittleEndian>())?
        } else {
            Some(500)
        };

        Ok(Self {
            download_memos,
            transaction_size_filter,
        })
    }
}

/// Struct that tracks the latest and historical price of ZEC in the wallet
#[allow(dead_code)]
#[derive(Clone, Debug)]
pub struct WalletZecPriceInfo {
    /// Latest price of ZEC and when it was fetched
    pub zec_price: Option<(u64, f64)>,

    /// Wallet's currency. All the prices are in this currency
    pub currency: String,

    /// When the last time historical prices were fetched
    pub last_historical_prices_fetched_at: Option<u64>,

    /// Historical prices retry count
    pub historical_prices_retry_count: u64,
}

impl Default for WalletZecPriceInfo {
    fn default() -> Self {
        Self {
            zec_price: None,
            currency: "USD".to_string(), // Only USD is supported right now.
            last_historical_prices_fetched_at: None,
            historical_prices_retry_count: 0,
        }
    }
}

impl WalletZecPriceInfo {
    /// TODO: Add Doc Comment Here!
    pub fn serialized_version() -> u64 {
        20
    }

    /// TODO: Add Doc Comment Here!
    pub fn read<R: Read>(mut reader: R) -> io::Result<Self> {
        let version = reader.read_u64::<LittleEndian>()?;
        if version > Self::serialized_version() {
            return Err(io::Error::new(
                io::ErrorKind::InvalidData,
                "Can't read ZecPriceInfo because of incorrect version",
            ));
        }

        // The "current" zec price is not persisted, since it is almost certainly outdated
        let zec_price = None;

        // Currency is only USD for now
        let currency = "USD".to_string();

        let last_historical_prices_fetched_at = Optional::read(
            &mut reader,
            byteorder::ReadBytesExt::read_u64::<LittleEndian>,
        )?;
        let historical_prices_retry_count = reader.read_u64::<LittleEndian>()?;

        Ok(Self {
            zec_price,
            currency,
            last_historical_prices_fetched_at,
            historical_prices_retry_count,
        })
    }
}
