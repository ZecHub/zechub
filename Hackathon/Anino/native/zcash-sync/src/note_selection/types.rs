use super::ser::MemoBytesProxy;
use crate::note_selection::ua::decode;
use crate::taddr::unwrap_tex;
use crate::unified::orchard_as_unified;
use crate::{Hash, TransactionBuilderError};
use orchard::Address;
use serde::{Deserialize, Serialize};
use serde_hex::{SerHex, Strict};
use serde_with::serde_as;
use zcash_client_backend::encoding::{encode_payment_address, AddressCodec};
use zcash_primitives::consensus::{Network, Parameters};
use zcash_primitives::legacy::TransparentAddress;
use zcash_primitives::memo::MemoBytes;
use zcash_primitives::sapling::PaymentAddress;

pub struct TransactionBuilderConfig {
    pub change_address: String,
}

impl TransactionBuilderConfig {
    pub fn new(change_address: &str) -> Self {
        TransactionBuilderConfig {
            change_address: change_address.to_string(),
        }
    }
}

#[serde_as]
#[derive(Clone, Serialize, Deserialize, Debug)]
pub enum Source {
    Transparent {
        #[serde(with = "SerHex::<Strict>")]
        txid: [u8; 32],
        index: u32,
    },
    Sapling {
        id_note: u32,
        #[serde(with = "SerHex::<Strict>")]
        diversifier: [u8; 11],
        #[serde(with = "SerHex::<Strict>")]
        rseed: [u8; 32],
        #[serde_as(as = "serde_with::hex::Hex")]
        witness: Vec<u8>,
    },
    Orchard {
        id_note: u32,
        #[serde(with = "SerHex::<Strict>")]
        diversifier: [u8; 11],
        #[serde(with = "SerHex::<Strict>")]
        rseed: [u8; 32],
        #[serde(with = "SerHex::<Strict>")]
        rho: [u8; 32],
        #[serde_as(as = "serde_with::hex::Hex")]
        witness: Vec<u8>,
    },
}

#[derive(Clone, Copy, Serialize, Deserialize, Debug)]
#[serde_as]
pub enum Destination {
    Transparent(#[serde(with = "SerHex::<Strict>")] [u8; 21]), // t1/t3 + Hash
    Sapling(#[serde(with = "SerHex::<Strict>")] [u8; 43]),     // Diversifier + Jubjub Point
    Orchard(#[serde(with = "SerHex::<Strict>")] [u8; 43]),     // Diviersifer + Pallas Point
}

impl Destination {
    pub fn from_transparent(ta: &TransparentAddress) -> Self {
        let mut d = [0u8; 21];
        match ta {
            TransparentAddress::PublicKey(data) => {
                d[0] = 0;
                d[1..21].copy_from_slice(&*data);
            }
            TransparentAddress::Script(data) => {
                d[0] = 1;
                d[1..21].copy_from_slice(&*data);
            }
        }
        Destination::Transparent(d)
    }

    pub fn transparent(&self) -> TransparentAddress {
        match self {
            Destination::Transparent(data) => {
                let hash: [u8; 20] = data[1..21].try_into().unwrap();
                let ta = if data[0] == 0 {
                    TransparentAddress::PublicKey(hash)
                } else {
                    TransparentAddress::Script(hash)
                };
                ta
            }
            _ => unreachable!(),
        }
    }

    pub fn address(&self, network: &Network) -> String {
        match self {
            Destination::Transparent(_data) => {
                let ta = self.transparent();
                ta.encode(network)
            }
            Destination::Sapling(data) => {
                let pa = PaymentAddress::from_bytes(data).unwrap();
                encode_payment_address(network.hrp_sapling_payment_address(), &pa)
            }
            Destination::Orchard(data) => {
                let address = Address::from_raw_address_bytes(data).unwrap();
                orchard_as_unified(network, &address)
            }
        }
    }
}

#[derive(Clone, Copy, PartialEq, Eq, Debug)]
pub enum Pool {
    Transparent = 0,
    Sapling = 1,
    Orchard = 2,
}

#[derive(Clone, Copy, Debug, Default)]
pub struct PoolAllocation(pub [u64; 3]);

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct UTXO {
    pub id: u32,
    pub source: Source,
    pub amount: u64,
    pub key: Option<[u8; 32]>,
}

#[derive(Serialize, Debug)]
pub struct Order {
    pub id: u32,
    pub address: String,
    pub destinations: [Option<Destination>; 3],
    pub raw_amount: u64,
    pub take_fee: bool,
    #[serde(with = "MemoBytesProxy")]
    pub memo: MemoBytes,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Fill {
    pub id_order: Option<u32>,
    pub address: String,
    pub destination: Destination,
    pub amount: u64,
    #[serde(with = "MemoBytesProxy")]
    pub memo: MemoBytes,
}

#[derive(Clone, Deserialize)]
pub struct RecipientShort {
    pub address: String,
    pub amount: u64,
}

#[derive(Serialize, Deserialize, Default)]
#[serde_as]
pub struct TransactionPlan {
    pub taddr: String,
    pub fvk: String,
    pub orchard_fvk: String,
    pub anchor_height: u32,
    pub expiry_height: u32,
    #[serde(with = "SerHex::<Strict>")]
    pub orchard_anchor: Hash,
    pub spends: Vec<UTXO>,
    pub outputs: Vec<Fill>,
    pub fee: u64,
    pub net_chg: [i64; 2],
}

#[derive(Serialize)]
pub struct TransactionReport {
    pub outputs: Vec<TransactionOutput>,
    pub transparent: u64,
    pub sapling: u64,
    pub orchard: u64,
    pub net_sapling: i64,
    pub net_orchard: i64,
    pub fee: u64,
    pub privacy_level: u8,
}

#[derive(Serialize)]
pub struct TransactionOutput {
    pub id: u32,
    pub address: String,
    pub amount: u64,
    pub pool: u8,
}

#[derive(PartialEq, Debug)]
pub struct OrderGroupAmounts {
    pub t0: u64,
    pub s0: u64,
    pub o0: u64,
    pub x: u64,
    pub fee: u64,
}

pub struct OrderInfo {
    pub group_type: usize,
    pub amount: u64,
}

#[derive(Clone, PartialEq, Eq, Debug)]
pub struct FundAllocation {
    pub s1: u64,
    pub o1: u64,
    pub t2: u64,
    pub s2: u64,
    pub o2: u64,
}

impl Source {
    pub fn pool(&self) -> usize {
        match self {
            Source::Transparent { .. } => 0,
            Source::Sapling { .. } => 1,
            Source::Orchard { .. } => 2,
        }
    }
}

impl Destination {
    pub fn pool(&self) -> usize {
        match self {
            Destination::Transparent { .. } => 0,
            Destination::Sapling { .. } => 1,
            Destination::Orchard { .. } => 2,
        }
    }
}

impl Order {
    pub fn new(
        network: &Network,
        id: u32,
        address: &str,
        amount: u64,
        take_fee: bool,
        memo: MemoBytes,
    ) -> Self {
        let addr = unwrap_tex(network, address);
        let destinations = decode(network, &addr).unwrap();
        Order {
            id,
            address: address.to_string(),
            destinations,
            raw_amount: amount,
            take_fee,
            memo,
        }
    }

    pub fn amount(&self, fee: u64) -> Result<u64, TransactionBuilderError> {
        if self.take_fee {
            if self.raw_amount < fee {
                return Err(TransactionBuilderError::RecipientCannotPayFee);
            }
            Ok(self.raw_amount - fee)
        } else {
            Ok(self.raw_amount)
        }
    }
}
