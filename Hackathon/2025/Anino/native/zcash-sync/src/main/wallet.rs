use anyhow::Result;
use std::fs::File;
use std::io::{BufRead, BufReader};
use zcash_client_backend::encoding::encode_extended_spending_key;
use zcash_primitives::consensus::Network::MainNetwork;
use zcash_primitives::consensus::Parameters;
use zcash_primitives::zip32::ExtendedSpendingKey;

fn main() -> Result<()> {
    env_logger::init();
    dotenv::dotenv()?;
    let wallet_dump_path = dotenv::var("WALLET_DUMP_PATH")?;
    let file = File::open(&wallet_dump_path)?;
    let reader = BufReader::new(file);
    let mut started = false;
    let mut key = String::new();
    let mut next_line_is_key = true;
    for (_i, line) in reader.lines().enumerate() {
        let ln = line?.trim_start().to_string();
        if ln == "HEADER=END" {
            started = true;
            next_line_is_key = true;
            continue;
        } // skip header
        if !started {
            continue;
        }
        if ln == "DATA=END" {
            break;
        } // stop at data end
        if next_line_is_key {
            let k = hex::decode(ln).unwrap();
            let len = k[0] as usize;
            key = String::from_utf8_lossy(&k[1..=len]).to_string(); // collect key name
        } else {
            let value = ln;
            if key == "sapzkey" {
                let sapkey = hex::decode(value).unwrap(); // export secret key
                let s = ExtendedSpendingKey::read(&*sapkey).unwrap();
                println!(
                    "{}",
                    encode_extended_spending_key(
                        MainNetwork.hrp_sapling_extended_spending_key(),
                        &s
                    )
                );
            }
        }
        next_line_is_key = !next_line_is_key;
    }

    Ok(())
}
