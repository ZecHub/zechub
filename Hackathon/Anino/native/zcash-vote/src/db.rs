use anyhow::Result;
use orchard::{
    keys::{Diversifier, FullViewingKey, Scope},
    note::{Nullifier, RandomSeed},
    value::NoteValue,
};
use pasta_curves::Fp;
use rusqlite::{params, Connection, OptionalExtension as _};
use serde::{Deserialize, Serialize};

use crate::as_byte256;

pub fn create_schema(connection: &Connection) -> Result<()> {
    connection.execute(
        "CREATE TABLE IF NOT EXISTS properties(
        id_property INTEGER PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        value TEXT NOT NULL)",
        [],
    )?;
    connection.execute(
        "CREATE TABLE IF NOT EXISTS ballots(
        id_ballot INTEGER PRIMARY KEY,
        election INTEGER NOT NULL,
        height INTEGER NOT NULL,
        hash BLOB NOT NULL UNIQUE,
        data BLOB NOT NULL)",
        [],
    )?;
    connection.execute(
        "CREATE TABLE IF NOT EXISTS nfs(
        id_nf INTEGER PRIMARY KEY NOT NULL,
        election INTEGER NOT NULL,
        hash BLOB NOT NULL UNIQUE)",
        [],
    )?;
    connection.execute(
        "CREATE TABLE IF NOT EXISTS dnfs(
        id_dnf INTEGER PRIMARY KEY NOT NULL,
        election INTEGER NOT NULL,
        hash BLOB NOT NULL UNIQUE)",
        [],
    )?;
    connection.execute(
        "CREATE TABLE IF NOT EXISTS cmxs(
        id_cmx INTEGER PRIMARY KEY NOT NULL,
        election INTEGER NOT NULL,
        hash BLOB NOT NULL UNIQUE)",
        [],
    )?;
    connection.execute(
        "CREATE TABLE IF NOT EXISTS cmx_roots(
        id_cmx_root INTEGER PRIMARY KEY,
        election INTEGER NOT NULL,
        height INTEGER NOT NULL,
        hash BLOB NOT NULL,
        CONSTRAINT u_cmx_roots UNIQUE (election, hash))",
        [],
    )?;
    connection.execute(
        "CREATE TABLE IF NOT EXISTS cmx_frontiers(
        id_cmx_frontier INTEGER PRIMARY KEY,
        election INTEGER NOT NULL,
        height INTEGER NOT NULL,
        frontier TEXT NOT NULL,
        CONSTRAINT u_cmx_frontiers UNIQUE (election, height))",
        [],
    )?;
    connection.execute(
        "CREATE TABLE IF NOT EXISTS notes(
        id_note INTEGER PRIMARY KEY,
        election INTEGER NOT NULL,
        position INTEGER NOT NULL UNIQUE,
        height INTEGER NOT NULL,
        txid BLOB NOT NULL,
        value INTEGER NOT NULL,
        div BLOB NOT NULL,
        rseed BLOB NOT NULL,
        nf BLOB NOT NULL,
        dnf BLOB NOT NULL,
        rho BLOB NOT NULL,
        spent INTEGER)",
        [],
    )?;

    Ok(())
}

pub fn store_prop(connection: &Connection, name: &str, value: &str) -> Result<()> {
    connection.execute(
        "INSERT INTO properties(name, value) VALUES (?1, ?2)
        ON CONFLICT (name) DO UPDATE SET value = excluded.value",
        params![name, value],
    )?;
    Ok(())
}

pub fn load_prop(connection: &Connection, name: &str) -> Result<Option<String>> {
    let value = connection
        .query_row(
            "SELECT value FROM properties WHERE name = ?1",
            [name],
            |r| r.get::<_, String>(0),
        )
        .optional()?;
    Ok(value)
}

pub fn store_dnf(connection: &Connection, id_election: u32, dnf: &[u8]) -> Result<()> {
    connection.execute(
        "INSERT INTO dnfs(election, hash) VALUES (?1, ?2)",
        params![id_election, dnf],
    )?;
    Ok(())
}

pub fn store_note(
    connection: &Connection,
    id_election: u32,
    domain: Fp,
    fvk: &FullViewingKey,
    height: u32,
    position: u32,
    txid: &[u8],
    note: &orchard::Note,
) -> Result<u32> {
    let value = note.value().inner();
    let div = note.recipient().diversifier();
    let rseed = note.rseed().as_bytes();
    let nf = note.nullifier(fvk).to_bytes();
    let domain_nf = note.nullifier_domain(fvk, domain).to_bytes();
    let rho = note.rho().to_bytes();
    connection.execute(
        "INSERT INTO notes
        (election, position, height, txid, value, div, rseed, nf, dnf, rho, spent)
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, NULL)",
        params![
            id_election,
            position,
            height,
            txid,
            value,
            div.as_array(),
            rseed,
            nf,
            domain_nf,
            rho
        ],
    )?;
    let id = connection.last_insert_rowid() as u32;
    Ok(id)
}

pub fn mark_spent(connection: &Connection, id: u32, height: u32) -> Result<()> {
    connection.execute(
        "UPDATE notes SET spent = ?2 WHERE id_note = ?1",
        params![id, height])?;
    Ok(())
}

pub fn list_notes(
    connection: &Connection,
    id_election: u32,
    fvk: &FullViewingKey,
) -> Result<Vec<(orchard::Note, u32)>> {
    let mut s = connection.prepare(
        "SELECT position, height, txid, value, div, rseed, nf, dnf, rho
        FROM notes WHERE spent IS NULL AND election = ?1",
    )?;
    let notes = s.query_map([id_election], |r| {
        let position = r.get::<_, u32>(0)?;
        let height = r.get::<_, u32>(1)?;
        let txid = r.get::<_, Vec<u8>>(2)?;
        let value = r.get::<_, u64>(3)?;
        let div = r.get::<_, Vec<u8>>(4)?;
        let rseed = r.get::<_, Vec<u8>>(5)?;
        let nf = r.get::<_, Vec<u8>>(6)?;
        let dnf = r.get::<_, Vec<u8>>(7)?;
        let rho = r.get::<_, Vec<u8>>(8)?;

        let n = Note {
            position,
            height,
            txid,
            value,
            div,
            rseed,
            nf,
            dnf,
            rho,
        };
        Ok(n.to_note(fvk))
    })?;

    Ok(notes.collect::<Result<Vec<_>, _>>()?)
}

pub fn store_cmx(connection: &Connection, id_election: u32, cmx: &[u8]) -> Result<()> {
    connection.execute(
        "INSERT INTO cmxs(election, hash) VALUES (?1, ?2)",
        params![id_election, cmx],
    )?;
    Ok(())
}

pub fn store_cmx_root(
    connection: &Connection,
    id_election: u32,
    height: u32,
    cmx_root: &[u8],
) -> Result<()> {
    connection.execute(
        "INSERT INTO cmx_roots
        (election, height, hash)
        VALUES (?1, ?2, ?3)",
        params![id_election, height, cmx_root],
    )?;
    Ok(())
}

#[derive(Clone, Serialize, Deserialize, Default, Debug)]
pub struct Note {
    pub position: u32,
    pub height: u32,
    pub txid: Vec<u8>,
    pub value: u64,
    pub div: Vec<u8>,
    pub rseed: Vec<u8>,
    pub nf: Vec<u8>,
    pub dnf: Vec<u8>,
    pub rho: Vec<u8>,
}

impl Note {
    fn to_note(&self, fvk: &FullViewingKey) -> (orchard::Note, u32) {
        let d = Diversifier::from_bytes(self.div.clone().try_into().unwrap());
        let recipient = fvk.address(d, Scope::External);
        let rho = Nullifier::from_bytes(&as_byte256(&self.rho)).unwrap();
        let note = orchard::Note::from_parts(
            recipient,
            NoteValue::from_raw(self.value),
            rho,
            RandomSeed::from_bytes(as_byte256(&self.rseed), &rho).unwrap(),
        )
        .unwrap();
        (note, self.position)
    }
}
