use group::GroupEncoding;
use jubjub::{ExtendedNielsPoint, ExtendedPoint, SubgroupPoint};
use lazy_static::lazy_static;
use std::io::Read;
use zcash_params::GENERATORS;

lazy_static! {
    pub static ref GENERATORS_EXP: Vec<ExtendedNielsPoint> = read_generators_bin();
}

mod hash;
mod note;

pub use hash::{SaplingHasher, SAPLING_ROOTS};
pub use note::{DecryptedSaplingNote, SaplingDecrypter, SaplingViewKey};

fn read_generators_bin() -> Vec<ExtendedNielsPoint> {
    let mut generators_bin = GENERATORS;
    let mut gens: Vec<ExtendedNielsPoint> = vec![];
    gens.reserve_exact(3 * 32 * 256);
    for _i in 0..3 {
        for _j in 0..32 {
            for _k in 0..256 {
                let mut bb = [0u8; 32];
                generators_bin.read_exact(&mut bb).unwrap();
                let p = ExtendedPoint::from(SubgroupPoint::from_bytes_unchecked(&bb).unwrap())
                    .to_niels();
                gens.push(p);
            }
        }
    }
    gens
}
