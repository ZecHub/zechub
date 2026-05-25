use zcash_primitives::consensus::{BlockHeight, BranchId, Network};

pub const NETWORK: Network = Network::TestNetwork;
pub const TICKER: &str = "zcash";
pub fn get_branch(height: u32) -> BranchId {
    BranchId::for_height(&NETWORK, BlockHeight::from_u32(height))
}
