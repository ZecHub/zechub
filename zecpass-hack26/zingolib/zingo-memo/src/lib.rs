//! Zingo-Memo
//!
//! Utilities for procedural creation and parsing of the Memo field.
//!
//! These memos are not directly exposed to the user,
//! but instead write down UAs on-chain for recovery after rescan.

#![warn(missing_docs)]
use std::io::{self, Read, Write};

use zcash_address::unified::{Address, Container, Encoding, Receiver};
use zcash_encoding::{CompactSize, Vector};
use zcash_keys::address::UnifiedAddress;
use zcash_protocol::consensus::Parameters;

/// A parsed memo.
/// The main use-case for this is to record the UAs that a foreign recipient provided,
/// as the blockchain only records the pool-specific receiver corresponding to the key we sent with.
/// We also record the index of any ephemeral addresses sent to. On rescan, this tells us:
/// * this transaction is the first step of a multistep proposal that is sending
///   to a TEX address in the second step
/// * what ephemeral address we need to derive in order to sync the second step
#[derive(Debug)]
pub enum ParsedMemo {
    /// the memo including only a list of unified addresses
    Version0 {
        /// The list of unified addresses
        uas: Vec<UnifiedAddress>,
    },
    /// the memo including unified addresses and ephemeral indexes
    Version1 {
        /// the list of unified addresses
        uas: Vec<UnifiedAddress>,
        /// The ephemeral address indexes
        rejection_address_indexes: Vec<u32>,
    },
}

/// Packs a list of UAs into a memo. The UA only memo is version 0 of the protocol
/// Note that a UA's raw representation is 1 byte for length, +21 for a T-receiver,
/// +44 for a Sapling receiver, and +44 for an Orchard receiver. This totals a maximum
/// of 110 bytes per UA, and attempting to write more than 510 bytes will cause an error.
#[deprecated(note = "prefer version 1")]
pub fn create_wallet_internal_memo_version_0(
    consensus_parameters: &impl Parameters,
    uas: &[UnifiedAddress],
) -> io::Result<[u8; 511]> {
    let mut version_and_data = Vec::new();
    CompactSize::write(&mut version_and_data, 0usize)?;
    Vector::write(&mut version_and_data, uas, |w, ua| {
        write_unified_address_to_raw_encoding(consensus_parameters, ua, w)
    })?;
    let mut uas_bytes = [0u8; 511];
    if version_and_data.len() > 511 {
        Err(io::Error::new(
            io::ErrorKind::InvalidData,
            "Too many uas to fit in memo field",
        ))
    } else {
        uas_bytes[..version_and_data.len()].copy_from_slice(version_and_data.as_slice());
        Ok(uas_bytes)
    }
}

/// Packs a list of UAs and/or ephemeral address indexes. into a memo.
/// Note that a UA's raw representation is 1 byte for length, +21 for a T-receiver,
/// +44 for a Sapling receiver, and +44 for an Orchard receiver. This totals a maximum
/// of 110 bytes per UA, and attempting to write more than 510 bytes will cause an error.
/// Ephemeral address indexes are `CompactSize` encoded, so for most use cases will only be
/// one byte.
pub fn create_wallet_internal_memo_version_1(
    consensus_parameters: &impl Parameters,
    uas: &[UnifiedAddress],
    refund_address_indexes: &[u32],
) -> io::Result<[u8; 511]> {
    let mut memo_bytes_vec = Vec::new();
    CompactSize::write(&mut memo_bytes_vec, 1usize)?;
    Vector::write(&mut memo_bytes_vec, uas, |w, ua| {
        write_unified_address_to_raw_encoding(consensus_parameters, ua, w)
    })?;
    Vector::write(
        &mut memo_bytes_vec,
        refund_address_indexes,
        |w, ea_index| CompactSize::write(w, *ea_index as usize),
    )?;
    let mut memo_bytes = [0u8; 511];
    if memo_bytes_vec.len() > 511 {
        Err(io::Error::new(
            io::ErrorKind::InvalidData,
            "Too many addresses to fit in memo field",
        ))
    } else {
        memo_bytes[..memo_bytes_vec.len()].copy_from_slice(memo_bytes_vec.as_slice());
        Ok(memo_bytes)
    }
}

/// Attempts to parse the 511 bytes of a zingo memo
pub fn parse_zingo_memo(memo: [u8; 511]) -> io::Result<ParsedMemo> {
    let mut reader: &[u8] = &memo;
    match CompactSize::read(&mut reader)? {
        0 => Ok(ParsedMemo::Version0 {
            uas: Vector::read(&mut reader, |r| read_unified_address_from_raw_encoding(r))?,
        }),
        1 => Ok(ParsedMemo::Version1 {
            uas: Vector::read(&mut reader, |r| read_unified_address_from_raw_encoding(r))?,
            rejection_address_indexes: Vector::read(&mut reader, |r| CompactSize::read_t(r))?,
        }),
        _ => Err(io::Error::new(
            io::ErrorKind::InvalidData,
            "Received encoded memo data from a different wallet or a future wallet version.\n\
            Please ensure your software is up-to-date",
        )),
    }
}

/// A helper function to encode a UA as a `CompactSize` specifying the number
/// of receivers, followed by the UA's raw encoding as specified in
/// <https://zips.z.cash/zip-0316#encoding-of-unified-addresses>
pub fn write_unified_address_to_raw_encoding<W: Write>(
    consensus_parameters: &impl Parameters,
    ua: &UnifiedAddress,
    writer: W,
) -> io::Result<()> {
    let mainnet_encoded_ua = ua.encode(consensus_parameters);
    let (_mainnet, address) =
        Address::decode(&mainnet_encoded_ua).expect("freshly encoded ua to decode!");
    let receivers = address.items();
    Vector::write(writer, &receivers, |mut w, receiver| {
        let (typecode, data): (u32, &[u8]) = match receiver {
            Receiver::Orchard(data) => (3, data),
            Receiver::Sapling(data) => (2, data),
            Receiver::P2sh(data) => (1, data),
            Receiver::P2pkh(data) => (0, data),
            Receiver::Unknown { typecode, data } => (*typecode, data.as_slice()),
        };
        CompactSize::write(&mut w, typecode as usize)?;
        CompactSize::write(&mut w, data.len())?;
        w.write_all(data)
    })
}

/// A helper function to decode a UA from a `CompactSize` specifying the number of
/// receivers, followed by the UA's raw encoding as specified in
/// <https://zips.z.cash/zip-0316#encoding-of-unified-addresses>
pub fn read_unified_address_from_raw_encoding<R: Read>(reader: R) -> io::Result<UnifiedAddress> {
    let receivers = Vector::read(reader, |mut r| {
        let typecode: usize = CompactSize::read_t(&mut r)?;
        let addr_len: usize = CompactSize::read_t(&mut r)?;
        let mut receiver_bytes = vec![0; addr_len];
        r.read_exact(&mut receiver_bytes)?;
        decode_receiver(typecode, receiver_bytes)
    })?;
    let address = Address::try_from_items(receivers)
        .map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e))?;
    UnifiedAddress::try_from(address).map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e))
}

fn decode_receiver(typecode: usize, data: Vec<u8>) -> io::Result<Receiver> {
    Ok(match typecode {
        0 => Receiver::P2pkh(<[u8; 20]>::try_from(data).map_err(|e| {
            io::Error::new(
                io::ErrorKind::InvalidData,
                format!(
                    "Typecode {typecode} (P2pkh) indicates 20 bytes, found length of {}",
                    e.len()
                ),
            )
        })?),
        1 => Receiver::P2sh(<[u8; 20]>::try_from(data).map_err(|e| {
            io::Error::new(
                io::ErrorKind::InvalidData,
                format!(
                    "Typecode {typecode} (P2sh) indicates 20 bytes, found length of {}",
                    e.len()
                ),
            )
        })?),
        2 => Receiver::Sapling(<[u8; 43]>::try_from(data).map_err(|e| {
            io::Error::new(
                io::ErrorKind::InvalidData,
                format!(
                    "Typecode {typecode} (Sapling) indicates 43 bytes, found length of {}",
                    e.len()
                ),
            )
        })?),
        3 => Receiver::Orchard(<[u8; 43]>::try_from(data).map_err(|e| {
            io::Error::new(
                io::ErrorKind::InvalidData,
                format!(
                    "Typecode {typecode} (Orchard) indicates 43 bytes, found length of {}",
                    e.len()
                ),
            )
        })?),
        _ => Receiver::Unknown {
            typecode: typecode as u32,
            data,
        },
    })
}

#[cfg(test)]
mod test_vectors;

#[cfg(test)]
mod tests {
    use super::test_vectors as zingomemo_vectors;
    use super::*;
    use rand::{self, Rng};
    use test_vectors::TestVector;
    use zcash_protocol::consensus::MAIN_NETWORK;

    fn get_some_number_of_ephemeral_indexes() -> Vec<u32> {
        // Generate a random number of elements between 0 and 10
        let count = rand::thread_rng().gen_range(0..=10);

        // Create a vector of increasing natural numbers
        (0..count).collect::<Vec<u32>>()
    }
    fn get_serialiazed_ua(test_vector: &TestVector) -> (UnifiedAddress, Vec<u8>) {
        let zcash_keys::address::Address::Unified(ua) =
            zcash_keys::address::Address::decode(&MAIN_NETWORK, test_vector.unified_addr).unwrap()
        else {
            panic!("Couldn't decode test_vector UA")
        };
        let mut serialized_ua = Vec::new();
        write_unified_address_to_raw_encoding(&MAIN_NETWORK, &ua, &mut serialized_ua).unwrap();
        (ua, serialized_ua)
    }
    #[test]
    fn parse_zingo_memo_version_n() {
        for test_vector in zingomemo_vectors::UA_TEST_VECTORS {
            let (ua, _serialized_ua) = get_serialiazed_ua(test_vector);
            // version0
            #[allow(deprecated)]
            let version0_bytes =
                create_wallet_internal_memo_version_0(&MAIN_NETWORK, std::slice::from_ref(&ua))
                    .unwrap();
            let success_parse = parse_zingo_memo(version0_bytes).expect("To succeed in parse.");
            if let ParsedMemo::Version0 { uas } = success_parse {
                assert_eq!(uas[0], ua);
            }
            // version1
            let random_rejection_indexes = get_some_number_of_ephemeral_indexes();
            let version1_bytes = create_wallet_internal_memo_version_1(
                &MAIN_NETWORK,
                std::slice::from_ref(&ua),
                &random_rejection_indexes,
            )
            .expect("To create version 1 bytes");
            let success_parse = parse_zingo_memo(version1_bytes).expect("To succeed in parse.");
            if let ParsedMemo::Version1 {
                uas,
                rejection_address_indexes,
            } = success_parse
            {
                assert_eq!(uas[0], ua);
                assert_eq!(rejection_address_indexes, random_rejection_indexes);
            }
        }
    }
    #[test]
    fn round_trip_ser_deser() {
        for test_vector in zingomemo_vectors::UA_TEST_VECTORS {
            let (ua, serialized_ua) = get_serialiazed_ua(test_vector);
            assert_eq!(
                ua,
                read_unified_address_from_raw_encoding(&*serialized_ua).unwrap()
            );
        }
    }
}
