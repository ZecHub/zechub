//! Bech32m serialisation for ZHAC key material.

use crate::{Result, ZhacError};
use bech32::primitives::decode::CheckedHrpstring;
use bech32::primitives::hrp::Hrp;
use bech32::Bech32m;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum EncodingVariant {
    Bech32m,
}

pub fn encode(hrp_str: &str, data: &[u8], _variant: EncodingVariant) -> Option<String> {
    let hrp = Hrp::parse(hrp_str).ok()?;
    bech32::encode::<Bech32m>(hrp, data).ok()
}

pub fn decode(s: &str) -> Result<(String, Vec<u8>, EncodingVariant)> {
    CheckedHrpstring::new::<Bech32m>(s)
        .map(|c| {
            (
                c.hrp().to_string(),
                c.byte_iter().collect(),
                EncodingVariant::Bech32m,
            )
        })
        .map_err(|e| ZhacError::Encoding(format!("bech32m decode: {e}")))
}
