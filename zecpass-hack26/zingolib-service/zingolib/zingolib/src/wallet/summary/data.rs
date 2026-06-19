//! Data structures for wallet summaries.

use chrono::DateTime;
use json::JsonValue;

use zcash_protocol::{TxId, consensus::BlockHeight};

use pepper_sync::keys::transparent::TransparentScope;
use zingo_status::confirmation_status::ConfirmationStatus;

use crate::wallet::output::SpendStatus;

/// Scope enum with `std::fmt::Display` impl for use with summaries.
#[derive(Clone, Debug, PartialEq)]
pub enum Scope {
    External,
    Internal,
}

impl std::fmt::Display for Scope {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}",
            match self {
                Scope::External => "external",
                Scope::Internal => "internal",
            }
        )
    }
}

impl From<zip32::Scope> for Scope {
    fn from(value: zip32::Scope) -> Self {
        match value {
            zip32::Scope::External => Scope::External,
            zip32::Scope::Internal => Scope::Internal,
        }
    }
}

/// Transaction kind.
#[derive(Clone, Copy, PartialEq, Debug)]
pub enum TransactionKind {
    /// Sent transaction.
    Sent(SendType),
    /// Received transaction.
    Received,
}

impl std::fmt::Display for TransactionKind {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            TransactionKind::Received => write!(f, "received"),
            TransactionKind::Sent(SendType::Send) => write!(f, "sent"),
            TransactionKind::Sent(SendType::Shield) => write!(f, "shield"),
            TransactionKind::Sent(SendType::SendToSelf) => write!(f, "send-to-self"),
        }
    }
}

/// Send type.
#[derive(Clone, Copy, PartialEq, Debug)]
pub enum SendType {
    /// Transaction is sending funds to recipient other than the creator.
    Send,
    /// Transaction is only sending funds from transparent pool to the creator's shielded pool.
    Shield,
    /// Transaction is only sending funds to the creator's address(es) and is not a shield.
    SendToSelf,
}

/// Value transfer kind.
#[derive(Clone, Copy, PartialEq, Eq, Debug)]
pub enum ValueTransferKind {
    /// Sent value transfer.
    Sent(SentValueTransfer),
    /// Received value transfer.
    Received,
}

/// Sent value transfer kind.
#[derive(Clone, Copy, PartialEq, Eq, Debug)]
pub enum SentValueTransfer {
    /// Transferring funds to an address that is not derived by the wallet.
    Send,
    /// Transferring funds to an address that is derived by the wallet.
    SendToSelf(SelfSendValueTransfer),
}

/// Send-to-self value transfer kind.
#[derive(Clone, Copy, PartialEq, Eq, Debug)]
pub enum SelfSendValueTransfer {
    /// No memo.
    ///
    /// Only occurs when there are no other value transfers created for a given transaction.
    Basic,
    /// Shielding transparent funds to a shielded pool.
    Shield,
    /// Sending memo to a wallet's own address.
    MemoToSelf,
    /// Transferring funds from a shielded pool to one of the wallet's own refund (ephemeral) addresses as the
    /// first step in a TEX transaction.
    Refund,
}

impl std::fmt::Display for ValueTransferKind {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            ValueTransferKind::Received => write!(f, "received"),
            ValueTransferKind::Sent(sent) => match sent {
                SentValueTransfer::Send => write!(f, "sent"),
                SentValueTransfer::SendToSelf(selfsend) => match selfsend {
                    SelfSendValueTransfer::Basic => write!(f, "send-to-self"),
                    SelfSendValueTransfer::Shield => write!(f, "shield"),
                    SelfSendValueTransfer::MemoToSelf => write!(f, "memo-to-self"),
                    SelfSendValueTransfer::Refund => write!(f, "rejection"),
                },
            },
        }
    }
}

/// Transaction summary.
#[derive(Clone, PartialEq, Debug)]
pub struct TransactionSummary {
    pub txid: TxId,
    pub datetime: u32,
    pub status: ConfirmationStatus,
    pub blockheight: BlockHeight,
    pub kind: TransactionKind,
    pub value: u64,
    pub fee: Option<u64>,
    pub zec_price: Option<f32>,
    pub orchard_notes: Vec<BasicNoteSummary>,
    pub sapling_notes: Vec<BasicNoteSummary>,
    pub transparent_coins: Vec<BasicCoinSummary>,
    pub outgoing_orchard_notes: Vec<OutgoingNoteSummary>,
    pub outgoing_sapling_notes: Vec<OutgoingNoteSummary>,
    pub outgoing_transparent_coins: Vec<OutgoingCoinSummary>,
}

impl TransactionSummary {
    #[must_use]
    pub fn balance_delta(&self) -> Option<i64> {
        match self.kind {
            TransactionKind::Sent(SendType::Send) => {
                self.fee.map(|fee| -((self.value + fee) as i64))
            }
            TransactionKind::Sent(SendType::Shield | SendType::SendToSelf) => {
                self.fee.map(|fee| -(fee as i64))
            }
            TransactionKind::Received => Some(self.value as i64),
        }
    }
    /// Prepares the fields in the summary for display
    #[must_use]
    pub fn prepare_for_display(
        &self,
    ) -> (
        String,
        String,
        String,
        BasicNoteSummaries,
        BasicNoteSummaries,
        BasicCoinSummaries,
        OutgoingNoteSummaries,
        OutgoingNoteSummaries,
        OutgoingCoinSummaries,
    ) {
        let datetime = if let Some(dt) = DateTime::from_timestamp(i64::from(self.datetime), 0) {
            format!("{dt}")
        } else {
            "not available".to_string()
        };
        let fee = if let Some(f) = self.fee {
            f.to_string()
        } else {
            "not available".to_string()
        };
        let zec_price = if let Some(price) = self.zec_price {
            price.to_string()
        } else {
            "not available".to_string()
        };
        let orchard_notes = BasicNoteSummaries(self.orchard_notes.clone());
        let sapling_notes = BasicNoteSummaries(self.sapling_notes.clone());
        let transparent_coins = BasicCoinSummaries(self.transparent_coins.clone());
        let outgoing_orchard_notes = OutgoingNoteSummaries(self.outgoing_orchard_notes.clone());
        let outgoing_sapling_notes = OutgoingNoteSummaries(self.outgoing_sapling_notes.clone());
        let outgoing_transparent_coins =
            OutgoingCoinSummaries(self.outgoing_transparent_coins.clone());

        (
            datetime,
            fee,
            zec_price,
            orchard_notes,
            sapling_notes,
            transparent_coins,
            outgoing_orchard_notes,
            outgoing_sapling_notes,
            outgoing_transparent_coins,
        )
    }
}

impl std::fmt::Display for TransactionSummary {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let (
            datetime,
            fee,
            zec_price,
            orchard_notes,
            sapling_notes,
            transparent_coins,
            outgoing_orchard_notes,
            outgoing_sapling_notes,
            outgoing_transparent_coins,
        ) = self.prepare_for_display();
        write!(
            f,
            "{{
    txid: {}
    datetime: {}
    status: {}
    blockheight: {}
    kind: {}
    value: {}
    fee: {}
    zec price: {}
    orchard notes: {}
    sapling notes: {}
    transparent coins: {}
    outgoing orchard notes: {}
    outgoing sapling notes: {}
    outgoing transparent coins: {}
}}",
            self.txid,
            datetime,
            self.status,
            u64::from(self.blockheight),
            self.kind,
            self.value,
            fee,
            zec_price,
            orchard_notes,
            sapling_notes,
            transparent_coins,
            outgoing_orchard_notes,
            outgoing_sapling_notes,
            outgoing_transparent_coins,
        )
    }
}

impl From<TransactionSummary> for JsonValue {
    fn from(transaction: TransactionSummary) -> Self {
        json::object! {
            "txid" => transaction.txid.to_string(),
            "datetime" => transaction.datetime,
            "status" => transaction.status.to_string(),
            "blockheight" => u64::from(transaction.blockheight),
            "kind" => transaction.kind.to_string(),
            "value" => transaction.value,
            "fee" => transaction.fee,
            "zec_price" => transaction.zec_price,
            "orchard_notes" => JsonValue::from(transaction.orchard_notes),
            "sapling_notes" => JsonValue::from(transaction.sapling_notes),
            "transparent_coins" => JsonValue::from(transaction.transparent_coins),
            "outgoing_orchard_notes" => JsonValue::from(transaction.outgoing_orchard_notes),
            "outgoing_sapling_notes" => JsonValue::from(transaction.outgoing_sapling_notes),
            "outgoing_transparent_coins" => JsonValue::from(transaction.outgoing_transparent_coins),
        }
    }
}

/// Wraps a vec of transaction summaries for the implementation of `std::fmt::Display`
#[derive(PartialEq, Debug)]
pub struct TransactionSummaries(pub Vec<TransactionSummary>);

impl TransactionSummaries {
    /// Creates a new `TransactionSummaries` struct
    #[must_use]
    pub fn new(transaction_summaries: Vec<TransactionSummary>) -> Self {
        TransactionSummaries(transaction_summaries)
    }
    /// Implicitly dispatch to the wrapped data
    pub fn iter(&self) -> std::slice::Iter<'_, TransactionSummary> {
        self.0.iter()
    }
    /// Sum total of all fees paid in sending transactions
    #[must_use]
    pub fn paid_fees(&self) -> u64 {
        self.iter()
            .filter_map(|summary| {
                if matches!(summary.kind, TransactionKind::Sent(_)) && summary.status.is_confirmed()
                {
                    summary.fee
                } else {
                    None
                }
            })
            .sum()
    }
    /// A Vec of the txids
    #[must_use]
    pub fn txids(&self) -> Vec<TxId> {
        self.iter().map(|summary| summary.txid).collect()
    }
}

impl std::fmt::Display for TransactionSummaries {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        for transaction_summary in &self.0 {
            write!(f, "\n{transaction_summary}")?;
        }
        Ok(())
    }
}

impl From<TransactionSummaries> for JsonValue {
    fn from(transaction_summaries: TransactionSummaries) -> Self {
        let transaction_summaries: Vec<JsonValue> = transaction_summaries
            .0
            .into_iter()
            .map(JsonValue::from)
            .collect();
        json::object! {
            "transaction_summaries" => transaction_summaries
        }
    }
}

/// A value transfer is a note group abstraction.
/// A group of all notes sent to a specific address in a transaction.
#[derive(Clone, PartialEq)]
pub struct ValueTransfer {
    pub txid: TxId,
    pub datetime: u32,
    pub status: ConfirmationStatus,
    pub blockheight: BlockHeight,
    pub transaction_fee: Option<u64>,
    pub zec_price: Option<f32>,
    pub kind: ValueTransferKind,
    pub value: u64,
    pub recipient_address: Option<String>,
    pub pool_received: Option<String>,
    pub memos: Vec<String>,
}

impl std::fmt::Debug for ValueTransfer {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("ValueTransfer")
            .field("txid", &self.txid)
            .field("datetime", &self.datetime)
            .field("status", &self.status)
            .field("blockheight", &self.blockheight)
            .field("transaction_fee", &self.transaction_fee)
            .field("zec_price", &self.zec_price)
            .field("kind", &self.kind)
            .field("value", &self.value)
            .field("recipient_address", &self.recipient_address)
            .field("pool_received", &self.pool_received)
            .field("memos", &self.memos)
            .finish()
    }
}

impl std::fmt::Display for ValueTransfer {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let datetime = if let Some(dt) = DateTime::from_timestamp(i64::from(self.datetime), 0) {
            format!("{dt}")
        } else {
            "not available".to_string()
        };
        let transaction_fee = if let Some(f) = self.transaction_fee {
            f.to_string()
        } else {
            "not available".to_string()
        };
        let zec_price = if let Some(price) = self.zec_price {
            price.to_string()
        } else {
            "not available".to_string()
        };
        let recipient_address = if let Some(addr) = self.recipient_address.as_ref() {
            addr.clone()
        } else {
            "not available".to_string()
        };
        let pool_received = if let Some(pool) = self.pool_received.as_ref() {
            pool.clone()
        } else {
            "not available".to_string()
        };
        let mut memos = String::new();
        for (index, memo) in self.memos.iter().enumerate() {
            memos.push_str(&format!("\n\tmemo {}: {}", (index + 1), memo));
        }
        write!(
            f,
            "{{
    txid: {}
    datetime: {}
    status: {}
    blockheight: {}
    transaction fee: {}
    zec price: {}
    kind: {}
    value: {}
    recipient_address: {}
    pool_received: {}
    memos: {}
}}",
            self.txid,
            datetime,
            self.status,
            u64::from(self.blockheight),
            transaction_fee,
            zec_price,
            self.kind,
            self.value,
            recipient_address,
            pool_received,
            memos
        )
    }
}

impl From<ValueTransfer> for JsonValue {
    fn from(value_transfer: ValueTransfer) -> Self {
        json::object! {
            "txid" => value_transfer.txid.to_string(),
            "datetime" => value_transfer.datetime,
            "status" => value_transfer.status.to_string(),
            "blockheight" => u64::from(value_transfer.blockheight),
            "transaction_fee" => value_transfer.transaction_fee,
            "zec_price" => value_transfer.zec_price,
            "kind" => value_transfer.kind.to_string(),
            "value" => value_transfer.value,
            "recipient_address" => value_transfer.recipient_address,
            "pool_received" => value_transfer.pool_received,
            "memos" => value_transfer.memos
        }
    }
}

/// A wrapper struct for implementing display and json on a vec of value transfers
#[derive(PartialEq, Debug)]
pub struct ValueTransfers(Vec<ValueTransfer>);
impl<'a> std::iter::IntoIterator for &'a ValueTransfers {
    type Item = &'a ValueTransfer;
    type IntoIter = std::slice::Iter<'a, ValueTransfer>;

    fn into_iter(self) -> Self::IntoIter {
        self.iter()
    }
}
impl std::ops::Deref for ValueTransfers {
    type Target = Vec<ValueTransfer>;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
impl std::ops::DerefMut for ValueTransfers {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}
// Implement the Index trait
impl std::ops::Index<usize> for ValueTransfers {
    type Output = ValueTransfer; // The type of the value returned by the index

    fn index(&self, index: usize) -> &Self::Output {
        &self.0[index] // Forward the indexing operation to the underlying data structure
    }
}

impl ValueTransfers {
    /// Creates a new `ValueTransfer`
    #[must_use]
    pub fn new(value_transfers: Vec<ValueTransfer>) -> Self {
        ValueTransfers(value_transfers)
    }
}

impl std::fmt::Display for ValueTransfers {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        for value_transfer in &self.0 {
            write!(f, "\n{value_transfer}")?;
        }
        Ok(())
    }
}

impl From<ValueTransfers> for JsonValue {
    fn from(value_transfers: ValueTransfers) -> Self {
        let value_transfers: Vec<JsonValue> =
            value_transfers.0.into_iter().map(JsonValue::from).collect();
        json::object! {
            "value_transfers" => value_transfers
        }
    }
}

/// Note summary.
///
/// Intended for returning a standalone summary of all notes to the user / consumer outside the context of transactions.
#[allow(missing_docs)]
#[derive(Debug)]
pub struct NoteSummary {
    pub value: u64,
    pub status: ConfirmationStatus,
    pub block_height: BlockHeight,
    pub spend_status: SpendStatus,
    pub memo: Option<String>,
    pub time: u32,
    pub txid: TxId,
    pub output_index: u16,
    pub account_id: zip32::AccountId,
    pub scope: Scope,
}

impl std::fmt::Display for NoteSummary {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let memo = self.memo.clone().unwrap_or_default();
        let time = if let Some(dt) = chrono::DateTime::from_timestamp(i64::from(self.time), 0) {
            format!("{dt}")
        } else {
            "not available".to_string()
        };

        write!(
            f,
            "{{
                value: {}
                status: {} at block height {}
                spend status: {}
                memo: {}
                time: {}
                txid: {}
                output index: {}
                account id: {}
                scope: {}
            }}",
            self.value,
            self.status,
            self.block_height,
            self.spend_status,
            memo,
            time,
            self.txid,
            self.output_index,
            u32::from(self.account_id),
            self.scope
        )
    }
}

impl From<NoteSummary> for json::JsonValue {
    fn from(note: NoteSummary) -> Self {
        json::object! {
            "value" => note.value,
            "status" => format!("{} at block height {}", note.status, note.block_height),
            "spend_status" => note.spend_status.to_string(),
            "memo" => note.memo,
            "time" => note.time,
            "txid" => note.txid.to_string(),
            "output_index" => note.output_index,
            "account_id" => u32::from(note.account_id),
            "scope" => note.scope.to_string(),
        }
    }
}

/// A wrapper struct for implementing display and json on a vec of note summaries
#[derive(Debug)]
pub struct NoteSummaries(Vec<NoteSummary>);

impl NoteSummaries {
    /// Creates a new `NoteSummaries`
    #[must_use]
    pub fn new(note_summaries: Vec<NoteSummary>) -> Self {
        NoteSummaries(note_summaries)
    }
}

impl<'a> std::iter::IntoIterator for &'a NoteSummaries {
    type Item = &'a NoteSummary;
    type IntoIter = std::slice::Iter<'a, NoteSummary>;

    fn into_iter(self) -> Self::IntoIter {
        self.iter()
    }
}

impl std::ops::Deref for NoteSummaries {
    type Target = Vec<NoteSummary>;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl std::ops::DerefMut for NoteSummaries {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl std::ops::Index<usize> for NoteSummaries {
    type Output = NoteSummary; // The type of the value returned by the index

    fn index(&self, index: usize) -> &Self::Output {
        &self.0[index] // Forward the indexing operation to the underlying data structure
    }
}

impl std::fmt::Display for NoteSummaries {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        for value_transfer in &self.0 {
            write!(f, "\n{value_transfer}")?;
        }
        Ok(())
    }
}

impl From<NoteSummaries> for json::JsonValue {
    fn from(note_summaries: NoteSummaries) -> Self {
        let note_summaries: Vec<json::JsonValue> = note_summaries
            .0
            .into_iter()
            .map(json::JsonValue::from)
            .collect();
        json::object! {
            "note_summaries" => note_summaries

        }
    }
}

/// Basic note summary.
///
/// Intended in the context of a transaction summary to provide the most useful data to user without cluttering up
/// the interface. See [`crate::wallet::summary::``NoteSummary`] for a note summary that is intended for use independently.
#[derive(Clone, PartialEq, Debug)]
pub struct BasicNoteSummary {
    pub value: u64,
    pub spend_status: SpendStatus,
    pub output_index: u32,
    pub memo: Option<String>,
    // TODO: add key id with address index, not implemented into sync engine yet
}

impl BasicNoteSummary {
    /// Creates a `BasicNoteSummary` from parts
    #[must_use]
    pub fn from_parts(
        value: u64,
        spend_status: SpendStatus,
        output_index: u32,
        memo: Option<String>,
    ) -> Self {
        BasicNoteSummary {
            value,
            spend_status,
            output_index,
            memo,
        }
    }
}

impl std::fmt::Display for BasicNoteSummary {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let memo = self.memo.clone().unwrap_or_default();
        write!(
            f,
            "\t{{
            value: {}
            spend status: {}
            output index: {}
            memo: {}
        }}",
            self.value, self.spend_status, self.output_index, memo,
        )
    }
}

impl From<BasicNoteSummary> for JsonValue {
    fn from(note: BasicNoteSummary) -> Self {
        json::object! {
            "value" => note.value,
            "spend_status" => note.spend_status.to_string(),
            "output_index" => note.output_index,
            "memo" => note.memo,
        }
    }
}

/// Wraps a vec of note summaries for the implementation of `std::fmt::Display`
pub struct BasicNoteSummaries(Vec<BasicNoteSummary>);

impl std::fmt::Display for BasicNoteSummaries {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        for note in &self.0 {
            write!(f, "\n{note}")?;
        }
        Ok(())
    }
}

/// Coin summary.
///
/// Intended for returning a standalone summary of all transparent coins to the user / consumer outside the context of
/// transactions.
#[allow(missing_docs)]
pub struct CoinSummary {
    pub value: u64,
    pub status: ConfirmationStatus,
    pub block_height: BlockHeight,
    pub spend_status: SpendStatus,
    pub time: u32,
    pub txid: TxId,
    pub output_index: u16,
    pub account_id: zip32::AccountId,
    pub scope: TransparentScope,
    pub address_index: u32,
}

impl std::fmt::Display for CoinSummary {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let time = if let Some(dt) = chrono::DateTime::from_timestamp(i64::from(self.time), 0) {
            format!("{dt}")
        } else {
            "not available".to_string()
        };

        write!(
            f,
            "{{
                value: {}
                status: {} at block height {}
                spend status: {}
                time: {}
                txid: {}
                output index: {}
                account id: {}
                scope: {}
                address_index: {}
            }}",
            self.value,
            self.status,
            self.block_height,
            self.spend_status,
            time,
            self.txid,
            self.output_index,
            u32::from(self.account_id),
            self.scope,
            self.address_index,
        )
    }
}

impl From<CoinSummary> for json::JsonValue {
    fn from(coin: CoinSummary) -> Self {
        json::object! {
            "value" => coin.value,
            "status" => format!("{} at block height {}", coin.status, coin.block_height),
            "spend_status" => coin.spend_status.to_string(),
            "time" => coin.time,
            "txid" => coin.txid.to_string(),
            "output_index" => coin.output_index,
            "account_id" => u32::from(coin.account_id),
            "scope" => coin.scope.to_string(),
            "address_index" => coin.address_index
        }
    }
}

/// Transparent coin summary.
// TODO: add scope to distinguish "refund" scope value transfers
#[derive(Clone, PartialEq, Debug)]
pub struct BasicCoinSummary {
    pub value: u64,
    pub spend_summary: SpendStatus,
    pub output_index: u32,
}

impl BasicCoinSummary {
    /// Creates a `BasicCoinSummary` from parts
    #[must_use]
    pub fn from_parts(value: u64, spend_status: SpendStatus, output_index: u32) -> Self {
        BasicCoinSummary {
            value,
            spend_summary: spend_status,
            output_index,
        }
    }
}

impl std::fmt::Display for BasicCoinSummary {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "\t{{
            value: {}
            spend status: {}
            output index: {}
        }}",
            self.value, self.spend_summary, self.output_index,
        )
    }
}
impl From<BasicCoinSummary> for JsonValue {
    fn from(note: BasicCoinSummary) -> Self {
        json::object! {
            "value" => note.value,
            "spend_status" => note.spend_summary.to_string(),
            "output_index" => note.output_index,
        }
    }
}

/// Wraps a vec of transparent coin summaries for the implementation of `std::fmt::Display`
pub struct BasicCoinSummaries(Vec<BasicCoinSummary>);

impl std::fmt::Display for BasicCoinSummaries {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        for coin in &self.0 {
            write!(f, "\n{coin}")?;
        }
        Ok(())
    }
}

/// Outgoing note summary.
#[derive(Clone, PartialEq, Debug)]
pub struct OutgoingNoteSummary {
    pub value: u64,
    pub memo: Option<String>,
    pub recipient: String,
    pub recipient_unified_address: Option<String>,
    pub output_index: u16,
    pub account_id: zip32::AccountId,
    pub scope: Scope,
}

impl std::fmt::Display for OutgoingNoteSummary {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let memo = self.memo.clone().unwrap_or_default();
        let recipient_unified_address = self
            .recipient_unified_address
            .clone()
            .unwrap_or_else(|| "not available".to_string());

        write!(
            f,
            "\t{{
            value: {}
            memo: {}
            recipient: {}
            recipient unified address: {}
            output index: {}
            account id: {}
            scope: {}
        }}",
            self.value,
            memo,
            self.recipient,
            recipient_unified_address,
            self.output_index,
            u32::from(self.account_id),
            self.scope,
        )
    }
}

impl From<OutgoingNoteSummary> for JsonValue {
    fn from(note: OutgoingNoteSummary) -> Self {
        json::object! {
            "value" => note.value,
            "memo" => note.memo,
            "recipient" => note.recipient,
            "recipient_unified_address" => note.recipient_unified_address,
            "output_index" => note.output_index,
            "account_id" => u32::from(note.account_id),
            "scope" => note.scope.to_string(),
        }
    }
}

/// Wraps a vec of orchard note summaries for the implementation of `std::fmt::Display`
pub struct OutgoingNoteSummaries(Vec<OutgoingNoteSummary>);

impl std::fmt::Display for OutgoingNoteSummaries {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        for note in &self.0 {
            write!(f, "\n{note}")?;
        }
        Ok(())
    }
}

/// Outgoing coin summary.
#[derive(Clone, PartialEq, Debug)]
pub struct OutgoingCoinSummary {
    pub value: u64,
    pub recipient: String,
    pub output_index: u16,
}

impl std::fmt::Display for OutgoingCoinSummary {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "\t{{
            value: {}
            recipient: {}
            output index: {}
        }}",
            self.value, self.recipient, self.output_index,
        )
    }
}

impl From<OutgoingCoinSummary> for JsonValue {
    fn from(note: OutgoingCoinSummary) -> Self {
        json::object! {
            "value" => note.value,
            "recipient" => note.recipient,
            "output_index" => note.output_index,
        }
    }
}

/// Wraps a vec of orchard note summaries for the implementation of `std::fmt::Display`
pub struct OutgoingCoinSummaries(Vec<OutgoingCoinSummary>);

impl std::fmt::Display for OutgoingCoinSummaries {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        for coin in &self.0 {
            write!(f, "\n{coin}")?;
        }
        Ok(())
    }
}

/// Summary types specifically for providing financial insight (a.k.a finsight).
pub mod finsight {
    /// TODO: Add Doc Comment Here!
    pub struct ValuesSentToAddress(pub std::collections::HashMap<String, Vec<u64>>);
    /// TODO: Add Doc Comment Here!
    pub struct TotalValueToAddress(pub std::collections::HashMap<String, u64>);
    /// TODO: Add Doc Comment Here!
    pub struct TotalSendsToAddress(pub std::collections::HashMap<String, u64>);
    /// TODO: Add Doc Comment Here!
    #[derive(Debug)]
    pub struct TotalMemoBytesToAddress(pub std::collections::HashMap<String, usize>);

    impl From<TotalMemoBytesToAddress> for json::JsonValue {
        fn from(value: TotalMemoBytesToAddress) -> Self {
            let mut jsonified = json::object!();
            let hm = value.0;
            for (key, val) in &hm {
                jsonified[key] = json::JsonValue::from(*val);
            }
            jsonified
        }
    }

    impl From<TotalValueToAddress> for json::JsonValue {
        fn from(value: TotalValueToAddress) -> Self {
            let mut jsonified = json::object!();
            let hm = value.0;
            for (key, val) in &hm {
                jsonified[key] = json::JsonValue::from(*val);
            }
            jsonified
        }
    }

    impl From<TotalSendsToAddress> for json::JsonValue {
        fn from(value: TotalSendsToAddress) -> Self {
            let mut jsonified = json::object!();
            let hm = value.0;
            for (key, val) in &hm {
                jsonified[key] = json::JsonValue::from(*val);
            }
            jsonified
        }
    }
}
