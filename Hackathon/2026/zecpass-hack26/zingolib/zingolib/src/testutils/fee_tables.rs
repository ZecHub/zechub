//! zip317 specifications

use std::cmp::max;

use zcash_primitives::transaction::fees::zip317::{GRACE_ACTIONS, MARGINAL_FEE};
use zcash_protocol::{PoolType, ShieldedProtocol};

/// estimates a fee based on the zip317 protocol rules
/// <https://zips.z.cash/zip-0317>
#[must_use]
pub fn one_to_one(
    source_protocol: Option<ShieldedProtocol>,
    target_pool: PoolType,
    mut change: bool,
) -> u64 {
    if source_protocol.is_none() && target_pool == PoolType::TRANSPARENT {
        change = false;
    }

    let transparent_inputs = 0;
    let mut transparent_outputs = 0;
    let mut sapling_inputs = 0;
    let mut sapling_outputs = 0;
    let mut orchard_inputs = 0;
    let mut orchard_outputs = 0;
    match source_protocol {
        Some(ShieldedProtocol::Sapling) => sapling_inputs += 1,
        Some(ShieldedProtocol::Orchard) => orchard_inputs += 1,
        _ => {}
    }
    match target_pool {
        PoolType::Transparent => transparent_outputs += 1,
        PoolType::Shielded(ShieldedProtocol::Sapling) => sapling_outputs += 1,
        PoolType::Shielded(ShieldedProtocol::Orchard) => orchard_outputs += 1,
    }
    if change {
        if orchard_inputs + orchard_outputs == 0 {
            // sapling change
            sapling_outputs += 1;
        } else {
            //orchard change
            orchard_outputs += 1;
        }
    }
    if sapling_outputs > 0 || sapling_inputs > 0 {
        sapling_outputs = max(sapling_outputs, 2); //MIN_SHIELDED_OUTPUTS;
    }
    let mut orchard_actions = max(orchard_inputs, orchard_outputs);
    if orchard_actions > 0 {
        orchard_actions = max(orchard_actions, 2); //MIN_SHIELDED_OUTPUTS;
    }
    let contribution_transparent = max(transparent_outputs, transparent_inputs);
    let contribution_sapling = max(sapling_outputs, sapling_inputs);
    let contribution_orchard = orchard_actions;
    let total_fee = MARGINAL_FEE
        * max(
            contribution_transparent + contribution_sapling + contribution_orchard,
            GRACE_ACTIONS,
        );
    total_fee
        .expect("actions expected to be in numerical range")
        .into_u64()
}
