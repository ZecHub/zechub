use darkside_tests::darkside_connector::DarksideConnector;
use darkside_tests::utils::prepare_darksidewalletd;
use darkside_tests::utils::update_tree_states_for_transaction;
use tempfile::TempDir;
use zcash_local_net::indexer::Indexer;
use zingo_common_components::protocol::ActivationHeights;
use zingo_test_vectors::seeds::DARKSIDE_SEED;
use zingolib::config::ChainType;
use zingolib::config::ClientConfig;
use zingolib::config::WalletConfig;
use zingolib::get_base_address_macro;
use zingolib::lightclient::LightClient;
use zingolib::testutils::default_test_wallet_settings;
use zingolib::testutils::lightclient::from_inputs;
use zingolib::testutils::port_to_localhost_uri;
use zingolib::testutils::tempfile;
use zingolib::wallet::balance::AccountBalance;
use zingolib_testutils::scenarios::ClientBuilder;

use darkside_tests::utils::lightwalletd;

#[ignore = "darkside bug, invalid block hash length in tree states"]
#[tokio::test]
async fn simple_sync() {
    let lightwalletd = lightwalletd().await.unwrap();

    let server_id = port_to_localhost_uri(lightwalletd.listen_port());
    prepare_darksidewalletd(server_id.clone(), true)
        .await
        .unwrap();
    let activation_heights = ActivationHeights::default();
    let wallet_dir = TempDir::new().unwrap();
    let mut light_client = ClientBuilder::new(server_id, wallet_dir)
        .build_client(
            WalletConfig::MnemonicPhrase {
                mnemonic_phrase: DARKSIDE_SEED.to_string(),
                no_of_accounts: 1.try_into().unwrap(),
                birthday: 1,
                wallet_settings: default_test_wallet_settings(),
            },
            true,
            activation_heights,
        )
        .await;

    let result = light_client.sync_and_await().await.unwrap();

    tracing::info!("{result}");

    assert_eq!(result.sync_end_height, 3.into());
    assert_eq!(result.blocks_scanned, 3);
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
}

#[ignore = "investigate invalid block hash length"]
#[tokio::test]
async fn reorg_receipt_sync_generic() {
    let lightwalletd = lightwalletd().await.unwrap();

    let server_id = port_to_localhost_uri(lightwalletd.listen_port());
    prepare_darksidewalletd(server_id.clone(), true)
        .await
        .unwrap();

    let activation_heights = ActivationHeights::default();
    let wallet_dir = TempDir::new().unwrap();
    let mut light_client = ClientBuilder::new(server_id.clone(), wallet_dir)
        .build_client(
            WalletConfig::MnemonicPhrase {
                mnemonic_phrase: DARKSIDE_SEED.to_string(),
                no_of_accounts: 1.try_into().unwrap(),
                birthday: 1,
                wallet_settings: default_test_wallet_settings(),
            },
            true,
            activation_heights,
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
    prepare_darksidewalletd(server_id.clone(), false)
        .await
        .unwrap();
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
            total_orchard_balance: Some(0.try_into().unwrap()),
            confirmed_orchard_balance: Some(0.try_into().unwrap()),
            unconfirmed_orchard_balance: Some(0.try_into().unwrap()),
            total_transparent_balance: Some(0.try_into().unwrap()),
            confirmed_transparent_balance: Some(0.try_into().unwrap()),
            unconfirmed_transparent_balance: Some(0.try_into().unwrap())
        }
    );
}

#[ignore = "investigate invalid block hash length"]
#[tokio::test]
async fn sent_transaction_reorged_into_mempool() {
    let lightwalletd = lightwalletd().await.unwrap();

    let server_id = port_to_localhost_uri(lightwalletd.listen_port());
    prepare_darksidewalletd(server_id.clone(), true)
        .await
        .unwrap();

    let wallet_dir = TempDir::new().unwrap();
    let mut client_manager = ClientBuilder::new(server_id.clone(), wallet_dir);
    let activation_heights = ActivationHeights::default();
    let mut light_client = client_manager
        .build_client(
            WalletConfig::MnemonicPhrase {
                mnemonic_phrase: DARKSIDE_SEED.to_string(),
                no_of_accounts: 1.try_into().unwrap(),
                birthday: 1,
                wallet_settings: default_test_wallet_settings(),
            },
            true,
            activation_heights,
        )
        .await;
    let mut recipient = client_manager
        .build_client(
            WalletConfig::MnemonicPhrase {
                mnemonic_phrase: zingo_test_vectors::seeds::HOSPITAL_MUSEUM_SEED.to_string(),
                no_of_accounts: 1.try_into().unwrap(),
                birthday: 1,
                wallet_settings: default_test_wallet_settings(),
            },
            true,
            activation_heights,
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
    let one_txid = from_inputs::quick_send(
        &mut light_client,
        vec![(&get_base_address_macro!(recipient, "unified"), 10_000, None)],
    )
    .await
    .unwrap();
    tracing::info!("{}", one_txid.first());
    recipient.sync_and_await().await.unwrap();

    let connector = DarksideConnector(server_id.clone());
    let mut streamed_raw_txns = connector.get_incoming_transactions().await.unwrap();
    let raw_tx = streamed_raw_txns.message().await.unwrap().unwrap();
    // There should only be one transaction incoming
    assert!(streamed_raw_txns.message().await.unwrap().is_none());
    connector
        .stage_transactions_stream(vec![(raw_tx.data.clone(), 4)])
        .await
        .unwrap();
    connector.stage_blocks_create(4, 1, 0).await.unwrap();
    update_tree_states_for_transaction(&server_id, raw_tx.clone(), 4).await;
    connector.apply_staged(4).await.unwrap();
    tokio::time::sleep(std::time::Duration::from_secs(1)).await;

    recipient.sync_and_await().await.unwrap();
    //  light_client.do_sync(false).await.unwrap();
    tracing::info!(
        "Recipient pre-reorg: {}",
        &recipient
            .account_balance(zip32::AccountId::ZERO)
            .await
            .unwrap()
    );
    tracing::info!(
        "Sender pre-reorg (unsynced): {}",
        &light_client
            .account_balance(zip32::AccountId::ZERO)
            .await
            .unwrap()
    );

    prepare_darksidewalletd(server_id.clone(), true)
        .await
        .unwrap();
    let connector = DarksideConnector(server_id.clone());
    connector.stage_blocks_create(4, 102, 0).await.unwrap();
    connector.apply_staged(105).await.unwrap();
    tokio::time::sleep(std::time::Duration::from_secs(1)).await;

    recipient.sync_and_await().await.unwrap();
    light_client.sync_and_await().await.unwrap();
    tracing::info!(
        "Recipient post-reorg: {}",
        &recipient
            .account_balance(zip32::AccountId::ZERO)
            .await
            .unwrap()
    );
    tracing::info!(
        "Sender post-reorg: {}",
        &light_client
            .account_balance(zip32::AccountId::ZERO)
            .await
            .unwrap()
    );

    light_client.save_task().await;
    light_client.wait_for_save().await;
    light_client.shutdown_save_task().await.unwrap();

    let config = ClientConfig::builder()
        .set_indexer_uri(client_manager.server_id.clone())
        .set_chain_type(ChainType::Regtest(activation_heights))
        .set_wallet_dir(light_client.wallet_dir().unwrap())
        .set_wallet_config(WalletConfig::Read)
        .build();
    let mut loaded_client = LightClient::new(config, true).await.unwrap();

    loaded_client.sync_and_await().await.unwrap();
    assert_eq!(
        loaded_client
            .account_balance(zip32::AccountId::ZERO)
            .await
            .unwrap()
            .total_orchard_balance
            .unwrap()
            .into_u64(),
        100000000
    );
}
