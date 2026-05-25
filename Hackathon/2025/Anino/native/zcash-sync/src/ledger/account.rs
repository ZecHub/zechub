use crate::{db::read::get_account_by_address, taddr::derive_from_pubkey, CoinConfig};
use anyhow::Result;
use rusqlite::{params, Connection, OptionalExtension};
use zcash_client_backend::encoding::{encode_extended_full_viewing_key, encode_payment_address};
use zcash_primitives::{consensus::Parameters, zip32::ExtendedFullViewingKey};

use super::transport::*;

pub fn import(coin: u8, name: &str) -> Result<u32> {
    let c = CoinConfig::get(coin);
    let network = c.chain.network();
    ledger_init()?;
    let dfvk = ledger_get_dfvk()?;
    let fvk = ExtendedFullViewingKey::from_diversifiable_full_viewing_key(&dfvk);
    let fvk =
        encode_extended_full_viewing_key(network.hrp_sapling_extended_full_viewing_key(), &fvk);
    let (_, pa) = dfvk.default_address();
    let address = encode_payment_address(network.hrp_sapling_payment_address(), &pa);
    let mut db = c.db()?;
    if let Some(account) = get_account_by_address(&db.connection, &address)? {
        return Ok(account);
    }
    let pub_key = ledger_get_pubkey()?;
    let t_address = derive_from_pubkey(network, &pub_key)?;

    let has_orchard = ledger_has_orchard()?;

    let db_transaction = db.begin_transaction()?;
    db_transaction.execute(
        "INSERT INTO accounts(name, seed, aindex, sk, ivk, address) VALUES 
        (?1, NULL, 0, NULL, ?2, ?3)",
        params![name, fvk, address],
    )?;
    let id_account = db_transaction.last_insert_rowid() as u32;
    db_transaction.execute(
        "INSERT INTO taddrs(account, sk, address) VALUES
        (?1, NULL, ?2)",
        params![id_account, t_address],
    )?;
    if has_orchard {
        let o_fvk = ledger_get_o_fvk()?;
        db_transaction.execute(
            "INSERT INTO orchard_addrs(account, sk, fvk) VALUES
        (?1, NULL, ?2)",
            params![id_account, o_fvk],
        )?;
    }
    db_transaction.execute(
        "INSERT INTO hw_wallets(account, ledger) VALUES
        (?1, 1)",
        [id_account],
    )?;
    db_transaction.commit()?;

    Ok(id_account)
}

pub fn is_external(connection: &Connection, account: u32) -> Result<bool> {
    let res = connection
        .query_row(
            "SELECT ledger FROM hw_wallets WHERE account = ?1",
            [account],
            |row| row.get::<_, bool>(0),
        )
        .optional()?;
    Ok(res.unwrap_or(false))
}
