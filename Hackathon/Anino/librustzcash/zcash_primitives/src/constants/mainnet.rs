//! Constants for the Zcash main network.

/// The mainnet coin type for ZEC, as defined by [SLIP 44].
///
/// [SLIP 44]: https://github.com/satoshilabs/slips/blob/master/slip-0044.md
pub const COIN_TYPE: u32 = 133;

/// The HRP for a Bech32-encoded mainnet [`ExtendedSpendingKey`].
///
/// Defined in [ZIP 32].
///
/// [`ExtendedSpendingKey`]: crate::zip32::ExtendedSpendingKey
/// [ZIP 32]: https://github.com/zcash/zips/blob/master/zip-0032.rst
pub const HRP_SAPLING_EXTENDED_SPENDING_KEY: &str = "secret-extended-key-main";

/// The HRP for a Bech32-encoded mainnet [`ExtendedFullViewingKey`].
///
/// Defined in [ZIP 32].
///
/// [`ExtendedFullViewingKey`]: crate::zip32::ExtendedFullViewingKey
/// [ZIP 32]: https://github.com/zcash/zips/blob/master/zip-0032.rst
pub const HRP_SAPLING_EXTENDED_FULL_VIEWING_KEY: &str = "zxviews";

/// The HRP for a Bech32-encoded mainnet [`PaymentAddress`].
///
/// Defined in section 5.6.4 of the [Zcash Protocol Specification].
///
/// [`PaymentAddress`]: crate::sapling::PaymentAddress
/// [Zcash Protocol Specification]: https://github.com/zcash/zips/blob/master/protocol/protocol.pdf
pub const HRP_SAPLING_PAYMENT_ADDRESS: &str = "zs";

/// The prefix for a Base58Check-encoded mainnet [`TransparentAddress::PublicKey`].
///
/// [`TransparentAddress::PublicKey`]: crate::legacy::TransparentAddress::PublicKey
pub const B58_PUBKEY_ADDRESS_PREFIX: [u8; 2] = [0x1c, 0xb8];

/// The prefix for a Base58Check-encoded mainnet [`TransparentAddress::Script`].
///
/// [`TransparentAddress::Script`]: crate::legacy::TransparentAddress::Script
pub const B58_SCRIPT_ADDRESS_PREFIX: [u8; 2] = [0x1c, 0xbd];
