use crate::chain::Nf;
use crate::coin::{get_coin_chain, CoinType};
use crate::contact::Contact;
use crate::note_selection::{Source, UTXO};
use crate::orchard::{derive_orchard_keys, OrchardKeyBytes, OrchardViewKey};
use crate::prices::Quote;
use crate::sapling::SaplingViewKey;
use crate::sync::tree::{CTree, TreeCheckpoint};
use crate::taddr::{derive_tkeys, TransparentTxInfo};
use crate::transaction::{GetTransactionDetailRequest, TransactionDetails};
use crate::unified::UnifiedAddressType;
use crate::{sync, BlockId, CoinConfig, CompactTxStreamerClient, Connection, Hash};
use flatbuffers::FlatBufferBuilder;
use orchard::keys::FullViewingKey;
use rusqlite::Error::QueryReturnedNoRows;
use rusqlite::{params, OptionalExtension, Params, Row, Statement, Transaction};
use serde::Serialize;
use std::collections::HashMap;
use std::convert::TryInto;
use tonic::transport::Channel;
use tonic::Request;
use zcash_client_backend::encoding::decode_extended_full_viewing_key;
use zcash_primitives::consensus::{Network, NetworkUpgrade, Parameters};
use zcash_primitives::merkle_tree::IncrementalWitness;
use zcash_primitives::sapling::{Diversifier, Node, Note, SaplingIvk};
use zcash_primitives::zip32::ExtendedFullViewingKey;

pub mod backup;
pub mod cipher;
pub mod data_generated;
mod migration;
pub mod read;

use crate::db::cipher::set_db_passwd;
use crate::db::data_generated::fb::SendTemplate;
pub use backup::FullEncryptedBackup;

use self::data_generated::fb::MemoVecT;

#[allow(dead_code)]
pub const DEFAULT_DB_PATH: &str = "zec.db";

pub struct DbAdapter {
    pub coin_type: CoinType,
    pub connection: Connection,
}

pub trait ConnectionOrTransaction {
    fn sql_execute<P: Params>(&self, sql: &str, params: P) -> rusqlite::Result<usize>;
    fn sql_prepare(&self, sql: &str) -> rusqlite::Result<Statement<'_>>;
    fn sql_query_row<T, P, F>(&self, sql: &str, params: P, f: F) -> rusqlite::Result<T>
    where
        P: Params,
        F: FnOnce(&Row<'_>) -> rusqlite::Result<T>;
}

impl<'conn> ConnectionOrTransaction for Transaction<'conn> {
    fn sql_execute<P: Params>(&self, sql: &str, params: P) -> rusqlite::Result<usize> {
        self.execute(sql, params)
    }

    fn sql_prepare(&self, sql: &str) -> rusqlite::Result<Statement<'_>> {
        self.prepare(sql)
    }

    fn sql_query_row<T, P, F>(&self, sql: &str, params: P, f: F) -> rusqlite::Result<T>
    where
        P: Params,
        F: FnOnce(&Row<'_>) -> rusqlite::Result<T>,
    {
        self.query_row(sql, params, f)
    }
}

impl<'conn> ConnectionOrTransaction for Connection {
    fn sql_execute<P: Params>(&self, sql: &str, params: P) -> rusqlite::Result<usize> {
        self.execute(sql, params)
    }

    fn sql_prepare(&self, sql: &str) -> rusqlite::Result<Statement<'_>> {
        self.prepare(sql)
    }

    fn sql_query_row<T, P, F>(&self, sql: &str, params: P, f: F) -> rusqlite::Result<T>
    where
        P: Params,
        F: FnOnce(&Row<'_>) -> rusqlite::Result<T>,
    {
        self.query_row(sql, params, f)
    }
}

#[derive(Debug)]
pub struct ReceivedNote {
    pub account: u32,
    pub height: u32,
    pub output_index: u32,
    pub diversifier: Vec<u8>,
    pub value: u64,
    pub rcm: Vec<u8>,
    pub nf: Vec<u8>,
    pub rho: Option<Vec<u8>>,
    pub spent: Option<u32>,
}

#[derive(Clone)]
pub struct ReceivedNoteShort {
    pub id: u32,
    pub account: u32,
    pub nf: Nf,
    pub value: u64,
}

#[derive(Clone)]
pub struct SpendableNote {
    pub id: u32,
    pub note: Note,
    pub diversifier: Diversifier,
    pub witness: IncrementalWitness<Node>,
}

pub struct AccountViewKey {
    pub fvk: ExtendedFullViewingKey,
    pub ivk: SaplingIvk,
    pub viewonly: bool,
}

pub fn wrap_query_no_rows(name: &'static str) -> impl Fn(rusqlite::Error) -> anyhow::Error {
    move |err: rusqlite::Error| match err {
        QueryReturnedNoRows => anyhow::anyhow!("Query {} returned no rows", name),
        other => anyhow::anyhow!(other.to_string()),
    }
}

impl DbAdapter {
    pub fn new(coin_type: CoinType, connection: Connection) -> anyhow::Result<DbAdapter> {
        Ok(DbAdapter {
            coin_type,
            connection,
        })
    }

    pub fn inner(self) -> Connection {
        self.connection
    }

    pub fn migrate_db(
        network: &Network,
        connection: &Connection,
        passwd: &str,
        has_ua: bool,
    ) -> anyhow::Result<()> {
        set_db_passwd(&connection, passwd)?;
        connection.query_row("PRAGMA journal_mode=wal", [], |_| Ok(()))?;
        migration::init_db(&connection, network, has_ua)?;
        Ok(())
    }

    pub async fn migrate_data(&self, coin: u8) -> anyhow::Result<()> {
        let cc = CoinConfig::get(coin);
        if cc.chain.has_unified() {
            let mut client: Option<CompactTxStreamerClient<Channel>> = None;
            let mut stmt = self.connection.prepare("select s.height from sapling_tree s LEFT JOIN orchard_tree o ON s.height = o.height WHERE o.height IS NULL")?;
            let rows = stmt.query_map([], |row| {
                let height: u32 = row.get(0)?;
                Ok(height)
            })?;
            let mut trees = HashMap::new();
            for r in rows {
                trees.insert(r?, vec![]);
            }
            for (height, tree) in trees.iter_mut() {
                if client.is_none() {
                    client = Some(cc.connect_lwd().await?);
                }
                let client = client.as_mut().unwrap();
                let tree_state = client
                    .get_tree_state(Request::new(BlockId {
                        height: *height as u64,
                        hash: vec![],
                    }))
                    .await?
                    .into_inner();
                let orchard_tree = hex::decode(&tree_state.orchard_tree).unwrap();
                tree.extend(orchard_tree);
            }
            for (height, tree) in trees.iter() {
                self.connection.execute(
                    "INSERT INTO orchard_tree(height, tree) VALUES (?1, ?2) ON CONFLICT DO NOTHING",
                    params![height, tree],
                )?;
            }
        }
        Ok(())
    }

    pub fn begin_transaction(&mut self) -> anyhow::Result<Transaction> {
        // Use IMMEDIATE to acquire a RESERVED lock up-front and avoid later busy failures
        let tx = self
            .connection
            .transaction_with_behavior(rusqlite::TransactionBehavior::Immediate)?;
        Ok(tx)
    }

    pub fn init_db(&mut self) -> anyhow::Result<()> {
        self.delete_incomplete_scan()?;
        self.delete_orphan_transactions()?;
        Ok(())
    }

    pub fn reset_db(&self) -> anyhow::Result<()> {
        migration::reset_db(&self.connection)?;
        Ok(())
    }

    pub fn get_account_id(&self, ivk: &str) -> anyhow::Result<Option<u32>> {
        let r = self
            .connection
            .query_row(
                "SELECT id_account FROM accounts WHERE ivk = ?1",
                params![ivk],
                |r| {
                    let id: u32 = r.get(0)?;
                    Ok(id)
                },
            )
            .optional()?;
        Ok(r)
    }

    pub fn store_account(
        &self,
        name: &str,
        seed: Option<&str>,
        index: u32,
        sk: Option<&str>,
        ivk: &str,
        address: &str,
    ) -> anyhow::Result<u32> {
        self.connection.execute(
            "INSERT INTO accounts(name, seed, aindex, sk, ivk, address) VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
            params![name, seed, index, sk, ivk, address],
        )?;
        let id_account: u32 = self
            .connection
            .query_row(
                "SELECT id_account FROM accounts WHERE ivk = ?1",
                params![ivk],
                |row| row.get(0),
            )
            .map_err(wrap_query_no_rows("store_account/id_account"))?;
        self.connection.execute(
            "INSERT INTO accounts2(account, saved) \
            VALUES (?1, FALSE)",
            [id_account],
        )?;
        Ok(id_account)
    }

    pub fn next_account_id(&self, seed: &str) -> anyhow::Result<u32> {
        let index = self.connection.query_row(
            "SELECT MAX(aindex) FROM accounts WHERE seed = ?1",
            [seed],
            |row| {
                let aindex: Option<i32> = row.get(0)?;
                Ok(aindex.unwrap_or(-1))
            },
        )? + 1;
        Ok(index as u32)
    }

    pub fn store_transparent_key(
        &self,
        id_account: u32,
        sk: &str,
        addr: &str,
    ) -> anyhow::Result<()> {
        self.connection.execute(
            "UPDATE taddrs SET sk = ?1, address = ?2 WHERE account = ?3",
            params![sk, addr, id_account],
        )?;
        Ok(())
    }

    pub fn convert_to_watchonly(&self, id_account: u32) -> anyhow::Result<()> {
        self.connection.execute(
            "UPDATE accounts SET seed = NULL, sk = NULL WHERE id_account = ?1",
            params![id_account],
        )?;
        self.connection.execute(
            "UPDATE orchard_addrs SET sk = NULL WHERE account = ?1",
            params![id_account],
        )?;
        Ok(())
    }

    pub fn get_sapling_fvks(&self) -> anyhow::Result<Vec<SaplingViewKey>> {
        let mut statement = self
            .connection
            .prepare("SELECT id_account, ivk FROM accounts")?;
        let rows = statement.query_map([], |row| {
            let account: u32 = row.get(0)?;
            let ivk: String = row.get(1)?;
            let fvk = decode_extended_full_viewing_key(
                self.network().hrp_sapling_extended_full_viewing_key(),
                &ivk,
            )
            .unwrap();
            let ivk = fvk.fvk.vk.ivk();
            Ok(SaplingViewKey { account, fvk, ivk })
        })?;
        let mut fvks = vec![];
        for r in rows {
            let row = r?;
            fvks.push(row);
        }
        Ok(fvks)
    }

    pub fn get_orchard_fvks(&self) -> anyhow::Result<Vec<OrchardViewKey>> {
        let mut statement = self
            .connection
            .prepare("SELECT account, fvk FROM orchard_addrs")?;
        let rows = statement.query_map([], |row| {
            let account: u32 = row.get(0)?;
            let fvk: Vec<u8> = row.get(1)?;
            let fvk: [u8; 96] = fvk.try_into().unwrap();
            let fvk = FullViewingKey::from_bytes(&fvk).unwrap();
            let vk = OrchardViewKey { account, fvk };
            Ok(vk)
        })?;
        let mut fvks = vec![];
        for r in rows {
            let row = r?;
            fvks.push(row);
        }
        Ok(fvks)
    }

    pub fn drop_last_checkpoint(&mut self) -> anyhow::Result<u32> {
        let height = self.get_last_sync_height()?;
        if let Some(height) = height {
            let height = self.trim_to_height(height - 1)?;
            return Ok(height);
        }
        Ok(self.sapling_activation_height())
    }

    pub fn trim_to_height(&mut self, height: u32) -> anyhow::Result<u32> {
        // snap height to an existing checkpoint
        let height = self.connection.query_row(
            "SELECT MAX(height) from blocks WHERE height <= ?1",
            params![height],
            |row| {
                let height: Option<u32> = row.get(0)?;
                Ok(height)
            },
        )?;
        let height = height.unwrap_or(0);
        log::info!("Rewind to height: {}", height);

        let tx = self.connection.transaction()?;
        tx.execute("DELETE FROM blocks WHERE height > ?1", params![height])?;
        tx.execute(
            "DELETE FROM sapling_tree WHERE height > ?1",
            params![height],
        )?;
        tx.execute(
            "DELETE FROM orchard_tree WHERE height > ?1",
            params![height],
        )?;
        tx.execute(
            "DELETE FROM sapling_witnesses WHERE height > ?1",
            params![height],
        )?;
        tx.execute(
            "DELETE FROM orchard_witnesses WHERE height > ?1",
            params![height],
        )?;
        tx.execute(
            "DELETE FROM received_notes WHERE height > ?1",
            params![height],
        )?;
        tx.execute(
            "UPDATE received_notes SET spent = NULL WHERE spent > ?1",
            params![height],
        )?;
        tx.execute(
            "DELETE FROM transactions WHERE height > ?1",
            params![height],
        )?;
        tx.execute("DELETE FROM messages WHERE height > ?1", params![height])?;
        tx.execute("DELETE FROM tins WHERE height > ?1", params![height])?;
        tx.execute(
            "UPDATE tins SET spent = NULL WHERE spent > ?1",
            params![height],
        )?;
        tx.execute("UPDATE taddrs SET height = ?1", params![height])?;
        tx.commit()?;

        Ok(height)
    }

    pub fn store_block(
        connection: &Connection,
        height: u32,
        hash: &[u8],
        timestamp: u32,
        sapling_tree: &CTree,
        orchard_tree: &CTree,
    ) -> anyhow::Result<()> {
        log::info!("+store_block");
        let mut sapling_bb: Vec<u8> = vec![];
        sapling_tree.write(&mut sapling_bb)?;
        connection.execute(
            "INSERT INTO blocks(height, hash, timestamp)
        VALUES (?1, ?2, ?3) ON CONFLICT DO NOTHING",
            params![height, hash, timestamp],
        )?;
        connection.execute(
            "INSERT INTO sapling_tree(height, tree) VALUES (?1, ?2) ON CONFLICT DO NOTHING",
            params![height, &sapling_bb],
        )?;
        let mut orchard_bb: Vec<u8> = vec![];
        orchard_tree.write(&mut orchard_bb)?;
        connection.execute(
            "INSERT INTO orchard_tree(height, tree) VALUES (?1, ?2) ON CONFLICT DO NOTHING",
            params![height, &orchard_bb],
        )?;
        log::debug!("-block");
        Ok(())
    }

    pub fn store_transaction(
        txid: &[u8],
        account: u32,
        height: u32,
        timestamp: u32,
        tx_index: u32,
        db_tx: &Transaction,
    ) -> anyhow::Result<u32> {
        log::debug!("+transaction");
        db_tx.execute(
            "INSERT INTO transactions(account, txid, height, timestamp, tx_index, value)
        VALUES (?1, ?2, ?3, ?4, ?5, 0) ON CONFLICT DO NOTHING", // ignore conflict when same tx has sapling + orchard outputs
            params![account, txid, height, timestamp, tx_index],
        )?;
        let id_tx: u32 = db_tx
            .query_row(
                "SELECT id_tx FROM transactions WHERE account = ?1 AND txid = ?2",
                params![account, txid],
                |row| row.get(0),
            )
            .map_err(wrap_query_no_rows("store_transaction/id_tx"))?;
        log::debug!("-transaction {}", id_tx);
        Ok(id_tx)
    }

    pub fn store_received_note(
        note: &ReceivedNote,
        id_tx: u32,
        position: usize,
        db_tx: &Transaction,
    ) -> anyhow::Result<u32> {
        log::info!("+received_note {} {:?}", id_tx, note);
        let orchard = note.rho.is_some();
        db_tx.execute("INSERT INTO received_notes(account, tx, height, position, output_index, diversifier, value, rcm, rho, nf, orchard, spent)
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)", params![note.account, id_tx, note.height, position as u32, note.output_index,
            note.diversifier, note.value as i64, note.rcm, note.rho, note.nf, orchard, note.spent])?;
        let id_note: u32 = db_tx
            .query_row(
                "SELECT id_note FROM received_notes WHERE tx = ?1 AND output_index = ?2 AND orchard = ?3",
                params![id_tx, note.output_index, orchard],
                |row| row.get(0),
            )
            .map_err(wrap_query_no_rows("store_received_note/id_note"))?;
        log::debug!("-received_note");
        Ok(id_note)
    }

    pub fn store_witness(
        witness: &sync::Witness,
        height: u32,
        id_note: u32,
        db_tx: &Transaction,
        shielded_pool: &str,
    ) -> anyhow::Result<()> {
        log::debug!("+store_witness");
        let mut bb: Vec<u8> = vec![];
        witness.write(&mut bb)?;
        db_tx.execute(
            &format!(
                "INSERT INTO {}_witnesses(note, height, witness) VALUES (?1, ?2, ?3)",
                shielded_pool
            ),
            params![id_note, height, bb],
        )?;
        log::debug!("-store_witness");
        Ok(())
    }

    pub fn store_block_timestamp<C: ConnectionOrTransaction>(
        connection: &C,
        height: u32,
        hash: &[u8],
        timestamp: u32,
    ) -> anyhow::Result<()> {
        connection.sql_execute(
            "INSERT INTO blocks(height, hash, timestamp) VALUES (?1,?2,?3)",
            params![height, hash, timestamp],
        )?;
        Ok(())
    }

    pub fn store_tree<C: ConnectionOrTransaction>(
        connection: &C,
        height: u32,
        tree: &CTree,
        shielded_pool: &str,
    ) -> anyhow::Result<()> {
        let mut bb: Vec<u8> = vec![];
        tree.write(&mut bb)?;
        connection.sql_execute(
            &format!(
                "INSERT INTO {}_tree(height, tree) VALUES (?1,?2)",
                shielded_pool
            ),
            params![height, &bb],
        )?;
        Ok(())
    }

    pub fn update_transaction_with_memo(&self, details: &TransactionDetails) -> anyhow::Result<()> {
        let messages = MemoVecT {
            memos: Some(details.memos.clone()),
        };

        let mut builder = FlatBufferBuilder::new();
        let root = messages.pack(&mut builder);
        builder.finish(root, None);
        let messages = builder.finished_data().to_vec();

        self.connection.execute(
            "UPDATE transactions SET address = ?1, memo = ?2, messages = ?3 WHERE id_tx = ?4",
            params![details.address, details.memo, messages, details.id_tx],
        )?;
        Ok(())
    }

    pub fn store_transparent_tx(
        _account: u32,
        _tx: &TransparentTxInfo,
        _db_tx: &Transaction,
    ) -> anyhow::Result<()> {
        todo!()
    }

    pub fn add_value(id_tx: u32, value: i64, db_tx: &Transaction) -> anyhow::Result<()> {
        db_tx.execute(
            "UPDATE transactions SET value = value + ?2 WHERE id_tx = ?1",
            params![id_tx, value],
        )?;
        Ok(())
    }

    #[allow(dead_code)]
    pub fn get_balance(&self, account: u32) -> anyhow::Result<u64> {
        let balance: Option<i64> = self.connection.query_row(
            "SELECT SUM(value) FROM received_notes WHERE (spent IS NULL OR spent = 0) AND account = ?1",
            params![account],
            |row| row.get(0),
        )?;
        Ok(balance.unwrap_or(0) as u64)
    }

    pub fn get_last_sync_height(&self) -> anyhow::Result<Option<u32>> {
        let height: Option<u32> =
            self.connection
                .query_row("SELECT MAX(height) FROM blocks", [], |row| row.get(0))?;
        Ok(height)
    }

    pub fn get_checkpoint_height(&self, max_height: u32) -> anyhow::Result<Option<u32>> {
        let height: Option<u32> = self.connection.query_row(
            "SELECT MAX(height) FROM blocks WHERE height <= ?1",
            [max_height],
            |row| row.get(0),
        )?;
        Ok(height)
    }

    pub fn get_db_height(&self) -> anyhow::Result<u32> {
        let height: u32 = self
            .get_last_sync_height()?
            .unwrap_or_else(|| self.sapling_activation_height());
        Ok(height)
    }

    pub fn get_db_hash(&self, height: u32) -> anyhow::Result<Option<[u8; 32]>> {
        let hash: Option<Vec<u8>> = self
            .connection
            .query_row(
                "SELECT hash FROM blocks WHERE height = ?1",
                params![height],
                |row| row.get(0),
            )
            .optional()?;
        Ok(hash.map(|h| {
            let mut hash = [0u8; 32];
            hash.copy_from_slice(&h);
            hash
        }))
    }

    pub fn get_tree_by_name(
        connection: &Transaction,
        height: u32,
        shielded_pool: &str,
    ) -> anyhow::Result<TreeCheckpoint> {
        let tree = connection
            .query_row(
                &format!("SELECT tree FROM {}_tree WHERE height = ?1", shielded_pool),
                [height],
                |row| {
                    let tree: Vec<u8> = row.get(0)?;
                    Ok(tree)
                },
            )
            .optional()?;

        match tree {
            Some(tree) => {
                let tree = CTree::read(&*tree)?;
                let mut statement = connection.prepare(
                    &format!("SELECT id_note, witness FROM {}_witnesses w, received_notes n WHERE w.height = ?1 AND w.note = n.id_note AND (n.spent IS NULL OR n.spent = 0)", shielded_pool))?;
                let ws = statement.query_map(params![height], |row| {
                    let id_note: u32 = row.get(0)?;
                    let witness: Vec<u8> = row.get(1)?;
                    Ok(sync::Witness::read(id_note, &*witness).unwrap())
                })?;
                let mut witnesses = vec![];
                for w in ws {
                    witnesses.push(w?);
                }
                Ok(TreeCheckpoint { tree, witnesses })
            }
            None => Ok(TreeCheckpoint {
                tree: CTree::new(),
                witnesses: vec![],
            }),
        }
    }

    pub fn get_nullifier_amounts(
        &self,
        account: u32,
        unspent_only: bool,
    ) -> anyhow::Result<HashMap<Hash, u64>> {
        let mut sql = "SELECT value, nf FROM received_notes WHERE account = ?1".to_string();
        if unspent_only {
            sql += " AND (spent IS NULL OR spent = 0)";
        }
        let mut statement = self.connection.prepare(&sql)?;
        let nfs_res = statement.query_map(params![account], |row| {
            let amount: i64 = row.get(0)?;
            let nf: Vec<u8> = row.get(1)?;
            Ok((amount, nf.try_into().unwrap()))
        })?;
        let mut nfs: HashMap<Hash, u64> = HashMap::new();
        for n in nfs_res {
            let n = n?;
            nfs.insert(n.1, n.0 as u64);
        }

        Ok(nfs)
    }

    pub fn get_unspent_nullifiers(
        connection: &Transaction,
    ) -> anyhow::Result<Vec<ReceivedNoteShort>> {
        let sql = "SELECT id_note, account, nf, value FROM received_notes WHERE spent IS NULL OR spent = 0";
        let mut statement = connection.prepare(sql)?;
        let nfs_res = statement.query_map(params![], |row| {
            let id: u32 = row.get(0)?;
            let account: u32 = row.get(1)?;
            let nf: Vec<u8> = row.get(2)?;
            let value: i64 = row.get(3)?;
            let nf: [u8; 32] = nf.try_into().unwrap();
            let nf = Nf(nf);
            Ok(ReceivedNoteShort {
                id,
                account,
                nf,
                value: value as u64,
            })
        })?;
        let mut nfs = vec![];
        for n in nfs_res {
            let n = n?;
            nfs.push(n);
        }
        Ok(nfs)
    }

    pub fn get_unspent_received_notes(
        &self,
        account: u32,
        checkpoint_height: u32,
        orchard: bool,
    ) -> anyhow::Result<Vec<UTXO>> {
        let mut notes = vec![];

        if !orchard {
            let mut statement = self.connection.prepare(
                "SELECT id_note, diversifier, value, rcm, witness FROM received_notes r, sapling_witnesses w WHERE spent IS NULL AND account = ?2 AND rho IS NULL
                    AND (r.excluded IS NULL OR NOT r.excluded) AND w.height = ?1
                    AND r.id_note = w.note")?;
            let rows = statement.query_map(params![checkpoint_height, account], |row| {
                let id_note: u32 = row.get(0)?;
                let diversifier: Vec<u8> = row.get(1)?;
                let amount: i64 = row.get(2)?;
                let rcm: Vec<u8> = row.get(3)?;
                let witness: Vec<u8> = row.get(4)?;
                let source = Source::Sapling {
                    id_note,
                    diversifier: diversifier.try_into().unwrap(),
                    rseed: rcm.try_into().unwrap(),
                    witness,
                };
                Ok(UTXO {
                    id: id_note,
                    source,
                    amount: amount as u64,
                    key: None,
                })
            })?;
            for r in rows {
                let note = r?;
                notes.push(note);
            }
        } else {
            let mut statement = self.connection.prepare(
                "SELECT id_note, diversifier, value, rcm, rho, witness FROM received_notes r, orchard_witnesses w WHERE spent IS NULL AND account = ?2 AND rho IS NOT NULL
                AND (r.excluded IS NULL OR NOT r.excluded) AND w.height = ?1
                AND r.id_note = w.note")?;
            let rows = statement.query_map(params![checkpoint_height, account], |row| {
                let id_note: u32 = row.get(0)?;
                let diversifier: Vec<u8> = row.get(1)?;
                let amount: i64 = row.get(2)?;
                let rcm: Vec<u8> = row.get(3)?;
                let rho: Vec<u8> = row.get(4).unwrap();
                let witness: Vec<u8> = row.get(5)?;
                let source = Source::Orchard {
                    id_note,
                    diversifier: diversifier.try_into().unwrap(),
                    rseed: rcm.try_into().unwrap(),
                    rho: rho.try_into().unwrap(),
                    witness,
                };
                Ok(UTXO {
                    id: id_note,
                    source,
                    amount: amount as u64,
                    key: None,
                })
            })?;
            for r in rows {
                let note = r?;
                notes.push(note);
            }
        };

        Ok(notes)
    }

    pub fn tx_mark_spend(&mut self, selected_notes: &[u32]) -> anyhow::Result<()> {
        let db_tx = self.begin_transaction()?;
        for id_note in selected_notes.iter() {
            DbAdapter::mark_spent(*id_note, 0, &db_tx)?;
        }
        db_tx.commit()?;
        Ok(())
    }

    pub fn mark_spent(id: u32, height: u32, tx: &Transaction) -> anyhow::Result<()> {
        log::debug!("+mark_spent");
        tx.execute(
            "UPDATE received_notes SET spent = ?1 WHERE id_note = ?2",
            params![height, id],
        )?;
        log::debug!("-mark_spent");
        Ok(())
    }

    pub fn purge_old_witnesses(connection: &Connection, height: u32) -> anyhow::Result<()> {
        log::debug!("+purge_old_witnesses");
        const BLOCKS_PER_HOUR: u32 = 60 * 60 / 75;
        const BLOCKS_PER_DAY: u32 = 24 * BLOCKS_PER_HOUR;
        const BLOCKS_PER_MONTH: u32 = 30 * BLOCKS_PER_DAY;
        // Keep the last hour
        for i in 2..=24 {
            // 1 checkpoint per hour
            Self::prune_interval(
                connection,
                height - i * BLOCKS_PER_HOUR,
                height - (i - 1) * BLOCKS_PER_HOUR,
            )?;
        }
        for i in 2..=30 {
            // 1 checkpoint per day
            Self::prune_interval(
                connection,
                height - i * BLOCKS_PER_DAY,
                height - (i - 1) * BLOCKS_PER_DAY,
            )?;
        }
        for i in 2..=12 {
            // 1 checkpoint per 30 days
            Self::prune_interval(
                connection,
                height - i * BLOCKS_PER_MONTH,
                height - (i - 1) * BLOCKS_PER_MONTH,
            )?;
        }

        log::debug!("-purge_old_witnesses");
        Ok(())
    }

    // Only keep the oldest checkpoint in [low, high)
    fn prune_interval(connection: &Connection, low: u32, high: u32) -> anyhow::Result<()> {
        log::debug!("prune_interval {} {}", low, high);
        let keep_height: Option<u32> = connection.query_row(
            "SELECT MIN(height) FROM blocks WHERE height >= ?1 AND height < ?2",
            params![low, high],
            |row| row.get(0),
        )?;
        if let Some(keep_height) = keep_height {
            log::info!("keep checkpoint {}", keep_height);
            let transaction =
                Transaction::new_unchecked(connection, rusqlite::TransactionBehavior::Deferred)?;
            transaction.execute(
                "DELETE FROM sapling_witnesses WHERE height >= ?1 AND height < ?2 AND height != ?3",
                params![low, high, keep_height],
            )?;
            transaction.execute(
                "DELETE FROM orchard_witnesses WHERE height >= ?1 AND height < ?2 AND height != ?3",
                params![low, high, keep_height],
            )?;
            transaction.execute(
                "DELETE FROM blocks WHERE height >= ?1 AND height < ?2 AND height != ?3",
                params![low, high, keep_height],
            )?;
            transaction.execute(
                "DELETE FROM sapling_tree WHERE height >= ?1 AND height < ?2 AND height != ?3",
                params![low, high, keep_height],
            )?;
            transaction.execute(
                "DELETE FROM orchard_tree WHERE height >= ?1 AND height < ?2 AND height != ?3",
                params![low, high, keep_height],
            )?;
            transaction.commit()?;
        }
        Ok(())
    }

    pub fn store_contact(&self, contact: &Contact, dirty: bool) -> anyhow::Result<()> {
        let mut attempt = 0u32;
        loop {
            let res = if contact.id == 0 {
                self.connection.execute(
                    "INSERT INTO contacts(name, address, dirty)
                    VALUES (?1, ?2, ?3)",
                    params![&contact.name, &contact.address, dirty],
                )
            } else {
                self.connection.execute(
                    "INSERT INTO contacts(id, name, address, dirty)
                    VALUES (?1, ?2, ?3, ?4) ON CONFLICT (id) DO UPDATE SET
                    name = excluded.name, address = excluded.address, dirty = excluded.dirty",
                    params![contact.id, &contact.name, &contact.address, dirty],
                )
            };
            match res {
                Ok(_) => break,
                Err(e) => {
                    let msg = e.to_string();
                    if attempt < 8 && msg.contains("database is locked") {
                        std::thread::sleep(std::time::Duration::from_millis(50 * (attempt + 1) as u64));
                        attempt += 1;
                        continue;
                    }
                    return Err(e.into());
                }
            }
        }
        Ok(())
    }

    pub fn get_unsaved_contacts(&self) -> anyhow::Result<Vec<Contact>> {
        let mut statement = self
            .connection
            .prepare("SELECT id, name, address FROM contacts WHERE dirty = TRUE")?;
        let rows = statement.query_map([], |row| {
            let id: u32 = row.get(0)?;
            let name: String = row.get(1)?;
            let address: String = row.get(2)?;
            let contact = Contact { id, name, address };
            Ok(contact)
        })?;
        let mut contacts: Vec<Contact> = vec![];
        for r in rows {
            contacts.push(r?);
        }

        Ok(contacts)
    }

    pub fn get_account_info(&self, account: u32) -> anyhow::Result<AccountData> {
        if account == 0 {
            anyhow::bail!("Invalid account");
        }
        let account_data = self
            .connection
            .query_row(
                "SELECT name, seed, sk, ivk, address, aindex, saved FROM accounts a LEFT JOIN accounts2 a2 ON a.id_account = a2.account WHERE id_account = ?1",
                params![account],
                |row| {
                    let name: String = row.get(0)?;
                    let seed: Option<String> = row.get(1)?;
                    let sk: Option<String> = row.get(2)?;
                    let fvk: String = row.get(3)?;
                    let address: String = row.get(4)?;
                    let aindex: u32 = row.get(5)?;
                    let saved: Option<bool> = row.get(6)?;
                    Ok(AccountData {
                        name,
                        seed,
                        sk,
                        fvk,
                        address,
                        aindex,
                        saved: saved.unwrap_or(true), // for compat with prev schemas
                    })
                },
            )
            .map_err(wrap_query_no_rows("get_account_info"))?;
        Ok(account_data)
    }

    pub fn get_taddr(&self, account: u32) -> anyhow::Result<Option<String>> {
        let address = self
            .connection
            .query_row(
                "SELECT address FROM taddrs WHERE account = ?1",
                params![account],
                |row| {
                    let address: String = row.get(0)?;
                    Ok(address)
                },
            )
            .optional()?;
        Ok(address)
    }

    pub fn get_tsk(&self, account: u32) -> anyhow::Result<Option<String>> {
        let sk = self
            .connection
            .query_row(
                "SELECT sk FROM taddrs WHERE account = ?1",
                params![account],
                |row| {
                    let sk: String = row.get(0)?;
                    Ok(sk)
                },
            )
            .optional()?;
        Ok(sk)
    }

    pub fn create_taddr(&self, account: u32) -> anyhow::Result<()> {
        let AccountData { seed, aindex, .. } = self.get_account_info(account)?;
        if let Some(seed) = seed {
            let bip44_path = format!("m/44'/{}'/0'/0/{}", self.network().coin_type(), aindex);
            let (sk, address) = derive_tkeys(self.network(), &seed, &bip44_path)?;
            self.connection.execute(
                "INSERT INTO taddrs(account, sk, address) VALUES (?1, ?2, ?3)",
                params![account, &sk, &address],
            )?;
        }
        Ok(())
    }

    pub fn create_orchard(&self, account: u32) -> anyhow::Result<()> {
        let AccountData { seed, aindex, .. } = self.get_account_info(account)?;
        if let Some(seed) = seed {
            let keys = derive_orchard_keys(self.network().coin_type(), &seed, aindex);
            self.connection.execute(
                "INSERT INTO orchard_addrs(account, sk, fvk) VALUES (?1, ?2, ?3)",
                params![account, &keys.sk, &keys.fvk],
            )?;
        }
        Ok(())
    }

    pub fn store_orchard_fvk(&self, account: u32, fvk: &[u8; 96]) -> anyhow::Result<()> {
        self.connection.execute(
            "INSERT INTO orchard_addrs(account, sk, fvk) VALUES (?1, NULL, ?2) ON CONFLICT DO NOTHING",
            params![account, fvk],
        )?;
        Ok(())
    }

    pub fn find_account_by_fvk(&self, fvk: &str) -> anyhow::Result<Option<u32>> {
        let account = self
            .connection
            .query_row(
                "SELECT id_account FROM accounts WHERE fvk = ?1",
                params![fvk],
                |row| {
                    let account: u32 = row.get(0)?;
                    Ok(account)
                },
            )
            .optional()?;
        Ok(account)
    }

    pub fn get_orchard(&self, account: u32) -> anyhow::Result<Option<OrchardKeyBytes>> {
        let key = self
            .connection
            .query_row(
                "SELECT sk, fvk FROM orchard_addrs WHERE account = ?1",
                params![account],
                |row| {
                    let sk: Option<Vec<u8>> = row.get(0)?;
                    let fvk: Vec<u8> = row.get(1)?;
                    Ok(OrchardKeyBytes {
                        sk: sk.map(|sk| sk.try_into().unwrap()),
                        fvk: fvk.try_into().unwrap(),
                    })
                },
            )
            .optional()?;
        Ok(key)
    }

    pub fn store_ua_settings(
        &self,
        account: u32,
        transparent: bool,
        sapling: bool,
        orchard: bool,
    ) -> anyhow::Result<()> {
        self.connection.execute(
            "INSERT INTO ua_settings(account, transparent, sapling, orchard) VALUES (?1, ?2, ?3, ?4)",
            params![account, transparent, sapling, orchard],
        )?;
        Ok(())
    }

    pub fn get_ua_settings(&self, account: u32) -> anyhow::Result<UnifiedAddressType> {
        let tpe = self.connection.query_row(
            "SELECT transparent, sapling, orchard FROM ua_settings WHERE account = ?1",
            params![account],
            |row| {
                let transparent: bool = row.get(0)?;
                let sapling: bool = row.get(1)?;
                let orchard: bool = row.get(2)?;
                Ok(UnifiedAddressType {
                    transparent,
                    sapling,
                    orchard,
                })
            },
        )?;
        Ok(tpe)
    }

    pub fn store_historical_prices(
        &mut self,
        prices: &[Quote],
        currency: &str,
    ) -> anyhow::Result<()> {
        let db_transaction = self.connection.transaction()?;
        {
            let mut statement = db_transaction.prepare(
                "INSERT INTO historical_prices(timestamp, price, currency) VALUES (?1, ?2, ?3)",
            )?;
            for q in prices {
                statement.execute(params![q.timestamp, q.price, currency])?;
            }
        }
        db_transaction.commit()?;
        Ok(())
    }

    pub fn get_latest_quote(&self, currency: &str) -> anyhow::Result<Option<Quote>> {
        let quote = self.connection.query_row(
            "SELECT timestamp, price FROM historical_prices WHERE currency = ?1 ORDER BY timestamp DESC",
            params![currency],
            |row| {
                let timestamp: i64 = row.get(0)?;
                let price: f64 = row.get(1)?;
                Ok(Quote { timestamp, price })
            }).optional()?;
        Ok(quote)
    }

    pub fn truncate_data(&self) -> anyhow::Result<()> {
        self.truncate_sync_data()?;
        self.connection.execute("DELETE FROM diversifiers", [])?;
        Ok(())
    }

    pub fn truncate_sync_data(&self) -> anyhow::Result<()> {
        self.connection.execute("DELETE FROM blocks", [])?;
        self.connection.execute("DELETE FROM sapling_tree", [])?;
        self.connection.execute("DELETE FROM orchard_tree", [])?;
        self.connection.execute("DELETE FROM contacts", [])?;
        self.connection.execute("DELETE FROM diversifiers", [])?;
        self.connection.execute("DELETE FROM received_notes", [])?;
        self.connection
            .execute("DELETE FROM sapling_witnesses", [])?;
        self.connection
            .execute("DELETE FROM orchard_witnesses", [])?;
        self.connection.execute("DELETE FROM transactions", [])?;
        self.connection.execute("DELETE FROM messages", [])?;
        self.connection
            .execute("UPDATE taddrs SET height = 0", [])?;
        Ok(())
    }

    pub fn delete_incomplete_scan(&mut self) -> anyhow::Result<()> {
        let synced_height = self.get_last_sync_height()?;
        if let Some(synced_height) = synced_height {
            self.trim_to_height(synced_height)?;
        }
        Ok(())
    }

    pub fn delete_account(&self, account: u32) -> anyhow::Result<()> {
        self.connection.execute(
            "DELETE FROM received_notes WHERE account = ?1",
            params![account],
        )?;
        self.connection.execute(
            "DELETE FROM transactions WHERE account = ?1",
            params![account],
        )?;
        self.connection.execute(
            "DELETE FROM diversifiers WHERE account = ?1",
            params![account],
        )?;
        self.connection
            .execute("DELETE FROM accounts2 WHERE account = ?1", params![account])?;
        self.connection.execute(
            "DELETE FROM accounts WHERE id_account = ?1",
            params![account],
        )?;
        self.connection
            .execute("DELETE FROM taddrs WHERE account = ?1", params![account])?;
        self.connection.execute(
            "DELETE FROM orchard_addrs WHERE account = ?1",
            params![account],
        )?;
        self.connection.execute(
            "DELETE FROM ua_settings WHERE account = ?1",
            params![account],
        )?;
        self.connection
            .execute("DELETE FROM messages WHERE account = ?1", params![account])?;
        self.connection.execute(
            "DELETE FROM hw_wallets WHERE account = ?1",
            params![account],
        )?;
        Ok(())
    }

    pub fn delete_orphan_transactions(&self) -> anyhow::Result<()> {
        self.connection.execute("DELETE FROM transactions WHERE id_tx IN (SELECT tx.id_tx FROM transactions tx LEFT JOIN accounts a ON tx.account = a.id_account WHERE a.id_account IS NULL)",
            [])?;
        Ok(())
    }

    pub fn store_message(&self, account: u32, message: &ZMessage) -> anyhow::Result<()> {
        let mut attempt = 0u32;
        let params = params![account, message.id_tx, message.sender, message.recipient, message.subject, message.body, message.timestamp, message.height, message.incoming, false];
        loop {
            match self.connection.execute("INSERT INTO messages(account, id_tx, sender, recipient, subject, body, timestamp, height, incoming, read) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10)", params) {
                Ok(_) => break,
                Err(e) => {
                    let msg = e.to_string();
                    if attempt < 8 && msg.contains("database is locked") {
                        // exponential backoff up to ~1s total
                        std::thread::sleep(std::time::Duration::from_millis(50 * (attempt + 1) as u64));
                        attempt += 1;
                        continue;
                    }
                    return Err(e.into());
                }
            }
        }
        Ok(())
    }

    pub fn mark_message_read(&self, message_id: u32, read: bool) -> anyhow::Result<()> {
        self.connection.execute(
            "UPDATE messages SET read = ?1 WHERE id = ?2",
            params![read, message_id],
        )?;
        Ok(())
    }

    pub fn mark_all_messages_read(&self, account: u32, read: bool) -> anyhow::Result<()> {
        self.connection.execute(
            "UPDATE messages SET read = ?1 WHERE account = ?2",
            params![read, account],
        )?;
        Ok(())
    }

    pub fn clear_tx_details(connection: &Connection, account: u32) -> anyhow::Result<()> {
        connection.execute(
            "UPDATE transactions SET address = NULL, memo = NULL WHERE account = ?1",
            [account],
        )?;
        connection.execute("DELETE FROM messages WHERE account = ?1", [account])?;
        Ok(())
    }

    pub fn get_accounts(&self) -> anyhow::Result<Vec<AccountRec>> {
        let mut s = self
            .connection
            .prepare("SELECT id_account, name, address FROM accounts")?;
        let accounts = s.query_map([], |row| {
            let id_account: u32 = row.get(0)?;
            let name: String = row.get(1)?;
            let address: String = row.get(2)?;
            Ok(AccountRec {
                id_account,
                name,
                address,
            })
        })?;
        let mut account_recs = vec![];
        for row in accounts {
            account_recs.push(row?);
        }
        Ok(account_recs)
    }

    pub fn get_txs(&self, account: u32) -> anyhow::Result<Vec<TxRec>> {
        let mut s = self.connection.prepare("SELECT txid, height, timestamp, value, address, memo FROM transactions WHERE account = ?1")?;
        let tx_rec = s.query_map(params![account], |row| {
            let mut txid: Vec<u8> = row.get(0)?;
            txid.reverse();
            let txid = hex::encode(txid);
            let height: u32 = row.get(1)?;
            let timestamp: u32 = row.get(2)?;
            let value: i64 = row.get(3)?;
            let address: String = row.get(4)?;
            let memo: String = row.get(5)?;
            Ok(TxRec {
                txid,
                height,
                timestamp,
                value,
                address,
                memo,
            })
        })?;
        let mut txs = vec![];
        for row in tx_rec {
            txs.push(row?);
        }
        Ok(txs)
    }

    pub fn get_txid_without_memo(&self) -> anyhow::Result<Vec<GetTransactionDetailRequest>> {
        let mut stmt = self.connection.prepare(
            "SELECT account, id_tx, height, timestamp, txid, value FROM transactions WHERE memo IS NULL",
        )?;
        let rows = stmt.query_map([], |row| {
            let account: u32 = row.get(0)?;
            let id_tx: u32 = row.get(1)?;
            let height: u32 = row.get(2)?;
            let timestamp: u32 = row.get(3)?;
            let txid: Vec<u8> = row.get(4)?;
            let value: i64 = row.get(5)?;
            Ok(GetTransactionDetailRequest {
                account,
                id_tx,
                height,
                timestamp,
                txid: txid.try_into().unwrap(),
                value,
            })
        })?;
        let mut reqs = vec![];
        for r in rows {
            reqs.push(r?);
        }
        Ok(reqs)
    }

    pub fn store_template(&self, t: &SendTemplate) -> anyhow::Result<u32> {
        let id = if t.id() == 0 {
            self.connection.execute("INSERT INTO \
                send_templates(title, address, amount, fiat_amount, fee_included, fiat, include_reply_to, subject, body) \
                VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9)",
                params![t.title().unwrap(), t.address().unwrap(), t.amount(), t.fiat_amount(), t.fee_included(), t.fiat(),
                t.include_reply_to(), t.subject().unwrap(), t.body().unwrap()])?;
            self.connection.last_insert_rowid() as u32
        } else {
            self.connection.execute("UPDATE send_templates SET \
                title=?1, address=?2, amount=?3, fiat_amount=?4, fee_included=?5, fiat=?6, include_reply_to=?7, subject=?8, body=?9 \
                WHERE id_send_template=?10",
                params![t.title().unwrap(), t.address().unwrap(), t.amount(), t.fiat_amount(), t.fee_included(), t.fiat(),
                t.include_reply_to(), t.subject().unwrap(), t.body().unwrap(), t.id()])?;
            t.id()
        };
        Ok(id)
    }

    pub fn delete_template(&self, id: u32) -> anyhow::Result<()> {
        self.connection.execute(
            "DELETE FROM send_templates WHERE id_send_template=?1",
            params![id],
        )?;
        Ok(())
    }

    fn network(&self) -> &'static Network {
        let chain = get_coin_chain(self.coin_type);
        chain.network()
    }

    pub fn sapling_activation_height(&self) -> u32 {
        self.network()
            .activation_height(NetworkUpgrade::Sapling)
            .unwrap()
            .into()
    }
}

pub struct ZMessage {
    pub id_tx: u32,
    pub sender: Option<String>,
    pub recipient: String,
    pub subject: String,
    pub body: String,
    pub timestamp: u32,
    pub height: u32,
    pub incoming: bool,
}

impl ZMessage {
    pub fn is_empty(&self) -> bool {
        self.sender.is_none() && self.subject.is_empty() && self.body.is_empty()
    }
}

#[derive(Serialize)]
pub struct TxRec {
    txid: String,
    height: u32,
    timestamp: u32,
    value: i64,
    address: String,
    memo: String,
}

#[derive(Serialize)]
pub struct AccountRec {
    id_account: u32,
    name: String,
    address: String,
}

pub struct AccountData {
    pub name: String,
    pub seed: Option<String>,
    pub sk: Option<String>,
    pub fvk: String,
    pub address: String,
    pub aindex: u32,
    pub saved: bool,
}
