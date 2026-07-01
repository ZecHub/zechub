//! This mod is mostly to take inputs, raw data amd convert it into lightclient actions
//! (obviously) in a test environment.

use zcash_primitives::transaction::TxId;
use zcash_protocol::{PoolType, ShieldedProtocol};

use crate::lightclient::LightClient;

/// gets the first address that will allow a sender to send to a specific pool, as a string
pub async fn get_base_address(client: &LightClient, pooltype: PoolType) -> String {
    match pooltype {
        PoolType::Shielded(ShieldedProtocol::Orchard) => {
            assert!(
                client.unified_addresses_json().await[0]["has_orchard"]
                    .as_bool()
                    .unwrap()
            );
            client.unified_addresses_json().await[0]["encoded_address"]
                .clone()
                .to_string()
        }
        PoolType::Shielded(ShieldedProtocol::Sapling) => {
            assert!(
                !client.unified_addresses_json().await[1]["has_orchard"]
                    .as_bool()
                    .unwrap()
            );
            assert!(
                client.unified_addresses_json().await[1]["has_sapling"]
                    .as_bool()
                    .unwrap()
            );
            client.unified_addresses_json().await[1]["encoded_address"]
                .clone()
                .to_string()
        }
        PoolType::Transparent => client.transparent_addresses_json().await[0]["encoded_address"]
            .clone()
            .to_string(),
    }
}
/// Get the total fees paid by a given client (assumes 1 capability per client).
pub async fn get_fees_paid_by_client(client: &LightClient) -> u64 {
    client
        .transaction_summaries(false)
        .await
        .unwrap()
        .paid_fees()
}
/// Helpers to provide `raw_receivers` to lightclients for send and shield, etc.
pub mod from_inputs {

    use nonempty::NonEmpty;
    use zcash_primitives::transaction::TxId;

    use crate::{
        lightclient::{LightClient, error::LightClientError},
        wallet::error::ProposeSendError,
    };

    /// Panics if the address, amount or memo conversion fails.
    pub async fn quick_send(
        quick_sender: &mut crate::lightclient::LightClient,
        raw_receivers: Vec<(&str, u64, Option<&str>)>,
    ) -> Result<NonEmpty<TxId>, LightClientError> {
        let request = transaction_request_from_send_inputs(raw_receivers)
            .expect("should be able to create a transaction request as receivers are valid.");
        quick_sender
            .quick_send(request, zip32::AccountId::ZERO, true)
            .await
    }

    /// Panics if the address, amount or memo conversion fails.
    pub(crate) fn receivers_from_send_inputs(
        raw_receivers: Vec<(&str, u64, Option<&str>)>,
    ) -> crate::data::receivers::Receivers {
        raw_receivers
            .into_iter()
            .map(|(address, amount, memo)| {
                let recipient_address = crate::utils::conversion::address_from_str(address)
                    .expect("should be a valid address");
                let amount = crate::utils::conversion::zatoshis_from_u64(amount)
                    .expect("should be inside the range of valid zatoshis");
                let memo = memo.map(|memo| {
                    crate::wallet::utils::memo_bytes_from_string(memo.to_string())
                        .expect("should be able to interpret memo")
                });

                crate::data::receivers::Receiver::new(recipient_address, amount, memo)
            })
            .collect()
    }

    /// Creates a [`zcash_client_backend::zip321::TransactionRequest`] from rust primitives for simplified test writing.
    pub fn transaction_request_from_send_inputs(
        raw_receivers: Vec<(&str, u64, Option<&str>)>,
    ) -> Result<
        zcash_client_backend::zip321::TransactionRequest,
        zcash_client_backend::zip321::Zip321Error,
    > {
        let receivers = receivers_from_send_inputs(raw_receivers);
        crate::data::receivers::transaction_request_from_receivers(receivers)
    }

    /// Panics if the address, amount or memo conversion fails.
    pub async fn propose(
        proposer: &mut LightClient,
        raw_receivers: Vec<(&str, u64, Option<&str>)>,
    ) -> Result<crate::data::proposal::ProportionalFeeProposal, ProposeSendError> {
        let request = transaction_request_from_send_inputs(raw_receivers)
            .expect("should be able to create a transaction request as receivers are valid.");
        proposer.propose_send(request, zip32::AccountId::ZERO).await
    }
}

/// gets stati for a vec of txids
pub async fn lookup_statuses(
    client: &LightClient,
    txids: nonempty::NonEmpty<TxId>,
) -> nonempty::NonEmpty<Option<zingo_status::confirmation_status::ConfirmationStatus>> {
    let wallet = client.wallet().read().await;

    txids.map(|txid| {
        wallet
            .wallet_transactions
            .get(&txid)
            .map(pepper_sync::wallet::WalletTransaction::status)
    })
}
