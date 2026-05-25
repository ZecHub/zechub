use crate::{AccountData, Connection, DbAdapter};
use anyhow::anyhow;
use orchard::keys::{FullViewingKey, Scope};
use orchard::Address;
use rusqlite::OptionalExtension;
use zcash_address::unified::{Container, Encoding, Receiver};
use zcash_address::{unified, ToAddress, ZcashAddress};
use zcash_client_backend::address::UnifiedAddress;
use zcash_client_backend::encoding::{
    decode_payment_address, encode_payment_address, AddressCodec,
};
use zcash_primitives::consensus::{Network, Parameters};
use zcash_primitives::legacy::TransparentAddress;
use zcash_primitives::sapling::PaymentAddress;

#[derive(Debug)]
pub struct UnifiedAddressType {
    pub transparent: bool,
    pub sapling: bool,
    pub orchard: bool,
}

pub struct DecodedUA {
    pub network: Network,
    pub transparent: Option<TransparentAddress>,
    pub sapling: Option<PaymentAddress>,
    pub orchard: Option<Address>,
}

impl std::fmt::Display for DecodedUA {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "DecodedUA: {:?} {:?} {:?}",
            self.transparent.as_ref().map(|a| a.encode(&self.network)),
            self.sapling
                .as_ref()
                .map(|a| encode_payment_address(self.network.hrp_sapling_payment_address(), a)),
            self.orchard.as_ref().map(|a| {
                let ua = unified::Address(vec![Receiver::Orchard(a.to_raw_address_bytes())]);
                ua.encode(&self.network.address_network().unwrap())
            })
        )
    }
}

pub fn get_ua_of(
    network: &Network,
    connection: &Connection,
    account: u32,
    ua: u8,
) -> anyhow::Result<String> {
    let t_addr = connection
        .query_row(
            "SELECT address FROM taddrs WHERE account = ?1",
            [account],
            |r| r.get::<_, String>(0),
        )
        .optional()?;
    let (z_addr, aindex) = connection.query_row(
        "SELECT address, aindex FROM accounts WHERE id_account = ?1",
        [account],
        |r| {
            let address = r.get::<_, String>(0)?;
            let aindex = r.get::<_, u32>(1)?;
            Ok((address, aindex))
        },
    )?;
    let o_fvk = connection
        .query_row(
            "SELECT fvk FROM orchard_addrs WHERE account = ?1",
            [account],
            |r| r.get::<_, Vec<u8>>(0),
        )
        .optional()?;

    if ua == 1 {
        return t_addr.ok_or(anyhow!("No receiver"));
    } else if ua == 2 {
        return Ok(z_addr);
    }

    let t_addr = t_addr.map(|a| TransparentAddress::decode(network, &a).unwrap());
    let z_addr = decode_payment_address(network.hrp_sapling_payment_address(), &z_addr).unwrap();
    let o_addr = o_fvk.map(|fvk| {
        let fvk = FullViewingKey::from_bytes(&fvk.try_into().unwrap()).unwrap();
        fvk.address_at(aindex as usize, Scope::External)
    });
    let t_recv = if ua & 1 != 0 { t_addr } else { None };
    let z_recv = if ua & 2 != 0 { Some(z_addr) } else { None };
    let o_recv = if ua & 4 != 0 { o_addr } else { None };

    let address =
        zcash_client_backend::address::UnifiedAddress::from_receivers(o_recv, z_recv, t_recv)
            .ok_or(anyhow!("Invalid UA"))?;
    Ok(address.encode(network))
}

/*
 * It can also return a t-addr if there is no other selection
 */
pub fn get_unified_address(
    network: &Network,
    db: &DbAdapter,
    account: u32,
    tpe: Option<UnifiedAddressType>,
) -> anyhow::Result<String> {
    let mut tpe = tpe
        .ok_or(anyhow!(""))
        .or_else(|_| db.get_ua_settings(account))?;
    if db.get_taddr(account)?.is_none() {
        tpe.transparent = false;
    }
    if db.get_orchard(account)?.is_none() {
        tpe.orchard = false;
    }
    if !tpe.sapling && !tpe.orchard {
        // UA cannot be t-only
        let address = db.get_taddr(account)?.ok_or(anyhow!("No taddr"))?;
        return Ok(address);
    }

    let address = match (tpe.transparent, tpe.sapling, tpe.orchard) {
        (false, true, false) => {
            let AccountData { address, .. } = db.get_account_info(account)?;
            return Ok(address);
        }
        _ => {
            let mut rcvs = vec![];
            if tpe.transparent {
                let address = db.get_taddr(account)?;
                if let Some(address) = address {
                    let address = TransparentAddress::decode(network, &address)?;
                    if let TransparentAddress::PublicKey(pkh) = address {
                        let rcv = Receiver::P2pkh(pkh);
                        rcvs.push(rcv);
                    }
                }
            }
            if tpe.sapling {
                let AccountData { address, .. } = db.get_account_info(account)?;
                let pa = decode_payment_address(network.hrp_sapling_payment_address(), &address)
                    .unwrap();
                let rcv = Receiver::Sapling(pa.to_bytes());
                rcvs.push(rcv);
            }
            if tpe.orchard {
                let okey = db.get_orchard(account)?;
                if let Some(okey) = okey {
                    let fvk = FullViewingKey::from_bytes(&okey.fvk).unwrap();
                    let address = fvk.address_at(0usize, Scope::External);
                    let rcv = Receiver::Orchard(address.to_raw_address_bytes());
                    rcvs.push(rcv);
                }
            }

            assert!(!rcvs.is_empty());
            let addresses = unified::Address(rcvs);
            ZcashAddress::from_unified(network.address_network().unwrap(), addresses)
        }
    };
    Ok(address.encode())
}

pub fn decode_unified_address(network: &Network, ua: &str) -> anyhow::Result<DecodedUA> {
    let mut decoded_ua = DecodedUA {
        network: network.clone(),
        transparent: None,
        sapling: None,
        orchard: None,
    };
    let network = network.address_network().unwrap();
    let (a_network, ua) = unified::Address::decode(ua)?;
    if network != a_network {
        anyhow::bail!("Invalid network")
    }

    for recv in ua.items_as_parsed() {
        match recv {
            Receiver::Orchard(addr) => {
                decoded_ua.orchard = Address::from_raw_address_bytes(addr).into();
            }
            Receiver::Sapling(addr) => {
                decoded_ua.sapling = PaymentAddress::from_bytes(addr);
            }
            Receiver::P2pkh(addr) => {
                decoded_ua.transparent = Some(TransparentAddress::PublicKey(*addr));
            }
            Receiver::P2sh(_) => {}
            Receiver::Unknown { .. } => {}
        }
    }
    Ok(decoded_ua)
}

pub fn orchard_as_unified(network: &Network, address: &Address) -> String {
    let ua = UnifiedAddress::from_receivers(Some(address.clone()), None, None).unwrap();
    ua.encode(network)
}
