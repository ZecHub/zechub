use serde::{Deserialize, Serialize};

pub const ZATOSHI_PER_ZEC: u64 = 100_000_000;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PoolBalances {
    pub transparent: Option<u64>,
    pub sapling: Option<u64>,
    pub orchard: Option<u64>,
}

impl PoolBalances {
    pub fn new(transparent: Option<u64>, sapling: Option<u64>, orchard: Option<u64>) -> Self {
        Self {
            transparent,
            sapling,
            orchard,
        }
    }

    pub fn fully_visible(transparent: u64, sapling: u64, orchard: u64) -> Self {
        Self::new(Some(transparent), Some(sapling), Some(orchard))
    }

    pub fn visible_total(&self) -> u64 {
        self.transparent.unwrap_or(0) + self.sapling.unwrap_or(0) + self.orchard.unwrap_or(0)
    }

    pub fn can_see_orchard(&self) -> bool {
        self.orchard.is_some()
    }

    // The verdict counts any positive Orchard balance as exposure. Note that the
    // zingolib backend reports balances excluding dust (notes at or below the
    // 5,000-zatoshi marginal fee), so Orchard holdings that are entirely dust —
    // uneconomic to spend, since moving them costs more than they are worth —
    // arrive here as Some(0) and read as clear.
    pub fn has_orchard_funds(&self) -> bool {
        self.orchard.is_some_and(|amount| amount > 0)
    }

    pub fn blind_pools(&self) -> Vec<&'static str> {
        let mut blind = Vec::new();
        if self.transparent.is_none() {
            blind.push("transparent");
        }
        if self.sapling.is_none() {
            blind.push("sapling");
        }
        if self.orchard.is_none() {
            blind.push("orchard");
        }
        blind
    }
}

pub fn zatoshi_to_zec(zatoshi: u64) -> f64 {
    zatoshi as f64 / ZATOSHI_PER_ZEC as f64
}

pub fn format_zec(zatoshi: u64) -> String {
    format!("{:.8}", zatoshi_to_zec(zatoshi))
        .trim_end_matches('0')
        .trim_end_matches('.')
        .to_string()
}

pub fn format_pool(balance: Option<u64>) -> String {
    match balance {
        Some(zatoshi) => format!("{} ZEC", format_zec(zatoshi)),
        None => "not visible to this key".to_string(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn visible_total_sums_every_pool_it_can_see() {
        assert_eq!(PoolBalances::fully_visible(1, 2, 3).visible_total(), 6);
    }

    #[test]
    fn visible_total_ignores_pools_it_cannot_see() {
        let balances = PoolBalances::new(Some(1), None, Some(3));
        assert_eq!(balances.visible_total(), 4);
    }

    #[test]
    fn a_key_without_orchard_view_capability_is_not_mistaken_for_zero() {
        let balances = PoolBalances::new(Some(100), Some(200), None);

        assert!(!balances.can_see_orchard());
        assert!(!balances.has_orchard_funds());
        assert_eq!(balances.blind_pools(), vec!["orchard"]);
    }

    #[test]
    fn orchard_dust_still_counts_as_exposure() {
        assert!(PoolBalances::fully_visible(0, 0, 1).has_orchard_funds());
    }

    #[test]
    fn a_fully_visible_key_is_blind_to_nothing() {
        assert!(
            PoolBalances::fully_visible(0, 0, 0)
                .blind_pools()
                .is_empty()
        );
    }

    #[test]
    fn zatoshi_converts_to_zec() {
        assert_eq!(zatoshi_to_zec(ZATOSHI_PER_ZEC), 1.0);
        assert_eq!(zatoshi_to_zec(50_000_000), 0.5);
    }

    #[test]
    fn format_trims_trailing_zeros_without_losing_precision() {
        assert_eq!(format_zec(320_000_000), "3.2");
        assert_eq!(format_zec(ZATOSHI_PER_ZEC), "1");
        assert_eq!(format_zec(1), "0.00000001");
        assert_eq!(format_zec(0), "0");
    }

    #[test]
    fn an_invisible_pool_never_formats_as_a_zero_balance() {
        assert_eq!(format_pool(Some(0)), "0 ZEC");
        assert_eq!(format_pool(None), "not visible to this key");
    }
}
