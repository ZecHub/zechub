use crate::Hash;
use ff::PrimeField;
use group::{Curve, GroupEncoding};
use jubjub::{ExtendedNielsPoint, ExtendedPoint, Fr, SubgroupPoint};
use lazy_static::lazy_static;
use std::io::Read;
use std::ops::AddAssign;
use zcash_params::GENERATORS;
use zcash_primitives::constants::PEDERSEN_HASH_CHUNKS_PER_GENERATOR;

lazy_static! {
    pub static ref GENERATORS_EXP: Vec<ExtendedNielsPoint> = read_generators_bin();
}

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

macro_rules! accumulate_scalar {
    ($acc: ident, $cur: ident, $x: expr) => {
        // println!("accumulate_scalar {}", $x);
        let mut tmp = $cur;
        if $x & 1 != 0 {
            tmp.add_assign(&$cur);
        }
        $cur = $cur.double();
        if $x & 2 != 0 {
            tmp.add_assign(&$cur);
        }
        if $x & 4 != 0 {
            tmp = tmp.neg();
        }

        $acc.add_assign(&tmp);
    };
}

#[allow(dead_code)]
pub fn pedersen_hash(depth: u8, left: &Hash, right: &Hash) -> Hash {
    let p = pedersen_hash_inner(depth, left, right);

    p.to_affine().get_u().to_repr()
}

#[allow(dead_code)]
pub fn pedersen_hash_inner(depth: u8, left: &Hash, right: &Hash) -> ExtendedPoint {
    let mut result = ExtendedPoint::identity();
    let mut bitoffset = 0;
    let mut byteoffset = 0;
    let mut r_byteoffset = 0;

    let mut acc = Fr::zero();
    let mut cur = Fr::one();

    let a = depth & 7;
    let b = depth >> 3;
    accumulate_scalar!(acc, cur, a);
    cur = cur.double().double().double();

    accumulate_scalar!(acc, cur, b);
    cur = cur.double().double().double();

    let mut i_generator = 0;
    let mut chunks_remaining = PEDERSEN_HASH_CHUNKS_PER_GENERATOR - 3;

    let mut r = (left[0] as u16) | (left[1] as u16) << 8;
    let x = (r >> bitoffset) & 7;
    accumulate_scalar!(acc, cur, x);
    cur = cur.double().double().double();

    for _c in 0..169 {
        bitoffset += 3;
        let x = (r >> bitoffset) & 7;
        accumulate_scalar!(acc, cur, x);
        if bitoffset >= 8 {
            bitoffset -= 8;
            byteoffset += 1;
            if byteoffset < 31 {
                r = (r >> 8) | (left[byteoffset + 1] as u16) << 8;
            } else if byteoffset == 31 {
                r = ((r >> 7) & 0xFF) | (right[0] as u16) << 8;
                bitoffset += 1;
            } else if byteoffset < 63 {
                r = (r >> 8) | (right[r_byteoffset + 1] as u16) << 8;
                r_byteoffset += 1;
            } else if byteoffset == 63 {
                r >>= 8;
            }
        }

        chunks_remaining -= 1;
        if chunks_remaining == 0 {
            result += generator_multiplication(&acc, &GENERATORS_EXP, i_generator);

            i_generator += 1;
            acc = Fr::zero();
            cur = Fr::one();
            chunks_remaining = PEDERSEN_HASH_CHUNKS_PER_GENERATOR
        } else {
            cur = cur.double().double().double(); // 2^4 * cur
        }
    }
    result += generator_multiplication(&acc, &GENERATORS_EXP, i_generator);
    result
}

#[allow(dead_code)]
fn generator_multiplication(
    acc: &Fr,
    gens: &[ExtendedNielsPoint],
    i_generator: u32,
) -> ExtendedPoint {
    let acc = acc.to_repr();

    let mut tmp = jubjub::ExtendedPoint::identity();
    for (i, &j) in acc.iter().enumerate() {
        let offset = (i_generator * 32 + i as u32) * 256 + j as u32;
        let x = gens[offset as usize];
        tmp += x;
    }
    tmp
}

#[cfg(test)]
mod tests {
    use crate::hash::pedersen_hash;
    use rand::{thread_rng, RngCore};
    use zcash_primitives::merkle_tree::Hashable;
    use zcash_primitives::sapling::Node;

    #[test]
    fn test_hash() {
        let mut r = thread_rng();

        for _ in 0..1 {
            let mut a = [0u8; 32];
            r.fill_bytes(&mut a);
            let mut b = [0u8; 32];
            r.fill_bytes(&mut b);
            let depth = (r.next_u32() % 64) as u8;
            let depth = depth.min(62);

            // let sa = "767a9a7e989289efdfa69c4c8e985c31f3c2c0353f20a80f572854206f077f86";
            // let sb = "944c46945a9e7a0a753850bd90f69d44ac884b60244a9f8eacf3a2aeddd08d6e";
            // a.copy_from_slice(&hex::decode(sa).unwrap());
            // b.copy_from_slice(&hex::decode(sb).unwrap());
            // println!("A: {}", hex::encode(a));
            // println!("B: {}", hex::encode(b));

            let node1 = Node::new(a);
            let node2 = Node::new(b);
            let hash = Node::combine(depth as usize, &node1, &node2);
            let hash2 = pedersen_hash(depth, &a, &b);
            // println!("Reference Hash: {}", hex::encode(hash.repr));
            // println!("This Hash:      {}", hex::encode(hash2));
            // need to expose repr for this check
            assert_eq!(hash.repr, hash2);
        }
    }
}
