//! TODO

use std::path::PathBuf;

/// TODO: Add Doc Comment Here!
#[must_use]
pub fn get_cargo_manifest_dir() -> PathBuf {
    PathBuf::from(std::env::var("CARGO_MANIFEST_DIR").expect("To be inside a manifested space."))
}

/// TODO: Add Doc Comment Here!
#[must_use]
pub fn get_regtest_dir() -> PathBuf {
    get_cargo_manifest_dir().join("regtest")
}

/// TODO: Add Doc Comment Here!
#[must_use]
pub fn get_bin_dir() -> PathBuf {
    let mut dir = get_cargo_manifest_dir();
    dir.pop();
    dir.join("test_binaries").join("bins")
}
