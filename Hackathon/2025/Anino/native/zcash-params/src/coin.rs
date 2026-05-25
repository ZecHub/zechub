use zcash_primitives::consensus::{BlockHeight, BranchId, Network};
use serde::{Serialize, Deserialize};

#[derive(Copy, Clone, Serialize, Deserialize, Debug)]
pub enum CoinType {
    Ycash, Zcash, PirateChain,
}

impl Default for CoinType {
    fn default() -> Self {
        CoinType::Ycash
    }
}

pub fn get_coin_type(coin: u8) -> CoinType {
    match coin {
        0 => CoinType::Zcash,
        1 => CoinType::Ycash,
        2 => CoinType::PirateChain,
        _ => CoinType::Zcash,
    }
}

pub fn get_coin_id(coin: CoinType) -> u8 {
    match coin {
        CoinType::Zcash => 0,
        CoinType::Ycash => 1,
        CoinType::PirateChain => 2,
    }
}

struct YCASH;
struct ZCASH;
struct PIRATECHAIN;

pub fn get_coin_chain(c: CoinType) -> &'static (dyn CoinChain + Send) {
    match c {
        CoinType::Ycash => &YCASH,
        CoinType::Zcash => &ZCASH,
        CoinType::PirateChain => &PIRATECHAIN,
    }
}

pub trait CoinChain: Send + Sync {
    fn network(&self) -> &'static Network;
    fn ticker(&self) -> &'static str;
    fn has_transparent(&self) -> bool;
    fn has_unified(&self) -> bool;
}

impl CoinChain for YCASH {
    fn network(&self) -> &'static Network {
        &Network::YCashMainNetwork
    }

    fn ticker(&self) -> &'static str {
        "ycash"
    }

    fn has_transparent(&self) -> bool { true }

    fn has_unified(&self) -> bool { false }
}

impl CoinChain for ZCASH {
    fn network(&self) -> &'static Network { &Network::MainNetwork }

    fn ticker(&self) -> &'static str {
        "zcash"
    }

    fn has_transparent(&self) -> bool { true }

    fn has_unified(&self) -> bool { true }
}

impl CoinChain for PIRATECHAIN {
    fn network(&self) -> &'static Network {
        &Network::PirateChainMainNetwork
    }

    fn ticker(&self) -> &'static str {
        "pirate-chain"
    }

    fn has_transparent(&self) -> bool { false }

    fn has_unified(&self) -> bool { false }
}

pub fn get_branch(network: &Network, height: u32) -> BranchId {
    BranchId::for_height(network, BlockHeight::from_u32(height))
}
