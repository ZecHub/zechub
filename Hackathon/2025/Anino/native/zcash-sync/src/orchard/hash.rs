#![allow(non_snake_case)]

use crate::sync::{Hasher, Node};
use crate::Hash;
use group::cofactor::CofactorCurveAffine;
use halo2_gadgets::sinsemilla::primitives::SINSEMILLA_S;
use halo2_proofs::arithmetic::{CurveAffine, CurveExt};
use halo2_proofs::pasta::group::ff::PrimeField;
use halo2_proofs::pasta::group::Curve;
use halo2_proofs::pasta::pallas::{self, Affine, Point};
use halo2_proofs::pasta::EpAffine;
use lazy_static::lazy_static;

pub const Q_PERSONALIZATION: &str = "z.cash:SinsemillaQ";
pub const MERKLE_CRH_PERSONALIZATION: &str = "z.cash:Orchard-MerkleCRH";

lazy_static! {
    pub static ref ORCHARD_ROOTS: Vec<Hash> = {
        let h = OrchardHasher::new();
        h.empty_roots(32)
    };
}

#[derive(Clone)]
pub struct OrchardHasher {
    Q: Point,
}

impl OrchardHasher {
    pub fn new() -> Self {
        let Q: Point =
            Point::hash_to_curve(Q_PERSONALIZATION)(MERKLE_CRH_PERSONALIZATION.as_bytes());
        OrchardHasher { Q }
    }

    fn node_combine_inner(&self, depth: u8, left: &Node, right: &Node) -> Point {
        let mut acc = self.Q;
        let (S_x, S_y) = SINSEMILLA_S[depth as usize];
        let S_chunk = Affine::from_xy(S_x, S_y).unwrap();
        acc = (acc + S_chunk) + acc; // TODO Bail if + gives point at infinity? Shouldn't happen if data was validated

        // Shift right by 1 bit and overwrite the 256th bit of left
        let mut left = *left;
        let mut right = *right;
        left[31] |= (right[0] & 1) << 7; // move the first bit of right into 256th of left
        for i in 0..32 {
            // move by 1 bit to fill the missing 256th bit of left
            let carry = if i < 31 { (right[i + 1] & 1) << 7 } else { 0 };
            right[i] = right[i] >> 1 | carry;
        }

        // we have 255*2/10 = 51 chunks
        let mut bit_offset = 0;
        let mut byte_offset = 0;
        for _ in 0..51 {
            let mut v = if byte_offset < 31 {
                left[byte_offset] as u16 | (left[byte_offset + 1] as u16) << 8
            } else if byte_offset == 31 {
                left[31] as u16 | (right[0] as u16) << 8
            } else {
                right[byte_offset - 32] as u16 | (right[byte_offset - 31] as u16) << 8
            };
            v = v >> bit_offset & 0x03FF; // keep 10 bits
            let (S_x, S_y) = SINSEMILLA_S[v as usize];
            let S_chunk = Affine::from_xy(S_x, S_y).unwrap();
            acc = (acc + S_chunk) + acc;
            bit_offset += 10;
            if bit_offset >= 8 {
                byte_offset += bit_offset / 8;
                bit_offset %= 8;
            }
        }
        acc
    }
}

impl Hasher for OrchardHasher {
    type Extended = Point;

    fn uncommited_node() -> Node {
        pallas::Base::from(2).to_repr()
    }

    fn node_combine(&self, depth: u8, left: &Node, right: &Node) -> Node {
        let acc = self.node_combine_inner(depth, left, right);
        let p = acc
            .to_affine()
            .coordinates()
            .map(|c| *c.x())
            .unwrap_or_else(pallas::Base::zero);
        p.to_repr()
    }

    fn node_combine_extended(&self, depth: u8, left: &Node, right: &Node) -> Self::Extended {
        self.node_combine_inner(depth, left, right)
    }

    fn normalize(&self, extended: &[Self::Extended]) -> Vec<Node> {
        let mut hash_affine = vec![EpAffine::identity(); extended.len()];
        Point::batch_normalize(extended, &mut hash_affine);
        hash_affine
            .iter()
            .map(|p| {
                p.coordinates()
                    .map(|c| *c.x())
                    .unwrap_or_else(pallas::Base::zero)
                    .to_repr()
            })
            .collect()
    }
}
