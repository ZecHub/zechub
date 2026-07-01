//! Pepper sync error module

use std::{array::TryFromSliceError, convert::Infallible};

use shardtree::error::ShardTreeError;
use zcash_primitives::{block::BlockHash, transaction::TxId};
use zcash_protocol::consensus::BlockHeight;
use zcash_protocol::{PoolType, ShieldedProtocol};

use crate::wallet::OutputId;

/// Top level error enumerating any error that may occur during sync
#[derive(Debug, thiserror::Error)]
pub enum SyncError<E>
where
    E: std::fmt::Debug + std::fmt::Display,
{
    /// Mempool error.
    #[error("mempool error. {0}")]
    MempoolError(#[from] MempoolError),
    /// Scan error.
    #[error("scan error. {0}")]
    ScanError(#[from] ScanError),
    /// Server error.
    #[error("server error. {0}")]
    ServerError(#[from] ServerError),
    /// Sync mode error.
    #[error("sync mode error. {0}")]
    SyncModeError(#[from] SyncModeError),
    /// Chain error.
    #[error("wallet height {0} is more than {1} blocks ahead of best chain height {2}")]
    ChainError(u32, u32, u32),
    /// Birthday below sapling error.
    #[error(
        "birthday {0} below sapling activation height {1}. pre-sapling wallets are not supported!"
    )]
    BirthdayBelowSapling(u32, u32),
    /// Shard tree error.
    #[error("shard tree error. {0}")]
    ShardTreeError(#[from] ShardTreeError<Infallible>),
    /// Critical non-recoverable truncation error due to missing shard tree checkpoints.
    #[error(
        "critical non-recoverable truncation error at height {0} due to missing {1} shard tree checkpoints. wallet data cleared. rescan required."
    )]
    TruncationError(BlockHeight, PoolType),
    /// Transparent address derivation error.
    #[error("transparent address derivation error. {0}")]
    TransparentAddressDerivationError(bip32::Error),
    /// Wallet error.
    #[error("wallet error. {0}")]
    WalletError(E),
}

impl<E: std::fmt::Debug + std::fmt::Display> SyncError<E> {
    /// Returns `true` if this error is likely transient and retrying sync
    /// (possibly against a different server) may succeed.
    ///
    /// Server errors from failed gRPC requests and mempool stream failures
    /// are recommend_same_server. Configuration errors, wallet corruption, and data
    /// integrity failures are not.
    pub fn recommend_same_server(&self) -> bool {
        match self {
            // Network/server issues — retry may help, especially with a different server.
            SyncError::ServerError(e) => e.recommend_same_server(),
            SyncError::MempoolError(_) => true,

            // Local or configuration errors — retrying won't help.
            SyncError::ScanError(_)
            | SyncError::SyncModeError(_)
            | SyncError::ChainError(..)
            | SyncError::BirthdayBelowSapling(..)
            | SyncError::ShardTreeError(_)
            | SyncError::TruncationError(..)
            | SyncError::TransparentAddressDerivationError(_)
            | SyncError::WalletError(_) => false,
        }
    }
}

impl ServerError {
    /// Returns `true` if this server error is likely transient.
    ///
    /// gRPC request failures (timeouts, connection drops) are recommend_same_server.
    /// Invalid data from the server suggests a bad server that should be
    /// avoided rather than retried.
    pub fn recommend_same_server(&self) -> bool {
        match self {
            // Internal channel issue — retry may help after restart.
            ServerError::FetcherDropped => true,

            // gRPC request failure — the server may be down or overloaded.
            // Switch to a different server rather than retrying the same one.
            ServerError::RequestFailed(_) => false,

            // Bad data from server — retrying the same server won't help.
            ServerError::InvalidFrontier(_)
            | ServerError::InvalidTransaction(_)
            | ServerError::InvalidSubtreeRoot
            | ServerError::ChainVerificationError
            | ServerError::GenesisBlockOnly => false,
        }
    }
}

/// Recommended action when sync fails.
///
/// Returned by [`SyncError::recovery_recommendation`] to give callers (zingo-cli,
/// zingo-mobile, etc.) a concrete decision without needing to match on
/// error internals.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum SyncRecoveryObservables {
    /// The error is transient (e.g. timeout, connection drop).
    /// Retrying sync with the same server may succeed.
    MaybeRecoverableServer,
    /// The server returned invalid or unverifiable data.
    /// A different server should be tried if available.
    ServerUnavailable,
    /// The error is not recoverable by retrying or switching servers.
    /// User intervention is required (e.g. rescan, fix config).
    Abort,
}

impl<E: std::fmt::Debug + std::fmt::Display> SyncError<E> {
    /// Returns the recommended recovery action for this error.
    ///
    /// This is the primary entry point for callers that need to decide
    /// whether to retry, switch servers, or give up.
    pub fn recovery_recommendation(&self) -> SyncRecoveryObservables {
        match self {
            SyncError::ServerError(e) => e.recovery_recommendation(),
            SyncError::MempoolError(_) => SyncRecoveryObservables::MaybeRecoverableServer,

            SyncError::ScanError(ScanError::ServerError(e)) => e.recovery_recommendation(),
            SyncError::ScanError(_) => SyncRecoveryObservables::Abort,

            SyncError::SyncModeError(_)
            | SyncError::ChainError(..)
            | SyncError::BirthdayBelowSapling(..)
            | SyncError::ShardTreeError(_)
            | SyncError::TruncationError(..)
            | SyncError::TransparentAddressDerivationError(_)
            | SyncError::WalletError(_) => SyncRecoveryObservables::Abort,
        }
    }
}

impl ServerError {
    /// Returns the recommended recovery action for this server error.
    pub fn recovery_recommendation(&self) -> SyncRecoveryObservables {
        match self {
            // Internal channel issue — same server may work after restart.
            ServerError::FetcherDropped => SyncRecoveryObservables::MaybeRecoverableServer,
            // gRPC request failure or bad data — try a different server.
            ServerError::RequestFailed(_)
            | ServerError::InvalidFrontier(_)
            | ServerError::InvalidTransaction(_)
            | ServerError::InvalidSubtreeRoot
            | ServerError::ChainVerificationError => SyncRecoveryObservables::ServerUnavailable,
            // Empty chain — no point retrying anywhere.
            ServerError::GenesisBlockOnly => SyncRecoveryObservables::Abort,
        }
    }
}

/// Sync status errors.
#[derive(Debug, thiserror::Error)]
pub enum SyncStatusError<E>
where
    E: std::fmt::Debug + std::fmt::Display,
{
    /// No sync data. Wallet has never been synced with the block chain.
    #[error("No sync data. Wallet has never been synced with the block chain.")]
    NoSyncData,
    /// Wallet error.
    #[error("wallet error. {0}")]
    WalletError(E),
}

/// Mempool errors.
#[derive(Debug, thiserror::Error)]
pub enum MempoolError {
    /// Server error.
    #[error("server error. {0}")]
    ServerError(#[from] ServerError),
    /// Timed out fetching mempool stream during shutdown.
    #[error(
        "timed out fetching mempool stream during shutdown.\nNON-CRITICAL: sync completed successfully but may not have scanned transactions in the mempool."
    )]
    ShutdownWithoutStream,
}

/// Scan errors.
#[derive(Debug, thiserror::Error)]
pub enum ScanError {
    /// Server error.
    #[error("server error. {0}")]
    ServerError(#[from] ServerError),
    /// Continuity error.
    #[error("continuity error. {0}")]
    ContinuityError(#[from] ContinuityError),
    /// Zcash client backend scan error
    #[error("{0}")]
    EncodingError(#[from] EncodingInvalid),
    /// Invalid sapling nullifier
    #[error("invalid sapling nullifier. {0}")]
    InvalidSaplingNullifier(#[from] TryFromSliceError),
    /// Invalid orchard nullifier length
    #[error("invalid orchard nullifier length. should be 32 bytes, found {0}")]
    InvalidOrchardNullifierLength(usize),
    /// Invalid orchard nullifier
    #[error("invalid orchard nullifier")]
    InvalidOrchardNullifier,
    /// Invalid sapling output
    // TODO: add output data
    #[error("invalid sapling output")]
    InvalidSaplingOutput,
    /// Invalid orchard action
    // TODO: add output data
    #[error("invalid orchard action")]
    InvalidOrchardAction,
    /// Incorrect tree size
    #[error(
        "incorrect tree size. {shielded_protocol} tree size recorded in block metadata {block_metadata_size} does not match calculated size {calculated_size}"
    )]
    IncorrectTreeSize {
        /// Shielded protocol
        shielded_protocol: PoolType,
        /// Block metadata size
        block_metadata_size: u32,
        /// Calculated size
        calculated_size: u32,
    },
    /// Txid of transaction returned by the server does not match requested txid.
    #[error(
        "txid of transaction returned by the server does not match requested txid.\ntxid requested: {txid_requested}\ntxid returned: {txid_returned}"
    )]
    IncorrectTxid {
        /// Txid requested
        txid_requested: TxId,
        /// Txid returned
        txid_returned: TxId,
    },
    /// Decrypted note nullifier and position data not found.
    #[error("decrypted note nullifier and position data not found. output id: {0:?}")]
    DecryptedNoteDataNotFound(OutputId),
    /// Invalid memo bytes..
    #[error("invalid memo bytes. {0}")]
    InvalidMemoBytes(#[from] zcash_protocol::memo::Error),
    /// Failed to parse encoded address.
    #[error("failed to parse encoded address. {0}")]
    AddressParseError(#[from] zcash_address::unified::ParseError),
}

/// The encoding of a compact Sapling output or compact Orchard action was invalid.
#[derive(Debug, thiserror::Error)]
#[error("{pool_type:?} output {index} of transaction {txid} was improperly encoded.")]
pub struct EncodingInvalid {
    pub(crate) at_height: BlockHeight,
    pub(crate) txid: TxId,
    pub(crate) pool_type: ShieldedProtocol,
    pub(crate) index: usize,
    pub(crate) error: CompactFormatError,
}

/// An error indicating that a field of a compact format structure could not be parsed.
#[derive(Clone, Debug)]
pub enum CompactFormatError {
    /// A byte slice had an invalid length for the expected field.
    InvalidLength(std::array::TryFromSliceError),
    /// A field value did not represent a valid protocol element.
    InvalidValue,
}

impl std::fmt::Display for CompactFormatError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            CompactFormatError::InvalidLength(e) => write!(f, "Invalid compact format field: {e}"),
            CompactFormatError::InvalidValue => {
                write!(f, "Compact format field is not a valid protocol element")
            }
        }
    }
}

/// Block continuity errors.
#[derive(Debug, thiserror::Error)]
pub enum ContinuityError {
    /// Height discontinuity.
    #[error(
        "height discontinuity. block with height {height} is not continuous with previous block height {previous_block_height}"
    )]
    HeightDiscontinuity {
        /// Block height
        height: BlockHeight,
        /// Previous block height
        previous_block_height: BlockHeight,
    },
    /// Hash discontinuity.
    #[error(
        "hash discontinuity. block prev_hash {prev_hash} with height {height} does not match previous block hash {previous_block_hash}"
    )]
    HashDiscontinuity {
        /// Block height
        height: BlockHeight,
        /// Block's previous block hash data
        prev_hash: BlockHash,
        /// Actual previous block hash
        previous_block_hash: BlockHash,
    },
}

/// Server errors.
///
/// Errors associated with connecting to the server and receiving invalid data.
#[derive(Debug, thiserror::Error)]
pub enum ServerError {
    /// Server request failed.
    #[error("server request failed. {0}")]
    RequestFailed(#[from] tonic::Status),
    /// Server returned invalid frontier.
    #[error("server returned invalid frontier. {0}")]
    InvalidFrontier(std::io::Error),
    /// Server returned invalid transaction.
    #[error("server returned invalid transaction. {0}")]
    InvalidTransaction(std::io::Error),
    /// Server returned invalid subtree root.
    // TODO: add more info
    #[error("server returned invalid subtree root.")]
    InvalidSubtreeRoot,
    /// Server returned blocks that could not be verified against wallet block data. Exceeded max verification window.
    #[error(
        "server returned blocks that could not be verified against wallet block data. exceeded max verification window. wallet data has been cleared as shard tree data cannot be truncated further. wallet rescan required."
    )]
    ChainVerificationError,
    /// Fetcher task was dropped.
    #[error("fetcher task was dropped.")]
    FetcherDropped,
    /// Server reports only the genesis block exists.
    #[error("server reports only the genesis block exists.")]
    GenesisBlockOnly,
}

/// Sync mode error.
#[derive(Debug, thiserror::Error)]
pub enum SyncModeError {
    /// Invalid sync mode.
    #[error("invalid sync mode. {0}")]
    InvalidSyncMode(u8),
    /// Sync is already running.
    #[error("sync is already running")]
    SyncAlreadyRunning,
    /// Sync is not running.
    #[error("sync is not running")]
    SyncNotRunning,
    /// Sync is not paused.
    #[error("sync is not paused")]
    SyncNotPaused,
}

#[cfg(test)]
mod tests {
    use super::*;

    /// Use `String` as the wallet error type for testing.
    type TestSyncError = SyncError<String>;

    mod recommend_same_server {
        use super::*;

        mod server_error {
            use super::*;

            #[test]
            fn fetcher_dropped() {
                assert!(ServerError::FetcherDropped.recommend_same_server());
            }
        }

        mod sync_error {
            use super::*;

            #[test]
            fn mempool_error() {
                let e: TestSyncError = MempoolError::ShutdownWithoutStream.into();
                assert!(e.recommend_same_server());
            }
        }
    }

    mod recommend_change_server {
        use super::*;

        mod server_error {
            use super::*;

            #[test]
            fn request_failed() {
                let e = ServerError::RequestFailed(tonic::Status::deadline_exceeded("timeout"));
                assert!(!e.recommend_same_server());
            }

            #[test]
            fn invalid_frontier() {
                let e = ServerError::InvalidFrontier(std::io::Error::other("bad frontier"));
                assert!(!e.recommend_same_server());
            }

            #[test]
            fn invalid_transaction() {
                let e = ServerError::InvalidTransaction(std::io::Error::other("bad tx"));
                assert!(!e.recommend_same_server());
            }

            #[test]
            fn invalid_subtree_root() {
                assert!(!ServerError::InvalidSubtreeRoot.recommend_same_server());
            }

            #[test]
            fn chain_verification_error() {
                assert!(!ServerError::ChainVerificationError.recommend_same_server());
            }

            #[test]
            fn genesis_block_only() {
                assert!(!ServerError::GenesisBlockOnly.recommend_same_server());
            }
        }

        mod sync_error {
            use super::*;

            #[test]
            fn server_request_failed() {
                let e: TestSyncError =
                    ServerError::RequestFailed(tonic::Status::deadline_exceeded("timeout")).into();
                assert!(!e.recommend_same_server());
            }

            #[test]
            fn sync_mode_error() {
                let e: TestSyncError = SyncModeError::SyncAlreadyRunning.into();
                assert!(!e.recommend_same_server());
            }

            #[test]
            fn chain_error() {
                let e: TestSyncError = SyncError::ChainError(100, 50, 50);
                assert!(!e.recommend_same_server());
            }

            #[test]
            fn birthday_below_sapling() {
                let e: TestSyncError = SyncError::BirthdayBelowSapling(100, 419200);
                assert!(!e.recommend_same_server());
            }

            #[test]
            fn wallet_error() {
                let e: TestSyncError = SyncError::WalletError("db locked".to_string());
                assert!(!e.recommend_same_server());
            }
        }
    }

    mod recovery_recommendation {
        use super::*;

        mod retry_same_server {
            use super::*;

            #[test]
            fn fetcher_dropped() {
                assert_eq!(
                    ServerError::FetcherDropped.recovery_recommendation(),
                    SyncRecoveryObservables::MaybeRecoverableServer
                );
            }

            #[test]
            fn mempool_error() {
                let e: TestSyncError = MempoolError::ShutdownWithoutStream.into();
                assert_eq!(
                    e.recovery_recommendation(),
                    SyncRecoveryObservables::MaybeRecoverableServer
                );
            }
        }

        mod try_different_server {
            use super::*;

            #[test]
            fn request_failed() {
                let e = ServerError::RequestFailed(tonic::Status::deadline_exceeded("timeout"));
                assert_eq!(
                    e.recovery_recommendation(),
                    SyncRecoveryObservables::ServerUnavailable
                );
            }

            #[test]
            fn sync_error_from_request_failed() {
                let e: TestSyncError =
                    ServerError::RequestFailed(tonic::Status::unavailable("down")).into();
                assert_eq!(
                    e.recovery_recommendation(),
                    SyncRecoveryObservables::ServerUnavailable
                );
            }

            #[test]
            fn invalid_frontier() {
                let e = ServerError::InvalidFrontier(std::io::Error::other("bad"));
                assert_eq!(
                    e.recovery_recommendation(),
                    SyncRecoveryObservables::ServerUnavailable
                );
            }

            #[test]
            fn invalid_transaction() {
                let e = ServerError::InvalidTransaction(std::io::Error::other("bad"));
                assert_eq!(
                    e.recovery_recommendation(),
                    SyncRecoveryObservables::ServerUnavailable
                );
            }

            #[test]
            fn invalid_subtree_root() {
                assert_eq!(
                    ServerError::InvalidSubtreeRoot.recovery_recommendation(),
                    SyncRecoveryObservables::ServerUnavailable
                );
            }

            #[test]
            fn chain_verification_error() {
                assert_eq!(
                    ServerError::ChainVerificationError.recovery_recommendation(),
                    SyncRecoveryObservables::ServerUnavailable
                );
            }

            #[test]
            fn sync_error_from_invalid_frontier() {
                let e: TestSyncError =
                    ServerError::InvalidFrontier(std::io::Error::other("bad")).into();
                assert_eq!(
                    e.recovery_recommendation(),
                    SyncRecoveryObservables::ServerUnavailable
                );
            }

            #[test]
            fn scan_error_wrapping_server_error() {
                let e: TestSyncError =
                    ScanError::ServerError(ServerError::InvalidSubtreeRoot).into();
                assert_eq!(
                    e.recovery_recommendation(),
                    SyncRecoveryObservables::ServerUnavailable
                );
            }
        }

        mod abort {
            use super::*;

            #[test]
            fn genesis_block_only() {
                assert_eq!(
                    ServerError::GenesisBlockOnly.recovery_recommendation(),
                    SyncRecoveryObservables::Abort
                );
            }

            #[test]
            fn sync_mode_error() {
                let e: TestSyncError = SyncModeError::SyncAlreadyRunning.into();
                assert_eq!(e.recovery_recommendation(), SyncRecoveryObservables::Abort);
            }

            #[test]
            fn chain_error() {
                let e: TestSyncError = SyncError::ChainError(100, 50, 50);
                assert_eq!(e.recovery_recommendation(), SyncRecoveryObservables::Abort);
            }

            #[test]
            fn wallet_error() {
                let e: TestSyncError = SyncError::WalletError("db locked".to_string());
                assert_eq!(e.recovery_recommendation(), SyncRecoveryObservables::Abort);
            }
        }
    }
}
