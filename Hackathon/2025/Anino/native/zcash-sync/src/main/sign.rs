use clap::{Arg, Command};
use std::fs::File;
use std::io::{Read, Write};
use std::str::FromStr;
use sync::{KeyHelpers, Tx};
use zcash_client_backend::encoding::decode_extended_spending_key;
use zcash_params::coin::CoinType;
use zcash_primitives::consensus::{Network, Parameters};
use zcash_proofs::prover::LocalTxProver;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let matches = Command::new("Cold wallet Signer CLI")
        .version("1.0")
        .arg(Arg::new("coin").short('c').long("coin").takes_value(true))
        .arg(
            Arg::new("tx_filename")
                .short('t')
                .long("tx")
                .takes_value(true),
        )
        .arg(
            Arg::new("out_filename")
                .short('o')
                .long("out")
                .takes_value(true),
        )
        .get_matches();

    let coin = matches.value_of("coin").expect("coin argument missing");
    let tx_filename = matches
        .value_of("tx_filename")
        .expect("input filename missing");
    let out_filename = matches
        .value_of("out_filename")
        .expect("output filename missing");

    let (coin_type, network) = match coin {
        "zcash" => (CoinType::Zcash, Network::MainNetwork),
        "ycash" => (CoinType::Ycash, Network::YCashMainNetwork),
        _ => panic!("Invalid coin"),
    };
    let key = dotenv::var("KEY").unwrap();
    let index = u32::from_str(&dotenv::var("INDEX").unwrap_or_else(|_| "0".to_string())).unwrap();
    let kh = KeyHelpers::new(coin_type);
    let (_seed, sk, _ivk, _address) = kh.decode_key(&key, index)?;

    let sk = sk.unwrap();
    let sk =
        decode_extended_spending_key(network.hrp_sapling_extended_spending_key(), &sk)?.unwrap();

    let mut file = File::open(tx_filename)?;
    let mut s = String::new();
    file.read_to_string(&mut s).unwrap();
    let tx: Tx = serde_json::from_str(&s)?;
    let prover = LocalTxProver::with_default_location()
        .ok_or_else(|| anyhow::anyhow!("Cannot create prover. Missing zcash-params?"))?;
    let raw_tx = tx.sign(None, &sk, &prover, |p| {
        println!("Progress {}", p.cur());
    })?;

    let mut out_file = File::create(out_filename)?;
    writeln!(out_file, "{}", hex::encode(&raw_tx))?;
    Ok(())
}
