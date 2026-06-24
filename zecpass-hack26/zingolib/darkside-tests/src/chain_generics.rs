#![allow(unused_imports)] // used in tests

use proptest::proptest;
use tokio::runtime::Runtime;

use zingolib::testutils::chain_generics::fixtures;
use zingolib::testutils::int_to_pooltype;
use zingolib::testutils::int_to_shieldedprotocol;

use crate::utils::scenarios::DarksideEnvironment;

proptest! {
    #![proptest_config(proptest::test_runner::Config::with_cases(4))]
    #[ignore = "darkside bug, invalid block hash length in tree states"]
    #[test]
        fn any_source_sends_to_any_receiver_darkside(send_value in 0..50_000u64, change_value in 0..10_000u64, sender_protocol in 1..2, receiver_pool in 1..2) {
        // note: this darkside test does not check the mempool
        Runtime::new().unwrap().block_on(async {
            fixtures::any_source_sends_to_any_receiver::<DarksideEnvironment>(int_to_shieldedprotocol(sender_protocol), int_to_pooltype(receiver_pool), send_value, change_value, false).await;
        });
     }
    #[ignore = "darkside bug, invalid block hash length in tree states"]
    #[test]
    fn any_source_sends_to_any_receiver_0_change_darkside(send_value in 0..50_000u64, sender_protocol in 1..2, receiver_pool in 1..2) {
        Runtime::new().unwrap().block_on(async {
            fixtures::any_source_sends_to_any_receiver::<DarksideEnvironment>(int_to_shieldedprotocol(sender_protocol), int_to_pooltype(receiver_pool), send_value, 0, false).await;
        });
     }
}
pub(crate) mod conduct_chain {
    //! known issues include
    //! when a send includes a transparent note, a new txid is generated, replacing the originally sent txid.

    //!   - these tests cannot portray the full range of network weather.

    use std::num::NonZeroU32;

    use bip0039::Mnemonic;
    use incrementalmerkletree::frontier::CommitmentTree;
    use orchard::tree::MerkleHashOrchard;

    use zcash_protocol::consensus::BlockHeight;
    use zingo_netutils::Indexer as _;

    use zingolib::config::WalletConfig;
    use zingolib::lightclient::DEFAULT_REQUEST_TIMEOUT;
    use zingolib::lightclient::LightClient;
    use zingolib::testutils::chain_generics::conduct_chain::ConductChain;
    use zingolib::testutils::default_test_wallet_settings;
    use zingolib::wallet::LightWallet;
    use zingolib::wallet::keys::unified::ReceiverSelection;

    use crate::constants::ABANDON_TO_DARKSIDE_SAP_10_000_000_ZAT;
    use crate::constants::DARKSIDE_SEED;
    use crate::darkside_types::TreeState;
    use crate::utils::scenarios::DarksideEnvironment;
    use crate::utils::update_tree_states_for_transaction;

    /// doesnt use the full extent of `DarksideEnvironment`, preferring to rely on server truths when ever possible.
    impl ConductChain for DarksideEnvironment {
        async fn setup() -> Self {
            let elf = DarksideEnvironment::new(None).await;
            elf.darkside_connector
                .stage_blocks_create(1, 1, 0)
                .await
                .unwrap();
            elf.darkside_connector.apply_staged(1).await.unwrap();
            elf
        }

        /// the mock chain is fed to the Client via lightwalletd. where is that server to be found?
        fn lightserver_uri(&self) -> Option<http::Uri> {
            Some(self.client_builder.server_id.clone())
        }

        async fn create_faucet(&mut self) -> LightClient {
            self.stage_transaction(ABANDON_TO_DARKSIDE_SAP_10_000_000_ZAT)
                .await;
            let wallet_config = WalletConfig::MnemonicPhrase {
                mnemonic_phrase: DARKSIDE_SEED.to_string(),
                no_of_accounts: NonZeroU32::try_from(1).expect("hard-coded integer"),
                birthday: 1,
                wallet_settings: default_test_wallet_settings(),
            };
            let config = self.client_builder.make_unique_data_dir_and_create_config(
                self.configured_activation_heights,
                wallet_config,
            );
            let mut lightclient = LightClient::new(config, true).await.unwrap();

            lightclient
                .generate_unified_address(ReceiverSelection::sapling_only(), zip32::AccountId::ZERO)
                .await
                .unwrap();

            lightclient
        }

        async fn zingo_config(&mut self) -> zingolib::config::ClientConfig {
            self.client_builder.make_unique_data_dir_and_create_config(
                self.configured_activation_heights,
                WalletConfig::NewSeed {
                    no_of_accounts: 1.try_into().unwrap(),
                    chain_height: 1,
                    wallet_settings: default_test_wallet_settings(),
                },
            )
        }

        async fn increase_chain_height(&mut self) {
            let height_before = zingo_netutils::GrpcIndexer::new(self.lightserver_uri().unwrap())
                .await
                .unwrap()
                .get_latest_block(DEFAULT_REQUEST_TIMEOUT)
                .await
                .unwrap()
                .height;

            let blocks_to_add = 1;

            let mut streamed_raw_txns = self
                .darkside_connector
                .get_incoming_transactions()
                .await
                .unwrap();
            self.darkside_connector
                .clear_incoming_transactions()
                .await
                .unwrap();

            // trees
            let trees = zingo_netutils::GrpcIndexer::new(self.client_builder.server_id.clone())
                .await
                .unwrap()
                .get_tree_state(
                    zingo_netutils::lightwallet_protocol::BlockId {
                        height: height_before,
                        hash: vec![],
                    },
                    DEFAULT_REQUEST_TIMEOUT,
                )
                .await
                .unwrap();
            let mut sapling_tree: sapling_crypto::CommitmentTree =
                zcash_primitives::merkle_tree::read_commitment_tree(
                    hex::decode(trees.sapling_tree).unwrap().as_slice(),
                )
                .unwrap();
            let mut orchard_tree: CommitmentTree<MerkleHashOrchard, 32> =
                zcash_primitives::merkle_tree::read_commitment_tree(
                    hex::decode(trees.orchard_tree).unwrap().as_slice(),
                )
                .unwrap();

            self.darkside_connector
                .stage_blocks_create(height_before as i32 + 1, blocks_to_add, 0)
                .await
                .unwrap();

            let new_height = (height_before as i32 + blocks_to_add) as u64;

            loop {
                let maybe_raw_tx = streamed_raw_txns.message().await.unwrap();
                match maybe_raw_tx {
                    None => break,
                    Some(raw_tx) => {
                        // increase chain height
                        self.darkside_connector
                            .stage_transactions_stream(vec![(raw_tx.data.clone(), new_height)])
                            .await
                            .unwrap();

                        //trees
                        let transaction = zcash_primitives::transaction::Transaction::read(
                            raw_tx.data.as_slice(),
                            zcash_protocol::consensus::BranchId::Nu6,
                        )
                        .unwrap();
                        for output in transaction
                            .sapling_bundle()
                            .iter()
                            .flat_map(|bundle| bundle.shielded_outputs())
                        {
                            sapling_tree
                                .append(sapling_crypto::Node::from_cmu(output.cmu()))
                                .unwrap();
                        }
                        for action in transaction
                            .orchard_bundle()
                            .iter()
                            .flat_map(|bundle| bundle.actions())
                        {
                            orchard_tree
                                .append(MerkleHashOrchard::from_cmx(action.cmx()))
                                .unwrap();
                        }
                    }
                }
            }

            //trees
            let mut sapling_tree_bytes = vec![];
            zcash_primitives::merkle_tree::write_commitment_tree(
                &sapling_tree,
                &mut sapling_tree_bytes,
            )
            .unwrap();
            let mut orchard_tree_bytes = vec![];
            zcash_primitives::merkle_tree::write_commitment_tree(
                &orchard_tree,
                &mut orchard_tree_bytes,
            )
            .unwrap();
            let new_tree_state = TreeState {
                height: new_height,
                sapling_tree: hex::encode(sapling_tree_bytes),
                orchard_tree: hex::encode(orchard_tree_bytes),
                network: crate::constants::first_tree_state().network,
                hash: String::new(),
                time: 0,
            };
            self.darkside_connector
                .add_tree_state(new_tree_state)
                .await
                .unwrap();

            self.darkside_connector
                .apply_staged(new_height as i32)
                .await
                .unwrap();
        }

        fn confirmation_patience_blocks(&self) -> usize {
            1
        }
    }
}
