use crate::chain::Nf;
use crate::db::{ReceivedNote, ReceivedNoteShort};
use crate::{CompactBlock, DbAdapter};
use anyhow::Result;
use rayon::prelude::*;
use rusqlite::Transaction;
use std::collections::HashMap;
use std::convert::TryInto;
use std::marker::PhantomData;
use zcash_note_encryption::BatchDomain;
use zcash_primitives::consensus::Parameters;

pub mod tree;
pub mod trial_decrypt;

use crate::sync::tree::TreeCheckpoint;
pub use tree::{CTree, Hasher, Node, WarpProcessor, Witness};
pub use trial_decrypt::{
    CompactOutputBytes, DecryptedNote, OutputPosition, TrialDecrypter, ViewKey,
};

pub struct Synchronizer<
    'a,
    N: Parameters,
    D: BatchDomain<ExtractedCommitmentBytes = [u8; 32]>,
    VK: ViewKey<D>,
    DN: DecryptedNote<D, VK>,
    TD: TrialDecrypter<N, D, VK, DN>,
    H: Hasher,
> {
    pub decrypter: TD,
    pub warper: WarpProcessor<H>,
    pub vks: Vec<VK>,
    pub db_tx: &'a Transaction<'a>,
    pub shielded_pool: String,

    pub note_position: usize,
    pub nullifiers: HashMap<Nf, ReceivedNoteShort>,
    pub tree: CTree,
    pub witnesses: Vec<Witness>,
    pub _phantom: PhantomData<(N, D, DN)>,
}

impl<
        'a,
        N: Parameters + Sync,
        D: BatchDomain<ExtractedCommitmentBytes = [u8; 32]> + Sync + Send,
        VK: ViewKey<D> + Sync + Send,
        DN: DecryptedNote<D, VK> + Sync,
        TD: TrialDecrypter<N, D, VK, DN> + Sync,
        H: Hasher,
    > Synchronizer<'a, N, D, VK, DN, TD, H>
{
    pub fn new(
        decrypter: TD,
        warper: WarpProcessor<H>,
        vks: Vec<VK>,
        db_tx: &'a Transaction<'a>,
        shielded_pool: String,
    ) -> Self {
        Synchronizer {
            decrypter,
            warper,
            vks,
            db_tx,
            shielded_pool,

            note_position: 0,
            nullifiers: HashMap::default(),
            tree: CTree::new(),
            witnesses: vec![],
            _phantom: Default::default(),
        }
    }

    pub fn initialize(&mut self, height: u32) -> Result<()> {
        let TreeCheckpoint { tree, witnesses } =
            DbAdapter::get_tree_by_name(self.db_tx, height, &self.shielded_pool)?;
        self.tree = tree;
        self.witnesses = witnesses;
        self.note_position = self.tree.get_position();
        let nfs = DbAdapter::get_unspent_nullifiers(self.db_tx)?;
        for rn in nfs.into_iter() {
            self.nullifiers.insert(rn.nf.clone(), rn);
        }
        Ok(())
    }

    pub fn process(&mut self, blocks: &[CompactBlock]) -> Result<usize>
    where
        <D as zcash_note_encryption::Domain>::IncomingViewingKey: Clone,
        <D as zcash_note_encryption::Domain>::Recipient: Clone,
        <D as zcash_note_encryption::Domain>::Note: Clone,
    {
        if blocks.is_empty() {
            return Ok(0);
        }
        let decrypter = self.decrypter.clone();
        let decrypted_blocks: Vec<_> = blocks
            .par_iter()
            .map(|b| decrypter.decrypt_notes(b, &self.vks))
            .collect();
        let count_outputs: usize = decrypted_blocks
            .iter()
            .map(|b| b.count_outputs)
            .sum::<u32>() as usize;

        self.warper.initialize(&self.tree, &self.witnesses);

        // Detect new received notes
        let mut new_witnesses = vec![];
        for decb in decrypted_blocks.iter() {
            for dectx in decb.txs.iter() {
                let id_tx = DbAdapter::store_transaction(
                    &dectx.tx_id,
                    dectx.account,
                    dectx.height,
                    dectx.timestamp,
                    dectx.tx_index as u32,
                    &self.db_tx,
                )?;
                let mut balance: i64 = 0;
                for decn in dectx.notes.iter() {
                    let position = decn.position(self.note_position);
                    let rn: ReceivedNote = decn.to_received_note(position as u64);
                    let id_note =
                        DbAdapter::store_received_note(&rn, id_tx, position, &self.db_tx)?;
                    let nf = Nf(rn.nf.try_into().unwrap());
                    self.nullifiers.insert(
                        nf,
                        ReceivedNoteShort {
                            id: id_note,
                            account: rn.account,
                            nf,
                            value: rn.value,
                        },
                    );
                    let witness = Witness::new(position, id_note, &decn.cmx());
                    log::info!(
                        "Witness {} {} {}",
                        witness.position,
                        witness.id_note,
                        hex::encode(witness.cmx)
                    );
                    new_witnesses.push(witness);
                    balance += rn.value as i64;
                }
                DbAdapter::add_value(id_tx, balance, &self.db_tx)?;
            }
            self.note_position += decb.count_outputs as usize;
        }

        // Detect spends and collect note commitments
        let mut new_cmx = vec![];
        let mut height = 0;
        let mut hash = [0u8; 32];
        for b in blocks.iter() {
            for (tx_index, tx) in b.vtx.iter().enumerate() {
                for sp in self.decrypter.spends(tx).iter() {
                    if let Some(rn) = self.nullifiers.get(sp) {
                        let id_tx = DbAdapter::store_transaction(
                            &tx.hash,
                            rn.account,
                            b.height as u32,
                            b.time,
                            tx_index as u32,
                            &self.db_tx,
                        )?;
                        DbAdapter::add_value(id_tx, -(rn.value as i64), &self.db_tx)?;
                        DbAdapter::mark_spent(rn.id, b.height as u32, &self.db_tx)?;
                        self.nullifiers.remove(sp);
                    }
                }
                new_cmx.extend(self.decrypter.outputs(tx).into_iter().map(|cob| cob.cmx));
            }
            height = b.height as u32;
            hash.copy_from_slice(&b.hash);
        }

        // Run blocks through warp sync
        self.warper.add_nodes(&mut new_cmx, &new_witnesses);
        let (updated_tree, updated_witnesses) = self.warper.finalize();

        // Store witnesses
        for w in updated_witnesses.iter() {
            DbAdapter::store_witness(w, height, w.id_note, &self.db_tx, &self.shielded_pool)?;
        }
        DbAdapter::store_tree(self.db_tx, height, &updated_tree, &self.shielded_pool)?;
        self.tree = updated_tree;
        self.witnesses = updated_witnesses;

        Ok(count_outputs * self.vks.len())
    }
}
