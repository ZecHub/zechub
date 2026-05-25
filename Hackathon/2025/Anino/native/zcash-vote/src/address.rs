use std::fmt::{Display, Formatter};

use anyhow::Result;
use bech32::{FromBase32, ToBase32};
use orchard::Address;

pub struct VoteAddress(pub Address);

const VOTE_HRP: &str = "zvote";

impl VoteAddress {
    pub fn decode(s: &str) -> Result<Self> {
        let (hrp, data, _) = bech32::decode(s)?;
        if hrp != VOTE_HRP {
            anyhow::bail!("Invalid Address (incorrect prefix)");
        }
        let data = Vec::<u8>::from_base32(&data)?;
        if data.len() != 43 {
            anyhow::bail!("Invalid Address (incorrect length)")
        }
        let address = Address::from_raw_address_bytes(&data.try_into().unwrap());
        if address.is_none().into() {
            anyhow::bail!("Invalid Address (invalid data)")
        }
        let address = address.unwrap();
        Ok(VoteAddress(address))
    }

    pub fn encode(&self) -> String {
        let address = &self.0;
        let address = address.to_raw_address_bytes();
        let address = address.to_base32();

        bech32::encode(VOTE_HRP, &address, bech32::Variant::Bech32m).unwrap()
    }
}

impl Display for VoteAddress {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        f.write_str(&self.encode())
    }
}
