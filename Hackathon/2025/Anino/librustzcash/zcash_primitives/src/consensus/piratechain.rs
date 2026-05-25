use crate::consensus::{Parameters, NetworkUpgrade, BlockHeight, BranchId};
use crate::constants;

const PIRATECHAIN_UPGRADES_IN_ORDER: &[NetworkUpgrade] =
    &[
        NetworkUpgrade::Overwinter,
        NetworkUpgrade::Sapling,
    ];

#[derive(PartialEq, Copy, Clone, Debug)]
pub struct MainNetwork;

impl Parameters for MainNetwork {
    fn upgrades_in_order(&self) -> &'static [NetworkUpgrade] { PIRATECHAIN_UPGRADES_IN_ORDER }

    fn branch_id(&self, nu: NetworkUpgrade) -> BranchId {
        match nu {
            NetworkUpgrade::Overwinter => BranchId::Overwinter,
            NetworkUpgrade::Sapling => BranchId::Sapling,
            _ => unreachable!()
        }
    }

    fn activation_height(&self, nu: NetworkUpgrade) -> Option<BlockHeight> {
        match nu {
            NetworkUpgrade::Overwinter => Some(BlockHeight(152_855)),
            NetworkUpgrade::Sapling => Some(BlockHeight(152_855)),
            _ => None
        }
    }

    fn coin_type(&self) -> u32 {
        141
    }

    fn address_network(&self) -> Option<zcash_address::Network> {
        Some(zcash_address::Network::Main)
    }

    fn hrp_sapling_extended_spending_key(&self) -> &str {
        constants::mainnet::HRP_SAPLING_EXTENDED_SPENDING_KEY
    }

    fn hrp_sapling_extended_full_viewing_key(&self) -> &str {
        constants::mainnet::HRP_SAPLING_EXTENDED_FULL_VIEWING_KEY
    }

    fn hrp_sapling_payment_address(&self) -> &str {
        "zs"
    }

    fn b58_pubkey_address_prefix(&self) -> [u8; 2] {
        [0x3c, 0x00]
    }

    fn b58_script_address_prefix(&self) -> [u8; 2] {
        [0x55, 0x00]
    }
}

