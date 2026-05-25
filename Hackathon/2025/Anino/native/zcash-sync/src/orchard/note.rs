use crate::chain::Nf;
use crate::db::ReceivedNote;
use crate::sync::{
    CompactOutputBytes, DecryptedNote, Node, OutputPosition, TrialDecrypter, ViewKey, Witness,
};
use crate::CompactTx;
use orchard::keys::PreparedIncomingViewingKey;
use orchard::note_encryption::OrchardDomain;
use zcash_primitives::consensus::{BlockHeight, Parameters};

#[derive(Clone, Debug)]
pub struct OrchardViewKey {
    pub account: u32,
    pub fvk: orchard::keys::FullViewingKey,
}

impl ViewKey<OrchardDomain> for OrchardViewKey {
    fn account(&self) -> u32 {
        self.account
    }

    fn ivk(&self) -> orchard::keys::PreparedIncomingViewingKey {
        let ivk = self.fvk.to_ivk(orchard::keys::Scope::External);
        PreparedIncomingViewingKey::new(&ivk)
    }
}

pub struct DecryptedOrchardNote {
    pub vk: OrchardViewKey,
    pub note: orchard::Note,
    pub pa: orchard::Address,
    pub output_position: OutputPosition,
    pub cmx: Node,
}

impl DecryptedNote<OrchardDomain, OrchardViewKey> for DecryptedOrchardNote {
    fn from_parts(
        vk: OrchardViewKey,
        note: orchard::Note,
        pa: orchard::Address,
        output_position: OutputPosition,
        cmx: Node,
    ) -> Self {
        DecryptedOrchardNote {
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

    fn to_received_note(&self, _position: u64) -> ReceivedNote {
        log::info!("Note {:?}", self.note);
        ReceivedNote {
            account: self.vk.account,
            height: self.output_position.height,
            output_index: self.output_position.output_index as u32,
            diversifier: self.pa.diversifier().as_array().to_vec(),
            value: self.note.value().inner(),
            rcm: self.note.rseed().as_bytes().to_vec(),
            nf: self.note.nullifier(&self.vk.fvk).to_bytes().to_vec(),
            rho: Some(self.note.rho().to_bytes().to_vec()),
            spent: None,
        }
    }
}

#[derive(Clone)]
pub struct OrchardDecrypter<N> {
    pub network: N,
}

impl<N> OrchardDecrypter<N> {
    pub fn new(network: N) -> Self {
        OrchardDecrypter { network }
    }
}

impl<N: Parameters> TrialDecrypter<N, OrchardDomain, OrchardViewKey, DecryptedOrchardNote>
    for OrchardDecrypter<N>
{
    fn domain(&self, _height: BlockHeight, cob: &CompactOutputBytes) -> OrchardDomain {
        OrchardDomain::for_nullifier(orchard::note::Nullifier::from_bytes(&cob.nullifier).unwrap())
    }

    fn spends(&self, vtx: &CompactTx) -> Vec<Nf> {
        vtx.actions
            .iter()
            .filter_map(|co| {
                if !co.nullifier.is_empty() {
                    let nf: [u8; 32] = co.nullifier.clone().try_into().unwrap();
                    Some(Nf(nf))
                } else {
                    None
                }
            })
            .collect()
    }

    fn outputs(&self, vtx: &CompactTx) -> Vec<CompactOutputBytes> {
        vtx.actions.iter().map(|co| co.into()).collect()
    }
}

pub fn decode_merkle_path(
    id_note: u32,
    witness: &[u8],
) -> anyhow::Result<orchard::tree::MerklePath> {
    let witness = Witness::from_bytes(id_note, witness)?;
    let auth_path: Vec<_> = witness
        .auth_path(32, &super::ORCHARD_ROOTS, &super::OrchardHasher::new())
        .iter()
        .map(|n| orchard::tree::MerkleHashOrchard::from_bytes(n).unwrap())
        .collect();
    let merkle_path = orchard::tree::MerklePath::from_parts(
        witness.position as u32,
        auth_path.try_into().unwrap(),
    );
    Ok(merkle_path)
}
