use crate::chain::DecryptedBlock;
use crate::gpu::{collect_nf, GPUProcessor};
use crate::CompactBlock;
use ff::Field;
use jubjub::Fq;
use lazy_static::lazy_static;
use metal::*;
use objc::rc::autoreleasepool;
use rand::rngs::OsRng;
use rand::{RngCore, SeedableRng};
use rand_chacha::ChaChaRng;
use std::convert::TryInto;
use std::mem;
use std::ptr::slice_from_raw_parts;
use std::sync::Mutex;
use std::time::SystemTime;
use zcash_client_backend::encoding::decode_extended_full_viewing_key;
use zcash_note_encryption::Domain;
use zcash_primitives::consensus::{BlockHeight, MainNetwork, Network, Parameters};
use zcash_primitives::sapling::note_encryption::SaplingDomain;
use zcash_primitives::sapling::SaplingIvk;

lazy_static! {
    pub static ref METAL_CONTEXT: Mutex<MetalContext> = Mutex::new(MetalContext::new());
}

pub const N: usize = 200_000;
const WIDTH: u64 = 256;

#[derive(Clone)]
pub struct CompactOutput {
    pub height: u32,
    pub epk: [u8; 32],
    pub cmu: [u8; 32],
    pub ciphertext: [u8; 52],
}

#[repr(C)]
#[derive(Clone)]
struct Data {
    key: [u8; 32],
    epk: [u8; 32],
    cipher: [u8; 64],
}

impl Default for Data {
    fn default() -> Self {
        Data {
            key: [0; 32],
            epk: [0; 32],
            cipher: [0; 64],
        }
    }
}

pub struct MetalContext {
    device: Device,
    command_queue: CommandQueue,
    kernel: Function,
    ivk_buffer: Buffer,
    data_buffer: Buffer,
}

unsafe impl Send for MetalContext {}

impl MetalContext {
    pub fn new() -> Self {
        let library_data = include_bytes!("./metal/main.metallib");

        let device = Device::system_default().expect("no device found");
        let command_queue = device.new_command_queue();

        let library = device.new_library_with_data(&*library_data).unwrap();
        let kernel = library.get_function("decrypt", None).unwrap();

        let ivk_buffer = device.new_buffer(32, MTLResourceOptions::CPUCacheModeDefaultCache);
        let data_buffer = device.new_buffer(
            (N * MetalProcessor::buffer_stride()) as u64,
            MTLResourceOptions::CPUCacheModeDefaultCache,
        );

        MetalContext {
            device,
            command_queue,
            kernel,
            ivk_buffer,
            data_buffer,
        }
    }
}

pub struct MetalProcessor {
    network: Network,
    decrypted_blocks: Vec<DecryptedBlock>,
    encrypted_data: Vec<Data>,
    decrypted_data: Vec<u8>,
    n: usize,
}

impl MetalProcessor {
    pub fn setup_decrypt(network: &Network, blocks: Vec<CompactBlock>) -> anyhow::Result<Self> {
        log::info!("Metal::setup_decrypt");
        let decrypted_blocks = collect_nf(blocks)?;

        let mut encrypted_data: Vec<Data> = vec![];
        for db in decrypted_blocks.iter() {
            let b = &db.compact_block;
            for tx in b.vtx.iter() {
                for co in tx.outputs.iter() {
                    let mut cipher = [0u8; 64];
                    cipher[0..52].copy_from_slice(&co.ciphertext);
                    let data = Data {
                        key: [0u8; 32],
                        epk: co.clone().epk.try_into().unwrap(),
                        cipher,
                    };
                    encrypted_data.push(data);
                }
            }
        }
        let n = encrypted_data.len();

        let mp = MetalProcessor {
            network: network.clone(),
            decrypted_blocks,
            encrypted_data,
            decrypted_data: vec![0u8; N * Self::buffer_stride()],
            n,
        };
        Ok(mp)
    }
}

impl GPUProcessor for MetalProcessor {
    fn decrypt_account(&mut self, ivk: &SaplingIvk) -> anyhow::Result<()> {
        if self.n == 0 {
            return Ok(());
        }
        unsafe {
            let mc = METAL_CONTEXT.lock().unwrap();

            let mut ivk_fr = ivk.0;
            ivk_fr = ivk_fr.double(); // multiply by cofactor
            ivk_fr = ivk_fr.double();
            ivk_fr = ivk_fr.double();
            let ivk = ivk_fr.to_bytes();

            mc.ivk_buffer.contents().copy_from(ivk.as_ptr().cast(), 32);
            mc.data_buffer.contents().copy_from(
                self.encrypted_data.as_ptr().cast(),
                self.n * Self::buffer_stride(),
            );

            let command_buffer = mc.command_queue.new_command_buffer();

            let argument_encoder = mc.kernel.new_argument_encoder(0);
            let arg_buffer = mc.device.new_buffer(
                argument_encoder.encoded_length(),
                MTLResourceOptions::empty(),
            );
            argument_encoder.set_argument_buffer(&arg_buffer, 0);
            argument_encoder.set_buffer(0, &mc.ivk_buffer, 0);
            argument_encoder.set_buffer(1, &mc.data_buffer, 0);

            let encoder = command_buffer.new_compute_command_encoder();

            let pipeline_state_descriptor = ComputePipelineDescriptor::new();
            pipeline_state_descriptor.set_compute_function(Some(&mc.kernel));

            let pipeline_state = mc
                .device
                .new_compute_pipeline_state_with_function(
                    pipeline_state_descriptor.compute_function().unwrap(),
                )
                .unwrap();

            encoder.set_compute_pipeline_state(&pipeline_state);
            encoder.set_buffer(0, Some(&arg_buffer), 0);
            encoder.set_buffer(1, Some(&mc.data_buffer), 0);

            encoder.use_resource(&mc.ivk_buffer, MTLResourceUsage::Read);
            encoder.use_resource(
                &mc.data_buffer,
                MTLResourceUsage::Read | MTLResourceUsage::Write,
            );

            let width = WIDTH.into();

            let thread_group_count = MTLSize {
                width: N as u64 / width,
                height: 1,
                depth: 1,
            };

            let thread_group_size = MTLSize {
                width,
                height: 1,
                depth: 1,
            };

            encoder.dispatch_thread_groups(thread_group_count, thread_group_size);
            encoder.end_encoding();

            command_buffer.commit();
            command_buffer.wait_until_completed();

            let results = mc.data_buffer.contents() as *mut u8;
            let size = self.n * Self::buffer_stride();
            let res = std::slice::from_raw_parts::<u8>(results.cast(), size);
            self.decrypted_data[0..size].copy_from_slice(&res);

            Ok(())
        }
    }

    fn get_decrypted_blocks(self) -> anyhow::Result<Vec<DecryptedBlock>> {
        Ok(self.decrypted_blocks)
    }

    fn network(&self) -> Network {
        self.network
    }

    fn borrow_buffers(&mut self) -> (&[u8], &mut [DecryptedBlock]) {
        (&self.decrypted_data, &mut self.decrypted_blocks)
    }

    fn buffer_stride() -> usize {
        mem::size_of::<Data>()
    }
}
