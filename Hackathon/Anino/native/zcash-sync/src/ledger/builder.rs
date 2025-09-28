use blake2b_simd::Params;
use blake2b_simd::State;
use byteorder::WriteBytesExt;
use byteorder::LE;
use ff::Field;
use hex_literal::hex;
use jubjub::Fr;
use orchard::circuit::ProvingKey;

use crate::ledger::builder::orchard_bundle::OrchardBuilder;
use crate::ledger::builder::sapling_bundle::SaplingBuilder;
use crate::ledger::builder::transparent_bundle::TransparentBuilder;
use crate::ledger::transport::*;

use crate::{Destination, Source, TransactionPlan};
use anyhow::{anyhow, Result};
use rand::rngs::OsRng;
use rand::{RngCore, SeedableRng};
use rand_chacha::ChaChaRng;
use ripemd::{Digest, Ripemd160};
use secp256k1::PublicKey;
use sha2::Sha256;

use zcash_client_backend::encoding::{
    encode_extended_full_viewing_key, encode_transparent_address,
};
use zcash_primitives::consensus::Network;
use zcash_primitives::consensus::Parameters;
use zcash_primitives::legacy::TransparentAddress;

use zcash_primitives::zip32::ExtendedFullViewingKey;

use zcash_primitives::transaction::txid::TxIdDigester;
use zcash_primitives::{
    consensus::{BlockHeight, BranchId, MainNetwork},
    transaction::{Authorized, TransactionData, TxVersion},
};
use zcash_proofs::prover::LocalTxProver;

mod orchard_bundle;
mod sapling_bundle;
mod transparent_bundle;

#[allow(dead_code)]
pub fn show_public_keys() -> Result<()> {
    let network = MainNetwork;

    ledger_init()?;
    let pub_key = ledger_get_pubkey()?;
    let pub_key = PublicKey::from_slice(&pub_key)?;
    let pub_key = pub_key.serialize();
    let pub_key = Ripemd160::digest(&Sha256::digest(&pub_key));
    let address = TransparentAddress::PublicKey(pub_key.into());
    let address = encode_transparent_address(
        &network.b58_pubkey_address_prefix(),
        &network.b58_script_address_prefix(),
        &address,
    );
    println!("address {}", address);
    let dfvk = ledger_get_dfvk()?;
    let efvk = ExtendedFullViewingKey::from_diversifiable_full_viewing_key(&dfvk);
    let efvk = encode_extended_full_viewing_key(
        MainNetwork.hrp_sapling_extended_full_viewing_key(),
        &efvk,
    );
    println!("efvk {}", efvk);
    Ok(())
}

pub fn create_hasher(perso: &[u8]) -> State {
    let h = Params::new().hash_length(32).personal(perso).to_state();
    h
}

pub fn build_ledger_tx(
    network: &Network,
    tx_plan: &TransactionPlan,
    prover: &LocalTxProver,
    proving_key: &ProvingKey,
) -> Result<Vec<u8>> {
    ledger_init()?;
    let pubkey = ledger_get_pubkey()?;
    let mut transparent_builder = TransparentBuilder::new(network, &pubkey);

    let mut rng = OsRng;
    if transparent_builder.taddr != tx_plan.taddr {
        anyhow::bail!(
            "This ledger wallet has a different address {} != {}",
            transparent_builder.taddr,
            tx_plan.taddr
        );
    }

    let has_orchard = ledger_has_orchard()?;

    let master_seed = ledger_init_tx()?;

    let dfvk: zcash_primitives::zip32::DiversifiableFullViewingKey = ledger_get_dfvk()?;
    let proofgen_key: zcash_primitives::sapling::ProofGenerationKey = ledger_get_proofgen_key()?;

    let mut sapling_builder = SaplingBuilder::new(prover, dfvk, proofgen_key);

    let o_fvk: [u8; 96] = if has_orchard {
        ledger_get_o_fvk()?.try_into().unwrap()
    } else {
        // dummy o_fvk - we are not going to use it
        let sk = orchard::keys::SpendingKey::from_bytes([0; 32]).unwrap();
        orchard::keys::FullViewingKey::from(&sk).to_bytes()
    };
    let orchard_fvk =
        orchard::keys::FullViewingKey::from_bytes(&o_fvk).ok_or(anyhow!("Invalid Orchard FVK"))?;
    let anchor = orchard::Anchor::from_bytes(tx_plan.orchard_anchor).unwrap();

    let mut orchard_builder = OrchardBuilder::new(&orchard_fvk, anchor);
    if !has_orchard {
        orchard_builder.disable();
    }

    // Derive rseed PRNG
    let mut h = Params::new()
        .hash_length(32)
        .personal(b"ZRSeedPRNG__Hash")
        .to_state();
    h.update(&master_seed);
    let main_rseed = h.finalize();
    let mut rseed_rng = ChaChaRng::from_seed(main_rseed.as_bytes().try_into().unwrap());

    // Derive alpha PRNG
    let mut h = Params::new()
        .hash_length(32)
        .personal(b"ZAlphaPRNG__Hash")
        .to_state();
    h.update(&master_seed);
    let alpha = h.finalize();
    let mut alpha_rng = ChaChaRng::from_seed(alpha.as_bytes().try_into().unwrap());

    // Compute header digest
    let mut h = create_hasher(b"ZTxIdHeadersHash");
    h.update(&hex!("050000800a27a726b4d0d6c200000000"));

    h.write_u32::<LE>(tx_plan.expiry_height)?;
    let header_digest = h.finalize();
    ledger_set_header_digest(header_digest.as_bytes())?;

    for sp in tx_plan.spends.iter() {
        match sp.source {
            Source::Transparent { txid, index } => {
                transparent_builder.add_input(txid, index, sp.amount)?;
            }
            Source::Sapling {
                diversifier,
                rseed,
                ref witness,
                ..
            } => {
                let alpha = Fr::random(&mut alpha_rng);
                // println!("ALPHA {}", hex::encode(&alpha.to_bytes()));

                sapling_builder.add_spend(
                    alpha,
                    diversifier,
                    rseed,
                    witness,
                    sp.amount,
                    &mut rng,
                )?;
            }
            Source::Orchard {
                diversifier,
                rseed,
                rho,
                ref witness,
                ..
            } => {
                orchard_builder.add_spend(diversifier, rseed, rho, &witness, sp.amount)?;
            }
        }
    }
    ledger_set_stage(2)?;

    for output in tx_plan.outputs.iter() {
        if let Destination::Transparent(raw_address) = output.destination {
            transparent_builder.add_output(raw_address, output.amount)?;
        }
    }
    transparent_builder.set_merkle_proof()?;
    ledger_set_stage(3)?;

    for output in tx_plan.outputs.iter() {
        match output.destination {
            Destination::Sapling(raw_address) => {
                let mut rseed = [0u8; 32];
                rseed_rng.fill_bytes(&mut rseed);
                sapling_builder.add_output(
                    rseed,
                    raw_address,
                    &output.memo,
                    output.amount,
                    &mut rng,
                )?;
            }
            Destination::Orchard(raw_address) => {
                orchard_builder.add_output(raw_address, output.amount, &output.memo)?;
            }
            _ => {}
        }
    }
    sapling_builder.set_merkle_proof(tx_plan.net_chg[0])?;
    ledger_set_stage(4)?;

    orchard_builder.prepare(
        tx_plan.net_chg[1],
        proving_key,
        &mut alpha_rng,
        &mut rseed_rng,
    )?;

    ledger_set_stage(5)?;
    let hashes = ledger_confirm_fee()?;

    transparent_builder.sign()?;
    sapling_builder.sign()?;
    orchard_builder.sign()?;

    let transparent_bundle = transparent_builder.build();
    let sapling_bundle = sapling_builder.build()?;
    let orchard_bundle = orchard_builder.build()?;

    let authed_tx: TransactionData<Authorized> = TransactionData {
        version: TxVersion::Zip225,
        consensus_branch_id: BranchId::Nu5,
        lock_time: 0,
        expiry_height: BlockHeight::from_u32(tx_plan.expiry_height),
        transparent_bundle,
        sprout_bundle: None,
        sapling_bundle,
        orchard_bundle,
    };

    let txid_parts = authed_tx.digest(TxIdDigester);
    match txid_parts.sapling_digest {
        Some(h) => {
            if h.as_bytes() != &hashes[0..32] {
                anyhow::bail!("Sapling Hash Mismatch")
            }
        }
        None => (),
    }
    match txid_parts.orchard_digest {
        Some(h) => {
            if h.as_bytes() != &hashes[32..64] {
                anyhow::bail!("Orchard Hash Mismatch")
            }
        }
        None => (),
    }

    let tx = authed_tx.freeze().unwrap();
    let mut raw_tx = vec![];
    tx.write_v5(&mut raw_tx)?;

    ledger_end_tx()?;

    Ok(raw_tx)
}
