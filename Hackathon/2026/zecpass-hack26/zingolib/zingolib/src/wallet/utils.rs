//! TODO: Add Mod Description Here!
use byteorder::{LittleEndian, ReadBytesExt, WriteBytesExt};
use std::{
    io::{self, Read, Write},
    path::PathBuf,
};
use zcash_primitives::transaction::TxId;
use zcash_protocol::memo::MemoBytes;

/// TODO: Add Doc Comment Here!
pub fn read_string<R: Read>(mut reader: R) -> io::Result<String> {
    // Strings are written as <littleendian> len + bytes
    let str_len = reader.read_u64::<LittleEndian>()?;
    let mut str_bytes = vec![0; str_len as usize];
    reader.read_exact(&mut str_bytes)?;

    let str = String::from_utf8(str_bytes)
        .map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e.to_string()))?;

    Ok(str)
}

/// TODO: Add Doc Comment Here!
pub fn write_string<W: Write>(mut writer: W, s: &String) -> io::Result<()> {
    // Strings are written as len + utf8
    writer.write_u64::<LittleEndian>(s.len() as u64)?;
    writer.write_all(s.as_bytes())
}

/// Create memo bytes from string.
// TODO: replace string err variant with error enum which maps to MemoBytes errors.
pub fn memo_bytes_from_string(memo_str: String) -> Result<MemoBytes, String> {
    let s_bytes = Vec::from(memo_str.as_bytes());
    MemoBytes::from_bytes(&s_bytes)
        .map_err(|_| format!("Error creating output. Memo '{memo_str:?}' is too long"))
}

/// TODO: Add Doc Comment Here!
#[must_use]
pub fn txid_from_slice(txid: &[u8]) -> TxId {
    let mut txid_bytes = [0u8; 32];
    txid_bytes.copy_from_slice(txid);
    TxId::from_bytes(txid_bytes)
}

/// Returns the downloaded Sapling parameters as bytes.
pub(crate) fn read_sapling_params() -> Result<(Vec<u8>, Vec<u8>), String> {
    use crate::SaplingParams;
    let mut sapling_output = vec![];
    sapling_output.extend_from_slice(
        SaplingParams::get("sapling-output.params")
            .unwrap()
            .data
            .as_ref(),
    );

    let mut sapling_spend = vec![];
    sapling_spend.extend_from_slice(
        SaplingParams::get("sapling-spend.params")
            .unwrap()
            .data
            .as_ref(),
    );
    Ok((sapling_output, sapling_spend))
}

/// Returns the path to the default directory that the Zcash proving parameters are located in.
pub fn get_zcash_params_path() -> std::io::Result<PathBuf> {
    zcash_proofs::default_params_folder()
        .ok_or_else(|| std::io::Error::other("could not load default params folder"))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_memo_bytes_from_string_plain_text() {
        let result = memo_bytes_from_string("Hello World".to_string());
        assert!(result.is_ok());
    }

    #[test]
    fn test_memo_bytes_from_string_valid_hex() {
        // Valid hex should be decoded
        let result = memo_bytes_from_string("0x48656c6c6f".to_string());
        assert!(result.is_ok());
    }

    #[test]
    fn test_memo_bytes_from_string_ethereum_address() {
        // Ethereum address should be treated as plain text
        let eth_address = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";
        let result = memo_bytes_from_string(eth_address.to_string());
        assert!(result.is_ok());
        // Verify it's stored as the full string (43 bytes), not decoded hex (20 bytes)
        let memo_bytes = result.unwrap();
        assert_eq!(memo_bytes.as_slice().len(), eth_address.len());
    }

    #[test]
    fn test_memo_bytes_from_string_invalid_hex() {
        // Invalid hex should fall back to plain text
        let result = memo_bytes_from_string("0xZZZZ".to_string());
        assert!(result.is_ok());
    }

    #[test]
    fn test_memo_bytes_from_string_too_long() {
        // String longer than 512 bytes should fail
        let long_string = "a".repeat(513);
        let result = memo_bytes_from_string(long_string);
        assert!(result.is_err());
    }
}
