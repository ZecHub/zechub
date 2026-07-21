//! Example data used as the single source of truth for help text and unit tests.
//!
//! Values are defined as macros so they can be used in `concat!` (which only
//! accepts literals). Each macro has a corresponding `const` re-export for use
//! in non-macro contexts (tests, runtime code).

macro_rules! sapling_address {
    () => {
        "ztestsapling1x65nq4dgp0qfywgxcwk9n0fvm4fysmapgr2q00p85ju252h6l7mmxu2jg9cqqhtvzd69jwhgv8d"
    };
}
pub(crate) use sapling_address;

macro_rules! transparent_address {
    () => {
        "tmSwk8bjXdCgBvpS8Kybk5nUyE21QFcDqre"
    };
}
pub(crate) use transparent_address;

macro_rules! unified_viewing_key {
    () => {
        "uviewregtest1l6s73mncrefycjhksvcp3zd6x2rpwddewv852ms8w0j828wu77h8v07fs6ph68kyp0ujwk4qmr3w4v9js4mr3ufqyasr0sddgumzyjamcgreda44kxtv4ar084szez337ld58avd9at4r5lptltgkn6uayzd055upf8cnlkarnxp69kz0vzelfww08xxhm0q0azdsplxff0mn2yyve88jyl8ujfau66pnc37skvl9528zazztf6xgk8aeewswjg4eeahpml77cxh57spgywdsc99h99twmp8sqhmp7g78l3g90equ2l4vh9vy0va6r8p568qr7nm5l5y96qgwmw9j2j788lalpeywy0af86krh4td69xqrrye6dvfx0uff84s3pm50kqx3tg3ktx88j2ujswe25s7pqvv3w4x382x07w0dp5gguqu757wlyf80f5nu9uw7wqttxmvrjhkl22x43de960c7kt97ge0dkt52j7uckht54eq768"
    };
}
pub(crate) use unified_viewing_key;

macro_rules! amount_zatoshis {
    () => {
        "200000"
    };
}
pub(crate) use amount_zatoshis;

macro_rules! memo {
    () => {
        "Hello from the command line"
    };
}
pub(crate) use memo;

macro_rules! send_all_memo {
    () => {
        "Sending all funds"
    };
}
pub(crate) use send_all_memo;

macro_rules! server_uri {
    () => {
        "https://mainnet.lightwalletd.com:9067"
    };
}
pub(crate) use server_uri;

/// Const re-exports for use in non-macro contexts (e.g. tests, runtime code).
/// Values that only appear in help text use the macro form above (for `concat!`).
/// Values that only appear in tests are defined directly as consts here.
#[cfg(test)]
pub(crate) const BIN_NAME: &str = "zingo-cli";
#[cfg(test)]
pub(crate) const SAPLING_ADDRESS: &str = sapling_address!();
#[cfg(test)]
pub(crate) const TRANSPARENT_ADDRESS: &str = transparent_address!();
#[cfg(test)]
pub(crate) const UNIFIED_VIEWING_KEY: &str = unified_viewing_key!();
#[cfg(test)]
pub(crate) const AMOUNT_ZATOSHIS: &str = amount_zatoshis!();
#[cfg(test)]
pub(crate) const MEMO: &str = memo!();
#[cfg(test)]
pub(crate) const SEND_ALL_MEMO: &str = send_all_memo!();
#[cfg(test)]
pub(crate) const SERVER_URI: &str = server_uri!();
#[cfg(test)]
pub(crate) const SEED_PHRASE: &str = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art";
#[cfg(test)]
pub(crate) const BIRTHDAY: &str = "600000";
#[cfg(test)]
pub(crate) const DATA_DIR: &str = "/tmp/zingo-test-data";
