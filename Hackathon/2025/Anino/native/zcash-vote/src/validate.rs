use anyhow::Result;
use bip0039::Mnemonic;
use zcash_address::unified::Encoding;

pub fn validate_key(key: String) -> Result<bool> {
    if Mnemonic::from_phrase(&key).is_ok() {
        return Ok(true);
    }
    if zcash_address::unified::Ufvk::decode(&key).is_ok() {
        return Ok(true);
    }
    Ok(false)
}
