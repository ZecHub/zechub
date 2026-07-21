use anyhow::{Context, Result};
use rusqlite::Connection;

pub fn open(path: &str) -> Result<Connection> {
    let conn = Connection::open(path).context("failed to open sqlite db")?;
    conn.pragma_update(None, "journal_mode", "WAL")?;
    init_schema(&conn)?;
    Ok(conn)
}

fn init_schema(conn: &Connection) -> Result<()> {
    conn.execute_batch(
        r#"
        CREATE TABLE IF NOT EXISTS vaults (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            threshold INTEGER NOT NULL,
            total_participants INTEGER NOT NULL,
            status TEXT NOT NULL,
            group_public_key_hex TEXT,
            dkg_ceremony_id TEXT NOT NULL,
            created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS participants (
            id TEXT PRIMARY KEY,
            vault_id TEXT NOT NULL,
            frost_identifier INTEGER NOT NULL,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            key_package_hex TEXT,
            public_share_hex TEXT
        );

        CREATE TABLE IF NOT EXISTS ceremonies (
            id TEXT PRIMARY KEY,
            vault_id TEXT NOT NULL,
            kind TEXT NOT NULL,
            phase TEXT NOT NULL,
            signer_participant_ids_json TEXT NOT NULL,
            message TEXT,
            signature_hex TEXT,
            verifying_key_hex TEXT,
            verified INTEGER,
            error TEXT,
            created_at TEXT NOT NULL,
            completed_at TEXT
        );

        CREATE TABLE IF NOT EXISTS transactions (
            id TEXT PRIMARY KEY,
            vault_id TEXT NOT NULL,
            tx_type TEXT NOT NULL,
            amount TEXT NOT NULL,
            counterparty TEXT NOT NULL,
            ceremony_id TEXT,
            txid_placeholder TEXT NOT NULL,
            timestamp TEXT NOT NULL
        );
        "#,
    )?;
    Ok(())
}
