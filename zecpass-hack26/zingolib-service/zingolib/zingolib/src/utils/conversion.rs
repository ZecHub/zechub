//! Conversion specific utilities

use zcash_address::ZcashAddress;
use zcash_protocol::{TxId, value::Zatoshis};

use super::error::ConversionError;

/// Converts txid from hex-encoded `&str` to `zcash_primitives::transaction::TxId`.
///
/// `TxId` byte order is displayed in the reverse order to how it's encoded.
pub fn txid_from_hex_encoded_str(txid: &str) -> Result<TxId, ConversionError> {
    let txid_bytes = hex::decode(txid).map_err(ConversionError::DecodeHexFailed)?;
    let mut txid_bytes = <[u8; 32]>::try_from(txid_bytes)
        .map_err(|e| ConversionError::InvalidTxidLength(e.len()))?;
    txid_bytes.reverse();
    Ok(TxId::from_bytes(txid_bytes))
}

/// Convert a &str to a `ZcashAddress`
pub fn address_from_str(address: &str) -> Result<ZcashAddress, ConversionError> {
    Ok(ZcashAddress::try_from_encoded(address)?)
}

/// Convert a valid u64 into Zatoshis.
pub fn zatoshis_from_u64(amount: u64) -> Result<Zatoshis, ConversionError> {
    Zatoshis::from_u64(amount).map_err(|_e| ConversionError::OutsideValidRange)
}
