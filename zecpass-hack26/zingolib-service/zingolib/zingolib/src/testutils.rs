//! Zingo-Testutils
//! Holds functionality for zingo testing

#![warn(missing_docs)]

use std::num::NonZeroU32;
use std::{io::Read, string::String, time::Duration};

use pepper_sync::config::{PerformanceLevel, SyncConfig, TransparentAddressDiscovery};
use pepper_sync::keys::decode_address;
use zcash_address::unified::Fvk;
use zcash_keys::address::UnifiedAddress;
use zcash_keys::encoding::AddressCodec;
use zcash_protocol::consensus::NetworkConstants;
use zcash_protocol::{PoolType, ShieldedProtocol, consensus};

use crate::lightclient::LightClient;
use crate::lightclient::error::LightClientError;
use crate::wallet::WalletSettings;
use crate::wallet::keys::unified::UnifiedKeyStore;
use crate::wallet::output::SpendStatus;
use crate::wallet::summary::data::{
    BasicCoinSummary, BasicNoteSummary, OutgoingNoteSummary, TransactionSummary,
};

pub mod assertions;
pub mod chain_generics;
pub mod fee_tables;
pub mod lightclient;
pub mod macros;
pub mod paths;

// Re-export test dependencies for convenience
pub use portpicker;
pub use tempfile;

/// Default wallet settings for testing
pub fn default_test_wallet_settings() -> WalletSettings {
    WalletSettings {
        sync_config: SyncConfig {
            transparent_address_discovery: TransparentAddressDiscovery::minimal(),
            performance_level: PerformanceLevel::High,
        },
        min_confirmations: NonZeroU32::try_from(1).expect("hard-coded non-zero integer"),
    }
}

/// TODO: Add Doc Comment Here!
#[must_use]
pub fn build_fvks_from_unified_keystore(unified_keystore: &UnifiedKeyStore) -> [Fvk; 3] {
    let orchard_vk: orchard::keys::FullViewingKey = unified_keystore.try_into().unwrap();
    let sapling_vk: sapling_crypto::zip32::DiversifiableFullViewingKey =
        unified_keystore.try_into().unwrap();
    let transparent_vk: zcash_transparent::keys::AccountPubKey =
        unified_keystore.try_into().unwrap();

    let mut transparent_vk_bytes = [0u8; 65];
    transparent_vk_bytes.copy_from_slice(&transparent_vk.serialize());

    [
        Fvk::Orchard(orchard_vk.to_bytes()),
        Fvk::Sapling(sapling_vk.to_bytes()),
        Fvk::P2pkh(transparent_vk_bytes),
    ]
}

/// TODO: doc comment
pub async fn assert_transaction_summary_exists(
    lightclient: &LightClient,
    expected: &TransactionSummary,
) {
    assert!(
        check_transaction_summary_exists(lightclient, expected).await,
        "wallet summaries: {}\n\n\nexpected: {}\n\n\n",
        lightclient.transaction_summaries(false).await.unwrap(),
        expected,
    );
}

/// TODO: doc comment
pub async fn check_transaction_summary_exists(
    lightclient: &LightClient,
    transaction_summary: &TransactionSummary,
) -> bool {
    lightclient
        .transaction_summaries(false)
        .await
        .unwrap()
        .iter()
        .any(|wallet_summary| {
            check_transaction_summary_equality(wallet_summary, transaction_summary)
        })
}

/// TODO: doc comment
pub fn assert_transaction_summary_equality(
    observed: &TransactionSummary,
    expected: &TransactionSummary,
) {
    assert!(
        check_transaction_summary_equality(observed, expected),
        "observed: {observed}\n\n\nexpected: {expected}\n\n\n",
    );
}

/// Transaction creation involves using a nonce, which means a non-deterministic txid.
/// Datetime is also based on time of run.
/// Check all the other fields
///   TODO:  seed random numbers in tests deterministically
#[must_use]
pub fn check_transaction_summary_equality(
    first: &TransactionSummary,
    second: &TransactionSummary,
) -> bool {
    first.status == second.status
        && first.blockheight == second.blockheight
        && first.kind == second.kind
        && first.value == second.value
        && first.fee == second.fee
        && first.zec_price == second.zec_price
        && check_note_summary_equality(&first.orchard_notes, &second.orchard_notes)
        && check_note_summary_equality(&first.sapling_notes, &second.sapling_notes)
        && check_transparent_coin_summary_equality(
            &first.transparent_coins,
            &second.transparent_coins,
        )
        && check_outgoing_note_summary_equality(
            &first.outgoing_orchard_notes,
            &second.outgoing_orchard_notes,
        )
        && check_outgoing_note_summary_equality(
            &first.outgoing_sapling_notes,
            &second.outgoing_sapling_notes,
        )
}

fn check_note_summary_equality(first: &[BasicNoteSummary], second: &[BasicNoteSummary]) -> bool {
    if first.len() != second.len() {
        return false;
    }
    for i in 0..first.len() {
        if !(first[i].value == second[i].value
            && check_spend_status_equality(first[i].spend_status, second[i].spend_status)
            && first[i].memo == second[i].memo)
        {
            return false;
        }
    }
    true
}

fn check_outgoing_note_summary_equality(
    first: &[OutgoingNoteSummary],
    second: &[OutgoingNoteSummary],
) -> bool {
    if first.len() != second.len() {
        return false;
    }
    for i in 0..first.len() {
        if !(first[i].value == second[i].value
            && first[i].memo == second[i].memo
            && first[i].recipient == second[i].recipient
            && first[i].recipient_unified_address == second[i].recipient_unified_address)
            && first[i].account_id == second[i].account_id
            && first[i].scope == second[i].scope
        {
            return false;
        }
    }
    true
}

/// TODO: doc comment
fn check_transparent_coin_summary_equality(
    first: &[BasicCoinSummary],
    second: &[BasicCoinSummary],
) -> bool {
    if first.len() != second.len() {
        return false;
    }
    for i in 0..first.len() {
        if !(first[i].value == second[i].value
            && check_spend_status_equality(first[i].spend_summary, second[i].spend_summary))
        {
            return false;
        }
    }
    true
}

fn check_spend_status_equality(first: SpendStatus, second: SpendStatus) -> bool {
    matches!(
        (first, second),
        (SpendStatus::Unspent, SpendStatus::Unspent)
            | (SpendStatus::Spent(_), SpendStatus::Spent(_))
            | (
                SpendStatus::TransmittedSpent(_),
                SpendStatus::TransmittedSpent(_)
            )
            | (SpendStatus::MempoolSpent(_), SpendStatus::MempoolSpent(_))
    )
}

/// Will hang if chain does not reach `target_block_height`
pub async fn sync_to_target_height(
    client: &mut LightClient,
    target_block_height: u32,
) -> Result<(), LightClientError> {
    // sync first so ranges exist for the `fully_scanned_height` call
    client.sync_and_await().await?;
    while u32::from(
        client
            .wallet()
            .read()
            .await
            .sync_state
            .fully_scanned_height()
            .unwrap(),
    ) < target_block_height
    {
        tokio::time::sleep(Duration::from_millis(500)).await;
        client.sync_and_await().await?;
    }
    Ok(())
}

/// TODO: Add Doc Comment Here!
pub struct RecordingReader<Reader> {
    from: Reader,
    read_lengths: Vec<usize>,
}
impl<T> Read for RecordingReader<T>
where
    T: Read,
{
    fn read(&mut self, buf: &mut [u8]) -> std::io::Result<usize> {
        let for_info = self.from.read(buf)?;
        log::info!("{for_info:?}");
        self.read_lengths.push(for_info);
        Ok(for_info)
    }
}

/// Number of notes created and consumed in a transaction.
#[derive(Debug)]
pub struct TxNotesCount {
    /// Transparent notes in transaction.
    pub transparent_tx_notes: usize,
    /// Sapling notes in transaction.
    pub sapling_tx_notes: usize,
    /// Orchard notes in transaction.
    pub orchard_tx_notes: usize,
}

/// Number of logical actions in a transaction
#[derive(Debug)]
pub struct TxActionsCount {
    /// Transparent actions in transaction
    pub transparent_tx_actions: usize,
    /// Sapling actions in transaction
    pub sapling_tx_actions: usize,
    /// Orchard notes in transaction
    pub orchard_tx_actions: usize,
}

// FIXME: zingo2 rewrite with wallet data or note summaries
// /// Returns number of notes used as inputs for txid as TxNotesCount (transparent_notes, sapling_notes, orchard_notes).
// pub async fn tx_inputs(client: &LightClient, txid: &str) -> TxNotesCount {
//     let notes = client.do_list_notes(true).await;

//     let mut transparent_notes = 0;
//     let mut sapling_notes = 0;
//     let mut orchard_notes = 0;

//     if let JsonValue::Array(spent_utxos) = &notes["spent_utxos"] {
//         for utxo in spent_utxos {
//             if utxo["spent"] == txid || utxo["pending_spent"] == txid {
//                 transparent_notes += 1;
//             }
//         }
//     }
//     if let JsonValue::Array(pending_utxos) = &notes["pending_utxos"] {
//         for utxo in pending_utxos {
//             if utxo["spent"] == txid || utxo["pending_spent"] == txid {
//                 transparent_notes += 1;
//             }
//         }
//     }

//     if let JsonValue::Array(spent_sapling_notes) = &notes["spent_sapling_notes"] {
//         for note in spent_sapling_notes {
//             if note["spent"] == txid || note["pending_spent"] == txid {
//                 sapling_notes += 1;
//             }
//         }
//     }
//     if let JsonValue::Array(pending_sapling_notes) = &notes["pending_sapling_notes"] {
//         for note in pending_sapling_notes {
//             if note["spent"] == txid || note["pending_spent"] == txid {
//                 sapling_notes += 1;
//             }
//         }
//     }

//     if let JsonValue::Array(spent_orchard_notes) = &notes["spent_orchard_notes"] {
//         for note in spent_orchard_notes {
//             if note["spent"] == txid || note["pending_spent"] == txid {
//                 orchard_notes += 1;
//             }
//         }
//     }
//     if let JsonValue::Array(pending_orchard_notes) = &notes["pending_orchard_notes"] {
//         for note in pending_orchard_notes {
//             if note["spent"] == txid || note["pending_spent"] == txid {
//                 orchard_notes += 1;
//             }
//         }
//     }

//     TxNotesCount {
//         transparent_tx_notes: transparent_notes,
//         sapling_tx_notes: sapling_notes,
//         orchard_tx_notes: orchard_notes,
//     }
// }

// /// Returns number of notes created in txid as TxNotesCount (transparent_notes, sapling_notes, orchard_notes).
// pub async fn tx_outputs(client: &LightClient, txid: &str) -> TxNotesCount {
//     let notes = client.do_list_notes(true).await;

//     let mut transparent_notes = 0;
//     let mut sapling_notes = 0;
//     let mut orchard_notes = 0;

//     if let JsonValue::Array(unspent_utxos) = &notes["utxos"] {
//         for utxo in unspent_utxos {
//             if utxo["created_in_txid"] == txid {
//                 transparent_notes += 1;
//             }
//         }
//     }

//     if let JsonValue::Array(pending_utxos) = &notes["pending_utxos"] {
//         for utxo in pending_utxos {
//             if utxo["created_in_txid"] == txid {
//                 transparent_notes += 1;
//             }
//         }
//     }

//     if let JsonValue::Array(unspent_sapling_notes) = &notes["unspent_sapling_notes"] {
//         for note in unspent_sapling_notes {
//             if note["created_in_txid"] == txid {
//                 sapling_notes += 1;
//             }
//         }
//     }

//     if let JsonValue::Array(pending_sapling_notes) = &notes["pending_sapling_notes"] {
//         for note in pending_sapling_notes {
//             if note["created_in_txid"] == txid {
//                 sapling_notes += 1;
//             }
//         }
//     }

//     if let JsonValue::Array(unspent_orchard_notes) = &notes["unspent_orchard_notes"] {
//         for note in unspent_orchard_notes {
//             if note["created_in_txid"] == txid {
//                 orchard_notes += 1;
//             }
//         }
//     }

//     if let JsonValue::Array(pending_orchard_notes) = &notes["pending_orchard_notes"] {
//         for note in pending_orchard_notes {
//             if note["created_in_txid"] == txid {
//                 orchard_notes += 1;
//             }
//         }
//     }

//     TxNotesCount {
//         transparent_tx_notes: transparent_notes,
//         sapling_tx_notes: sapling_notes,
//         orchard_tx_notes: orchard_notes,
//     }
// }

// /// Returns total actions for txid as TxActionsCount.
// pub async fn tx_actions(
//     sender: &LightClient,
//     recipient: Option<&LightClient>,
//     txid: &str,
// ) -> TxActionsCount {
//     let tx_ins = tx_inputs(sender, txid).await;
//     let tx_outs = if let Some(rec) = recipient {
//         tx_outputs(rec, txid).await
//     } else {
//         TxNotesCount {
//             transparent_tx_notes: 0,
//             sapling_tx_notes: 0,
//             orchard_tx_notes: 0,
//         }
//     };
//     let tx_change = tx_outputs(sender, txid).await;

//     let calculated_sapling_tx_actions = cmp::max(
//         tx_ins.sapling_tx_notes,
//         tx_outs.sapling_tx_notes + tx_change.sapling_tx_notes,
//     );
//     let final_sapling_tx_actions = if calculated_sapling_tx_actions == 1 {
//         2
//     } else {
//         calculated_sapling_tx_actions
//     };

//     let calculated_orchard_tx_actions = cmp::max(
//         tx_ins.orchard_tx_notes,
//         tx_outs.orchard_tx_notes + tx_change.orchard_tx_notes,
//     );
//     let final_orchard_tx_actions = if calculated_orchard_tx_actions == 1 {
//         2
//     } else {
//         calculated_orchard_tx_actions
//     };

//     TxActionsCount {
//         transparent_tx_actions: cmp::max(
//             tx_ins.transparent_tx_notes,
//             tx_outs.transparent_tx_notes + tx_change.transparent_tx_notes,
//         ),
//         sapling_tx_actions: final_sapling_tx_actions,
//         orchard_tx_actions: final_orchard_tx_actions,
//     }
// }

// /// Returns the total transfer value of txid.
// pub async fn total_tx_value(client: &LightClient, txid: &str) -> u64 {
//     let notes = client.do_list_notes(true).await;

//     let mut tx_spend: u64 = 0;
//     let mut tx_change: u64 = 0;
//     if let JsonValue::Array(spent_utxos) = &notes["spent_utxos"] {
//         for utxo in spent_utxos {
//             if utxo["spent"] == txid || utxo["pending_spent"] == txid {
//                 tx_spend += utxo["value"].as_u64().unwrap();
//             }
//         }
//     }
//     if let JsonValue::Array(pending_utxos) = &notes["pending_utxos"] {
//         for utxo in pending_utxos {
//             if utxo["spent"] == txid || utxo["pending_spent"] == txid {
//                 tx_spend += utxo["value"].as_u64().unwrap();
//             } else if utxo["created_in_txid"] == txid {
//                 tx_change += utxo["value"].as_u64().unwrap();
//             }
//         }
//     }
//     if let JsonValue::Array(unspent_utxos) = &notes["utxos"] {
//         for utxo in unspent_utxos {
//             if utxo["created_in_txid"] == txid {
//                 tx_change += utxo["value"].as_u64().unwrap();
//             }
//         }
//     }

//     if let JsonValue::Array(spent_sapling_notes) = &notes["spent_sapling_notes"] {
//         for note in spent_sapling_notes {
//             if note["spent"] == txid || note["pending_spent"] == txid {
//                 tx_spend += note["value"].as_u64().unwrap();
//             }
//         }
//     }
//     if let JsonValue::Array(pending_sapling_notes) = &notes["pending_sapling_notes"] {
//         for note in pending_sapling_notes {
//             if note["spent"] == txid || note["pending_spent"] == txid {
//                 tx_spend += note["value"].as_u64().unwrap();
//             } else if note["created_in_txid"] == txid {
//                 tx_change += note["value"].as_u64().unwrap();
//             }
//         }
//     }
//     if let JsonValue::Array(unspent_sapling_notes) = &notes["unspent_sapling_notes"] {
//         for note in unspent_sapling_notes {
//             if note["created_in_txid"] == txid {
//                 tx_change += note["value"].as_u64().unwrap();
//             }
//         }
//     }

//     if let JsonValue::Array(spent_orchard_notes) = &notes["spent_orchard_notes"] {
//         for note in spent_orchard_notes {
//             if note["spent"] == txid || note["pending_spent"] == txid {
//                 tx_spend += note["value"].as_u64().unwrap();
//             }
//         }
//     }
//     if let JsonValue::Array(pending_orchard_notes) = &notes["pending_orchard_notes"] {
//         for note in pending_orchard_notes {
//             if note["spent"] == txid || note["pending_spent"] == txid {
//                 tx_spend += note["value"].as_u64().unwrap();
//             } else if note["created_in_txid"] == txid {
//                 tx_change += note["value"].as_u64().unwrap();
//             }
//         }
//     }
//     if let JsonValue::Array(unspent_orchard_notes) = &notes["unspent_orchard_notes"] {
//         for note in unspent_orchard_notes {
//             if note["created_in_txid"] == txid {
//                 tx_change += note["value"].as_u64().unwrap();
//             }
//         }
//     }

//     tx_spend - tx_change
// }

/// TODO: Add Doc Comment Here!
pub fn port_to_localhost_uri(port: impl std::fmt::Display) -> http::Uri {
    format!("http://localhost:{port}").parse().unwrap()
}

/// a quick and dirty way to proptest across protocols.
#[must_use]
pub fn int_to_shieldedprotocol(int: i32) -> ShieldedProtocol {
    match int {
        1 => ShieldedProtocol::Sapling,
        2 => ShieldedProtocol::Orchard,
        _ => panic!("invalid protocol"),
    }
}

/// a quick and dirty way to proptest across pools.
#[must_use]
pub fn int_to_pooltype(int: i32) -> PoolType {
    match int {
        0 => PoolType::Transparent,
        n => PoolType::Shielded(int_to_shieldedprotocol(n)),
    }
}

/// helperized test print.
/// if someone figures out how to improve this code it can be done in one place right here.
pub fn timestamped_test_log(text: &str) {
    tracing::info!("{}: {}", crate::utils::now(), text);
}

#[allow(unused_macros)]
macro_rules! build_method {
    ($name:ident, $localtype:ty) => {
        #[doc = "Set the $name field of the builder."]
        pub fn $name(&mut self, $name: $localtype) -> &mut Self {
            self.$name = Some($name);
            self
        }
    };
}

#[allow(unused_macros)]
macro_rules! build_method_push {
    ($name:ident, $localtype:ty) => {
        #[doc = "Push a $ty to the builder."]
        pub fn $name(&mut self, $name: $localtype) -> &mut Self {
            self.$name.push($name);
            self
        }
    };
}
#[allow(unused_macros)]
macro_rules! build_push_list {
    ($name:ident, $builder:ident, $struct:ident) => {
        for i in &$builder.$name {
            $struct.$name.push(i.build());
        }
    };
}

#[allow(unused_imports)]
pub(crate) use build_method;
#[allow(unused_imports)]
pub(crate) use build_method_push;
#[allow(unused_imports)]
pub(crate) use build_push_list;

/// Take a P2PKH taddr and interpret it as a tex addr
pub fn interpret_taddr_as_tex_addr(
    taddr_bytes: [u8; 20],
    p: &impl zcash_protocol::consensus::Parameters,
) -> String {
    bech32::encode::<bech32::Bech32m>(
        bech32::Hrp::parse_unchecked(p.network_type().hrp_tex_address()),
        &taddr_bytes,
    )
    .unwrap()
}

/// Decodes unified address and re-encode as sapling address.
pub fn encoded_sapling_address_from_ua(
    consensus_parameters: &impl consensus::Parameters,
    encoded_unified_address: &str,
) -> String {
    let zcash_keys::address::Address::Unified(unified_address) =
        decode_address(consensus_parameters, encoded_unified_address).unwrap()
    else {
        panic!("not unified address")
    };

    unified_address
        .sapling()
        .expect("no sapling receiver")
        .encode(consensus_parameters)
}

/// Decodes unified address and re-encode with only the orchard receiver.
pub fn encoded_orchard_only_from_ua(
    consensus_parameters: &impl consensus::Parameters,
    encoded_unified_address: &str,
) -> String {
    let zcash_keys::address::Address::Unified(unified_address) =
        decode_address(consensus_parameters, encoded_unified_address).unwrap()
    else {
        panic!("not unified address")
    };

    UnifiedAddress::from_receivers(
        Some(
            unified_address
                .orchard()
                .copied()
                .expect("no orchard receiver"),
        ),
        None,
        None,
    )
    .unwrap()
    .encode(consensus_parameters)
}
