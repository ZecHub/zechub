use crate::note_selection::types::Source;
use crate::note_selection::UTXO;
use crate::CoinConfig;

pub async fn fetch_utxos(
    coin: u8,
    account: u32,
    checkpoint_height: u32,
    excluded_flags: u8,
) -> anyhow::Result<Vec<UTXO>> {
    let mut utxos = vec![];
    if excluded_flags & 1 == 0 {
        utxos.extend(get_transparent_utxos(coin, account).await?);
    }
    let coin = CoinConfig::get(coin);
    let db = coin.db()?;
    if excluded_flags & 2 == 0 {
        utxos.extend(db.get_unspent_received_notes(account, checkpoint_height, false)?);
    }
    if excluded_flags & 4 == 0 {
        utxos.extend(db.get_unspent_received_notes(account, checkpoint_height, true)?);
    }
    Ok(utxos)
}

async fn get_transparent_utxos(coin: u8, account: u32) -> anyhow::Result<Vec<UTXO>> {
    let coin = CoinConfig::get(coin);
    let taddr = {
        let db = coin.db()?;
        db.get_taddr(account)?
    };
    if let Some(taddr) = taddr {
        let mut client = coin.connect_lwd().await?;
        let utxos = crate::taddr::get_utxos(&mut client, &taddr).await?;
        let utxos: Vec<_> = utxos
            .iter()
            .map(|utxo| {
                let source = Source::Transparent {
                    txid: utxo.txid.clone().try_into().unwrap(),
                    index: utxo.index as u32,
                };
                UTXO {
                    id: 0,
                    source,
                    amount: utxo.value_zat as u64,
                    key: None,
                }
            })
            .collect();
        Ok(utxos)
    } else {
        Ok(vec![])
    }
}
