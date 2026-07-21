//! Module for legacy code associated with wallet keys required for backward-compatility with old wallet versions

use std::{
    io::{self, Read, Write},
    sync::{Arc, atomic::AtomicBool},
};

use append_only_vec::AppendOnlyVec;
use byteorder::{LittleEndian, ReadBytesExt, WriteBytesExt};

use zcash_address::unified::Typecode;
use zcash_client_backend::wallet::TransparentAddressMetadata;
use zcash_encoding::{CompactSize, Vector};
use zcash_keys::{
    address::UnifiedAddress,
    keys::{Era, UnifiedFullViewingKey, UnifiedSpendingKey},
};
use zcash_transparent::address::TransparentAddress;

use super::unified::{
    KEY_TYPE_EMPTY, KEY_TYPE_SPEND, KEY_TYPE_VIEW, ReceiverSelection, UnifiedKeyStore,
};
use crate::{
    config::ChainType,
    wallet::{error::KeyError, legacy::WitnessTrees, traits::ReadableWriteable},
};

pub mod extended_transparent;

/// Interface to cryptographic capabilities that the library requires for
/// various operations. <br>
/// It is created either from a [BIP39 mnemonic phrase](<https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki>), <br>
/// loaded from a [`zcash_keys::keys::UnifiedSpendingKey`] <br>
/// or a [`zcash_keys::keys::UnifiedFullViewingKey`]. <br><br>
/// In addition to fundamental spending and viewing keys, the type caches generated addresses.
#[allow(dead_code)]
pub struct WalletCapability {
    /// Unified key store
    pub unified_key_store: UnifiedKeyStore,
    /// Cache of transparent addresses that the user has created.
    /// Receipts to a single address are correlated on chain.
    /// TODO:  Is there any reason to have this field, apart from the
    /// `unified_addresses` field?
    transparent_child_addresses: Arc<append_only_vec::AppendOnlyVec<(usize, TransparentAddress)>>,
    // TODO: read/write for ephmereral addresses
    // TODO: Remove this field and exclusively use the TxMap field instead
    rejection_addresses: Arc<AppendOnlyVec<(TransparentAddress, TransparentAddressMetadata)>>,
    /// Cache of `unified_addresses`
    unified_addresses: append_only_vec::AppendOnlyVec<UnifiedAddress>,
    addresses_write_lock: AtomicBool,
}
impl Default for WalletCapability {
    fn default() -> Self {
        Self {
            unified_key_store: UnifiedKeyStore::Empty,
            transparent_child_addresses: Arc::new(AppendOnlyVec::new()),
            rejection_addresses: Arc::new(AppendOnlyVec::new()),
            unified_addresses: AppendOnlyVec::new(),
            addresses_write_lock: AtomicBool::new(false),
        }
    }
}

impl WalletCapability {
    /// TODO: Add Doc Comment Here!
    //TODO: NAME?????!!
    pub fn get_trees_witness_trees(&self) -> Option<WitnessTrees> {
        if self.unified_key_store.is_spending_key() {
            Some(WitnessTrees::default())
        } else {
            None
        }
    }
}

impl ReadableWriteable<ChainType, ChainType> for WalletCapability {
    const VERSION: u8 = 4;

    fn read<R: Read>(mut reader: R, input: ChainType) -> io::Result<Self> {
        let version = Self::get_version(&mut reader)?;
        let wc = match version {
            // in version 1, only spending keys are stored
            1 => {
                // Create a temporary USK for address generation to load old wallets
                // due to missing BIP0032 transparent extended private key data
                //
                // USK is re-derived later from seed due to missing BIP0032 transparent extended private key data
                let orchard_sk = orchard::keys::SpendingKey::read(&mut reader, ())?;
                let sapling_sk = sapling_crypto::zip32::ExtendedSpendingKey::read(&mut reader)?;
                let transparent_sk =
                    super::legacy::extended_transparent::ExtendedPrivKey::read(&mut reader, ())?;
                let usk = legacy_sks_to_usk(&orchard_sk, &sapling_sk, &transparent_sk)
                    .map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e.to_string()))?;
                Self {
                    unified_key_store: UnifiedKeyStore::Spend(Box::new(usk)),
                    ..Default::default()
                }
            }
            2 => {
                let orchard_capability = Capability::<
                    orchard::keys::FullViewingKey,
                    orchard::keys::SpendingKey,
                >::read(&mut reader, ())?;
                let sapling_capability = Capability::<
                    sapling_crypto::zip32::DiversifiableFullViewingKey,
                    sapling_crypto::zip32::ExtendedSpendingKey,
                >::read(&mut reader, ())?;
                let transparent_capability = Capability::<
                    super::legacy::extended_transparent::ExtendedPubKey,
                    super::legacy::extended_transparent::ExtendedPrivKey,
                >::read(&mut reader, ())?;

                let orchard_fvk = match &orchard_capability {
                    Capability::View(fvk) => Some(fvk),
                    _ => None,
                };
                let sapling_fvk = match &sapling_capability {
                    Capability::View(fvk) => Some(fvk),
                    _ => None,
                };
                let transparent_fvk = match &transparent_capability {
                    Capability::View(fvk) => Some(fvk),
                    _ => None,
                };

                let unified_key_store = if orchard_fvk.is_some()
                    || sapling_fvk.is_some()
                    || transparent_fvk.is_some()
                {
                    // In the case of loading from viewing keys:
                    // Create the UFVK from FVKs.
                    let ufvk = super::legacy::legacy_fvks_to_ufvk(
                        orchard_fvk,
                        sapling_fvk,
                        transparent_fvk,
                        &input,
                    )
                    .map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e.to_string()))?;
                    UnifiedKeyStore::View(Box::new(ufvk))
                } else if matches!(sapling_capability.clone(), Capability::Spend(_)) {
                    // In the case of loading spending keys:
                    // Only sapling is checked for spend capability due to only supporting a full set of spend keys
                    //
                    // Create a temporary USK for address generation to load old wallets
                    // due to missing BIP0032 transparent extended private key data
                    //
                    // USK is re-derived later from seed due to missing BIP0032 transparent extended private key data
                    // this missing data is not required for UFVKs
                    let orchard_sk = match &orchard_capability {
                        Capability::Spend(sk) => sk,
                        _ => return Err(io::Error::new(
                            io::ErrorKind::InvalidData,
                            "Orchard spending key not found. Wallet should have full spend capability!"
                                .to_string(),
                        )),
                    };
                    let sapling_sk = match &sapling_capability {
                        Capability::Spend(sk) => sk,
                        _ => return Err(io::Error::new(
                            io::ErrorKind::InvalidData,
                            "Sapling spending key not found. Wallet should have full spend capability!"
                                .to_string(),
                        )),
                    };
                    let transparent_sk = match &transparent_capability {
                        Capability::Spend(sk) => sk,
                        _ => return Err(io::Error::new(
                            io::ErrorKind::InvalidData,
                            "Transparent spending key not found. Wallet should have full spend capability!"
                                .to_string(),
                        )),
                    };

                    let usk = legacy_sks_to_usk(orchard_sk, sapling_sk, transparent_sk)
                        .map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e.to_string()))?;

                    UnifiedKeyStore::Spend(Box::new(usk))
                } else {
                    UnifiedKeyStore::Empty
                };

                Self {
                    unified_key_store,
                    ..Default::default()
                }
            }
            3 => Self {
                unified_key_store: UnifiedKeyStore::read(&mut reader, input)?,
                ..Default::default()
            },
            4 => {
                let _length_of_rejection_addresses = reader.read_u32::<LittleEndian>()?;

                Self {
                    unified_key_store: UnifiedKeyStore::read(&mut reader, input)?,
                    ..Default::default()
                }
            }
            _ => {
                return Err(io::Error::new(
                    io::ErrorKind::InvalidData,
                    "Invalid WalletCapability version".to_string(),
                ));
            }
        };
        let _receiver_selections = Vector::read(&mut reader, |r| ReceiverSelection::read(r, ()))?;

        Ok(wc)
    }

    fn write<W: Write>(&self, mut _writer: W, _input: ChainType) -> io::Result<()> {
        unimplemented!()
    }
}

impl ReadableWriteable for orchard::keys::SpendingKey {
    const VERSION: u8 = 0; //Not applicable

    fn read<R: Read>(mut reader: R, _input: ()) -> io::Result<Self> {
        let mut data = [0u8; 32];
        reader.read_exact(&mut data)?;

        Option::from(Self::from_bytes(data)).ok_or_else(|| {
            io::Error::new(
                io::ErrorKind::InvalidInput,
                "Unable to deserialize a valid Orchard SpendingKey from bytes".to_owned(),
            )
        })
    }

    fn write<W: Write>(&self, mut _writer: W, _input: ()) -> io::Result<()> {
        unimplemented!()
    }
}

/// TODO: Add Doc Comment Here!
#[derive(Clone, Debug)]
#[non_exhaustive]
pub enum Capability<ViewingKeyType, SpendKeyType> {
    /// TODO: Add Doc Comment Here!
    None,
    /// TODO: Add Doc Comment Here!
    View(ViewingKeyType),
    /// TODO: Add Doc Comment Here!
    Spend(SpendKeyType),
}

impl<V, S> ReadableWriteable<(), ()> for Capability<V, S>
where
    V: ReadableWriteable<(), ()>,
    S: ReadableWriteable<(), ()>,
{
    const VERSION: u8 = 1;

    fn read<R: Read>(mut reader: R, _input: ()) -> io::Result<Self> {
        let _version = Self::get_version(&mut reader)?;
        let capability_type = reader.read_u8()?;
        Ok(match capability_type {
            KEY_TYPE_EMPTY => Capability::None,
            KEY_TYPE_VIEW => Capability::View(V::read(&mut reader, ())?),
            KEY_TYPE_SPEND => Capability::Spend(S::read(&mut reader, ())?),
            x => {
                return Err(io::Error::new(
                    io::ErrorKind::InvalidData,
                    format!("Unknown wallet Capability type: {x}"),
                ));
            }
        })
    }

    fn write<W: Write>(&self, mut _writer: W, _input: ()) -> io::Result<()> {
        unimplemented!()
    }
}

pub(crate) fn legacy_fvks_to_ufvk<P: zcash_protocol::consensus::Parameters>(
    orchard_fvk: Option<&orchard::keys::FullViewingKey>,
    sapling_fvk: Option<&sapling_crypto::zip32::DiversifiableFullViewingKey>,
    transparent_fvk: Option<&extended_transparent::ExtendedPubKey>,
    parameters: &P,
) -> Result<UnifiedFullViewingKey, KeyError> {
    use zcash_address::unified::Encoding;

    let mut fvks = Vec::new();
    if let Some(fvk) = orchard_fvk {
        fvks.push(zcash_address::unified::Fvk::Orchard(fvk.to_bytes()));
    }
    if let Some(fvk) = sapling_fvk {
        fvks.push(zcash_address::unified::Fvk::Sapling(fvk.to_bytes()));
    }
    if let Some(fvk) = transparent_fvk {
        let mut fvk_bytes = [0u8; 65];
        fvk_bytes[0..32].copy_from_slice(&fvk.chain_code[..]);
        fvk_bytes[32..65].copy_from_slice(&fvk.public_key.serialize()[..]);
        fvks.push(zcash_address::unified::Fvk::P2pkh(fvk_bytes));
    }

    let ufvk = zcash_address::unified::Ufvk::try_from_items(fvks)?;

    UnifiedFullViewingKey::decode(parameters, &ufvk.encode(&parameters.network_type()))
        .map_err(|_| KeyError::KeyDecodingError)
}

pub(crate) fn legacy_sks_to_usk(
    orchard_key: &orchard::keys::SpendingKey,
    sapling_key: &sapling_crypto::zip32::ExtendedSpendingKey,
    transparent_key: &extended_transparent::ExtendedPrivKey,
) -> Result<UnifiedSpendingKey, KeyError> {
    let mut usk_bytes = vec![];

    // hard-coded Orchard Era ID due to `id()` being a private fn
    usk_bytes.write_u32::<LittleEndian>(0xc2d6_d0b4)?;

    CompactSize::write(
        &mut usk_bytes,
        usize::try_from(Typecode::Orchard).expect("typecode to usize should not fail"),
    )?;
    let orchard_key_bytes = orchard_key.to_bytes();
    CompactSize::write(&mut usk_bytes, orchard_key_bytes.len())?;
    usk_bytes.write_all(orchard_key_bytes)?;

    CompactSize::write(
        &mut usk_bytes,
        usize::try_from(Typecode::Sapling).expect("typecode to usize should not fail"),
    )?;
    let sapling_key_bytes = sapling_key.to_bytes();
    CompactSize::write(&mut usk_bytes, sapling_key_bytes.len())?;
    usk_bytes.write_all(&sapling_key_bytes)?;

    // the following code performs the same operations for calling `to_bytes()` on an AccountPrivKey in LRZ
    let prefix = bip32::Prefix::XPRV;
    let mut chain_code = [0u8; 32];
    chain_code.copy_from_slice(&transparent_key.chain_code);
    let attrs = bip32::ExtendedKeyAttrs {
        depth: 4,
        parent_fingerprint: [0xff, 0xff, 0xff, 0xff],
        child_number: bip32::ChildNumber::new(0, true).expect("correct"),
        chain_code,
    };
    // Add leading `0` byte
    let mut key_bytes = [0u8; 33];
    key_bytes[1..].copy_from_slice(transparent_key.private_key.as_ref());

    let extended_key = bip32::ExtendedKey {
        prefix,
        attrs,
        key_bytes,
    };

    let xprv_encoded = extended_key.to_string();
    let account_tkey_bytes = bs58::decode(xprv_encoded)
        .with_check(None)
        .into_vec()
        .expect("correct")
        .split_off(bip32::Prefix::LENGTH);

    CompactSize::write(
        &mut usk_bytes,
        usize::try_from(Typecode::P2pkh).expect("typecode to usize should not fail"),
    )?;
    CompactSize::write(&mut usk_bytes, account_tkey_bytes.len())?;
    usk_bytes.write_all(&account_tkey_bytes)?;

    UnifiedSpendingKey::from_bytes(Era::Orchard, &usk_bytes).map_err(|_| KeyError::KeyDecodingError)
}

impl ReadableWriteable for sapling_crypto::zip32::ExtendedSpendingKey {
    const VERSION: u8 = 0; //Not applicable

    fn read<R: Read>(reader: R, _input: ()) -> io::Result<Self> {
        Self::read(reader)
    }

    fn write<W: Write>(&self, writer: W, _input: ()) -> io::Result<()> {
        self.write(writer)
    }
}

impl ReadableWriteable for sapling_crypto::zip32::DiversifiableFullViewingKey {
    const VERSION: u8 = 0; //Not applicable

    fn read<R: Read>(mut reader: R, _input: ()) -> io::Result<Self> {
        let mut fvk_bytes = [0u8; 128];
        reader.read_exact(&mut fvk_bytes)?;
        sapling_crypto::zip32::DiversifiableFullViewingKey::from_bytes(&fvk_bytes).ok_or(
            io::Error::new(
                io::ErrorKind::InvalidInput,
                "Couldn't read a Sapling Diversifiable Full Viewing Key",
            ),
        )
    }

    fn write<W: Write>(&self, mut writer: W, _input: ()) -> io::Result<()> {
        writer.write_all(&self.to_bytes())
    }
}

impl ReadableWriteable for orchard::keys::FullViewingKey {
    const VERSION: u8 = 0; //Not applicable

    fn read<R: Read>(reader: R, _input: ()) -> io::Result<Self> {
        Self::read(reader)
    }

    fn write<W: Write>(&self, writer: W, _input: ()) -> io::Result<()> {
        self.write(writer)
    }
}
