use darkside_tests::{
    constants::{
        ADVANCED_REORG_TESTS_USER_WALLET, BRANCH_ID, REORG_CHANGES_INCOMING_TX_HEIGHT_AFTER,
        REORG_CHANGES_INCOMING_TX_HEIGHT_BEFORE, REORG_CHANGES_INCOMING_TX_INDEX_AFTER,
        REORG_CHANGES_INCOMING_TX_INDEX_BEFORE, REORG_EXPIRES_INCOMING_TX_HEIGHT_AFTER,
        REORG_EXPIRES_INCOMING_TX_HEIGHT_BEFORE, TRANSACTION_TO_FILLER_ADDRESS,
        TREE_STATE_FOLDER_PATH,
    },
    darkside_connector::DarksideConnector,
    darkside_types::{Empty, TreeState},
    utils::{lightwalletd, read_dataset, read_lines},
};

use tokio::time::sleep;
use zcash_local_net::indexer::Indexer;
use zcash_protocol::consensus::BlockHeight;
use zingo_common_components::protocol::ActivationHeights;
use zingolib::wallet::summary::data::SentValueTransfer;
use zingolib::{
    config::WalletConfig,
    testutils::{port_to_localhost_uri, tempfile::TempDir},
};
use zingolib::{testutils::default_test_wallet_settings, wallet::summary::data::ValueTransferKind};
use zingolib::{
    testutils::{lightclient::from_inputs, paths::get_cargo_manifest_dir},
    wallet::balance::AccountBalance,
};
use zingolib_testutils::scenarios::ClientBuilder;

#[ignore]
#[tokio::test]
async fn reorg_changes_incoming_tx_height() {
    let lightwalletd = lightwalletd().await.unwrap();

    let server_id = port_to_localhost_uri(lightwalletd.listen_port());

    prepare_before_tx_height_change_reorg(server_id.clone())
        .await
        .unwrap();

    let wallet_dir = TempDir::new().unwrap();
    let mut light_client = ClientBuilder::new(server_id.clone(), wallet_dir)
        .build_client(
            WalletConfig::MnemonicPhrase {
                mnemonic_phrase: ADVANCED_REORG_TESTS_USER_WALLET.to_string(),
                no_of_accounts: 1.try_into().unwrap(),
                birthday: 202,
                wallet_settings: default_test_wallet_settings(),
            },
            true,
            ActivationHeights::default(),
        )
        .await;

    light_client.sync_and_await().await.unwrap();
    assert_eq!(
        light_client
            .account_balance(zip32::AccountId::ZERO)
            .await
            .unwrap(),
        AccountBalance {
            total_sapling_balance: Some(0.try_into().unwrap()),
            confirmed_sapling_balance: Some(0.try_into().unwrap()),
            unconfirmed_sapling_balance: Some(0.try_into().unwrap()),
            total_orchard_balance: Some(100000000.try_into().unwrap()),
            confirmed_orchard_balance: Some(100000000.try_into().unwrap()),
            unconfirmed_orchard_balance: Some(0.try_into().unwrap()),
            total_transparent_balance: Some(0.try_into().unwrap()),
            confirmed_transparent_balance: Some(0.try_into().unwrap()),
            unconfirmed_transparent_balance: Some(0.try_into().unwrap())
        }
    );

    let before_reorg_transactions = light_client.value_transfers(true).await.unwrap();

    assert_eq!(before_reorg_transactions.len(), 1);
    assert_eq!(
        before_reorg_transactions[0].blockheight,
        BlockHeight::from_u32(203)
    );

    prepare_after_tx_height_change_reorg(server_id.clone())
        .await
        .unwrap();

    let reorg_sync_result = light_client.sync_and_await().await;

    match reorg_sync_result {
        Ok(value) => tracing::info!("{value}"),
        Err(err_str) => tracing::info!("{err_str}"),
    }

    // Assert that balance holds
    assert_eq!(
        light_client
            .account_balance(zip32::AccountId::ZERO)
            .await
            .unwrap(),
        AccountBalance {
            total_sapling_balance: Some(0.try_into().unwrap()),
            confirmed_sapling_balance: Some(0.try_into().unwrap()),
            unconfirmed_sapling_balance: Some(0.try_into().unwrap()),
            total_orchard_balance: Some(100000000.try_into().unwrap()),
            confirmed_orchard_balance: Some(100000000.try_into().unwrap()),
            unconfirmed_orchard_balance: Some(0.try_into().unwrap()),
            total_transparent_balance: Some(0.try_into().unwrap()),
            confirmed_transparent_balance: Some(0.try_into().unwrap()),
            unconfirmed_transparent_balance: Some(0.try_into().unwrap())
        }
    );

    let after_reorg_transactions = light_client.value_transfers(true).await.unwrap();

    assert_eq!(after_reorg_transactions.len(), 1);
    assert_eq!(
        after_reorg_transactions[0].blockheight,
        BlockHeight::from_u32(206)
    );
}

async fn prepare_before_tx_height_change_reorg(uri: http::Uri) -> Result<(), String> {
    dbg!(&uri);
    let connector = DarksideConnector(uri.clone());

    let mut client = connector.get_client().await.unwrap();
    // Setup prodedures.  Up to this point there's no communication between the client and the dswd
    client.clear_address_utxo(Empty {}).await.unwrap();

    // reset with parameters
    connector
        .reset(202, String::from(BRANCH_ID), String::from("regtest"))
        .await
        .unwrap();

    let dataset_path = format!(
        "{}/{}",
        get_cargo_manifest_dir().to_string_lossy(),
        REORG_CHANGES_INCOMING_TX_HEIGHT_BEFORE
    );

    tracing::info!("dataset path: {dataset_path}");

    connector
        .stage_blocks_stream(read_dataset(dataset_path))
        .await?;

    for i in 201..207 {
        let tree_state_path = format!(
            "{}/{}/{}.json",
            get_cargo_manifest_dir().to_string_lossy(),
            TREE_STATE_FOLDER_PATH,
            i
        );
        let tree_state = TreeState::from_file(tree_state_path).unwrap();
        connector.add_tree_state(tree_state).await.unwrap();
    }

    connector.apply_staged(204).await?;

    sleep(std::time::Duration::new(1, 0)).await;

    Ok(())
}

async fn prepare_after_tx_height_change_reorg(uri: http::Uri) -> Result<(), String> {
    dbg!(&uri);
    let connector = DarksideConnector(uri.clone());

    let mut client = connector.get_client().await.unwrap();
    // Setup prodedures.  Up to this point there's no communication between the client and the dswd
    client.clear_address_utxo(Empty {}).await.unwrap();

    let dataset_path = format!(
        "{}/{}",
        get_cargo_manifest_dir().to_string_lossy(),
        REORG_CHANGES_INCOMING_TX_HEIGHT_AFTER
    );
    connector
        .stage_blocks_stream(
            read_lines(dataset_path)
                .unwrap()
                .map(|line| line.unwrap())
                .collect(),
        )
        .await?;

    connector.apply_staged(206).await?;

    sleep(std::time::Duration::new(1, 0)).await;

    Ok(())
}

#[ignore]
#[tokio::test]
async fn reorg_changes_incoming_tx_index() {
    let lightwalletd = lightwalletd().await.unwrap();

    let server_id = port_to_localhost_uri(lightwalletd.listen_port());

    prepare_before_tx_index_change_reorg(server_id.clone())
        .await
        .unwrap();

    let wallet_dir = TempDir::new().unwrap();
    let mut light_client = ClientBuilder::new(server_id.clone(), wallet_dir)
        .build_client(
            WalletConfig::MnemonicPhrase {
                mnemonic_phrase: ADVANCED_REORG_TESTS_USER_WALLET.to_string(),
                no_of_accounts: 1.try_into().unwrap(),
                birthday: 202,
                wallet_settings: default_test_wallet_settings(),
            },
            true,
            ActivationHeights::default(),
        )
        .await;

    light_client.sync_and_await().await.unwrap();
    assert_eq!(
        light_client
            .account_balance(zip32::AccountId::ZERO)
            .await
            .unwrap(),
        AccountBalance {
            total_sapling_balance: Some(0.try_into().unwrap()),
            confirmed_sapling_balance: Some(0.try_into().unwrap()),
            unconfirmed_sapling_balance: Some(0.try_into().unwrap()),
            total_orchard_balance: Some(100000000.try_into().unwrap()),
            confirmed_orchard_balance: Some(100000000.try_into().unwrap()),
            unconfirmed_orchard_balance: Some(0.try_into().unwrap()),
            total_transparent_balance: Some(0.try_into().unwrap()),
            confirmed_transparent_balance: Some(0.try_into().unwrap()),
            unconfirmed_transparent_balance: Some(0.try_into().unwrap())
        }
    );

    let before_reorg_transactions = light_client.value_transfers(true).await.unwrap();

    assert_eq!(before_reorg_transactions.len(), 1);
    assert_eq!(
        before_reorg_transactions[0].blockheight,
        BlockHeight::from_u32(203)
    );

    prepare_after_tx_index_change_reorg(server_id.clone())
        .await
        .unwrap();

    let reorg_sync_result = light_client.sync_and_await().await;

    match reorg_sync_result {
        Ok(value) => tracing::info!("{value}"),
        Err(err_str) => tracing::info!("{err_str}"),
    }

    // Assert that balance holds
    assert_eq!(
        light_client
            .account_balance(zip32::AccountId::ZERO)
            .await
            .unwrap(),
        AccountBalance {
            total_sapling_balance: Some(0.try_into().unwrap()),
            confirmed_sapling_balance: Some(0.try_into().unwrap()),
            unconfirmed_sapling_balance: Some(0.try_into().unwrap()),
            total_orchard_balance: Some(100000000.try_into().unwrap()),
            confirmed_orchard_balance: Some(100000000.try_into().unwrap()),
            unconfirmed_orchard_balance: Some(0.try_into().unwrap()),
            total_transparent_balance: Some(0.try_into().unwrap()),
            confirmed_transparent_balance: Some(0.try_into().unwrap()),
            unconfirmed_transparent_balance: Some(0.try_into().unwrap())
        }
    );

    let after_reorg_transactions = light_client.value_transfers(true).await.unwrap();

    assert_eq!(after_reorg_transactions.len(), 1);
    assert_eq!(
        after_reorg_transactions[0].blockheight,
        BlockHeight::from_u32(203)
    );
}

async fn prepare_before_tx_index_change_reorg(uri: http::Uri) -> Result<(), String> {
    dbg!(&uri);
    let connector = DarksideConnector(uri.clone());

    let mut client = connector.get_client().await.unwrap();
    // Setup prodedures.  Up to this point there's no communication between the client and the dswd
    client.clear_address_utxo(Empty {}).await.unwrap();

    // reset with parameters
    connector
        .reset(202, String::from(BRANCH_ID), String::from("regtest"))
        .await
        .unwrap();

    let dataset_path = format!(
        "{}/{}",
        get_cargo_manifest_dir().to_string_lossy(),
        REORG_CHANGES_INCOMING_TX_INDEX_BEFORE
    );

    tracing::info!("dataset path: {dataset_path}");

    connector
        .stage_blocks_stream(read_dataset(dataset_path))
        .await?;

    for i in 201..207 {
        let tree_state_path = format!(
            "{}/{}/{}.json",
            get_cargo_manifest_dir().to_string_lossy(),
            TREE_STATE_FOLDER_PATH,
            i
        );
        let tree_state = TreeState::from_file(tree_state_path).unwrap();
        connector.add_tree_state(tree_state).await.unwrap();
    }

    connector.apply_staged(204).await?;

    sleep(std::time::Duration::new(1, 0)).await;

    Ok(())
}

async fn prepare_after_tx_index_change_reorg(uri: http::Uri) -> Result<(), String> {
    dbg!(&uri);
    let connector = DarksideConnector(uri.clone());

    let mut client = connector.get_client().await.unwrap();
    // Setup prodedures.  Up to this point there's no communication between the client and the dswd
    client.clear_address_utxo(Empty {}).await.unwrap();

    let dataset_path = format!(
        "{}/{}",
        get_cargo_manifest_dir().to_string_lossy(),
        REORG_CHANGES_INCOMING_TX_INDEX_AFTER
    );
    connector
        .stage_blocks_stream(
            read_lines(dataset_path)
                .unwrap()
                .map(|line| line.unwrap())
                .collect(),
        )
        .await?;

    connector.apply_staged(206).await?;

    sleep(std::time::Duration::new(1, 0)).await;

    Ok(())
}

#[ignore = "darkside block continuity error, after re-org block 206's prev hash does not match 205's hash"]
#[tokio::test]
async fn reorg_expires_incoming_tx() {
    let lightwalletd = lightwalletd().await.unwrap();

    let server_id = port_to_localhost_uri(lightwalletd.listen_port());

    prepare_expires_incoming_tx_before_reorg(server_id.clone())
        .await
        .unwrap();

    let wallet_dir = TempDir::new().unwrap();
    let mut light_client = ClientBuilder::new(server_id.clone(), wallet_dir)
        .build_client(
            WalletConfig::MnemonicPhrase {
                mnemonic_phrase: ADVANCED_REORG_TESTS_USER_WALLET.to_string(),
                no_of_accounts: 1.try_into().unwrap(),
                birthday: 202,
                wallet_settings: default_test_wallet_settings(),
            },
            true,
            ActivationHeights::default(),
        )
        .await;

    light_client.sync_and_await().await.unwrap();
    assert_eq!(
        light_client
            .account_balance(zip32::AccountId::ZERO)
            .await
            .unwrap(),
        AccountBalance {
            total_sapling_balance: Some(0.try_into().unwrap()),
            confirmed_sapling_balance: Some(0.try_into().unwrap()),
            unconfirmed_sapling_balance: Some(0.try_into().unwrap()),
            total_orchard_balance: Some(100000000.try_into().unwrap()),
            confirmed_orchard_balance: Some(100000000.try_into().unwrap()),
            unconfirmed_orchard_balance: Some(0.try_into().unwrap()),
            total_transparent_balance: Some(0.try_into().unwrap()),
            confirmed_transparent_balance: Some(0.try_into().unwrap()),
            unconfirmed_transparent_balance: Some(0.try_into().unwrap())
        }
    );

    let before_reorg_transactions = light_client.value_transfers(true).await.unwrap();

    assert_eq!(before_reorg_transactions.len(), 1);
    assert_eq!(
        before_reorg_transactions[0].blockheight,
        BlockHeight::from_u32(203)
    );

    prepare_expires_incoming_tx_after_reorg(server_id.clone())
        .await
        .unwrap();

    let reorg_sync_result = light_client.sync_and_await().await;

    match reorg_sync_result {
        Ok(value) => tracing::info!("{value}"),
        Err(err_str) => tracing::info!("{err_str}"),
    }

    // Assert that balance holds
    assert_eq!(
        light_client
            .account_balance(zip32::AccountId::ZERO)
            .await
            .unwrap(),
        AccountBalance {
            total_sapling_balance: Some(0.try_into().unwrap()),
            confirmed_sapling_balance: Some(0.try_into().unwrap()),
            unconfirmed_sapling_balance: Some(0.try_into().unwrap()),
            total_orchard_balance: Some(0.try_into().unwrap()),
            confirmed_orchard_balance: Some(0.try_into().unwrap()),
            unconfirmed_orchard_balance: Some(0.try_into().unwrap()),
            total_transparent_balance: Some(0.try_into().unwrap()),
            confirmed_transparent_balance: Some(0.try_into().unwrap()),
            unconfirmed_transparent_balance: Some(0.try_into().unwrap())
        }
    );

    let after_reorg_transactions = light_client.value_transfers(true).await.unwrap();

    assert_eq!(after_reorg_transactions.len(), 0);
}

async fn prepare_expires_incoming_tx_before_reorg(uri: http::Uri) -> Result<(), String> {
    dbg!(&uri);
    let connector = DarksideConnector(uri.clone());

    let mut client = connector.get_client().await.unwrap();
    // Setup prodedures.  Up to this point there's no communication between the client and the dswd
    client.clear_address_utxo(Empty {}).await.unwrap();

    // reset with parameters
    connector
        .reset(202, String::from(BRANCH_ID), String::from("regtest"))
        .await
        .unwrap();

    let dataset_path = format!(
        "{}/{}",
        get_cargo_manifest_dir().to_string_lossy(),
        REORG_EXPIRES_INCOMING_TX_HEIGHT_BEFORE
    );

    tracing::info!("dataset path: {dataset_path}");

    connector
        .stage_blocks_stream(read_dataset(dataset_path))
        .await?;

    for i in 201..207 {
        let tree_state_path = format!(
            "{}/{}/{}.json",
            get_cargo_manifest_dir().to_string_lossy(),
            TREE_STATE_FOLDER_PATH,
            i
        );
        let tree_state = TreeState::from_file(tree_state_path).unwrap();
        connector.add_tree_state(tree_state).await.unwrap();
    }

    connector.apply_staged(204).await?;

    sleep(std::time::Duration::new(1, 0)).await;

    Ok(())
}

async fn prepare_expires_incoming_tx_after_reorg(uri: http::Uri) -> Result<(), String> {
    dbg!(&uri);
    let connector = DarksideConnector(uri.clone());

    let mut client = connector.get_client().await.unwrap();
    // Setup prodedures.  Up to this point there's no communication between the client and the dswd
    client.clear_address_utxo(Empty {}).await.unwrap();

    let dataset_path = format!(
        "{}/{}",
        get_cargo_manifest_dir().to_string_lossy(),
        REORG_EXPIRES_INCOMING_TX_HEIGHT_AFTER
    );
    connector
        .stage_blocks_stream(
            read_lines(dataset_path)
                .unwrap()
                .map(|line| line.unwrap())
                .collect(),
        )
        .await?;

    connector.apply_staged(206).await?;

    sleep(std::time::Duration::new(1, 0)).await;

    Ok(())
}

// OUTGOING TX TESTS

#[ignore = "darkside block continuity error, after re-org block 206's prev hash does not match 205's hash"]
#[tokio::test]
/// A Re Org occurs and changes the height of an outbound transaction
///
/// Pre-condition: Wallet has funds
///
/// Steps:
/// 1. create fake chain
///    * 1a. sync to latest height
/// 2. send transaction to recipient address
/// 3. getIncomingTransaction
/// 4. stage transaction at `sentTxHeight`
/// 5. applyHeight(sentTxHeight)
/// 6. sync to latest height
///    * 6a. verify that there's a pending transaction with a mined height of sentTxHeight
/// 7. stage 15  blocks from `sentTxHeight`
/// 7. a stage sent tx to `sentTxHeight + 2`
/// 8. `applyHeight(sentTxHeight + 1)` to cause a 1 block reorg
/// 9. sync to latest height
/// 10. verify that there's a pending transaction with -1 mined height
/// 11. `applyHeight(sentTxHeight + 2)`
///    * 11a. sync to latest height
/// 12. verify that there's a pending transaction with a mined height of `sentTxHeight + 2`
/// 13. apply height(`sentTxHeight + 15`)
/// 14. sync to latest height
/// 15. verify that there's no pending transaction and that the tx is displayed on the sentTransactions collection
async fn reorg_changes_outgoing_tx_height() {
    let lightwalletd = lightwalletd().await.unwrap();

    let server_id = port_to_localhost_uri(lightwalletd.listen_port());

    prepare_changes_outgoing_tx_height_before_reorg(server_id.clone())
        .await
        .unwrap();

    let wallet_dir = TempDir::new().unwrap();
    let mut light_client = ClientBuilder::new(server_id.clone(), wallet_dir)
        .build_client(
            WalletConfig::MnemonicPhrase {
                mnemonic_phrase: ADVANCED_REORG_TESTS_USER_WALLET.to_string(),
                no_of_accounts: 1.try_into().unwrap(),
                birthday: 202,
                wallet_settings: default_test_wallet_settings(),
            },
            true,
            ActivationHeights::default(),
        )
        .await;

    light_client.sync_and_await().await.unwrap();
    assert_eq!(
        light_client
            .account_balance(zip32::AccountId::ZERO)
            .await
            .unwrap(),
        AccountBalance {
            total_sapling_balance: Some(0.try_into().unwrap()),
            confirmed_sapling_balance: Some(0.try_into().unwrap()),
            unconfirmed_sapling_balance: Some(0.try_into().unwrap()),
            total_orchard_balance: Some(100000000.try_into().unwrap()),
            confirmed_orchard_balance: Some(100000000.try_into().unwrap()),
            unconfirmed_orchard_balance: Some(0.try_into().unwrap()),
            total_transparent_balance: Some(0.try_into().unwrap()),
            confirmed_transparent_balance: Some(0.try_into().unwrap()),
            unconfirmed_transparent_balance: Some(0.try_into().unwrap())
        }
    );

    let before_reorg_transactions = light_client.value_transfers(true).await.unwrap();

    assert_eq!(before_reorg_transactions.len(), 1);
    assert_eq!(
        before_reorg_transactions[0].blockheight,
        BlockHeight::from_u32(203)
    );

    let connector = DarksideConnector(server_id.clone());

    let recipient_string = "uregtest1z8s5szuww2cnze042e0re2ez8l3d04zvkp7kslxwdha6tp644srd4nh0xlp8a05avzduc6uavqkxv79x53c60hrc0qsgeza3age2g3qualullukd4s0lsn6mtfup4z8jz6xdz2c05zakhafc7pmw0dwugwu9ljevzgyc3mfwxg9slr87k8l7cq075gl3fgxpr85uuvxhxydrskp2303";

    // Send 100000 zatoshi to some address
    let amount: u64 = 100000;
    let sent_tx_id = from_inputs::quick_send(
        &mut light_client,
        [(recipient_string, amount, None)].to_vec(),
    )
    .await
    .unwrap();

    tracing::info!("SENT TX ID: {sent_tx_id:?}");

    let mut incoming_transaction_stream = connector.get_incoming_transactions().await.unwrap();
    let tx = incoming_transaction_stream
        .message()
        .await
        .unwrap()
        .unwrap();

    let sent_tx_height: i32 = 205;
    _ = connector.apply_staged(sent_tx_height).await;

    light_client.sync_and_await().await.unwrap();

    let expected_after_send_balance = AccountBalance {
        total_sapling_balance: Some(0.try_into().unwrap()),
        confirmed_sapling_balance: Some(0.try_into().unwrap()),
        unconfirmed_sapling_balance: Some(0.try_into().unwrap()),
        total_orchard_balance: Some(99890000.try_into().unwrap()),
        confirmed_orchard_balance: Some(0.try_into().unwrap()),
        unconfirmed_orchard_balance: Some(99890000.try_into().unwrap()),
        total_transparent_balance: Some(0.try_into().unwrap()),
        confirmed_transparent_balance: Some(0.try_into().unwrap()),
        unconfirmed_transparent_balance: Some(0.try_into().unwrap()),
    };

    assert_eq!(
        light_client
            .account_balance(zip32::AccountId::ZERO)
            .await
            .unwrap(),
        expected_after_send_balance
    );

    // check that the outgoing transaction has the correct height before
    // the reorg is triggered

    tracing::info!("{:?}", light_client.value_transfers(true).await);

    assert_eq!(
        light_client
            .value_transfers(true)
            .await
            .unwrap()
            .iter()
            .find_map(|v| match v.kind {
                ValueTransferKind::Sent(SentValueTransfer::Send) => {
                    if let Some(addr) = v.recipient_address.as_ref() {
                        if addr == recipient_string && v.value == 100_000 {
                            Some(v.blockheight)
                        } else {
                            None
                        }
                    } else {
                        None
                    }
                }
                _ => {
                    None
                }
            }),
        Some(BlockHeight::from(sent_tx_height as u32))
    );

    //
    // Create reorg
    //

    // stage empty blocks from height 205 to cause a Reorg
    _ = connector.stage_blocks_create(sent_tx_height, 20, 1).await;

    _ = connector
        .stage_transactions_stream([(tx.clone().data, 210)].to_vec())
        .await;

    _ = connector.apply_staged(211).await;

    // temp hack as pepper sync needs tree state of latest block for sync status
    connector.add_tree_state(TreeState { network: "regtest".to_string(), height: 211, hash: "015265800472a8aaf96c7891cf7bd63ee1468bb6f3747714a6bd76c40ec9298b".to_string(), time: 1694454562, sapling_tree: "000000".to_string(), orchard_tree: "01532c96c5d6a36ae79a9cad00ef7053e11b738c84c1022f80d8b0afcd2aedea23001f000001346fd8af3d66b14feaa60685fa189ca55cbd7f952fc25cdc971c310122b2402a01085516881012d2729492ba29b11522d3a45f0b70e2a7ab62a4243ec9a67c2a1100015fe60f3e71ba24797be5421c6c702e0a50c3a2178291a7d3dbd9543f5815cb0400000000000000000000000000000000000000000000000000".to_string() }).await.unwrap();

    let reorg_sync_result = light_client.sync_and_await().await;

    match reorg_sync_result {
        Ok(value) => tracing::info!("{value}"),
        Err(err_str) => tracing::info!("{err_str}"),
    }

    let expected_after_reorg_balance = AccountBalance {
        total_sapling_balance: Some(0.try_into().unwrap()),
        confirmed_sapling_balance: Some(0.try_into().unwrap()),
        unconfirmed_sapling_balance: Some(0.try_into().unwrap()),
        total_orchard_balance: Some(99890000.try_into().unwrap()),
        confirmed_orchard_balance: Some(99890000.try_into().unwrap()),
        unconfirmed_orchard_balance: Some(0.try_into().unwrap()),
        total_transparent_balance: Some(0.try_into().unwrap()),
        confirmed_transparent_balance: Some(0.try_into().unwrap()),
        unconfirmed_transparent_balance: Some(0.try_into().unwrap()),
    };

    // Assert that balance holds
    assert_eq!(
        light_client
            .account_balance(zip32::AccountId::ZERO)
            .await
            .unwrap(),
        expected_after_reorg_balance
    );

    let after_reorg_transactions = light_client.value_transfers(true).await.unwrap();

    assert_eq!(after_reorg_transactions.len(), 3);

    tracing::info!("{:?}", light_client.value_transfers(true).await);

    // FIXME: This test is broken because if this issue
    // https://github.com/zingolabs/zingolib/issues/622
    // verify that the reorged transaction is in the new height
    // assert_eq!(
    //     light_client
    //         .list_value_transfers(true)
    //         .await
    //         .into_iter()
    //         .find_map(|v| match v.kind {
    //             ValueTransferKind::Sent { to_address, amount } => {
    //                 if to_address.to_string() == recipient_string && amount == 100000 {
    //                     Some(v.block_height)
    //                 } else {
    //                     None
    //                 }
    //             }
    //             _ => {
    //                 None
    //             }
    //         }),
    //     Some(BlockHeight::from(211))
    // );
}

async fn prepare_changes_outgoing_tx_height_before_reorg(uri: http::Uri) -> Result<(), String> {
    let connector = DarksideConnector(uri.clone());

    let mut client = connector.get_client().await.unwrap();
    // Setup prodedures.  Up to this point there's no communication between the client and the dswd
    client.clear_address_utxo(Empty {}).await.unwrap();

    // reset with parameters
    connector
        .reset(202, String::from(BRANCH_ID), String::from("regtest"))
        .await
        .unwrap();

    // this dataset works for this test since we only need funds to send a transaction.
    let dataset_path = format!(
        "{}/{}",
        get_cargo_manifest_dir().to_string_lossy(),
        REORG_EXPIRES_INCOMING_TX_HEIGHT_BEFORE
    );

    tracing::info!("dataset path: {dataset_path}");

    connector
        .stage_blocks_stream(read_dataset(dataset_path))
        .await?;

    for i in 201..211 {
        let tree_state_path = format!(
            "{}/{}/{}.json",
            get_cargo_manifest_dir().to_string_lossy(),
            TREE_STATE_FOLDER_PATH,
            i
        );
        let tree_state = TreeState::from_file(tree_state_path).unwrap();
        connector.add_tree_state(tree_state).await.unwrap();
    }

    connector.apply_staged(204).await?;

    sleep(std::time::Duration::new(1, 0)).await;

    Ok(())
}

#[ignore = "darkside block continuity error, after re-org block 206's prev hash does not match 205's hash"]
#[tokio::test]
/// ### `ReOrg` Removes Outbound `TxAnd` Is Never Mined
/// Transaction was included in a block, and then is not included in a block after a reorg, and expires.
/// Steps:
/// 1. create fake chain
/// 1a. sync to latest height
/// 2. send transaction to recipient address
/// 3. getIncomingTransaction
/// 4. stage transaction at sentTxHeight
/// 5. applyHeight(sentTxHeight)
/// 6. sync to latest height
/// 6a. verify that there's a pending transaction with a mined height of sentTxHeight
/// 7. stage 15 blocks from sentTxHeigth to cause a reorg
/// 8. sync to latest height
/// 9. verify that there's an expired transaction as a pending transaction
async fn reorg_expires_outgoing_tx_height() {
    let lightwalletd = lightwalletd().await.unwrap();

    let server_id = port_to_localhost_uri(lightwalletd.listen_port());

    prepare_changes_outgoing_tx_height_before_reorg(server_id.clone())
        .await
        .unwrap();

    let wallet_dir = TempDir::new().unwrap();
    let mut light_client = ClientBuilder::new(server_id.clone(), wallet_dir)
        .build_client(
            WalletConfig::MnemonicPhrase {
                mnemonic_phrase: ADVANCED_REORG_TESTS_USER_WALLET.to_string(),
                no_of_accounts: 1.try_into().unwrap(),
                birthday: 202,
                wallet_settings: default_test_wallet_settings(),
            },
            true,
            ActivationHeights::default(),
        )
        .await;

    let expected_initial_balance = AccountBalance {
        total_sapling_balance: Some(0.try_into().unwrap()),
        confirmed_sapling_balance: Some(0.try_into().unwrap()),
        unconfirmed_sapling_balance: Some(0.try_into().unwrap()),
        total_orchard_balance: Some(100000000.try_into().unwrap()),
        confirmed_orchard_balance: Some(100000000.try_into().unwrap()),
        unconfirmed_orchard_balance: Some(0.try_into().unwrap()),
        total_transparent_balance: Some(0.try_into().unwrap()),
        confirmed_transparent_balance: Some(0.try_into().unwrap()),
        unconfirmed_transparent_balance: Some(0.try_into().unwrap()),
    };

    light_client.sync_and_await().await.unwrap();
    assert_eq!(
        light_client
            .account_balance(zip32::AccountId::ZERO)
            .await
            .unwrap(),
        expected_initial_balance
    );

    let before_reorg_transactions = light_client.value_transfers(true).await.unwrap();

    assert_eq!(before_reorg_transactions.len(), 1);
    assert_eq!(
        before_reorg_transactions[0].blockheight,
        BlockHeight::from_u32(203)
    );

    let connector = DarksideConnector(server_id.clone());

    let recipient_string = "uregtest1z8s5szuww2cnze042e0re2ez8l3d04zvkp7kslxwdha6tp644srd4nh0xlp8a05avzduc6uavqkxv79x53c60hrc0qsgeza3age2g3qualullukd4s0lsn6mtfup4z8jz6xdz2c05zakhafc7pmw0dwugwu9ljevzgyc3mfwxg9slr87k8l7cq075gl3fgxpr85uuvxhxydrskp2303";

    // Send 100000 zatoshi to some address
    let amount: u64 = 100000;
    let sent_tx_id = from_inputs::quick_send(
        &mut light_client,
        [(recipient_string, amount, None)].to_vec(),
    )
    .await
    .unwrap();

    tracing::info!("SENT TX ID: {sent_tx_id:?}");

    let sent_tx_height: i32 = 205;
    _ = connector.apply_staged(sent_tx_height).await;

    light_client.sync_and_await().await.unwrap();

    let expected_after_send_balance = AccountBalance {
        total_sapling_balance: Some(0.try_into().unwrap()),
        confirmed_sapling_balance: Some(0.try_into().unwrap()),
        unconfirmed_sapling_balance: Some(0.try_into().unwrap()),
        total_orchard_balance: Some(99890000.try_into().unwrap()),
        confirmed_orchard_balance: Some(0.try_into().unwrap()),
        unconfirmed_orchard_balance: Some(99890000.try_into().unwrap()),
        total_transparent_balance: Some(0.try_into().unwrap()),
        confirmed_transparent_balance: Some(0.try_into().unwrap()),
        unconfirmed_transparent_balance: Some(0.try_into().unwrap()),
    };

    assert_eq!(
        light_client
            .account_balance(zip32::AccountId::ZERO)
            .await
            .unwrap(),
        expected_after_send_balance
    );

    // check that the outgoing transaction has the correct height before
    // the reorg is triggered

    tracing::info!("{:?}", light_client.value_transfers(true).await.unwrap());

    let send_height = light_client
        .value_transfers(true)
        .await
        .unwrap()
        .iter()
        .find_map(|v| match v.kind {
            ValueTransferKind::Sent(SentValueTransfer::Send) => {
                if let Some(addr) = v.recipient_address.as_ref() {
                    if addr == recipient_string && v.value == 100_000 {
                        Some(v.blockheight)
                    } else {
                        None
                    }
                } else {
                    None
                }
            }
            _ => None,
        });
    assert_eq!(send_height, Some(BlockHeight::from(sent_tx_height as u32)));

    //
    // Create reorg
    //

    // stage empty blocks from height 205 to cause a Reorg
    _ = connector.stage_blocks_create(sent_tx_height, 50, 1).await;

    // this will remove the submitted transaction from our view of the blockchain
    _ = connector.apply_staged(245).await;

    // temp hack as pepper sync needs tree state of latest block for sync status
    connector.add_tree_state(TreeState { network: "regtest".to_string(), height: 245, hash: "015265800472a8aaf96c7891cf7bd63ee1468bb6f3747714a6bd76c40ec9298b".to_string(), time: 1694454562, sapling_tree: "000000".to_string(), orchard_tree: "01532c96c5d6a36ae79a9cad00ef7053e11b738c84c1022f80d8b0afcd2aedea23001f000001346fd8af3d66b14feaa60685fa189ca55cbd7f952fc25cdc971c310122b2402a01085516881012d2729492ba29b11522d3a45f0b70e2a7ab62a4243ec9a67c2a1100015fe60f3e71ba24797be5421c6c702e0a50c3a2178291a7d3dbd9543f5815cb0400000000000000000000000000000000000000000000000000".to_string() }).await.unwrap();

    let reorg_sync_result = light_client.sync_and_await().await;

    match reorg_sync_result {
        Ok(value) => tracing::info!("{value}"),
        Err(err_str) => tracing::info!("{err_str}"),
    }

    // Assert that balance is equal to the initial balance since the
    // sent transaction was never mined and has expired.
    assert_eq!(
        light_client
            .account_balance(zip32::AccountId::ZERO)
            .await
            .unwrap(),
        expected_initial_balance
    );

    let after_reorg_transactions = light_client.value_transfers(true).await.unwrap();

    assert_eq!(after_reorg_transactions.len(), 1);

    tracing::info!("{:?}", light_client.value_transfers(true).await);

    // FIXME: This test is broken because if this issue
    // https://github.com/zingolabs/zingolib/issues/622
    // verify that the reorged transaction is in the new height
    // assert_eq!(
    //     light_client
    //         .list_value_transfers(true)
    //         .await
    //         .into_iter()
    //         .find_map(|v| match v.kind {
    //             ValueTransferKind::Sent { to_address, amount } => {
    //                 if to_address.to_string() == recipient_string && amount == 100000 {
    //                     Some(v.block_height)
    //                 } else {
    //                     None
    //                 }
    //             }
    //             _ => {
    //                 None
    //             }
    //         }),
    //     Some(BlockHeight::from(211))
    // );
}

#[ignore = "darkside block continuity error, after re-org block 206's prev hash does not match 205's hash"]
#[tokio::test]
/// ### Reorg Changes Outbound Tx Index
/// An outbound, pending transaction in a specific block changes height in the event of a reorg
///
/// The wallet handles this change, reflects it appropriately in local storage, and funds remain spendable post confirmation.
///
/// **Pre-conditions:**
///   - Wallet has spendable funds
///
/// 1. Setup w/ default dataset
/// 2. `applyStaged(received_Tx_height)`
/// 3. sync up to `received_Tx_height`
/// 4. create transaction
/// 5. stage 10 empty blocks
/// 6. submit tx at sentTxHeight
///    * a. getIncomingTx
///    * b. stageTransaction(sentTx, sentTxHeight)
///    * c. applyheight(sentTxHeight + 1 )
/// 7. sync to  sentTxHeight + 2
/// 8. stage sentTx and otherTx at sentTxheight
/// 9. applyStaged(sentTx + 2)
/// 10. sync up to `received_Tx_height` + 2
/// 11. verify that the sent tx is mined and balance is correct
/// 12. applyStaged(sentTx + 10)
/// 13. verify that there's no more pending transaction
async fn reorg_changes_outgoing_tx_index() {
    tracing_subscriber::fmt().init();

    let lightwalletd = lightwalletd().await.unwrap();

    let server_id = port_to_localhost_uri(lightwalletd.listen_port());

    prepare_changes_outgoing_tx_height_before_reorg(server_id.clone())
        .await
        .unwrap();

    let wallet_dir = TempDir::new().unwrap();
    let mut light_client = ClientBuilder::new(server_id.clone(), wallet_dir)
        .build_client(
            WalletConfig::MnemonicPhrase {
                mnemonic_phrase: ADVANCED_REORG_TESTS_USER_WALLET.to_string(),
                no_of_accounts: 1.try_into().unwrap(),
                birthday: 202,
                wallet_settings: default_test_wallet_settings(),
            },
            true,
            ActivationHeights::default(),
        )
        .await;

    light_client.sync_and_await().await.unwrap();
    assert_eq!(
        light_client
            .account_balance(zip32::AccountId::ZERO)
            .await
            .unwrap(),
        AccountBalance {
            total_sapling_balance: Some(0.try_into().unwrap()),
            confirmed_sapling_balance: Some(0.try_into().unwrap()),
            unconfirmed_sapling_balance: Some(0.try_into().unwrap()),
            total_orchard_balance: Some(100_000_000.try_into().unwrap()),
            confirmed_orchard_balance: Some(100_000_000.try_into().unwrap()),
            unconfirmed_orchard_balance: Some(0.try_into().unwrap()),
            total_transparent_balance: Some(0.try_into().unwrap()),
            confirmed_transparent_balance: Some(0.try_into().unwrap()),
            unconfirmed_transparent_balance: Some(0.try_into().unwrap())
        }
    );

    let before_reorg_transactions = light_client.value_transfers(true).await.unwrap();

    assert_eq!(before_reorg_transactions.len(), 1);
    assert_eq!(
        before_reorg_transactions[0].blockheight,
        BlockHeight::from_u32(203)
    );

    let connector = DarksideConnector(server_id.clone());

    let recipient_string = "uregtest1z8s5szuww2cnze042e0re2ez8l3d04zvkp7kslxwdha6tp644srd4nh0xlp8a05avzduc6uavqkxv79x53c60hrc0qsgeza3age2g3qualullukd4s0lsn6mtfup4z8jz6xdz2c05zakhafc7pmw0dwugwu9ljevzgyc3mfwxg9slr87k8l7cq075gl3fgxpr85uuvxhxydrskp2303";

    // Send 100000 zatoshi to some address
    let amount: u64 = 100_000;
    let sent_tx_id = from_inputs::quick_send(
        &mut light_client,
        [(recipient_string, amount, None)].to_vec(),
    )
    .await
    .unwrap();

    tracing::info!("SENT TX ID: {sent_tx_id:?}");

    let mut incoming_transaction_stream = connector.get_incoming_transactions().await.unwrap();
    let tx = incoming_transaction_stream
        .message()
        .await
        .unwrap()
        .unwrap();

    let sent_tx_height: i32 = 205;
    _ = connector.apply_staged(sent_tx_height).await;

    light_client.sync_and_await().await.unwrap();

    let expected_after_send_balance = AccountBalance {
        total_sapling_balance: Some(0.try_into().unwrap()),
        confirmed_sapling_balance: Some(0.try_into().unwrap()),
        unconfirmed_sapling_balance: Some(0.try_into().unwrap()),
        total_orchard_balance: Some(99_890_000.try_into().unwrap()),
        confirmed_orchard_balance: Some(0.try_into().unwrap()),
        unconfirmed_orchard_balance: Some(99_890_000.try_into().unwrap()),
        total_transparent_balance: Some(0.try_into().unwrap()),
        confirmed_transparent_balance: Some(0.try_into().unwrap()),
        unconfirmed_transparent_balance: Some(0.try_into().unwrap()),
    };

    assert_eq!(
        light_client
            .account_balance(zip32::AccountId::ZERO)
            .await
            .unwrap(),
        expected_after_send_balance
    );

    // check that the outgoing transaction has the correct height before
    // the reorg is triggered

    assert_eq!(
        light_client
            .value_transfers(true)
            .await
            .unwrap()
            .iter()
            .find_map(|v| match v.kind {
                ValueTransferKind::Sent(SentValueTransfer::Send) => {
                    if let Some(addr) = v.recipient_address.as_ref() {
                        if addr == recipient_string && v.value == 100_000 {
                            Some(v.blockheight)
                        } else {
                            None
                        }
                    } else {
                        None
                    }
                }
                _ => {
                    None
                }
            }),
        Some(BlockHeight::from(sent_tx_height as u32))
    );

    tracing::info!("pre re-org value transfers:");
    tracing::info!("{}", light_client.value_transfers(true).await.unwrap());
    tracing::info!("pre re-org tx summaries:");
    tracing::info!(
        "{}",
        light_client.transaction_summaries(false).await.unwrap()
    );

    //
    // Create reorg
    //

    // stage empty blocks from height 205 to cause a Reorg
    _ = connector.stage_blocks_create(sent_tx_height, 20, 102).await;

    _ = connector
        .stage_transactions_stream(
            [
                (hex::decode(TRANSACTION_TO_FILLER_ADDRESS).unwrap(), 205),
                (tx.clone().data, 205),
            ]
            .to_vec(),
        )
        .await;

    // temp hack as pepper sync needs tree state of latest block for sync status
    connector.add_tree_state(TreeState { network: "regtest".to_string(), height: 224, hash: "015265800472a8aaf96c7891cf7bd63ee1468bb6f3747714a6bd76c40ec9298b".to_string(), time: 1694454562, sapling_tree: "000000".to_string(), orchard_tree: "01532c96c5d6a36ae79a9cad00ef7053e11b738c84c1022f80d8b0afcd2aedea23001f000001346fd8af3d66b14feaa60685fa189ca55cbd7f952fc25cdc971c310122b2402a01085516881012d2729492ba29b11522d3a45f0b70e2a7ab62a4243ec9a67c2a1100015fe60f3e71ba24797be5421c6c702e0a50c3a2178291a7d3dbd9543f5815cb0400000000000000000000000000000000000000000000000000".to_string() }).await.unwrap();

    _ = connector.apply_staged(312).await;

    light_client.sync_and_await().await.unwrap();

    let expected_after_reorg_balance = AccountBalance {
        total_sapling_balance: Some(0.try_into().unwrap()),
        confirmed_sapling_balance: Some(0.try_into().unwrap()),
        unconfirmed_sapling_balance: Some(0.try_into().unwrap()),
        total_orchard_balance: Some(99_890_000.try_into().unwrap()),
        confirmed_orchard_balance: Some(99_890_000.try_into().unwrap()),
        unconfirmed_orchard_balance: Some(0.try_into().unwrap()),
        total_transparent_balance: Some(0.try_into().unwrap()),
        confirmed_transparent_balance: Some(0.try_into().unwrap()),
        unconfirmed_transparent_balance: Some(0.try_into().unwrap()),
    };

    // Assert that balance holds
    assert_eq!(
        light_client
            .account_balance(zip32::AccountId::ZERO)
            .await
            .unwrap(),
        expected_after_reorg_balance
    );

    let after_reorg_transactions = light_client.value_transfers(true).await.unwrap();

    tracing::info!("post re-org value transfers:");
    tracing::info!("{after_reorg_transactions}");
    tracing::info!("post re-org tx summaries:");
    tracing::info!(
        "{}",
        light_client.transaction_summaries(false).await.unwrap()
    );

    // FIXME: assertion is wrong as re-org transaction has lost its outgoing tx data. darkside bug?
    // assert_eq!(after_reorg_transactions.0.len(), 3);

    // FIXME: This test is broken because if this issue
    // https://github.com/zingolabs/zingolib/issues/622
    // verify that the reorged transaction is in the new height
    // assert_eq!(
    //     light_client
    //         .list_value_transfers(true)
    //         .await
    //         .into_iter()
    //         .find_map(|v| match v.kind {
    //             ValueTransferKind::Sent { to_address, amount } => {
    //                 if to_address.to_string() == recipient_string && amount == 100000 {
    //                     Some(v.block_height)
    //                 } else {
    //                     None
    //                 }
    //             }
    //             _ => {
    //                 None
    //             }
    //         }),
    //     Some(BlockHeight::from(205))
    // );
}
// UTILS TESTS
#[tokio::test]
async fn test_read_block_dataset() {
    let dataset_path = format!(
        "{}/{}",
        get_cargo_manifest_dir().to_string_lossy(),
        REORG_CHANGES_INCOMING_TX_HEIGHT_BEFORE
    );
    let blocks = read_dataset(dataset_path);
    assert_eq!(blocks.len(), 21);
}

#[tokio::test]
async fn test_read_tree_state_from_file() {
    let tree_state_path = format!(
        "{}/{}/{}.json",
        get_cargo_manifest_dir().to_string_lossy(),
        TREE_STATE_FOLDER_PATH,
        203
    );

    tracing::info!("{tree_state_path}");

    let tree_state = TreeState::from_file(tree_state_path).unwrap();

    assert_eq!(tree_state.network.as_str(), "regtest");
    assert_eq!(tree_state.height, 203);
    assert_eq!(
        tree_state.hash,
        "016da97020ab191559f34f1d3f992ce2ec7c609cb0e5b932c45f1693eeb2192f"
    );
    assert_eq!(tree_state.time, 1694454196);
    assert_eq!(tree_state.sapling_tree, "000000");
    assert_eq!(
        tree_state.orchard_tree,
        "01136febe0db97210efb679e378d3b3a49d6ac72d0161ae478b1faaa9bd26a2118012246dd85ba2d9510caa03c40f0b75f7b02cb0cfac88ec1c4b9193d58bb6d44201f000001f0328e13a28669f9a5bd2a1c5301549ea28ccb7237347b9c76c05276952ad135016be8aefe4f98825b5539a2b47b90a8057e52c1e1badc725d67c06b4cc2a32e24000000000000000000000000000000000000000000000000000000"
    );
}
