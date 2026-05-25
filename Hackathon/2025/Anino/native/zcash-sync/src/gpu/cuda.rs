use crate::chain::DecryptedBlock;
use crate::gpu::{collect_nf, GPUProcessor};
use crate::lw_rpc::CompactBlock;
use crate::{hash::GENERATORS_EXP, Hash};
use anyhow::Result;
use ff::BatchInverter;
use jubjub::Fq;
use lazy_static::lazy_static;
use rustacuda::context::CurrentContext;
use rustacuda::launch;
use rustacuda::prelude::*;
use std::convert::TryInto;
use std::ffi::CString;
use std::sync::Mutex;
use zcash_primitives::consensus::Network;
use zcash_primitives::sapling::SaplingIvk;

const THREADS_PER_BLOCK: usize = 256usize;
const BUFFER_SIZE: usize = 96usize;

lazy_static! {
    pub static ref CUDA_CONTEXT: Mutex<Option<CudaContext>> = Mutex::new(CudaContext::new().ok());
}

pub struct CudaContext {
    device: Device,
    context: Context,
    hash_module: Module,
    trial_decrypt_module: Module,
    stream: Stream,
    generators: DeviceBuffer<u8>,
}

unsafe impl Send for CudaContext {}

impl CudaContext {
    pub fn new() -> Result<Self> {
        let r = Self::new_inner();
        if let Err(ref err) = r {
            log::info!("CUDA Initialization Error {:?}", err);
        }
        log::info!("CUDA Initialized");
        r
    }

    fn new_inner() -> Result<Self> {
        rustacuda::init(rustacuda::CudaFlags::empty())?;

        let device = Device::get_device(0)?;
        let context =
            Context::create_and_push(ContextFlags::MAP_HOST | ContextFlags::SCHED_AUTO, device)?;

        let ptx = CString::new(include_str!("./cuda/hash.ptx"))?;
        let hash_module = Module::load_from_string(&ptx)?;

        let ptx = CString::new(include_str!("./cuda/trial_decrypt.ptx"))?;
        let trial_decrypt_module = Module::load_from_string(&ptx)?;

        let stream = Stream::new(StreamFlags::DEFAULT, None)?;

        log::info!("Prepare Generators");
        let generators_len = GENERATORS_EXP.len();
        let mut gens = vec![0u8; generators_len * 128];
        for i in 0..generators_len {
            GENERATORS_EXP[i].copy_to_slice(&mut gens[i * 128..(i + 1) * 128]);
        }

        let generators = DeviceBuffer::from_slice(&gens)?;
        Ok(CudaContext {
            device,
            context,
            hash_module,
            trial_decrypt_module,
            stream,
            generators,
        })
    }

    pub fn total_memory(&self) -> Result<usize> {
        let mem = self.device.total_memory()?.saturating_sub(500_000_000);
        // leave 500 MB of GPU for other stuff;
        log::info!("Cuda memory {}", mem);
        Ok(mem)
    }

    pub fn batch_hash(&mut self, depth: u8, data: &[Hash]) -> Result<Vec<Hash>> {
        CurrentContext::set_current(&self.context)?;

        let n = data.len() / 2;
        let mut in_data = DeviceBuffer::from_slice(data)?;
        let mut out_data = unsafe { DeviceBuffer::<u8>::zeroed(n * 32 * 2)? };

        unsafe {
            // Launch the kernel again using the `function` form:
            let function_name = CString::new("pedersen_hash")?;
            let hash = self.hash_module.get_function(&function_name)?;

            let blocks = (n + THREADS_PER_BLOCK - 1) / THREADS_PER_BLOCK;

            let stream = &self.stream;
            let result = launch!(hash<<<(blocks as u32, 1, 1), (THREADS_PER_BLOCK as u32, 1, 1), 1024, stream>>>(
                n,
                depth,
                self.generators.as_device_ptr(),
                in_data.as_device_ptr(),
                out_data.as_device_ptr()
            ));
            result?;
        }
        self.stream.synchronize()?;

        let mut res = vec![0u8; n * 32 * 2];
        out_data.copy_to(&mut res)?;

        let mut p = vec![];
        let mut q: Vec<AffinePoint> = vec![AffinePoint::default(); n];
        for i in 0..n {
            let b = i * 64;
            let u = Fq::from_bytes(&res[b..b + 32].try_into().unwrap()).unwrap();
            let z = Fq::from_bytes(&res[b + 32..b + 64].try_into().unwrap()).unwrap();
            q[i].u = z;
            p.push(u);
        }
        BatchInverter::invert_with_internal_scratch(&mut q, |q| &mut q.u, |q| &mut q.v);
        let mut out = vec![];
        for i in 0..n {
            let hash: Hash = (p[i] * &q[i].u).to_bytes();
            // println!("{} {} {} {}", i, hex::encode(&data[i * 2]), hex::encode(&data[i * 2 + 1]), hex::encode(&hash));
            out.push(hash);
        }

        Ok(out)
    }
}

pub struct CudaProcessor {
    network: Network,
    decrypted_blocks: Vec<DecryptedBlock>,
    encrypted_data: Vec<u8>,
    encrypted_data_device: DeviceBuffer<u8>,
    ivk_device: DeviceBuffer<u8>,
    decrypted_data: Vec<u8>,
    n: usize,
    block_count: usize,
}

impl CudaProcessor {
    pub fn setup_decrypt(network: &Network, blocks: Vec<CompactBlock>) -> Result<Self> {
        let m = CUDA_CONTEXT.lock().unwrap();
        let cuda_context = m.as_ref().unwrap();
        CurrentContext::set_current(&cuda_context.context).unwrap();

        let decrypted_blocks = collect_nf(blocks)?;

        let mut data_buffer = vec![];
        let mut i = 0;
        for db in decrypted_blocks.iter() {
            let mut position_in_block = 0;
            let b = &db.compact_block;
            for tx in b.vtx.iter() {
                for co in tx.outputs.iter() {
                    if !co.epk.is_empty() {
                        data_buffer.extend(&co.epk);
                        data_buffer.extend(&co.ciphertext);
                        data_buffer.extend(&u64::to_le_bytes(position_in_block as u64));
                        data_buffer.extend(&[0u8; 4]); // padding
                        i += 1;
                    }
                    position_in_block += 1;
                }
            }
        }

        let n = i;
        let block_count = (n + THREADS_PER_BLOCK - 1) / THREADS_PER_BLOCK;

        let encrypted_data_device = unsafe { DeviceBuffer::uninitialized(data_buffer.len())? };
        let ivk_device = unsafe { DeviceBuffer::zeroed(32)? };

        let decrypted_data = vec![0u8; n * BUFFER_SIZE];
        let this = CudaProcessor {
            network: network.clone(),
            decrypted_blocks,
            encrypted_data: data_buffer,
            encrypted_data_device: encrypted_data_device,
            ivk_device: ivk_device,
            decrypted_data,
            n,
            block_count,
        };
        Ok(this)
    }
}

impl GPUProcessor for CudaProcessor {
    fn decrypt_account(&mut self, ivk: &SaplingIvk) -> Result<()> {
        log::info!("n = {}", self.n);
        if self.n == 0 {
            return Ok(());
        }
        let mut ivk_fr = ivk.0;
        ivk_fr = ivk_fr.double(); // multiply by cofactor
        ivk_fr = ivk_fr.double();
        ivk_fr = ivk_fr.double();

        self.encrypted_data_device.copy_from(&self.encrypted_data)?;
        self.ivk_device.copy_from(&ivk_fr.to_bytes())?;

        let m = CUDA_CONTEXT.lock().unwrap();
        let cuda_context = m.as_ref().unwrap();
        // decrypt all the blocks for the current account
        unsafe {
            // Launch the kernel again using the `function` form:
            let function_name = CString::new("trial_decrypt_full").unwrap();
            let trial_decrypt_full = cuda_context
                .trial_decrypt_module
                .get_function(&function_name)
                .unwrap();

            let stream = &cuda_context.stream;
            let result = launch!(trial_decrypt_full<<<(self.block_count as u32, 1, 1), (THREADS_PER_BLOCK as u32, 1, 1), 0, stream>>>(
                self.n,
                self.ivk_device.as_device_ptr(),
                self.encrypted_data_device.as_device_ptr()
            ));
            result.unwrap();
        }
        cuda_context.stream.synchronize().unwrap();

        self.encrypted_data_device
            .copy_to(&mut self.decrypted_data)
            .unwrap();

        Ok(())
    }

    fn get_decrypted_blocks(self) -> Result<Vec<DecryptedBlock>> {
        Ok(self.decrypted_blocks)
    }

    fn network(&self) -> Network {
        self.network
    }

    fn buffer_stride() -> usize {
        BUFFER_SIZE
    }

    fn borrow_buffers(&mut self) -> (&[u8], &mut [DecryptedBlock]) {
        (
            self.decrypted_data.as_slice(),
            self.decrypted_blocks.as_mut_slice(),
        )
    }
}

#[derive(Default, Clone)]
struct AffinePoint {
    u: Fq,
    v: Fq,
}
