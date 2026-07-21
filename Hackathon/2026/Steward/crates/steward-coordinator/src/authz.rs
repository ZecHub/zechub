//! Ceremony purpose + the dead-man's-switch authorization gate. **(P6)**
//!
//! FROST only produces a threshold signature; *whether* a given ceremony is
//! allowed to run is application policy. This module reuses
//! [`steward_core::policy`] (the heartbeat state machine) and layers the vault's
//! authorization rule on top:
//!
//! | purpose | who initiates | rule |
//! |---|---|---|
//! | [`NormalSpend`](CeremonyPurpose::NormalSpend) | owner | always allowed (owner-authorized) |
//! | [`SocialRecoverySweep`](CeremonyPurpose::SocialRecoverySweep) | owner | always allowed (owner-authorized) |
//! | [`InheritanceRelease`](CeremonyPurpose::InheritanceRelease) | guardians | **only** when `state_at(now) == Recoverable` |
//!
//! `now` is always caller-supplied (unix seconds), so the gate is deterministic
//! and unit-testable — never a wall-clock read.

use serde::{Deserialize, Serialize};

use steward_core::policy::{HeartbeatPolicy, VaultState};

use crate::error::{CoordinatorError, Result};

/// Why a signing ceremony is being run — selects the authorization rule.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum CeremonyPurpose {
    /// Owner-initiated spend from the live vault. Owner-authorized → always allowed.
    NormalSpend,
    /// Owner-initiated sweep to a fresh owner-controlled address after a lost
    /// device (§5.4 sweep variant). Still owner-authorized → always allowed.
    SocialRecoverySweep,
    /// Guardian-initiated release of the pre-committed heir spend. Allowed **only**
    /// once the dead-man's-switch has tripped (`VaultState::Recoverable`).
    InheritanceRelease,
}

/// The public authorization policy for one vault: the heartbeat/dead-man's-switch
/// state plus the rule gating an inheritance release. Holds no secrets; the
/// coordinator keeps one per vault alongside its public config.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct VaultPolicy {
    /// The heartbeat / dead-man's-switch state (owner's last proof-of-life, cadence, grace).
    pub heartbeat: HeartbeatPolicy,
}

impl VaultPolicy {
    /// Build a policy from a heartbeat state machine.
    pub fn new(heartbeat: HeartbeatPolicy) -> Self {
        Self { heartbeat }
    }

    /// Decide whether a ceremony of `purpose` may run at time `now` (unix secs).
    ///
    /// Owner-authorized purposes always pass; an inheritance release passes only
    /// when the dead-man's-switch has tripped to
    /// [`Recoverable`](VaultState::Recoverable).
    pub fn authorize(&self, purpose: CeremonyPurpose, now: u64) -> Result<()> {
        match purpose {
            CeremonyPurpose::NormalSpend | CeremonyPurpose::SocialRecoverySweep => Ok(()),
            CeremonyPurpose::InheritanceRelease => match self.heartbeat.state_at(now) {
                VaultState::Recoverable => Ok(()),
                VaultState::Active => Err(CoordinatorError::Unauthorized(
                    "inheritance release requires the dead-man's-switch to have tripped, \
                     but the vault is still Active (owner's heartbeats are current)"
                        .into(),
                )),
            },
        }
    }
}

/// Authorize a ceremony against an **optional** dead-man's-switch policy.
///
/// A **plain multisig** vault has no policy (`None`): it is the whole point of the
/// non-inheritance presets — a t-of-n vault with the dead-man's-switch turned OFF.
/// The owner-authorized purposes ([`NormalSpend`](CeremonyPurpose::NormalSpend) /
/// [`SocialRecoverySweep`](CeremonyPurpose::SocialRecoverySweep)) are the plain-multisig
/// spend/move and **always pass**, policy or not. An
/// [`InheritanceRelease`](CeremonyPurpose::InheritanceRelease) has nothing that could
/// authorize it on a no-policy vault — there is no switch to trip — so it is refused.
/// An **inheritance** vault (`Some`) defers to [`VaultPolicy::authorize`] (the switch gate).
pub fn authorize(policy: Option<&VaultPolicy>, purpose: CeremonyPurpose, now: u64) -> Result<()> {
    match purpose {
        CeremonyPurpose::NormalSpend | CeremonyPurpose::SocialRecoverySweep => Ok(()),
        CeremonyPurpose::InheritanceRelease => match policy {
            Some(p) => p.authorize(purpose, now),
            None => Err(CoordinatorError::Unauthorized(
                "this vault has no dead-man's-switch (it is a plain multisig vault); \
                 there is no inheritance policy that could authorize a release"
                    .into(),
            )),
        },
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    // Heartbeat every 30d, 7d grace, last proof-of-life at t=1_000_000.
    fn policy() -> VaultPolicy {
        VaultPolicy::new(HeartbeatPolicy {
            interval_secs: 30 * 86_400,
            grace_secs: 7 * 86_400,
            last_heartbeat: 1_000_000,
        })
    }

    const ACTIVE_NOW: u64 = 1_000_000 + 10 * 86_400; // heartbeats current
    const LAPSED_NOW: u64 = 1_000_000 + 40 * 86_400; // past interval + grace

    #[test]
    fn inheritance_release_rejected_while_active() {
        let p = policy();
        // Sanity: this is genuinely the Active state.
        assert_eq!(p.heartbeat.state_at(ACTIVE_NOW), VaultState::Active);
        assert!(p
            .authorize(CeremonyPurpose::InheritanceRelease, ACTIVE_NOW)
            .is_err());
    }

    #[test]
    fn inheritance_release_allowed_when_recoverable() {
        let p = policy();
        assert_eq!(p.heartbeat.state_at(LAPSED_NOW), VaultState::Recoverable);
        assert!(p
            .authorize(CeremonyPurpose::InheritanceRelease, LAPSED_NOW)
            .is_ok());
    }

    #[test]
    fn owner_authorized_purposes_always_allowed() {
        let p = policy();
        // Regardless of heartbeat state, owner-authorized spends pass.
        for now in [ACTIVE_NOW, LAPSED_NOW] {
            assert!(p.authorize(CeremonyPurpose::NormalSpend, now).is_ok());
            assert!(p
                .authorize(CeremonyPurpose::SocialRecoverySweep, now)
                .is_ok());
        }
    }

    // --- the OPTIONAL-policy gate (plain multisig vs inheritance) ---

    #[test]
    fn plain_multisig_allows_owner_purposes_and_refuses_inheritance() {
        // A plain multisig vault has NO policy: owner-authorized spends pass...
        for now in [ACTIVE_NOW, LAPSED_NOW] {
            assert!(authorize(None, CeremonyPurpose::NormalSpend, now).is_ok());
            assert!(authorize(None, CeremonyPurpose::SocialRecoverySweep, now).is_ok());
            // ...but an inheritance release has no switch to authorize it → refused.
            assert!(matches!(
                authorize(None, CeremonyPurpose::InheritanceRelease, now),
                Err(CoordinatorError::Unauthorized(_))
            ));
        }
    }

    #[test]
    fn inheritance_vault_defers_to_the_switch_gate() {
        let p = policy();
        // With a policy present, the free fn matches the switch gate exactly.
        assert!(authorize(Some(&p), CeremonyPurpose::InheritanceRelease, ACTIVE_NOW).is_err());
        assert!(authorize(Some(&p), CeremonyPurpose::InheritanceRelease, LAPSED_NOW).is_ok());
        assert!(authorize(Some(&p), CeremonyPurpose::NormalSpend, ACTIVE_NOW).is_ok());
    }
}
