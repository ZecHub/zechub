//! Functions for querying information in the wdb database.
//!
//! These functions should generally not be used directly; instead,
//! their functionality is available via the [`WalletRead`] and
//! [`WalletWrite`] traits.
//!
//! [`WalletRead`]: zcash_client_backend::data_api::WalletRead
//! [`WalletWrite`]: zcash_client_backend::data_api::WalletWrite

use group::ff::PrimeField;
use rusqlite::{named_params, OptionalExtension, ToSql};
use std::collections::HashMap;
use std::convert::TryFrom;

use zcash_primitives::{
    block::BlockHash,
    consensus::{self, BlockHeight, BranchId, NetworkUpgrade, Parameters},
    memo::{Memo, MemoBytes},
    merkle_tree::{CommitmentTree, IncrementalWitness},
    sapling::{Node, Note, Nullifier, PaymentAddress},
    transaction::{components::Amount, Transaction, TxId},
    zip32::{
        sapling::{DiversifiableFullViewingKey, ExtendedFullViewingKey},
        AccountId, DiversifierIndex,
    },
};

use zcash_client_backend::{
    address::{RecipientAddress, UnifiedAddress},
    data_api::{PoolType, Recipient, SentTransactionOutput},
    keys::UnifiedFullViewingKey,
    wallet::{WalletShieldedOutput, WalletTx},
    DecryptedOutput,
};

use crate::{
    error::SqliteClientError, prepared::InsertAddress, DataConnStmtCache, NoteId, WalletDb,
    PRUNING_HEIGHT,
};

#[cfg(feature = "transparent-inputs")]
use {
    crate::UtxoId,
    rusqlite::{params, Connection},
    std::collections::BTreeSet,
    zcash_client_backend::{
        address::AddressMetadata, encoding::AddressCodec, wallet::WalletTransparentOutput,
    },
    zcash_primitives::{
        legacy::{keys::IncomingViewingKey, Script, TransparentAddress},
        transaction::components::{OutPoint, TxOut},
    },
};

pub mod init;
pub mod transact;

pub(crate) fn pool_code(pool_type: PoolType) -> i64 {
    // These constants are *incidentally* shared with the typecodes
    // for unified addresses, but this is exclusively an internal
    // implementation detail.
    match pool_type {
        PoolType::Transparent => 0i64,
        PoolType::Sapling => 2i64,
    }
}

/// This trait provides a generalization over shielded output representations.
#[deprecated(note = "This trait will be removed in a future release.")]
pub trait ShieldedOutput {
    fn index(&self) -> usize;
    fn account(&self) -> AccountId;
    fn to(&self) -> &PaymentAddress;
    fn note(&self) -> &Note;
    fn memo(&self) -> Option<&MemoBytes>;
    fn is_change(&self) -> Option<bool>;
    fn nullifier(&self) -> Option<Nullifier>;
}

#[allow(deprecated)]
impl ShieldedOutput for WalletShieldedOutput<Nullifier> {
    fn index(&self) -> usize {
        self.index
    }
    fn account(&self) -> AccountId {
        self.account
    }
    fn to(&self) -> &PaymentAddress {
        &self.to
    }
    fn note(&self) -> &Note {
        &self.note
    }
    fn memo(&self) -> Option<&MemoBytes> {
        None
    }
    fn is_change(&self) -> Option<bool> {
        Some(self.is_change)
    }

    fn nullifier(&self) -> Option<Nullifier> {
        Some(self.nf)
    }
}

#[allow(deprecated)]
impl ShieldedOutput for DecryptedOutput {
    fn index(&self) -> usize {
        self.index
    }
    fn account(&self) -> AccountId {
        self.account
    }
    fn to(&self) -> &PaymentAddress {
        &self.to
    }
    fn note(&self) -> &Note {
        &self.note
    }
    fn memo(&self) -> Option<&MemoBytes> {
        Some(&self.memo)
    }
    fn is_change(&self) -> Option<bool> {
        None
    }
    fn nullifier(&self) -> Option<Nullifier> {
        None
    }
}

/// Returns the address for the account.
///
/// # Examples
///
/// ```
/// use tempfile::NamedTempFile;
/// use zcash_primitives::{
///     consensus::{self, Network},
///     zip32::AccountId,
/// };
/// use zcash_client_sqlite::{
///     WalletDb,
///     wallet::get_address,
/// };
///
/// let data_file = NamedTempFile::new().unwrap();
/// let db = WalletDb::for_path(data_file, Network::TestNetwork).unwrap();
/// let addr = get_address(&db, AccountId::from(0));
/// ```
#[deprecated(
    note = "This function will be removed in a future release. Use zcash_client_backend::data_api::WalletRead::get_address instead."
)]
pub fn get_address<P: consensus::Parameters>(
    wdb: &WalletDb<P>,
    account: AccountId,
) -> Result<Option<PaymentAddress>, SqliteClientError> {
    // This returns the most recently generated address.
    let addr: String = wdb.conn.query_row(
        "SELECT address
        FROM addresses WHERE account = ?
        ORDER BY diversifier_index_be DESC
        LIMIT 1",
        [u32::from(account)],
        |row| row.get(0),
    )?;

    RecipientAddress::decode(&wdb.params, &addr)
        .ok_or_else(|| {
            SqliteClientError::CorruptedData("Not a valid Zcash recipient address".to_owned())
        })
        .map(|addr| match addr {
            // TODO: Return the UA, not its Sapling component.
            RecipientAddress::Unified(ua) => ua.sapling().cloned(),
            _ => None,
        })
}

pub(crate) fn get_max_account_id<P>(
    wdb: &WalletDb<P>,
) -> Result<Option<AccountId>, SqliteClientError> {
    // This returns the most recently generated address.
    wdb.conn
        .query_row("SELECT MAX(account) FROM accounts", [], |row| {
            let account_id: Option<u32> = row.get(0)?;
            Ok(account_id.map(AccountId::from))
        })
        .map_err(SqliteClientError::from)
}

pub(crate) fn add_account<P: consensus::Parameters>(
    wdb: &WalletDb<P>,
    account: AccountId,
    key: &UnifiedFullViewingKey,
) -> Result<(), SqliteClientError> {
    add_account_internal(&wdb.conn, &wdb.params, "accounts", account, key)
}

pub(crate) fn add_account_internal<P: consensus::Parameters, E: From<rusqlite::Error>>(
    conn: &rusqlite::Connection,
    network: &P,
    accounts_table: &'static str,
    account: AccountId,
    key: &UnifiedFullViewingKey,
) -> Result<(), E> {
    let ufvk_str: String = key.encode(network);
    conn.execute(
        &format!(
            "INSERT INTO {} (account, ufvk) VALUES (:account, :ufvk)",
            accounts_table
        ),
        named_params![":account": &<u32>::from(account), ":ufvk": &ufvk_str],
    )?;

    // Always derive the default Unified Address for the account.
    let (address, d_idx) = key.default_address();
    InsertAddress::new(conn)?.execute(network, account, d_idx, &address)?;

    Ok(())
}

pub(crate) fn get_current_address<P: consensus::Parameters>(
    wdb: &WalletDb<P>,
    account: AccountId,
) -> Result<Option<(UnifiedAddress, DiversifierIndex)>, SqliteClientError> {
    // This returns the most recently generated address.
    let addr: Option<(String, Vec<u8>)> = wdb
        .conn
        .query_row(
            "SELECT address, diversifier_index_be
            FROM addresses WHERE account = :account
            ORDER BY diversifier_index_be DESC
            LIMIT 1",
            named_params![":account": &u32::from(account)],
            |row| Ok((row.get(0)?, row.get(1)?)),
        )
        .optional()?;

    addr.map(|(addr_str, di_vec)| {
        let mut di_be: [u8; 11] = di_vec.try_into().map_err(|_| {
            SqliteClientError::CorruptedData("Diversifier index is not an 11-byte value".to_owned())
        })?;
        di_be.reverse();

        RecipientAddress::decode(&wdb.params, &addr_str)
            .ok_or_else(|| {
                SqliteClientError::CorruptedData("Not a valid Zcash recipient address".to_owned())
            })
            .and_then(|addr| match addr {
                RecipientAddress::Unified(ua) => Ok(ua),
                _ => Err(SqliteClientError::CorruptedData(format!(
                    "Addresses table contains {} which is not a unified address",
                    addr_str,
                ))),
            })
            .map(|addr| (addr, DiversifierIndex(di_be)))
    })
    .transpose()
}

#[cfg(feature = "transparent-inputs")]
pub(crate) fn get_transparent_receivers<P: consensus::Parameters>(
    params: &P,
    conn: &Connection,
    account: AccountId,
) -> Result<HashMap<TransparentAddress, AddressMetadata>, SqliteClientError> {
    let mut ret = HashMap::new();

    // Get all UAs derived
    let mut ua_query = conn
        .prepare("SELECT address, diversifier_index_be FROM addresses WHERE account = :account")?;
    let mut rows = ua_query.query(named_params![":account": &u32::from(account)])?;

    while let Some(row) = rows.next()? {
        let ua_str: String = row.get(0)?;
        let di_vec: Vec<u8> = row.get(1)?;
        let mut di_be: [u8; 11] = di_vec.try_into().map_err(|_| {
            SqliteClientError::CorruptedData(
                "Diverisifier index is not an 11-byte value".to_owned(),
            )
        })?;
        di_be.reverse();

        let ua = RecipientAddress::decode(params, &ua_str)
            .ok_or_else(|| {
                SqliteClientError::CorruptedData("Not a valid Zcash recipient address".to_owned())
            })
            .and_then(|addr| match addr {
                RecipientAddress::Unified(ua) => Ok(ua),
                _ => Err(SqliteClientError::CorruptedData(format!(
                    "Addresses table contains {} which is not a unified address",
                    ua_str,
                ))),
            })?;

        if let Some(taddr) = ua.transparent() {
            ret.insert(
                *taddr,
                AddressMetadata::new(account, DiversifierIndex(di_be)),
            );
        }
    }

    if let Some((taddr, diversifier_index)) = get_legacy_transparent_address(params, conn, account)?
    {
        ret.insert(taddr, AddressMetadata::new(account, diversifier_index));
    }

    Ok(ret)
}

#[cfg(feature = "transparent-inputs")]
pub(crate) fn get_legacy_transparent_address<P: consensus::Parameters>(
    params: &P,
    conn: &Connection,
    account: AccountId,
) -> Result<Option<(TransparentAddress, DiversifierIndex)>, SqliteClientError> {
    // Get the UFVK for the account.
    let ufvk_str: Option<String> = conn
        .query_row(
            "SELECT ufvk FROM accounts WHERE account = :account",
            [u32::from(account)],
            |row| row.get(0),
        )
        .optional()?;

    if let Some(ufvk_str) = ufvk_str {
        let ufvk = UnifiedFullViewingKey::decode(params, &ufvk_str)
            .map_err(SqliteClientError::CorruptedData)?;

        // Derive the default transparent address (if it wasn't already part of a derived UA).
        ufvk.transparent()
            .map(|tfvk| {
                tfvk.derive_external_ivk()
                    .map(|tivk| {
                        let (taddr, child_index) = tivk.default_address();
                        (taddr, DiversifierIndex::from(child_index))
                    })
                    .map_err(SqliteClientError::HdwalletError)
            })
            .transpose()
    } else {
        Ok(None)
    }
}

/// Returns the [`UnifiedFullViewingKey`]s for the wallet.
pub(crate) fn get_unified_full_viewing_keys<P: consensus::Parameters>(
    wdb: &WalletDb<P>,
) -> Result<HashMap<AccountId, UnifiedFullViewingKey>, SqliteClientError> {
    // Fetch the UnifiedFullViewingKeys we are tracking
    let mut stmt_fetch_accounts = wdb
        .conn
        .prepare("SELECT account, ufvk FROM accounts ORDER BY account ASC")?;

    let rows = stmt_fetch_accounts.query_map([], |row| {
        let acct: u32 = row.get(0)?;
        let account = AccountId::from(acct);
        let ufvk_str: String = row.get(1)?;
        let ufvk = UnifiedFullViewingKey::decode(&wdb.params, &ufvk_str)
            .map_err(SqliteClientError::CorruptedData);

        Ok((account, ufvk))
    })?;

    let mut res: HashMap<AccountId, UnifiedFullViewingKey> = HashMap::new();
    for row in rows {
        let (account_id, ufvkr) = row?;
        res.insert(account_id, ufvkr?);
    }

    Ok(res)
}

/// Returns the account id corresponding to a given [`UnifiedFullViewingKey`],
/// if any.
pub(crate) fn get_account_for_ufvk<P: consensus::Parameters>(
    wdb: &WalletDb<P>,
    ufvk: &UnifiedFullViewingKey,
) -> Result<Option<AccountId>, SqliteClientError> {
    wdb.conn
        .query_row(
            "SELECT account FROM accounts WHERE ufvk = ?",
            [&ufvk.encode(&wdb.params)],
            |row| {
                let acct: u32 = row.get(0)?;
                Ok(AccountId::from(acct))
            },
        )
        .optional()
        .map_err(SqliteClientError::from)
}

/// Checks whether the specified [`ExtendedFullViewingKey`] is valid and corresponds to the
/// specified account.
///
/// [`ExtendedFullViewingKey`]: zcash_primitives::zip32::ExtendedFullViewingKey
#[deprecated(
    note = "This function will be removed in a future release. Use zcash_client_backend::data_api::WalletRead::is_valid_account_extfvk instead."
)]
pub fn is_valid_account_extfvk<P: consensus::Parameters>(
    wdb: &WalletDb<P>,
    account: AccountId,
    extfvk: &ExtendedFullViewingKey,
) -> Result<bool, SqliteClientError> {
    wdb.conn
        .prepare("SELECT ufvk FROM accounts WHERE account = ?")?
        .query_row([u32::from(account).to_sql()?], |row| {
            row.get(0).map(|ufvk_str: String| {
                UnifiedFullViewingKey::decode(&wdb.params, &ufvk_str)
                    .map_err(SqliteClientError::CorruptedData)
            })
        })
        .optional()
        .map_err(SqliteClientError::from)
        .and_then(|row| {
            if let Some(ufvk) = row {
                ufvk.map(|ufvk| {
                    ufvk.sapling().map(|dfvk| dfvk.to_bytes())
                        == Some(DiversifiableFullViewingKey::from(extfvk.clone()).to_bytes())
                })
            } else {
                Ok(false)
            }
        })
}

/// Returns the balance for the account, including all mined unspent notes that we know
/// about.
///
/// WARNING: This balance is potentially unreliable, as mined notes may become unmined due
/// to chain reorgs. You should generally not show this balance to users without some
/// caveat. Use [`get_balance_at`] where you need a more reliable indication of the
/// wallet balance.
///
/// # Examples
///
/// ```
/// use tempfile::NamedTempFile;
/// use zcash_primitives::{
///     consensus::Network,
///     zip32::AccountId,
/// };
/// use zcash_client_sqlite::{
///     WalletDb,
///     wallet::get_balance,
/// };
///
/// let data_file = NamedTempFile::new().unwrap();
/// let db = WalletDb::for_path(data_file, Network::TestNetwork).unwrap();
/// let addr = get_balance(&db, AccountId::from(0));
/// ```
#[deprecated(
    note = "This function will be removed in a future release. Use zcash_client_backend::data_api::WalletRead::get_balance_at instead."
)]
pub fn get_balance<P>(wdb: &WalletDb<P>, account: AccountId) -> Result<Amount, SqliteClientError> {
    let balance = wdb.conn.query_row(
        "SELECT SUM(value) FROM received_notes
        INNER JOIN transactions ON transactions.id_tx = received_notes.tx
        WHERE account = ? AND spent IS NULL AND transactions.block IS NOT NULL",
        [u32::from(account)],
        |row| row.get(0).or(Ok(0)),
    )?;

    match Amount::from_i64(balance) {
        Ok(amount) if !amount.is_negative() => Ok(amount),
        _ => Err(SqliteClientError::CorruptedData(
            "Sum of values in received_notes is out of range".to_string(),
        )),
    }
}

/// Returns the verified balance for the account at the specified height,
/// This may be used to obtain a balance that ignores notes that have been
/// received so recently that they are not yet deemed spendable.
///
/// # Examples
///
/// ```
/// use tempfile::NamedTempFile;
/// use zcash_primitives::{
///     consensus::{BlockHeight, Network},
///     zip32::AccountId,
/// };
/// use zcash_client_sqlite::{
///     WalletDb,
///     wallet::get_balance_at,
/// };
///
/// let data_file = NamedTempFile::new().unwrap();
/// let db = WalletDb::for_path(data_file, Network::TestNetwork).unwrap();
/// let addr = get_balance_at(&db, AccountId::from(0), BlockHeight::from_u32(0));
/// ```
#[deprecated(
    note = "This function will be removed in a future release. Use zcash_client_backend::data_api::WalletRead::get_balance_at instead."
)]
pub fn get_balance_at<P>(
    wdb: &WalletDb<P>,
    account: AccountId,
    anchor_height: BlockHeight,
) -> Result<Amount, SqliteClientError> {
    let balance = wdb.conn.query_row(
        "SELECT SUM(value) FROM received_notes
        INNER JOIN transactions ON transactions.id_tx = received_notes.tx
        WHERE account = ? AND spent IS NULL AND transactions.block <= ?",
        [u32::from(account), u32::from(anchor_height)],
        |row| row.get(0).or(Ok(0)),
    )?;

    match Amount::from_i64(balance) {
        Ok(amount) if !amount.is_negative() => Ok(amount),
        _ => Err(SqliteClientError::CorruptedData(
            "Sum of values in received_notes is out of range".to_string(),
        )),
    }
}

/// Returns the memo for a received note.
///
/// The note is identified by its row index in the `received_notes` table within the wdb
/// database.
///
/// # Examples
///
/// ```
/// use tempfile::NamedTempFile;
/// use zcash_primitives::consensus::Network;
/// use zcash_client_sqlite::{
///     NoteId,
///     WalletDb,
///     wallet::get_received_memo,
/// };
///
/// let data_file = NamedTempFile::new().unwrap();
/// let db = WalletDb::for_path(data_file, Network::TestNetwork).unwrap();
/// let memo = get_received_memo(&db, 27);
/// ```
#[deprecated(
    note = "This function will be removed in a future release. Use zcash_client_backend::data_api::WalletRead::get_memo instead."
)]
pub fn get_received_memo<P>(wdb: &WalletDb<P>, id_note: i64) -> Result<Memo, SqliteClientError> {
    let memo_bytes: Vec<_> = wdb.conn.query_row(
        "SELECT memo FROM received_notes
        WHERE id_note = ?",
        [id_note],
        |row| row.get(0),
    )?;

    MemoBytes::from_bytes(&memo_bytes)
        .and_then(Memo::try_from)
        .map_err(SqliteClientError::from)
}

/// Looks up a transaction by its internal database identifier.
pub(crate) fn get_transaction<P: Parameters>(
    wdb: &WalletDb<P>,
    id_tx: i64,
) -> Result<Transaction, SqliteClientError> {
    let (tx_bytes, block_height): (Vec<_>, BlockHeight) = wdb.conn.query_row(
        "SELECT raw, block FROM transactions
        WHERE id_tx = ?",
        [id_tx],
        |row| {
            let h: u32 = row.get(1)?;
            Ok((row.get(0)?, BlockHeight::from(h)))
        },
    )?;

    Transaction::read(
        &tx_bytes[..],
        BranchId::for_height(&wdb.params, block_height),
    )
    .map_err(SqliteClientError::from)
}

/// Returns the memo for a sent note.
///
/// The note is identified by its row index in the `sent_notes` table within the wdb
/// database.
///
/// # Examples
///
/// ```
/// use tempfile::NamedTempFile;
/// use zcash_primitives::consensus::Network;
/// use zcash_client_sqlite::{
///     NoteId,
///     WalletDb,
///     wallet::get_sent_memo,
/// };
///
/// let data_file = NamedTempFile::new().unwrap();
/// let db = WalletDb::for_path(data_file, Network::TestNetwork).unwrap();
/// let memo = get_sent_memo(&db, 12);
/// ```
#[deprecated(
    note = "This function will be removed in a future release. Use zcash_client_backend::data_api::WalletRead::get_memo instead."
)]
pub fn get_sent_memo<P>(wdb: &WalletDb<P>, id_note: i64) -> Result<Memo, SqliteClientError> {
    let memo_bytes: Vec<_> = wdb.conn.query_row(
        "SELECT memo FROM sent_notes
        WHERE id_note = ?",
        [id_note],
        |row| row.get(0),
    )?;

    MemoBytes::from_bytes(&memo_bytes)
        .and_then(Memo::try_from)
        .map_err(SqliteClientError::from)
}

/// Returns the minimum and maximum heights for blocks stored in the wallet database.
///
/// # Examples
///
/// ```
/// use tempfile::NamedTempFile;
/// use zcash_primitives::consensus::Network;
/// use zcash_client_sqlite::{
///     WalletDb,
///     wallet::block_height_extrema,
/// };
///
/// let data_file = NamedTempFile::new().unwrap();
/// let db = WalletDb::for_path(data_file, Network::TestNetwork).unwrap();
/// let bounds = block_height_extrema(&db);
/// ```
#[deprecated(
    note = "This function will be removed in a future release. Use zcash_client_backend::data_api::WalletRead::block_height_extrema instead."
)]
pub fn block_height_extrema<P>(
    wdb: &WalletDb<P>,
) -> Result<Option<(BlockHeight, BlockHeight)>, rusqlite::Error> {
    wdb.conn
        .query_row("SELECT MIN(height), MAX(height) FROM blocks", [], |row| {
            let min_height: u32 = row.get(0)?;
            let max_height: u32 = row.get(1)?;
            Ok(Some((
                BlockHeight::from(min_height),
                BlockHeight::from(max_height),
            )))
        })
        //.optional() doesn't work here because a failed aggregate function
        //produces a runtime error, not an empty set of rows.
        .or(Ok(None))
}

/// Returns the block height at which the specified transaction was mined,
/// if any.
///
/// # Examples
///
/// ```
/// use tempfile::NamedTempFile;
/// use zcash_primitives::consensus::Network;
/// use zcash_primitives::transaction::TxId;
/// use zcash_client_sqlite::{
///     WalletDb,
///     wallet::get_tx_height,
/// };
///
/// let data_file = NamedTempFile::new().unwrap();
/// let db = WalletDb::for_path(data_file, Network::TestNetwork).unwrap();
/// let height = get_tx_height(&db, TxId::from_bytes([0u8; 32]));
/// ```
#[deprecated(
    note = "This function will be removed in a future release. Use zcash_client_backend::data_api::WalletRead::get_tx_height instead."
)]
pub fn get_tx_height<P>(
    wdb: &WalletDb<P>,
    txid: TxId,
) -> Result<Option<BlockHeight>, rusqlite::Error> {
    wdb.conn
        .query_row(
            "SELECT block FROM transactions WHERE txid = ?",
            [txid.as_ref().to_vec()],
            |row| row.get(0).map(u32::into),
        )
        .optional()
}

/// Returns the block hash for the block at the specified height,
/// if any.
///
/// # Examples
///
/// ```
/// use tempfile::NamedTempFile;
/// use zcash_primitives::consensus::{H0, Network};
/// use zcash_client_sqlite::{
///     WalletDb,
///     wallet::get_block_hash,
/// };
///
/// let data_file = NamedTempFile::new().unwrap();
/// let db = WalletDb::for_path(data_file, Network::TestNetwork).unwrap();
/// let hash = get_block_hash(&db, H0);
/// ```
#[deprecated(
    note = "This function will be removed in a future release. Use zcash_client_backend::data_api::WalletRead::get_block_hash instead."
)]
pub fn get_block_hash<P>(
    wdb: &WalletDb<P>,
    block_height: BlockHeight,
) -> Result<Option<BlockHash>, rusqlite::Error> {
    wdb.conn
        .query_row(
            "SELECT hash FROM blocks WHERE height = ?",
            [u32::from(block_height)],
            |row| {
                let row_data = row.get::<_, Vec<_>>(0)?;
                Ok(BlockHash::from_slice(&row_data))
            },
        )
        .optional()
}

/// Gets the height to which the database must be rewound if any rewind greater than the pruning
/// height is attempted.
#[deprecated(note = "This function will be removed in a future release.")]
pub fn get_rewind_height<P>(wdb: &WalletDb<P>) -> Result<Option<BlockHeight>, SqliteClientError> {
    wdb.conn
        .query_row(
            "SELECT MIN(tx.block)
             FROM received_notes n
             JOIN transactions tx ON tx.id_tx = n.tx
             WHERE n.spent IS NULL",
            [],
            |row| {
                row.get(0)
                    .map(|maybe_height: Option<u32>| maybe_height.map(|height| height.into()))
            },
        )
        .map_err(SqliteClientError::from)
}

/// Rewinds the database to the given height.
///
/// If the requested height is greater than or equal to the height of the last scanned
/// block, this function does nothing.
///
/// This should only be executed inside a transactional context.
pub(crate) fn rewind_to_height<P: consensus::Parameters>(
    wdb: &WalletDb<P>,
    block_height: BlockHeight,
) -> Result<(), SqliteClientError> {
    let sapling_activation_height = wdb
        .params
        .activation_height(NetworkUpgrade::Sapling)
        .expect("Sapling activation height mutst be available.");

    // Recall where we synced up to previously.
    let last_scanned_height = wdb
        .conn
        .query_row("SELECT MAX(height) FROM blocks", [], |row| {
            row.get(0)
                .map(|h: u32| h.into())
                .or_else(|_| Ok(sapling_activation_height - 1))
        })?;

    if block_height < last_scanned_height - PRUNING_HEIGHT {
        #[allow(deprecated)]
        if let Some(h) = get_rewind_height(wdb)? {
            if block_height > h {
                return Err(SqliteClientError::RequestedRewindInvalid(h, block_height));
            }
        }
    }

    // nothing to do if we're deleting back down to the max height
    if block_height < last_scanned_height {
        // Decrement witnesses.
        wdb.conn.execute(
            "DELETE FROM sapling_witnesses WHERE block > ?",
            [u32::from(block_height)],
        )?;

        // Rewind received notes
        wdb.conn.execute(
            "DELETE FROM received_notes
                WHERE id_note IN (
                    SELECT rn.id_note
                    FROM received_notes rn
                    LEFT OUTER JOIN transactions tx
                    ON tx.id_tx = rn.tx
                    WHERE tx.block IS NOT NULL AND tx.block > ?
                );",
            [u32::from(block_height)],
        )?;

        // Do not delete sent notes; this can contain data that is not recoverable
        // from the chain. Wallets must continue to operate correctly in the
        // presence of stale sent notes that link to unmined transactions.

        // Rewind utxos
        wdb.conn.execute(
            "DELETE FROM utxos WHERE height > ?",
            [u32::from(block_height)],
        )?;

        // Un-mine transactions.
        wdb.conn.execute(
            "UPDATE transactions SET block = NULL, tx_index = NULL WHERE block IS NOT NULL AND block > ?",
            [u32::from(block_height)],
        )?;

        // Now that they aren't depended on, delete scanned blocks.
        wdb.conn.execute(
            "DELETE FROM blocks WHERE height > ?",
            [u32::from(block_height)],
        )?;
    }

    Ok(())
}

/// Returns the commitment tree for the block at the specified height,
/// if any.
///
/// # Examples
///
/// ```
/// use tempfile::NamedTempFile;
/// use zcash_primitives::consensus::{Network, H0};
/// use zcash_client_sqlite::{
///     WalletDb,
///     wallet::get_commitment_tree,
/// };
///
/// let data_file = NamedTempFile::new().unwrap();
/// let db = WalletDb::for_path(data_file, Network::TestNetwork).unwrap();
/// let tree = get_commitment_tree(&db, H0);
/// ```
#[deprecated(
    note = "This function will be removed in a future release. Use zcash_client_backend::data_api::WalletRead::get_commitment_tree instead."
)]
pub fn get_commitment_tree<P>(
    wdb: &WalletDb<P>,
    block_height: BlockHeight,
) -> Result<Option<CommitmentTree<Node>>, SqliteClientError> {
    wdb.conn
        .query_row_and_then(
            "SELECT sapling_tree FROM blocks WHERE height = ?",
            [u32::from(block_height)],
            |row| {
                let row_data: Vec<u8> = row.get(0)?;
                CommitmentTree::read(&row_data[..]).map_err(|e| {
                    rusqlite::Error::FromSqlConversionFailure(
                        row_data.len(),
                        rusqlite::types::Type::Blob,
                        Box::new(e),
                    )
                })
            },
        )
        .optional()
        .map_err(SqliteClientError::from)
}

/// Returns the incremental witnesses for the block at the specified height,
/// if any.
///
/// # Examples
///
/// ```
/// use tempfile::NamedTempFile;
/// use zcash_primitives::consensus::{Network, H0};
/// use zcash_client_sqlite::{
///     WalletDb,
///     wallet::get_witnesses,
/// };
///
/// let data_file = NamedTempFile::new().unwrap();
/// let db = WalletDb::for_path(data_file, Network::TestNetwork).unwrap();
/// let witnesses = get_witnesses(&db, H0);
/// ```
#[deprecated(
    note = "This function will be removed in a future release. Use zcash_client_backend::data_api::WalletRead::get_witnesses instead."
)]
pub fn get_witnesses<P>(
    wdb: &WalletDb<P>,
    block_height: BlockHeight,
) -> Result<Vec<(NoteId, IncrementalWitness<Node>)>, SqliteClientError> {
    let mut stmt_fetch_witnesses = wdb
        .conn
        .prepare("SELECT note, witness FROM sapling_witnesses WHERE block = ?")?;
    let witnesses = stmt_fetch_witnesses
        .query_map([u32::from(block_height)], |row| {
            let id_note = NoteId::ReceivedNoteId(row.get(0)?);
            let wdb: Vec<u8> = row.get(1)?;
            Ok(IncrementalWitness::read(&wdb[..]).map(|witness| (id_note, witness)))
        })
        .map_err(SqliteClientError::from)?;

    // unwrap database error & IO error from IncrementalWitness::read
    let res: Vec<_> = witnesses.collect::<Result<Result<_, _>, _>>()??;
    Ok(res)
}

/// Retrieve the nullifiers for notes that the wallet is tracking
/// that have not yet been confirmed as a consequence of the spending
/// transaction being included in a block.
#[deprecated(
    note = "This function will be removed in a future release. Use zcash_client_backend::data_api::WalletRead::get_nullifiers instead."
)]
pub fn get_nullifiers<P>(
    wdb: &WalletDb<P>,
) -> Result<Vec<(AccountId, Nullifier)>, SqliteClientError> {
    // Get the nullifiers for the notes we are tracking
    let mut stmt_fetch_nullifiers = wdb.conn.prepare(
        "SELECT rn.id_note, rn.account, rn.nf, tx.block as block
            FROM received_notes rn
            LEFT OUTER JOIN transactions tx
            ON tx.id_tx = rn.spent
            WHERE block IS NULL",
    )?;
    let nullifiers = stmt_fetch_nullifiers.query_map([], |row| {
        let account: u32 = row.get(1)?;
        let nf_bytes: Vec<u8> = row.get(2)?;
        Ok((
            AccountId::from(account),
            Nullifier::from_slice(&nf_bytes).unwrap(),
        ))
    })?;

    let res: Vec<_> = nullifiers.collect::<Result<_, _>>()?;
    Ok(res)
}

/// Returns the nullifiers for the notes that this wallet is tracking.
pub(crate) fn get_all_nullifiers<P>(
    wdb: &WalletDb<P>,
) -> Result<Vec<(AccountId, Nullifier)>, SqliteClientError> {
    // Get the nullifiers for the notes we are tracking
    let mut stmt_fetch_nullifiers = wdb.conn.prepare(
        "SELECT rn.id_note, rn.account, rn.nf
            FROM received_notes rn",
    )?;
    let nullifiers = stmt_fetch_nullifiers.query_map([], |row| {
        let account: u32 = row.get(1)?;
        let nf_bytes: Vec<u8> = row.get(2)?;
        Ok((
            AccountId::from(account),
            Nullifier::from_slice(&nf_bytes).unwrap(),
        ))
    })?;

    let res: Vec<_> = nullifiers.collect::<Result<_, _>>()?;
    Ok(res)
}

/// Returns unspent transparent outputs that have been received by this wallet at the given
/// transparent address, such that the block that included the transaction was mined at a
/// height less than or equal to the provided `max_height`.
#[cfg(feature = "transparent-inputs")]
pub(crate) fn get_unspent_transparent_outputs<P: consensus::Parameters>(
    wdb: &WalletDb<P>,
    address: &TransparentAddress,
    max_height: BlockHeight,
    exclude: &[OutPoint],
) -> Result<Vec<WalletTransparentOutput>, SqliteClientError> {
    let mut stmt_blocks = wdb.conn.prepare(
        "SELECT u.prevout_txid, u.prevout_idx, u.script,
                u.value_zat, u.height, tx.block as block
         FROM utxos u
         LEFT OUTER JOIN transactions tx
         ON tx.id_tx = u.spent_in_tx
         WHERE u.address = ?
         AND u.height <= ?
         AND tx.block IS NULL",
    )?;

    let addr_str = address.encode(&wdb.params);

    let mut utxos = Vec::<WalletTransparentOutput>::new();
    let mut rows = stmt_blocks.query(params![addr_str, u32::from(max_height)])?;
    let excluded: BTreeSet<OutPoint> = exclude.iter().cloned().collect();
    while let Some(row) = rows.next()? {
        let txid: Vec<u8> = row.get(0)?;
        let mut txid_bytes = [0u8; 32];
        txid_bytes.copy_from_slice(&txid);

        let index: u32 = row.get(1)?;
        let script_pubkey = Script(row.get(2)?);
        let value = Amount::from_i64(row.get(3)?).unwrap();
        let height: u32 = row.get(4)?;

        let outpoint = OutPoint::new(txid_bytes, index);
        if excluded.contains(&outpoint) {
            continue;
        }

        let output = WalletTransparentOutput::from_parts(
            outpoint,
            TxOut {
                value,
                script_pubkey,
            },
            BlockHeight::from(height),
        )
        .ok_or_else(|| {
            SqliteClientError::CorruptedData(
                "Txout script_pubkey value did not correspond to a P2PKH or P2SH address"
                    .to_string(),
            )
        })?;

        utxos.push(output);
    }

    Ok(utxos)
}

/// Returns the unspent balance for each transparent address associated with the specified account,
/// such that the block that included the transaction was mined at a height less than or equal to
/// the provided `max_height`.
#[cfg(feature = "transparent-inputs")]
pub(crate) fn get_transparent_balances<P: consensus::Parameters>(
    wdb: &WalletDb<P>,
    account: AccountId,
    max_height: BlockHeight,
) -> Result<HashMap<TransparentAddress, Amount>, SqliteClientError> {
    let mut stmt_blocks = wdb.conn.prepare(
        "SELECT u.address, SUM(u.value_zat)
         FROM utxos u
         LEFT OUTER JOIN transactions tx
         ON tx.id_tx = u.spent_in_tx
         WHERE u.received_by_account = ?
         AND u.height <= ?
         AND tx.block IS NULL
         GROUP BY u.address",
    )?;

    let mut res = HashMap::new();
    let mut rows = stmt_blocks.query(params![u32::from(account), u32::from(max_height)])?;
    while let Some(row) = rows.next()? {
        let taddr_str: String = row.get(0)?;
        let taddr = TransparentAddress::decode(&wdb.params, &taddr_str)?;
        let value = Amount::from_i64(row.get(1)?).unwrap();

        res.insert(taddr, value);
    }

    Ok(res)
}

/// Inserts information about a scanned block into the database.
#[deprecated(
    note = "This function will be removed in a future release. Use zcash_client_backend::data_api::WalletWrite::advance_by_block instead."
)]
pub fn insert_block<'a, P>(
    stmts: &mut DataConnStmtCache<'a, P>,
    block_height: BlockHeight,
    block_hash: BlockHash,
    block_time: u32,
    commitment_tree: &CommitmentTree<Node>,
) -> Result<(), SqliteClientError> {
    stmts.stmt_insert_block(block_height, block_hash, block_time, commitment_tree)
}

/// Inserts information about a mined transaction that was observed to
/// contain a note related to this wallet into the database.
#[deprecated(
    note = "This function will be removed in a future release. Use zcash_client_backend::data_api::WalletWrite::advance_by_block instead."
)]
pub fn put_tx_meta<'a, P, N>(
    stmts: &mut DataConnStmtCache<'a, P>,
    tx: &WalletTx<N>,
    height: BlockHeight,
) -> Result<i64, SqliteClientError> {
    if !stmts.stmt_update_tx_meta(height, tx.index, &tx.txid)? {
        // It isn't there, so insert our transaction into the database.
        stmts.stmt_insert_tx_meta(&tx.txid, height, tx.index)
    } else {
        // It was there, so grab its row number.
        stmts.stmt_select_tx_ref(&tx.txid)
    }
}

/// Inserts full transaction data into the database.
#[deprecated(
    note = "This function will be removed in a future release. Use zcash_client_backend::data_api::WalletWrite::store_decrypted_tx instead."
)]
pub fn put_tx_data<'a, P>(
    stmts: &mut DataConnStmtCache<'a, P>,
    tx: &Transaction,
    fee: Option<Amount>,
    created_at: Option<time::OffsetDateTime>,
) -> Result<i64, SqliteClientError> {
    let txid = tx.txid();

    let mut raw_tx = vec![];
    tx.write(&mut raw_tx)?;

    if !stmts.stmt_update_tx_data(tx.expiry_height(), &raw_tx, fee, &txid)? {
        // It isn't there, so insert our transaction into the database.
        stmts.stmt_insert_tx_data(&txid, created_at, tx.expiry_height(), &raw_tx, fee)
    } else {
        // It was there, so grab its row number.
        stmts.stmt_select_tx_ref(&txid)
    }
}

/// Marks a given nullifier as having been revealed in the construction
/// of the specified transaction.
///
/// Marking a note spent in this fashion does NOT imply that the
/// spending transaction has been mined.
#[deprecated(
    note = "This function will be removed in a future release. Use zcash_client_backend::data_api::WalletWrite::store_sent_tx instead."
)]
pub fn mark_sapling_note_spent<'a, P>(
    stmts: &mut DataConnStmtCache<'a, P>,
    tx_ref: i64,
    nf: &Nullifier,
) -> Result<(), SqliteClientError> {
    stmts.stmt_mark_sapling_note_spent(tx_ref, nf)?;
    Ok(())
}

/// Marks the given UTXO as having been spent.
#[cfg(feature = "transparent-inputs")]
pub(crate) fn mark_transparent_utxo_spent<'a, P>(
    stmts: &mut DataConnStmtCache<'a, P>,
    tx_ref: i64,
    outpoint: &OutPoint,
) -> Result<(), SqliteClientError> {
    stmts.stmt_mark_transparent_utxo_spent(tx_ref, outpoint)?;

    Ok(())
}

/// Adds the given received UTXO to the datastore.
#[cfg(feature = "transparent-inputs")]
pub(crate) fn put_received_transparent_utxo<'a, P: consensus::Parameters>(
    stmts: &mut DataConnStmtCache<'a, P>,
    output: &WalletTransparentOutput,
) -> Result<UtxoId, SqliteClientError> {
    stmts
        .stmt_update_received_transparent_utxo(output)
        .transpose()
        .or_else(|| {
            stmts
                .stmt_insert_received_transparent_utxo(output)
                .transpose()
        })
        .unwrap_or_else(|| {
            // This could occur if the UTXO is received at the legacy transparent
            // address, in which case the join to the `addresses` table will fail.
            // In this case, we should look up the legacy address for account 0 and
            // check whether it matches the address for the received UTXO, and if
            // so then insert/update it directly.
            let account = AccountId::from(0u32);
            get_legacy_transparent_address(&stmts.wallet_db.params, &stmts.wallet_db.conn, account)
                .and_then(|legacy_taddr| {
                    if legacy_taddr
                        .iter()
                        .any(|(taddr, _)| taddr == output.recipient_address())
                    {
                        stmts
                            .stmt_update_legacy_transparent_utxo(output, account)
                            .transpose()
                            .unwrap_or_else(|| {
                                stmts.stmt_insert_legacy_transparent_utxo(output, account)
                            })
                    } else {
                        Err(SqliteClientError::AddressNotRecognized(
                            *output.recipient_address(),
                        ))
                    }
                })
        })
}

/// Records the specified shielded output as having been received.
///
/// This implementation relies on the facts that:
/// - A transaction will not contain more than 2^63 shielded outputs.
/// - A note value will never exceed 2^63 zatoshis.
#[deprecated(
    note = "This method will be removed in a future release. Use zcash_client_backend::data_api::WalletWrite::store_decrypted_tx instead."
)]
#[allow(deprecated)]
pub fn put_received_note<'a, P, T: ShieldedOutput>(
    stmts: &mut DataConnStmtCache<'a, P>,
    output: &T,
    tx_ref: i64,
) -> Result<NoteId, SqliteClientError> {
    let rcm = output.note().rcm().to_repr();
    let account = output.account();
    let diversifier = output.to().diversifier();
    let value = output.note().value();
    let memo = output.memo();
    let is_change = output.is_change();
    let output_index = output.index();
    let nf = output.nullifier();

    // First try updating an existing received note into the database.
    if !stmts.stmt_update_received_note(
        account,
        diversifier,
        value.inner(),
        rcm,
        &nf,
        memo,
        is_change,
        tx_ref,
        output_index,
    )? {
        // It isn't there, so insert our note into the database.
        stmts.stmt_insert_received_note(
            tx_ref,
            output_index,
            account,
            diversifier,
            value.inner(),
            rcm,
            &nf,
            memo,
            is_change,
        )
    } else {
        // It was there, so grab its row number.
        stmts.stmt_select_received_note(tx_ref, output.index())
    }
}

/// Records the incremental witness for the specified note,
/// as of the given block height.
#[deprecated(
    note = "This method will be removed in a future release. Use zcash_client_backend::data_api::WalletWrite::store_decrypted_tx instead."
)]
pub fn insert_witness<'a, P>(
    stmts: &mut DataConnStmtCache<'a, P>,
    note_id: i64,
    witness: &IncrementalWitness<Node>,
    height: BlockHeight,
) -> Result<(), SqliteClientError> {
    stmts.stmt_insert_witness(NoteId::ReceivedNoteId(note_id), height, witness)
}

/// Removes old incremental witnesses up to the given block height.
#[deprecated(
    note = "This method will be removed in a future update. Use zcash_client_backend::data_api::WalletWrite::advance_by_block instead."
)]
pub fn prune_witnesses<P>(
    stmts: &mut DataConnStmtCache<'_, P>,
    below_height: BlockHeight,
) -> Result<(), SqliteClientError> {
    stmts.stmt_prune_witnesses(below_height)
}

/// Marks notes that have not been mined in transactions
/// as expired, up to the given block height.
#[deprecated(
    note = "This method will be removed in a future update. Use zcash_client_backend::data_api::WalletWrite::advance_by_block instead."
)]
pub fn update_expired_notes<P>(
    stmts: &mut DataConnStmtCache<'_, P>,
    height: BlockHeight,
) -> Result<(), SqliteClientError> {
    stmts.stmt_update_expired(height)
}

/// Records information about a transaction output that your wallet created.
///
/// This is a crate-internal convenience method.
pub(crate) fn insert_sent_output<'a, P: consensus::Parameters>(
    stmts: &mut DataConnStmtCache<'a, P>,
    tx_ref: i64,
    from_account: AccountId,
    output: &SentTransactionOutput,
) -> Result<(), SqliteClientError> {
    stmts.stmt_insert_sent_output(
        tx_ref,
        output.output_index,
        from_account,
        &output.recipient,
        output.value,
        output.memo.as_ref(),
    )
}

/// Records information about a transaction output that your wallet created.
///
/// This is a crate-internal convenience method.
#[allow(clippy::too_many_arguments)]
pub(crate) fn put_sent_output<'a, P: consensus::Parameters>(
    stmts: &mut DataConnStmtCache<'a, P>,
    from_account: AccountId,
    tx_ref: i64,
    output_index: usize,
    recipient: &Recipient,
    value: Amount,
    memo: Option<&MemoBytes>,
) -> Result<(), SqliteClientError> {
    if !stmts.stmt_update_sent_output(from_account, recipient, value, memo, tx_ref, output_index)? {
        stmts.stmt_insert_sent_output(
            tx_ref,
            output_index,
            from_account,
            recipient,
            value,
            memo,
        )?;
    }

    Ok(())
}

#[cfg(test)]
#[allow(deprecated)]
mod tests {
    use secrecy::Secret;
    use tempfile::NamedTempFile;

    use zcash_primitives::transaction::components::Amount;

    use zcash_client_backend::data_api::WalletRead;

    use crate::{tests, wallet::init::init_wallet_db, AccountId, WalletDb};

    use super::{get_address, get_balance};

    #[cfg(feature = "transparent-inputs")]
    use {
        zcash_client_backend::{
            data_api::WalletWrite, encoding::AddressCodec, wallet::WalletTransparentOutput,
        },
        zcash_primitives::{
            consensus::BlockHeight,
            transaction::components::{OutPoint, TxOut},
        },
    };

    #[test]
    fn empty_database_has_no_balance() {
        let data_file = NamedTempFile::new().unwrap();
        let mut db_data = WalletDb::for_path(data_file.path(), tests::network()).unwrap();
        init_wallet_db(&mut db_data, Some(Secret::new(vec![]))).unwrap();

        // Add an account to the wallet
        tests::init_test_accounts_table(&db_data);

        // The account should be empty
        assert_eq!(
            get_balance(&db_data, AccountId::from(0)).unwrap(),
            Amount::zero()
        );

        // We can't get an anchor height, as we have not scanned any blocks.
        assert_eq!(db_data.get_target_and_anchor_heights(10).unwrap(), None);

        // An invalid account has zero balance
        assert!(get_address(&db_data, AccountId::from(1)).is_err());
        assert_eq!(
            get_balance(&db_data, AccountId::from(0)).unwrap(),
            Amount::zero()
        );
    }

    #[test]
    #[cfg(feature = "transparent-inputs")]
    fn put_received_transparent_utxo() {
        let data_file = NamedTempFile::new().unwrap();
        let mut db_data = WalletDb::for_path(data_file.path(), tests::network()).unwrap();
        init_wallet_db(&mut db_data, None).unwrap();

        // Add an account to the wallet
        let mut ops = db_data.get_update_ops().unwrap();
        let seed = Secret::new([0u8; 32].to_vec());
        let (account_id, _usk) = ops.create_account(&seed).unwrap();
        let uaddr = db_data.get_current_address(account_id).unwrap().unwrap();
        let taddr = uaddr.transparent().unwrap();

        let bal_absent = db_data
            .get_transparent_balances(account_id, BlockHeight::from_u32(12345))
            .unwrap();
        assert!(bal_absent.is_empty());

        let utxo = WalletTransparentOutput::from_parts(
            OutPoint::new([1u8; 32], 1),
            TxOut {
                value: Amount::from_u64(100000).unwrap(),
                script_pubkey: taddr.script(),
            },
            BlockHeight::from_u32(12345),
        )
        .unwrap();

        let res0 = super::put_received_transparent_utxo(&mut ops, &utxo);
        assert_matches!(res0, Ok(_));

        // Change the mined height of the UTXO and upsert; we should get back
        // the same utxoid
        let utxo2 = WalletTransparentOutput::from_parts(
            OutPoint::new([1u8; 32], 1),
            TxOut {
                value: Amount::from_u64(100000).unwrap(),
                script_pubkey: taddr.script(),
            },
            BlockHeight::from_u32(34567),
        )
        .unwrap();
        let res1 = super::put_received_transparent_utxo(&mut ops, &utxo2);
        assert_matches!(res1, Ok(id) if id == res0.unwrap());

        assert_matches!(
            super::get_unspent_transparent_outputs(
                &db_data,
                taddr,
                BlockHeight::from_u32(12345),
                &[]
            ),
            Ok(utxos) if utxos.is_empty()
        );

        assert_matches!(
            super::get_unspent_transparent_outputs(
                &db_data,
                taddr,
                BlockHeight::from_u32(34567),
                &[]
            ),
            Ok(utxos) if {
                utxos.len() == 1 &&
                utxos.iter().any(|rutxo| rutxo.height() == utxo2.height())
            }
        );

        assert_matches!(
            db_data.get_transparent_balances(account_id, BlockHeight::from_u32(34567)),
            Ok(h) if h.get(taddr) == Amount::from_u64(100000).ok().as_ref()
        );

        // Artificially delete the address from the addresses table so that
        // we can ensure the update fails if the join doesn't work.
        db_data
            .conn
            .execute(
                "DELETE FROM addresses WHERE cached_transparent_receiver_address = ?",
                [Some(taddr.encode(&db_data.params))],
            )
            .unwrap();

        let res2 = super::put_received_transparent_utxo(&mut ops, &utxo2);
        assert_matches!(res2, Err(_));
    }
}
