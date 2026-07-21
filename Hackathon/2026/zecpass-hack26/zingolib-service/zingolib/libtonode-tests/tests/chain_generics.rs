#[cfg(feature = "chain_generic_tests")]
mod chain_generics {
    #[cfg(feature = "proptests")]
    mod proptests {
        use libtonode_tests::chain_generics::LibtonodeEnvironment;
        use tokio::runtime::Runtime;
        use zingolib::testutils::chain_generics::fixtures;
        use zingolib::testutils::int_to_pooltype;
        use zingolib::testutils::int_to_shieldedprotocol;
        proptest::proptest! {
            #![proptest_config(proptest::test_runner::Config::with_cases(1))]
            #[test]
            fn any_source_sends_to_any_receiver_libtonode(send_value in 0..50_000u64, change_value in 0..10_000u64, sender_protocol in 1..2, receiver_pool in 0..2) {
                Runtime::new().unwrap().block_on(async {
                    fixtures::any_source_sends_to_any_receiver::<LibtonodeEnvironment>(int_to_shieldedprotocol(sender_protocol), int_to_pooltype(receiver_pool), send_value, change_value, true).await;
                });
             }
            #[test]
            fn any_source_sends_to_any_receiver_0_change_libtonode(send_value in 0..50_000u64, sender_protocol in 1..2, receiver_pool in 0..2) {
                Runtime::new().unwrap().block_on(async {
                    fixtures::any_source_sends_to_any_receiver::<LibtonodeEnvironment>(int_to_shieldedprotocol(sender_protocol), int_to_pooltype(receiver_pool), send_value, 0, true).await;
                });
             }
        }
    }
    use libtonode_tests::chain_generics::LibtonodeEnvironment;
    use zcash_protocol::{PoolType, ShieldedProtocol};
    use zingolib::testutils::chain_generics::fixtures;

    #[tokio::test]
    async fn generate_a_range_of_value_transfers() {
        fixtures::create_various_value_transfers::<LibtonodeEnvironment>().await;
    }
    #[tokio::test]
    async fn send_shield_cycle() {
        fixtures::send_shield_cycle::<LibtonodeEnvironment>(1).await;
    }
    #[tokio::test]
    #[test_log::test]
    async fn ignore_dust_inputs() {
        fixtures::ignore_dust_inputs::<LibtonodeEnvironment>().await;
    }
    #[tokio::test]
    async fn note_selection_order() {
        fixtures::note_selection_order::<LibtonodeEnvironment>().await;
    }
    #[tokio::test]
    async fn simpool_insufficient_1_sapling_to_transparent() {
        fixtures::shpool_to_pool_insufficient_error::<LibtonodeEnvironment>(
            ShieldedProtocol::Sapling,
            PoolType::TRANSPARENT,
            1,
        )
        .await;
    }
    #[tokio::test]
    async fn simpool_insufficient_1_sapling_to_sapling() {
        fixtures::shpool_to_pool_insufficient_error::<LibtonodeEnvironment>(
            ShieldedProtocol::Sapling,
            PoolType::SAPLING,
            1,
        )
        .await;
    }
    #[tokio::test]
    async fn simpool_insufficient_1_sapling_to_orchard() {
        fixtures::shpool_to_pool_insufficient_error::<LibtonodeEnvironment>(
            ShieldedProtocol::Sapling,
            PoolType::ORCHARD,
            1,
        )
        .await;
    }
    #[tokio::test]
    async fn simpool_insufficient_1_orchard_to_transparent() {
        fixtures::shpool_to_pool_insufficient_error::<LibtonodeEnvironment>(
            ShieldedProtocol::Orchard,
            PoolType::TRANSPARENT,
            1,
        )
        .await;
    }
    #[tokio::test]
    async fn simpool_insufficient_1_orchard_to_sapling() {
        fixtures::shpool_to_pool_insufficient_error::<LibtonodeEnvironment>(
            ShieldedProtocol::Orchard,
            PoolType::SAPLING,
            1,
        )
        .await;
    }
    #[tokio::test]
    async fn simpool_insufficient_1_orchard_to_orchard() {
        fixtures::shpool_to_pool_insufficient_error::<LibtonodeEnvironment>(
            ShieldedProtocol::Orchard,
            PoolType::ORCHARD,
            1,
        )
        .await;
    }
    #[tokio::test]
    async fn simpool_insufficient_10_000_sapling_to_transparent() {
        fixtures::shpool_to_pool_insufficient_error::<LibtonodeEnvironment>(
            ShieldedProtocol::Sapling,
            PoolType::TRANSPARENT,
            10_000,
        )
        .await;
    }
    #[tokio::test]
    async fn simpool_insufficient_10_000_sapling_to_sapling() {
        fixtures::shpool_to_pool_insufficient_error::<LibtonodeEnvironment>(
            ShieldedProtocol::Sapling,
            PoolType::SAPLING,
            10_000,
        )
        .await;
    }
    #[tokio::test]
    async fn simpool_insufficient_10_000_sapling_to_orchard() {
        fixtures::shpool_to_pool_insufficient_error::<LibtonodeEnvironment>(
            ShieldedProtocol::Sapling,
            PoolType::ORCHARD,
            10_000,
        )
        .await;
    }
    #[tokio::test]
    async fn simpool_insufficient_10_000_orchard_to_transparent() {
        fixtures::shpool_to_pool_insufficient_error::<LibtonodeEnvironment>(
            ShieldedProtocol::Orchard,
            PoolType::TRANSPARENT,
            10_000,
        )
        .await;
    }
    #[tokio::test]
    async fn simpool_insufficient_10_000_orchard_to_sapling() {
        fixtures::shpool_to_pool_insufficient_error::<LibtonodeEnvironment>(
            ShieldedProtocol::Orchard,
            PoolType::SAPLING,
            10_000,
        )
        .await;
    }
    #[tokio::test]
    async fn simpool_insufficient_10_000_orchard_to_orchard() {
        fixtures::shpool_to_pool_insufficient_error::<LibtonodeEnvironment>(
            ShieldedProtocol::Orchard,
            PoolType::ORCHARD,
            10_000,
        )
        .await;
    }
    #[tokio::test]
    async fn simpool_no_fund_1_000_000_to_transparent() {
        fixtures::to_pool_unfunded_error::<LibtonodeEnvironment>(PoolType::TRANSPARENT, 1_000_000)
            .await;
    }
    #[tokio::test]
    async fn simpool_no_fund_1_000_000_to_sapling() {
        fixtures::to_pool_unfunded_error::<LibtonodeEnvironment>(PoolType::SAPLING, 1_000_000)
            .await;
    }
    #[tokio::test]
    async fn simpool_no_fund_1_000_000_to_orchard() {
        fixtures::to_pool_unfunded_error::<LibtonodeEnvironment>(PoolType::ORCHARD, 1_000_000)
            .await;
    }
}
