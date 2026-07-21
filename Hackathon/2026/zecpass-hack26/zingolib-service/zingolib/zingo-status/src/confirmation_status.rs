//! If a note is confirmed, it is:
//!  Confirmed === on-record on-chain at `BlockHeight`

use std::io::{Read, Write};

use byteorder::{LittleEndian, ReadBytesExt, WriteBytesExt};

use zcash_protocol::consensus::BlockHeight;

/// Transaction confirmation status. As a transaction is created and transmitted to the blockchain, it will move
/// through each of these states. Received transactions will either be seen in the mempool or scanned from confirmed
/// blocks. Variant order is logical display order for efficient sorting instead of the order of logical status flow.
#[derive(Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum ConfirmationStatus {
    /// The transaction has been included in a confirmed block on the blockchain.
    /// The block height is the height of the confirmed block that contains the transaction.
    Confirmed(BlockHeight),
    /// The transaction is known to be - or has been - in the mempool.
    /// The block height is the chain height when the transaction was seen in the mempool + 1 (target height).
    Mempool(BlockHeight),
    /// The transaction has been transmitted to the blockchain but has not been seen in the mempool yet.
    /// The block height is the chain height when the transaction was transmitted + 1 (target height).
    Transmitted(BlockHeight),
    /// The transaction has been created but not yet transmitted to the blockchain.
    /// The block height is the chain height when the transaction was created + 1 (target height).
    Calculated(BlockHeight),
    /// The transaction has been created but failed to be transmitted, was not accepted into the mempool, was rejected
    /// from the mempool or expired before it was included in a confirmed block on the block chain.
    /// The block height is the chain height when the transaction was last updated + 1 (target height).
    Failed(BlockHeight),
}

impl ConfirmationStatus {
    /// A wrapper matching the Confirmed case.
    /// # Examples
    ///
    /// ```
    /// use zingo_status::confirmation_status::ConfirmationStatus;
    /// use zcash_protocol::consensus::BlockHeight;
    ///
    /// assert!(!ConfirmationStatus::Calculated(10.into()).is_confirmed());
    /// assert!(!ConfirmationStatus::Transmitted(10.into()).is_confirmed());
    /// assert!(!ConfirmationStatus::Mempool(10.into()).is_confirmed());
    /// assert!(ConfirmationStatus::Confirmed(10.into()).is_confirmed());
    /// ```
    #[must_use]
    pub fn is_confirmed(&self) -> bool {
        matches!(self, Self::Confirmed(_))
    }

    /// To return true, the status must be confirmed and no earlier than specified height.
    /// # Examples
    ///
    /// ```
    /// use zingo_status::confirmation_status::ConfirmationStatus;
    /// use zcash_protocol::consensus::BlockHeight;
    ///
    /// assert!(!ConfirmationStatus::Calculated(10.into()).is_confirmed_after_or_at(&9.into()));
    /// assert!(!ConfirmationStatus::Calculated(10.into()).is_confirmed_after_or_at(&10.into()));
    /// assert!(!ConfirmationStatus::Calculated(10.into()).is_confirmed_after_or_at(&11.into()));
    /// assert!(!ConfirmationStatus::Transmitted(10.into()).is_confirmed_after_or_at(&9.into()));
    /// assert!(!ConfirmationStatus::Transmitted(10.into()).is_confirmed_after_or_at(&10.into()));
    /// assert!(!ConfirmationStatus::Transmitted(10.into()).is_confirmed_after_or_at(&11.into()));
    /// assert!(!ConfirmationStatus::Mempool(10.into()).is_confirmed_after_or_at(&9.into()));
    /// assert!(!ConfirmationStatus::Mempool(10.into()).is_confirmed_after_or_at(&10.into()));
    /// assert!(!ConfirmationStatus::Mempool(10.into()).is_confirmed_after_or_at(&11.into()));
    /// assert!(ConfirmationStatus::Confirmed(10.into()).is_confirmed_after_or_at(&9.into()));
    /// assert!(ConfirmationStatus::Confirmed(10.into()).is_confirmed_after_or_at(&10.into()));
    /// assert!(!ConfirmationStatus::Confirmed(10.into()).is_confirmed_after_or_at(&11.into()));
    /// ```
    #[must_use]
    pub fn is_confirmed_after_or_at(&self, comparison_height: &BlockHeight) -> bool {
        matches!(self, Self::Confirmed(self_height) if self_height >= comparison_height)
    }

    /// To return true, the status must be confirmed and no earlier than specified height.
    /// # Examples
    ///
    /// ```
    /// use zingo_status::confirmation_status::ConfirmationStatus;
    /// use zcash_protocol::consensus::BlockHeight;
    ///
    /// assert!(!ConfirmationStatus::Calculated(10.into()).is_confirmed_after(&9.into()));
    /// assert!(!ConfirmationStatus::Calculated(10.into()).is_confirmed_after(&10.into()));
    /// assert!(!ConfirmationStatus::Calculated(10.into()).is_confirmed_after(&11.into()));
    /// assert!(!ConfirmationStatus::Transmitted(10.into()).is_confirmed_after(&9.into()));
    /// assert!(!ConfirmationStatus::Transmitted(10.into()).is_confirmed_after(&10.into()));
    /// assert!(!ConfirmationStatus::Transmitted(10.into()).is_confirmed_after(&11.into()));
    /// assert!(!ConfirmationStatus::Mempool(10.into()).is_confirmed_after(&9.into()));
    /// assert!(!ConfirmationStatus::Mempool(10.into()).is_confirmed_after(&10.into()));
    /// assert!(!ConfirmationStatus::Mempool(10.into()).is_confirmed_after(&11.into()));
    /// assert!(ConfirmationStatus::Confirmed(10.into()).is_confirmed_after(&9.into()));
    /// assert!(!ConfirmationStatus::Confirmed(10.into()).is_confirmed_after(&10.into()));
    /// assert!(!ConfirmationStatus::Confirmed(10.into()).is_confirmed_after(&11.into()));
    /// ```
    #[must_use]
    pub fn is_confirmed_after(&self, comparison_height: &BlockHeight) -> bool {
        matches!(self, Self::Confirmed(self_height) if self_height > comparison_height)
    }

    /// To return true, the status must be confirmed and no later than specified height.
    /// # Examples
    ///
    /// ```
    /// use zingo_status::confirmation_status::ConfirmationStatus;
    /// use zcash_protocol::consensus::BlockHeight;
    ///
    /// assert!(!ConfirmationStatus::Calculated(10.into()).is_confirmed_before_or_at(&9.into()));
    /// assert!(!ConfirmationStatus::Calculated(10.into()).is_confirmed_before_or_at(&10.into()));
    /// assert!(!ConfirmationStatus::Calculated(10.into()).is_confirmed_before_or_at(&11.into()));
    /// assert!(!ConfirmationStatus::Transmitted(10.into()).is_confirmed_before_or_at(&9.into()));
    /// assert!(!ConfirmationStatus::Transmitted(10.into()).is_confirmed_before_or_at(&10.into()));
    /// assert!(!ConfirmationStatus::Transmitted(10.into()).is_confirmed_before_or_at(&11.into()));
    /// assert!(!ConfirmationStatus::Mempool(10.into()).is_confirmed_before_or_at(&9.into()));
    /// assert!(!ConfirmationStatus::Mempool(10.into()).is_confirmed_before_or_at(&10.into()));
    /// assert!(!ConfirmationStatus::Mempool(10.into()).is_confirmed_before_or_at(&11.into()));
    /// assert!(!ConfirmationStatus::Confirmed(10.into()).is_confirmed_before_or_at(&9.into()));
    /// assert!(ConfirmationStatus::Confirmed(10.into()).is_confirmed_before_or_at(&10.into()));
    /// assert!(ConfirmationStatus::Confirmed(10.into()).is_confirmed_before_or_at(&11.into()));
    /// ```
    // TODO: blockheight impls copy so remove ref
    #[must_use]
    pub fn is_confirmed_before_or_at(&self, comparison_height: &BlockHeight) -> bool {
        matches!(self, Self::Confirmed(self_height) if self_height <= comparison_height)
    }

    /// To return true, the status must be confirmed earlier than specified height.
    /// # Examples
    ///
    /// ```
    /// use zingo_status::confirmation_status::ConfirmationStatus;
    /// use zcash_protocol::consensus::BlockHeight;
    ///
    /// assert!(!ConfirmationStatus::Calculated(10.into()).is_confirmed_before(&9.into()));
    /// assert!(!ConfirmationStatus::Calculated(10.into()).is_confirmed_before(&10.into()));
    /// assert!(!ConfirmationStatus::Calculated(10.into()).is_confirmed_before(&11.into()));
    /// assert!(!ConfirmationStatus::Transmitted(10.into()).is_confirmed_before(&9.into()));
    /// assert!(!ConfirmationStatus::Transmitted(10.into()).is_confirmed_before(&10.into()));
    /// assert!(!ConfirmationStatus::Transmitted(10.into()).is_confirmed_before(&11.into()));
    /// assert!(!ConfirmationStatus::Mempool(10.into()).is_confirmed_before(&9.into()));
    /// assert!(!ConfirmationStatus::Mempool(10.into()).is_confirmed_before(&10.into()));
    /// assert!(!ConfirmationStatus::Mempool(10.into()).is_confirmed_before(&11.into()));
    /// assert!(!ConfirmationStatus::Confirmed(10.into()).is_confirmed_before(&9.into()));
    /// assert!(!ConfirmationStatus::Confirmed(10.into()).is_confirmed_before(&10.into()));
    /// assert!(ConfirmationStatus::Confirmed(10.into()).is_confirmed_before(&11.into()));
    /// ```
    #[must_use]
    pub fn is_confirmed_before(&self, comparison_height: &BlockHeight) -> bool {
        matches!(self, Self::Confirmed(self_height) if self_height < comparison_height)
    }

    /// To return true, the status must not be confirmed and it must have been submitted sufficiently far in the past. This allows deduction of expired transactions.
    /// # Examples
    ///
    /// ```
    /// use zingo_status::confirmation_status::ConfirmationStatus;
    /// use zcash_protocol::consensus::BlockHeight;
    ///
    /// assert!(!ConfirmationStatus::Calculated(10.into()).is_pending_before(&9.into()));
    /// assert!(!ConfirmationStatus::Calculated(10.into()).is_pending_before(&10.into()));
    /// assert!(ConfirmationStatus::Calculated(10.into()).is_pending_before(&11.into()));
    /// assert!(!ConfirmationStatus::Transmitted(10.into()).is_pending_before(&9.into()));
    /// assert!(!ConfirmationStatus::Transmitted(10.into()).is_pending_before(&10.into()));
    /// assert!(ConfirmationStatus::Transmitted(10.into()).is_pending_before(&11.into()));
    /// assert!(!ConfirmationStatus::Mempool(10.into()).is_pending_before(&9.into()));
    /// assert!(!ConfirmationStatus::Mempool(10.into()).is_pending_before(&10.into()));
    /// assert!(ConfirmationStatus::Mempool(10.into()).is_pending_before(&11.into()));
    /// assert!(!ConfirmationStatus::Confirmed(10.into()).is_pending_before(&9.into()));
    /// assert!(!ConfirmationStatus::Confirmed(10.into()).is_pending_before(&10.into()));
    /// assert!(!ConfirmationStatus::Confirmed(10.into()).is_pending_before(&11.into()));
    /// ```
    #[must_use]
    pub fn is_pending_before(&self, comparison_height: &BlockHeight) -> bool {
        match self {
            Self::Calculated(self_height)
            | Self::Transmitted(self_height)
            | Self::Mempool(self_height) => self_height < comparison_height,
            _ => false,
        }
    }

    /// Check if transaction has `Calculated`, `Transmitted` or `Mempool` status.
    ///
    /// # Examples
    ///
    /// ```
    /// use zingo_status::confirmation_status::ConfirmationStatus;
    /// use zcash_protocol::consensus::BlockHeight;
    ///
    /// assert!(ConfirmationStatus::Calculated(1.into()).is_pending());
    /// assert!(ConfirmationStatus::Transmitted(1.into()).is_pending());
    /// assert!(ConfirmationStatus::Mempool(1.into()).is_pending());
    /// assert!(!ConfirmationStatus::Confirmed(1.into()).is_pending());
    /// assert!(!ConfirmationStatus::Failed(1.into()).is_pending());
    /// ```
    #[must_use]
    pub fn is_pending(&self) -> bool {
        matches!(
            self,
            Self::Calculated(_) | Self::Transmitted(_) | Self::Mempool(_)
        )
    }

    /// Check if transaction has `Failed` status.
    /// # Examples
    ///
    /// ```
    /// use zingo_status::confirmation_status::ConfirmationStatus;
    /// use zcash_protocol::consensus::BlockHeight;
    ///
    /// assert!(!ConfirmationStatus::Calculated(1.into()).is_failed());
    /// assert!(!ConfirmationStatus::Transmitted(1.into()).is_failed());
    /// assert!(!ConfirmationStatus::Mempool(1.into()).is_failed());
    /// assert!(!ConfirmationStatus::Confirmed(1.into()).is_failed());
    /// assert!(ConfirmationStatus::Failed(1.into()).is_failed());
    /// ```
    #[must_use]
    pub fn is_failed(&self) -> bool {
        matches!(self, Self::Failed(_))
    }

    /// Returns none if transaction is not confirmed, otherwise returns the height it was confirmed at.
    /// # Examples
    ///
    /// ```
    /// use zingo_status::confirmation_status::ConfirmationStatus;
    /// use zcash_protocol::consensus::BlockHeight;
    ///
    /// let status = ConfirmationStatus::Confirmed(16.into());
    /// assert_eq!(status.get_confirmed_height(), Some(16.into()));
    ///
    /// let status = ConfirmationStatus::Mempool(15.into());
    /// assert_eq!(status.get_confirmed_height(), None);
    /// ```
    #[must_use]
    pub fn get_confirmed_height(&self) -> Option<BlockHeight> {
        match self {
            Self::Confirmed(self_height) => Some(*self_height),
            _ => None,
        }
    }

    /// # Examples
    ///
    /// ```
    /// use zingo_status::confirmation_status::ConfirmationStatus;
    /// use zcash_protocol::consensus::BlockHeight;
    ///
    /// let status = ConfirmationStatus::Confirmed(15.into());
    /// assert_eq!(status.get_height(), 15.into());
    /// ```
    #[must_use]
    pub fn get_height(&self) -> BlockHeight {
        match self {
            Self::Confirmed(self_height) => *self_height,
            Self::Mempool(self_height) => *self_height,
            Self::Transmitted(self_height) => *self_height,
            Self::Calculated(self_height) => *self_height,
            Self::Failed(self_height) => *self_height,
        }
    }

    fn serialized_version() -> u8 {
        1
    }

    /// Deserialize into `reader`
    pub fn read<R: Read>(mut reader: R) -> std::io::Result<Self> {
        let version = reader.read_u8()?;
        let status = reader.read_u8()?;
        let block_height = BlockHeight::from_u32(reader.read_u32::<LittleEndian>()?);

        match version {
            0 => match status {
                0 => Ok(Self::Calculated(block_height)),
                1 => Ok(Self::Transmitted(block_height)),
                2 => Ok(Self::Mempool(block_height)),
                3 => Ok(Self::Confirmed(block_height)),
                _ => Err(std::io::Error::new(
                    std::io::ErrorKind::InvalidData,
                    "failed to read status",
                )),
            },
            1.. => match status {
                0 => Ok(Self::Confirmed(block_height)),
                1 => Ok(Self::Mempool(block_height)),
                2 => Ok(Self::Transmitted(block_height)),
                3 => Ok(Self::Calculated(block_height)),
                4 => Ok(Self::Failed(block_height)),
                _ => Err(std::io::Error::new(
                    std::io::ErrorKind::InvalidData,
                    "failed to read status",
                )),
            },
        }
    }

    /// Serialize into `writer`
    pub fn write<W: Write>(&self, writer: &mut W) -> std::io::Result<()> {
        writer.write_u8(Self::serialized_version())?;
        writer.write_u8(match self {
            Self::Confirmed(_) => 0,
            Self::Mempool(_) => 1,
            Self::Transmitted(_) => 2,
            Self::Calculated(_) => 3,
            Self::Failed(_) => 4,
        })?;
        writer.write_u32::<LittleEndian>(self.get_height().into())
    }
}

/// a public interface, writ in stone
impl std::fmt::Display for ConfirmationStatus {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::Confirmed(_h) => {
                write!(f, "confirmed")
            }
            Self::Mempool(_h) => {
                write!(f, "mempool")
            }
            Self::Transmitted(_h) => {
                write!(f, "transmitted")
            }
            Self::Calculated(_h) => {
                write!(f, "calculated")
            }
            Self::Failed(_h) => {
                write!(f, "failed")
            }
        }
    }
}
#[test]
fn stringify_display() {
    let status = ConfirmationStatus::Transmitted(BlockHeight::from_u32(16_000));
    let string = format!("{status}");
    assert_eq!(string, "transmitted");
}

/// a more complete stringification
impl std::fmt::Debug for ConfirmationStatus {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::Confirmed(h) => {
                let hi = u32::from(*h);
                write!(f, "Confirmed at {hi}")
            }
            Self::Mempool(h) => {
                let hi = u32::from(*h);
                write!(f, "Mempool for {hi}")
            }
            Self::Transmitted(h) => {
                let hi = u32::from(*h);
                write!(f, "Transmitted for {hi}")
            }
            Self::Calculated(h) => {
                let hi = u32::from(*h);
                write!(f, "Calculated for {hi}")
            }
            Self::Failed(h) => {
                let hi = u32::from(*h);
                write!(f, "Failed. Last updated at {hi}")
            }
        }
    }
}
#[test]
fn stringify_debug() {
    let status = ConfirmationStatus::Transmitted(BlockHeight::from_u32(16_000));
    let string = format!("{status:?}");
    assert_eq!(string, "Transmitted for 16000");
}

impl From<ConfirmationStatus> for String {
    fn from(value: ConfirmationStatus) -> Self {
        format!("{value}")
    }
}
