use crate::chain::Nf;
use crate::db::ReceivedNote;
use crate::sync::Node;
use crate::sync::{CompactOutputBytes, DecryptedNote, OutputPosition, TrialDecrypter, ViewKey};
use crate::CompactTx;
use ff::PrimeField;
use std::convert::TryInto;
use zcash_note_encryption::Domain;
use zcash_primitives::consensus::{BlockHeight, Parameters};
use zcash_primitives::sapling::note_encryption::{PreparedIncomingViewingKey, SaplingDomain};
use zcash_primitives::sapling::{PaymentAddress, SaplingIvk};
use zcash_primitives::zip32::ExtendedFullViewingKey;

#[derive(Clone)]
pub struct SaplingViewKey {
    pub account: u32,
    pub fvk: ExtendedFullViewingKey,
    pub ivk: SaplingIvk,
}

impl<P: Parameters> ViewKey<SaplingDomain<P>> for SaplingViewKey {
    fn account(&self) -> u32 {
        self.account
    }
    fn ivk(&self) -> <SaplingDomain<P> as Domain>::IncomingViewingKey {
        PreparedIncomingViewingKey::new(&self.ivk)
    }
}

pub struct DecryptedSaplingNote {
    pub vk: SaplingViewKey,
    pub note: zcash_primitives::sapling::Note,
    pub pa: PaymentAddress,
    pub output_position: OutputPosition,
    pub cmx: Node,
}

impl<P: Parameters> DecryptedNote<SaplingDomain<P>, SaplingViewKey> for DecryptedSaplingNote {
    fn from_parts(
        vk: SaplingViewKey,
        note: zcash_primitives::sapling::Note,
        pa: PaymentAddress,
        output_position: OutputPosition,
        cmx: Node,
    ) -> Self {
        DecryptedSaplingNote {
            vk,
            note,
            pa,
            output_position,
            cmx,
        }
    }

    fn position(&self, block_offset: usize) -> usize {
        block_offset + self.output_position.position_in_block
    }

    fn cmx(&self) -> Node {
        self.cmx
    }

    fn to_received_note(&self, position: u64) -> ReceivedNote {
        let viewing_key = &self.vk.fvk.fvk.vk;
        ReceivedNote {
            account: self.vk.account,
            height: self.output_position.height,
            output_index: self.output_position.output_index as u32,
            diversifier: self.pa.diversifier().0.to_vec(),
            value: self.note.value().inner(),
            rcm: self.note.rcm().to_repr().to_vec(),
            nf: self.note.nf(&viewing_key.nk, position).to_vec(),
            rho: None,
            spent: None,
        }
    }
}

#[derive(Clone)]
pub struct SaplingDecrypter<N> {
    pub network: N,
}

impl<N> SaplingDecrypter<N> {
    pub fn new(network: N) -> Self {
        SaplingDecrypter { network }
    }
}

impl<N: Parameters> TrialDecrypter<N, SaplingDomain<N>, SaplingViewKey, DecryptedSaplingNote>
    for SaplingDecrypter<N>
{
    fn domain(&self, height: BlockHeight, _cob: &CompactOutputBytes) -> SaplingDomain<N> {
        SaplingDomain::<N>::for_height(self.network.clone(), height)
    }

    fn spends(&self, vtx: &CompactTx) -> Vec<Nf> {
        vtx.spends
            .iter()
            .map(|co| {
                let nf: [u8; 32] = co.nf.clone().try_into().unwrap();
                Nf(nf)
            })
            .collect()
    }

    fn outputs(&self, vtx: &CompactTx) -> Vec<CompactOutputBytes> {
        vtx.outputs.iter().map(|co| co.into()).collect()
    }
}
