//! Heartbeat / dead-man's-switch policy state machine. **(P6)**
//!
//! Pure application logic layered on top of FROST — FROST itself only does
//! threshold signing. Time is always supplied by the caller (`now`), never read
//! from a wall clock, so transitions are deterministic and unit-testable.
//!
//! The signing that a `Recoverable` release authorizes is handled by
//! [`sign`](crate::sign); this module only decides *whether* release is allowed.

use serde::{Deserialize, Serialize};

/// Lifecycle state of a vault's dead-man's-switch.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum VaultState {
    /// Owner is alive; heartbeats are current. Normal threshold spends only.
    Active,
    /// Heartbeat lapsed past `deadline + grace`. Guardians may co-sign the heir release.
    Recoverable,
}

/// Heartbeat policy captured at vault setup.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HeartbeatPolicy {
    /// Seconds between required heartbeats.
    pub interval_secs: u64,
    /// Extra grace period after a missed heartbeat before release unlocks.
    pub grace_secs: u64,
    /// Unix timestamp of the most recent valid heartbeat.
    pub last_heartbeat: u64,
}

impl HeartbeatPolicy {
    /// Absolute unix timestamp at/after which the switch trips.
    pub fn trip_at(&self) -> u64 {
        self.last_heartbeat
            .saturating_add(self.interval_secs)
            .saturating_add(self.grace_secs)
    }

    /// Evaluate the state at time `now` (unix seconds).
    pub fn state_at(&self, now: u64) -> VaultState {
        if now >= self.trip_at() {
            VaultState::Recoverable
        } else {
            VaultState::Active
        }
    }

    /// Record a fresh heartbeat, resetting the switch (owner-returns cancellation).
    pub fn heartbeat(&mut self, now: u64) {
        self.last_heartbeat = now;
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn policy() -> HeartbeatPolicy {
        HeartbeatPolicy { interval_secs: 30 * 86_400, grace_secs: 7 * 86_400, last_heartbeat: 1_000_000 }
    }

    #[test]
    fn active_before_deadline() {
        assert_eq!(policy().state_at(1_000_000 + 10 * 86_400), VaultState::Active);
    }

    #[test]
    fn recoverable_after_deadline_plus_grace() {
        assert_eq!(policy().state_at(1_000_000 + 40 * 86_400), VaultState::Recoverable);
    }

    #[test]
    fn heartbeat_cancels_pending_release() {
        let mut p = policy();
        let late = 1_000_000 + 36 * 86_400; // past interval, within grace window edge
        p.heartbeat(late);
        assert_eq!(p.state_at(late + 1), VaultState::Active);
    }
}
