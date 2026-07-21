use orchard::note_encryption::CompactAction;
use sapling_crypto::{note::ExtractedNoteCommitment, note_encryption::CompactOutputDescription};
use zcash_note_encryption::EphemeralKeyBytes;
use zcash_primitives::block::{BlockHash, BlockHeader};
use zcash_protocol::{TxId, consensus::BlockHeight};
use zingo_netutils::lightwallet_protocol::{
    CompactBlock, CompactOrchardAction, CompactSaplingOutput, CompactTx,
};

use crate::error::CompactFormatError;

/// Returns the [`BlockHash`] for this block.
///
/// # Panics
///
/// This function will panic if `compact_block.header` is not set and
/// `compact_block.hash` is not exactly 32 bytes.
pub(crate) fn get_compact_block_hash(compact_block: &CompactBlock) -> BlockHash {
    if let Some(header) = get_compact_block_header(compact_block) {
        header.hash()
    } else {
        BlockHash::from_slice(&compact_block.hash)
    }
}

/// Returns the [`BlockHash`] for this block's parent.
///
/// # Panics
///
/// This function will panic if `compact_block.header` is not set and
/// `compact_block.hash` is not exactly 32 bytes.
pub(crate) fn get_compact_block_prev_hash(compact_block: &CompactBlock) -> BlockHash {
    if let Some(header) = get_compact_block_header(compact_block) {
        header.prev_block
    } else {
        BlockHash::from_slice(&compact_block.prev_hash)
    }
}

/// Returns the [`BlockHeight`] value for this block
///
/// # Panics
///
/// This function will panic if `compact_block.height` is not representable within a
/// `u32`.
pub(crate) fn get_compact_block_height(compact_block: &CompactBlock) -> BlockHeight {
    compact_block.height.try_into().unwrap()
}

/// Returns the [`BlockHeader`] for this block if present.
///
/// A convenience method that parses `compact_block.height` if present.
pub(crate) fn get_compact_block_header(compact_block: &CompactBlock) -> Option<BlockHeader> {
    if compact_block.header.is_empty() {
        None
    } else {
        BlockHeader::read(&compact_block.header[..]).ok()
    }
}

/// Returns the transaction Id
pub(crate) fn get_compact_tx_txid(compact_tx: &CompactTx) -> TxId {
    let mut txid_bytes = [0u8; 32];
    txid_bytes.copy_from_slice(&compact_tx.txid);
    TxId::from_bytes(txid_bytes)
}

pub(crate) fn get_compact_output_description(
    compact_sapling_output: &CompactSaplingOutput,
) -> Result<CompactOutputDescription, CompactFormatError> {
    let mut repr = [0; 32];
    repr.copy_from_slice(&compact_sapling_output.cmu[..]);
    let cmu = Option::from(ExtractedNoteCommitment::from_bytes(&repr))
        .ok_or(CompactFormatError::InvalidValue)?;

    let ephemeral_key = compact_sapling_output.ephemeral_key[..]
        .try_into()
        .map(EphemeralKeyBytes)
        .map_err(CompactFormatError::InvalidLength)?;

    Ok(CompactOutputDescription {
        cmu,
        ephemeral_key,
        enc_ciphertext: compact_sapling_output.ciphertext[..]
            .try_into()
            .map_err(CompactFormatError::InvalidLength)?,
    })
}

pub(crate) fn get_compact_action(
    compact_orchard_action: &CompactOrchardAction,
) -> Result<CompactAction, CompactFormatError> {
    let nf_bytes: [u8; 32] = compact_orchard_action.nullifier[..]
        .try_into()
        .map_err(CompactFormatError::InvalidLength)?;
    let nullifier = Option::from(orchard::note::Nullifier::from_bytes(&nf_bytes))
        .ok_or(CompactFormatError::InvalidValue)?;

    let cmx = Option::from(orchard::note::ExtractedNoteCommitment::from_bytes(
        &compact_orchard_action.cmx[..]
            .try_into()
            .map_err(CompactFormatError::InvalidLength)?,
    ))
    .ok_or(CompactFormatError::InvalidValue)?;

    let ephemeral_key = compact_orchard_action.ephemeral_key[..]
        .try_into()
        .map(EphemeralKeyBytes)
        .map_err(CompactFormatError::InvalidLength)?;

    Ok(CompactAction::from_parts(
        nullifier,
        cmx,
        ephemeral_key,
        compact_orchard_action.ciphertext[..]
            .try_into()
            .map_err(CompactFormatError::InvalidLength)?,
    ))
}
