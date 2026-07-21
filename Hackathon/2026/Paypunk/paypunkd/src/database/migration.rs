use rusqlite::Connection;

pub trait Migration {
    fn version(&self) -> u32;
    fn up(&self, conn: &Connection) -> Result<(), String>;
}

pub struct Migrator {
    migrations: Vec<Box<dyn Migration>>,
}

impl Migrator {
    pub fn new() -> Self {
        Migrator {
            migrations: Vec::new(),
        }
    }

    pub fn register(&mut self, migration: Box<dyn Migration>) {
        self.migrations.push(migration);
    }

    pub fn migrate(&self, conn: &Connection) -> Result<(), String> {
        conn.execute_batch(
            "CREATE TABLE IF NOT EXISTS _migrations (
                version INTEGER PRIMARY KEY,
                applied_at TEXT NOT NULL DEFAULT (datetime('now'))
            );",
        )
        .map_err(|e| e.to_string())?;

        let mut sorted: Vec<_> = self.migrations.iter().collect();
        sorted.sort_by_key(|m| m.version());

        for migration in sorted {
            let version = migration.version() as i64;
            let already_applied: bool = conn
                .query_row(
                    "SELECT COUNT(*) > 0 FROM _migrations WHERE version = ?1",
                    [version],
                    |row| row.get(0),
                )
                .map_err(|e| e.to_string())?;

            if !already_applied {
                migration.up(conn)?;
                conn.execute("INSERT INTO _migrations (version) VALUES (?1)", [version])
                    .map_err(|e| e.to_string())?;
            }
        }

        Ok(())
    }
}

pub struct PreDerivedKeysMigration;

impl Migration for PreDerivedKeysMigration {
    fn version(&self) -> u32 {
        3
    }

    fn up(&self, conn: &Connection) -> Result<(), String> {
        conn.execute_batch(
            "CREATE TABLE IF NOT EXISTS pre_derived_keys (
                protocol TEXT NOT NULL,
                account_index INTEGER NOT NULL,
                viewing_key BLOB NOT NULL,
                created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
                PRIMARY KEY (protocol, account_index)
            );",
        )
        .map_err(|e| e.to_string())
    }
}

pub struct AddressBookMigration;

impl Migration for AddressBookMigration {
    fn version(&self) -> u32 {
        4
    }

    fn up(&self, conn: &Connection) -> Result<(), String> {
        conn.execute_batch(
            "CREATE TABLE IF NOT EXISTS address_book (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                address TEXT NOT NULL UNIQUE,
                protocol TEXT NOT NULL,
                created_at INTEGER NOT NULL
            );",
        )
        .map_err(|e| e.to_string())
    }
}

pub struct SettingsMigration;

impl Migration for SettingsMigration {
    fn version(&self) -> u32 {
        5
    }

    fn up(&self, conn: &Connection) -> Result<(), String> {
        conn.execute_batch(
            "CREATE TABLE IF NOT EXISTS settings (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL
            );",
        )
        .map_err(|e| e.to_string())
    }
}

pub struct SignerStateMigration;

impl Migration for SignerStateMigration {
    fn version(&self) -> u32 {
        6
    }

    fn up(&self, conn: &Connection) -> Result<(), String> {
        conn.execute_batch(
            "CREATE TABLE IF NOT EXISTS signer_state (
                session_public_key BLOB NOT NULL,
                created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
            );",
        )
        .map_err(|e| e.to_string())
    }
}

pub struct AccountsMigration;

impl Migration for AccountsMigration {
    fn version(&self) -> u32 {
        2
    }

    fn up(&self, conn: &Connection) -> Result<(), String> {
        conn.execute_batch(
            "DROP TABLE IF EXISTS accounts;
            CREATE TABLE IF NOT EXISTS accounts (
                id TEXT PRIMARY KEY,
                protocol TEXT NOT NULL,
                derivation_path TEXT NOT NULL,
                name TEXT NOT NULL,
                address TEXT NOT NULL DEFAULT '',
                viewing_key BLOB NOT NULL,
                created_at INTEGER NOT NULL
            );",
        )
        .map_err(|e| e.to_string())
    }
}

pub struct AccountsBirthdayMigration;

impl Migration for AccountsBirthdayMigration {
    fn version(&self) -> u32 {
        7
    }

    fn up(&self, conn: &Connection) -> Result<(), String> {
        conn.execute_batch("ALTER TABLE accounts ADD COLUMN birthday_height INTEGER;")
            .map_err(|e| e.to_string())
    }
}
