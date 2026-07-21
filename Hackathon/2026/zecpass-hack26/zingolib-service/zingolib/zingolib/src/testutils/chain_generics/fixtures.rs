//! these functions are each meant to be 'test-in-a-box'
//! simply plug in a mock server as a chain conductor and provide some values

use pepper_sync::wallet::SaplingNote;
use zcash_primitives::transaction::fees::zip317::MARGINAL_FEE;
use zcash_protocol::value::Zatoshis;
use zcash_protocol::{PoolType, ShieldedProtocol};

use crate::testutils::chain_generics::conduct_chain::ConductChain;
use crate::testutils::chain_generics::with_assertions;
use crate::testutils::fee_tables;
use crate::testutils::lightclient::from_inputs;
use crate::testutils::lightclient::get_base_address;
use crate::testutils::timestamped_test_log;
use crate::wallet::output::query::OutputPoolQuery;
use crate::wallet::output::query::OutputQuery;
use crate::wallet::output::query::OutputSpendStatusQuery;
use crate::wallet::summary::data::SelfSendValueTransfer;
use crate::wallet::summary::data::SentValueTransfer;
use crate::wallet::summary::data::ValueTransferKind;

/// Fixture for testing various vt transactions
pub async fn create_various_value_transfers<CC>()
where
    CC: ConductChain,
{
    let mut environment = CC::setup().await;
    let mut sender = environment.fund_client_orchard(250_000).await;
    let sender_orchard_addr =
        get_base_address(&sender, PoolType::Shielded(ShieldedProtocol::Orchard)).await;
    let sender_sapling_addr =
        get_base_address(&sender, PoolType::Shielded(ShieldedProtocol::Sapling)).await;
    let sender_taddr = get_base_address(&sender, PoolType::Transparent).await;
    let send_value_for_recipient = 23_000;
    let send_value_self = 17_000;

    tracing::info!("client is ready to send");

    let mut recipient = environment.create_client().await;
    tracing::debug!("TEST 1");
    with_assertions::assure_propose_send_bump_sync_all_recipients(
        &mut environment,
        &mut sender,
        vec![
            (
                &get_base_address(&recipient, PoolType::Shielded(ShieldedProtocol::Orchard)).await,
                send_value_for_recipient,
                Some("Orchard sender to recipient"),
            ),
            (
                &sender_sapling_addr,
                send_value_self,
                Some("Orchard sender to self"),
            ),
            (&sender_taddr, send_value_self, None),
        ],
        vec![&mut recipient],
        false,
    )
    .await
    .unwrap();

    assert_eq!(sender.value_transfers(true).await.unwrap().len(), 3);

    assert!(
        sender
            .value_transfers(false)
            .await
            .unwrap()
            .iter()
            .any(|vt| { vt.kind == ValueTransferKind::Received })
    );

    assert!(
        sender
            .value_transfers(false)
            .await
            .unwrap()
            .iter()
            .any(|vt| { vt.kind == ValueTransferKind::Sent(SentValueTransfer::Send) })
    );

    assert!(
        sender
            .value_transfers(false)
            .await
            .unwrap()
            .iter()
            .any(|vt| {
                vt.kind
                    == ValueTransferKind::Sent(SentValueTransfer::SendToSelf(
                        SelfSendValueTransfer::MemoToSelf,
                    ))
            })
    );

    assert_eq!(recipient.value_transfers(true).await.unwrap().len(), 1);

    tracing::debug!("TEST 2");
    with_assertions::assure_propose_send_bump_sync_all_recipients(
        &mut environment,
        &mut sender,
        vec![(&sender_orchard_addr, send_value_self, None)],
        vec![],
        false,
    )
    .await
    .unwrap();

    assert_eq!(sender.value_transfers(true).await.unwrap().len(), 4);
    assert_eq!(
        sender.value_transfers(true).await.unwrap()[0].kind,
        ValueTransferKind::Sent(SentValueTransfer::SendToSelf(SelfSendValueTransfer::Basic))
    );

    with_assertions::assure_propose_shield_bump_sync(&mut environment, &mut sender, false)
        .await
        .unwrap();
    assert_eq!(sender.value_transfers(true).await.unwrap().len(), 5);
    assert_eq!(
        sender.value_transfers(true).await.unwrap()[0].kind,
        ValueTransferKind::Sent(SentValueTransfer::SendToSelf(SelfSendValueTransfer::Shield))
    );
}

/// sends back and forth several times, including sends to transparent
pub async fn send_shield_cycle<CC>(n: u64)
where
    CC: ConductChain,
{
    let mut environment = CC::setup().await;
    let primary_fund = 1_000_000;
    let mut primary = environment.fund_client_orchard(primary_fund).await;

    let mut secondary = environment.create_client().await;
    let secondary_taddr = get_base_address(&secondary, PoolType::Transparent).await;

    for _ in 0..n {
        let (recorded_fee, recorded_value, recorded_change) =
            with_assertions::assure_propose_send_bump_sync_all_recipients(
                &mut environment,
                &mut primary,
                vec![
                    (&secondary_taddr, 100_000, None),
                    (&secondary_taddr, 4_000, None),
                ],
                vec![&mut secondary],
                false,
            )
            .await
            .unwrap();
        assert_eq!(
            (recorded_fee, recorded_value, recorded_change),
            (
                Option::unwrap(MARGINAL_FEE * 4_u64),
                recorded_value,
                recorded_change
            )
        );

        let (recorded_fee, recorded_value) = with_assertions::assure_propose_shield_bump_sync(
            &mut environment,
            &mut secondary,
            false,
        )
        .await
        .unwrap();
        assert_eq!(
            (recorded_fee, recorded_value),
            (
                Option::unwrap(MARGINAL_FEE * 3_u64),
                Option::unwrap(Zatoshis::from_u64(100_000).unwrap() - recorded_fee)
            )
        );

        let (recorded_fee, recorded_value, recorded_change) =
            with_assertions::assure_propose_send_bump_sync_all_recipients(
                &mut environment,
                &mut secondary,
                vec![(
                    &get_base_address(&primary, PoolType::Shielded(ShieldedProtocol::Orchard))
                        .await,
                    50_000,
                    None,
                )],
                vec![&mut primary],
                false,
            )
            .await
            .unwrap();
        assert_eq!(
            (recorded_fee, recorded_value, recorded_change),
            (
                Option::unwrap(MARGINAL_FEE * 2_u64),
                Zatoshis::from_u64(50_000).unwrap(),
                recorded_change
            )
        );
    }
}

/// overlooks a bunch of dust inputs to find a pair of inputs marginally big enough to send
pub async fn ignore_dust_inputs<CC>()
where
    CC: ConductChain,
{
    let mut environment = CC::setup().await;

    let mut primary = environment.fund_client_orchard(120_000).await;
    let mut secondary = environment.create_client().await;
    let secondary_sapling_addr =
        get_base_address(&secondary, PoolType::Shielded(ShieldedProtocol::Sapling)).await;
    let secondary_orchard_addr =
        get_base_address(&secondary, PoolType::Shielded(ShieldedProtocol::Orchard)).await;

    // send a bunch of dust
    let (recorded_fee, recorded_value, recorded_change) =
        with_assertions::assure_propose_send_bump_sync_all_recipients(
            &mut environment,
            &mut primary,
            vec![
                (&secondary_orchard_addr, 1_000, None),
                (&secondary_orchard_addr, 1_000, None),
                (&secondary_orchard_addr, 1_000, None),
                (&secondary_orchard_addr, 1_000, None),
                (&secondary_orchard_addr, 15_000, None),
                (&secondary_sapling_addr, 1_000, None),
                (&secondary_sapling_addr, 1_000, None),
                (&secondary_sapling_addr, 1_000, None),
                (&secondary_sapling_addr, 1_000, None),
                (&secondary_sapling_addr, 15_000, None),
            ],
            vec![&mut secondary],
            false,
        )
        .await
        .unwrap();
    assert_eq!(
        (recorded_fee, recorded_value, recorded_change),
        (
            Option::unwrap(MARGINAL_FEE * 11_u64),
            recorded_value,
            recorded_change
        )
    );

    // combine the only valid sapling note with the only valid orchard note to send
    let (recorded_fee, recorded_value, recorded_change) =
        with_assertions::assure_propose_send_bump_sync_all_recipients(
            &mut environment,
            &mut secondary,
            vec![(
                &get_base_address(&primary, PoolType::Shielded(ShieldedProtocol::Orchard)).await,
                10_000,
                None,
            )],
            vec![&mut primary],
            false,
        )
        .await
        .unwrap();
    assert_eq!(
        (recorded_fee, recorded_value, recorded_change),
        (
            Option::unwrap(MARGINAL_FEE * 4_u64),
            Zatoshis::from_u64(10_000).unwrap(),
            recorded_change
        )
    );
}

/// In order to fund a transaction multiple notes may be selected and consumed.
/// The algorithm selects the smallest covering note(s).
pub async fn note_selection_order<CC>()
where
    CC: ConductChain,
{
    // toDo: proptest different values for these first two variables
    let number_of_notes = 4;
    let expected_value_from_transaction_2: u64 = 40_000;

    let transaction_1_values = (1..=number_of_notes).map(|n| n * 10_000);

    let expected_fee_for_transaction_1 = (number_of_notes + 2) * MARGINAL_FEE.into_u64();
    let expected_value_from_transaction_1: u64 = transaction_1_values.clone().sum();

    let mut environment = CC::setup().await;
    let mut primary = environment
        .fund_client_orchard(expected_fee_for_transaction_1 + expected_value_from_transaction_1)
        .await;
    let mut secondary = environment.create_client().await;

    // Send number_of_notes transfers in increasing 10_000 zat increments
    let secondary_sapling_addr =
        get_base_address(&secondary, PoolType::Shielded(ShieldedProtocol::Sapling)).await;
    let (recorded_fee, recorded_value, recorded_change) =
        with_assertions::assure_propose_send_bump_sync_all_recipients(
            &mut environment,
            &mut primary,
            transaction_1_values
                .map(|value| (secondary_sapling_addr.as_str(), value, None))
                .collect(),
            vec![&mut secondary],
            false,
        )
        .await
        .unwrap();
    assert_eq!(
        (recorded_fee, recorded_value, recorded_change),
        (
            Zatoshis::from_u64(expected_fee_for_transaction_1).unwrap(),
            recorded_value,
            recorded_change
        )
    );

    let expected_orchard_contribution_for_transaction_2 = 2;

    // calculate what will be spent
    let mut expected_highest_unselected: i64 = 10_000 * number_of_notes as i64;
    let mut expected_inputs_for_transaction_2 = 0;
    let mut max_unselected_value_for_transaction_2: i64 = (expected_value_from_transaction_2
        + expected_orchard_contribution_for_transaction_2)
        as i64;
    loop {
        // add an input
        expected_inputs_for_transaction_2 += 1;
        max_unselected_value_for_transaction_2 += MARGINAL_FEE.into_u64() as i64;
        max_unselected_value_for_transaction_2 -= expected_highest_unselected;
        expected_highest_unselected -= 10_000;

        if max_unselected_value_for_transaction_2 <= 0 {
            // met target
            break;
        }
        if expected_highest_unselected <= 0 {
            // did not meet target. expect error on send
            break;
        }
    }
    let expected_fee_for_transaction_2 = (expected_inputs_for_transaction_2
        + expected_orchard_contribution_for_transaction_2)
        * MARGINAL_FEE.into_u64();

    // the second client selects notes to cover the transaction.
    let primary_orchard_addr =
        get_base_address(&primary, PoolType::Shielded(ShieldedProtocol::Orchard)).await;
    let (recorded_fee, recorded_value, recorded_change) =
        with_assertions::assure_propose_send_bump_sync_all_recipients(
            &mut environment,
            &mut secondary,
            vec![(
                &primary_orchard_addr,
                expected_value_from_transaction_2,
                None,
            )],
            vec![&mut primary],
            false,
        )
        .await
        .unwrap();
    assert_eq!(
        (recorded_fee, recorded_value, recorded_change),
        (
            Zatoshis::from_u64(expected_fee_for_transaction_2).unwrap(),
            Zatoshis::from_u64(expected_value_from_transaction_2).unwrap(),
            Zatoshis::from_u64(0).unwrap()
        )
    );

    let received_change_from_transaction_2 = secondary
        .wallet()
        .read()
        .await
        .sum_queried_output_values(OutputQuery {
            spend_status: OutputSpendStatusQuery::only_unspent(),
            pools: OutputPoolQuery::one_pool(PoolType::Shielded(ShieldedProtocol::Orchard)),
        });
    // if 10_000 or more change, would have used a smaller note
    assert!(received_change_from_transaction_2 < 10_000);

    let secondary_wallet = secondary.wallet().read().await;
    let spent_sapling_outputs = secondary_wallet
        .wallet_outputs::<SaplingNote>()
        .into_iter()
        .filter(|&output| {
            secondary_wallet
                .output_spend_status(output)
                .is_confirmed_spent()
        })
        .collect::<Vec<_>>();
    assert_eq!(
        spent_sapling_outputs.len(),
        expected_inputs_for_transaction_2 as usize
    );
}

/// the simplest test that sends from a specific shielded pool to another specific pool. error variant.
pub async fn shpool_to_pool_insufficient_error<CC>(
    shpool: ShieldedProtocol,
    pool: PoolType,
    underflow_amount: u64,
) where
    CC: ConductChain,
{
    let mut environment = CC::setup().await;

    let mut primary = environment.fund_client_orchard(1_000_000).await;
    let mut secondary = environment.create_client().await;
    let secondary_addr = get_base_address(&secondary, PoolType::Shielded(shpool)).await;

    let expected_fee = fee_tables::one_to_one(Some(shpool), pool, true);
    let secondary_fund = 100_000 + expected_fee - underflow_amount;
    with_assertions::assure_propose_send_bump_sync_all_recipients(
        &mut environment,
        &mut primary,
        vec![(&secondary_addr, secondary_fund, None)],
        vec![&mut secondary],
        false,
    )
    .await
    .unwrap();

    let tertiary = environment.create_client().await;

    let tertiary_fund = 100_000;
    assert_eq!(
        from_inputs::propose(
            &mut secondary,
            vec![(
                tertiary.wallet().read().await.get_address(pool).as_str(),
                tertiary_fund,
                None,
            )],
        )
        .await
        .unwrap_err()
        .to_string(),
        format!(
            "Insufficient balance (have {}, need {} including fee)",
            secondary_fund,
            tertiary_fund + expected_fee
        )
    );
}

/// the simplest test that sends from a specific shielded pool to another specific pool. also known as simpool.
pub async fn to_pool_unfunded_error<CC>(pool: PoolType, try_amount: u64)
where
    CC: ConductChain,
{
    let mut environment = CC::setup().await;

    let mut secondary = environment.create_client().await;
    let tertiary = environment.create_client().await;

    secondary.sync_and_await().await.unwrap();

    let expected_fee = fee_tables::one_to_one(None, pool, true);

    assert_eq!(
        from_inputs::propose(
            &mut secondary,
            vec![(
                tertiary.wallet().read().await.get_address(pool).as_str(),
                try_amount,
                None,
            )],
        )
        .await
        .unwrap_err()
        .to_string(),
        format!(
            "Insufficient balance (have {}, need {} including fee)",
            0,
            try_amount + expected_fee
        )
    );
}

/// the simplest test that sends from a specific shielded pool to another specific pool. also known as simpool.
pub async fn any_source_sends_to_any_receiver<CC>(
    shpool: ShieldedProtocol,
    pool: PoolType,
    receiver_value: u64,
    change: u64,
    test_mempool: bool,
) where
    CC: ConductChain,
{
    timestamped_test_log(format!("starting a {shpool:?} to {pool} test").as_str());

    let mut environment = CC::setup().await;

    let mut primary = environment.create_faucet().await;
    let mut secondary = environment.create_client().await;
    let mut tertiary = environment.create_client().await;

    let expected_fee = fee_tables::one_to_one(Some(shpool), pool, true);

    with_assertions::assure_propose_send_bump_sync_all_recipients(
        &mut environment,
        &mut primary,
        vec![(
            &get_base_address(&secondary, PoolType::Shielded(shpool)).await,
            receiver_value + change + expected_fee,
            None,
        )],
        vec![&mut secondary],
        test_mempool,
    )
    .await
    .unwrap();

    let (recorded_fee, recorded_value, recorded_change) =
        with_assertions::assure_propose_send_bump_sync_all_recipients(
            &mut environment,
            &mut secondary,
            vec![(
                &get_base_address(&tertiary, pool).await,
                receiver_value,
                None,
            )],
            vec![&mut tertiary],
            test_mempool,
        )
        .await
        .unwrap();
    assert_eq!(
        (recorded_fee, recorded_value, recorded_change),
        (
            Zatoshis::from_u64(expected_fee).unwrap(),
            Zatoshis::from_u64(receiver_value).unwrap(),
            Zatoshis::from_u64(change).unwrap()
        )
    );
}
