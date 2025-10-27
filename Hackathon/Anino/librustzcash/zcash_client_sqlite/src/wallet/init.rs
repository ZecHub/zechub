//! Functions for initializing the various databases.
use std::collections::HashMap;
use std::fmt;

use rusqlite::{self, types::ToSql};
use schemer::{Migrator, MigratorError};
use schemer_rusqlite::RusqliteAdapter;
use secrecy::SecretVec;
use uuid::Uuid;

use zcash_primitives::{
    block::BlockHash,
    consensus::{self, BlockHeight},
    transaction::components::amount::BalanceError,
    zip32::AccountId,
};

use zcash_client_backend::keys::UnifiedFullViewingKey;

use crate::{error::SqliteClientError, wallet, WalletDb};

mod migrations;

#[derive(Debug)]
pub enum WalletMigrationError {
    /// The seed is required for the migration.
    SeedRequired,

    /// Decoding of an existing value from its serialized form has failed.
    CorruptedData(String),

    /// Wrapper for rusqlite errors.
    DbError(rusqlite::Error),

    /// Wrapper for amount balance violations
    BalanceError(BalanceError),
}

impl From<rusqlite::Error> for WalletMigrationError {
    fn from(e: rusqlite::Error) -> Self {
        WalletMigrationError::DbError(e)
    }
}

impl From<BalanceError> for WalletMigrationError {
    fn from(e: BalanceError) -> Self {
        WalletMigrationError::BalanceError(e)
    }
}

impl fmt::Display for WalletMigrationError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match &self {
            WalletMigrationError::SeedRequired => {
                write!(
                    f,
                    "The wallet seed is required in order to update the database."
                )
            }
            WalletMigrationError::CorruptedData(reason) => {
                write!(f, "Wallet database is corrupted: {}", reason)
            }
            WalletMigrationError::DbError(e) => write!(f, "{}", e),
            WalletMigrationError::BalanceError(e) => write!(f, "Balance error: {:?}", e),
        }
    }
}

impl std::error::Error for WalletMigrationError {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        match &self {
            WalletMigrationError::DbError(e) => Some(e),
            _ => None,
        }
    }
}

/// Sets up the internal structure of the data database.
///
/// This procedure will automatically perform migration operations to update the wallet database to
/// the database structure required by the current version of this library, and should be invoked
/// at least once any time a client program upgrades to a new version of this library.  The
/// operation of this procedure is idempotent, so it is safe (though not required) to invoke this
/// operation every time the wallet is opened.
///
/// It is safe to use a wallet database previously created without the ability to create
/// transparent spends with a build that enables transparent spends (via use of the
/// `transparent-inputs` feature flag.) The reverse is unsafe, as wallet balance calculations would
/// ignore the transparent UTXOs already controlled by the wallet.
///
///
/// # Examples
///
/// ```
/// use secrecy::Secret;
/// use tempfile::NamedTempFile;
/// use zcash_primitives::consensus::Network;
/// use zcash_client_sqlite::{
///     WalletDb,
///     wallet::init::init_wallet_db,
/// };
///
/// let data_file = NamedTempFile::new().unwrap();
/// let mut db = WalletDb::for_path(data_file.path(), Network::TestNetwork).unwrap();
/// init_wallet_db(&mut db, Some(Secret::new(vec![]))).unwrap();
/// ```
// TODO: It would be possible to make the transition from providing transparent support to no
// longer providing transparent support safe, by including a migration that verifies that no
// unspent transparent outputs exist in the wallet at the time of upgrading to a version of
// the library that does not support transparent use. It might be a good idea to add an explicit
// check for unspent transparent outputs whenever running initialization with a version of the
// library *not* compiled with the `transparent-inputs` feature flag, and fail if any are present.
pub fn init_wallet_db<P: consensus::Parameters + 'static>(
    wdb: &mut WalletDb<P>,
    seed: Option<SecretVec<u8>>,
) -> Result<(), MigratorError<WalletMigrationError>> {
    init_wallet_db_internal(wdb, seed, &[])
}

fn init_wallet_db_internal<P: consensus::Parameters + 'static>(
    wdb: &mut WalletDb<P>,
    seed: Option<SecretVec<u8>>,
    target_migrations: &[Uuid],
) -> Result<(), MigratorError<WalletMigrationError>> {
    // Turn off foreign keys, and ensure that table replacement/modification
    // does not break views
    wdb.conn
        .execute_batch(
            "PRAGMA foreign_keys = OFF;
             PRAGMA legacy_alter_table = TRUE;",
        )
        .map_err(|e| MigratorError::Adapter(WalletMigrationError::from(e)))?;
    let adapter = RusqliteAdapter::new(&mut wdb.conn, Some("schemer_migrations".to_string()));
    adapter.init().expect("Migrations table setup succeeds.");

    let mut migrator = Migrator::new(adapter);
    migrator
        .register_multiple(migrations::all_migrations(&wdb.params, seed))
        .expect("Wallet migration registration should have been successful.");
    if target_migrations.is_empty() {
        migrator.up(None)?;
    } else {
        for target_migration in target_migrations {
            migrator.up(Some(*target_migration))?;
        }
    }
    wdb.conn
        .execute("PRAGMA foreign_keys = ON", [])
        .map_err(|e| MigratorError::Adapter(WalletMigrationError::from(e)))?;
    Ok(())
}

/// Initialises the data database with the given set of account [`UnifiedFullViewingKey`]s.
///
/// **WARNING** This method should be used with care, and should ordinarily be unnecessary.
/// Prefer to use [`WalletWrite::create_account`] instead.
///
/// [`WalletWrite::create_account`]: zcash_client_backend::data_api::WalletWrite::create_account
///
/// The [`UnifiedFullViewingKey`]s are stored internally and used by other APIs such as
/// [`get_address`], [`scan_cached_blocks`], and [`create_spend_to_address`]. Account identifiers
/// in `keys` **MUST** form a consecutive sequence beginning at account 0, and the
/// [`UnifiedFullViewingKey`] corresponding to a given account identifier **MUST** be derived from
/// the wallet's mnemonic seed at the BIP-44 `account` path level as described by
/// [ZIP 316](https://zips.z.cash/zip-0316)
///
/// # Examples
///
/// ```
/// # #[cfg(feature = "transparent-inputs")]
/// # {
/// use tempfile::NamedTempFile;
/// use secrecy::Secret;
/// use std::collections::HashMap;
///
/// use zcash_primitives::{
///     consensus::{Network, Parameters},
///     zip32::{AccountId, ExtendedSpendingKey}
/// };
///
/// use zcash_client_backend::{
///     keys::{
///         sapling,
///         UnifiedFullViewingKey
///     },
/// };
///
/// use zcash_client_sqlite::{
///     WalletDb,
///     wallet::init::{init_accounts_table, init_wallet_db}
/// };
///
/// let data_file = NamedTempFile::new().unwrap();
/// let mut db_data = WalletDb::for_path(data_file.path(), Network::TestNetwork).unwrap();
/// init_wallet_db(&mut db_data, Some(Secret::new(vec![]))).unwrap();
///
/// let seed = [0u8; 32]; // insecure; replace with a strong random seed
/// let account = AccountId::from(0);
/// let extsk = sapling::spending_key(&seed, Network::TestNetwork.coin_type(), account);
/// let dfvk = extsk.to_diversifiable_full_viewing_key();
/// let ufvk = UnifiedFullViewingKey::new(None, Some(dfvk), None).unwrap();
/// let ufvks = HashMap::from([(account, ufvk)]);
/// init_accounts_table(&db_data, &ufvks).unwrap();
/// # }
/// ```
///
/// [`get_address`]: crate::wallet::get_address
/// [`scan_cached_blocks`]: zcash_client_backend::data_api::chain::scan_cached_blocks
/// [`create_spend_to_address`]: zcash_client_backend::data_api::wallet::create_spend_to_address
pub fn init_accounts_table<P: consensus::Parameters>(
    wdb: &WalletDb<P>,
    keys: &HashMap<AccountId, UnifiedFullViewingKey>,
) -> Result<(), SqliteClientError> {
    let mut empty_check = wdb.conn.prepare("SELECT * FROM accounts LIMIT 1")?;
    if empty_check.exists([])? {
        return Err(SqliteClientError::TableNotEmpty);
    }

    // Ensure that the account identifiers are sequential and begin at zero.
    if let Some(account_id) = keys.keys().max() {
        if usize::try_from(u32::from(*account_id)).unwrap() >= keys.len() {
            return Err(SqliteClientError::AccountIdDiscontinuity);
        }
    }

    // Insert accounts atomically
    wdb.conn.execute("BEGIN IMMEDIATE", [])?;
    for (account, key) in keys.iter() {
        wallet::add_account(wdb, *account, key)?;
    }
    wdb.conn.execute("COMMIT", [])?;

    Ok(())
}

/// Initialises the data database with the given block.
///
/// This enables a newly-created database to be immediately-usable, without needing to
/// synchronise historic blocks.
///
/// # Examples
///
/// ```
/// use tempfile::NamedTempFile;
/// use zcash_primitives::{
///     block::BlockHash,
///     consensus::{BlockHeight, Network},
/// };
/// use zcash_client_sqlite::{
///     WalletDb,
///     wallet::init::init_blocks_table,
/// };
///
/// // The block height.
/// let height = BlockHeight::from_u32(500_000);
/// // The hash of the block header.
/// let hash = BlockHash([0; 32]);
/// // The nTime field from the block header.
/// let time = 12_3456_7890;
/// // The serialized Sapling commitment tree as of this block.
/// // Pre-compute and hard-code, or obtain from a service.
/// let sapling_tree = &[];
///
/// let data_file = NamedTempFile::new().unwrap();
/// let db = WalletDb::for_path(data_file.path(), Network::TestNetwork).unwrap();
/// init_blocks_table(&db, height, hash, time, sapling_tree);
/// ```
pub fn init_blocks_table<P>(
    wdb: &WalletDb<P>,
    height: BlockHeight,
    hash: BlockHash,
    time: u32,
    sapling_tree: &[u8],
) -> Result<(), SqliteClientError> {
    let mut empty_check = wdb.conn.prepare("SELECT * FROM blocks LIMIT 1")?;
    if empty_check.exists([])? {
        return Err(SqliteClientError::TableNotEmpty);
    }

    wdb.conn.execute(
        "INSERT INTO blocks (height, hash, time, sapling_tree)
        VALUES (?, ?, ?, ?)",
        [
            u32::from(height).to_sql()?,
            hash.0.to_sql()?,
            time.to_sql()?,
            sapling_tree.to_sql()?,
        ],
    )?;

    Ok(())
}

#[cfg(test)]
#[allow(deprecated)]
mod tests {
    use rusqlite::{self, ToSql};
    use secrecy::Secret;
    use std::collections::HashMap;
    use tempfile::NamedTempFile;

    use zcash_client_backend::{
        address::RecipientAddress,
        encoding::{encode_extended_full_viewing_key, encode_payment_address},
        keys::{sapling, UnifiedFullViewingKey, UnifiedSpendingKey},
    };

    use zcash_primitives::{
        block::BlockHash,
        consensus::{BlockHeight, BranchId, Parameters},
        transaction::{TransactionData, TxVersion},
        zip32::sapling::ExtendedFullViewingKey,
    };

    use crate::{
        error::SqliteClientError,
        tests::{self, network},
        wallet::get_address,
        AccountId, WalletDb,
    };

    use super::{init_accounts_table, init_blocks_table, init_wallet_db};

    #[cfg(feature = "transparent-inputs")]
    use {
        crate::{
            wallet::{self, pool_code, PoolType},
            WalletWrite,
        },
        zcash_address::test_vectors,
        zcash_primitives::{
            consensus::Network, legacy::keys as transparent, zip32::DiversifierIndex,
        },
    };

    #[test]
    fn verify_schema() {
        let data_file = NamedTempFile::new().unwrap();
        let mut db_data = WalletDb::for_path(data_file.path(), tests::network()).unwrap();
        init_wallet_db(&mut db_data, None).unwrap();

        use regex::Regex;
        let re = Regex::new(r"\s+").unwrap();

        let expected_tables = vec![
            "CREATE TABLE \"accounts\" (
                account INTEGER PRIMARY KEY,
                ufvk TEXT NOT NULL
            )",
            "CREATE TABLE addresses (
                account INTEGER NOT NULL,
                diversifier_index_be BLOB NOT NULL,
                address TEXT NOT NULL,
                cached_transparent_receiver_address TEXT,
                FOREIGN KEY (account) REFERENCES accounts(account),
                CONSTRAINT diversification UNIQUE (account, diversifier_index_be)
            )",
            "CREATE TABLE blocks (
                height INTEGER PRIMARY KEY,
                hash BLOB NOT NULL,
                time INTEGER NOT NULL,
                sapling_tree BLOB NOT NULL
            )",
            "CREATE TABLE received_notes (
                id_note INTEGER PRIMARY KEY,
                tx INTEGER NOT NULL,
                output_index INTEGER NOT NULL,
                account INTEGER NOT NULL,
                diversifier BLOB NOT NULL,
                value INTEGER NOT NULL,
                rcm BLOB NOT NULL,
                nf BLOB NOT NULL UNIQUE,
                is_change INTEGER NOT NULL,
                memo BLOB,
                spent INTEGER,
                FOREIGN KEY (tx) REFERENCES transactions(id_tx),
                FOREIGN KEY (account) REFERENCES accounts(account),
                FOREIGN KEY (spent) REFERENCES transactions(id_tx),
                CONSTRAINT tx_output UNIQUE (tx, output_index)
            )",
            "CREATE TABLE sapling_witnesses (
                id_witness INTEGER PRIMARY KEY,
                note INTEGER NOT NULL,
                block INTEGER NOT NULL,
                witness BLOB NOT NULL,
                FOREIGN KEY (note) REFERENCES received_notes(id_note),
                FOREIGN KEY (block) REFERENCES blocks(height),
                CONSTRAINT witness_height UNIQUE (note, block)
            )",
            "CREATE TABLE schemer_migrations (
                id blob PRIMARY KEY
            )",
            "CREATE TABLE \"sent_notes\" (
                id_note INTEGER PRIMARY KEY,
                tx INTEGER NOT NULL,
                output_pool INTEGER NOT NULL,
                output_index INTEGER NOT NULL,
                from_account INTEGER NOT NULL,
                to_address TEXT,
                to_account INTEGER,
                value INTEGER NOT NULL,
                memo BLOB,
                FOREIGN KEY (tx) REFERENCES transactions(id_tx),
                FOREIGN KEY (from_account) REFERENCES accounts(account),
                FOREIGN KEY (to_account) REFERENCES accounts(account),
                CONSTRAINT tx_output UNIQUE (tx, output_pool, output_index),
                CONSTRAINT note_recipient CHECK (
                    (to_address IS NOT NULL) != (to_account IS NOT NULL)
                )
            )",
            "CREATE TABLE transactions (
                id_tx INTEGER PRIMARY KEY,
                txid BLOB NOT NULL UNIQUE,
                created TEXT,
                block INTEGER,
                tx_index INTEGER,
                expiry_height INTEGER,
                raw BLOB,
                fee INTEGER,
                FOREIGN KEY (block) REFERENCES blocks(height)
            )",
            "CREATE TABLE \"utxos\" (
                id_utxo INTEGER PRIMARY KEY,
                received_by_account INTEGER NOT NULL,
                address TEXT NOT NULL,
                prevout_txid BLOB NOT NULL,
                prevout_idx INTEGER NOT NULL,
                script BLOB NOT NULL,
                value_zat INTEGER NOT NULL,
                height INTEGER NOT NULL,
                spent_in_tx INTEGER,
                FOREIGN KEY (received_by_account) REFERENCES accounts(account),
                FOREIGN KEY (spent_in_tx) REFERENCES transactions(id_tx),
                CONSTRAINT tx_outpoint UNIQUE (prevout_txid, prevout_idx)
            )",
        ];

        let mut tables_query = db_data
            .conn
            .prepare("SELECT sql FROM sqlite_schema WHERE type = 'table' ORDER BY tbl_name")
            .unwrap();
        let mut rows = tables_query.query([]).unwrap();
        let mut expected_idx = 0;
        while let Some(row) = rows.next().unwrap() {
            let sql: String = row.get(0).unwrap();
            assert_eq!(
                re.replace_all(&sql, " "),
                re.replace_all(expected_tables[expected_idx], " ")
            );
            expected_idx += 1;
        }

        let expected_views = vec![
            // v_transactions
            "CREATE VIEW v_transactions AS
            SELECT notes.id_tx,
                   notes.mined_height,
                   notes.tx_index,
                   notes.txid,
                   notes.expiry_height,
                   notes.raw,
                   SUM(notes.value) + MAX(notes.fee) AS net_value,
                   MAX(notes.fee)                    AS fee_paid,
                   SUM(notes.sent_count) == 0        AS is_wallet_internal,
                   SUM(notes.is_change) > 0          AS has_change,
                   SUM(notes.sent_count)             AS sent_note_count,
                   SUM(notes.received_count)         AS received_note_count,
                   SUM(notes.memo_present)           AS memo_count,
                   blocks.time                       AS block_time
            FROM (
                SELECT transactions.id_tx            AS id_tx,
                       transactions.block            AS mined_height,
                       transactions.tx_index         AS tx_index,
                       transactions.txid             AS txid,
                       transactions.expiry_height    AS expiry_height,
                       transactions.raw              AS raw,
                       0                             AS fee,
                       CASE
                            WHEN received_notes.is_change THEN 0
                            ELSE value
                       END AS value,
                       0                             AS sent_count,
                       CASE
                            WHEN received_notes.is_change THEN 1
                            ELSE 0
                       END AS is_change,
                       CASE
                            WHEN received_notes.is_change THEN 0
                            ELSE 1
                       END AS received_count,
                       CASE
                           WHEN received_notes.memo IS NULL THEN 0
                           ELSE 1
                       END AS memo_present
                FROM   transactions
                       JOIN received_notes ON transactions.id_tx = received_notes.tx
                UNION
                SELECT transactions.id_tx            AS id_tx,
                       transactions.block            AS mined_height,
                       transactions.tx_index         AS tx_index,
                       transactions.txid             AS txid,
                       transactions.expiry_height    AS expiry_height,
                       transactions.raw              AS raw,
                       transactions.fee              AS fee,
                       -sent_notes.value             AS value,
                       CASE
                           WHEN sent_notes.from_account = sent_notes.to_account THEN 0
                           ELSE 1
                       END AS sent_count,
                       0                             AS is_change,
                       0                             AS received_count,
                       CASE
                           WHEN sent_notes.memo IS NULL THEN 0
                           ELSE 1
                       END AS memo_present
                FROM   transactions
                       JOIN sent_notes ON transactions.id_tx = sent_notes.tx
            ) AS notes
            LEFT JOIN blocks ON notes.mined_height = blocks.height
            GROUP BY notes.id_tx",
            // v_tx_received
            "CREATE VIEW v_tx_received AS
            SELECT transactions.id_tx            AS id_tx,
                   transactions.block            AS mined_height,
                   transactions.tx_index         AS tx_index,
                   transactions.txid             AS txid,
                   transactions.expiry_height    AS expiry_height,
                   transactions.raw              AS raw,
                   MAX(received_notes.account)   AS received_by_account,
                   SUM(received_notes.value)     AS received_total,
                   COUNT(received_notes.id_note) AS received_note_count,
                   SUM(
                       CASE
                           WHEN received_notes.memo IS NULL THEN 0
                           ELSE 1
                       END
                   ) AS memo_count,
                   blocks.time                   AS block_time
            FROM   transactions
                   JOIN received_notes
                          ON transactions.id_tx = received_notes.tx
                   LEFT JOIN blocks
                          ON transactions.block = blocks.height
            GROUP BY received_notes.tx, received_notes.account",
            // v_tx_received
            "CREATE VIEW v_tx_sent AS
            SELECT transactions.id_tx           AS id_tx,
                   transactions.block           AS mined_height,
                   transactions.tx_index        AS tx_index,
                   transactions.txid            AS txid,
                   transactions.expiry_height   AS expiry_height,
                   transactions.raw             AS raw,
                   MAX(sent_notes.from_account) AS sent_from_account,
                   SUM(sent_notes.value)        AS sent_total,
                   COUNT(sent_notes.id_note)    AS sent_note_count,
                   SUM(
                       CASE
                           WHEN sent_notes.memo IS NULL THEN 0
                           ELSE 1
                       END
                   ) AS memo_count,
                   blocks.time                  AS block_time
            FROM   transactions
                   JOIN sent_notes
                          ON transactions.id_tx = sent_notes.tx
                   LEFT JOIN blocks
                          ON transactions.block = blocks.height
            GROUP BY sent_notes.tx, sent_notes.from_account",
        ];

        let mut views_query = db_data
            .conn
            .prepare("SELECT sql FROM sqlite_schema WHERE type = 'view' ORDER BY tbl_name")
            .unwrap();
        let mut rows = views_query.query([]).unwrap();
        let mut expected_idx = 0;
        while let Some(row) = rows.next().unwrap() {
            let sql: String = row.get(0).unwrap();
            assert_eq!(
                re.replace_all(&sql, " "),
                re.replace_all(expected_views[expected_idx], " ")
            );
            expected_idx += 1;
        }
    }

    #[test]
    fn init_migrate_from_0_3_0() {
        fn init_0_3_0<P>(
            wdb: &mut WalletDb<P>,
            extfvk: &ExtendedFullViewingKey,
            account: AccountId,
        ) -> Result<(), rusqlite::Error> {
            wdb.conn.execute(
                "CREATE TABLE accounts (
                    account INTEGER PRIMARY KEY,
                    extfvk TEXT NOT NULL,
                    address TEXT NOT NULL
                )",
                [],
            )?;
            wdb.conn.execute(
                "CREATE TABLE blocks (
                    height INTEGER PRIMARY KEY,
                    hash BLOB NOT NULL,
                    time INTEGER NOT NULL,
                    sapling_tree BLOB NOT NULL
                )",
                [],
            )?;
            wdb.conn.execute(
                "CREATE TABLE transactions (
                    id_tx INTEGER PRIMARY KEY,
                    txid BLOB NOT NULL UNIQUE,
                    created TEXT,
                    block INTEGER,
                    tx_index INTEGER,
                    expiry_height INTEGER,
                    raw BLOB,
                    FOREIGN KEY (block) REFERENCES blocks(height)
                )",
                [],
            )?;
            wdb.conn.execute(
                "CREATE TABLE received_notes (
                    id_note INTEGER PRIMARY KEY,
                    tx INTEGER NOT NULL,
                    output_index INTEGER NOT NULL,
                    account INTEGER NOT NULL,
                    diversifier BLOB NOT NULL,
                    value INTEGER NOT NULL,
                    rcm BLOB NOT NULL,
                    nf BLOB NOT NULL UNIQUE,
                    is_change INTEGER NOT NULL,
                    memo BLOB,
                    spent INTEGER,
                    FOREIGN KEY (tx) REFERENCES transactions(id_tx),
                    FOREIGN KEY (account) REFERENCES accounts(account),
                    FOREIGN KEY (spent) REFERENCES transactions(id_tx),
                    CONSTRAINT tx_output UNIQUE (tx, output_index)
                )",
                [],
            )?;
            wdb.conn.execute(
                "CREATE TABLE sapling_witnesses (
                    id_witness INTEGER PRIMARY KEY,
                    note INTEGER NOT NULL,
                    block INTEGER NOT NULL,
                    witness BLOB NOT NULL,
                    FOREIGN KEY (note) REFERENCES received_notes(id_note),
                    FOREIGN KEY (block) REFERENCES blocks(height),
                    CONSTRAINT witness_height UNIQUE (note, block)
                )",
                [],
            )?;
            wdb.conn.execute(
                "CREATE TABLE sent_notes (
                    id_note INTEGER PRIMARY KEY,
                    tx INTEGER NOT NULL,
                    output_index INTEGER NOT NULL,
                    from_account INTEGER NOT NULL,
                    address TEXT NOT NULL,
                    value INTEGER NOT NULL,
                    memo BLOB,
                    FOREIGN KEY (tx) REFERENCES transactions(id_tx),
                    FOREIGN KEY (from_account) REFERENCES accounts(account),
                    CONSTRAINT tx_output UNIQUE (tx, output_index)
                )",
                [],
            )?;

            let address = encode_payment_address(
                tests::network().hrp_sapling_payment_address(),
                &extfvk.default_address().1,
            );
            let extfvk = encode_extended_full_viewing_key(
                tests::network().hrp_sapling_extended_full_viewing_key(),
                extfvk,
            );
            wdb.conn.execute(
                "INSERT INTO accounts (account, extfvk, address)
                VALUES (?, ?, ?)",
                [
                    u32::from(account).to_sql()?,
                    extfvk.to_sql()?,
                    address.to_sql()?,
                ],
            )?;

            Ok(())
        }

        let seed = [0xab; 32];
        let account = AccountId::from(0);
        let secret_key = sapling::spending_key(&seed, tests::network().coin_type(), account);
        let extfvk = secret_key.to_extended_full_viewing_key();
        let data_file = NamedTempFile::new().unwrap();
        let mut db_data = WalletDb::for_path(data_file.path(), tests::network()).unwrap();
        init_0_3_0(&mut db_data, &extfvk, account).unwrap();
        init_wallet_db(&mut db_data, Some(Secret::new(seed.to_vec()))).unwrap();
    }

    #[test]
    fn init_migrate_from_autoshielding_poc() {
        fn init_autoshielding<P>(
            wdb: &WalletDb<P>,
            extfvk: &ExtendedFullViewingKey,
            account: AccountId,
        ) -> Result<(), rusqlite::Error> {
            wdb.conn.execute(
                "CREATE TABLE accounts (
                    account INTEGER PRIMARY KEY,
                    extfvk TEXT NOT NULL,
                    address TEXT NOT NULL,
                    transparent_address TEXT NOT NULL
                )",
                [],
            )?;
            wdb.conn.execute(
                "CREATE TABLE blocks (
                    height INTEGER PRIMARY KEY,
                    hash BLOB NOT NULL,
                    time INTEGER NOT NULL,
                    sapling_tree BLOB NOT NULL
                )",
                [],
            )?;
            wdb.conn.execute(
                "CREATE TABLE transactions (
                    id_tx INTEGER PRIMARY KEY,
                    txid BLOB NOT NULL UNIQUE,
                    created TEXT,
                    block INTEGER,
                    tx_index INTEGER,
                    expiry_height INTEGER,
                    raw BLOB,
                    FOREIGN KEY (block) REFERENCES blocks(height)
                )",
                [],
            )?;
            wdb.conn.execute(
                "CREATE TABLE received_notes (
                    id_note INTEGER PRIMARY KEY,
                    tx INTEGER NOT NULL,
                    output_index INTEGER NOT NULL,
                    account INTEGER NOT NULL,
                    diversifier BLOB NOT NULL,
                    value INTEGER NOT NULL,
                    rcm BLOB NOT NULL,
                    nf BLOB NOT NULL UNIQUE,
                    is_change INTEGER NOT NULL,
                    memo BLOB,
                    spent INTEGER,
                    FOREIGN KEY (tx) REFERENCES transactions(id_tx),
                    FOREIGN KEY (account) REFERENCES accounts(account),
                    FOREIGN KEY (spent) REFERENCES transactions(id_tx),
                    CONSTRAINT tx_output UNIQUE (tx, output_index)
                )",
                [],
            )?;
            wdb.conn.execute(
                "CREATE TABLE sapling_witnesses (
                    id_witness INTEGER PRIMARY KEY,
                    note INTEGER NOT NULL,
                    block INTEGER NOT NULL,
                    witness BLOB NOT NULL,
                    FOREIGN KEY (note) REFERENCES received_notes(id_note),
                    FOREIGN KEY (block) REFERENCES blocks(height),
                    CONSTRAINT witness_height UNIQUE (note, block)
                )",
                [],
            )?;
            wdb.conn.execute(
                "CREATE TABLE sent_notes (
                    id_note INTEGER PRIMARY KEY,
                    tx INTEGER NOT NULL,
                    output_index INTEGER NOT NULL,
                    from_account INTEGER NOT NULL,
                    address TEXT NOT NULL,
                    value INTEGER NOT NULL,
                    memo BLOB,
                    FOREIGN KEY (tx) REFERENCES transactions(id_tx),
                    FOREIGN KEY (from_account) REFERENCES accounts(account),
                    CONSTRAINT tx_output UNIQUE (tx, output_index)
                )",
                [],
            )?;
            wdb.conn.execute(
                "CREATE TABLE utxos (
                    id_utxo INTEGER PRIMARY KEY,
                    address TEXT NOT NULL,
                    prevout_txid BLOB NOT NULL,
                    prevout_idx INTEGER NOT NULL,
                    script BLOB NOT NULL,
                    value_zat INTEGER NOT NULL,
                    height INTEGER NOT NULL,
                    spent_in_tx INTEGER,
                    FOREIGN KEY (spent_in_tx) REFERENCES transactions(id_tx),
                    CONSTRAINT tx_outpoint UNIQUE (prevout_txid, prevout_idx)
                )",
                [],
            )?;

            let address = encode_payment_address(
                tests::network().hrp_sapling_payment_address(),
                &extfvk.default_address().1,
            );
            let extfvk = encode_extended_full_viewing_key(
                tests::network().hrp_sapling_extended_full_viewing_key(),
                extfvk,
            );
            wdb.conn.execute(
                "INSERT INTO accounts (account, extfvk, address, transparent_address)
                VALUES (?, ?, ?, '')",
                [
                    u32::from(account).to_sql()?,
                    extfvk.to_sql()?,
                    address.to_sql()?,
                ],
            )?;

            // add a sapling sent note
            wdb.conn.execute(
                "INSERT INTO blocks (height, hash, time, sapling_tree) VALUES (0, 0, 0, '')",
                [],
            )?;

            let tx = TransactionData::from_parts(
                TxVersion::Sapling,
                BranchId::Canopy,
                0,
                BlockHeight::from(0),
                None,
                None,
                None,
                None,
            )
            .freeze()
            .unwrap();

            let mut tx_bytes = vec![];
            tx.write(&mut tx_bytes).unwrap();
            wdb.conn.execute(
                "INSERT INTO transactions (block, id_tx, txid, raw) VALUES (0, 0, '', ?)",
                [&tx_bytes[..]],
            )?;
            wdb.conn.execute(
                "INSERT INTO sent_notes (tx, output_index, from_account, address, value)
                VALUES (0, 0, ?, ?, 0)",
                [u32::from(account).to_sql()?, address.to_sql()?],
            )?;

            Ok(())
        }

        let seed = [0xab; 32];
        let account = AccountId::from(0);
        let secret_key = sapling::spending_key(&seed, tests::network().coin_type(), account);
        let extfvk = secret_key.to_extended_full_viewing_key();
        let data_file = NamedTempFile::new().unwrap();
        let mut db_data = WalletDb::for_path(data_file.path(), tests::network()).unwrap();
        init_autoshielding(&db_data, &extfvk, account).unwrap();
        init_wallet_db(&mut db_data, Some(Secret::new(seed.to_vec()))).unwrap();
    }

    #[test]
    fn init_migrate_from_main_pre_migrations() {
        fn init_main<P>(
            wdb: &WalletDb<P>,
            ufvk: &UnifiedFullViewingKey,
            account: AccountId,
        ) -> Result<(), rusqlite::Error> {
            wdb.conn.execute(
                "CREATE TABLE accounts (
                    account INTEGER PRIMARY KEY,
                    ufvk TEXT,
                    address TEXT,
                    transparent_address TEXT
                )",
                [],
            )?;
            wdb.conn.execute(
                "CREATE TABLE blocks (
                    height INTEGER PRIMARY KEY,
                    hash BLOB NOT NULL,
                    time INTEGER NOT NULL,
                    sapling_tree BLOB NOT NULL
                )",
                [],
            )?;
            wdb.conn.execute(
                "CREATE TABLE transactions (
                    id_tx INTEGER PRIMARY KEY,
                    txid BLOB NOT NULL UNIQUE,
                    created TEXT,
                    block INTEGER,
                    tx_index INTEGER,
                    expiry_height INTEGER,
                    raw BLOB,
                    FOREIGN KEY (block) REFERENCES blocks(height)
                )",
                [],
            )?;
            wdb.conn.execute(
                "CREATE TABLE received_notes (
                    id_note INTEGER PRIMARY KEY,
                    tx INTEGER NOT NULL,
                    output_index INTEGER NOT NULL,
                    account INTEGER NOT NULL,
                    diversifier BLOB NOT NULL,
                    value INTEGER NOT NULL,
                    rcm BLOB NOT NULL,
                    nf BLOB NOT NULL UNIQUE,
                    is_change INTEGER NOT NULL,
                    memo BLOB,
                    spent INTEGER,
                    FOREIGN KEY (tx) REFERENCES transactions(id_tx),
                    FOREIGN KEY (account) REFERENCES accounts(account),
                    FOREIGN KEY (spent) REFERENCES transactions(id_tx),
                    CONSTRAINT tx_output UNIQUE (tx, output_index)
                )",
                [],
            )?;
            wdb.conn.execute(
                "CREATE TABLE sapling_witnesses (
                    id_witness INTEGER PRIMARY KEY,
                    note INTEGER NOT NULL,
                    block INTEGER NOT NULL,
                    witness BLOB NOT NULL,
                    FOREIGN KEY (note) REFERENCES received_notes(id_note),
                    FOREIGN KEY (block) REFERENCES blocks(height),
                    CONSTRAINT witness_height UNIQUE (note, block)
                )",
                [],
            )?;
            wdb.conn.execute(
                "CREATE TABLE sent_notes (
                    id_note INTEGER PRIMARY KEY,
                    tx INTEGER NOT NULL,
                    output_pool INTEGER NOT NULL,
                    output_index INTEGER NOT NULL,
                    from_account INTEGER NOT NULL,
                    address TEXT NOT NULL,
                    value INTEGER NOT NULL,
                    memo BLOB,
                    FOREIGN KEY (tx) REFERENCES transactions(id_tx),
                    FOREIGN KEY (from_account) REFERENCES accounts(account),
                    CONSTRAINT tx_output UNIQUE (tx, output_pool, output_index)
                )",
                [],
            )?;
            wdb.conn.execute(
                "CREATE TABLE utxos (
                    id_utxo INTEGER PRIMARY KEY,
                    address TEXT NOT NULL,
                    prevout_txid BLOB NOT NULL,
                    prevout_idx INTEGER NOT NULL,
                    script BLOB NOT NULL,
                    value_zat INTEGER NOT NULL,
                    height INTEGER NOT NULL,
                    spent_in_tx INTEGER,
                    FOREIGN KEY (spent_in_tx) REFERENCES transactions(id_tx),
                    CONSTRAINT tx_outpoint UNIQUE (prevout_txid, prevout_idx)
                )",
                [],
            )?;

            let ufvk_str = ufvk.encode(&tests::network());
            let address_str =
                RecipientAddress::Unified(ufvk.default_address().0).encode(&tests::network());
            wdb.conn.execute(
                "INSERT INTO accounts (account, ufvk, address, transparent_address)
                VALUES (?, ?, ?, '')",
                [
                    u32::from(account).to_sql()?,
                    ufvk_str.to_sql()?,
                    address_str.to_sql()?,
                ],
            )?;

            // add a transparent "sent note"
            #[cfg(feature = "transparent-inputs")]
            {
                let taddr =
                    RecipientAddress::Transparent(*ufvk.default_address().0.transparent().unwrap())
                        .encode(&tests::network());
                wdb.conn.execute(
                    "INSERT INTO blocks (height, hash, time, sapling_tree) VALUES (0, 0, 0, '')",
                    [],
                )?;
                wdb.conn.execute(
                    "INSERT INTO transactions (block, id_tx, txid) VALUES (0, 0, '')",
                    [],
                )?;
                wdb.conn.execute(
                    "INSERT INTO sent_notes (tx, output_pool, output_index, from_account, address, value)
                    VALUES (0, ?, 0, ?, ?, 0)",
                    [pool_code(PoolType::Transparent).to_sql()?, u32::from(account).to_sql()?, taddr.to_sql()?])?;
            }

            Ok(())
        }

        let seed = [0xab; 32];
        let account = AccountId::from(0);
        let secret_key = UnifiedSpendingKey::from_seed(&tests::network(), &seed, account).unwrap();
        let data_file = NamedTempFile::new().unwrap();
        let mut db_data = WalletDb::for_path(data_file.path(), tests::network()).unwrap();
        init_main(&db_data, &secret_key.to_unified_full_viewing_key(), account).unwrap();
        init_wallet_db(&mut db_data, Some(Secret::new(seed.to_vec()))).unwrap();
    }

    #[test]
    fn init_accounts_table_only_works_once() {
        let data_file = NamedTempFile::new().unwrap();
        let mut db_data = WalletDb::for_path(data_file.path(), tests::network()).unwrap();
        init_wallet_db(&mut db_data, Some(Secret::new(vec![]))).unwrap();

        // We can call the function as many times as we want with no data
        init_accounts_table(&db_data, &HashMap::new()).unwrap();
        init_accounts_table(&db_data, &HashMap::new()).unwrap();

        let seed = [0u8; 32];
        let account = AccountId::from(0);

        // First call with data should initialise the accounts table
        let extsk = sapling::spending_key(&seed, network().coin_type(), account);
        let dfvk = extsk.to_diversifiable_full_viewing_key();

        #[cfg(feature = "transparent-inputs")]
        let ufvk = UnifiedFullViewingKey::new(
            Some(
                transparent::AccountPrivKey::from_seed(&network(), &seed, account)
                    .unwrap()
                    .to_account_pubkey(),
            ),
            Some(dfvk),
            None,
        )
        .unwrap();

        #[cfg(not(feature = "transparent-inputs"))]
        let ufvk = UnifiedFullViewingKey::new(Some(dfvk), None).unwrap();
        let ufvks = HashMap::from([(account, ufvk)]);

        init_accounts_table(&db_data, &ufvks).unwrap();

        // Subsequent calls should return an error
        init_accounts_table(&db_data, &HashMap::new()).unwrap_err();
        init_accounts_table(&db_data, &ufvks).unwrap_err();
    }

    #[test]
    fn init_accounts_table_allows_no_gaps() {
        let data_file = NamedTempFile::new().unwrap();
        let mut db_data = WalletDb::for_path(data_file.path(), network()).unwrap();
        init_wallet_db(&mut db_data, Some(Secret::new(vec![]))).unwrap();

        // allow sequential initialization
        let seed = [0u8; 32];
        let ufvks = |ids: &[u32]| {
            ids.iter()
                .map(|a| {
                    let account = AccountId::from(*a);
                    UnifiedSpendingKey::from_seed(&network(), &seed, account)
                        .map(|k| (account, k.to_unified_full_viewing_key()))
                        .unwrap()
                })
                .collect::<HashMap<_, _>>()
        };

        // should fail if we have a gap
        assert_matches!(
            init_accounts_table(&db_data, &ufvks(&[0, 2])),
            Err(SqliteClientError::AccountIdDiscontinuity)
        );

        // should succeed if there are no gaps
        assert!(init_accounts_table(&db_data, &ufvks(&[0, 1, 2])).is_ok());
    }

    #[test]
    fn init_blocks_table_only_works_once() {
        let data_file = NamedTempFile::new().unwrap();
        let mut db_data = WalletDb::for_path(data_file.path(), tests::network()).unwrap();
        init_wallet_db(&mut db_data, Some(Secret::new(vec![]))).unwrap();

        // First call with data should initialise the blocks table
        init_blocks_table(
            &db_data,
            BlockHeight::from(1u32),
            BlockHash([1; 32]),
            1,
            &[],
        )
        .unwrap();

        // Subsequent calls should return an error
        init_blocks_table(
            &db_data,
            BlockHeight::from(2u32),
            BlockHash([2; 32]),
            2,
            &[],
        )
        .unwrap_err();
    }

    #[test]
    fn init_accounts_table_stores_correct_address() {
        let data_file = NamedTempFile::new().unwrap();
        let mut db_data = WalletDb::for_path(data_file.path(), tests::network()).unwrap();
        init_wallet_db(&mut db_data, None).unwrap();

        let seed = [0u8; 32];

        // Add an account to the wallet
        let account_id = AccountId::from(0);
        let usk = UnifiedSpendingKey::from_seed(&tests::network(), &seed, account_id).unwrap();
        let ufvk = usk.to_unified_full_viewing_key();
        let expected_address = ufvk.sapling().unwrap().default_address().1;
        let ufvks = HashMap::from([(account_id, ufvk)]);
        init_accounts_table(&db_data, &ufvks).unwrap();

        // The account's address should be in the data DB
        let pa = get_address(&db_data, AccountId::from(0)).unwrap();
        assert_eq!(pa.unwrap(), expected_address);
    }

    #[test]
    #[cfg(feature = "transparent-inputs")]
    fn account_produces_expected_ua_sequence() {
        let data_file = NamedTempFile::new().unwrap();
        let mut db_data = WalletDb::for_path(data_file.path(), Network::MainNetwork).unwrap();
        init_wallet_db(&mut db_data, None).unwrap();

        let mut ops = db_data.get_update_ops().unwrap();
        let seed = test_vectors::UNIFIED[0].root_seed;
        let (account, _usk) = ops.create_account(&Secret::new(seed.to_vec())).unwrap();
        assert_eq!(account, AccountId::from(0u32));

        for tv in &test_vectors::UNIFIED[..3] {
            if let Some(RecipientAddress::Unified(tvua)) =
                RecipientAddress::decode(&Network::MainNetwork, tv.unified_addr)
            {
                let (ua, di) = wallet::get_current_address(&db_data, account)
                    .unwrap()
                    .expect("create_account generated the first address");
                assert_eq!(DiversifierIndex::from(tv.diversifier_index), di);
                assert_eq!(tvua.transparent(), ua.transparent());
                assert_eq!(tvua.sapling(), ua.sapling());
                assert_eq!(tv.unified_addr, ua.encode(&Network::MainNetwork));

                ops.get_next_available_address(account)
                    .unwrap()
                    .expect("get_next_available_address generated an address");
            } else {
                panic!(
                    "{} did not decode to a valid unified address",
                    tv.unified_addr
                );
            }
        }
    }
}
