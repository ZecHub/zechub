use std::{num::NonZeroU32, time::Duration};

use shardtree::store::ShardStore;
use zcash_local_net::validator::Validator;
use zcash_protocol::consensus::BlockHeight;
use zingo_common_components::protocol::ActivationHeights;
use zingo_test_vectors::seeds::HOSPITAL_MUSEUM_SEED;
use zingolib::config::{ChainType, ClientConfig, WalletConfig};
use zingolib::testutils::default_test_wallet_settings;
use zingolib::testutils::lightclient::from_inputs::quick_send;
use zingolib::testutils::paths::get_cargo_manifest_dir;
use zingolib::testutils::tempfile::TempDir;
use zingolib::{
    config::{DEFAULT_INDEXER_URI, construct_lightwalletd_uri},
    get_base_address_macro,
    lightclient::LightClient,
    testutils::lightclient::from_inputs::{self},
};
use zingolib_testutils::scenarios::{self, increase_height_and_wait_for_client};

#[ignore = "temporary mainnet test for sync development"]
#[tokio::test]
async fn sync_mainnet_test() {
    rustls::crypto::ring::default_provider()
        .install_default()
        .expect("Ring to work as a default");
    tracing_subscriber::fmt().init();

    let uri = construct_lightwalletd_uri(Some(DEFAULT_INDEXER_URI.to_string())).unwrap();
    let temp_dir = TempDir::new().unwrap();
    let temp_path = temp_dir.path().to_path_buf();
    let config = ClientConfig::builder()
        .set_indexer_uri(uri.clone())
        .set_chain_type(ChainType::Mainnet)
        .set_wallet_dir(temp_path)
        .set_wallet_config(WalletConfig::MnemonicPhrase {
            mnemonic_phrase: HOSPITAL_MUSEUM_SEED.to_string(),
            no_of_accounts: NonZeroU32::try_from(1).expect("hard-coded integer"),
            birthday: 1_500_000,
            wallet_settings: default_test_wallet_settings(),
        })
        .build();
    let mut lightclient = LightClient::new(config, true).await.unwrap();

    lightclient.sync().await.unwrap();
    let mut interval = tokio::time::interval(Duration::from_secs(5));
    loop {
        interval.tick().await;
        {
            let wallet = lightclient.wallet().read().await;
            tracing::info!(
                "{}",
                json::JsonValue::from(pepper_sync::sync_status(&*wallet).await.unwrap())
            );
            tracing::info!("WALLET DEBUG:");
            tracing::info!("uas: {}", wallet.unified_addresses().len());
            tracing::info!("taddrs: {}", wallet.transparent_addresses().len());
            tracing::info!("blocks: {}", wallet.wallet_blocks.len());
            tracing::info!("txs: {}", wallet.wallet_transactions.len());
            tracing::info!("nullifiers o: {}", wallet.nullifier_map.orchard.len());
            tracing::info!("nullifiers s: {}", wallet.nullifier_map.sapling.len());
            tracing::info!("outpoints: {}", wallet.outpoint_map.len());
        }
        lightclient.wallet().write().await.save().unwrap();
    }

    // let wallet = lightclient.wallet.read().await;
    // dbg!(&wallet.wallet_blocks);
    // dbg!(&wallet.nullifier_map);
    // dbg!(&wallet.sync_state);
}

#[ignore = "mainnet test for large chain"]
#[tokio::test]
async fn sync_status() {
    rustls::crypto::ring::default_provider()
        .install_default()
        .expect("Ring to work as a default");
    tracing_subscriber::fmt().init();

    let uri = construct_lightwalletd_uri(Some(DEFAULT_INDEXER_URI.to_string())).unwrap();
    let temp_dir = TempDir::new().unwrap();
    let temp_path = temp_dir.path().to_path_buf();
    let config = ClientConfig::builder()
        .set_indexer_uri(uri.clone())
        .set_chain_type(ChainType::Mainnet)
        .set_wallet_dir(temp_path)
        .set_wallet_config(WalletConfig::MnemonicPhrase {
            mnemonic_phrase: HOSPITAL_MUSEUM_SEED.to_string(),
            no_of_accounts: NonZeroU32::try_from(1).expect("hard-coded integer"),
            birthday: 2_496_152,
            wallet_settings: default_test_wallet_settings(),
        })
        .build();
    let mut lightclient = LightClient::new(config, true).await.unwrap();

    lightclient.sync_and_await().await.unwrap();
}

// temporary test for sync development
#[ignore = "sync development only"]
#[allow(unused_mut, unused_variables)]
#[tokio::test]
async fn sync_test() {
    tracing_subscriber::fmt().init();

    let (_local_net, mut faucet, mut recipient, _txid) =
        scenarios::faucet_funded_recipient_default(5_000_000).await;

    // let recipient_ua = get_base_address_macro!(&recipient, "unified");
    let recipient_taddr = get_base_address_macro!(&recipient, "transparent");
    from_inputs::quick_send(&mut faucet, vec![(&recipient_taddr, 100_000, None)])
        .await
        .unwrap();

    recipient.sync_and_await().await.unwrap();

    // increase_height_and_wait_for_client(&regtest_manager, &mut recipient, 1)
    //     .await
    //     .unwrap();

    // tracing::info!("{}", recipient.transaction_summaries().await.unwrap());
    tracing::info!("{}", recipient.value_transfers(false).await.unwrap());
    tracing::info!(
        "{}",
        recipient
            .account_balance(zip32::AccountId::ZERO)
            .await
            .unwrap()
    );
    tracing::info!(
        "{:?}",
        recipient.propose_shield(zip32::AccountId::ZERO).await
    );

    // tracing::info!(
    //     "{:?}",
    //     recipient
    //         .get_spendable_shielded_balance(
    //             zcash_address::ZcashAddress::try_from_encoded(&recipient_ua).unwrap(),
    //             false
    //         )
    //         .await
    //         .unwrap()
    // );
    // let wallet = recipient.wallet.lock().await;
    // dbg!(wallet.wallet_blocks.len());
}

#[ignore = "only for building chain cache"]
#[tokio::test]
async fn store_all_checkpoints_in_verification_window_chain_cache() {
    let (mut local_net, mut faucet, recipient) = scenarios::faucet_recipient_default().await;

    let recipient_orchard_addr = get_base_address_macro!(recipient, "unified");
    let recipient_sapling_addr = get_base_address_macro!(recipient, "sapling");

    for _ in 0..27 {
        quick_send(&mut faucet, vec![(&recipient_orchard_addr, 10_000, None)])
            .await
            .unwrap();
        increase_height_and_wait_for_client(&local_net, &mut faucet, 1)
            .await
            .unwrap();

        quick_send(&mut faucet, vec![(&recipient_sapling_addr, 10_000, None)])
            .await
            .unwrap();
        increase_height_and_wait_for_client(&local_net, &mut faucet, 1)
            .await
            .unwrap();

        quick_send(&mut faucet, vec![(&recipient_orchard_addr, 10_000, None)])
            .await
            .unwrap();
        quick_send(&mut faucet, vec![(&recipient_sapling_addr, 10_000, None)])
            .await
            .unwrap();
        increase_height_and_wait_for_client(&local_net, &mut faucet, 2)
            .await
            .unwrap();
    }

    local_net
        .validator_mut()
        .cache_chain(get_cargo_manifest_dir().join("store_all_checkpoints_test"))
        .await;
}

#[ignore = "ignored until we add framework for chain caches as we don't want to check these into the zingolib repo"]
#[tokio::test]
async fn store_all_checkpoints_in_verification_window() {
    let (_local_net, lightclient) = scenarios::unfunded_client(
        ActivationHeights::default(),
        Some(get_cargo_manifest_dir().join("store_all_checkpoints_test")),
    )
    .await;

    for height in 12..112 {
        assert!(
            lightclient
                .wallet()
                .read()
                .await
                .shard_trees
                .sapling
                .store()
                .get_checkpoint(&BlockHeight::from_u32(height))
                .unwrap()
                .is_some(),
            "missing sapling checkpoint at height {height}"
        );
        assert!(
            lightclient
                .wallet()
                .read()
                .await
                .shard_trees
                .orchard
                .store()
                .get_checkpoint(&BlockHeight::from_u32(height))
                .unwrap()
                .is_some(),
            "missing orchard checkpoint at height {height}"
        );
    }
}
