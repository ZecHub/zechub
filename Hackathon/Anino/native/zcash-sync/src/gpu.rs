use crate::chain::{DecryptedBlock, DecryptedNote, Nf};
use crate::db::AccountViewKey;
use crate::CompactBlock;
use anyhow::Result;
use lazy_static::lazy_static;
use std::convert::TryInto;
use std::sync::Mutex;
use zcash_note_encryption::Domain;
use zcash_primitives::consensus::{BlockHeight, Network};
use zcash_primitives::sapling::note_encryption::{PreparedIncomingViewingKey, SaplingDomain};
use zcash_primitives::sapling::SaplingIvk;
use zcash_primitives::zip32::ExtendedFullViewingKey;

lazy_static! {
    pub static ref USE_GPU: Mutex<bool> = Mutex::new(true);
}

#[cfg(feature = "cuda")]
pub fn has_cuda() -> bool {
    let cuda = cuda::CUDA_CONTEXT.lock().unwrap();
    return cuda.is_some();
}

#[cfg(not(feature = "cuda"))]
pub fn has_cuda() -> bool {
    false
}

pub fn has_metal() -> bool {
    cfg!(feature = "apple_metal")
}

pub fn has_gpu() -> bool {
    cfg!(any(feature = "cuda", feature = "apple_metal"))
}

pub fn use_gpu(v: bool) {
    *USE_GPU.lock().unwrap() = v;
}

#[cfg(feature = "cuda")]
pub mod cuda;

#[cfg(feature = "apple_metal")]
pub mod metal;

pub trait GPUProcessor {
    fn decrypt_account(&mut self, ivk: &SaplingIvk) -> Result<()>;
    fn get_decrypted_blocks(self) -> Result<Vec<DecryptedBlock>>;
    fn network(&self) -> Network;
    fn borrow_buffers(&mut self) -> (&[u8], &mut [DecryptedBlock]);
    fn buffer_stride() -> usize;
}

#[allow(dead_code)]
pub fn trial_decrypt<
    'a,
    FVKIter: Iterator<Item = (&'a u32, &'a AccountViewKey)>,
    P: GPUProcessor,
>(
    mut processor: P,
    fvks: FVKIter,
) -> Result<Vec<DecryptedBlock>> {
    let network = processor.network();
    for (account, avk) in fvks {
        let fvk = &avk.fvk;
        let ivk = fvk.fvk.vk.ivk();
        processor.decrypt_account(&ivk)?;
        let (output_buffer, decrypted_blocks) = processor.borrow_buffers();
        collect_decrypted_notes(
            &network,
            *account,
            fvk,
            &ivk,
            output_buffer,
            P::buffer_stride(),
            decrypted_blocks,
        )
    }

    Ok(processor.get_decrypted_blocks()?)
}

#[allow(dead_code)]
fn collect_nf(blocks: Vec<CompactBlock>) -> Result<Vec<DecryptedBlock>> {
    let mut decrypted_blocks = vec![];
    // collect nullifiers
    for b in blocks.into_iter() {
        let mut spends = vec![];
        let mut count_outputs = 0;
        for tx in b.vtx.iter() {
            for cs in tx.spends.iter() {
                let mut nf = [0u8; 32];
                nf.copy_from_slice(&cs.nf);
                spends.push(Nf(nf));
            }
            count_outputs += tx.outputs.len();
        }
        decrypted_blocks.push(DecryptedBlock {
            height: b.height as u32,
            notes: vec![],
            count_outputs: count_outputs as u32,
            spends,
            compact_block: b,
            elapsed: 0, // TODO
        });
    }
    Ok(decrypted_blocks)
}

#[allow(dead_code)]
fn collect_decrypted_notes(
    network: &Network,
    account: u32,
    fvk: &ExtendedFullViewingKey,
    ivk: &SaplingIvk,
    output_buffer: &[u8],
    buffer_stride: usize,
    decrypted_blocks: &mut [DecryptedBlock],
) {
    let pivk = PreparedIncomingViewingKey::new(ivk);
    // merge the decrypted blocks
    let mut i = 0;
    for db in decrypted_blocks {
        let b = &db.compact_block;
        let mut decrypted_notes = vec![];
        let domain = SaplingDomain::for_height(*network, BlockHeight::from_u32(b.height as u32));
        for (tx_index, tx) in b.vtx.iter().enumerate() {
            for (output_index, co) in tx.outputs.iter().enumerate() {
                if !co.epk.is_empty() {
                    let offset = i * buffer_stride + 32;
                    let plaintext = &output_buffer[offset..offset + 60];
                    // version and amount must be in range - 21 million ZEC is less than 0x0008 0000 0000 0000
                    if plaintext[0] <= 2 && plaintext[18] < 0x08 && plaintext[19] == 0 {
                        if let Some((note, pa)) =
                            domain.parse_note_plaintext_without_memo_ivk(&pivk, plaintext)
                        {
                            let position_in_block =
                                usize::from_le_bytes(plaintext[52..60].try_into().unwrap());
                            let cmu = note.cmu().to_bytes();
                            if &cmu == co.cmu.as_slice() {
                                log::info!("Note {} {}", account, u64::from(note.value().inner()));
                                decrypted_notes.push(DecryptedNote {
                                    account,
                                    ivk: fvk.clone(),
                                    note,
                                    pa,
                                    position_in_block,
                                    viewonly: false,
                                    height: b.height as u32,
                                    txid: tx.hash.clone(),
                                    tx_index,
                                    output_index,
                                });
                            }
                        }
                    }
                    i += 1;
                }
            }
        }
        db.notes.extend(decrypted_notes);
    }
}
