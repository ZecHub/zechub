use crate::coin::{get_coin_chain, CoinChain, CoinType};
use crate::fountain::FountainCodes;
use crate::mempool::{MemPool, MemPoolRunner};
use crate::{connect_lightwalletd, CompactTxStreamerClient, Connection, DbAdapter};
use anyhow::anyhow;
use lazy_static::lazy_static;
use lazycell::AtomicLazyCell;
use parking_lot::Mutex;
use std::sync::atomic::{AtomicU8, Ordering};
use std::time::Duration;
use tonic::transport::Channel;
use zcash_proofs::prover::LocalTxProver;

lazy_static! {
    pub static ref COIN_CONFIG: [Mutex<CoinConfig>; 3] = [
        Mutex::new(CoinConfig::new(0, CoinType::Zcash)),
        Mutex::new(CoinConfig::new(1, CoinType::Ycash)),
        Mutex::new(CoinConfig::new(2, CoinType::PirateChain)),
    ];
    pub static ref PROVER: Mutex<Option<LocalTxProver>> = Mutex::new(None);
    pub static ref RAPTORQ: Mutex<FountainCodes> = Mutex::new(FountainCodes::new());
    pub static ref MEMPOOL: AtomicLazyCell<MemPool> = AtomicLazyCell::new();
    pub static ref MEMPOOL_RUNNER: Mutex<MemPoolRunner> = Mutex::new(MemPoolRunner::new());
}

pub static ACTIVE_COIN: AtomicU8 = AtomicU8::new(0);

/// Set the active coin
pub fn set_active(active: u8) {
    ACTIVE_COIN.store(active, Ordering::Release);
}

/// Set the active account for a given coin
// pub fn set_active_account(coin: u8, id: u32) {
//     let mut c = COIN_CONFIG[coin as usize].lock().unwrap();
//     c.id_account = id;
//     if let Some(mempool) = MEMPOOL.borrow() {
//         mempool.set_active(coin, id);
//     }
// }

/// Set the lightwalletd url for a given coin
pub fn set_coin_lwd_url(coin: u8, lwd_url: &str) {
    let mut c = COIN_CONFIG[coin as usize].lock();
    c.lwd_url = Some(lwd_url.to_string());
}

/// Get the URL of the lightwalletd server for a given coin
#[allow(dead_code)] // Used by C FFI
pub fn get_coin_lwd_url(coin: u8) -> String {
    let c = COIN_CONFIG[coin as usize].lock();
    c.lwd_url.clone().unwrap_or_default()
}

/// Set the db passwd
pub fn set_coin_passwd(coin: u8, passwd: &str) {
    let mut c = COIN_CONFIG[coin as usize].lock();
    c.passwd = passwd.to_string();
}

/// Initialize a coin with a database path
pub fn init_coin(coin: u8, db_path: &str) -> anyhow::Result<()> {
    let mut c = COIN_CONFIG[coin as usize].lock();
    c.set_db_path(db_path)?;
    c.migrate_db()?; // if the db was already migrated, this is a no-op
    c.open_db()?;
    Ok(())
}

/// Upgrade database schema for given coin and db path
/// Used from ywallet
pub fn migrate_db(coin: u8, db_path: &str) -> anyhow::Result<()> {
    let c = CoinConfig::get(coin);
    let chain = c.chain;
    DbAdapter::migrate_db(
        chain.network(),
        &c.connection(),
        &c.passwd,
        chain.has_unified(),
    )?;
    Ok(())
}

pub async fn migrate_data(coin: u8) -> anyhow::Result<()> {
    let c = CoinConfig::get(coin);
    let db = c.db()?;
    db.migrate_data(coin).await?;
    Ok(())
}

#[derive(Clone)]
pub struct CoinConfig {
    pub coin: u8,
    pub coin_type: CoinType,
    pub height: u32,
    pub lwd_url: Option<String>,
    pub db_path: Option<String>,
    pub passwd: String,
    pub pool: Option<r2d2::Pool<r2d2_sqlite::SqliteConnectionManager>>,
    pub chain: &'static (dyn CoinChain + Send),
}

impl CoinConfig {
    pub fn new(coin: u8, coin_type: CoinType) -> Self {
        let chain = get_coin_chain(coin_type);
        CoinConfig {
            coin,
            coin_type,
            height: 0,
            lwd_url: None,
            db_path: None,
            passwd: String::new(),
            pool: None,
            chain,
        }
    }

    pub fn set_db_path(&mut self, db_path: &str) -> anyhow::Result<()> {
        let manager = r2d2_sqlite::SqliteConnectionManager::file(db_path);
        // Use a single-connection pool to serialize SQLite access and avoid writer contention
        let pool = r2d2::Pool::builder()
            .max_size(1)
            .connection_timeout(Duration::from_secs(300))
            .build(manager)?;
        self.pool = Some(pool);
        self.db_path = Some(db_path.to_string());
        Ok(())
    }

    pub fn migrate_db(&self) -> anyhow::Result<()> {
        let network = self.chain.network();
        DbAdapter::migrate_db(
            network,
            &self.connection(),
            &self.passwd,
            self.chain.has_unified(),
        )?;
        Ok(())
    }

    pub fn open_db(&mut self) -> anyhow::Result<()> {
        let mut db = DbAdapter::new(self.coin_type, self.connection())?;
        db.init_db()?;
        Ok(())
    }

    pub fn get(coin: u8) -> CoinConfig {
        let c = COIN_CONFIG[coin as usize].lock();
        c.clone()
    }

    pub fn get_active() -> CoinConfig {
        let coin = ACTIVE_COIN.load(Ordering::Acquire) as usize;
        let c = COIN_CONFIG[coin].lock();
        c.clone()
    }

    pub fn set_height(height: u32) {
        let coin = ACTIVE_COIN.load(Ordering::Acquire) as usize;
        let mut c = COIN_CONFIG[coin].lock();
        c.height = height;
    }

    pub async fn connect_lwd(&self) -> anyhow::Result<CompactTxStreamerClient<Channel>> {
        if let Some(lwd_url) = &self.lwd_url {
            connect_lightwalletd(lwd_url).await
        } else {
            Err(anyhow!("LWD URL Not set"))
        }
    }

    pub fn db(&self) -> anyhow::Result<DbAdapter> {
        DbAdapter::new(self.coin_type, self.connection())
    }

    pub fn connection(&self) -> Connection {
        let Some(pool) = self.pool.as_ref() else {
            panic!("No db path")
        };
        let connection = pool.get().unwrap();
        let _ = crate::db::cipher::set_db_passwd(&connection, &self.passwd);
        let _ = connection.busy_timeout(Duration::from_secs(120));
        // Prefer WAL to reduce writer/reader blocking; be tolerant if not supported
        let _ = connection.execute("PRAGMA journal_mode=WAL", []);
        let _ = connection.execute("PRAGMA synchronous=NORMAL", []);
        let _ = connection.execute("PRAGMA temp_store=MEMORY", []);
        connection
    }
}

pub fn init_prover(spend_param_bytes: &[u8], output_param_bytes: &[u8]) {
    let prover = LocalTxProver::from_bytes(spend_param_bytes, output_param_bytes);
    *PROVER.lock() = Some(prover);
}
