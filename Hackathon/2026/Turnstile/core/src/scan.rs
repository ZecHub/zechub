use serde::{Deserialize, Serialize};

use crate::pools::PoolBalances;
use crate::verdict::Verdict;

#[derive(Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ScanRequest {
    pub ufvk: String,
    pub birthday: u64,
}

impl std::fmt::Debug for ScanRequest {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("ScanRequest")
            .field("ufvk", &"<redacted>")
            .field("birthday", &self.birthday)
            .finish()
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ScanResult {
    pub balances: PoolBalances,
    pub verdict: Verdict,
    pub scanned_from_height: u64,
    pub scanned_to_height: u64,
}

impl ScanResult {
    pub fn new(balances: PoolBalances, scanned_from_height: u64, scanned_to_height: u64) -> Self {
        Self {
            balances,
            verdict: Verdict::from_balances(&balances),
            scanned_from_height,
            scanned_to_height,
        }
    }
}

#[derive(Debug, thiserror::Error)]
pub enum ScanError {
    #[error("the viewing key is not a valid unified full viewing key")]
    InvalidViewingKey,
    #[error("a spending key was supplied; Turnstile never accepts spending keys")]
    SpendingKeySupplied,
    #[error("birthday height {0} is not a valid block height")]
    BirthdayAboveTip(u64),
    #[error("could not reach the Zcash network")]
    NetworkUnavailable,
    #[error("could not create the ephemeral wallet directory")]
    EphemeralStorageUnavailable,
    #[error("the zingolib scan backend is not compiled into this build")]
    BackendUnavailable,
    #[error("no such scan job — it may have expired")]
    UnknownJob,
}

const SPENDING_KEY_PREFIXES: &[&str] = &[
    "secret-extended-key",
    "zxviews",
    "uskmain",
    "uskt",
    "uview1sk",
];

pub fn validate(request: &ScanRequest) -> Result<(), ScanError> {
    let key = request.ufvk.trim().to_lowercase();

    if SPENDING_KEY_PREFIXES
        .iter()
        .any(|prefix| key.starts_with(prefix))
    {
        return Err(ScanError::SpendingKeySupplied);
    }

    if !key.starts_with("uview") {
        return Err(ScanError::InvalidViewingKey);
    }

    Ok(())
}

pub fn effective_birthday(requested: u64, chain_tip: Option<u64>) -> Result<u32, ScanError> {
    let birthday = match chain_tip {
        Some(tip) if requested > tip => return Err(ScanError::BirthdayAboveTip(requested)),
        Some(_) => requested,
        None => requested.min(crate::chain::ORCHARD_ACTIVATION_HEIGHT),
    };

    u32::try_from(birthday).map_err(|_| ScanError::BirthdayAboveTip(requested))
}

#[cfg(test)]
mod tests {
    use super::*;

    fn request(ufvk: &str) -> ScanRequest {
        ScanRequest {
            ufvk: ufvk.to_string(),
            birthday: 3_000_000,
        }
    }

    #[test]
    fn a_unified_viewing_key_validates() {
        assert!(validate(&request("uview1abc")).is_ok());
    }

    #[test]
    fn a_sapling_extended_spending_key_is_rejected() {
        let err = validate(&request("secret-extended-key-main1abc")).unwrap_err();
        assert!(matches!(err, ScanError::SpendingKeySupplied));
    }

    #[test]
    fn a_sapling_extended_viewing_key_is_rejected_as_a_spending_key_shape() {
        let err = validate(&request("zxviews1abc")).unwrap_err();
        assert!(matches!(err, ScanError::SpendingKeySupplied));
    }

    #[test]
    fn a_unified_spending_key_is_rejected() {
        let err = validate(&request("uskmain1abc")).unwrap_err();
        assert!(matches!(err, ScanError::SpendingKeySupplied));
    }

    #[test]
    fn a_spending_key_is_rejected_regardless_of_case() {
        assert!(matches!(
            validate(&request("SECRET-EXTENDED-KEY-MAIN1ABC")).unwrap_err(),
            ScanError::SpendingKeySupplied
        ));
        assert!(matches!(
            validate(&request("ZXViews1abc")).unwrap_err(),
            ScanError::SpendingKeySupplied
        ));
        assert!(matches!(
            validate(&request("uview1SK9abc")).unwrap_err(),
            ScanError::SpendingKeySupplied
        ));
    }

    #[test]
    fn a_birthday_above_the_tip_is_rejected_not_silently_scanned_as_empty() {
        // The catastrophic false-all-clear: a birthday past the chain tip would
        // scan zero blocks and report "holds no ZEC". It must be refused.
        let err = effective_birthday(3_500_000, Some(3_412_500)).unwrap_err();
        assert!(matches!(err, ScanError::BirthdayAboveTip(3_500_000)));

        let err = effective_birthday(34_281_430, Some(3_412_500)).unwrap_err();
        assert!(matches!(err, ScanError::BirthdayAboveTip(_)));
    }

    #[test]
    fn a_birthday_at_or_below_the_tip_is_honoured() {
        assert_eq!(
            effective_birthday(3_411_399, Some(3_412_500)).unwrap(),
            3_411_399
        );
        assert_eq!(
            effective_birthday(3_412_500, Some(3_412_500)).unwrap(),
            3_412_500
        );
    }

    #[test]
    fn without_a_known_tip_it_falls_back_to_orchard_activation_rather_than_trusting_a_high_birthday()
     {
        use crate::chain::ORCHARD_ACTIVATION_HEIGHT;

        // If we cannot read the tip, we must not trust a birthday that could be
        // above a user's Orchard receipt — clamp to Orchard activation so no
        // Orchard note can be missed.
        assert_eq!(
            effective_birthday(3_000_000, None).unwrap(),
            ORCHARD_ACTIVATION_HEIGHT as u32
        );
        assert_eq!(effective_birthday(500_000, None).unwrap(), 500_000);
    }

    #[test]
    fn garbage_is_rejected() {
        let err = validate(&request("not-a-key")).unwrap_err();
        assert!(matches!(err, ScanError::InvalidViewingKey));
    }

    #[test]
    fn debug_never_prints_the_viewing_key() {
        let printed = format!("{:?}", request("uview1supersecret"));
        assert!(!printed.contains("supersecret"));
        assert!(printed.contains("<redacted>"));
    }

    #[test]
    fn an_error_never_echoes_the_viewing_key_back() {
        let err = validate(&request("zxviews1supersecret")).unwrap_err();
        let rendered = format!("{err}");
        assert!(!rendered.contains("supersecret"));
    }

    #[test]
    fn result_derives_its_verdict_from_the_balances() {
        let result = ScanResult::new(
            PoolBalances::fully_visible(0, 0, 320_000_000),
            1_687_104,
            3_410_000,
        );
        assert_eq!(result.verdict, Verdict::Exposed);
    }

    #[test]
    fn a_result_from_an_orchard_blind_key_is_undetermined() {
        let result = ScanResult::new(
            PoolBalances::new(Some(0), Some(0), None),
            1_687_104,
            3_410_000,
        );
        assert_eq!(result.verdict, Verdict::Undetermined);
    }
}
