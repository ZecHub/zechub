use orchard::{
    builder::{SigningMetadata, SigningParts, SpendInfo},
    bundle::{Authorization, Authorized, Flags},
    circuit::{Circuit, Instance, ProvingKey},
    keys::{Diversifier, FullViewingKey, Scope, SpendAuthorizingKey, SpendValidatingKey},
    note::{ExtractedNoteCommitment, Nullifier, RandomSeed, TransmittedNoteCiphertext},
    note_encryption::OrchardNoteEncryption,
    primitives::redpallas::{Signature, SpendAuth},
    tree::MerklePath,
    value::{NoteValue, ValueCommitTrapdoor, ValueCommitment, ValueSum},
    Action, Address, Anchor, Bundle, Note, Proof,
};

use rand::{rngs::OsRng, RngCore};

use crate::{decode_orchard_merkle_path, ledger::*};
use anyhow::Result;

use group::ff::Field;

use nonempty::NonEmpty;
use zcash_primitives::{memo::MemoBytes, transaction::components::Amount};

use super::create_hasher;

#[derive(Debug)]
pub struct NoAuth;

impl Authorization for NoAuth {
    type SpendAuth = ();
}

pub struct OrchardBuilder {
    enabled: bool,
    orchard_fvk: FullViewingKey,
    anchor: Anchor,

    spends: Vec<OrchardSpend>,
    outputs: Vec<OrchardOutput>,
    padded_inouts: Vec<(OrchardSpend, OrchardOutput)>,

    actions: Vec<Action<SigningMetadata>>,
    auth_actions: Vec<Action<Signature<SpendAuth>>>,

    net_value: ValueSum,
    net_rcv: ValueCommitTrapdoor,
    proof: Proof,

    sig_hash: Vec<u8>,
}

impl OrchardBuilder {
    pub fn new(orchard_fvk: &FullViewingKey, anchor: Anchor) -> Self {
        OrchardBuilder {
            enabled: true,
            orchard_fvk: orchard_fvk.clone(),
            anchor,

            spends: vec![],
            outputs: vec![],
            padded_inouts: vec![],

            actions: vec![],
            auth_actions: vec![],

            proof: Proof::new(vec![]),
            net_value: ValueSum::default(),
            net_rcv: ValueCommitTrapdoor::zero(),

            sig_hash: vec![],
        }
    }

    pub fn disable(&mut self) {
        self.enabled = false;
    }

    pub fn add_spend(
        &mut self,
        diversifier: [u8; 11],
        rseed: [u8; 32],
        rho: [u8; 32],
        witness: &[u8],
        amount: u64,
    ) -> Result<()> {
        if !self.enabled {
            anyhow::bail!("Orchard is disabled");
        }
        let diversifier = Diversifier::from_bytes(diversifier);
        let address = self.orchard_fvk.address(diversifier, Scope::External);
        let rho = Nullifier::from_bytes(&rho).unwrap();
        let rseed = RandomSeed::from_bytes(rseed, &rho).unwrap();
        let note = Note::from_parts(address, NoteValue::from_raw(amount), rho, rseed).unwrap();
        let merkle_path = decode_orchard_merkle_path(0, &witness).unwrap();
        self.spends.push(OrchardSpend {
            ask: None,
            fvk: self.orchard_fvk.clone(),
            note,
            merkle_path,
        });
        Ok(())
    }

    pub fn add_output(&mut self, address: [u8; 43], amount: u64, memo: &MemoBytes) -> Result<()> {
        if !self.enabled {
            anyhow::bail!("Orchard is disabled");
        }
        let address = Address::from_raw_address_bytes(&address).unwrap();
        let output = OrchardOutput {
            recipient: address,
            amount: NoteValue::from_raw(amount),
            memo: memo.as_array().clone(),
        };
        self.outputs.push(output);
        Ok(())
    }

    pub fn prepare<R: RngCore>(
        &mut self,
        netchg: i64,
        pk: &ProvingKey,
        mut alpha_rng: R,
        mut rseed_rng: R,
    ) -> Result<()> {
        let mut orchard_memos_hasher = create_hasher(b"ZTxIdOrcActMHash");
        let mut orchard_nc_hasher = create_hasher(b"ZTxIdOrcActNHash");

        let num_actions = self.spends.len().max(self.outputs.len());
        let mut circuits = vec![];
        let mut instances = vec![];

        for i in 0..num_actions {
            // pad with dummy spends/outputs
            let spend = if i < self.spends.len() {
                self.spends[i].clone()
            } else {
                OrchardSpend::dummy(&mut OsRng)
            };

            let output = if i < self.outputs.len() {
                self.outputs[i].clone()
            } else {
                OrchardOutput::dummy(&mut OsRng)
            };
            self.padded_inouts.push((spend.clone(), output.clone()));

            let rcv = ValueCommitTrapdoor::random(&mut OsRng);
            self.net_rcv = self.net_rcv.clone() + &rcv;
            let alpha = pasta_curves::Fq::random(&mut alpha_rng);
            let ak: SpendValidatingKey = spend.fvk.clone().into();
            let rk = ak.randomize(&alpha);

            let rho = spend.note.nullifier(&spend.fvk);
            let mut rseed = [0u8; 32];
            rseed_rng.fill_bytes(&mut rseed);
            let rseed = RandomSeed::from_bytes(rseed, &rho).unwrap();

            let v_net: ValueSum = spend.note.value() - output.amount;
            self.net_value = (self.net_value + v_net).unwrap();
            let cv_net = ValueCommitment::derive(v_net, rcv.clone());

            let spend_info = SpendInfo::new(
                spend.fvk.clone(),
                spend.note.clone(),
                spend.merkle_path.clone(),
            )
            .unwrap();
            let output_note = Note::from_parts(
                output.recipient.clone(),
                output.amount.clone(),
                rho.clone(),
                rseed,
            )
            .unwrap();
            let cmx: ExtractedNoteCommitment = output_note.commitment().into();

            let encryptor = OrchardNoteEncryption::new(
                Some(self.orchard_fvk.to_ovk(Scope::External)),
                output_note.clone(),
                output.recipient.clone(),
                output.memo.clone(),
            );

            let epk = encryptor.epk().to_bytes().0;
            let enc = encryptor.encrypt_note_plaintext();
            let out = encryptor.encrypt_outgoing_plaintext(&cv_net.clone(), &cmx, &mut OsRng);
            let encrypted_note = TransmittedNoteCiphertext {
                epk_bytes: epk.clone(),
                enc_ciphertext: enc.clone(),
                out_ciphertext: out.clone(),
            };

            let rk_bytes: [u8; 32] = rk.clone().into();
            orchard_memos_hasher.update(&enc[52..564]);
            orchard_nc_hasher.update(&cv_net.to_bytes());
            orchard_nc_hasher.update(&rk_bytes);
            orchard_nc_hasher.update(&enc[564..]);
            orchard_nc_hasher.update(&out);

            // log::info!(
            //     "d/pkd {}",
            //     hex::encode(&output.recipient.to_raw_address_bytes())
            // );
            // log::info!("rho {}", hex::encode(&rho.to_bytes()));
            // log::info!(
            //     "amount {}",
            //     hex::encode(&output.amount.inner().to_le_bytes())
            // );
            // log::info!("rseed {}", hex::encode(&rseed.as_bytes()));
            // log::info!("cmx {}", hex::encode(&cmx.to_bytes()));

            let action: Action<SigningMetadata> = Action::from_parts(
                rho.clone(),
                rk.clone(),
                cmx.clone(),
                encrypted_note,
                cv_net.clone(),
                SigningMetadata {
                    dummy_ask: None,
                    parts: SigningParts { ak, alpha },
                },
            );
            self.actions.push(action);

            let circuit =
                Circuit::from_action_context(spend_info, output_note, alpha, rcv.clone()).unwrap();
            circuits.push(circuit);

            let instance =
                Instance::from_parts(self.anchor, cv_net, rho.clone(), rk, cmx, true, true);
            instances.push(instance);
        }

        self.proof = Proof::create(&pk, &circuits, &instances, &mut OsRng).unwrap();

        for (a, (_, ref o)) in self.actions.iter().zip(self.padded_inouts.iter()) {
            let nf = a.nullifier().to_bytes();
            let epk = a.encrypted_note().epk_bytes;
            ledger_add_o_action(
                &nf,
                o.amount.inner(),
                &epk,
                &o.recipient.to_raw_address_bytes(),
                &a.encrypted_note().enc_ciphertext[0..52],
            )
            .unwrap();
        }

        ledger_set_orchard_merkle_proof(
            &self.anchor.to_bytes(),
            orchard_memos_hasher.finalize().as_bytes(),
            orchard_nc_hasher.finalize().as_bytes(),
        )?;

        ledger_set_net_orchard(-netchg)?;

        Ok(())
    }

    pub fn sign(&mut self) -> Result<()> {
        self.sig_hash = ledger_get_shielded_sighash()?;

        for (a, (ref s, _)) in self.actions.iter().zip(self.padded_inouts.iter()) {
            let signature = match s.ask {
                Some(ref ask) => {
                    // dummy spend (we have a dummy key)
                    let rsk = ask.randomize(&a.authorization().parts.alpha);
                    rsk.sign(&mut OsRng, &self.sig_hash)
                }
                None => {
                    let sig_bytes: [u8; 64] = ledger_sign_orchard().unwrap().try_into().unwrap();
                    let signature: Signature<SpendAuth> = sig_bytes.into();
                    signature
                }
            };

            let auth_action = Action::from_parts(
                a.nullifier().clone(),
                a.rk().clone(),
                a.cmx().clone(),
                a.encrypted_note().clone(),
                a.cv_net().clone(),
                signature,
            );
            self.auth_actions.push(auth_action);
        }
        Ok(())
    }

    pub fn build(self) -> Result<Option<Bundle<Authorized, Amount>>> {
        if self.auth_actions.is_empty() {
            return Ok(None);
        }
        let auth_actions = NonEmpty::from_slice(&self.auth_actions).unwrap();

        let nv = i64::try_from(self.net_value).unwrap();
        let amount = Amount::from_i64(nv).unwrap();
        let bsk = self.net_rcv.into_bsk();

        let flags = Flags::from_parts(true, true);
        let binding_signature = bsk.sign(&mut OsRng, &self.sig_hash);

        let bundle: Bundle<Authorized, Amount> = Bundle::from_parts(
            auth_actions,
            flags,
            amount,
            self.anchor.clone(),
            Authorized::from_parts(self.proof, binding_signature),
        );

        Ok(Some(bundle))
    }
}

#[derive(Clone, Debug)]
struct OrchardSpend {
    ask: Option<SpendAuthorizingKey>,
    fvk: FullViewingKey,
    note: Note,
    merkle_path: MerklePath,
}

impl OrchardSpend {
    pub fn dummy<R: RngCore>(rng: &mut R) -> Self {
        let (sk, fvk, dummy_note) = Note::dummy(rng, None);
        let ask = SpendAuthorizingKey::from(&sk);
        let dummy_path = MerklePath::dummy(rng);
        OrchardSpend {
            ask: Some(ask),
            fvk,
            note: dummy_note,
            merkle_path: dummy_path,
        }
    }
}

#[derive(Clone, Debug)]
struct OrchardOutput {
    recipient: Address,
    amount: NoteValue,
    memo: [u8; 512],
}

impl OrchardOutput {
    pub fn dummy<R: RngCore>(rng: &mut R) -> Self {
        let (_, _, dummy_note) = Note::dummy(rng, None);
        let _address = dummy_note.recipient();
        let mut memo = [0u8; 512];
        memo[0] = 0xF6;

        OrchardOutput {
            recipient: dummy_note.recipient(),
            amount: dummy_note.value(),
            memo,
        }
    }
}
