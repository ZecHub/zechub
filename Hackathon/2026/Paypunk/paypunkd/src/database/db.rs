use std::path::{Path, PathBuf};
use std::sync::Mutex;

use rusqlite::Connection;

use super::migration::{
    AccountsBirthdayMigration, AccountsMigration, AddressBookMigration, Migration, Migrator,
    PreDerivedKeysMigration, SettingsMigration, SignerStateMigration,
};

#[derive(Debug, thiserror::Error)]
pub enum DbError {
    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),
    #[error("SQLite error: {0}")]
    Sqlite(#[from] rusqlite::Error),
    #[error("Migration error: {0}")]
    Migration(String),
}

pub struct Database {
    pub conn: Option<Mutex<Connection>>,
    db_path: PathBuf,
    marker_path: PathBuf,
}

impl Database {
    pub fn open(data_dir: &Path) -> Result<Self, DbError> {
        std::fs::create_dir_all(data_dir)?;

        let db_path = data_dir.join("paypunkd.db");
        let marker_path = data_dir.join(".wallet_initialized");

        if db_path.exists() {
            let conn = Connection::open(&db_path)?;
            let db = Database {
                conn: Some(Mutex::new(conn)),
                db_path,
                marker_path,
            };
            db.run_migrations()?;
            Ok(db)
        } else {
            let conn = Connection::open(&db_path)?;
            let db = Database {
                conn: Some(Mutex::new(conn)),
                db_path,
                marker_path,
            };
            db.run_migrations()?;
            Ok(db)
        }
    }

    pub fn wallet_exists(&self) -> bool {
        self.marker_path.exists()
    }

    pub fn mark_initialized(&self) -> Result<(), DbError> {
        std::fs::write(&self.marker_path, b"initialized")?;
        Ok(())
    }

    pub fn is_locked(&self) -> bool {
        false
    }

    pub fn ensure_file_exists(&mut self) -> Result<(), DbError> {
        if self.conn.is_some() && !self.db_path.exists() {
            tracing::warn!("database file deleted, reinitializing");
            self.conn = None;
            if let Some(parent) = self.db_path.parent() {
                std::fs::create_dir_all(parent)?;
            }
            let conn = Connection::open(&self.db_path)?;
            self.conn = Some(Mutex::new(conn));
            self.run_migrations()?;
        }
        Ok(())
    }

    fn run_migrations(&self) -> Result<(), DbError> {
        let conn = self
            .conn
            .as_ref()
            .ok_or_else(|| DbError::Migration("database is not open".to_string()))?;
        let conn = conn.lock().map_err(|e| DbError::Migration(e.to_string()))?;
        let mut migrator = Migrator::new();
        migrator.register(Box::new(InitialMigration));
        migrator.register(Box::new(AccountsMigration));
        migrator.register(Box::new(PreDerivedKeysMigration));
        migrator.register(Box::new(AddressBookMigration));
        migrator.register(Box::new(SettingsMigration));
        migrator.register(Box::new(SignerStateMigration));
        migrator.register(Box::new(AccountsBirthdayMigration));
        migrator.migrate(&conn).map_err(DbError::Migration)?;
        Ok(())
    }

    pub fn close(self) -> Result<(), DbError> {
        if let Some(conn) = self.conn {
            let conn = conn.lock().map_err(|e| DbError::Migration(e.to_string()))?;
            conn.execute_batch("VACUUM;").map_err(DbError::Sqlite)?;
        }
        Ok(())
    }
}

struct InitialMigration;

impl Migration for InitialMigration {
    fn version(&self) -> u32 {
        1
    }

    fn up(&self, conn: &Connection) -> Result<(), String> {
        conn.execute_batch(
            "CREATE TABLE IF NOT EXISTS accounts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                created_at TEXT NOT NULL DEFAULT (datetime('now'))
            );",
        )
        .map_err(|e| e.to_string())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_db_create_and_migrate() {
        let dir = tempfile::TempDir::new().unwrap();
        let db = Database::open(dir.path()).unwrap();
        let count: i64 = db
            .conn
            .as_ref()
            .unwrap()
            .lock()
            .unwrap()
            .query_row("SELECT COUNT(*) FROM _migrations", [], |row| row.get(0))
            .unwrap();
        assert_eq!(count, 7);
        db.close().unwrap();
    }

    #[test]
    fn test_db_reopen_reads_data() {
        let dir = tempfile::TempDir::new().unwrap();
        {
            let db = Database::open(dir.path()).unwrap();
            db.conn
                .as_ref()
                .unwrap()
                .lock()
                .unwrap()
                .execute(
                    "INSERT INTO accounts (id, protocol, derivation_path, name, viewing_key, created_at, birthday_height) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
                    rusqlite::params!["test-id", "Zcash", "m/44'/133'/0'", "test", vec![1u8, 2u8, 3u8], 1000u64, Option::<u64>::None],
                )
                .unwrap();
            db.close().unwrap();
        }
        {
            let db = Database::open(dir.path()).unwrap();
            let count: i64 = db
                .conn
                .as_ref()
                .unwrap()
                .lock()
                .unwrap()
                .query_row("SELECT COUNT(*) FROM accounts", [], |row| row.get(0))
                .unwrap();
            assert_eq!(count, 1);
            db.close().unwrap();
        }
    }

    #[test]
    fn test_wallet_exists_true_when_marker_exists() {
        let dir = tempfile::TempDir::new().unwrap();
        let db_path = dir.path().join("paypunkd.db");
        let marker_path = dir.path().join(".wallet_initialized");
        std::fs::write(&db_path, b"").unwrap();
        std::fs::write(&marker_path, b"initialized").unwrap();
        let db = Database::open(dir.path()).unwrap();
        assert!(db.wallet_exists());
        assert!(!db.is_locked());
    }

    #[test]
    fn test_wallet_exists_false_when_no_marker() {
        let dir = tempfile::TempDir::new().unwrap();
        let db = Database::open(dir.path()).unwrap();
        assert!(!db.wallet_exists());
        db.close().unwrap();
    }

    #[test]
    fn test_mark_initialized_creates_marker() {
        let dir = tempfile::TempDir::new().unwrap();
        let db = Database::open(dir.path()).unwrap();
        assert!(!db.wallet_exists());
        db.mark_initialized().unwrap();
        assert!(db.wallet_exists());
        assert!(dir.path().join(".wallet_initialized").exists());
        db.close().unwrap();
    }

    #[test]
    fn test_open_creates_db_when_not_exists() {
        let dir = tempfile::TempDir::new().unwrap();
        let db = Database::open(dir.path()).unwrap();
        assert!(!db.is_locked());
        assert!(db.conn.is_some());
        db.close().unwrap();
    }
}
