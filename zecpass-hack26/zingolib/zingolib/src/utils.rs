//! General library utilities such as parsing and conversions.

use std::time::SystemTime;
pub mod conversion;
pub mod error;

/// Returns number of seconds since unix epoch.
pub(crate) fn now() -> u32 {
    SystemTime::now()
        .duration_since(SystemTime::UNIX_EPOCH)
        .expect("should never fail when comparing with an instant so far in the past")
        .as_secs() as u32
}
