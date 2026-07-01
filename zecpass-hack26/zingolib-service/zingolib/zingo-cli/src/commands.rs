//! Command definitions and dispatch for zingo-cli.
//!
//! Each command implements the [`Command`] trait (or [`ShortCircuitedCommand`]
//! for commands that run without a wallet). All commands are registered in
//! [`get_commands`] and dispatched by [`do_user_command`].

mod error;
mod utils;

use std::collections::HashMap;
use std::convert::TryInto;
use std::num::NonZeroU32;
use std::str::FromStr;

use indoc::indoc;
use json::object;
use pepper_sync::config::PerformanceLevel;
use pepper_sync::keys::transparent;
use std::sync::LazyLock;
use tokio::runtime::Runtime;

use zcash_address::unified::{Container, Encoding, Ufvk};
use zcash_keys::address::Address;
use zcash_keys::keys::UnifiedFullViewingKey;
use zcash_protocol::consensus::NetworkType;
use zcash_protocol::value::Zatoshis;

use pepper_sync::wallet::{KeyIdInterface, OrchardNote, SaplingNote, SyncMode};
use zingo_common_components::protocol::ActivationHeights;
use zingolib::data::{PollReport, proposal};
use zingolib::lightclient::LightClient;
use zingolib::utils::conversion::txid_from_hex_encoded_str;
use zingolib::wallet::keys::WalletAddressRef;
use zingolib::wallet::keys::unified::{ReceiverSelection, UnifiedKeyStore};

pub static RT: LazyLock<Runtime> = LazyLock::new(|| tokio::runtime::Runtime::new().unwrap());

/// This command interface is used both by cli and also consumers.
pub trait Command {
    /// display command help (in cli)
    fn help(&self) -> &'static str;

    /// A one-line summary shown in the two-column command listing.
    fn short_help(&self) -> &'static str;

    /// in zingocli, this string is printed to console
    /// consumers occasionally make assumptions about this
    /// e. expect it to be a json object
    fn exec(&self, _args: &[&str], lightclient: &mut LightClient) -> String;
}

/// A command that can execute without an active [`LightClient`].
///
/// This is used for commands like `help` that must run before the wallet
/// is loaded — for example when the user passes `help` as the COMMAND
/// argument on the command line.
pub trait ShortCircuitedCommand {
    /// Execute the command without a [`LightClient`], returning the
    /// output string that will be printed to the console.
    fn exec_without_lc(args: Vec<String>) -> String;
}

struct GetVersionCommand {}
impl Command for GetVersionCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Return the git describe --dirty of the repo at build time.
        "}
    }

    fn short_help(&self) -> &'static str {
        "Get version of build code"
    }

    fn exec(&self, _args: &[&str], _lightclient: &mut LightClient) -> String {
        zingolib::git_description().to_string()
    }
}

struct ChangeServerCommand {}
impl Command for ChangeServerCommand {
    fn help(&self) -> &'static str {
        concat!(
            "Change the lightwalletd server to receive blockchain data from\n",
            "\n",
            "Usage:\n",
            "change_server [server_uri]\n",
            "\n",
            "Example:\n",
            "change_server ",
            crate::examples::server_uri!(),
            "\n",
        )
    }

    fn short_help(&self) -> &'static str {
        "Change lightwalletd server"
    }

    fn exec(&self, args: &[&str], lightclient: &mut LightClient) -> String {
        RT.block_on(async move {
            match args.len() {
                0 => match lightclient.set_indexer_uri(http::Uri::default()).await {
                    Ok(()) => "server set".to_string(),
                    Err(e) => format!("failed to set server: {e}"),
                },
                1 => match http::Uri::from_str(args[0]) {
                    Ok(uri) => match lightclient.set_indexer_uri(uri).await {
                        Ok(()) => "server set".to_string(),
                        Err(e) => format!("failed to set server: {e}"),
                    },
                    Err(_) => match args[0] {
                        "" => match lightclient.set_indexer_uri(http::Uri::default()).await {
                            Ok(()) => "server set".to_string(),
                            Err(e) => format!("failed to set server: {e}"),
                        },
                        _ => "invalid server uri".to_string(),
                    },
                },
                _ => self.help().to_string(),
            }
        })
    }
}

struct BirthdayCommand {}
impl Command for BirthdayCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Returns block height wallet was created.

            Usage:
            birthday
        "}
    }

    fn short_help(&self) -> &'static str {
        "Returns block height wallet was created"
    }

    fn exec(&self, _args: &[&str], lightclient: &mut LightClient) -> String {
        lightclient.birthday().to_string()
    }
}

struct WalletKindCommand {}
impl Command for WalletKindCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Displays the kind of wallet currently loaded
            If a Ufvk, displays what pools are supported.
            Currently, spend-capable wallets will always have spend capability for all three pools
            "}
    }

    fn short_help(&self) -> &'static str {
        "Displays the kind of wallet currently loaded"
    }

    fn exec(&self, _args: &[&str], lightclient: &mut LightClient) -> String {
        RT.block_on(async move {
            if lightclient.mnemonic_phrase().is_some() {
                object! {"kind" => "Loaded from mnemonic (seed or phrase)",
                        "transparent" => true,
                        "sapling" => true,
                        "orchard" => true,
                }
                .pretty(4)
            } else {
                match lightclient
                    .wallet()
                    .read()
                    .await
                    .unified_key_store
                    .get(&zip32::AccountId::ZERO)
                    .expect("account 0 must always exist")
                {
                    UnifiedKeyStore::Spend(_) => object! {
                        "kind" => "Loaded from unified spending key",
                        "transparent" => true,
                        "sapling" => true,
                        "orchard" => true,
                    }
                    .pretty(4),
                    UnifiedKeyStore::View(ufvk) => object! {
                        "kind" => "Loaded from unified full viewing key",
                        "transparent" => ufvk.transparent().is_some(),
                        "sapling" => ufvk.sapling().is_some(),
                        "orchard" => ufvk.orchard().is_some(),
                    }
                    .pretty(4),
                    UnifiedKeyStore::Empty => object! {
                        "kind" => "No keys found",
                        "transparent" => false,
                        "sapling" => false,
                        "orchard" => false,
                    }
                    .pretty(4),
                }
            }
        })
    }
}

struct ParseAddressCommand {}
impl Command for ParseAddressCommand {
    fn help(&self) -> &'static str {
        concat!(
            "Parse an address\n",
            "Usage:\n",
            "parse_address <address>\n",
            "\n",
            "Example\n",
            "parse_address ",
            crate::examples::transparent_address!(),
            "\n",
        )
    }

    fn short_help(&self) -> &'static str {
        "Parse an address"
    }

    fn exec(&self, args: &[&str], _lightclient: &mut LightClient) -> String {
        if args.len() > 1 || args.is_empty() {
            return self.help().to_string();
        }
        fn make_decoded_chain_pair(
            address: &str,
        ) -> Option<(
            zcash_client_backend::address::Address,
            zingolib::config::ChainType,
        )> {
            [
                zingolib::config::ChainType::Mainnet,
                zingolib::config::ChainType::Testnet,
                zingolib::config::ChainType::Regtest(ActivationHeights::default()),
            ]
            .iter()
            .find_map(|chain| Address::decode(chain, address).zip(Some(*chain)))
        }
        if let Some((recipient_address, chain_name)) = make_decoded_chain_pair(args[0]) {
            #[allow(unreachable_patterns)]
            let chain_name_string = match chain_name {
                zingolib::config::ChainType::Mainnet => "main",
                zingolib::config::ChainType::Testnet => "test",
                zingolib::config::ChainType::Regtest(_) => "regtest",
                _ => unreachable!("Invalid chain type"),
            };
            match recipient_address {
                Address::Sapling(_) => object! {
                    "status" => "success",
                    "chain_name" => chain_name_string,
                    "address_kind" => "sapling",
                }
                .to_string(),
                Address::Transparent(_) => object! {
                    "status" => "success",
                    "chain_name" => chain_name_string,
                    "address_kind" => "transparent",
                }
                .to_string(),
                Address::Tex(_) => object! {
                    "status" => "success",
                    "chain_name" => chain_name_string,
                    "address_kind" => "tex",
                }
                .to_string(),
                Address::Unified(ua) => {
                    let mut receivers_available = vec![];
                    if ua.sapling().is_some() {
                        receivers_available.push("sapling");
                    }
                    if ua.transparent().is_some() {
                        receivers_available.push("transparent");
                    }
                    if ua.orchard().is_some() {
                        receivers_available.push("orchard");
                        object! {
                            "status" => "success",
                            "chain_name" => chain_name_string,
                            "address_kind" => "unified",
                            "receivers_available" => receivers_available,
                            "only_orchard_ua" => zcash_keys::address::UnifiedAddress::from_receivers(ua.orchard().copied(), None, None).expect("To construct UA").encode(&chain_name),
                        }
                        .to_string()
                    } else {
                        object! {
                            "status" => "success",
                            "chain_name" => chain_name_string,
                            "address_kind" => "unified",
                            "receivers_available" => receivers_available,
                        }
                        .to_string()
                    }
                }
            }
        } else {
            object! {
                "status" => "Invalid address",
                "chain_name" => json::JsonValue::Null,
                "address_kind" => json::JsonValue::Null,
            }
            .to_string()
        }
    }
}

struct ParseViewKeyCommand {}
impl Command for ParseViewKeyCommand {
    fn help(&self) -> &'static str {
        concat!(
            "Parse a View Key\n",
            "Usage:\n",
            "parse_viewkey viewing_key\n",
            "\n",
            "Example\n",
            "parse_viewkey ",
            crate::examples::unified_viewing_key!(),
            "\n",
        )
    }

    fn short_help(&self) -> &'static str {
        "Parse a view_key."
    }

    fn exec(&self, args: &[&str], _lightclient: &mut LightClient) -> String {
        match args.len() {
            1 => json::stringify_pretty(
                match Ufvk::decode(args[0]) {
                    Ok((network, ufvk)) => {
                        let mut pools_available = vec![];
                        for fvk in ufvk.items_as_parsed() {
                            match fvk {
                            zcash_address::unified::Fvk::Orchard(_) => {
                                pools_available.push("orchard");
                            }
                            zcash_address::unified::Fvk::Sapling(_) => {
                                pools_available.push("sapling");
                            }
                            zcash_address::unified::Fvk::P2pkh(_) => {
                                pools_available.push("transparent");
                            }
                            zcash_address::unified::Fvk::Unknown { .. } => pools_available
                                .push("Unknown future protocol. Perhaps you're using old software"),
                        }
                        }
                        object! {
                            "status" => "success",
                            "chain_name" => match network {
                                NetworkType::Main => "main",
                                NetworkType::Test => "test",
                                NetworkType::Regtest => "regtest",
                            },
                            "address_kind" => "ufvk",
                            "pools_available" => pools_available,
                        }
                    }
                    Err(_) => {
                        object! {
                            "status" => "Invalid viewkey",
                            "chain_name" => json::JsonValue::Null,
                            "address_kind" => json::JsonValue::Null
                        }
                    }
                },
                4,
            ),
            _ => self.help().to_string(),
        }
    }
}

struct SyncCommand {}
impl Command for SyncCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Launches a task for syncing the wallet to the latest state of the block chain.

            Sub-commands:
            `run` starts or resumes sync.
            `pause` pauses scanning until sync is resumed.
            `stop` shuts down sync before its complete.
            `status` returns a report of the wallet's current sync status.
            `poll` polls the sync task handle, returning a sync result if complete. If sync failed, returns the error
            instead. Poll is not intended to be called manually for zingo-cli.

            Usage:
            sync run
            sync pause
            sync stop
            sync status
            sync poll

        "}
    }

    fn short_help(&self) -> &'static str {
        "Sync the wallet to the latest state of the blockchain."
    }

    fn exec(&self, args: &[&str], lightclient: &mut LightClient) -> String {
        if args.len() != 1 {
            return "Error: sync command expects 1 argument. Type \"help sync\" for usage."
                .to_string();
        }

        match args[0] {
            "run" => {
                if lightclient.sync_mode() == SyncMode::Paused {
                    lightclient.resume_sync().expect("sync should be paused");
                    "Resuming sync task...".to_string()
                } else {
                    RT.block_on(async move {
                        match lightclient.sync().await {
                            Ok(()) => "Launching sync task...".to_string(),
                            Err(e) => format!("Error: {e}"),
                        }
                    })
                }
            }
            "pause" => match lightclient.pause_sync() {
                Ok(()) => "Pausing sync task...".to_string(),
                Err(e) => format!("Error: {e}"),
            },
            "stop" => match lightclient.stop_sync() {
                Ok(()) => "Stopping sync task...".to_string(),
                Err(e) => format!("Error: {e}"),
            },
            "status" => RT.block_on(async move {
                match pepper_sync::sync_status(&*lightclient.wallet().read().await).await {
                    Ok(status) => json::JsonValue::from(status).pretty(2),
                    Err(e) => format!("Error: {e}"),
                }
            }),
            "poll" => match lightclient.poll_sync() {
                PollReport::NoHandle => "Sync task has not been launched.".to_string(),
                PollReport::NotReady => "Sync task is not complete.".to_string(),
                PollReport::Ready(result) => match result {
                    Ok(sync_result) => sync_result.to_string(),
                    Err(e) => format!("Error: {e}"),
                },
            },
            _ => "Error: invalid sub-command. Type \"help sync\" for usage.".to_string(),
        }
    }
}

struct RescanCommand {}
impl Command for RescanCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Rescan the wallet, clearing all wallet data obtained from the blockchain and launching sync from the wallet
            birthday.

            Usage:
            rescan
        "}
    }

    fn short_help(&self) -> &'static str {
        "Rescan the wallet, clearing all wallet data obtained from the blockchain and launching sync from the wallet birthday."
    }

    fn exec(&self, args: &[&str], lightclient: &mut LightClient) -> String {
        if !args.is_empty() {
            return "Error: rescan command expects no arguments. Type \"rescan help\" for usage."
                .to_string();
        }

        RT.block_on(async move {
            match lightclient.rescan().await {
                Ok(()) => "Launching rescan...".to_string(),
                Err(e) => format!("Error: {e}"),
            }
        })
    }
}

struct ClearCommand {}
impl Command for ClearCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Clear the wallet state, rolling back the wallet to an empty state.
            Usage:
            clear

            This command will clear all notes, utxos and transactions from the wallet, setting up the wallet to be synced from scratch.
        "}
    }

    fn short_help(&self) -> &'static str {
        "Clear the wallet state, rolling back the wallet to an empty state."
    }

    fn exec(&self, _args: &[&str], lightclient: &mut LightClient) -> String {
        RT.block_on(async move {
            lightclient.wallet().write().await.clear_all();

            let result = object! { "result" => "success" };
            result.pretty(2)
        })
    }
}

/// Lists all available commands or shows detailed help for a specific command.
pub struct HelpCommand {}
impl Command for HelpCommand {
    fn help(&self) -> &'static str {
        indoc! {r#"
            List all available commands
            Usage:
            help [command_name]

            If no "command_name" is specified, a list of all available commands is returned
            Example:
            help send

        "#}
    }

    fn short_help(&self) -> &'static str {
        "Lists all available commands"
    }

    fn exec(&self, args: &[&str], _: &mut LightClient) -> String {
        format_help(args)
    }
}

impl ShortCircuitedCommand for HelpCommand {
    fn exec_without_lc(args: Vec<String>) -> String {
        let refs: Vec<&str> = args.iter().map(String::as_str).collect();
        format_help(&refs)
    }
}

fn format_help(args: &[&str]) -> String {
    match args.len() {
        0 => {
            let mut lines = Vec::new();

            lines.push("Standalone commands (no wallet required):".to_string());
            let standalone = get_standalone_commands();
            let mut standalone_lines: Vec<_> = standalone
                .iter()
                .map(|(cmd, obj)| format!("  {} - {}", cmd, obj.short_help()))
                .collect();
            // Also include `servers` which is handled by the REPL directly.
            standalone_lines
                .push("  servers - Show ranked indexer servers and response times".to_string());
            standalone_lines.sort();
            lines.extend(standalone_lines);

            lines.push(String::new());
            lines.push("Wallet commands:".to_string());
            let wallet = get_wallet_commands();
            let mut wallet_lines: Vec<_> = wallet
                .iter()
                .map(|(cmd, obj)| format!("  {} - {}", cmd, obj.short_help()))
                .collect();
            wallet_lines.sort();
            lines.extend(wallet_lines);

            lines.join("\n")
        }
        1 => {
            if args[0] == "servers" {
                return "Show ranked indexer servers and their get_info() response times.\nUsage: servers".to_string();
            }
            match get_commands().get(args[0]) {
                Some(cmd) => cmd.help().to_string(),
                None => format!("Command {} not found", args[0]),
            }
        }
        _ => "Usage: help [command_name]".to_string(),
    }
}

struct InfoCommand {}
impl Command for InfoCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Get info about the lightwalletd we're connected to
            Usage:
            info

        "}
    }

    fn short_help(&self) -> &'static str {
        "Get the lightwalletd server's info"
    }

    fn exec(&self, _args: &[&str], lightclient: &mut LightClient) -> String {
        RT.block_on(async move { lightclient.do_info().await })
    }
}

struct CurrentPriceCommand {}
impl Command for CurrentPriceCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Updates and returns current price of ZEC.
            Currently only supports USD.

            To fetch prices via tor, it must be enabled with the `--tor` flag on startup.
            Tor is used to protect the user's IP address but may be unlawful in some countries. Use at your own discretion.

            Usage:
            current_price

        "}
    }

    fn short_help(&self) -> &'static str {
        "Updates and returns current price of ZEC."
    }

    fn exec(&self, _args: &[&str], lightclient: &mut LightClient) -> String {
        RT.block_on(async move {
            match lightclient
                .wallet()
                .write()
                .await
                .update_current_price(lightclient.tor_client())
                .await
            {
                Ok(price) => format!("current price: {price}"),
                Err(e) => format!("error: {e}"),
            }
        })
    }
}

struct BalanceCommand {}
impl Command for BalanceCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Return the wallet ZEC balance for each pool (account 0).
        "}
    }

    fn short_help(&self) -> &'static str {
        "Return the wallet ZEC balance for each pool (account 0)."
    }

    fn exec(&self, _args: &[&str], lightclient: &mut LightClient) -> String {
        RT.block_on(async move {
            match lightclient.account_balance(zip32::AccountId::ZERO).await {
                Ok(bal) => bal.to_string(),
                Err(e) => format!("Error: {e}"),
            }
        })
    }
}

struct SpendableBalanceCommand {}
impl Command for SpendableBalanceCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Display the wallet's spendable balance.

            Usage:
            spendable_balance

        "}
    }

    fn short_help(&self) -> &'static str {
        "Display the wallet's spendable balance."
    }

    fn exec(&self, _args: &[&str], lightclient: &mut LightClient) -> String {
        RT.block_on(async move {
            let wallet = lightclient.wallet().read().await;
            let spendable_balance =
                match wallet.shielded_spendable_balance(zip32::AccountId::ZERO, false) {
                    Ok(bal) => bal,
                    Err(e) => return format!("Error: {e}"),
                };
            object! {
                "spendable_balance" => spendable_balance.into_u64(),
            }
            .pretty(2)
        })
    }
}

struct MaxSendValueCommand {}
impl Command for MaxSendValueCommand {
    fn help(&self) -> &'static str {
        indoc! {r#"
            Display the maximum value the wallet can currently send to the given address.

            This value is calculated from the shielded spendable balance minus any fees required to send those funds to
            the given `address`. If the wallet is still syncing, the spendable balance may be less than the confirmed
            balance - minus the fee - due to notes being above the minimum confirmation threshold or not being able to
            construct a witness from the current state of the wallet's note commitment tree.
            If `zennies_for_zingo` is set true, an additional payment of 1_000_000 ZAT to the ZingoLabs developer address
            will be taken into account.

            Usage:
            max_send_value <address>
            OR
            max_send_value { "address": "<address>", "zennies_for_zingo": <true|false> }

        "#}
    }

    fn short_help(&self) -> &'static str {
        "Display the maximum value the wallet can currently send to a given address."
    }

    fn exec(&self, args: &[&str], lightclient: &mut LightClient) -> String {
        let (address, zennies_for_zingo) = match utils::parse_max_send_value_args(args) {
            Ok(address_and_zennies) => address_and_zennies,
            Err(e) => {
                return format!(
                    "Error: {e}\nTry 'help max_send_value' for correct usage and examples."
                );
            }
        };
        RT.block_on(async move {
            match lightclient
                .max_send_value(address, zennies_for_zingo, zip32::AccountId::ZERO)
                .await
            {
                Ok(bal) => {
                    object! {
                        "max_send_value" => bal.into_u64(),
                    }
                }
                Err(e) => {
                    object! { "error" => e.to_string() }
                }
            }
            .pretty(2)
        })
    }
}

struct NewUnifiedAddressCommand {}
impl Command for NewUnifiedAddressCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Create a new unified address.

            Transparent receivers not supported.
            See `new_taddress` for creating transparent addresses.

            Usage:
            new_address [ o | z ]

            Examples:
             - orchard and sapling receivers
            new_address oz

            - orchard-only
            new_address o

            - sapling-only
            new_address z
        "}
    }

    fn short_help(&self) -> &'static str {
        "Create a new unified address."
    }

    fn exec(&self, args: &[&str], lightclient: &mut LightClient) -> String {
        if args.len() != 1 {
            return format!("No address type specified\n{}", self.help());
        }
        if !args[0].contains('o') && !args[0].contains('z') {
            return format!("No address type specified\n{}", self.help());
        }

        RT.block_on(async move {
            let chain_type = lightclient.chain_type();
            let mut wallet = lightclient.wallet().write().await;
            let receivers = ReceiverSelection {
                orchard: args[0].contains('o'),
                sapling: args[0].contains('z'),
            };
            match wallet.generate_unified_address(receivers, zip32::AccountId::ZERO) {
                Ok((id, unified_address)) => {
                    json::object! {
                        "account" => u32::from(zip32::AccountId::ZERO), // used concrete type instead of u32 to simplify upgrading CLI to multi-account
                        "address_index" => id.address_index,
                        "has_orchard" => unified_address.has_orchard(),
                        "has_sapling" => unified_address.has_sapling(),
                        "has_transparent" => unified_address.has_transparent(),
                        "encoded_address" => unified_address.encode(&chain_type),
                    }
                }
                Err(e) => object! { "error" => e.to_string() },
            }
            .pretty(2)
        })
    }
}

struct NewTransparentAddressCommand {}
impl Command for NewTransparentAddressCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Create a new transparent address.

            Usage:
            new_taddress
        "}
    }

    fn short_help(&self) -> &'static str {
        "Create a new transparent address."
    }

    fn exec(&self, _args: &[&str], lightclient: &mut LightClient) -> String {
        RT.block_on(async move {
            let chain_type = lightclient.chain_type();
            let mut wallet = lightclient.wallet().write().await;
            match wallet.generate_transparent_address(zip32::AccountId::ZERO, true) {
                Ok((id, transparent_address)) => {
                    json::object! {
                        "account" => u32::from(id.account_id()),
                        "address_index" => id.address_index().index(),
                        "scope" => id.scope().to_string(),
                        "encoded_address" => transparent::encode_address(&chain_type,  transparent_address),
                    }
                }
                Err(e) => object! { "error" => e.to_string() },
            }
            .pretty(2)
        })
    }
}

struct NewTransparentAddressAllowGapCommand {}
impl Command for NewTransparentAddressAllowGapCommand {
    fn help(&self) -> &'static str {
        indoc! {r#"
            Create a new transparent address even if the current one has not received funds.

            Usage:
            new_taddress_allow_gap

            Notes:
            This command bypasses the built-in "no-gap" rule that normally prevents creating a new
            transparent address until the last one has received funds. The rule exists to avoid
            large gaps in address indices, which can cause problems when restoring a wallet from
            seed, since all unused addresses beyond the gap may not be discovered automatically.

            By using this command you take responsibility for:
              - Tracking unused addresses yourself.
              - Ensuring you do not create excessive gaps that make wallet recovery slow or incomplete.
              - Understanding that funds sent to skipped addresses may not appear after recovery
                unless you explicitly rescan or adjust the gap limit.

           Use only if you know why you need consecutive empty transparent addresses and are
           prepared to manage the risks of wallet recovery and scanning.
        "#}
    }

    fn short_help(&self) -> &'static str {
        "Create a new transparent address (even if the last one did not receive any funds)."
    }

    fn exec(&self, _args: &[&str], lightclient: &mut LightClient) -> String {
        RT.block_on(async move {
            // Generate without enforcing the no-gap constraint
            let chain_type= lightclient.chain_type();
            let mut wallet = lightclient.wallet().write().await;

            match wallet.generate_transparent_address(zip32::AccountId::ZERO, false) {
                Ok((id, transparent_address)) => {
                    json::object! {
                        "account" => u32::from(id.account_id()),
                        "address_index" => id.address_index().index(),
                        "scope" => id.scope().to_string(),
                        "encoded_address" => transparent::encode_address(&chain_type, transparent_address),
                    }
                }
                Err(e) => object! { "error" => e.to_string() },
            }
            .pretty(2)
        })
    }
}

struct UnifiedAddressesCommand {}
impl Command for UnifiedAddressesCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            List unified addresses in the wallet.

            Usage:
            addresses

        "}
    }

    fn short_help(&self) -> &'static str {
        "List unified addresses in the wallet."
    }

    fn exec(&self, _args: &[&str], lightclient: &mut LightClient) -> String {
        RT.block_on(async move { lightclient.unified_addresses_json().await.pretty(2) })
    }
}

struct TransparentAddressesCommand {}
impl Command for TransparentAddressesCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            List transparent addresses in the wallet.

            Usage:
            t_addresses

        "}
    }

    fn short_help(&self) -> &'static str {
        "List transparent addresses in the wallet."
    }

    fn exec(&self, _args: &[&str], lightclient: &mut LightClient) -> String {
        RT.block_on(async move { lightclient.transparent_addresses_json().await.pretty(2) })
    }
}

struct CheckAddressCommand {}
impl Command for CheckAddressCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Checks if the given encoded address is derived by the wallet's keys.

            Usage:
            check_address <encoded_address>

            Example:
            check_address u1p32nu0pgev5cr0u6t4ja9lcn29kaw37xch8nyglwvp7grl07f72c46hxvw0u3q58ks43ntg324fmulc2xqf4xl3pv42s232m25vaukp05s6av9z76s3evsstax4u6f5g7tql5yqwuks9t4ef6vdayfmrsymenqtshgxzj59hdydzygesqa7pdpw463hu7afqf4an29m69kfasdwr494
        "}
    }

    fn short_help(&self) -> &'static str {
        "Checks if the given encoded address is derived by the wallet's keys."
    }

    fn exec(&self, args: &[&str], lightclient: &mut LightClient) -> String {
        if args.len() != 1 {
            return json::object! { "error" => "no address specified. try 'help check_address' for correct usage and examples."
                .to_string() }.pretty(2)            ;
        }
        RT.block_on(async move {
            match lightclient
                .wallet()
                .read()
                .await
                .is_address_derived_by_keys(args[0])
            {
                Ok(address_ref) => address_ref.map_or(
                    json::object! { "is_wallet_address" => "false".to_string() },
                    |address_ref| match address_ref {
                        WalletAddressRef::Unified {
                            account_id,
                            address_index,
                            has_orchard,
                            has_sapling,
                            has_transparent,
                            encoded_address,
                        } => json::object! {
                            "is_wallet_address" => "true".to_string(),
                            "address_type" => "unified".to_string(),
                            "address_index" => address_index,
                            "account_id" => u32::from(account_id),
                            "has_orchard" => has_orchard,
                            "has_sapling" => has_sapling,
                            "has_transparent" => has_transparent,
                            "encoded_address" => encoded_address,
                        },
                        WalletAddressRef::OrchardInternal {
                            account_id,
                            diversifier_index,
                            encoded_address,
                        } => json::object! {
                            "is_wallet_address" => "true".to_string(),
                            "address_type" => "orchard_internal".to_string(),
                            "account_id" => u32::from(account_id),
                            "diversifier_index" => u128::from(diversifier_index).to_string(),
                            "encoded_address" => encoded_address,
                        },
                        WalletAddressRef::SaplingExternal {
                            account_id,
                            diversifier_index,
                            encoded_address,
                        } => json::object! {
                            "is_wallet_address" => "true".to_string(),
                            "address_type" => "sapling".to_string(),
                            "account_id" => u32::from(account_id),
                            "diversifier_index" => u128::from(diversifier_index).to_string(),
                            "encoded_address" => encoded_address,
                        },
                        WalletAddressRef::Transparent {
                            account_id,
                            scope,
                            address_index,
                            encoded_address,
                        } => json::object! {
                            "is_wallet_address" => "true".to_string(),
                            "address_type" => "transparent".to_string(),
                            "account_id" => u32::from(account_id),
                            "scope" => scope.to_string(),
                            "address_index" => address_index.index(),
                            "encoded_address" => encoded_address,
                        },
                    },
                ),
                Err(e) => json::object! { "error" => e.to_string() },
            }
            .pretty(2)
        })
    }
}

struct ExportUfvkCommand {}
impl Command for ExportUfvkCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Export unified full viewing key for the wallet.
            Note: If you want to backup spend capability, use the 'recovery_info' command instead.

            Usage:
            export_ufvk
        "}
    }

    fn short_help(&self) -> &'static str {
        "Export unified full viewing key for the wallet."
    }

    fn exec(&self, _args: &[&str], lightclient: &mut LightClient) -> String {
        RT.block_on(async move {
            let ufvk: UnifiedFullViewingKey = match lightclient
                .wallet()
                .read()
                .await
                .unified_key_store
                .get(&zip32::AccountId::ZERO)
                .expect("account 0 must always exist")
                .try_into()
            {
                Ok(ufvk) => ufvk,
                Err(e) => return e.to_string(),
            };
            object! {
                "ufvk" => ufvk.encode(&lightclient.chain_type()),
                "birthday" => lightclient.birthday()
            }
            .pretty(2)
        })
    }
}

struct SendCommand {}
impl Command for SendCommand {
    fn help(&self) -> &'static str {
        concat!(
            "Propose a transfer of ZEC to the given address(es).\n",
            "The fee required to send this transaction will be added to the proposal and displayed to the user.\n",
            "The 'confirm' command must be called to complete and broadcast the proposed transaction(s).\n",
            "\n",
            "Usage:\n",
            "    send <address> <amount in zatoshis> \"<optional memo>\"\n",
            "    OR\n",
            "    send '[{\"address\":\"<address>\", \"amount\":<amount in zatoshis>, \"memo\":\"<optional memo>\"}, ...]'\n",
            "Example:\n",
            "    send ",
            crate::examples::sapling_address!(),
            " ",
            crate::examples::amount_zatoshis!(),
            " \"",
            crate::examples::memo!(),
            "\"\n",
            "    confirm\n",
        )
    }

    fn short_help(&self) -> &'static str {
        "Propose a transfer of ZEC to the given address(es) and display a proposal for confirmation."
    }

    fn exec(&self, args: &[&str], lightclient: &mut LightClient) -> String {
        let receivers = match utils::parse_send_args(args) {
            Ok(receivers) => receivers,
            Err(e) => {
                return format!("Error: {e}\nTry 'help send' for correct usage and examples.");
            }
        };
        let request = match zingolib::data::receivers::transaction_request_from_receivers(receivers)
        {
            Ok(request) => request,
            Err(e) => {
                return format!("Error: {e}\nTry 'help send' for correct usage and examples.");
            }
        };
        RT.block_on(async move {
            match lightclient
                .propose_send(request, zip32::AccountId::ZERO)
                .await
            {
                Ok(proposal) => {
                    let fee = match zingolib::data::proposal::total_fee(&proposal) {
                        Ok(fee) => fee,
                        Err(e) => return object! { "error" => e.to_string() }.pretty(2),
                    };
                    object! { "fee" => fee.into_u64() }
                }
                Err(e) => {
                    object! { "error" => e.to_string() }
                }
            }
            .pretty(2)
        })
    }
}

struct SendAllCommand {}
impl Command for SendAllCommand {
    fn help(&self) -> &'static str {
        concat!(
            "Propose to transfer all ZEC from shielded pools to a given address.\n",
            "The fee required to send this transaction will be added to the proposal and displayed to the user.\n",
            "The 'confirm' command must be called to complete and broadcast the proposed transaction(s).\n",
            "If invoked with a JSON arg \"zennies_for_zingo\" must be specified, if set to 'true' 1_000_000 ZAT\n",
            "will be sent to the zingolabs developer address with each transaction.\n",
            "\n",
            "Warning:\n",
            "    Does not send transparent funds. These funds must be shielded first. Type `help shield` for more information.\n",
            "Usage:\n",
            "    send_all <address> \"<optional memo>\"\n",
            "    OR\n",
            "    send_all '{ \"address\": \"<address>\", \"memo\": \"<optional memo>\", \"zennies_for_zingo\": <true|false> }'\n",
            "Example:\n",
            "    send_all ",
            crate::examples::sapling_address!(),
            " \"",
            crate::examples::send_all_memo!(),
            "\"\n",
            "    confirm\n",
        )
    }

    fn short_help(&self) -> &'static str {
        "Propose to transfer all ZEC from shielded pools to a given address and display a proposal for confirmation."
    }

    fn exec(&self, args: &[&str], lightclient: &mut LightClient) -> String {
        let (address, zennies_for_zingo, memo) = match utils::parse_send_all_args(args) {
            Ok(parse_results) => parse_results,
            Err(e) => {
                return format!("Error: {e}\nTry 'help sendall' for correct usage and examples.");
            }
        };
        RT.block_on(async move {
            match lightclient
                .propose_send_all(address, zennies_for_zingo, memo, zip32::AccountId::ZERO)
                .await
            {
                Ok(proposal) => {
                    let amount = match proposal::total_payment_amount(&proposal) {
                        Ok(amount) => amount,
                        Err(e) => return object! { "error" => e.to_string() }.pretty(2),
                    };
                    let fee = match proposal::total_fee(&proposal) {
                        Ok(fee) => fee,
                        Err(e) => return object! { "error" => e.to_string() }.pretty(2),
                    };
                    object! {
                        "amount" => amount.into_u64(),
                        "fee" => fee.into_u64(),
                    }
                }
                Err(e) => {
                    object! { "error" => e.to_string() }
                }
            }
            .pretty(2)
        })
    }
}

struct QuickSendCommand {}
impl Command for QuickSendCommand {
    fn help(&self) -> &'static str {
        concat!(
            "Send ZEC to the given address(es). Combines `send` and `confirm` into a single command.\n",
            "The fee required to send this transaction is additionally deducted from your balance.\n",
            "Warning:\n",
            "    Transaction(s) will be sent without the user being aware of the fee amount.\n",
            "Usage:\n",
            "    quicksend <address> <amount in zatoshis> \"<optional memo>\"\n",
            "    OR\n",
            "    quicksend '[{\"address\":\"<address>\", \"amount\":<amount in zatoshis>, \"memo\":\"<optional memo>\"}, ...]'\n",
            "Example:\n",
            "    quicksend ",
            crate::examples::sapling_address!(),
            " ",
            crate::examples::amount_zatoshis!(),
            " \"",
            crate::examples::memo!(),
            "\"\n",
        )
    }

    fn short_help(&self) -> &'static str {
        "Send ZEC to the given address(es). Combines `send` and `confirm` into a single command."
    }

    fn exec(&self, args: &[&str], lightclient: &mut LightClient) -> String {
        let receivers = match utils::parse_send_args(args) {
            Ok(receivers) => receivers,
            Err(e) => {
                return format!("Error: {e}\nTry 'help quicksend' for correct usage and examples.");
            }
        };
        let request = match zingolib::data::receivers::transaction_request_from_receivers(receivers)
        {
            Ok(request) => request,
            Err(e) => {
                return format!("Error: {e}\nTry 'help quicksend' for correct usage and examples.");
            }
        };
        RT.block_on(async move {
            match lightclient.quick_send(request, zip32::AccountId::ZERO, true).await {
                Ok(txids) => {
                    object! { "txids" => txids.iter().map(std::string::ToString::to_string).collect::<Vec<_>>() }
                }
                Err(e) => {
                    object! { "error" => e.to_string() }
                }
            }
            .pretty(2)
        })
    }
}

struct ShieldCommand {}
impl Command for ShieldCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Propose a shield of transparent funds to the orchard pool.
            The fee required to send this transaction will be added to the proposal and displayed to the user.
            The 'confirm' command must be called to complete and broadcast the proposed shield.

            Usage:
                shield
            Example:
                shield
                confirm

        "}
    }

    fn short_help(&self) -> &'static str {
        "Propose a shield of transparent funds to the orchard pool and display a proposal for confirmation.."
    }

    fn exec(&self, args: &[&str], lightclient: &mut LightClient) -> String {
        if !args.is_empty() {
            return format!(
                "Error: {}\nTry 'help shield' for correct usage and examples.",
                error::CommandError::InvalidArguments
            );
        }

        RT.block_on(async move {
            match lightclient.propose_shield(zip32::AccountId::ZERO).await {
                Ok(proposal) => {
                    if proposal.steps().len() != 1 {
                        return object! { "error" => "shielding transactions should not have multiple proposal steps" }.pretty(2);
                    }
                    let step = proposal.steps().first();
                    let Some(value_to_shield) = step
                        .balance()
                        .proposed_change()
                        .iter()
                        .try_fold(Zatoshis::ZERO, |acc, c| acc + c.value()) else {
                            return object! { "error" => "shield amount outside valid range of zatoshis" }
                                .pretty(2);
                    };
                    let fee = step.balance().fee_required();
                    object! {
                        "value_to_shield" => value_to_shield.into_u64(),
                        "fee" => fee.into_u64(),
                    }
                }
                Err(e) => {
                    object! { "error" => e.to_string() }
                }
            }
            .pretty(2)
        })
    }
}

struct QuickShieldCommand {}
impl Command for QuickShieldCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Shield transparent funds to the orchard pool. Combines `shield` and `confirm` into a single command.
            The fee required to send this transaction is additionally deducted from your balance.
            Warning:
                Transaction(s) will be sent without the user being aware of the fee amount.
            Usage:
                quickshield

        "}
    }

    fn short_help(&self) -> &'static str {
        "Shield transparent funds to the orchard pool. Combines `shield` and `confirm` into a single command."
    }

    fn exec(&self, args: &[&str], lightclient: &mut LightClient) -> String {
        if !args.is_empty() {
            return format!(
                "Error: {}\nTry 'help shield' for correct usage and examples.",
                error::CommandError::InvalidArguments
            );
        }

        RT.block_on(async move {
            match lightclient
                .quick_shield(zip32::AccountId::ZERO)
                .await {
                Ok(txids) => {
                    object! { "txids" => txids.iter().map(std::string::ToString::to_string).collect::<Vec<_>>() }
                }
                Err(e) => {
                    object! { "error" => e.to_string() }
                }
            }
            .pretty(2)
        })
    }
}

struct ConfirmCommand {}
impl Command for ConfirmCommand {
    fn help(&self) -> &'static str {
        concat!(
            "Confirms the latest proposal, constructing and transmitting the transaction(s) and resuming the sync task.\n",
            "Fails if a proposal has not already been created with the 'send', 'send_all' or 'shield' commands.\n",
            "Type 'help send', 'help sendall' or 'help shield' for more information on creating proposals.\n",
            "\n",
            "Usage:\n",
            "    confirm\n",
            "Example:\n",
            "    send ",
            crate::examples::sapling_address!(),
            " ",
            crate::examples::amount_zatoshis!(),
            " \"",
            crate::examples::memo!(),
            "\"\n",
            "    confirm\n",
        )
    }

    fn short_help(&self) -> &'static str {
        "Confirms the latest proposal, constructing and transmitting the transaction(s) and resuming the sync task."
    }

    fn exec(&self, args: &[&str], lightclient: &mut LightClient) -> String {
        if !args.is_empty() {
            return format!(
                "Error: {}\nTry 'help confirm' for correct usage and examples.",
                error::CommandError::InvalidArguments
            );
        }

        RT.block_on(async move {
            match lightclient
                .send_stored_proposal(true)
                .await {
                Ok(txids) => {
                    object! { "txids" => txids.iter().map(std::string::ToString::to_string).collect::<Vec<_>>() }
                }
                Err(e) => {
                    object! { "error" => e.to_string() }
                }
            }
            .pretty(2)
        })
    }
}

// TODO: add a decline command which deletes latest proposal?

struct DeleteCommand {}
impl Command for DeleteCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Delete the wallet from disk
            Usage:
            delete

            The wallet is deleted from disk. If you want to use another wallet first you need to remove the existing wallet file

        "}
    }

    fn short_help(&self) -> &'static str {
        "Delete wallet file from disk"
    }

    fn exec(&self, _args: &[&str], lightclient: &mut LightClient) -> String {
        RT.block_on(async move {
            match lightclient.do_delete().await {
                Ok(()) => {
                    let r = object! { "result" => "success",
                    "wallet_path" => lightclient.wallet_path().to_str().expect("should be valid UTF-8") };
                    r.pretty(2)
                }
                Err(e) => {
                    let r = object! {
                        "result" => "error",
                        "error" => e
                    };
                    r.pretty(2)
                }
            }
        })
    }
}

struct RecoveryInfoCommand {}
impl Command for RecoveryInfoCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Display the wallet's seed phrase, birthday and number of accounts in use.

            Your wallet is entirely recoverable from the seed phrase. Please save it carefully and don't share it with anyone.

            Usage:
            recovery_info

        "}
    }

    fn short_help(&self) -> &'static str {
        "Display the wallet's seed phrase, birthday and number of accounts in use."
    }

    fn exec(&self, _args: &[&str], lightclient: &mut LightClient) -> String {
        RT.block_on(async move {
            match lightclient.wallet().read().await.recovery_info() {
                Some(backup_info) => backup_info.to_string(),
                None => "error: no mnemonic found. wallet loaded from key.".to_string(),
            }
        })
    }
}

struct ValueTransfersCommand {}
impl Command for ValueTransfersCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            List all value transfers for this wallet.
            A value transfer is a group of all notes to a specific receiver in a transaction.

            Usage:
            value_transfers
        "}
    }

    fn short_help(&self) -> &'static str {
        "List all value transfers for this wallet."
    }

    fn exec(&self, _args: &[&str], lightclient: &mut LightClient) -> String {
        RT.block_on(async move {
            match lightclient.value_transfers(false).await {
                Ok(value_transfers) => value_transfers.to_string(),
                Err(e) => format!("Error: {e}"),
            }
        })
    }
}

struct MessagesFilterCommand {}
impl Command for MessagesFilterCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            List memo-containing value transfers sent to/from wallet. If an address is provided,
            only messages to/from that address will be provided. If a string is provided,
            messages containing that string are displayed. Otherwise, all memos are displayed.
            Currently, for received messages, this relies on the reply-to address contained in the memo.
            A value transfer is a group of all notes to a specific receiver in a transaction.

            Usage:
            messages [address]/[string]
        "}
    }

    fn short_help(&self) -> &'static str {
        "List memos for this wallet."
    }

    fn exec(&self, args: &[&str], lightclient: &mut LightClient) -> String {
        if args.len() > 1 {
            return "Error: invalid arguments\nTry 'help messages' for correct usage and examples"
                .to_string();
        }

        RT.block_on(async move {
            match lightclient.messages_containing(args.first().copied()).await {
                Ok(value_transfers) => json::JsonValue::from(value_transfers).pretty(2),
                Err(e) => format!("Error: {e}"),
            }
        })
    }
}

struct TransactionsCommand {}
impl Command for TransactionsCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Provides a list of transaction summaries related to this wallet in order of blockheight.

            Usage:
            transactions
        "}
    }

    fn short_help(&self) -> &'static str {
        "Provides a list of transaction summaries related to this wallet in order of blockheight."
    }

    fn exec(&self, args: &[&str], lightclient: &mut LightClient) -> String {
        if !args.is_empty() {
            return "Error: invalid arguments\nTry 'help transactions' for correct usage and examples"
                .to_string();
        }
        RT.block_on(async move {
            match lightclient.transaction_summaries(false).await {
                Ok(transactions) => transactions.to_string(),
                Err(e) => format!("Error: {e}"),
            }
        })
    }
}

struct MemoBytesToAddressCommand {}
impl Command for MemoBytesToAddressCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Get an object where keys are addresses and values are total bytes of memo sent to that address.
            usage:
            memobytes_to_address
        "}
    }

    fn short_help(&self) -> &'static str {
        "Show by address memo_bytes transfers for this seed."
    }

    fn exec(&self, args: &[&str], lightclient: &mut LightClient) -> String {
        if args.len() > 1 {
            return format!("didn't understand arguments\n{}", self.help());
        }

        RT.block_on(async move {
            match lightclient.do_total_memobytes_to_address().await {
                Ok(total_memo_bytes) => json::JsonValue::from(total_memo_bytes).pretty(2),
                Err(e) => format!("Error: {e}"),
            }
        })
    }
}

struct ValueToAddressCommand {}
impl Command for ValueToAddressCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Get an object where keys are addresses and values are total value sent to that address.
            usage:
            value_to_address
        "}
    }

    fn short_help(&self) -> &'static str {
        "Show by address value transfers for this seed."
    }

    fn exec(&self, args: &[&str], lightclient: &mut LightClient) -> String {
        if args.len() > 1 {
            return format!("didn't understand arguments\n{}", self.help());
        }

        RT.block_on(async move {
            match lightclient.do_total_value_to_address().await {
                Ok(total_values) => json::JsonValue::from(total_values).pretty(2),
                Err(e) => format!("Error: {e}"),
            }
        })
    }
}

struct SendsToAddressCommand {}
impl Command for SendsToAddressCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Get an object where keys are addresses and values are total value sent to that address.
            usage:
            sends_to_address
        "}
    }

    fn short_help(&self) -> &'static str {
        "Show by address number of sends for this seed."
    }

    fn exec(&self, args: &[&str], lightclient: &mut LightClient) -> String {
        if args.len() > 1 {
            return format!("didn't understand arguments\n{}", self.help());
        }

        RT.block_on(async move {
            match lightclient.do_total_spends_to_address().await {
                Ok(total_spends) => json::JsonValue::from(total_spends).pretty(2),
                Err(e) => format!("Error: {e}"),
            }
        })
    }
}

struct SettingsCommand {}
impl Command for SettingsCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Show or set wallet settings.

            If there are no arguments the full list of current settings will be shown.
            To set, pass the setting as an argument followed by the value.

            Minimum confirmations must be 1 or greater.

            Settings:
            performance [ low | medium | high | maximum ]
            min_confirmations 3

            Usage:
            settings
            settings performance high

        "}
    }

    fn short_help(&self) -> &'static str {
        "Show or set wallet settings."
    }

    fn exec(&self, args: &[&str], lightclient: &mut LightClient) -> String {
        RT.block_on(async move {
            let mut wallet = lightclient.wallet().write().await;

            if args.is_empty() {
                return format!(
                    r"
performance: {}
min confirmations: {}
            ",
                    wallet.wallet_settings.sync_config.performance_level,
                    wallet.wallet_settings.min_confirmations,
                );
            }

            match args[0] {
                "performance" => match args[1] {
                    "low" => wallet.wallet_settings.sync_config.performance_level = PerformanceLevel::Low,
                    "medium" => wallet.wallet_settings.sync_config.performance_level = PerformanceLevel::Medium,
                    "high" => wallet.wallet_settings.sync_config.performance_level = PerformanceLevel::High,
                    "maximum" => wallet.wallet_settings.sync_config.performance_level = PerformanceLevel::Maximum,
                    _ => {
                return "Error: invalid arguments\nTry 'help settings' for correct usage and examples"
                    .to_string();}
                    },
                "min_confirmations" => {
                    let min_confirmations = match args[1].parse::<u32>() {
                        Ok(m) => match NonZeroU32::try_from(m) {
                            Ok(m) => m,
                            Err(_) => {
                                return "Error: invalid arguments\nTry 'help settings' for correct usage and examples"
                                    .to_string();
                            }
                        },
                        Err(_) => {
                            return "Error: invalid arguments\nTry 'help settings' for correct usage and examples"
                                .to_string();
                        }
                    };
                    wallet.wallet_settings.min_confirmations = min_confirmations;
                }
                _ => {
            return "Error: invalid arguments\nTry 'help settings' for correct usage and examples"
                .to_string();}
            }

            wallet.save_required = true;

            "Successfully updated settings.".to_string()
        })
    }
}

struct HeightCommand {}
impl Command for HeightCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Returns the blockchain height at the time the wallet last requested the latest block height from the server.

            Usage:
            height

        "}
    }

    fn short_help(&self) -> &'static str {
        "Returns the blockchain height at the time the wallet last requested the latest block height from the server."
    }

    fn exec(&self, _args: &[&str], lightclient: &mut LightClient) -> String {
        RT.block_on(async move {
            object! { "height" => json::JsonValue::from(lightclient.wallet().read().await.sync_state.last_known_chain_height().map_or(0, u32::from))}.pretty(2)
        })
    }
}

struct NotesCommand {}
impl Command for NotesCommand {
    fn help(&self) -> &'static str {
        indoc! {r#"
            Show all notes (shielded outputs) in this wallet
            Usage:
            notes [all]
            If you supply the "all" parameter, all spent notes are also included
        "#}
    }

    fn short_help(&self) -> &'static str {
        "Show all notes (shielded outputs) in this wallet"
    }

    fn exec(&self, args: &[&str], lightclient: &mut LightClient) -> String {
        // Parse the args.
        if args.len() > 1 {
            return self.short_help().to_string();
        }

        // Make sure we can parse the amount
        let all_notes = if args.len() == 1 {
            match args[0] {
                "all" => true,
                a => {
                    return format!(
                        "Invalid argument \"{a}\". Specify 'all' to include spent notes"
                    );
                }
            }
        } else {
            false
        };

        RT.block_on(async move {
            let wallet = lightclient.wallet().read().await;

            json::object! {
                "orchard_notes" => json::JsonValue::from(wallet.note_summaries::<OrchardNote>(all_notes)),
                "sapling_notes" => json::JsonValue::from(wallet.note_summaries::<SaplingNote>(all_notes)),
            }
            .pretty(2)
        })
    }
}

struct CoinsCommand {}
impl Command for CoinsCommand {
    fn help(&self) -> &'static str {
        indoc! {r#"
            Show all coins (transparent outputs) in this wallet
            Usage:
            notes [all]
            If you supply the "all" parameter, all spent coins are also included
        "#}
    }

    fn short_help(&self) -> &'static str {
        "Show all coins (transparent outputs) in this wallet"
    }

    fn exec(&self, args: &[&str], lightclient: &mut LightClient) -> String {
        // Parse the args.
        if args.len() > 1 {
            return self.short_help().to_string();
        }

        // Make sure we can parse the amount
        let all_coins = if args.len() == 1 {
            match args[0] {
                "all" => true,
                a => {
                    return format!(
                        "Invalid argument \"{a}\". Specify 'all' to include spent coins"
                    );
                }
            }
        } else {
            false
        };

        RT.block_on(async move {
            json::object! {
                "transparent_coins" => json::JsonValue::from(lightclient.wallet().read().await.coin_summaries(all_coins)),
            }
            .pretty(2)
        })
    }
}

struct RemoveTransactionCommand {}
impl Command for RemoveTransactionCommand {
    fn help(&self) -> &'static str {
        indoc! {r#"
            Removes a failed transaction from the wallet with the given txid.
            This is a manual operation so important information such as memos are retained in the case of send failure
            until the user decides to remove them.

            usage:
            remove_transaction <txid>

        "#}
    }

    fn short_help(&self) -> &'static str {
        "Removes a failed transaction from the wallet with the given txid."
    }

    fn exec(&self, args: &[&str], lightclient: &mut LightClient) -> String {
        if args.len() != 1 {
            return "Error: remove command expects 1 argument. Type \"help remove\" for usage."
                .to_string();
        }

        let txid = match txid_from_hex_encoded_str(args[0]) {
            Ok(txid) => txid,
            Err(e) => return format!("Error: {e}"),
        };

        RT.block_on(async move {
            match lightclient
                .wallet()
                .write()
                .await
                .remove_failed_transaction(txid)
            {
                Ok(()) => "Successfully removed failed transaction.".to_string(),
                Err(e) => format!("Error: {e}"),
            }
        })
    }
}

struct SaveCommand {}
impl Command for SaveCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Launches a save task which saves the wallet to persistance when the wallet state changes.
            Not intended to be called manually.

            usage:
            save run
            save check
            save shutdown

        "}
    }

    fn short_help(&self) -> &'static str {
        "Launches a save task. Not intended to be called manually."
    }

    fn exec(&self, args: &[&str], lightclient: &mut LightClient) -> String {
        if args.len() != 1 {
            return "Error: save command expects 1 argument. Type \"help save\" for usage."
                .to_string();
        }

        match args[0] {
            "run" => {
                RT.block_on(async move { lightclient.save_task().await });
                "Launching save task...".to_string()
            }
            "check" => match RT.block_on(async move { lightclient.check_save_error().await }) {
                Ok(()) => String::new(),
                Err(e) => {
                    format!("Error: save failed. {e}\nRestarting save task...")
                }
            },
            "shutdown" => {
                match RT.block_on(async move { lightclient.shutdown_save_task().await }) {
                    Ok(()) => "Save task shutdown successfully.".to_string(),
                    Err(e) => {
                        format!("Error: save failed. {e}")
                    }
                }
            }
            _ => "Error: invalid sub-command. Type \"help save\" for usage.".to_string(),
        }
    }
}

struct QuitCommand {}
impl Command for QuitCommand {
    fn help(&self) -> &'static str {
        indoc! {r"
            Quit the light client
            Usage:
            quit

        "}
    }

    fn short_help(&self) -> &'static str {
        "Quit the lightwallet, saving state to disk"
    }

    fn exec(&self, _args: &[&str], lightclient: &mut LightClient) -> String {
        let save_shutdown = do_user_command("save", &["shutdown"], lightclient);

        format!("{save_shutdown}\nZingo CLI quit successfully.")
    }
}

/// Commands that do not require a wallet connection.
pub fn get_standalone_commands() -> HashMap<&'static str, Box<dyn Command>> {
    vec![
        ("help", Box::new(HelpCommand {}) as Box<dyn Command>),
        ("parse_address", Box::new(ParseAddressCommand {})),
        ("parse_viewkey", Box::new(ParseViewKeyCommand {})),
        ("version", Box::new(GetVersionCommand {})),
    ]
    .into_iter()
    .collect()
}

/// Commands that require a wallet connection.
pub fn get_wallet_commands() -> HashMap<&'static str, Box<dyn Command>> {
    vec![
        (
            "addresses",
            Box::new(UnifiedAddressesCommand {}) as Box<dyn Command>,
        ),
        ("balance", Box::new(BalanceCommand {})),
        ("birthday", Box::new(BirthdayCommand {})),
        ("change_server", Box::new(ChangeServerCommand {})),
        ("check_address", Box::new(CheckAddressCommand {})),
        ("clear", Box::new(ClearCommand {})),
        ("coins", Box::new(CoinsCommand {})),
        ("confirm", Box::new(ConfirmCommand {})),
        ("current_price", Box::new(CurrentPriceCommand {})),
        ("delete", Box::new(DeleteCommand {})),
        ("export_ufvk", Box::new(ExportUfvkCommand {})),
        ("height", Box::new(HeightCommand {})),
        ("info", Box::new(InfoCommand {})),
        ("max_send_value", Box::new(MaxSendValueCommand {})),
        (
            "memobytes_to_address",
            Box::new(MemoBytesToAddressCommand {}),
        ),
        ("messages", Box::new(MessagesFilterCommand {})),
        ("new_address", Box::new(NewUnifiedAddressCommand {})),
        ("new_taddress", Box::new(NewTransparentAddressCommand {})),
        (
            "new_taddress_allow_gap",
            Box::new(NewTransparentAddressAllowGapCommand {}),
        ),
        ("notes", Box::new(NotesCommand {})),
        ("quicksend", Box::new(QuickSendCommand {})),
        ("quickshield", Box::new(QuickShieldCommand {})),
        ("quit", Box::new(QuitCommand {})),
        ("recovery_info", Box::new(RecoveryInfoCommand {})),
        ("remove_transaction", Box::new(RemoveTransactionCommand {})),
        ("rescan", Box::new(RescanCommand {})),
        ("save", Box::new(SaveCommand {})),
        ("send", Box::new(SendCommand {})),
        ("send_all", Box::new(SendAllCommand {})),
        ("sends_to_address", Box::new(SendsToAddressCommand {})),
        ("settings", Box::new(SettingsCommand {})),
        ("shield", Box::new(ShieldCommand {})),
        ("spendable_balance", Box::new(SpendableBalanceCommand {})),
        ("sync", Box::new(SyncCommand {})),
        ("t_addresses", Box::new(TransparentAddressesCommand {})),
        ("transactions", Box::new(TransactionsCommand {})),
        ("value_to_address", Box::new(ValueToAddressCommand {})),
        ("value_transfers", Box::new(ValueTransfersCommand {})),
        ("wallet_kind", Box::new(WalletKindCommand {})),
    ]
    .into_iter()
    .collect()
}

/// All commands (standalone + wallet). Used for dispatch and `help <command>`.
pub fn get_commands() -> HashMap<&'static str, Box<dyn Command>> {
    let mut all = get_standalone_commands();
    all.extend(get_wallet_commands());
    all
}

/// Dispatches a user command by name to the appropriate [`Command`] implementation.
///
/// Returns the command's output string, or an "Unknown command" message
/// if no command with the given name exists.
pub fn do_user_command(cmd: &str, args: &[&str], lightclient: &mut LightClient) -> String {
    match get_commands().get(cmd.to_ascii_lowercase().as_str()) {
        Some(cmd) => cmd.exec(args, lightclient),
        None => format!("Unknown command : {cmd}. Type 'help' for a list of commands"),
    }
}
