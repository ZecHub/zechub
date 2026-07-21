//! Serialization and de-serialization of wallet structs in [`crate::wallet`] including utilities.

use std::{
    collections::{BTreeMap, BTreeSet},
    io::{Read, Write},
    ops::Range,
};

use byteorder::{LittleEndian, ReadBytesExt, WriteBytesExt};

use incrementalmerkletree::{Hashable, Position};
use shardtree::{
    LocatedPrunableTree, ShardTree,
    store::{Checkpoint, ShardStore, TreeState, memory::MemoryShardStore},
};
use zcash_client_backend::serialization::shardtree::{read_shard, write_shard};
use zcash_encoding::{Optional, Vector};
use zcash_primitives::{
    block::BlockHash,
    merkle_tree::HashSer,
    transaction::{Transaction, TxId},
};
use zcash_protocol::{
    consensus::{self, BlockHeight},
    memo::Memo,
    value::Zatoshis,
};
use zcash_transparent::address::Script;

use zcash_transparent::keys::NonHardenedChildIndex;
use zingo_status::confirmation_status::ConfirmationStatus;

use crate::{
    keys::{
        KeyId, decode_unified_address,
        transparent::{TransparentAddressId, TransparentScope},
    },
    sync::{MAX_REORG_ALLOWANCE, ScanPriority, ScanRange},
    wallet::ScanTarget,
};

use super::{
    InitialSyncState, KeyIdInterface, NullifierMap, OrchardNote, OutgoingNote,
    OutgoingNoteInterface, OutgoingOrchardNote, OutgoingSaplingNote, OutputId, OutputInterface,
    SaplingNote, ShardTrees, SyncState, TransparentCoin, TreeBounds, WalletBlock, WalletNote,
    WalletTransaction,
};

fn read_string<R: Read>(mut reader: R) -> std::io::Result<String> {
    let str_len = reader.read_u64::<LittleEndian>()?;
    let mut str_bytes = vec![0; str_len as usize];
    reader.read_exact(&mut str_bytes)?;

    String::from_utf8(str_bytes)
        .map_err(|e| std::io::Error::new(std::io::ErrorKind::InvalidData, e.to_string()))
}

fn write_string<W: Write>(mut writer: W, str: &str) -> std::io::Result<()> {
    writer.write_u64::<LittleEndian>(str.len() as u64)?;
    writer.write_all(str.as_bytes())
}

impl ScanTarget {
    fn serialized_version() -> u8 {
        0
    }

    /// Deserialize into `reader`
    pub fn read<R: Read>(mut reader: R) -> std::io::Result<Self> {
        let _version = reader.read_u8()?;
        let block_height = BlockHeight::from_u32(reader.read_u32::<LittleEndian>()?);
        let txid = TxId::read(&mut reader)?;
        let narrow_scan_area = reader.read_u8()? != 0;

        Ok(Self {
            block_height,
            txid,
            narrow_scan_area,
        })
    }

    /// Serialize into `writer`
    pub fn write<W: Write>(&self, writer: &mut W) -> std::io::Result<()> {
        writer.write_u8(Self::serialized_version())?;
        writer.write_u32::<LittleEndian>(self.block_height.into())?;
        self.txid.write(&mut *writer)?;
        writer.write_u8(u8::from(self.narrow_scan_area))
    }
}

impl SyncState {
    fn serialized_version() -> u8 {
        3
    }

    /// Deserialize into `reader`
    pub fn read<R: Read>(mut reader: R) -> std::io::Result<Self> {
        let version = reader.read_u8()?;
        let scan_ranges = Vector::read(&mut reader, |r| {
            let start = BlockHeight::from_u32(r.read_u32::<LittleEndian>()?);
            let end = BlockHeight::from_u32(r.read_u32::<LittleEndian>()?);
            let priority = match version {
                3.. => match r.read_u8()? {
                    0 => Ok(ScanPriority::RefetchingNullifiers),
                    1 => Ok(ScanPriority::Scanning),
                    2 => Ok(ScanPriority::Scanned),
                    3 => Ok(ScanPriority::ScannedWithoutMapping),
                    4 => Ok(ScanPriority::Historic),
                    5 => Ok(ScanPriority::OpenAdjacent),
                    6 => Ok(ScanPriority::FoundNote),
                    7 => Ok(ScanPriority::ChainTip),
                    8 => Ok(ScanPriority::Verify),
                    _ => Err(std::io::Error::new(
                        std::io::ErrorKind::InvalidData,
                        "invalid scan priority",
                    )),
                }?,
                2 => match r.read_u8()? {
                    0 => Ok(ScanPriority::Scanning),
                    1 => Ok(ScanPriority::Scanned),
                    2 => Ok(ScanPriority::ScannedWithoutMapping),
                    3 => Ok(ScanPriority::Historic),
                    4 => Ok(ScanPriority::OpenAdjacent),
                    5 => Ok(ScanPriority::FoundNote),
                    6 => Ok(ScanPriority::ChainTip),
                    7 => Ok(ScanPriority::Verify),
                    _ => Err(std::io::Error::new(
                        std::io::ErrorKind::InvalidData,
                        "invalid scan priority",
                    )),
                }?,
                0 | 1 => match r.read_u8()? {
                    0 => Ok(ScanPriority::Scanning),
                    1 => Ok(ScanPriority::Scanned),
                    2 => Ok(ScanPriority::Historic),
                    3 => Ok(ScanPriority::OpenAdjacent),
                    4 => Ok(ScanPriority::FoundNote),
                    5 => Ok(ScanPriority::ChainTip),
                    6 => Ok(ScanPriority::Verify),
                    _ => Err(std::io::Error::new(
                        std::io::ErrorKind::InvalidData,
                        "invalid scan priority",
                    )),
                }?,
            };

            Ok(ScanRange::from_parts(start..end, priority))
        })?;
        let sapling_shard_ranges = Vector::read(&mut reader, |r| {
            let start = BlockHeight::from_u32(r.read_u32::<LittleEndian>()?);
            let end = BlockHeight::from_u32(r.read_u32::<LittleEndian>()?);

            Ok(start..end)
        })?;
        let orchard_shard_ranges = Vector::read(&mut reader, |r| {
            let start = BlockHeight::from_u32(r.read_u32::<LittleEndian>()?);
            let end = BlockHeight::from_u32(r.read_u32::<LittleEndian>()?);

            Ok(start..end)
        })?;
        let scan_targets = Vector::read(&mut reader, |r| {
            Ok(if version >= 1 {
                ScanTarget::read(r)?
            } else {
                let block_height = BlockHeight::from_u32(r.read_u32::<LittleEndian>()?);
                let txid = TxId::read(r)?;

                ScanTarget {
                    block_height,
                    txid,
                    narrow_scan_area: true,
                }
            })
        })?
        .into_iter()
        .collect::<BTreeSet<_>>();

        Ok(Self {
            scan_ranges,
            sapling_shard_ranges,
            orchard_shard_ranges,
            scan_targets,
            initial_sync_state: InitialSyncState::new(),
        })
    }

    /// Serialize into `writer`
    pub fn write<W: Write>(&mut self, mut writer: W) -> std::io::Result<()> {
        writer.write_u8(Self::serialized_version())?;
        Vector::write(&mut writer, self.scan_ranges(), |w, scan_range| {
            w.write_u32::<LittleEndian>(scan_range.block_range().start.into())?;
            w.write_u32::<LittleEndian>(scan_range.block_range().end.into())?;
            w.write_u8(scan_range.priority() as u8)
        })?;
        Vector::write(&mut writer, &self.sapling_shard_ranges, |w, shard_range| {
            w.write_u32::<LittleEndian>(shard_range.start.into())?;
            w.write_u32::<LittleEndian>(shard_range.end.into())
        })?;
        Vector::write(&mut writer, &self.orchard_shard_ranges, |w, shard_range| {
            w.write_u32::<LittleEndian>(shard_range.start.into())?;
            w.write_u32::<LittleEndian>(shard_range.end.into())
        })?;
        Vector::write(
            &mut writer,
            &self.scan_targets.iter().collect::<Vec<_>>(),
            |w, &scan_target| scan_target.write(w),
        )
    }
}

impl TreeBounds {
    fn serialized_version() -> u8 {
        0
    }

    /// Deserialize into `reader`
    pub fn read<R: Read>(mut reader: R) -> std::io::Result<Self> {
        let _version = reader.read_u8()?;
        let sapling_initial_tree_size = reader.read_u32::<LittleEndian>()?;
        let sapling_final_tree_size = reader.read_u32::<LittleEndian>()?;
        let orchard_initial_tree_size = reader.read_u32::<LittleEndian>()?;
        let orchard_final_tree_size = reader.read_u32::<LittleEndian>()?;

        Ok(Self {
            sapling_initial_tree_size,
            sapling_final_tree_size,
            orchard_initial_tree_size,
            orchard_final_tree_size,
        })
    }

    /// Serialize into `writer`
    pub fn write<W: Write>(&self, writer: &mut W) -> std::io::Result<()> {
        writer.write_u8(Self::serialized_version())?;
        writer.write_u32::<LittleEndian>(self.sapling_initial_tree_size)?;
        writer.write_u32::<LittleEndian>(self.sapling_final_tree_size)?;
        writer.write_u32::<LittleEndian>(self.orchard_initial_tree_size)?;
        writer.write_u32::<LittleEndian>(self.orchard_final_tree_size)
    }
}

impl NullifierMap {
    fn serialized_version() -> u8 {
        1
    }

    /// Deserialize into `reader`
    pub fn read<R: Read>(mut reader: R) -> std::io::Result<Self> {
        let version = reader.read_u8()?;
        let sapling = Vector::read(&mut reader, |r| {
            let mut nullifier_bytes = [0u8; 32];
            r.read_exact(&mut nullifier_bytes)?;
            let nullifier =
                sapling_crypto::Nullifier::from_slice(&nullifier_bytes).map_err(|e| {
                    std::io::Error::new(
                        std::io::ErrorKind::InvalidData,
                        format!("failed to read nullifier. {e}"),
                    )
                })?;
            let scan_target = if version >= 1 {
                ScanTarget::read(r)?
            } else {
                let block_height = BlockHeight::from_u32(r.read_u32::<LittleEndian>()?);
                let txid = TxId::read(r)?;

                ScanTarget {
                    block_height,
                    txid,
                    narrow_scan_area: false,
                }
            };

            Ok((nullifier, scan_target))
        })?
        .into_iter()
        .collect::<BTreeMap<_, _>>();

        let orchard = Vector::read(&mut reader, |r| {
            let mut nullifier_bytes = [0u8; 32];
            r.read_exact(&mut nullifier_bytes)?;
            let nullifier = orchard::note::Nullifier::from_bytes(&nullifier_bytes)
                .expect("nullifier bytes should be valid");
            let scan_target = if version >= 1 {
                ScanTarget::read(r)?
            } else {
                let block_height = BlockHeight::from_u32(r.read_u32::<LittleEndian>()?);
                let txid = TxId::read(r)?;

                ScanTarget {
                    block_height,
                    txid,
                    narrow_scan_area: false,
                }
            };

            Ok((nullifier, scan_target))
        })?
        .into_iter()
        .collect::<BTreeMap<_, _>>();

        Ok(NullifierMap { sapling, orchard })
    }

    /// Serialize into `writer`
    pub fn write<W: Write>(&self, mut writer: W) -> std::io::Result<()> {
        writer.write_u8(Self::serialized_version())?;
        Vector::write(
            &mut writer,
            &self.sapling.iter().collect::<Vec<_>>(),
            |w, &(&nullifier, &scan_target)| {
                w.write_all(nullifier.as_ref())?;
                scan_target.write(w)
            },
        )?;
        Vector::write(
            &mut writer,
            &self.orchard.iter().collect::<Vec<_>>(),
            |w, &(&nullifier, &scan_target)| {
                w.write_all(&nullifier.to_bytes())?;
                scan_target.write(w)
            },
        )
    }
}

impl WalletBlock {
    fn serialized_version() -> u8 {
        0
    }

    /// Deserialize into `reader`
    pub fn read<R: Read>(mut reader: R) -> std::io::Result<Self> {
        let _version = reader.read_u8()?;
        let block_height = BlockHeight::from_u32(reader.read_u32::<LittleEndian>()?);
        let mut block_hash = BlockHash([0u8; 32]);
        reader.read_exact(&mut block_hash.0)?;
        let mut prev_hash = BlockHash([0u8; 32]);
        reader.read_exact(&mut prev_hash.0)?;
        let time = reader.read_u32::<LittleEndian>()?;
        let txids = Vector::read(&mut reader, |r| TxId::read(r))?;
        let tree_bounds = TreeBounds::read(&mut reader)?;

        Ok(Self {
            block_height,
            block_hash,
            prev_hash,
            time,
            txids,
            tree_bounds,
        })
    }

    /// Serialize into `writer`
    pub fn write<W: Write>(&self, mut writer: W) -> std::io::Result<()> {
        writer.write_u8(Self::serialized_version())?;
        writer.write_u32::<LittleEndian>(self.block_height.into())?;
        writer.write_all(&self.block_hash.0)?;
        writer.write_all(&self.prev_hash.0)?;
        writer.write_u32::<LittleEndian>(self.time)?;
        Vector::write(&mut writer, self.txids(), |w, txid| txid.write(w))?;
        self.tree_bounds.write(&mut writer)
    }
}

impl WalletTransaction {
    fn serialized_version() -> u8 {
        0
    }

    /// Deserialize into `reader`
    pub fn read<R: Read>(
        mut reader: R,
        consensus_parameters: &impl consensus::Parameters,
    ) -> std::io::Result<Self> {
        let _version = reader.read_u8()?;
        let txid = TxId::read(&mut reader)?;
        let status = ConfirmationStatus::read(&mut reader)?;
        let transaction = Transaction::read(
            &mut reader,
            consensus::BranchId::for_height(consensus_parameters, status.get_height()),
        )?;
        let datetime = reader.read_u32::<LittleEndian>()?;
        let transparent_coins = Vector::read(&mut reader, |r| TransparentCoin::read(r))?;
        let sapling_notes = Vector::read(&mut reader, |r| SaplingNote::read(r))?;
        let orchard_notes = Vector::read(&mut reader, |r| OrchardNote::read(r))?;
        let outgoing_sapling_notes = Vector::read(&mut reader, |r| {
            OutgoingSaplingNote::read(r, consensus_parameters)
        })?;
        let outgoing_orchard_notes = Vector::read(&mut reader, |r| {
            OutgoingOrchardNote::read(r, consensus_parameters)
        })?;

        Ok(Self {
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

    /// Serialize into `writer`
    pub fn write<W: Write>(
        &self,
        mut writer: W,
        consensus_parameters: &impl consensus::Parameters,
    ) -> std::io::Result<()> {
        writer.write_u8(Self::serialized_version())?;
        self.txid.write(&mut writer)?;
        self.status.write(&mut writer)?;
        self.transaction.write(&mut writer)?;
        writer.write_u32::<LittleEndian>(self.datetime)?;
        Vector::write(&mut writer, self.transparent_coins(), |w, output| {
            output.write(w)
        })?;
        Vector::write(&mut writer, self.sapling_notes(), |w, output| {
            output.write(w)
        })?;
        Vector::write(&mut writer, self.orchard_notes(), |w, output| {
            output.write(w)
        })?;
        Vector::write(&mut writer, self.outgoing_sapling_notes(), |w, output| {
            output.write(w, consensus_parameters)
        })?;
        Vector::write(&mut writer, self.outgoing_orchard_notes(), |w, output| {
            output.write(w, consensus_parameters)
        })
    }
}

impl TransparentCoin {
    fn serialized_version() -> u8 {
        0
    }

    /// Deserialize into `reader`
    pub fn read<R: Read>(mut reader: R) -> std::io::Result<Self> {
        let _version = reader.read_u8()?;

        let txid = TxId::read(&mut reader)?;
        let output_index = reader.read_u16::<LittleEndian>()?;

        let account_id = zip32::AccountId::try_from(reader.read_u32::<LittleEndian>()?)
            .expect("only valid account ids written");
        let scope = TransparentScope::try_from(reader.read_u8()?)?;
        let address_index = reader.read_u32::<LittleEndian>()?;

        let address = read_string(&mut reader)?;
        let script = Script::read(&mut reader)?;
        let value = Zatoshis::from_u64(reader.read_u64::<LittleEndian>()?)
            .expect("only valid values written");
        let spending_transaction = Optional::read(&mut reader, TxId::read)?;

        Ok(Self {
            output_id: OutputId { txid, output_index },
            key_id: TransparentAddressId::new(
                account_id,
                scope,
                NonHardenedChildIndex::from_index(address_index)
                    .expect("only non-hardened child indexes should be written"),
            ),
            address,
            value,
            script,
            spending_transaction,
        })
    }

    /// Serialize into `writer`
    pub fn write<W: Write>(&self, mut writer: W) -> std::io::Result<()> {
        writer.write_u8(Self::serialized_version())?;

        self.output_id.txid().write(&mut writer)?;
        writer.write_u16::<LittleEndian>(self.output_id.output_index())?;

        writer.write_u32::<LittleEndian>(self.key_id.account_id().into())?;
        writer.write_u8(self.key_id.scope() as u8)?;
        writer.write_u32::<LittleEndian>(self.key_id.address_index().index())?;

        write_string(&mut writer, &self.address)?;
        self.script.write(&mut writer)?;
        writer.write_u64::<LittleEndian>(self.value())?;
        Optional::write(&mut writer, self.spending_transaction, |w, txid| {
            txid.write(w)
        })?;

        Ok(())
    }
}

impl<N, Nf: Copy> WalletNote<N, Nf> {
    fn serialized_version() -> u8 {
        1
    }
}

fn read_refetch_nullifier_ranges(
    reader: &mut impl Read,
    version: u8,
) -> std::io::Result<Vec<Range<BlockHeight>>> {
    if version >= 1 {
        Vector::read(reader, |r| {
            let start = r.read_u32::<LittleEndian>()?;
            let end = r.read_u32::<LittleEndian>()?;
            Ok(BlockHeight::from_u32(start)..BlockHeight::from_u32(end))
        })
    } else {
        Ok(Vec::new())
    }
}

fn write_refetch_nullifier_ranges(
    writer: &mut impl Write,
    ranges: &[Range<BlockHeight>],
) -> std::io::Result<()> {
    Vector::write(writer, ranges, |w, range| {
        w.write_u32::<LittleEndian>(range.start.into())?;
        w.write_u32::<LittleEndian>(range.end.into())
    })
}

impl SaplingNote {
    /// Deserialize into `reader`
    pub fn read<R: Read>(mut reader: R) -> std::io::Result<Self> {
        let version = reader.read_u8()?;

        let txid = TxId::read(&mut reader)?;
        let output_index = reader.read_u16::<LittleEndian>()?;

        let account_id =
            zip32::AccountId::try_from(reader.read_u32::<LittleEndian>()?).map_err(|e| {
                std::io::Error::new(
                    std::io::ErrorKind::InvalidData,
                    format!("failed to read account id. {e}"),
                )
            })?;
        let scope = match reader.read_u8()? {
            0 => Ok(zip32::Scope::External),
            1 => Ok(zip32::Scope::Internal),
            _ => Err(std::io::Error::new(
                std::io::ErrorKind::InvalidData,
                "invalid scope value",
            )),
        }?;

        let mut address_bytes = [0u8; 43];
        reader.read_exact(&mut address_bytes)?;
        let recipient =
            sapling_crypto::PaymentAddress::from_bytes(&address_bytes).ok_or_else(|| {
                std::io::Error::new(
                    std::io::ErrorKind::InvalidData,
                    "failed to read payment address",
                )
            })?;
        let value = sapling_crypto::value::NoteValue::from_raw(reader.read_u64::<LittleEndian>()?);
        let rseed_zip212 = reader.read_u8()?;
        let mut rseed_bytes = [0u8; 32];
        reader.read_exact(&mut rseed_bytes)?;
        let rseed = match rseed_zip212 {
            0 => sapling_crypto::Rseed::BeforeZip212(
                jubjub::Fr::from_bytes(&rseed_bytes).expect("should read valid jubjub bytes"),
            ),
            1 => sapling_crypto::Rseed::AfterZip212(rseed_bytes),
            _ => {
                return Err(std::io::Error::new(
                    std::io::ErrorKind::InvalidData,
                    "invalid rseed zip212 byte",
                ));
            }
        };

        let nullifier = Optional::read(&mut reader, |r| {
            let mut nullifier_bytes = [0u8; 32];
            r.read_exact(&mut nullifier_bytes)?;

            sapling_crypto::Nullifier::from_slice(&nullifier_bytes).map_err(|e| {
                std::io::Error::new(
                    std::io::ErrorKind::InvalidData,
                    format!("failed to read nullifier. {e}"),
                )
            })
        })?;
        let position = Optional::read(&mut reader, |r| {
            Ok(Position::from(r.read_u64::<LittleEndian>()?))
        })?;
        let mut memo_bytes = [0u8; 512];
        reader.read_exact(&mut memo_bytes)?;
        let memo = Memo::from_bytes(&memo_bytes).map_err(|e| {
            std::io::Error::new(
                std::io::ErrorKind::InvalidData,
                format!("failed to read memo. {e}"),
            )
        })?;

        let spending_transaction = Optional::read(&mut reader, TxId::read)?;
        let refetch_nullifier_ranges = read_refetch_nullifier_ranges(&mut reader, version)?;

        Ok(Self {
            output_id: OutputId::new(txid, output_index),
            key_id: KeyId::from_parts(account_id, scope),
            note: sapling_crypto::Note::from_parts(recipient, value, rseed),
            nullifier,
            position,
            memo,
            spending_transaction,
            refetch_nullifier_ranges,
        })
    }

    /// Serialize into `writer`
    pub fn write<W: Write>(&self, mut writer: W) -> std::io::Result<()> {
        writer.write_u8(Self::serialized_version())?;

        self.output_id.txid().write(&mut writer)?;
        writer.write_u16::<LittleEndian>(self.output_id.output_index())?;

        writer.write_u32::<LittleEndian>(self.key_id.account_id.into())?;
        writer.write_u8(self.key_id.scope as u8)?;

        writer.write_all(&self.note.recipient().to_bytes())?;
        writer.write_u64::<LittleEndian>(self.value())?;
        match self.note.rseed() {
            sapling_crypto::Rseed::BeforeZip212(fr) => {
                writer.write_u8(0)?;
                writer.write_all(&fr.to_bytes())?;
            }
            sapling_crypto::Rseed::AfterZip212(bytes) => {
                writer.write_u8(1)?;
                writer.write_all(bytes)?;
            }
        }

        Optional::write(&mut writer, self.nullifier, |w, nullifier| {
            w.write_all(nullifier.as_ref())
        })?;
        Optional::write(&mut writer, self.position, |w, position| {
            w.write_u64::<LittleEndian>(position.into())
        })?;
        writer.write_all(self.memo.encode().as_array())?;

        Optional::write(&mut writer, self.spending_transaction, |w, txid| {
            txid.write(w)
        })?;

        write_refetch_nullifier_ranges(&mut writer, &self.refetch_nullifier_ranges)
    }
}

impl OrchardNote {
    /// Deserialize into `reader`
    pub fn read<R: Read>(mut reader: R) -> std::io::Result<Self> {
        let version = reader.read_u8()?;

        let txid = TxId::read(&mut reader)?;
        let output_index = reader.read_u16::<LittleEndian>()?;

        let account_id =
            zip32::AccountId::try_from(reader.read_u32::<LittleEndian>()?).map_err(|e| {
                std::io::Error::new(
                    std::io::ErrorKind::InvalidData,
                    format!("failed to read account id. {e}"),
                )
            })?;
        let scope = match reader.read_u8()? {
            0 => Ok(zip32::Scope::External),
            1 => Ok(zip32::Scope::Internal),
            _ => Err(std::io::Error::new(
                std::io::ErrorKind::InvalidData,
                "invalid scope value",
            )),
        }?;

        let mut address_bytes = [0u8; 43];
        reader.read_exact(&mut address_bytes)?;
        let recipient = orchard::Address::from_raw_address_bytes(&address_bytes)
            .expect("should be a valid address");
        let value = orchard::value::NoteValue::from_raw(reader.read_u64::<LittleEndian>()?);
        let mut rho_bytes = [0u8; 32];
        reader.read_exact(&mut rho_bytes)?;
        let rho = orchard::note::Rho::from_bytes(&rho_bytes).expect("should be valid rho bytes");
        let mut rseed_bytes = [0u8; 32];
        reader.read_exact(&mut rseed_bytes)?;
        let rseed = orchard::note::RandomSeed::from_bytes(rseed_bytes, &rho)
            .expect("should be valid random seed bytes");

        let nullifier = Optional::read(&mut reader, |r| {
            let mut nullifier_bytes = [0u8; 32];
            r.read_exact(&mut nullifier_bytes)?;

            Ok(orchard::note::Nullifier::from_bytes(&nullifier_bytes)
                .expect("should be valid nullfiier bytes"))
        })?;
        let position = Optional::read(&mut reader, |r| {
            Ok(Position::from(r.read_u64::<LittleEndian>()?))
        })?;
        let mut memo_bytes = [0u8; 512];
        reader.read_exact(&mut memo_bytes)?;
        let memo = Memo::from_bytes(&memo_bytes).map_err(|e| {
            std::io::Error::new(
                std::io::ErrorKind::InvalidData,
                format!("failed to read memo. {e}"),
            )
        })?;

        let spending_transaction = Optional::read(&mut reader, TxId::read)?;
        let refetch_nullifier_ranges = read_refetch_nullifier_ranges(&mut reader, version)?;

        Ok(Self {
            output_id: OutputId::new(txid, output_index),
            key_id: KeyId::from_parts(account_id, scope),
            note: orchard::note::Note::from_parts(recipient, value, rho, rseed)
                .expect("should be a valid orchard note"),
            nullifier,
            position,
            memo,
            spending_transaction,
            refetch_nullifier_ranges,
        })
    }

    /// Serialize into `writer`
    pub fn write<W: Write>(&self, mut writer: W) -> std::io::Result<()> {
        writer.write_u8(Self::serialized_version())?;

        self.output_id.txid().write(&mut writer)?;
        writer.write_u16::<LittleEndian>(self.output_id.output_index())?;

        writer.write_u32::<LittleEndian>(self.key_id.account_id.into())?;
        writer.write_u8(self.key_id.scope as u8)?;

        writer.write_all(&self.note.recipient().to_raw_address_bytes())?;
        writer.write_u64::<LittleEndian>(self.value())?;
        writer.write_all(&self.note.rho().to_bytes())?;
        writer.write_all(self.note.rseed().as_bytes())?;

        Optional::write(&mut writer, self.nullifier, |w, nullifier| {
            w.write_all(&nullifier.to_bytes())
        })?;
        Optional::write(&mut writer, self.position, |w, position| {
            w.write_u64::<LittleEndian>(position.into())
        })?;
        writer.write_all(self.memo.encode().as_array())?;
        Optional::write(&mut writer, self.spending_transaction, |w, txid| {
            txid.write(w)
        })?;

        write_refetch_nullifier_ranges(&mut writer, &self.refetch_nullifier_ranges)
    }
}

impl<N> OutgoingNote<N> {
    fn serialized_version() -> u8 {
        0
    }
}

impl OutgoingSaplingNote {
    /// Deserialize into `reader`
    pub fn read<R: Read>(
        mut reader: R,
        consensus_parameters: &impl consensus::Parameters,
    ) -> std::io::Result<Self> {
        let _version = reader.read_u8()?;

        let txid = TxId::read(&mut reader)?;
        let output_index = reader.read_u16::<LittleEndian>()?;

        let account_id =
            zip32::AccountId::try_from(reader.read_u32::<LittleEndian>()?).map_err(|e| {
                std::io::Error::new(
                    std::io::ErrorKind::InvalidData,
                    format!("failed to read account id. {e}"),
                )
            })?;
        let scope = match reader.read_u8()? {
            0 => Ok(zip32::Scope::External),
            1 => Ok(zip32::Scope::Internal),
            _ => Err(std::io::Error::new(
                std::io::ErrorKind::InvalidData,
                "invalid scope value",
            )),
        }?;

        let mut address_bytes = [0u8; 43];
        reader.read_exact(&mut address_bytes)?;
        let recipient =
            sapling_crypto::PaymentAddress::from_bytes(&address_bytes).ok_or_else(|| {
                std::io::Error::new(
                    std::io::ErrorKind::InvalidData,
                    "failed to read payment address",
                )
            })?;
        let value = sapling_crypto::value::NoteValue::from_raw(reader.read_u64::<LittleEndian>()?);
        let rseed_zip212 = reader.read_u8()?;
        let mut rseed_bytes = [0u8; 32];
        reader.read_exact(&mut rseed_bytes)?;
        let rseed = match rseed_zip212 {
            0 => sapling_crypto::Rseed::BeforeZip212(
                jubjub::Fr::from_bytes(&rseed_bytes).expect("should read valid jubjub bytes"),
            ),
            1 => sapling_crypto::Rseed::AfterZip212(rseed_bytes),
            _ => {
                return Err(std::io::Error::new(
                    std::io::ErrorKind::InvalidData,
                    "invalid rseed zip212 byte",
                ));
            }
        };

        let mut memo_bytes = [0u8; 512];
        reader.read_exact(&mut memo_bytes)?;
        let memo = Memo::from_bytes(&memo_bytes).map_err(|e| {
            std::io::Error::new(
                std::io::ErrorKind::InvalidData,
                format!("failed to read memo. {e}"),
            )
        })?;

        let recipient_unified_address = Optional::read(&mut reader, |r| {
            let encoded_address = read_string(r)?;

            decode_unified_address(consensus_parameters, &encoded_address)
        })?;

        Ok(Self {
            output_id: OutputId::new(txid, output_index),
            key_id: KeyId::from_parts(account_id, scope),
            note: sapling_crypto::Note::from_parts(recipient, value, rseed),
            memo,
            recipient_full_unified_address: recipient_unified_address,
        })
    }

    /// Serialize into `writer`
    pub fn write<W: Write>(
        &self,
        mut writer: W,
        consensus_parameters: &impl consensus::Parameters,
    ) -> std::io::Result<()> {
        writer.write_u8(Self::serialized_version())?;

        self.output_id.txid().write(&mut writer)?;
        writer.write_u16::<LittleEndian>(self.output_id.output_index())?;

        writer.write_u32::<LittleEndian>(self.key_id.account_id.into())?;
        writer.write_u8(self.key_id.scope as u8)?;

        writer.write_all(&self.note.recipient().to_bytes())?;
        writer.write_u64::<LittleEndian>(self.value())?;
        match self.note.rseed() {
            sapling_crypto::Rseed::BeforeZip212(fr) => {
                writer.write_u8(0)?;
                writer.write_all(&fr.to_bytes())?;
            }
            sapling_crypto::Rseed::AfterZip212(bytes) => {
                writer.write_u8(1)?;
                writer.write_all(bytes)?;
            }
        }

        writer.write_all(self.memo.encode().as_array())?;
        Optional::write(
            &mut writer,
            self.recipient_full_unified_address.as_ref(),
            |w, unified_address| write_string(w, &unified_address.encode(consensus_parameters)),
        )?;

        Ok(())
    }
}

impl OutgoingOrchardNote {
    /// Deserialize into `reader`
    pub fn read<R: Read>(
        mut reader: R,
        consensus_parameters: &impl consensus::Parameters,
    ) -> std::io::Result<Self> {
        let _version = reader.read_u8()?;

        let txid = TxId::read(&mut reader)?;
        let output_index = reader.read_u16::<LittleEndian>()?;

        let account_id =
            zip32::AccountId::try_from(reader.read_u32::<LittleEndian>()?).map_err(|e| {
                std::io::Error::new(
                    std::io::ErrorKind::InvalidData,
                    format!("failed to read account id. {e}"),
                )
            })?;
        let scope = match reader.read_u8()? {
            0 => Ok(zip32::Scope::External),
            1 => Ok(zip32::Scope::Internal),
            _ => Err(std::io::Error::new(
                std::io::ErrorKind::InvalidData,
                "invalid scope value",
            )),
        }?;

        let mut address_bytes = [0u8; 43];
        reader.read_exact(&mut address_bytes)?;
        let recipient = orchard::Address::from_raw_address_bytes(&address_bytes)
            .expect("should be a valid address");
        let value = orchard::value::NoteValue::from_raw(reader.read_u64::<LittleEndian>()?);
        let mut rho_bytes = [0u8; 32];
        reader.read_exact(&mut rho_bytes)?;
        let rho = orchard::note::Rho::from_bytes(&rho_bytes).expect("should be valid rho bytes");
        let mut rseed_bytes = [0u8; 32];
        reader.read_exact(&mut rseed_bytes)?;
        let rseed = orchard::note::RandomSeed::from_bytes(rseed_bytes, &rho)
            .expect("should be valid random seed bytes");

        let mut memo_bytes = [0u8; 512];
        reader.read_exact(&mut memo_bytes)?;
        let memo = Memo::from_bytes(&memo_bytes).map_err(|e| {
            std::io::Error::new(
                std::io::ErrorKind::InvalidData,
                format!("failed to read memo. {e}"),
            )
        })?;

        let recipient_unified_address = Optional::read(&mut reader, |r| {
            let encoded_address = read_string(r)?;

            decode_unified_address(consensus_parameters, &encoded_address)
        })?;

        Ok(Self {
            output_id: OutputId::new(txid, output_index),
            key_id: KeyId::from_parts(account_id, scope),
            note: orchard::note::Note::from_parts(recipient, value, rho, rseed)
                .expect("should be a valid orchard note"),
            memo,
            recipient_full_unified_address: recipient_unified_address,
        })
    }

    /// Serialize into `writer`
    pub fn write<W: Write>(
        &self,
        mut writer: W,
        consensus_parameters: &impl consensus::Parameters,
    ) -> std::io::Result<()> {
        writer.write_u8(Self::serialized_version())?;

        self.output_id.txid().write(&mut writer)?;
        writer.write_u16::<LittleEndian>(self.output_id.output_index())?;

        writer.write_u32::<LittleEndian>(self.key_id.account_id.into())?;
        writer.write_u8(self.key_id.scope as u8)?;

        writer.write_all(&self.note.recipient().to_raw_address_bytes())?;
        writer.write_u64::<LittleEndian>(self.value())?;
        writer.write_all(&self.note.rho().to_bytes())?;
        writer.write_all(self.note.rseed().as_bytes())?;

        writer.write_all(self.memo.encode().as_array())?;
        Optional::write(
            &mut writer,
            self.recipient_full_unified_address.as_ref(),
            |w, unified_address| write_string(w, &unified_address.encode(consensus_parameters)),
        )?;

        Ok(())
    }
}

impl ShardTrees {
    fn serialized_version() -> u8 {
        0
    }

    /// Deserialize into `reader`
    pub fn read<R: Read>(mut reader: R) -> std::io::Result<Self> {
        let _version = reader.read_u8()?;
        let sapling = Self::read_shardtree(&mut reader)?;
        let orchard = Self::read_shardtree(&mut reader)?;

        Ok(Self { sapling, orchard })
    }

    /// Serialize into `writer`
    pub fn write<W: Write>(&mut self, mut writer: W) -> std::io::Result<()> {
        writer.write_u8(Self::serialized_version())?;
        Self::write_shardtree(&mut writer, &mut self.sapling)?;
        Self::write_shardtree(&mut writer, &mut self.orchard)?;

        Ok(())
    }

    fn read_shardtree<
        H: Hashable + Clone + HashSer + Eq,
        C: Ord + std::fmt::Debug + Copy + From<u32>,
        R: Read,
        const DEPTH: u8,
        const SHARD_HEIGHT: u8,
    >(
        mut reader: R,
    ) -> std::io::Result<ShardTree<MemoryShardStore<H, C>, DEPTH, SHARD_HEIGHT>> {
        let shards = Vector::read(&mut reader, |r| {
            let level = incrementalmerkletree::Level::from(r.read_u8()?);
            let index = r.read_u64::<LittleEndian>()?;
            let root_addr = incrementalmerkletree::Address::from_parts(level, index);
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
            store.put_shard(shard).expect("infallible");
        }
        let checkpoints = Vector::read(&mut reader, |r| {
            let checkpoint_id = C::from(r.read_u32::<LittleEndian>()?);
            let tree_state = match r.read_u8()? {
                0 => TreeState::Empty,
                1 => TreeState::AtPosition(Position::from(r.read_u64::<LittleEndian>()?)),
                otherwise => {
                    return Err(std::io::Error::new(
                        std::io::ErrorKind::InvalidData,
                        format!(
                            "failed to read TreeState. expected boolean value, found {otherwise}"
                        ),
                    ));
                }
            };
            let marks_removed =
                Vector::read(r, |r| r.read_u64::<LittleEndian>().map(Position::from))?;
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

        Ok(shardtree::ShardTree::new(
            store,
            MAX_REORG_ALLOWANCE as usize,
        ))
    }

    /// Write memory-backed shardstore, represented tree.
    fn write_shardtree<
        H: Hashable + Clone + Eq + HashSer,
        C: Ord + std::fmt::Debug + Copy,
        W: Write,
        const DEPTH: u8,
        const SHARD_HEIGHT: u8,
    >(
        mut writer: W,
        shardtree: &mut ShardTree<MemoryShardStore<H, C>, DEPTH, SHARD_HEIGHT>,
    ) -> std::io::Result<()>
    where
        u32: From<C>,
    {
        fn write_shards<W, H, C>(
            mut writer: W,
            store: &MemoryShardStore<H, C>,
        ) -> std::io::Result<()>
        where
            H: Hashable + Clone + Eq + HashSer,
            C: Ord + std::fmt::Debug + Copy,
            W: Write,
        {
            let roots = store.get_shard_roots().expect("Infallible");
            Vector::write(&mut writer, &roots, |w, root| {
                w.write_u8(root.level().into())?;
                w.write_u64::<LittleEndian>(root.index())?;
                let shard = store
                    .get_shard(*root)
                    .expect("Infallible")
                    .expect("cannot find root that shard store claims to have");
                write_shard(w, shard.root())
            })
        }

        fn write_checkpoints<W, Cid>(
            mut writer: W,
            checkpoints: &[(Cid, Checkpoint)],
        ) -> std::io::Result<()>
        where
            W: Write,
            Cid: Ord + std::fmt::Debug + Copy,
            u32: From<Cid>,
        {
            Vector::write(
                &mut writer,
                checkpoints,
                |mut w, (checkpoint_id, checkpoint)| {
                    w.write_u32::<LittleEndian>(u32::from(*checkpoint_id))?;
                    match checkpoint.tree_state() {
                        shardtree::store::TreeState::Empty => w.write_u8(0),
                        shardtree::store::TreeState::AtPosition(pos) => {
                            w.write_u8(1)?;
                            w.write_u64::<LittleEndian>(<u64 as From<Position>>::from(pos))
                        }
                    }?;
                    Vector::write(
                        &mut w,
                        &checkpoint.marks_removed().iter().collect::<Vec<_>>(),
                        |w, mark| {
                            w.write_u64::<LittleEndian>(<u64 as From<Position>>::from(**mark))
                        },
                    )
                },
            )
        }

        // Replace original tree with empty tree, and mutate new version into store.
        let mut store = std::mem::replace(
            shardtree,
            shardtree::ShardTree::new(MemoryShardStore::empty(), 0),
        )
        .into_store();

        macro_rules! write_with_error_handling {
            ($writer: ident, $from: ident) => {
                if let Err(e) = $writer(&mut writer, &$from) {
                    *shardtree = shardtree::ShardTree::new(store, MAX_REORG_ALLOWANCE as usize);
                    return Err(e);
                }
            };
        }

        // Write located prunable trees
        write_with_error_handling!(write_shards, store);

        // Write checkpoints
        let mut checkpoints = Vec::new();
        let checkpoint_count = store.checkpoint_count().expect("Infallible");
        store
            .with_checkpoints(checkpoint_count, |checkpoint_id, checkpoint| {
                checkpoints.push((*checkpoint_id, checkpoint.clone()));
                Ok(())
            })
            .expect("Infallible");
        if checkpoints.len() > MAX_REORG_ALLOWANCE as usize {
            let keep_from = checkpoints.len() - MAX_REORG_ALLOWANCE as usize;
            checkpoints.drain(..keep_from);
        }
        write_with_error_handling!(write_checkpoints, checkpoints);

        // Write cap
        let cap = store.get_cap().expect("Infallible");
        write_with_error_handling!(write_shard, cap);

        *shardtree = shardtree::ShardTree::new(store, MAX_REORG_ALLOWANCE as usize);

        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn shardtree_roundtrip_keeps_newest_checkpoints() {
        let mut shard_trees = ShardTrees::new();

        for height in 1..=150 {
            let height = BlockHeight::from_u32(height);
            shard_trees
                .sapling
                .store_mut()
                .add_checkpoint(
                    height,
                    Checkpoint::from_parts(TreeState::Empty, BTreeSet::new()),
                )
                .expect("infallible");
            shard_trees
                .orchard
                .store_mut()
                .add_checkpoint(
                    height,
                    Checkpoint::from_parts(TreeState::Empty, BTreeSet::new()),
                )
                .expect("infallible");
        }

        let mut bytes = Vec::new();
        shard_trees.write(&mut bytes).expect("write should succeed");
        let roundtripped = ShardTrees::read(bytes.as_slice()).expect("read should succeed");

        let sapling_store = roundtripped.sapling.store();
        let orchard_store = roundtripped.orchard.store();

        assert_eq!(sapling_store.checkpoint_count().expect("infallible"), 100);
        assert_eq!(orchard_store.checkpoint_count().expect("infallible"), 100);
        assert_eq!(
            sapling_store.min_checkpoint_id().expect("infallible"),
            Some(BlockHeight::from_u32(51))
        );
        assert_eq!(
            sapling_store.max_checkpoint_id().expect("infallible"),
            Some(BlockHeight::from_u32(150))
        );
        assert_eq!(
            orchard_store.min_checkpoint_id().expect("infallible"),
            Some(BlockHeight::from_u32(51))
        );
        assert_eq!(
            orchard_store.max_checkpoint_id().expect("infallible"),
            Some(BlockHeight::from_u32(150))
        );
        assert!(
            sapling_store
                .get_checkpoint(&BlockHeight::from_u32(149))
                .expect("infallible")
                .is_some()
        );
        assert!(
            sapling_store
                .get_checkpoint(&BlockHeight::from_u32(50))
                .expect("infallible")
                .is_none()
        );
    }
}
