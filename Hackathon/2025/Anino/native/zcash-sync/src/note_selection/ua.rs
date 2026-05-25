use super::types::*;
use zcash_address::unified::{Container, Receiver};
use zcash_address::{AddressKind, ZcashAddress};
use zcash_client_backend::encoding::{decode_payment_address, decode_transparent_address};
use zcash_primitives::consensus::{Network, Parameters};
use zcash_primitives::legacy::TransparentAddress;

pub fn decode(network: &Network, address: &str) -> anyhow::Result<[Option<Destination>; 3]> {
    let mut destinations: [Option<Destination>; 3] = [None; 3];
    if let Ok(data) = decode_payment_address(network.hrp_sapling_payment_address(), address) {
        let destination = Destination::Sapling(data.to_bytes());
        destinations[Pool::Sapling as usize] = Some(destination);
    } else if let Ok(Some(ta)) = decode_transparent_address(
        &network.b58_pubkey_address_prefix(),
        &network.b58_script_address_prefix(),
        address,
    ) {
        let destination = Destination::from_transparent(&ta);
        destinations[Pool::Transparent as usize] = Some(destination);
    } else if let Ok(address) = ZcashAddress::try_from_encoded(address) {
        // ZcashAddress only supports Zcash
        match address.kind {
            AddressKind::Sprout(_) => {}
            AddressKind::Sapling(data) => {
                let destination = Destination::Sapling(data);
                destinations[Pool::Sapling as usize] = Some(destination);
            }
            AddressKind::Unified(unified_address) => {
                for address in unified_address.items() {
                    match address {
                        Receiver::Orchard(data) => {
                            let destination = Destination::Orchard(data);
                            destinations[Pool::Orchard as usize] = Some(destination);
                        }
                        Receiver::Sapling(data) => {
                            let destination = Destination::Sapling(data);
                            destinations[Pool::Sapling as usize] = Some(destination);
                        }
                        Receiver::P2pkh(data) => {
                            let destination =
                                Destination::from_transparent(&TransparentAddress::PublicKey(data));
                            destinations[Pool::Transparent as usize] = Some(destination);
                        }
                        Receiver::P2sh(data) => {
                            let destination =
                                Destination::from_transparent(&TransparentAddress::Script(data));
                            destinations[Pool::Transparent as usize] = Some(destination);
                        }
                        Receiver::Unknown { .. } => {}
                    }
                }
            }
            AddressKind::P2pkh(data) => {
                let destination =
                    Destination::from_transparent(&TransparentAddress::PublicKey(data));
                destinations[Pool::Transparent as usize] = Some(destination);
            }
            AddressKind::P2sh(_) => {}
        }
    }

    Ok(destinations)
}
