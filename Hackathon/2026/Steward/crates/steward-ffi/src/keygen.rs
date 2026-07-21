//! Owner keygen — the trusted-dealer vault split (§4.1 of the spec).
//!
//! The owner's device generates (or imports) the Orchard spend-authorizing key
//! `ask`, splits it into `t`-of-`n` guardian shares, publishes the public package
//! and the group key `ak`, then **discards `ask`**. This module returns everything
//! as mobile-friendly Strings/records; the raw `ask` never crosses the FFI boundary
//! (when generated here it is dropped before return).

use rand::rngs::OsRng;

use steward_core::redpallas::SigningKey;

use crate::error::StewardError;
use crate::identifier_hex;

/// One guardian's share, ready to hand to that guardian (who then [`seal_share`]s
/// it under their own passphrase).
///
/// [`seal_share`]: crate::seal_share
#[derive(uniffi::Record)]
pub struct GuardianShare {
    /// The guardian's FROST identifier, canonical hex.
    pub identifier_hex: String,
    /// The guardian's `SecretShare` as JSON — the exact bytes [`seal_share`] expects.
    ///
    /// [`seal_share`]: crate::seal_share
    pub secret_share_json: String,
}

/// The output of [`split_authority`]: what the owner publishes + distributes.
#[derive(uniffi::Record)]
pub struct VaultKeygen {
    /// The Orchard spend-validating key `ak` (== the FROST group verifying key),
    /// 32-byte hex. The signer derives the vault's UFVK / receiving address from this.
    pub group_ak_hex: String,
    /// The FROST `PublicKeyPackage` as JSON — publish this to the relay's vault record.
    pub public_key_package_json: String,
    /// One share per guardian (`n` of them), keyed by identifier.
    pub shares: Vec<GuardianShare>,
}

/// Split the vault spend authority into `t`-of-`n` guardian shares (trusted-dealer).
///
/// `n` = total guardians, `t` = threshold (`1 <= t <= n`). If `ask_hex` is `None` a
/// fresh spend authority is generated on-device and dropped after the split (ideal
/// trusted-dealer hygiene — the monolithic key never exists anywhere afterwards). If
/// `Some`, it is the 32-byte hex of an existing RedPallas `ask` (e.g. one the signer
/// derived), so the resulting vault address matches a pre-derived one.
///
/// The split is routed through even-Y normalization by [`steward_core::keys`], so
/// `ak` always has the even Y coordinate RedPallas/Orchard require.
#[uniffi::export]
pub fn split_authority(
    n: u16,
    t: u16,
    ask_hex: Option<String>,
) -> Result<VaultKeygen, StewardError> {
    let mut rng = OsRng;

    let ask = match ask_hex {
        Some(h) => {
            let bytes = hex::decode(h.trim())?;
            SigningKey::deserialize(&bytes)
                .map_err(|e| StewardError::Frost { msg: e.to_string() })?
        }
        None => SigningKey::new(&mut rng),
    };

    let vault = steward_core::keys::split_authority(&ask, n, t, &mut rng)?;

    let group_ak_hex = hex::encode(
        vault
            .public_key_package
            .verifying_key()
            .serialize()
            .map_err(|e| StewardError::Frost { msg: e.to_string() })?,
    );
    let public_key_package_json = serde_json::to_string(&vault.public_key_package)?;

    let shares = vault
        .shares
        .iter()
        .map(|(id, share)| {
            Ok(GuardianShare {
                identifier_hex: identifier_hex(id),
                secret_share_json: serde_json::to_string(share)?,
            })
        })
        .collect::<Result<Vec<_>, StewardError>>()?;

    Ok(VaultKeygen { group_ak_hex, public_key_package_json, shares })
}
