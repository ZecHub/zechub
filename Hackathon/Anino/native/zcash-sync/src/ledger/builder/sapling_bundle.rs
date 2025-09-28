use blake2b_simd::State;
use std::io::Write;

use ff::PrimeField;
use group::GroupEncoding;

use jubjub::{Fq, Fr};
use zcash_primitives::memo::MemoBytes;
use zcash_primitives::sapling::ProofGenerationKey;
use zcash_primitives::zip32::DiversifiableFullViewingKey;

use crate::ledger::transport::*;

use anyhow::{anyhow, Result};
use rand::RngCore;

use zcash_primitives::constants::SPENDING_KEY_GENERATOR;
use zcash_primitives::{
    consensus::MainNetwork,
    merkle_tree::IncrementalWitness,
    sapling::{
        note_encryption::sapling_note_encryption,
        prover::TxProver,
        redjubjub::Signature,
        value::{NoteValue, ValueCommitment, ValueSum},
        Diversifier, Node, Note, Nullifier, PaymentAddress, Rseed,
    },
    transaction::components::{
        sapling::{Authorized as SapAuthorized, Bundle},
        Amount, OutputDescription, SpendDescription, GROTH_PROOF_SIZE,
    },
};
use zcash_proofs::{prover::LocalTxProver, sapling::SaplingProvingContext};

use super::create_hasher;

struct SpendDescriptionUnAuthorized {
    cv: ValueCommitment,
    anchor: Fq,
    pub nullifier: Nullifier,
    rk: zcash_primitives::sapling::redjubjub::PublicKey,
    zkproof: [u8; GROTH_PROOF_SIZE],
}

pub struct SaplingBuilder<'a> {
    prover: &'a LocalTxProver,
    dfvk: DiversifiableFullViewingKey,
    proofgen_key: ProofGenerationKey,

    sapling_context: SaplingProvingContext,
    value_balance: ValueSum,

    shielded_spends: Vec<SpendDescriptionUnAuthorized>,
    shielded_outputs: Vec<OutputDescription<[u8; GROTH_PROOF_SIZE]>>,

    spends_compact_hasher: State,
    spends_non_compact_hasher: State,

    output_memos_hasher: State,
    output_non_compact_hasher: State,

    signatures: Vec<Signature>,
}

impl<'a> SaplingBuilder<'a> {
    pub fn new(
        prover: &'a LocalTxProver,
        dfvk: DiversifiableFullViewingKey,
        proofgen_key: ProofGenerationKey,
    ) -> Self {
        let spends_compact_hasher = create_hasher(b"ZTxIdSSpendCHash");
        let spends_non_compact_hasher = create_hasher(b"ZTxIdSSpendNHash");

        let output_memos_hasher = create_hasher(b"ZTxIdSOutM__Hash");
        let output_non_compact_hasher = create_hasher(b"ZTxIdSOutN__Hash");

        SaplingBuilder {
            prover,
            dfvk,
            proofgen_key,

            sapling_context: SaplingProvingContext::new(),
            value_balance: ValueSum::zero(),
            shielded_spends: vec![],
            shielded_outputs: vec![],

            spends_compact_hasher,
            spends_non_compact_hasher,

            output_memos_hasher,
            output_non_compact_hasher,

            signatures: vec![],
        }
    }

    pub fn add_spend<R: RngCore>(
        &mut self,
        alpha: Fr,
        diversifier: [u8; 11],
        rseed: [u8; 32],
        witness: &[u8],
        amount: u64,
        mut rng: R,
    ) -> Result<()> {
        let diversifier = Diversifier(diversifier);
        let z_address = self
            .dfvk
            .fvk
            .vk
            .to_payment_address(diversifier)
            .ok_or(anyhow!("Invalid diversifier"))?;
        let rseed = Rseed::BeforeZip212(Fr::from_bytes(&rseed).unwrap());
        let note = Note::from_parts(z_address, NoteValue::from_raw(amount), rseed);
        let witness = IncrementalWitness::<Node>::read(&witness[..])?;
        let merkle_path = witness.path().ok_or(anyhow!("Invalid merkle path"))?;

        let node = Node::from_cmu(&note.cmu());
        let anchor = Fq::from_bytes(&merkle_path.root(node).repr).unwrap();

        let nf_key = self.proofgen_key.to_viewing_key().nk;
        let nullifier = note.nf(&nf_key, merkle_path.position);

        let (zkproof, cv, rk) = self
            .prover
            .spend_proof(
                &mut self.sapling_context,
                self.proofgen_key.clone(),
                diversifier,
                rseed,
                alpha,
                amount,
                anchor,
                merkle_path.clone(),
                &mut rng,
            )
            .map_err(|_| anyhow!("Error generating spend"))?;
        self.value_balance =
            (self.value_balance + note.value()).ok_or(anyhow!("Invalid amount"))?;

        self.spends_compact_hasher.update(nullifier.as_ref());
        self.spends_non_compact_hasher.update(&cv.to_bytes());
        self.spends_non_compact_hasher.update(&anchor.to_repr());
        rk.write(&mut self.spends_non_compact_hasher)?;

        self.shielded_spends.push(SpendDescriptionUnAuthorized {
            cv,
            anchor,
            nullifier,
            rk,
            zkproof,
        });
        Ok(())
    }

    pub fn add_output<R: RngCore>(
        &mut self,
        rseed: [u8; 32],
        raw_address: [u8; 43],
        memo: &MemoBytes,
        amount: u64,
        mut rng: R,
    ) -> Result<()> {
        let recipient = PaymentAddress::from_bytes(&raw_address).unwrap();
        let rseed = Rseed::AfterZip212(rseed);

        let value = NoteValue::from_raw(amount);
        self.value_balance = (self.value_balance - value).ok_or(anyhow!("Invalid amount"))?;

        let note = Note::from_parts(recipient, value, rseed);
        let rcm = note.rcm();
        let cmu = note.cmu();
        println!("cmu {}", hex::encode(cmu.to_bytes()));

        let encryptor = sapling_note_encryption::<_, MainNetwork>(
            Some(self.dfvk.fvk.ovk.clone()),
            note,
            recipient,
            memo.clone(),
            &mut rng,
        );

        let (zkproof, cv) = self.prover.output_proof(
            &mut self.sapling_context,
            encryptor.esk().0,
            recipient,
            rcm,
            amount,
            &mut rng,
        );

        let enc_ciphertext = encryptor.encrypt_note_plaintext();
        let out_ciphertext = encryptor.encrypt_outgoing_plaintext(&cv, &cmu, &mut rng);

        let epk = encryptor.epk();

        ledger_add_s_output(
            amount,
            &epk.to_bytes().0,
            &raw_address,
            &enc_ciphertext[0..52],
        )?;

        let memo = &enc_ciphertext[52..564];
        self.output_memos_hasher.update(memo);

        self.output_non_compact_hasher
            .update(&cv.as_inner().to_bytes());
        self.output_non_compact_hasher
            .update(&enc_ciphertext[564..]);
        self.output_non_compact_hasher.update(&out_ciphertext);

        let ephemeral_key = epk.to_bytes();
        self.shielded_outputs.push(OutputDescription {
            cv,
            cmu,
            ephemeral_key,
            enc_ciphertext,
            out_ciphertext,
            zkproof,
        });
        Ok(())
    }

    pub fn set_merkle_proof(&mut self, net_chg: i64) -> Result<()> {
        let spends_compact_digest = self.spends_compact_hasher.finalize();
        log::info!("C SPENDS {}", hex::encode(spends_compact_digest));
        let spends_non_compact_digest = self.spends_non_compact_hasher.finalize();
        log::info!("NC SPENDS {}", hex::encode(spends_non_compact_digest));

        let mut spends_hasher = create_hasher(b"ZTxIdSSpendsHash");
        if !self.shielded_spends.is_empty() {
            spends_hasher.update(spends_compact_digest.as_bytes());
            spends_hasher.update(spends_non_compact_digest.as_bytes());
        }
        let spends_digest = spends_hasher.finalize();
        println!("SPENDS {}", hex::encode(spends_digest));

        let memos_digest = self.output_memos_hasher.finalize();
        println!("MEMOS {}", hex::encode(memos_digest));
        let outputs_nc_digest = self.output_non_compact_hasher.finalize();
        println!("NC OUTPUTS {}", hex::encode(outputs_nc_digest));

        ledger_set_sapling_merkle_proof(
            spends_digest.as_bytes(),
            memos_digest.as_bytes(),
            outputs_nc_digest.as_bytes(),
        )?;
        ledger_set_net_sapling(-net_chg)?;

        Ok(())
    }

    pub fn sign(&mut self) -> Result<()> {
        let sig_hash = ledger_get_shielded_sighash()?;

        for sp in self.shielded_spends.iter() {
            let signature = ledger_sign_sapling()?;
            let signature = Signature::read(&*signature)?;
            // Signature verification
            let rk = &sp.rk;
            let mut message: Vec<u8> = vec![];
            message.write_all(&rk.0.to_bytes())?;
            message.write_all(sig_hash.as_ref())?;
            let verified =
                rk.verify_with_zip216(&message, &signature, SPENDING_KEY_GENERATOR, true);
            if !verified {
                anyhow::bail!("Invalid Sapling signature");
            }
            self.signatures.push(signature);
        }
        Ok(())
    }

    pub fn build(self) -> Result<Option<Bundle<SapAuthorized>>> {
        let has_sapling = !self.shielded_spends.is_empty() || !self.shielded_outputs.is_empty();
        if !has_sapling {
            return Ok(None);
        }

        let shielded_spends: Vec<_> = self
            .shielded_spends
            .into_iter()
            .zip(self.signatures.into_iter())
            .map(|(sp, spend_auth_sig)| SpendDescription::<SapAuthorized> {
                cv: sp.cv,
                anchor: sp.anchor,
                nullifier: sp.nullifier,
                rk: sp.rk,
                zkproof: sp.zkproof,
                spend_auth_sig,
            })
            .collect();

        let value: i64 = self.value_balance.try_into().unwrap();
        let value = Amount::from_i64(value).unwrap();

        let sighash = ledger_get_shielded_sighash()?;
        log::info!("TXID {}", hex::encode(&sighash));
        let binding_sig = self
            .sapling_context
            .binding_sig(value, &sighash.try_into().unwrap())
            .unwrap();

        let sapling_bundle = Bundle::<_>::from_parts(
            shielded_spends,
            self.shielded_outputs,
            value,
            SapAuthorized { binding_sig },
        );

        Ok(Some(sapling_bundle))
    }
}
