//! TODO

/// Note that `do_addresses` returns an array, each element is a JSON representation
/// of a UA.  Legacy addresses can be extracted from the receivers, per:
/// <https://zips.z.cash/zip-0316>
// TODO: is this needed as a macro?
// TODO: change unified to orchard as both are unified with orchard-only or sapling-only receiver selections
#[macro_export]
macro_rules! get_base_address_macro {
    ($client:expr, $address_protocol:expr) => {
        match $address_protocol {
            "unified" => {
                assert_eq!(
                    $client.unified_addresses_json().await[0]["has_orchard"]
                        .as_bool()
                        .unwrap(),
                    true
                );
                $client.unified_addresses_json().await[0]["encoded_address"]
                    .clone()
                    .to_string()
            }
            "sapling" => {
                assert_eq!(
                    $client.unified_addresses_json().await[1]["has_orchard"]
                        .as_bool()
                        .unwrap(),
                    false
                );
                assert_eq!(
                    $client.unified_addresses_json().await[1]["has_sapling"]
                        .as_bool()
                        .unwrap(),
                    true
                );
                $client.unified_addresses_json().await[1]["encoded_address"]
                    .clone()
                    .to_string()
            }
            "transparent" => $client.transparent_addresses_json().await[0]["encoded_address"]
                .clone()
                .to_string(),
            _ => "ERROR".to_string(),
        }
    };
}

/// First check that each pools' balance matches an expectation
/// then check that the overall balance as calculated by
/// summing the amounts listed in `tx_summaries` matches the
/// sum of the balances.
#[macro_export]
macro_rules! check_client_balances {
    ($client:ident, o: $orchard:tt s: $sapling:tt t: $transparent:tt) => {
        let balance = $client
            .account_balance(zip32::AccountId::ZERO)
            .await
            .unwrap();
        assert_eq!(
            balance.total_orchard_balance.unwrap().into_u64(),
            $orchard,
            "\no_balance: {} expectation: {} ",
            balance.total_orchard_balance.unwrap().into_u64(),
            $orchard
        );
        assert_eq!(
            balance.total_sapling_balance.unwrap().into_u64(),
            $sapling,
            "\ns_balance: {} expectation: {} ",
            balance.total_sapling_balance.unwrap().into_u64(),
            $sapling
        );
        assert_eq!(
            balance.confirmed_transparent_balance.unwrap().into_u64(),
            $transparent,
            "\nt_balance: {} expectation: {} ",
            balance.confirmed_transparent_balance.unwrap().into_u64(),
            $transparent
        );
    };
}
