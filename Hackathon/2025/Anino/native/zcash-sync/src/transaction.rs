use crate::api::recipient::decode_memo;
use crate::coin::get_branch;
use crate::contact::{is_address_like, Contact, ContactDecoder};
use crate::db::data_generated::fb::MemoT;
use crate::unified::orchard_as_unified;
use crate::{AccountData, CoinConfig, CompactTxStreamerClient, DbAdapter, Hash, TxFilter};
use orchard::keys::{FullViewingKey, IncomingViewingKey, OutgoingViewingKey, Scope};
use orchard::note_encryption::OrchardDomain;
use serde::Serialize;
use std::collections::HashMap;
use std::convert::TryFrom;
use tonic::transport::Channel;
use tonic::Request;
use zcash_client_backend::encoding::{
    decode_extended_full_viewing_key, encode_payment_address, encode_transparent_address,
};
use zcash_note_encryption::{try_note_decryption, try_output_recovery_with_ovk};
use zcash_primitives::consensus::{BlockHeight, Network, Parameters};
use zcash_primitives::memo::{Memo, MemoBytes};
use zcash_primitives::sapling::note_encryption::{
    try_sapling_note_decryption, try_sapling_output_recovery, PreparedIncomingViewingKey,
};
use zcash_primitives::sapling::SaplingIvk;
use zcash_primitives::transaction::Transaction;

#[derive(Debug)]
pub struct ContactRef {
    pub height: u32,
    pub index: u32,
    pub contact: Contact,
}

pub async fn get_transaction_details(coin: u8) -> anyhow::Result<()> {
    let c = CoinConfig::get(coin);
    let network = c.chain.network();
    let mut client = c.connect_lwd().await?;
    let mut keys = HashMap::new();

    let reqs = {
        let db = c.db()?;
        let reqs = db.get_txid_without_memo()?;
        for req in reqs.iter() {
            if !keys.contains_key(&req.account) {
                let decryption_keys = get_decryption_keys(network, req.account, &db)?;
                keys.insert(req.account, decryption_keys);
            }
        }
        reqs
        // Make sure we don't hold a mutex across await
    };

    let mut details = vec![];
    for req in reqs.iter() {
        let tx_details = retrieve_tx_info(network, &mut client, req, &keys[&req.account]).await?;
        log::info!("{:?}", tx_details);
        details.push(tx_details);
    }

    let db = c.db()?;
    for tx_details in details.iter() {
        db.update_transaction_with_memo(tx_details)?;
        for c in tx_details.contacts.iter() {
            // Skip only for automatically decoded contacts; manual adds remain allowed via API
            if is_address_like(&c.name) { continue; }
            db.store_contact(c, false)?;
        }
        let z_msg = decode_memo(
            tx_details.id_tx,
            &tx_details.memo,
            &tx_details.address,
            tx_details.timestamp,
            tx_details.height,
            tx_details.incoming,
        );
        if !z_msg.is_empty() {
            db.store_message(tx_details.account, &z_msg)?;
        }
    }

    Ok(())
}

async fn fetch_raw_transaction(
    network: &Network,
    client: &mut CompactTxStreamerClient<Channel>,
    height: u32,
    txid: &Hash,
) -> anyhow::Result<Transaction> {
    let consensus_branch_id = get_branch(network, height);
    let tx_filter = TxFilter {
        block: None,
        index: 0,
        hash: txid.to_vec(), // only hash is supported
    };
    let raw_tx = client
        .get_transaction(Request::new(tx_filter))
        .await?
        .into_inner();
    let tx = Transaction::read(&*raw_tx.data, consensus_branch_id)?;
    Ok(tx)
}

#[derive(Clone)]
pub struct DecryptionKeys {
    sapling_keys: (SaplingIvk, zcash_primitives::keys::OutgoingViewingKey),
    orchard_keys: Option<(IncomingViewingKey, OutgoingViewingKey)>,
}

fn get_memo_text(m: &Memo) -> Option<String> {
    match m {
        Memo::Empty => Some(String::new()),
        Memo::Future(_) => Some(String::new()),
        Memo::Arbitrary(_) => Some(String::new()),
        Memo::Text(t) => Some(t.to_string()),
    }
}

pub fn decode_transaction(
    network: &Network,
    account: u32,
    height: u32,
    timestamp: u32,
    id_tx: u32,
    tx: Transaction,
    _incoming: bool,
    decryption_keys: &DecryptionKeys,
) -> anyhow::Result<TransactionDetails> {
    let (sapling_ivk, sapling_ovk) = decryption_keys.sapling_keys.clone();

    let block_height = BlockHeight::from_u32(height);

    let tx = tx.into_data();

    let mut contacts = vec![];
    let mut memos = vec![];

    // memos are decrypted if we have the ivk or ovk
    // ivk implies the output is incoming
    // ovk implies the output is outgoing
    // an output can be both incoming & outgoing. It means the funds
    // are going back into our account, i.e. it is a change output
    // or a self-transfer

    if let Some(sapling_bundle) = tx.sapling_bundle() {
        let mut contact_decoder = ContactDecoder::new(sapling_bundle.shielded_outputs.len());
        for output in sapling_bundle.shielded_outputs.iter() {
            let pivk = PreparedIncomingViewingKey::new(&sapling_ivk);
            let mut opt_memo = None;

            // Try decoding with the ivk
            if let Some((_note, pa, memo)) =
                try_sapling_note_decryption(network, block_height, &pivk, output)
            {
                let address = encode_payment_address(network.hrp_sapling_payment_address(), &pa);
                if let Ok(memo) = Memo::try_from(memo) {
                    if let Some(txt) = get_memo_text(&memo) {
                        opt_memo
                            .get_or_insert(MemoT {
                                direction: 0,
                                address: Some(address),
                                memo: Some(txt),
                            })
                            .direction |= 1;
                    }
                }
            }

            // Try decoding with the ovk
            if let Some((_note, pa, memo, ..)) =
                try_sapling_output_recovery(network, block_height, &sapling_ovk, output)
            {
                let address = encode_payment_address(network.hrp_sapling_payment_address(), &pa);
                // contacts are decoded with our OVK, this makes sure that we
                // created it
                let _ = contact_decoder.add_memo(&memo); // ignore memo that is not for contacts, if we cannot decode it with ovk, we didn't create this memo
                if let Ok(memo) = Memo::try_from(memo) {
                    if let Some(txt) = get_memo_text(&memo) {
                        opt_memo
                            .get_or_insert(MemoT {
                                direction: 0,
                                address: Some(address),
                                memo: Some(txt),
                            })
                            .direction |= 2;
                        // the previous line stores the memo or
                        // updates its direction
                        // whether the memo is decoded via ivk or ovk
                        // does not matter. The value is the same in
                        // both cases
                    }
                }
            }

            if let Some(memo) = opt_memo {
                memos.push(memo);
            }
        }
        contacts.extend(contact_decoder.finalize()?.into_iter());
    }

    if let Some(orchard_bundle) = tx.orchard_bundle() {
        let mut contact_decoder = ContactDecoder::new(orchard_bundle.actions().len());
        if let Some((orchard_ivk, orchard_ovk)) = decryption_keys.orchard_keys.clone() {
            let poivk = orchard::keys::PreparedIncomingViewingKey::new(&orchard_ivk);
            for action in orchard_bundle.actions().iter() {
                let domain = OrchardDomain::for_action(action);
                let mut opt_memo = None;

                if let Some((_note, pa, memo)) = try_note_decryption(&domain, &poivk, action) {
                    let address = orchard_as_unified(network, &pa);
                    if let Ok(memo) = Memo::try_from(MemoBytes::from_bytes(&memo)?) {
                        if let Some(txt) = get_memo_text(&memo) {
                            opt_memo
                                .get_or_insert(MemoT {
                                    direction: 0,
                                    address: Some(address),
                                    memo: Some(txt),
                                })
                                .direction |= 1;
                        }
                    }
                }
                if let Some((_note, pa, memo, ..)) = try_output_recovery_with_ovk(
                    &domain,
                    &orchard_ovk,
                    action,
                    action.cv_net(),
                    &action.encrypted_note().out_ciphertext,
                ) {
                    let address = orchard_as_unified(network, &pa);
                    let memo_bytes = MemoBytes::from_bytes(&memo)?;
                    let _ = contact_decoder.add_memo(&memo_bytes); // ignore memo that is not for contacts, if we cannot decode it with ovk, we didn't make create this memo
                    if let Ok(memo) = Memo::try_from(memo_bytes) {
                        if let Some(txt) = get_memo_text(&memo) {
                            opt_memo
                                .get_or_insert(MemoT {
                                    direction: 0,
                                    address: Some(address),
                                    memo: Some(txt),
                                })
                                .direction |= 2;
                        }
                    }
                }

                if let Some(memo) = opt_memo {
                    memos.push(memo);
                }
            }
        }
        contacts.extend(&mut contact_decoder.finalize()?.into_iter());
    }

    // We have collected the text memos (empty or not)
    // If there is at least one, then use the last one as the primary
    // memo, i.e. the one that goes into the tx object
    // Sort memos by length and
    // put the change in front
    // Note that a self transfer output without memo looks like change
    // and we need to pick it if there is nothing else
    memos.sort_by_key(|m| {
        let len = m.memo.as_ref().unwrap().len();
        if len == 0 && m.direction == 3 {
            // no memo, change
            -1i32
        } else {
            len as i32
        }
    });
    let mut tx_memo = memos.pop();

    // If there is no memos, it is t2t or z2t
    // Use the output taddr. Not a great solution but better than nothing
    if tx_memo.is_none() {
        if let Some(transparent_bundle) = tx.transparent_bundle() {
            for output in transparent_bundle.vout.iter() {
                if let Some(taddr) = output.recipient_address() {
                    tx_memo = Some(MemoT {
                        address: Some(encode_transparent_address(
                            &network.b58_pubkey_address_prefix(),
                            &network.b58_script_address_prefix(),
                            &taddr,
                        )),
                        direction: 2, // outgoing
                        memo: Some(String::new()),
                    });
                }
            }
        }
    }

    let memo = tx_memo.unwrap_or_else(|| MemoT {
        direction: 0,
        address: Some(String::new()),
        memo: Some(String::new()),
    });
    let memos = memos
        .into_iter()
        .filter(|m| !m.memo.as_ref().unwrap().is_empty())
        .collect();
    let tx_details = TransactionDetails {
        account,
        id_tx,
        height,
        timestamp,
        address: memo.address.unwrap(),
        memo: memo.memo.unwrap(),
        incoming: (memo.direction & 1) != 0,
        contacts,
        memos,
    };

    Ok(tx_details)
}

fn get_decryption_keys(
    network: &Network,
    account: u32,
    db: &DbAdapter,
) -> anyhow::Result<DecryptionKeys> {
    let AccountData { fvk, .. } = db.get_account_info(account)?;
    let fvk =
        decode_extended_full_viewing_key(network.hrp_sapling_extended_full_viewing_key(), &fvk)
            .unwrap();
    let (sapling_ivk, sapling_ovk) = (fvk.fvk.vk.ivk(), fvk.fvk.ovk);

    let okey = db.get_orchard(account)?;
    let okey = okey.map(|okey| {
        let fvk = FullViewingKey::from_bytes(&okey.fvk).unwrap();
        (fvk.to_ivk(Scope::External), fvk.to_ovk(Scope::External))
    });
    let decryption_keys = DecryptionKeys {
        sapling_keys: (sapling_ivk, sapling_ovk),
        orchard_keys: okey,
    };
    Ok(decryption_keys)
}

pub async fn retrieve_tx_info(
    network: &Network,
    client: &mut CompactTxStreamerClient<Channel>,
    req: &GetTransactionDetailRequest,
    decryption_keys: &DecryptionKeys,
) -> anyhow::Result<TransactionDetails> {
    let transaction = fetch_raw_transaction(network, client, req.height, &req.txid).await?;
    let tx_details = decode_transaction(
        network,
        req.account,
        req.height,
        req.timestamp,
        req.id_tx,
        transaction,
        req.value >= 0,
        &decryption_keys,
    )?;

    Ok(tx_details)
}

pub struct GetTransactionDetailRequest {
    pub account: u32,
    pub height: u32,
    pub timestamp: u32,
    pub id_tx: u32,
    pub txid: Hash,
    pub value: i64,
}

#[derive(Debug)]
pub struct TransactionDetails {
    pub account: u32,
    pub id_tx: u32,
    pub height: u32,
    pub timestamp: u32,
    pub address: String,
    pub memo: String,
    pub incoming: bool,
    pub contacts: Vec<Contact>,
    pub memos: Vec<MemoT>,
}

#[tokio::test]
async fn test_get_transaction_details() {
    crate::init_test();

    get_transaction_details(0).await.unwrap();
}
