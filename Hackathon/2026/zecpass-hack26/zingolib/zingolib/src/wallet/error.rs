//! Errors for [`crate::wallet`] and sub-modules

use std::convert::Infallible;

use pepper_sync::{error::ScanError, wallet::OutputId};
use shardtree::error::ShardTreeError;
use zcash_keys::keys::DerivationError;
use zcash_primitives::transaction::TxId;
use zcash_protocol::{PoolType, ShieldedProtocol, consensus::BlockHeight};

use super::output::OutputRef;

/// Top level wallet errors
// TODO: remove external types from public API
#[derive(Debug, thiserror::Error)]
pub enum WalletError {
    /// Key error
    #[error("Key error. {0}")]
    KeyError(#[from] KeyError),
    /// Mnemonic not found.
    #[error("Mnemonic not found.")]
    MnemonicNotFound,
    /// Mnemonic error
    #[error("Mnemonic error. {0}")]
    MnemonicError(#[from] bip0039::Error),
    /// Value outside the valid range of zatoshis
    #[error("Value outside valid range of zatoshis. {0:?}")]
    InvalidValue(#[from] zcash_protocol::value::BalanceError),
    /// Failed to read transaction.
    #[error("Failed to read transaction. {0:?}")]
    TransactionRead(std::io::Error),
    /// Failed to write transaction.
    #[error("Failed to write transaction. {0:?}")]
    TransactionWrite(std::io::Error),
    /// Removal error. Transaction has not failed. Only failed transactions may be removed from the wallet.
    #[error(
        "Removal error. Transaction has not failed. Only failed transactions may be removed from the wallet."
    )]
    RemovalError,
    /// Transaction not found in the wallet.
    #[error("Transaction not found in the wallet: {0}")]
    TransactionNotFound(TxId),
    /// Wallet block not found in the wallet.
    #[error("Wallet block at height {0} not found in the wallet.")]
    BlockNotFound(BlockHeight),
    /// Minimum confirmations must be non-zero.
    #[error("Minimum confirmations must be non-zero.")]
    MinimumConfirmationError,
    /// Failed to scan calculated transaction.
    #[error("Failed to scan calculated transaction. {0}")]
    CalculatedTxScanError(#[from] ScanError),
    /// Address parse error
    #[error("Address parse error. {0}")]
    ParseError(#[from] zcash_address::ParseError),
    /// No sync data. Wallet has never been synced with the block chain.
    #[error("No sync data. Wallet has never been synced with the block chain.")]
    NoSyncData,
    /// Maximum number of accounts already in use.
    #[error("Maximum number of accounts already in use.")]
    AccountCreationFailed,
    /// Shard store checkpoint not found.
    #[error("{shielded_protocol:?} shard store checkpoint not found at anchor height {height}.")]
    CheckpointNotFound {
        shielded_protocol: ShieldedProtocol,
        height: BlockHeight,
    },
    /// Shard tree error.
    #[error("Shard tree error. {0}")]
    ShardTreeError(#[from] ShardTreeError<Infallible>),
    /// Conversion failed
    // TODO: move to lightclient?
    #[error("Conversion failed. {0}")]
    ConversionFailed(#[from] crate::utils::error::ConversionError),
    /// Birthday below sapling error.
    #[error(
        "birthday {0} below sapling activation height {1}. pre-sapling wallets are not supported!"
    )]
    BirthdayBelowSapling(u32, u32),
    /// Cannot create a new wallet with a wallet base of `Read` variant as the wallet is already created and stored as bytes.
    #[error(
        "Cannot create a new wallet with a wallet base of `Read` variant as the wallet is already created and stored as bytes."
    )]
    WalletAlreadyCreated,
}

/// Price error
#[derive(Debug, thiserror::Error)]
pub enum PriceError {
    /// Price error
    #[error("price error. {0}")]
    PriceError(#[from] zingo_price::PriceError),
    /// Price list not initialised
    #[error("price list not initialised. please wait for sync to obtain time of wallet birthday")]
    NotInitialised,
}

/// Summary error
#[derive(Debug, thiserror::Error)]
pub enum SummaryError {
    /// Key error.
    #[error("key error. {0}")]
    KeyError(#[from] KeyError),
    /// Address parse error
    #[error("address parse error. {0}")]
    ParseError(#[from] zcash_address::ParseError),
    /// Spend error
    #[error("spend error. {0}")]
    SpendError(#[from] SpendError),
}

/// Errors associated with calculating transaction fee
#[derive(Debug)]
pub enum FeeError {
    /// Transparent spend not found in wallet
    SpendNotFound { txid: TxId, spend: String },
    /// Balance error
    BalanceError(zcash_protocol::value::BalanceError),
}

impl std::error::Error for FeeError {}

impl std::fmt::Display for FeeError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match &self {
            Self::SpendNotFound { txid, spend } => {
                write!(
                    f,
                    "Transparent spend not found for transaction id {txid}. Is the wallet fully synced? \nMissing spend: {spend}"
                )
            }
            Self::BalanceError(e) => write!(f, "{e}"),
        }
    }
}

impl From<zcash_protocol::value::BalanceError> for FeeError {
    fn from(value: zcash_protocol::value::BalanceError) -> Self {
        Self::BalanceError(value)
    }
}

/// Errors associated with spends
#[derive(Debug, thiserror::Error)]
pub enum SpendError {
    /// Transaction spends not found in wallet
    #[error(
        "spend not found for transaction id {txid}. is the wallet fully synced?\nmissing spend: {spend}"
    )]
    SpendNotFound {
        pool: PoolType,
        txid: TxId,
        spend: String,
    },
    /// Output has incorrect spending transaction id
    #[error("output has incorrect spending transaction id: {txid}.\noutput id: {output_id}")]
    IncorrectSpendingTransaction { output_id: OutputId, txid: TxId },
}

/// Errors associated with balance calculation
#[derive(Debug, thiserror::Error)]
pub enum BalanceError {
    /// Key error
    #[error("key error. {0}")]
    KeyError(#[from] KeyError),
    /// Conversion failed
    #[error("conversion failed. {0}")]
    ConversionFailed(#[from] crate::utils::error::ConversionError),
    /// Summation overflow
    #[error("overflow occured during summation.")]
    Overflow,
}

/// Errors associated with key and address derivation
// TODO: make error private as contains external crate types. have public API safe higher level error type i.e. WalletError.
#[derive(Debug, thiserror::Error)]
pub enum KeyError {
    /// Error associated with standard IO
    #[error("{0}")]
    IoError(#[from] std::io::Error),
    /// Invalid account ID
    #[error("Account ID should be at most 31 bits")]
    InvalidAccountId(#[from] zip32::TryFromIntError),
    /// Invalid account ID
    #[error("No keys found for the given account id. Try adding the account.")]
    NoAccountKeys,
    /// Key derivation failed
    #[error("Key derivation failed")]
    KeyDerivationError(#[from] DerivationError),
    /// Key decoding failed
    #[error("Key decoding failed")]
    KeyDecodingError,
    /// Key parsing failed
    #[error("Key parsing failed. {0}")]
    KeyParseError(#[from] zcash_address::unified::ParseError),
    /// No spend capability
    #[error("No spend capability")]
    NoSpendCapability,
    /// No view capability
    #[error("No view capability")]
    NoViewCapability,
    /// Invalid non-hardened child indexes
    #[error("Outside range of non-hardened child indexes")]
    InvalidNonHardenedChildIndex,
    /// Network mismatch
    #[error("Decoded unified full viewing key does not match current network")]
    NetworkMismatch,
    /// Invalid format
    #[error("Viewing keys must be imported in the unified format")]
    InvalidFormat,
    /// Unified address missing shielded receiver
    #[error("Unified address must contain a shielded receiver")]
    UnifiedAddressError,
    /// Transparent address generation failed. Latest transparent address has not received funds.
    #[error(
        "Transparent address generation failed. Latest transparent address has not received funds."
    )]
    GapError,
    /// Invalid mnemonic phrase.
    #[error("Invalid mnemonic phrase: {0}")]
    InvalidMnemonicPhrase(#[from] bip0039::Error),
}

impl From<bip32::Error> for KeyError {
    fn from(value: bip32::Error) -> Self {
        Self::KeyDerivationError(DerivationError::Transparent(value))
    }
}

#[allow(missing_docs)] // error types document themselves
#[derive(Debug, thiserror::Error)]
pub enum CalculateTransactionError<NoteRef> {
    #[error("No unified spending key found for this account. {0}")]
    NoSpendingKey(#[from] crate::wallet::error::KeyError),
    #[error("Failed to load sapling paramaters. {0}")]
    SaplingParams(String),
    #[error("Failed to calculate transaction. {0}")]
    Calculation(
        zcash_client_backend::data_api::error::Error<
            WalletError,
            Infallible,
            Infallible,
            zcash_primitives::transaction::fees::zip317::FeeError,
            zcash_primitives::transaction::fees::zip317::FeeError,
            NoteRef,
        >,
    ),
    #[error("Only tex multistep transactions are supported!")]
    NonTexMultiStep,
}

/// Errors that can result from constructing send proposals.
#[derive(Debug, thiserror::Error)]
pub enum ProposeSendError {
    /// error in using trait to create spend proposal
    #[error("{0}")]
    Proposal(
        zcash_client_backend::data_api::error::Error<
            WalletError,
            WalletError,
            zcash_client_backend::data_api::wallet::input_selection::GreedyInputSelectorError,
            zcash_primitives::transaction::fees::zip317::FeeError,
            zcash_primitives::transaction::fees::zip317::FeeError,
            OutputRef,
        >,
    ),
    /// failed to construct a transaction request
    #[error("{0}")]
    TransactionRequestFailed(#[from] zcash_client_backend::zip321::Zip321Error),
    /// send all is transferring no value
    #[error("send all is transferring no value. only enough funds to pay the fees!")]
    ZeroValueSendAll,
    /// failed to calculate balance.
    #[error("failed to calculated balance. {0}")]
    BalanceError(#[from] crate::wallet::error::BalanceError),
}

/// Errors that can result from constructing shield proposals.
#[derive(Debug, thiserror::Error)]
pub enum ProposeShieldError {
    /// error in using trait to create shielding proposal
    #[error("{0}")]
    Component(
        zcash_client_backend::data_api::error::Error<
            WalletError,
            WalletError,
            zcash_client_backend::data_api::wallet::input_selection::GreedyInputSelectorError,
            zcash_primitives::transaction::fees::zip317::FeeError,
            zcash_primitives::transaction::fees::zip317::FeeError,
            Infallible,
        >,
    ),
    /// Insufficient transparent funds to shield.
    #[error("insufficient transparent funds to shield.")]
    InsufficientFunds,
    /// Address parse error.
    #[error("address parse error. {0}")]
    AddressParseError(#[from] zcash_address::ParseError),
}
