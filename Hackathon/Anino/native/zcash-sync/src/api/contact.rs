//! Contact Address book

use crate::api::payment_v2::build_tx_plan;
use crate::api::recipient::RecipientMemo;
use crate::api::sync::get_latest_height;
use crate::coinconfig::CoinConfig;
use crate::contact::{serialize_contacts, Contact};
use crate::db::data_generated::fb::FeeT;
use crate::{get_ua_of, TransactionPlan};
use zcash_primitives::memo::Memo;

const CONTACT_AMOUNT: u64 = 10_000;

/// Store contact in the database
/// # Arguments
/// * `id`: contact id
/// * `name`: contact name
/// * `address`: contact address
/// * `dirty`: true if the database hasn't been saved to the blockchain yet
pub fn store_contact(
    coin: u8,
    id: u32,
    name: &str,
    address: &str,
    dirty: bool,
) -> anyhow::Result<()> {
    let c = CoinConfig::get(coin);
    let contact = Contact { id, name: name.to_string(), address: address.to_string() };
    c.db()?.store_contact(&contact, dirty)?;
    Ok(())
}

/// Save the new/modified contacts to the blockchain
/// # Arguments
/// * `anchor_offset`: minimum confirmations required for note selection
pub async fn commit_unsaved_contacts(
    coin: u8,
    account: u32,
    pools: u8,
    anchor_offset: u32,
    fee: &FeeT,
) -> anyhow::Result<TransactionPlan> {
    let c = CoinConfig::get(coin);
    let contacts = c.db()?.get_unsaved_contacts()?;
    let memos = serialize_contacts(&contacts)?;
    let tx_plan = save_contacts_tx(coin, account, &memos, pools, anchor_offset, fee).await?;
    Ok(tx_plan)
}

async fn save_contacts_tx(
    coin: u8,
    account: u32,
    memos: &[Memo],
    pools: u8,
    anchor_offset: u32,
    fee: &FeeT,
) -> anyhow::Result<TransactionPlan> {
    let c = CoinConfig::get(coin);
    let last_height = get_latest_height(coin).await?;
    let address = get_ua_of(c.chain.network(), &c.connection(), account, pools)?;
    let recipients: Vec<_> = memos
        .iter()
        .map(|m| RecipientMemo {
            address: address.clone(),
            amount: CONTACT_AMOUNT,
            fee_included: false,
            memo: m.clone(),
            max_amount_per_note: 0,
        })
        .collect();

    let tx_plan = build_tx_plan(
        coin,
        account,
        last_height,
        &recipients,
        1,
        anchor_offset,
        fee,
    )
    .await?;
    Ok(tx_plan)
}
