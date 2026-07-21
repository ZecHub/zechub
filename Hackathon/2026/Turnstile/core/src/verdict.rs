use serde::{Deserialize, Serialize};

use crate::pools::PoolBalances;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum Verdict {
    Exposed,
    Partial,
    Ready,
    Undetermined,
}

impl Verdict {
    pub fn from_balances(balances: &PoolBalances) -> Self {
        let Some(orchard) = balances.orchard else {
            return Self::Undetermined;
        };

        if orchard > 0 {
            Self::Exposed
        } else if balances.visible_total() > 0 {
            Self::Partial
        } else {
            Self::Ready
        }
    }

    pub fn requires_migration(&self) -> bool {
        matches!(self, Self::Exposed)
    }

    pub fn headline(&self) -> &'static str {
        match self {
            Self::Exposed => "You hold ZEC in the Orchard pool",
            Self::Partial => "Your funds sit outside Orchard",
            Self::Ready => "This wallet holds no ZEC",
            Self::Undetermined => "This key cannot see the Orchard pool",
        }
    }

    pub fn detail(&self) -> &'static str {
        match self {
            Self::Exposed => {
                "Your funds are not frozen and cannot be lost. After the activation height Orchard \
                 accepts nothing new, and value leaves only by being spent out. Move it while your \
                 wallet still makes that a single tap."
            }
            Self::Partial => {
                "Your ZEC is in the transparent or Sapling pools, which the activation does not \
                 touch. Nothing to do, but it is worth knowing what changes."
            }
            Self::Ready => {
                "Turnstile found no funds in any pool. If you expected a balance, check the \
                 birthday height — a birthday set after your first transaction will miss it."
            }
            Self::Undetermined => {
                "This viewing key carries no Orchard viewing capability, so Turnstile cannot tell \
                 you whether you hold Orchard funds. That is a limit of the key, not a verdict. \
                 Re-run with a unified full viewing key that includes an Orchard key."
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn orchard_funds_are_exposed() {
        let verdict = Verdict::from_balances(&PoolBalances::fully_visible(0, 0, 320_000_000));
        assert_eq!(verdict, Verdict::Exposed);
        assert!(verdict.requires_migration());
    }

    #[test]
    fn orchard_funds_are_exposed_even_alongside_other_pools() {
        let verdict = Verdict::from_balances(&PoolBalances::fully_visible(100, 200, 1));
        assert_eq!(verdict, Verdict::Exposed);
    }

    #[test]
    fn sapling_and_transparent_only_is_partial() {
        let verdict = Verdict::from_balances(&PoolBalances::fully_visible(100, 200, 0));
        assert_eq!(verdict, Verdict::Partial);
        assert!(!verdict.requires_migration());
    }

    #[test]
    fn an_empty_wallet_is_ready() {
        assert_eq!(
            Verdict::from_balances(&PoolBalances::fully_visible(0, 0, 0)),
            Verdict::Ready
        );
    }

    #[test]
    fn a_key_blind_to_orchard_is_never_reported_as_ready() {
        let balances = PoolBalances::new(Some(0), Some(0), None);
        let verdict = Verdict::from_balances(&balances);

        assert_eq!(verdict, Verdict::Undetermined);
        assert_ne!(verdict, Verdict::Ready);
    }

    #[test]
    fn a_key_blind_to_orchard_is_undetermined_even_with_funds_elsewhere() {
        let balances = PoolBalances::new(Some(500), Some(600), None);
        assert_eq!(Verdict::from_balances(&balances), Verdict::Undetermined);
    }

    #[test]
    fn a_key_blind_only_to_sapling_can_still_rule_on_orchard() {
        let exposed = PoolBalances::new(Some(0), None, Some(700));
        assert_eq!(Verdict::from_balances(&exposed), Verdict::Exposed);

        let clear = PoolBalances::new(Some(0), None, Some(0));
        assert_eq!(Verdict::from_balances(&clear), Verdict::Ready);
    }
}
