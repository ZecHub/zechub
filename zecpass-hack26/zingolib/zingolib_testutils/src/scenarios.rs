//! In practice there are several common scenarios for which helpers are provided.
//! These scenarios vary in the configuration of clients in use.  Most scenarios
//! require some funds, the simplest way to access funds is to use a "faucet".
//! A "faucet" is a client that receives mining rewards (because its spend capability
//! generated the address registered as the `minetoaddress` in the zcash.conf that's
//! used by the 'regetst mode' zcashs backing these tests.).
//! HELPERS:
//! If you just need a faucet, use the "faucet" helper.
//! If you need a faucet, and a single recipient, use 'faucet_recipient`
//! For less common client configurations use the client builder directly with
//! custom_clients
//! All scenarios have a default (i.e. faucet_default) which take minimal parameters and
//! build the scenario with the most common settings. This simplifies test writing in
//! most cases by removing the need for configuration.

use std::path::PathBuf;

use portpicker::Port;
use tempfile::TempDir;
use zcash_protocol::PoolType;

use zcash_local_net::LocalNet;
use zcash_local_net::ProcessId;
use zcash_local_net::indexer::{Indexer, IndexerConfig};
use zcash_local_net::logs::LogsToStdoutAndStderr;
use zcash_local_net::process::Process;
use zcash_local_net::validator::{Validator, ValidatorConfig};

use network_combo::DefaultIndexer;
use network_combo::DefaultValidator;
use zingo_common_components::protocol::ActivationHeights;
use zingo_test_vectors::{FUND_OFFLOAD_ORCHARD_ONLY, seeds};
use zingolib::config::WalletConfig;
use zingolib::config::{ChainType, ClientConfig};
use zingolib::get_base_address_macro;
use zingolib::lightclient::LightClient;
use zingolib::lightclient::error::LightClientError;
use zingolib::testutils::default_test_wallet_settings;
use zingolib::testutils::lightclient::from_inputs::{self, quick_send};
use zingolib::testutils::lightclient::get_base_address;
use zingolib::testutils::port_to_localhost_uri;
use zingolib::testutils::sync_to_target_height;
use zingolib::wallet::keys::unified::ReceiverSelection;

/// Default regtest network processes for testing and zingo-cli regtest mode
#[cfg(feature = "test_zainod_zcashd")]
#[allow(missing_docs)]
pub mod network_combo {
    pub type DefaultIndexer = zcash_local_net::indexer::zainod::Zainod;
    pub type DefaultValidator = zcash_local_net::validator::zcashd::Zcashd;
}
/// Default regtest network processes for testing and zingo-cli regtest mode
#[cfg(all(not(feature = "test_zainod_zcashd"), feature = "test_lwd_zebrad"))]
#[allow(missing_docs)]
pub mod network_combo {
    pub type DefaultIndexer = zcash_local_net::indexer::lightwalletd::Lightwalletd;
    pub type DefaultValidator = zcash_local_net::validator::zebrad::Zebrad;
}
/// Default regtest network processes for testing and zingo-cli regtest mode
#[cfg(all(
    not(feature = "test_zainod_zcashd"),
    not(feature = "test_lwd_zebrad"),
    feature = "test_lwd_zcashd"
))]
#[allow(missing_docs)]
pub mod network_combo {
    pub type DefaultIndexer = zcash_local_net::indexer::lightwalletd::Lightwalletd;
    pub type DefaultValidator = zcash_local_net::validator::zcashd::Zcashd;
}
/// Default regtest network processes for testing and zingo-cli regtest mode
#[cfg(not(any(
    feature = "test_zainod_zcashd",
    feature = "test_lwd_zebrad",
    feature = "test_lwd_zcashd"
)))]
#[allow(missing_docs)]
pub mod network_combo {
    pub type DefaultIndexer = zcash_local_net::indexer::zainod::Zainod;
    pub type DefaultValidator = zcash_local_net::validator::zebrad::Zebrad;
}

/// To launch a `LocalNet` with darkside settings.
pub async fn launch_test<V, I>(
    indexer_listen_port: Option<Port>,
    mine_to_pool: PoolType,
    configured_activation_heights: ActivationHeights,
    chain_cache: Option<PathBuf>,
) -> LocalNet<V, I>
where
    V: Validator + LogsToStdoutAndStderr + Send,
    <V as Process>::Config: Send + ValidatorConfig + Default,
    I: Indexer + LogsToStdoutAndStderr,
    <I as Process>::Config: Send + IndexerConfig + Default,
{
    let mut validator_config = <V as Process>::Config::default();
    validator_config.set_test_parameters(mine_to_pool, configured_activation_heights, chain_cache);
    let mut indexer_config = <I as Process>::Config::default();
    indexer_config.set_listen_port(indexer_listen_port);
    LocalNet::launch_from_two_configs(validator_config, indexer_config)
        .await
        .expect("ing to launch a LocalNetwork with testconfiguration.")
}

/// Generate 100 blocks and shield the faucet if attempting to mine to a shielded pool as Zebrad does not currently
/// support this. Also generates an additional block to confirm the shield, dumps the excess funds and generates a
/// final block to confirm the send.
async fn zebrad_shielded_funds<V, I>(
    local_net: &LocalNet<V, I>,
    mine_to_pool: PoolType,
    faucet: &mut LightClient,
) where
    I: Indexer + LogsToStdoutAndStderr,
    V: Validator + LogsToStdoutAndStderr + Send,
    <I as Process>::Config: Send,
    <V as Process>::Config: Send,
{
    if !matches!(mine_to_pool, PoolType::Transparent) {
        local_net.validator().generate_blocks(100).await.unwrap();
        faucet.sync_and_await().await.unwrap();
        faucet.quick_shield(zip32::AccountId::ZERO).await.unwrap();
        local_net.validator().generate_blocks(1).await.unwrap();
        faucet.sync_and_await().await.unwrap();
        quick_send(faucet, vec![(FUND_OFFLOAD_ORCHARD_ONLY, 624_960_000, None)])
            .await
            .unwrap();
        local_net.validator().generate_blocks(1).await.unwrap();
    }
}

/// Struct for building lightclients for integration testing
pub struct ClientBuilder {
    /// Indexer URI
    pub server_id: http::Uri,
    /// Directory for wallet files
    pub zingo_datadir: TempDir,
    client_number: u8,
}

impl ClientBuilder {
    /// TODO: Add Doc Comment Here!
    pub fn new(server_id: http::Uri, zingo_datadir: TempDir) -> Self {
        let client_number = 0;
        ClientBuilder {
            server_id,
            zingo_datadir,
            client_number,
        }
    }

    pub fn make_unique_data_dir_and_create_config(
        &mut self,
        configured_activation_heights: ActivationHeights,
        wallet_config: WalletConfig,
    ) -> ClientConfig {
        //! Each client requires a unique `data_dir`, we use the
        //! `client_number` counter for this.
        self.client_number += 1;
        let conf_path = format!(
            "{}_client_{}",
            self.zingo_datadir.path().to_string_lossy(),
            self.client_number
        );
        self.create_clientconfig(
            PathBuf::from(conf_path),
            configured_activation_heights,
            wallet_config,
        )
    }

    /// TODO: Add Doc Comment Here!
    pub fn create_clientconfig(
        &self,
        conf_path: PathBuf,
        configured_activation_heights: ActivationHeights,
        wallet_config: WalletConfig,
    ) -> ClientConfig {
        std::fs::create_dir(&conf_path).unwrap();
        ClientConfig::builder()
            .set_indexer_uri(self.server_id.clone())
            .set_chain_type(ChainType::Regtest(configured_activation_heights))
            .set_wallet_dir(conf_path)
            .set_wallet_config(wallet_config)
            .build()
    }

    /// TODO: Add Doc Comment Here!
    pub async fn build_faucet(
        &mut self,
        overwrite: bool,
        configured_activation_heights: ActivationHeights,
    ) -> LightClient {
        //! A "faucet" is a lightclient that receives mining rewards
        self.build_client(
            WalletConfig::MnemonicPhrase {
                mnemonic_phrase: seeds::ABANDON_ART_SEED.to_string(),
                no_of_accounts: 1.try_into().unwrap(),
                birthday: 1,
                wallet_settings: default_test_wallet_settings(),
            },
            overwrite,
            configured_activation_heights,
        )
        .await
    }

    /// TODO: Add Doc Comment Here!
    pub async fn build_client(
        &mut self,
        wallet_config: WalletConfig,
        overwrite: bool,
        configured_activation_heights: ActivationHeights,
    ) -> LightClient {
        let config = self
            .make_unique_data_dir_and_create_config(configured_activation_heights, wallet_config);
        let mut lightclient = LightClient::new(config, overwrite).await.unwrap();
        lightclient
            .generate_unified_address(ReceiverSelection::sapling_only(), zip32::AccountId::ZERO)
            .await
            .unwrap();

        lightclient
    }
}

/// TODO: Add Doc Comment Here!
pub async fn unfunded_client(
    configured_activation_heights: ActivationHeights,
    chain_cache: Option<PathBuf>,
) -> (LocalNet<DefaultValidator, DefaultIndexer>, LightClient) {
    let (local_net, mut client_builder) = custom_clients(
        PoolType::ORCHARD,
        configured_activation_heights,
        chain_cache,
    )
    .await;

    let mut lightclient = client_builder
        .build_client(
            WalletConfig::MnemonicPhrase {
                mnemonic_phrase: seeds::HOSPITAL_MUSEUM_SEED.to_string(),
                no_of_accounts: 1.try_into().unwrap(),
                birthday: 1,
                wallet_settings: default_test_wallet_settings(),
            },
            true,
            configured_activation_heights,
        )
        .await;
    lightclient.sync_and_await().await.unwrap();

    (local_net, lightclient)
}

/// TODO: Add Doc Comment Here!
pub async fn unfunded_client_default() -> (LocalNet<DefaultValidator, DefaultIndexer>, LightClient)
{
    unfunded_client(ActivationHeights::default(), None).await
}

/// Many scenarios need to start with spendable funds.  This setup provides
/// 3 blocks worth of coinbase to a preregistered spend capability.
///
/// This key is registered to receive block rewards by corresponding to the
/// address registered as the "mineraddress" field in zcash.conf
///
/// The general scenario framework requires instances of zingo-cli, lightwalletd,
/// and zcashd (in regtest mode). This setup is intended to produce the most basic
/// of scenarios.  As scenarios with even less requirements
/// become interesting (e.g. without experimental features, or txindices) we'll create more setups.
pub async fn faucet(
    mine_to_pool: PoolType,
    configured_activation_heights: ActivationHeights,
    chain_cache: Option<PathBuf>,
) -> (LocalNet<DefaultValidator, DefaultIndexer>, LightClient) {
    let (local_net, mut client_builder) =
        custom_clients(mine_to_pool, configured_activation_heights, chain_cache).await;

    let mut faucet = client_builder
        .build_faucet(true, configured_activation_heights)
        .await;

    if matches!(DefaultValidator::PROCESS, ProcessId::Zebrad) {
        zebrad_shielded_funds(&local_net, mine_to_pool, &mut faucet).await;
    }

    faucet.sync_and_await().await.unwrap();

    (local_net, faucet)
}

/// TODO: Add Doc Comment Here!
pub async fn faucet_default() -> (LocalNet<DefaultValidator, DefaultIndexer>, LightClient) {
    faucet(PoolType::ORCHARD, ActivationHeights::default(), None).await
}

/// TODO: Add Doc Comment Here!
pub async fn faucet_recipient(
    mine_to_pool: PoolType,
    configured_activation_heights: ActivationHeights,
    chain_cache: Option<PathBuf>,
) -> (
    LocalNet<DefaultValidator, DefaultIndexer>,
    LightClient,
    LightClient,
) {
    let (local_net, mut client_builder) =
        custom_clients(mine_to_pool, configured_activation_heights, chain_cache).await;

    let mut faucet = client_builder
        .build_faucet(true, configured_activation_heights)
        .await;
    let mut recipient = client_builder
        .build_client(
            WalletConfig::MnemonicPhrase {
                mnemonic_phrase: seeds::HOSPITAL_MUSEUM_SEED.to_string(),
                no_of_accounts: 1.try_into().unwrap(),
                birthday: 1,
                wallet_settings: default_test_wallet_settings(),
            },
            true,
            configured_activation_heights,
        )
        .await;

    if matches!(DefaultValidator::PROCESS, ProcessId::Zebrad) {
        zebrad_shielded_funds(&local_net, mine_to_pool, &mut faucet).await;
    }

    faucet.sync_and_await().await.unwrap();
    recipient.sync_and_await().await.unwrap();

    (local_net, faucet, recipient)
}

/// TODO: Add Doc Comment Here!
pub async fn faucet_recipient_default() -> (
    LocalNet<DefaultValidator, DefaultIndexer>,
    LightClient,
    LightClient,
) {
    faucet_recipient(PoolType::ORCHARD, ActivationHeights::default(), None).await
}

/// TODO: Add Doc Comment Here!
pub async fn faucet_funded_recipient(
    orchard_funds: Option<u64>,
    sapling_funds: Option<u64>,
    transparent_funds: Option<u64>,
    mine_to_pool: PoolType,
    configured_activation_heights: ActivationHeights,
    chain_cache: Option<PathBuf>,
) -> (
    LocalNet<DefaultValidator, DefaultIndexer>,
    LightClient,
    LightClient,
    Option<String>,
    Option<String>,
    Option<String>,
) {
    let (local_net, mut faucet, mut recipient) =
        faucet_recipient(mine_to_pool, configured_activation_heights, chain_cache).await;
    increase_height_and_wait_for_client(&local_net, &mut faucet, 1)
        .await
        .unwrap();

    let orchard_txid = if let Some(funds) = orchard_funds {
        Some(
            quick_send(
                &mut faucet,
                vec![(&get_base_address_macro!(recipient, "unified"), funds, None)],
            )
            .await
            .unwrap()
            .first()
            .to_string(),
        )
    } else {
        None
    };
    let sapling_txid = if let Some(funds) = sapling_funds {
        Some(
            quick_send(
                &mut faucet,
                vec![(&get_base_address_macro!(recipient, "sapling"), funds, None)],
            )
            .await
            .unwrap()
            .first()
            .to_string(),
        )
    } else {
        None
    };
    let transparent_txid = if let Some(funds) = transparent_funds {
        Some(
            quick_send(
                &mut faucet,
                vec![(
                    &get_base_address_macro!(recipient, "transparent"),
                    funds,
                    None,
                )],
            )
            .await
            .unwrap()
            .first()
            .to_string(),
        )
    } else {
        None
    };
    increase_height_and_wait_for_client(&local_net, &mut recipient, 1)
        .await
        .unwrap();
    faucet.sync_and_await().await.unwrap();

    (
        local_net,
        faucet,
        recipient,
        orchard_txid,
        sapling_txid,
        transparent_txid,
    )
}

/// TODO: Add Doc Comment Here!
pub async fn faucet_funded_recipient_default(
    orchard_funds: u64,
) -> (
    LocalNet<DefaultValidator, DefaultIndexer>,
    LightClient,
    LightClient,
    String,
) {
    let (local_net, faucet, recipient, orchard_txid, _sapling_txid, _transparent_txid) =
        faucet_funded_recipient(
            Some(orchard_funds),
            None,
            None,
            PoolType::ORCHARD,
            ActivationHeights::default(),
            None,
        )
        .await;

    (local_net, faucet, recipient, orchard_txid.unwrap())
}

/// TODO: Add Doc Comment Here!
pub async fn custom_clients(
    mine_to_pool: PoolType,
    configured_activation_heights: ActivationHeights,
    chain_cache: Option<PathBuf>,
) -> (LocalNet<DefaultValidator, DefaultIndexer>, ClientBuilder) {
    let local_net = launch_test::<DefaultValidator, DefaultIndexer>(
        None,
        mine_to_pool,
        configured_activation_heights,
        chain_cache.clone(),
    )
    .await;

    if chain_cache.is_none() {
        local_net.validator().generate_blocks(2).await.unwrap();
    }

    let client_builder = ClientBuilder::new(
        port_to_localhost_uri(local_net.indexer().listen_port()),
        tempfile::tempdir().unwrap(),
    );

    (local_net, client_builder)
}

/// TODO: Add Doc Comment Here!
pub async fn custom_clients_default() -> (LocalNet<DefaultValidator, DefaultIndexer>, ClientBuilder)
{
    let (local_net, client_builder) =
        custom_clients(PoolType::ORCHARD, ActivationHeights::default(), None).await;

    (local_net, client_builder)
}

/// TODO: Add Doc Comment Here!
pub async fn unfunded_mobileclient() -> LocalNet<DefaultValidator, DefaultIndexer> {
    launch_test::<DefaultValidator, DefaultIndexer>(
        Some(20_000),
        PoolType::SAPLING,
        ActivationHeights::default(),
        None,
    )
    .await
}

/// TODO: Add Doc Comment Here!
pub async fn funded_orchard_mobileclient(value: u64) -> LocalNet<DefaultValidator, DefaultIndexer> {
    let local_net = unfunded_mobileclient().await;
    let mut client_builder = ClientBuilder::new(
        port_to_localhost_uri(local_net.indexer().port()),
        tempfile::tempdir().unwrap(),
    );
    let mut faucet = client_builder
        .build_faucet(true, local_net.validator().get_activation_heights().await)
        .await;
    let recipient = client_builder
        .build_client(
            WalletConfig::MnemonicPhrase {
                mnemonic_phrase: seeds::HOSPITAL_MUSEUM_SEED.to_string(),
                no_of_accounts: 1.try_into().unwrap(),
                birthday: 1,
                wallet_settings: default_test_wallet_settings(),
            },
            true,
            local_net.validator().get_activation_heights().await,
        )
        .await;
    faucet.sync_and_await().await.unwrap();
    quick_send(
        &mut faucet,
        vec![(&get_base_address_macro!(recipient, "unified"), value, None)],
    )
    .await
    .unwrap();
    local_net.validator().generate_blocks(1).await.unwrap();

    local_net
}

/// TODO: Add Doc Comment Here!
pub async fn funded_orchard_with_3_txs_mobileclient(
    value: u64,
) -> LocalNet<DefaultValidator, DefaultIndexer> {
    let local_net = unfunded_mobileclient().await;
    let mut client_builder = ClientBuilder::new(
        port_to_localhost_uri(local_net.indexer().port()),
        tempfile::tempdir().unwrap(),
    );
    let mut faucet = client_builder
        .build_faucet(true, local_net.validator().get_activation_heights().await)
        .await;
    let mut recipient = client_builder
        .build_client(
            WalletConfig::MnemonicPhrase {
                mnemonic_phrase: seeds::HOSPITAL_MUSEUM_SEED.to_string(),
                no_of_accounts: 1.try_into().unwrap(),
                birthday: 1,
                wallet_settings: default_test_wallet_settings(),
            },
            true,
            local_net.validator().get_activation_heights().await,
        )
        .await;
    increase_height_and_wait_for_client(&local_net, &mut faucet, 1)
        .await
        .unwrap();
    quick_send(
        &mut faucet,
        vec![(&get_base_address_macro!(recipient, "unified"), value, None)],
    )
    .await
    .unwrap();
    increase_height_and_wait_for_client(&local_net, &mut recipient, 1)
        .await
        .unwrap();
    quick_send(
        &mut recipient,
        vec![(
            &get_base_address_macro!(faucet, "unified"),
            value.checked_div(10).unwrap(),
            None,
        )],
    )
    .await
    .unwrap();
    increase_height_and_wait_for_client(&local_net, &mut recipient, 1)
        .await
        .unwrap();
    let recipient_sapling_address = get_base_address_macro!(recipient, "sapling");
    quick_send(
        &mut recipient,
        vec![(
            &recipient_sapling_address,
            value.checked_div(10).unwrap(),
            Some("note-to-self test memo"),
        )],
    )
    .await
    .unwrap();
    local_net.validator().generate_blocks(1).await.unwrap();

    local_net
}

/// This scenario funds a client with transparent funds.
pub async fn funded_transparent_mobileclient(
    value: u64,
) -> LocalNet<DefaultValidator, DefaultIndexer> {
    let local_net = unfunded_mobileclient().await;
    let mut client_builder = ClientBuilder::new(
        port_to_localhost_uri(local_net.indexer().port()),
        tempfile::tempdir().unwrap(),
    );
    let mut faucet = client_builder
        .build_faucet(true, local_net.validator().get_activation_heights().await)
        .await;
    let mut recipient = client_builder
        .build_client(
            WalletConfig::MnemonicPhrase {
                mnemonic_phrase: seeds::HOSPITAL_MUSEUM_SEED.to_string(),
                no_of_accounts: 1.try_into().unwrap(),
                birthday: 1,
                wallet_settings: default_test_wallet_settings(),
            },
            true,
            local_net.validator().get_activation_heights().await,
        )
        .await;
    increase_height_and_wait_for_client(&local_net, &mut faucet, 1)
        .await
        .unwrap();

    // // received from a faucet to transparent
    quick_send(
        &mut faucet,
        vec![(
            &get_base_address_macro!(recipient, "transparent"),
            value.checked_div(4).unwrap(),
            None,
        )],
    )
    .await
    .unwrap();
    increase_height_and_wait_for_client(&local_net, &mut recipient, 1)
        .await
        .unwrap();

    local_net.validator().generate_blocks(1).await.unwrap();

    local_net
}

/// TODO: Add Doc Comment Here!
pub async fn funded_orchard_sapling_transparent_shielded_mobileclient(
    value: u64,
) -> LocalNet<DefaultValidator, DefaultIndexer> {
    let local_net = unfunded_mobileclient().await;
    let mut client_builder = ClientBuilder::new(
        port_to_localhost_uri(local_net.indexer().port()),
        tempfile::tempdir().unwrap(),
    );
    let mut faucet = client_builder
        .build_faucet(true, local_net.validator().get_activation_heights().await)
        .await;
    let mut recipient = client_builder
        .build_client(
            WalletConfig::MnemonicPhrase {
                mnemonic_phrase: seeds::HOSPITAL_MUSEUM_SEED.to_string(),
                no_of_accounts: 1.try_into().unwrap(),
                birthday: 1,
                wallet_settings: default_test_wallet_settings(),
            },
            true,
            local_net.validator().get_activation_heights().await,
        )
        .await;
    increase_height_and_wait_for_client(&local_net, &mut faucet, 1)
        .await
        .unwrap();

    // // received from a faucet to orchard
    quick_send(
        &mut faucet,
        vec![(
            &get_base_address_macro!(recipient, "unified"),
            value.checked_div(2).unwrap(),
            None,
        )],
    )
    .await
    .unwrap();
    increase_height_and_wait_for_client(&local_net, &mut recipient, 1)
        .await
        .unwrap();

    // // received from a faucet to sapling
    quick_send(
        &mut faucet,
        vec![(
            &get_base_address_macro!(recipient, "sapling"),
            value.checked_div(4).unwrap(),
            None,
        )],
    )
    .await
    .unwrap();
    increase_height_and_wait_for_client(&local_net, &mut faucet, 1)
        .await
        .unwrap();

    // // received from a faucet to transparent
    quick_send(
        &mut faucet,
        vec![(
            &get_base_address_macro!(recipient, "transparent"),
            value.checked_div(4).unwrap(),
            None,
        )],
    )
    .await
    .unwrap();
    increase_height_and_wait_for_client(&local_net, &mut recipient, 1)
        .await
        .unwrap();

    // // send to a faucet
    quick_send(
        &mut recipient,
        vec![(
            &get_base_address_macro!(faucet, "unified"),
            value.checked_div(10).unwrap(),
            None,
        )],
    )
    .await
    .unwrap();
    increase_height_and_wait_for_client(&local_net, &mut recipient, 1)
        .await
        .unwrap();

    // // send to self orchard
    let recipient_unified_address = get_base_address_macro!(recipient, "unified");
    quick_send(
        &mut recipient,
        vec![(
            &recipient_unified_address,
            value.checked_div(10).unwrap(),
            None,
        )],
    )
    .await
    .unwrap();
    increase_height_and_wait_for_client(&local_net, &mut recipient, 1)
        .await
        .unwrap();

    // // send to self sapling
    let recipient_sapling_address = get_base_address_macro!(recipient, "sapling");
    quick_send(
        &mut recipient,
        vec![(
            &recipient_sapling_address,
            value.checked_div(10).unwrap(),
            None,
        )],
    )
    .await
    .unwrap();
    increase_height_and_wait_for_client(&local_net, &mut recipient, 1)
        .await
        .unwrap();

    // // send to self transparent
    let recipient_transparent_address = get_base_address_macro!(recipient, "transparent");
    quick_send(
        &mut recipient,
        vec![(
            &recipient_transparent_address,
            value.checked_div(10).unwrap(),
            None,
        )],
    )
    .await
    .unwrap();
    increase_height_and_wait_for_client(&local_net, &mut recipient, 1)
        .await
        .unwrap();

    // // shield transparent
    recipient
        .quick_shield(zip32::AccountId::ZERO)
        .await
        .unwrap();
    increase_height_and_wait_for_client(&local_net, &mut recipient, 1)
        .await
        .unwrap();

    local_net.validator().generate_blocks(1).await.unwrap();

    local_net
}

/// Send from sender to recipient and then bump chain and sync both lightclients
pub async fn send_value_between_clients_and_sync<V, I>(
    local_net: &LocalNet<V, I>,
    sender: &mut LightClient,
    recipient: &mut LightClient,
    value: u64,
    address_pool: PoolType,
) -> Result<String, LightClientError>
where
    V: Validator + LogsToStdoutAndStderr + Send,
    <V as Process>::Config: Send,
    I: Indexer + LogsToStdoutAndStderr,
    <I as Process>::Config: Send,
{
    let txid = from_inputs::quick_send(
        sender,
        vec![(
            &get_base_address(recipient, address_pool).await,
            value,
            None,
        )],
    )
    .await
    .unwrap();
    increase_height_and_wait_for_client(local_net, sender, 1).await?;
    recipient.sync_and_await().await?;
    Ok(txid.first().to_string())
}

/// This function increases the chain height reliably (with polling) but
/// it _also_ ensures that the client state is synced.
/// Unsynced clients are very interesting to us.  See `increase_server_height`
/// to reliably increase the server without syncing the client
pub async fn increase_height_and_wait_for_client<V, I>(
    local_net: &LocalNet<V, I>,
    client: &mut LightClient,
    n: u32,
) -> Result<(), LightClientError>
where
    V: Validator + LogsToStdoutAndStderr + Send,
    <V as Process>::Config: Send,
    I: Indexer + LogsToStdoutAndStderr,
    <I as Process>::Config: Send,
{
    sync_to_target_height(
        client,
        generate_n_blocks_return_new_height(local_net, n).await,
    )
    .await
}

/// TODO: Add Doc Comment Here!
pub async fn generate_n_blocks_return_new_height<V, I>(local_net: &LocalNet<V, I>, n: u32) -> u32
where
    V: Validator + LogsToStdoutAndStderr + Send,
    <V as Process>::Config: Send,
    I: Indexer + LogsToStdoutAndStderr,
    <I as Process>::Config: Send,
{
    let start_height = local_net.validator().get_chain_height().await;
    let target = start_height + n;
    local_net.validator().generate_blocks(n).await.unwrap();
    assert_eq!(local_net.validator().get_chain_height().await, target);

    target
}
