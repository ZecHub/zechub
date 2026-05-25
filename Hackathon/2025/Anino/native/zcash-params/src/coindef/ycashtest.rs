use zcash_primitives::consensus::{BranchId, BlockHeight, Network};

pub const NETWORK: Network = Network::YCashTestNetwork;
pub const TICKER: &str = "ycash";
pub fn get_branch(height: u32) -> BranchId {
    BranchId::for_height(&NETWORK, BlockHeight::from_u32(height))
}
