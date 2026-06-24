//! This mod contains write and read functionality of impl `LightWallet`

use std::{
    collections::{BTreeMap, HashMap},
    io::{self, Error, ErrorKind, Read, Write},
    num::NonZeroU32,
};

use byteorder::{LittleEndian, ReadBytesExt, WriteBytesExt};
use log::info;

use bip0039::Mnemonic;
use zip32::AccountId;

use zcash_encoding::{Optional, Vector};
use zcash_keys::keys::UnifiedSpendingKey;
use zcash_primitives::transaction::TxId;
use zcash_protocol::consensus::{self, BlockHeight};
use zcash_transparent::keys::NonHardenedChildIndex;

use zingo_common_components::protocol::ActivationHeights;
use zingo_netutils::lightwallet_protocol::TreeState;
use zingo_price::PriceList;

use super::keys::unified::{ReceiverSelection, UnifiedAddressId};
use super::{LightWallet, error::KeyError};
use crate::wallet::{WalletSettings, legacy::WalletZecPriceInfo, utils};
use crate::wallet::{legacy::WalletOptions, traits::ReadableWriteable};
use crate::{
    config::ChainType,
    wallet::{
        keys::{legacy::WalletCapability, unified::UnifiedKeyStore},
        legacy::{BlockData, TxMap},
    },
};
use pepper_sync::{
    config::{PerformanceLevel, SyncConfig, TransparentAddressDiscovery},
    keys::transparent::{self, TransparentAddressId, TransparentScope},
    wallet::{
        KeyIdInterface, NullifierMap, OutputId, ScanTarget, ShardTrees, SyncState, WalletBlock,
        WalletTransaction,
    },
};

impl LightWallet {
    /// Changes in version 40:
    /// `ChainType` serialized as u8 instead of string to decouple from fmt::Display and reduce bytes stored.
    #[must_use]
    pub const fn serialized_version() -> u64 {
        40
    }

    /// Serialize into `writer`
    pub fn write<W: Write>(
        &mut self,
        mut writer: W,
        consensus_parameters: &impl consensus::Parameters,
    ) -> io::Result<()> {
        writer.write_u64::<LittleEndian>(Self::serialized_version())?;
        writer.write_u8(match self.chain_type() {
            ChainType::Mainnet => 0,
            ChainType::Testnet => 1,
            ChainType::Regtest(_) => 2,
        })?;
        let seed_bytes = match &self.mnemonic {
            Some(m) => m.clone().into_entropy(),
            None => vec![],
        };
        Vector::write(&mut writer, &seed_bytes, |w, byte| w.write_u8(*byte))?;
        writer.write_u32::<LittleEndian>(self.birthday.into())?;
        Vector::write(
            &mut writer,
            &self.unified_key_store.iter().collect::<Vec<_>>(),
            |w, (account_id, unified_key)| {
                w.write_u32::<LittleEndian>(u32::from(**account_id))?;
                unified_key.write(w, self.chain_type)
            },
        )?;
        // TODO: also store receiver selections in encoded memos.
        Vector::write(
            &mut writer,
            &self.unified_addresses.iter().collect::<Vec<_>>(),
            |w, (address_id, address)| {
                w.write_u32::<LittleEndian>(address_id.account_id.into())?;
                w.write_u32::<LittleEndian>(address_id.address_index)?;
                ReceiverSelection {
                    orchard: address.orchard().is_some(),
                    sapling: address.sapling().is_some(),
                }
                .write(w, ())
            },
        )?;
        Vector::write(
            &mut writer,
            &self.transparent_addresses.keys().collect::<Vec<_>>(),
            |w, address_id| {
                w.write_u32::<LittleEndian>(address_id.account_id().into())?;
                w.write_u8(address_id.scope() as u8)?;
                w.write_u32::<LittleEndian>(address_id.address_index().index())
            },
        )?;
        Vector::write(
            &mut writer,
            &self.wallet_blocks.values().collect::<Vec<_>>(),
            |w, &block| block.write(w),
        )?;
        Vector::write(
            &mut writer,
            &self.wallet_transactions.values().collect::<Vec<_>>(),
            |w, &transaction| transaction.write(w, consensus_parameters),
        )?;
        self.nullifier_map.write(&mut writer)?;
        Vector::write(
            &mut writer,
            &self.outpoint_map.iter().collect::<Vec<_>>(),
            |w, &(&output_id, &scan_target)| {
                output_id.txid().write(&mut *w)?;
                w.write_u16::<LittleEndian>(output_id.output_index())?;
                scan_target.write(w)
            },
        )?;
        self.shard_trees.write(&mut writer)?;
        self.sync_state.write(&mut writer)?;
        self.wallet_settings.sync_config.write(&mut writer)?;
        writer.write_u32::<LittleEndian>(self.wallet_settings.min_confirmations.into())?;
        self.price_list.write(&mut writer)
    }

    /// Deserialize into `reader`
    // TODO: update to return WalletError
    pub fn read<R: Read>(mut reader: R, chain_type: ChainType) -> io::Result<Self> {
        let version = reader.read_u64::<LittleEndian>()?;
        info!("Reading wallet version {version}");
        match version {
            ..32 => Self::read_v0(reader, chain_type, version),
            32..=40 => Self::read_v32(reader, chain_type, version),
            _ => Err(io::Error::new(
                ErrorKind::InvalidData,
                format!(
                    "Failed to read wallet version {}. Do you have the latest version?\n{}",
                    version, "Note: wallet files from zecwallet or beta zingo are not compatible"
                ),
            )),
        }
    }

    fn read_v0<R: Read>(mut reader: R, chain_type: ChainType, version: u64) -> io::Result<Self> {
        let mut wallet_capability = WalletCapability::read(&mut reader, chain_type)?;
        let mut _blocks = Vector::read(&mut reader, |r| BlockData::read(r))?;
        let transactions = if version <= 14 {
            TxMap::read_old(&mut reader, &wallet_capability)?
        } else {
            TxMap::read(&mut reader, &wallet_capability)?
        };

        let saved_network = match utils::read_string(&mut reader)?.as_str() {
            "main" => "mainnet",
            "test" => "testnet",
            "regtest" => "regtest",
            other => {
                return Err(Error::new(
                    ErrorKind::InvalidData,
                    format!("invalid chain type stored in wallet file: {}", other,),
                ));
            }
        };
        if saved_network != chain_type.to_string() {
            return Err(Error::new(
                ErrorKind::InvalidData,
                format!("wallet chain name {saved_network} doesn't match expected {chain_type}"),
            ));
        }

        let _wallet_options = if version <= 23 {
            WalletOptions::default()
        } else {
            WalletOptions::read(&mut reader)?
        };
        let birthday = BlockHeight::from_u32(
            reader
                .read_u64::<LittleEndian>()?
                .try_into()
                .expect("should never overflow"),
        );

        if version <= 22 {
            let _sapling_tree_verified = if version <= 12 {
                true
            } else {
                reader.read_u8()? == 1
            };
        }
        let _verified_tree = if version <= 21 {
            None
        } else {
            Optional::read(&mut reader, |r| {
                use prost::Message;

                let buf = Vector::read(r, byteorder::ReadBytesExt::read_u8)?;
                TreeState::decode(&buf[..])
                    .map_err(|e| io::Error::new(ErrorKind::InvalidData, e.to_string()))
            })?
        };

        let _price = if version <= 13 {
            WalletZecPriceInfo::default()
        } else {
            WalletZecPriceInfo::read(&mut reader)?
        };

        let _orchard_anchor_height_pairs = if version == 25 {
            Vector::read(&mut reader, |r| {
                let mut anchor_bytes = [0; 32];
                r.read_exact(&mut anchor_bytes)?;
                let block_height = BlockHeight::from_u32(r.read_u32::<LittleEndian>()?);
                Ok((
                    Option::<orchard::Anchor>::from(orchard::Anchor::from_bytes(anchor_bytes))
                        .ok_or(Error::new(ErrorKind::InvalidData, "Bad orchard anchor"))?,
                    block_height,
                ))
            })?
        } else {
            Vec::new()
        };

        let seed_bytes = Vector::read(&mut reader, byteorder::ReadBytesExt::read_u8)?;
        let mnemonic = if seed_bytes.is_empty() {
            None
        } else {
            let _account_index = if version >= 28 {
                reader.read_u32::<LittleEndian>()?
            } else {
                0
            };
            Some(
                Mnemonic::from_entropy(seed_bytes)
                    .map_err(|e| Error::new(ErrorKind::InvalidData, e.to_string()))?,
            )
        };

        // Derive unified spending key from seed and override temporary USK if wallet is pre v29.
        //
        // UnifiedSpendingKey is initially incomplete for old wallet versions.
        // This is due to the legacy transparent extended private key (ExtendedPrivKey) not containing all information required for BIP0032.
        // There is also the issue that the legacy transparent private key is derived an extra level to the external scope.
        if version < 29 {
            if let Some(mnemonic) = mnemonic.as_ref() {
                wallet_capability.unified_key_store = UnifiedKeyStore::Spend(Box::new(
                    UnifiedSpendingKey::from_seed(
                        &chain_type,
                        &mnemonic.to_seed(""),
                        AccountId::ZERO,
                    )
                    .map_err(|e| {
                        Error::new(
                            ErrorKind::InvalidData,
                            format!(
                                "failed to derive unified spending key from stored seed bytes. {e}"
                            ),
                        )
                    })?,
                ));
            } else if let UnifiedKeyStore::Spend(_) = &wallet_capability.unified_key_store {
                return Err(io::Error::other(
                    "loading from legacy spending keys with no seed to recover",
                ));
            }
        }

        let mut unified_key_store = BTreeMap::new();
        unified_key_store.insert(zip32::AccountId::ZERO, wallet_capability.unified_key_store);
        let unified_key = unified_key_store
            .get(&zip32::AccountId::ZERO)
            .expect("account 0 must exist");
        let mut unified_addresses = BTreeMap::new();
        if let Some(receivers) = unified_key.default_receivers() {
            let unified_address_id = UnifiedAddressId {
                account_id: zip32::AccountId::ZERO,
                address_index: 0,
            };
            let first_unified_address = unified_key
                .generate_unified_address(unified_address_id.address_index, receivers)
                .map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e))?;
            unified_addresses.insert(unified_address_id, first_unified_address.clone());
        }

        let mut transparent_addresses = BTreeMap::new();
        let transparent_address_id = TransparentAddressId::new(
            zip32::AccountId::ZERO,
            TransparentScope::External,
            NonHardenedChildIndex::ZERO,
        );
        match unified_key.generate_transparent_address(
            transparent_address_id.address_index(),
            transparent_address_id.scope(),
        ) {
            Ok(first_transparent_address) => {
                transparent_addresses.insert(
                    transparent_address_id,
                    transparent::encode_address(&chain_type, first_transparent_address),
                );
            }
            Err(KeyError::NoViewCapability) => (),
            Err(e) => {
                return Err(Error::new(
                    ErrorKind::InvalidData,
                    format!("failed to create transparent address. {e}"),
                ));
            }
        }

        // setup targetted scanning from zingo 1.x transaction data
        let mut sync_state = SyncState::new();
        pepper_sync::add_scan_targets(
            &mut sync_state,
            &transactions
                .transaction_records_by_id
                .0
                .values()
                .filter_map(|transaction| {
                    transaction
                        .status
                        .get_confirmed_height()
                        .map(|height| ScanTarget {
                            block_height: height,
                            txid: transaction.txid,
                            narrow_scan_area: true,
                        })
                })
                .collect::<Vec<_>>(),
        );

        let lw = Self {
            current_version: LightWallet::serialized_version(),
            read_version: version,
            mnemonic,
            birthday,
            unified_key_store,
            price_list: PriceList::new(),
            wallet_blocks: BTreeMap::new(),
            wallet_transactions: HashMap::new(),
            nullifier_map: NullifierMap::new(),
            outpoint_map: BTreeMap::new(),
            shard_trees: ShardTrees::new(),
            sync_state,
            transparent_addresses,
            unified_addresses,
            chain_type,
            send_proposal: None,
            save_required: false,
            wallet_settings: WalletSettings {
                sync_config: SyncConfig {
                    transparent_address_discovery: TransparentAddressDiscovery::minimal(),
                    performance_level: PerformanceLevel::High,
                },
                min_confirmations: NonZeroU32::try_from(3).unwrap(),
            },
        };

        Ok(lw)
    }

    fn read_v32<R: Read>(mut reader: R, chain_type: ChainType, version: u64) -> io::Result<Self> {
        if version >= 40 {
            let saved_network = match reader.read_u8()? {
                0 => ChainType::Mainnet,
                1 => ChainType::Testnet,
                2 => ChainType::Regtest(ActivationHeights::default()),
                other => {
                    return Err(Error::new(
                        ErrorKind::InvalidData,
                        format!("invalid chain type index stored in wallet file: {}", other,),
                    ));
                }
            };
            if saved_network.to_string() != chain_type.to_string() {
                return Err(Error::new(
                    ErrorKind::InvalidData,
                    format!(
                        "wallet chain name {saved_network} doesn't match expected {chain_type}"
                    ),
                ));
            }
        } else {
            let saved_network = match utils::read_string(&mut reader)?.as_str() {
                "main" => "mainnet",
                "test" => "testnet",
                "regtest" => "regtest",
                other => {
                    return Err(Error::new(
                        ErrorKind::InvalidData,
                        format!("invalid chain type stored in wallet file: {}", other,),
                    ));
                }
            };
            if saved_network != chain_type.to_string() {
                return Err(Error::new(
                    ErrorKind::InvalidData,
                    format!(
                        "wallet chain name {saved_network} doesn't match expected {chain_type}"
                    ),
                ));
            }
        }

        let seed_bytes = Vector::read(&mut reader, byteorder::ReadBytesExt::read_u8)?;
        let mnemonic = if seed_bytes.is_empty() {
            None
        } else {
            if version < 35 {
                let _account_index = reader.read_u32::<LittleEndian>()?;
            }
            Some(
                <Mnemonic>::from_entropy(seed_bytes)
                    .map_err(|e| Error::new(ErrorKind::InvalidData, e.to_string()))?,
            )
        };
        let birthday = BlockHeight::from_u32(reader.read_u32::<LittleEndian>()?);

        let unified_key_store = if version >= 35 {
            Vector::read(&mut reader, |r| {
                Ok((
                    zip32::AccountId::try_from(r.read_u32::<LittleEndian>()?)
                        .expect("only valid account ids are stored"),
                    UnifiedKeyStore::read(r, chain_type)?,
                ))
            })?
            .into_iter()
            .collect::<BTreeMap<_, _>>()
        } else {
            let mut keys = BTreeMap::new();
            keys.insert(
                zip32::AccountId::ZERO,
                UnifiedKeyStore::read(&mut reader, chain_type)?,
            );
            keys
        };

        let mut unified_addresses = Vector::read(&mut reader, |r| {
            let account_id = zip32::AccountId::try_from(r.read_u32::<LittleEndian>()?)
                .expect("only valid account ids are stored");
            let address_index = r.read_u32::<LittleEndian>()?;
            let receivers = ReceiverSelection::read(r, ())?;

            Ok((
                UnifiedAddressId {
                    account_id,
                    address_index,
                },
                unified_key_store
                    .get(&account_id)
                    .ok_or(Error::new(
                        ErrorKind::InvalidData,
                        format!(
                            "unified addresses found for account {} but was account not found",
                            u32::from(account_id)
                        ),
                    ))?
                    .generate_unified_address(address_index, receivers)
                    .map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e))?,
            ))
        })?
        .into_iter()
        .collect::<BTreeMap<_, _>>();
        let mut transparent_addresses = Vector::read(&mut reader, |r| {
            let account_id = zip32::AccountId::try_from(r.read_u32::<LittleEndian>()?)
                .expect("only valid account ids are stored");
            let scope = TransparentScope::try_from(r.read_u8()?)?;
            let address_index = NonHardenedChildIndex::from_index(r.read_u32::<LittleEndian>()?)
                .expect("only non-hardened child indexes should be written");

            Ok((
                TransparentAddressId::new(account_id, scope, address_index),
                transparent::encode_address(
                    &chain_type,
                    unified_key_store
                        .get(&account_id)
                        .ok_or(Error::new(
                            ErrorKind::InvalidData,
                            format!(
                                "unified addresses found for account {} but was account not found",
                                u32::from(account_id)
                            ),
                        ))?
                        .generate_transparent_address(address_index, scope)
                        .map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e))?,
                ),
            ))
        })?
        .into_iter()
        .collect::<BTreeMap<_, _>>();

        // reset zingo 2.0 test version addresses
        if version < 36 {
            let unified_key = unified_key_store
                .get(&zip32::AccountId::ZERO)
                .expect("account 0 must exist");
            unified_addresses = BTreeMap::new();
            if let Some(receivers) = unified_key.default_receivers() {
                let unified_address_id = UnifiedAddressId {
                    account_id: zip32::AccountId::ZERO,
                    address_index: 0,
                };
                let first_unified_address = unified_key
                    .generate_unified_address(unified_address_id.address_index, receivers)
                    .map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e))?;
                unified_addresses.insert(unified_address_id, first_unified_address.clone());
            }

            transparent_addresses = BTreeMap::new();
            let transparent_address_id = TransparentAddressId::new(
                zip32::AccountId::ZERO,
                TransparentScope::External,
                NonHardenedChildIndex::ZERO,
            );
            match unified_key.generate_transparent_address(
                transparent_address_id.address_index(),
                transparent_address_id.scope(),
            ) {
                Ok(first_transparent_address) => {
                    transparent_addresses.insert(
                        transparent_address_id,
                        transparent::encode_address(&chain_type, first_transparent_address),
                    );
                }
                Err(KeyError::NoViewCapability) => (),
                Err(e) => {
                    return Err(Error::new(
                        ErrorKind::InvalidData,
                        format!("failed to create transparent address. {e}"),
                    ));
                }
            }
        }

        let wallet_blocks = Vector::read(&mut reader, |r| WalletBlock::read(r))?
            .into_iter()
            .map(|block| (block.block_height(), block))
            .collect::<BTreeMap<_, _>>();
        let wallet_transactions =
            Vector::read(&mut reader, |r| WalletTransaction::read(r, &chain_type))?
                .into_iter()
                .map(|transaction| (transaction.txid(), transaction))
                .collect::<HashMap<_, _>>();
        let nullifier_map = NullifierMap::read(&mut reader)?;
        let outpoint_map = Vector::read(&mut reader, |mut r| {
            let outpoint_txid = TxId::read(&mut r)?;
            let output_index = r.read_u16::<LittleEndian>()?;
            let scan_target = if version >= 37 {
                ScanTarget::read(r)?
            } else {
                let block_height = BlockHeight::from_u32(r.read_u32::<LittleEndian>()?);
                let txid = TxId::read(&mut r)?;

                ScanTarget {
                    block_height,
                    txid,
                    narrow_scan_area: true,
                }
            };

            Ok((OutputId::new(outpoint_txid, output_index), scan_target))
        })?
        .into_iter()
        .collect::<BTreeMap<_, _>>();
        let shard_trees = ShardTrees::read(&mut reader)?;
        let sync_state = SyncState::read(&mut reader)?;

        let wallet_settings = if version >= 33 {
            WalletSettings {
                sync_config: SyncConfig::read(&mut reader)?,
                min_confirmations: if version >= 38 {
                    NonZeroU32::try_from(reader.read_u32::<LittleEndian>()?)
                        .expect("only valid non-zero u32s stored")
                } else {
                    NonZeroU32::try_from(3).expect("hard-coded non-zero integer")
                },
            }
        } else {
            WalletSettings {
                sync_config: SyncConfig {
                    transparent_address_discovery: TransparentAddressDiscovery::minimal(),
                    performance_level: PerformanceLevel::High,
                },
                min_confirmations: NonZeroU32::try_from(3).unwrap(),
            }
        };

        let price_list = if version >= 34 {
            PriceList::read(&mut reader)?
        } else {
            PriceList::new()
        };

        Ok(Self {
            current_version: LightWallet::serialized_version(),
            read_version: version,
            chain_type,
            mnemonic,
            birthday,
            unified_key_store,
            unified_addresses,
            transparent_addresses,
            wallet_blocks,
            wallet_transactions,
            nullifier_map,
            outpoint_map,
            shard_trees,
            sync_state,
            wallet_settings,
            price_list,
            send_proposal: None,
            save_required: false,
        })
    }
}

#[cfg(any(test, feature = "testutils"))]
pub mod testing;
