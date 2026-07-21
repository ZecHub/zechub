use paypunk_types::Account;
use paypunk_types::ProtocolId;
use rusqlite::Connection;

use crate::messages::AddressBookEntry;

pub trait Repository<T> {
    fn save(&self, conn: &Connection, entity: &T) -> Result<(), String>;
    fn find_all(&self, conn: &Connection) -> Result<Vec<T>, String>;
}

pub trait AccountsRepository: Send + Sync {
    fn save(&self, conn: &Connection, account: &Account) -> Result<(), String>;
    fn find_all(&self, conn: &Connection) -> Result<Vec<Account>, String>;
    fn find_by_id(&self, conn: &Connection, id: &str) -> Result<Option<Account>, String>;
    fn find_by_protocol(
        &self,
        conn: &Connection,
        protocol: &ProtocolId,
    ) -> Result<Vec<Account>, String>;
}

pub struct SqliteAccountsRepository;

impl AccountsRepository for SqliteAccountsRepository {
    fn save(&self, conn: &Connection, account: &Account) -> Result<(), String> {
        conn.execute(
            "INSERT INTO accounts (id, protocol, derivation_path, name, address, viewing_key, created_at, birthday_height) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)",
            rusqlite::params![
                account.id,
                format!("{:?}", account.protocol),
                account.derivation_path,
                account.name,
                account.address,
                account.viewing_key,
                account.created_at,
                account.birthday_height,
            ],
        )
        .map_err(|e| format!("failed to save account: {e}"))?;
        Ok(())
    }

    fn find_all(&self, conn: &Connection) -> Result<Vec<Account>, String> {
        let mut stmt = conn
            .prepare(
                "SELECT id, protocol, derivation_path, name, address, viewing_key, created_at, birthday_height FROM accounts",
            )
            .map_err(|e| format!("failed to prepare query: {e}"))?;
        let rows = stmt
            .query_map([], |row| {
                let protocol_str: String = row.get(1)?;
                Ok(Account {
                    id: row.get(0)?,
                    protocol: parse_protocol(&protocol_str),
                    derivation_path: row.get(2)?,
                    name: row.get(3)?,
                    address: row.get(4)?,
                    viewing_key: row.get(5)?,
                    created_at: row.get(6)?,
                    birthday_height: row.get(7)?,
                })
            })
            .map_err(|e| format!("failed to query accounts: {e}"))?;
        let mut accounts = Vec::new();
        for row in rows {
            accounts.push(row.map_err(|e| format!("failed to read account row: {e}"))?);
        }
        Ok(accounts)
    }

    fn find_by_id(&self, conn: &Connection, id: &str) -> Result<Option<Account>, String> {
        let mut stmt = conn
            .prepare("SELECT id, protocol, derivation_path, name, address, viewing_key, created_at, birthday_height FROM accounts WHERE id = ?1")
            .map_err(|e| format!("failed to prepare query: {e}"))?;
        let mut rows = stmt
            .query_map(rusqlite::params![id], |row| {
                let protocol_str: String = row.get(1)?;
                Ok(Account {
                    id: row.get(0)?,
                    protocol: parse_protocol(&protocol_str),
                    derivation_path: row.get(2)?,
                    name: row.get(3)?,
                    address: row.get(4)?,
                    viewing_key: row.get(5)?,
                    created_at: row.get(6)?,
                    birthday_height: row.get(7)?,
                })
            })
            .map_err(|e| format!("failed to query account: {e}"))?;
        match rows.next() {
            Some(Ok(account)) => Ok(Some(account)),
            Some(Err(e)) => Err(format!("failed to read account row: {e}")),
            None => Ok(None),
        }
    }

    fn find_by_protocol(
        &self,
        conn: &Connection,
        protocol: &ProtocolId,
    ) -> Result<Vec<Account>, String> {
        let protocol_str = format!("{protocol:?}");
        let mut stmt = conn
            .prepare("SELECT id, protocol, derivation_path, name, address, viewing_key, created_at, birthday_height FROM accounts WHERE protocol = ?1")
            .map_err(|e| format!("failed to prepare query: {e}"))?;
        let rows = stmt
            .query_map(rusqlite::params![protocol_str], |row| {
                let protocol_str: String = row.get(1)?;
                Ok(Account {
                    id: row.get(0)?,
                    protocol: parse_protocol(&protocol_str),
                    derivation_path: row.get(2)?,
                    name: row.get(3)?,
                    address: row.get(4)?,
                    viewing_key: row.get(5)?,
                    created_at: row.get(6)?,
                    birthday_height: row.get(7)?,
                })
            })
            .map_err(|e| format!("failed to query accounts by protocol: {e}"))?;
        let mut accounts = Vec::new();
        for row in rows {
            accounts.push(row.map_err(|e| format!("failed to read account row: {e}"))?);
        }
        Ok(accounts)
    }
}

fn parse_protocol(s: &str) -> paypunk_types::ProtocolId {
    match s {
        "Zcash" => paypunk_types::ProtocolId::Zcash,
        "Ethereum" => paypunk_types::ProtocolId::Ethereum,
        _ => paypunk_types::ProtocolId::Zcash,
    }
}

pub trait AddressBookRepository: Send + Sync {
    fn find_all(&self, conn: &Connection) -> Result<Vec<AddressBookEntry>, String>;
    fn insert(&self, conn: &Connection, entry: &AddressBookEntry) -> Result<(), String>;
}

pub struct SqliteAddressBookRepository;

impl AddressBookRepository for SqliteAddressBookRepository {
    fn find_all(&self, conn: &Connection) -> Result<Vec<AddressBookEntry>, String> {
        let mut stmt = conn
            .prepare("SELECT name, address, protocol FROM address_book ORDER BY created_at DESC")
            .map_err(|e| format!("failed to prepare query: {e}"))?;
        let rows = stmt
            .query_map([], |row| {
                Ok(AddressBookEntry {
                    name: row.get(0)?,
                    address: row.get(1)?,
                    protocol: row.get(2)?,
                })
            })
            .map_err(|e| format!("failed to query address book: {e}"))?;
        let mut entries = Vec::new();
        for row in rows {
            entries.push(row.map_err(|e| format!("failed to read address book row: {e}"))?);
        }
        Ok(entries)
    }

    fn insert(&self, conn: &Connection, entry: &AddressBookEntry) -> Result<(), String> {
        conn.execute(
            "INSERT OR IGNORE INTO address_book (name, address, protocol, created_at) VALUES (?1, ?2, ?3, ?4)",
            rusqlite::params![
                entry.name,
                entry.address,
                entry.protocol,
                std::time::SystemTime::now()
                    .duration_since(std::time::UNIX_EPOCH)
                    .unwrap_or_default()
                    .as_secs(),
            ],
        )
        .map_err(|e| format!("failed to insert address book entry: {e}"))?;
        Ok(())
    }
}

// ── Signer State Repository ────────────────────────────────────────────────

pub trait SignerStateRepository: Send + Sync {
    fn save_session_key(
        &self,
        conn: &Connection,
        session_public_key: &[u8; 32],
    ) -> Result<(), String>;
    fn get_session_key(&self, conn: &Connection) -> Result<Option<[u8; 32]>, String>;
}

pub struct SqliteSignerStateRepository;

impl SignerStateRepository for SqliteSignerStateRepository {
    fn save_session_key(
        &self,
        conn: &Connection,
        session_public_key: &[u8; 32],
    ) -> Result<(), String> {
        conn.execute("DELETE FROM signer_state", [])
            .map_err(|e| format!("failed to clear signer_state: {e}"))?;
        conn.execute(
            "INSERT INTO signer_state (session_public_key) VALUES (?1)",
            rusqlite::params![session_public_key.to_vec()],
        )
        .map_err(|e| format!("failed to save session key: {e}"))?;
        Ok(())
    }

    fn get_session_key(&self, conn: &Connection) -> Result<Option<[u8; 32]>, String> {
        let result: Result<Vec<u8>, _> = conn.query_row(
            "SELECT session_public_key FROM signer_state LIMIT 1",
            [],
            |row| row.get(0),
        );
        match result {
            Ok(bytes) => {
                if bytes.len() == 32 {
                    let mut key = [0u8; 32];
                    key.copy_from_slice(&bytes);
                    Ok(Some(key))
                } else {
                    Ok(None)
                }
            }
            Err(rusqlite::Error::QueryReturnedNoRows) => Ok(None),
            Err(e) => Err(format!("failed to get session key: {e}")),
        }
    }
}
