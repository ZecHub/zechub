use serde::{Deserialize, Serialize};

pub const IRONWOOD_ACTIVATION_HEIGHT: u64 = 3_428_143;
pub const ORCHARD_ACTIVATION_HEIGHT: u64 = 1_687_104;
pub const TARGET_BLOCK_SECONDS: u64 = 75;
pub const ACTIVATION_WINDOW_BLOCKS: u64 = 20;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum ActivationPhase {
    PreActivation,
    ActivationWindow,
    PostActivation,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ChainStatus {
    pub height: u64,
    pub activation_height: u64,
    pub blocks_remaining: u64,
    pub seconds_remaining: u64,
    pub phase: ActivationPhase,
}

impl ChainStatus {
    pub fn from_height(height: u64) -> Self {
        Self::with_block_time(height, TARGET_BLOCK_SECONDS)
    }

    pub fn with_block_time(height: u64, block_seconds: u64) -> Self {
        let blocks_remaining = IRONWOOD_ACTIVATION_HEIGHT.saturating_sub(height);
        Self {
            height,
            activation_height: IRONWOOD_ACTIVATION_HEIGHT,
            blocks_remaining,
            seconds_remaining: blocks_remaining * block_seconds,
            phase: phase_for(height),
        }
    }
}

pub fn phase_for(height: u64) -> ActivationPhase {
    let distance = height.abs_diff(IRONWOOD_ACTIVATION_HEIGHT);
    if distance <= ACTIVATION_WINDOW_BLOCKS {
        ActivationPhase::ActivationWindow
    } else if height < IRONWOOD_ACTIVATION_HEIGHT {
        ActivationPhase::PreActivation
    } else {
        ActivationPhase::PostActivation
    }
}

pub fn drift_corrected_block_seconds(recent_timestamps: &[u64]) -> u64 {
    if recent_timestamps.len() < 2 {
        return TARGET_BLOCK_SECONDS;
    }

    let mut ordered = recent_timestamps.to_vec();
    ordered.sort_unstable();

    let span = ordered[ordered.len() - 1].saturating_sub(ordered[0]);
    let intervals = (ordered.len() - 1) as u64;
    let observed = span / intervals;

    observed.clamp(TARGET_BLOCK_SECONDS / 2, TARGET_BLOCK_SECONDS * 2)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn counts_blocks_remaining_before_activation() {
        let status = ChainStatus::from_height(3_410_211);
        assert_eq!(status.blocks_remaining, 17_932);
        assert_eq!(status.phase, ActivationPhase::PreActivation);
    }

    #[test]
    fn eta_uses_the_block_target() {
        let status = ChainStatus::with_block_time(IRONWOOD_ACTIVATION_HEIGHT - 100, 75);
        assert_eq!(status.seconds_remaining, 7_500);
    }

    #[test]
    fn activation_window_spans_twenty_blocks_either_side() {
        assert_eq!(
            phase_for(IRONWOOD_ACTIVATION_HEIGHT - 20),
            ActivationPhase::ActivationWindow
        );
        assert_eq!(
            phase_for(IRONWOOD_ACTIVATION_HEIGHT + 20),
            ActivationPhase::ActivationWindow
        );
        assert_eq!(
            phase_for(IRONWOOD_ACTIVATION_HEIGHT - 21),
            ActivationPhase::PreActivation
        );
        assert_eq!(
            phase_for(IRONWOOD_ACTIVATION_HEIGHT + 21),
            ActivationPhase::PostActivation
        );
    }

    #[test]
    fn past_activation_never_reports_negative_remaining() {
        let status = ChainStatus::from_height(IRONWOOD_ACTIVATION_HEIGHT + 5_000);
        assert_eq!(status.blocks_remaining, 0);
        assert_eq!(status.seconds_remaining, 0);
    }

    #[test]
    fn drift_falls_back_to_target_without_enough_samples() {
        assert_eq!(drift_corrected_block_seconds(&[]), TARGET_BLOCK_SECONDS);
        assert_eq!(
            drift_corrected_block_seconds(&[1_000]),
            TARGET_BLOCK_SECONDS
        );
    }

    #[test]
    fn drift_averages_observed_intervals() {
        assert_eq!(drift_corrected_block_seconds(&[0, 90, 180, 270]), 90);
    }

    #[test]
    fn drift_is_clamped_against_absurd_timestamps() {
        assert_eq!(
            drift_corrected_block_seconds(&[0, 100_000]),
            TARGET_BLOCK_SECONDS * 2
        );
        assert_eq!(
            drift_corrected_block_seconds(&[0, 1]),
            TARGET_BLOCK_SECONDS / 2
        );
    }
}
