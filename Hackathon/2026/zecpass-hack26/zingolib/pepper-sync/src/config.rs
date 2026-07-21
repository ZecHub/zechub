//! Sync configuration.

#[cfg(feature = "wallet_essentials")]
use std::io::{Read, Write};

#[cfg(feature = "wallet_essentials")]
use byteorder::{ReadBytesExt, WriteBytesExt};

/// Performance level.
///
/// The higher the performance level the higher the memory usage and storage.
// TODO: revisit after implementing nullifier refetching
#[derive(Default, Debug, Clone, Copy, PartialEq, Eq)]
pub enum PerformanceLevel {
    /// - number of outputs per batch is quartered
    /// - nullifier map only contains chain tip
    Low,
    /// - nullifier map has a small maximum size
    /// - nullifier map only contains chain tip
    Medium,
    /// - nullifier map has a large maximum size
    #[default]
    High,
    /// - number of outputs per batch is quadrupled
    /// - nullifier map has no maximum size
    ///
    /// WARNING: this may cause the wallet to become less responsive on slower systems and may use a lot of memory for
    /// wallets with a lot of transactions.
    Maximum,
}

#[cfg(feature = "wallet_essentials")]
impl PerformanceLevel {
    fn serialized_version() -> u8 {
        0
    }

    /// Deserialize into `reader`
    pub fn read<R: Read>(mut reader: R) -> std::io::Result<Self> {
        let _version = reader.read_u8()?;

        Ok(match reader.read_u8()? {
            0 => Self::Low,
            1 => Self::Medium,
            2 => Self::High,
            3 => Self::Maximum,
            _ => {
                return Err(std::io::Error::new(
                    std::io::ErrorKind::InvalidData,
                    "failed to read valid performance level",
                ));
            }
        })
    }

    /// Serialize into `writer`
    pub fn write<W: Write>(&mut self, mut writer: W) -> std::io::Result<()> {
        writer.write_u8(Self::serialized_version())?;

        writer.write_u8(match self {
            Self::Low => 0,
            Self::Medium => 1,
            Self::High => 2,
            Self::Maximum => 3,
        })?;

        Ok(())
    }
}

impl std::fmt::Display for PerformanceLevel {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::Low => write!(f, "low"),
            Self::Medium => write!(f, "medium"),
            Self::High => write!(f, "high"),
            Self::Maximum => write!(f, "maximum"),
        }
    }
}

/// Sync configuration.
#[derive(Default, Debug, Clone, PartialEq, Eq)]
pub struct SyncConfig {
    /// Transparent address discovery configuration.
    pub transparent_address_discovery: TransparentAddressDiscovery,
    /// Performance level
    pub performance_level: PerformanceLevel,
}

#[cfg(feature = "wallet_essentials")]
impl SyncConfig {
    fn serialized_version() -> u8 {
        1
    }

    /// Deserialize into `reader`
    pub fn read<R: Read>(mut reader: R) -> std::io::Result<Self> {
        let version = reader.read_u8()?;

        let gap_limit = reader.read_u8()?;
        let scopes = reader.read_u8()?;
        let performance_level = if version >= 1 {
            PerformanceLevel::read(reader)?
        } else {
            PerformanceLevel::High
        };
        Ok(Self {
            transparent_address_discovery: TransparentAddressDiscovery {
                gap_limit,
                scopes: TransparentAddressDiscoveryScopes {
                    external: scopes & 0b1 != 0,
                    internal: scopes & 0b10 != 0,
                    refund: scopes & 0b100 != 0,
                },
            },
            performance_level,
        })
    }

    /// Serialize into `writer`
    pub fn write<W: Write>(&mut self, mut writer: W) -> std::io::Result<()> {
        writer.write_u8(Self::serialized_version())?;
        writer.write_u8(self.transparent_address_discovery.gap_limit)?;
        let mut scopes = 0;
        if self.transparent_address_discovery.scopes.external {
            scopes |= 0b1;
        }
        if self.transparent_address_discovery.scopes.internal {
            scopes |= 0b10;
        }
        if self.transparent_address_discovery.scopes.refund {
            scopes |= 0b100;
        }
        writer.write_u8(scopes)?;
        self.performance_level.write(writer)?;

        Ok(())
    }
}

/// Transparent address configuration.
///
/// Sets which `scopes` will be searched for addresses in use, scanning relevant transactions, up to a given `gap_limit`.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct TransparentAddressDiscovery {
    /// Sets the gap limit for transparent address discovery.
    pub gap_limit: u8,
    /// Sets the scopes for transparent address discovery.
    pub scopes: TransparentAddressDiscoveryScopes,
}

impl Default for TransparentAddressDiscovery {
    fn default() -> Self {
        Self {
            gap_limit: 10,
            scopes: TransparentAddressDiscoveryScopes::default(),
        }
    }
}

impl TransparentAddressDiscovery {
    /// Constructs a transparent address discovery config with a gap limit of 1 and ignoring the internal scope.
    #[must_use]
    pub fn minimal() -> Self {
        Self {
            gap_limit: 1,
            scopes: TransparentAddressDiscoveryScopes::default(),
        }
    }

    /// Constructs a transparent address discovery config with a gap limit of 20 for all scopes.
    #[must_use]
    pub fn recovery() -> Self {
        Self {
            gap_limit: 20,
            scopes: TransparentAddressDiscoveryScopes::recovery(),
        }
    }

    /// Disables transparent address discovery. Sync will only scan transparent outputs for addresses already in the
    /// wallet in transactions that also contain shielded inputs or outputs relevant to the wallet.
    #[must_use]
    pub fn disabled() -> Self {
        Self {
            gap_limit: 0,
            scopes: TransparentAddressDiscoveryScopes {
                external: false,
                internal: false,
                refund: false,
            },
        }
    }
}

/// Sets the active scopes for transparent address recovery.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct TransparentAddressDiscoveryScopes {
    /// External.
    pub external: bool,
    /// Internal.
    pub internal: bool,
    /// Refund.
    pub refund: bool,
}

impl Default for TransparentAddressDiscoveryScopes {
    fn default() -> Self {
        Self {
            external: true,
            internal: false,
            refund: true,
        }
    }
}

impl TransparentAddressDiscoveryScopes {
    /// Constructor with all all scopes active.
    #[must_use]
    pub fn recovery() -> Self {
        Self {
            external: true,
            internal: true,
            refund: true,
        }
    }
}
