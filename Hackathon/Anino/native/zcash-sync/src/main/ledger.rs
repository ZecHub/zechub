use blake2b_simd::Params;
use byteorder::{WriteBytesExt, LE};
use group::{Group, GroupEncoding};
use std::{
    fs::File,
    io::{Read, Write},
    path::Path, env,
};

use halo2_proofs::pasta::pallas::{self};
use orchard::{
    circuit::{Circuit, ProvingKey},
    keys::{Scope, SpendValidatingKey, SpendingKey, SpendAuthorizingKey, FullViewingKey},
    note::{ExtractedNoteCommitment, Nullifier, RandomSeed},
    primitives::redpallas::{Signature, SpendAuth},
    tree::MerklePath,
    value::ValueCommitTrapdoor, Note,
};
use rand::{RngCore, SeedableRng};
use rand_chacha::ChaCha20Rng;
use ripemd::Digest;

use anyhow::Result;
use warp_api_ffi::{connect_lightwalletd, ledger::{
    build_ledger_tx, ledger_add_o_action, ledger_confirm_fee, ledger_init, ledger_init_tx,
    ledger_set_net_orchard, ledger_set_orchard_merkle_proof, ledger_set_stage, ledger_test_math, ledger_get_o_fvk, ledger_get_debug,
}, RawTransaction, TransactionPlan};

use zcash_primitives::{
    consensus::{BlockHeight, BranchId, Network::MainNetwork},
    transaction::{
        sighash::SignableInput, sighash_v5, txid::TxIdDigester, TransactionData, TxVersion,
    },
};
use zcash_proofs::prover::LocalTxProver;

use group::ff::Field;
use nonempty::NonEmpty;

use hex_literal::hex;
use tokio::task::spawn_blocking;
use tonic::Request;
use warp_api_ffi::ledger::{ledger_get_dfvk, ledger_test_cmu};

#[tokio::main]
async fn main() -> Result<()> {
    // let mut buffer = vec![];
    // buffer.write(&hex::decode("90A60A0000000000").unwrap())?;
    // buffer.write(&hex::decode("054F72F9E1288F0C902B5C6F07E8626A64CC9A8792A87DF4024002FBC1AB643C").unwrap())?;
    // buffer.write(&hex::decode("2C12002264ACF11EABD53CC44CC99F45D05EA34C67D16135C3BF6B608167BECD").unwrap())?;
    //
    // ledger_test_cmu(&buffer)?;

    // let a = ledger_test_math(0)?;
    // println!("test {:?}", hex::encode(&a));
    //
    //
    // let fvk = ledger_get_dfvk()?;
    // println!("FVK {:?}", fvk);
    //
    // panic!();
    let data = std::fs::read_to_string("/tmp/tx.json")?;
    let tx_plan: TransactionPlan = serde_json::from_str(&data)?;

    let raw_tx = spawn_blocking(move || {
        let prover = LocalTxProver::with_default_location().unwrap();
        let proving_key = ProvingKey::build();
        let tx = build_ledger_tx(&MainNetwork, &tx_plan, &prover, &proving_key)?;
        Ok::<_, anyhow::Error>(tx)
    }).await??;
    let mut client = connect_lightwalletd("https://lwdv3.zecwallet.co").await?;

    let response = client
        .send_transaction(Request::new(RawTransaction {
            data: raw_tx,
            height: 0,
        }))
        .await?
        .into_inner();
    println!("{}", response.error_message);


    // let mut rng = ChaCha20Rng::from_seed([4u8; 32]);
    // let (_, _, note) = Note::dummy(&mut rng, None);
    // let cmx: ExtractedNoteCommitment = note.commitment().into();
    // println!("cmx {:?}", cmx);

    // let address = note.recipient().to_raw_address_bytes();
    // let value = note.value().inner();
    // let rseed = note.rseed().as_bytes();
    // let rho = note.rho().to_bytes();

    // println!("{}", hex::encode(&address));
    // println!("{} {}", value, hex::encode(value.to_le_bytes()));
    // println!("{}", hex::encode(rseed));
    // println!("{}", hex::encode(&rho));

    // let mut buffer = vec![];
    // buffer.write(&address).unwrap();
    // buffer.write_u64::<LE>(value).unwrap();
    // buffer.write(rseed).unwrap();
    // buffer.write(&rho).unwrap();
    //
    // let cmu = ledger_test_cmu(&buffer).unwrap();
    // println!("cmx {:?}", hex::encode(&cmu));

    Ok(())
}

