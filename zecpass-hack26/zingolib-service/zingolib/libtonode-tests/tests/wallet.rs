#![forbid(unsafe_code)]
mod load_wallet {
    use zcash_local_net::validator::Validator as _;
    use zingolib::{get_base_address_macro, testutils::lightclient::from_inputs};
    use zingolib_testutils::scenarios::{self, increase_height_and_wait_for_client};

    // FIXME: sync integration semi-complete, need to transribe all the old do_list_transactions printouts to new types
    // #[tokio::test]
    // async fn load_old_wallet_at_reorged_height() {
    //     let regtest_network = RegtestNetwork::new(1, 1, 1, 1, 1, 1, 200);
    //     let (ref regtest_manager, cph, ref faucet) = scenarios::faucet(
    //         PoolType::Shielded(ShieldedProtocol::Orchard),
    //         regtest_network,
    //         false,
    //     )
    //     .await;
    //     tracing::info!("Shutting down initial zcd/lwd unneeded processes");
    //     drop(cph);

    //     let zcd_datadir = &regtest_manager.zcashd_data_dir;
    //     let zingo_datadir = &regtest_manager.zingo_datadir;
    //     // This test is the unique consumer of:
    //     // zingolib/src/testvectors/old_wallet_reorg_test_wallet
    //     let cached_data_dir = get_cargo_manifest_dir()
    //         .parent()
    //         .unwrap()
    //         .join("zingolib/src/testvectors")
    //         .join("old_wallet_reorg_test_wallet");
    //     let zcd_source = cached_data_dir
    //         .join("zcashd")
    //         .join(".")
    //         .to_string_lossy()
    //         .to_string();
    //     let zcd_dest = zcd_datadir.to_string_lossy().to_string();
    //     std::process::Command::new("rm")
    //         .arg("-r")
    //         .arg(&zcd_dest)
    //         .output()
    //         .expect("directory rm failed");
    //     std::fs::DirBuilder::new()
    //         .create(&zcd_dest)
    //         .expect("Dir recreate failed");
    //     std::process::Command::new("cp")
    //         .arg("-r")
    //         .arg(zcd_source)
    //         .arg(zcd_dest)
    //         .output()
    //         .expect("directory copy failed");
    //     let zingo_source = cached_data_dir
    //         .join("zingo-wallet.dat")
    //         .to_string_lossy()
    //         .to_string();
    //     let zingo_dest = zingo_datadir.to_string_lossy().to_string();
    //     std::process::Command::new("cp")
    //         .arg("-f")
    //         .arg(zingo_source)
    //         .arg(&zingo_dest)
    //         .output()
    //         .expect("wallet copy failed");
    //     let _cph = regtest_manager.launch(false).unwrap();
    //     tracing::info!("loading wallet");

    //     let recipient = examples::NetworkSeedVersion::Regtest(
    //         examples::RegtestSeedVersion::HospitalMuseum(examples::HospitalMuseumVersion::V27),
    //     )
    //     .load_example_wallet_with_client()
    //     .await;

    //     let expected_pre_sync_transactions = r#"[
    //   {
    //     "outgoing_metadata": [],
    //     "amount": 100000,
    //     "memo": "null, null",
    //     "block_height": 3,
    //     "pending": false,
    //     "datetime": 1692212261,
    //     "position": 0,
    //     "txid": "7a9d41caca143013ebd2f710e4dad04f0eb9f0ae98b42af0f58f25c61a9d439e",
    //     "zec_price": null,
    //     "address": "uregtest1wdukkmv5p5n824e8ytnc3m6m77v9vwwl7hcpj0wangf6z23f9x0fnaen625dxgn8cgp67vzw6swuar6uwp3nqywfvvkuqrhdjffxjfg644uthqazrtxhrgwac0a6ujzgwp8y9cwthjeayq8r0q6786yugzzyt9vevxn7peujlw8kp3vf6d8p4fvvpd8qd5p7xt2uagelmtf3vl6w3u8"
    //   },
    //   {
    //     "outgoing_metadata": [],
    //     "amount": 50000,
    //     "memo": "null, null",
    //     "block_height": 8,
    //     "pending": false,
    //     "datetime": 1692212266,
    //     "position": 0,
    //     "txid": "122f8ab8dc5483e36256a4fbd7ff8d60eb7196670716a6690f9215f1c2a4d841",
    //     "zec_price": null,
    //     "address": "uregtest1wdukkmv5p5n824e8ytnc3m6m77v9vwwl7hcpj0wangf6z23f9x0fnaen625dxgn8cgp67vzw6swuar6uwp3nqywfvvkuqrhdjffxjfg644uthqazrtxhrgwac0a6ujzgwp8y9cwthjeayq8r0q6786yugzzyt9vevxn7peujlw8kp3vf6d8p4fvvpd8qd5p7xt2uagelmtf3vl6w3u8"
    //   },
    //   {
    //     "outgoing_metadata": [],
    //     "amount": 30000,
    //     "memo": "null, null",
    //     "block_height": 9,
    //     "pending": false,
    //     "datetime": 1692212299,
    //     "position": 0,
    //     "txid": "0a014017add7dc9eb57ada3e70f905c9dce610ef055e135b03f4907dd5dc99a4",
    //     "zec_price": null,
    //     "address": "uregtest1wdukkmv5p5n824e8ytnc3m6m77v9vwwl7hcpj0wangf6z23f9x0fnaen625dxgn8cgp67vzw6swuar6uwp3nqywfvvkuqrhdjffxjfg644uthqazrtxhrgwac0a6ujzgwp8y9cwthjeayq8r0q6786yugzzyt9vevxn7peujlw8kp3vf6d8p4fvvpd8qd5p7xt2uagelmtf3vl6w3u8"
    //   }
    // ]"#;
    //     assert_eq!(
    //         expected_pre_sync_transactions,
    //         recipient.do_list_transactions().await.pretty(2)
    //     );
    //     recipient.do_sync(false).await.unwrap();
    //     let expected_post_sync_transactions = r#"[
    //   {
    //     "outgoing_metadata": [],
    //     "amount": 100000,
    //     "memo": "null, null",
    //     "block_height": 3,
    //     "pending": false,
    //     "datetime": 1692212261,
    //     "position": 0,
    //     "txid": "7a9d41caca143013ebd2f710e4dad04f0eb9f0ae98b42af0f58f25c61a9d439e",
    //     "zec_price": null,
    //     "address": "uregtest1wdukkmv5p5n824e8ytnc3m6m77v9vwwl7hcpj0wangf6z23f9x0fnaen625dxgn8cgp67vzw6swuar6uwp3nqywfvvkuqrhdjffxjfg644uthqazrtxhrgwac0a6ujzgwp8y9cwthjeayq8r0q6786yugzzyt9vevxn7peujlw8kp3vf6d8p4fvvpd8qd5p7xt2uagelmtf3vl6w3u8"
    //   },
    //   {
    //     "outgoing_metadata": [],
    //     "amount": 50000,
    //     "memo": "null, null",
    //     "block_height": 8,
    //     "pending": false,
    //     "datetime": 1692212266,
    //     "position": 0,
    //     "txid": "122f8ab8dc5483e36256a4fbd7ff8d60eb7196670716a6690f9215f1c2a4d841",
    //     "zec_price": null,
    //     "address": "uregtest1wdukkmv5p5n824e8ytnc3m6m77v9vwwl7hcpj0wangf6z23f9x0fnaen625dxgn8cgp67vzw6swuar6uwp3nqywfvvkuqrhdjffxjfg644uthqazrtxhrgwac0a6ujzgwp8y9cwthjeayq8r0q6786yugzzyt9vevxn7peujlw8kp3vf6d8p4fvvpd8qd5p7xt2uagelmtf3vl6w3u8"
    //   }
    // ]"#;
    //     assert_eq!(
    //         expected_post_sync_transactions,
    //         recipient.do_list_transactions().await.pretty(2)
    //     );
    //     let expected_post_sync_balance = PoolBalances {
    //         sapling_balance: Some(0),
    //         verified_sapling_balance: Some(0),
    //         spendable_sapling_balance: Some(0),
    //         unverified_sapling_balance: Some(0),
    //         orchard_balance: Some(150000),
    //         verified_orchard_balance: Some(150000),
    //         spendable_orchard_balance: Some(150000),
    //         unverified_orchard_balance: Some(0),
    //         transparent_balance: Some(0),
    //     };
    //     assert_eq!(expected_post_sync_balance, recipient.do_balance().await);
    //     let missing_output_index = from_inputs::quick_send(
    //         &recipient,
    //         vec![(&get_base_address_macro!(faucet, "unified"), 14000, None)],
    //     )
    //     .await;
    //     if let Err(QuickSendError::ProposeSend(Proposal(
    //                 zcash_client_backend::data_api::error::Error::DataSource(zingolib::wallet::tx_map::TxMapTraitError::InputSource(
    //                     zingolib::wallet::transaction_records_by_id::trait_inputsource::InputSourceError::MissingOutputIndexes(output_error)
    //                 )),
    //             ))) = missing_output_index {
    //             let txid1 = utils::conversion::txid_from_hex_encoded_str("122f8ab8dc5483e36256a4fbd7ff8d60eb7196670716a6690f9215f1c2a4d841").unwrap();
    //             let txid2 = utils::conversion::txid_from_hex_encoded_str("7a9d41caca143013ebd2f710e4dad04f0eb9f0ae98b42af0f58f25c61a9d439e").unwrap();
    //             let expected_txids = vec![txid1, txid2];
    //             // in case the txids are in reverse order
    //             let missing_index_txids: Vec<zcash_primitives::transaction::TxId> = output_error.into_iter().map(|(txid, _)| txid).collect();
    //             if missing_index_txids != expected_txids {
    //                 let expected_txids = vec![txid2, txid1];
    //                 assert!(missing_index_txids == expected_txids, "{:?}\n\n{:?}", missing_index_txids, expected_txids);
    //             }
    //         };
    // }

    #[tokio::test]
    async fn verify_old_wallet_uses_server_height_in_send() {
        // An earlier version of zingolib used the _wallet's_ 'height' when
        // constructing transactions.  This worked well enough when the
        // client completed sync prior to sending, but when we introduced
        // interrupting send, it made it immediately obvious that this was
        // the wrong height to use!  The correct height is the
        // "mempool height" which is the server_height + 1
        let (local_net, mut faucet, recipient) = scenarios::faucet_recipient_default().await;
        // Ensure that the client has confirmed spendable funds
        increase_height_and_wait_for_client(&local_net, &mut faucet, 5)
            .await
            .unwrap();

        // Without sync push server forward 2 blocks
        local_net.validator().generate_blocks(2).await.unwrap();
        let client_fully_scanned_height = faucet
            .wallet()
            .read()
            .await
            .sync_state
            .fully_scanned_height()
            .unwrap();

        // Verify that wallet is still back at 6.
        assert_eq!(client_fully_scanned_height, 8.into());

        // Interrupt generating send
        from_inputs::quick_send(
            &mut faucet,
            vec![(
                &get_base_address_macro!(recipient, "unified"),
                10_000,
                Some("Interrupting sync!!"),
            )],
        )
        .await
        .unwrap();
    }
}
