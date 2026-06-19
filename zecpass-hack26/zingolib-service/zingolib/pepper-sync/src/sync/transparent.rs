use std::cmp;
use std::collections::{BTreeSet, HashMap};
use std::ops::Range;

use tokio::sync::mpsc;

use zcash_keys::keys::UnifiedFullViewingKey;
use zcash_protocol::consensus::{self, BlockHeight};
use zcash_transparent::keys::NonHardenedChildIndex;
use zip32::AccountId;

use crate::client::{self, FetchRequest};
use crate::config::TransparentAddressDiscovery;
use crate::error::SyncError;
use crate::keys;
use crate::keys::transparent::{TransparentAddressId, TransparentScope};
use crate::wallet::traits::SyncWallet;
use crate::wallet::{KeyIdInterface, ScanTarget};

use super::MAX_REORG_ALLOWANCE;

/// Discovers all addresses in use by the wallet and returns `scan_targets` for any new relevant transactions to scan transparent
/// bundles.
/// `last_known_chain_height` should be the value before updating to latest chain height.
pub(crate) async fn update_addresses_and_scan_targets<W: SyncWallet>(
    consensus_parameters: &impl consensus::Parameters,
    wallet: &mut W,
    fetch_request_sender: mpsc::UnboundedSender<FetchRequest>,
    ufvks: &HashMap<AccountId, UnifiedFullViewingKey>,
    last_known_chain_height: BlockHeight,
    chain_height: BlockHeight,
    config: TransparentAddressDiscovery,
) -> Result<(), SyncError<W::Error>> {
    if !config.scopes.external && !config.scopes.internal && !config.scopes.refund {
        return Ok(());
    }

    let wallet_addresses = wallet
        .get_transparent_addresses_mut()
        .map_err(SyncError::WalletError)?;
    let mut scan_targets: BTreeSet<ScanTarget> = BTreeSet::new();
    let sapling_activation_height = consensus_parameters
        .activation_height(consensus::NetworkUpgrade::Sapling)
        .expect("sapling activation height should always return Some");
    let block_range_start = last_known_chain_height.saturating_sub(MAX_REORG_ALLOWANCE) + 1;
    let checked_block_range_start = match block_range_start.cmp(&sapling_activation_height) {
        cmp::Ordering::Greater | cmp::Ordering::Equal => block_range_start,
        cmp::Ordering::Less => sapling_activation_height,
    };
    let block_range = Range {
        start: checked_block_range_start,
        end: chain_height + 1,
    };

    // find scan_targets for any new transactions relevant to known addresses
    for address in wallet_addresses.values() {
        let transactions = client::get_transparent_address_transactions(
            fetch_request_sender.clone(),
            consensus_parameters,
            address.clone(),
            block_range.clone(),
        )
        .await?;

        // The transaction is not scanned here, instead the scan target is stored to be later sent to a scan task for these reasons:
        // - We must search for all relevant transactions MAX_REORG_ALLOWANCE blocks below wallet height in case of re-org.
        // These would be scanned again which would be inefficient
        // - In case of re-org, any scanned transactions with heights within the re-org range would be wrongly invalidated
        // - The scan target will cause the surrounding range to be set to high priority which will often also contain shielded notes
        // relevant to the wallet
        // - Scanning a transaction without scanning the surrounding range of compact blocks in the context of a scan task creates
        // complications. Instead of writing all the information into a wallet transaction once, it would result in "incomplete"
        // transactions that only contain transparent outputs and must be updated with shielded notes and other data when scanned.
        // - We would need to add additional processing here to fetch the compact block for transaction metadata such as block time
        // and append this to the wallet.
        // - It allows SyncState to maintain complete knowledge and control of all the tasks that have and will be performed by the
        // sync engine.
        //
        // To summarise, keeping transaction scanning within the scanner is much better co-ordinated and allows us to leverage
        // any new developments to sync state management and scanning. It also separates concerns, with tasks happening in one
        // place and performed once, wherever possible.
        for (height, tx) in &transactions {
            scan_targets.insert(ScanTarget {
                block_height: *height,
                txid: tx.txid(),
                narrow_scan_area: true,
            });
        }
    }

    let mut scopes = Vec::new();
    if config.scopes.external {
        scopes.push(TransparentScope::External);
    }
    if config.scopes.internal {
        scopes.push(TransparentScope::Internal);
    }
    if config.scopes.refund {
        scopes.push(TransparentScope::Refund);
    }

    // discover new addresses and find scan_targets for relevant transactions
    for (account_id, ufvk) in ufvks {
        if let Some(account_pubkey) = ufvk.transparent() {
            for scope in &scopes {
                // start with the first address index previously unused by the wallet
                let mut address_index = if let Some(id) = wallet_addresses
                    .keys()
                    .filter(|id| id.account_id() == *account_id && id.scope() == *scope)
                    .next_back()
                {
                    id.address_index().index() + 1
                } else {
                    0
                };
                let mut unused_address_count: usize = 0;
                let mut addresses: Vec<(TransparentAddressId, String)> = Vec::new();

                while unused_address_count < config.gap_limit as usize {
                    let address_id = TransparentAddressId::new(
                        *account_id,
                        *scope,
                        NonHardenedChildIndex::from_index(address_index)
                            .expect("all non-hardened addresses in use!"),
                    );
                    let address = keys::transparent::derive_address(
                        consensus_parameters,
                        account_pubkey,
                        address_id,
                    )
                    .map_err(SyncError::TransparentAddressDerivationError)?;
                    addresses.push((address_id, address.clone()));

                    let transactions = client::get_transparent_address_transactions(
                        fetch_request_sender.clone(),
                        consensus_parameters,
                        address,
                        block_range.clone(),
                    )
                    .await?;

                    if transactions.is_empty() {
                        unused_address_count += 1;
                    } else {
                        for (height, tx) in &transactions {
                            scan_targets.insert(ScanTarget {
                                block_height: *height,
                                txid: tx.txid(),
                                narrow_scan_area: true,
                            });
                        }
                        unused_address_count = 0;
                    }

                    address_index += 1;
                }

                addresses.truncate(addresses.len() - config.gap_limit as usize);
                for (id, address) in addresses {
                    wallet_addresses.insert(id, address);
                }
            }
        }
    }

    wallet
        .get_sync_state_mut()
        .map_err(SyncError::WalletError)?
        .scan_targets
        .append(&mut scan_targets);

    Ok(())
}

// TODO: process memo encoded address indexes.
// 1. return any memo address ids from scan in ScanResults
// 2. derive the addresses up to that index, add to wallet addresses and send them to GetTaddressTxids
// 3. for each transaction returned:
// a) if the tx is in a range that is not scanned, add scan_targets to sync_state
// b) if the range is scanned and the tx is already in the wallet, rescan the zcash transaction transparent bundles in
// the wallet transaction
// c) if the range is scanned and the tx does not exist in the wallet, fetch the compact block if its not in the wallet
// and scan the transparent bundles
