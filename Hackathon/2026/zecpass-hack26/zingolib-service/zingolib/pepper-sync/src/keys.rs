//! Copied and modified from LRZ due to thread safety limitations and missing OVK

use std::collections::HashMap;

use incrementalmerkletree::Position;
use orchard::{
    keys::{FullViewingKey, IncomingViewingKey},
    note_encryption::OrchardDomain,
};
use sapling_crypto::{
    self as sapling, NullifierDerivingKey, SaplingIvk, note_encryption::SaplingDomain,
};
use zcash_address::{ZcashAddress, unified::ParseError};
use zcash_keys::{address::UnifiedAddress, keys::UnifiedFullViewingKey};
use zcash_note_encryption::Domain;
use zcash_protocol::consensus;
use zip32::Scope;

use crate::wallet::KeyIdInterface;

pub mod transparent;

/// Child index for the `address_index` path level in the BIP44 hierarchy.
pub type AddressIndex = u32;

/// Unique ID for shielded keys.
#[derive(Debug, Clone, Copy, Hash, PartialEq, Eq)]
pub struct KeyId {
    /// Account ID
    pub account_id: zip32::AccountId,
    /// Scope
    pub scope: Scope,
}

impl KeyId {
    pub(crate) fn from_parts(account_id: zip32::AccountId, scope: Scope) -> Self {
        Self { account_id, scope }
    }
}

impl KeyIdInterface for KeyId {
    fn account_id(&self) -> zip32::AccountId {
        self.account_id
    }
}

impl memuse::DynamicUsage for KeyId {
    fn dynamic_usage(&self) -> usize {
        self.scope.dynamic_usage()
    }

    fn dynamic_usage_bounds(&self) -> (usize, Option<usize>) {
        self.scope.dynamic_usage_bounds()
    }
}

/// A key that can be used to perform trial decryption and nullifier
/// computation for a `CompactSaplingOutput` or `CompactOrchardAction`.
pub trait ScanningKeyOps<D: Domain, Nf> {
    /// Prepare the key for use in batch trial decryption.
    fn prepare(&self) -> D::IncomingViewingKey;

    /// Returns the account identifier for this key. An account identifier corresponds
    /// to at most a single unified spending key's worth of spend authority, such that
    /// both received notes and change spendable by that spending authority will be
    /// interpreted as belonging to that account.
    fn account_id(&self) -> &zip32::AccountId;

    /// Returns the [`zip32::Scope`] for which this key was derived, if known.
    fn key_scope(&self) -> Option<Scope>;

    /// Produces the nullifier for the specified note and witness, if possible.
    ///
    /// IVK-based implementations of this trait cannot successfully derive
    /// nullifiers, in which this function will always return `None`.
    fn nf(&self, note: &D::Note, note_position: Position) -> Option<Nf>;
}
impl<D: Domain, Nf, K: ScanningKeyOps<D, Nf>> ScanningKeyOps<D, Nf> for &K {
    fn prepare(&self) -> D::IncomingViewingKey {
        (*self).prepare()
    }

    fn account_id(&self) -> &zip32::AccountId {
        (*self).account_id()
    }

    fn key_scope(&self) -> Option<Scope> {
        (*self).key_scope()
    }

    fn nf(&self, note: &D::Note, note_position: Position) -> Option<Nf> {
        (*self).nf(note, note_position)
    }
}

pub(crate) struct ScanningKey<Ivk, Nk> {
    key_id: KeyId,
    ivk: Ivk,
    nk: Option<Nk>,
}

impl ScanningKeyOps<SaplingDomain, sapling::Nullifier>
    for ScanningKey<SaplingIvk, NullifierDerivingKey>
{
    fn prepare(&self) -> sapling::note_encryption::PreparedIncomingViewingKey {
        sapling_crypto::note_encryption::PreparedIncomingViewingKey::new(&self.ivk)
    }

    fn nf(&self, note: &sapling::Note, position: Position) -> Option<sapling::Nullifier> {
        self.nk.as_ref().map(|key| note.nf(key, position.into()))
    }

    fn account_id(&self) -> &zip32::AccountId {
        &self.key_id.account_id
    }

    fn key_scope(&self) -> Option<Scope> {
        Some(self.key_id.scope)
    }
}

impl ScanningKeyOps<OrchardDomain, orchard::note::Nullifier>
    for ScanningKey<IncomingViewingKey, FullViewingKey>
{
    fn prepare(&self) -> orchard::keys::PreparedIncomingViewingKey {
        orchard::keys::PreparedIncomingViewingKey::new(&self.ivk)
    }

    fn nf(
        &self,
        note: &orchard::note::Note,
        _position: Position,
    ) -> Option<orchard::note::Nullifier> {
        self.nk.as_ref().map(|key| note.nullifier(key))
    }

    fn account_id(&self) -> &zip32::AccountId {
        &self.key_id.account_id
    }

    fn key_scope(&self) -> Option<Scope> {
        Some(self.key_id.scope)
    }
}

/// A set of keys to be used in scanning for decryptable transaction outputs.
pub(crate) struct ScanningKeys {
    pub(crate) sapling: HashMap<KeyId, ScanningKey<SaplingIvk, NullifierDerivingKey>>,
    pub(crate) orchard: HashMap<KeyId, ScanningKey<IncomingViewingKey, FullViewingKey>>,
}

impl ScanningKeys {
    /// Constructs a [`ScanningKeys`] from an iterator of [`zcash_keys::keys::UnifiedFullViewingKey`]s,
    /// along with the account identifiers corresponding to those UFVKs.
    pub(crate) fn from_account_ufvks(
        ufvks: impl IntoIterator<Item = (zip32::AccountId, UnifiedFullViewingKey)>,
    ) -> Self {
        #![allow(clippy::type_complexity)]

        let mut sapling: HashMap<KeyId, ScanningKey<SaplingIvk, NullifierDerivingKey>> =
            HashMap::new();
        let mut orchard: HashMap<KeyId, ScanningKey<IncomingViewingKey, FullViewingKey>> =
            HashMap::new();

        for (account_id, ufvk) in ufvks {
            if let Some(dfvk) = ufvk.sapling() {
                for scope in [Scope::External, Scope::Internal] {
                    let key_id = KeyId::from_parts(account_id, scope);
                    sapling.insert(
                        key_id,
                        ScanningKey {
                            key_id,
                            ivk: dfvk.to_ivk(scope),
                            nk: Some(dfvk.to_nk(scope)),
                        },
                    );
                }
            }

            if let Some(fvk) = ufvk.orchard() {
                for scope in [Scope::External, Scope::Internal] {
                    let key_id = KeyId::from_parts(account_id, scope);
                    orchard.insert(
                        key_id,
                        ScanningKey {
                            key_id,
                            ivk: fvk.to_ivk(scope),
                            nk: Some(fvk.clone()),
                        },
                    );
                }
            }
        }

        Self { sapling, orchard }
    }
}

pub(crate) fn encode_orchard_receiver(
    parameters: &impl consensus::Parameters,
    orchard_address: &orchard::Address,
) -> Result<String, ParseError> {
    Ok(zcash_address::unified::Encoding::encode(
        &<zcash_address::unified::Address as zcash_address::unified::Encoding>::try_from_items(
            vec![zcash_address::unified::Receiver::Orchard(
                orchard_address.to_raw_address_bytes(),
            )],
        )?,
        &parameters.network_type(),
    ))
}

/// Decode string to unified address.
// TODO: return custom error type
pub fn decode_unified_address(
    consensus_parameters: &impl consensus::Parameters,
    encoded_address: &str,
) -> std::io::Result<UnifiedAddress> {
    if let zcash_keys::address::Address::Unified(unified_address) =
        decode_address(consensus_parameters, encoded_address)?
    {
        Ok(unified_address)
    } else {
        Err(std::io::Error::new(
            std::io::ErrorKind::InvalidData,
            "failed to decode unified address. incorrect address type.".to_string(),
        ))
    }
}

/// Decode string to [`zcash_keys::address::Address`] enum.
pub fn decode_address(
    consensus_parameters: &impl consensus::Parameters,
    encoded_address: &str,
) -> std::io::Result<zcash_keys::address::Address> {
    ZcashAddress::try_from_encoded(encoded_address)
        .map_err(|e| {
            std::io::Error::new(
                std::io::ErrorKind::InvalidData,
                format!("failed to decode address. {e}"),
            )
        })?
        .convert_if_network::<zcash_keys::address::Address>(consensus_parameters.network_type())
        .map_err(|e| {
            std::io::Error::new(
                std::io::ErrorKind::InvalidData,
                format!("failed to decode address. {e}"),
            )
        })
}
