use prost::bytes::{Buf, BufMut};
use serde::{Deserialize, Serialize};
use std::convert::TryFrom;
use zcash_primitives::memo::{Memo, MemoBytes};

const CONTACT_COOKIE: u32 = 0x434E5440;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Contact {
    pub id: u32,
    pub name: String,
    pub address: String,
}

/// Heuristic check: does the provided string look like a wallet address rather than a human name?
/// Mirrors the UI logic used in Flutter (`_isAddressLike`) to keep behavior consistent.
pub fn is_address_like(s: &str) -> bool {
    let v = s.trim();
    if v.is_empty() {
        return false;
    }
    let lower = v.to_ascii_lowercase();
    // Common prefixes and a minimum length to avoid short accidental matches
    if v.len() >= 14
        && (lower.starts_with("u1")
            || lower.starts_with("uo")
            || lower.starts_with("zs")
            || lower.starts_with("t1")
            || lower.starts_with("t3"))
    {
        return true;
    }
    // Crude check for long, mostly alphanumeric strings (base32/58-like)
    let alnum: String = lower.chars().filter(|c| c.is_ascii_alphanumeric()).collect();
    if alnum.len() > 24 {
        return true;
    }
    false
}

pub fn serialize_contacts(contacts: &[Contact]) -> anyhow::Result<Vec<Memo>> {
    let cs_bin = bincode::serialize(&contacts)?;
    let chunks = cs_bin.chunks(500);
    let memos: Vec<_> = chunks
        .enumerate()
        .map(|(i, c)| {
            let n = i as u8;
            let mut bytes = [0u8; 511];
            let mut bb: Vec<u8> = vec![];
            bb.put_u32(CONTACT_COOKIE);
            bb.put_u8(n);
            bb.put_u16(c.len() as u16);
            bb.put_slice(c);
            bytes[0..bb.len()].copy_from_slice(&bb);
            Memo::Arbitrary(Box::new(bytes))
        })
        .collect();

    Ok(memos)
}

pub struct ContactDecoder {
    has_contacts: bool,
    chunks: Vec<Vec<u8>>,
}

impl ContactDecoder {
    pub fn new(n: usize) -> ContactDecoder {
        let mut chunks = vec![];
        chunks.resize(n, vec![]);
        ContactDecoder {
            has_contacts: false,
            chunks,
        }
    }

    pub fn add_memo(&mut self, memo: &MemoBytes) -> anyhow::Result<()> {
        let memo = Memo::try_from(memo.clone())?;
        if let Memo::Arbitrary(bytes) = memo {
            let (n, data) = ContactDecoder::_decode_box(&bytes)?;
            self.has_contacts = true;
            self.chunks[n as usize] = data;
        }

        Ok(())
    }

    pub fn finalize(&self) -> anyhow::Result<Vec<Contact>> {
        if !self.has_contacts {
            return Ok(Vec::new());
        }
        let data: Vec<_> = self.chunks.iter().flatten().cloned().collect();
        let contacts = bincode::deserialize::<Vec<Contact>>(&data)?;
        Ok(contacts)
    }

    fn _decode_box(bb: &[u8; 511]) -> anyhow::Result<(u8, Vec<u8>)> {
        let mut bb: &[u8] = bb;
        let magic = bb.get_u32();
        if magic != CONTACT_COOKIE {
            anyhow::bail!("Not a contact record");
        }
        let n = bb.get_u8();
        let len = bb.get_u16() as usize;
        if len > bb.len() {
            anyhow::bail!("Buffer overflow");
        }

        let data = &bb[0..len];
        Ok((n, data.to_vec()))
    }
}
