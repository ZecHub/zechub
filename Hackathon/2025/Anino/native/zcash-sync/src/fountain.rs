use crate::coinconfig::RAPTORQ;
use crate::db::data_generated::fb::{RaptorQDropsT, RaptorQResultT};
use blake2b_simd::Params;
use byteorder::{ReadBytesExt, WriteBytesExt, LE};
use raptorq::{Decoder, Encoder, EncodingPacket, ObjectTransmissionInformation, PayloadId};
use serde::Serialize;
use std::collections::HashSet;
use std::convert::TryInto;
use std::io::{Cursor, Write};

pub const QR_DATA_SIZE: u16 = 256;

pub struct FountainCodes {
    id: u32,
    decoder: Option<Decoder>,
    blocks_ids: HashSet<u8>,
    result: RaptorQResultT,
}

#[derive(Serialize)]
pub struct RaptorQDrops {
    drops: Vec<String>,
}

impl FountainCodes {
    pub fn new() -> Self {
        FountainCodes {
            id: 0,
            decoder: None,
            blocks_ids: HashSet::new(),
            result: RaptorQResultT {
                progress: 0,
                total: 0,
                data: None,
            },
        }
    }

    pub fn encode_into_drops(id: u32, data: &[u8]) -> anyhow::Result<RaptorQDropsT> {
        let total_length = data.len() as u32;
        let encoder = Encoder::with_defaults(data, QR_DATA_SIZE);
        let packets = encoder.get_encoded_packets(1);
        let drops: Vec<_> = packets
            .iter()
            .enumerate()
            .map(|(i, p)| {
                let mut result = vec![];
                let data = p.serialize();
                let checksum = Self::get_checksum(&data, id, total_length);
                result.write_u32::<LE>(id).unwrap();
                result.write_u32::<LE>(total_length as u32).unwrap();
                result.write_u32::<LE>(checksum).unwrap();
                result.write_u8(i as u8).unwrap();
                result.write_u8(packets.len() as u8).unwrap();
                result.write_all(&data).unwrap();
                base64::encode(&result)
            })
            .collect();
        Ok(RaptorQDropsT { drops: Some(drops) })
    }

    const HEADER_LEN: usize = 14;

    pub fn put_drop(&mut self, drop: &str) -> anyhow::Result<RaptorQResultT> {
        let drop = base64::decode(drop)?;
        if drop.len() < Self::HEADER_LEN {
            anyhow::bail!("Not enough data");
        }
        let (header, data) = drop.split_at(Self::HEADER_LEN);
        let mut c = Cursor::new(header);
        let id = c.read_u32::<LE>()?;
        let total_length = c.read_u32::<LE>()?;
        let checksum = c.read_u32::<LE>()?;
        let checksum2 = Self::get_checksum(data, id, total_length);
        if checksum != checksum2 {
            anyhow::bail!("Invalid checksum");
        }
        let i = c.read_u8()?;
        let total = c.read_u8()?;

        if self.id != id {
            self.id = id;
            let config =
                ObjectTransmissionInformation::with_defaults(total_length as u64, QR_DATA_SIZE);
            let decoder = Decoder::new(config);
            self.blocks_ids.clear();
            self.result.total = total;
            self.result.data = None;
            self.decoder = Some(decoder);
        }

        if let Some(ref mut decoder) = self.decoder {
            let packet = EncodingPacket::deserialize(data);
            self.blocks_ids.insert(i);
            self.result.progress = self.blocks_ids.len() as u8;
            let res = decoder.decode(packet);
            if res.is_some() {
                self.id = 0;
                self.decoder = None;
                self.result.data = res.map(|r| base64::encode(&r));
            }
        }

        Ok(self.result.clone())
    }

    fn get_checksum(data: &[u8], id: u32, total_length: u32) -> u32 {
        let hash = Params::new()
            .personal(b"QR_CHECKSUM")
            .hash_length(4)
            .to_state()
            .update(&id.to_le_bytes())
            .update(&total_length.to_le_bytes())
            .update(data)
            .finalize();
        let h = u32::from_le_bytes(hash.as_bytes().try_into().unwrap());
        h
    }
}

impl RaptorQDrops {
    pub fn put_drop(drop: &str) -> anyhow::Result<RaptorQResultT> {
        let mut fc = RAPTORQ.lock();
        fc.put_drop(drop)
    }
}
