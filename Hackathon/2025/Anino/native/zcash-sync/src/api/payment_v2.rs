use crate::api::account::get_unified_address;
use crate::api::recipient::RecipientMemo;
use crate::api::sync::get_latest_height;
pub use crate::broadcast_tx;
use crate::chain::{get_checkpoint_height, EXPIRY_HEIGHT_OFFSET};
use crate::db::data_generated::fb::FeeT;
use crate::note_selection::{Order, UTXO};
use crate::{
    build_tx, fetch_utxos, get_secret_keys, note_selection, AccountData, CoinConfig,
    TransactionBuilderConfig, TransactionBuilderError, TransactionPlan, TxBuilderContext,
};
use rand::rngs::OsRng;
use std::cmp::min;
use std::slice;
use std::str::FromStr;
use zcash_client_backend::encoding::decode_extended_full_viewing_key;
use zcash_primitives::consensus::Parameters;
use zcash_primitives::memo::{Memo, MemoBytes};
use zcash_primitives::transaction::builder::Progress;

#[allow(dead_code)]
type PaymentProgressCallback = Box<dyn Fn(Progress) + Send + Sync>;

pub async fn build_tx_plan_with_utxos(
    coin: u8,
    account: u32,
    checkpoint_height: u32,
    expiry_height: u32,
    recipients: &[RecipientMemo],
    utxos: &[UTXO],
    fee: &FeeT,
) -> note_selection::Result<TransactionPlan> {
    let c = CoinConfig::get(coin);
    let network = c.chain.network();

    let mut recipient_fee = false;
    for r in recipients {
        if r.fee_included {
            if recipient_fee {
                return Err(TransactionBuilderError::DuplicateRecipientFee);
            }
            recipient_fee = true;
        }
    }

    let (fvk, taddr, orchard_fvk) = {
        let db = c.db()?;
        let AccountData { fvk, .. } = db.get_account_info(account)?;
        let taddr = db.get_taddr(account)?.unwrap_or_default();
        let orchard_fvk = db
            .get_orchard(account)?
            .map(|o| hex::encode(&o.fvk))
            .unwrap_or_default();
        (fvk, taddr, orchard_fvk)
    };
    let change_address = get_unified_address(coin, account, 7)?;
    let context = TxBuilderContext::from_height(coin, checkpoint_height)?;

    let mut orders = vec![];
    let mut id_order = 0;
    for r in recipients {
        let mut amount = r.amount;
        let max_amount_per_note = if r.max_amount_per_note == 0 {
            u64::MAX
        } else {
            r.max_amount_per_note
        };
        loop {
            let a = min(amount, max_amount_per_note);
            let memo_bytes: MemoBytes = r.memo.clone().into();
            let order = Order::new(network, id_order, &r.address, a, false, memo_bytes);
            orders.push(order);
            amount -= a;
            id_order += 1;
            if amount == 0 {
                break;
            } // at least one note even when amount = 0
        }
        orders.last_mut().unwrap().take_fee = r.fee_included;
    }

    let config = TransactionBuilderConfig::new(&change_address);
    let fee = note_selection::FeeRule::from_rule(fee);
    let tx_plan = note_selection::build_tx_plan(
        network,
        &fvk,
        &taddr,
        &orchard_fvk,
        checkpoint_height,
        expiry_height,
        &context.orchard_anchor,
        &utxos,
        &orders,
        &config,
        &fee,
    )?;
    Ok(tx_plan)
}

pub async fn build_tx_plan(
    coin: u8,
    account: u32,
    last_height: u32,
    recipients: &[RecipientMemo],
    excluded_flags: u8,
    confirmations: u32,
    fee_rule: &FeeT,
) -> note_selection::Result<TransactionPlan> {
    let checkpoint_height = {
        let c = CoinConfig::get(coin);
        let db = c.db()?;
        let checkpoint_height = get_checkpoint_height(&db, last_height, confirmations)?;
        checkpoint_height
    };
    let expiry_height = get_latest_height(coin).await? + EXPIRY_HEIGHT_OFFSET;
    let utxos = fetch_utxos(coin, account, checkpoint_height, excluded_flags).await?;
    let tx_plan = build_tx_plan_with_utxos(
        coin,
        account,
        checkpoint_height,
        expiry_height,
        recipients,
        &utxos,
        fee_rule,
    )
    .await?;
    Ok(tx_plan)
}

pub fn sign_plan(coin: u8, account: u32, tx_plan: &TransactionPlan) -> anyhow::Result<Vec<u8>> {
    let c = CoinConfig::get(coin);
    let network = c.chain.network();
    let fvk = {
        let db = c.db()?;
        let AccountData { fvk, .. } = db.get_account_info(account)?;
        fvk
    };
    let fvk =
        decode_extended_full_viewing_key(network.hrp_sapling_extended_full_viewing_key(), &fvk)
            .unwrap()
            .to_diversifiable_full_viewing_key();
    let tx_plan_fvk = decode_extended_full_viewing_key(
        network.hrp_sapling_extended_full_viewing_key(),
        &tx_plan.fvk,
    )
    .unwrap()
    .to_diversifiable_full_viewing_key();

    if fvk.to_bytes() != tx_plan_fvk.to_bytes() {
        return Err(anyhow::anyhow!("Account does not match transaction"));
    }

    let keys = get_secret_keys(coin, account)?;
    let tx = build_tx(c.chain.network(), &keys, &tx_plan, OsRng)?;
    Ok(tx)
}

pub async fn sign_and_broadcast(
    coin: u8,
    account: u32,
    tx_plan: &TransactionPlan,
) -> anyhow::Result<String> {
    let tx = sign_plan(coin, account, tx_plan)?;
    let txid = broadcast_tx(coin, &tx).await?;
    let id_notes: Vec<_> = tx_plan
        .spends
        .iter()
        .filter_map(|n| if n.id != 0 { Some(n.id) } else { None })
        .collect();
    mark_spent(coin, &id_notes)?;
    Ok(txid)
}

pub async fn transfer_pools(
    coin: u8,
    account: u32,
    from_pool: u8,
    to_pool: u8,
    amount: u64,
    fee_included: bool,
    memo: &str,
    split_amount: u64,
    confirmations: u32,
    fee: &FeeT,
) -> anyhow::Result<TransactionPlan> {
    let address = get_unified_address(coin, account, to_pool)?; // get our own unified address
    let recipient = RecipientMemo {
        address,
        amount,
        fee_included,
        memo: Memo::from_str(memo)?,
        max_amount_per_note: split_amount,
    };
    let last_height = get_latest_height(coin).await?;
    let tx_plan = build_tx_plan(
        coin,
        account,
        last_height,
        slice::from_ref(&recipient),
        !from_pool,
        confirmations,
        fee,
    )
    .await?;
    Ok(tx_plan)
}

/// Make a transaction that shields the transparent balance
// pub async fn shield_taddr(
//     coin: u8,
//     account: u32,
//     amount: u64,
//     confirmations: u32,
//     fee: &FeeT,
//     z_factor: u32,
// ) -> anyhow::Result<TransactionPlan> {
//     let tx_plan = transfer_pools(
//         coin,
//         account,
//         1,
//         6,
//         amount,
//         true,
//         "Shield Transparent Balance",
//         0,
//         confirmations,
//         fee,
//         z_factor,
//     )
//     .await?;
//     Ok(tx_plan)
// }

fn mark_spent(coin: u8, ids: &[u32]) -> anyhow::Result<()> {
    let c = CoinConfig::get(coin);
    let mut db = c.db()?;
    db.tx_mark_spend(ids)?;
    Ok(())
}
