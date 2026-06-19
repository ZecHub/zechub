//! libtonode tests use zcashd regtest mode to mock a chain

use zcash_local_net::LocalNet;
use zcash_local_net::indexer::Indexer;
use zcash_local_net::validator::Validator;

use zingolib::config::WalletConfig;
use zingolib::lightclient::LightClient;
use zingolib::testutils::chain_generics::conduct_chain::ConductChain;
use zingolib::testutils::default_test_wallet_settings;
use zingolib::testutils::port_to_localhost_uri;
use zingolib::testutils::timestamped_test_log;

use zingolib_testutils::scenarios::ClientBuilder;
use zingolib_testutils::scenarios::custom_clients_default;
use zingolib_testutils::scenarios::network_combo::{DefaultIndexer, DefaultValidator};

/// includes utilities for connecting to zcashd regtest
pub struct LibtonodeEnvironment {
    /// Local network
    pub local_net: LocalNet<DefaultValidator, DefaultIndexer>,
    /// Client builder
    pub client_builder: ClientBuilder,
}

/// known issues include --slow
/// these tests cannot portray the full range of network weather.
impl ConductChain for LibtonodeEnvironment {
    async fn setup() -> Self {
        timestamped_test_log("starting mock libtonode network");
        let (local_net, client_builder) = custom_clients_default().await;

        LibtonodeEnvironment {
            local_net,
            client_builder,
        }
    }

    async fn create_faucet(&mut self) -> LightClient {
        self.client_builder
            .build_faucet(
                false,
                self.local_net.validator().get_activation_heights().await,
            )
            .await
    }

    async fn zingo_config(&mut self) -> zingolib::config::ClientConfig {
        self.client_builder.make_unique_data_dir_and_create_config(
            self.local_net.validator().get_activation_heights().await,
            WalletConfig::NewSeed {
                no_of_accounts: 1.try_into().unwrap(),
                chain_height: 1,
                wallet_settings: default_test_wallet_settings(),
            },
        )
    }

    async fn increase_chain_height(&mut self) {
        let start_height = self.local_net.validator().get_chain_height().await;
        self.local_net
            .validator()
            .generate_blocks(1)
            .await
            .expect("Called for side effect, failed!");
        assert_eq!(
            self.local_net.validator().get_chain_height().await,
            start_height + 1
        );
    }

    fn lightserver_uri(&self) -> Option<http::Uri> {
        Some(port_to_localhost_uri(
            self.local_net.indexer().listen_port(),
        ))
    }

    fn confirmation_patience_blocks(&self) -> usize {
        1
    }
}
